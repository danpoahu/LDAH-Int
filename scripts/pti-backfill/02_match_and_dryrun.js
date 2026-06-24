// Step 2 — READ-ONLY. Resolves merge candidates against the live system and
// builds the operation plan + an HTML dry-run report. Writes NOTHING to Firestore.
//
//   node 02_match_and_dryrun.js
//
// Outputs:  out/plan.json          (consumed by 03_import.js)
//           out/dryrun_report.html (for human review)
const fs = require('fs');
const path = require('path');
const L = require('./lib');

const OUT = path.join(__dirname, 'out');
const SRC = JSON.parse(fs.readFileSync(path.join(OUT, 'pti_import_source.json'), 'utf8'));

const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const dnum = d => d ? Date.parse(d) : null;
const daysApart = (a, b) => (a && b) ? Math.abs(dnum(a) - dnum(b)) / 86400000 : 999;

console.error('Fetching live events / recurringEvents (read-only)…');
const events = L.listAll('events', ['title', 'eventDate', 'isOneOff', 'summary', 'archived']);
const recurring = L.listAll('recurringEvents', ['title', 'sessionSummaries', 'schedules']);
console.error(`  events=${events.length}  recurringEvents=${recurring.length}`);

// Build the summary-override field set from a pink-sheet record (only present values).
function overridesFor(rec) {
  const o = {};
  if (rec.headCount != null) { o['summary.attendanceTotalResolved'] = rec.headCount; o['summary.totalAttended'] = rec.headCount; }
  if (rec.prof != null) o['summary.attendanceProfessionalOther'] = rec.prof;
  if (rec.youth != null) o['summary.attendanceYouthWithDisability'] = rec.youth;
  if (rec.military != null) o['summary.attendanceMilitaryActiveDuty'] = rec.military;
  if (rec.parents != null) o['summary.newParentCount'] = rec.parents;
  if (rec.tierModel) o['summary.tierModel'] = rec.tierModel;
  return o;
}

// Find an existing one-off / single event that already represents this row (dup guard).
function existingSameEvent(rec) {
  const t = norm(rec.title);
  return events.find(e => e.eventDate && rec.eventDate &&
    e.eventDate === rec.eventDate && norm(e.title) === t);
}

// Candidate matches for a MERGE row, ranked.
function mergeCandidates(rec) {
  const t = norm(rec.title);
  const out = [];
  for (const e of events) {
    const et = norm(e.title);
    let score = 0;
    if (et === t) score += 5;
    else if (et.includes(t) || t.includes(et)) score += 3;
    else {
      const tw = t.split(' ').filter(w => w.length > 3);
      const overlap = tw.filter(w => et.includes(w)).length;
      if (overlap >= 2) score += 2;
    }
    const dd = daysApart(e.eventDate, rec.eventDate);
    if (dd <= 1) score += 3; else if (dd <= 7) score += 1;
    if (score >= 3) out.push({ id: e._id, collection: 'events', title: e.title, eventDate: e.eventDate, summary: e.summary || {}, score, daysApart: Math.round(dd) });
  }
  for (const e of recurring) {
    const et = norm(e.title);
    const tw = t.split(' ').filter(w => w.length > 3);
    const overlap = tw.filter(w => et.includes(w)).length;
    if (et.includes(t) || t.includes(et) || overlap >= 2) {
      out.push({ id: e._id, collection: 'recurringEvents', title: e.title, eventDate: null, summary: null, score: 2, daysApart: null, recurring: true });
    }
  }
  return out.sort((a, b) => b.score - a.score);
}

