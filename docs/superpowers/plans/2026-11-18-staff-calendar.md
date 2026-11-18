# Staff Calendar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A per-person, read-only Staff calendar (hour grid) under Main, with a view-as picker for the My Day owners, plus Helpers on Events Dashboard sessions and a People picker on Staff Calendar entries.

**Architecture:** Everything lives in `STAGE/index.html` (vanilla JS + Firestore compat SDK), following the Events Dashboard (`ed…`) patterns. New code is prefixed `sc…`. Pure helpers (time parsing, membership, overlap layout) sit in one block between `/* SC-PURE-START */` and `/* SC-PURE-END */` so a node script can extract and test them.

**Tech Stack:** vanilla JS, Firebase Firestore (compat), node for the pure-helper tests.

**Spec:** `docs/superpowers/specs/2026-11-18-staff-calendar-design.md`

## Global Constraints
- STAGE only (`STAGE/index.html`); bump `buildVersion` to the next `v155.NN-STAGE` per push. Live is promoted later by applying hunks, only on Daniel's OK.
- Read-only view: the Staff calendar never writes to Firestore.
- Helpers / people writes use `{merge:true}` and never replace `presenter` / `presenterUid`.
- No emails, no tasks, no notifications from any of this.
- No real names in code (repo is public); uids already in the file (`MYDAY_VIEWAS_OWNERS`) may be referenced by constant.
- Staff only: gate with `_edStaffCalAllowed()`; picker lists `_edAgLoadStaff()` people only.
- Screens are 1366x768: the grid scrolls inside the section; header stays visible.
- Colours: `_edTypeColor(k)`, `ED_STAFF_META.color`, `OS_META.color`, `VR_CAL_COLOR`; cancelled `#CBD5E1`.

## Review Focus
- A typed time that can't be read ("TBA", "Morning", blank) must land in the All-day strip, never crash or vanish.
- A presenter saved as `'(form-set)'` or with a blank uid but a name must still put the item on that person's calendar (name match).
- Three overlapping items at the same hour must sit side by side, each readable.
- Viewing as someone else must not show the viewer's own items, and Agenda buttons must only show to meeting members.
- Saving an Event Summary after helpers were added must keep the helpers.

---

### Task 1: Pure helpers + node tests

**Files:**
- Modify: `STAGE/index.html` (new block after `edLoadEvents`, ~line 38666)
- Create: `scripts/test-staff-calendar.js`

**Interfaces — Produces:**
- `_scParseTime(text: string) -> {start:'HH:MM', end:'HH:MM'|''} | null`
- `_scRoleFor(row: ScRow, uid: string, nameOf: (uid)=>string) -> 'lead'|'helper'|'attendee'|'everyone'|''`
- `_scLayoutDay(items: {start:'HH:MM', end:'HH:MM'}[]) -> {col:number, cols:number}[]` (same order as input; untimed items are not passed in)
- `ScRow` = admin row fields + `{leadUids:[], leadNames:[], helperUids:[], attendeeUids:[], everyone:bool, start:'HH:MM'|'', end:'HH:MM'|''}`

- [ ] **Step 1: Write the failing tests** in `scripts/test-staff-calendar.js`: read `STAGE/index.html`, slice between the markers, `new Function(src + '; return {_scParseTime,_scRoleFor,_scLayoutDay};')()`, then assert:
  - `_scParseTime('4pm')` → `{start:'16:00', end:''}`; `'10:00 AM – 12:00 PM'` → `{start:'10:00', end:'12:00'}`; `'December 3rd -- 4pm'` → `{start:'16:00', end:''}`; `'9-11am'` → `{start:'09:00', end:'11:00'}`; `'TBA'`, `''`, `'Morning'` → `null`; `'12pm'` → `'12:00'`; `'12am'` → `'00:00'`.
  - `_scRoleFor({leadUids:['A']}, 'A')` → `'lead'`; helper → `'helper'`; attendee → `'attendee'`; `{everyone:true}` → `'everyone'`; not on it → `''`; `{leadUids:[], leadNames:['Pat Lee']}` with `nameOf('B')==='pat lee'` → `'lead'`.
  - `_scLayoutDay([{start:'09:00',end:'10:00'},{start:'09:30',end:'11:00'},{start:'09:45',end:'10:15'},{start:'13:00',end:'14:00'}])` → cols 3 for the first three with distinct `col` 0/1/2, and `{col:0,cols:1}` for the last. An item with no end counts as 60 minutes.
- [ ] **Step 2: Run** `node scripts/test-staff-calendar.js` → FAIL (markers missing).
- [ ] **Step 3: Implement** the three functions inside the marker block. Name matching in `_scRoleFor` is lowercase-trim equality against `nameOf(uid)`.
- [ ] **Step 4: Run** → `N passed, 0 failed`.
- [ ] **Step 5: Commit** `STAGE: staff calendar pure helpers + tests`.

### Task 2: Helpers on the Events Dashboard + Event Summary keeps them

**Files:** Modify `STAGE/index.html`: presenter select render (~40303-40366), `edSetPresenter` (~39216-39246), `saveEventSummary` (~47445-47515).

**Interfaces — Produces:** stored field `helpers: [{uid,name}]` on `summary` (single-date event) or `sessionSummaries[key]` (same key `edSetPresenter` writes; booth = every session that day). Function `edSetHelpers(coll, id, key, helpers)` and UI `edHelperPick(btn, coll, id, key)`.

