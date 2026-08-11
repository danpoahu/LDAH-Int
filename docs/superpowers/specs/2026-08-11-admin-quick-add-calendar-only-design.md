# Admin quick-add + calendar-only booth events

Date: 2026-08-11
Repos touched: `LDAH-Int` (index.html, STAGE/index.html), `LDAH_W2` (events.html, index.html + STAGE copies)

## Problem

Two separate complaints, one session.

1. The `+` added to each Events Dashboard day cell (commit `9716009`, 2026-08-10) calls
   `cmsOpenEventModal(null, false)` directly. That bypasses the Add-Event funnel entirely,
   so the "What kind of event is this?" type page never appears from the dashboard. Staff
   land in the generic one-time editor with a date filled in and no type guidance.

2. Screening and Outreach Booth events are booth/table activities. They belong on calendars
   so staff and families can see the day is spoken for, but they should not occupy a card in
   the public Events list or the home page — those surfaces are for programmes and flyers
   people can act on.

## Decisions

- The dashboard `+` offers **three** types: Screening, Remote Signup, Outreach Booth.
- The calendar-only hiding applies to **two**: Screening and Outreach Booth.
  Remote Signup posts a public flyer and stays fully visible everywhere it is today.
  (Corrected mid-design; the first draft wrongly included Remote Signup in the hiding rule.)
- The LDAH app is left alone. It has no calendar, so hiding these there would make them
  unreachable rather than calendar-only.
- The rule is a property of the type, not per-event state. No new field, no checkbox.

## Why `specialEvent` is the right key

`_cmsDeriveEventType` (Int, ~line 25692) tests in this order:

    if (d.specialEvent === true) -> 'screening' or 'outreach_booth'
    if (d.infoOnly === true)     -> 'flyer'
    if (d.remoteSignup === true) -> 'remote_signup'

`specialEvent === true` therefore selects exactly Screening + Outreach Booth and can never
select Remote Signup. W2 already keys its existing partial rule on the same flag, so this is
a tightening of an existing condition rather than a new concept.

## Part A — funnel takes options (LDAH-Int)

`cmsOpenFunnel(opts)` accepts an optional `{ types: [...], date: 'YYYY-MM-DD' }`, stored in
two module vars that default to "no restriction / no date". Called with no argument — the CMS
`+ Add Event` button — behaviour is byte-identical to today.

1. `cmsOpenFunnel` resets and stores `_cmsFunnelAllowed` and `_cmsFunnelSeedDate`.
2. `cmsFunnelRenderTypeCards` filters `_CMS_FUNNEL_ORDER` through `_cmsFunnelAllowed`.
   The 2-column grid is unchanged; 3 cards render 2 + 1.
3. After flyer extraction, a `suggestedType` outside the allowed set is discarded, so no
   "AI guess" badge points at a card that is not on screen.
4. `cmsFunnelRoute` applies `_cmsFunnelSeedDate` to `cmsEventDate` after the editor opens —
   set value, call `_cmsMaybeAutoFillSignupDate()`, dispatch `input` — the same three lines
   `edAddOnDate` uses today.

   **Precedence:** applied only when the field is still empty. A date the flyer extraction
   found wins over the clicked day, so uploading a flyer dated the 20th onto the 14th cell
   does not silently override the flyer.

5. `edAddOnDate(iso)` switches to the CMS Events section as it already does, then calls
   `cmsOpenFunnel({ types: ['screening','remote_signup','outreach_booth'], date: iso })`
   instead of opening the editor directly.

All three routed types land in a one-time editor keyed on `cmsEventDate`, so one date-application
path covers them.

## Part B — calendar-only (LDAH_W2)

| Surface | Today | Change |
|---|---|---|
| `events.html` `renderCurrentEvents` | hides `specialEvent === true && !imageUrl` | drop `&& !imageUrl` — hidden even with a flyer |
| `index.html` home Upcoming Events | shows any card with `imageUrl` | add `specialEvent !== true` |
| `events.html` public calendar | `getAllCalendarItems` filters archived only | none — already correct |
| Int dashboard calendar | `edLoadEvents` excludes archived / isOneOff / flyerOnly / infoOnly | none — already correct |
| LDAH app events list | filters `infoOnly` only | none — deliberate |
| Remote Signup, everywhere | fully public | none |

## Not affected

Int's own CMS list (`cmsRenderUnified`) is untouched, so Screening and Outreach Booth cards
keep "View Signups", "Copy signup form link" and the kiosk **QR** button — all gated on
`_isSpecialCard`, which reads `specialEvent`. The QR encodes the live
`ldahawaii.org/special.html?eventId=…` via `_cmsSpecialQRUrl`. No Cloud Function, no save
path, no schema change.

## Known adjacent defect (NOT fixed here)

`_specialUrl` (live `index.html:26637`, STAGE `index.html:27012`) builds the "Copy signup form
link" value as `ldahawaii.org/STAGE/special.html?eventId=…` while the QR beside it encodes the
non-STAGE URL. The two `special.html` files are identical today so nothing is broken, but the
copy button hands out a STAGE link. Flagged; awaiting a decision before changing.

## Verification

- CMS `+ Add Event` still shows all 7 cards and takes no date.
- Dashboard `+` on a day shows flyer step, then exactly 3 cards, then confirm, then the right
  editor with that date filled.
- A flyer whose extraction yields a date keeps the flyer's date, not the clicked day.
- A saved Screening still shows its QR button and kiosk QR in Int.
- A Screening / Outreach Booth appears on the W2 calendar and the Int dashboard calendar, and
  on neither the W2 Events cards nor the W2 home page.
- A Remote Signup still appears on the W2 Events cards and home page.
