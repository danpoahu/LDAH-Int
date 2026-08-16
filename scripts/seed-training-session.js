// Publish a "what's new" training session for the LDAH-Int sign-in splash.
//
// The splash reads trainingSessions where active == true, picks the newest by
// publishedAt that the person has not completed, and shows its slides. There is
// no CMS screen for this yet, so this script is how a session gets published.
//
// Sessions ACCUMULATE — do not deactivate the old ones. The splash was changed
// to show the OLDEST unwatched session first, which turns the active set into a
// queue: someone with a backlog works forwards through it, and someone who is up
// to date still gets each new session the day it lands, it being their only
// unwatched one. Deactivating a session retires it for everyone who never saw it,
// so `active: false` is for withdrawing something published in error, nothing else.
//
// TEMPLATE FOR THE NEXT SESSION. Edit DOC_ID and SESSION, dry-run, then --commit.
// As of 2026-08-15 there are three published sessions, all active:
//   2026-08-11-profile-weather-timezones (5 slides)
//   2026-08-12-home-rotation             (7 slides)
//   2026-08-15-event-summary             (15 slides — the draft below)
//
// Usage: node scripts/seed-training-session.js            (dry run — prints what it would write)
//        node scripts/seed-training-session.js --commit   (publish it)

const { execSync } = require('child_process');

const PROJECT = 'ldah-932d5';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const COMMIT = process.argv.includes('--commit');

const DOC_ID = '2026-08-15-event-summary';

// Slide images are files in the repo under img/training/. Store the path WITHOUT
// any ../ prefix — the page prepends what it needs for where it is served from.
//
// These crops come from the narrated walkthrough at training/completing-the-event-summary.html
// and were cut to the region each step is actually about. The task-list shot is
// cropped BELOW the accommodations rows on purpose: those rows name real families,
// and img/training/ is served publicly from the repo.
const SESSION = {
  title: 'Completing the Event Summary',
  publishedAt: '2026-08-15',
  active: true,
  slides: [
    {
      title: "Completing the Event Summary",
      body: "Aloha. This is the form we complete after a session has happened. There are two ways to open it, and this covers both — along with which parts fill themselves in, and which parts only you can supply.",
      tip: "",
      image: ""
    },
    {
      title: "Three steps, every time",
      body: "You open the summary, you fill in the parts only a person can know, and you save. The white and grey numbers are already counted from signups and surveys. The pink section is the part that needs you — if it is left blank, that information is simply lost.",
      tip: "",
      image: ""
    },
    {
      title: "Way one: from your task list",
      body: "After an event finishes, a task called Event Summary appears on the home page under Things To Do Today, tagged Event Wrap-Up, with a follow-up date so it does not get forgotten. Click Open Event Summary and the form opens right there — you never leave the home page.",
      tip: "Opens the form in place.",
      image: "img/training/event-summary-task-list.png"
    },
    {
      title: "Check the session date first",
      body: "Some events run more than once — different islands, different days. Each session gets its own summary. Check this dropdown before you type anything, because every number below it changes with your selection.",
      tip: "",
      image: "img/training/event-summary-session-date.png"
    },
    {
      title: "Attendance is already counted",
      body: "Registered, Attended, No-Shows and the attendance rate come straight from signups and from who was checked in on the day. You do not type any of them. If they look wrong, the fix is in the signups list, not here.",
      tip: "Read-only — comes from signups.",
      image: "img/training/event-summary-attendance.png"
    },
    {
      title: "Attendance Totals — the pink sheet on screen",
      body: "Each row has a box you can edit and, beside it, the figure the system counted. Leave it alone if it matches; type over it if the real count was different. One row is not like the others: Dissemination Reach is people reached, not people who attended — Facebook views, booth traffic, that sort of thing.",
      tip: "Reach is reported separately and never added into attendance.",
      image: "img/training/event-summary-totals.png"
    },
    {
      title: "Walk-ins go here",
      body: "For people who never signed up — someone who wandered up to the table at Parent Talk Cafe, for example. Add a name, an email if you have one, and click Add. Each walk-in counts toward the Attendance Total.",
      tip: "On save they are added to Contacts, so we can follow up later.",
      image: "img/training/event-summary-walkins.png"
    },
    {
      title: "Feedback Summary — a status report",
      body: "How many surveys went out, how many are still pending, how many came back, and the response rate. It updates itself as people respond, so there is nothing to edit here either.",
      tip: "Read-only.",
      image: "img/training/event-summary-feedback.png"
    },
    {
      title: "The pink form is yours",
      body: "Everything below the pink banner is filled in by you. These are the numbers our audit and our grant reporting are built from, and none of it can be worked out automatically. Set the Tier Model of Support, then the two follow-up counts — parents, and professionals.",
      tip: "The survey figure underneath is only a hint. The real number is the one you know.",
      image: "img/training/event-summary-pink.png"
    },
    {
      title: "Materials: packed, and handed out",
      body: "Confirm the presenter in the dropdown — it should already be right, but check it. Then the materials table: how many of each item you packed, and how many you actually handed out. The disseminated counts are the ones that matter for reporting.",
      tip: "The last row is blank on purpose — type in anything you gave out that is not on the list.",
      image: "img/training/event-summary-materials.png"
    },
    {
      title: "Comments, then save",
      body: "The Presenter Comments box takes anything worth remembering — turnout, questions that came up, a problem with the room. Then Save Summary. The line just above it records who saved it and when. Export CSV beside it pulls the numbers out into a spreadsheet.",
      tip: "",
      image: "img/training/event-summary-save.png"
    },
    {
      title: "Way two: through Reports",
      body: "Use this when the task has already been ticked off, or the event was weeks ago. Left menu, Reports, then Event Attendance Report. Every event date shows up as a card, color-coded by program, and the filters across the top narrow by year, program, tier or date range.",
      tip: "",
      image: "img/training/event-summary-reports.png"
    },
    {
      title: "Open the card, then Edit Summary",
      body: "The detail panel shows event details, attendance totals, follow-up support and age of children — a read-only view of what has been recorded so far. To change anything, click Edit Summary in the top corner; it opens the very same form.",
      tip: "Print / Save as PDF beside it gives you a clean copy for a binder or a funder.",
      image: "img/training/event-summary-detail.png"
    },
    {
      title: "The short version",
      body: "Two doors, one form. Check the session date before anything else. Leave the auto numbers alone unless you know better. The pink section is the part only you can complete. Add walk-ins so they are counted and kept. And finish with Save Summary — if you did not save it, it did not happen.",
      tip: "",
      image: ""
    },
    {
      title: "Mahalo",
      body: "If anything here does not match what you see on your screen, or a field is not behaving the way it should, send it to Daniel and it will get sorted.",
      tip: "The full narrated walkthrough is on the Training Videos page whenever you want it again.",
      image: ""
    }
  ]
};

