# Event-Lifecycle Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an automated, self-driving interaction chain for the LDAH one-time-event lifecycle. New events spawn setup tasks (assign presenter per session, verify display, send announcements per session); after handoff per session, day-of attendance and an event-summary task chain automatically — each owned by the right staff member at the right time.

**Architecture:** Four new Cloud Functions (Firebase Functions v1 SDK — matching existing codebase style) appended to `LDAH_W2/functions/index.js`. Two LDAH-Int client touches: stamp the creator on event save, and a close-task flow with a Presenter dropdown for `assignPresenter` interactions. Workflow state lives on the interaction docs themselves (`workflowEventId`, `workflowStep`, `workflowSessionKey`) — no new collection. Per-session presenter is stored on the event in a `sessionPresenters` map.

**Tech Stack:** Firebase (Functions v1 legacy SDK, Firestore), vanilla JS in the LDAH-Int HTML monolith, Node.js. Single Firebase project `ldah-932d5` — STAGE and live LDAH-Int share one backend.

**Source spec:** `docs/superpowers/specs/2026-05-22-event-lifecycle-interactions-design.md` (rev. 2).

**Testing reality:** This codebase has no automated test suite for Cloud Functions or the LDAH-Int client. Per spec §8, verification is **manual end-to-end** on a throwaway event. Each phase ends with explicit browser/console checks and a commit. Do **not** bolt on a test framework scoped just to this feature.

**Project conventions (from memory) — must follow:**
- LDAH-Int UI changes go to `STAGE/index.html` **first**, get tested in the browser, then are **copied** (not re-applied) to root `index.html` (feedback_stage-first, feedback_stage-to-live-copy).
- Cloud Functions deploy to the shared backend immediately. They fire on writes from either STAGE or live UI — accepted because interactions are staff-only (spec §8).
- Exported triggers only ship when redeployed (feedback_cf-helper-deploy).
- **Bump LDAH-Int version on every push to live** (feedback_version-bump). Current STAGE: `v123.1.8`. This feature warrants `v124.0.0` once it lands on live (feature work = full integer bump).
- Always push (feedback_always-push). LDAH-Int repo: `danpoahu/LDAH-Int`. W2 repo: `danpoahu/LDAH_W2`.
- New collections need explicit Firestore rules first (feedback_firestore-rule-checklist). This plan does **not** introduce any new collections — only new fields on `interactions` and `events`. Existing rules permit them (no field-level validation).

---

## File map

| File | Phase(s) | Touch |
|---|---|---|
| `/Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html` | 1, 4 | Modify `cmsSaveEvent` (~line 21029); add Presenter dropdown in view-interaction modal (~line 15644); modify `changeInteractionStatus` (~line 16055) |
| `/Volumes/Xcode_Projects/React/LDAH-Internal/index.html` | 9 | Copy changed sections from STAGE after browser testing |
| `/Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js` | 2, 5, 6, 7 | Append a `// EVENT-LIFECYCLE` section with 4 new exports |
| `/Volumes/Xcode_Projects/React/LDAH_W2/firestore.indexes.json` | 5 | Add 3 composite indexes for the interaction queries |

No new Firestore collections; existing rules on `interactions` and `events` permit the new fields (no field-level validation).

---

## Pre-flight (do once before starting)

- [ ] **P.1: Confirm both repos are clean.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH-Internal && git status --short && git branch --show-current
  cd /Volumes/Xcode_Projects/React/LDAH_W2 && git status --short && git branch --show-current
  ```
  Expected: both on `main`, no uncommitted changes (or only acceptable existing ones).

- [ ] **P.2: Verify Firebase CLI is authenticated to `ldah-932d5`.**
  ```bash
  firebase projects:list 2>&1 | grep ldah
  ```
  Expected: `ldah-932d5` listed. If not, `firebase login`.

- [ ] **P.3: Look up La'a's `userRoles` document id.**
  - In the LDAH-Int browser console (signed in as admin):
    ```javascript
    (await firebase.firestore().collection('userRoles')
       .where('displayName', '>=', "La'akea").where('displayName', '<', "La'akeb")
       .get()).forEach(d => console.log(d.id, d.data().displayName, d.data().email));
    ```
  - Copy the doc id (it's the uid). You will paste it into Phase 2 as `LIFECYCLE_LAA_UID`.

- [ ] **P.4: Confirm Cloud Functions trigger style.**
  ```bash
  grep -n "functions.firestore.document" /Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js | head -3
  ```
  Expected: matches like `exports.onEventSignupCreated = functions ...firestore.document("events/{eventId}/signups/{signupId}").onCreate(...)`. This is **v1 SDK** — all new functions in this plan use the same style.

---

## Phase 1 — Stamp creator on event save (LDAH-Int STAGE)

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html` (~line 21029 in `cmsSaveEvent`)

- [ ] **Step 1.1: Locate the create branch of `cmsSaveEvent`.**
  ```bash
  grep -n "payload.createdAt = firebase.firestore.FieldValue.serverTimestamp" /Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html
  ```
  Expected: one hit around line 21099, inside the `else` of `if (docId) { update } else { add }`.

- [ ] **Step 1.2: Add `createdByUid` / `createdByName` to the create branch.**

  Find the existing block (around line 21096–21101):
  ```javascript
      if (docId) {
        await db.collection(collection).doc(docId).update(payload);
      } else {
        payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection(collection).add(payload);
      }
  ```

  Replace with (add two lines):
  ```javascript
      if (docId) {
        await db.collection(collection).doc(docId).update(payload);
      } else {
        payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        payload.createdByUid = (window.currentUserData && window.currentUserData.uid) || '';
        payload.createdByName = (window.currentUserData && window.currentUserData.displayName) || '';
        await db.collection(collection).add(payload);
      }
  ```

  Only stamping in the create branch is intentional — an update should never overwrite the original creator.

- [ ] **Step 1.3: Verify in the browser.**
  - Open `https://danpoahu.github.io/LDAH-Int/STAGE/` (or your local STAGE preview), sign in.
  - CMS → Events → create a throwaway one-time event titled `WORKFLOW-TEST-1` with a future date.
  - In the browser console:
    ```javascript
    (await firebase.firestore().collection('events').where('title','==','WORKFLOW-TEST-1').get())
      .forEach(d => console.log(d.id, d.data().createdByUid, d.data().createdByName));
    ```
  - Expected: your own uid and displayName. **Delete** the test event from the CMS afterward (don't archive — fully delete so the upcoming Phase 2 doesn't trip on it).

- [ ] **Step 1.4: Commit (LDAH-Int repo).**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH-Internal
  git add STAGE/index.html
  git commit -m "STAGE: stamp createdByUid/Name on cmsSaveEvent (lifecycle workflow prep)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
  ```
  Do **not** push yet — UI work happens on STAGE for several phases; final push is Phase 9.

---

## Phase 2 — `onEventCreatedLifecycle` Cloud Function

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js` (append a new section at the end)

