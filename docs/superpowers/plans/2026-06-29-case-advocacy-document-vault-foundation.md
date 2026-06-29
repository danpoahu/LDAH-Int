# Case-Advocacy Document Vault — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let staff obtain a family's authorization and upload that family's documents from any case-advocacy contact card, independent of Connect-Gen, with auto-destruction 3 days after the case advocacy closes.

**Architecture:** Contact-level documents in Firebase Storage (`caseAdvocacy/{contactId}/…`) with metadata on the contact doc. Backend is role-gated HTTPS Cloud Functions that mirror the just-shipped staff Connect-Gen upload functions; an authorization gate (e-sign OR uploaded paper release) is enforced server-side before any document upload. Frontend is a "Case Advocacy Documents" section on the contact card. A daily cron destroys documents 3 days after the last Case Advocacy interaction closes.

**Tech Stack:** Firebase (Firestore, Storage, Cloud Functions 1st-gen Node 20, Cloud Scheduler), Resend (email), pdf-lib not needed this phase, vanilla inline JS in `index.html`. No test framework — verification is syntax checks + Firestore/Storage probes + STAGE manual test.

## Global Constraints

- Project `ldah-932d5`; Storage bucket `ldah-932d5.firebasestorage.app`.
- All staff CFs role-gated to **admin/superAdmin** via the existing `_verifyStaffIdToken(idToken)` helper (W2 `functions/index.js`).
- Mime allowlist + 25 MB cap: reuse `CONNECT_GEN_UPLOAD_MIME_EXT` and `CONNECT_GEN_UPLOAD_MAX_BYTES`.
- Resumable upload `origin` echoes the caller: `req.headers.origin || "https://danpoahu.github.io"` (dashboard origin, NOT www.ldahawaii.org).
- Documents attach to the **contact** (`contacts/{contactId}`), never a Connect-Gen signup. Leave the Connect-Gen pipeline untouched.
- **Authorization is a hard prerequisite**, enforced server-side in the upload-request CF.
- Audit-log every authorization, upload, download-URL issuance, and destruction (collection `auditLog`, `timestamp: serverTimestamp()`, matching existing CG audit entries).
- Frontend: **STAGE-first**, then promote to live by copy-STAGE→live + strip the `with-stage-banner` body class, `#stageBanner` div, and `-STAGE` version suffix. **Bump the visible version on every push** (`.1` for adjusts, full integer for features).
- End state: feature live on **both live and STAGE**.

---

### Task 1: Storage rules + Firestore index for the case-advocacy path

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/storage.rules` (locate the `connectGen/` rule; add a parallel `caseAdvocacy/` rule)
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/firestore.indexes.json` (if a composite index is needed; see step 3)

**Interfaces:**
- Produces: a Storage path `caseAdvocacy/{contactId}/…` that denies all client read/write (CF-mediated), matching the `connectGen/` posture.

- [ ] **Step 1:** Open `storage.rules`, find the `match /connectGen/{allPaths=**}` block (deny all client access). Add an identical block for `match /caseAdvocacy/{allPaths=**} { allow read, write: if false; }`.
- [ ] **Step 2:** Decide indexes: the lifecycle cron queries `interactions where contactId == X` (single-field, auto-indexed) then filters type/status in code — **no composite index needed**. The contact-card render likewise queries by `contactId` only. So `firestore.indexes.json` likely needs **no change**; confirm by grepping existing `interactions` indexes.
- [ ] **Step 3:** Verify rules compile: `cd /Volumes/Xcode_Projects/React/LDAH_W2 && firebase deploy --only storage --project ldah-932d5 --dry-run` (or deploy in Task 6). Expected: no rule syntax errors.
- [ ] **Step 4:** Commit. `git add storage.rules firestore.indexes.json && git commit -m "Storage rules: deny client access to caseAdvocacy/ path"`

---

