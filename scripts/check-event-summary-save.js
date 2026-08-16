#!/usr/bin/env node
/**
 * Assert the Event Summary Save button exists in BOTH branches, in BOTH copies.
 *
 * Why this file exists: on 2026-08-08 commit c456921 added a disabled Save
 * button for "no session date picked yet". The live root got the full if/else --
 * disabled when there is no session, enabled green Save otherwise. The STAGE
 * copy in the same commit got only the `if`. The `else` was never written, so
 * STAGE rendered NO save button at all in the normal case.
 *
 * It sat there six days. On 2026-08-14 the chat pop-out promotion (151ed17)
 * copied STAGE over live and carried the omission onto production. Staff could
 * not save any Event Summary until 2026-08-15 -- the form filled in, Save was
 * simply absent, and nothing errored.
 *
 * The failure mode is invisible: a missing button throws nothing, logs nothing,
 * and the page looks intact. Only a human noticing "I cannot save" catches it.
 * Hence this check.
 *
 * Usage: node scripts/check-event-summary-save.js
 * Exit 0 = both files sound. Exit 1 = a branch is missing.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILES = ['index.html', 'STAGE/index.html'];

// The enabled button is the one that actually saves. Match on the handler call
// rather than the label -- both buttons read "Save Summary".
const ENABLED = /onclick="cmsSaveEventSummary\(\)">Save Summary</;
const DISABLED = /disabled title="Pick a session date first[^"]*">Save Summary</;
// The handler guards itself too, so a UI drift cannot write to the wrong place.
const HANDLER_GUARD = /_showToast\('Pick a session date first/;

let failed = 0;

for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    console.error(`  MISSING FILE  ${rel}`);
    failed++;
    continue;
  }
  const src = fs.readFileSync(file, 'utf8');

  const checks = [
    ['enabled Save button (the one that saves)', ENABLED],
    ['disabled Save button (no session picked)', DISABLED],
    ['in-handler session guard', HANDLER_GUARD],
  ];

  const missing = checks.filter(([, re]) => !re.test(src)).map(([name]) => name);

  if (missing.length) {
    failed++;
    console.error(`FAIL  ${rel}`);
    missing.forEach((m) => console.error(`        missing: ${m}`));
  } else {
    console.log(`ok    ${rel}`);
  }
}

if (failed) {
  console.error(`\n${failed} file(s) failed. Staff cannot save Event Summaries in a file missing the enabled button.`);
  process.exit(1);
}

console.log('\nBoth copies render a working Save Summary button.');
