# Events & Programs card counts — design

**Date:** 2026-08-03
**Status:** Approved by Daniel, not implemented
**Files:** `index.html`, `STAGE/index.html` (LDAH-Int)

## Problem

Every card in the unified Events & Programs list reads `0 signups`, and the
capacity chip can only ever say `cap 45` / `cap 80`. The chip row renders
unstyled, so `0 signups` and `cap 45` collide into `0 signupscap 45`.

Three independent defects, all in live v145.55.0:

1. **The unified view never counts.** `cmsLoadAllEvents` (`index.html:25011-25028`)
   copies counts out of `window._cmsSignupCountCache` only when that cache is
   under 60s old (`_cmsCacheTTL = 60000`, line 24660). The cache is built once by
   `cmsGetAlertCounts()` at CMS dashboard load, so by the time staff click into
   Events & Programs it is stale and every card silently falls back to 0. The
   three legacy per-tab loaders (lines 24737-24917) do count for themselves; the
   unified list never learned to.

2. **The cache is missing two fields.** Even when fresh it writes only
   `signupCount` and `pendingCount` (line 24474). It never writes `headcount` or
   `upcomingCount` — the exact two fields the card needs for `N / 80 seats` and
   for a recurring program's upcoming count. So the seats chip falls to its
   `cap N` branch and `_upcomingCount` is always undefined.

3. **The chip CSS is missing from live.** `.cms-card-chips` and `.cmsChip` exist
   in `STAGE/index.html` (lines 4343-4352) but not in `index.html`. Live has the
   markup and none of the styling. This is STAGE/live drift with STAGE ahead —
   see the STAGE section below.

## Verified data

Read-only Firestore queries, 2026-08-03:

| Card | Doc | Live signups | Card should read |
|---|---|---|---|
| Connect-Gen | `recurringEvents/CmkPXEpPwfAQ5sR377K2` | 17 live, but only **1** has a session dated today or later (Kathryn Kuhaulua, 2026-08-13, pending); the other 16 are completed May–July sessions | `1 pending` |
| Learning Labs August | `events/IqTwpWFPtpONhThQZmzs` | 20 live, all confirmed; Aug 12 → 19, Aug 26 → 18 | `Aug 12: 19` · `Aug 26: 18` |
| Molokai movie | `events/e3XtawFloXgHb4WQJcuc` | 1 confirmed, Individual, cap 45 | `1 attending` · `1 / 45 seats` |
| Hilo movie | `events/0ttCcUQdAuFCrPiiULqw` | 5 live (4 confirmed, 1 pending), cap 80 | `11 attending` · `3 pending` · `11 / 80 seats` |

Hilo's `11` uses the existing headcount rule at `index.html:27746` — a `Group`
contributes its `groupSize`, anything else contributes 1: 4 + 1 + 4 + 2. Lyndee
Hoyer holds two live confirmed signups (same email, one `announcement-email`
Group of 4 on Aug 1, one `registration-email` with no `participationType` on
Aug 2). **Daniel's decision: leave both, count as-is.** The card therefore reads
11, not the 14 that double-counting her family would give.

## Approach

Chosen: **one shared counter**. Extract the signup scan currently buried inside
`cmsGetAlertCounts` (lines 24437-24474) into `cmsRefreshSignupCounts()`. Both the
dashboard and `cmsLoadAllEvents` call it; when the cache is stale the unified
view awaits it rather than falling back to 0.

Rejected: having `cmsLoadAllEvents` count for itself (a fourth copy of counting
logic — see `feedback_daily-report-two-implementations`), and denormalizing onto
the event doc via a Cloud Function `onWrite` trigger (needs a new function, a
backfill, and a shared-helper change forces redeploying all 112 functions per
`feedback_cf-helper-deploy` — too much blast radius for data the card already
fetches).

## The counter

`cmsRefreshSignupCounts()` returns, per event and per program:

| Field | Meaning |
|---|---|
| `signupCount` | live docs, `archived !== true` |
| `pendingCount` | docs with `status` `pending` or `new` |
| `pendingHeads` | **people** pending — Hilo's 3, not 1 |
| `headcount` | people, via the existing rule at `index.html:27746` |
| `upcomingCount` | signups with a session dated today or later, confirmed only |
| `upcomingPending` | same, but `status` pending/new — Connect-Gen's 1 |
| `perDate{}` | keyed by `sigDateKey(label)` → `{label, count, heads, pending}` |

Recurring-program session dates live in **`selectedSessions`**, not
`selectedDates`, as composite keys of the form
`2026-08-13|Oahu – 245 N. Kukui Street, Suite 205|11:00 AM – 1:00 PM`. Split on
`|` and take element 0 (`feedback_composite-session-keys`). A signup with no
readable future date is treated as *not* upcoming unless it is pending, in which
case it is counted — same "keep what you cannot read" contract as `sigDateKey`,
so a signup awaiting action is never silently hidden.