function token() {
  return execSync('gcloud auth application-default print-access-token').toString().trim();
}

function api(path, method, body) {
  const args = ['-s', '-X', method, '-H', `Authorization: Bearer ${token()}`, '-H', 'Content-Type: application/json'];
  if (body) args.push('-d', JSON.stringify(body));
  args.push(`${BASE}${path}`);
  const out = execSync('curl ' + args.map(a => `'${a.replace(/'/g, "'\\''")}'`).join(' ')).toString();
  return out ? JSON.parse(out) : {};
}

// Firestore REST wants typed values.
function val(v) {
  if (Array.isArray(v)) return { arrayValue: { values: v.map(val) } };
  if (v && typeof v === 'object') return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, val(x)])) } };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return { integerValue: String(v) };
  return { stringValue: String(v == null ? '' : v) };
}

(async function main() {
  const fields = Object.fromEntries(Object.entries(SESSION).map(([k, v]) => [k, val(v)]));

  console.log(`\n${COMMIT ? 'PUBLISHING' : 'DRY RUN — would publish'}: trainingSessions/${DOC_ID}`);
  console.log(`  title:       ${SESSION.title}`);
  console.log(`  publishedAt: ${SESSION.publishedAt}`);
  console.log(`  active:      ${SESSION.active}`);
  console.log(`  slides:      ${SESSION.slides.length}`);
  SESSION.slides.forEach((s, i) => {
    console.log(`    ${i + 1}. ${s.title}${s.image ? '   [' + s.image + ']' : '   (no image)'}`);
  });

  // Report what is already there, so an accidental second active session is visible.
  const existing = api('/trainingSessions', 'GET');
  const docs = existing.documents || [];
  const actives = docs.filter(d => d.fields && d.fields.active && d.fields.active.booleanValue === true);
  console.log(`\n  existing sessions: ${docs.length}, of which active: ${actives.length}`);
  actives.forEach(d => console.log(`    - ${d.name.split('/').pop()}`));

  if (!COMMIT) {
    console.log('\nDry run only. Re-run with --commit to publish.\n');
    return;
  }

  // Older sessions are LEFT ACTIVE on purpose — see the note at the top. The
  // splash works oldest-unwatched-first, so they are a queue, not clutter.
  actives.filter(d => d.name.split('/').pop() !== DOC_ID)
    .forEach(d => console.log(`  leaving active (queue): ${d.name.split('/').pop()}`));

  const res = api(`/trainingSessions/${DOC_ID}`, 'PATCH', { fields });
  if (res.error) {
    console.error('\nFAILED:', res.error.message, '\n');
    process.exit(1);
  }
  console.log(`\nPublished. updateTime ${res.updateTime}\n`);
})();
