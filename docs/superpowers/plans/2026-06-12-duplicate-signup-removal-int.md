# Duplicate Signup Removal (LDAH-Int, Part 1) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let LDAH-Int staff spot duplicate signups (same person + same event + overlapping active date) and remove the extra one with zero email sent.

**Architecture:** Pure, unit-tested detection/recommendation helpers live in the shared `formatters.js` (`LDAHFormat`). The single-file app (`index.html`) consumes them: it tags duplicate rows with a badge, opens a "Resolve duplicate" modal that recommends a keeper, and on confirm **hard-deletes** the other signup doc (the only path that fires no Cloud Function trigger), writes an Audit Log entry, and recomputes the event's denormalized counts. All work is done on `STAGE/` first, then promoted to live.

**Tech Stack:** Vanilla JS (no build step), Firebase Web SDK (compat), Node 24 built-in test runner (`node --test`) for the pure helpers. Spec: `docs/superpowers/specs/2026-06-12-duplicate-signup-handling-design.md`.

---

## File structure

- `formatters.js` (root + `STAGE/formatters.js`, kept byte-identical) — add pure helpers `activeSignupDates`, `datesOverlap`, `findDuplicateGroups`, `recommendKeeper` to the `LDAHFormat` api. Pure: no DOM, no Firestore.
- `test/dup-detect.test.js` (new) — Node tests for the helpers.
- `STAGE/index.html` — detection wiring, "Duplicate" badge, resolve modal, silent delete + audit + count recompute. (Promote to root `index.html` after STAGE QA.)

Note on Node export: `formatters.js` ends with `})(typeof window !== 'undefined' ? window : this)`. In a Node CommonJS module `this` is `module.exports`, so `global.LDAHFormat = api` makes `require('../formatters.js').LDAHFormat` work with no extra shim.

---

## Task 1: Pure detection helpers + tests

**Files:**
- Modify: `formatters.js` (add to `api` before `global.LDAHFormat = api;`, line ~102-106)
- Test: `test/dup-detect.test.js` (create)

- [ ] **Step 1: Write the failing tests**

Create `test/dup-detect.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert');
const { LDAHFormat } = require('../formatters.js');
const { findDuplicateGroups, datesOverlap, activeSignupDates } = LDAHFormat;

const D = 'June 17, 2026 - 5:00 PM';
const D10 = 'June 10, 2026 - 5:00 PM';
const D24 = 'June 24, 2026 - 5:00 PM';

test('same date + same email (case-insensitive) -> one duplicate group', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'b', email: 'X@X.com', selectedDates: [D], status: 'confirmed' },
  ]);
  assert.equal(g.length, 1);
  assert.deepEqual(g[0].slice().sort(), ['a', 'b']);
});

test('different dates, same email -> no duplicate', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D10], status: 'confirmed' },
    { id: 'b', email: 'x@x.com', selectedDates: [D24], status: 'confirmed' },
  ]);
  assert.equal(g.length, 0);
});

test('partial overlap -> duplicate', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D10, D24], status: 'confirmed' },
    { id: 'b', email: 'x@x.com', selectedDates: [D10], status: 'confirmed' },
  ]);
  assert.equal(g.length, 1);
});

test('different emails, same date -> no duplicate', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'b', email: 'y@y.com', selectedDates: [D], status: 'confirmed' },
  ]);
  assert.equal(g.length, 0);
});

test('cancelled doc excluded from overlap', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'b', email: 'x@x.com', selectedDates: [D], status: 'cancelled' },
  ]);
  assert.equal(g.length, 0);
});

test('date cancelled via dateStatusOverrides excluded', () => {
  const a = activeSignupDates({ selectedDates: [D10, D24], dateStatusOverrides: { [D10]: 'cancelled' } });
  assert.deepEqual(a, [D24]);
});

test('single multi-date signup is not a duplicate', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D10, D24], status: 'confirmed' },
  ]);
  assert.equal(g.length, 0);
});

test('datesOverlap basic', () => {
  assert.equal(datesOverlap([D10], [D10, D24]), true);
  assert.equal(datesOverlap([D10], [D24]), false);
});

test('three copies same date -> single group of three', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'b', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'c', email: 'x@x.com', selectedDates: [D], status: 'pending' },
  ]);
  assert.equal(g.length, 1);
  assert.equal(g[0].length, 3);
});
```

