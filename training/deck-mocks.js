// Shared LDAH screen mocks for training decks.
// Load AFTER deck-base.css and BEFORE deck-engine.js:
//   <script src="deck-mocks.js"></script>
//   <script> const DECK_ID='...'; const SC=[...]; </script>
//   <script src="deck-engine.js"></script>
// Builders are called lazily from a scene's html():()=>, so load order only needs
// to put them in scope before deck-engine.js calls render(0).
//
// Sample people are deliberately fake — the repo is public and this HTML is served.

// Collapse inter-tag whitespace so a formatted template emits the same markup
// as a hand-written one-liner (flex containers would ignore it anyway).
const T = h => h.replace(/>\s+</g, '><').trim();

const LDAH_PPL = [
  ['Kalani Example',  'kalani@example.com'],
  ['Mele Sample',     'mele.sample@example.com'],
  ['Noa Testperson',  'noa@example.org'],
];

// [dateLabel, [indexes into LDAH_PPL]]
const LDAH_SESS = [
  ['Thursday, 2026-10-01 — 11:00 AM - 1:00 PM @ Oahu', []],
  ['Monday, 2026-10-05 — 3:00 PM - 5:00 PM @ All Islands Virtual', [0, 1]],
  ['Thursday, 2026-10-08 — 11:00 AM - 1:00 PM @ Oahu', []],
  ['Monday, 2026-10-12 — 3:00 PM - 5:00 PM @ All Islands Virtual', [2]],
];

// One session block. mode: 'normal' (date checkbox cancels) | 'attendance' (per-person boxes)
function ldahSession(dateLabel, peopleIdx, i, mode, people) {
  const att = mode === 'attendance';
  const rows = peopleIdx.length
    ? peopleIdx.map(k => `<div class="pr p${k}">${att ? '<span class="acb"></span>' : ''}<b>${people[k][0]}</b><small>${people[k][1]}</small><span class="cf">Confirmed</span></div>`).join('')
    : '<div class="none">No signups for this date</div>';
  return T(`<div class="ss s${i}">
 <div class="sh">${att ? '' : '<span class="dcb"></span>'}<div><b>${dateLabel}</b><small>${peopleIdx.length} signup${peopleIdx.length === 1 ? '' : 's'}</small></div>${att ? '<span class="map">Mark All Present</span>' : ''}</div>
 ${rows}</div>`);
}

// The Signups modal. Header buttons match the live screen, left to right.
function ldahSignupsModal(o) {
  o = o || {};
  const title    = o.title    || 'Connect-Gen';
  const mode     = o.mode     || 'normal';
  const sessions = o.sessions || LDAH_SESS;
  const people   = o.people   || LDAH_PPL;
  const att = mode === 'attendance';
  const head = att
    ? '<div class="amb"><b>Attendance Mode</b><span class="sa">Save Attendance</span><span class="cn">Cancel</span></div>'
    : `<div class="hint2">${o.hint || 'Check the box next to a date to cancel that session.'}</div>`;
  return T(`<div class="mod"><div class="mh">
 <span class="mt2">Signups: ${title}</span>
 <span class="hb">Export CSV</span><span class="hb">Session Sheet</span><span class="hb ta">Take Attendance</span><span class="hb es">Event Summary</span>
 <span class="xx">×</span></div>
 <div class="mb">${head}${sessions.map(([d, p], i) => ldahSession(d, p, i, mode, people)).join('')}</div></div>`);
}

// Events & Programs card grid — the way into an event's signups.
function ldahEventCards(cards) {
  cards = cards || [
    ['Connect-Gen', 'linear-gradient(135deg,#C2410C,#FB923C)'],
    ['Diploma vs. Certificate', 'linear-gradient(135deg,#1D4ED8,#F59E0B)'],
    ['Parenting, Patience, & Disability Study', 'linear-gradient(135deg,#166534,#4ADE80)'],
  ];
  return T(`<div class="evg">${cards.map(([t, g], i) =>
    `<div class="evc c${i}"><div class="img" style="background:${g}"></div><b>${t}</b>
 <div class="lk"><span>Edit</span><span class="vs">View Signups</span><span>Archive</span></div></div>`).join('')}</div>`);
}

// ---------------------------------------------------------------------------
// The signups window as the LIVE screen draws it (index.html:9328-9366).
// Differs from ldahSignupsModal() above, which mirrors taking-attendance.html:
// the real header shows the event title alone (no "Signups:" prefix) with an
// info bubble, buttons run Take Attendance / Session Sheet / Export CSV /
// Summary, and the date bands are navy #004E7C, not green.
// ---------------------------------------------------------------------------

// state: 'upcoming' | 'past' | 'cancelled'
// badge: 'ok' Confirmed | 'cons' Awaiting Consent | 'pend' Pending Registration | 'su' Signed Up
const LDAH_BADGE = { ok: 'Confirmed', cons: 'Awaiting Consent', pend: 'Pending Registration', su: 'Signed Up' };

function ldahSignupRow(name, email, badge, opts) {
  opts = opts || {};
  return T(`<div class="sr ${opts.cls || ''}">
 <span class="cv">▶</span><b>${name}</b><small>${email}</small>
 <span class="sbg ${badge}">${LDAH_BADGE[badge]}</span>
 <span class="srs">${opts.status || 'Confirmed'}</span><span class="dots3">…</span></div>`);
}

function ldahSessionBlock(o) {
  const state = o.state || 'upcoming';
  const n = (o.rows || []).length;
  const cls = state === 'past' ? ' past' : state === 'cancelled' ? ' canc' : '';
  const cbl = state === 'cancelled' ? 'Restore' : 'Cancel';
  return T(`<div class="sb${cls} ${o.cls || ''}">
 <div class="sbh">${o.noBox ? '' : `<span class="cbx"></span><span class="cbl">${cbl}</span>`}
  <span class="lbl"><b>${o.label}</b><small>${n} signup${n === 1 ? '' : 's'}</small></span>
  ${state === 'past' ? '<span class="pastp">PAST</span>' : ''}</div>
 ${n ? o.rows.join('') : '<div class="snone">No signups for this date</div>'}</div>`);
}

// The whole window. summary: 4 [value,label] pairs for the strip.
function ldahSignupsWindow(o) {
  o = o || {};
  const title = o.title || 'Connect-Gen';
  const sub   = o.sub   || 'Ongoing program · 2 schedules';
  const strip = o.summary || [['12', 'Families'], ['3', 'Awaiting worksheet'], ['9', 'Ready'], ['Oct 5', 'Next session']];
  const banner = o.banner === null ? ''
    : `<div class="sban">${o.banner || 'Check the box next to a date to cancel that session. Uncheck to restore it.'}</div>`;
  return T(`<div class="smod"><div class="smh">
 <div class="tw"><div class="tt">${title}<span class="ib">i</span></div><div class="sub">${sub}</div></div>
 <div class="bt2"><span class="sbtn pri ta">Take Attendance</span><span class="sbtn ss2">Session Sheet</span><span class="sbtn csv">Export CSV</span><span class="sbtn sum">Summary</span><span class="smx">×</span></div></div>
 <div class="strip">${strip.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div>
 <div class="smb">${banner}${(o.blocks || []).join('')}</div></div>`);
}
