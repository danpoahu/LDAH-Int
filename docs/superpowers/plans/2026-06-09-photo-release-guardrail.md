# Photo Release Guardrail — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hold a partner's person-photo off the live Pacific page until everyone in it e-signs a release; then auto-publish, notify La'a + the partner with tasks (La'a's has a Revert), and chase stalls.

**Architecture:** New `photoReleases` Firestore collection driven by 4 new (additive, safe) Cloud Functions on `ldah-932d5` + 1 daily cron. A new public `photo-release.html` signing page on W2 (modeled on `connect-gen-consent.html`). The editor is the **-Int CMS WYSIWYG page editor** — a guardrail in `cmsUploadPagePhoto` (index.html:30045) intercepts a gallery-photo change to suspend-and-request instead of writing the live slot. Each island's editor shows an inline **"Awaiting Photo Release"** grid below its 9 live gallery slots (max 9 pending, one per slot). La'a (he/him) gets a verify-with-Revert task when a pending photo promotes to live. Tasks are `interactions` docs (the project's existing task model); the partner is also emailed because partners are rarely in -Int.

**Scope now / later:** Build for the **6 Pacific island galleries** (`samoaPhoto1…9`, `cnmiPhoto1…9`, `fsmPhoto1…9`, `guamPhoto1…9`, `marshallPhoto1…9`, `palauPhoto1…9` — all in `pageContent` doc `pacific`). Design generic (keyed by `island`/`fieldKey`/`slot`) so extending the same guardrail to other CMS pages/galleries later is additive, not a rewrite. Hero/Flag/Contact photos are out of scope for v1 (gallery only).

**Tech Stack:** Vanilla JS, Firebase (Auth/Firestore/Storage/Functions Gen-1), Resend email API, `emailLog` audit, `Pacific/Honolulu` pubsub crons.

**Verification note (codebase reality):** These repos have **no unit-test runner**. Per-task verification uses: (a) `firebase emulators` or a Node `firebase-admin` inspect script in `/Volumes/Xcode_Projects/Reports/migrations/`, and (b) manual STAGE testing on desktop + iPad. "Write the failing test" steps are replaced by explicit **acceptance checks** with commands/expected output.

**Conventions to honor** (from project memory): STAGE-first then copy to live; bump -Int version on every push; no emojis in LDAH products; `serverTimestamp()` is rejected inside arrays (use `Timestamp.now()`); every new collection needs an explicit firestore rule; cron "days since" comparisons use slack, not exact N×24h; helper CF changes only ship if the exported trigger is redeployed; `emailLog` writes must include `sentAt`.

---

## File Map

| File | Repo | Responsibility | Create/Modify |
|---|---|---|---|
| `functions/photoRelease.js` | W2 | All photo-release CF logic (helpers + 4 handlers + cron body) in one focused module | Create |
| `functions/index.js` | W2 | Re-export the 4 triggers + cron from the module | Modify |
| `firestore.rules` | W2 (+ STAGE copy) | `photoReleases` rule | Modify |
| `photo-release.html` | W2 `STAGE/` then root | Public token signing page (external family member) | Create |
| `index.html` — `cmsUploadPagePhoto` (~30045) | -Int `STAGE/` then root | Guardrail dialog + <1MB JPEG + suspend-on-change for gallery photos | Modify |
| `index.html` — `_pe2IslandRenderer` (~30751) | -Int `STAGE/` then root | Inline per-island "Awaiting Photo Release" pending grid below live gallery | Modify |
| `index.html` — My Day render (~5103) | -Int `STAGE/` then root | Revert/cancel task actions + `workflowStep` buttons | Modify |
| inspect/seed scripts | `Reports/migrations/` | emulator/live verification | Create as needed |

**Release text + version** live as constants in `functions/photoRelease.js`: `PHOTO_RELEASE_TEXT` and `PHOTO_RELEASE_VERSION = "06/2026; v1"`. Draft delivered to Daniel as HTML preview before live promotion (see Task 11).

---

## Data model — `photoReleases/{releaseId}`

```js
{
  pageKey,            // Firestore doc in pageContent — "pacific" for all islands (v1)
  island,             // CMS subpage key: "americansamoa"|"cnmi"|"fsm"|"guam"|"marshallislands"|"palau"
  fieldKey,           // exact live slot to fill on promotion, e.g. "samoaPhoto3"
  slot,               // 1..9 (the gallery slot number) — drives the inline pending grid
  requestedBy,        // partner auth uid (== userRoles doc id == interactions.ownerUid)
  requestedByEmail,
  requestedByName,
  requestedAt,        // serverTimestamp()
  newPhotoUrl,        // suspended (pending) image URL in Storage (<1MB JPEG)
  previousPhotoUrl,   // current pageContent.pacific[fieldKey] at request time ("" if empty slot)
  subjectCount,       // N declared in the dialog
  subjects: [         // length N; NO serverTimestamp() inside (use Timestamp.now())
    { email, token, status: "pending"|"signed", signedAt?, signedName?, signedIp? }
  ],
  state: "awaiting" | "live" | "reverted" | "cancelled",
  consentVersion,     // PHOTO_RELEASE_VERSION
  publishedAt?,       // serverTimestamp() when auto-published
  reminder15SentAt?,  // serverTimestamp() once 15-day reminder fired
  stall30TaskAt?,     // serverTimestamp() once 30-day stall task fired
  revertedAt?, cancelledAt?
}
```
Tokens: 32-hex per subject, globally unique; `getPhotoRelease`/`submitPhotoRelease` look up by `where('tokenIndex','array-contains', token)` where `tokenIndex: [token1, token2,...]` is stored at top level.

**Inline pending query (per island editor):** `where('island','==',<island>).where('state','==','awaiting')` → render one tile per result, slotted by `slot`. **Caps:** block a new request if that island already has **9** `awaiting` releases, or if the chosen `slot` already has an `awaiting` release (one pending per slot). Promotion writes `pageContent.pacific[fieldKey]=newPhotoUrl` and flips `state:"live"`, freeing the slot from Pending.

---

## Phase 0 — Foundations

### Task 1: `photoReleases` security rule + release-text module skeleton

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/firestore.rules`
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/STAGE/firestore.rules` (keep in sync)
- Create: `/Volumes/Xcode_Projects/React/LDAH_W2/functions/photoRelease.js`

- [ ] **Step 1: Add the rule** (after the `interactions` block, ~line 186 of `firestore.rules`). All writes are server-side (Admin SDK bypasses rules); clients only read.

```
match /photoReleases/{docId} {
  allow read: if request.auth != null;
  allow write: if false; // Cloud Functions (Admin SDK) only
}
```

- [ ] **Step 2: Mirror the same block** into `STAGE/firestore.rules`.

- [ ] **Step 3: Create `functions/photoRelease.js`** with constants + helpers stub (exports filled in later tasks):

```js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const crypto = require("crypto");

const db = admin.firestore;           // call admin.firestore() at use sites
const FieldValue = admin.firestore.FieldValue;
const Timestamp = admin.firestore.Timestamp;

const PHOTO_RELEASE_VERSION = "06/2026; v1";
const PHOTO_RELEASE_TEXT = `__DRAFT_DELIVERED_TO_DANIEL_BEFORE_LIVE__`; // replaced in Task 11 with approved copy

// Base URL for the public signing link (STAGE vs live set in Task 11)
const SIGNING_BASE_URL = "https://danpoahu.github.io/LDAH_W2/STAGE/photo-release.html"; // -> https://ldahawaii.org/photo-release.html at live

const LAA_EMAIL = "LSalvani@LDAHawaii.org";

function newToken() { return crypto.randomBytes(16).toString("hex"); }

async function lookupUidByEmail(email) {
  const snap = await admin.firestore().collection("userRoles")
    .where("email", "==", email).limit(1).get();
  return snap.empty ? null : snap.docs[0].id;
}

module.exports = { PHOTO_RELEASE_VERSION, PHOTO_RELEASE_TEXT, SIGNING_BASE_URL, LAA_EMAIL, newToken, lookupUidByEmail };
```

- [ ] **Step 4: Acceptance check** — rules compile:

```bash
cd /Volumes/Xcode_Projects/React/LDAH_W2 && firebase deploy --only firestore:rules --dry-run
```
Expected: no syntax error; lists `photoReleases` change.

- [ ] **Step 5: Commit** (`git add firestore.rules STAGE/firestore.rules functions/photoRelease.js && git commit -m "feat(photo-release): collection rule + module skeleton"`).

---

## Phase 1 — Backend Cloud Functions

> All four handlers + cron live in `functions/photoRelease.js` and are re-exported from `index.js`. Reuse the existing Resend sender. Add a small local `sendMail({to,subject,html,type,...})` that POSTs to `https://api.resend.com/emails` with `process.env.RESEND_API_KEY`, FROM `process.env.SMTP_FROM`, and writes `emailLog` with `sentAt: FieldValue.serverTimestamp()` (mirror `sendEmailViaResend`, found at `functions/index.js:8939`).

### Task 2: `createPhotoReleaseRequest` (callable HTTPS)

**Files:** Modify `functions/photoRelease.js`, `functions/index.js`.

Input (POST JSON from page-admin): `{ pageKey, fieldKey, island, newPhotoUrl, previousPhotoUrl, requestedBy, requestedByEmail, requestedByName, emails: [..] }`. Validates emails non-empty, mints a token per email, writes the `photoReleases` doc (`state:"awaiting"`, subjects built with `Timestamp.now()`-free entries), sends each subject a signing email, returns `{ releaseId }`.

- [ ] **Step 1: Implement** `exports.createPhotoReleaseRequest = functions.runWith({secrets:["RESEND_API_KEY","SMTP_FROM"]}).https.onRequest(...)` with CORS (mirror existing onRequest CFs). Build `subjects` and `tokenIndex`, `db.collection("photoReleases").add(doc)`, then `for (const s of subjects) await sendMail({to:s.email, subject:"Please sign a photo release for LDAH", html: releaseEmailHtml(SIGNING_BASE_URL + "?token=" + s.token, requestedByName), type:"photo-release-request"})`.
- [ ] **Step 2: Re-export** in `index.js`: `exports.createPhotoReleaseRequest = require("./photoRelease").createPhotoReleaseRequest;` (and same for later tasks).
- [ ] **Step 3: Acceptance check (emulator)**:

```bash
cd /Volumes/Xcode_Projects/React/LDAH_W2 && firebase emulators:start --only functions,firestore &
# POST a sample payload with curl; expect {releaseId:...} and a photoReleases doc with 2 pending subjects.
```
Expected: doc created, `subjects[].status === "pending"`, `tokenIndex.length === emails.length`.
- [ ] **Step 4: Commit.**

### Task 3: `getPhotoRelease` (HTTPS) — token → context

**Files:** Modify `functions/photoRelease.js`, `index.js`.

- [ ] **Step 1: Implement** `onRequest`: read `?token=`, `where("tokenIndex","array-contains",token).limit(1)`. If not found / already signed / doc not `awaiting` → return `{ status:"used"|"notfound" }`. Else return `{ status:"ok", consentText: PHOTO_RELEASE_TEXT, version: PHOTO_RELEASE_VERSION, requestedByName, island }`.
- [ ] **Step 2: Acceptance check** — curl with a real token returns `status:"ok"` + text; bogus token returns `notfound`.
- [ ] **Step 3: Commit.**

### Task 4: `submitPhotoRelease` (HTTPS) — record signature, publish when complete

**Files:** Modify `functions/photoRelease.js`, `index.js`.

- [ ] **Step 1: Implement** `onRequest` POST `{ token, typedName, agree }`:
  1. Validate `agree===true` and `typedName` non-empty; find doc by `tokenIndex`.
  2. In a `runTransaction`: locate the subject by token; if already signed → return early; set `status:"signed", signedAt: Timestamp.now(), signedName: typedName, signedIp: req.ip`. Recompute "all signed".
  3. After txn: **email the partner a progress note** (`type:"photo-release-progress"`, "X of N signed").
  4. **If all signed:** write photo to live — `admin.firestore().collection("pageContent").doc(pageKey).set({[fieldKey]: newPhotoUrl, updatedAt: FieldValue.serverTimestamp()}, {merge:true})`; set release `state:"live", publishedAt`. Then create two tasks + notifications + partner email (Task 6 helper `createVerifyTasks(release)`).
  5. Return `{ status:"signed", complete: <bool> }`.
- [ ] **Step 2: Acceptance check (emulator)** — sign subject 1 → doc still `awaiting`, partner progress email logged. Sign subject 2 → `pageContent.pacific[fieldKey]` updated to `newPhotoUrl`, release `state:"live"`, two `interactions` tasks (`workflowStep:"photoReleaseVerify"`) + two `notifications` created. (Use a spare/empty gallery slot as the test target so no real photo is disturbed.)
- [ ] **Step 3: Commit.**

### Task 5: `createVerifyTasks` + `createStallTask` helpers (task/notification writers)

**Files:** Modify `functions/photoRelease.js`.

Tasks are `interactions` docs matching the project model. La'a verify task carries `workflowStep:"photoReleaseVerify"` + `photoReleaseId`; partner gets `workflowStep:"photoReleaseVerify"` too (button label differs by `ownerUid` vs requester — see Task 10). Stall task: `workflowStep:"photoReleaseStall"`.

- [ ] **Step 1: Implement** `createVerifyTasks(releaseId, release)`:
```js
async function createTask({ownerUid, owner, summary, followUpDate, workflowStep, photoReleaseId, notesExtra}) {
  const ref = await admin.firestore().collection("interactions").add({
    channel: "System", interactionType: "Photo Release",
    summary, notes: notesExtra || "", status: "Open",
    ownerUid, owner, followUpDate,
    workflowStep, photoReleaseId,
    createdBy: "System", createdByUid: "system",
    createdAt: FieldValue.serverTimestamp()
  });
  return ref.id;
}
async function notify(uid, name, title, message, interactionId) {
  await admin.firestore().collection("notifications").add({
    recipientUid: uid, recipientName: name || "", type: "photo-release",
    title, message: message || "", interactionId: interactionId || "",
    changeRequestId: "", editUnlockId: "", editUsed: false, read: false,
    createdAt: FieldValue.serverTimestamp()
  });
}
```
`createVerifyTasks` resolves La'a uid via `lookupUidByEmail(LAA_EMAIL)`, creates La'a + partner tasks (today's date string `followUpDate` so they hit My Day), notifies each, and **emails the partner** ("Your new photo is live — please verify"). `today` is passed in from the cron/handler (never `Date.now()` inside a workflow script context — here it's a live CF so `new Date()` is fine; format `YYYY-MM-DD` in `Pacific/Honolulu`).
- [ ] **Step 2: Implement** `createStallTask(releaseId, release, missingEmails)` → one task each to La'a + partner, `workflowStep:"photoReleaseStall"`, notes list the missing emails; email the partner.
- [ ] **Step 3: Acceptance check** — unit-invoke via emulator shell or a node script: calling `createVerifyTasks` yields 2 `interactions` with `workflowStep:"photoReleaseVerify"` and 2 `notifications`.
- [ ] **Step 4: Commit.**

### Task 6: `photoReleaseReminders` daily cron (15-day reminder, 30-day stall)

**Files:** Modify `functions/photoRelease.js`, `index.js`.

- [ ] **Step 1: Implement**:
```js
exports.photoReleaseReminders = functions
  .runWith({ timeoutSeconds: 540, maxInstances: 1, secrets:["RESEND_API_KEY","SMTP_FROM"] })
  .pubsub.schedule("0 7 * * *").timeZone("Pacific/Honolulu")
  .onRun(async () => {
    const now = Date.now();
    const DAY = 86400000, SLACK = 0.5 * DAY; // gap slack
    const snap = await admin.firestore().collection("photoReleases").where("state","==","awaiting").get();
    for (const d of snap.docs) {
      const r = d.data();
      const ageMs = now - r.requestedAt.toDate().getTime();
      const missing = r.subjects.filter(s => s.status !== "signed");
      if (!missing.length) continue;
      if (ageMs >= 30*DAY - SLACK && !r.stall30TaskAt) {
        await createStallTask(d.id, r, missing.map(s=>s.email));
        await d.ref.update({ stall30TaskAt: FieldValue.serverTimestamp() });
      } else if (ageMs >= 15*DAY - SLACK && !r.reminder15SentAt) {
        for (const s of missing) await sendMail({to:s.email, subject:"Reminder: please sign your LDAH photo release", html: reminderHtml(SIGNING_BASE_URL+"?token="+s.token), type:"photo-release-reminder15"});
        // cc partner
        await sendMail({to:r.requestedByEmail, subject:"Photo release still pending", html: reminderPartnerHtml(r, missing), type:"photo-release-reminder15-partner"});
        await d.ref.update({ reminder15SentAt: FieldValue.serverTimestamp() });
      }
    }
    return null;
  });
```
- [ ] **Step 2: Acceptance check** — seed a `photoReleases` doc with `requestedAt` 16 days ago via inspect script; run the cron in emulator; expect `reminder15SentAt` set + reminder emails logged. Seed one 31 days ago → `stall30TaskAt` set + stall tasks created.
- [ ] **Step 3: Commit + deploy the new functions** (additive, safe):
```bash
firebase deploy --only functions:createPhotoReleaseRequest,functions:getPhotoRelease,functions:submitPhotoRelease,functions:photoReleaseReminders
```

---

## Phase 2 — Public signing page

### Task 7: `STAGE/photo-release.html`

**Files:** Create `/Volumes/Xcode_Projects/React/LDAH_W2/STAGE/photo-release.html` (model on `STAGE/connect-gen-consent.html`).

- [ ] **Step 1:** Build the page: parse `?token=`, `fetch(getPhotoRelease)`, render the release text + requester/island context; show typed-legal-name input (italic signature style) + agreement checkbox + "Sign and Submit"; on submit `fetch(submitPhotoRelease)`; success state ("Thank you — your release is recorded"); used/expired state. No emojis. Endpoints point at the deployed CF URLs `https://us-central1-ldah-932d5.cloudfunctions.net/...`.
- [ ] **Step 2: Acceptance check** — open the STAGE URL with a real pending token on desktop + iPad; signing flips the subject to `signed` and (when last) publishes to the test pageKey.
- [ ] **Step 3: Commit.**

---

## Phase 3 — Editor guardrail (in -Int CMS)

### Task 8: `cmsUploadPagePhoto` — count dialog, <1MB JPEG, suspend gallery changes

**Files:** Modify `/Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html` (then copy to root). Target function `cmsUploadPagePhoto` (~line 30045) and the photo render handlers that call it.

- [ ] **Step 1: Enforce <1MB JPEG** — after `autoCropImage(file)`, if the resulting blob `> 1_000_000` bytes, re-encode via a canvas helper `ensureUnderOneMB(blob)` that steps JPEG quality down (0.85→0.5) and/or max dimension until `<1MB`. Keep `image/jpeg` output. (`autoCropImage` already returns a jpg; this just guarantees the ceiling.)
- [ ] **Step 2: Detect gallery photos** — add `isGalleryField(fieldKey)` → true when `/Photo[1-9]$/.test(fieldKey)` (samoaPhoto3, guamPhoto7, …). Non-gallery photos (Hero/Flag/Contact) keep current direct-write behavior in v1.
- [ ] **Step 3: Guardrail dialog** — in `cmsUploadPagePhoto`, when `isGalleryField(fieldKey)`: upload the <1MB blob to Storage as today (so we have `newPhotoUrl`), but **before** the `pageContent` `.set()`, open a modal: **"How many people in this photo need to sign a release?"** (number, default 0) + helper text.
  - `0` → keep current behavior: write `pageContent.pacific[fieldKey]=url`.
  - `N≥1` → reveal N email inputs. On confirm: check caps (island `awaiting` < 9 and this `slot` has no `awaiting`); if blocked, toast the reason and stop. Else POST to `createPhotoReleaseRequest` with `{pageKey:'pacific', island:_cmsPageEditorActive, fieldKey, slot:<n from fieldKey>, newPhotoUrl:url, previousPhotoUrl: <current d[fieldKey]||''>, requestedBy: firebase.auth().currentUser.uid, requestedByEmail: firebase.auth().currentUser.email, requestedByName:<displayName>, emails:[...]}`; **do NOT write `pageContent`**. Toast: "Photo held — release sent to N recipient(s). It publishes once all sign," and refresh the editor so the photo shows in the Pending grid (Task 9), not the live slot.
- [ ] **Step 4: Acceptance check** — on STAGE -Int CMS, Samoa gallery slot 3: 0-people publishes to `pacific.samoaPhoto3`; 2-people creates a `photoReleases` doc (island `americansamoa`, slot 3) and leaves `pacific.samoaPhoto3` unchanged. Held blob is <1MB JPEG. Caps: 10th pending on an island, or 2nd pending on the same slot, is blocked with a toast.
- [ ] **Step 5: Commit + bump -Int version.**

---

## Phase 4 — LDAH-Int

### Task 9: Inline per-island "Awaiting Photo Release" pending grid

**Files:** Modify `/Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html` (then copy to root) — `_pe2IslandRenderer` (~line 30751), injecting after the gallery grid (before `return html;` ~30779).

- [ ] **Step 1:** When an island page renders, fetch its pending releases once: `firebase.firestore().collection('photoReleases').where('island','==',pg).where('state','==','awaiting').get()` into a module cache `_photoPendingByIsland[pg]` (refresh on editor load + after a new request). Render a second section below the live gallery:
```js
html += '<div class="pe2-section" style="background:#fffbeb"><div class="pe2-section-head"><span class="pe2-section-badge">Pending</span><h2 style="font-size:1.2rem">Awaiting Photo Release</h2></div>';
html += '<div class="pe2-gallery-grid">';
(_photoPendingByIsland[pg]||[]).forEach(function(r){
  var signed=(r.subjects||[]).filter(function(s){return s.status==='signed';}).length;
  html += '<div class="pe2-card" style="text-align:center;opacity:.9">'
    + '<img src="'+(r.newPhotoUrl||'')+'" class="pe2-gallery-thumb" style="filter:grayscale(.2)" onerror="this.style.display=\'none\'">'
    + '<div style="font-size:.72rem;font-weight:700;color:#b45309;margin-top:6px">Slot '+r.slot+' &middot; '+signed+' of '+(r.subjectCount||(r.subjects||[]).length)+' signed</div>'
    + '<button class="cms-pe-photo-btn" style="margin-top:6px" onclick="photoPendingCancel(\''+r.id+'\')">Cancel</button>'
    + '</div>';
});
if(!(_photoPendingByIsland[pg]||[]).length) html += '<div style="grid-column:1/-1;color:#94a3b8;font-size:.85rem">No photos awaiting release.</div>';
html += '</div></div>';
```
- [ ] **Step 2:** `photoPendingCancel(id)` calls the `cancelPhotoRelease` CF (Task 10.4), then refreshes the editor.
- [ ] **Step 3: Acceptance check** — Samoa with 2 seeded pending releases shows 2 tiles with "Slot N · X of Y signed" under the live 9-grid, on desktop + iPad; Cancel removes one.
- [ ] **Step 4: Commit + bump -Int version** (per always-bump rule).

### Task 10: Revert task action + 30-day stall actions + `workflowStep` buttons

**Files:** Modify -Int `STAGE/index.html` My Day render (lines ~5103-5112) + add handlers.

- [ ] **Step 1:** In the action-button block add:
```js
else if(d.workflowStep==='photoReleaseVerify')
  actionBtn='<button class="btn" style="font-size:.72rem;padding:5px 11px;background:#d97706;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-top:7px;font-weight:600;align-self:flex-start;" onclick="event.stopPropagation();myDayPhotoVerify(\''+d._id+'\')">Review / Revert &rarr;</button>';
else if(d.workflowStep==='photoReleaseStall')
  actionBtn='<button class="btn" style="font-size:.72rem;padding:5px 11px;background:#b91c1c;color:#fff;border:none;border-radius:6px;cursor:pointer;margin-top:7px;font-weight:600;align-self:flex-start;" onclick="event.stopPropagation();myDayPhotoStall(\''+d._id+'\')">Resolve Stalled Release &rarr;</button>';
```
- [ ] **Step 2:** Implement `myDayPhotoVerify(interactionId)`: load the task's `photoReleaseId`, open a modal showing new vs previous photo + link to the live page; **Revert** button (visible to La'a/admin) calls a small new CF `revertPhotoRelease` (or, since rules block client writes, a callable) that restores `pageContent[pageKey][fieldKey]=previousPhotoUrl`, sets release `state:"reverted"`, and marks the task done. "Looks good" marks the task done (`status:"Closed"`).
- [ ] **Step 3:** Implement `myDayPhotoStall(interactionId)`: modal lists missing emails; **Cancel pending change** (calls CF to set `state:"cancelled"`, leaves live photo as-is, closes tasks) or **Keep waiting** (closes the stall task only).
- [ ] **Step 4: Add CF `revertPhotoRelease` / `cancelPhotoRelease`** in `photoRelease.js` (HTTPS callable, auth-gated to superAdmin/admin) + re-export + deploy.
- [ ] **Step 5: Acceptance check** — on STAGE: completing a release creates La'a's task with Review/Revert; Revert restores previous photo + flips state to reverted. Stall task offers cancel/keep.
- [ ] **Step 6: Commit + bump -Int version.**

