# Case-Advocacy Document Vault — Foundation (Authorization + Contact-Level Upload)

**Date:** 2026-06-29
**Status:** Draft for review
**Scope:** Sub-project #1 of 3. (#2 In-app highlighting, #3 Email highlighted copy to parent — separate specs.)
**Author:** Oahu App Design, with Daniel Pellegrini (LDAH)

---

## Problem

The Connect-Gen document pipeline ties documents (IEP / Evaluation) to a **Connect-Gen signup** and gates them behind the **Connect-Gen consent**. But case advocacy applies to families who have **never done Connect-Gen** — e.g. **Brittany Kenui-Lee**, who is in case advocacy with no Connect-Gen signup. For them there is:

1. **No place to store documents** (no CG signup → no `connectGenDocuments`), and
2. **No authorization on file** to legally hold a family's sensitive records.

We need a **contact-level document capability for any case-advocacy contact**, gated by an authorization step, that accepts both digital and scanned (hard-copy) documents.

## Goals

- From **any case-advocacy contact card**, staff can obtain authorization and then upload that family's documents — independent of Connect-Gen.
- **Authorization is a hard prerequisite**: no documents can be uploaded until authorization is recorded.
- Authorization can be obtained **either** by the family **e-signing** a digital release **or** by staff **uploading a signed hard-copy** release.
- Documents may be **digital or scanned** (PDF / JPG / PNG / HEIC).
- Sensitive data is protected and **auto-destroyed 3 days after the case advocacy is closed**.

## Non-goals (this spec)

