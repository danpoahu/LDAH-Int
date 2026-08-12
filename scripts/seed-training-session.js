// Publish a "what's new" training session for the LDAH-Int sign-in splash.
//
// The splash reads trainingSessions where active == true, picks the newest by
// publishedAt that the person has not completed, and shows its slides. There is
// no CMS screen for this yet, so this script is how a session gets published.
//
// Only ONE session should be active at a time — the splash shows the newest
// incomplete one, so leaving old sessions active means someone who skipped an
// old one keeps getting it instead of the new one. --commit deactivates any
// other active session first.
//
// TEMPLATE FOR THE NEXT SESSION — not yet run against production.
// As of 2026-08-12 the live session is trainingSessions/2026-08-11-profile-weather-timezones
// (5 slides, active). Running this with --commit would deactivate it and publish
// the draft below in its place. Edit DOC_ID and SESSION first.
//
// Usage: node scripts/seed-training-session.js            (dry run — prints what it would write)
//        node scripts/seed-training-session.js --commit   (publish it)

const { execSync } = require('child_process');

const PROJECT = 'ldah-932d5';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const COMMIT = process.argv.includes('--commit');

const DOC_ID = 'session-2026-08-profile';

// Slide images are files in the repo under img/training/. Store the path WITHOUT
// any ../ prefix — the page prepends what it needs for where it is served from.
const SESSION = {
  title: 'New this week',
  publishedAt: '2026-08-12T00:00:00.000Z',
  active: true,
  slides: [
    {
      title: 'Fill in your profile',
      body: 'Your profile is what the rest of the team sees when they need to reach you, and it is what drives your island weather and the partner time zones below. Open the menu at the top right and choose Profile.',
      tip: 'Your island matters most — it decides which weather alerts you see.',
      image: ''
    },
    {
      title: 'Weather for your island',
      body: 'Once your island is set, the dashboard shows the forecast and any active alerts for where you actually are, rather than for the whole state.',
      tip: '',
      image: 'img/training/weather-chip.png'
    },
    {
      title: 'Weather alerts',
      body: 'Watches and warnings for your island appear at the top of the dashboard so you know before a family calls to ask whether a session is still on.',
      tip: '',
      image: 'img/training/weather-alerts.png'
    },
    {
      title: 'Partner time zones',
      body: 'Our Pacific Basin partners are hours ahead or behind, and some are across the date line. The clock strip shows their local time so you are not working it out in your head before you dial.',
      tip: 'Guam and Palau are a day ahead of Hawaiʻi.',
      image: 'img/training/partner-times.png'
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

  // Exactly one active session at a time.
  for (const d of actives) {
    const id = d.name.split('/').pop();
    if (id === DOC_ID) continue;
    api(`/trainingSessions/${id}?updateMask.fieldPaths=active`, 'PATCH', { fields: { active: val(false) } });
    console.log(`  deactivated older session: ${id}`);
  }

  const res = api(`/trainingSessions/${DOC_ID}`, 'PATCH', { fields });
  if (res.error) {
    console.error('\nFAILED:', res.error.message, '\n');
    process.exit(1);
  }
  console.log(`\nPublished. updateTime ${res.updateTime}\n`);
})();
