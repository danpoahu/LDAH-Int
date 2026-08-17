#!/usr/bin/env node
/**
 * Announce modal: replace the two hardcoded quick-select links ("Big Island
 * only", "Not yet sent") with an Island + Status filter pair.
 *
 * Why: both links hard-excluded anyone already emailed
 * (data-sent === '1'). On a re-announce that is nearly everyone -- Hilo 'Ohana
 * Movie Night had 304 of 405 already sent -- so there was no way at all to tick
 * "Hawai'i Island, already emailed, still not signed up", which is exactly the
 * audience a re-announce is for. The backend already honours an explicit
 * recipientIds list regardless of already-sent (it only force-skips people who
 * signed up), so this is frontend-only. No Cloud Function change.
 *
 * Island buckets verified against live contacts on 2026-08-17 by
 * LDAH_W2/functions/audit-contact-islands-2026-08-17.js:
 *   hawaii 302 - oahu 86 - molokai 8 - kauai 4 - maui 4 - lanai 1 - none 117
 *   0 ambiguous city names, 0 ZIP/city conflicts.
 * 112 of the 117 have no city AND no ZIP, which is why "No location on file"
 * is an offered bucket -- without it those contacts are invisible to every
 * island choice and would be silently excluded from every island send.
 *
 * Edits STAGE/index.html and index.html identically (they were byte-identical
 * across this whole block before the change -- asserted below).
 *
 * Every replacement asserts its anchor appears EXACTLY once and that the text
 * actually changed. A .replace() that silently matches nothing is the failure
 * mode this guards against.
 *
 * Usage: node scripts/announce-island-filter-2026-08-17.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILES = [
  { p: path.join(ROOT, 'STAGE', 'index.html'), from: 'v148.7-STAGE', to: 'v148.8-STAGE' },
  { p: path.join(ROOT, 'index.html'),          from: 'v148.0',       to: 'v148.1' },
];

let failed = false;
const fail = (m) => { console.error('  FAIL  ' + m); failed = true; };
const ok   = (m) => console.log('  ok    ' + m);

/** Replace `find` with `repl`, asserting `find` occurs exactly `times`. */
function sub(src, find, repl, label, times = 1) {
  const parts = src.split(find);
  const found = parts.length - 1;
  if (found !== times) { fail(`${label}: anchor found ${found}x, expected ${times}x`); return src; }
  if (find === repl)   { fail(`${label}: replacement identical to anchor`); return src; }
  ok(`${label} (${found}x)`);
  return parts.join(repl);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. The island helper. Replaces cmsIsBigIsland + its two constants.
// ─────────────────────────────────────────────────────────────────────────────
const OLD_HELPER_START = '/* Hawaiʻi County (Big Island) ZIPs.';
const OLD_HELPER_END   = '  return CMS_BIG_ISLAND_CITY.test(c);\n}';

const NEW_HELPER = `/* Which island a contact is on. ZIP is the reliable signal; the city field is
   free text and inconsistent ("Hilo", "hilo", "Hilo, HI", "Kea’au", "Keaau, HI"),
   so city is only a fallback.

   Two traps are deliberately handled:
   - Kilauea is NOT a Hawaiʻi-island city here. The volcano is on Hawaiʻi island
     but the TOWN of Kilauea is on Kauaʻi (96754), and two real contacts live
     there. Matching the name alone would have mailed them a Hilo event.
   - Plain "Kailua" is Oʻahu (96734). Only "Kailua-Kona" is Hawaiʻi island, hence
     the negative lookahead in the Oʻahu pattern.

   Bucket counts verified against live contacts 2026-08-17 (see
   LDAH_W2/functions/audit-contact-islands-2026-08-17.js): hawaii 302, oahu 86,
   molokai 8, kauai 4, maui 4, lanai 1, no location 117. Zero city names were
   ambiguous and zero ZIPs disagreed with their city. */
var CMS_ISLAND_ZIPS = {
  hawaii:  ['96704','96710','96718','96719','96720','96721','96725','96726','96727','96728',
    '96737','96738','96739','96740','96743','96745','96749','96750','96755','96760','96764','96771','96772',
    '96773','96774','96776','96777','96778','96780','96781','96783','96785'],
  maui:    ['96708','96713','96732','96733','96753','96761','96767','96768','96779','96784','96788','96790','96793'],
  molokai: ['96729','96742','96748','96757','96770'],
  lanai:   ['96763'],
  kauai:   ['96703','96705','96714','96715','96716','96722','96741','96746','96747','96751','96752','96754',
    '96756','96765','96766','96769','96796'],
  oahu:    ['96701','96706','96707','96709','96712','96717','96730','96731','96734','96744','96759','96762',
    '96782','96786','96789','96791','96792','96795','96797']
};
var CMS_ISLAND_CITY = {
  hawaii:  /\\b(hilo|kailua[- ]?kona|kona|kea.?au|kamuela|honoka.?a|pahoa|volcano|na.?alehu|captain cook|kealakekua|holualoa|honaunau|waikoloa|hawi|kapaau|papaikou|pepeekeo|mountain view|kurtistown|laupahoehoe|ookala|paauilo|pahala|ocean view|hakalau|ninole|honomu|papaaloa|keauhou)\\b/i,
  maui:    /\\b(kahului|wailuku|kihei|lahaina|kaanapali|napili|makawao|pukalani|kula|paia|haiku|hana|puunene|wailea|maui)\\b/i,
  molokai: /\\b(moloka.?i|kaunakakai|hoolehua|kualapuu|maunaloa|kalaupapa)\\b/i,
  lanai:   /\\b(lana.?i city|lana.?i)\\b/i,
  kauai:   /\\b(kaua.?i|lihue|kapaa|princeville|hanalei|koloa|poipu|eleele|hanapepe|kalaheo|kekaha|anahola|wailua|kilauea|kaumakani|lawai|makaweli)\\b/i,
  oahu:    /\\b(honolulu|o.?ahu|waipahu|pearl city|mililani|kaneohe|kailua(?![- ]?kona)|aiea|ewa beach|kapolei|waianae|wahiawa|waimanalo|haleiwa|laie|hauula|kahuku|kaaawa|waialua|kunia|makakilo|hawaii kai|manoa|kahala|salt lake|schofield|hickam|wheeler|pearl harbor)\\b/i
};
// Hawaiʻi island first so "Kailua-Kona" is claimed before Oʻahu's "Kailua" ever runs.
var CMS_ISLAND_ORDER = ['hawaii','maui','molokai','lanai','kauai','oahu'];
var CMS_ISLAND_LABEL = { hawaii:"Hawaiʻi Island", oahu:"Oʻahu", maui:"Maui", molokai:"Molokaʻi", lanai:"Lānaʻi", kauai:"Kauaʻi" };
var CMS_ISLAND_COLOR = { hawaii:'#B45309', oahu:'#1D4ED8', maui:'#7C3AED', molokai:'#0F766E', lanai:'#A21CAF', kauai:'#15803D' };

function cmsIslandOf(city, zip) {
  var z = String(zip || '').trim().slice(0, 5);
  if (/^\\d{5}$/.test(z)) {
    if (z.indexOf('968') === 0) return 'oahu';        // Honolulu + Oʻahu military
    for (var i = 0; i < CMS_ISLAND_ORDER.length; i++) {
      var k = CMS_ISLAND_ORDER[i];
      if (CMS_ISLAND_ZIPS[k].indexOf(z) !== -1) return k;
    }
    // Unrecognised ZIP: fall through to city rather than give up. One real
    // contact reads "Ewa beach 97706" (96706 mistyped) -- the city is plainly
    // right and dropping her would exclude her from every island send. A
    // genuine mainland ZIP has a mainland city, so it still ends up unassigned.
  }
  var c = String(city || '').trim();
  if (!c) return '';
  for (var j = 0; j < CMS_ISLAND_ORDER.length; j++) {
    var kk = CMS_ISLAND_ORDER[j];
    if (CMS_ISLAND_CITY[kk].test(c)) return kk;
  }
  return '';
}`;

// ─────────────────────────────────────────────────────────────────────────────
// 2. Roster row: data-bi -> data-island, and colour the city by island.
// ─────────────────────────────────────────────────────────────────────────────
const OLD_DATA_BI = `              + ' data-bi="' + (cmsIsBigIsland(r.city, r.zipCode) ? '1' : '0') + '"'`;
const NEW_DATA_BI = `              + ' data-island="' + cmsIslandOf(r.city, r.zipCode) + '"'`;

const OLD_CITY_SPAN = `            (r.city ? '<span style="font-size:.72rem;color:' + (cmsIsBigIsland(r.city, r.zipCode) ? '#B45309' : '#94A3B8') + ';margin-left:8px;">' + rsEscape(r.city) + (r.zipCode ? ' ' + rsEscape(String(r.zipCode).slice(0,5)) : '') + '</span>' : '') +`;
const NEW_CITY_SPAN = `            (r.city ? '<span style="font-size:.72rem;color:' + (CMS_ISLAND_COLOR[cmsIslandOf(r.city, r.zipCode)] || '#94A3B8') + ';margin-left:8px;">' + rsEscape(r.city) + (r.zipCode ? ' ' + rsEscape(String(r.zipCode).slice(0,5)) : '') + '</span>' : '') +`;

// ─────────────────────────────────────────────────────────────────────────────
// 3. The controls: link row -> Select all/none only, plus two dropdowns.
// ─────────────────────────────────────────────────────────────────────────────
const OLD_LINKS = `            '<span style="font-size:.78rem;color:#64748B;"><a href="javascript:void(0)" id="cmsAnnSelAll">Select all</a> &middot; <a href="javascript:void(0)" id="cmsAnnSelNone">Select none</a> &middot; <a href="javascript:void(0)" id="cmsAnnSelBigIsland" style="color:#B45309;font-weight:700;" title="Tick only contacts on Hawai&#8216;i Island who have not already been sent this — by ZIP, falling back to city">Big Island only</a> &middot; <a href="javascript:void(0)" id="cmsAnnSelUnsent" style="color:#166534;font-weight:700;" title="Tick everyone who has not already received this announcement">Not yet sent</a></span>' +
          '</div>' +`;

const SEL_CSS = 'width:100%;margin-top:3px;padding:6px 8px;border:1px solid #CBD5E1;border-radius:6px;font-size:.84rem;font-weight:400;background:#fff;';
const NEW_LINKS = `            '<span style="font-size:.78rem;color:#64748B;"><a href="javascript:void(0)" id="cmsAnnSelAll">Select all</a> &middot; <a href="javascript:void(0)" id="cmsAnnSelNone">Select none</a></span>' +
          '</div>' +
          // Island + status filter. The two combine (AND). Signed-up people are
          // rendered without a checkbox at all, so every combination here is
          // implicitly "and not signed up" -- there is no way to reach them.
          '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:10px 12px;margin-bottom:8px;">' +
            '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;">' +
              '<label style="flex:1;min-width:150px;font-size:.78rem;color:#475569;font-weight:600;">Island' +
                '<select id="cmsAnnFilterIsland" style="${SEL_CSS}">' +
                  '<option value="">All islands</option>' +
                  '<option value="hawaii">Hawai&#699;i Island</option>' +
                  '<option value="oahu">O&#699;ahu</option>' +
                  '<option value="maui">Maui</option>' +
                  '<option value="molokai">Moloka&#699;i</option>' +
                  '<option value="lanai">L&#257;na&#699;i</option>' +
                  '<option value="kauai">Kaua&#699;i</option>' +
                  '<option value="none">No location on file</option>' +
                '</select>' +
              '</label>' +
              '<label style="flex:1;min-width:170px;font-size:.78rem;color:#475569;font-weight:600;">Status' +
                '<select id="cmsAnnFilterStatus" style="${SEL_CSS}">' +
                  '<option value="unsent">Not yet sent</option>' +
                  '<option value="sent">Already sent, no signup</option>' +
                  '<option value="any">Everyone not signed up</option>' +
                '</select>' +
              '</label>' +
            '</div>' +
            '<div style="display:flex;align-items:center;justify-content:flex-end;gap:10px;margin-top:8px;">' +
              '<span style="font-size:.8rem;color:#475569;">&rarr; <strong id="cmsAnnFilterCount">0</strong> match</span>' +
              '<button id="cmsAnnFilterApply" style="background:#004E7C;color:#fff;border:none;padding:6px 14px;border-radius:6px;font-weight:700;font-size:.82rem;cursor:pointer;">Tick these</button>' +
            '</div>' +
            '<div id="cmsAnnFilterWarn" style="display:none;margin-top:8px;font-size:.78rem;color:#92400E;background:#FFFBEB;border:1px solid #FDE68A;border-radius:6px;padding:6px 9px;line-height:1.45;"></div>' +
          '</div>' +`;

// ─────────────────────────────────────────────────────────────────────────────
// 4. Handlers: drop _annPick + the two link listeners, add the filter logic.
// ─────────────────────────────────────────────────────────────────────────────
const OLD_HANDLERS = `  // Ticks the Big Island and unticks everyone else, so one click gives the
  // audience for a Hilo or Kona event. Nothing sends until Send is pressed.
  // Both quick-selects skip anyone already sent — re-sending the same
  // announcement to the same person is never the intent.
  function _annPick(test, label, colour) {
    var n = 0;
    Array.prototype.forEach.call(document.querySelectorAll('#cmsAnnRecipientList .cmsAnnRecip'), function(cb) {
      var on = cb.getAttribute('data-sent') !== '1' && test(cb);
      cb.checked = on;
      if (on) n++;
    });
    _annUpdateSelCount();
    if (typeof _showToast === 'function') {
      _showToast(n ? n + ' ' + label + (n === 1 ? '' : 's') + ' selected.' : 'Nobody matches — everyone eligible may already have been sent this.', n ? colour : '#64748B');
    }
  }
  var _biLink = document.getElementById('cmsAnnSelBigIsland');
  if (_biLink) _biLink.addEventListener('click', function() {
    _annPick(function(cb) { return cb.getAttribute('data-bi') === '1'; }, 'Big Island recipient', '#B45309');
  });
  var _unsentLink = document.getElementById('cmsAnnSelUnsent');
  if (_unsentLink) _unsentLink.addEventListener('click', function() {
    _annPick(function() { return true; }, 'recipient', '#166534');
  });`;

const NEW_HANDLERS = `  // Island + status filter. The predecessor was two links ("Big Island only",
  // "Not yet sent") that both hard-excluded anyone already emailed, which made
  // the re-announce audience -- already emailed, still not signed up -- flatly
  // unreachable. These two dropdowns AND together and every combination is
  // reachable, including that one.
  //
  // Changing a dropdown only recounts. Ticking happens on the button, so a
  // stray click cannot silently rewrite a 300-person selection.
  function _annFilterEls() {
    return {
      isl:  document.getElementById('cmsAnnFilterIsland'),
      st:   document.getElementById('cmsAnnFilterStatus'),
      cnt:  document.getElementById('cmsAnnFilterCount'),
      warn: document.getElementById('cmsAnnFilterWarn')
    };
  }
  function _annFilterMatches() {
    var e = _annFilterEls();
    if (!e.isl || !e.st) return [];
    var wantIsl = e.isl.value, wantSt = e.st.value;
    return Array.prototype.filter.call(
      document.querySelectorAll('#cmsAnnRecipientList .cmsAnnRecip'),
      function(cb) {
        var isl = cb.getAttribute('data-island') || '';
        // '' = all islands. 'none' = the no-location-on-file bucket, which is
        // 112 contacts with neither city nor ZIP; without an explicit choice
        // they are invisible to every island filter and never get mailed.
        if (wantIsl === 'none') { if (isl) return false; }
        else if (wantIsl && isl !== wantIsl) return false;
        var sent = cb.getAttribute('data-sent') === '1';
        if (wantSt === 'unsent' && sent) return false;
        if (wantSt === 'sent' && !sent) return false;
        return true;
      });
  }
  function _annFilterRefresh() {
    var e = _annFilterEls();
    if (!e.isl || !e.st) return;             // list can render before the controls exist
    var m = _annFilterMatches();
    if (e.cnt) e.cnt.textContent = m.length;
    if (e.warn) {
      var st = e.st.value, msg = '';
      if (st === 'sent') msg = 'Everyone matching already received this announcement. Ticking them sends a <strong>second copy</strong> as a reminder.';
      else if (st === 'any') msg = 'This includes people who already received this announcement \\u2014 they would get a <strong>second copy</strong>.';
      e.warn.innerHTML = msg;
      e.warn.style.display = msg ? 'block' : 'none';
    }
  }
  function _annFilterApply() {
    var m = _annFilterMatches();
    Array.prototype.forEach.call(document.querySelectorAll('#cmsAnnRecipientList .cmsAnnRecip'), function(cb) { cb.checked = false; });
    m.forEach(function(cb) { cb.checked = true; });
    _annUpdateSelCount();
    if (typeof _showToast === 'function') {
      _showToast(m.length ? m.length + ' recipient' + (m.length === 1 ? '' : 's') + ' ticked.' : 'Nobody matches that combination \\u2014 nothing ticked.', m.length ? '#004E7C' : '#64748B');
    }
  }
  ['cmsAnnFilterIsland', 'cmsAnnFilterStatus'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('change', _annFilterRefresh);
  });
  var _applyBtn = document.getElementById('cmsAnnFilterApply');
  if (_applyBtn) _applyBtn.addEventListener('click', _annFilterApply);
  _annFilterRefresh();`;

// The roster re-renders on an audience/date change, so the match count has to
// re-derive from the new rows or it goes stale against a list that moved.
const OLD_RENDER_TAIL = `    Array.prototype.forEach.call(host.querySelectorAll('.cmsAnnRecip'), function(cb) { cb.addEventListener('change', _annUpdateSelCount); });
    _annUpdateSelCount();
  }`;
const NEW_RENDER_TAIL = `    Array.prototype.forEach.call(host.querySelectorAll('.cmsAnnRecip'), function(cb) { cb.addEventListener('change', _annUpdateSelCount); });
    _annUpdateSelCount();
    if (typeof _annFilterRefresh === 'function') _annFilterRefresh();
  }`;

// ─────────────────────────────────────────────────────────────────────────────

// Both copies must be identical across this block going in, or a shared patch
// is not safe to apply.
const before = FILES.map(f => fs.readFileSync(f.p, 'utf8'));
[OLD_DATA_BI, OLD_CITY_SPAN, OLD_LINKS, OLD_HANDLERS, OLD_RENDER_TAIL].forEach((anchor, i) => {
  if (before.every(s => s.includes(anchor))) return;
  fail(`pre-flight: anchor #${i + 1} missing from at least one copy — files have drifted`);
});
if (failed) { console.error('\nAborted, nothing written.'); process.exit(1); }

FILES.forEach((f, i) => {
  console.log('\n' + path.relative(ROOT, f.p) + ':');
  let s = before[i];

  const hs = s.indexOf(OLD_HELPER_START);
  const he = s.indexOf(OLD_HELPER_END);
  if (hs === -1 || he === -1 || s.indexOf(OLD_HELPER_START, hs + 1) !== -1) {
    fail('helper block: could not bracket exactly one occurrence');
  } else {
    s = s.slice(0, hs) + NEW_HELPER + s.slice(he + OLD_HELPER_END.length);
    ok('helper block -> cmsIslandOf');
  }

  s = sub(s, OLD_DATA_BI,      NEW_DATA_BI,      'roster data-island');
  s = sub(s, OLD_CITY_SPAN,    NEW_CITY_SPAN,    'city colour by island');
  s = sub(s, OLD_LINKS,        NEW_LINKS,        'filter controls markup');
  s = sub(s, OLD_HANDLERS,     NEW_HANDLERS,     'filter handlers');
  s = sub(s, OLD_RENDER_TAIL,  NEW_RENDER_TAIL,  'recount after re-render');
  s = sub(s, `>${f.from}</span>`, `>${f.to}</span>`, `version ${f.from} -> ${f.to}`);

  // Nothing may still reference the retired helper or attribute.
  ['cmsIsBigIsland', 'CMS_BIG_ISLAND', 'data-bi=', 'cmsAnnSelBigIsland', 'cmsAnnSelUnsent'].forEach(dead => {
    if (s.includes(dead)) fail(`leftover reference to retired '${dead}'`);
  });
  if (!failed) { fs.writeFileSync(f.p, s); ok('written'); }
});

console.log(failed ? '\nFAILED — check output above.' : '\nAll edits applied and asserted.');
process.exit(failed ? 1 : 0);