- In-app highlighting (#2) and email-to-parent of highlighted copies (#3).
- Changing the existing Connect-Gen document pipeline. It is left untouched; this is a **parallel** capability. (A family who is both Connect-Gen and case advocacy may temporarily have documents in both stores; unification is out of scope.)

## Data model

**Firebase Storage** (bucket `ldah-932d5.firebasestorage.app`):
- Authorization release: `caseAdvocacy/{contactId}/authorization-{ts}.{ext}` (only when method = paper).
- Documents: `caseAdvocacy/{contactId}/{docId}-{ts}.{ext}`.
- Storage rules deny all client access; Cloud Functions mediate via the Admin SDK (same posture as `connectGen/`).

**Contact document** (`contacts/{contactId}`):
- `caseAdvocacyAuthorization`:
  - `method`: `"esign" | "paper"`
  - `recordedAt`: timestamp
  - `recordedBy`: staff email (paper) or `"family e-signature"` (esign)
  - e-sign: `signedName`, `signedAt`, `signedIp`, `version`, `consentText` (verbatim copy)
  - paper: `storagePath`, `originalFilename`
- `caseAdvocacyDocuments`: array of
  - `{ docId, label, storagePath, originalFilename, sizeBytes, mimeType, uploadedAt, uploadedByStaff }`
  - `label` is staff-chosen (e.g. "IEP", "Evaluation", "Other").
- `caseAdvocacyDocsDestroyedAt / DestroyedBy / DestroyedReason` (set on destruction; cleared on a fresh upload, mirroring the Connect-Gen pattern).

## Authorization gate

On a case-advocacy contact card (a contact with an **open Case Advocacy interaction**), a **Documents** section appears.

**If `caseAdvocacyAuthorization` is absent → "Authorization required":**
- **E-sign path:** staff click *Send authorization to sign* → CF mints a token and emails the family a link to a public release/authorization form (reuse the Connect-Gen consent-form pattern). Family signs → CF records `caseAdvocacyAuthorization { method: "esign", ... }`.
- **Paper path:** staff click *Upload signed release* → upload the signed PDF/scan → CF records `caseAdvocacyAuthorization { method: "paper", storagePath, ... }`.

**Once authorization exists → document upload is unlocked.** The gate is enforced **server-side** (the upload CF refuses to mint an upload URL if no authorization is on the contact), not just hidden in the UI.

## Document upload

Generalize the staff Connect-Gen upload (just shipped) to contact level. Two role-gated HTTPS Cloud Functions, mirroring `requestStaffConnectGenUploadUrl` / `confirmStaffConnectGenUpload`:

- **`requestCaseAdvocacyUploadUrl`** — staff-authed (admin/superAdmin via `_verifyStaffIdToken`); requires `caseAdvocacyAuthorization` present on the contact; validates mime allowlist + ≤25 MB + label; mints a resumable signed upload URL at `caseAdvocacy/{contactId}/…`. CORS origin echoes the caller (dashboard `danpoahu.github.io`).
- **`confirmCaseAdvocacyUpload`** — validates the uploaded file, HEIC→JPG, appends to `caseAdvocacyDocuments`, clears any prior destroy markers, audit-logs.

Documents (digital or scanned) accept PDF / JPG / PNG / HEIC, ≤25 MB. Staff view/download via short-lived V4 signed read URLs (a `getCaseAdvocacyDocumentDownloadUrl` CF, mirroring the Connect-Gen download function).

## UI

Contact detail card, for contacts with an open Case Advocacy interaction:
- A **Documents** section showing authorization status, the authorize controls (when unauthorized), and — once authorized — an upload control + the list of documents with view/download.
- Reuses the existing "Case Advocacy" pill already on the contact card.

## Lifecycle / retention

- Documents and the authorization release are **retained while the contact has an open Case Advocacy interaction**.
- **Destroy 3 days after the case advocacy is closed.** When the last open Case Advocacy interaction for the contact is closed, the 3-day clock starts. A scheduled cron (`scheduledCaseAdvocacyDocLifecycle`, mirroring `scheduledConnectGenDocLifecycle`) destroys the documents when: the contact has `caseAdvocacyDocuments`, **no open** Case Advocacy interaction, and the **most recent Case Advocacy interaction was closed ≥ 3 days ago**.
  - Requires a reliable **close timestamp** on the Case Advocacy interaction. Closing a Case Advocacy interaction will stamp `caseAdvocacyClosedAt` (or the cron derives it from the interaction's status-change timestamp). If advocacy is re-opened, retention resumes.
- A **courtesy alert** to the case advocate ~1 day before destruction (mirrors the Connect-Gen 23-hour warning), so docs aren't lost silently.
- **Manual destroy** is always available from the Documents section (role-gated, audit-logged).

## Security & privacy

- All CFs role-gated to admin/superAdmin via `_verifyStaffIdToken`.
- Storage rules deny client access to `caseAdvocacy/`; CFs mediate.
- Every authorization, upload, download-URL issuance, and destruction is audit-logged.
- E-sign release stores a verbatim `consentText` + signer name/IP/version for the record.

## Cloud Functions (new)

1. `requestCaseAdvocacyUploadUrl` (HTTPS, staff)
2. `confirmCaseAdvocacyUpload` (HTTPS, staff)
3. `getCaseAdvocacyDocumentDownloadUrl` (HTTPS, staff)
4. `sendCaseAdvocacyAuthorizationLink` (HTTPS, staff) — e-sign path
5. `getCaseAdvocacyAuthorization` / `submitCaseAdvocacyAuthorization` (public GET/POST) — family signs
6. `uploadCaseAdvocacyAuthorizationPaper` path (may reuse the upload CFs with a documentType of `authorization`)
7. `destroyCaseAdvocacyDocuments` (HTTPS, staff) — manual destroy
8. `scheduledCaseAdvocacyDocLifecycle` (cron) — 3-day-after-close auto-destruct + courtesy alert

## Rollout

- STAGE-first for the dashboard UI; deploy the Cloud Functions; version bump on every push.
- New `caseAdvocacy/` Storage rules + any Firestore indexes (e.g., interactions by contactId + type/status for the cron) added before go-live.

## Open questions / assumptions

- **Close timestamp:** confirm closing a Case Advocacy interaction can reliably stamp a close time for the 3-day clock (otherwise add one).
- **Authorization form content:** the release/authorization wording is community/legal-owned (LDAH provides the exact text); this spec assumes a verbatim text is supplied, like the Connect-Gen consent.
- **Multiple advocacy episodes:** retention follows the most recent Case Advocacy interaction's open/closed state.
