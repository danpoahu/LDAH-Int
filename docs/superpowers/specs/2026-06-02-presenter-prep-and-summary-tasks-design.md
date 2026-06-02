# Presenter Prep Task, Event Summary Follow-up, and Task Action Buttons — Design

**Date:** 2026-06-02
**Status:** Approved (pending spec review)
**Builds on:** [2026-05-22 Event-Lifecycle Interactions](./2026-05-22-event-lifecycle-interactions-design.md) (live as LDAH-Int v124.0.0, 2026-05-24)

## Background

The event-lifecycle engine already maintains an `interactions` collection with a
workflow chain in `LDAH_W2/functions/index.js`:

- **On event create** → `onEventCreatedLifecycle` spawns Verify Display, Assign Presenter
  (per session, owned by La'a), and Send Announcements interactions.
- **Day-of** → `createDayOfAttendanceTasks` (5 AM HST cron) creates a **Take Attendance**
  task per session, owned by the presenter.
- **On Take Attendance close** → `onInteractionUpdatedLifecycle` auto-spawns an
  **Event Summary** task, owned by the presenter, `followUpDate = sessionDate + 10 days`.

Two gaps relative to the desired presenter workflow:

1. There is **no** task that reminds the presenter to *prepare to present* ahead of the event.
2. The Event Summary follow-up window (+10 days) is longer than wanted, and the day-of
   tasks have no one-click path into the actual Take Attendance / Event Summary screens.

This design adds the prep task, tightens the Event Summary follow-up, and wires deep-link
action buttons onto the relevant task cards.

## Goals

1. **Presenter prep task** — 3 days before each session, create a "Present Event" task
   owned by the session's presenter, follow-up the day after that session.
2. **Event Summary follow-up** — change from +10 days to +5 days (long enough for
   participant feedback to arrive before the task is chased).
3. **Action buttons** — Take Attendance and Event Summary task cards each get a button
   that opens the corresponding modal for that event + session.

## Non-goals

- No change to how presenters are assigned (still via the Assign Presenter interaction).
- No change to Take Attendance creation/timing.
- No renaming of existing interaction types.
- The optional "review who's coming" button on the prep card is **deferred** (not built
  now); noted below for future reference.

---

## Part 1 — `createPresenterPrepTasks` scheduled function

**New Cloud Function** in `LDAH_W2/functions/index.js`, modeled on the existing
`createDayOfAttendanceTasks` (index.js ~line 12297).

- **Schedule:** daily, ~5 AM HST (`0 5 * * *`), same cadence as the day-of cron.
- **Logic per run:** scan events whose session date is exactly **3 days out**. For each
  matching session, create one lifecycle interaction:

| Field | Value |
|-------|-------|
| `interactionType` | `Present Event` |
| `channel` | `Event Prep` (new channel) |
| `workflowStep` | `presenterPrep` |
| `workflowEventId` | event doc id |
| `workflowEventCollection` | source collection (`events` / recurring) |
| `workflowSessionKey` | composite session key (YYYY-MM-DD…) |
| `workflowEventTitle` | clean event title (no date suffix) — see Part 3 |
| `workflowIsRecurring` | boolean, derived from collection — see Part 3 |
| `ownerUid` / `owner` | session presenter (`sessionSummaries[key].presenterUid` / `summary.presenterUid`); **fallback to La'a** (`hj6YnfnZ66Yul9mtnULRW5FTWKH3`) if unassigned |
| `contactName` | event title + session date (existing convention) |
| `followUpDate` | **day after** that session (sessionDate + 1 day) |
| `status` | `Open` |

- **Scope:** **per session.** Recurring weekly series get a prep task before each session.
- **Presenter resolution:** read the per-session presenter the same way the day-of cron
  does. If empty (Assign Presenter not yet closed 3 days out), **fall back to La'a** so the
  reminder still lands on an accountable owner.
- **Idempotency:** before creating, query `interactions` for an existing doc with the same
  `workflowEventId` + `workflowSessionKey` + `workflowStep: presenterPrep`. Skip if found.
  This guards re-runs and re-deploys (same guard the day-of cron uses).
- **Follow-up semantics (confirmed):** the task surfaces 3 days before the session and is
  flagged for follow-up the day *after* the session — intentionally a wide-open window
  covering the run-up to and the day past the event.

## Part 2 — Event Summary follow-up: +10 → +5 days

Single-value change in `onInteractionUpdatedLifecycle` (index.js ~line 12215–12252), where
the Event Summary interaction is created on Take Attendance close:

- `followUpDate = sessionDate + 10 days` → `followUpDate = sessionDate + 5 days`.

No structural change. Take Attendance (day-of) → on close → Event Summary remains the flow;
the form-save auto-close behavior is unchanged.

## Part 3 — Action buttons on task cards

Task cards render in the **My Day** view (`loadMyDay`, `LDAH-Internal/index.html` ~line
4885; card markup ~line 4934–4946). The interaction doc (`d`) already carries
`workflowStep`, `workflowEventId`, and `workflowSessionKey` — they are simply not read by
the renderer today. Buttons are added conditionally on `workflowStep`.

### Button → opener mapping

- **`takeAttendance`** → **"Take Attendance →"** button (green `#059669`, matching the
  existing in-modal style at index.html ~6751). Calls:
  `cmsViewSignups(workflowEventId, workflowIsRecurring, workflowEventTitle)` (~line 21914),
  which opens the signups/attendance modal.
- **`eventSummary`** → **"Open Event Summary →"** button. The summary modal
  (`cmsOpenEventSummary`, ~line 25058) opens *from* the signups modal and reads global
  `_cmsSignupsModalData`, so a small helper is needed:
  1. `await cmsViewSignups(workflowEventId, workflowIsRecurring, workflowEventTitle)`
  2. set the selected session to `workflowSessionKey`
  3. `cmsOpenEventSummary()`
- **`presenterPrep`** → no button (deferred). Future option: open the event's signups so the
  presenter can review who's coming.

### Card wiring details

- Read `d.workflowStep`, `d.workflowEventId`, `d.workflowSessionKey`, `d.workflowEventTitle`,
  `d.workflowIsRecurring` in the `loadMyDay` `.map()` closure.
- Each button uses `onclick="event.stopPropagation(); …"` so it does not also trigger the
  card's `viewInteraction(...)` open-detail click.
- Escape interpolated values with the existing `rsEscape` helper.
- Button sits within the card (after `.meta` or in `.tags`), styled to match the small
  in-modal buttons (`font-size:.75rem; padding:4px 10px`).

### Supporting data on interaction docs

`cmsViewSignups` needs `isRecurring` (boolean) and a clean event **title**, neither of which
is on the interaction doc today (it stores `workflowEventCollection` and `contactName` =
title + date). Therefore the **three creating paths** must also stamp:

- **`workflowEventTitle`** — the event title without the date suffix.
- **`workflowIsRecurring`** — boolean derived from `workflowEventCollection`.

Creating paths to update:
1. `onEventCreatedLifecycle` (and/or `_lcBuildInteractionDoc`) — for any card that needs the
   button (at minimum, the takeAttendance and eventSummary producers).
2. `createDayOfAttendanceTasks` — Take Attendance.
3. `onInteractionUpdatedLifecycle` — Event Summary (and the new `createPresenterPrepTasks`).

Centralizing this in `_lcBuildInteractionDoc` (~line 12048) is preferred so every interaction
consistently carries the two fields.

## Data flow summary

```
createPresenterPrepTasks (5 AM cron)
  └─ session 3 days out → Present Event task (owner: presenter|La'a, follow-up: session+1)

createDayOfAttendanceTasks (5 AM cron)
  └─ session today → Take Attendance task (owner: presenter)
       └─ on close (onInteractionUpdatedLifecycle)
            └─ Event Summary task (owner: presenter, follow-up: session+5)  ← was +10
                 └─ on Event Summary form save → auto-close

My Day cards:
  takeAttendance card → [Take Attendance →]   cmsViewSignups(...)
  eventSummary  card → [Open Event Summary →] cmsViewSignups(...) → select session → cmsOpenEventSummary()
```

## Testing

- **Unit/manual (functions):** seed an event with a session 3 days out; run
  `createPresenterPrepTasks`; confirm exactly one `presenterPrep` interaction, correct owner
  (assigned presenter, then La'a fallback when unassigned), `followUpDate = session + 1`, and
  no duplicate on re-run.
- **Event Summary follow-up:** close a Take Attendance task; confirm the spawned Event Summary
  has `followUpDate = session + 5`.
- **Buttons:** in My Day, confirm the takeAttendance card opens the attendance modal for the
  right event/session, and the eventSummary card opens the summary modal pre-selected to the
  right session; confirm `stopPropagation` prevents the detail modal from also opening.
- **Idempotency:** run both crons twice; confirm no duplicate interactions.

## Versioning / deploy notes

- Functions live in **`LDAH_W2/functions`** (project `ldah-932d5`); frontend buttons live in
  **`LDAH-Internal/index.html`**. Two repos.
- Bump LDAH-Int version on the index.html push (feedback: always bump on push).
- Per CF deploy guidance: redeploy the **exported** triggers, including the new
  `createPresenterPrepTasks` schedule and the edited `onInteractionUpdatedLifecycle` /
  `createDayOfAttendanceTasks` / `_lcBuildInteractionDoc`.
- New collection fields only (`workflowEventTitle`, `workflowIsRecurring`, `presenterPrep`
  interactions) — no Firestore rule changes needed for the existing `interactions` collection,
  but confirm the `interactions` rule already permits these writes.

## Open items / future

- Optional `presenterPrep` "review who's coming" button (deferred).
- Backfill is not required: prep tasks are forward-looking; the +5-day change applies to
  newly spawned Event Summary tasks only.