- [ ] **Step 2: Run tests, verify they FAIL**

Run: `cd /Volumes/Xcode_Projects/React/LDAH-Internal && node --test test/`
Expected: FAIL — `findDuplicateGroups is not a function` (helpers not added yet).

- [ ] **Step 3: Add the helpers to `formatters.js`**

Insert just before `var api = {` (line ~102):

```js
  // ---- Duplicate signup detection (pure; no DOM/Firestore) ----
  function _normEmail(s) { return String(s == null ? '' : s).trim().toLowerCase(); }

  // Active dates for a signup: [] if the doc is cancelled; otherwise its
  // selectedDates minus any date whose dateStatusOverrides entry is 'cancelled'.
  // Override keys may be composite ("DATE|loc|time") or the bare date, so we
  // match by equality or substring either direction.
  function activeSignupDates(signup) {
    if (!signup || signup.status === 'cancelled') return [];
    var dates = Array.isArray(signup.selectedDates) ? signup.selectedDates.slice()
              : (signup.signupDates != null ? [].concat(signup.signupDates) : []);
    var ov = signup.dateStatusOverrides || {};
    var cancelledKeys = Object.keys(ov).filter(function (k) { return ov[k] === 'cancelled'; });
    return dates.filter(function (d) {
      var ds = String(d);
      return !cancelledKeys.some(function (k) {
        return k === ds || k.indexOf(ds) !== -1 || ds.indexOf(k) !== -1;
      });
    });
  }

  function datesOverlap(a, b) {
    if (!a || !b) return false;
    var setB = {}; b.forEach(function (d) { setB[String(d)] = true; });
    return a.some(function (d) { return !!setB[String(d)]; });
  }

  // Group signups by same email + overlapping active dates (transitively).
  // Input: array of signup objects with {id, email, selectedDates, status, dateStatusOverrides}.
  // Output: array of groups, each an array of signup ids (length >= 2).
  function findDuplicateGroups(signups) {
    var byEmail = {};
    (signups || []).forEach(function (s) {
      var e = _normEmail(s.email);
      if (!e) return;
      var ad = activeSignupDates(s);
      if (!ad.length) return;
      (byEmail[e] = byEmail[e] || []).push({ id: s.id, dates: ad });
    });
    var groups = [];
    Object.keys(byEmail).forEach(function (e) {
      var recs = byEmail[e];
      var parent = recs.map(function (_, i) { return i; });
      function find(i) { while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; } return i; }
      function union(i, j) { parent[find(i)] = find(j); }
      for (var i = 0; i < recs.length; i++) {
        for (var j = i + 1; j < recs.length; j++) {
          if (datesOverlap(recs[i].dates, recs[j].dates)) union(i, j);
        }
      }
      var clusters = {};
      recs.forEach(function (r, idx) { var root = find(idx); (clusters[root] = clusters[root] || []).push(r.id); });
      Object.keys(clusters).forEach(function (root) {
        if (clusters[root].length >= 2) groups.push(clusters[root]);
      });
    });
    return groups;
  }

  // Recommend which record to KEEP. records: [{id, hasFeedback, hasAttendance, status, timestampMs}].
  // Keep richest (feedback > attendance > confirmed); tiebreak = earliest signup.
  function recommendKeeper(records) {
    function score(r) {
      return (r.hasFeedback ? 1000 : 0) + (r.hasAttendance ? 100 : 0) + (r.status === 'confirmed' ? 10 : 0);
    }
    return records.slice().sort(function (a, b) {
      var d = score(b) - score(a); if (d) return d;
      return (a.timestampMs || 0) - (b.timestampMs || 0);
    })[0];
  }
```

