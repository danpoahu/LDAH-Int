#!/usr/bin/env node
/**
 * Make the Announce island filter read contacts.island instead of guessing
 * from ZIP.
 *
 * Why: contacts.island was backfilled across every contact on 2026-08-06 and
 * is maintained by onContactCreated/onContactUpdated, with staff able to
 * override it by hand (islandSource === 'manual'). The filter shipped in
 * v148.1 ignored all of that and re-derived island from a fourth private copy
 * of the ZIP table. Measured against live contacts it was materially worse:
 *
 *     island     stored   ZIP guess   missed
 *     Molokai       37           8       29
 *     Oahu          97          86       11
 *     Hawaii       305         302        3
 *     Maui/Kauai/Lanai identical
 *
 * plus 11 contacts whose island a staff member had corrected by hand, which
 * the ZIP guess silently overruled. Molokai is the dangerous one -- a Molokai
 * event would have reached 8 of 37 people with nothing on screen to say so.
 *
 * After this change the stored field is the authority and cmsIslandOf() is
 * only consulted when the field is 'Unknown' or absent. That also stops this
 * file being a fourth copy of a ZIP table already duplicated three ways --
 * it is now a fallback for the ~65 Unknowns, not the primary path.
 *
 * Touches the Cloud Function (one whitelisted projection field) and both
 * copies of the Int dashboard.
 *
 * Usage: node scripts/announce-island-use-stored-field-2026-08-17.js
 */
const fs = require('fs');
const path = require('path');

const INT = path.resolve(__dirname, '..');
const CF  = path.resolve(INT, '..', 'LDAH_W2', 'functions', 'index.js');
const HTML = [
  { p: path.join(INT, 'STAGE', 'index.html'), from: 'v148.8-STAGE', to: 'v148.9-STAGE' },
  { p: path.join(INT, 'index.html'),          from: 'v148.1',       to: 'v148.2' },
];

let failed = false;
const fail = (m) => { console.error('  FAIL  ' + m); failed = true; };
const ok   = (m) => console.log('  ok    ' + m);

function sub(src, find, repl, label, times = 1) {
  const parts = src.split(find);
  if (parts.length - 1 !== times) { fail(`${label}: anchor found ${parts.length - 1}x, expected ${times}x`); return src; }
  if (find === repl) { fail(`${label}: replacement identical`); return src; }
  ok(`${label} (${times}x)`);
  return parts.join(repl);
}

// ── Cloud Function: carry contacts.island through the dry-run ────────────────
console.log('\nLDAH_W2/functions/index.js:');
let cf = fs.readFileSync(CF, 'utf8');

cf = sub(cf,
`        city: c.city || "", zipCode: String(c.zipCode || c.zip || "").trim() });`,
`        city: c.city || "", zipCode: String(c.zipCode || c.zip || "").trim(),
        // The maintained island field (backfilled 2026-08-06, kept current by
        // onContactCreated/onContactUpdated, hand-overridable by staff). The
        // modal prefers this over guessing from the ZIP -- guessing found 8
        // Molokai contacts where the field knows about 37.
        island: c.island || "" });`,
  'CF: carry island onto the recipient');

cf = sub(cf,
`              city: r.city || "",
              zipCode: r.zipCode || "",`,
`              city: r.city || "",
              zipCode: r.zipCode || "",
              island: r.island || "",`,
  'CF: add island to the dry-run projection');

if (!failed) { fs.writeFileSync(CF, cf); ok('written'); }

// ── Dashboard: prefer the stored field, fall back to the ZIP resolver ───────
const OLD_LABELS = `var CMS_ISLAND_LABEL = { hawaii:"Hawaiʻi Island", oahu:"Oʻahu", maui:"Maui", molokai:"Molokaʻi", lanai:"Lānaʻi", kauai:"Kauaʻi" };
var CMS_ISLAND_COLOR = { hawaii:'#B45309', oahu:'#1D4ED8', maui:'#7C3AED', molokai:'#0F766E', lanai:'#A21CAF', kauai:'#15803D' };`;

const NEW_LABELS = `var CMS_ISLAND_LABEL = { hawaii:"Hawaiʻi Island", oahu:"Oʻahu", maui:"Maui", molokai:"Molokaʻi", lanai:"Lānaʻi", kauai:"Kauaʻi", other:"All Other Locations" };
var CMS_ISLAND_COLOR = { hawaii:'#B45309', oahu:'#1D4ED8', maui:'#7C3AED', molokai:'#0F766E', lanai:'#A21CAF', kauai:'#15803D', other:'#64748B' };

/* contacts.island is the authority, not the ZIP tables above. It is backfilled
   across every contact, kept current by onContactCreated/onContactUpdated, and
   a staff member can correct it by hand (islandSource === 'manual') -- 11
   contacts carry such a correction and a guess must never overrule one.
   Guessing from ZIP found 8 Molokaʻi contacts where the field knows 37.

   Stored vocabulary is ASCII with the ʻokina only in the label. 'Off Island'
   is the legacy spelling of 'Other'. 'Unknown' deliberately maps to nothing so
   it falls through to cmsIslandOf(), which is now a fallback for the ~65
   Unknowns rather than the primary path. */
var CMS_ISLAND_FROM_FIELD = { Hawaii:'hawaii', Oahu:'oahu', Maui:'maui', Molokai:'molokai',
  Lanai:'lanai', Kauai:'kauai', Other:'other', 'Off Island':'other' };

function cmsRecipIsland(r) {
  return CMS_ISLAND_FROM_FIELD[String((r && r.island) || '').trim()] || cmsIslandOf(r && r.city, r && r.zipCode);
}`;

const OLD_ATTR = `              + ' data-island="' + cmsIslandOf(r.city, r.zipCode) + '"'`;
const NEW_ATTR = `              + ' data-island="' + cmsRecipIsland(r) + '"'`;

const OLD_COLOR = `(CMS_ISLAND_COLOR[cmsIslandOf(r.city, r.zipCode)] || '#94A3B8')`;
const NEW_COLOR = `(CMS_ISLAND_COLOR[cmsRecipIsland(r)] || '#94A3B8')`;

const OLD_OPT = `                  '<option value="kauai">Kaua&#699;i</option>' +
                  '<option value="none">No location on file</option>' +`;
const NEW_OPT = `                  '<option value="kauai">Kaua&#699;i</option>' +
                  '<option value="other">All Other Locations</option>' +
                  '<option value="none">No location on file</option>' +`;

HTML.forEach((f) => {
  console.log('\n' + path.relative(INT, f.p) + ':');
  let s = fs.readFileSync(f.p, 'utf8');
  s = sub(s, OLD_LABELS, NEW_LABELS, 'stored-field mapping + cmsRecipIsland');
  s = sub(s, OLD_ATTR,   NEW_ATTR,   'roster data-island uses the stored field');
  s = sub(s, OLD_COLOR,  NEW_COLOR,  'city colour uses the stored field');
  s = sub(s, OLD_OPT,    NEW_OPT,    'All Other Locations option');
  s = sub(s, `>${f.from}</span>`, `>${f.to}</span>`, `version ${f.from} -> ${f.to}`);
  if (s.includes('cmsIslandOf(r.city, r.zipCode)')) fail('a raw cmsIslandOf(r...) call survived — it must go through cmsRecipIsland');
  if (!failed) { fs.writeFileSync(f.p, s); ok('written'); }
});

console.log(failed ? '\nFAILED — check output above.' : '\nAll edits applied and asserted.');
process.exit(failed ? 1 : 0);
