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

const DOC_ID = '2026-08-12-home-rotation';

// Slide images are files in the repo under img/training/. Store the path WITHOUT
// any ../ prefix — the page prepends what it needs for where it is served from.
const SESSION = {
  title: 'Home Rotation — you choose what the public sees',
  publishedAt: '2026-08-12',
  active: true,
  slides: [
    {
      title: 'Home Rotation: you choose what the public sees',
      body: "Aloha! Here's a one-minute tour of Home Rotation — the new way you choose exactly what the public sees on the website home page and the app's opening splash.",
      tip: 'One list, a few checkboxes, and both places update for everyone.',
      image: ''
    },
    {
      title: 'Tick it — it goes public, in two places',
      body: "This screen lists everything currently available to put in front of the public. Tick the ones you want in the rotation, and they appear in two places at once: the website home page, and the app's opening splash. Visitors are shown two at a time — and nobody sees the same ones again until they have seen the rest, so everything you tick gets its turn.",
      tip: '',
      image: ''
    },
    {
      title: 'CMS \u2192 Home Rotation',
      body: "You will find it under the CMS tab: Home Rotation. The green counter near the top always tells you how many items are in the rotation right now — here, five.",
      tip: '',
      image: 'img/training/home-rotation-nav.jpg'
    },
    {
      title: 'Ticked = in the rotation. One click either way.',
      body: "Ticked means in. This Learning Labs session is in the rotation; Village Hui below it is not — one click on its checkbox puts it in front of the public. Untick anything to pull it back out. That is the entire job.",
      tip: '',
      image: 'img/training/home-rotation-tick.jpg'
    },
    {
      title: 'Two at a time — and everything gets its turn',
      body: "How visitors experience it: two items at a time, on the website home page and on the app splash. And the rotation is fair — a visitor is not shown the same ones again until they have seen the rest. So there is no fighting over the top spot; everything ticked gets seen.",
      tip: 'Need something in front of everyone now? Pin it — a pinned item shows on every visit until you unpin it.',
      image: ''
    },
    {
      title: 'Types on the right, dates or ongoing on the left',
      body: "Each row tells you what it is. The tag on the right shows the type — Learning Labs, flyer, remote signup. Dated items carry their date; standing items like Membership just say ongoing, and they stay available until you untick them.",
      tip: '',
      image: 'img/training/home-rotation-types.jpg'
    },
    {
      title: 'The whole job in three lines',
      body: "CMS, Home Rotation. The green counter says what is live. Tick in, untick out — it reaches the website home page and the app splash, two at a time, rotated fairly, so everything gets seen. Questions, ask Daniel. Mahalo!",
      tip: '',
      image: ''
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
