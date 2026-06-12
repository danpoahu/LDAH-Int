# Duplicate Signup Handling — Design

**Date:** 2026-06-12
**Status:** Approved (design)
**Repos touched:** LDAH-Int (`danpoahu/LDAH-Int`, Part 1), LDAH_W2 + App (`danpoahu`, Part 2)

## Problem

Families occasionally sign up for the same event/date more than once (e.g. Lauren Vigil
had two `confirmed` records for the June 17 Parent Talk Cafe, each having sent its own
confirmation email). Nobody — the family or staff — usually notices until someone happens
to spot the same name twice. Staff have no clean way to remove the extra one without the
Cancel & Reschedule modal firing a cancellation email to the family, who don't even know
they were in twice. This has happened before and will happen again.

Goal: (1) help staff **catch and silently remove** duplicates, and (2) **warn** people at
the public form before they create one. Prevention is best-effort; the staff-side removal
is the real backstop.

## Canonical duplicate definition

A duplicate is: **the same person + the same event + at least one overlapping ACTIVE date.**

- "Same person" = same `email` (case-insensitive), with `linkedContactId` as a secondary
  match when present.
- "Overlapping active date" = at least one calendar date/session appears in two different
  signup records' active dates. A date is **active** if it is not cancelled for that signup
  (respect `dateStatusOverrides[date] === 'cancelled'` and any doc-level `status` of
  `cancelled`).
- **NOT duplicates:** one signup that selected multiple dates (e.g. `["June 10","June 24"]`);
  two separate signups for genuinely *different* dates of the same multi-date event; the same
  person across *different* events.

This definition is shared by Part 1 and Part 2 so they never disagree. Implement it once as
a small pure helper (`findDuplicateDateOverlap(signups)` / `datesOverlap(a, b)`).

## Part 1 — LDAH-Int: detect & silently remove (ships first)

### Detection (client-side)
In the event's signup list / Event Attendance view, group the already-loaded signups by
person and apply the canonical definition. No backend, no new Cloud Function, no triggers.
Any record involved in an overlap gets a **"Duplicate" badge** on its row.

### Resolve action
Clicking the badge (or a per-group "Resolve duplicate" button) opens a modal showing the
involved records **side by side**, with the system's **recommended keeper pre-selected**:

- Keep the record that has **attendance marked** or a **feedback survey** attached; else the
  one with the **earliest** signup timestamp.
- **Warn** prominently if the record proposed for removal holds **unique data the keeper
  lacks** (e.g. attendance on a date, a feedback response, payment) — so staff never silently
  lose history.

Staff confirm. Staff may override which record is removed.

### Removal mechanism
- **Hard-delete** the chosen signup doc from `events/{eventId}/signups/{signupId}`. This is
  the only **guaranteed-silent** path: there is `onEventSignupCreated` and
  `onEventSignupUpdated` (which runs five email-capable handlers), but **no
  `onEventSignupDeleted`**, so a delete fires nothing.
- Write an **Audit Log** entry (`auditLog` collection, `performedBy` = current user) such as:
  *"Removed duplicate signup — Lauren Vigil / lmays8933@… — June 17 Parent Talk Cafe — kept
  Tzfd…QSg, removed zWnC…1wLx."* This preserves a permanent record even though the doc is gone.
- **Recompute** that event's denormalized `signupCount` / `pendingCount` from the remaining
  signups in the same action (they are currently stale, e.g. 9/9 against 3 real signups).

### Permissions
superAdmin + admin (same gate as the Audit Log view).

## Part 2 — Prevention at the public signup form (ships second)

### Where
Both signup implementations, because they drift: **W2** (`events.html`, vanilla JS) and the
**App** (React). Same overlap check in both.

### When / behavior — warn but allow
When the user has entered their email and selected dates, check the email against existing
**active** signups for that **same event** and compute **date overlap** against the dates
they are registering. On overlap, show a friendly inline notice, e.g.:

> *"It looks like you're already signed up for **June 17**. You can still submit if you meant to."*

listing only the overlapping date(s). They can proceed anyway. New / non-overlapping dates
are unaffected. **No hard block, no silent drop** — informational only.

### Limitation (by design)
The form only knows the email typed in, so prevention catches the common case (same person
re-submitting) but not someone using a different email — which is exactly why Part 1 exists.

## Edge cases

- **Multi-date events:** a single signup with several dates is one signup; only cross-record
  date overlap counts. Cancelled dates are excluded from overlap.
- **Recurring events:** signups live at `recurringEvents/{eventId}/signups/...`; same helper
  applies. Removal path identical (no delete trigger there either).
- **3+ copies:** the resolve modal handles N records in a group — keep one, remove the rest.
- **Different-email duplicate:** not auto-detected (acceptable); staff can still manually
  remove via the same modal if they spot it by name.
- **Removed copy had attendance/feedback:** surfaced as a warning before confirm; staff
  decide. (Future option: merge that history onto the keeper — out of scope for v1.)

## Out of scope (v1)

- Backend scheduled scan + global dashboard "duplicates to review" roll-up (possible later).
- Auto-merging attendance/feedback from the removed copy onto the keeper.
- Hard-blocking or silently de-duping at the form.

## Testing

- Pure helper: unit-test `datesOverlap` / `findDuplicateDateOverlap` against the multi-date
  matrix (identical dates → flag; disjoint dates → no flag; partial overlap → flag; cancelled
  date excluded).
- Manual: reproduce a 2-record same-date dup on a STAGE event → badge appears → resolve modal
  recommends correct keeper → confirm → doc deleted, **no email sent** (verify Email Log),
  audit entry written, counts corrected.
- Prevention: STAGE signup with an email already registered for a date → warning shows for
  that date only; submitting anyway still works; a brand-new date shows no warning.
