# Event-Lifecycle Interactions — Design Spec

**Date:** 2026-05-22
**Status:** Draft for review
**Author:** Daniel (DP Consulting) with Claude
**Scope:** First of a planned series of system-wide automated interactions for LDAH. Covers the **event lifecycle** workflow only. Further automations will be added later.

---

## 1 · Purpose

When a one-time event is added to LDAH, a fixed set of staff tasks must happen in a
known order: a presenter gets assigned, the event is verified live on the website and
app, announcements go out, attendance is taken on the day, and an event summary is
completed afterward. Today every one of those is something a staff member has to
remember to do.

This automation turns that sequence into a self-driving chain of **interaction records**.
The system creates each task at the right time, assigns it to the right person, and
creates the next task only when the previous one is done. Staff see their tasks in
**My Day** (interactions flow there by owner) and the chain advances on its own.

## 2 · Scope

**In scope**
- The `events` collection only — one-time events.
- Events created **after** this ships. No backfill of existing events.
- Per-session handling: a one-time event may have multiple session dates
  (`signupDates[]` / `sessions[]`). The day-of steps repeat per session; the setup
  steps happen once per event.

**Out of scope**
- `recurringEvents` (Programs) — these are structured differently and are explicitly
  excluded. A separate automation will be designed for them later if wanted.
- Existing events created before this ships.
- Any change to the public-facing W2 site or App.

## 3 · The workflow

```
EVENT CREATED (events collection)
   │
   ├─▶ [Assign Presenter]  owner: La'a            ─┐
   │                                               │  both open immediately
   └─▶ [Verify Display]    owner: event creator   ─┘
              │
              │ Verify Display closed
              ▼
        [Send Announcements]  owner: event creator
              │
              │ all 3 setup tasks closed
              ▼
   HANDOFF — event's responsible party becomes the PRESENTER
              │
              │ (daily cron) each session's date arrives
              ▼
        [Take Attendance]  owner: presenter  ·  due: that day
              │
              │ Take Attendance closed (manually)
              ▼
        [Event Summary]  owner: presenter  ·  due: +10 days
              │
              │ auto-closes when the Event Summary form is saved
              ▼
   When every session's Event Summary is closed → EVENT COMPLETE
```

### Step detail

| # | Step | Created when | Owner | Status / due |
|---|------|--------------|-------|--------------|
| 1 | **Assign Presenter** | Event created | La'a | Open · due 5 days before first session* |
| 2 | **Verify Display** | Event created | Event creator | Open · due 5 days before first session* |
| 3 | **Send Announcements** | Verify Display closes | Event creator | Open · due 5 days before first session* |
| 4 | **Take Attendance** | Session date arrives (cron) | Presenter | Open · due that session's date |
| 5 | **Event Summary** | Take Attendance closes | Presenter | Open · due session date + 10 days |

\* *If the event is created fewer than 5 days before its first session, the due date is
the next day.*

