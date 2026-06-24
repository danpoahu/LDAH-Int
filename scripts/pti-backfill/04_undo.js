// Step 4 — UNDO. Reverses everything 03_import.js wrote, from the rollback
// journal. Deletes created cards; restores prior values on merged events
// (and removes fields that didn't exist before the merge).
//
//   node 04_undo.js                 dry run (prints what it would reverse)
//   node 04_undo.js --commit        actually reverse the whole batch
//   node 04_undo.js --commit --only-creates   reverse only the created cards
//
// Safe to re-run: each reversed op is dropped from the journal as it completes.
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const OUT = path.join(__dirname, 'out');
const COMMIT = process.argv.includes('--commit');
const ONLY_CREATES = process.argv.includes('--only-creates');
const argFile = process.argv.find(a => a.endsWith('.json') && a.includes('rollback'));
const JOURNAL = argFile || path.join(OUT, `rollback_${L.BATCH_ID}.json`);

if (!fs.existsSync(JOURNAL)) { console.error(`No journal at ${JOURNAL} — nothing to undo.`); process.exit(0); }
const journal = JSON.parse(fs.readFileSync(JOURNAL, 'utf8'));
function saveJournal() { fs.writeFileSync(JOURNAL, JSON.stringify(journal, null, 2)); }

let undone = 0;
// reverse order so updates restore before any dependent state
for (let i = journal.ops.length - 1; i >= 0; i--) {
  const o = journal.ops[i];
  if (ONLY_CREATES && o.op !== 'create') continue;

  if (o.op === 'create') {
    if (!COMMIT) { console.log(`DELETE  ${o.path}  "${o.title}"`); undone++; continue; }
    try { L.deleteDoc(o.path); } catch (e) { if (!/NOT_FOUND/.test(e.message)) throw e; }
    console.log(`DELETED ${o.path}`);
  } else if (o.op === 'update') {
    const restore = {};
    for (const fp of Object.keys(o.prior)) {
      const pr = o.prior[fp];
      restore[fp] = pr.present ? pr.value : undefined; // undefined => delete field
    }
    if (!COMMIT) { console.log(`RESTORE ${o.path}  ${Object.keys(restore).map(k => `${k.split('.').pop()}=${restore[k] === undefined ? '«delete»' : restore[k]}`).join(', ')}`); undone++; continue; }
    L.patchDoc(o.path, restore);
    console.log(`RESTORED ${o.path}`);
  }
  journal.ops.splice(i, 1);  // drop completed op
  if (COMMIT) saveJournal();
  undone++;
}

console.log(`\n${COMMIT ? 'UNDO COMPLETE' : 'UNDO DRY RUN'}: ${undone} op(s) ${COMMIT ? 'reversed' : 'would reverse'}.`);
if (COMMIT && journal.ops.length === 0) console.log('Journal now empty — batch fully reversed.');
