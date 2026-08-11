# PayPal payment reconciliation — webhook, nudge guard, report sweep

Date: 2026-08-11
Repos: `LDAH_W2` (functions, checkout pages), `LDAH-Internal` (Membership Report)

## Problem

A membership is marked paid by a line of JavaScript running in the **member's browser**, in
`volunteer.html` / `howtohelp.html` `onApprove`, immediately after `actions.order.capture()`:

    return actions.order.capture().then(function (details) {
      return firebase.firestore().collection('members').doc(_mmDocId).update({
        status: 'paid', paypalOrderId: orderId, paidAt: ...
      }).then(showSuccess, showSuccess);   // staff reconcile if the flag write fails

That comment is the whole problem stated out loud. Two distinct failure classes follow:

- **Class A — abandoned before paying.** No PayPal transaction exists. The nudge sequence is
  correct and should run. (This is the Sai Krina case, re-confirmed 2026-08-11: zero transactions
  on the live account for all of August.)
- **Class B — paid, but the record never learned.** The capture succeeded and PayPal holds the
  money, but the Firestore write did not land — closed tab, dropped connection, failed write.
  The record stays pending forever. Nothing detects this but a human reading PayPal, and the
  armed nudge sequence will email a paying donor asking them to pay again.

Class B is the one that costs trust. `functions/index.js` already names it as the outcome worth
engineering against.

## Decisions taken

| Question | Decision |
|---|---|
| Nudge cron checks PayPal before each send? | **Superseded 2026-08-11 — no check.** The email copy now says a payment made in the last three hours may not have reached us yet. An analog answer to a timing problem, and a better one: it costs no API call per send and is honest about a lag no code can remove |
| PayPal says paid, record says pending | **Mark paid automatically**, `paidMarkedBy: 'paypal-reconcile'` |
| Refunds | **Flag on the report only.** No status change, no access revoked |

## What already exists (build on, do not rebuild)

- **The correlation key is already there.** `custom_id` on every order is the `members` doc id.
  No schema change, no backfill.
- **`onMembershipPaid`** fires on the transition into `paid` and sends the thank-you with portal
  login, idempotent via `thankYouSentAt`. Every path below only has to flip one field correctly;
  email, portal access and audit follow for free.
- Staff already have a Mark Paid button in Int writing `status`, `paidAt`, `paidMarkedBy`, an
  interaction note and an audit entry. New writers should match that shape.

## Design

Three writers, one field, all idempotent (no-op when status is already paid).

### 1. `paypalWebhook` — https.onRequest, authoritative, real time

- **Verify the signature before trusting anything.** POST the transmission id / time / cert url /
  auth algo / transmission sig plus `PAYPAL_WEBHOOK_ID` and the raw body to
  `/v1/notifications/verify-webhook-signature`. Only `SUCCESS` proceeds.
  Needs the **raw** body — Firebase's JSON body parser must not be allowed to discard it
  (`req.rawBody`), or verification will fail on every request.
- `PAYMENT.CAPTURE.COMPLETED` → take `resource.custom_id` as the member id → mark paid.
- `PAYMENT.CAPTURE.REFUNDED` / `.REVERSED` → write `paypalRefund` details onto the member.
  **No status change** (decision above).
- Capture with no `custom_id`, or a `custom_id` matching no member → write to
  `paypalUnmatched/{captureId}` for the report to surface. Never guess by amount or email.
- Always return 200 once handled, including for ignored event types — PayPal retries non-2xx,
  and a permanently-failing endpoint gets disabled.

**Security is the crux.** Without verification this is a public URL where anyone who guesses a
member id can grant portal access and trigger a donor email. An unverified webhook is not
shippable.

### 2. Nudge copy — inside `buildMembershipNudgeEmail`  (built, live)

No PayPal call. All four variants shared an identical "if you believe you have already paid"
sentence; that is now one `alreadyPaidNote` constant reading:

> If you have already paid, please ignore this. Payments can take up to three hours to show in our
> records, so a recent one may not have reached us yet — and if it has been longer than that, reply
> and we will sort it out rather than take a second payment.

This replaces the pre-send lookup. Transaction Search lags ~3 hours and nothing can remove that,
so the copy tells the truth about it instead of pretending the data is live.

The staff-triggered `sendMembershipResumeEmail` still carries the older sentence. Left alone: staff
send it only after checking PayPal themselves, in the dashboard, which is real time.

### 3. Report sweep — `cmsBuildMembershipReport`

The Membership Report is **client-side** in Int and reads `members` directly, so it cannot hold
the PayPal secret. It calls a new callable, `reconcileMembershipPayments`, which sweeps pending
records through Transaction Search, marks any matches paid, and returns a summary the report
renders — plus anything in `paypalUnmatched` and any refunds, for staff to action.

## Deployment prerequisites — do these first

1. ~~Rotate before wiring~~ — **overridden 2026-08-11.** La'a leaves in days and he is the only
   one who can reach the 2FA-protected PayPal dashboard, so the existing keys were deployed as-is
   and the emails are being deleted instead. ⚠ **Consequence: the keys cannot be rotated at all
   once he goes, unless Daniel is added to that 2FA first.** That window is closing.
2. Set Firebase secrets `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_WEBHOOK_ID`. The Keychain
   entry (`LDAH PayPal REST (live)`) is local to Daniel's Mac and does **not** reach the functions.
3. Create the webhook in the PayPal dashboard against the deployed function URL, subscribed to
   `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.CAPTURE.REFUNDED`, `PAYMENT.CAPTURE.REVERSED`.
4. Confirm Transaction Search stays enabled on the live app (it is on today — token scope includes
   `reporting`).

## Traps carried over from existing code

- **Status is not reliably lower-case.** `_runMembershipNudges` deliberately scans the whole
  collection in JS because `where('status','==','paid')` silently misses a doc stored as `"Paid"`.
  Every new reader must use `_isPaidStatus()`; every new writer writes lower-case `'paid'`.
- **`MEMBERSHIP_SEQUENCE_ARMED` is live** and sends real donor email every 15 minutes. Any change
  to `_runMembershipNudges` ships into an armed sequence — test with `dryRun: true` via
  `runMembershipNudgesNow` first.
- Ten legacy `members` docs predate this feature, three from a member who did pay. Any sweep must
  tolerate them rather than "fix" them into a second thank-you email.
- Helper changes in `functions/index.js` require redeploying every function that uses them.

## Verification

- Sandbox capture with a known `custom_id` → member flips to paid, one thank-you sent.
- Replay the same webhook event twice → still one thank-you, no duplicate audit entry.
- POST the webhook with a forged/absent signature → rejected, nothing written.
- Capture with no `custom_id` → lands in `paypalUnmatched`, no member touched.
- Refund event → `paypalRefund` written, status unchanged, appears on the report.
- Simulate class B: capture in sandbox, block the browser write, confirm the webhook alone marks
  it paid.
- Nudge guard: seed a pending member with a real completed capture older than 3 hours, run
  `runMembershipNudgesNow` with `dryRun: true`, confirm it reports skip-not-send.

## Scope order

Webhook + nudge guard first — they carry the real risk. Report sweep second.