Then add them to the `api` object (line ~102):

```js
  var api = {
    formatNameSmart: formatNameSmart,
    formatPhone: formatPhone,
    attachFormatter: attachFormatter,
    activeSignupDates: activeSignupDates,
    datesOverlap: datesOverlap,
    findDuplicateGroups: findDuplicateGroups,
    recommendKeeper: recommendKeeper
  };
```

- [ ] **Step 4: Add a recommendKeeper test**

Append to `test/dup-detect.test.js`:

```js
test('recommendKeeper prefers attendance, then earliest', () => {
  const { recommendKeeper } = LDAHFormat;
  const keep = recommendKeeper([
    { id: 'late-empty', hasFeedback: false, hasAttendance: false, status: 'confirmed', timestampMs: 100 },
    { id: 'attended',   hasFeedback: false, hasAttendance: true,  status: 'confirmed', timestampMs: 200 },
  ]);
  assert.equal(keep.id, 'attended');
  const keep2 = recommendKeeper([
    { id: 'newer', hasAttendance: false, status: 'confirmed', timestampMs: 300 },
    { id: 'older', hasAttendance: false, status: 'confirmed', timestampMs: 100 },
  ]);
  assert.equal(keep2.id, 'older');
});
```

- [ ] **Step 5: Run tests, verify PASS**

Run: `cd /Volumes/Xcode_Projects/React/LDAH-Internal && node --test test/`
Expected: PASS (all tests).

- [ ] **Step 6: Sync to STAGE and commit**

```bash
cp formatters.js STAGE/formatters.js
git add formatters.js STAGE/formatters.js test/dup-detect.test.js
git commit -m "Dup signups: pure detection + keeper helpers in formatters.js (tested)"
```

---

## Task 2: Detect on load + "Duplicate" badge (STAGE)

**Files:**
- Modify: `STAGE/index.html` — `cmsViewSignups` (signups loaded ~line 23193) and `cmsRenderSignupCard` (badge area ~line 23562)

- [ ] **Step 1: Tag duplicates after signups load**

In `window.cmsViewSignups`, immediately after `_cmsSignupsModalData.signups` is populated (right after the `snap.forEach(...)` that pushes signups, ~line 23195), add:

```js
    // Tag duplicate signups (same person + overlapping active date).
    try {
      var _dupGroups = (window.LDAHFormat && LDAHFormat.findDuplicateGroups)
        ? LDAHFormat.findDuplicateGroups(_cmsSignupsModalData.signups) : [];
      var _dupIndex = {}; // signupId -> groupId
      _dupGroups.forEach(function (grp, gi) { grp.forEach(function (id) { _dupIndex[id] = gi; }); });
      _cmsSignupsModalData._dupGroups = _dupGroups;
      _cmsSignupsModalData.signups.forEach(function (s) {
        if (_dupIndex[s.id] != null) { s._isDuplicate = true; s._dupGroupId = _dupIndex[s.id]; }
        else { s._isDuplicate = false; s._dupGroupId = null; }
      });
    } catch (e) { console.warn('dup detect skipped:', e && e.message); }
```

- [ ] **Step 2: Render the badge**

In `cmsRenderSignupCard`, right after the status badge line `h += cmsRegStatusBadge(s);` (~line 23562), add:

```js
    if (s._isDuplicate) {
      h += '<span onclick="event.stopPropagation();cmsOpenDuplicateResolve(' + s._dupGroupId + ')" '
        + 'title="This person appears more than once for the same date — click to resolve" '
        + 'style="display:inline-block;margin-left:6px;padding:2px 8px;border-radius:999px;'
        + 'background:#fde68a;color:#92400e;font-size:.66rem;font-weight:700;letter-spacing:.04em;'
        + 'text-transform:uppercase;cursor:pointer;">Duplicate</span>';
    }
```