### Task 2: Backend — contact-level upload, download, and destroy functions

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js` (add functions immediately after the staff Connect-Gen functions `requestStaffConnectGenUploadUrl` / `confirmStaffConnectGenUpload` / `getConnectGenDocumentDownloadUrl`, ~line 10897–11075, keeping the case-advocacy staff functions grouped)

**Interfaces:**
- Consumes: `_verifyStaffIdToken`, `CONNECT_GEN_UPLOAD_MIME_EXT`, `CONNECT_GEN_UPLOAD_MAX_BYTES`, `heicConvert`, `admin`, `FieldValue`.
- Produces (all HTTPS, base `https://us-central1-ldah-932d5.cloudfunctions.net/`):
  - `requestCaseAdvocacyUploadUrl` ← `{ idToken, contactId, label, documentType?, mimeType, sizeBytes, originalFilename }` → `{ ok, uploadUrl, storagePath, docId }`
  - `confirmCaseAdvocacyUpload` ← `{ idToken, contactId, docId, label, storagePath, originalFilename, sizeBytes, mimeType }` → `{ ok }`
  - `getCaseAdvocacyDocumentDownloadUrl` ← `{ idToken, contactId, docId }` → `{ url, expiresAt }`
  - `destroyCaseAdvocacyDocuments` ← `{ idToken, contactId, reason, docId? }` → `{ ok, deleted }`
- Contact metadata shape written: `caseAdvocacyDocuments` = array of `{ docId, label, storagePath, originalFilename, sizeBytes, mimeType, uploadedAt, uploadedByStaff }`.

- [ ] **Step 1:** Implement `requestCaseAdvocacyUploadUrl` by copying `requestStaffConnectGenUploadUrl` and changing: (a) resolve the contact via `contacts/{contactId}` (404 if missing); (b) **gate**: read the contact; if `caseAdvocacyAuthorization` is absent, return `403 {error:"Authorization required before uploading documents."}`; (c) storagePath `caseAdvocacy/${contactId}/${docId}-${ts}.${ext}` where `docId` is a fresh random id (`admin.firestore().collection('_').doc().id`); (d) return `docId` too. Keep the `origin` echo + mime/size validation identical.
- [ ] **Step 2:** Implement `confirmCaseAdvocacyUpload` by copying `confirmStaffConnectGenUpload` and changing the write: read `contacts/{contactId}`, append `{docId,label,storagePath,originalFilename,sizeBytes,mimeType,uploadedAt:serverTimestamp(),uploadedByStaff}` to `caseAdvocacyDocuments` (read-modify-write the array), and clear `caseAdvocacyDocsDestroyedAt/By/Reason` via `FieldValue.delete()`. Keep HEIC→JPG + path-scope re-check (`caseAdvocacy/${contactId}/`). Audit-log `"Case-advocacy document uploaded by staff"`.
- [ ] **Step 3:** Implement `getCaseAdvocacyDocumentDownloadUrl` by copying `getConnectGenDocumentDownloadUrl`; look up the doc by `docId` in the contact's `caseAdvocacyDocuments`; V4 signed read URL (10-min expiry); audit-log issuance.
- [ ] **Step 4:** Implement `destroyCaseAdvocacyDocuments`: staff-authed; if `docId` given, delete that one Storage file + remove from the array; else delete all `caseAdvocacy/{contactId}/` doc files + set `caseAdvocacyDocuments: []` and stamp `caseAdvocacyDocsDestroyedAt/By/Reason`. Audit-log.
- [ ] **Step 5:** Verify syntax: `cd /Volumes/Xcode_Projects/React/LDAH_W2/functions && node -c index.js`. Expected: no errors. Confirm the four function names exist and the gate (`Authorization required`) is present only in the request CF.
- [ ] **Step 6:** Commit. `git add functions/index.js && git commit -m "Case-advocacy docs: contact-level upload/download/destroy CFs (auth-gated)"`

---