const plan = [];
for (const rec of SRC) {
  if (rec.disposition === 'MERGE') {
    const cands = mergeCandidates(rec);
    const top = cands[0];
    const confident = top && (top.score >= 6 || (top.score >= 5 && (top.daysApart != null && top.daysApart <= 1)));
    if (confident && top.collection === 'events') {
      const ov = overridesFor(rec);
      // fill-only-if-absent: keep existing non-empty summary values, record conflicts
      const summ = top.summary || {};
      const willSet = {}, keep = [], conflict = [];
      for (const k of Object.keys(ov)) {
        const leaf = k.split('.').slice(1).join('.');
        const cur = summ[leaf];
        if (cur === undefined || cur === null || cur === '' || cur === 0) willSet[k] = ov[k];
        else if (String(cur) === String(ov[k])) keep.push(`${leaf}=${cur} (same)`);
        else conflict.push(`${leaf}: existing ${cur} vs pink ${ov[k]}`);
      }
      plan.push({ op: 'update', disposition: 'MERGE', rowRef: rec.rowRef, title: rec.title,
        target: { collection: top.collection, id: top.id, title: top.title, eventDate: top.eventDate },
        set: willSet, keptExisting: keep, conflicts: conflict,
        needsReview: conflict.length > 0, rec });
    } else {
      // No confident 1:1 match in the live system (these are recurring-series
      // sessions the system never stored discretely). Per decision, import as
      // net-new historical One-Off cards, tagged as reclassified merge rows.
      plan.push({ op: 'create', disposition: rec.disposition, rowRef: rec.rowRef,
        title: rec.title, eventDate: rec.eventDate, tierModel: rec.tierModel,
        headCount: rec.headCount, location: rec.location,
        wasMergeCandidate: true,
        nearestCandidates: cands.slice(0, 2).map(c => ({ title: c.title, eventDate: c.eventDate, score: c.score })),
        dupOf: null, note: 'Recurring-series session — no discrete live record; imported as historical card',
        rec });
    }
  } else {
    // NETNEW or DISSEM -> create one-off card (dup-guard first)
    const dup = existingSameEvent(rec);
    plan.push({ op: dup ? 'review' : 'create', disposition: rec.disposition, rowRef: rec.rowRef,
      title: rec.title, eventDate: rec.eventDate, tierModel: rec.tierModel,
      headCount: rec.headCount, location: rec.location,
      dupOf: dup ? { id: dup._id, title: dup.title } : null,
      note: dup ? 'An event with same title+date already exists — review before creating' : '',
      rec });
  }
}

fs.writeFileSync(path.join(OUT, 'plan.json'), JSON.stringify(plan, null, 2));