- [ ] **Step 3: Manual verify on STAGE**

Open `STAGE/index.html`, sign in, open the June 17 Parent Talk Cafe event's signups. (Note: Lauren's real duplicate was already deleted — re-create a throwaway second signup on a STAGE test event, or temporarily add a second signup doc, to see the badge.) Expected: both involved rows show a "Duplicate" badge; non-dupes show none.

- [ ] **Step 4: Commit**

```bash
git add STAGE/index.html
git commit -m "Dup signups: detect on load + Duplicate badge on signup rows (STAGE)"
```

---

## Task 3: Resolve modal — recommend, confirm, silent delete, audit, recount (STAGE)

**Files:**
- Modify: `STAGE/index.html` — add `cmsOpenDuplicateResolve`, `cmsRecalculateEventCounts`; reuse `auditLog`, `_showToast`, `_hasAttendanceMarked`.

- [ ] **Step 1: Add a reusable count-recompute helper**

Add near other `cms*` helpers (e.g. just above `window.cmsViewSignups`):

```js
async function cmsRecalculateEventCounts(collection, eventId) {
  try {
    var snap = await db.collection(collection).doc(eventId).collection('signups').get();
    var sc = 0, pc = 0;
    snap.forEach(function (doc) {
      var d = doc.data();
      if (d.archived === true) return;
      sc++;
      if (d.status === 'pending' || d.status === 'new') pc++;
    });
    await db.collection(collection).doc(eventId).update({ signupCount: sc, pendingCount: pc });
  } catch (e) { console.warn('count recompute skipped:', e && e.message); }
}
```

- [ ] **Step 2: Add the resolve modal + action**

Add a new function (near `cmsViewSignups`):

```js
window.cmsOpenDuplicateResolve = function (groupId) {
  var data = _cmsSignupsModalData;
  if (!data || !data._dupGroups || !data._dupGroups[groupId]) return;
  var ids = data._dupGroups[groupId];
  var recs = data.signups.filter(function (s) { return ids.indexOf(s.id) !== -1; });
  if (recs.length < 2) return;

  // Build comparable records for the keeper recommendation.
  function hasFeedback(s) { return !!(s.feedbackEmailsSent > 0 || s.feedbackEmailSentAt); }
  function tsMs(s) { return (s.timestamp && s.timestamp.toMillis) ? s.timestamp.toMillis() : 0; }
  var compare = recs.map(function (s) {
    return { id: s.id, hasFeedback: hasFeedback(s),
             hasAttendance: (typeof _hasAttendanceMarked === 'function') ? !!_hasAttendanceMarked(s) : false,
             status: s.status, timestampMs: tsMs(s) };
  });
  var keeper = LDAHFormat.recommendKeeper(compare);
  var keepId = keeper.id;

  // Warn if a to-be-removed record has unique data the keeper lacks.
  var keepRec = compare.filter(function (c) { return c.id === keepId; })[0];
  var lossWarn = compare.some(function (c) {
    return c.id !== keepId && ((c.hasFeedback && !keepRec.hasFeedback) || (c.hasAttendance && !keepRec.hasAttendance));
  });

  function row(s) {
    var c = compare.filter(function (x) { return x.id === s.id; })[0];
    var tags = [];
    if (c.hasAttendance) tags.push('attendance');
    if (c.hasFeedback) tags.push('feedback');
    var isKeep = s.id === keepId;
    return '<div style="border:1px solid ' + (isKeep ? '#16a34a' : '#e5e7eb') + ';border-radius:8px;padding:10px 12px;margin:6px 0;background:' + (isKeep ? '#f0fdf4' : '#fff') + ';">'
      + '<div style="font-weight:700;">' + (isKeep ? '✓ Keep' : 'Remove') + ' &mdash; ' + (s.name || '(no name)') + '</div>'
      + '<div style="font-size:.8rem;color:#64748b;">' + (s.email || '') + ' &middot; ' + (s.status || '') + (tags.length ? ' &middot; has ' + tags.join(' + ') : '') + '</div>'
      + '</div>';
  }
  var body = recs.map(row).join('')
    + (lossWarn ? '<div style="margin-top:8px;padding:8px 12px;background:#fef3e2;border:1px solid #f0c987;border-radius:6px;color:#92400e;font-size:.82rem;">Warning: a record being removed has attendance/feedback the kept one does not. Review before confirming.</div>' : '');

  showConfirmModal({
    title: 'Resolve duplicate signup',
    subtitle: 'Removes the extra record silently — no email is sent to the family.',
    body: body,
    confirmLabel: 'Remove duplicate' + (recs.length > 2 ? 's' : ''),
    cancelLabel: 'Cancel',
    confirmStyle: 'danger',
    onConfirm: async function () {
      var removeIds = ids.filter(function (id) { return id !== keepId; });
      var keepRecFull = recs.filter(function (s) { return s.id === keepId; })[0];
      for (var i = 0; i < removeIds.length; i++) {
        await db.collection(data._collection).doc(data.eventId).collection('signups').doc(removeIds[i]).delete();
      }
      await auditLog('Removed duplicate signup',
        (keepRecFull.name || '') + ' / ' + (keepRecFull.email || '') + ' — ' + (data.eventTitle || '') +
        ' — kept ' + keepId + ', removed ' + removeIds.join(', '));
      await cmsRecalculateEventCounts(data._collection, data.eventId);
      _showToast('Duplicate removed (no email sent).', '#16A34A');
      cmsViewSignups(data._collection, data.eventId); // reload + re-render
    }
  });
};
```