- [ ] **Step 2.1: Find a good insertion point at the end of the existing functions.**
  ```bash
  tail -50 /Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js
  ```
  Identify the very last export. Append the new section after it.

- [ ] **Step 2.2: Append the shared lifecycle header + the `onEventCreatedLifecycle` export.**

  Append to the end of `functions/index.js`:

  ```javascript
  // ============================================================================
  // EVENT-LIFECYCLE INTERACTIONS
  //   Spec: docs/superpowers/specs/2026-05-22-event-lifecycle-interactions-design.md
  //   Plan: docs/superpowers/plans/2026-05-22-event-lifecycle-interactions.md
  //
  //   onCreate(events/{id})       -> seed setup interactions (Verify Display +
  //                                  per-session Assign Presenter & Send
  //                                  Announcements)
  //   onUpdate(interactions/{id}) -> chain (presenter capture, takeAttendance
  //                                  -> eventSummary, all-summaries -> complete)
  //   pubsub daily 5am HST        -> day-of Take Attendance creation
  //   onUpdate(events/{id})       -> archive cleanup + Event Summary auto-close
  // ============================================================================

  // PASTE La'a Salvani's userRoles document id (uid) here before deploying.
  // See plan step P.3.
  const LIFECYCLE_LAA_UID = "REPLACE_WITH_LAAS_UID";

  const LIFECYCLE_CHANNELS = {
    assignPresenter:  { channel: "Event Setup",   type: "Assign Presenter" },
    verifyDisplay:    { channel: "Event Setup",   type: "Verify Display" },
    sendAnnouncement: { channel: "Event Setup",   type: "Send Announcements" },
    takeAttendance:   { channel: "Event Day",     type: "Take Attendance" },
    eventSummary:     { channel: "Event Wrap-Up", type: "Event Summary" }
  };

  async function _lcResolveStaffName(db, uid) {
    if (!uid) return "";
    try {
      const s = await db.collection("userRoles").doc(uid).get();
      return (s.exists && s.data() && s.data().displayName) || "";
    } catch (e) { return ""; }
  }

  function _lcSessionKey(s) {
    if (!s) return "";
    return s.dateKey || s.rawString || "";
  }

  function _lcBuildInteractionDoc(opts) {
    // opts: { eventId, eventTitle, step, sessionKey, ownerUid, ownerName, dueDate, extra }
    const c = LIFECYCLE_CHANNELS[opts.step];
    const suffix = opts.sessionKey ? " (" + opts.sessionKey + ")" : "";
    const doc = {
      channel: c.channel,
      interactionType: c.type,
      contactId: "",
      contactName: (opts.eventTitle || "(untitled event)") + (opts.sessionKey ? " — " + opts.sessionKey : ""),
      contactType: "",
      grantProgram: "",
      summary: c.type + " for: " + (opts.eventTitle || "") + suffix,
      followUpDate: opts.dueDate || "",
      status: "Open",
      notes: "",
      isDraft: false,
      owner: opts.ownerName || "",
      ownerUid: opts.ownerUid || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      workflowEventId: opts.eventId,
      workflowEventCollection: "events",
      workflowStep: opts.step,
      workflowSessionKey: opts.sessionKey || ""
    };
    if (opts.extra) Object.assign(doc, opts.extra);
    return doc;
  }

  async function _lcCreateIfMissing(db, opts) {
    const q = await db.collection("interactions")
      .where("workflowEventId", "==", opts.eventId)
      .where("workflowStep", "==", opts.step)
      .where("workflowSessionKey", "==", opts.sessionKey || "")
      .limit(1).get();
    if (!q.empty) return null;
    return await db.collection("interactions").add(_lcBuildInteractionDoc(opts));
  }

  exports.onEventCreatedLifecycle = functions
    .runWith({ timeoutSeconds: 60, maxInstances: 10 })
    .firestore.document("events/{eventId}")
    .onCreate(async (snap, context) => {
      const db = admin.firestore();
      const ev = snap.data() || {};
      const eventId = context.params.eventId;

      if (ev.archived === true) return null;
      if (!ev.createdByUid) {
        console.log("onEventCreatedLifecycle: skipping", eventId, "— no createdByUid (pre-workflow event)");
        return null;
      }

      const sessions = getEventSessions(ev) || [];
      if (sessions.length === 0) {
        console.warn("onEventCreatedLifecycle:", eventId, "has no sessions; skipping");
        return null;
      }

      const dueDate = ev.startDate || ev.eventDate || "";
      const title = ev.title || "(untitled event)";
      const laaName = await _lcResolveStaffName(db, LIFECYCLE_LAA_UID);
      const creatorUid = ev.createdByUid;
      const creatorName = ev.createdByName || (await _lcResolveStaffName(db, creatorUid));

      // 1 Verify Display (event-wide)
      await _lcCreateIfMissing(db, {
        eventId, eventTitle: title, step: "verifyDisplay", sessionKey: "",
        ownerUid: creatorUid, ownerName: creatorName, dueDate
      });

      // Per session: Assign Presenter (La'a) + Send Announcements (creator)
      for (const s of sessions) {
        const key = _lcSessionKey(s);
        if (!key) continue;
        await _lcCreateIfMissing(db, {
          eventId, eventTitle: title, step: "assignPresenter", sessionKey: key,
          ownerUid: LIFECYCLE_LAA_UID, ownerName: laaName, dueDate
        });
        await _lcCreateIfMissing(db, {
          eventId, eventTitle: title, step: "sendAnnouncement", sessionKey: key,
          ownerUid: creatorUid, ownerName: creatorName, dueDate
        });
      }

      await snap.ref.update({
        lifecycleStatus: "setup",
        lifecycleSetupAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return null;
    });
  ```

- [ ] **Step 2.3: Replace the La'a uid placeholder.**

  Edit the line `const LIFECYCLE_LAA_UID = "REPLACE_WITH_LAAS_UID";` and paste the uid you copied in pre-flight step P.3.

- [ ] **Step 2.4: Lint check.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2/functions
  node -e "require('./index.js')" 2>&1 | head -20
  ```
  Expected: no syntax errors. (If the existing `functions/index.js` has side effects on require, the require may emit warnings — those are OK as long as no syntax error is reported.)

- [ ] **Step 2.5: Deploy just this trigger.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2
  firebase deploy --only functions:onEventCreatedLifecycle --project ldah-932d5
  ```
  Expected: ends with `✔ Deploy complete!`.