- [ ] **Step 1:** Under each presenter `<select>`, render helper initials chips (title = full name, click removes) and a "+ Helper" link opening a small checklist of `_edAgLoadStaff()` minus the current presenter.
- [ ] **Step 2:** `edSetHelpers` writes `{summary:{helpers}}` or `{sessionSummaries:{[key]:{helpers}}}` with `set(..., {merge:true})`; booth writes every session key that day, mirroring `edSetPresenter`. Update the in-memory row and re-render the card.
- [ ] **Step 3:** In `saveEventSummary`, copy `helpers` from the previous summary object into `summaryData` (same as `measure524`/`activityType`).
- [ ] **Step 4: Verify on STAGE** (browser, signed in): add a helper on a past test-safe session, reload, chip still there; open its Event Summary, Save, reload, chip still there. Then remove the helper.
- [ ] **Step 5: Commit + push** with version bump.

### Task 3: "Who is this for?" People picker on Staff Calendar entries

**Files:** Modify `STAGE/index.html`: staff entry form build (~38813-38890) and `edSaveStaffEntry` (~38932-38957).

**Interfaces — Produces:** stored `people:[{uid,name}]`, `peopleUids:[]` on `staffCalendar` docs (blank = everyone).

- [ ] **Step 1:** Add a "Who is this for?" checklist of `_edAgLoadStaff()` under Place, with the hint "Leave blank and everyone sees it." Pre-tick from `people` on edit. Hide it when the entry has `providerRequestId` (PCs decide) and show "For the PCs on the screening worksheet" instead.
- [ ] **Step 2:** Save writes `people` and `peopleUids` (empty arrays when none).
- [ ] **Step 3: Verify on STAGE:** create a test entry for one person, reload, edit shows the tick; delete the test entry.
- [ ] **Step 4: Commit + push** with version bump.

### Task 4: Loader `scLoad(fromIso, toIso)`

**Files:** Modify `STAGE/index.html` (new function after the pure block).

**Interfaces:**
- Consumes: `cmsGenerateSessionDates`, `_cmsGenerateSessionDatesPast`, `cmsBuildSessionKey`, `_staffCalDates`, `_vrLoadForCalendar`-style read of `volunteerRequests`, `officeScreeningDays`, `providers`, `edLoadPresenters()`, `_pswOldPcMatch`, Task 1 helpers.
- Produces: `async scLoad(fromIso, toIso) -> ScRow[]` with the extra fields above, plus `type`, `color`, `title`, `where`, `date`, `cancelled`, `coll`, `id`, `key`, `providerRequestId`, `agendaOn`, `participantUids`.

- [ ] **Step 1:** Build rows from the same sources and skip rules as `edLoadEvents` (do not modify `edLoadEvents`). Recurring: start/end from the generated session; lead from raw `sessionSummaries[key].presenterUid` (even when cancelled); `'(form-set)'` = blank → `leadNames:[presenter]`. One-time events: `summary` or `sessionSummaries[label|iso]`; times via `_scParseTime(time || label)`. Office days: `leadUid`, `start/end`. Volunteer requests: `leadUid`, `_scParseTime(time)`. Staff entries: `providerRequestId` → that provider's `worksheet.pcs` (or `_pswOldPcMatch(pcNames)`) as leads; `agendaOn` → `participantUids` + `agendaToUid` as attendees; else `peopleUids` as leads, empty → `everyone:true`.
- [ ] **Step 2: Verify** in the STAGE console: `await scLoad('2026-11-16','2026-11-22')` includes today's Hilo screening with Leilani's uid in `leadUids`, `start:'08:30', end:'09:30'`, and Connect-Gen 11-19 Oahu with a lead uid.
- [ ] **Step 3: Commit.**

### Task 5: Staff calendar section (nav, view-as, grid, month, detail card)

**Files:** Modify `STAGE/index.html`: Main nav (~6111-6124), router hide list + dispatch (~16683-16811), new `<section id="staffCalSection" class="ed-section">` next to `eventsDashboardSection` (~9665), CSS beside `.ed-*` styles.

**Interfaces:** Consumes Task 1 + Task 4. Produces `scRender()`, state `_scView` ('day'|'week'|'month', localStorage key `scView`, default week), `_scCursor`, `_scViewUid`.

- [ ] **Step 1:** Nav link "Staff calendar" (`data-section="staffcalendar"`), router `_showFullWidth(staffCalSection, scRender)` guarded by `_edStaffCalAllowed()`.
- [ ] **Step 2:** Header copied from the Events Dashboard (title, Day/Week/Month, arrows, Today). For `MYDAY_VIEWAS_OWNERS`, a "Viewing as" select of `_edAgLoadStaff()`; initial value `(_myDayViewAs||currentUserData).uid`.
- [ ] **Step 3:** Week/Day hour grid: rows 7:00–19:00 widened to fit items, 40px per hour, blocks positioned by start/end using `_scLayoutDay`; lead solid colour, helper/attendee tinted + dashed border + tag; All-day strip for untimed and `everyone` items without times; today highlighted; holidays via `ldahHolidayOn`. Cancelled greyed + strike-through.
- [ ] **Step 4:** Month grid like the admin month: one line per item, start time + title.
- [ ] **Step 5:** Click a block → detail card (title, date/time, place, role, admin buttons only when the signed-in user could open them: Workshop form for offsite events, Screening worksheet for `providerRequestId`, Agenda only when signed-in user is a member).
- [ ] **Step 6: Verify on STAGE** in Chrome as Dan: own week; switch to Leilani → Hilo screening Wed 8:30–9:30 purple block, Kona/virtual Connect-Gen sessions as Lead; switch to Mackenzie → 11-19 Oahu Connect-Gen; Month view loads; no console errors; 1366-wide window shows the header with the grid scrolling.
- [ ] **Step 7:** Check deployed Firestore rules allow all staff roles to read `staffCalendar`, `officeScreeningDays`, `volunteerRequests`, `providers` (read-only via firebaserules API); report gaps, don't deploy rules.
- [ ] **Step 8: Commit + push**, version bump; tell Daniel it's on STAGE.