### Task 3: Backend — authorization (e-sign flow + paper upload) + public form

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js`
- Create: `/Volumes/Xcode_Projects/React/LDAH_W2/case-advocacy-authorization.html` (public e-sign form; mirror `connect-gen-consent.html`)

**Interfaces:**
- Consumes: `_verifyStaffIdToken`, Resend send helper (`sendEmailViaResend`), `lifecycleFromAddress`, `buildSignatureBlock`, contact `email`/`displayName`.
- Produces:
  - `sendCaseAdvocacyAuthorizationLink` (HTTPS, staff) ← `{ idToken, contactId }` → emails the family a signing link; stores `caseAdvocacyAuthToken` + `caseAdvocacyAuthTokenExpiresAt` on the contact.
  - `getCaseAdvocacyAuthorization` (HTTPS, public GET) ← `?token=` → `{ ok, contactName, authorizationText }`.
  - `submitCaseAdvocacyAuthorization` (HTTPS, public POST) ← `{ token, typedName, agree:true }` → records `contacts/{contactId}.caseAdvocacyAuthorization = { method:"esign", signedName, signedAt, signedIp, version, consentText, recordedAt }`; deletes the token.
  - `confirmCaseAdvocacyAuthorizationPaper` (HTTPS, staff) ← `{ idToken, contactId, storagePath, originalFilename, sizeBytes, mimeType }` → records `caseAdvocacyAuthorization = { method:"paper", storagePath, originalFilename, recordedAt, recordedBy }`. (Paper file is uploaded via `requestCaseAdvocacyUploadUrl` with `documentType:"authorization"` → path `caseAdvocacy/{contactId}/authorization-{ts}.{ext}`, then this confirm records it instead of appending to documents.)

- [ ] **Step 1:** Add a module-level constant `CASE_ADVOCACY_AUTH_TEXT` and `CASE_ADVOCACY_AUTH_VERSION`. Use a clearly-marked placeholder release text with a comment `// TODO(LDAH): replace with the LDAH-supplied authorization wording` — this is the one spec open-item; surface it in the handoff so Daniel supplies final copy before go-live. (This is a known content gap, not a code placeholder.)
- [ ] **Step 2:** Implement `sendCaseAdvocacyAuthorizationLink` (mirror `submitConnectGenConsent`'s token mint + `sendEmailViaResend`): generate a 16-byte hex token, store `caseAdvocacyAuthToken` + 7-day expiry on the contact, email `contact.email` a link `https://www.ldahawaii.org/case-advocacy-authorization.html?token=<token>`. Audit-log.
- [ ] **Step 3:** Implement `getCaseAdvocacyAuthorization` (mirror `getConnectGenConsent`): look up contact by `caseAdvocacyAuthToken`; 404/410 handling; return `contactName` + `CASE_ADVOCACY_AUTH_TEXT`.
- [ ] **Step 4:** Implement `submitCaseAdvocacyAuthorization` (mirror `submitConnectGenConsent`): validate typedName (≥3 chars, has space) + `agree===true`; write `caseAdvocacyAuthorization` (method esign) with verbatim text + IP; delete the token. Audit-log.
- [ ] **Step 5:** Implement `confirmCaseAdvocacyAuthorizationPaper` (staff): validate path scope `caseAdvocacy/{contactId}/authorization-`; confirm file exists; write `caseAdvocacyAuthorization` (method paper). Audit-log.
- [ ] **Step 6:** Create `case-advocacy-authorization.html` by copying `connect-gen-consent.html` and swapping the GET/POST endpoints to the two new public functions + the new auth text. Keep the e-signature styling.
- [ ] **Step 7:** Verify: `node -c functions/index.js` (no errors); open `case-advocacy-authorization.html` locally to confirm it renders (will show "invalid token" without a real token — acceptable).
- [ ] **Step 8:** Commit. `git add functions/index.js case-advocacy-authorization.html && git commit -m "Case-advocacy authorization: e-sign flow + paper-release confirm + public form"`

---

### Task 4: Backend — close timestamp + 3-day-after-close lifecycle cron

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html` (stamp a close time when a Case Advocacy interaction is closed)
- Modify: `/Volumes/Xcode_Projects/React/LDAH_W2/functions/index.js` (the cron)

**Interfaces:**
- Consumes: `changeInteractionStatus` (INT), `_destroyConnectGenStorageFiles`-style storage delete, `createNotification` (for the courtesy alert).
- Produces: `scheduledCaseAdvocacyDocLifecycle` (PubSub cron, daily). Interaction field `caseAdvocacyClosedAt` set when a Case Advocacy interaction status → Closed.

- [ ] **Step 1:** In INT `changeInteractionStatus` (and the inline status changer), when the interaction's `interactionType === 'Case Advocacy'` and the new status is `Closed`, also set `caseAdvocacyClosedAt: serverTimestamp()` on the interaction. (If re-opened, clear it.) Locate via `grep -n "changeInteractionStatus" STAGE/index.html`.
- [ ] **Step 2:** Implement `scheduledCaseAdvocacyDocLifecycle` in W2 `functions/index.js`, mirroring `scheduledConnectGenDocLifecycle` (daily, Pacific/Honolulu). Logic: query `contacts where caseAdvocacyDocuments != null` (or scan contacts with the field); for each, query `interactions where contactId == cid`; let `openAdv` = any Case Advocacy interaction with status Open; let `lastClosed` = max `caseAdvocacyClosedAt` among Case Advocacy interactions. If `!openAdv` and `lastClosed` exists and `now - lastClosed >= 3 days` → destroy all `caseAdvocacy/{cid}/` files + clear `caseAdvocacyDocuments` + stamp destroyed markers (`destroyedBy: "system (3-day post-advocacy)"`); audit-log. **Courtesy alert:** if `!openAdv` and `now - lastClosed >= 2 days` and not yet alerted (`caseAdvocacyDocsAlertSentAt` unset) → `createNotification` to the advocate (owner of the closed interaction) and stamp the alert flag.
- [ ] **Step 3:** Verify: `node -c functions/index.js`; reason through the date math (HST). Confirm the cron skips contacts with an open Case Advocacy interaction and those closed < 3 days.
- [ ] **Step 4:** Commit (both repos). W2: `git commit -m "Case-advocacy docs: 3-day-after-close auto-destruct cron + courtesy alert"`. INT STAGE: `git commit -m "STAGE: stamp caseAdvocacyClosedAt when a Case Advocacy interaction is closed"` (version bump in Task 5).

---

### Task 5: Frontend — "Case Advocacy Documents" section on the contact card (STAGE)

**Files:**
- Modify: `/Volumes/Xcode_Projects/React/LDAH-Internal/STAGE/index.html`

**Interfaces:**
- Consumes: the Task 2/3 CFs; `_cmsCgDocViewer`-style 3-step upload pattern from `cmsCgDocStaffUploadOne`; `firebase.auth().currentUser.getIdToken()`; `_showToast`; `rsEscape`; the open-Case-Advocacy detection already used by the "Case Advocacy" pill.
- Produces: a Documents section rendered in `openContactDetail` for contacts with an open Case Advocacy interaction.

- [ ] **Step 1:** In the contact-detail render (where the Case Advocacy pill query runs), when the contact has an open Case Advocacy interaction, render a **Case Advocacy Documents** card: read `c.caseAdvocacyAuthorization` and `c.caseAdvocacyDocuments`.
- [ ] **Step 2:** If `caseAdvocacyAuthorization` is absent → render "Authorization required" with two buttons: **Send authorization to sign** (`onclick` → POST `sendCaseAdvocacyAuthorizationLink` with idToken+contactId, toast result) and **Upload signed release** (file picker → 3-step upload with `documentType:"authorization"` → then `confirmCaseAdvocacyAuthorizationPaper`).
- [ ] **Step 3:** If authorized → show a "method/recorded" line, an **upload control** (label text input + file picker + Upload button → 3-step `requestCaseAdvocacyUploadUrl` → PUT → `confirmCaseAdvocacyUpload`, mirroring `cmsCgDocStaffUploadOne`), and a **document list** (each row: label, filename, View [`getCaseAdvocacyDocumentDownloadUrl` → open url], Remove [`destroyCaseAdvocacyDocuments` with docId, confirm first]).
- [ ] **Step 4:** Bump the STAGE version (e.g. `v146.0.0-STAGE`).
- [ ] **Step 5:** Verify inline-script syntax: `node -e '…the 16-block check…'` → `errors: 0`. Confirm the new functions are defined and the section only renders for case-advocacy contacts.
- [ ] **Step 6:** Commit + push STAGE. `git add STAGE/index.html && git commit -m "STAGE v146.0.0: Case Advocacy Documents section (authorize + upload + view/remove)" && git push origin main`

---

### Task 6: Deploy backend, STAGE-test, promote to live + STAGE

**Files:** none new (deploy + promote)

- [ ] **Step 1:** Deploy CFs: `cd /Volumes/Xcode_Projects/React/LDAH_W2 && firebase deploy --only functions:requestCaseAdvocacyUploadUrl,functions:confirmCaseAdvocacyUpload,functions:getCaseAdvocacyDocumentDownloadUrl,functions:destroyCaseAdvocacyDocuments,functions:sendCaseAdvocacyAuthorizationLink,functions:getCaseAdvocacyAuthorization,functions:submitCaseAdvocacyAuthorization,functions:confirmCaseAdvocacyAuthorizationPaper,functions:scheduledCaseAdvocacyDocLifecycle --project ldah-932d5`.
- [ ] **Step 2:** Deploy storage rules: `firebase deploy --only storage --project ldah-932d5`. Push W2 source (`git push`), and push `case-advocacy-authorization.html` so the public form is live on GitHub Pages.
- [ ] **Step 3:** STAGE test with **Brittany Kenui-Lee**: open her contact (she has an open Case Advocacy interaction) → "Authorization required" appears → test **both** authorize paths (upload a signed-release PDF; and send-to-sign → sign on the public form) → after authorization, upload a test document → View it → Remove it. Watch for **no CORS error** on the PUT.
- [ ] **Step 4:** Promote frontend to live (per Global Constraints): `cp STAGE/index.html index.html`, then strip `with-stage-banner`, the `#stageBanner` div, and set version to `v146.0.0` (no `-STAGE`). Verify live inline-script syntax (`errors: 0`) and that `diff index.html STAGE/index.html` shows ONLY the banner + version.
- [ ] **Step 5:** Commit + push live. `git add index.html && git commit -m "v146.0.0: Case Advocacy Documents (promote STAGE)" && git push origin main`.
- [ ] **Step 6:** Verify live: the two functions reachable; the contact-card section renders on a case-advocacy contact. Feature now on **both live and STAGE**.

---

## Self-Review

**Spec coverage:** Authorization gate (e-sign + paper) → Tasks 3, 5. Contact-level upload (digital/scanned) → Task 2, 5. Server-side gate → Task 2 Step 1. View/download → Task 2/5. 3-day-after-close destroy + courtesy alert → Task 4. Manual destroy → Task 2/5. Storage rules/privacy → Task 1. Role-gating + audit → all backend tasks. Both live+STAGE → Task 6. No spec requirement is unaddressed.

**Placeholder scan:** The only "TODO" is the authorization **wording** (Task 3 Step 1) — a content item LDAH owns, explicitly surfaced as a pre-go-live input, not a code placeholder.

**Type consistency:** `caseAdvocacyAuthorization`, `caseAdvocacyDocuments` (array of the documented shape), `docId`, `caseAdvocacyClosedAt`, `caseAdvocacyDocsDestroyedAt/By/Reason`, `caseAdvocacyDocsAlertSentAt`, and the CF names are used consistently across Tasks 2–6.

## Known content input required before go-live

- LDAH-supplied **authorization/release wording** (Task 3). Until provided, the e-sign form shows placeholder text; the paper path works regardless.
