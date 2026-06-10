# Photo Release Guardrail — Design Spec

**Date:** 2026-06-09
**Product:** LDAH ecosystem (W2 public site + LDAH-Int staff dashboard, project `ldah-932d5`)
**Status:** Approved by Daniel; build STAGE-first.

## Problem

When a partner edits a Pacific Island page (`pacific.html`, edited via the CMS / page editor) and adds or changes a **photo**, there is currently no control ensuring the people shown have given written permission to appear on the LDAH website. We need a guardrail that prevents a participant's photo from going live until a signed photo release is on file, collected fully electronically.

## Goals

1. Block a person-photo from publishing to the live site until every individual in it has signed an electronic release.
2. Make release collection fully electronic — the partner triggers it; the subject e-signs on a hosted page.
3. Keep La'a and the partner informed via -Int tasks **and** email (partners are rarely in -Int).
4. Give a central place in -Int to see every release and its status.
5. Keep stored photos small (JPEG, < 1 MB).

## Non-goals

- Face detection / automatic identification of who is in a photo (the partner declares the count).
- Tying signatures to specific faces within a group shot (all-signed gates the whole photo).
- Third-party e-signature services (we reuse the existing typed-name signature pattern).

## Flow

### A. Guardrail at photo add/change (partner editor)
- Adding/changing a photo opens a dialog: **"Photos showing people need signed releases before they appear on the live site. How many people in this photo need to sign a release?"** → integer.
  - **0** → no release needed (scenery/flyer/building). Publishes normally.
  - **N ≥ 1** → partner enters N email addresses → **"Send releases & hold photo."**
- The new image is **converted to JPEG, resized, and compressed until < 1 MB**, then uploaded to Storage.
- The change is held in **suspension**: live `pacific.html` keeps showing the **previous** photo. The previous photo URL is preserved (`previousPhotoUrl`) for one-click revert.

### B. Electronic release (subject side)
- New public hosted page `photo-release.html` (W2), modeled on `connect-gen-consent.html`.
- Each subject receives a Resend email with a tokenized link `photo-release.html?token=…`.
- Page shows the release text; subject types legal name to e-sign + checks an agreement box.
- A Cloud Function records `signedAt`, `signedName`, `signedIp`, `consentVersion`, and flips that subject's status to `signed`.

### C. When releases come back
- On each signature: the Photo Releases list updates (X of N); **partner gets a progress email**.
- When **all N** are signed → suspended photo **auto-publishes** to live, and two tasks are created:
  - **La'a:** "Verify new photo on the live Pacific page" — includes a **Revert** button restoring `previousPhotoUrl`.
  - **Partner:** "Verify your new photo on the live site" — plus an **email**.

### D. Stalls & reminders (daily cron, with slack per cron-gap convention)
- **15 days** with anyone still outstanding → one **reminder email** to non-signers (cc partner). Sent once.
- **30 days** still incomplete → a **task to both La'a and the partner** naming exactly who is missing, plus an **email to the partner**. Photo stays suspended. La'a's 30-day task can **cancel/discard** the pending change or keep waiting.

### E. "Photo Releases" list in -Int
- Admin/CMS list: thumbnail, page/island, requester, each subject email + status, count (X of N), dates, and state: **Awaiting / Live / Reverted / Cancelled**.

### F. Partner email touchpoints
Partner is emailed on: each signature (progress), all-signed-and-live (verify task), the 15-day reminder, the 30-day stall.

## Data model

New collection **`photoReleases/{releaseId}`**:
```
pageKey         // e.g. "pacific"
fieldKey        // e.g. "samoaPhoto1"
island          // partner's island
requestedBy      // partner uid
requestedByEmail
requestedAt      // Timestamp
newPhotoUrl      // suspended (pending) image in Storage
previousPhotoUrl // for revert
subjects: [ { email, status: 'pending'|'signed', token, signedAt?, signedName?, signedIp? } ]
state: 'awaiting' | 'live' | 'reverted' | 'cancelled'
publishedAt?     // when auto-published
reminder15SentAt?
stall30TaskAt?
consentVersion   // e.g. "06/2026; RR"
```
Notes: tokens are per-subject, one-time. `serverTimestamp()` not used inside the `subjects` array (use `Timestamp.now()` per array-timestamp convention).

## Security rules
- `photoReleases`: read for authenticated staff/partners; writes via Cloud Functions only (Admin SDK). Public subject signing goes through a CF (`submitPhotoRelease`) keyed by token, not direct client write. Add an explicit rule (default-deny convention).

## Cloud Functions (W2 `functions/`, ldah-932d5, Resend + emailLog)
- `createPhotoReleaseRequest` — called from editor: stores suspended photo + subjects, mints tokens, emails each subject, logs to `emailLog`.
- `getPhotoRelease` — token → release context for the hosted page.
- `submitPhotoRelease` — token → record signature; if all signed: publish photo to `pageContent`, create La'a + partner tasks, email partner; else email partner progress.
- `photoReleaseReminders` (daily cron) — 15-day reminder + 30-day stall task/email, with slack.

## Front-end
- **Partner editor** (page-admin.html / wherever partners upload): the count+emails dialog, JPEG/<1MB conversion, suspend-instead-of-publish, call `createPhotoReleaseRequest`. *(Confirm exact editor location during planning.)*
- **`photo-release.html`** (W2, public): the hosted signing page.
- **-Int**: "Photo Releases" list + the Revert action on La'a's verify task.

## Tasks / notifications
Reuse the existing -Int task + bell-notification system. La'a's verify task carries a Revert button; the 30-day task carries who's-missing detail + cancel/keep-waiting. Every partner-facing task also emails the partner.

## Rollout
STAGE-first: W2 STAGE (release page + CFs behind a staging path or flag) and -Int STAGE (list + tasks). Test desktop + iPad. Promote to live only after sign-off. Draft release wording delivered as an HTML preview for approval before go-live.

## Open items to confirm during planning
- Exact editor surface partners use to change `pacific.html` photos (page-admin.html in W2 vs. an in-Int editor) — hook the guardrail there.
- Final release legal wording + version string.
