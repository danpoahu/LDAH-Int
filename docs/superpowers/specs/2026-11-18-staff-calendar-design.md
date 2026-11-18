# Staff calendar (per person) — design

Date: 2026-11-18 · App: DAN (LDAH-Int), STAGE first, then live.

## Why
Staff juggle presentations, Connect-Gen sessions, booths, screenings and meetings, all
assigned on the admin Events Dashboard, but nobody can see "my week". Daniel wants each
person to see only their own calendar, and the people who already oversee others' to-dos
(the My Day "Viewing as" owners) to be able to open anyone's calendar the same way.

## Goals
- A **Staff calendar** link in the sidebar **Main** group, for staff (not partners).
- Shows every dated item the person **leads or helps on**, laid out by hour so several
  things on one day are obvious.
- Same look as the admin Events Dashboard: header, Day / Week / Month buttons, Today,
  arrows, type colours, legend.
- A "Viewing as" picker for the My Day view-as owners (`MYDAY_VIEWAS_OWNERS`), same
  people list as My Day. If My Day is currently viewing someone, the calendar opens on
  that person.
- A **Helpers** picker on the Events Dashboard, under each session's presenter dropdown,
  so helpers can be recorded at all (nothing stores helpers today).

## Non-goals
- No editing from the Staff calendar: it is a read-only view. Assignments stay on the
  Events Dashboard; staff calendar entries stay in their own editor.
- No tasks, emails or notifications to helpers.
- No helpers on office screening days or volunteer help requests (they keep one lead).
- No printing, no export, no time-off / PTO.

## Anti-goals
- Must not show someone items they are not on (other than unassigned staff-wide notices).
- Must not change how the Events Dashboard saves presenters: helpers are an addition
  written with `{merge:true}` next to `presenter`/`presenterUid`, never replacing them.
- Must not slow the Events Dashboard: no extra queries for it.

## Approaches considered
- **Layout A, hour grid (chosen by Daniel).** Week and Day views are a time grid; each
  item is a block filling its hours; overlaps sit side by side; untimed items go in an
  all-day strip. Month view is the admin month layout.
- Layout B, admin cards in Morning / Afternoon / Evening bands. Closest to today but does
  not show duration. Not chosen.
- **Helpers on the Events Dashboard (chosen by Daniel)** vs helpers in the event form, or
  lead-only for now.

## What puts an item on a person's calendar
| Item | Lead | Helper | Times |
|---|---|---|---|
| Recurring session (Learning Labs, PTC, Connect-Gen …) | `sessionSummaries[key].presenterUid` (name-match fallback via presenterStaff → userRoles when uid blank) | new `sessionSummaries[key].helpers[{uid,name}]` | `startTime`/`endTime` HH:MM |
| One-time event, single date | `summary.presenterUid` (same fallback) | new `summary.helpers` | `time` free text, parsed |
| One-time event, multi-date / outreach booth | `sessionSummaries[key].presenterUid` | new `sessionSummaries[key].helpers` (booth: written to every session that day, like presenter) | parsed from the `signupDates` label |
| Office screening day | `leadUid` | — | `start`/`end` |
| Volunteer help request | `leadUid` | — | `time` free text, parsed |
| Screening request day (staffCalendar entry with `providerRequestId`) | each PC in `providers.worksheet.pcs` | — | `startTime`/`endTime` |
| Staff calendar meeting with agenda | `participantUids` (shown as Attendee, styled like helper) | — | `startTime`/`endTime` |
| Staff calendar entry, plain | new **People** picker on the entry form (`people[{uid,name}]`, `peopleUids[]`); blank = everyone | — | `startTime`/`endTime` or all day |

Cancelled sessions show greyed with strike-through, as on the admin calendar.

## Look
- Week / Day: hour rows 7 a.m.–7 p.m., widened automatically to cover the earliest and
  latest item. Blocks use the admin type colours (`_edTypeColor`, `ED_STAFF_META`,
  `OS_META`, `VR_CAL_COLOR`). **Lead** = solid fill; **Helper / Attendee** = light tint,
  dashed border, small tag. Today's column highlighted, holidays labelled like the admin
  calendar.
- Untimed or unparseable times: an "All day" strip above the grid.
- Month: the admin month grid, each item one line with its start time.
- Clicking a block opens a small detail card: title, time, place, role (Lead / Helper /
  Attendee), and the same buttons the admin card has where they apply (Workshop form,
  Screening worksheet, Agenda).
- Screens are small (1366x768): the grid scrolls inside the section, the header stays put.

## Helpers picker (Events Dashboard)
- Under each presenter dropdown: a "+ Helper" link opening a short staff checklist
  (staff logins only), saved as `helpers[{uid,name}]` on the same summary object with
  `{merge:true}`. Chosen helpers show as small initials chips under the dropdown; click
  a chip to remove.
- Only shown to the roles that can already assign presenters.

## Decided after review (Daniel)
- Plain Staff Calendar entries get a **"Who is this for?" People picker** in the entry
  form. Ticked people see the entry; blank shows it to everyone. Screening-day entries
  still go to their PCs automatically; agenda meetings keep their participants.

## Calls made by Claude (check these)
- **Event Summary must keep helpers.** `saveEventSummary` overwrites the summary object
  (STAGE ~47445-47515); it will carry `helpers` forward the way it already keeps
  `measure524`/`activityType`. Without this, the first summary save wipes helpers.
- **Who gets the link:** every staff role (everyone `_edStaffCalAllowed()` allows: not
  partners or Super Partners).
- **Viewing-as list:** same owners as My Day (`MYDAY_VIEWAS_OWNERS`), but the list is
  LDAH staff logins only (`_edAgLoadStaff()`), no partner accounts.
- **Buttons on the detail card** (Workshop form, Screening worksheet, Agenda): shown only
  when the signed-in person could open them on the admin calendar; Agenda only for
  members of that meeting, even while viewing as someone else.
- The finished-agenda recipient (`agendaToUid`) counts as Attendee.
- `presenterUid` of `'(form-set)'` or blank → match by name (linked presenter uid, then
  case-insensitive `userRoles.displayName`), as `edLoadPresenters` does.
- Old screening worksheets with only typed `pcNames` → matched with `_pswOldPcMatch`.
- Helpers for multi-date events stored under the same key the presenter uses; booths
  write to every session that day; the current presenter is left out of the helper list.
- Recurring session times come from the schedule (`cmsGenerateSessionDates` start/end);
  cancelled sessions read the raw `presenterUid` so they still show, greyed.
- Week view by default; the chosen view is remembered per browser.
- Firestore rules: confirm every staff role can read `staffCalendar`,
  `officeScreeningDays`, `volunteerRequests`, `providers` before going live.

## Builder's calls
- Loader: extend `edLoadEvents` rows with `presenterUid`, `helpers`, `leadUid`,
  `participantUids`, `providerRequestId`, `startTime`, `endTime`, or write a separate
  loader reusing its sources; whichever keeps the Events Dashboard unchanged.
- Free-text time parsing rules (e.g. "4pm", "10:00 AM – 12:00 PM", "December 3rd -- 4pm").
- Overlap layout in the grid.
