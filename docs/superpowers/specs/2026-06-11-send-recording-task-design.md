# Post-Attendance "Send Recording & Notes" Task — Design Spec

**Date:** 2026-06-11
**Product:** LDAH-Int (`/Volumes/Xcode_Projects/React/LDAH-Internal/index.html`), project `ldah-932d5`
**Status:** Approved by Daniel; build STAGE-first. Entirely client-side in -Int (no Cloud Function, no deploy).

## Goal
After attendance is taken for an event session, remind the session's **presenter** (and **La'a**) to send the Zoom recording + notes to all signups — as a My Day task with a one-click deep-link to the existing per-session recording sender.

## Approved decisions
- **Assignee:** the session's presenter (`presenterUid`) **plus a duplicate task for La'a**. If the session has **no presenter set**, create **only La'a's** copy (no orphaned/unassigned task).
- **Granularity:** **one task per session** that had attendance taken.
- **Auto-close:** when the recording email is actually sent for that event+session, **auto-close** the matching tasks (both assignees).

## Architecture (all client-side, -Int only)
Three touch-points in `index.html`, plus the My Day button:

1. **Creation — in `cmsSaveAttendance` success path (~line 25859).**
   For each session just marked, resolve the presenter from the event doc (`summary.presenterUid` for single, `sessionSummaries[sessionKey].presenterUid` for multi/recurring). Create idempotent `sendRecap` interaction task(s):
   - presenter task (if `presenterUid` set) + La'a task; else La'a task only.
   - Fields mirror the lifecycle task shape: `workflowEventId`, `workflowEventCollection` (events|recurringEvents), `workflowStep: "sendRecap"`, `workflowSessionKey` (**must equal the key the recording sender uses for that session** — see consistency note), `ownerUid`, `owner`, `status: "Open"`, `followUpDate` (attendance day), `summary` (e.g. "Send recording & notes to all signups — <eventTitle> (<friendly session date>)"), `channel: "Event Wrap-Up"`, `interactionType: "Send Recording"`, `createdAt`.
   - **Idempotent:** query `interactions where workflowEventId==e && workflowStep=="sendRecap" && workflowSessionKey==key` (existing composite index) per assignee before creating; skip if present.

2. **My Day deep-link button — render block (~line 5120) + new handler (~near line 5004).**
   New `workflowStep === 'sendRecap'` case → button **"Send Recording & Notes →"** → `myDayOpenRecap(id)` → opens the existing per-session recording modal `cmsOpenRecordingForDate(eventId, eventTitle, sessionDate)` (the same modal as the event card). Resolve `sessionDate`/title from the task doc.

3. **Auto-close — in `cmsRecordingSend` success path (~line 27207+).**
   After a successful send for `ctx.eventId` + `ctx.sessionKey`, query open `sendRecap` interactions matching `workflowEventId==ctx.eventId && workflowStep=="sendRecap" && workflowSessionKey==ctx.sessionKey` and set `status: "Closed"` (batch; covers both presenter + La'a). Fires regardless of whether the send was launched from the task or the event card.

## Consistency note (critical)
The `workflowSessionKey` written at creation MUST be byte-identical to the `sessionKey` the recording sender (`ctx.sessionKey` in `cmsOpenRecordingForDate`/`cmsRecordingSend`) uses for the same session — otherwise auto-close won't match. Implementation step 1 will derive the task's session key via the SAME normalization the recording flow uses (verify the recording modal's `ctx.sessionKey` derivation and reuse it; don't hand-roll a second format). See memory: composite-session-keys, canonical-sessions-pattern.

## La'a uid
Reuse the known La'a uid (`hj6YnfnZ66Yul9mtnULRW5FTWKH3`, the W2 `LIFECYCLE_LAA_UID`) or resolve via userRoles by `LSalvani@LDAHawaii.org`. Confirm/define a single -Int constant.

## Out of scope / not touched
Existing lifecycle CFs, the `sendEventRecordingEmail` CF, the public site. Purely additive -Int UI logic. No new collection. Version bump on push.

## Verification (STAGE)
Take attendance for a multi-session event (e.g. June LL) → confirm a "Send Recording & Notes" task appears in My Day for the presenter (+ La'a), one per session marked, deep-linking to the right session's recording modal. Send the recording → confirm both tasks auto-close. Re-saving attendance does not duplicate tasks.
