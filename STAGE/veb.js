/* Virtual Event Builder (DAN, Super Admin only).
   Dan types a virtual event once in HST. The builder makes four flyers (Hawaiʻi + Partner,
   letter + square), saves them to Storage and writes one normal signup event. Saved events
   stay hidden from the website (active:false) until Publish, because STAGE and live share
   one Firestore. Depends on veb-flyers.js (window.VEBFlyers) and DAN globals: firebase,
   _cmsQRPngForUrl, _showToast, showConfirmModal, auditLog, _grantWrite. */
(function () {
  'use strict';
  var F = function () { return window.VEBFlyers; };
  var db = function () { return firebase.firestore(); };
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var PARTNER_PAGES = ['American Samoa','Guam','CNMI','Micronesia','Marshall Islands','Palau'];
  var VARIANTS = [
    { key: 'hst', label: 'Hawaiʻi flyer (letter)', field: 'imageUrl', size: 'letter' },
    { key: 'partner', label: 'Partner flyer (letter)', field: 'partnerFlyerUrl', size: 'letter' },
    { key: 'hstSq', label: 'Hawaiʻi square (Facebook / Instagram)', field: 'flyerSquareUrl', size: 'square' },
    { key: 'partnerSq', label: 'Partner square (Facebook / Instagram)', field: 'partnerFlyerSquareUrl', size: 'square' }
  ];
  var LESSONS = ['IDEA/Chapter 60','Understanding Evaluations','Developing the IEP','IDEA/Section 504','Navigating Transitions',
    'Beyond the Wiggles: Understanding ADHD','A-B-C\'s of Advocacy','Parents as Collaborative Leaders','Stand Up Against Bullying',
    'DOH to DOE','Organizing Your Records'];
  var S = null;          // working state
  var images = {};       // variant -> dataURL (current flyers)
  var dirty = true;      // form changed since flyers were made

  function toast(m, c) { if (typeof window._showToast === 'function') window._showToast(m, c || '#0F766E'); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); }
  function addDays(s, n) { var p = s.split('-').map(Number); var d = new Date(p[0], p[1]-1, p[2] + n); return ymd(d); }
  function wednesdays(y, m) { var out = []; for (var d = 1; d <= 31; d++) { var x = new Date(y, m-1, d); if (x.getMonth() !== m-1) break; if (x.getDay() === 3) out.push(ymd(x)); } return out; }
  function theme(series, m) { return F().themeFor ? F().themeFor(series, m) : F().themes[m]; }
  function isPtc(series) { return series === 'Parent Talk Café'; }
  // PTC is usually one session on the 3rd Wednesday; Learning Labs the 2nd and 4th.
  function defaultDates(series, y, m) { var w = wednesdays(y, m); return isPtc(series) ? [w[2]] : [w[1], w[3] || w[2]]; }
  function isSuper() { return ((window.currentUserData || {}).role) === 'superAdmin'; }
  function fresh() {
    var now = new Date(), m = now.getMonth() + 2, y = now.getFullYear(); if (m > 12) { m -= 12; y++; }
    if (!theme('Learning Labs', m)) { m = 1; y = now.getFullYear() + 1; }
    var w = wednesdays(y, m);
    return { id: null, active: false, series: 'Learning Labs', month: m, year: y, presenter: '', grant: '', sponsors: ['IDEAs that Work'], partnerPages: true, autoDates: true,
      sessions: [{ date: w[1], start: '17:00', end: '18:00', lesson: '', desc: '' }, { date: w[3] || w[2], start: '17:00', end: '18:00', lesson: '', desc: '' }] };
  }
  function t12(hhmm) { var p = hhmm.split(':').map(Number), ap = p[0] >= 12 ? 'PM' : 'AM'; return ((p[0] % 12) || 12) + ':' + pad(p[1]) + ' ' + ap; }
  function longDate(s) { var p = s.split('-').map(Number); return MONTHS[p[1]-1] + ' ' + p[2] + ', ' + p[0]; }

  /* ---------- renderer: an off-screen iframe with the flyer CSS, fonts and html-to-image ---------- */
  var renderer = null;
  function getRenderer() {
    if (renderer) return renderer;
    renderer = new Promise(function (resolve, reject) {
      var f = document.createElement('iframe');
      f.setAttribute('aria-hidden', 'true');
      f.style.cssText = 'position:fixed;left:-30000px;top:0;width:1300px;height:1700px;border:0;';
      f.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="' + F().fontsHref + '">'
        + '<style>html,body{margin:0;background:#fff}' + F().css + '</style>'
        + '<script src="https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.js"><\/script></head><body><div id="r"></div></body></html>';
      f.onload = function () {
        var w = f.contentWindow, tries = 0;
        (function wait() { if (w.htmlToImage) return resolve(f); if (++tries > 100) return reject(new Error('The flyer image tool did not load.')); setTimeout(wait, 100); })();
      };
      document.body.appendChild(f);
    });
    return renderer;
  }
  // Finds text that is cut off, collides with other text, or is hidden under another element.
  function qaCheck(doc, root) {
    var out = [], R = root.getBoundingClientRect();
    function rects(el) { var rs = [], w = doc.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      while (w.nextNode()) { var n = w.currentNode; if (!n.textContent.trim() || n.parentElement.closest('svg')) continue;
        var r = doc.createRange(); r.selectNodeContents(n); [].forEach.call(r.getClientRects(), function (x) { if (x.width > 1 && x.height > 1) rs.push({ r: x, t: n.textContent.trim().slice(0, 30), n: n }); }); }
      return rs; }
    function ov(a, b, m) { return Math.min(a.right, b.right) - Math.max(a.left, b.left) > m && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > m; }
    function ink(r) { var k = r.height * 0.2; return { left: r.left, right: r.right, top: r.top + k, bottom: r.bottom - k }; }
    rects(root).forEach(function (x) {
      var r = x.r;
      if (r.left < R.left + 2 || r.right > R.right - 2 || r.top < R.top + 2 || r.bottom > R.bottom - 2) out.push('Cut off: "' + x.t + '"');
      var bad = 0; [[.5, .5], [.15, .5], [.85, .5]].forEach(function (p) { var e = doc.elementFromPoint(r.left + r.width * p[0], r.top + r.height * p[1]); var own = x.n.parentElement; if (e && !(own === e || own.contains(e) || e.contains(own))) bad++; });
      if (bad >= 2) out.push('Hidden: "' + x.t + '"');
    });
    var comps = [].slice.call(root.children).filter(function (c) { return c.tagName.toLowerCase() !== 'svg' && c.textContent.trim(); });
    for (var i = 0; i < comps.length; i++) for (var j = i + 1; j < comps.length; j++) {
      var A = rects(comps[i]), B = rects(comps[j]), hit = null;
      A.forEach(function (a) { B.forEach(function (b) { if (!hit && ov(ink(a.r), ink(b.r), 1)) hit = '"' + a.t + '" overlaps "' + b.t + '"'; }); });
      if (hit) out.push(hit);
    }
    return out.filter(function (v, k, a) { return a.indexOf(v) === k; });
  }
  // html-to-image cannot read the cross-origin Google Fonts stylesheet, so build the
  // @font-face rules ourselves with the font files inlined (latin subset only).
  var fontCss = null;
  function getFontCss() {
    if (fontCss) return fontCss;
    fontCss = fetch(F().fontsHref).then(function (r) { return r.text(); }).then(function (css) {
      var blocks = css.split(/(?=\/\* [a-z-]+ \*\/)/).filter(function (b) { return /^\/\* latin \*\//.test(b); });
      return Promise.all(blocks.map(function (b) {
        var m = b.match(/url\((https:[^)]+)\)/); if (!m) return b;
        return fetch(m[1]).then(function (r) { return r.blob(); }).then(function (bl) { return new Promise(function (res) {
          var fr = new FileReader(); fr.onload = function () { res(b.replace(m[1], fr.result)); }; fr.readAsDataURL(bl); }); });
      })).then(function (parts) { return parts.join('\n'); });
    }).catch(function (e) { fontCss = null; throw e; });
    return fontCss;
  }
  async function renderOne(spec, variant) {
    var f = await getRenderer(), doc = f.contentDocument, w = f.contentWindow;
    var size = F().sizes[/Sq$/.test(variant) ? 'square' : 'letter'];
    var box = doc.getElementById('r');
    box.style.width = size.w + 'px';
    box.innerHTML = F().build(spec, variant);
    await doc.fonts.ready;
    await Promise.all([].map.call(box.querySelectorAll('img'), function (im) { return im.complete ? Promise.resolve() : new Promise(function (r) { im.onload = im.onerror = r; }); }));
    await new Promise(function (r) { setTimeout(r, 120); });
    var node = box.firstElementChild;
    var issues = qaCheck(doc, node);
    var url = await w.htmlToImage.toJpeg(node, { quality: 0.92, pixelRatio: 1, width: size.w, height: size.h, cacheBust: true, backgroundColor: '#ffffff', fontEmbedCSS: await getFontCss() });
    return { url: url, issues: issues };
  }

  /* ---------- form ---------- */
  function readForm() {
    var $ = function (id) { return document.getElementById(id); };
    S.series = $('vebSeries').value; S.month = +$('vebMonth').value; S.year = +$('vebYear').value;
    S.presenter = $('vebPresenter').value.trim(); S.grant = $('vebGrant').value.trim();
    S.partnerPages = $('vebPartner').checked;
    S.sponsors = [].map.call(document.querySelectorAll('.veb-sponsor:checked'), function (c) { return c.value; });
    S.sessions = [].map.call(document.querySelectorAll('.veb-sess'), function (row) {
      var q = function (c) { return row.querySelector(c).value.trim(); };
      return { date: q('.vs-date'), start: q('.vs-start'), end: q('.vs-end'), lesson: q('.vs-lesson'), desc: q('.vs-desc') };
    });
  }
  function problems() {
    var p = [];
    if (!theme(S.series, S.month)) p.push('There is no ' + S.series + ' flyer design for ' + MONTHS[S.month-1] + ' yet.');
    if (!S.sessions.length) p.push('Add at least one session.');
    S.sessions.forEach(function (s, i) {
      if (!s.date || !s.start || !s.end || !s.lesson) p.push('Session ' + (i+1) + ' needs a date, start, end and lesson.');
      else if (s.end <= s.start) p.push('Session ' + (i+1) + ' ends before it starts.');
    });
    return p;
  }
  function spec() {
    return { series: S.series, month: S.month, year: S.year, sponsors: S.sponsors, sessions: S.sessions, presenter: S.presenter,
      logoUrl: 'https://www.ldahawaii.org/logo_blue.png', pipUrl: 'https://www.ldahawaii.org/assets/images/wp/Pacific-Island-Partners-Logo.png',
      qrHst: window._cmsQRPngForUrl('https://www.ldahawaii.org/events.html?eventId=' + S.id + '&autoOpen=1&src=flyer-qr'),
      qrPartner: window._cmsQRPngForUrl('https://www.ldahawaii.org/events.html?eventId=' + S.id + '&autoOpen=1&src=flyer-partner') };
  }
  function markDirty() { dirty = true; var b = document.getElementById('vebFlyerNote'); if (b && Object.keys(images).length) b.textContent = 'You changed the form. Make the flyers again before saving.'; }
  function onMonthChange() {
    readForm();
    var t = theme(S.series, S.month);
    document.getElementById('vebTheme').textContent = t ? t.name : 'No design for this month yet';
    if (S.autoDates) {
      var dd = defaultDates(S.series, S.year, S.month);
      document.querySelectorAll('.veb-sess .vs-date').forEach(function (inp, i) { inp.value = dd[i] || dd[dd.length - 1] || ''; });
      readForm();
    }
    tzTable(); markDirty();
  }
  function tzTable() {
    var el = document.getElementById('vebTz'); if (!el) return;
    var ok = S.sessions.filter(function (s) { return s.date && s.start && s.end && s.end > s.start; });
    if (!ok.length) { el.innerHTML = '<p class="veb-muted">Enter a date and times to see each island\'s local time.</p>'; return; }
    el.innerHTML = '<table class="veb-tz"><tr><th>Where</th><th>Local day and time</th></tr>' + F().zoneRows(ok).map(function (r) {
      return '<tr' + (r.home ? ' class="home"' : '') + '><td>' + r.label + '</td><td>' + r.days + ' · ' + r.time + '</td></tr>'; }).join('') + '</table>'
      + '<p class="veb-muted">None of these places use daylight saving time, so these offsets hold all year.</p>';
  }
  function sessRow(s, i) {
    return '<div class="veb-sess" data-i="' + i + '"><div class="veb-sess-h">Session ' + (i+1) + (i > 0 ? ' <a href="javascript:void(0)" onclick="VEB.removeSession(' + i + ')">Remove</a>' : '') + '</div>'
      + '<div class="veb-row3"><label>Date (HST) *<input type="date" class="vs-date" value="' + esc(s.date) + '" onchange="VEB.datesTouched()"></label>'
      + '<label>Start (HST) *<input type="time" class="vs-start" value="' + esc(s.start) + '" onchange="VEB.changed()"></label>'
      + '<label>End (HST) *<input type="time" class="vs-end" value="' + esc(s.end) + '" onchange="VEB.changed()"></label></div>'
      + '<label>Lesson *<input class="vs-lesson" list="vebLessons" maxlength="48" value="' + esc(s.lesson) + '" oninput="VEB.changed()" placeholder="Pick last year\'s lesson or type a new one"></label>'
      + '<label>One short line for the flyer<input class="vs-desc" maxlength="40" value="' + esc(s.desc) + '" oninput="VEB.changed()" placeholder="For example: Know the laws"></label></div>';
  }
  function render() {
    var body = document.getElementById('vebBody'); if (!body) return;
    var mOpts = MONTHS.map(function (m, i) { var has = !!theme(S.series, i+1); return '<option value="' + (i+1) + '"' + (S.month === i+1 ? ' selected' : '') + (has ? '' : ' disabled') + '>' + m + (has ? '' : ' (no design yet)') + '</option>'; }).join('');
    var spons = ['IDEAs that Work', 'Ke Ola Mamo'].map(function (x) { return '<label class="veb-chk"><input type="checkbox" class="veb-sponsor" value="' + esc(x) + '"' + (S.sponsors.indexOf(x) >= 0 ? ' checked' : '') + ' onchange="VEB.changed()"> ' + esc(x) + '</label>'; }).join('');
    body.innerHTML =
      '<div class="veb-wrap"><div class="veb-form">'
      + (S.id ? '<div class="veb-editing">Editing: ' + esc(S.title || 'saved event') + ' <span class="veb-pill ' + (S.active ? 'live' : '') + '">' + (S.active ? 'On the website' : 'Hidden draft') + '</span> <a href="javascript:void(0)" onclick="VEB.newEvent()">Start a new event</a></div>' : '')
      + '<div class="veb-row3"><label>Series *<select id="vebSeries" onchange="VEB.seriesChanged()"><option' + (S.series === 'Learning Labs' ? ' selected' : '') + '>Learning Labs</option><option' + (S.series === 'Parent Talk Café' ? ' selected' : '') + '>Parent Talk Café</option></select></label>'
      + '<label>Month *<select id="vebMonth" onchange="VEB.monthChanged()">' + mOpts + '</select></label>'
      + '<label>Year *<input type="number" id="vebYear" min="2026" max="2035" value="' + S.year + '" onchange="VEB.monthChanged()"></label></div>'
      + '<div class="veb-theme">Flyer theme: <b id="vebTheme">' + esc((theme(S.series, S.month) || {}).name || 'No design for this month yet') + '</b></div>'
      + '<div id="vebSessions">' + S.sessions.map(sessRow).join('') + '</div>'
      + (S.sessions.length < 2 ? '<button class="btn btn-ghost veb-small" onclick="VEB.addSession()">Add a session</button>' : '')
      + '<datalist id="vebLessons">' + LESSONS.map(function (l) { return '<option value="' + esc(l) + '">'; }).join('') + '</datalist>'
      + '<div class="veb-row2"><label>Presenter<input id="vebPresenter" value="' + esc(S.presenter) + '" oninput="VEB.changed()"></label>'
      + '<label>Grant / Program<input id="vebGrant" value="' + esc(S.grant) + '" oninput="VEB.changed()" placeholder="For example: HI-PTI"></label></div>'
      + '<div class="veb-lbl">Sponsor logos on the flyer</div><div>' + spons + '</div>'
      + '<label class="veb-chk" style="margin-top:8px"><input type="checkbox" id="vebPartner"' + (S.partnerPages ? ' checked' : '') + ' onchange="VEB.changed()"> Also list it on the six partner island pages</label>'
      + '<div class="veb-btns"><button class="btn" onclick="VEB.makeFlyers()">Make flyers</button>'
      + '<button class="btn btn-ghost" onclick="VEB.save(false)">Save as hidden draft</button>'
      + (S.id && S.active ? '<button class="btn btn-ghost" onclick="VEB.unpublish()">Hide from website</button>' : '<button class="btn btn-ghost veb-pub" onclick="VEB.save(true)">Publish to website…</button>') + '</div>'
      + '<p class="veb-muted">Saving keeps the event hidden from ldahawaii.org. Publish puts it on the live website straight away, because STAGE and live share one database.</p>'
      + '</div><div class="veb-side"><div class="veb-lbl">Each island\'s local time</div><div id="vebTz"></div></div></div>'
      + '<div class="veb-lbl" style="margin-top:18px">Flyers</div><p id="vebFlyerNote" class="veb-muted">Click Make flyers to draw all four.</p><div id="vebFlyers" class="veb-flyers"></div>'
      + '<div class="veb-lbl" style="margin-top:22px">Events made with the builder</div><div id="vebList" class="veb-muted">Loading…</div>';
    readForm(); tzTable(); loadList();
    if (Object.keys(images).length) showFlyers(null);
  }
  function showFlyers(issuesByVariant) {
    var el = document.getElementById('vebFlyers'); if (!el) return;
    el.innerHTML = VARIANTS.map(function (v) {
      var u = images[v.key]; if (!u) return '';
      var iss = issuesByVariant && issuesByVariant[v.key] || [];
      return '<div class="veb-fl"><div class="veb-fl-h">' + v.label + '</div><img src="' + u + '" alt="' + esc(v.label) + '">'
        + (iss.length ? '<div class="veb-warn">Check the layout: ' + iss.slice(0, 3).map(esc).join('; ') + (iss.length > 3 ? ' (+' + (iss.length - 3) + ' more)' : '') + '</div>' : '<div class="veb-ok">Layout check passed</div>')
        + '<a class="veb-dl" download="' + esc(v.key) + '.jpg" href="' + u + '">Download</a></div>';
    }).join('');
  }

  /* ---------- actions ---------- */
  async function makeFlyers() {
    readForm(); var p = problems(); if (p.length) { toast(p[0], '#B45309'); return false; }
    if (!S.id) S.id = db().collection('events').doc().id;   // QR codes need the event id up front
    var note = document.getElementById('vebFlyerNote'); if (note) note.textContent = 'Drawing the flyers…';
    var sp = spec(), issues = {}, total = 0;
    try {
      for (var i = 0; i < VARIANTS.length; i++) {
        var r = await renderOne(sp, VARIANTS[i].key); images[VARIANTS[i].key] = r.url; issues[VARIANTS[i].key] = r.issues; total += r.issues.length;
      }
    } catch (e) { if (note) note.textContent = ''; toast('Could not draw the flyers: ' + (e.message || e), '#DC2626'); return false; }
    dirty = false;
    if (note) note.textContent = total ? 'Some text may be crowded. Shorten the lesson or the short line and make the flyers again.' : 'All four flyers passed the layout check.';
    showFlyers(issues);
    return true;
  }
  function eventPayload(urls) {
    var ss = S.sessions.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var first = ss[0], last = ss[ss.length - 1], month = MONTHS[S.month-1];
    var signupDates = ss.map(function (s) { return longDate(s.date) + ', ' + t12(s.start) + ' - ' + t12(s.end) + ' - ' + s.lesson; });
    var desc = (ss.length > 1 ? ss.length + ' sessions' : 'A session') + (isPtc(S.series) ? ', recorded and posted on Facebook @ Parent Talk Café, for parents and families:\n' : ' on Zoom for parents and families:\n') + ss.map(function (s) {
      var d = longDate(s.date); return '• ' + d.replace(/, \d{4}$/, '') + ', ' + t12(s.start) + '–' + t12(s.end) + ' HST: ' + s.lesson + (s.desc ? '. ' + s.desc : ''); }).join('\n')
      + (S.presenter ? '\nPresented by ' + S.presenter + '.' : '');
    var pl = {
      title: S.series + ' — ' + month + ' ' + S.year, description: desc,
      zoomMode: S.series === 'Parent Talk Café' ? 'parent_talk_cafe' : 'event',
      eventType: S.series === 'Parent Talk Café' ? 'parent_talk_cafe' : 'learning_labs',
      location: isPtc(S.series) ? 'Virtual (Facebook: Parent Talk Café)' : 'Virtual (Zoom)', eventDate: first.date, time: t12(first.start) + ' - ' + t12(first.end) + ' HST',
      startDate: ymd(new Date()), moveToPastDate: addDays(last.date, 1), removeDate: addDays(last.date, 30),
      signupDates: signupDates, customQuestions: [], showGroupField: false, infoOnly: false, archived: false,
      partnerPages: S.partnerPages ? PARTNER_PAGES.slice() : [], sponsors: S.sponsors, presenterName: S.presenter,
      builtWith: 'veb',
      vebSpec: { series: S.series, month: S.month, year: S.year, presenter: S.presenter, grant: S.grant, sponsors: S.sponsors, partnerPages: S.partnerPages, sessions: S.sessions },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    Object.keys(urls).forEach(function (k) { pl[k] = urls[k]; });
    if (typeof window._buildSessionsForOneTimeEvent === 'function') { pl.sessions = window._buildSessionsForOneTimeEvent(pl); pl.sessionsBuiltAt = firebase.firestore.FieldValue.serverTimestamp(); }
    else if (typeof _buildSessionsForOneTimeEvent === 'function') { pl.sessions = _buildSessionsForOneTimeEvent(pl); pl.sessionsBuiltAt = firebase.firestore.FieldValue.serverTimestamp(); }
    if (S.grant && typeof window._grantWrite === 'function') { var g = window._grantWrite(S.grant); pl.grantPrograms = g.grantPrograms; pl.grantProgram = g.grantProgram; }
    return pl;
  }
  async function uploadFlyers() {
    var urls = {}, st = firebase.storage(), stamp = Date.now();
    for (var i = 0; i < VARIANTS.length; i++) {
      var v = VARIANTS[i], blob = await (await fetch(images[v.key])).blob();
      var ref = st.ref('event-images/virtual/' + S.id + '/' + stamp + '_' + v.key + '.jpg');
      await ref.put(blob, { contentType: 'image/jpeg' });
      urls[v.field] = await ref.getDownloadURL();
    }
    return urls;
  }
  async function doSave(publish) {
    if (!isSuper()) { toast('The Virtual Event Builder is limited to Super Admin.', '#B45309'); return; }
    readForm(); var p = problems(); if (p.length) { toast(p[0], '#B45309'); return; }
    if (dirty || !images.hst) { if (!(await makeFlyers())) return; }
    var note = document.getElementById('vebFlyerNote'); if (note) note.textContent = 'Saving the flyers and the event…';
    try {
      var urls = await uploadFlyers(), pl = eventPayload(urls), ref = db().collection('events').doc(S.id), snap = await ref.get();
      pl.active = !!publish;
      if (publish) pl.publishedAt = firebase.firestore.FieldValue.serverTimestamp();
      if (!snap.exists) {
        var u = firebase.auth().currentUser || {};
        pl.createdAt = firebase.firestore.FieldValue.serverTimestamp(); pl.createdByUid = u.uid || ''; pl.createdByName = (window.currentUserData || {}).displayName || u.email || '';
      }
      await ref.set(pl, { merge: true });
      S.active = !!publish; S.title = pl.title;
      if (typeof window.auditLog === 'function') window.auditLog(publish ? 'Published virtual event' : 'Saved virtual event draft', pl.title + ' [' + S.id + ']');
      toast(publish ? 'Published. It is on ldahawaii.org now.' : 'Saved as a hidden draft.', '#16A34A');
      render();
    } catch (e) { if (note) note.textContent = ''; toast('Could not save: ' + (e.message || e), '#DC2626'); }
  }
  function save(publish) {
    if (!publish) return doSave(false);
    if (typeof window.showConfirmModal !== 'function') return doSave(true);
    window.showConfirmModal({ title: 'Publish to the website?', subtitle: S.series + ' — ' + MONTHS[S.month-1] + ' ' + S.year,
      body: 'This puts the event and its Hawaiʻi flyer on ldahawaii.org right away, with Register open. STAGE and live share one database, so this is live even from STAGE.',
      confirmLabel: 'Publish', cancelLabel: 'Cancel', onConfirm: function () { doSave(true); } });
  }
  async function unpublish() {
    if (!S.id) return;
    try { await db().collection('events').doc(S.id).update({ active: false, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
      S.active = false; if (typeof window.auditLog === 'function') window.auditLog('Hid virtual event from website', (S.title || '') + ' [' + S.id + ']');
      toast('Hidden from the website.', '#16A34A'); render();
    } catch (e) { toast('Could not hide it: ' + e.message, '#DC2626'); }
  }
  async function loadList() {
    var el = document.getElementById('vebList'); if (!el) return;
    try {
      var snap = await db().collection('events').where('builtWith', '==', 'veb').get();
      var rows = snap.docs.map(function (d) { var x = d.data(); x.id = d.id; return x; }).sort(function (a, b) { return (b.eventDate || '') < (a.eventDate || '') ? -1 : 1; });
      if (!rows.length) { el.innerHTML = 'None yet.'; return; }
      el.innerHTML = '<table class="veb-list"><tr><th>Event</th><th>First session</th><th>Status</th><th></th></tr>' + rows.map(function (x) {
        return '<tr><td>' + esc(x.title) + '</td><td>' + esc(x.eventDate || '') + '</td><td><span class="veb-pill ' + (x.active === false ? '' : 'live') + '">' + (x.active === false ? 'Hidden draft' : 'On the website') + '</span></td>'
          + '<td><a href="javascript:void(0)" onclick="VEB.edit(\'' + x.id + '\')">Edit</a> · <a href="' + esc(x.imageUrl || '#') + '" target="_blank" rel="noopener">Flyer</a> · <a href="javascript:void(0)" onclick="cmsOpenEventModal(\'' + x.id + '\')">Open in Events &amp; Programs</a></td></tr>';
      }).join('') + '</table>';
    } catch (e) { el.textContent = 'Could not load the list: ' + e.message; }
  }
  async function edit(id) {
    try {
      var snap = await db().collection('events').doc(id).get(); if (!snap.exists) return toast('That event no longer exists.', '#DC2626');
      var x = snap.data(), v = x.vebSpec || {};
      S = { id: id, active: x.active !== false, title: x.title, series: v.series || 'Learning Labs', month: v.month || 1, year: v.year || 2027, presenter: v.presenter || '', grant: v.grant || '',
        sponsors: v.sponsors || ['IDEAs that Work'], partnerPages: v.partnerPages !== false, autoDates: false, sessions: (v.sessions || []).map(function (s) { return Object.assign({}, s); }) };
      images = {}; VARIANTS.forEach(function (vv) { if (x[vv.field]) images[vv.key] = x[vv.field]; }); dirty = true;
      render(); var n = document.getElementById('vebFlyerNote'); if (n) n.textContent = 'These are the saved flyers. Make the flyers again after any change.';
      window.scrollTo(0, 0);
    } catch (e) { toast('Could not open it: ' + e.message, '#DC2626'); }
  }

  var CSS = '#vebBody{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;max-width:1240px;box-shadow:0 2px 10px rgba(15,23,42,.06)}.veb-wrap{display:flex;flex-wrap:wrap;gap:22px;align-items:flex-start}.veb-form{flex:1 1 520px;max-width:720px}.veb-side{flex:1 1 300px;max-width:440px;position:sticky;top:70px}'
    + '.veb-form label{display:block;font-size:.8rem;font-weight:600;color:#334155;margin:0 0 10px}.veb-form input:not([type=checkbox]),.veb-form select{display:block;width:100%;box-sizing:border-box;margin-top:4px;padding:7px 9px;border:1px solid #cbd5e1;border-radius:7px;font:inherit;font-weight:400;font-size:.9rem}'
    + '.veb-row3{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:10px}.veb-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}'
    + '.veb-sess{border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px 2px;margin:0 0 10px;background:#f8fafc}.veb-sess-h{font-weight:700;font-size:.85rem;color:#0f172a;margin-bottom:8px}.veb-sess-h a{font-weight:500;font-size:.78rem;margin-left:8px}'
    + '.veb-theme{font-size:.85rem;color:#475569;margin:-2px 0 12px}.veb-lbl{font-weight:700;font-size:.85rem;color:#0f172a;margin:6px 0 6px}.veb-chk{display:inline-flex!important;align-items:center;gap:6px;margin-right:16px!important;font-weight:500!important}'
    + '.veb-btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}.veb-small{font-size:.8rem;margin:0 0 12px}.veb-muted{font-size:.8rem;color:#64748b;margin:6px 0}'
    + '.veb-tz{width:100%;border-collapse:collapse;font-size:.84rem}.veb-tz td,.veb-tz th{padding:5px 7px;border-bottom:1px solid #e2e8f0;text-align:left}.veb-tz th{color:#64748b;font-size:.75rem}.veb-tz tr.home td{font-weight:700;color:#0f766e}'
    + '.veb-flyers{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}.veb-fl{border:1px solid #e2e8f0;border-radius:10px;padding:8px;background:#fff}.veb-fl img{width:100%;display:block;border-radius:4px}.veb-fl-h{font-weight:600;font-size:.78rem;margin-bottom:6px}'
    + '.veb-ok{font-size:.75rem;color:#15803d;margin-top:6px}.veb-warn{font-size:.75rem;color:#b45309;margin-top:6px}.veb-dl{font-size:.78rem;display:inline-block;margin-top:4px}'
    + '.veb-pill{display:inline-block;font-size:.72rem;font-weight:700;border-radius:20px;padding:2px 9px;background:#e2e8f0;color:#334155}.veb-pill.live{background:#dcfce7;color:#166534}'
    + '.veb-editing{background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;padding:8px 10px;font-size:.84rem;margin-bottom:12px}.veb-editing a{margin-left:8px}'
    + '.veb-list{border-collapse:collapse;font-size:.84rem;width:100%;max-width:980px}.veb-list td,.veb-list th{padding:6px 8px;border-bottom:1px solid #e2e8f0;text-align:left}.veb-list th{font-size:.75rem;color:#64748b}';
  function injectCss() { if (document.getElementById('vebCss')) return; var st = document.createElement('style'); st.id = 'vebCss'; st.textContent = CSS; document.head.appendChild(st); }

  window.VEB = {
    load: function () {
      injectCss();
      var body = document.getElementById('vebBody'); if (!body) return;
      if (!isSuper()) { body.innerHTML = '<p>The Virtual Event Builder is limited to Super Admin.</p>'; return; }
      if (!S) S = fresh();
      render();
    },
    changed: function () { readForm(); tzTable(); markDirty(); },
    datesTouched: function () { S.autoDates = false; VEB.changed(); },
    monthChanged: onMonthChange,
    // Switching series swaps the design set and, while dates are untouched, the default sessions.
    seriesChanged: function () {
      readForm();
      if (S.autoDates) { var dd = defaultDates(S.series, S.year, S.month);
        S.sessions = dd.map(function (d, i) { var o = S.sessions[i] || { start: '17:00', end: '18:00', lesson: '', desc: '' }; return { date: d, start: o.start, end: o.end, lesson: o.lesson, desc: o.desc }; }); }
      render(); markDirty();
    },
    addSession: function () { readForm(); var w = wednesdays(S.year, S.month); S.sessions.push({ date: w[3] || w[2] || '', start: '17:00', end: '18:00', lesson: '', desc: '' }); render(); markDirty(); },
    removeSession: function (i) { readForm(); S.sessions.splice(i, 1); render(); markDirty(); },
    makeFlyers: makeFlyers, save: save, unpublish: unpublish, edit: edit,
    newEvent: function () { S = fresh(); images = {}; dirty = true; render(); }
  };
})();
