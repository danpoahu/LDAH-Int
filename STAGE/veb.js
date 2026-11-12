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

  /* Sponsor logo library (2026-11-12). The built-in logos live in sponsor-logos/; staff can add
     their own and remove any. Added logos are kept as small PNG data URLs in settings/vebSponsor_*
     (Storage would taint the flyer canvas: its CORS only allows ldahawaii.org). Removed built-ins
     are listed in settings/vebSponsors.hidden so they can be brought back. Super Admin only, as
     the settings rules already require. */
  var CUSTOM = [], HIDDEN = [], libLoaded = false;
  async function loadLib() {
    try {
      var snap = await db().collection('settings').get(); CUSTOM = []; HIDDEN = [];
      snap.forEach(function (d) { var x = d.data() || {};
        if (d.id === 'vebSponsors') HIDDEN = (x.hidden || []).slice();
        else if (d.id.indexOf('vebSponsor_') === 0 && x.name && x.dataUrl) CUSTOM.push({ id: d.id, name: x.name, url: x.dataUrl, dark: !!x.dark, custom: true }); });
      CUSTOM.sort(function (a, b) { return a.name.localeCompare(b.name); });
    } catch (e) { console.warn('[VEB] logo library', e); }
    libLoaded = true;
  }
  function sponsorList() {
    return (F().SPONSORS || []).filter(function (x) { return HIDDEN.indexOf(x.name) < 0; })
      .map(function (x) { return { name: x.name, url: 'sponsor-logos/' + x.file, dark: x.dark }; }).concat(CUSTOM);
  }
  // What past flyers carried: Learning Labs = IDEAs that Work (plus the virtual meeting icon);
  // Parent Talk Café = IDEAs that Work, Aloha United Way and Pacific Island Partners.
  function defaultSponsors(series) { return isPtc(series) ? ['IDEAs that Work', 'Aloha United Way', 'Pacific Island Partners'] : ['IDEAs that Work']; }
  // The "virtual meeting" laptop icon past flyers put next to the QR code (the Hawaiʻi flyer's Zoom badge).
  var VIRTUAL_ICON = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 92"><rect x="14" y="3" width="92" height="66" rx="7" fill="#111"/>'
    + [[20, 9], [62, 9], [20, 38], [62, 38]].map(function (c) { var x = c[0], y = c[1];
      return '<rect x="' + x + '" y="' + y + '" width="38" height="25" rx="3" fill="none" stroke="#fff" stroke-width="2.6"/><circle cx="' + (x + 19) + '" cy="' + (y + 9) + '" r="4.2" fill="none" stroke="#fff" stroke-width="2.4"/>'
        + '<path d="M' + (x + 11) + ' ' + (y + 22) + 'q8-10 16 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>'; }).join('')
    + '<path d="M4 73h112l-7 15H11z" fill="#111"/><rect x="48" y="77" width="24" height="3" rx="1.5" fill="#fff"/></svg>');

  function toast(m, c) { if (typeof window._showToast === 'function') window._showToast(m, c || '#0F766E'); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); }
  function addDays(s, n) { var p = s.split('-').map(Number); var d = new Date(p[0], p[1]-1, p[2] + n); return ymd(d); }
  function wednesdays(y, m) { var out = []; for (var d = 1; d <= 31; d++) { var x = new Date(y, m-1, d); if (x.getMonth() !== m-1) break; if (x.getDay() === 3) out.push(ymd(x)); } return out; }
  // Learning Labs has three looks to pick from: A = monthly scenes, B = Bold Modern, C = Island Papercut.
  var TEMPLATES = [['A', 'Monthly scenes'], ['B', 'Bold Modern'], ['C', 'Island Papercut']];
  // Parent Talk Café has its own three: A = ptc monthly, B = themes['PB'+m], C = themes['PC'+m].
  function theme(series, m, tpl) {
    // Random (2026-11-12): twenty designs not tied to a month, keyed R1..R20.
    if (isRandom(series)) return F().themes[/^R\d+$/.test(tpl || '') ? tpl : 'R1'];
    if (tpl === 'B' || tpl === 'C') return F().themes[(isPtc(series) ? 'P' : '') + tpl + m];
    return F().themeFor ? F().themeFor(series, m) : F().themes[m];
  }
  function isPtc(series) { return series === 'Parent Talk Café'; }
  function isRandom(series) { return series === 'Random'; }
  function randomTemplates() { var out = [], n = F().RANDOM_COUNT || 0; for (var i = 1; i <= n; i++) if (F().themes['R' + i]) out.push(['R' + i, F().themes['R' + i].name.split(':')[0]]); return out; }
  // An in-person Random event has no Partner flyer (that one exists to show each island's Zoom time).
  function inPerson() { return S && isRandom(S.series) && S.mode === 'inperson'; }
  function variants() { return inPerson() ? VARIANTS.filter(function (v) { return v.key.indexOf('partner') < 0; }) : VARIANTS; }
  // Month and year of a Random event come from its first session.
  function sessMonth() { var d = (S.sessions.map(function (s) { return s.date; }).filter(Boolean).sort()[0] || ''); var p = d.split('-').map(Number); return p.length === 3 ? { m: p[1], y: p[0] } : { m: S.month, y: S.year }; }
  // PTC is usually one session on the 3rd Wednesday; Learning Labs the 2nd and 4th.
  function defaultDates(series, y, m) { var w = wednesdays(y, m); return isPtc(series) || isRandom(series) ? [isRandom(series) ? w[1] : w[2]] : [w[1], w[3] || w[2]]; }
  function isSuper() { return ((window.currentUserData || {}).role) === 'superAdmin'; }
  function fresh() {
    var now = new Date(), m = now.getMonth() + 2, y = now.getFullYear(); if (m > 12) { m -= 12; y++; }
    if (!theme('Learning Labs', m, 'A')) { m = 1; y = now.getFullYear() + 1; }
    var w = wednesdays(y, m);
    return { id: null, active: false, series: 'Learning Labs', template: 'A', month: m, year: y, presenter: '', showPresenter: false, callouts: (F().CALLOUT_PRESETS || []).slice(), customCallouts: ['', ''], grant: '', sponsors: ['IDEAs that Work'], partnerPages: true, autoDates: true,
      title: '', tagline: '', mode: 'zoom', place: '', address: '',
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
      f.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="' + F().fontsHref + '">' + (F().extraFonts || []).map(function (h) { return '<link rel="stylesheet" href="' + h + '">'; }).join('')
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
    fontCss = Promise.all([F().fontsHref].concat(F().extraFonts || []).map(function (h) { return fetch(h).then(function (r) { return r.text(); }); })).then(function (all) { var css = all.join('\n');
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
    var t = theme(spec.series, spec.month, spec.template);
    box.innerHTML = t ? t.fn(spec, variant.indexOf('partner') === 0, /Sq$/.test(variant)) : F().build(spec, variant);
    await doc.fonts.ready;
    await Promise.all([].map.call(box.querySelectorAll('img'), function (im) { return im.complete ? Promise.resolve() : new Promise(function (r) { im.onload = im.onerror = r; }); }));
    await new Promise(function (r) { setTimeout(r, 120); });
    var node = box.firstElementChild, placed = F().decorate ? F().decorate(doc, node, spec.deco || {}) : [];
    var issues = qaCheck(doc, node);
    if (spec.deco && spec.deco.presenter && placed.indexOf(spec.deco.presenter) < 0) issues.push('No room for the Guest speaker box on this one');
    var url = await w.htmlToImage.toJpeg(node, { quality: 0.92, pixelRatio: 1, width: size.w, height: size.h, cacheBust: true, backgroundColor: '#ffffff', fontEmbedCSS: await getFontCss() });
    return { url: url, issues: issues };
  }

  /* ---------- form ---------- */
  function readForm() {
    var $ = function (id) { return document.getElementById(id); };
    S.series = $('vebSeries').value;
    if ($('vebMonth')) { S.month = +$('vebMonth').value; S.year = +$('vebYear').value; }
    if ($('vebTitle')) { S.title = $('vebTitle').value.trim(); S.tagline = $('vebTagline').value.trim();
      S.mode = ($('vebModeIn') && $('vebModeIn').checked) ? 'inperson' : 'zoom';
      S.place = $('vebPlace') ? $('vebPlace').value.trim() : S.place; S.address = $('vebAddress') ? $('vebAddress').value.trim() : S.address; }
    S.presenter = $('vebPresenter').value.trim(); S.grant = $('vebGrant').value.trim();
    S.showPresenter = !!($('vebShowPresenter') && $('vebShowPresenter').checked);
    S.callouts = [].map.call(document.querySelectorAll('.veb-callout:checked'), function (c) { return c.value; });
    S.customCallouts = [].map.call(document.querySelectorAll('.veb-callout-own'), function (c) { return c.value.trim(); });
    S.partnerPages = $('vebPartner') ? $('vebPartner').checked && !inPerson() : false;
    S.sponsors = [].map.call(document.querySelectorAll('.veb-sponsor:checked'), function (c) { return c.value; });
    S.sessions = [].map.call(document.querySelectorAll('.veb-sess'), function (row) {
      var q = function (c) { return row.querySelector(c).value.trim(); };
      return { date: q('.vs-date'), start: q('.vs-start'), end: q('.vs-end'), lesson: q('.vs-lesson'), desc: row.querySelector('.vs-desc') ? q('.vs-desc') : '' };
    });
    if (isRandom(S.series)) { var sm = sessMonth(); S.month = sm.m; S.year = sm.y; }
  }
  function problems() {
    var p = [], rnd = isRandom(S.series);
    if (rnd && !S.title) p.push('Type the event name.');
    if (rnd && S.mode === 'inperson' && !S.place) p.push('Type where the event is (place and address).');
    if (rnd && !theme(S.series, S.month, S.template)) p.push('Pick a design.');
    else if (!theme(S.series, S.month, S.template)) p.push('There is no ' + S.series + ' flyer design for ' + MONTHS[S.month-1] + ' yet.');
    if (!S.sessions.length) p.push('Add at least one session.');
    S.sessions.forEach(function (s, i) {
      if (!s.date || !s.start || !s.end || (!s.lesson && !rnd)) p.push('Session ' + (i+1) + ' needs a date, start, end' + (rnd ? '.' : ' and lesson.'));
      else if (s.end <= s.start) p.push('Session ' + (i+1) + ' ends before it starts.');
    });
    return p;
  }
  function spec() {
    // Parent Talk Café designs print the presenter themselves; Learning Labs gets a Guest speaker box.
    var own = (S.customCallouts || []).filter(Boolean), pool = (F().calloutPick ? F().calloutPick(S.callouts || [], (S.id || '') + S.series + S.month + S.year, 9) : []);
    var deco = { presenter: S.showPresenter && !isPtc(S.series) ? S.presenter : '', callouts: own.concat(pool).slice(0, Math.max(2, own.length)), seed: (S.id || '') + S.series + S.month + S.year };
    var logos = {}; (F().SPONSORS || []).forEach(function (x) { logos[x.name] = { url: new URL('sponsor-logos/' + x.file, location.href).href, dark: x.dark }; });
    CUSTOM.forEach(function (x) { logos[x.name] = { url: x.url, dark: x.dark }; });
    logos.Zoom = { url: VIRTUAL_ICON, dark: false };
    if (isRandom(S.series)) deco.seed = (S.id || '') + S.title;
    return { title: S.title, tagline: S.tagline, mode: S.mode || 'zoom', place: S.place, address: S.address,
      deco: deco, sponsorLogos: logos, series: S.series, template: S.template, month: S.month, year: S.year, sponsors: S.sponsors, sessions: S.sessions, presenter: S.showPresenter ? S.presenter : '',
      logoUrl: 'https://www.ldahawaii.org/logo_blue.png', pipUrl: 'https://www.ldahawaii.org/assets/images/wp/Pacific-Island-Partners-Logo.png',
      qrHst: window._cmsQRPngForUrl('https://www.ldahawaii.org/events.html?eventId=' + S.id + '&autoOpen=1&src=flyer-qr'),
      qrPartner: window._cmsQRPngForUrl('https://www.ldahawaii.org/events.html?eventId=' + S.id + '&autoOpen=1&src=flyer-partner') };
  }
  function markDirty() { dirty = true; var b = document.getElementById('vebFlyerNote'); if (b && Object.keys(images).length) b.textContent = 'You changed the form. Make the flyers again before saving.'; }
  function onMonthChange() {
    readForm();
    var t = theme(S.series, S.month, S.template);
    document.getElementById('vebTheme').textContent = t ? t.name : 'No design for this month yet';
    if (S.autoDates) {
      var dd = defaultDates(S.series, S.year, S.month);
      document.querySelectorAll('.veb-sess .vs-date').forEach(function (inp, i) { inp.value = dd[i] || dd[dd.length - 1] || ''; });
      readForm();
    }
    tzTable(); drawPicker(); markDirty();
  }
  /* ---------- design picker: the Hawaiʻi letter flyer in each of the three designs, click to choose ---------- */
  var pickTimer = null;
  function drawPicker() {
    var box = document.getElementById('vebPick'); if (!box || !S) return;
    var rnd = isRandom(S.series);
    var opts = rnd ? randomTemplates() : TEMPLATES.filter(function (t) { return theme(S.series, S.month, t[0]); });
    if (rnd && !/^R\d+$/.test(S.template || '')) S.template = 'R1';
    if (!rnd && opts.length && !theme(S.series, S.month, S.template)) S.template = 'A';
    var ss = S.sessions.filter(function (s) { return s.date && s.start && s.end && s.end > s.start; });
    if (!ss.length) ss = defaultDates(S.series, S.year, S.month).map(function (d) { return { date: d, start: '17:00', end: '18:00' }; });
    var sp = spec();
    sp.sessions = ss.map(function (s, i) { return { date: s.date, start: s.start, end: s.end, lesson: s.lesson || (rnd ? '' : 'Your lesson ' + (i + 1)), desc: s.desc || '' }; });
    if (rnd && !sp.title) sp.title = 'Your event name';
    var cells = opts.map(function (t) {
      var th = theme(S.series, S.month, t[0]), on = S.template === t[0], html = '';
      try { html = th.fn(sp, false, false); } catch (e) { html = '<div style="padding:20px">Preview not available</div>'; }
      return '<div class="c' + (on ? ' on' : '') + '" data-t="' + t[0] + '" title="' + esc(th.name) + '"><div class="f">' + html + '</div><div class="n">' + (on ? '&#10003; ' : '') + t[1] + '</div></div>';
    }).join('');
    var doc = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="' + F().fontsHref + '">'
      + (F().extraFonts || []).map(function (h) { return '<link rel="stylesheet" href="' + h + '">'; }).join('')
      + '<style>html,body{margin:0;background:transparent;font-family:-apple-system,Segoe UI,sans-serif}' + F().css
      + '.g{display:grid;grid-template-columns:repeat(' + (rnd ? 2 : Math.max(opts.length, 1)) + ',minmax(0,1fr));gap:' + (rnd ? 10 : 8) + 'px;align-items:start}'
      + '.c{cursor:pointer;border:3px solid transparent;border-radius:9px;padding:3px;transition:border-color .15s}.c:hover{border-color:#94a3b8}.c.on{border-color:#0F766E;background:#ecfdf5}'
      + '.c>.f{pointer-events:none;border-radius:4px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.18)}.c>.n{font-size:12px;font-weight:700;text-align:center;color:#0f172a;margin:5px 0 2px}.c.on>.n{color:#0F766E}</style></head>'
      + '<body><div class="g">' + cells + '</div><script>document.addEventListener("click",function(e){var c=e.target.closest("[data-t]");if(c&&parent.VEB)parent.VEB.pickDesign(c.getAttribute("data-t"));});'
      + 'function fit(){var f=parent.document.getElementById("vebPickFrame");if(f)f.style.height=document.body.scrollHeight+"px";}window.addEventListener("load",fit);if(document.fonts)document.fonts.ready.then(fit);setTimeout(fit,50);<\/script></body></html>';
    var fr = document.getElementById('vebPickFrame');
    if (!fr) { fr = document.createElement('iframe'); fr.id = 'vebPickFrame'; fr.setAttribute('title', 'Flyer designs'); fr.style.cssText = 'width:100%;border:0;display:block;height:240px'; box.innerHTML = ''; box.appendChild(fr); }
    // Show the guest speaker and callout boxes in the previews too, placed the same way as on the real flyer.
    fr.onload = function () { var d = fr.contentDocument; (d.fonts ? d.fonts.ready : Promise.resolve()).then(function () { setTimeout(function () {
      if (F().decorate) [].forEach.call(d.querySelectorAll('.c>.f'), function (f) { if (f.firstElementChild) F().decorate(d, f.firstElementChild, sp.deco || {}); }); }, 60); }); };
    fr.srcdoc = doc;
    var t = theme(S.series, S.month, S.template), n = document.getElementById('vebTheme'); if (n) n.textContent = t ? t.name : (rnd ? '' : 'No design for this month yet');
  }
  function tzTable() {
    var el = document.getElementById('vebTz'); if (!el) return;
    if (inPerson()) { el.innerHTML = '<p class="veb-muted">In person, so there is no Partner flyer or island time table.</p>'; return; }
    var ok = S.sessions.filter(function (s) { return s.date && s.start && s.end && s.end > s.start; });
    if (!ok.length) { el.innerHTML = '<p class="veb-muted">Enter a date and times to see each island\'s local time.</p>'; return; }
    el.innerHTML = '<table class="veb-tz"><tr><th>Where</th><th>Local day and time</th></tr>' + F().zoneRows(ok).map(function (r) {
      return '<tr' + (r.home ? ' class="home"' : '') + '><td>' + r.label + '</td><td>' + r.days + ' · ' + r.time + '</td></tr>'; }).join('') + '</table>'
      + '<p class="veb-muted">None of these places use daylight saving time, so these offsets hold all year.</p>';
  }
  function sessRow(s, i) {
    if (isRandom(S.series)) return '<div class="veb-sess" data-i="' + i + '"><div class="veb-sess-h">Session ' + (i+1) + (i > 0 ? ' <a href="javascript:void(0)" onclick="VEB.removeSession(' + i + ')">Remove</a>' : '') + '</div>'
      + '<div class="veb-row3"><label>Date (HST) *<input type="date" class="vs-date" value="' + esc(s.date) + '" onchange="VEB.datesTouched()"></label>'
      + '<label>Start (HST) *<input type="time" class="vs-start" value="' + esc(s.start) + '" onchange="VEB.changed()"></label>'
      + '<label>End (HST) *<input type="time" class="vs-end" value="' + esc(s.end) + '" onchange="VEB.changed()"></label></div>'
      + '<label>What happens at this session<input class="vs-lesson" maxlength="40" value="' + esc(s.lesson) + '" oninput="VEB.changed()" placeholder="For example: Crafts and games"></label></div>';
    return '<div class="veb-sess" data-i="' + i + '"><div class="veb-sess-h">Session ' + (i+1) + (i > 0 ? ' <a href="javascript:void(0)" onclick="VEB.removeSession(' + i + ')">Remove</a>' : '') + '</div>'
      + '<div class="veb-row3"><label>Date (HST) *<input type="date" class="vs-date" value="' + esc(s.date) + '" onchange="VEB.datesTouched()"></label>'
      + '<label>Start (HST) *<input type="time" class="vs-start" value="' + esc(s.start) + '" onchange="VEB.changed()"></label>'
      + '<label>End (HST) *<input type="time" class="vs-end" value="' + esc(s.end) + '" onchange="VEB.changed()"></label></div>'
      + '<label>Lesson *<input class="vs-lesson" list="vebLessons" maxlength="48" value="' + esc(s.lesson) + '" oninput="VEB.changed()" placeholder="Pick last year\'s lesson or type a new one"></label>'
      + '<label>One short line for the flyer<input class="vs-desc" maxlength="40" value="' + esc(s.desc) + '" oninput="VEB.changed()" placeholder="For example: Know the laws"></label></div>';
  }
  function render() {
    var body = document.getElementById('vebBody'); if (!body) return;
    var rnd = isRandom(S.series);
    var mOpts = MONTHS.map(function (m, i) { var has = !!theme(S.series, i+1, 'A'); return '<option value="' + (i+1) + '"' + (S.month === i+1 ? ' selected' : '') + (has ? '' : ' disabled') + '>' + m + (has ? '' : ' (no design yet)') + '</option>'; }).join('');
    // Every sponsor / funder / partner seen on LDAH flyers, with its logo art. Up to three fit on a flyer.
    var spons = sponsorList().map(function (x, i) { var on = S.sponsors.indexOf(x.name) >= 0;
      return '<label class="veb-logo' + (on ? ' on' : '') + '" title="' + esc(x.name) + '"><input type="checkbox" class="veb-sponsor" value="' + esc(x.name) + '"' + (on ? ' checked' : '') + ' onchange="VEB.sponsorTicked(this)">'
        + '<button type="button" class="veb-logo-x" title="Remove this logo from the list" aria-label="Remove ' + esc(x.name) + '" onclick="VEB.removeLogo(event,' + i + ')">&times;</button>'
        + '<span class="veb-logo-art' + (x.dark ? ' dk' : '') + '"><img src="' + esc(x.url) + '" alt="" loading="lazy"></span><span class="veb-logo-n">' + esc(x.name) + (x.custom ? ' <i>(added)</i>' : '') + '</span></label>'; }).join('')
      + '<button type="button" class="veb-logo veb-logo-add" onclick="VEB.addLogoOpen()"><span class="veb-logo-art">+</span><span class="veb-logo-n">Add a logo</span></button>';
    var logoForm = '<div id="vebLogoForm" class="veb-logo-form" hidden><b>Add a sponsor logo</b>'
      + '<div class="veb-row3"><label>Name *<input id="vebLogoName" maxlength="60" placeholder="For example: Hawaiʻi Community Foundation"></label>'
      + '<label>Logo file *<input id="vebLogoFile" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"></label>'
      + '<label style="align-self:end"><span style="display:flex;gap:6px;align-items:center;font-weight:400"><input type="checkbox" id="vebLogoDark" style="width:auto"> White logo (needs a dark background)</span></label></div>'
      + '<div style="display:flex;gap:8px;align-items:center;margin-top:8px"><button type="button" class="btn btn-primary" onclick="VEB.addLogoSave()">Add logo</button><button type="button" class="btn btn-ghost" onclick="document.getElementById(\'vebLogoForm\').hidden=true">Cancel</button><span id="vebLogoMsg" class="veb-muted"></span></div></div>'
      + (HIDDEN.length ? '<div class="veb-muted" style="margin-top:6px">' + HIDDEN.length + ' built-in logo' + (HIDDEN.length === 1 ? ' is' : 's are') + ' removed from the list. <a href="javascript:void(0)" onclick="VEB.restoreLogos()">Bring them back</a></div>' : '');
    body.innerHTML =
      '<div class="veb-wrap' + (rnd ? ' veb-rnd' : '') + '"><div class="veb-form">'
      + (S.id ? '<div class="veb-editing">Editing: ' + esc(S.title || 'saved event') + ' <span class="veb-pill ' + (S.active ? 'live' : '') + '">' + (S.active ? 'On the website' : 'Hidden draft') + '</span> <a href="javascript:void(0)" onclick="VEB.newEvent()">Start a new event</a></div>' : '')
      + '<div class="veb-row3"><label>Series *<select id="vebSeries" onchange="VEB.seriesChanged()"><option' + (S.series === 'Learning Labs' ? ' selected' : '') + '>Learning Labs</option><option' + (S.series === 'Parent Talk Café' ? ' selected' : '') + '>Parent Talk Café</option><option' + (rnd ? ' selected' : '') + '>Random</option></select></label>'
      + (rnd ? '<label style="grid-column:span 2">Event name *<input id="vebTitle" maxlength="48" value="' + esc(S.title) + '" oninput="VEB.changed()" placeholder="For example: Holiday Family Night"></label></div>'
          + '<label>One short line under the name<input id="vebTagline" maxlength="70" value="' + esc(S.tagline) + '" oninput="VEB.changed()" placeholder="For example: Games, crafts and a visit from Santa"></label>'
          + '<div class="veb-lbl">Where</div><div style="margin:0 0 10px"><label class="veb-chk"><input type="radio" name="vebMode" id="vebModeZoom"' + (S.mode !== 'inperson' ? ' checked' : '') + ' onchange="VEB.modeChanged()"> On Zoom</label>'
          + '<label class="veb-chk"><input type="radio" name="vebMode" id="vebModeIn"' + (S.mode === 'inperson' ? ' checked' : '') + ' onchange="VEB.modeChanged()"> In person</label></div>'
          + (S.mode === 'inperson' ? '<div class="veb-row2"><label>Place *<input id="vebPlace" maxlength="48" value="' + esc(S.place) + '" oninput="VEB.changed()" placeholder="For example: Kukui Center, Room 205"></label>'
            + '<label>Address<input id="vebAddress" maxlength="60" value="' + esc(S.address) + '" oninput="VEB.changed()" placeholder="For example: 245 N. Kukui St., Honolulu"></label></div>' : '')
          + '<div class="veb-theme">Design: <b id="vebTheme">' + esc((theme(S.series, S.month, S.template) || {}).name || '') + '</b> <span class="veb-muted">(pick one on the right)</span></div>'
        : '<label>Month *<select id="vebMonth" onchange="VEB.monthChanged()">' + mOpts + '</select></label>'
          + '<label>Year *<input type="number" id="vebYear" min="2026" max="2035" value="' + S.year + '" onchange="VEB.monthChanged()"></label></div>'
          + '<div class="veb-theme">Flyer theme: <b id="vebTheme">' + esc((theme(S.series, S.month, S.template) || {}).name || 'No design for this month yet') + '</b></div>')
      + '<div id="vebSessions">' + S.sessions.map(sessRow).join('') + '</div>'
      + (S.sessions.length < 2 ? '<button class="btn btn-ghost veb-small" onclick="VEB.addSession()">Add a session</button>' : '')
      + (rnd ? '' : '<datalist id="vebLessons">' + LESSONS.map(function (l) { return '<option value="' + esc(l) + '">'; }).join('') + '</datalist>')
      + '<div class="veb-row2"><label>Presenter<input id="vebPresenter" value="' + esc(S.presenter) + '" oninput="VEB.changed()"></label>'
      + '<label>Grant / Program<input id="vebGrant" value="' + esc(S.grant) + '" oninput="VEB.changed()" placeholder="For example: HI-PTI"></label></div>'
      + '<label class="veb-chk" style="margin:-2px 0 10px"><input type="checkbox" id="vebShowPresenter"' + (S.showPresenter ? ' checked' : '') + ' onchange="VEB.changed()"> Show the presenter on the flyer (guest speaker)</label>'
      + '<div class="veb-lbl">Callout boxes <span class="veb-muted" style="font-weight:400">(two are picked at random and shown where the flyer has room)</span></div><div>'
      + (F().CALLOUT_PRESETS || []).map(function (c) { return '<label class="veb-chk"><input type="checkbox" class="veb-callout" value="' + esc(c) + '"' + ((S.callouts || []).indexOf(c) >= 0 ? ' checked' : '') + ' onchange="VEB.changed()"> ' + esc(c) + '</label>'; }).join('') + '</div>'
      + '<div class="veb-row2" style="margin-top:6px">' + [0, 1].map(function (i) { return '<label>Your own callout ' + (i + 1) + '<input class="veb-callout-own" maxlength="32" value="' + esc((S.customCallouts || [])[i] || '') + '" oninput="VEB.changed()" placeholder="For example: Spanish interpreter available"></label>'; }).join('') + '</div>'
      + '<div class="veb-lbl">Sponsor logos on the flyer <span class="veb-muted" style="font-weight:400">(tick up to 3)</span></div><div class="veb-logos">' + spons + '</div>' + logoForm
      + (inPerson() ? '' : '<label class="veb-chk" style="margin-top:8px"><input type="checkbox" id="vebPartner"' + (S.partnerPages ? ' checked' : '') + ' onchange="VEB.changed()"> Also list it on the six partner island pages</label>')
      + '<div class="veb-btns"><button class="btn" onclick="VEB.makeFlyers()">Make flyers</button>'
      + '<button class="btn btn-ghost" onclick="VEB.save(false)">Save as hidden draft</button>'
      + (S.id && S.active ? '<button class="btn btn-ghost" onclick="VEB.unpublish()">Hide from website</button>' : '<button class="btn btn-ghost veb-pub" onclick="VEB.save(true)">Publish to website…</button>') + '</div>'
      + '<p class="veb-muted">Saving keeps the event hidden from ldahawaii.org. Publish puts it on the website straight away.</p>'
      + '</div><div class="veb-side"><div class="veb-lbl">Pick a design <span class="veb-muted" style="font-weight:400">(' + (rnd ? randomTemplates().length + ', ' : '') + 'click one)</span></div><div id="vebPick" class="veb-pick' + (rnd ? ' veb-pick-rnd' : '') + '"></div><div class="veb-lbl" style="margin-top:14px">Each island\'s local time</div><div id="vebTz"></div></div></div>'
      + '<div class="veb-lbl" style="margin-top:18px">Flyers</div><p id="vebFlyerNote" class="veb-muted">Click Make flyers to draw all four.</p><div id="vebFlyers" class="veb-flyers"></div>'
      + '<div class="veb-lbl" style="margin-top:22px">Events made with the builder</div><div id="vebList" class="veb-muted">Loading…</div>';
    readForm(); tzTable(); drawPicker(); loadList();
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
      var vs = variants(); VARIANTS.forEach(function (v) { if (vs.indexOf(v) < 0) delete images[v.key]; });
      for (var i = 0; i < vs.length; i++) {
        var r = await renderOne(sp, vs[i].key); images[vs[i].key] = r.url; issues[vs[i].key] = r.issues; total += r.issues.length;
      }
    } catch (e) { if (note) note.textContent = ''; toast('Could not draw the flyers: ' + (e.message || e), '#DC2626'); return false; }
    dirty = false;
    if (note) note.textContent = total ? 'Some text may be crowded. Shorten the lesson or the short line and make the flyers again.' : (variants().length === 4 ? 'All four flyers passed the layout check.' : 'Both flyers passed the layout check.');
    showFlyers(issues);
    return true;
  }
  function eventPayload(urls) {
    var ss = S.sessions.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var first = ss[0], last = ss[ss.length - 1], month = MONTHS[S.month-1];
    var signupDates = ss.map(function (s) { return longDate(s.date) + ', ' + t12(s.start) + ' - ' + t12(s.end) + (s.lesson ? ' - ' + s.lesson : ''); });
    var rnd = isRandom(S.series), ip = inPerson();
    var desc = rnd ? (S.tagline ? S.tagline + '\n' : '') + ss.map(function (s) {
      var d = longDate(s.date); return '• ' + d.replace(/, \d{4}$/, '') + ', ' + t12(s.start) + '–' + t12(s.end) + ' HST' + (s.lesson ? ': ' + s.lesson : ''); }).join('\n')
      + '\n' + (ip ? 'Where: ' + S.place + (S.address ? ', ' + S.address : '') : 'On Zoom.') + (S.presenter ? '\nPresented by ' + S.presenter + '.' : '')
      : (ss.length > 1 ? ss.length + ' sessions' : 'A session') + (isPtc(S.series) ? ', recorded and posted on Facebook @ Parent Talk Café, for parents and families:\n' : ' on Zoom for parents and families:\n') + ss.map(function (s) {
      var d = longDate(s.date); return '• ' + d.replace(/, \d{4}$/, '') + ', ' + t12(s.start) + '–' + t12(s.end) + ' HST: ' + s.lesson + (s.desc ? '. ' + s.desc : ''); }).join('\n')
      + (S.presenter ? '\nPresented by ' + S.presenter + '.' : '');
    var pl = {
      title: isRandom(S.series) ? S.title : S.series + ' — ' + month + ' ' + S.year, description: desc,
      zoomMode: S.series === 'Parent Talk Café' ? 'parent_talk_cafe' : 'event',
      eventType: S.series === 'Parent Talk Café' ? 'parent_talk_cafe' : 'learning_labs',
      location: isPtc(S.series) ? 'Virtual (Facebook: Parent Talk Café)' : inPerson() ? S.place + (S.address ? ', ' + S.address : '') : 'Virtual (Zoom)', eventDate: first.date, time: t12(first.start) + ' - ' + t12(first.end) + ' HST',
      startDate: ymd(new Date()), moveToPastDate: addDays(last.date, 1), removeDate: addDays(last.date, 30),
      signupDates: signupDates, customQuestions: [], showGroupField: false, infoOnly: false, archived: false,
      partnerPages: S.partnerPages && !inPerson() ? PARTNER_PAGES.slice() : [], sponsors: S.sponsors, presenterName: S.presenter,
      builtWith: 'veb',
      vebSpec: { series: S.series, template: S.template || 'A', month: S.month, year: S.year, presenter: S.presenter, showPresenter: !!S.showPresenter, callouts: S.callouts || [], customCallouts: S.customCallouts || [], grant: S.grant, sponsors: S.sponsors, partnerPages: S.partnerPages, sessions: S.sessions,
        title: S.title || '', tagline: S.tagline || '', mode: S.mode || 'zoom', place: S.place || '', address: S.address || '' },
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
    var vs = variants();
    VARIANTS.forEach(function (v) { if (vs.indexOf(v) < 0) urls[v.field] = firebase.firestore.FieldValue.delete(); });
    for (var i = 0; i < vs.length; i++) {
      var v = vs[i], blob = await (await fetch(images[v.key])).blob();
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
    window.showConfirmModal({ title: 'Publish to the website?', subtitle: isRandom(S.series) ? S.title : S.series + ' — ' + MONTHS[S.month-1] + ' ' + S.year,
      body: 'This puts the event and its Hawaiʻi flyer on ldahawaii.org right away, with Register open.',
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
          + '<td><a href="javascript:void(0)" onclick="VEB.edit(\'' + x.id + '\')">Edit</a> · <a href="' + esc(x.imageUrl || '#') + '" target="_blank" rel="noopener">Flyer</a> · <a href="javascript:void(0)" onclick="cmsOpenEventModal(\'' + x.id + '\')">Open in Events &amp; Programs</a> · <a href="javascript:void(0)" style="color:#B91C1C" onclick="VEB.del(\'' + x.id + '\')">Delete</a></td></tr>';
      }).join('') + '</table>';
    } catch (e) { el.textContent = 'Could not load the list: ' + e.message; }
  }
  /* Delete an event made with the builder (2026-11-12). Refused while anyone
     is signed up: hide it instead, so no family loses their registration.
     Its OPEN auto-tasks go with it (closing them would fire the task chain,
     e.g. an Assign Presenter closed with no name re-opens itself); finished
     tasks stay as history. */
  async function del(id) {
    try {
      var ref = db().collection('events').doc(id), snap = await ref.get();
      if (!snap.exists) { toast('That event no longer exists.', '#DC2626'); return loadList(); }
      var x = snap.data();
      var sus = await ref.collection('signups').get();
      var live = sus.docs.filter(function (d) { var v = d.data() || {}; return v.status !== 'cancelled' && v.archived !== true; }).length;
      if (sus.size) {
        toast((live || sus.size) + ' sign-up' + ((live || sus.size) === 1 ? '' : 's') + ' on this event, so it can’t be deleted. Use Save as hidden draft to take it off the website.', '#DC2626');
        return;
      }
      var tq = await db().collection('interactions').where('workflowEventId', '==', id).get();
      var openTasks = tq.docs.filter(function (d) { return (d.data() || {}).status !== 'Closed'; });
      var go = async function () {
        var b = db().batch();
        openTasks.forEach(function (d) { b.delete(d.ref); });
        b.delete(ref);
        await b.commit();
        if (typeof window.auditLog === 'function') window.auditLog('Deleted virtual event', (x.title || '') + ' [' + id + '], ' + openTasks.length + ' open task(s) removed');
        if (S && S.id === id) { S = fresh(); images = {}; dirty = true; render(); } else loadList();
        toast('Deleted.', '#16A34A');
      };
      var body = '<b>' + esc(x.title || 'This event') + '</b>' + (x.active === false ? ' (hidden draft)' : ' <b style="color:#B91C1C">is on the website now</b>') + '.<br><br>'
        + 'This removes the event and its flyers' + (openTasks.length ? ', and its ' + openTasks.length + ' open task' + (openTasks.length === 1 ? '' : 's') + ' from staff to-do lists' : '') + '. Nobody has signed up.<br><br>It can’t be undone.';
      if (typeof window.showConfirmModal !== 'function') { if (window.confirm('Delete ' + (x.title || 'this event') + '? It can’t be undone.')) await go(); return; }
      window.showConfirmModal({ title: 'Delete this event?', subtitle: x.title || '', body: body, confirmLabel: 'Delete event', cancelLabel: 'Keep it', confirmStyle: 'danger', onConfirm: go });
    } catch (e) { toast('Could not delete it: ' + (e.message || e), '#DC2626'); }
  }
  async function edit(id) {
    try {
      var snap = await db().collection('events').doc(id).get(); if (!snap.exists) return toast('That event no longer exists.', '#DC2626');
      var x = snap.data(), v = x.vebSpec || {};
      S = { id: id, active: x.active !== false, title: x.title, series: v.series || 'Learning Labs', template: v.template || 'A', month: v.month || 1, year: v.year || 2027, presenter: v.presenter || '', showPresenter: v.showPresenter != null ? !!v.showPresenter : isPtc(v.series) && !!v.presenter,
        callouts: v.callouts || [], customCallouts: v.customCallouts || ['', ''], grant: v.grant || '',
        sponsors: v.sponsors || ['IDEAs that Work'], partnerPages: v.partnerPages !== false, autoDates: false,
        title: v.title || '', tagline: v.tagline || '', mode: v.mode || 'zoom', place: v.place || '', address: v.address || '', sessions: (v.sessions || []).map(function (s) { return Object.assign({}, s); }) };
      images = {}; VARIANTS.forEach(function (vv) { if (x[vv.field]) images[vv.key] = x[vv.field]; }); dirty = true;
      render(); var n = document.getElementById('vebFlyerNote'); if (n) n.textContent = 'These are the saved flyers. Make the flyers again after any change.';
      window.scrollTo(0, 0);
    } catch (e) { toast('Could not open it: ' + e.message, '#DC2626'); }
  }

  var CSS = '.veb-pick-rnd{max-height:calc(100vh - 260px);min-height:320px;overflow:auto;padding-right:4px}'
    + '.veb-logos{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px;max-height:330px;overflow:auto;padding:2px}.veb-logo{display:flex!important;flex-direction:column;align-items:center;gap:4px;margin:0!important;padding:6px;border:2px solid #e2e8f0;border-radius:9px;cursor:pointer;background:#fff;position:relative}.veb-logo:hover{border-color:#94a3b8}.veb-logo.on{border-color:#0F766E;background:#ecfdf5}.veb-logo input{position:absolute;top:5px;left:5px;margin:0}.veb-logo-art{height:46px;width:100%;display:flex;align-items:center;justify-content:center;border-radius:5px}.veb-logo-art.dk{background:#1d2430}.veb-logo-art img{max-height:42px;max-width:92px;object-fit:contain}.veb-logo-n{font-size:.7rem;font-weight:600;color:#334155;text-align:center;line-height:1.15}.veb-logo-n i{font-weight:400;color:#64748b}.veb-logo-x{position:absolute;top:2px;right:3px;width:20px;height:20px;border:0;border-radius:50%;background:transparent;color:#94a3b8;font-size:15px;line-height:1;cursor:pointer;padding:0;opacity:0;transition:opacity .15s}.veb-logo:hover .veb-logo-x,.veb-logo-x:focus{opacity:1}.veb-logo-x:hover{background:#fee2e2;color:#b91c1c}.veb-logo-add{border-style:dashed;font:inherit;color:#0f766e}.veb-logo-add .veb-logo-art{font-size:28px;font-weight:300;color:#0f766e}.veb-logo-form{margin-top:10px;padding:10px 12px;border:1px solid #99f6e4;background:#f0fdfa;border-radius:9px}'
    + '#vebBody{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;max-width:1240px;box-shadow:0 2px 10px rgba(15,23,42,.06)}.veb-wrap{display:flex;flex-wrap:wrap;gap:22px;align-items:flex-start}.veb-form{flex:1 1 520px;max-width:720px}.veb-side{flex:1 1 300px;max-width:440px;position:sticky;top:70px}'
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
      if (!libLoaded) loadLib().then(function () { if (document.getElementById('vebBody')) { if (S) readForm(); render(); } });
    },
    addLogoOpen: function () { var f = document.getElementById('vebLogoForm'); if (!f) return; f.hidden = false; var n = document.getElementById('vebLogoName'); if (n) n.focus(); },
    addLogoSave: async function () {
      var name = (document.getElementById('vebLogoName').value || '').trim(), file = (document.getElementById('vebLogoFile').files || [])[0];
      var dark = document.getElementById('vebLogoDark').checked, msg = document.getElementById('vebLogoMsg');
      var say = function (t) { if (msg) msg.textContent = t; };
      if (!name) return say('Give the logo a name.');
      if (sponsorList().some(function (x) { return x.name.toLowerCase() === name.toLowerCase(); }) || name === 'Zoom') return say('There is already a logo called that.');
      if (!file) return say('Pick the logo file.');
      if (file.size > 8 * 1024 * 1024) return say('That file is over 8 MB. Pick a smaller one.');
      say('Adding…');
      try {
        var src = URL.createObjectURL(file);
        var img = await new Promise(function (ok, no) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { no(new Error('That file could not be read as an image.')); }; i.src = src; });
        // Fit inside 720 x 240 (logos print about 3 cm tall), keep transparency.
        var w = img.naturalWidth || 600, h = img.naturalHeight || 200, k = Math.min(1, 720 / w, 240 / h);
        var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(w * k)); c.height = Math.max(1, Math.round(h * k));
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(src);
        var data = c.toDataURL('image/png');
        if (data.length > 900000) data = c.toDataURL('image/webp', 0.9);
        if (data.length > 900000) return say('That logo is too detailed to store. Try a smaller or simpler file.');
        var id = 'vebSponsor_' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) + '_' + Date.now().toString(36);
        var who = (window.currentUserData && (window.currentUserData.displayName || window.currentUserData.email)) || '';
        await db().collection('settings').doc(id).set({ name: name, dataUrl: data, dark: dark, createdAt: firebase.firestore.FieldValue.serverTimestamp(), createdBy: who });
        if (typeof window.auditLog === 'function') window.auditLog('Added sponsor logo', name);
        readForm(); await loadLib(); render(); toast('Added ' + name + '. Tick it to put it on the flyer.', '#16A34A');
      } catch (e) { say('Could not add it: ' + (e.message || e)); }
    },
    removeLogo: function (ev, i) {
      if (ev) { ev.preventDefault(); ev.stopPropagation(); }
      var x = sponsorList()[i]; if (!x) return;
      var go = async function () {
        if (x.custom) await db().collection('settings').doc(x.id).delete();
        else await db().collection('settings').doc('vebSponsors').set({ hidden: firebase.firestore.FieldValue.arrayUnion(x.name) }, { merge: true });
        if (typeof window.auditLog === 'function') window.auditLog('Removed sponsor logo', x.name);
        readForm(); S.sponsors = S.sponsors.filter(function (n) { return n !== x.name; });
        await loadLib(); render(); markDirty(); toast('Removed ' + x.name + '.', '#16A34A');
      };
      var body = 'Remove <b>' + esc(x.name) + '</b> from the logo list?<br><br>Flyers already made keep it.' + (x.custom ? ' To use it again you would add the file again.' : ' You can bring it back with “Bring them back” under the list.');
      if (typeof window.showConfirmModal !== 'function') { go(); return; }
      window.showConfirmModal({ title: 'Remove this logo?', subtitle: x.name, body: body, confirmLabel: 'Remove logo', cancelLabel: 'Keep it', confirmStyle: 'danger', onConfirm: go });
    },
    restoreLogos: async function () {
      try { await db().collection('settings').doc('vebSponsors').set({ hidden: [] }, { merge: true }); readForm(); await loadLib(); render(); toast('The removed logos are back.', '#16A34A'); }
      catch (e) { toast('Could not bring them back: ' + e.message, '#DC2626'); }
    },
    sponsorTicked: function (cb) {
      var n = document.querySelectorAll('.veb-sponsor:checked').length;
      if (cb.checked && n > 3) { cb.checked = false; toast('Up to 3 logos fit on a flyer. Untick one first.', '#B45309'); return; }
      cb.closest('.veb-logo').classList.toggle('on', cb.checked); VEB.changed();
    },
    changed: function () { readForm(); tzTable(); markDirty(); clearTimeout(pickTimer); pickTimer = setTimeout(drawPicker, 700); },
    datesTouched: function () { S.autoDates = false; VEB.changed(); },
    monthChanged: onMonthChange,
    // A different design can leave the chosen month without a flyer; render() greys those months out.
    // The buttons above the flyers: switch design and redraw straight away.
    pickDesign: function (t) { readForm(); if (S.template === t) return; S.template = t; var had = Object.keys(images).length; render(); markDirty(); if (had) makeFlyers(); },
    // Switching series swaps the design set and, while dates are untouched, the default sessions.
    modeChanged: function () { readForm(); render(); markDirty(); },
    seriesChanged: function () {
      var prevSeries = S.series; readForm(); S.showPresenter = isPtc(S.series);
      if (isRandom(S.series) && !/^R\d+$/.test(S.template || '')) S.template = 'R1';
      if (!isRandom(S.series) && /^R\d+$/.test(S.template || '')) S.template = 'A';
      if (isRandom(prevSeries) && !isRandom(S.series)) { var now = new Date(), m = now.getMonth() + 2, y = now.getFullYear(); if (m > 12) { m -= 12; y++; } S.month = m; S.year = y; }
      var wasDefault = S.sponsors.slice().sort().join('|') === defaultSponsors(prevSeries).slice().sort().join('|');
      if (wasDefault) S.sponsors = defaultSponsors(S.series).slice();
      if (S.autoDates) { var dd = defaultDates(S.series, S.year, S.month);
        S.sessions = dd.map(function (d, i) { var o = S.sessions[i] || { start: '17:00', end: '18:00', lesson: '', desc: '' }; return { date: d, start: o.start, end: o.end, lesson: isRandom(S.series) !== isRandom(prevSeries) ? '' : o.lesson, desc: o.desc }; }); }
      render(); markDirty();
    },
    addSession: function () { readForm(); var w = wednesdays(S.year, S.month); if (isRandom(S.series) && S.sessions[0] && S.sessions[0].date) w = [addDays(S.sessions[0].date, 7), addDays(S.sessions[0].date, 7), addDays(S.sessions[0].date, 7), addDays(S.sessions[0].date, 7)]; S.sessions.push({ date: w[3] || w[2] || '', start: '17:00', end: '18:00', lesson: '', desc: '' }); render(); markDirty(); },
    removeSession: function (i) { readForm(); S.sessions.splice(i, 1); render(); markDirty(); },
    makeFlyers: makeFlyers, save: save, unpublish: unpublish, edit: edit, del: del,
    newEvent: function () { S = fresh(); images = {}; dirty = true; render(); }
  };
})();