---

## Phase 5 — Release copy + rollout

### Task 11: Approved release text, base-URL switch, promote to live

- [ ] **Step 1:** Replace `PHOTO_RELEASE_TEXT` with Daniel-approved wording; deliver an HTML preview (saved to `/Volumes/Xcode_Projects/Reports/`, opened in Safari) and get sign-off before live.
- [ ] **Step 2:** Copy `STAGE/photo-release.html` → root `photo-release.html`; set `SIGNING_BASE_URL` to `https://ldahawaii.org/photo-release.html`; redeploy functions.
- [ ] **Step 3:** Verify `diff` live vs STAGE for `page-admin.html` and -Int `index.html` is ONLY this change (per STAGE/live-drift rule), then copy STAGE→live.
- [ ] **Step 4:** Deploy `firestore:rules`; bump -Int version; commit + push everything (live = pushed).
- [ ] **Step 5: Acceptance check (live smoke):** one real 1-subject release end-to-end on a low-risk field; confirm hold → sign → publish → La'a/partner tasks + emails → revert works; then revert the smoke change.

---

## Self-Review

**Spec coverage:** A→guardrail dialog in `cmsUploadPagePhoto` (Task 8); 0-people bypass + gallery-only detection (Task 8); <1MB JPEG (Task 8.1); suspension + previousPhotoUrl + per-slot/9-island caps (Task 8 / model); B electronic release (Tasks 2,3,4,7); C auto-publish into the live slot + La'a (he) Revert task + partner task+email (Tasks 4,5,10); D 15/30-day cron (Task 6) + stall actions (Task 10); E inline per-island Pending grid replacing the global list (Task 9); F partner emails on each signature/all-live/15d/30d (Tasks 4,5,6). All covered.

**Placeholder scan:** Only intentional placeholder is `PHOTO_RELEASE_TEXT` (legal copy pending Daniel, resolved Task 11) — flagged, not silent.

**Type/name consistency:** `workflowStep` values `photoReleaseVerify`/`photoReleaseStall`, field names `photoReleaseId`, `island`/`fieldKey`/`slot`, `newPhotoUrl`/`previousPhotoUrl`, `tokenIndex`, helpers `createTask`/`notify`/`createVerifyTasks`/`createStallTask`/`lookupUidByEmail`/`cancelPhotoRelease`/`revertPhotoRelease` used consistently across Tasks 4–10.

**Open items resolved in-plan:** editor surface = **-Int CMS `cmsUploadPagePhoto`** (corrected — not W2 `page-admin.html`); pending UI = inline per-island grid in `_pe2IslandRenderer`; gallery-only v1 (Hero/Flag/Contact deferred); per-slot pending, cap 9/island; tasks = `interactions` docs; cron pattern confirmed; STAGE via additive CFs + test slot + GitHub-Pages STAGE URL; **La'a is he/him** in all copy.

**Future extension (noted, not built):** the same guardrail generalizes to other CMS galleries by reusing `isGalleryField`/`island`/`slot` with different field-key patterns — additive.