// ---------- HTML dry-run report ----------
const esc = s => String(s == null ? '' : s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const byOp = k => plan.filter(p => p.op === k);
const creates = byOp('create'), updates = byOp('update'), reviews = byOp('review');
const conflicts = updates.filter(u => u.conflicts.length);

function createRows() {
  return creates.map(p => `<tr><td><span class="b ${p.disposition === 'DISSEM' ? 'pu' : 'gr'}">${p.disposition}</span></td>
    <td>${esc(p.eventDate) || '—'}</td><td>${esc(p.tierModel) || '—'}</td>
    <td>${esc(p.title) || '«blank»'}</td><td style="text-align:right">${p.headCount ?? '·'}</td>
    <td>${esc(p.location)}</td></tr>`).join('');
}
function updateRows() {
  return updates.map(p => `<tr><td>${esc(p.title)}</td><td>${esc(p.target.title)}<br><span class=mut>${esc(p.target.eventDate)} · ${esc(p.target.id)}</span></td>
    <td>${Object.keys(p.set).length ? Object.entries(p.set).map(([k, v]) => `${esc(k.split('.').pop())}=${esc(v)}`).join('<br>') : '<span class=mut>nothing to fill</span>'}</td>
    <td>${p.conflicts.length ? '<span class="b re">' + p.conflicts.map(esc).join('<br>') + '</span>' : (p.keptExisting.length ? '<span class=mut>kept existing</span>' : '✓')}</td></tr>`).join('');
}
function reviewRows() {
  return reviews.map(p => `<tr><td><span class="b am">${esc(p.disposition)}</span></td><td>${esc(p.title)}<br><span class=mut>${esc(p.rec.eventDate)}</span></td>
    <td>${esc(p.note)}${p.dupOf ? '<br><span class=mut>dup of ' + esc(p.dupOf.title) + '</span>' : ''}${p.candidates ? '<br>' + p.candidates.map(c => `<span class=mut>${esc(c.title)} (${esc(c.eventDate)}, score ${c.score})</span>`).join('<br>') : ''}</td></tr>`).join('');
}

const html = `<!doctype html><meta charset=utf8><title>PTI Backfill — Dry Run</title>
<style>
body{font:15px/1.5 -apple-system,Helvetica,Arial,sans-serif;color:#1f2933;max-width:1000px;margin:0 auto;padding:24px;background:#f7f9fb}
h1{font-size:23px;margin:0 0 2px}h2{font-size:18px;margin:30px 0 8px;border-bottom:2px solid #e3e8ee;padding-bottom:6px}
.brand{font:12px/1 -apple-system;letter-spacing:.14em;text-transform:uppercase;color:#0b6e99;margin-bottom:8px}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0}
.card{background:#fff;border:1px solid #e3e8ee;border-radius:10px;padding:12px;text-align:center}
.card .n{font-size:25px;font-weight:700}.card .l{font-size:12px;color:#647280}
table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e3e8ee;border-radius:8px;overflow:hidden;font-size:13px;margin:8px 0}
th{background:#eef3f7;text-align:left;padding:7px 9px;font-size:11px;text-transform:uppercase;color:#4a5763}
td{padding:6px 9px;border-top:1px solid #eef3f7;vertical-align:top}
.b{color:#fff;padding:1px 7px;border-radius:10px;font-size:11px;white-space:nowrap}
.gr{background:#16a34a}.pu{background:#9333ea}.am{background:#d97706}.re{background:#dc2626}
.mut{color:#8795a1;font-size:12px}
.box{background:#fff;border:1px solid #e3e8ee;border-left:4px solid #0b6e99;border-radius:8px;padding:12px 14px;margin:12px 0}
.box.warn{border-left-color:#d97706;background:#fffaf2}.box.go{border-left-color:#16a34a;background:#f1fbf4}
code{background:#eef3f7;padding:1px 5px;border-radius:4px}
</style>
<div class=brand>Oahu App Design</div>
<h1>PTI Pink-Sheet Backfill — Dry Run</h1>
<div class=mut>Batch <code>${L.BATCH_ID}</code> · live system read-only · NOTHING written · generated for review</div>
<div class=cards>
<div class=card><div class="n" style="color:#16a34a">${creates.length}</div><div class=l>Will CREATE<br>(one-off cards)</div></div>
<div class=card><div class="n" style="color:#2563eb">${updates.length}</div><div class=l>Will MERGE<br>(onto existing)</div></div>
<div class=card><div class="n" style="color:#d97706">${reviews.length}</div><div class=l>Needs your review</div></div>
<div class=card><div class="n" style="color:#dc2626">${conflicts.length}</div><div class=l>Value conflicts</div></div>
</div>
<div class=box>Live system scanned: <b>${events.length}</b> events, <b>${recurring.length}</b> recurring series.
Merges <b>fill only empty</b> summary fields — existing non-empty values are never overwritten; any disagreement is flagged below, not changed.</div>

<h2>1 · CREATE — new One-Off cards (${creates.length})</h2>
<table><tr><th>Type</th><th>Date</th><th>Tier</th><th>Title</th><th>HC</th><th>Location</th></tr>${createRows()}</table>

<h2>2 · MERGE — fill empty fields on existing events (${updates.length})</h2>
<table><tr><th>Pink-sheet row</th><th>Matched live event</th><th>Will set</th><th>Status</th></tr>${updateRows() || '<tr><td colspan=4 class=mut>none auto-matched confidently</td></tr>'}</table>

<h2>3 · NEEDS YOUR REVIEW (${reviews.length})</h2>
<div class=box warn>These were not auto-applied. For merge rows with no confident match you can pick a candidate or let them become net-new cards; for creates that collide with an existing event, confirm before adding.</div>
<table><tr><th>Type</th><th>Pink-sheet row</th><th>Why / candidates</th></tr>${reviewRows() || '<tr><td colspan=3 class=mut>none</td></tr>'}</table>

<div class=box go><b>Next:</b> nothing has been written. Approve and I run a small canary commit
(<code>node 03_import.js --commit --only NETNEW --limit 3</code>) you can eyeball live, then the full import.
Undo anytime: <code>node 04_undo.js --commit</code>.</div>`;
fs.writeFileSync(path.join(OUT, 'dryrun_report.html'), html);

console.error(`\nplan: create=${creates.length} update=${updates.length} review=${reviews.length} conflicts=${conflicts.length}`);
console.error(`wrote ${OUT}/plan.json`);
console.error(`wrote ${OUT}/dryrun_report.html`);
