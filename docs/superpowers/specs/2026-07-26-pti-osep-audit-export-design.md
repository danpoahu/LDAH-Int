# PTI / OSEP Audit Export — Design

**Date:** 2026-07-26
**Repo:** `/Volumes/Xcode_Projects/React/LDAH-Internal/` (single-file `index.html`; `STAGE/index.html` staging copy)
**Status:** Approved design — ready for implementation plan

---

## 1. Purpose

Produce a downloadable `.xlsx` workbook from our live Firestore data that is a faithful duplicate
of the federal PTI/OSEP "pink sheet" workbook (`Hawaii_PTI_2025_2030DP.xlsx`, emailed by La'a
2026-06-24). The export lets LDAH compare what our system captures against the pink sheet, and
surfaces any gaps in what we collect.

Delivered as a **working card** in the existing "Yearly audit & reports" panel of the staff
dashboard.

## 2. Context / current state

- The "Yearly audit & reports" panel (`index.html:6200-6227`) is currently a **placeholder**: the
  `Open Reports`, `Generate`, and `View` buttons have **no click handlers**; "Audit Year: 2026 ·
  In progress" is hard-coded text. This feature adds the first *working* card there.
- The app has **no in-browser spreadsheet library**; every existing export is hand-rolled CSV via
  Blob + anchor. Only jsPDF is loaded from CDN (`index.html:55`).
- An **Event Attendance Report** engine already exists (`index.html:39046+`) that enumerates events
  in a date range, pulls attendees, and buckets demographics into exactly the PTI tallies. This
  export **reuses** that engine rather than reimplementing aggregation.
- The target column layout is defined offline in `scripts/pti-backfill/01_clean_and_extract.py`
  (header at lines ~160-182; `COUNTY_MAP` at line 38).

## 3. Decisions (locked with user)

| Decision | Choice |
|---|---|
| Output format | **True `.xlsx`** via SheetJS (added as one CDN `<script>`, like jsPDF) |
| Row scope | **All events**, plus a new **`Source`** column: `Live signups` vs `PTI import` |
| Time model | **PTI grant years, Mar 1 – Feb 28**; one worksheet tab per grant year that has events |
| Placement | New `audit-card` in the "Yearly audit & reports" panel; label **"PTI / OSEP Audit Export"**, button **Generate** |
| Aggregation | One row per event/activity; counts summed across that event's attendees |

## 4. Workbook structure

- **Tabs:** one per PTI grant year (Mar 1 – Feb 28) auto-detected from event dates, e.g.
  `Year 1 (2025-26)`, `Year 2 (2026-27)`.
- **Columns** (mirror the pink-sheet/OSEP header, ~65, in this order), with `Source` added:
  `Source, Grant Year, Disposition, Tier, Date, County, Description, Location, Co-Sponsors,
  Dissem Reach, Head Count, Parents, Prof, Youth, Military`
  + age bands `Birth-2, 3-5, 6-11, 12-14, 15-18, Beyond HS`
  + ethnicity `AfrAm, Asian, Cau, Filip, Hisp, PtHaw, PacIsl, Other`
  + 17 disability cols `ADHD, Autism, Deaf, DevDelay, EmoDist, Intel, Gifted, MultDis, NoIDEA,
    Ortho, OHI, SLD, SpLang, Susp, TBI, VisIm, DF/BL`
  + helpfulness `Help1-VH, Help1-H, Help1-NH, Help2-VH, Help2-H, Help2-NH`
  + survey `Q1-Y, Q1-N … Q8-Y, Q8-N`
  + `Flags, Assumptions`
- **One row per event/activity.**
- **Filename:** `LDAH_PTI_OSEP_ourdata_<ISODATE>.xlsx`.

## 5. Data mapping (our schema → PTI columns)

Reuse the Event Attendance Report engine (`_enumerateEventDates`, `_bucketEthnicity`,
`_normalizeAgeRange`, disability list, role classification at `index.html:39046-40700`).

- **Enumerate** `events` (incl. `isOneOff`) + `recurringEvents`; derive each row's grant year from
  its event date against the Mar 1 – Feb 28 windows.
- **County:** derive from `location` / island via `COUNTY_MAP` (Honolulu, Hawaii, Maui, Kauai).
  Unmapped → blank + a Flag.
- **Tier:** `summary.tierModel`.
- **Role counts** (Parents / Prof / Youth / Military): from the EA role classification of each
  attendee's `signup.registration` (`role`, `priorTraining`, `militaryStatus`).
- **Age / Ethnicity / Disability** columns: bucketed from `signup.registration` per attendee, summed.
- **Signup-less rows (one-off / PTI import):** totals come from `summary.attendanceOverrides`
  (`attTotal, newParent, parentReturning, youthWD, profOther, militaryActive`); per-person
  breakdown columns (age/ethnicity/disability/survey) left **blank**. These rows carry
  `Source = PTI import` when `_ptiImport` is present, else `Live signups`.
- **Survey → Help/Q columns** (from `eventFeedback`, linked by `eventId`), tallied per event:
  - **Help1** = `presenterRating` → VH / H / NH
  - **Help2** = `handoutsRating` → VH / H / NH
  - **Q1–Q8** (Y/N) = `increasedKnowledge, relevantToChild, usefulToMe, overallSatisfied,
    priorImpactServices, priorImpactShared, priorImpactSchool, priorImpactResolved`
  - *Assumption:* this 8-for-8 order is inferred; adjust if the real pink sheet fixes a different
    Q1–Q8 order.
- **Disposition:** classify like the offline pipeline (`NETNEW` / `MERGE` / `DISSEM` / `EXCLUDE`);
  `DISSEM` when `summary.activityType === 'Dissemination'`.

## 6. Components

1. **CDN tag** — add SheetJS `<script>` beside jsPDF (`index.html:55`). Verify CSP/CDN allow-list
   admits it (jsPDF already loads cross-origin, so expected OK).
2. **Card markup** — one `audit-card` in the panel with `onclick="ptiOsepExport()"`.
3. **`window.ptiOsepExport()`** — orchestrator: reuse EA enumeration → shape rows into the PTI
   column set → group rows by grant year → build a SheetJS workbook (one sheet per year) → trigger
   download. Self-contained; no changes to the EA report's own output.

## 7. Constraints / house rules

- **STAGE first** (`STAGE/index.html`), test, then surgically promote to live `index.html`
  (live may be behind STAGE — patch surgically, never wholesale copy).
- **Version bump** the Int app on push.
- Signups/registration carry PII — export runs **client-side** for authenticated staff only;
  no new backend, no data leaves the browser except the file the user downloads.
- Reader must tolerate legacy field-name shapes (per canonical demographic schema).

## 8. Out of scope (YAGNI)

- Wiring the panel's other placeholder buttons (`Open Reports`, `Change history report`).
- Server-side / scheduled generation.
- Editing or writing back any Firestore data.
- A grant-year picker (all years with data are emitted as tabs).

## 9. Testing / verification

- Generate on STAGE; open the `.xlsx` and confirm: correct tabs per grant year; row counts and
  Head Count/Parents/Prof/Youth/Military reconcile to the Event Attendance Report for the same
  range; a known live-signup event shows full age/ethnicity/disability breakdown; a known PTI
  one-off shows totals only + `Source = PTI import`; county mapping correct for sample locations.
- Confirm no console errors and the SheetJS CDN loads under CSP.