- [ ] **Step 3: Manual verify on STAGE**

On STAGE with a re-created duplicate: click the Duplicate badge → modal shows both records, keeper pre-marked, correct warning when applicable → confirm → the extra doc is deleted, toast shows, list refreshes with no badge, Audit Log has the "Removed duplicate signup" entry, and **Email Log shows no new email**.

- [ ] **Step 4: Commit**

```bash
git add STAGE/index.html
git commit -m "Dup signups: resolve modal — recommend keeper, silent delete, audit, recount (STAGE)"
```

---

## Task 4: Version bump + promote STAGE → live

**Files:** `STAGE/index.html`, `index.html`, `formatters.js`, `STAGE/formatters.js`

- [ ] **Step 1: Bump version** — in `STAGE/index.html` line ~4709 set `v138.1.8-STAGE`; after STAGE QA passes, in `index.html` line ~4703 set `v138.1.8`.

- [ ] **Step 2: Promote** — copy the three changed blocks (detection tagging, badge, resolve modal + recount helper) from `STAGE/index.html` into `index.html`, and ensure root `formatters.js` already has the helpers (Task 1 synced both). Verify `diff` shows only the intended changes plus the `-STAGE`/banner differences. Do NOT copy the `with-stage-banner` body class or `#stageBanner` div.

- [ ] **Step 3: Commit + push**

```bash
git add index.html STAGE/index.html formatters.js STAGE/formatters.js
git commit -m "Dup signups: promote duplicate detect + silent remove to live (v138.1.8)"
git push origin main
```

- [ ] **Step 4: Verify live** — open the live app, confirm version shows v138.1.8 and the feature works on a real event with no duplicate present (badge absent, no errors in console).

---

## Self-review notes

- Spec coverage: detection (Task 1+2), recommended-keeper + confirm (Task 3), silent delete via no-delete-trigger (Task 3), audit entry (Task 3), count recompute (Task 3), permissions — **gap closed below**.
- **Permissions:** the signups modal is already reached only from admin/superAdmin event views; the Duplicate badge + resolve action inherit that gating, so no extra role check is required. If the signups modal is ever exposed to a lower role, add a `currentUserData.role` guard inside `cmsOpenDuplicateResolve`.
- Out of scope here (own plan later): Part 2 form prevention (W2 + App).
