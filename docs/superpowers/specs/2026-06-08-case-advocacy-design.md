# Case Advocacy on Interactions — Design

Date: 2026-06-08
App: LDAH-Int (`/Volumes/Xcode_Projects/React/LDAH-Internal/`, single-file `index.html`, vanilla JS + Firestore). STAGE-first, then copy to root per house rules.

## Goal
Let any staff member mark an interaction (a new one, or an existing one such as a feedback follow-up) as **case advocacy**. When turned on, they pick a **case advocate** from the presenter-name list. The system auto-creates a dedicated interaction owned by that advocate ("advocating for <person/family>") with a **3-month follow-up** (length TBD; advocate can adjust), and notifies the advocate.

## Decisions (Daniel, 2026-06-08)
- Advocate picker = **presenter names** (`cmsGetActivePresenterStaff`). Resolve the chosen name → staff `uid` via display-name match in `userRoles` (reuse the assignable-owners bridge) so the task + notification can route.
- **Notify the advocate** (bell + My Day) — reuse `createNotification`.
- Toggle appears on **both** the new-interaction form and the existing-interaction view/edit modal.
- **Reassign on change:** changing the advocate after a task exists moves that existing task to the new owner + notifies.
- Out of scope v1 (not selected): contact-card badge, cross-link navigation UI, focus-area dropdown.

## Data model

### Originating interaction (gets new fields)
- `caseAdvocacy: boolean` — the toggle.
- `caseAdvocateName: string` — selected presenter name.
- `caseAdvocateUid: string` — resolved uid ('' if unresolved).
- `caseAdvocacyStartedAt: serverTimestamp` — when first turned on.
- `caseAdvocacyInteractionId: string` — id of the spawned advocate interaction (idempotency + reassign target).

### Spawned advocate interaction (new doc in `interactions`)
- `interactionType: "Case Advocacy"` (added to the interactionTypes lookup).
- `channel: "Case Advocacy"` (auto-added to lookup, like "Event Feedback").
- `workflowStep: "caseAdvocacy"`.
- `contactId / contactName / contactType` — copied from the originating interaction (the person/family advocated for).
- `summary: "Case advocacy — advocating for <contactName>"`.
- `notes:` short provenance line (started from <type> by <creator> on <date>; original summary appended if present).
- `followUpDate:` today (HST) + 3 months, `YYYY-MM-DD`.
- `status: "Open"`.
- `owner / ownerUid` — resolved advocate.
- `caseAdvocacySourceId:` originating interaction id (back-reference).
- `createdAt / createdBy / createdByUid` — current user.

## Behavior

### On save (new form `saveInteractionToFirestore`, and edit-save path)
1. Read toggle + picker. If toggle off → write `caseAdvocacy:false` on the doc, done.
2. If on but **no contact** on the interaction → block with a heads-up toast (can't advocate for nobody).
3. If on + advocate name chosen:
   - Resolve name → uid (display-name match in `userRoles`/assignable owners).
   - **No existing `caseAdvocacyInteractionId`** → create the advocate interaction (fields above), notify the advocate, stamp `caseAdvocacy/Name/Uid/StartedAt/InteractionId` on the source.
   - **Existing id + same advocate** → no-op (idempotent).
   - **Existing id + different advocate** → update that interaction's `owner/ownerUid` to the new advocate, update `caseAdvocateName/Uid` on source, notify the new advocate. (Reassign.)
   - **Unresolved uid** → still create/record, `ownerUid:''`, show heads-up toast; surfaces nowhere until reassigned with the normal owner-change tool.

### Surfacing
- The advocate interaction is a normal `Open` interaction with `ownerUid` + `followUpDate`, so it appears in the advocate's My Day automatically (existing `(ownerUid, status, followUpDate)` index). No My-Day change needed.

### Notification
`createNotification({ recipientUid, recipientName, type:'case-advocacy-assigned', title:'You're the case advocate for <contactName>', message:'<assignedBy> made you case advocate for <contactName>. 3-month follow-up <date>.', interactionId:<spawnedId> })`.

## UI
- Toggle (styled like existing sliders) labelled **"Case advocacy"** in both the create form (~7399–7498) and the view/edit modal (~16409–16948).
- When on, reveal a **"Case advocate"** `<select>` populated from `cmsGetActivePresenterStaff()`.
- Small inline note when on: "A 3-month follow-up task will be created for the advocate."

## Idempotency & guards
- Dedup by `caseAdvocacyInteractionId` on the source (never spawn twice).
- Requires a contact on the interaction.
- Reassign only fires when the chosen uid differs from `caseAdvocateUid`.
- Turning off after a task exists: set `caseAdvocacy:false` on source, leave the advocate's task in place (real work already assigned).

## Helpers
- `_addMonthsHst(yyyy_mm_dd, n)` → date string.
- `_resolveStaffUidByName(name)` → uid via userRoles/assignable owners (case-insensitive exact display-name match).
- `spawnOrReassignCaseAdvocacy(sourceData, sourceId, advocateName)` → returns `{ interactionId, uid, reassigned }`.

## Lookups
- Add `"Case Advocacy"` to interactionTypes seed (~13257) and `"Case Advocacy"` to channels handling (auto-add pattern, ~13297-style).

## Delivery
STAGE-first: implement in `STAGE/index.html`, bump version, push, Daniel tests per the test plan, then copy STAGE→root.

## Test plan
1. New interaction + advocacy on → advocate task created (3-month follow-up), advocate notified + in My Day, source stamped.
2. Existing feedback-follow-up + advocacy on → same.
3. Re-save → no duplicate (idempotent).
4. Change advocate → existing task reassigned + new owner notified.
5. No-contact → blocked with heads-up.
6. Name without a login → heads-up, recorded, unrouted.
7. Toggle off after task exists → picker hides, task remains.