- [ ] **Step 2.6: End-to-end verify (STAGE).**
  - Open the LDAH-Int STAGE UI, sign in as yourself (creator).
  - CMS → Events → create a throwaway one-time event titled `WORKFLOW-TEST-2` with **two** session dates a few days out (use `signupDates`).
  - In the browser console, after ~15 seconds:
    ```javascript
    const ev = (await firebase.firestore().collection('events').where('title','==','WORKFLOW-TEST-2').get()).docs[0];
    console.log('lifecycleStatus:', ev.data().lifecycleStatus);
    const ixs = await firebase.firestore().collection('interactions').where('workflowEventId','==',ev.id).get();
    ixs.forEach(d => console.log(d.data().workflowStep, '|', d.data().workflowSessionKey, '| owner:', d.data().owner));
    ```
  - Expected:
    - `lifecycleStatus: "setup"`
    - 5 rows: 1 `verifyDisplay` (sessionKey empty, owner = you) + 2 `assignPresenter` (one per session, owner = La'a) + 2 `sendAnnouncement` (one per session, owner = you).
  - **Idempotency check:** trigger the CF a second time by toggling any field on the event (e.g. CMS → edit description → save). Re-run the query. Expected: **still 5 rows** (no duplicates) because the function only runs on create, not update. Then trigger by deleting and recreating — should still produce exactly 5.

- [ ] **Step 2.7: Commit (W2 repo).**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2
  git add functions/index.js
  git commit -m "functions: add onEventCreatedLifecycle (event-lifecycle workflow phase 2)

Seeds Verify Display + per-session Assign Presenter & Send Announcements
on new events that carry createdByUid. Idempotent via sibling query.
Spec: LDAH-Internal/docs/superpowers/specs/2026-05-22-event-lifecycle-interactions-design.md

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
  ```

- [ ] **Step 2.8: Leave the test event for Phase 4 verification, OR clean up.**
  If proceeding straight to Phase 4, leave `WORKFLOW-TEST-2` in place. Otherwise: delete the event AND delete the 5 interaction rows (browser console):
  ```javascript
  const ev = (await firebase.firestore().collection('events').where('title','==','WORKFLOW-TEST-2').get()).docs[0];
  const ixs = await firebase.firestore().collection('interactions').where('workflowEventId','==',ev.id).get();
  await Promise.all(ixs.docs.map(d => d.ref.delete()));
  await ev.ref.delete();
  ```

---

## Phase 3 — Verify event-linked rows render correctly (no code change expected)

By design, `onEventCreatedLifecycle` writes the event title into `contactName` (with " — sessionKey" suffix for per-session rows). The existing `loadInteractions` row template (`STAGE/index.html` ~line 17221–17254) renders `contactName` in bold, which is exactly the desired display. `contactType` is empty so the second line is skipped. The row click goes to `viewInteraction(d._id)` which opens the modal — same as any other interaction.

- [ ] **Step 3.1: Visual confirmation.**
  - In LDAH-Int STAGE, open the **Interactions** tab.
  - Expected: the 5 rows from Phase 2 appear with the event title (per-session ones suffixed with the session date) in the contact column; channel pills show "Event Setup"; owner shows La'a's initials for the two Assign Presenter rows and yours for the others. Click any one — the modal opens.

- [ ] **Step 3.2: If rendering is broken (e.g. blank contact, modal errors), capture the symptom and stop.**
  Don't band-aid. Re-check `_lcBuildInteractionDoc` in Phase 2 — `contactName` must be a non-empty string for every workflow row. The fallback `(opts.eventTitle || "(untitled event)")` should prevent blanks. If you see a layout issue specific to event-linked rows, add the conditional render in the row template (`STAGE/index.html:17248`) — replace:
  ```javascript
  '<span><b>' + rsEscape(d.contactName || '—') + '</b>' +
    (d.contactType ? '<br><span style="font-size:.78rem;color:var(--text-soft);">' + rsEscape(d.contactType) + '</span>' : '') +
  '</span>' +
  ```
  with:
  ```javascript
  '<span><b>' + rsEscape(d.contactName || '—') + '</b>' +
    (d.contactType ? '<br><span style="font-size:.78rem;color:var(--text-soft);">' + rsEscape(d.contactType) + '</span>' : '') +
    (d.workflowStep ? '<br><span style="font-size:.7rem;color:#94a3b8;letter-spacing:.05em;">EVENT WORKFLOW</span>' : '') +
  '</span>' +
  ```
  But only do this if visually warranted — the default already works.

- [ ] **Step 3.3: No commit unless step 3.2 required a code change.**

---

## Phase 4 — Presenter capture at close (LDAH-Int STAGE)

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html`
  - Inject a Presenter dropdown into the view-interaction modal near the status changer (~line 15656).
  - Modify `changeInteractionStatus` (~line 16055) to require a presenter selection when closing an `assignPresenter` interaction and to persist `assignedPresenterUid` / `assignedPresenterName`.

- [ ] **Step 4.1: Locate the view-interaction render and the status changer.**
  ```bash
  grep -n "ixStatusSelect" /Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html
  ```
  Expected hits include the dropdown construction (around 15649) and `changeInteractionStatus` (around 16057). Read those lines plus the surrounding ~80 lines of the view-interaction function so you understand `d` (the current interaction doc) and how `statusFieldHtml` is appended into the modal.

- [ ] **Step 4.2: Add the Presenter dropdown HTML.**

  Find this block (around line 15644–15657):
  ```javascript
        var statusFieldHtml;
        if (canChangeStatus) {
          var opts = ['Open', 'Closed', 'Needs admin review'];
          var optHtml = opts.map(function(o) {
            return '<option value="' + o + '"' + (o === currentStatus ? ' selected' : '') + '>' + o + '</option>';
          }).join('');
          statusFieldHtml =
            '<div class="ct-info-field"><label>Status</label><div class="val">' +
              (isEditMode
                ? '<select id="ixStatusSelect" class="ix-edit-input">' + optHtml + '</select>'
                : '<div class="ix-status-changer"><select id="ixStatusSelect">' + optHtml + '</select>' +
                  '<button class="ix-status-save" onclick="changeInteractionStatus()">Save</button>' +
                  '<span id="ixStatusMsg"></span></div>') +
            '</div></div>';
        }
  ```

  Immediately **after** that block, add:
  ```javascript
        var presenterFieldHtml = '';
        if (d && d.workflowStep === 'assignPresenter') {
          var currentName = d.assignedPresenterName || '';
          var currentUid  = d.assignedPresenterUid  || '';
          presenterFieldHtml =
            '<div class="ct-info-field"><label>Presenter <span style="color:#dc2626;font-weight:600;">(required to Close)</span></label><div class="val">' +
              '<select id="ixPresenterSelect" class="ix-edit-input" style="min-width:240px;">' +
                '<option value="">— Select presenter —</option>' +
              '</select>' +
              (currentName ? ' <span style="font-size:.78rem;color:var(--text-soft);">Saved: ' + rsEscape(currentName) + '</span>' : '') +
            '</div></div>';
          // Populate async; reuse the staff roster helper. Mark current selection if any.
          setTimeout(function() {
            _getAssignableOwners().then(function(owners) {
              var sel = document.getElementById('ixPresenterSelect');
              if (!sel) return;
              owners.forEach(function(o) {
                var opt = document.createElement('option');
                opt.value = o.uid;
                opt.dataset.name = o.displayName;
                opt.textContent = o.displayName;
                if (currentUid && currentUid === o.uid) opt.selected = true;
                sel.appendChild(opt);
              });
            });
          }, 0);
        }
  ```

  And then find where `statusFieldHtml` is concatenated into the modal output (search nearby for `statusFieldHtml +` or `+ statusFieldHtml`). Add ` + presenterFieldHtml` immediately after the `statusFieldHtml` reference. Example:
  ```javascript
  // ... + statusFieldHtml + presenterFieldHtml + ...
  ```

- [ ] **Step 4.3: Modify `changeInteractionStatus` to gate close + persist presenter.**

  Find the existing function (around line 16055–16085):
  ```javascript
    window.changeInteractionStatus = async function() {
      var sel = document.getElementById('ixStatusSelect');
      var msg = document.getElementById('ixStatusMsg');
      if (!sel || !_ixViewDocId) return;

      var newStatus = sel.value;
      var btn = sel.nextElementSibling;
      if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

      try {
        await db.collection('interactions').doc(_ixViewDocId).update({
          status: newStatus,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        // ... rest of function unchanged
      } catch (err) { /* ... */ } finally { /* ... */ }
    };
  ```

  Replace with:
  ```javascript
    window.changeInteractionStatus = async function() {
      var sel = document.getElementById('ixStatusSelect');
      var msg = document.getElementById('ixStatusMsg');
      if (!sel || !_ixViewDocId) return;

      var newStatus = sel.value;
      var btn = sel.nextElementSibling;
      if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

      // Workflow gate + presenter persistence (assignPresenter step)
      var presenterSel = document.getElementById('ixPresenterSelect');
      var updates = {
        status: newStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      if (presenterSel) {
        if (newStatus === 'Closed' && !presenterSel.value) {
          if (msg) { msg.className = 'ix-status-locked'; msg.textContent = 'Select a presenter before closing.'; }
          if (btn) { btn.disabled = false; btn.textContent = 'Save'; }
          return;
        }
        if (presenterSel.value) {
          var opt = presenterSel.options[presenterSel.selectedIndex];
          updates.assignedPresenterUid  = presenterSel.value;
          updates.assignedPresenterName = (opt && opt.dataset && opt.dataset.name) || opt.textContent || '';
        }
      }

      try {
        await db.collection('interactions').doc(_ixViewDocId).update(updates);

        if (msg) { msg.className = 'ix-status-saved'; msg.textContent = '✓ Saved'; }
        setTimeout(function() { if (msg) msg.textContent = ''; }, 2000);

        // Refresh lists & KPIs (clear cache so fresh data is fetched)
        _dashKpiCache = null;
        if (typeof loadInteractions === 'function') loadInteractions();
        if (typeof updateDashKPIs === 'function') updateDashKPIs();
        if (typeof loadDashRecentInteractions === 'function') loadDashRecentInteractions();

      } catch (err) {
        if (msg) { msg.className = 'ix-status-locked'; msg.textContent = 'Error: ' + err.message; }
        console.error('Status update error:', err);
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Save'; }
      }
    };
  ```

- [ ] **Step 4.4: Browser verify the dropdown gate.**
  - In STAGE, open the Interactions tab. Click one of the `WORKFLOW-TEST-2` Assign Presenter rows.
  - Confirm: the modal shows the Status dropdown AND a "Presenter (required to Close)" dropdown below it, populated with staff names.
  - Try to change Status → Closed and click Save *without* picking a presenter. Expected: the message reads `Select a presenter before closing.` and the doc is **not** updated (verify in the console with `(await firebase.firestore().collection('interactions').doc('<id>').get()).data().status` → still `Open`).
  - Now pick a presenter and Close. Expected: `✓ Saved`, the modal closes, and the doc has `status: 'Closed'`, `assignedPresenterUid: '<uid>'`, `assignedPresenterName: '<name>'`.

- [ ] **Step 4.5: Commit (LDAH-Int repo, STAGE only).**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH-Internal
  git add STAGE/index.html
  git commit -m "STAGE: presenter dropdown + close gate for assignPresenter interactions

Adds a Presenter dropdown to the view-interaction modal when
workflowStep === 'assignPresenter'. Closing the interaction requires
a presenter selection; selection is persisted as assignedPresenterUid/Name.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
  ```

---

## Phase 5 — `onInteractionUpdatedLifecycle` Cloud Function (chain engine)

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js` (append after Phase 2's section)
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/firestore.indexes.json` (add composite indexes)

- [ ] **Step 5.1: Append the chain-engine export.**

  Append to `functions/index.js` (after the Phase 2 block):

  ```javascript
  exports.onInteractionUpdatedLifecycle = functions
    .runWith({ timeoutSeconds: 60, maxInstances: 10 })
    .firestore.document("interactions/{interactionId}")
    .onUpdate(async (change, context) => {
      const before = change.before.data() || {};
      const after  = change.after.data()  || {};
      if (!after.workflowStep) return null;
      if (before.status === after.status) return null;
      if (after.status !== "Closed") return null;

      const db = admin.firestore();
      const eventId = after.workflowEventId;
      if (!eventId) return null;
      const step = after.workflowStep;
      const sessionKey = after.workflowSessionKey || "";

      // --- assignPresenter closed: capture presenter on the event ---
      if (step === "assignPresenter") {
        const uid  = after.assignedPresenterUid  || "";
        const name = after.assignedPresenterName || "";
        if (!uid) {
          // Guardrail: client-side should have blocked this. Re-open.
          await change.after.ref.update({
            status: "Open",
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            notes: ((after.notes || "") + "\n[auto] Re-opened: no presenter selected at close.").trim()
          });
          console.warn("assignPresenter closed without presenter; re-opened", change.after.id);
          return null;
        }
        const evRef = db.collection("events").doc(eventId);
        await evRef.update({
          ["sessionPresenters." + sessionKey]: { uid: uid, name: name },
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return null;
      }

      // --- takeAttendance closed: spawn Event Summary ---
      if (step === "takeAttendance") {
        const existing = await db.collection("interactions")
          .where("workflowEventId", "==", eventId)
          .where("workflowStep", "==", "eventSummary")
          .where("workflowSessionKey", "==", sessionKey)
          .limit(1).get();
        if (!existing.empty) return null;

        const evSnap = await db.collection("events").doc(eventId).get();
        const ev = evSnap.data() || {};
        const sp = (ev.sessionPresenters && ev.sessionPresenters[sessionKey]) || {};
        const ownerUid  = sp.uid  || ev.createdByUid  || "";
        const ownerName = sp.name || ev.createdByName || "";

        // Due = sessionKey (YYYY-MM-DD) + 10 days, in HST date
        const sd = new Date(sessionKey + "T12:00:00-10:00");
        const due = new Date(sd.getTime() + 10 * 24 * 60 * 60 * 1000);
        const dueIso = due.toISOString().slice(0, 10);

        await db.collection("interactions").add(_lcBuildInteractionDoc({
          eventId, eventTitle: ev.title || "", step: "eventSummary",
          sessionKey, ownerUid, ownerName, dueDate: dueIso
        }));
        return null;
      }

      // --- eventSummary closed: flip event to complete if all sessions done ---
      if (step === "eventSummary") {
        const evSnap = await db.collection("events").doc(eventId).get();
        if (!evSnap.exists) return null;
        const ev = evSnap.data() || {};
        const sessions = getEventSessions(ev) || [];
        if (sessions.length === 0) return null;
        const wantKeys = sessions.map(_lcSessionKey).filter(Boolean);

        const all = await db.collection("interactions")
          .where("workflowEventId", "==", eventId)
          .where("workflowStep", "==", "eventSummary")
          .get();
        const closedKeys = new Set();
        all.forEach(d => {
          const x = d.data() || {};
          if (x.status === "Closed") closedKeys.add(x.workflowSessionKey || "");
        });
        const allDone = wantKeys.every(k => closedKeys.has(k));
        if (allDone) {
          await evSnap.ref.update({
            lifecycleStatus: "complete",
            lifecycleCompletedAt: admin.firestore.FieldValue.serverTimestamp()
          });
        }
        return null;
      }

      // verifyDisplay / sendAnnouncement closes: no chaining action
      return null;
    });
  ```

- [ ] **Step 5.2: Add composite indexes to `firestore.indexes.json`.**

  Open `/Volumes/Xcode_Projects/React/LDAH_W2/firestore.indexes.json`. Inside the `indexes` array, add these three entries (merge with whatever's already there):

  ```json
  {
    "collectionGroup": "interactions",
    "queryScope": "COLLECTION",
    "fields": [
      { "fieldPath": "workflowEventId",     "order": "ASCENDING" },
      { "fieldPath": "workflowStep",        "order": "ASCENDING" },
      { "fieldPath": "workflowSessionKey",  "order": "ASCENDING" }
    ]
  },
  {
    "collectionGroup": "interactions",
    "queryScope": "COLLECTION",
    "fields": [
      { "fieldPath": "workflowEventId",     "order": "ASCENDING" },
      { "fieldPath": "workflowStep",        "order": "ASCENDING" }
    ]
  },
  {
    "collectionGroup": "interactions",
    "queryScope": "COLLECTION",
    "fields": [
      { "fieldPath": "workflowEventId",     "order": "ASCENDING" },
      { "fieldPath": "status",              "order": "ASCENDING" }
    ]
  }
  ```

- [ ] **Step 5.3: Deploy indexes + the new function.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2
  firebase deploy --only firestore:indexes --project ldah-932d5
  firebase deploy --only functions:onInteractionUpdatedLifecycle --project ldah-932d5
  ```
  Index builds may take a few minutes. The function deploy itself returns quickly.

- [ ] **Step 5.4: End-to-end verify: presenter capture.**
  - In STAGE LDAH-Int, open one of `WORKFLOW-TEST-2`'s Assign Presenter rows.
  - Pick a presenter (any active staff), set Status → Closed, Save.
  - In the browser console:
    ```javascript
    const ev = (await firebase.firestore().collection('events').where('title','==','WORKFLOW-TEST-2').get()).docs[0];
    console.log('sessionPresenters:', ev.data().sessionPresenters);
    ```
  - Expected: a `sessionPresenters` map with one entry keyed by the session date (`YYYY-MM-DD`), value `{ uid, name }` matching your selection.

- [ ] **Step 5.5: End-to-end verify: takeAttendance → eventSummary spawn.**
  We need a `takeAttendance` interaction to test this branch. The cron (Phase 6) creates them on the session date, which is days away for `WORKFLOW-TEST-2`. To test now without waiting, manually insert one in the browser console:
  ```javascript
  const ev = (await firebase.firestore().collection('events').where('title','==','WORKFLOW-TEST-2').get()).docs[0];
  const sessionKey = ev.data().signupDates[0];  // first session
  const sp = (ev.data().sessionPresenters || {})[sessionKey] || { uid: window.currentUserData.uid, name: window.currentUserData.displayName };
  const ref = await firebase.firestore().collection('interactions').add({
    channel: 'Event Day', interactionType: 'Take Attendance',
    contactId: '', contactName: (ev.data().title || '') + ' — ' + sessionKey, contactType: '',
    summary: 'Take Attendance for: ' + ev.data().title, followUpDate: sessionKey,
    status: 'Open', isDraft: false, owner: sp.name, ownerUid: sp.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    workflowEventId: ev.id, workflowEventCollection: 'events',
    workflowStep: 'takeAttendance', workflowSessionKey: sessionKey
  });
  console.log('manual takeAttendance', ref.id);
  // Now close it
  await ref.update({ status: 'Closed', updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
  // Wait ~10s then re-query
  setTimeout(async () => {
    const q = await firebase.firestore().collection('interactions')
      .where('workflowEventId','==',ev.id).where('workflowStep','==','eventSummary').get();
    q.forEach(d => console.log('eventSummary spawned:', d.id, d.data().followUpDate, 'owner:', d.data().owner));
  }, 10000);
  ```
  Expected: an `eventSummary` interaction appears with `followUpDate` = session date + 10 days and owner = the session's presenter.

- [ ] **Step 5.6: Commit.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2
  git add functions/index.js firestore.indexes.json
  git commit -m "functions: add onInteractionUpdatedLifecycle (chain engine, phase 5)

Captures session presenter on assignPresenter close; spawns Event Summary
when Take Attendance closes; flips event to lifecycleStatus 'complete'
when all sessions' Event Summary interactions are closed. Includes
composite indexes for the workflow queries.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
  ```

---

## Phase 6 — `createDayOfAttendanceTasks` (daily cron)

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js` (append)

- [ ] **Step 6.1: Append the scheduled function.**

  Append to `functions/index.js` (after Phase 5):

  ```javascript
  async function _lcVerifyDisplayClosed(db, eventId) {
    const q = await db.collection("interactions")
      .where("workflowEventId", "==", eventId)
      .where("workflowStep", "==", "verifyDisplay")
      .limit(1).get();
    if (q.empty) return false;
    const x = q.docs[0].data() || {};
    return x.status === "Closed";
  }

  exports.createDayOfAttendanceTasks = functions
    .runWith({ timeoutSeconds: 540, maxInstances: 1 })
    .pubsub.schedule("0 5 * * *").timeZone("Pacific/Honolulu")
    .onRun(async () => {
      const db = admin.firestore();
      const nowHst = new Date(new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" }));
      const todayKey = nowHst.toISOString().slice(0, 10);

      const snap = await db.collection("events")
        .where("lifecycleStatus", "in", ["setup", "complete"])
        .get();

      let created = 0;
      for (const doc of snap.docs) {
        const ev = doc.data() || {};
        if (ev.archived === true) continue;
        const sessions = getEventSessions(ev) || [];
        const todaySession = sessions.find(s => _lcSessionKey(s) === todayKey);
        if (!todaySession) continue;
        const sessionKey = todayKey;

        // Idempotency
        const existing = await db.collection("interactions")
          .where("workflowEventId", "==", doc.id)
          .where("workflowStep", "==", "takeAttendance")
          .where("workflowSessionKey", "==", sessionKey)
          .limit(1).get();
        if (!existing.empty) continue;

        const verifyDone = await _lcVerifyDisplayClosed(db, doc.id);
        const sp = (ev.sessionPresenters && ev.sessionPresenters[sessionKey]) || null;
        let ownerUid, ownerName;
        if (sp && verifyDone) {
          ownerUid  = sp.uid;
          ownerName = sp.name;
        } else {
          ownerUid  = ev.createdByUid  || "";
          ownerName = ev.createdByName || "";
        }

        await db.collection("interactions").add(_lcBuildInteractionDoc({
          eventId: doc.id, eventTitle: ev.title || "",
          step: "takeAttendance", sessionKey,
          ownerUid, ownerName, dueDate: todayKey
        }));
        created++;
      }
      console.log("createDayOfAttendanceTasks:", todayKey, "created", created, "tasks");
      return null;
    });
  ```

- [ ] **Step 6.2: Deploy.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2
  firebase deploy --only functions:createDayOfAttendanceTasks --project ldah-932d5
  ```

- [ ] **Step 6.3: End-to-end verify (force-run).**

  To test without waiting for 5 AM, use the Cloud Scheduler "Force Run" via gcloud:
  ```bash
  gcloud scheduler jobs run firebase-schedule-createDayOfAttendanceTasks-us-central1 --location=us-central1 --project=ldah-932d5
  ```
  If `gcloud` isn't authed for this project, alternative: temporarily edit a fresh `WORKFLOW-TEST-3` event to have a session dated today via the CMS, then wait until the next 5 AM HST tick — or use the Firebase console's "Force run" button on the scheduled job.

  After running:
  ```javascript
  const ev = (await firebase.firestore().collection('events').where('title','==','WORKFLOW-TEST-2').get()).docs[0];
  const t = await firebase.firestore().collection('interactions')
    .where('workflowEventId','==',ev.id).where('workflowStep','==','takeAttendance').get();
  t.forEach(d => console.log('takeAttendance:', d.data().workflowSessionKey, '| owner:', d.data().owner));
  ```
  Expected: zero rows if no session of `WORKFLOW-TEST-2` is dated today; one row per today-session otherwise.

  **Cleaner test:** create `WORKFLOW-TEST-3` with `signupDates: ['<today-HST>']`, force-run the cron, expect a `takeAttendance` row with owner = creator (no handoff yet) due today.

- [ ] **Step 6.4: Commit.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2
  git add functions/index.js
  git commit -m "functions: add createDayOfAttendanceTasks daily cron (phase 6)

5 AM HST scheduled job. For each lifecycle event with a session dated
today, creates a Take Attendance interaction owned by that session's
presenter (or the creator as fallback if handoff not complete).
Idempotent per event+session.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
  ```

---

## Phase 7 — `onEventUpdatedLifecycle` (archive cleanup + summary auto-close)

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js` (append)

- [ ] **Step 7.1: Append the function.**

  Append to `functions/index.js` (after Phase 6):

  ```javascript
  exports.onEventUpdatedLifecycle = functions
    .runWith({ timeoutSeconds: 120, maxInstances: 10 })
    .firestore.document("events/{eventId}")
    .onUpdate(async (change, context) => {
      const before = change.before.data() || {};
      const after  = change.after.data()  || {};
      const eventId = context.params.eventId;
      if (!after.lifecycleStatus) return null; // not a workflow event

      const db = admin.firestore();

      // (a) Event newly archived -> auto-close open workflow interactions
      const becameArchived = after.archived === true && before.archived !== true;
      if (becameArchived) {
        const open = await db.collection("interactions")
          .where("workflowEventId", "==", eventId)
          .where("status", "==", "Open")
          .get();
        const batch = db.batch();
        open.forEach(d => batch.update(d.ref, {
          status: "Closed",
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          notes: ((d.data().notes || "") + "\n[auto] Closed: event archived.").trim()
        }));
        if (!open.empty) await batch.commit();
      }

      // (b) Event Summary form newly saved -> auto-close matching eventSummary task
      function summaryKeys(obj) {
        const out = new Set();
        if (!obj || typeof obj !== "object") return out;
        Object.keys(obj).forEach(k => {
          const v = obj[k];
          if (v && v.completedAt) out.add(k);
        });
        return out;
      }
      const beforeKeys = summaryKeys(before.sessionSummaries);
      const afterKeys  = summaryKeys(after.sessionSummaries);
      const newlySaved = [...afterKeys].filter(k => !beforeKeys.has(k));

      // Single-date events store the summary at events/{id}.summary
      const singleBefore = !!(before.summary && before.summary.completedAt);
      const singleAfter  = !!(after.summary  && after.summary.completedAt);
      if (singleAfter && !singleBefore) {
        const sessions = getEventSessions(after) || [];
        if (sessions.length > 0) {
          const k = _lcSessionKey(sessions[0]);
          if (k) newlySaved.push(k);
        }
      }

      for (const sk of newlySaved) {
        const q = await db.collection("interactions")
          .where("workflowEventId", "==", eventId)
          .where("workflowStep", "==", "eventSummary")
          .where("workflowSessionKey", "==", sk)
          .where("status", "==", "Open")
          .limit(1).get();
        if (q.empty) continue;
        await q.docs[0].ref.update({
          status: "Closed",
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          notes: ((q.docs[0].data().notes || "") + "\n[auto] Closed: Event Summary form saved.").trim()
        });
      }

      return null;
    });
  ```

- [ ] **Step 7.2: Add the (workflowEventId, workflowStep, workflowSessionKey, status) index if needed.**

  The Event Summary auto-close query uses an extra `status == Open` predicate. Firestore may demand a four-field composite. Try the deploy below; if a Firestore error suggests creating an index, click the link in the error or add it to `firestore.indexes.json` and redeploy. The earlier three-field (workflowEventId, workflowStep, workflowSessionKey) index from Phase 5 may suffice if the query uses it + an in-memory filter.

- [ ] **Step 7.3: Deploy.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2
  firebase deploy --only functions:onEventUpdatedLifecycle --project ldah-932d5
  ```

- [ ] **Step 7.4: End-to-end verify (a) — archive cleanup.**
  In STAGE LDAH-Int:
  - Open `WORKFLOW-TEST-2` in CMS and **archive** it.
  - Wait ~10s. In the console:
    ```javascript
    const ev = (await firebase.firestore().collection('events').where('title','==','WORKFLOW-TEST-2').get()).docs[0];
    const open = await firebase.firestore().collection('interactions')
      .where('workflowEventId','==',ev.id).where('status','==','Open').get();
    console.log('still Open:', open.size);
    ```
  - Expected: `0`. All previously-open workflow interactions now Closed with note `[auto] Closed: event archived.`.

- [ ] **Step 7.5: End-to-end verify (b) — Event Summary auto-close.**
  Create a fresh `WORKFLOW-TEST-4` with one session dated yesterday (so it has a Take Attendance + Event Summary path). Manually fast-forward by inserting a `takeAttendance` interaction and closing it (similar to Phase 5.5), then save the Event Summary form via the CMS for that session. In the console verify the matching `eventSummary` interaction now has `status: 'Closed'` and the auto note.

- [ ] **Step 7.6: Commit.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2
  git add functions/index.js
  # if you added a fourth index, also add firestore.indexes.json
  git commit -m "functions: add onEventUpdatedLifecycle (archive + summary auto-close, phase 7)

Auto-closes open workflow interactions when an event is archived.
Auto-closes the matching eventSummary interaction when the Event
Summary form for a session is saved (completedAt set on
sessionSummaries[key] or summary).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
  ```

---

## Phase 8 — End-to-end walkthrough (spec §8)

This is the full verification protocol from the spec. Run it after all four CFs are deployed and the STAGE UI changes are in place. Use a clean throwaway event.

- [ ] **Step 8.1: Cleanup any lingering test data.**
  Delete `WORKFLOW-TEST-*` events and all their interactions:
  ```javascript
  const evs = await firebase.firestore().collection('events').where('title','>=','WORKFLOW-TEST').where('title','<','WORKFLOW-TEST~').get();
  for (const e of evs.docs) {
    const ix = await firebase.firestore().collection('interactions').where('workflowEventId','==',e.id).get();
    await Promise.all(ix.docs.map(d => d.ref.delete()));
    await e.ref.delete();
    console.log('deleted', e.id);
  }
  ```

- [ ] **Step 8.2: Create a throwaway 2-session event.**
  In STAGE CMS → Events → create `WORKFLOW-TEST-FINAL` with `signupDates` = `[<today HST>, <today + 3d HST>]`, `startDate` = today, `eventDate` = today.

- [ ] **Step 8.3: Confirm setup tasks.**
  ```javascript
  const ev = (await firebase.firestore().collection('events').where('title','==','WORKFLOW-TEST-FINAL').get()).docs[0];
  const ix = await firebase.firestore().collection('interactions').where('workflowEventId','==',ev.id).get();
  ix.forEach(d => console.log(d.data().workflowStep, '|', d.data().workflowSessionKey, '| owner:', d.data().owner, '| due:', d.data().followUpDate));
  ```
  Expected: 5 rows — 1 `verifyDisplay` (sessionKey empty, owner = you), 2 `assignPresenter` (one per session date, owner = La'a), 2 `sendAnnouncement` (one per session date, owner = you). All `followUpDate` = `startDate` = today.

- [ ] **Step 8.4: Close the first session's Assign Presenter with a presenter.**
  Open the Assign Presenter row for session 1 in the Interactions tab; pick yourself as presenter; Status → Closed; Save. Verify `event.sessionPresenters[<session1>]` = `{ uid, name }`.

- [ ] **Step 8.5: Close Verify Display.**
  Open the Verify Display row; Status → Closed; Save. (No presenter prompt — only assignPresenter shows the dropdown.)

- [ ] **Step 8.6: Confirm session 1 has handed off but session 2 has not.**
  - `event.sessionPresenters` has session 1's key but not session 2's.
  - `verifyDisplay` interaction is Closed.

- [ ] **Step 8.7: Force-run the day-of cron.**
  ```bash
  gcloud scheduler jobs run firebase-schedule-createDayOfAttendanceTasks-us-central1 --location=us-central1 --project=ldah-932d5
  ```
  Re-query interactions. Expected: a `takeAttendance` row for session 1 (today) owned by you (the session 1 presenter). None yet for session 2 (its date isn't today).

- [ ] **Step 8.8: Close the Take Attendance interaction.**
  In the Interactions tab, open the Take Attendance row, set Status → Closed, Save. Wait ~10s.

- [ ] **Step 8.9: Confirm Event Summary spawned.**
  ```javascript
  const ev = (await firebase.firestore().collection('events').where('title','==','WORKFLOW-TEST-FINAL').get()).docs[0];
  const sums = await firebase.firestore().collection('interactions')
    .where('workflowEventId','==',ev.id).where('workflowStep','==','eventSummary').get();
  sums.forEach(d => console.log(d.data().workflowSessionKey, '| due:', d.data().followUpDate, '| owner:', d.data().owner));
  ```
  Expected: one `eventSummary` row for session 1, due = today + 10 days, owner = you.

- [ ] **Step 8.10: Save the Event Summary form via the CMS for session 1.**
  CMS → Events → View Signups on `WORKFLOW-TEST-FINAL` → Event Summary tab for session 1 → fill any required fields → Save Summary. Wait ~10s.

- [ ] **Step 8.11: Confirm auto-close.**
  ```javascript
  const sums = await firebase.firestore().collection('interactions')
    .where('workflowEventId','==',ev.id).where('workflowStep','==','eventSummary').get();
  sums.forEach(d => console.log(d.data().workflowSessionKey, '| status:', d.data().status, '| notes:', d.data().notes));
  ```
  Expected: session 1's `eventSummary` is `Closed`, notes include `[auto] Closed: Event Summary form saved.`. Event is **not** yet `complete` (session 2 still has nothing).

- [ ] **Step 8.12: Repeat for session 2.**
  Wait for session 2's date (or simulate by editing `signupDates[1]` to today and re-running the cron). Close that session's `assignPresenter` with a presenter, then the day-of `takeAttendance`, save its Event Summary form. Confirm `lifecycleStatus === 'complete'` on the event.

- [ ] **Step 8.13: Archive the test event and confirm no orphan interactions remain.**
  CMS → archive `WORKFLOW-TEST-FINAL`. Re-query interactions:
  ```javascript
  const open = await firebase.firestore().collection('interactions')
    .where('workflowEventId','==',ev.id).where('status','==','Open').get();
  console.log('Open after archive:', open.size);
  ```
  Expected: `0`.

- [ ] **Step 8.14: Final cleanup.**
  Delete `WORKFLOW-TEST-FINAL` and its interactions per the snippet in 8.1.

---

## Phase 9 — Copy STAGE → live, version bump, push

- [ ] **Step 9.1: Copy the STAGE edits into root `index.html`.**

  Per `feedback_stage-to-live-copy`: **copy the tested file**, don't re-apply diffs independently. The simplest reliable approach is to copy only the changed blocks (the three you edited in Phases 1 and 4) from `STAGE/index.html` into the same regions of root `index.html`.

  Use a side-by-side diff:
  ```bash
  diff -u /Volumes/Xcode_Projects/React/LDAH-Internal/index.html /Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html | less
  ```
  Apply the same three edits (Phase 1 createBranch, Phase 4 presenter dropdown HTML, Phase 4 `changeInteractionStatus` rewrite) to root `index.html`. Save.

- [ ] **Step 9.2: Bump the visible LDAH-Int version to `v124.0.0` in root `index.html`.**

  Find the version string:
  ```bash
  grep -n "v123\.1\." /Volumes/Xcode_Projects/React/LDAH-Internal/index.html | head -5
  ```
  Replace `v123.1.x` → `v124.0.0` everywhere it appears (header label, document title, any `?v=` cache-bust query strings on local script/style includes). Also bump STAGE's `v123.1.8` to `v124.0.0` so they stay aligned.

- [ ] **Step 9.3: Visual smoke-test root LDAH-Int.**

  Reload `https://danpoahu.github.io/LDAH-Int/` (or however live is served), confirm the version label reads `v124.0.0`, and create one final clean throwaway event end-to-end to confirm the chain still fires (live UI now stamps `createdByUid`, so the workflow triggers). Delete the test event when done.

- [ ] **Step 9.4: Commit + push LDAH-Int.**
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH-Internal
  git add STAGE/index.html index.html
  git commit -m "v124.0.0: event-lifecycle interactions automation

Stamps creator on event save and adds presenter capture at close for
assignPresenter workflow interactions. STAGE tested; copied to live.
Cloud Functions deployed separately to ldah-932d5.

Spec: docs/superpowers/specs/2026-05-22-event-lifecycle-interactions-design.md
Plan: docs/superpowers/plans/2026-05-22-event-lifecycle-interactions.md

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
  git push
  ```

- [ ] **Step 9.5: Confirm W2 functions repo is fully pushed.**

  Phases 2, 5, 6, 7 each committed locally. Now push:
  ```bash
  cd /Volumes/Xcode_Projects/React/LDAH_W2
  git status --short
  git log --oneline -10
  git push
  ```

- [ ] **Step 9.6: Update project memory.**

  Append a one-line index entry to `/Users/danielpellegrini/.claude/projects/-Users-danielpellegrini/memory/MEMORY.md` under Pending → "(✓ Done)" or move the related entry. Also create a topic file at `memory/project_event-lifecycle-interactions.md` capturing: shipped 2026-05-22 as LDAH-Int v124.0.0; CFs `onEventCreatedLifecycle`, `onInteractionUpdatedLifecycle`, `createDayOfAttendanceTasks` (5 AM HST), `onEventUpdatedLifecycle` on `ldah-932d5`; gated on `event.createdByUid` + `event.lifecycleStatus`; presenter captured at assignPresenter close into `event.sessionPresenters[sessionKey]`; events-only (Programs out of scope).

---

## Self-review (run after writing the plan; fix inline if needed)

**Spec coverage check** — every section of the spec mapped to a task:

| Spec section | Plan coverage |
|---|---|
| §1 Purpose | Whole plan |
| §2 Scope (events only, post-ship, per-session) | Phases 2, 6 guards (`if (!ev.createdByUid) skip`, `lifecycleStatus` filter) |
| §3 Workflow diagram + step detail | Phases 2, 5, 6 |
| §4.1 Event fields (createdByUid, sessionPresenters, lifecycleStatus) | Phases 1 (stamp), 2 (set status), 5 (set sessionPresenters), 5 (set complete) |
| §4.2 Interaction fields (workflowEventId/Step/SessionKey, assignedPresenterUid) | Phases 2 (write at create), 4 (write at close), 5/6/7 (query) |
| §4.3 Channel / type display names | Phase 2 `LIFECYCLE_CHANNELS` constant |
| §4.4 Display (event title in contactName) | Phase 2 sets `contactName = title + " — " + sessionKey`; Phase 3 visual confirmation |
| §5 Components A–F | A=Phase 1, B=Phase 2, C=Phase 5, D=Phase 6, E=Phase 7, F=Phase 3+4 |
| §6.1 onEventCreatedLifecycle | Phase 2 |
| §6.2 onInteractionUpdatedLifecycle (all branches) | Phase 5 |
| §6.3 day-of cron with fallback | Phase 6 |
| §6.4 Presenter capture + guardrail (client + server) | Phase 4 (client) + Phase 5 assignPresenter branch (server) |
| §6.5 Event Summary auto-close on form save | Phase 7 |
| §7 Edge cases (idempotency, archive, missing presenter, edited dates, no-backfill, manual reassign, announcements optional, blank-presenter recovery) | Phase 2 idempotency helper, Phase 7 archive, Phase 5 re-open, Phase 6 reads sessions each run, Phase 2 createdByUid guard, no enforcement of manual edits anywhere, no announcements gating anywhere, Phase 5 re-open |
| §8 Testing & rollout | Phase 8 walkthrough + Phase 9 push |

**Placeholder scan** — none. The only `REPLACE_WITH_LAAS_UID` token is explicitly called out as a pre-flight step (P.3) with the exact console snippet to resolve it.

**Type / name consistency** — `workflowStep` values (`assignPresenter`/`verifyDisplay`/`sendAnnouncement`/`takeAttendance`/`eventSummary`) are identical in Phases 2, 4, 5, 6, 7. `LIFECYCLE_CHANNELS` keys match. `sessionPresenters` map key is the session date key from `getEventSessions` (`s.dateKey || s.rawString`) consistently across Phases 5 and 6.

---

## Execution handoff

Plan complete and saved to `/Volumes/Xcode_Projects/React/LDAH-Internal/docs/superpowers/plans/2026-05-22-event-lifecycle-interactions.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per phase, review between phases, fast iteration.
2. **Inline Execution** — Execute phases in this session using `superpowers:executing-plans`, batch execution with checkpoints.

Which approach?
