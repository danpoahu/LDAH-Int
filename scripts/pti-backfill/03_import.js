// Step 3 — THE IMPORT. Executes the `create` and `update` ops from plan.json.
// `review` ops are always skipped (held for human decision).
//
//   node 03_import.js                          dry run (prints, writes nothing)
//   node 03_import.js --commit --only NETNEW --limit 3   canary: 3 new cards
//   node 03_import.js --commit                 full unambiguous import
//
// Every write is recorded to out/rollback_<batch>.json so 04_undo.js can
// reverse it. Idempotent: a rowRef already in the journal is skipped.
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const OUT = path.join(__dirname, 'out');
const COMMIT = process.argv.includes('--commit');
const ONLY = (process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : '').toUpperCase();
const LIMIT = process.argv.includes('--limit') ? Number(process.argv[process.argv.indexOf('--limit') + 1]) : Infinity;
const JOURNAL = path.join(OUT, `rollback_${L.BATCH_ID}.json`);

const plan = JSON.parse(fs.readFileSync(path.join(OUT, 'plan.json'), 'utf8'));
const journal = fs.existsSync(JOURNAL) ? JSON.parse(fs.readFileSync(JOURNAL, 'utf8')) : { batchId: L.BATCH_ID, source: L.SOURCE_FILE, ops: [] };
const done = new Set(journal.ops.map(o => o.rowRef));

function saveJournal() { fs.writeFileSync(JOURNAL, JSON.stringify(journal, null, 2)); }

function oneOffDoc(rec, disposition) {
  const now = new Date();
  const summary = {
    presenter: '',
    presenterComments:
      `Imported from PTI pink sheet (${rec.grantYear}). Source: ${L.SOURCE_FILE}. ` +
      `Full demographic detail kept in the OSEP spreadsheet.` +
      (rec.dissemReach != null ? ` Dissemination reach: ${rec.dissemReach}.` : ''),
    _ptiImport: { batchId: L.BATCH_ID, source: L.SOURCE_FILE, rowRef: rec.rowRef, grantYear: rec.grantYear },
  };
  if (disposition !== 'DISSEM' && rec.tierModel) summary.tierModel = rec.tierModel;
  if (rec.headCount != null) {
    // Head count has no per-attendee records; store as the attendance-total
    // override (v141 EA Report surfaces this when there are zero live signups).
    summary.attendanceOverrides = { attTotal: rec.headCount };
    summary.attendanceTotalResolved = rec.headCount;
    summary.totalAttended = rec.headCount;
  }
  if (rec.prof != null) summary.attendanceProfessionalOther = rec.prof;
  if (rec.youth != null) summary.attendanceYouthWithDisability = rec.youth;
  if (rec.military != null) summary.attendanceMilitaryActiveDuty = rec.military;
  if (rec.parents != null) summary.newParentCount = rec.parents;
  if (disposition === 'DISSEM') summary.activityType = 'Dissemination';
  return {
    title: rec.title || '(untitled PTI activity)',
    description: rec.title || '',
    location: rec.location || '',
    eventDate: rec.eventDate || '',
    isOneOff: true,
    archived: false,
    signupDates: [],
    createdByName: 'PTI Backfill (Oahu App Design)',
    createdAt: now,
    updatedAt: now,
    summary,
    _ptiImport: { batchId: L.BATCH_ID, source: L.SOURCE_FILE, rowRef: rec.rowRef, grantYear: rec.grantYear, disposition },
  };
}

let nCreate = 0, nUpdate = 0, nSkip = 0, processed = 0;
for (const p of plan) {
  if (p.op === 'review') continue;
  if (ONLY && p.disposition !== ONLY) continue;
  if (done.has(p.rowRef)) { nSkip++; continue; }
  if (processed >= LIMIT) break;
  processed++;

  if (p.op === 'create') {
    const doc = oneOffDoc(p.rec, p.disposition);
    if (!COMMIT) { console.log(`CREATE  ${p.disposition}  ${doc.eventDate}  "${doc.title}"  hc=${p.rec.headCount ?? '·'}`); nCreate++; continue; }
    const id = L.createDoc('events', doc);
    journal.ops.push({ op: 'create', rowRef: p.rowRef, path: `events/${id}`, disposition: p.disposition, title: doc.title });
    saveJournal();
    console.log(`CREATED events/${id}  "${doc.title}"`);
    nCreate++;
  } else if (p.op === 'update') {
    const path0 = `${p.target.collection}/${p.target.id}`;
    // Re-read current state to capture exact prior values, and re-confirm fields are still empty.
    const live = L.getDoc(path0) || {};
    const summ = live.summary || {};
    const prior = {}, toSet = {};
    for (const fp of Object.keys(p.set)) {
      const leaf = fp.split('.').slice(1).join('.');
      const cur = summ[leaf];
      const empty = cur === undefined || cur === null || cur === '' || cur === 0;
      prior[fp] = { present: !(cur === undefined), value: cur === undefined ? null : cur };
      if (empty) toSet[fp] = p.set[fp];
    }
    if (!Object.keys(toSet).length) { console.log(`MERGE   ${path0}  (all target fields already set — skip)`); nSkip++; continue; }
    if (!COMMIT) { console.log(`MERGE   ${path0}  set ${Object.keys(toSet).join(',')}`); nUpdate++; continue; }
    L.patchDoc(path0, toSet);
    journal.ops.push({ op: 'update', rowRef: p.rowRef, path: path0, prior: Object.fromEntries(Object.keys(toSet).map(k => [k, prior[k]])) });
    saveJournal();
    console.log(`MERGED  ${path0}  set ${Object.keys(toSet).join(',')}`);
    nUpdate++;
  }
}

console.log(`\n${COMMIT ? 'COMMITTED' : 'DRY RUN'}: created=${nCreate} merged=${nUpdate} skipped(existing)=${nSkip}`);
if (COMMIT) console.log(`journal: ${JOURNAL} (${journal.ops.length} reversible ops)`);
else console.log('add --commit to write.  Held in review (not touched): ' + plan.filter(p => p.op === 'review').length);
