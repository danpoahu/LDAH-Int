# Event-Lifecycle Interactions — Design Spec

**Date:** 2026-05-22 (rev. 2)
**Status:** Draft for review
**Author:** Daniel (DP Consulting) with Claude
**Scope:** First of a planned series of system-wide automated interactions for LDAH. Covers the **event lifecycle** workflow only. Further automations will be added later.

---

## 1 · Purpose

When a one-time event is added to LDAH, a fixed set of staff tasks must happen in a
known order: presenters get assigned (per session), the event is verified live on the
website and app, announcements go out (per session), attendance is taken on each
session's date, and an event summary is completed afterward for each session. Today
every one of those is something a staff member has to remember to do.

This automation turns that sequence into a self-driving chain of **interaction records**.
The system creates each task at the right time, assigns it to the right person, and
creates the next task only when the previous one is done. Staff see their tasks in
**My Day** (interactions flow there by owner) and the chain advances on its own.

## 2 · Scope

**In scope**
- The `events` collection only — one-time events.
- Events created **after** this ships. No backfill of existing events.
- Per-session handling: a one-time event may have multiple session dates
  (`signupDates[]` / `sessions[]`). Steps 1, 3, 4, and 5 all repeat per session.
  Only step 2 (Verify Display) is once per event.

**Out of scope**
- `recurringEvents` (Programs) — these are structured differently and are explicitly
  excluded. A separate automation will be designed for them later if wanted.
- Existing events created before this ships.
- Any change to the public-facing W2 site or App.

## 3 · The workflow

```
EVENT CREATED (events collection)
   │
   │ Created upfront, all due on the event's startDate
   │ (the date it is posted to the public space):
   │
   │   For each session:
   │     ├─▶ [Assign Presenter — session N]  owner: La'a
   │     └─▶ [Send Announcements — session N]  owner: event creator
   │
   │   Once for the event:
   │     └─▶ [Verify Display]  owner: event creator
   │         (can only be completed once startDate has arrived
   │          and the event is publicly visible)
   │
   │ Per-session handoff fires when, for a given session,
   │   [Assign Presenter] for THAT session is closed
   │   AND the event's [Verify Display] is closed.
   │   (Send Announcements does NOT gate the handoff — it may not
   │    happen for every event.)
   ▼
   PER-SESSION HANDOFF — that session's responsible party
   becomes its presenter (captured when Assign Presenter is closed)
   │
   │ (daily cron) each session's date arrives
   ▼
   [Take Attendance — session N]  owner: that session's presenter
        ·  due: that day
   │
   │ Closed manually by the presenter
   ▼
   [Event Summary — session N]   owner: that session's presenter
        ·  due: session date + 10 days
   │
   │ Auto-closes when the Event Summary form is saved
   ▼
   When every session's Event Summary is closed → EVENT COMPLETE
```

### Step detail

| # | Step | Per session? | Created when | Owner | Due |
|---|------|--------------|--------------|-------|-----|
| 1 | **Assign Presenter** | **Yes** — one per session | Event created | La'a | event `startDate` |
| 2 | **Verify Display** | No — once per event | Event created | Event creator | event `startDate`* |
| 3 | **Send Announcements** | **Yes** — one per session | Event created | Event creator | event `startDate` |
| 4 | **Take Attendance** | Yes | That session's date arrives (cron) | That session's presenter | that session's date |
| 5 | **Event Summary** | Yes | That session's Take Attendance closes | That session's presenter | session date + 10 days |

\* *Steps 1, 2, and 3 share the same due date — the event's `startDate`, the day it is
posted to the public space. The exception is the **nature** of step 2: Verify Display
can only be **completed** on or after `startDate`, because there's nothing public to
verify before that point. Steps 1 and 3 can be done any time between event creation
and `startDate`.*

- All three setup tasks (1, 2, 3) are **created at event creation**. None are
  sequential.