`sigDateKey` is promoted out of the Session Sheet IIFE (`index.html:11448`) to a
shared helper, **behaviour unchanged** — including its contract of returning `''`
rather than guessing, so callers keep an unreadable label instead of silently
hiding a session. Promotion is required because IIFE vars are invisible across
`<script>` blocks (`feedback_ldah-int-script-block-scope`).

## Chip rules by card type

- **Multi-date one-time** (Learning Labs) — one chip per *upcoming* `signupDates`
  entry, formatted `Aug 12: 19`. Past entries drop off, so the card rolls to the
  next class on its own with no extra logic. Entries `sigDateKey` cannot parse
  are always shown. When every date has passed, a single `20 total` chip.
  **"Upcoming" means `sigDateKey(label) >= _localToday()`** — an entry dated
  today still shows, and the comparison is on HST date strings, never
  `new Date()`.
- **Remote Signup** (Molokai, Hilo) — `11 attending` · `3 pending` ·
  `11 / 80 seats`. The leading word changes from "signups" to "attending",
  because these events are measured in people, not registrations.
  **`attending` and the seats chip both count confirmed heads only** — pending
  people are reported separately and do not consume seats. Hilo therefore reads
  `11 / 80`, not `14 / 80`. If pending should hold a seat, that is a one-line
  change and worth revisiting once a venue actually gets close to full.
- **Ongoing recurring** (Connect-Gen) — `N upcoming` blue (omitted when 0) and
  `M pending` amber (omitted when 0), both counting **only sessions dated today
  or later**. Today that is a single `1 pending` chip.
  **No lifetime total and no "enrolled" chip.** Connect-Gen is not a rolling
  roster: each family books one session and is finished. Of its 17 live signups,
  16 are completed sessions from May–July and exactly one — Kathryn Kuhaulua,
  2026-08-13, pending worksheet — is still ahead. Counting the other 16 as
  "enrolled" would report finished work as outstanding, which is the opposite of
  what the card is for.
- **Single-date one-time** — `N signups` plus a pending chip. Unchanged.
- **Flyer** (`flyerOnly` or `infoOnly`) — `No sign-ups`. Unchanged.

## Color

Port STAGE's block to live, then retune two entries. STAGE currently renders
pending in **red**; the approved semantics put pending in amber and reserve red
for a venue at capacity.

```
.cms-card-chips  display:flex; flex-wrap:wrap; gap:4px   fixes "0 signupscap 45"
.cmsChip         radius:999px; padding:2px 9px; font-size:.7rem; white-space:nowrap

.cmsChip-count   #EFF6FF / #1E40AF / #BFDBFE   soft slate-blue   counts
.cmsChip-pending #FFFBEB / #92400E / #FDE68A   amber             awaiting action
.cmsChip-seats   #ECFDF5 / #065F46 / #A7F3D0   green             under 80% full
.cmsChip-warn    #FFFBEB / #92400E / #FDE68A   amber             80-99%
.cmsChip-full    #FEF2F2 / #991B1B / #FECACA   red               at capacity
.cmsChip-quiet   #F1F5F9 / #64748B / #E2E8F0   grey              enrolled, no-signups
```

`.cmsChip-seats` is a **new class**. Today the under-80% case reuses
`.cmsChip-quiet` (`index.html:25479`:
`_capCls = _pct >= 1 ? 'cmsChip-full' : (_pct >= 0.8 ? 'cmsChip-warn' : 'cmsChip-quiet')`).
That line changes so a healthy venue reads green rather than grey; `-quiet` stays
as-is for `15 enrolled`, `No sign-ups`, and the `cap N` fallback.

Color carries status, not decoration. Type identity already has its own solid
badge and the card's left edge (`_CMS_TYPE_META`), so chips deliberately do not
reuse type colors — otherwise nothing stands out. Scanning the list, amber and
red should be the only things that pull the eye.

## STAGE and live

Both `index.html` and `STAGE/index.html` get the change, patched **surgically**.
STAGE is ahead of live (v146 vs v145) and must never be copied wholesale over
live — see `feedback_stage-live-drift-both-ways`. STAGE already has the chip CSS
block, so there the work is the retune plus the JS; live needs the whole block.

Version bump on Int as always (`feedback_version-bump`).

## Out of scope

- **Lyndee's duplicate signup.** Daniel chose to leave it. Worth noting the
  duplicate arrived via `registration-email` a day after her `announcement-email`
  signup, which suggests that path creates a second doc rather than updating the
  first. If so, other events are quietly double-counting. Prior work exists in
  `docs/superpowers/plans/2026-06-12-duplicate-signup-prevention-part2.md` and
  `2026-06-12-duplicate-signup-removal-int.md`; this may be an uncovered path or
  a regression. Own investigation, not this one.
- Any change to how signups are created, confirmed, or archived.
- The View Signups modal, which already computes people correctly.
