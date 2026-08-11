#!/usr/bin/env node
/* Report where a repo's live files and its STAGE/ copies have drifted apart.
 *
 *   node scripts/check-stage-drift.js [repoDir] [--verbose]
 *
 * Exits 1 when real drift is found, so it can gate a commit hook or CI.
 *
 * WHY THIS EXISTS
 * Every LDAH repo keeps a STAGE/ copy of its pages beside the live ones. Most
 * commits touch both, but not all: of the last 40 commits touching LDAH-Int's
 * index.html, 11 changed only one side. That is how STAGE ended up ~3,300 lines
 * from live, and how STAGE sat for a week running signup code whose duplicate-
 * signup bug had already been fixed in live (2026-08-04). Drift is not visible
 * until something breaks, which is the whole problem — this makes it visible.
 *
 * WHAT IT IGNORES
 * Some differences are correct and must never be "fixed":
 *   - STAGE pages link to STAGE resources: .../STAGE/Members/ vs .../Members/
 *   - Cache-busters differ freely: ll-popup.js?v=aug12 vs ll-popup.js
 *   - Build/version stamps differ by design: v145.93.0 vs v146.98.0-STAGE
 * Those are normalised away. Anything still different afterwards is real.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const repo = process.argv[2] && !process.argv[2].startsWith('--')
  ? path.resolve(process.argv[2])
  : process.cwd();
const verbose = process.argv.includes('--verbose');

// Collapse the differences that are supposed to exist.
function normalise(text) {
  return text
    // STAGE pages point at STAGE resources — same link, different environment.
    .replace(/ldahawaii\.org\/STAGE\//g, 'ldahawaii.org/')
    .replace(/danpoahu\.github\.io\/([A-Za-z_-]+)\/STAGE\//g, 'danpoahu.github.io/$1/')
    // Cache-busters are free to differ; they say nothing about behaviour.
    .replace(/\?v=[A-Za-z0-9._-]+/g, '')
    // Version stamps differ by design (live vNNN vs STAGE vNNN-STAGE).
    .replace(/v\d+\.\d+\.\d+(-STAGE)?/g, 'vX')
    // Trailing whitespace and blank-line churn are not drift.
    .split('\n').map(l => l.replace(/\s+$/, '')).filter(l => l !== '').join('\n');
}

if (!fs.existsSync(path.join(repo, 'STAGE'))) {
  console.error(`No STAGE/ directory in ${repo}`);
  process.exit(2);
}

const stageFiles = fs.readdirSync(path.join(repo, 'STAGE'))
  .filter(f => /\.(html|js|css)$/i.test(f))
  .filter(f => fs.existsSync(path.join(repo, f)))
  .sort();

let drifted = 0;
const clean = [];

for (const f of stageFiles) {
  const live = normalise(fs.readFileSync(path.join(repo, f), 'utf8'));
  const stage = normalise(fs.readFileSync(path.join(repo, 'STAGE', f), 'utf8'));
  if (live === stage) { clean.push(f); continue; }

  const liveLines = live.split('\n');
  const stageLines = stage.split('\n');
  const liveSet = new Set(liveLines);
  const stageSet = new Set(stageLines);
  const onlyLive = liveLines.filter(l => !stageSet.has(l)).length;
  const onlyStage = stageLines.filter(l => !liveSet.has(l)).length;

  drifted++;
  console.log(`DRIFT  ${f}`);
  console.log(`         only in live : ${onlyLive} lines`);
  console.log(`         only in STAGE: ${onlyStage} lines`);
  if (verbose) {
    stageLines.filter(l => !liveSet.has(l)).slice(0, 10)
      .forEach(l => console.log(`         STAGE-only | ${l.trim().slice(0, 100)}`));
  }
}

if (clean.length) console.log(`\nin sync (${clean.length}): ${clean.join(', ')}`);

if (drifted) {
  console.log(`\n${drifted} file(s) drifted. Diff before promoting — drift runs BOTH ways,`);
  console.log('and live is often the newer side. Never bulk-copy without checking.');
  process.exit(1);
}
console.log('\nNo drift.');