- The **per-session handoff** is gated on step **1 (for that session) + step 2 (event-
  wide)**. Step 3 does not gate it.
- Each session is independent: one session can hand off and move into Take Attendance
  while another session's Assign Presenter is still open.
- A single-date event has exactly one session — the table still applies, with one
  instance of each per-session step.

## 4 · Data model changes

### 4.1 Event document (`events/{id}`)

Set at creation (new — `cmsSaveEvent` must write these):

| Field | Type | Purpose |
|-------|------|---------|
| `createdByUid` | string | Staff UID who created the event — routes setup tasks 2 & 3. |
| `createdByName` | string | Display name of the creator. |

Set by the workflow as it runs:

| Field | Type | Purpose |
|-------|------|---------|
| `sessionPresenters` | map | Keyed by session key. Each entry: `{ uid, name }`. Written when that session's Assign Presenter interaction is closed. Feeds the owner of downstream Take Attendance / Event Summary tasks and the existing Event Summary presenter field. |
| `lifecycleStatus` | string | `setup` (initial) → `complete` (every session's Event Summary closed). The in-between state is per-session and lives on the interaction records themselves. |

### 4.2 Interaction document (`interactions/{id}`)

New fields, written only on workflow-generated interactions, so the engine can find
its own records:

| Field | Type | Purpose |
|-------|------|---------|
| `workflowEventId` | string | The event doc id this task belongs to. |
| `workflowEventCollection` | string | Always `events` for this workflow. |
| `workflowStep` | string | `assignPresenter` · `verifyDisplay` · `sendAnnouncement` · `takeAttendance` · `eventSummary`. |
| `workflowSessionKey` | string | Composite session key for the per-session steps (1, 3, 4, 5). Empty for `verifyDisplay`. |
| `assignedPresenterUid` | string | On a closed `assignPresenter` interaction only — captured from the staff selector at close time. Source of truth for the session's presenter (mirrored into `event.sessionPresenters`). |

### 4.3 Channel / interactionType values (PROPOSED — rename freely)

These populate the Interactions lookup lists:

| `workflowStep` | `channel` | `interactionType` |
|----------------|-----------|-------------------|
| assignPresenter | Event Setup | Assign Presenter |
| verifyDisplay | Event Setup | Verify Display |
| sendAnnouncement | Event Setup | Send Announcements |
| takeAttendance | Event Day | Take Attendance |
| eventSummary | Event Wrap-Up | Event Summary |

### 4.4 Workflow interactions vs. contact interactions

Today an interaction is about a **parent contact**. These workflow interactions are
about an **event** — they have no `contactId`. Display treatment:

- The **event title** (plus session date for per-session tasks) is shown where the
  contact name normally appears.
- They reach the right staff member through the `owner` / `ownerUid` field, which is
  what feeds **My Day**.
- The Interactions list view will need a small adjustment to render event-linked tasks
  cleanly (no contact). This is the one known UI integration point.

## 5 · Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| **A. `cmsSaveEvent` change** | LDAH-Int client | Stamp `createdByUid` / `createdByName` on new events. |
| **B. `onEventCreatedLifecycle`** | Cloud Function — Firestore `onCreate` of `events/{id}` | Read sessions via `getEventSessions`. Create one Verify Display interaction, plus one Assign Presenter and one Send Announcements per session. Set `lifecycleStatus: setup`. |
| **C. `onInteractionUpdatedLifecycle`** | Cloud Function — Firestore `onUpdate` of `interactions/{id}` | The chaining engine. Reacts when a workflow interaction closes (see 6.2). |
| **D. `createDayOfAttendanceTasks`** | Cloud Function — scheduled, daily ~5:00 AM HST | Create Take Attendance interactions for sessions dated today. |
| **E. `onEventUpdatedLifecycle`** | Cloud Function — Firestore `onUpdate` of `events/{id}` | (a) Archived/cancelled → auto-close open workflow interactions. (b) An Event Summary form saved → auto-close the matching Event Summary task for that session. |
| **F. Interactions list / close-task UI** | LDAH-Int client | Render event-linked workflow interactions cleanly (4.4). When closing an `assignPresenter` interaction, present a **staff dropdown** to pick the presenter; closing is blocked until one is chosen. The selection writes to `assignedPresenterUid` on the interaction. |

Cloud Functions B–E live alongside the existing functions in
`LDAH_W2/functions/index.js`.

## 6 · Detailed behavior

### 6.1 Event created — `onEventCreatedLifecycle`

Fires on create of `events/{id}`.

1. Skip if `archived === true`.
2. Set `lifecycleStatus: setup` on the event.
3. Read the event's sessions via the canonical `getEventSessions` helper.
4. Create **one** Verify Display interaction:
   - `workflowStep: verifyDisplay`, `workflowSessionKey: ""`
   - owner = `createdByUid`
   - status Open, `followUpDate` = `startDate`
5. For **each session** (key from `getEventSessions`):
   - Create an Assign Presenter interaction:
     - `workflowStep: assignPresenter`, `workflowSessionKey` = session key
     - owner = La'a (resolved from the staff roster / Resource Coordinator persona)
     - status Open, `followUpDate` = `startDate`
   - Create a Send Announcements interaction:
     - `workflowStep: sendAnnouncement`, `workflowSessionKey` = session key
     - owner = `createdByUid`
     - status Open, `followUpDate` = `startDate`
6. Each interaction carries `workflowEventId`, `workflowEventCollection: events`, and
   a `summary` naming the event (plus session date where applicable).

### 6.2 Interaction closed — `onInteractionUpdatedLifecycle`

Fires on update of `interactions/{id}`. Acts only when a doc with a `workflowStep`
transitions to `status: Closed`.

- **`assignPresenter` closed:** read `assignedPresenterUid` from the interaction
  (guaranteed present — the close-task UI requires it, §6.4). Write the
  `{uid, name}` to `event.sessionPresenters[workflowSessionKey]`. That session's
  presenter is now recorded.
- **`verifyDisplay` closed:** no further action — this is the event-wide gate. Other
  sessions read it directly when needed.
- **`takeAttendance` closed:** create the Event Summary interaction for the same
  `workflowEventId` + `workflowSessionKey`:
  - owner = `event.sessionPresenters[sessionKey].uid` (fallback: event creator)
  - Open, `followUpDate` = session date + 10 days
- **`eventSummary` closed:** if every session of the event now has a Closed
  `eventSummary` interaction, set `event.lifecycleStatus = complete`.
- **`sendAnnouncement` closed:** no chaining action. Recorded for audit only.

The **per-session handoff** is therefore implicit: a session is "handed off" once
*both* its `assignPresenter` is closed (presenter recorded) *and* the event's
`verifyDisplay` is closed. The day-of cron (§6.3) uses these two facts together to
decide who owns the Take Attendance task.

All creations are **idempotent**: query for an existing interaction with the same
`workflowEventId` + `workflowStep` (+ `workflowSessionKey` where applicable) before
inserting. A Cloud Function retry cannot produce duplicates.

### 6.3 Day-of attendance — `createDayOfAttendanceTasks`

Scheduled daily ~5:00 AM HST.

1. Find `events` with `lifecycleStatus` set (workflow events) that are not archived
   and have a session dated **today** (HST).
2. For each such session, create a **Take Attendance** interaction
   (`workflowStep: takeAttendance`, `workflowSessionKey` = that session's key,
   status Open, `followUpDate` = today).
3. Owner selection:
   - If the session has been handed off (its `assignPresenter` is closed **and** the
     event's `verifyDisplay` is closed) → owner = `event.sessionPresenters[sessionKey].uid`.
   - Otherwise → owner = `event.createdByUid` (fallback so attendance is never
     orphaned).
4. Idempotent — skip if a `takeAttendance` interaction already exists for this
   event + session.
5. Session dates are read through `getEventSessions`, so editing an event's dates is
   picked up automatically on the next run.

### 6.4 Presenter capture

- Presenter is captured **per session**, inline when closing each Assign Presenter
  interaction. A staff-account dropdown appears in the close-task flow whenever
  `workflowStep === 'assignPresenter'`.
- **Guardrail:** the LDAH-Int UI blocks closing an Assign Presenter interaction until
  the dropdown has a selection. This is enforced client-side; an additional
  server-side check in `onInteractionUpdatedLifecycle` re-opens the interaction
  (and logs) if a close ever sneaks through without `assignedPresenterUid`.
- The selection is written to the interaction (`assignedPresenterUid`) and mirrored
  to `event.sessionPresenters[sessionKey]` by the chain engine (§6.2).
- There is no event-level Presenter field — that concept has moved to the per-
  session map.

### 6.5 Event Summary auto-close

When the existing Event Summary form for a session is saved (`completedAt` is set on
`events/{id}.summary` for single-date events, or on
`events/{id}/sessionSummaries/{sessionKey}` for multi-date), `onEventUpdatedLifecycle`
finds the matching open `eventSummary` interaction and closes it. The task therefore
cannot be checked off without the actual summary existing. **Take Attendance** has no
equivalent clean signal and is closed manually by the presenter.

## 7 · Edge cases & guardrails

| Case | Handling |
|------|----------|
| Cloud Function retry / double-fire | Every creation queries before inserting (6.2, 6.3). |
| Event archived or cancelled mid-chain | `onEventUpdatedLifecycle` auto-closes all open workflow interactions for the event with an explanatory note. |
| Session date arrives before handoff (presenter not assigned OR display not verified) | Take Attendance is still created; owner falls back to the event creator (§6.3.3). |
| Event session dates edited | The day-of cron reads current session dates each run and self-corrects. |
| Pre-existing events (created before ship) | No `lifecycleStatus` → ignored by all functions. No backfill. |
| Staff manually reassign or close a task | Allowed; the workflow reads current state and does not fight manual edits. |
| Send Announcements not done | No impact on handoff or downstream. The task is left open or manually closed; the chain proceeds regardless. |
| Assign Presenter closed without a selection | Blocked at the UI layer; server-side recovery in `onInteractionUpdatedLifecycle` re-opens it if it somehow happens. |

## 8 · Testing & rollout

- **Backend is shared** between STAGE and live (single Firebase project `ldah-932d5`,
  one set of Cloud Functions). This automation ships **to live**. Workflow interactions
  are staff-only — no public or family-facing surface — so the blast radius is
  contained.
- **Verification:** create a throwaway one-time event with two sessions, the first
  dated today, the second a few days out. Walk the full chain — confirm one Verify
  Display task + two Assign Presenter tasks (one per session) + two Send Announcements
  tasks (one per session) appear with correct owners and due dates. Close La'a's first
  Assign Presenter (selecting a presenter), close Verify Display, and confirm only the
  first session has handed off. Confirm the day-of cron creates a Take Attendance for
  the first session owned by that session's presenter; close it and confirm the Event
  Summary task appears at +10 days. Save the actual Event Summary form and confirm the
  task auto-closes. Repeat for the second session on its date; once both Event
  Summaries are closed, confirm the event flips to `complete`. Archive afterward.
- Cloud Function triggers are redeployed on push (exported triggers only).
- LDAH-Int version is bumped on the push that carries the client changes.

## 9 · Open items / future

- Channel / interactionType display names (4.3) are proposals — easy to rename.
- This is the first automation in a planned series; later rounds may cover Programs
  (`recurringEvents`) and other automated interactions from the candidate menu in
  `Reports/ldah-automated-interactions-2026-05-22.html`.