- **Send Announcements** is sequential — it is not created until **Verify Display** is
  closed (don't announce an event before confirming it actually displays).
- **Assign Presenter** runs in parallel with Verify Display.
- The **handoff** happens once all three setup tasks (1, 2, 3) are closed.
- Steps 4 and 5 repeat **per session** for multi-date events. A single-date event has
  exactly one session.
- "Event's responsible party becomes the presenter": events have no owner field today,
  so this is realized as (a) `lifecycleOwnerUid` recorded on the event and (b) all
  day-of interactions (steps 4, 5) owned by the presenter.

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
| `presenterUid` | string | Presenter's staff UID — set when Assign Presenter is completed. |
| `presenterName` | string | Presenter display name. Also feeds the existing Event Summary presenter field. |
| `lifecycleOwnerUid` | string | The event's current responsible party — flips to the presenter at handoff. |
| `lifecycleStatus` | string | `setup` → `active` (setup done) → `complete` (all sessions summarized). |

### 4.2 Interaction document (`interactions/{id}`)

New fields, written only on workflow-generated interactions, so the engine can find
its own records:

| Field | Type | Purpose |
|-------|------|---------|
| `workflowEventId` | string | The event doc id this task belongs to. |
| `workflowEventCollection` | string | Always `events` for this workflow. |
| `workflowStep` | string | `assignPresenter` · `verifyDisplay` · `sendAnnouncement` · `takeAttendance` · `eventSummary`. |
| `workflowSessionKey` | string | Composite session key for `takeAttendance` / `eventSummary`. Empty for setup steps. |

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

- The **event title** is shown where the contact name normally appears.
- They reach the right staff member through the `owner` / `ownerUid` field, which is
  what feeds **My Day**.
- The Interactions list view will need a small adjustment to render event-linked tasks
  cleanly (no contact). This is the one known UI integration point.

## 5 · Components

| Component | Type | Responsibility |
|-----------|------|----------------|
| **A. `cmsSaveEvent` change** | LDAH-Int client | Stamp `createdByUid` / `createdByName` on new events. Add a **Presenter dropdown** (staff accounts) to the event create/edit form. |
| **B. `onEventCreatedLifecycle`** | Cloud Function — Firestore `onCreate` of `events/{id}` | Create the two initial setup interactions (Assign Presenter, Verify Display). Set `lifecycleStatus: setup`. |
| **C. `onInteractionUpdatedLifecycle`** | Cloud Function — Firestore `onUpdate` of `interactions/{id}` | The chaining engine. Reacts when a workflow interaction closes (see 6.2). |
| **D. `createDayOfAttendanceTasks`** | Cloud Function — scheduled, daily ~5:00 AM HST | Create Take Attendance interactions for sessions dated today. |
| **E. `onEventUpdatedLifecycle`** | Cloud Function — Firestore `onUpdate` of `events/{id}` | (a) Archived/cancelled → auto-close open workflow interactions. (b) Event Summary form saved → auto-close the matching Event Summary task. |
| **F. Interactions list UI** | LDAH-Int client | Render event-linked workflow interactions cleanly (4.4). Block closing **Assign Presenter** while the event has no presenter set. |

Cloud Functions B–E live alongside the existing functions in
`LDAH_W2/functions/index.js`.

## 6 · Detailed behavior

### 6.1 Event created — `onEventCreatedLifecycle`

Fires on create of `events/{id}`.

1. Skip if `archived === true`.
2. Set `lifecycleStatus: setup` on the event.
3. Create two interactions:
   - **Assign Presenter** — `workflowStep: assignPresenter`, owner = La'a
     (resolved from the staff roster / Resource Coordinator persona), status Open,
     `followUpDate` = 5 days before first session (or tomorrow if sooner).
   - **Verify Display** — `workflowStep: verifyDisplay`, owner = `createdByUid`,
     same due date.
4. Each interaction carries `workflowEventId`, `workflowEventCollection: events`, and
   a `summary` naming the event. `workflowSessionKey` empty.
5. **Send Announcements is NOT created here** — it is created later, when Verify
   Display closes.

### 6.2 Interaction closed — `onInteractionUpdatedLifecycle`

Fires on update of `interactions/{id}`. Acts only when a doc with a `workflowStep`
transitions to `status: Closed`.

- **`verifyDisplay` closed** → create the **Send Announcements** interaction
  (`workflowStep: sendAnnouncement`, owner = event's `createdByUid`, Open, due 5 days
  before first session).
- **A setup step closed** (`assignPresenter` / `verifyDisplay` / `sendAnnouncement`) →
  query the other setup interactions for this `workflowEventId`. If **all three are
  Closed**:
  - Read `event.presenterUid`. Set `event.lifecycleOwnerUid = presenterUid` and
    `event.lifecycleStatus = active`.
- **`takeAttendance` closed** → create the **Event Summary** interaction for the same
  `workflowEventId` + `workflowSessionKey` (owner = presenter, Open,
  `followUpDate` = session date + 10 days).
- **`eventSummary` closed** → check every session of the event. If all sessions now
  have a Closed `eventSummary` interaction, set `event.lifecycleStatus = complete`.

All creations are **idempotent**: query for an existing interaction with the same
`workflowEventId` + `workflowStep` (+ `workflowSessionKey` where applicable) before
inserting. A Cloud Function retry cannot produce duplicates.

### 6.3 Day-of attendance — `createDayOfAttendanceTasks`

Scheduled daily ~5:00 AM HST.

1. Find `events` with `lifecycleStatus` set (i.e. workflow events) that are not
   archived and have a session dated **today** (HST).
2. For each such session, create a **Take Attendance** interaction
   (`workflowStep: takeAttendance`, `workflowSessionKey` = that session's key,
   status Open, `followUpDate` = today).
3. Owner = `event.presenterUid`. **Fallback:** if no presenter is set (setup not
   finished in time), owner = `event.createdByUid` — attendance is non-negotiable and
   the task must not be orphaned.
4. Idempotent — skip if a `takeAttendance` interaction already exists for this
   event + session.
5. Session dates are read through the canonical `getEventSessions` helper, so editing
   an event's dates is picked up automatically on the next run.

### 6.4 Presenter capture

- The event create/edit form gains a **Presenter** dropdown populated from LDAH-Int
  staff accounts (presenters are always staff with logins).
- The Assign Presenter task instructs La'a: open the event, choose the Presenter, save,
  then mark this task done.
- **Guardrail:** LDAH-Int blocks closing the Assign Presenter interaction while the
  event's `presenterUid` is empty, with a message ("Set the event's Presenter first").
  This prevents a broken handoff.
- A future refinement could embed the presenter dropdown directly in the interaction;
  out of scope for this round.

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
| Setup not finished by a session's date | Take Attendance is still created; owner falls back to the event creator (6.3.3). |
| Event session dates edited | The day-of cron reads current session dates each run and self-corrects. |
| Pre-existing events (created before ship) | No `lifecycleStatus` → ignored by all functions. No backfill. |
| Staff manually reassign or close a task | Allowed; the workflow reads current state and does not fight manual edits. |
| Presenter left blank | Assign Presenter cannot be closed (6.4); handoff cannot complete until it is set. |

## 8 · Testing & rollout

- **Backend is shared** between STAGE and live (single Firebase project `ldah-932d5`,
  one set of Cloud Functions). This automation ships **to live**. Workflow interactions
  are staff-only — no public or family-facing surface — so the blast radius is
  contained.
- **Verification:** create a throwaway one-time event with a session dated today,
  then walk the full chain — confirm the two setup tasks appear with correct owners
  and due dates; close Verify Display and confirm Send Announcements appears; close all
  three and confirm the presenter handoff; confirm the day-of cron creates Take
  Attendance; close it and confirm Event Summary appears at +10 days; save the summary
  form and confirm the task auto-closes; confirm the event flips to `complete`. Archive
  the test event afterward.
- Cloud Function triggers are redeployed on push (exported triggers only).
- LDAH-Int version is bumped on the push that carries the client changes.

## 9 · Open items / future

- Channel / interactionType display names (4.3) are proposals — easy to rename.
- Embedding the presenter dropdown inside the Assign Presenter interaction (6.4) is a
  later polish.
- This is the first automation in a planned series; later rounds may cover Programs
  (`recurringEvents`) and other automated interactions from the candidate menu in
  `Reports/ldah-automated-interactions-2026-05-22.html`.
