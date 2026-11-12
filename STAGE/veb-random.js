/* Virtual Event Builder: the "Random" series (2026-11-12, STAGE).
   Twenty mix-and-match flyer designs that are NOT tied to a month. Staff type the event name
   (spec.title) and one short line (spec.tagline); the event is on Zoom or in person
   (spec.mode 'zoom' | 'inperson', spec.place, spec.address). Designs register as
   VEBFlyers.themes['R1'..'R20'] through registerSet('R', n, { name, fonts, css, fn }).
   fn(spec, partner, sq, H) returns one flyer root, like every other set. Partner variants are
   only asked for on Zoom events (an in-person event makes the two Hawaiʻi flyers only).
   Shared pieces for the designs live on VEBFlyers.random (R below). */
(function () {
  'use strict';
  var F = window.VEBFlyers, H = F.helpers, esc = H.esc;
  function zoom(spec) { return spec.mode !== 'inperson'; }
  // Split a title into at most n balanced lines (by words). Returns an array of escaped lines.
  function lines(text, n) {
    var w = String(text || '').trim().split(/\s+/).filter(Boolean); if (!w.length) return [''];
    n = Math.max(1, Math.min(n || 2, w.length));
    var best = null;
    (function go(start, k, acc) {
      if (k === 1) { var l = acc.concat([w.slice(start).join(' ')]); var m = Math.max.apply(null, l.map(function (s) { return s.length; }));
        if (!best || m < best.m) best = { m: m, l: l }; return; }
      for (var i = start + 1; i <= w.length - k + 1; i++) go(i, k - 1, acc.concat([w.slice(start, i).join(' ')]));
    })(0, n, []);
    return best.l.map(esc);
  }
  var R = {
    zoom: zoom,
    title: function (spec) { return esc(spec.title || 'Your event name'); },
    titleLines: function (spec, n) { return lines(spec.title || 'Your event name', n); },
    // Font size (cqw) so the longest of `ls` fits `w` cqw. k = average glyph width in em for the font (0.5–0.62).
    fitSize: function (ls, w, cap, k) { var m = Math.max.apply(null, ls.map(function (s) { return s.replace(/&[a-z#0-9]+;/g, 'x').length; })); return Math.min(cap, w / (Math.max(m, 1) * (k || 0.56))); },
    tagline: function (spec) { return esc(spec.tagline || ''); },
    // Where: { kicker, line1, line2 }. Zoom: "ON ZOOM" + a join line. In person: place + address.
    where: function (spec) {
      return zoom(spec) ? { kicker: 'ON ZOOM', line1: 'Join from home', line2: 'on your phone or computer' }
                        : { kicker: 'IN PERSON', line1: esc(spec.place || ''), line2: esc(spec.address || '') };
    },
    // Sponsor logos: like H.badges, but the Zoom laptop icon only on Zoom events.
    badges: function (spec, partner) {
      var b = (spec.sponsors || []).slice(); if (partner && b.indexOf('Pacific Island Partners') < 0) b.push('Pacific Island Partners');
      if (!partner && zoom(spec) && b.indexOf('Zoom') < 0) b.push('Zoom');
      var L = spec.sponsorLogos || {};
      return b.slice(0, 3).map(function (x) { return L[x] ? '<span class="vfx-logo' + (L[x].dark ? ' dk' : '') + '"><img src="' + L[x].url + '" alt="' + esc(x) + '"></span>' : '<span>' + esc(x) + '</span>'; }).join('');
    },
    // The register lines every LDAH flyer carries.
    register: function (spec, partner) {
      return { big: 'REGISTER at <span>LDAHawaii.org</span>',
               small: (zoom(spec) ? 'Get your Zoom link, scan the QR code, or call ' : 'Save your spot: scan the QR code, or call ') + H.phone(partner) };
    },
    // H.sessInfo for each session; lesson (the topic) may be empty on a Random event.
    sessions: function (spec) { return (spec.sessions || []).map(H.sessInfo); },
    logo: function (spec, partner) { return '<img src="' + (partner ? spec.pipUrl : spec.logoUrl) + '" alt="">'; },
    presenter: function (spec) { return esc(spec.presenter || ''); }
  };
  F.random = R;
  F.RANDOM_COUNT = 20;
})();
/* Virtual Event Builder: Random series, designs R1–R5 (2026-11-12, STAGE).
   R1 Retro sunset stripes · R2 Risograph print · R3 Memphis shapes · R4 Scrapbook snapshots · R5 Newspaper front page.
   None of these carry month, season or holiday art: they suit any event on any date.
   Every text block is its own absolutely-positioned child of the flyer root; artwork lives in one <svg> child. */
(function () {
  'use strict';
  var F = window.VEBFlyers, R = F.random;
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;' + (w != null ? 'width:' + f(w) + 'cqw;' : '') + (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  // Best title split: the line count (1..maxN) that gives the biggest type inside w x hMax.
  function fit(spec, w, cap, k, hMax, lh, maxN) {
    var best = null;
    for (var n = 1; n <= maxN; n++) {
      var ls = R.titleLines(spec, n); if (n > 1 && ls.length < n) break;
      var fs = R.fitSize(ls, w, cap, k); if (ls.length * fs * lh > hMax) fs = hMax / (ls.length * lh);
      if (!best || fs > best.fs + 0.05) best = { ls: ls, fs: fs, h: ls.length * fs * lh };
    }
    return best;
  }
  // Rough line count for wrapped body text (chars per line from width, size and glyph width).
  function nLines(text, w, fs, k) { var c = String(text || '').replace(/&[a-z#0-9]+;/g, 'x').length; return Math.max(1, Math.ceil(c * fs * (k || 0.48) / w)); }
  function hasTopics(S) { return S.some(function (s) { return s.lesson; }); }

  /* ================= R1 · Retro sunset stripes ================= */
  VEBFlyers.registerSet('R', 1, (function () {
    var CREAM = '#FFF0D4', BROWN = '#4B2414', RED = '#C7422B', ORANGE = '#E8742C', MUST = '#F3B33D', PEACH = '#F7C98F';
    function arcs(cx, cy, r, band) {
      var cols = [BROWN, RED, ORANGE, MUST], s = '<g clip-path="url(#r1c' + f(cy).replace('.', '_') + ')">';
      cols.forEach(function (c, i) { s += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r - i * band) + '" fill="' + c + '"/>'; });
      s += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r - 4 * band) + '" fill="' + CREAM + '"/>';
      s += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f((r - 4 * band) * 0.62) + '" fill="' + MUST + '"/>';
      return s + '</g><defs><clipPath id="r1c' + f(cy).replace('.', '_') + '"><rect x="0" y="-5" width="100" height="' + f(cy + 5) + '"/></clipPath></defs>'
        + '<rect x="' + f(cx - r - 3) + '" y="' + f(cy) + '" width="' + f(2 * r + 6) + '" height=".7" fill="' + BROWN + '"/>';
    }
    function stripes(y, h) { var s = '', c = [MUST, ORANGE, RED, BROWN]; c.forEach(function (k, i) { s += '<rect x="0" y="' + f(y + i * h) + '" width="100" height="' + f(h + .05) + '" fill="' + k + '"/>'; }); return s; }
    function deco(HH, o) {
      return '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true"><rect width="100" height="' + f(HH) + '" fill="' + CREAM + '"/>'
        + arcs(o.cx, o.cy, o.r, o.band) + stripes(o.sy, o.sh)
        + '<rect x="0" y="' + f(o.sy + 4 * o.sh) + '" width="100" height="' + f(HH - o.sy - 4 * o.sh) + '" fill="' + BROWN + '"/></svg>';
    }
    return {
      name: 'Retro sunset stripes: 1970s rainbow arcs, chunky rounded type, warm stripes',
      fonts: 'family=Shrikhand&family=Rubik:wght@500;600;700;800',
      css: [
        '.r1{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;background:' + CREAM + ';color:' + BROWN + ';font-family:Rubik,Arial,sans-serif}',
        '.r1.sq{aspect-ratio:1/1}', '.r1 *{box-sizing:border-box}',
        '.r1>svg{position:absolute;inset:0;width:100%;height:100%;z-index:0}', '.r1>div{position:absolute;z-index:2}',
        '.r1 .r1-logo{background:#FFF8EA;border:.6cqw solid ' + BROWN + ';border-radius:50%;display:flex;align-items:center;justify-content:center;padding:2.2cqw;box-shadow:.7cqw .7cqw 0 ' + ORANGE + '}',
        '.r1 .r1-logo.pip{border-radius:2.4cqw;padding:1.1cqw 1.6cqw}',
        '.r1 .r1-logo img{max-width:100%;max-height:100%;display:block}',
        '.r1 .r1-ttl{font-family:Shrikhand,cursive;line-height:1.04;color:' + BROWN + ';white-space:nowrap;text-shadow:.35cqw .35cqw 0 ' + MUST + ',.7cqw .7cqw 0 ' + ORANGE + '}',
        '.r1 .r1-tag{font-weight:600;font-size:2.8cqw;line-height:1.25;color:' + RED + '}',
        '.r1 .r1-kick{font-weight:800;font-size:1.7cqw;letter-spacing:.2em;white-space:nowrap;color:' + RED + '}',
        '.r1 .r1-s{background:#FFF8EA;border:.5cqw solid ' + BROWN + ';border-radius:2.6cqw;display:flex;gap:2cqw;align-items:center;padding:1.4cqw 2cqw}',
        '.r1 .r1-s .d{flex:none;width:10.5cqw;height:10.5cqw;border-radius:50%;background:' + ORANGE + ';color:#FFF8EA;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}',
        '.r1 .r1-s .d b{font-weight:800;font-size:1.8cqw;letter-spacing:.12em}',
        '.r1 .r1-s .d span{font-family:Shrikhand,cursive;font-size:4.6cqw;margin-top:.2cqw}',
        '.r1 .r1-s .t{font-weight:800;font-size:2cqw;white-space:nowrap;color:' + RED + ';letter-spacing:.02em}',
        '.r1 .r1-s .l{font-weight:700;font-size:2.4cqw;line-height:1.18;margin-top:.5cqw}',
        '.r1 .r1-wh{text-align:center;line-height:1.3}',
        '.r1 .r1-wh b{display:inline-block;background:' + BROWN + ';color:' + MUST + ';font-weight:800;font-size:1.7cqw;letter-spacing:.2em;padding:.5cqw 1.6cqw;border-radius:5cqw;margin-bottom:.6cqw}',
        '.r1 .r1-wh div{font-weight:700;font-size:2.5cqw}', '.r1 .r1-wh i{display:block;font-style:normal;font-weight:500;font-size:2.1cqw}',
        '.r1 .r1-ft{color:#FFF0D4}',
        '.r1 .r1-ft .rg{font-family:Shrikhand,cursive;font-size:3.7cqw;line-height:1.1;white-space:nowrap}', '.r1 .r1-ft .rg span{color:' + MUST + '}',
        '.r1 .r1-ft .sm{font-weight:500;font-size:1.6cqw;margin-top:.5cqw;white-space:nowrap}',
        '.r1 .r1-bd{display:flex;gap:1cqw;flex-wrap:nowrap}',
        '.r1 .r1-bd>span:not(.vfx-logo){font-weight:700;font-size:1.3cqw;border:.15cqw solid ' + MUST + ';color:#FFF0D4;padding:.3cqw .8cqw;border-radius:3cqw;white-space:nowrap}',
        '.r1 .r1-qr{background:#fff;padding:.6cqw;border-radius:1.2cqw;display:flex;align-items:center;justify-content:center;box-shadow:.6cqw .6cqw 0 ' + ORANGE + '}', '.r1 .r1-qr img{width:100%;height:100%;display:block}',
        '.r1 .r1-tb{background:#FFF8EA;border:.5cqw solid ' + BROWN + ';border-radius:2.4cqw;overflow:hidden}',
        '.r1 .r1-tb .r{display:grid;grid-template-columns:40% 32% 28%;align-items:center;padding:0 2cqw;border-top:.15cqw solid ' + PEACH + '}',
        '.r1 .r1-tb .r.th{border-top:0;background:' + BROWN + ';color:' + MUST + ';font-weight:800;font-size:1.35cqw;letter-spacing:.14em}',
        '.r1 .r1-tb .r.h{background:' + MUST + '}',
        '.r1 .r1-tb .lb{font-weight:700;font-size:2.05cqw;white-space:nowrap}', '.r1 .r1-tb .dy{font-weight:600;font-size:1.75cqw;white-space:nowrap}', '.r1 .r1-tb .tm{font-weight:800;font-size:2.05cqw;white-space:nowrap;text-align:right}',
        '.r1 .r1-tp{font-weight:700;font-size:2.2cqw;line-height:1.35;text-align:center}', '.r1 .r1-tp b{color:' + RED + '}',
        '.r1.sq .r1-ft .rg{font-size:3.3cqw}.r1.sq .r1-ft .sm{font-size:1.45cqw}.r1.sq .r1-s .d{width:9cqw;height:9cqw}.r1.sq .r1-s .d span{font-size:3.9cqw}.r1.sq .r1-s{padding:1cqw 1.6cqw;border-radius:2cqw}',
        '.r1.sq .r1-tb .lb,.r1.sq .r1-tb .tm{font-size:1.9cqw}.r1.sq .r1-tb .dy{font-size:1.6cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        if (!R.zoom(spec)) partner = false;
        var HH = sq ? 100 : 129.41, S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), tag = R.tagline(spec);
        var out = '<div class="vfx r1' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">';
        var logo = function (x, y, s) { return partner ? box('r1-logo pip', x, y, s * 1.6, s * 0.86, R.logo(spec, partner)) : box('r1-logo', x, y, s, s, R.logo(spec, partner)); };
        var title = function (x, y, w, cap, hMax, maxN, align) {
          var t = fit(spec, w, cap, 0.6, hMax, 1.04, maxN);
          return { h: t.h, html: box('r1-ttl', x, y, w, null, t.ls.join('<br>'), 'font-size:' + f(t.fs) + 'cqw;text-align:' + (align || 'center')) };
        };
        var card = function (s, x, y, w) {
          return box('r1-s', x, y, w, null, '<div class="d"><b>' + s.mon.toUpperCase() + '</b><span>' + s.day + '</span></div><div><div class="t">' + s.dow.toUpperCase() + ' · ' + s.time + '</div>' + (s.lesson ? '<div class="l">' + s.lesson + '</div>' : '') + '</div>');
        };
        var whereB = function (x, y, w, align) { return box('r1-wh', x, y, w, null, '<b>' + W.kicker + '</b><div>' + W.line1 + '</div><i>' + W.line2 + '</i>', align ? 'text-align:' + align : ''); };
        var foot = function (y, qs, x2) {
          return box('r1-ft', 6, y, x2 - 6, null, '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div>')
            + box('r1-bd', 6, y + (sq ? 7.6 : 8.6), x2 - 6, null, R.badges(spec, partner))
            + box('r1-qr', 94 - qs, HH - qs - (sq ? 3 : 3.4), qs, qs, H.qrImg(spec, partner));
        };
        var table = function (x, y, w, rh) {
          var rows = H.zoneRows(spec.sessions), h = '<div class="r th" style="height:' + f(rh * .8) + 'cqw"><span>WHERE YOU ARE</span><span>DAY</span><span style="text-align:right">YOUR TIME</span></div>';
          h += rows.map(function (r) { return '<div class="r' + (r.home ? ' h' : '') + '" style="height:' + f(rh) + 'cqw"><span class="lb">' + r.label + '</span><span class="dy">' + r.days + '</span><span class="tm">' + r.time + '</span></div>'; }).join('');
          return box('r1-tb', x, y, w, null, h);
        };
        var topics = function (x, y, w) {
          if (!hasTopics(S)) return '';
          return box('r1-tp', x, y, w, null, S.map(function (s) { return '<div><b>' + s.mon + ' ' + s.day + '</b> · ' + (s.lesson || 'Live on Zoom') + '</div>'; }).join(''));
        };
        var y, t;
        if (!sq && !partner) {
          out += deco(HH, { cx: 66, cy: 31, r: 30, band: 4.6, sy: 104, sh: 1.5 });
          out += logo(6, 6, 20);
          out += box('r1-kick', 6, 28.4, null, null, 'LDAH PRESENTS');
          t = title(6, 35, 88, 12.5, 26, 3); out += t.html; y = 35 + t.h + 2.2;
          if (tag) { out += box('r1-tag', 8, y, 84, null, tag, 'text-align:center'); y += nLines(tag, 84, 2.8) * 3.5 + 2.4; }
          if (S.length === 1) { out += card(S[0], 18, y, 64); } else { out += card(S[0], 6, y, 43) + card(S[1], 51, y, 43); }
          y += (hasTopics(S) ? 15.5 : 14) + 2.4;
          out += whereB(10, y, 80);
          out += foot(112.2, 12.5, 78);
        } else if (!sq && partner) {
          out += deco(HH, { cx: 70, cy: 25, r: 25, band: 3.9, sy: 104, sh: 1.5 });
          out += logo(6, 5.5, 16);
          out += box('r1-wh', 6, 21, 36, null, '<b>' + W.kicker + '</b><i>' + W.line1 + '<br>' + W.line2 + '</i>', 'text-align:left');
          t = title(6, 31, 88, 11, 19, 3); out += t.html; y = 31 + t.h + 1.8;
          if (tag) { out += box('r1-tag', 8, y, 84, null, tag, 'text-align:center'); y += nLines(tag, 84, 2.8) * 3.5 + 1.6; }
          if (hasTopics(S)) { out += topics(8, y, 84); y += S.length * 3 + 1.8; }
          out += table(6, y, 88, 3.2);
          out += foot(112.2, 12.5, 78);
        } else if (sq && !partner) {
          out += deco(HH, { cx: 73, cy: 22, r: 21, band: 3.3, sy: 76.4, sh: 1.2 });
          out += logo(5, 4.5, 15);
          t = title(5, 25, 90, 9, 17, 3, 'left'); out += t.html; y = 25 + t.h + 1.6;
          if (tag) { out += box('r1-tag', 5, y, 90, null, tag, 'font-size:2.5cqw'); y += nLines(tag, 90, 2.5) * 3.1 + 1.8; }
          S.forEach(function (s, i) { out += card(s, 5, y + i * 12, 57); });
          out += whereB(64, y + 1, 31, 'left');
          out += foot(81.4, 13, 80);
        } else {
          out += deco(HH, { cx: 76, cy: 19, r: 18, band: 2.8, sy: 80.4, sh: 1.0 });
          out += logo(5, 4, 12);
          out += box('r1-wh', 5, 15.5, 40, null, '<b>' + W.kicker + '</b>', 'text-align:left');
          t = title(5, 22.5, 90, 7, 12.5, 2, 'left'); out += t.html; y = 22.5 + t.h + 1.2;
          if (tag) { out += box('r1-tag', 5, y, 90, null, tag, 'font-size:2.2cqw'); y += nLines(tag, 90, 2.2) * 2.8 + 1.2; }
          out += table(5, y, 58, 3.05);
          if (hasTopics(S)) out += box('r1-tp', 65, y + 1, 30, null, S.map(function (s) { return '<div><b>' + s.mon + ' ' + s.day + '</b><br>' + (s.lesson || '') + '</div>'; }).join(''), 'text-align:left;font-size:1.9cqw;line-height:1.25');
          out += foot(84.6, 11, 82);
        }
        return out + '</div>';
      }
    };
  })());

  /* ================= R2 · Risograph print ================= */
  VEBFlyers.registerSet('R', 2, (function () {
    var PAPER = '#F4EEE2', PINK = '#FF48B0', TEAL = '#0078BF', INK = '#262A6B';
    // Halftone: a grid of dots whose radius follows fn(x,y) (0..1). Each dot is tiny, so decorate() treats it as texture.
    function dots(x0, y0, x1, y1, step, col, fn, rot) {
      var s = '<g fill="' + col + '"' + (rot ? ' transform="rotate(' + rot + ' ' + f((x0 + x1) / 2) + ' ' + f((y0 + y1) / 2) + ')"' : '') + '>';
      for (var y = y0; y <= y1; y += step) for (var x = x0; x <= x1; x += step) { var k = fn(x, y); if (k > 0.06) s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(Math.min(1, k) * step * 0.56) + '"/>'; }
      return s + '</g>';
    }
    function disc(cx, cy, r, step, col) {
      return dots(cx - r, cy - r, cx + r, cy + r, step, col, function (x, y) { var d = Math.hypot(x - cx, y - cy) / r; return d > 1 ? 0 : 1.05 - d * 0.75; }, 15);
    }
    function deco(HH, o, id) {
      var s = '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="r2g' + id + '" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .15  0 0 0 0 .15  0 0 0 0 .3  0 0 0 -1.6 1.05"/></filter></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="' + PAPER + '"/>';
      s += '<g style="mix-blend-mode:multiply">' + disc(o.cx, o.cy, o.r, o.step, PINK);
      s += '<circle cx="' + f(o.tx) + '" cy="' + f(o.ty) + '" r="' + f(o.tr) + '" fill="' + TEAL + '" opacity=".92"/>';
      s += dots(0, o.fy - o.band, 100, o.fy, o.step * 0.8, PINK, function (x, y) { return (y - (o.fy - o.band)) / o.band * 1.1; });
      // footer: teal block with a pink plate printed slightly off register
      s += '<rect x="0" y="' + f(o.fy + 0.7) + '" width="100" height="' + f(HH - o.fy) + '" fill="' + PINK + '" transform="translate(.9 -1.1)"/>';
      s += '<rect x="0" y="' + f(o.fy) + '" width="100" height="' + f(HH - o.fy) + '" fill="' + TEAL + '"/></g>';
      s += '<rect width="100" height="' + f(HH) + '" filter="url(#r2g' + id + ')" opacity=".35"/>';
      return s + '</svg>';
    }
    return {
      name: 'Risograph print: fluoro pink and blue, halftone dots, off-register plates, grainy paper',
      fonts: 'family=Archivo+Black&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700',
      css: [
        '.r2{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;background:' + PAPER + ';color:' + INK + ';font-family:"Space Grotesk",Arial,sans-serif}',
        '.r2.sq{aspect-ratio:1/1}', '.r2 *{box-sizing:border-box}',
        '.r2>svg{position:absolute;inset:0;width:100%;height:100%;z-index:0}', '.r2>div{position:absolute;z-index:2}',
        '.r2 .r2-logo{background:#fff;border:.35cqw solid ' + TEAL + ';box-shadow:.8cqw .8cqw 0 ' + PINK + ';display:flex;align-items:center;justify-content:center;padding:1.4cqw}',
        '.r2 .r2-logo img{max-width:100%;max-height:100%;display:block}',
        '.r2 .r2-kick{font-family:"Space Mono",monospace;font-weight:700;font-size:1.6cqw;letter-spacing:.16em;line-height:1.45;color:' + TEAL + ';white-space:nowrap}',
        '.r2 .r2-kick span{background:' + PINK + ';color:#fff;padding:.2cqw .8cqw}',
        '.r2 .r2-ttl{font-family:"Archivo Black",Arial,sans-serif;text-transform:uppercase;line-height:.96;letter-spacing:-.01em;color:' + TEAL + ';white-space:nowrap;text-shadow:.55cqw .4cqw 0 rgba(255,72,176,.85)}',
        '.r2 .r2-tag{font-weight:700;font-size:2.7cqw;line-height:1.42}',
        '.r2 .r2-tag span{background:rgba(255,72,176,.32);box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:0 .6cqw}',
        '.r2 .r2-s{display:flex;align-items:center;gap:2.2cqw;border-top:.35cqw dashed ' + TEAL + ';padding-top:1.2cqw}',
        '.r2 .r2-s .n{font-family:"Archivo Black",sans-serif;font-size:8.4cqw;line-height:.9;color:' + PINK + ';text-shadow:-.45cqw .35cqw 0 rgba(0,120,191,.55);min-width:12cqw;text-align:center}',
        '.r2 .r2-s .k{font-family:"Space Mono",monospace;font-weight:700;font-size:1.7cqw;letter-spacing:.12em;color:' + TEAL + ';white-space:nowrap}',
        '.r2 .r2-s .t{font-weight:700;font-size:2.4cqw;white-space:nowrap}',
        '.r2 .r2-s .l{font-weight:600;font-size:2.2cqw;line-height:1.2;margin-top:.3cqw}',
        '.r2 .r2-wh{background:' + TEAL + ';color:' + PAPER + ';padding:1.6cqw 1.8cqw;box-shadow:-.8cqw .8cqw 0 ' + PINK + ';line-height:1.25}',
        '.r2 .r2-wh b{display:block;font-family:"Space Mono",monospace;font-weight:700;font-size:1.6cqw;letter-spacing:.18em;color:#FFC2E4;margin-bottom:.6cqw}',
        '.r2 .r2-wh div{font-weight:700;font-size:2.4cqw}', '.r2 .r2-wh i{display:block;font-style:normal;font-weight:500;font-size:1.9cqw;margin-top:.3cqw}',
        '.r2 .r2-ft{color:#fff}',
        '.r2 .r2-ft .rg{font-family:"Archivo Black",sans-serif;font-size:3.5cqw;line-height:1.1;white-space:nowrap}', '.r2 .r2-ft .rg span{color:#FFC2E4}',
        '.r2 .r2-ft .sm{font-family:"Space Mono",monospace;font-size:1.45cqw;margin-top:.6cqw;white-space:nowrap}',
        '.r2 .r2-bd{display:flex;gap:1cqw}',
        '.r2 .r2-bd>span:not(.vfx-logo){font-family:"Space Mono",monospace;font-weight:700;font-size:1.25cqw;border:.15cqw solid #fff;color:#fff;padding:.3cqw .8cqw;white-space:nowrap}',
        '.r2 .r2-qr{background:#fff;padding:.6cqw;display:flex;align-items:center;justify-content:center;box-shadow:.7cqw -.7cqw 0 ' + PINK + '}', '.r2 .r2-qr img{width:100%;height:100%;display:block}',
        '.r2 .r2-tb{border:.35cqw solid ' + TEAL + ';background:' + PAPER + '}',
        '.r2 .r2-tb .r{display:grid;grid-template-columns:40% 33% 27%;align-items:center;padding:0 1.6cqw;border-top:.2cqw dashed rgba(0,120,191,.45)}',
        '.r2 .r2-tb .r.th{border-top:0;background:' + TEAL + ';color:#fff;font-family:"Space Mono",monospace;font-weight:700;font-size:1.3cqw;letter-spacing:.12em}',
        '.r2 .r2-tb .r.h{background:rgba(255,72,176,.38)}',
        '.r2 .r2-tb .lb{font-weight:700;font-size:2.05cqw;white-space:nowrap}', '.r2 .r2-tb .dy{font-family:"Space Mono",monospace;font-size:1.6cqw;white-space:nowrap}', '.r2 .r2-tb .tm{font-weight:700;font-size:2.05cqw;white-space:nowrap;text-align:right}',
        '.r2 .r2-tp{font-weight:600;font-size:2.15cqw;line-height:1.35}', '.r2 .r2-tp b{font-family:"Space Mono",monospace;color:' + PINK + ';font-weight:700;margin-right:.8cqw}',
        '.r2.sq .r2-s .n{font-size:6.6cqw;min-width:9.5cqw}.r2.sq .r2-s{padding-top:.9cqw;gap:1.8cqw}.r2.sq .r2-s .t{font-size:2.15cqw}.r2.sq .r2-s .l{font-size:2cqw}.r2.sq .r2-s .k{font-size:1.5cqw}',
        '.r2.sq .r2-ft .rg{font-size:3.2cqw}.r2.sq .r2-ft .sm{font-size:1.35cqw}.r2.sq .r2-tb .lb,.r2.sq .r2-tb .tm{font-size:1.85cqw}.r2.sq .r2-tb .dy{font-size:1.45cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        if (!R.zoom(spec)) partner = false;
        var HH = sq ? 100 : 129.41, S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), tag = R.tagline(spec);
        var id = (sq ? 's' : 'l') + (partner ? 'p' : 'h');
        var out = '<div class="vfx r2' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">';
        var title = function (x, y, w, cap, hMax, maxN) { var t = fit(spec, w, cap, 0.7, hMax, 0.96, maxN); return { h: t.h, html: box('r2-ttl', x, y, w, null, t.ls.join('<br>'), 'font-size:' + f(t.fs) + 'cqw') }; };
        var tagB = function (x, y, w, fs) { return tag ? box('r2-tag', x, y, w, null, '<span>' + tag + '</span>', fs ? 'font-size:' + fs + 'cqw' : '') : ''; };
        var row = function (s, x, y, w) { return box('r2-s', x, y, w, null, '<div class="n">' + s.day + '</div><div><div class="k">' + s.dow.toUpperCase() + ' · ' + s.monFull.toUpperCase() + '</div><div class="t">' + s.time + '</div>' + (s.lesson ? '<div class="l">' + s.lesson + '</div>' : '') + '</div>'); };
        var whereB = function (x, y, w) { return box('r2-wh', x, y, w, null, '<b>' + W.kicker + '</b><div>' + W.line1 + '</div><i>' + W.line2 + '</i>'); };
        var foot = function (y, qs, w) {
          return box('r2-ft', sq ? 5 : 6, y, w, null, '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div>')
            + box('r2-bd', sq ? 5 : 6, y + (sq ? 7.4 : 8.2), w, null, R.badges(spec, partner))
            + box('r2-qr', (sq ? 95 : 94) - qs, HH - qs - (sq ? 2.6 : 3), qs, qs, H.qrImg(spec, partner));
        };
        var table = function (x, y, w, rh) {
          var h = '<div class="r th" style="height:' + f(rh * .8) + 'cqw"><span>WHERE YOU ARE</span><span>DAY</span><span style="text-align:right">YOUR TIME</span></div>';
          h += H.zoneRows(spec.sessions).map(function (r) { return '<div class="r' + (r.home ? ' h' : '') + '" style="height:' + f(rh) + 'cqw"><span class="lb">' + r.label + '</span><span class="dy">' + r.days + '</span><span class="tm">' + r.time + '</span></div>'; }).join('');
          return box('r2-tb', x, y, w, null, h);
        };
        var topics = function (x, y, w, fs) { return hasTopics(S) ? box('r2-tp', x, y, w, null, S.map(function (s) { return '<div><b>' + s.mon.toUpperCase() + ' ' + s.day + '</b>' + (s.lesson || '') + '</div>'; }).join(''), fs ? 'font-size:' + fs + 'cqw' : '') : ''; };
        var y, t, rh = hasTopics(S) ? 11 : 8.4;
        if (!sq && !partner) {
          out += deco(HH, { cx: 80, cy: 17, r: 27, step: 2.1, tx: 94, ty: 21, tr: 10, fy: 110, band: 9 }, id);
          out += box('r2-logo', 6, 5, 21, 21, R.logo(spec, partner));
          out += box('r2-kick', 31, 6.5, null, null, '<span>LDAH</span><br>FAMILY EVENT');
          t = title(6, 33, 88, 13, 27, 4); out += t.html; y = 33 + t.h + 2.4;
          if (tag) { out += tagB(6, y, 86); y += nLines(tag, 86, 2.7) * 3.85 + 2.6; }
          S.forEach(function (s, i) { out += row(s, 6, y + i * rh, 54); });
          out += whereB(64, y + 1.4, 30);
          out += foot(112.6, 13, 72);
        } else if (!sq && partner) {
          out += deco(HH, { cx: 82, cy: 15, r: 23, step: 2.1, tx: 95, ty: 16, tr: 8.5, fy: 110, band: 8 }, id);
          out += box('r2-logo', 6, 5, 28, 15, R.logo(spec, partner));
          out += box('r2-kick', 38, 6.5, null, null, '<span>' + W.kicker + '</span><br>' + W.line1.toUpperCase());
          t = title(6, 26, 88, 11, 20, 4); out += t.html; y = 26 + t.h + 2;
          if (tag) { out += tagB(6, y, 86, 2.5); y += nLines(tag, 86, 2.5) * 3.6 + 1.8; }
          if (hasTopics(S)) { out += topics(6, y, 88); y += S.length * 2.95 + 1.8; }
          out += table(6, y, 88, 3.25);
          out += foot(112.6, 13, 72);
        } else if (sq && !partner) {
          out += deco(HH, { cx: 82, cy: 13, r: 20, step: 1.9, tx: 95, ty: 16, tr: 7, fy: 80, band: 7 }, id);
          out += box('r2-logo', 5, 4.5, 15.5, 15.5, R.logo(spec, partner));
          out += box('r2-kick', 24, 5.5, null, null, '<span>LDAH</span><br>FAMILY EVENT');
          t = title(5, 23.5, 90, 9.5, 17.5, 3); out += t.html; y = 23.5 + t.h + 1.8;
          if (tag) { out += tagB(5, y, 90, 2.4); y += nLines(tag, 90, 2.4) * 3.4 + 1.6; }
          S.forEach(function (s, i) { out += row(s, 5, y + i * (hasTopics(S) ? 10 : 7.6), 55); });
          out += whereB(64, y + 1, 31);
          out += foot(82.2, 12, 74);
        } else {
          out += deco(HH, { cx: 84, cy: 11, r: 17, step: 1.9, tx: 96, ty: 12, tr: 6, fy: 83, band: 5 }, id);
          out += box('r2-logo', 5, 4, 22, 12, R.logo(spec, partner));
          out += box('r2-kick', 31, 5.2, null, null, '<span>' + W.kicker + '</span><br>' + W.line1.toUpperCase());
          t = title(5, 20, 90, 7.5, 13.5, 3); out += t.html; y = 20 + t.h + 1.4;
          if (tag) { out += tagB(5, y, 90, 2.1); y += nLines(tag, 90, 2.1) * 3 + 1.2; }
          out += table(5, y, 59, 3.0);
          out += topics(67, y + .4, 28, 1.8);
          out += foot(85.2, 10.5, 76);
        }
        return out + '</div>';
      }
    };
  })());

  /* ================= R3 · Memphis shapes ================= */
  VEBFlyers.registerSet('R', 3, (function () {
    var BG = '#FFFBF1', BLK = '#111111', YEL = '#FFD23F', PNK = '#FF5FA2', CYA = '#38C6E3', PUR = '#7B5CFF', MNT = '#43D19E';
    var SW = ' stroke="' + BLK + '" stroke-width=".55" stroke-linejoin="round"';
    function squig(x, y, w, amp, n, col, sw) {
      var d = 'M' + f(x) + ' ' + f(y), step = w / n;
      for (var i = 0; i < n; i++) d += ' q' + f(step / 2) + ' ' + f(i % 2 ? amp : -amp) + ' ' + f(step) + ' 0';
      return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="' + f(sw || 1.1) + '" stroke-linecap="round"/>';
    }
    function zig(x, y, w, h, n, col) { var d = 'M' + f(x) + ' ' + f(y + h); for (var i = 1; i <= n; i++) d += ' L' + f(x + i * w / n) + ' ' + f(i % 2 ? y : y + h); return '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="1" stroke-linejoin="miter"/>'; }
    function tri(x, y, s, col, rot) { return '<polygon points="' + f(x) + ',' + f(y + s) + ' ' + f(x + s / 2) + ',' + f(y) + ' ' + f(x + s) + ',' + f(y + s) + '" fill="' + col + '"' + SW + ' transform="rotate(' + (rot || 0) + ' ' + f(x + s / 2) + ' ' + f(y + s / 2) + ')"/>'; }
    function circ(x, y, r, col) { return '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + f(r) + '" fill="' + col + '"' + SW + '/>'; }
    function deco(HH, shapes, id) {
      return '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="r3d' + id + '" width="3.2" height="3.2" patternUnits="userSpaceOnUse"><circle cx="1.6" cy="1.6" r=".32" fill="#E4DCCB"/></pattern></defs>'
        + '<rect width="100" height="' + f(HH) + '" fill="' + BG + '"/><rect width="100" height="' + f(HH) + '" fill="url(#r3d' + id + ')"/>' + shapes + '</svg>';
    }
    return {
      name: 'Memphis shapes: 1980s squiggles, zigzags, triangles and dots with bold black outlines',
      fonts: 'family=Bowlby+One&family=Lexend:wght@400;500;600;700;800',
      css: [
        '.r3{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;background:' + BG + ';color:' + BLK + ';font-family:Lexend,Arial,sans-serif}',
        '.r3.sq{aspect-ratio:1/1}', '.r3 *{box-sizing:border-box}',
        '.r3>svg{position:absolute;inset:0;width:100%;height:100%;z-index:0}', '.r3>div{position:absolute;z-index:2}',
        '.r3 .r3-logo{background:#fff;border:.55cqw solid ' + BLK + ';border-radius:50%;box-shadow:.9cqw .9cqw 0 ' + BLK + ';display:flex;align-items:center;justify-content:center;padding:2.3cqw}',
        '.r3 .r3-logo.pip{border-radius:1.6cqw;padding:1cqw 1.4cqw}',
        '.r3 .r3-logo img{max-width:100%;max-height:100%;display:block}',
        '.r3 .r3-kick{background:' + BLK + ';color:' + YEL + ';font-family:"Bowlby One",sans-serif;font-size:2.1cqw;letter-spacing:.06em;padding:.7cqw 1.6cqw;white-space:nowrap;transform:rotate(-3deg)}',
        '.r3 .r3-ttl{background:' + YEL + ';border:.6cqw solid ' + BLK + ';box-shadow:1.2cqw 1.2cqw 0 ' + BLK + ';font-family:"Bowlby One",sans-serif;line-height:1.02;white-space:nowrap;transform:rotate(-1.2deg)}',
        '.r3 .r3-tag{background:#fff;border:.45cqw solid ' + BLK + ';font-weight:700;font-size:2.45cqw;line-height:1.25;padding:1cqw 1.8cqw;transform:rotate(.8deg)}',
        '.r3 .r3-s{border:.55cqw solid ' + BLK + ';box-shadow:.9cqw .9cqw 0 ' + BLK + ';padding:1.3cqw 1.8cqw}',
        '.r3 .r3-s .d{font-family:"Bowlby One",sans-serif;font-size:4.4cqw;line-height:1;white-space:nowrap}',
        '.r3 .r3-s .t{font-weight:800;font-size:2.1cqw;margin-top:.5cqw;white-space:nowrap}',
        '.r3 .r3-s .l{font-weight:600;font-size:2.15cqw;line-height:1.2;margin-top:.5cqw}',
        '.r3 .r3-wh{background:' + PUR + ';color:#fff;border:.5cqw solid ' + BLK + ';border-radius:5cqw;padding:1cqw 2.6cqw;line-height:1.25;white-space:nowrap}',
        '.r3 .r3-wh b{font-family:"Bowlby One",sans-serif;font-weight:400;font-size:1.9cqw;letter-spacing:.05em;color:' + YEL + ';margin-right:1.2cqw}',
        '.r3 .r3-wh span{font-weight:700;font-size:2.2cqw}', '.r3 .r3-wh i{display:block;font-style:normal;font-weight:500;font-size:1.85cqw}',
        '.r3 .r3-ft{background:#fff;border:.6cqw solid ' + BLK + ';box-shadow:1cqw 1cqw 0 ' + PNK + '}',
        '.r3 .r3-fx .rg{font-family:"Bowlby One",sans-serif;font-size:3.4cqw;line-height:1.1;white-space:nowrap}', '.r3 .r3-fx .rg span{color:' + PNK + ';-webkit-text-stroke:.12cqw ' + BLK + '}',
        '.r3 .r3-fx .sm{font-weight:600;font-size:1.55cqw;margin-top:.5cqw;white-space:nowrap}',
        '.r3 .r3-bd{display:flex;gap:1cqw}', '.r3 .r3-bd>span:not(.vfx-logo){font-weight:800;font-size:1.3cqw;border:.2cqw solid ' + BLK + ';padding:.3cqw .8cqw;white-space:nowrap}',
        '.r3 .r3-bd .vfx-logo{border:.2cqw solid ' + BLK + '}',
        '.r3 .r3-qr{background:#fff;border:.5cqw solid ' + BLK + ';padding:.5cqw;display:flex;align-items:center;justify-content:center}', '.r3 .r3-qr img{width:100%;height:100%;display:block}',
        '.r3 .r3-tb{background:#fff;border:.55cqw solid ' + BLK + ';box-shadow:1cqw 1cqw 0 ' + CYA + '}',
        '.r3 .r3-tb .r{display:grid;grid-template-columns:40% 33% 27%;align-items:center;padding:0 1.6cqw;border-top:.2cqw solid ' + BLK + '}',
        '.r3 .r3-tb .r.th{border-top:0;background:' + BLK + ';color:' + YEL + ';font-family:"Bowlby One",sans-serif;font-size:1.3cqw;letter-spacing:.06em}',
        '.r3 .r3-tb .r.h{background:' + YEL + '}',
        '.r3 .r3-tb .lb{font-weight:800;font-size:2cqw;white-space:nowrap}', '.r3 .r3-tb .dy{font-weight:600;font-size:1.7cqw;white-space:nowrap}', '.r3 .r3-tb .tm{font-weight:800;font-size:2cqw;white-space:nowrap;text-align:right}',
        '.r3 .r3-tp{font-weight:700;font-size:2.1cqw;line-height:1.35}', '.r3 .r3-tp b{font-family:"Bowlby One",sans-serif;font-weight:400;color:' + PUR + ';margin-right:.8cqw}',
        '.r3.sq .r3-s .d{font-size:3.6cqw}.r3.sq .r3-s .t{font-size:1.9cqw}.r3.sq .r3-s .l{font-size:1.95cqw}.r3.sq .r3-s{padding:1cqw 1.5cqw}',
        '.r3.sq .r3-fx .rg{font-size:3cqw}.r3.sq .r3-fx .sm{font-size:1.38cqw}.r3.sq .r3-tag{font-size:2.25cqw;padding:.7cqw 1.4cqw}.r3.sq .r3-tb .lb,.r3.sq .r3-tb .tm{font-size:1.8cqw}.r3.sq .r3-tb .dy{font-size:1.5cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        if (!R.zoom(spec)) partner = false;
        var HH = sq ? 100 : 129.41, S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), tag = R.tagline(spec);
        var id = (sq ? 's' : 'l') + (partner ? 'p' : 'h'), tiles = [CYA, MNT, PNK];
        var out = '<div class="vfx r3' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">';
        var title = function (x, y, w, cap, hMax, maxN, pad) {
          var t = fit(spec, w - 2 * pad, cap, 0.72, hMax, 1.02, maxN);
          return { h: t.h + 2 * pad, html: box('r3-ttl', x, y, w, null, t.ls.join('<br>'), 'font-size:' + f(t.fs) + 'cqw;padding:' + f(pad) + 'cqw ' + f(pad) + 'cqw') };
        };
        var tile = function (s, i, x, y, w) { return box('r3-s', x, y, w, null, '<div class="d">' + s.mon.toUpperCase() + ' ' + s.day + '</div><div class="t">' + s.dow.toUpperCase() + ' · ' + s.time + '</div>' + (s.lesson ? '<div class="l">' + s.lesson + '</div>' : ''), 'background:' + tiles[i] + ';transform:rotate(' + (i ? 1.2 : -1) + 'deg)'); };
        var whereB = function (x, y) { return box('r3-wh', x, y, null, null, '<b>' + W.kicker + '</b><span>' + W.line1 + '</span><i>' + W.line2 + '</i>'); };
        var foot = function (x, y, w, h, qs) {
          var p = sq ? 1.8 : 2.2;
          return box('r3-ft', x, y, w, h, '')
            + box('r3-fx', x + p, y + p, w - qs - 3 * p, null, '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div>')
            + box('r3-bd', x + p, y + p + (sq ? 6.6 : 7.8), w - qs - 3 * p, null, R.badges(spec, partner))
            + box('r3-qr', x + w - qs - p, y + (h - qs) / 2, qs, qs, H.qrImg(spec, partner));
        };
        var table = function (x, y, w, rh) {
          var h = '<div class="r th" style="height:' + f(rh * .8) + 'cqw"><span>WHERE YOU ARE</span><span>DAY</span><span style="text-align:right">YOUR TIME</span></div>';
          h += H.zoneRows(spec.sessions).map(function (r) { return '<div class="r' + (r.home ? ' h' : '') + '" style="height:' + f(rh) + 'cqw"><span class="lb">' + r.label + '</span><span class="dy">' + r.days + '</span><span class="tm">' + r.time + '</span></div>'; }).join('');
          return box('r3-tb', x, y, w, null, h);
        };
        var topics = function (x, y, w, fs) { return hasTopics(S) ? box('r3-tp', x, y, w, null, S.map(function (s) { return '<div><b>' + s.mon.toUpperCase() + ' ' + s.day + '</b>' + (s.lesson || '') + '</div>'; }).join(''), fs ? 'font-size:' + fs + 'cqw' : '') : ''; };
        var y, t, th = hasTopics(S) ? 15.5 : 11;
        if (!sq && !partner) {
          out += deco(HH, circ(-3, 21, 9, PNK) + tri(33, 9, 9, CYA, -12) + squig(46, 15, 20, 2.2, 4, BLK) + circ(64, 7, 2.4, MNT) + zig(6, 16.5, 22, 2.6, 8, PUR)
            + tri(88, 98, 7, PNK, 20) + circ(9, 104, 2.6, YEL), id);
          out += box('r3-kick', 5, 7, null, null, 'YOU&#8217;RE INVITED');
          out += box('r3-logo', 73, 3.5, 22, 22, R.logo(spec, partner));
          t = title(5, 29, 89, 12, 26, 3, 2.6); out += t.html; y = 29 + t.h + 3.2;
          if (tag) { out += box('r3-tag', 8, y, null, null, tag, 'max-width:84cqw'); y += nLines(tag, 80, 2.45, .56) * 3.1 + 2 + 3.4; }
          if (S.length === 1) out += tile(S[0], 0, 5, y, 52); else { out += tile(S[0], 0, 5, y, 43) + tile(S[1], 1, 51, y, 43); }
          y += th + 3.4;
          out += whereB(5, y);
          out += foot(5, 107, 88.5, 17.5, 13.5);
        } else if (!sq && partner) {
          out += deco(HH, circ(102, 30, 8, PNK) + tri(48, 6, 8, CYA, 14) + squig(60, 12, 14, 2, 3, BLK) + circ(-1, 104, 4, MNT) + tri(92, 95, 6, YEL, -15), id);
          out += box('r3-logo pip', 5, 4, 30, 16, R.logo(spec, partner));
          out += whereB(5, 23.4);
          t = title(5, 32, 89, 10.5, 19, 3, 2.2); out += t.html; y = 32 + t.h + 3;
          if (tag) { out += box('r3-tag', 7, y, null, null, tag, 'max-width:86cqw;font-size:2.4cqw'); y += nLines(tag, 82, 2.4, .56) * 3 + 1.8 + 2.8; }
          if (hasTopics(S)) { out += topics(6, y, 88); y += S.length * 2.85 + 2; }
          out += table(5, y, 89, 3.15);
          out += foot(5, 107.5, 88.5, 17.5, 13.5);
        } else if (sq && !partner) {
          out += deco(HH, circ(-2, 17, 6, PNK) + tri(42, 4, 7, CYA, -12) + squig(52, 9, 14, 1.7, 3, BLK) + circ(68, 15, 1.8, MNT) + tri(1, 70, 5, YEL, 18), id);
          out += box('r3-kick', 5, 5, null, null, 'YOU&#8217;RE INVITED');
          out += box('r3-logo', 78, 3, 17, 17, R.logo(spec, partner));
          t = title(5, 21.5, 87, 8.5, 17, 3, 1.8); out += t.html; y = 21.5 + t.h + 2.6;
          if (tag) { out += box('r3-tag', 6, y, null, null, tag, 'max-width:88cqw'); y += nLines(tag, 85, 2.25, .56) * 2.85 + 1.4 + 2.6; }
          if (S.length === 1) out += tile(S[0], 0, 5, y, 52); else { out += tile(S[0], 0, 5, y, 42.5) + tile(S[1], 1, 51, y, 42.5); }
          y += (hasTopics(S) ? 13 : 9.4) + 2.8;
          out += whereB(5, y);
          out += foot(5, 80, 88.5, 16, 12.5);
        } else {
          out += deco(HH, circ(101, 20, 5.5, PNK) + tri(40, 3.5, 6, CYA, 14) + squig(50, 8, 12, 1.6, 3, BLK) + circ(97, 72, 2, MNT), id);
          out += box('r3-logo pip', 5, 3.5, 22, 12, R.logo(spec, partner));
          out += box('r3-wh', 66, 6, null, null, '<b>' + W.kicker + '</b>');
          t = title(5, 18.5, 88, 7, 12, 2, 1.5); out += t.html; y = 18.5 + t.h + 2.6;
          if (tag) { out += box('r3-tag', 6, y, null, null, tag, 'max-width:88cqw;font-size:2.05cqw;padding:.6cqw 1.3cqw'); y += nLines(tag, 85, 2.05, .56) * 2.6 + 1.2 + 2.6; }
          out += table(5, y, 58, 2.95);
          out += topics(67, y + .3, 28, 1.8);
          out += foot(5, 82, 88.5, 14.5, 11.5);
        }
        return out + '</div>';
      }
    };
  })());

  /* ================= R4 · Scrapbook snapshots ================= */
  VEBFlyers.registerSet('R', 4, (function () {
    var KRAFT = '#E8D7B9', INK = '#2A2622', RED = '#C8372D', BLUE = '#2F5D9E', STICKY = ['#FFE47A', '#BDE8F2', '#FFC9D6'];
    // A simple drawn snapshot scene inside the photo window (x, y, w, h).
    function scene(kind, x, y, w, h, id) {
      var s = '<clipPath id="r4p' + id + '"><rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '"/></clipPath><g clip-path="url(#r4p' + id + ')">';
      function X(u) { return f(x + u * w); } function Y(v) { return f(y + v * h); }
      if (kind === 'sea') {
        s += '<rect x="' + X(0) + '" y="' + Y(0) + '" width="' + f(w) + '" height="' + f(h) + '" fill="#FFB58A"/><rect x="' + X(0) + '" y="' + Y(0) + '" width="' + f(w) + '" height="' + f(h * .35) + '" fill="#FF9AA8"/>';
        s += '<circle cx="' + X(.55) + '" cy="' + Y(.58) + '" r="' + f(w * .2) + '" fill="#FFE27A"/>';
        s += '<rect x="' + X(0) + '" y="' + Y(.6) + '" width="' + f(w) + '" height="' + f(h * .4) + '" fill="#2F7FB8"/>';
        [.7, .8, .9].forEach(function (v, i) { s += '<path d="M' + X(.1 + i * .08) + ' ' + Y(v) + ' h' + f(w * (.5 - i * .1)) + '" stroke="#BFE4F5" stroke-width=".5" stroke-linecap="round"/>'; });
      } else if (kind === 'hills') {
        s += '<rect x="' + X(0) + '" y="' + Y(0) + '" width="' + f(w) + '" height="' + f(h) + '" fill="#A8DBF0"/>';
        s += '<ellipse cx="' + X(.2) + '" cy="' + Y(1.05) + '" rx="' + f(w * .7) + '" ry="' + f(h * .45) + '" fill="#6DBB5E"/><ellipse cx="' + X(.9) + '" cy="' + Y(1.1) + '" rx="' + f(w * .6) + '" ry="' + f(h * .42) + '" fill="#4E9E47"/>';
        s += '<rect x="' + X(.66) + '" y="' + Y(.42) + '" width="' + f(w * .05) + '" height="' + f(h * .25) + '" fill="#7A4E2D"/><circle cx="' + X(.685) + '" cy="' + Y(.4) + '" r="' + f(w * .14) + '" fill="#2F7D3A"/>';
        s += '<ellipse cx="' + X(.28) + '" cy="' + Y(.22) + '" rx="' + f(w * .16) + '" ry="' + f(h * .06) + '" fill="#fff"/><ellipse cx="' + X(.38) + '" cy="' + Y(.18) + '" rx="' + f(w * .1) + '" ry="' + f(h * .07) + '" fill="#fff"/>';
      } else {
        s += '<rect x="' + X(0) + '" y="' + Y(0) + '" width="' + f(w) + '" height="' + f(h) + '" fill="#8FD0F2"/>';
        s += '<rect x="' + X(0) + '" y="' + Y(.82) + '" width="' + f(w) + '" height="' + f(h * .2) + '" fill="#F2D59B"/>';
        s += '<polygon points="' + X(.62) + ',' + Y(.12) + ' ' + X(.8) + ',' + Y(.3) + ' ' + X(.62) + ',' + Y(.55) + ' ' + X(.44) + ',' + Y(.3) + '" fill="' + RED + '"/>';
        s += '<path d="M' + X(.62) + ' ' + Y(.12) + ' L' + X(.62) + ' ' + Y(.55) + ' M' + X(.44) + ' ' + Y(.3) + ' L' + X(.8) + ' ' + Y(.3) + '" stroke="#FFE27A" stroke-width=".35"/>';
        s += '<path d="M' + X(.62) + ' ' + Y(.55) + ' q' + f(-w * .1) + ' ' + f(h * .1) + ' ' + f(-w * .05) + ' ' + f(h * .2) + ' t' + f(-w * .08) + ' ' + f(h * .14) + '" fill="none" stroke="' + INK + '" stroke-width=".3"/>';
        s += '<ellipse cx="' + X(.2) + '" cy="' + Y(.2) + '" rx="' + f(w * .14) + '" ry="' + f(h * .06) + '" fill="#fff"/>';
      }
      return s + '</g>';
    }
    function tape(cx, cy, w, rot, col) {
      return '<rect x="' + f(cx - w / 2) + '" y="' + f(cy - 1.5) + '" width="' + f(w) + '" height="3" fill="' + col + '" opacity=".78" transform="rotate(' + rot + ' ' + f(cx) + ' ' + f(cy) + ')"/>';
    }
    function polaroid(x, y, w, rot, kind, id, tcol) {
      var h = w * 1.2, p = w * .07, ph = w - 2 * p;
      return '<g transform="rotate(' + rot + ' ' + f(x + w / 2) + ' ' + f(y + h / 2) + ')"><rect x="' + f(x + .6) + '" y="' + f(y + .8) + '" width="' + f(w) + '" height="' + f(h) + '" fill="#000" opacity=".16"/>'
        + '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" fill="#FFFDF8"/>' + scene(kind, x + p, y + p, ph, ph, id)
        + tape(x + w / 2, y + .4, w * .45, -4, tcol) + '</g>';
    }
    function torn(y, HH, id) { // a torn strip of white paper across the bottom
      var d = 'M0 ' + f(y + 1), i = 0;
      for (var x = 0; x <= 100; x += 2.5) d += ' L' + f(x) + ' ' + f(y + ((i++ % 2) ? 0 : 1.1) + (x % 7) * .05);
      return '<path d="' + d + ' L100 ' + f(HH) + ' L0 ' + f(HH) + 'Z" fill="#FFFDF7"/>';
    }
    function deco(HH, inner, id) {
      return '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id="r4g' + id + '" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M4 0H0V4" fill="none" stroke="#D9C59F" stroke-width=".12"/></pattern></defs>'
        + '<rect width="100" height="' + f(HH) + '" fill="' + KRAFT + '"/><rect width="100" height="' + f(HH) + '" fill="url(#r4g' + id + ')"/>' + inner + '</svg>';
    }
    return {
      name: 'Scrapbook snapshots: instant photos of drawn scenes, washi tape, sticky notes, handwriting',
      fonts: 'family=Permanent+Marker&family=Kalam:wght@400;700&family=Patrick+Hand',
      css: [
        '.r4{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;background:' + KRAFT + ';color:' + INK + ';font-family:Kalam,cursive}',
        '.r4.sq{aspect-ratio:1/1}', '.r4 *{box-sizing:border-box}',
        '.r4>svg{position:absolute;inset:0;width:100%;height:100%;z-index:0}', '.r4>div{position:absolute;z-index:2}',
        '.r4 .r4-logo{background:#fff;padding:1.6cqw;display:flex;align-items:center;justify-content:center;box-shadow:.4cqw .6cqw 1cqw rgba(0,0,0,.18);transform:rotate(-3deg)}',
        '.r4 .r4-logo img{max-width:100%;max-height:100%;display:block}',
        '.r4 .r4-logo::before,.r4 .r4-n::before,.r4 .r4-qr::before{content:"";position:absolute;left:50%;top:-1.3cqw;z-index:1;width:9cqw;height:2.6cqw;margin-left:-4.5cqw;background:repeating-linear-gradient(45deg,rgba(255,138,170,.8) 0 .8cqw,rgba(255,206,220,.8) .8cqw 1.6cqw);transform:rotate(-4deg)}',
        '.r4 .r4-kick{font-weight:700;font-size:3cqw;color:' + RED + ';transform:rotate(-4deg);white-space:nowrap}',
        '.r4 .r4-ttl{font-family:"Permanent Marker",cursive;line-height:1.08;color:' + INK + ';white-space:nowrap}',
        '.r4 .r4-ttl span{background:linear-gradient(transparent 62%,rgba(255,214,64,.85) 62% 92%,transparent 92%)}',
        '.r4 .r4-tag{font-size:2.9cqw;line-height:1.25;color:' + BLUE + ';font-weight:700}',
        '.r4 .r4-n{box-shadow:.3cqw .6cqw 1cqw rgba(0,0,0,.18);padding:2.2cqw 2cqw 1.6cqw}',
        '.r4 .r4-n .d{font-family:"Permanent Marker",cursive;font-size:3.8cqw;line-height:1.05;white-space:nowrap}',
        '.r4 .r4-n .t{font-weight:700;font-size:2.3cqw;margin-top:.4cqw;white-space:nowrap}',
        '.r4 .r4-n .l{font-size:2.3cqw;line-height:1.15;margin-top:.5cqw;color:#3B3A6E}',
        '.r4 .r4-wh{background:#fff;background-image:repeating-linear-gradient(transparent 0 3.3cqw,#BCD3EE 3.3cqw 3.45cqw);border-left:.4cqw solid #E8A0A0;padding:1cqw 2cqw 1.2cqw 2.4cqw;box-shadow:.3cqw .5cqw .9cqw rgba(0,0,0,.16);transform:rotate(1.5deg);line-height:3.4cqw}',
        '.r4 .r4-wh b{font-family:"Permanent Marker",cursive;font-weight:400;font-size:2.3cqw;color:' + RED + ';margin-right:1cqw}',
        '.r4 .r4-wh span{font-weight:700;font-size:2.4cqw}', '.r4 .r4-wh i{display:block;font-style:normal;font-size:2.2cqw}',
        '.r4 .r4-ft .rg{font-family:"Permanent Marker",cursive;font-size:3.6cqw;line-height:1.1;white-space:nowrap}', '.r4 .r4-ft .rg span{color:' + RED + '}',
        '.r4 .r4-ft .sm{font-family:"Patrick Hand",cursive;font-size:1.9cqw;margin-top:.3cqw;white-space:nowrap}',
        '.r4 .r4-bd{display:flex;gap:1cqw}', '.r4 .r4-bd>span:not(.vfx-logo){font-family:"Patrick Hand",cursive;font-size:1.6cqw;border:.15cqw solid ' + INK + ';padding:.2cqw .8cqw;white-space:nowrap}',
        '.r4 .r4-bd .vfx-logo{box-shadow:0 0 0 .15cqw #D9C59F}',
        '.r4 .r4-qr::before{top:-2.2cqw}', '.r4 .r4-qr{background:#fff;padding:.7cqw;display:flex;align-items:center;justify-content:center;box-shadow:.3cqw .5cqw 1cqw rgba(0,0,0,.2);transform:rotate(2deg)}', '.r4 .r4-qr img{width:100%;height:100%;display:block}',
        '.r4 .r4-tb{background:#fff;background-image:linear-gradient(90deg,transparent 3.2cqw,#E8A0A0 3.2cqw 3.4cqw,transparent 3.4cqw);box-shadow:.3cqw .6cqw 1.2cqw rgba(0,0,0,.18);padding:.6cqw 0 .8cqw}',
        '.r4 .r4-tb .r{display:grid;grid-template-columns:40% 32% 28%;align-items:center;padding:0 2cqw 0 4.6cqw;border-bottom:.15cqw solid #BCD3EE}',
        '.r4 .r4-tb .r.th{font-family:"Permanent Marker",cursive;font-size:1.6cqw;color:' + RED + ';border-bottom:.25cqw solid ' + BLUE + '}',
        '.r4 .r4-tb .r.h{background:linear-gradient(transparent 12%,rgba(255,214,64,.75) 12% 88%,transparent 88%)}',
        '.r4 .r4-tb .lb{font-weight:700;font-size:2.3cqw;white-space:nowrap}', '.r4 .r4-tb .dy{font-size:2cqw;white-space:nowrap}', '.r4 .r4-tb .tm{font-weight:700;font-size:2.3cqw;white-space:nowrap;text-align:right}',
        '.r4 .r4-tp{font-size:2.4cqw;line-height:1.3}', '.r4 .r4-tp b{font-family:"Permanent Marker",cursive;font-weight:400;color:' + RED + ';margin-right:1cqw}',
        '.r4.sq .r4-n .d{font-size:3.2cqw}.r4.sq .r4-n .t,.r4.sq .r4-n .l{font-size:2.05cqw}.r4.sq .r4-n{padding:1.7cqw 1.6cqw 1.2cqw}.r4.sq .r4-kick{font-size:2.6cqw}',
        '.r4.sq .r4-ft .rg{font-size:3.2cqw}.r4.sq .r4-ft .sm{font-size:1.7cqw}.r4.sq .r4-tb .lb,.r4.sq .r4-tb .tm{font-size:2.05cqw}.r4.sq .r4-tb .dy{font-size:1.8cqw}.r4.sq .r4-tb .r.th{font-size:1.4cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        if (!R.zoom(spec)) partner = false;
        var HH = sq ? 100 : 129.41, S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), tag = R.tagline(spec);
        var id = (sq ? 's' : 'l') + (partner ? 'p' : 'h');
        var out = '<div class="vfx r4' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">';
        var title = function (x, y, w, cap, hMax, maxN) { var t = fit(spec, w, cap, 0.6, hMax, 1.08, maxN); return { h: t.h, html: box('r4-ttl', x, y, w, null, t.ls.map(function (l) { return '<span>' + l + '</span>'; }).join('<br>'), 'font-size:' + f(t.fs) + 'cqw') }; };
        var note = function (s, i, x, y, w) { return box('r4-n', x, y, w, null, '<div class="d">' + s.dow + ', ' + s.mon + ' ' + s.day + '</div><div class="t">' + s.time + '</div>' + (s.lesson ? '<div class="l">' + s.lesson + '</div>' : ''), 'background:' + STICKY[i] + ';transform:rotate(' + (i ? 2 : -2) + 'deg)'); };
        var whereB = function (x, y, w) { return box('r4-wh', x, y, w, null, '<b>' + W.kicker + '</b><span>' + W.line1 + '</span><i>' + W.line2 + '</i>'); };
        var foot = function (y, qs, w) {
          return box('r4-ft', sq ? 5 : 6, y, w, null, '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div>')
            + box('r4-bd', sq ? 5 : 6, y + (sq ? 8.2 : 9.2), w, null, R.badges(spec, partner))
            + box('r4-qr', (sq ? 94 : 93) - qs, HH - qs - (sq ? 3 : 3.6), qs, qs, H.qrImg(spec, partner));
        };
        var table = function (x, y, w, rh) {
          var h = '<div class="r th" style="height:' + f(rh * .85) + 'cqw"><span>where you are</span><span>day</span><span style="text-align:right">your time</span></div>';
          h += H.zoneRows(spec.sessions).map(function (r) { return '<div class="r' + (r.home ? ' h' : '') + '" style="height:' + f(rh) + 'cqw"><span class="lb">' + r.label + '</span><span class="dy">' + r.days + '</span><span class="tm">' + r.time + '</span></div>'; }).join('');
          return box('r4-tb', x, y, w, null, h);
        };
        var topics = function (x, y, w, fs) { return hasTopics(S) ? box('r4-tp', x, y, w, null, S.map(function (s) { return '<div><b>' + s.mon + ' ' + s.day + '</b>' + (s.lesson || '') + '</div>'; }).join(''), fs ? 'font-size:' + fs + 'cqw' : '') : ''; };
        var y, t, nh = hasTopics(S) ? 15.5 : 11.5;
        if (!sq && !partner) {
          out += deco(HH, polaroid(52, 4, 22, 6, 'sea', id + 'a', 'rgba(120,200,190,.9)') + polaroid(73, 11, 21, -6, 'hills', id + 'b', 'rgba(255,214,64,.9)') + torn(108, HH, id), id);
          out += box('r4-logo', 6, 6, 21, 21, R.logo(spec, partner));
          out += box('r4-kick', 30, 13, null, null, 'Come join us!');
          t = title(6, 40, 88, 12, 25, 3); out += t.html; y = 40 + t.h + 2;
          if (tag) { out += box('r4-tag', 6, y, 86, null, tag); y += nLines(tag, 86, 2.9, .5) * 3.65 + 3.6; }
          if (S.length === 1) out += note(S[0], 0, 6, y, 46); else { out += note(S[0], 0, 6, y, 42) + note(S[1], 1, 52, y, 42); }
          y += nh + 4;
          out += whereB(7, y, 50);
          out += foot(111.4, 13.5, 70);
        } else if (!sq && partner) {
          out += deco(HH, polaroid(57, 3.5, 19, 6, 'sea', id + 'a', 'rgba(120,200,190,.9)') + polaroid(76, 9, 18, -6, 'kite', id + 'b', 'rgba(255,214,64,.9)') + torn(108, HH, id), id);
          out += box('r4-logo', 6, 5, 30, 16, R.logo(spec, partner));
          out += whereB(7, 25, 44);
          t = title(6, 37, 88, 10.5, 18, 3); out += t.html; y = 37 + t.h + 1.6;
          if (tag) { out += box('r4-tag', 6, y, 86, null, tag, 'font-size:2.6cqw'); y += nLines(tag, 86, 2.6, .5) * 3.3 + 1.6; }
          if (hasTopics(S)) { out += topics(6, y, 88); y += S.length * 3.1 + 1.6; }
          out += table(6, y, 88, 3.15);
          out += foot(111.4, 13.5, 70);
        } else if (sq && !partner) {
          out += deco(HH, polaroid(58, 3, 17, 6, 'sea', id + 'a', 'rgba(120,200,190,.9)') + polaroid(76, 6.5, 17, -6, 'kite', id + 'b', 'rgba(255,214,64,.9)') + torn(79, HH, id), id);
          out += box('r4-logo', 5, 5, 15, 15, R.logo(spec, partner));
          out += box('r4-kick', 23, 9, null, null, 'Come join us!');
          t = title(5, 27.5, 90, 8.5, 16, 3); out += t.html; y = 27.5 + t.h + 1.2;
          if (tag) { out += box('r4-tag', 5, y, 90, null, tag, 'font-size:2.5cqw'); y += nLines(tag, 90, 2.5, .5) * 3.1 + 2.6; }
          if (S.length === 1) out += note(S[0], 0, 5, y, 44); else { out += note(S[0], 0, 5, y, 42) + note(S[1], 1, 51, y, 42); }
          if (S.length === 1) out += whereB(54, y + 1, 41); else out += whereB(6, y + (hasTopics(S) ? 13.6 : 10.4) + 2.4, 50);
          out += foot(82, 12, 74);
        } else {
          out += deco(HH, polaroid(74, 2.5, 15, 7, 'kite', id + 'a', 'rgba(255,214,64,.9)') + torn(82, HH, id), id);
          out += box('r4-logo', 5, 4, 23, 12.5, R.logo(spec, partner));
          out += box('r4-kick', 33, 6, null, null, 'On Zoom!');
          t = title(5, 21, 66, 7, 12, 3); out += t.html; y = 21 + t.h + 1.2;
          if (tag) { out += box('r4-tag', 5, y, 90, null, tag, 'font-size:2.2cqw'); y += nLines(tag, 90, 2.2, .5) * 2.75 + 1.4; }
          out += table(5, y, 60, 2.95);
          out += topics(68, y + .5, 27, 2);
          out += foot(85, 10.5, 76);
        }
        return out + '</div>';
      }
    };
  })());

  /* ================= R5 · Newspaper front page ================= */
  VEBFlyers.registerSet('R', 5, (function () {
    var PAPER = '#F2EEE4', INK = '#161514', RED = '#B3262C', GREY = '#BDB6A7';
    var DOWF = { Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' };
    // Column "body copy": thin grey bars that read as small newsprint without being text.
    function copy(x, y, w, h, cols, seed) {
      var s = '', gap = 2.4, cw = (w - gap * (cols - 1)) / cols, k = seed || 3;
      for (var c = 0; c < cols; c++) {
        var cx = x + c * (cw + gap);
        if (c) s += '<rect x="' + f(cx - gap / 2 - .06) + '" y="' + f(y) + '" width=".12" height="' + f(h) + '" fill="' + INK + '"/>';
        for (var yy = y + .4, i = 0; yy < y + h - .5; yy += 1.45, i++) {
          k = (k * 9301 + 49297) % 233280; var r = k / 233280, end = (i % 7 === 6) || r < .08;
          s += '<rect x="' + f(cx + (i % 7 === 0 ? 1.2 : 0)) + '" y="' + f(yy) + '" width="' + f(end ? cw * (.3 + .55 * r) : cw - (i % 7 === 0 ? 1.2 : 0)) + '" height=".55" fill="' + GREY + '"/>';
        }
      }
      return s;
    }
    function deco(HH, inner) {
      return '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true"><rect width="100" height="' + f(HH) + '" fill="' + PAPER + '"/>' + inner + '</svg>';
    }
    function rule(y, x0, x1, t) { return '<rect x="' + f(x0) + '" y="' + f(y) + '" width="' + f(x1 - x0) + '" height="' + f(t || .2) + '" fill="' + INK + '"/>'; }
    function vrule(x, y0, y1) { return '<rect x="' + f(x - .06) + '" y="' + f(y0) + '" width=".12" height="' + f(y1 - y0) + '" fill="' + INK + '"/>'; }
    return {
      name: 'Newspaper front page: broadsheet masthead, EXTRA stamp, ruled columns, serif headline',
      fonts: 'family=UnifrakturCook:wght@700&family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Libre+Baskerville:wght@400;700&family=Old+Standard+TT:wght@400;700',
      css: [
        '.r5{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;background:' + PAPER + ';color:' + INK + ';font-family:"Libre Baskerville",Georgia,serif}',
        '.r5.sq{aspect-ratio:1/1}', '.r5 *{box-sizing:border-box}',
        '.r5>svg{position:absolute;inset:0;width:100%;height:100%;z-index:0}', '.r5>div{position:absolute;z-index:2}',
        '.r5 .r5-logo{background:#fff;border:.2cqw solid ' + INK + ';display:flex;align-items:center;justify-content:center;padding:1cqw}',
        '.r5 .r5-logo img{max-width:100%;max-height:100%;display:block}',
        '.r5 .r5-mast{font-family:UnifrakturCook,serif;font-weight:700;line-height:1;text-align:center;white-space:nowrap}', '.r5 .r5-mast i{font-family:"Playfair Display",serif;font-style:normal;font-weight:700;margin-right:.04em}',
        '.r5 .r5-ear{border:.3cqw solid ' + RED + ';color:' + RED + ';text-align:center;padding:.8cqw .6cqw;transform:rotate(4deg);line-height:1.05}',
        '.r5 .r5-ear b{display:block;font-family:"Playfair Display",serif;font-weight:900;font-size:3.6cqw;letter-spacing:.02em}',
        '.r5 .r5-ear span{display:block;font-family:"Old Standard TT",serif;font-weight:700;font-size:1.25cqw;letter-spacing:.14em;margin-top:.4cqw}',
        '.r5 .r5-dl{display:flex;justify-content:space-between;font-family:"Old Standard TT",serif;font-weight:700;font-size:1.4cqw;letter-spacing:.12em;white-space:nowrap}',
        '.r5 .r5-hl{font-family:"Playfair Display",serif;font-weight:900;line-height:1.02;text-align:center;white-space:nowrap;letter-spacing:-.01em}',
        '.r5 .r5-deck{font-family:"Playfair Display",serif;font-style:italic;font-weight:400;font-size:2.75cqw;line-height:1.3;text-align:center}',
        '.r5 .r5-h{font-family:"Old Standard TT",serif;font-weight:700;font-size:1.5cqw;letter-spacing:.2em;border-bottom:.2cqw solid ' + INK + ';padding-bottom:.4cqw;margin-bottom:1cqw}',
        '.r5 .r5-col .s{margin-bottom:1.3cqw}',
        '.r5 .r5-col .d{font-family:"Playfair Display",serif;font-weight:900;font-size:2.9cqw;line-height:1.1}',
        '.r5 .r5-col .t{font-weight:700;font-size:1.85cqw;margin-top:.3cqw;white-space:nowrap}',
        '.r5 .r5-col .l{font-style:italic;font-size:1.9cqw;line-height:1.3;margin-top:.3cqw}',
        '.r5 .r5-col .w{font-family:"Playfair Display",serif;font-weight:900;font-size:2.9cqw;line-height:1.12}',
        '.r5 .r5-col .a{font-size:1.9cqw;line-height:1.35;margin-top:.4cqw}',
        '.r5 .r5-col p{margin:0;font-size:1.75cqw;line-height:1.45}',
        '.r5 .r5-col p::first-letter{font-family:"Playfair Display",serif;font-weight:900;font-size:4.2cqw;float:left;line-height:.9;margin:.25cqw .6cqw 0 0}',
        '.r5 .r5-ad{border:.25cqw solid ' + INK + ';outline:.12cqw solid ' + INK + ';outline-offset:.5cqw}',
        '.r5 .r5-ft .rg{font-family:"Playfair Display",serif;font-weight:900;font-size:3.7cqw;line-height:1.05;white-space:nowrap}', '.r5 .r5-ft .rg span{color:' + RED + '}',
        '.r5 .r5-ft .sm{font-size:1.55cqw;margin-top:.6cqw;white-space:nowrap}',
        '.r5 .r5-bd{display:flex;gap:1cqw}', '.r5 .r5-bd>span:not(.vfx-logo){font-family:"Old Standard TT",serif;font-weight:700;font-size:1.3cqw;letter-spacing:.08em;border:.15cqw solid ' + INK + ';padding:.3cqw .8cqw;white-space:nowrap}',
        '.r5 .r5-bd .vfx-logo{box-shadow:0 0 0 .15cqw ' + INK + '}',
        '.r5 .r5-qr{background:#fff;border:.2cqw solid ' + INK + ';padding:.5cqw;display:flex;align-items:center;justify-content:center}', '.r5 .r5-qr img{width:100%;height:100%;display:block}',
        '.r5 .r5-tb .r{display:grid;grid-template-columns:40% 33% 27%;align-items:center;border-bottom:.12cqw dotted ' + INK + '}',
        '.r5 .r5-tb .r.th{font-family:"Old Standard TT",serif;font-weight:700;font-size:1.3cqw;letter-spacing:.16em;border-top:.35cqw solid ' + INK + ';border-bottom:.2cqw solid ' + INK + '}',
        '.r5 .r5-tb .r.h{background:#E3DCCB;font-weight:700}', '.r5 .r5-tb .r.h .lb{color:' + RED + '}',
        '.r5 .r5-tb .lb{font-family:"Playfair Display",serif;font-weight:700;font-size:2.1cqw;white-space:nowrap;padding-left:.6cqw}', '.r5 .r5-tb .dy{font-family:"Old Standard TT",serif;font-size:1.85cqw;white-space:nowrap}', '.r5 .r5-tb .tm{font-weight:700;font-size:1.85cqw;white-space:nowrap;text-align:right;padding-right:.6cqw}',
        '.r5 .r5-tp{font-size:1.95cqw;line-height:1.4;text-align:center}', '.r5 .r5-tp b{font-family:"Old Standard TT",serif;letter-spacing:.1em;margin-right:.8cqw}', '.r5 .r5-tp i{font-family:"Playfair Display",serif}',
        '.r5.sq .r5-ear b{font-size:2.7cqw}.r5.sq .r5-ear span{font-size:1.05cqw}.r5.sq .r5-dl{font-size:1.2cqw}.r5.sq .r5-deck{font-size:2.3cqw}',
        '.r5.sq .r5-col .d,.r5.sq .r5-col .w{font-size:2.4cqw}.r5.sq .r5-col .t,.r5.sq .r5-col .a,.r5.sq .r5-col .l{font-size:1.7cqw}.r5.sq .r5-col .s{margin-bottom:.8cqw}.r5.sq .r5-h{font-size:1.3cqw;margin-bottom:.7cqw}',
        '.r5.sq .r5-ft .rg{font-size:3.2cqw}.r5.sq .r5-ft .sm{font-size:1.4cqw}.r5.sq .r5-tb .lb{font-size:1.85cqw}.r5.sq .r5-tb .dy,.r5.sq .r5-tb .tm{font-size:1.6cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        if (!R.zoom(spec)) partner = false;
        var HH = sq ? 100 : 129.41, S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), tag = R.tagline(spec);
        var yr = String((spec.sessions[0] || {}).date || '').slice(0, 4), s0 = S[0] || { dow: '', monFull: '', day: '' };
        var out = '<div class="vfx r5' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">';
        var mx = sq ? 5 : 6, X1 = 100 - mx;
        var head = function (o) { // ears, masthead, dateline; returns svg rules
          out += partner ? box('r5-logo', mx, o.y, o.lw * 1.45, o.lw * .8, R.logo(spec, partner)) : box('r5-logo', mx, o.y, o.lw, o.lw, R.logo(spec, partner));
          var mw = X1 - mx - o.lw * (partner ? 1.45 : 1) - o.ew - 3, mfs = Math.min(o.mfs, mw / (17 * 0.5));
          out += box('r5-mast', mx + o.lw * (partner ? 1.45 : 1) + 1, o.y + o.my + (o.mfs - mfs) * .5, mw, null, 'The <i>ʻ</i>Ohana Herald', 'font-size:' + f(mfs) + 'cqw');
          out += box('r5-ear', X1 - o.ew, o.y + o.ey, o.ew, null, '<b>EXTRA!</b><span>' + (partner ? 'PACIFIC EDITION' : 'FAMILY EDITION') + '</span>');
          out += box('r5-dl', mx, o.dy + .55, X1 - mx, null, '<span>' + (partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'HAWAIʻI&#8217;S FAMILY NEWS') + '</span><span>' + (DOWF[s0.dow] || '').toUpperCase() + ', ' + String(s0.monFull).toUpperCase() + ' ' + s0.day + (yr ? ', ' + yr : '') + '</span><span>' + (R.zoom(spec) ? 'LIVE ON ZOOM' : 'IN PERSON') + '</span>');
          return rule(o.dy - .9, mx, X1, .5) + rule(o.dy - .2, mx, X1, .14) + rule(o.dy + (sq ? 2.6 : 3.1), mx, X1, .2);
        };
        var hl = function (y, cap, hMax, maxN) { var t = fit(spec, X1 - mx, cap, 0.6, hMax, 1.02, maxN); out += box('r5-hl', mx, y, X1 - mx, null, t.ls.join('<br>'), 'font-size:' + f(t.fs) + 'cqw'); return t.h; };
        var when = function (x, y, w) {
          return box('r5-col', x, y, w, null, '<div class="r5-h">' + (S.length > 1 ? 'TWO DATES' : 'WHEN') + '</div>' + S.map(function (s) { return '<div class="s"><div class="d">' + DOWF[s.dow] + ', ' + s.monFull + ' ' + s.day + '</div><div class="t">' + s.time + '</div>' + (s.lesson ? '<div class="l">' + s.lesson + '</div>' : '') + '</div>'; }).join(''));
        };
        var where = function (x, y, w) { return box('r5-col', x, y, w, null, '<div class="r5-h">' + W.kicker + '</div><div class="w">' + W.line1 + '</div><div class="a">' + W.line2 + '</div>'); };
        var foot = function (y, h, qs) {
          var p = sq ? 1.8 : 2.2;
          return box('r5-ad', mx, y, X1 - mx, h, '')
            + box('r5-ft', mx + p, y + p, X1 - mx - qs - 3 * p, null, '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div>')
            + box('r5-bd', mx + p, y + p + (sq ? 7 : 8.2), X1 - mx - qs - 3 * p, null, R.badges(spec, partner))
            + box('r5-qr', X1 - qs - p, y + (h - qs) / 2, qs, qs, H.qrImg(spec, partner));
        };
        var table = function (x, y, w, rh) {
          var h = '<div class="r th" style="height:' + f(rh * .85) + 'cqw"><span style="padding-left:.6cqw">WHERE YOU ARE</span><span>DAY</span><span style="text-align:right;padding-right:.6cqw">YOUR TIME</span></div>';
          h += H.zoneRows(spec.sessions).map(function (r) { return '<div class="r' + (r.home ? ' h' : '') + '" style="height:' + f(rh) + 'cqw"><span class="lb">' + r.label + '</span><span class="dy">' + r.days + '</span><span class="tm">' + r.time + '</span></div>'; }).join('');
          return box('r5-tb', x, y, w, null, h);
        };
        var topics = function (x, y, w, align) { return hasTopics(S) ? box('r5-tp', x, y, w, null, S.map(function (s) { return '<div><b>' + s.mon.toUpperCase() + ' ' + s.day + '</b><i>' + (s.lesson || '') + '</i></div>'; }).join(''), align ? 'text-align:' + align : '') : ''; };
        var art = '', y, h, sh = hasTopics(S) ? 10.6 : 7.4;
        if (!sq && !partner) {
          art += head({ y: 4.5, lw: 15, my: 3.6, mfs: 7, ew: 16, ey: 2.2, dy: 22.4 });
          y = 29.5; h = hl(y, 11.5, 26, 3); y += h + 1.6;
          if (tag) { out += box('r5-deck', mx + 4, y, X1 - mx - 8, null, tag); y += nLines(tag, X1 - mx - 8, 2.75, .46) * 3.6 + 1.2; }
          art += rule(y, mx, X1, .14) + rule(y + .5, mx, X1, .14); y += 2.4;
          var colH = Math.max(S.length * sh + 4, 15);
          out += when(mx, y, 41) + where(52, y, 42);
          art += vrule(50, y, y + colH);
          y += colH + 1.2; art += rule(y, mx, X1, .14);
          art += copy(mx, y + 1.4, X1 - mx, 105.5 - y - 1.4, 3, 7);
          out += foot(108, 17.4, 13.4);
        } else if (!sq && partner) {
          art += head({ y: 4.5, lw: 14, my: 3, mfs: 6, ew: 15, ey: 1.6, dy: 19.8 });
          y = 26.4; h = hl(y, 10, 19, 3); y += h + 1.4;
          if (tag) { out += box('r5-deck', mx + 4, y, X1 - mx - 8, null, tag, 'font-size:2.5cqw'); y += nLines(tag, X1 - mx - 8, 2.5, .46) * 3.25 + 1; }
          art += rule(y, mx, X1, .14) + rule(y + .5, mx, X1, .14); y += 2;
          if (hasTopics(S)) { out += topics(mx, y, X1 - mx); y += S.length * 2.75 + 1.4; }
          out += table(mx, y, X1 - mx, 3.25); y += 3.25 * 7.85 + 1.6;
          art += copy(mx, y, X1 - mx, 105.5 - y, 3, 11);
          out += foot(108, 17.4, 13.4);
        } else if (sq && !partner) {
          art += head({ y: 3.5, lw: 11, my: 2.6, mfs: 5.2, ew: 13, ey: 1.4, dy: 16.4 });
          y = 21.4; h = hl(y, 8, 15, 3); y += h + 1;
          if (tag) { out += box('r5-deck', mx + 3, y, X1 - mx - 6, null, tag); y += nLines(tag, X1 - mx - 6, 2.3, .46) * 3 + .8; }
          art += rule(y, mx, X1, .14) + rule(y + .45, mx, X1, .14); y += 2;
          var cH = Math.max(S.length * (hasTopics(S) ? 9 : 6.4) + 3.5, 12);
          out += when(mx, y, 43) + where(53, y, 42);
          art += vrule(50.5, y, y + cH);
          y += cH + .8; art += rule(y, mx, X1, .14);
          art += copy(mx, y + 1.2, X1 - mx, 79 - y - 1.2, 3, 5);
          out += foot(81, 15, 11.5);
        } else {
          art += head({ y: 3.5, lw: 10, my: 2.2, mfs: 4.6, ew: 13.5, ey: 1, dy: 14.4 });
          y = 19.2; h = hl(y, 6.6, 11.5, 2); y += h + .8;
          if (tag) { out += box('r5-deck', mx + 3, y, X1 - mx - 6, null, tag, 'font-size:2.1cqw'); y += nLines(tag, X1 - mx - 6, 2.1, .46) * 2.75 + .6; }
          art += rule(y, mx, X1, .14) + rule(y + .45, mx, X1, .14); y += 1.8;
          out += table(mx, y, 60, 2.95);
          if (hasTopics(S)) out += topics(68, y + .4, X1 - 68, 'left');
          art += vrule(66.5, y, y + 23);
          art += copy(mx, y + 25, X1 - mx, 81.5 - y - 25, 2, 9);
          out += foot(83.5, 13, 10.6);
        }
        return out.replace('<div class="vfx r5' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">', '<div class="vfx r5' + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">' + deco(HH, art)) + '</div>';
      }
    };
  })());
})();
/* Virtual Event Builder: Random series, designs R6–R10 (2026-11-12, STAGE).
   R6 Gig poster · R7 Chalkboard · R8 Neon sign · R9 Tropical leaves · R10 Blueprint.
   None of them is tied to a month, season or holiday. Each fn(spec, partner, sq, H) returns one
   flyer root; every text block is its own absolutely placed direct child, art sits in one <svg>.
   Space is left open on every layout for the guest speaker box and callouts (VEBFlyers.decorate). */
(function () {
  'use strict';
  var F = window.VEBFlyers, R = F.random;

  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;' + (w != null ? 'width:' + f(w) + 'cqw;' : '') +
      (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  function plain(t) { return String(t || '').replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/g, 'x'); }
  // Best title break: the line count (1..maxN) that gives the biggest type inside w x h.
  // stack = lean towards more, shorter lines (poster look).
  function fitTitle(spec, w, h, cap, k, lh, maxN, stack) {
    var best = null;
    for (var n = 1; n <= maxN; n++) {
      var ls = R.titleLines(spec, n); if (n > 1 && ls.length < n) break;
      var fs = Math.min(R.fitSize(ls, w, cap, k), h / (ls.length * lh));
      if (!best || fs > best.fs * (stack ? 0.96 : 1.06)) best = { ls: ls, fs: fs };
    }
    return best;
  }
  function titleHtml(t) { return t.ls.map(function (l) { return '<div>' + l + '</div>'; }).join(''); }
  // Font size for a line of text in w cqw: one line if it fits at cap, else up to two lines.
  function fitText(t, w, cap, k, two) { var n = Math.max(plain(t).length, 1); return Math.min(cap, (two ? 1.8 : 1) * w / (n * k)); }
  function zoneTable(spec, p, rh, hd) {
    var rows = F.helpers.zoneRows(spec.sessions);
    return '<div class="' + p + '-tr th" style="height:' + f(rh * 0.8) + 'cqw"><span>' + hd[0] + '</span><span>' + hd[1] + '</span><span>' + hd[2] + '</span></div>' +
      rows.map(function (r) { return '<div class="' + p + '-tr' + (r.home ? ' h' : '') + '" style="height:' + f(rh) + 'cqw"><span>' + r.label + '</span><span>' + r.days + '</span><span>' + r.time + '</span></div>'; }).join('');
  }
  function lessons(b, mark) {
    var many = b.S.length > 1;
    var L = b.S.map(function (s, i) { return s.lesson ? '<div><b>' + (many ? (mark ? mark(i) : '0' + (i + 1)) : '&#9656;') + '</b><span>' + s.lesson + '</span></div>' : ''; }).join('');
    return L || '<div><b>&#9656;</b><span>' + (many ? 'Two live sessions on Zoom' : 'One live session on Zoom') + '</span></div>';
  }
  function base(spec, partner, sq) {
    var z = R.zoom(spec), part = !!(partner && z);
    return { z: z, part: part, sq: !!sq, HH: sq ? 100 : 129.41, key: (part ? 'p' : 'h') + (sq ? 'q' : 'l'), S: R.sessions(spec), W: R.where(spec),
             reg: R.register(spec, part), bd: R.badges(spec, part), logo: R.logo(spec, part), qr: F.helpers.qrImg(spec, part), tag: R.tagline(spec) };
  }
  function root(cls, b) { return '<div class="vfx ' + cls + (b.sq ? ' sq' : '') + (b.part ? ' partner' : '') + '">'; }
  function rootCss(c, bg, color, font) {
    return '.' + c + '{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;background:' + bg + ';color:' + color + ';font-family:' + font + '}\n' +
      '.' + c + '.sq{aspect-ratio:1/1}\n.' + c + ' *{box-sizing:border-box}\n' +
      '.' + c + ' .' + c + '-art{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:0}\n' +
      '.' + c + '>div{position:absolute;z-index:2}\n' +
      '.' + c + ' .' + c + '-logo img,.' + c + ' .' + c + '-qr img{max-width:100%;max-height:100%;display:block}\n' +
      '.' + c + ' .' + c + '-logo,.' + c + ' .' + c + '-qr{display:flex;align-items:center;justify-content:center}\n' +
      '.' + c + ' .' + c + '-qr img{width:100%;height:100%}\n' +
      '.' + c + ' .' + c + '-bd{display:flex;flex-wrap:nowrap;gap:1cqw;align-items:center}\n' +
      '.' + c + ' .' + c + '-tb{}\n.' + c + ' .' + c + '-tr{display:grid;grid-template-columns:36% 36% 28%;align-items:center;padding:0 1.2cqw}\n' +
      '.' + c + ' .' + c + '-tr span{white-space:nowrap}\n.' + c + ' .' + c + '-tr span:last-child{text-align:right}\n' +
      '.' + c + ' .' + c + '-ls div{display:flex;gap:1.4cqw;align-items:baseline;line-height:1.3}\n';
  }
  function star(cx, cy, r1, r2, n, rot) {
    var p = []; for (var i = 0; i < n * 2; i++) { var a = (rot || 0) + Math.PI * i / n, r = i % 2 ? r2 : r1; p.push(f(cx + r * Math.sin(a)) + ',' + f(cy - r * Math.cos(a))); }
    return p.join(' ');
  }
  // Deterministic little random generator for specks.
  function rng(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

  /* =================================================================================
     R6 · Gig poster: cream poster stock, black bands, huge stacked condensed type in black
     and red, a red strip for the tagline, a yellow starburst, tour-date style sessions.
     ================================================================================= */
  (function () {
    var INK = '#151515', RED = '#E4322B', YEL = '#FFC21A', PAPER = '#F2E8D5';
    var G = {
      hl: { band: 20, logo: [5, 3.5, 13.5, 13.5], kick: [21.5, 5.6], burst: [84, 17, 12], ttl: [6, 24.5, 88, 31.5], tagY: 58.5, tagH: 7.5,
            s: [6, 70, 56], wh: [65, 70, 29], ftY: 110, ft: [6, 112.6, 70], qr: [80.5, 112.4, 14], dt: 5.2, sm: 1 },
      pl: { band: 18, logo: [5, 3, 25, 12], kick: [32, 4.8], burst: [86, 14.5, 10.5], ttl: [6, 24, 88, 16.5], tagY: 42.5, tagH: 6,
            ls: [6, 51.5, 56], wh: [65, 50, 29], tb: [6, 64.5, 88, 3.9], ftY: 110, ft: [6, 112.6, 70], qr: [80.5, 112.4, 14], sm: 1 },
      hq: { band: 15, logo: [4, 2.5, 10.5, 10.5], kick: [16.5, 3.6], burst: [87.5, 13, 9.5], ttl: [5, 18, 74, 20.5], tagY: 40.5, tagH: 5.5,
            s: [5, 49.5, 54], wh: [62, 49.5, 33], ftY: 84, ft: [5, 85.9, 72], qr: [83, 86, 12], dt: 4.4, sm: 0.86 },
      pq: { band: 13, logo: [4, 2, 19, 9], kick: [25, 2.9], burst: [89, 11.5, 8.5], ttl: [5, 15, 74, 12], tagY: 28.5, tagH: 4.6,
            ls: [5, 35, 56], wh: [62, 34, 33], wc: 1, tb: [5, 45.2, 90, 3.1], ftY: 85, ft: [5, 86.6, 72], qr: [84, 86.8, 11.5], sm: 0.84 }
    };
    function art(b, g) {
      var HH = b.HH, s = '<svg class="r6-art" viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
      s += '<defs><pattern id="r6dots" width="1.6" height="1.6" patternUnits="userSpaceOnUse"><circle cx=".8" cy=".8" r=".38" fill="#3a3a3a"/></pattern></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="' + PAPER + '"/>';
      // paper specks
      var r = rng(66), sp = ''; for (var i = 0; i < 140; i++) sp += 'M' + f(r() * 100) + ' ' + f(r() * HH) + 'h.25v.25h-.25z';
      s += '<path d="' + sp + '" fill="#b9ab90" opacity=".55"/>';
      // black bands (top + footer) as ONE path so it reads as background
      s += '<rect width="100" height="' + f(g.band) + '" fill="' + INK + '"/><rect y="' + f(g.ftY) + '" width="100" height="' + f(HH - g.ftY) + '" fill="' + INK + '"/>';
      s += '<rect x="0" y="0" width="100" height="' + f(g.band) + '" fill="url(#r6dots)" opacity=".55"/>';
      s += '<path d="M0 ' + f(g.band) + 'H100" stroke="' + YEL + '" stroke-width=".9"/><path d="M0 ' + f(g.ftY) + 'H100" stroke="' + YEL + '" stroke-width=".9"/>';
      // tagline strip with ragged ends
      s += '<path d="M0 ' + f(g.tagY) + 'H100V' + f(g.tagY + g.tagH) + 'H0Z" fill="' + RED + '"/>';
      s += '<path d="M0 ' + f(g.tagY + g.tagH + 0.9) + 'H100" stroke="' + INK + '" stroke-width=".35"/><path d="M0 ' + f(g.tagY - 0.9) + 'H100" stroke="' + INK + '" stroke-width=".35"/>';
      // starburst (two layers)
      var c = g.burst;
      s += '<polygon points="' + star(c[0] + 0.8, c[1] + 0.8, c[2], c[2] * 0.76, 18, 0.1) + '" fill="' + INK + '"/>';
      s += '<polygon points="' + star(c[0], c[1], c[2], c[2] * 0.76, 18, 0.1) + '" fill="' + YEL + '" stroke="' + INK + '" stroke-width=".35"/>';
      s += '<circle cx="' + f(c[0]) + '" cy="' + f(c[1]) + '" r="' + f(c[2] * 0.62) + '" fill="none" stroke="' + RED + '" stroke-width=".45" stroke-dasharray="1 .7"/>';
      // little sparks either side of the tagline strip
      [[3, g.tagY - 3.2], [97, g.tagY + g.tagH + 3.2]].forEach(function (p) { s += '<polygon points="' + star(p[0], p[1], 1.6, 0.45, 4) + '" fill="' + RED + '"/>'; });
      return s + '</svg>';
    }
    F.registerSet('R', 6, {
      name: 'Gig poster: huge stacked condensed type, black bands, red strip, yellow starburst',
      fonts: 'family=Anton&family=Oswald:wght@400;500;600;700',
      css: [
        rootCss('r6', PAPER, INK, 'Oswald,"Arial Narrow",sans-serif'),
        '.r6 .r6-logo{background:#fff;border-radius:1cqw;padding:1cqw;box-shadow:.6cqw .6cqw 0 ' + YEL + '}',
        '.r6 .r6-kick{color:' + YEL + ';font-weight:700;letter-spacing:.26em;text-transform:uppercase;line-height:1.45;white-space:nowrap}',
        '.r6 .r6-kick b{display:block;color:#fff;font-family:Anton,Impact,sans-serif;font-weight:400;letter-spacing:.04em}',
        '.r6 .r6-burst{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;font-family:Anton,Impact,sans-serif;color:' + INK + ';line-height:1;transform:rotate(12deg);text-transform:uppercase;white-space:nowrap}',
        '.r6 .r6-burst small{font-family:Oswald,sans-serif;font-weight:700;letter-spacing:.14em;color:' + RED + '}',
        '.r6 .r6-ttl{font-family:Anton,Impact,sans-serif;text-transform:uppercase;line-height:.93;display:flex;flex-direction:column;justify-content:center}',
        '.r6 .r6-ttl div{white-space:nowrap}.r6 .r6-ttl div:nth-child(even){color:' + RED + '}',
        '.r6 .r6-tag{color:#fff;font-weight:600;text-transform:uppercase;letter-spacing:.05em;text-align:center;display:flex;align-items:center;justify-content:center;line-height:1.1}',
        '.r6 .r6-s .it{display:grid;grid-template-columns:auto 1fr;gap:2.2cqw;align-items:center;padding:1.1cqw 0;border-bottom:.3cqw dashed ' + INK + '}',
        '.r6 .r6-s .it:last-child{border-bottom:0}',
        '.r6 .r6-s .d{font-family:Anton,Impact,sans-serif;color:' + RED + ';line-height:.95;white-space:nowrap;text-transform:uppercase}',
        '.r6 .r6-s .d small{display:block;color:' + INK + ';font-size:.42em;letter-spacing:.2em;font-family:Oswald,sans-serif;font-weight:700}',
        '.r6 .r6-s .t{font-weight:700;white-space:nowrap;text-transform:uppercase;letter-spacing:.02em}',
        '.r6 .r6-s .l{font-weight:500;line-height:1.15;margin-top:.3cqw}',
        '.r6 .r6-wh{background:' + INK + ';color:#fff;padding:1.4cqw 1.8cqw;transform:rotate(-1.5deg);box-shadow:.7cqw .7cqw 0 ' + RED + '}',
        '.r6 .r6-wh .k{font-family:Anton,Impact,sans-serif;color:' + YEL + ';letter-spacing:.04em;line-height:1}',
        '.r6 .r6-wh .a{font-weight:600;line-height:1.2;margin-top:.6cqw}.r6 .r6-wh .b{font-weight:400;line-height:1.2;color:#ddd;margin-top:.2cqw}',
        '.r6 .r6-ls{font-weight:600;text-transform:uppercase;letter-spacing:.02em}.r6 .r6-ls b{font-family:Anton,Impact,sans-serif;color:' + RED + ';font-weight:400}',
        '.r6 .r6-tb{border:.35cqw solid ' + INK + ';background:#fff}',
        '.r6 .r6-tr{border-bottom:.15cqw solid #cdbf9f}.r6 .r6-tr:last-child{border-bottom:0}',
        '.r6 .r6-tr.th{background:' + INK + ';color:' + YEL + ';font-weight:700;letter-spacing:.14em;border-bottom:0}',
        '.r6 .r6-tr span:nth-child(1){font-weight:600;text-transform:uppercase}.r6 .r6-tr span:nth-child(3){font-family:Anton,Impact,sans-serif;font-size:1.12em}',
        '.r6 .r6-tr.h{background:' + YEL + '}',
        '.r6 .r6-ft{color:#fff}',
        '.r6 .r6-ft .rg{font-family:Anton,Impact,sans-serif;letter-spacing:.02em;line-height:1.05;white-space:nowrap}.r6 .r6-ft .rg span{color:' + YEL + '}',
        '.r6 .r6-ft .sm{font-weight:400;line-height:1.3;color:#e9e4d8;margin-top:.5cqw;white-space:nowrap}',
        '.r6 .r6-ft .r6-bd{margin-top:1.1cqw}.r6 .r6-bd span:not(.vfx-logo){border:.15cqw solid ' + YEL + ';padding:.3cqw .8cqw;font-weight:600;text-transform:uppercase;font-size:1.3cqw}',
        '.r6 .r6-qr{background:#fff;padding:.6cqw;box-shadow:.6cqw .6cqw 0 ' + RED + '}'
      ].join('\n'),
      fn: function (spec, partner, sq) {
        var b = base(spec, partner, sq), g = G[b.key], k = g.sm, out = root('r6', b);
        out += art(b, g);
        out += box('r6-logo', g.logo[0], g.logo[1], g.logo[2], g.logo[3], b.logo);
        out += box('r6-kick', g.kick[0], g.kick[1], null, null, (b.part ? 'For families across the Pacific' : 'LDAH presents') +
          '<b style="font-size:' + f((b.sq ? 4 : 4.8) * (b.key === 'pq' ? 0.85 : 1)) + 'cqw">' + (b.part ? 'LIVE ON ZOOM' : 'ALL FAMILIES WELCOME') + '</b>', 'font-size:' + f(1.65 * k) + 'cqw');
        var c = g.burst, bw = c[2] * 1.25;
        out += box('r6-burst', c[0] - bw / 2, c[1] - bw / 2, bw, bw, b.z ? '<span style="font-size:' + f(c[2] * 0.36) + 'cqw">LIVE</span><small style="font-size:' + f(c[2] * 0.15) + 'cqw">ON ZOOM</small>'
          : '<small style="font-size:' + f(c[2] * 0.15) + 'cqw">COME</small><span style="font-size:' + f(c[2] * 0.3) + 'cqw">IN</span><span style="font-size:' + f(c[2] * 0.2) + 'cqw">PERSON</span>');
        var t = fitTitle(spec, g.ttl[2], g.ttl[3], b.sq ? 13 : 17, 0.47, 0.93, b.key === 'pq' ? 2 : 3, true);
        out += box('r6-ttl', g.ttl[0], g.ttl[1], g.ttl[2], g.ttl[3], titleHtml(t), 'font-size:' + f(t.fs) + 'cqw');
        if (b.tag) out += box('r6-tag', 4, g.tagY, 92, g.tagH, b.tag, 'font-size:' + f(fitText(b.tag, 90, g.tagH * 0.5, 0.58)) + 'cqw;white-space:nowrap');
        var w = b.W;
        out += box('r6-wh', g.wh[0], g.wh[1], g.wh[2], null, '<div class="k" style="font-size:' + f(4 * k) + 'cqw">' + w.kicker + '</div>' + (g.wc
          ? '<div class="a" style="font-size:' + f(fitText(w.line1 + ' ' + w.line2, g.wh[2] - 4, 2 * k, 0.45)) + 'cqw;white-space:nowrap">' + w.line1 + ' ' + w.line2 + '</div>'
          : '<div class="a" style="font-size:' + f(2.15 * k) + 'cqw">' + w.line1 + '</div><div class="b" style="font-size:' + f(1.9 * k) + 'cqw">' + w.line2 + '</div>'));
        if (b.part) {
          out += box('r6-ls', g.ls[0], g.ls[1], g.ls[2], null, lessons(b), 'font-size:' + f(2.2 * k) + 'cqw');
          out += box('r6-tb', g.tb[0], g.tb[1], g.tb[2], null, zoneTable(spec, 'r6', g.tb[3], ['WHERE YOU ARE', 'DAY', 'YOUR TIME']), 'font-size:' + f(1.95 * k) + 'cqw');
        } else {
          out += box('r6-s', g.s[0], g.s[1], g.s[2], null, b.S.map(function (s) {
            return '<div class="it"><div class="d" style="font-size:' + f(g.dt) + 'cqw"><small>' + s.dow + '</small>' + s.mon + ' ' + s.day + '</div><div><div class="t" style="font-size:' + f(2.25 * k) + 'cqw">' + s.time + '</div>' +
              (s.lesson ? '<div class="l" style="font-size:' + f(2.15 * k) + 'cqw">' + s.lesson + '</div>' : '') + '</div></div>';
          }).join(''));
        }
        out += box('r6-ft', g.ft[0], g.ft[1], g.ft[2], b.HH - g.ft[1] - 1.5, '<div class="rg" style="font-size:' + f(4.1 * k) + 'cqw">' + b.reg.big + '</div><div class="sm" style="font-size:' + f(1.75 * k) + 'cqw">' + b.reg.small + '</div><div class="r6-bd">' + b.bd + '</div>');
        out += box('r6-qr', g.qr[0], g.qr[1], g.qr[2], g.qr[2], b.qr);
        return out + '</div>';
      }
    });
  })();

  /* =================================================================================
     R7 · Chalkboard: slate board in a wooden frame, chalk lettering, chalk doodles,
     taped paper notes for the logo and the QR code, chalk tray at the bottom.
     ================================================================================= */
  (function () {
    var SLATE = '#2E3B35', CHALK = '#F4F1E6', YEL = '#F6E27F', PINK = '#F7A9B8', BLUE = '#A6DAF2';
    var G = {
      hl: { fr: 3.6, logo: [7.5, 7, 15, 15], qr: [77.5, 7, 15], kick: [26, 8.5, 48], ttl: [8, 24.5, 84, 29.5], tag: [8, 57.8, 84, 6], s: [9, 68, 52], wh: [64.5, 68, 27], ft: [8, 107.5, 84], sm: 1 },
      pl: { fr: 3.6, logo: [7.5, 6.5, 24, 12], qr: [79, 6.5, 13.5], kick: [34, 7.5, 42], ttl: [8, 21.5, 84, 17], tag: [8, 41, 84, 5], ls: [9, 48.5, 52], wh: [64.5, 48, 27], tb: [8, 60, 84, 3.85], ft: [8, 107.5, 84], sm: 1 },
      hq: { fr: 3, logo: [6, 5.5, 11.5, 11.5], qr: [82.5, 5.5, 11.5], kick: [20, 6.5, 60], ttl: [7, 19, 86, 18], tag: [7, 39.3, 86, 4.6], s: [8, 47, 50], wh: [61, 47, 31], ft: [7, 81, 86], sm: 0.85 },
      pq: { fr: 3, logo: [5.5, 5, 19, 9.5], qr: [84, 5, 10.5], kick: [27, 6, 54], ttl: [7, 15.5, 86, 10.5], tag: [7, 27.6, 86, 3.8], ls: [8, 33.4, 50], wh: [60, 32.6, 33], wc: 1, tb: [7, 41.8, 86, 2.95], ft: [7, 83.6, 86], sm: 0.8 }
    };
    function art(b, g) {
      var HH = b.HH, F0 = g.fr, s = '<svg class="r7-art" viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
      s += '<defs><linearGradient id="r7wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#A86F3D"/><stop offset=".5" stop-color="#8A5527"/><stop offset="1" stop-color="#6E4019"/></linearGradient>' +
        '<radialGradient id="r7slate" cx=".5" cy=".42" r=".75"><stop offset="0" stop-color="#3A4A42"/><stop offset="1" stop-color="#1F2925"/></radialGradient></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="url(#r7slate)"/>';
      // chalk dust smudges and erased swirls: one path each, spread over the whole board
      var r = rng(77), d = '';
      for (var i = 0; i < 9; i++) { var cx = 8 + r() * 84, cy = 8 + r() * (HH - 16), rx = 8 + r() * 16, ry = 3 + r() * 6;
        d += 'M' + f(cx - rx) + ' ' + f(cy) + 'a' + f(rx) + ' ' + f(ry) + ' 0 1 0 ' + f(rx * 2) + ' 0a' + f(rx) + ' ' + f(ry) + ' 0 1 0 ' + f(-rx * 2) + ' 0Z'; }
      s += '<path d="' + d + '" fill="#fff" opacity=".045"/>';
      var sw = ''; for (i = 0; i < 6; i++) { var y = 10 + r() * (HH - 20), x = 6 + r() * 40; sw += 'M' + f(x) + ' ' + f(y) + 'q' + f(14 + r() * 10) + ' ' + f(-4 - r() * 3) + ' ' + f(30 + r() * 20) + ' ' + f(r() * 3 - 1); }
      s += '<path d="' + sw + 'M5 5L95 ' + f(HH - 5) + '" stroke="#fff" stroke-width="2.4" opacity=".03" fill="none" stroke-linecap="round"/>';
      var dust = ''; for (i = 0; i < 220; i++) dust += 'M' + f(F0 + r() * (100 - 2 * F0)) + ' ' + f(F0 + r() * (HH - 2 * F0)) + 'h.18v.18h-.18z';
      s += '<path d="' + dust + '" fill="#fff" opacity=".22"/>';
      // wooden frame (ring) + grain + inner shadow line
      [[0, 0, 100, F0], [0, HH - F0, 100, F0], [0, 0, F0, HH], [100 - F0, 0, F0, HH]].forEach(function (q) { s += '<rect x="' + f(q[0]) + '" y="' + f(q[1]) + '" width="' + f(q[2]) + '" height="' + f(q[3]) + '" fill="url(#r7wood)"/>'; });
      var gr = ''; for (i = 0; i < 4; i++) { var o = 0.6 + i * 0.75; gr += 'M0 ' + f(o) + 'H100M0 ' + f(HH - o) + 'H100M' + f(o) + ' 0V' + f(HH) + 'M' + f(100 - o) + ' 0V' + f(HH); }
      s += '<path d="' + gr + '" stroke="#5A3412" stroke-width=".12" opacity=".55"/>';
      s += '<path fill="none" stroke="#1a120a" stroke-width=".35" d="M' + F0 + ' ' + F0 + 'V' + f(HH - F0) + 'H' + f(100 - F0) + 'V' + F0 + 'Z"/>';
      // chalk pieces + eraser on the tray
      var ty = HH - F0 * 0.62;
      s += '<rect x="64" y="' + f(ty - 0.75) + '" width="6" height="1.3" rx=".6" fill="#F4F1E6"/><rect x="72" y="' + f(ty - 0.7) + '" width="4" height="1.2" rx=".6" fill="' + PINK + '"/>';
      s += '<rect x="80" y="' + f(ty - 1.2) + '" width="10" height="2.2" rx=".4" fill="#3B3B3B"/><rect x="80" y="' + f(ty - 1.2) + '" width="10" height=".9" fill="#C9B48A"/>';
      // tape for the logo note and the QR note
      function tape(x, y, rot) { return '<rect x="' + f(x - 3.5) + '" y="' + f(y - 1) + '" width="7" height="2" fill="#F3E8C8" opacity=".85" transform="rotate(' + rot + ' ' + f(x) + ' ' + f(y) + ')"/>'; }
      s += tape(g.logo[0] + g.logo[2] / 2, g.logo[1] - 0.2, -8) + tape(g.qr[0] + g.qr[2] / 2, g.qr[1] - 0.2, 6);
      // doodles: underline under the title, stars, arrows, a heart, a swirl
      var ub = g.ttl[1] + g.ttl[3] + (b.sq ? 0.8 : 1.4), ux = 50, uw = 30;
      s += '<path d="M' + f(ux - uw) + ' ' + f(ub) + 'q' + f(uw) + ' -1.6 ' + f(uw * 2) + ' .2M' + f(ux - uw + 4) + ' ' + f(ub + 1) + 'q' + f(uw - 4) + ' -1.2 ' + f(uw * 2 - 8) + ' .1" stroke="' + YEL + '" stroke-width=".5" fill="none" stroke-linecap="round" opacity=".9"/>';
      function st(x, y, rr, c) { return '<polygon points="' + star(x, y, rr, rr * 0.42, 5) + '" fill="none" stroke="' + c + '" stroke-width=".35" stroke-linejoin="round" opacity=".9"/>'; }
      var ks = g.kick, sy = ks[1] + 1.8;
      s += st(ks[0] + 1.5, sy, 1.5, YEL) + st(ks[0] + ks[2] - 1.5, sy, 1.5, YEL);
      s += st(6.8, g.ttl[1] + g.ttl[3] * 0.5, 1.6, PINK) + st(93.2, g.ttl[1] + g.ttl[3] * 0.35, 1.3, BLUE);
      // arrow from the tagline down towards the sessions
      var ay = g.tag[1] + g.tag[3] + 0.6;
      s += '<path d="M' + f(b.sq ? 5.5 : 6) + ' ' + f(ay - 2) + 'q.4 3 2.2 4.2m-1.8 -.1l1.8 .1l-.2 -1.8" stroke="' + CHALK + '" stroke-width=".35" fill="none" stroke-linecap="round" opacity=".85"/>';
      // arrow pointing at the register line
      var fy = g.ft[1] + 2.4;
      s += '<path d="M' + f(b.sq ? 6.5 : 8) + ' ' + f(fy - 4) + 'q1.5 3 5 3.6m-1.8 -1.4l1.8 1.4l-2 .9" stroke="' + PINK + '" stroke-width=".4" fill="none" stroke-linecap="round"/>';
      // heart + swirl in the right margin of the footer
      var hx = b.sq ? 92 : 91, hy = g.ft[1] + 3;
      s += '<path d="M' + f(hx) + ' ' + f(hy + 1.6) + 'c-2 -1.4 -2.4 -2.8 -1.3 -3.4c.7 -.4 1.2 0 1.3 .5c.1 -.5 .6 -.9 1.3 -.5c1.1 .6 .7 2 -1.3 3.4z" stroke="' + PINK + '" stroke-width=".3" fill="none"/>';
      return s + '</svg>';
    }
    F.registerSet('R', 7, {
      name: 'Chalkboard: slate board, wooden frame, chalk lettering and doodles, taped notes',
      fonts: 'family=Cabin+Sketch:wght@400;700&family=Patrick+Hand',
      css: [
        rootCss('r7', SLATE, CHALK, '"Patrick Hand","Comic Sans MS",cursive'),
        '.r7>div{text-shadow:0 0 .12cqw rgba(255,255,255,.55),.06cqw .08cqw 0 rgba(255,255,255,.18)}',
        '.r7 .r7-logo,.r7 .r7-qr{background:#FDFBF4;padding:1cqw;box-shadow:0 .5cqw 1.2cqw rgba(0,0,0,.45);text-shadow:none}',
        '.r7 .r7-logo{transform:rotate(-4deg)}.r7 .r7-qr{transform:rotate(3deg);padding:.8cqw}',
        '.r7 .r7-kick{text-align:center;color:' + YEL + ';line-height:1.15;white-space:nowrap}',
        '.r7 .r7-kick b{display:block;font-weight:400;color:' + CHALK + '}',
        '.r7 .r7-ttl{font-family:"Cabin Sketch",cursive;font-weight:700;line-height:1.02;text-align:center;display:flex;flex-direction:column;justify-content:flex-end;color:' + CHALK + '}',
        '.r7 .r7-ttl div{white-space:nowrap}',
        '.r7 .r7-tag{color:' + PINK + ';text-align:center;line-height:1.1;display:flex;align-items:center;justify-content:center}',
        '.r7 .r7-s .it{display:flex;gap:1.6cqw;align-items:flex-start;margin-bottom:1.4cqw}',
        '.r7 .r7-s .ar{font-family:"Cabin Sketch",cursive;color:' + YEL + ';line-height:1}',
        '.r7 .r7-s .d{font-family:"Cabin Sketch",cursive;font-weight:700;color:' + YEL + ';line-height:1.05;white-space:nowrap}',
        '.r7 .r7-s .t{color:' + BLUE + ';line-height:1.15;white-space:nowrap}',
        '.r7 .r7-s .l{line-height:1.12}',
        '.r7 .r7-wh{border:.32cqw dashed rgba(244,241,230,.85);border-radius:2.2cqw 1.2cqw 2.6cqw 1cqw;padding:1.4cqw 1.6cqw;transform:rotate(1.2deg)}',
        '.r7 .r7-wh .k{font-family:"Cabin Sketch",cursive;font-weight:700;color:' + PINK + ';line-height:1}',
        '.r7 .r7-wh .a{line-height:1.12;margin-top:.5cqw}.r7 .r7-wh .b{line-height:1.12;color:#d8d5ca}',
        '.r7 .r7-ls b{font-family:"Cabin Sketch",cursive;color:' + YEL + ';font-weight:700}',
        '.r7 .r7-tr{border-bottom:.18cqw dashed rgba(244,241,230,.45)}',
        '.r7 .r7-tr.th{color:' + BLUE + ';letter-spacing:.12em;border-bottom:.3cqw solid rgba(244,241,230,.8)}',
        '.r7 .r7-tr span:nth-child(3){font-family:"Cabin Sketch",cursive;font-weight:700}',
        '.r7 .r7-tr.h{color:' + YEL + ';background:rgba(246,226,127,.12)}',
        '.r7 .r7-ft{text-align:center;display:flex;flex-direction:column;align-items:center}',
        '.r7 .r7-ft .rg{font-family:"Cabin Sketch",cursive;font-weight:700;line-height:1.05;white-space:nowrap}.r7 .r7-ft .rg span{color:' + YEL + '}',
        '.r7 .r7-ft .sm{line-height:1.25;color:#e3dfd2;margin-top:.3cqw;white-space:nowrap}',
        '.r7 .r7-ft .r7-bd{margin-top:1cqw;justify-content:center}.r7 .r7-bd span:not(.vfx-logo){border:.2cqw dashed ' + CHALK + ';padding:.2cqw .8cqw;font-size:1.5cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq) {
        var b = base(spec, partner, sq), g = G[b.key], k = g.sm, out = root('r7', b);
        out += art(b, g);
        out += box('r7-logo', g.logo[0], g.logo[1], g.logo[2], g.logo[3], b.logo);
        out += box('r7-qr', g.qr[0], g.qr[1], g.qr[2], g.qr[2], b.qr);
        out += box('r7-kick', g.kick[0], g.kick[1], g.kick[2], null, (b.part ? 'for families across the Pacific' : 'LDAH presents') + '<b style="font-size:' + f(2.7 * k) + 'cqw">' + (b.part ? 'live on Zoom' : (b.z ? 'live on Zoom' : 'see you there')) + '</b>', 'font-size:' + f(2.2 * k) + 'cqw');
        var t = fitTitle(spec, g.ttl[2], g.ttl[3], b.sq ? 10.5 : 13, 0.56, 1.02, 3);
        out += box('r7-ttl', g.ttl[0], g.ttl[1], g.ttl[2], g.ttl[3], titleHtml(t), 'font-size:' + f(t.fs) + 'cqw');
        if (b.tag) out += box('r7-tag', g.tag[0], g.tag[1], g.tag[2], g.tag[3], b.tag, 'font-size:' + f(fitText(b.tag, g.tag[2], g.tag[3] * 0.62, 0.43)) + 'cqw');
        var w = b.W;
        out += box('r7-wh', g.wh[0], g.wh[1], g.wh[2], null, '<div class="k" style="font-size:' + f(3.4 * k) + 'cqw">' + w.kicker + '</div>' + (g.wc
          ? '<div class="a" style="font-size:' + f(fitText(w.line1 + ' ' + w.line2, g.wh[2] - 4, 2.4 * k, 0.44)) + 'cqw;white-space:nowrap">' + w.line1 + ' ' + w.line2 + '</div>'
          : '<div class="a" style="font-size:' + f(2.4 * k) + 'cqw">' + w.line1 + '</div><div class="b" style="font-size:' + f(2.1 * k) + 'cqw">' + w.line2 + '</div>'));
        if (b.part) {
          out += box('r7-ls', g.ls[0], g.ls[1], g.ls[2], null, lessons(b), 'font-size:' + f(2.5 * k) + 'cqw');
          out += box('r7-tb', g.tb[0], g.tb[1], g.tb[2], null, zoneTable(spec, 'r7', g.tb[3], ['Where you are', 'Day', 'Your time']), 'font-size:' + f(2.2 * k) + 'cqw');
        } else {
          out += box('r7-s', g.s[0], g.s[1], g.s[2], null, b.S.map(function (s) {
            return '<div class="it"><div class="ar" style="font-size:' + f(3.4 * k) + 'cqw">&#10230;</div><div><div class="d" style="font-size:' + f(3.4 * k) + 'cqw">' + s.dow + ', ' + s.monFull + ' ' + s.day + '</div><div class="t" style="font-size:' + f(2.45 * k) + 'cqw">' + s.time + '</div>' +
              (s.lesson ? '<div class="l" style="font-size:' + f(2.45 * k) + 'cqw">' + s.lesson + '</div>' : '') + '</div></div>';
          }).join(''));
        }
        out += box('r7-ft', g.ft[0], g.ft[1], g.ft[2], null, '<div class="rg" style="font-size:' + f(4.2 * k) + 'cqw">' + b.reg.big + '</div><div class="sm" style="font-size:' + f(2.05 * k) + 'cqw">' + b.reg.small + '</div><div class="r7-bd">' + b.bd + '</div>');
        return out + '</div>';
      }
    });
  })();

  /* =================================================================================
     R8 · Neon sign: dark brick wall, glowing pink neon-tube title in a neon frame,
     cyan and yellow neon accents, outline shapes with mounting clips.
     ================================================================================= */
  (function () {
    var PINK = '#FF3EA5', CYAN = '#2DE2FF', YEL = '#FFE45C', WALL = '#1B1316';
    var G = {
      hl: { logo: [6, 6, 15, 15], kick: [26, 7.5, 68], fr: [5, 24, 90, 33], tag: [6, 60, 88, 5.5], cards: [69, 14], wh: [12, 86, 76], ft: [6, 112.2, 70], qr: [80, 111.8, 14], sm: 1 },
      pl: { logo: [6, 5, 24, 12], kick: [32, 6.5, 62], fr: [5, 20.5, 90, 21], tag: [6, 44, 88, 5], ls: [6, 51.5, 54], wh: [63, 50.5, 31], tb: [6, 62.5, 88, 3.85], ft: [6, 112.2, 70], qr: [80, 111.8, 14], sm: 1 },
      hq: { logo: [5, 4.5, 11, 11], kick: [19, 5.4, 76], fr: [4, 18, 92, 20.5], tag: [5, 40.2, 90, 4.4], cards: [47.5, 12], wh: [12, 61.5, 76], ft: [5, 86, 74], qr: [84, 86, 11], sm: 0.85 },
      pq: { logo: [5, 4, 19, 9.5], kick: [26, 5, 69], fr: [4, 15.5, 92, 14], tag: [5, 31.5, 90, 4], ls: [5, 38, 55], wh: [61, 37.5, 34], tb: [5, 47.5, 90, 3.2], ft: [5, 86.3, 74], qr: [84.5, 86.3, 10.5], sm: 0.82 }
    };
    function art(b, g) {
      var HH = b.HH, s = '<svg class="r8-art" viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
      s += '<defs><pattern id="r8brick" width="12" height="5" patternUnits="userSpaceOnUse"><rect width="12" height="5" fill="#0E090B"/>' +
        '<rect x=".25" y=".25" width="11.5" height="2.2" rx=".2" fill="#3A2226"/><rect x="-5.75" y="2.75" width="11.5" height="2.2" rx=".2" fill="#33202A"/><rect x="6.25" y="2.75" width="11.5" height="2.2" rx=".2" fill="#2E1B1F"/>' +
        '<rect x=".25" y=".25" width="11.5" height=".5" fill="#4a2c31" opacity=".6"/></pattern>' +
        '<radialGradient id="r8vig" cx=".5" cy=".38" r=".8"><stop offset="0" stop-color="#FF3EA5" stop-opacity=".22"/><stop offset=".45" stop-color="#140c10" stop-opacity=".35"/><stop offset="1" stop-color="#050304" stop-opacity=".88"/></radialGradient>' +
        '<filter id="r8glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation=".7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="url(#r8brick)"/><rect width="100" height="' + f(HH) + '" fill="url(#r8vig)"/>';
      // neon frame around the title, with clips
      var fr = g.fr, rx = 3;
      s += '<rect x="' + f(fr[0]) + '" y="' + f(fr[1]) + '" width="' + f(fr[2]) + '" height="' + f(fr[3]) + '" rx="' + rx + '" fill="none" stroke="' + PINK + '" stroke-width=".55" filter="url(#r8glow)"/>';
      s += '<rect x="' + f(fr[0] + 1.3) + '" y="' + f(fr[1] + 1.3) + '" width="' + f(fr[2] - 2.6) + '" height="' + f(fr[3] - 2.6) + '" rx="' + (rx - 1) + '" fill="none" stroke="' + CYAN + '" stroke-width=".3" stroke-dasharray="6 1.4" filter="url(#r8glow)" opacity=".85"/>';
      [[fr[0] + 12, fr[1]], [fr[0] + fr[2] - 12, fr[1]], [fr[0] + 12, fr[1] + fr[3]], [fr[0] + fr[2] - 12, fr[1] + fr[3]]].forEach(function (p) {
        s += '<rect x="' + f(p[0] - 0.5) + '" y="' + f(p[1] - 0.9) + '" width="1" height="1.8" fill="#9aa0a6"/>'; });
      // neon outline shapes: lightning bolt top right, star, arrow towards the QR, a ring
      var top = g.kick[1] + (b.sq ? 7 : 9);
      s += '<polygon points="' + star(b.sq ? 13 : 15, g.fr[1] + g.fr[3] + (b.sq ? 0 : 0), 2.2, 0.9, 5) + '" fill="none" stroke="' + YEL + '" stroke-width=".4" filter="url(#r8glow)" opacity="0"/>';
      var ax = g.qr[0] - 1.5, ay = g.qr[1] + g.qr[2] / 2;
      s += '<path d="M' + f(ax - 6) + ' ' + f(ay) + 'H' + f(ax - 0.5) + 'M' + f(ax - 2.4) + ' ' + f(ay - 1.8) + 'L' + f(ax - 0.5) + ' ' + f(ay) + 'L' + f(ax - 2.4) + ' ' + f(ay + 1.8) + '" stroke="' + YEL + '" stroke-width=".45" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#r8glow)"/>';
      var sx = 96, sy = g.fr[1] - (b.sq ? 2.6 : 3.4);
      s += '<polygon points="' + star(sx - 3, sy, 1.8, 0.75, 5) + '" fill="none" stroke="' + YEL + '" stroke-width=".35" filter="url(#r8glow)"/>';
      s += '<circle cx="' + f(4.5) + '" cy="' + f(g.tag[1] + g.tag[3] / 2) + '" r=".9" fill="none" stroke="' + CYAN + '" stroke-width=".3" filter="url(#r8glow)"/>';
      s += '<circle cx="' + f(95.5) + '" cy="' + f(g.tag[1] + g.tag[3] / 2) + '" r=".9" fill="none" stroke="' + CYAN + '" stroke-width=".3" filter="url(#r8glow)"/>';
      // power cable hanging from the frame
      s += '<path d="M' + f(fr[0] + fr[2] - 4) + ' ' + f(fr[1] + fr[3]) + 'c0 3 -3 2.5 -3 5.5" stroke="#0a0a0a" stroke-width=".45" fill="none" opacity=".9"/>';
      void top;
      return s + '</svg>';
    }
    F.registerSet('R', 8, {
      name: 'Neon sign: dark brick wall, glowing neon-tube title, neon outline shapes',
      fonts: 'family=Tilt+Neon&family=Quicksand:wght@500;600;700',
      css: [
        rootCss('r8', WALL, '#fff', 'Quicksand,Arial,sans-serif'),
        '.r8 .r8-logo{background:#fff;border-radius:1.4cqw;padding:1cqw;box-shadow:0 0 0 .35cqw ' + CYAN + ',0 0 1.6cqw ' + CYAN + '}',
        '.r8 .r8-kick{text-align:right;font-family:"Tilt Neon",sans-serif;color:#E9FDFF;letter-spacing:.14em;text-transform:uppercase;line-height:1.3;white-space:nowrap;text-shadow:0 0 .3cqw #fff,0 0 1cqw ' + CYAN + ',0 0 2cqw ' + CYAN + '}',
        '.r8 .r8-kick b{display:block;font-weight:400;color:#FFF7CC;text-shadow:0 0 .3cqw #fff,0 0 1cqw ' + YEL + ',0 0 2cqw #E0B000}',
        '.r8 .r8-ttl{font-family:"Tilt Neon",sans-serif;text-align:center;line-height:1.08;color:#FFEAF6;display:flex;flex-direction:column;justify-content:center;text-shadow:0 0 .25cqw #fff,0 0 .9cqw ' + PINK + ',0 0 2cqw ' + PINK + ',0 0 4cqw #FF1D8E}',
        '.r8 .r8-ttl div{white-space:nowrap}',
        '.r8 .r8-tag{font-family:"Tilt Neon",sans-serif;text-align:center;color:#E3FCFF;line-height:1.15;display:flex;align-items:center;justify-content:center;text-shadow:0 0 .25cqw #fff,0 0 .9cqw ' + CYAN + ',0 0 1.8cqw ' + CYAN + '}',
        '.r8 .r8-card{border:.35cqw solid ' + YEL + ';border-radius:1.6cqw;box-shadow:0 0 1.2cqw rgba(255,228,92,.7),inset 0 0 1.2cqw rgba(255,228,92,.35);background:rgba(10,6,8,.55);padding:1.3cqw 1.6cqw;text-align:center}',
        '.r8 .r8-card .d{font-family:"Tilt Neon",sans-serif;color:#FFF9D6;line-height:1.05;white-space:nowrap;text-shadow:0 0 .25cqw #fff,0 0 1cqw ' + YEL + '}',
        '.r8 .r8-card .t{font-weight:700;color:#fff;white-space:nowrap;margin-top:.5cqw}',
        '.r8 .r8-card .l{font-weight:600;color:#FFD3EC;line-height:1.15;margin-top:.3cqw}',
        '.r8 .r8-wh{text-align:center;border:.3cqw solid ' + CYAN + ';border-radius:5cqw;box-shadow:0 0 1.2cqw rgba(45,226,255,.7),inset 0 0 1cqw rgba(45,226,255,.3);background:rgba(10,6,8,.55);padding:.9cqw 3cqw}',
        '.r8 .r8-wh .k{font-family:"Tilt Neon",sans-serif;color:#E9FDFF;letter-spacing:.16em;line-height:1.1;text-shadow:0 0 .25cqw #fff,0 0 1cqw ' + CYAN + '}',
        '.r8 .r8-wh .a{font-weight:600;line-height:1.2}',
        '.r8.partner .r8-wh,.r8 .r8-wh.col{border-radius:1.6cqw;padding:1.2cqw 1.6cqw}',
        '.r8 .r8-ls{font-weight:600}.r8 .r8-ls b{font-family:"Tilt Neon",sans-serif;color:#FFF9D6;font-weight:400;text-shadow:0 0 1cqw ' + YEL + '}',
        '.r8 .r8-tb{border:.3cqw solid ' + PINK + ';border-radius:1.4cqw;box-shadow:0 0 1.2cqw rgba(255,62,165,.6);background:rgba(10,6,8,.62);overflow:hidden}',
        '.r8 .r8-tr{border-bottom:.12cqw solid rgba(255,255,255,.14)}.r8 .r8-tr:last-child{border-bottom:0}',
        '.r8 .r8-tr.th{font-family:"Tilt Neon",sans-serif;letter-spacing:.14em;color:#E9FDFF;text-shadow:0 0 .8cqw ' + CYAN + '}',
        '.r8 .r8-tr span:nth-child(1){font-weight:700}.r8 .r8-tr span:nth-child(3){font-weight:700;color:#FFF9D6}',
        '.r8 .r8-tr.h{background:rgba(255,62,165,.28)}.r8 .r8-tr.h span{color:#fff}',
        '.r8 .r8-ft .rg{font-weight:700;line-height:1.05;white-space:nowrap}.r8 .r8-ft .rg span{font-family:"Tilt Neon",sans-serif;font-weight:400;color:#FFEAF6;text-shadow:0 0 .25cqw #fff,0 0 1cqw ' + PINK + ',0 0 2cqw ' + PINK + '}',
        '.r8 .r8-ft .sm{font-weight:500;line-height:1.3;color:#d9d2d6;margin-top:.6cqw;white-space:nowrap}',
        '.r8 .r8-ft .r8-bd{margin-top:1.1cqw}.r8 .r8-bd span:not(.vfx-logo){border:.15cqw solid ' + CYAN + ';border-radius:.6cqw;padding:.3cqw .8cqw;font-size:1.3cqw;font-weight:700}',
        '.r8 .r8-qr{background:#fff;padding:.7cqw;border-radius:1cqw;box-shadow:0 0 0 .35cqw ' + YEL + ',0 0 1.6cqw ' + YEL + '}'
      ].join('\n'),
      fn: function (spec, partner, sq) {
        var b = base(spec, partner, sq), g = G[b.key], k = g.sm, out = root('r8', b);
        out += art(b, g);
        out += box('r8-logo', g.logo[0], g.logo[1], g.logo[2], g.logo[3], b.logo);
        out += box('r8-kick', g.kick[0], g.kick[1], g.kick[2], null, (b.part ? 'For families across the Pacific' : 'LDAH presents') + '<b style="font-size:' + f(3 * k) + 'cqw">' + (b.z ? 'Live on Zoom' : 'Live and in person') + '</b>', 'font-size:' + f(2 * k) + 'cqw');
        var fr = g.fr, pad = b.sq ? 3.2 : 4;
        var t = fitTitle(spec, fr[2] - 2 * pad - 2, fr[3] - 2 * pad + 1, b.sq ? 11 : 14, 0.5, 1.08, 3);
        out += box('r8-ttl', fr[0] + pad + 1, fr[1] + pad - 0.5, fr[2] - 2 * pad - 2, fr[3] - 2 * pad + 1, titleHtml(t), 'font-size:' + f(t.fs) + 'cqw');
        if (b.tag) out += box('r8-tag', g.tag[0], g.tag[1], g.tag[2], g.tag[3], b.tag, 'font-size:' + f(fitText(b.tag, g.tag[2], g.tag[3] * 0.58, 0.5)) + 'cqw');
        var w = b.W;
        if (b.part) {
          out += box('r8-wh col', g.wh[0], g.wh[1], g.wh[2], null, '<div class="k" style="font-size:' + f(2.8 * k) + 'cqw">' + w.kicker + '</div><div class="a" style="font-size:' + f(fitText(w.line1 + ' ' + w.line2, (g.wh[2] - 3.5) * 2, 2 * k, 0.5)) + 'cqw">' + w.line1 + ' ' + w.line2 + '</div>');
          out += box('r8-ls', g.ls[0], g.ls[1], g.ls[2], null, lessons(b), 'font-size:' + f(2.3 * k) + 'cqw');
          out += box('r8-tb', g.tb[0], g.tb[1], g.tb[2], null, zoneTable(spec, 'r8', g.tb[3], ['WHERE YOU ARE', 'DAY', 'YOUR TIME']), 'font-size:' + f(2 * k) + 'cqw');
        } else {
          var two = b.S.length > 1, cw = two ? 42 : 56, cy = g.cards[0];
          b.S.forEach(function (s, i) {
            var x = two ? (i ? 52 : 6) : 22; if (b.sq) x = two ? (i ? 51.5 : 5) : 21.5;
            out += box('r8-card', x, cy, two ? (b.sq ? 43.5 : cw) : cw, null, '<div class="d" style="font-size:' + f(3.6 * k) + 'cqw">' + s.dow + ' · ' + s.mon + ' ' + s.day + '</div><div class="t" style="font-size:' + f(2.2 * k) + 'cqw">' + s.time + '</div>' +
              (s.lesson ? '<div class="l" style="font-size:' + f(2.15 * k) + 'cqw">' + s.lesson + '</div>' : ''));
          });
          var line = b.z ? w.line1 + ' ' + w.line2 : w.line1 + ' · ' + w.line2;
          out += box('r8-wh', g.wh[0], g.wh[1], g.wh[2], null, '<div class="k" style="font-size:' + f(2.8 * k) + 'cqw">' + w.kicker + '</div><div class="a" style="font-size:' + f(fitText(line, g.wh[2] - 7, 2.2 * k, 0.5)) + 'cqw">' + line + '</div>');
        }
        out += box('r8-ft', g.ft[0], g.ft[1], g.ft[2], null, '<div class="rg" style="font-size:' + f(4 * k) + 'cqw">' + b.reg.big + '</div><div class="sm" style="font-size:' + f(1.75 * k) + 'cqw">' + b.reg.small + '</div><div class="r8-bd">' + b.bd + '</div>');
        out += box('r8-qr', g.qr[0], g.qr[1], g.qr[2], g.qr[2], b.qr);
        return out + '</div>';
      }
    });
  })();

  /* =================================================================================
     R9 · Tropical leaves: deep green ground, watercolour monstera and palm leaves around a
     soft cream card; serif title in forest green, coral accents.
     ================================================================================= */
  (function () {
    var GREEN = '#1E4D3A', CORAL = '#D9644A', CREAM = '#FBF6EA', DEEP = '#123A2C';
    // [type m|p, x, y, size, rotation, 'b' = behind the card]; front leaves only cover card corners with no text.
    var HL = [['p', -4, 50, 34, 62, 'b'], ['p', 104, 30, 32, -118, 'b'], ['p', 105, 116, 24, -62, 'b'], ['m', 2, 133, 24, 45, 'b'], ['p', -5, 108, 20, 60, 'b'],
              ['m', 98, 130, 30, -45, 'b'], ['p', -3, 4, 30, 118, 'b'], ['m', 4, 4, 27, 135], ['m', 96, 4, 25, -135], ['m', 97, 125, 15, -50]];
    var HQ = [['p', -4, 64, 22, 68, 'b'], ['m', 2, 101, 22, 40, 'b'], ['p', 70, -4, 20, 170, 'b'], ['p', 104, 50, 20, -100, 'b'],
              ['m', 97, 3, 21, -135], ['m', 98, 98, 15, -45]];
    var G = {
      hl: { card: [7, 8, 86, 114], logo: [41, 11.5, 18, 12], kick: [20, 24.6, 60], ttl: [13, 28.5, 74, 26], tag: [13, 56, 74, 6.5], s: [13, 66.5, 46], wh: [63, 66.5, 25], ft: [13, 106.6, 52], qr: [68, 104.6, 14],
            leaves: HL, sm: 1 },
      pl: { card: [7, 8, 86, 114], logo: [37, 10.5, 26, 11], kick: [20, 22.6, 60], ttl: [13, 26.2, 74, 15], tag: [13, 41.8, 74, 5.2], ls: [13, 49.5, 47], wh: [63, 49, 25], tb: [12, 60.5, 76, 3.7], ft: [13, 106.6, 52], qr: [68, 104.6, 14],
            leaves: HL, sm: 1 },
      hq: { card: [5, 5, 90, 90], logo: [9, 8.5, 12, 11], kick: [24, 11.2, 45], ttl: [9, 21, 78, 16], tag: [9, 37.6, 82, 4.8], s: [9, 46.8, 47], wh: [60, 46.8, 30], ft: [24, 81.2, 56], qr: [9.5, 79.5, 12],
            leaves: HQ, sm: 0.85 },
      pq: { card: [5, 5, 90, 90], logo: [8.5, 8, 20, 9.5], kick: [31, 10.2, 40], ttl: [9, 18.8, 76, 10.5], tag: [9, 29.6, 82, 4], ls: [9, 35, 50], wh: [61, 34.6, 30], tb: [9, 44, 82, 3.1], ft: [24, 81.6, 56], qr: [9.5, 80.2, 11.5],
            leaves: HQ, sm: 0.82 }
    };
    // Monstera in leaf space: base (0,0) -> tip (0,-100). Outline + splits cut by a mask (r9cut) + a few holes.
    var MON = 'M0 -6C-16 6 -52 -6 -55 -40C-58 -74 -32 -101 0 -100C32 -101 58 -74 55 -40C52 -6 16 6 0 -6Z';
    var SLITS = [-20, -34, -48, -62, -76].map(function (y0, i) {
      return [-1, 1].map(function (sd) { return 'M' + (sd * 9) + ' ' + y0 + 'Q' + (sd * 34) + ' ' + (y0 - 4 - i) + ' ' + (sd * 72) + ' ' + (y0 - 16 - i * 2); }).join('');
    }).join('');
    var HOLES = [-27, -41, -55].map(function (y) { return [-1, 1].map(function (sd) { return '<ellipse cx="' + (sd * 17) + '" cy="' + y + '" rx="2.6" ry="4.2" fill="#000"/>'; }).join(''); }).join('');
    var VEINS = [-27, -41, -55, -69, -83].map(function (y0) { return [-1, 1].map(function (sd) { return 'M0 ' + y0 + 'Q' + (sd * 24) + ' ' + (y0 - 5) + ' ' + (sd * 44) + ' ' + (y0 - 13); }).join(''); }).join('');
    function cutMask() {
      return '<mask id="r9cut" maskUnits="userSpaceOnUse" x="-90" y="-120" width="180" height="150"><rect x="-90" y="-120" width="180" height="150" fill="#fff"/>' +
        '<path d="' + SLITS + '" stroke="#000" stroke-width="4.4" stroke-linecap="round" fill="none"/>' + HOLES + '</mask>';
    }
    function palm() {
      var d = '';
      for (var i = 0; i < 15; i++) {
        var t = 0.08 + i * 0.06, y = -100 * t, L = 34 * Math.sin(Math.PI * (0.15 + t * 0.85)) + 6;
        [-1, 1].forEach(function (sd) {
          var tx = sd * L, ty = y - L * 0.55;
          d += 'M0 ' + f(y) + 'Q' + f(tx * 0.5) + ' ' + f(y - L * 0.45 - 2.2) + ' ' + f(tx) + ' ' + f(ty) + 'Q' + f(tx * 0.5) + ' ' + f(y - L * 0.2 + 1.6) + ' 0 ' + f(y + 2.6) + 'Z';
        });
      }
      return d;
    }
    var PALM = palm();
    function leaf(l, i) {
      var type = l[0], x = l[1], y = l[2], sc = l[3] / 100, rot = l[4];
      var tr = 'translate(' + f(x) + ' ' + f(y) + ') rotate(' + rot + ') scale(' + f(sc) + ')';
      var tr2 = 'translate(' + f(x + 0.7) + ' ' + f(y + 0.9) + ') rotate(' + (rot + 5) + ') scale(' + f(sc * 1.04) + ')';
      var fill = 'url(#r9g' + (i % 3) + ')', s = '';
      if (type === 'm') {
        s += '<path d="M0 0Q2 14 -3 30" transform="' + tr + '" stroke="#245E3F" stroke-width="2.6" fill="none"/>';
        s += '<path d="' + MON + '" transform="' + tr2 + '" mask="url(#r9cut)" fill="#06231A" opacity=".18"/>';
        s += '<path d="' + MON + '" transform="' + tr + '" mask="url(#r9cut)" fill="' + fill + '" opacity=".94"/>';
        s += '<path d="M0 -4Q3 -50 0 -96' + VEINS + '" transform="' + tr + '" mask="url(#r9cut)" stroke="#D5EFCF" stroke-width="1" opacity=".32" fill="none"/>';
      } else {
        s += '<path d="M0 6Q4 -50 0 -100" transform="' + tr + '" stroke="#0F3B27" stroke-width="2.2" fill="none"/>';
        s += '<path d="' + PALM + '" transform="' + tr2 + '" fill="#3FA26E" opacity=".3"/>';
        s += '<path d="' + PALM + '" transform="' + tr + '" fill="' + fill + '" opacity=".92"/>';
      }
      return s;
    }
    function art(b, g) {
      var HH = b.HH, c = g.card, s = '<svg class="r9-art" viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
      s += '<defs><linearGradient id="r9g0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5DBB7E"/><stop offset=".55" stop-color="#2F8A57"/><stop offset="1" stop-color="#1B5E3C"/></linearGradient>' +
        '<linearGradient id="r9g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8FD19E"/><stop offset=".6" stop-color="#3E9B63"/><stop offset="1" stop-color="#226B45"/></linearGradient>' +
        '<linearGradient id="r9g2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4FAF7A"/><stop offset="1" stop-color="#17583A"/></linearGradient>' +
        cutMask() + '<radialGradient id="r9bg" cx=".3" cy=".25" r="1"><stop offset="0" stop-color="#2C6B50"/><stop offset="1" stop-color="' + DEEP + '"/></radialGradient></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="url(#r9bg)"/>';
      // watercolour wash blotches over the ground (one path, whole flyer)
      var r = rng(99), d = '';
      for (var i = 0; i < 10; i++) { var cx = r() * 100, cy = r() * HH, rr = 6 + r() * 12; d += 'M' + f(cx - rr) + ' ' + f(cy) + 'a' + f(rr) + ' ' + f(rr * 0.8) + ' 0 1 0 ' + f(rr * 2) + ' 0a' + f(rr) + ' ' + f(rr * 0.8) + ' 0 1 0 ' + f(-rr * 2) + ' 0Z'; }
      s += '<path d="' + d + '" fill="#7FC79A" opacity=".08"/>';
      // back layer leaves (behind the card)
      g.leaves.forEach(function (l, i) { if (l[5] === 'b') s += leaf(l, i); });
      // the card with a soft shadow and a paper edge
      s += '<rect x="' + f(c[0] + 0.6) + '" y="' + f(c[1] + 1) + '" width="' + f(c[2]) + '" height="' + f(c[3]) + '" rx="3.5" fill="#0b2a1e" opacity=".35"/>';
      s += '<rect x="' + f(c[0]) + '" y="' + f(c[1]) + '" width="' + f(c[2]) + '" height="' + f(c[3]) + '" rx="3.5" fill="' + CREAM + '"/>';
      s += '<rect x="' + f(c[0] + 1.6) + '" y="' + f(c[1] + 1.6) + '" width="' + f(c[2] - 3.2) + '" height="' + f(c[3] - 3.2) + '" rx="2.5" fill="none" stroke="#E7C9A8" stroke-width=".25"/>';
      // front leaves overlapping the card edges
      g.leaves.forEach(function (l, i) { if (l[5] !== 'b') s += leaf(l, i); });
      // a little leaf sprig under the tagline (Hawaiʻi letter + square)
      if (g.s) { var sy = g.tag[1] + g.tag[3] + (b.sq ? 2.5 : 1.6);
        s += '<path d="M44 ' + f(sy) + 'H56" stroke="' + CORAL + '" stroke-width=".3"/><path d="M50 ' + f(sy) + 'q-1.4 -1.6 0 -2.8q1.4 1.2 0 2.8z" fill="' + CORAL + '"/>'; }
      return s + '</svg>';
    }
    F.registerSet('R', 9, {
      name: 'Tropical leaves: watercolour monstera and palm leaves around a cream card',
      fonts: 'family=DM+Serif+Display:ital@0;1&family=Nunito+Sans:wght@400;600;700;800',
      css: [
        rootCss('r9', DEEP, '#24342C', '"Nunito Sans",Arial,sans-serif'),
        '.r9 .r9-logo{padding:.2cqw}',
        '.r9 .r9-kick{text-align:center;color:' + CORAL + ';font-weight:800;letter-spacing:.3em;text-transform:uppercase;white-space:nowrap}',
        '.r9 .r9-ttl{font-family:"DM Serif Display",Georgia,serif;color:' + GREEN + ';line-height:1.03;text-align:center;display:flex;flex-direction:column;justify-content:center}',
        '.r9 .r9-ttl div{white-space:nowrap}',
        '.r9.sq .r9-kick{text-align:left}',
        '.r9 .r9-tag{font-family:"DM Serif Display",Georgia,serif;font-style:italic;color:' + CORAL + ';text-align:center;line-height:1.15;display:flex;align-items:center;justify-content:center}',
        '.r9 .r9-s .it{display:flex;gap:1.8cqw;align-items:flex-start;margin-bottom:1.6cqw}',
        '.r9 .r9-s .pill{background:' + GREEN + ';color:#fff;border-radius:1.4cqw;text-align:center;padding:.8cqw 0;flex:0 0 auto;line-height:1}',
        '.r9 .r9-s .pill small{display:block;position:relative;z-index:1;font-weight:800;letter-spacing:.14em;line-height:1.1}.r9 .r9-s .pill b{display:block;font-family:"DM Serif Display",Georgia,serif;font-weight:400}',
        '.r9 .r9-s .t{font-weight:800;color:' + GREEN + ';white-space:nowrap}',
        '.r9 .r9-s .m{font-weight:600;color:' + CORAL + ';letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}',
        '.r9 .r9-s .l{font-weight:600;line-height:1.18;margin-top:.3cqw}',
        '.r9 .r9-wh{border-left:.5cqw solid ' + CORAL + ';padding:.4cqw 0 .4cqw 1.6cqw}',
        '.r9 .r9-wh .k{font-weight:800;color:' + CORAL + ';letter-spacing:.2em;line-height:1.1}',
        '.r9 .r9-wh .a{font-family:"DM Serif Display",Georgia,serif;color:' + GREEN + ';line-height:1.1;margin-top:.5cqw}.r9 .r9-wh .b{font-weight:600;line-height:1.2;color:#4b5a52;margin-top:.3cqw}',
        '.r9 .r9-ls{font-weight:700;color:' + GREEN + '}.r9 .r9-ls b{color:' + CORAL + ';font-weight:800}',
        '.r9 .r9-tb{border-radius:1.6cqw;overflow:hidden;background:#F3EBD9}',
        '.r9 .r9-tr.th{background:' + GREEN + ';color:#fff;font-weight:800;letter-spacing:.14em}',
        '.r9 .r9-tr{border-bottom:.12cqw solid #E2D5BB}.r9 .r9-tr:last-child{border-bottom:0}',
        '.r9 .r9-tr span:nth-child(1){font-weight:700}.r9 .r9-tr span:nth-child(3){font-weight:800;color:' + GREEN + '}',
        '.r9 .r9-tr.h{background:' + CORAL + ';color:#fff}.r9 .r9-tr.h span,.r9 .r9-tr.th span{color:#fff}',
        '.r9 .r9-ft .rg{font-family:"DM Serif Display",Georgia,serif;color:' + GREEN + ';line-height:1.05;white-space:nowrap}.r9 .r9-ft .rg span{color:' + CORAL + '}',
        '.r9 .r9-ft .sm{font-weight:600;color:#4b5a52;line-height:1.3;margin-top:.4cqw;white-space:nowrap}',
        '.r9 .r9-ft .r9-bd{margin-top:1cqw}.r9 .r9-bd .vfx-logo{box-shadow:0 0 0 .15cqw #E2D5BB}.r9 .r9-bd span:not(.vfx-logo){border:.15cqw solid ' + GREEN + ';border-radius:2cqw;padding:.3cqw 1cqw;font-size:1.3cqw;font-weight:700;color:' + GREEN + '}',
        '.r9 .r9-qr{background:#fff;padding:.7cqw;border-radius:1.2cqw;box-shadow:0 0 0 .3cqw ' + GREEN + '}'
      ].join('\n'),
      fn: function (spec, partner, sq) {
        var b = base(spec, partner, sq), g = G[b.key], k = g.sm, out = root('r9', b);
        out += art(b, g);
        out += box('r9-logo', g.logo[0], g.logo[1], g.logo[2], g.logo[3], b.logo);
        out += box('r9-kick', g.kick[0], g.kick[1], g.kick[2], null, b.part ? 'For families across the Pacific' : 'LDAH presents', 'font-size:' + f(1.7 * k) + 'cqw');
        var t = fitTitle(spec, g.ttl[2], g.ttl[3], b.sq ? 9.5 : 12, 0.5, 1.03, 3);
        out += box('r9-ttl', g.ttl[0], g.ttl[1], g.ttl[2], g.ttl[3], titleHtml(t), 'font-size:' + f(t.fs) + 'cqw');
        if (b.tag) out += box('r9-tag', g.tag[0], g.tag[1], g.tag[2], g.tag[3], b.tag, 'font-size:' + f(fitText(b.tag, g.tag[2], g.tag[3] * (b.sq ? 0.62 : 0.42), 0.46, !b.sq && b.key !== 'pl')) + 'cqw');
        var w = b.W;
        out += box('r9-wh', g.wh[0], g.wh[1], g.wh[2], null, '<div class="k" style="font-size:' + f(1.7 * k) + 'cqw">' + w.kicker + '</div><div class="a" style="font-size:' + f(2.9 * k) + 'cqw">' + w.line1 + '</div><div class="b" style="font-size:' + f(1.9 * k) + 'cqw">' + w.line2 + '</div>');
        if (b.part) {
          out += box('r9-ls', g.ls[0], g.ls[1], g.ls[2], null, lessons(b), 'font-size:' + f(2.25 * k) + 'cqw');
          out += box('r9-tb', g.tb[0], g.tb[1], g.tb[2], null, zoneTable(spec, 'r9', g.tb[3], ['WHERE YOU ARE', 'DAY', 'YOUR TIME']), 'font-size:' + f(1.9 * k) + 'cqw');
        } else {
          out += box('r9-s', g.s[0], g.s[1], g.s[2], null, b.S.map(function (s) {
            return '<div class="it"><div class="pill" style="width:' + f(9 * k) + 'cqw"><small style="font-size:' + f(1.4 * k) + 'cqw">' + s.mon.toUpperCase() + '</small><b style="font-size:' + f(4.6 * k) + 'cqw">' + s.day + '</b></div><div>' +
              '<div class="m" style="font-size:' + f(1.55 * k) + 'cqw">' + s.dow + ' · ' + s.monFull + '</div><div class="t" style="font-size:' + f(2.2 * k) + 'cqw">' + s.time + '</div>' + (s.lesson ? '<div class="l" style="font-size:' + f(2.1 * k) + 'cqw">' + s.lesson + '</div>' : '') + '</div></div>';
          }).join(''));
        }
        out += box('r9-ft', g.ft[0], g.ft[1], g.ft[2], null, '<div class="rg" style="font-size:' + f(3.7 * k) + 'cqw">' + b.reg.big + '</div><div class="sm" style="font-size:' + f(1.45 * k) + 'cqw">' + b.reg.small + '</div><div class="r9-bd">' + b.bd + '</div>');
        out += box('r9-qr', g.qr[0], g.qr[1], g.qr[2], g.qr[2], b.qr);
        return out + '</div>';
      }
    });
  })();

  /* =================================================================================
     R10 · Blueprint: blueprint blue with a white grid, drawing border with tick marks,
     dimension arrows, a gear drawing, stencil title and mono "spec" text, title-block footer.
     ================================================================================= */
  (function () {
    var BLUE = '#1D4E89', LINE = '#EAF4FF', CY = '#9FD3FF';
    var G = {
      hl: { in: 3.5, logo: [6.5, 6.5, 14, 13], kick: [23.5, 7.5], rule: 22, dim: 25, ttl: [6.5, 27, 87, 28.5], tag: [6.5, 57.6, 87, 5], s: [6.5, 66, 55], wh: [64.2, 66, 29.3], gear: [79, 96, 10],
            fty: 109.5, ft: [8.5, 111.3, 68], qr: [80, 111, 13.5], sm: 1 },
      pl: { in: 3.5, logo: [6.5, 6.2, 24, 12], kick: [33.5, 7.2], rule: 21, dim: 23.8, ttl: [6.5, 25.6, 87, 15.5], tag: [6.5, 42.2, 87, 4.6], ls: [6.5, 49.5, 54], wh: [62.5, 48.6, 31], tb: [6.5, 62.6, 87, 3.85], gear: [84, 101, 6],
            fty: 109.5, ft: [8.5, 111.3, 68], qr: [80, 111, 13.5], sm: 1 },
      hq: { in: 3, logo: [5.5, 5.5, 11, 10.5], kick: [19.5, 6.3], rule: 18, dim: 20.4, ttl: [5.5, 22, 89, 16.5], tag: [5.5, 39.6, 89, 4.2], s: [5.5, 46, 55], wh: [63.5, 46, 31], gear: [80.5, 70, 7.5],
            fty: 83.2, ft: [7, 84.6, 72], qr: [83, 84.4, 11.5], sm: 0.85 },
      pq: { in: 3, logo: [5.5, 4.8, 19, 9.5], kick: [27.5, 5.6], rule: 15.8, dim: 17.8, ttl: [5.5, 19.3, 89, 10], tag: [5.5, 30, 89, 3.8], ls: [5.5, 35.5, 54], wh: [61.5, 34.4, 33], wc: 1, tb: [5.5, 43.2, 89, 3.1],
            fty: 83.2, ft: [7, 84.6, 72], qr: [83.5, 84.4, 11], sm: 0.82 }
    };
    function gear(cx, cy, r) {
      var n = 12, d = '', ro = r, ri = r * 0.82;
      for (var i = 0; i < n * 4; i++) { var a = Math.PI * 2 * i / (n * 4), rr = (i % 4 === 0 || i % 4 === 1) ? ro : ri; d += (i ? 'L' : 'M') + f(cx + rr * Math.cos(a)) + ' ' + f(cy + rr * Math.sin(a)); }
      return d + 'Z';
    }
    function art(b, g) {
      var HH = b.HH, I = g.in, s = '<svg class="r10-art" viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
      s += '<defs><pattern id="r10min" width="2" height="2" patternUnits="userSpaceOnUse"><path d="M2 0H0V2" fill="none" stroke="#fff" stroke-width=".06" opacity=".35"/></pattern>' +
        '<pattern id="r10maj" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#fff" stroke-width=".14" opacity=".4"/></pattern>' +
        '<radialGradient id="r10bg" cx=".5" cy=".4" r=".85"><stop offset="0" stop-color="#2763A8"/><stop offset="1" stop-color="#173F70"/></radialGradient>' +
        '<marker id="r10ar" viewBox="0 0 6 6" refX="5.5" refY="3" markerWidth="3.2" markerHeight="3.2" orient="auto-start-reverse"><path d="M0 0L6 3L0 6Z" fill="' + LINE + '"/></marker></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="url(#r10bg)"/><rect width="100" height="' + f(HH) + '" fill="url(#r10min)"/><rect width="100" height="' + f(HH) + '" fill="url(#r10maj)"/>';
      // drawing border + zone ticks along the edges
      s += '<path fill="none" stroke="' + LINE + '" stroke-width=".35" d="M' + I + ' ' + I + 'H' + f(100 - I) + 'V' + f(HH - I) + 'H' + I + 'Z"/>';
      s += '<path fill="none" stroke="' + LINE + '" stroke-width=".12" d="M' + f(I - 1.4) + ' ' + f(I - 1.4) + 'H' + f(101.4 - I) + 'V' + f(HH - I + 1.4) + 'H' + f(I - 1.4) + 'Z"/>';
      var tk = ''; for (var x = 10; x < 100; x += 10) tk += 'M' + x + ' ' + f(I - 1.4) + 'V' + I + 'M' + x + ' ' + f(HH - I) + 'V' + f(HH - I + 1.4);
      for (var y = 10; y < HH; y += 10) tk += 'M' + f(I - 1.4) + ' ' + y + 'H' + I + 'M' + f(100 - I) + ' ' + y + 'H' + f(101.4 - I);
      s += '<path d="' + tk + '" stroke="' + LINE + '" stroke-width=".15"/>';
      // header rule + title dimension line
      s += '<path d="M' + I + ' ' + f(g.rule) + 'H' + f(100 - I) + '" stroke="' + LINE + '" stroke-width=".25"/>';
      var x0 = g.ttl[0], x1 = g.ttl[0] + g.ttl[2], dy = g.dim;
      s += '<path d="M' + f(x0) + ' ' + f(dy - 1.4) + 'V' + f(dy + 1.4) + 'M' + f(x1) + ' ' + f(dy - 1.4) + 'V' + f(dy + 1.4) + '" stroke="' + CY + '" stroke-width=".15"/>';
      s += '<path d="M' + f(x0 + 0.3) + ' ' + f(dy) + 'H' + f(46) + 'M' + f(54) + ' ' + f(dy) + 'H' + f(x1 - 0.3) + '" stroke="' + CY + '" stroke-width=".18" marker-start="url(#r10ar)" marker-end="url(#r10ar)"/>';
      s += '<text x="50" y="' + f(dy + 0.7) + '" text-anchor="middle" font-family="Space Mono,monospace" font-size="1.9" fill="' + CY + '">8 1/2"</text>';
      // vertical dimension beside the tagline/title block on the right edge
      var vy0 = g.ttl[1], vy1 = g.tag[1] + g.tag[3], vx = 100 - I - 1.4;
      s += '<path d="M' + f(vx) + ' ' + f(vy0 + 0.3) + 'V' + f(vy1 - 0.3) + '" stroke="' + CY + '" stroke-width=".15" marker-start="url(#r10ar)" marker-end="url(#r10ar)" opacity=".8"/>';
      // header corner note (art text, top right)
      s += '<text x="' + f(100 - I - 1.5) + '" y="' + f(g.rule - 2) + '" text-anchor="end" font-family="Space Mono,monospace" font-size="' + (b.sq ? 1.6 : 1.8) + '" fill="' + CY + '" letter-spacing=".2">SHEET 01 · REV A</text>';
      // footer title block frame
      s += '<path fill="none" stroke="' + LINE + '" stroke-width=".3" d="M' + I + ' ' + f(g.fty) + 'H' + f(100 - I) + 'M' + f(g.qr[0] - 1.6) + ' ' + f(g.fty) + 'V' + f(HH - I) + '"/>';
      // gear drawing with centre lines and a radius callout
      if (g.gear) { var c = g.gear, gx = c[0], gy = c[1], gr = c[2];
        s += '<path d="' + gear(gx, gy, gr) + '" fill="none" stroke="' + LINE + '" stroke-width=".25"/>';
        s += '<circle cx="' + f(gx) + '" cy="' + f(gy) + '" r="' + f(gr * 0.42) + '" fill="none" stroke="' + LINE + '" stroke-width=".22"/><circle cx="' + f(gx) + '" cy="' + f(gy) + '" r="' + f(gr * 0.6) + '" fill="none" stroke="' + CY + '" stroke-width=".12" stroke-dasharray=".8 .5"/>';
        s += '<path d="M' + f(gx - gr - 2) + ' ' + f(gy) + 'H' + f(gx + gr + 2) + 'M' + f(gx) + ' ' + f(gy - gr - 2) + 'V' + f(gy + gr + 2) + '" stroke="' + CY + '" stroke-width=".12" stroke-dasharray="2 .6 .4 .6"/>';
        s += '<path d="M' + f(gx) + ' ' + f(gy) + 'L' + f(gx - gr * 0.7) + ' ' + f(gy - gr * 0.7) + 'L' + f(gx - gr - 3) + ' ' + f(gy - gr * 0.7) + '" fill="none" stroke="' + CY + '" stroke-width=".15" marker-start="url(#r10ar)"/>';
        s += '<text x="' + f(gx - gr - 3) + '" y="' + f(gy - gr * 0.7 - 0.8) + '" font-family="Space Mono,monospace" font-size="1.7" fill="' + CY + '">R ' + f(gr) + '</text>'; }
      return s + '</svg>';
    }
    F.registerSet('R', 10, {
      name: 'Blueprint: blue grid, drawing border, dimension arrows, stencil title, title block',
      fonts: 'family=Saira+Stencil+One&family=Space+Mono:wght@400;700',
      css: [
        rootCss('r10', BLUE, LINE, '"Space Mono","Courier New",monospace'),
        '.r10 .r10-logo{background:#fff;padding:.9cqw;outline:.2cqw solid ' + LINE + ';outline-offset:.6cqw}',
        '.r10 .r10-kick{line-height:1.45;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;color:' + CY + '}',
        '.r10 .r10-kick b{display:block;color:#fff;font-family:"Saira Stencil One",sans-serif;font-weight:400;letter-spacing:.06em}',
        '.r10 .r10-ttl{font-family:"Saira Stencil One",Impact,sans-serif;text-transform:uppercase;color:#fff;line-height:1.02;display:flex;flex-direction:column;justify-content:center}',
        '.r10 .r10-ttl div{white-space:nowrap}',
        '.r10 .r10-tag{color:' + CY + ';line-height:1.2;display:flex;align-items:center}',
        '.r10 .r10-tag:before{content:"// ";color:#fff;white-space:pre}',
        '.r10 .r10-s{border:.25cqw solid ' + LINE + '}',
        '.r10 .r10-s .hd{display:grid;grid-template-columns:7% 93%;background:rgba(234,244,255,.14);color:' + CY + ';letter-spacing:.14em;padding:.5cqw 1cqw;border-bottom:.25cqw solid ' + LINE + '}',
        '.r10 .r10-s .it{display:grid;grid-template-columns:7% 93%;padding:.9cqw 1cqw;border-bottom:.15cqw dashed rgba(234,244,255,.5)}.r10 .r10-s .it:last-child{border-bottom:0}',
        '.r10 .r10-s .n{color:' + CY + ';font-weight:700}',
        '.r10 .r10-s .d{font-family:"Saira Stencil One",sans-serif;color:#fff;white-space:nowrap;line-height:1.1}',
        '.r10 .r10-s .t{font-weight:700;white-space:nowrap;color:' + LINE + '}',
        '.r10 .r10-s .l{color:' + CY + ';line-height:1.2;margin-top:.2cqw}',
        '.r10 .r10-wh{border:.25cqw solid ' + LINE + ';padding:1.2cqw 1.4cqw;background:rgba(23,63,112,.7)}',
        '.r10 .r10-wh .k{font-family:"Saira Stencil One",sans-serif;color:#fff;letter-spacing:.06em;line-height:1.05}',
        '.r10 .r10-wh .k:before{content:"SITE  ";font-family:"Space Mono",monospace;color:' + CY + ';font-size:.5em;letter-spacing:.14em;white-space:pre;vertical-align:middle}',
        '.r10 .r10-wh .a{font-weight:700;line-height:1.2;margin-top:.5cqw}.r10 .r10-wh .b{line-height:1.2;color:' + CY + '}',
        '.r10 .r10-ls{font-weight:700}.r10 .r10-ls b{color:' + CY + '}',
        '.r10 .r10-tb{border:.25cqw solid ' + LINE + ';background:rgba(23,63,112,.6)}',
        '.r10 .r10-tr{border-bottom:.12cqw dashed rgba(234,244,255,.4)}.r10 .r10-tr:last-child{border-bottom:0}',
        '.r10 .r10-tr.th{color:' + CY + ';letter-spacing:.14em;border-bottom:.25cqw solid ' + LINE + ';background:rgba(234,244,255,.12)}',
        '.r10 .r10-tr span:nth-child(1){font-weight:700}.r10 .r10-tr span:nth-child(3){font-family:"Saira Stencil One",sans-serif}',
        '.r10 .r10-tr.h{background:' + LINE + ';color:' + BLUE + '}',
        '.r10 .r10-ft .rg{font-family:"Saira Stencil One",sans-serif;color:#fff;line-height:1.05;white-space:nowrap}.r10 .r10-ft .rg span{color:' + CY + '}',
        '.r10 .r10-ft .sm{line-height:1.3;color:' + LINE + ';margin-top:.5cqw;white-space:nowrap}',
        '.r10 .r10-ft .r10-bd{margin-top:1cqw}.r10 .r10-bd span:not(.vfx-logo){border:.15cqw solid ' + LINE + ';padding:.25cqw .8cqw;font-size:1.25cqw}',
        '.r10 .r10-qr{background:#fff;padding:.6cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq) {
        var b = base(spec, partner, sq), g = G[b.key], k = g.sm, out = root('r10', b);
        out += art(b, g);
        out += box('r10-logo', g.logo[0], g.logo[1], g.logo[2], g.logo[3], b.logo);
        out += box('r10-kick', g.kick[0], g.kick[1], null, null, (b.part ? 'For families across the Pacific' : 'LDAH presents') + '<b style="font-size:' + f(3.4 * k) + 'cqw">' + (b.z ? 'LIVE ON ZOOM' : 'IN PERSON') + '</b>', 'font-size:' + f(1.6 * k) + 'cqw');
        var t = fitTitle(spec, g.ttl[2], g.ttl[3], b.sq ? 10 : 13, 0.68, 1.02, 3);
        out += box('r10-ttl', g.ttl[0], g.ttl[1], g.ttl[2], g.ttl[3], titleHtml(t), 'font-size:' + f(t.fs) + 'cqw');
        if (b.tag) out += box('r10-tag', g.tag[0], g.tag[1], g.tag[2], g.tag[3], b.tag, 'font-size:' + f(fitText(b.tag + '// ', g.tag[2], g.tag[3] * 0.48, 0.62)) + 'cqw;white-space:nowrap');
        var w = b.W;
        out += box('r10-wh', g.wh[0], g.wh[1], g.wh[2], null, '<div class="k" style="white-space:nowrap;font-size:' + f(fitText('SITE ' + w.kicker, g.wh[2] - 3.2, 3.2 * k, 0.66)) + 'cqw">' + w.kicker + '</div>' + (g.wc
          ? '<div class="a" style="font-size:' + f(fitText(w.line1 + ' ' + w.line2, g.wh[2] - 3.5, 1.8 * k, 0.61)) + 'cqw;white-space:nowrap">' + w.line1 + ' ' + w.line2 + '</div>'
          : '<div class="a" style="font-size:' + f(1.8 * k) + 'cqw">' + w.line1 + '</div><div class="b" style="font-size:' + f(1.6 * k) + 'cqw">' + w.line2 + '</div>'));
        if (b.part) {
          out += box('r10-ls', g.ls[0], g.ls[1], g.ls[2], null, lessons(b), 'font-size:' + f(1.95 * k) + 'cqw');
          out += box('r10-tb', g.tb[0], g.tb[1], g.tb[2], null, zoneTable(spec, 'r10', g.tb[3], ['LOCATION', 'DAY', 'YOUR TIME']), 'font-size:' + f(1.75 * k) + 'cqw');
        } else {
          out += box('r10-s', g.s[0], g.s[1], g.s[2], null, '<div class="hd" style="font-size:' + f(1.3 * k) + 'cqw"><span>NO</span><span>DATE / TIME' + (b.S.some(function (s) { return s.lesson; }) ? ' / TOPIC' : '') + '</span></div>' + b.S.map(function (s, i) {
            return '<div class="it"><div class="n" style="font-size:' + f(1.6 * k) + 'cqw">0' + (i + 1) + '</div><div><div class="d" style="font-size:' + f(3.1 * k) + 'cqw">' + s.dow + ' ' + s.mon + ' ' + s.day + '</div><div class="t" style="font-size:' + f(1.85 * k) + 'cqw">' + s.time + '</div>' +
              (s.lesson ? '<div class="l" style="font-size:' + f(1.8 * k) + 'cqw">' + s.lesson + '</div>' : '') + '</div></div>';
          }).join(''));
        }
        out += box('r10-ft', g.ft[0], g.ft[1], g.ft[2], null, '<div class="rg" style="font-size:' + f(3.6 * k) + 'cqw">' + b.reg.big + '</div><div class="sm" style="font-size:' + f(1.45 * k) + 'cqw">' + b.reg.small + '</div><div class="r10-bd">' + b.bd + '</div>');
        out += box('r10-qr', g.qr[0], g.qr[1], g.qr[2], g.qr[2], b.qr);
        return out + '</div>';
      }
    });
  })();
})();
/* Virtual Event Builder: Random series, designs R11–R15 (2026-11-12, STAGE).
   R11 Airmail letter · R12 Art Deco · R13 Bauhaus · R14 Comic book · R15 Kraft and stamps.
   Not tied to any month: staff type the event name and tagline; Zoom or in person.
   Each fn(spec, partner, sq, H) returns one flyer root. Every text block is its own absolutely
   positioned direct child; the artwork is one <svg> direct child. */
(function () {
  'use strict';
  var F = window.VEBFlyers, R = F.random;

  /* ---------- shared kit for this file ---------- */
  function f(n) { return (Math.round(n * 100) / 100).toString(); }
  function box(cls, x, y, w, h, inner, extra) {
    return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;' + (w != null ? 'width:' + f(w) + 'cqw;' : '') +
      (h != null ? 'height:' + f(h) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
  }
  // Title in a fixed box: try 1..n lines and keep the line count that gives the biggest type.
  function fitTitle(spec, w, h, o) {
    var best = null;
    for (var n = 1; n <= (o.n || 3); n++) {
      var ls = R.titleLines(spec, n); if (ls.length < n) break;
      var fs = Math.min(R.fitSize(ls, w, o.cap, o.k), h / (ls.length * o.lh));
      if (!best || fs > best.fs * 1.04) best = { fs: fs, ls: ls };
    }
    return best;
  }
  function titleBox(cls, spec, x, y, w, h, o) {
    var t = fitTitle(spec, w, h, o);
    return box(cls, x, y, w, h, t.ls.map(function (l) { return '<div>' + l + '</div>'; }).join(''),
      'font-size:' + f(t.fs) + 'cqw;line-height:' + o.lh + ';display:flex;flex-direction:column;justify-content:' + (o.v || 'center'));
  }
  function zoneTable(spec, cls, x, y, w, rh, head) {
    var rows = F.helpers.zoneRows(spec.sessions);
    var h = '<div class="r th" style="height:' + f(rh * 0.85) + 'cqw"><span>' + (head || 'WHERE YOU ARE') + '</span><span>DAY</span><span class="tr">YOUR TIME</span></div>';
    h += rows.map(function (r) {
      return '<div class="r' + (r.home ? ' h' : '') + '" style="height:' + f(rh) + 'cqw"><span class="l">' + r.label + '</span><span class="d">' + r.days + '</span><span class="t">' + r.time + '</span></div>';
    }).join('');
    return box(cls, x, y, w, null, h);
  }
  function topics(S) { return S.filter(function (s) { return s.lesson; }); }
  function root(cls, sq, partner) { return '<div class="vfx ' + cls + (sq ? ' sq' : '') + (partner ? ' partner' : '') + '">'; }
  function baseCss(c, bg, color, font) {
    return ['.' + c + '{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;background:' + bg + ';color:' + color + ';font-family:' + font + '}',
      '.' + c + '.sq{aspect-ratio:1/1}',
      '.' + c + ' *{box-sizing:border-box}',
      '.' + c + '>svg{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:0}',
      '.' + c + '>div{position:absolute;z-index:2}',
      '.' + c + ' .' + c + '-qr img{width:100%;height:100%;display:block}',
      '.' + c + ' .bd{display:flex;gap:1cqw;align-items:center;flex-wrap:nowrap}',
      '.' + c + ' .zt .r{display:grid;grid-template-columns:37% 35% 28%;align-items:center;padding:0 1.2cqw;white-space:nowrap}',
      '.' + c + ' .zt .t,.' + c + ' .zt .tr{text-align:right}'].join('\n');
  }

  /* =====================================================================
     R11 · Airmail letter: cream envelope, red/blue chevron border, perforated stamps,
     postmarks, a handwritten address for the title, typed details on postal labels.
     ===================================================================== */
  F.registerSet('R', 11, (function () {
    var PAPER = '#F7F2E6', RED = '#C8102E', BLUE = '#1F4AA8', INK = '#1B2A5E', C = 'r11';
    function stamp(x, y, w, h, kind) {
      var s = '<g>', i, n;
      s += '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" fill="#fff" filter="url(#r11sh)"/>';
      // perforations
      n = Math.round(w / 1.6); for (i = 0; i <= n; i++) { var px = x + i * w / n; s += '<circle cx="' + f(px) + '" cy="' + f(y) + '" r=".55" fill="' + PAPER + '"/><circle cx="' + f(px) + '" cy="' + f(y + h) + '" r=".55" fill="' + PAPER + '"/>'; }
      n = Math.round(h / 1.6); for (i = 0; i <= n; i++) { var py = y + i * h / n; s += '<circle cx="' + f(x) + '" cy="' + f(py) + '" r=".55" fill="' + PAPER + '"/><circle cx="' + f(x + w) + '" cy="' + f(py) + '" r=".55" fill="' + PAPER + '"/>'; }
      var ix = x + 1.4, iy = y + 1.4, iw = w - 2.8, ih = h - 2.8;
      if (kind === 'sea') {
        s += '<rect x="' + f(ix) + '" y="' + f(iy) + '" width="' + f(iw) + '" height="' + f(ih) + '" fill="#2E86AB"/>';
        s += '<circle cx="' + f(ix + iw * .68) + '" cy="' + f(iy + ih * .38) + '" r="' + f(iw * .17) + '" fill="#F6C343"/>';
        s += '<path d="M' + f(ix) + ' ' + f(iy + ih * .62) + ' q' + f(iw * .125) + ' -' + f(ih * .06) + ' ' + f(iw * .25) + ' 0 t' + f(iw * .25) + ' 0 t' + f(iw * .25) + ' 0 t' + f(iw * .25) + ' 0 V' + f(iy + ih) + ' H' + f(ix) + 'z" fill="#14507A"/>';
        s += '<path d="M' + f(ix + iw * .22) + ' ' + f(iy + ih * .6) + ' l' + f(iw * .18) + ' -' + f(ih * .34) + ' l0 ' + f(ih * .34) + 'z" fill="#fff"/><path d="M' + f(ix + iw * .12) + ' ' + f(iy + ih * .62) + ' h' + f(iw * .4) + ' l-' + f(iw * .06) + ' ' + f(ih * .05) + ' h-' + f(iw * .28) + 'z" fill="#5B3A1E"/>';
        s += '<text x="' + f(ix + .8) + '" y="' + f(iy + 2.6) + '" font-family="Oswald,sans-serif" font-weight="700" font-size="2.2" fill="#fff">50</text>';
        s += '<text x="' + f(ix + iw / 2) + '" y="' + f(iy + ih - 1) + '" text-anchor="middle" font-family="Oswald,sans-serif" font-weight="600" font-size="1.45" letter-spacing=".2" fill="#fff">HAWAIʻI</text>';
      } else {
        s += '<rect x="' + f(ix) + '" y="' + f(iy) + '" width="' + f(iw) + '" height="' + f(ih) + '" fill="' + RED + '"/>';
        s += '<g transform="translate(' + f(ix + iw / 2) + ' ' + f(iy + ih * .48) + ') rotate(-25) scale(' + f(iw / 14) + ')" fill="#fff"><path d="M-6 -.6 L4 -.6 Q6 0 4 .6 L-6 .6z"/><path d="M-1 -.5 L-3 -5 L-1.6 -5 L2 -.5z"/><path d="M-1 .5 L-3 5 L-1.6 5 L2 .5z"/><path d="M-5.4 -.4 L-6.4 -2.4 L-5.6 -2.4 L-4.2 -.4z"/></g>';
        s += '<text x="' + f(ix + iw / 2) + '" y="' + f(iy + ih - 1) + '" text-anchor="middle" font-family="Oswald,sans-serif" font-weight="600" font-size="1.4" letter-spacing=".2" fill="#fff">AIR MAIL</text>';
        s += '<text x="' + f(ix + .8) + '" y="' + f(iy + 2.6) + '" font-family="Oswald,sans-serif" font-weight="700" font-size="2.2" fill="#fff">75</text>';
      }
      return s + '</g>';
    }
    function postmark(cx, cy, r) {
      var s = '<g fill="none" stroke="' + INK + '" stroke-opacity=".62">';
      s += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" stroke-width=".35"/><circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * .64) + '" stroke-width=".22"/>';
      s += '<path id="r11pm' + Math.round(cx * 10) + '" d="M' + f(cx - r * .82) + ' ' + f(cy) + ' A' + f(r * .82) + ' ' + f(r * .82) + ' 0 0 1 ' + f(cx + r * .82) + ' ' + f(cy) + '" stroke="none"/>';
      s += '</g><text font-family="Courier Prime,monospace" font-weight="700" font-size="' + f(r * .26) + '" fill="' + INK + '" fill-opacity=".62" letter-spacing=".25"><textPath href="#r11pm' + Math.round(cx * 10) + '" startOffset="50%" text-anchor="middle">HONOLULU · HI</textPath></text>';
      s += '<text x="' + f(cx) + '" y="' + f(cy + r * .14) + '" text-anchor="middle" font-family="Courier Prime,monospace" font-weight="700" font-size="' + f(r * .3) + '" fill="' + INK + '" fill-opacity=".62">LDAH</text>';
      // wavy cancellation lines to the left
      var w = '<g fill="none" stroke="' + INK + '" stroke-opacity=".5" stroke-width=".3">';
      for (var i = -2; i <= 2; i++) {
        var yy = cy + i * r * .32, x0 = cx - r * 3.3;
        w += '<path d="M' + f(x0) + ' ' + f(yy) + ' q1.5 -1 3 0 t3 0 t3 0 t3 0 t3 0 t3 0' + '"/>';
      }
      return s + w + '</g>';
    }
    function art(HH, o) {
      var b = o.b, s = '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
      s += '<defs><pattern id="r11chev" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#fff"/><rect width="2.6" height="8" fill="' + RED + '"/><rect x="4" width="2.6" height="8" fill="' + BLUE + '"/></pattern>';
      s += '<filter id="r11sh" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx=".15" dy=".25" stdDeviation=".3" flood-opacity=".25"/></filter></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="' + PAPER + '"/>';
      // faint envelope flap lines
      s += '<path d="M' + f(b) + ' ' + f(b) + ' L50 ' + f(HH * .42) + ' L' + f(100 - b) + ' ' + f(b) + '" fill="none" stroke="#E4DAC4" stroke-width=".35"/>';
      s += '<path fill="url(#r11chev)" fill-rule="evenodd" d="M0 0H100V' + f(HH) + 'H0z M' + f(b) + ' ' + f(b) + 'V' + f(HH - b) + 'H' + f(100 - b) + 'V' + f(b) + 'z"/>';
      // stamps + postmarks
      o.stamps.forEach(function (st) { s += stamp(st[0], st[1], st[2], st[3], st[4]); });
      o.marks.forEach(function (m) { s += postmark(m[0], m[1], m[2]); });
      // BY AIR MAIL label
      if (o.label) {
        var L = o.label;
        s += '<g transform="rotate(-3 ' + f(L[0]) + ' ' + f(L[1]) + ')"><rect x="' + f(L[0]) + '" y="' + f(L[1]) + '" width="' + f(L[2]) + '" height="' + f(L[3]) + '" fill="' + BLUE + '"/>';
        s += '<rect x="' + f(L[0] + .5) + '" y="' + f(L[1] + .5) + '" width="' + f(L[2] - 1) + '" height="' + f(L[3] - 1) + '" fill="none" stroke="#fff" stroke-width=".2"/>';
        s += '<text x="' + f(L[0] + L[2] / 2) + '" y="' + f(L[1] + L[3] * .47) + '" text-anchor="middle" font-family="Oswald,sans-serif" font-weight="700" font-size="' + f(L[3] * .34) + '" letter-spacing=".35" fill="#fff">BY AIR MAIL</text>';
        s += '<text x="' + f(L[0] + L[2] / 2) + '" y="' + f(L[1] + L[3] * .8) + '" text-anchor="middle" font-family="Oswald,sans-serif" font-weight="500" font-size="' + f(L[3] * .22) + '" letter-spacing=".5" fill="#fff">PAR AVION</text></g>';
      }
      // dashed rule above the footer
      s += '<line x1="' + f(b + 3) + '" y1="' + f(o.rule) + '" x2="' + f(100 - b - 3) + '" y2="' + f(o.rule) + '" stroke="' + INK + '" stroke-opacity=".35" stroke-width=".25" stroke-dasharray="1.2 .8"/>';
      return s + '</svg>';
    }
    return {
      name: 'Airmail letter: chevron border, perforated stamps, postmarks, handwritten address',
      fonts: 'family=Caveat:wght@600;700&family=Courier+Prime:wght@400;700&family=Oswald:wght@500;600;700',
      css: [baseCss(C, PAPER, INK, '"Courier Prime",monospace'),
        '.r11 .r11-logo{display:flex;align-items:center;justify-content:center}',
        '.r11 .r11-logo img{max-width:100%;max-height:100%;display:block}',
        '.r11 .r11-from{font-family:"Courier Prime",monospace;font-size:1.6cqw;line-height:1.3;color:' + INK + '}',
        '.r11 .r11-from b{font-family:Oswald,sans-serif;font-weight:600;letter-spacing:.12em;color:' + RED + ';font-size:1.35cqw;display:block;margin-bottom:.3cqw}',
        '.r11 .r11-to{font-family:Oswald,sans-serif;font-weight:600;letter-spacing:.2em;font-size:1.5cqw;color:' + RED + '}',
        '.r11 .r11-ttl{font-family:Caveat,cursive;font-weight:700;color:' + INK + ';white-space:nowrap}',
        '.r11 .r11-ttl div{border-bottom:.22cqw solid rgba(27,42,94,.28);padding-left:1cqw}',
        '.r11 .r11-tag{font-family:"Courier Prime",monospace;font-size:2.4cqw;line-height:1.3;color:#7A2430}',
        '.r11 .r11-s{background:#fff;border-left:.9cqw solid ' + RED + ';box-shadow:0 .3cqw .9cqw rgba(60,40,10,.18);padding:1.2cqw 1.8cqw;display:flex;align-items:center;gap:2cqw}',
        '.r11 .r11-s .dn{font-family:Oswald,sans-serif;font-weight:700;color:' + RED + ';line-height:.9}',
        '.r11 .r11-s .dw{font-family:Oswald,sans-serif;font-weight:600;font-size:2.5cqw;letter-spacing:.06em;color:' + BLUE + ';white-space:nowrap}',
        '.r11 .r11-s .tm{font-family:"Courier Prime",monospace;font-weight:700;font-size:2.1cqw;white-space:nowrap;margin-top:.2cqw}',
        '.r11 .r11-s .tp{font-family:Caveat,cursive;font-weight:700;font-size:3.3cqw;line-height:1.05;color:' + INK + ';margin-top:.2cqw}',
        '.r11 .r11-w{background:#fff;border:.3cqw dashed ' + BLUE + ';padding:1.4cqw 1.6cqw;transform:rotate(1.5deg)}',
        '.r11 .r11-w .k{font-family:Oswald,sans-serif;font-weight:700;letter-spacing:.18em;font-size:2.1cqw;color:' + RED + '}',
        '.r11 .r11-w .a{font-family:Caveat,cursive;font-weight:700;font-size:3.3cqw;line-height:1.05;margin-top:.4cqw}',
        '.r11 .r11-w .b{font-family:"Courier Prime",monospace;font-size:1.8cqw;line-height:1.25;margin-top:.4cqw}',
        '.r11 .r11-w.line{transform:none;border-width:.25cqw;padding:.8cqw 1.4cqw;white-space:nowrap;font-size:1.8cqw}',
        '.r11 .r11-w.line .k{display:inline;font-size:1.8cqw;margin-right:1.2cqw}',
        '.r11 .r11-tp{font-family:Caveat,cursive;font-weight:700;font-size:3cqw;line-height:1.15;color:' + INK + '}',
        '.r11 .r11-tp b{font-family:Oswald,sans-serif;font-weight:600;font-size:1.6cqw;letter-spacing:.14em;color:' + RED + ';margin-right:1cqw}',
        '.r11 .zt{background:#fff;box-shadow:0 .3cqw .9cqw rgba(60,40,10,.18);border-top:.6cqw solid ' + BLUE + '}',
        '.r11 .zt .r{border-bottom:.12cqw dashed #C9C2B0}',
        '.r11 .zt .th{font-family:Oswald,sans-serif;font-weight:600;font-size:1.35cqw;letter-spacing:.14em;color:' + BLUE + '}',
        '.r11 .zt .l{font-family:Oswald,sans-serif;font-weight:500;font-size:2.05cqw}',
        '.r11 .zt .d{font-family:"Courier Prime",monospace;font-weight:700;font-size:1.75cqw}',
        '.r11 .zt .r .t{font-family:Oswald,sans-serif;font-weight:600;font-size:2.15cqw}',
        '.r11 .zt .r.h{background:' + RED + ';color:#fff}',
        '.r11 .r11-ft .rg{font-family:Oswald,sans-serif;font-weight:700;font-size:4.3cqw;line-height:1.05;letter-spacing:.02em;color:' + INK + ';white-space:nowrap}',
        '.r11 .r11-ft .rg span{color:' + RED + '}',
        '.r11 .r11-ft .sm{font-family:"Courier Prime",monospace;font-size:1.65cqw;line-height:1.3;margin-top:.6cqw}',
        '.r11 .r11-ft .bd{margin-top:1cqw}',
        '.r11 .r11-ft .bd>span:not(.vfx-logo){font-family:Oswald,sans-serif;font-size:1.4cqw;letter-spacing:.06em;border:.15cqw solid ' + INK + ';padding:.3cqw .8cqw;white-space:nowrap}',
        '.r11 .r11-qr{background:#fff;padding:1cqw;outline:.3cqw dashed ' + BLUE + ';outline-offset:-.15cqw;transform:rotate(-2deg)}',
        '.r11.sq .r11-ft .rg{font-size:3.6cqw}.r11.sq .r11-ft .sm{font-size:1.45cqw;margin-top:.3cqw}.r11.sq .r11-ft .bd{margin-top:.6cqw}',
        '.r11.sq .r11-s .dw{font-size:2.2cqw}.r11.sq .r11-s .tm{font-size:1.8cqw}.r11.sq .r11-s .tp{font-size:2.8cqw}.r11.sq .r11-s{padding:.9cqw 1.5cqw}',
        '.r11.sq .r11-w .a{font-size:2.8cqw}.r11.sq .r11-w .b{font-size:1.6cqw}.r11.sq .r11-w .k{font-size:1.8cqw}.r11.sq .r11-w{padding:1.1cqw 1.4cqw}',
        '.r11.sq .r11-from{font-size:1.4cqw}.r11.sq .r11-tag{font-size:2cqw}.r11.sq .r11-tp{font-size:2.5cqw}',
        '.r11.sq .zt .l{font-size:1.8cqw}.r11.sq .zt .d{font-size:1.55cqw}.r11.sq .zt .r .t{font-size:1.85cqw}.r11.sq .zt .th{font-size:1.2cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        partner = !!partner && R.zoom(spec);
        var S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), HH = sq ? 100 : 129.41, out = root(C, sq, partner);
        var from = partner ? '<b>FROM</b>Pacific Island Partners, a program of LDAH' : '<b>FROM</b>Leadership in Disabilities and Achievement of Hawaiʻi';
        var TT = { cap: sq ? 10 : 13, k: 0.4, lh: 1.08, n: 3 };
        function sess(x, y, w, big) {
          return S.map(function (s, i) {
            var inner = big
              ? '<div class="dn" style="font-size:' + (sq ? 8.5 : 10) + 'cqw">' + s.day + '</div><div><div class="dw">' + s.dow.toUpperCase() + ' · ' + s.monFull.toUpperCase() + '</div><div class="tm">' + s.time + '</div>' + (s.lesson ? '<div class="tp">' + s.lesson + '</div>' : '') + '</div>'
              : '<div><div class="dw">' + s.dow.toUpperCase() + ' · ' + s.mon.toUpperCase() + ' ' + s.day + ' <span class="tm" style="color:' + INK + ';margin-left:1cqw">' + s.time + '</span></div>' + (s.lesson ? '<div class="tp">' + s.lesson + '</div>' : '') + '</div>';
            return box('r11-s', x, y + i * (sq ? 9 : 10.5), w, null, inner, 'transform:rotate(' + (i ? .6 : -.6) + 'deg)');
          }).join('');
        }
        function where(x, y, w) {
          return box('r11-w', x, y, w, null, '<div class="k">' + W.kicker + '</div><div class="a">' + W.line1 + '</div><div class="b">' + W.line2 + '</div>');
        }
        function foot(y, qx, qy, qs, w) {
          return box('r11-ft', sq ? 6 : 7.5, y, w, null, '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div><div class="bd">' + R.badges(spec, partner) + '</div>')
            + box('r11-qr', qx, qy, qs, qs, H.qrImg(spec, partner));
        }
        function topicList(x, y, w) {
          var T = topics(S); if (!T.length) return '';
          return box('r11-tp', x, y, w, null, S.map(function (s, i) { return s.lesson ? '<div><b>' + (S.length > 1 ? 'LESSON ' + (i + 1) : 'TOPIC') + '</b>' + s.lesson + '</div>' : ''; }).join(''));
        }
        var logoBox = function (x, y, w, h) { return box('r11-logo', x, y, w, h, R.logo(spec, partner)); };
        if (!sq && !partner) {
          out += art(HH, { b: 3.2, stamps: [[76, 7.5, 15, 18.5, 'sea'], [61.5, 9, 13, 16, 'air']], marks: [[59.5, 30, 5.6]], label: [8, 24, 24, 6.5], rule: 105.5 });
          out += logoBox(7.5, 7, 16, 14) + box('r11-from', 26, 8.5, 30, null, from);
          out += box('r11-to', 10, 34.5, null, null, 'DELIVER TO:');
          out += titleBox('r11-ttl', spec, 9, 37, 82, 26, TT);
          out += box('r11-tag', 10, 64.5, 80, null, R.tagline(spec));
          out += S.length === 1 ? sess(8, 74, 54, true) : sess(8, 72.5, 54, false);
          out += where(65, 73, 27);
          out += foot(108.5, 77.5, 108, 14.5, 66);
        } else if (!sq) {
          out += art(HH, { b: 3.2, stamps: [[76, 7.5, 15, 18.5, 'sea'], [61.5, 9, 13, 16, 'air']], marks: [[59.5, 30, 5.6]], label: null, rule: 105.5 });
          out += logoBox(7.5, 7, 22, 13) + box('r11-from', 7.5, 21.5, 40, null, from);
          out += box('r11-to', 10, 30.5, null, null, 'DELIVER TO: FAMILIES ACROSS THE PACIFIC');
          out += titleBox('r11-ttl', spec, 9, 33, 82, 19, TT);
          out += box('r11-tag', 10, 53, 80, null, R.tagline(spec));
          out += topicList(10, 60.5, 80);
          out += zoneTable(spec, 'zt', 8, 68.5, 84, 3.35);
          out += box('r11-w line', 8, 96.5, null, null, '<span class="k">' + W.kicker + '</span>' + W.line1 + ' ' + W.line2);
          out += foot(108.5, 77.5, 108, 14.5, 66);
        } else if (!partner) {
          out += art(HH, { b: 2.6, stamps: [[80, 6, 12.5, 15, 'sea'], [68, 7, 10.5, 13, 'air']], marks: [[66.5, 23.5, 4.4]], label: null, rule: 79.5 });
          out += logoBox(6, 6, 13, 11) + box('r11-from', 21, 7, 32, null, from);
          out += titleBox('r11-ttl', spec, 7, 22, 86, 21, TT);
          out += box('r11-tag', 8, 44, 84, null, R.tagline(spec));
          out += S.length === 1 ? sess(6, 52.5, 56, true) : sess(6, 51.5, 56, false);
          out += where(65, 52, 28.5);
          out += foot(81.5, 80, 81, 13);
        } else {
          out += art(HH, { b: 2.6, stamps: [[80, 6, 12.5, 15, 'sea'], [68, 7, 10.5, 13, 'air']], marks: [[66.5, 23.5, 4.4]], label: null, rule: 79.5 });
          out += logoBox(6, 5.5, 18, 10.5) + box('r11-from', 26, 6.5, 36, null, from);
          out += titleBox('r11-ttl', spec, 7, 18, 86, 14, TT);
          out += box('r11-tag', 8, 32.5, 84, null, R.tagline(spec));
          out += topicList(8, 38, 84);
          out += zoneTable(spec, 'zt', 6, 45, 88, 3.05);
          out += box('r11-w line', 6, 71, null, null, '<span class="k">' + W.kicker + '</span>' + W.line1 + ' ' + W.line2);
          out += foot(81.5, 80, 81, 13);
        }
        return out + '</div>';
      }
    };
  })());

  /* =====================================================================
     R12 · Art Deco: black and gold, a sunburst fan rising behind the logo medallion,
     stepped double border, Limelight display type, stepped-corner ticket panels.
     ===================================================================== */
  F.registerSet('R', 12, (function () {
    var BLACK = '#0F0E0C', GOLD = '#D9B44A', PALE = '#F3DE9A', DEEP = '#7A5E1C', CREAM = '#F6EFDC', C = 'r12';
    function stepped(d, c, HH) {
      var r = 100 - d, b = HH - d;
      return 'M' + f(d + c) + ' ' + f(d) + 'H' + f(r - c) + 'V' + f(d + c) + 'H' + f(r) + 'V' + f(b - c) + 'H' + f(r - c) + 'V' + f(b) + 'H' + f(d + c) + 'V' + f(b - c) + 'H' + f(d) + 'V' + f(d + c) + 'H' + f(d + c) + 'Z';
    }
    function fan(cx, cy, r, n) {
      var s = '<g>', i;
      for (i = 0; i < n; i++) {
        var a0 = Math.PI + i * Math.PI / n, a1 = Math.PI + (i + 1) * Math.PI / n;
        s += '<path d="M' + f(cx) + ' ' + f(cy) + 'L' + f(cx + r * Math.cos(a0)) + ' ' + f(cy + r * Math.sin(a0)) + 'L' + f(cx + r * Math.cos(a1)) + ' ' + f(cy + r * Math.sin(a1)) + 'Z" fill="' + (i % 2 ? DEEP : GOLD) + '" fill-opacity="' + (i % 2 ? '.55' : '.85') + '"/>';
      }
      [0.42, 0.7, 1].forEach(function (k) { s += '<path d="M' + f(cx - r * k) + ' ' + f(cy) + 'A' + f(r * k) + ' ' + f(r * k) + ' 0 0 1 ' + f(cx + r * k) + ' ' + f(cy) + '" fill="none" stroke="' + BLACK + '" stroke-width=".7"/>'; });
      s += '<path d="M' + f(cx - r * 1.04) + ' ' + f(cy) + 'A' + f(r * 1.04) + ' ' + f(r * 1.04) + ' 0 0 1 ' + f(cx + r * 1.04) + ' ' + f(cy) + '" fill="none" stroke="' + GOLD + '" stroke-width=".3"/>';
      return s + '<rect x="' + f(cx - r * 1.1) + '" y="' + f(cy) + '" width="' + f(r * 2.2) + '" height=".5" fill="' + GOLD + '"/></g>';
    }
    function divider(y, w) {
      return '<g><line x1="' + f(50 - w / 2) + '" y1="' + f(y) + '" x2="' + f(50 - 2.4) + '" y2="' + f(y) + '" stroke="' + GOLD + '" stroke-width=".25"/><line x1="' + f(50 + 2.4) + '" y1="' + f(y) + '" x2="' + f(50 + w / 2) + '" y2="' + f(y) + '" stroke="' + GOLD + '" stroke-width=".25"/>' +
        '<path d="M50 ' + f(y - 1.3) + 'L51.3 ' + f(y) + 'L50 ' + f(y + 1.3) + 'L48.7 ' + f(y) + 'Z" fill="' + GOLD + '"/></g>';
    }
    function art(HH, o) {
      var s = '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
      s += '<defs><radialGradient id="r12glow" cx="50%" cy="' + Math.round(o.fy / HH * 100) + '%" r="60%"><stop offset="0" stop-color="#2A2416"/><stop offset="1" stop-color="' + BLACK + '"/></radialGradient></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="url(#r12glow)"/>';
      // fine vertical pinstripes, very faint
      for (var x = 6; x < 95; x += 2.2) s += '<line x1="' + f(x) + '" y1="0" x2="' + f(x) + '" y2="' + f(HH) + '" stroke="' + GOLD + '" stroke-opacity=".035" stroke-width=".3"/>';
      s += fan(50, o.fy, o.fr, 18);
      s += '<path d="' + stepped(2.4, 3.2, HH) + '" fill="none" stroke="' + GOLD + '" stroke-width=".55"/>';
      s += '<path d="' + stepped(3.7, 3.2, HH) + '" fill="none" stroke="' + GOLD + '" stroke-width=".18"/>';
      // invisible keep-out strips over the border so callouts never sit on the gold lines
      s += '<rect x="0" y="0" width="100" height="4.6" fill="transparent"/><rect x="0" y="' + f(HH - 4.6) + '" width="100" height="4.6" fill="transparent"/>';
      s += '<rect x="0" y="0" width="4.6" height="' + f(HH) + '" fill="transparent"/><rect x="95.4" y="0" width="4.6" height="' + f(HH) + '" fill="transparent"/>';
      o.divs.forEach(function (d) { s += divider(d[0], d[1]); });
      if (o.foot) s += '<line x1="6" y1="' + f(o.foot) + '" x2="94" y2="' + f(o.foot) + '" stroke="' + GOLD + '" stroke-width=".25"/><line x1="6" y1="' + f(o.foot + .7) + '" x2="94" y2="' + f(o.foot + .7) + '" stroke="' + GOLD + '" stroke-width=".12"/>';
      return s + '</svg>';
    }
    return {
      name: 'Art Deco: black and gold sunburst fan, stepped borders, deco display type',
      fonts: 'family=Limelight&family=Josefin+Sans:wght@400;600;700',
      css: [baseCss(C, BLACK, CREAM, '"Josefin Sans",sans-serif'),
        '.r12 .r12-med{background:' + CREAM + ';border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 .5cqw ' + BLACK + ',0 0 0 .8cqw ' + GOLD + ',0 0 0 1.5cqw ' + BLACK + ',0 0 0 1.75cqw ' + GOLD + '}',
        '.r12 .r12-med.w{border-radius:.4cqw}',
        '.r12 .r12-med img{max-width:76%;max-height:76%;display:block}',
        '.r12 .r12-med.w img{max-width:90%;max-height:86%}',
        '.r12 .r12-kick{font-weight:600;font-size:1.45cqw;letter-spacing:.32em;color:' + GOLD + ';text-align:center;white-space:nowrap}',
        '.r12 .r12-ttl{font-family:Limelight,serif;color:' + PALE + ';text-align:center;text-transform:uppercase;letter-spacing:.03em;white-space:nowrap;align-items:center;text-shadow:0 .25cqw 0 ' + DEEP + '}',
        '.r12 .r12-tag{font-weight:400;font-size:2.5cqw;line-height:1.3;text-align:center;color:' + CREAM + ';letter-spacing:.03em}',
        '.r12 .r12-s{border:.3cqw solid ' + GOLD + ';background:#17150F;text-align:center;padding:1.4cqw 2cqw;outline:.15cqw solid ' + GOLD + ';outline-offset:-.9cqw}',
        '.r12 .r12-s .dw{font-weight:700;font-size:1.6cqw;letter-spacing:.3em;color:' + GOLD + '}',
        '.r12 .r12-s .dt{font-family:Limelight,serif;font-size:4cqw;line-height:1.1;color:' + PALE + ';white-space:nowrap}',
        '.r12 .r12-s .tm{font-weight:600;font-size:2cqw;letter-spacing:.06em;white-space:nowrap}',
        '.r12 .r12-s .tp{font-weight:600;font-size:2.15cqw;line-height:1.2;color:' + PALE + ';margin-top:.6cqw;font-style:italic}',
        '.r12 .r12-s.one{display:flex;align-items:center;gap:3cqw;text-align:left;padding:1.6cqw 3cqw}',
        '.r12 .r12-s.one .big{font-family:Limelight,serif;font-size:10cqw;line-height:.9;color:' + PALE + ';text-align:center}',
        '.r12 .r12-s.one .big small{display:block;font-family:"Josefin Sans",sans-serif;font-weight:700;font-size:1.7cqw;letter-spacing:.3em;color:' + GOLD + ';margin-bottom:.4cqw}',
        '.r12 .r12-s.one .tm{font-size:2.4cqw;margin-top:.4cqw}.r12 .r12-s.one .tp{font-size:2.6cqw}.r12 .r12-s.one .dw{font-size:1.8cqw}',
        '.r12 .r12-w{text-align:center;font-size:2cqw;line-height:1.35;letter-spacing:.04em}',
        '.r12 .r12-w b{font-weight:700;color:' + GOLD + ';letter-spacing:.3em;margin-right:1.2cqw}',
        '.r12 .r12-tp{text-align:center;font-weight:600;font-style:italic;font-size:2.2cqw;line-height:1.35;color:' + PALE + '}',
        '.r12 .r12-tp b{font-style:normal;font-weight:700;font-size:1.4cqw;letter-spacing:.3em;color:' + GOLD + ';margin-right:1cqw}',
        '.r12 .zt{border:.25cqw solid ' + GOLD + ';background:#15130E}',
        '.r12 .zt .r{border-bottom:.12cqw solid rgba(217,180,74,.3)}',
        '.r12 .zt .th{font-weight:700;font-size:1.3cqw;letter-spacing:.24em;color:' + GOLD + ';border-bottom:.25cqw solid ' + GOLD + '}',
        '.r12 .zt .l{font-weight:600;font-size:2.1cqw}',
        '.r12 .zt .d{font-weight:400;font-size:1.85cqw}',
        '.r12 .zt .r .t{font-weight:700;font-size:2.15cqw;color:' + PALE + '}',
        '.r12 .zt .r.h{background:' + GOLD + ';color:' + BLACK + '}.r12 .zt .r.h .t{color:' + BLACK + '}',
        '.r12 .r12-ft .rg{font-family:Limelight,serif;font-size:4cqw;line-height:1.1;color:' + CREAM + ';white-space:nowrap}',
        '.r12 .r12-ft .rg span{color:' + GOLD + '}',
        '.r12 .r12-ft .sm{font-size:1.75cqw;line-height:1.3;margin-top:.5cqw;color:#D9CFB5}',
        '.r12 .r12-ft .bd{margin-top:1.1cqw}',
        '.r12 .r12-ft .bd>span:not(.vfx-logo){font-weight:700;font-size:1.3cqw;letter-spacing:.12em;border:.15cqw solid ' + GOLD + ';color:' + GOLD + ';padding:.35cqw .8cqw;white-space:nowrap}',
        '.r12 .r12-qr{background:' + CREAM + ';padding:.9cqw;box-shadow:0 0 0 .35cqw ' + BLACK + ',0 0 0 .65cqw ' + GOLD + '}',
        '.r12.sq .r12-ft .rg{font-size:3.4cqw}.r12.sq .r12-ft .sm{font-size:1.5cqw;margin-top:.3cqw}.r12.sq .r12-ft .bd{margin-top:.7cqw}',
        '.r12.sq .r12-s{padding:1cqw 1.6cqw}.r12.sq .r12-s .dt{font-size:3.3cqw}.r12.sq .r12-s .tm{font-size:1.75cqw}.r12.sq .r12-s .tp{font-size:1.9cqw;margin-top:.3cqw}.r12.sq .r12-s .dw{font-size:1.4cqw}',
        '.r12.sq .r12-s.one .big{font-size:8cqw}.r12.sq .r12-s.one .tm{font-size:2.1cqw}.r12.sq .r12-s.one .tp{font-size:2.3cqw}',
        '.r12.sq .r12-tag{font-size:2.1cqw}.r12.sq .r12-kick{font-size:1.25cqw}.r12.sq .r12-w{font-size:1.75cqw}.r12.sq .r12-tp{font-size:1.9cqw}',
        '.r12.sq .zt .l{font-size:1.8cqw}.r12.sq .zt .d{font-size:1.6cqw}.r12.sq .zt .r .t{font-size:1.85cqw}.r12.sq .zt .th{font-size:1.15cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        partner = !!partner && R.zoom(spec);
        var S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), HH = sq ? 100 : 129.41, out = root(C, sq, partner);
        var TT = { cap: sq ? 8.5 : 10.5, k: 0.74, lh: 1.12, n: 3 };
        var kick = partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'LDAH PRESENTS';
        function sess(y, w) {
          if (S.length === 1) {
            var s = S[0];
            return box('r12-s one', 50 - w / 2, y, w, null, '<div class="big"><small>' + s.mon.toUpperCase() + '</small>' + s.day + '</div><div><div class="dw">' + s.dow.toUpperCase() + '</div><div class="tm">' + s.time + '</div>' + (s.lesson ? '<div class="tp">' + s.lesson + '</div>' : '') + '</div>');
          }
          var cw = (w - 4) / 2;
          return S.map(function (s, i) {
            return box('r12-s', 50 - w / 2 + i * (cw + 4), y, cw, null, '<div class="dw">' + s.dow.toUpperCase() + '</div><div class="dt">' + s.mon + ' ' + s.day + '</div><div class="tm">' + s.time + '</div>' + (s.lesson ? '<div class="tp">' + s.lesson + '</div>' : ''));
          }).join('');
        }
        function where(y, w) { return box('r12-w', 50 - w / 2, y, w, null, '<b>' + W.kicker + '</b>' + W.line1 + (W.line2 ? ' · ' + W.line2 : '')); }
        function foot(y, qs, qy) {
          return box('r12-ft', 7, y, 68, null, '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div><div class="bd">' + R.badges(spec, partner) + '</div>')
            + box('r12-qr', 93 - qs, qy, qs, qs, H.qrImg(spec, partner));
        }
        function topicList(y, w) {
          if (!topics(S).length) return '';
          return box('r12-tp', 50 - w / 2, y, w, null, S.map(function (s, i) { return s.lesson ? '<div><b>' + (S.length > 1 ? 'LESSON ' + (i + 1) : 'TOPIC') + '</b>' + s.lesson + '</div>' : ''; }).join(''));
        }
        var med = function (cx, cy, w, h) { return box('r12-med' + (partner ? ' w' : ''), cx - w / 2, cy - h / 2, w, h, R.logo(spec, partner)); };
        if (!sq && !partner) {
          out += art(HH, { fy: 33, fr: 25, divs: [[65.2, 40]], foot: 108.5 });
          out += med(50, 21, 17, 17);
          out += box('r12-kick', 20, 35.2, 60, null, kick);
          out += titleBox('r12-ttl', spec, 8, 39, 84, 24.5, TT);
          out += box('r12-tag', 10, 67.3, 80, null, R.tagline(spec));
          out += sess(75, S.length === 1 ? 64 : 84);
          out += where(92.6, 86);
          out += foot(111.5, 14, 110.5);
        } else if (!sq) {
          out += art(HH, { fy: 27, fr: 18, divs: [[56, 40]], foot: 108.5 });
          out += med(50, 17, 25, 13.5);
          out += box('r12-kick', 20, 29.2, 60, null, kick);
          out += titleBox('r12-ttl', spec, 8, 33, 84, 21, TT);
          out += box('r12-tag', 10, 58, 80, null, R.tagline(spec));
          out += topicList(65.5, 84);
          out += zoneTable(spec, 'zt', 8, 72.5, 84, 3.05);
          out += where(97.4, 86);
          out += foot(111.5, 14, 110.5);
        } else if (!partner) {
          out += art(HH, { fy: 23, fr: 14.5, divs: [[48, 30]], foot: 81.5 });
          out += med(50, 14, 12.5, 12.5);
          out += box('r12-kick', 25, 24.8, 50, null, kick);
          out += titleBox('r12-ttl', spec, 8, 27.5, 84, 19.5, TT);
          out += box('r12-tag', 10, 49.5, 80, null, R.tagline(spec));
          out += sess(55.5, S.length === 1 ? 60 : 86);
          out += where(71.5, 88);
          out += foot(83.5, 11.5, 83.5);
        } else {
          out += art(HH, { fy: 19, fr: 13, divs: [], foot: 81.5 });
          out += med(50, 11.5, 20, 11);
          out += box('r12-kick', 25, 20.6, 50, null, kick);
          out += titleBox('r12-ttl', spec, 8, 23.5, 84, 12.5, TT);
          out += box('r12-tag', 10, 36.5, 80, null, R.tagline(spec));
          out += topicList(42, 86);
          out += zoneTable(spec, 'zt', 7, 48.5, 86, 2.75);
          out += where(71.5, 88);
          out += foot(83.5, 11.5, 83.5);
        }
        return out + '</div>';
      }
    };
  })());

  /* =====================================================================
     R13 · Bauhaus: primary red, yellow and blue circles, half-circles, squares and bars
     on off-white; heavy geometric sans; dates in colour blocks; black footer band.
     ===================================================================== */
  F.registerSet('R', 13, (function () {
    var PAPER = '#F1ECE1', RED = '#D7262E', YEL = '#F2B705', BLUE = '#1C4FA0', INK = '#141414', C = 'r13';
    function art(HH, o) {
      var s = '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
      s += '<rect width="100" height="' + f(HH) + '" fill="' + PAPER + '"/>';
      var k = o.k, cx = o.cx, cy = o.cy;   // the cluster: a blue circle with a yellow half-disc, red square and black bars
      s += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(20 * k) + '" fill="' + BLUE + '"/>';
      s += '<path d="M' + f(cx - 30 * k) + ' ' + f(cy + 20 * k) + 'A' + f(12 * k) + ' ' + f(12 * k) + ' 0 0 1 ' + f(cx - 6 * k) + ' ' + f(cy + 20 * k) + 'Z" fill="' + YEL + '"/>';
      s += '<rect x="' + f(cx + 4 * k) + '" y="' + f(cy + 12 * k) + '" width="' + f(13 * k) + '" height="' + f(13 * k) + '" fill="' + RED + '"/>';
      s += '<rect x="' + f(cx - 34 * k) + '" y="' + f(cy + 20 * k) + '" width="' + f(54 * k) + '" height="' + f(1.6 * k) + '" fill="' + INK + '"/>';
      s += '<rect x="' + f(cx - 2 * k) + '" y="' + f(cy - 26 * k) + '" width="' + f(1.6 * k) + '" height="' + f(40 * k) + '" fill="' + INK + '"/>';
      s += '<circle cx="' + f(cx - 22 * k) + '" cy="' + f(cy - 8 * k) + '" r="' + f(3.2 * k) + '" fill="' + INK + '"/>';
      s += '<path d="M' + f(cx + 12 * k) + ' ' + f(cy - 22 * k) + 'l' + f(8 * k) + ' 0 l0 ' + f(8 * k) + 'z" fill="' + YEL + '"/>';
      // rule under the tagline and the black footer band with its colour stripe
      if (o.bar) s += '<rect x="5" y="' + f(o.bar) + '" width="90" height="1.1" fill="' + INK + '"/>';
      s += '<rect x="0" y="' + f(o.foot) + '" width="100" height="' + f(HH - o.foot) + '" fill="' + INK + '"/>';
      s += '<rect x="0" y="' + f(o.foot - 1.2) + '" width="34" height="1.2" fill="' + RED + '"/><rect x="34" y="' + f(o.foot - 1.2) + '" width="33" height="1.2" fill="' + YEL + '"/><rect x="67" y="' + f(o.foot - 1.2) + '" width="33" height="1.2" fill="' + BLUE + '"/>';
      // a small quarter disc low on the left edge
      if (o.q) s += '<path d="M0 ' + f(o.q - 7) + 'A7 7 0 0 1 7 ' + f(o.q) + 'L0 ' + f(o.q) + 'Z" fill="' + RED + '"/>';
      return s + '</svg>';
    }
    return {
      name: 'Bauhaus: primary circles, half-discs, squares and bars on off-white',
      fonts: 'family=Jost:wght@400;500;600;700;800',
      css: [baseCss(C, PAPER, INK, 'Jost,sans-serif'),
        '.r13 .r13-logo{display:flex;align-items:center;justify-content:flex-start}',
        '.r13 .r13-logo img{max-width:100%;max-height:100%;display:block}',
        '.r13 .r13-kick{font-weight:600;font-size:1.45cqw;letter-spacing:.22em;text-transform:uppercase;line-height:1.4}',
        '.r13 .r13-ttl{font-weight:800;letter-spacing:-.02em;white-space:nowrap;color:' + INK + '}',
        '.r13 .r13-ttl div:last-child{color:' + RED + '}',
        '.r13 .r13-tag{font-weight:500;font-size:2.6cqw;line-height:1.25}',
        '.r13 .r13-s{display:flex;align-items:center;gap:2cqw}',
        '.r13 .r13-s .sqr{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:800;line-height:.9}',
        '.r13 .r13-s .sqr small{font-size:.32em;letter-spacing:.14em;font-weight:700;margin-bottom:.15em}',
        '.r13 .r13-s .sqr.y{background:' + YEL + ';color:' + INK + '}.r13 .r13-s .sqr.b{background:' + BLUE + ';color:#fff;border-radius:50%}',
        '.r13 .r13-s .dw{font-weight:700;font-size:2.7cqw;line-height:1.1;white-space:nowrap}',
        '.r13 .r13-s .tm{font-weight:500;font-size:2.2cqw;white-space:nowrap}',
        '.r13 .r13-s .tp{font-weight:600;font-size:2.3cqw;line-height:1.15;color:' + BLUE + '}',
        '.r13 .r13-w{background:' + RED + ';color:#fff;padding:2cqw 2.2cqw}',
        '.r13 .r13-w .k{font-weight:700;font-size:1.7cqw;letter-spacing:.24em}',
        '.r13 .r13-w .a{font-weight:800;font-size:3cqw;line-height:1.05;margin-top:.8cqw}',
        '.r13 .r13-w .b{font-weight:500;font-size:1.95cqw;line-height:1.25;margin-top:.6cqw}',
        '.r13 .r13-w.line{padding:.7cqw 1.6cqw;white-space:nowrap;font-weight:500;font-size:1.9cqw}',
        '.r13 .r13-w.line b{font-weight:700;letter-spacing:.22em;margin-right:1.2cqw}',
        '.r13 .r13-tp{font-size:2.3cqw;line-height:1.35;font-weight:600}',
        '.r13 .r13-tp b{display:inline-block;width:2.9cqw;height:2.9cqw;line-height:2.9cqw;text-align:center;border-radius:50%;background:' + BLUE + ';color:#fff;font-size:1.6cqw;margin-right:1cqw;vertical-align:.2cqw}',
        '.r13 .r13-tp div:nth-child(2) b{background:' + YEL + ';color:' + INK + ';border-radius:0}',
        '.r13 .zt{border:.35cqw solid ' + INK + ';background:#FBF8F1}',
        '.r13 .zt .r{border-bottom:.12cqw solid #D4CDBE}',
        '.r13 .zt .th{background:' + INK + ';color:#fff;font-weight:700;font-size:1.3cqw;letter-spacing:.2em}',
        '.r13 .zt .l{font-weight:600;font-size:2.1cqw}',
        '.r13 .zt .d{font-weight:500;font-size:1.85cqw}',
        '.r13 .zt .r .t{font-weight:800;font-size:2.15cqw}',
        '.r13 .zt .r.h{background:' + YEL + '}',
        '.r13 .r13-ft{color:#fff}',
        '.r13 .r13-ft .rg{font-weight:800;font-size:4.1cqw;line-height:1.05;letter-spacing:-.01em;white-space:nowrap}',
        '.r13 .r13-ft .rg span{color:' + YEL + '}',
        '.r13 .r13-ft .sm{font-weight:500;font-size:1.7cqw;line-height:1.3;margin-top:.5cqw;color:#E6E1D6}',
        '.r13 .r13-ft .bd{margin-top:1cqw}',
        '.r13 .r13-ft .bd>span:not(.vfx-logo){font-weight:700;font-size:1.3cqw;letter-spacing:.1em;border:.15cqw solid #fff;padding:.35cqw .8cqw;white-space:nowrap}',
        '.r13 .r13-qr{background:#fff;padding:.8cqw}',
        '.r13.sq .r13-ft .rg{font-size:3.5cqw}.r13.sq .r13-ft .sm{font-size:1.5cqw;margin-top:.3cqw}.r13.sq .r13-ft .bd{margin-top:.6cqw}',
        '.r13.sq .r13-s .dw{font-size:2.3cqw}.r13.sq .r13-s .tm{font-size:1.9cqw}.r13.sq .r13-s .tp{font-size:2cqw}',
        '.r13.sq .r13-w{padding:1.5cqw 1.8cqw}.r13.sq .r13-w .a{font-size:2.6cqw}.r13.sq .r13-w .b{font-size:1.7cqw}.r13.sq .r13-w .k{font-size:1.5cqw}',
        '.r13.sq .r13-tag{font-size:2.2cqw}.r13.sq .r13-tp{font-size:2cqw}.r13.sq .r13-tp b{width:2.5cqw;height:2.5cqw;line-height:2.5cqw;font-size:1.4cqw}.r13.sq .r13-kick{font-size:1.25cqw}',
        '.r13.sq .zt .l{font-size:1.8cqw}.r13.sq .zt .d{font-size:1.6cqw}.r13.sq .zt .r .t{font-size:1.85cqw}.r13.sq .zt .th{font-size:1.15cqw}.r13.sq .r13-w.line{font-size:1.7cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        partner = !!partner && R.zoom(spec);
        var S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), HH = sq ? 100 : 129.41, out = root(C, sq, partner);
        var TT = { cap: sq ? 9.5 : 12, k: 0.56, lh: 1.0, n: 3 };
        var kick = partner ? 'For families across<br>the Pacific' : 'Parent Training &amp;<br>Information Center';
        function sess(x, y, w, big) {
          var q = big ? (sq ? 13 : 16) : (sq ? 8.5 : 10), gap = sq ? 2 : 2.4;
          return S.map(function (s, i) {
            return box('r13-s', x, y + i * (q + gap), w, q, '<div class="sqr ' + (i ? 'b' : 'y') + '" style="width:' + f(q) + 'cqw;height:' + f(q) + 'cqw;font-size:' + f(q * .5) + 'cqw"><small>' + s.mon.toUpperCase() + '</small>' + s.day + '</div><div><div class="dw">' + s.dow + ', ' + s.mon + ' ' + s.day + '</div><div class="tm">' + s.time + '</div>' + (s.lesson ? '<div class="tp">' + s.lesson + '</div>' : '') + '</div>');
          }).join('');
        }
        function where(x, y, w, h) { return box('r13-w', x, y, w, null, '<div class="k">' + W.kicker + '</div><div class="a">' + W.line1 + '</div><div class="b">' + W.line2 + '</div>', 'min-height:' + f(h) + 'cqw'); }
        function foot(y, qs, qy) {
          return box('r13-ft', sq ? 5 : 6, y, 70, null, '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div><div class="bd">' + R.badges(spec, partner) + '</div>')
            + box('r13-qr', (sq ? 95 : 94) - qs, qy, qs, qs, H.qrImg(spec, partner));
        }
        function topicList(x, y, w) {
          if (!topics(S).length) return '';
          return box('r13-tp', x, y, w, null, S.map(function (s, i) { return s.lesson ? '<div><b>' + (i + 1) + '</b>' + s.lesson + '</div>' : ''; }).join(''));
        }
        var logo = function (x, y, w, h) { return box('r13-logo', x, y, w, h, R.logo(spec, partner)); };
        if (!sq && !partner) {
          out += art(HH, { k: 1, cx: 74, cy: 16, bar: 76, foot: 112.5, q: 107 });
          out += logo(6, 6, 18, 18) + box('r13-kick', 6, 26, 40, null, kick);
          out += titleBox('r13-ttl', spec, 6, 42, 88, 25, TT);
          out += box('r13-tag', 6, 68.5, 84, null, R.tagline(spec));
          out += S.length === 1 ? sess(6, 79.5, 58, true) : sess(6, 79.5, 58, false);
          out += where(67, 79.5, 27, S.length === 1 ? 16 : 22.4);
          out += foot(115, 14, 114.4);
        } else if (!sq) {
          out += art(HH, { k: .8, cx: 77, cy: 13.5, bar: 0, foot: 112.5, q: 107 });
          out += logo(6, 6, 27, 14) + box('r13-kick', 6, 21.5, 40, null, kick);
          out += titleBox('r13-ttl', spec, 6, 32, 88, 18, TT);
          out += box('r13-tag', 6, 51, 84, null, R.tagline(spec));
          out += topicList(6, 58, 88);
          out += zoneTable(spec, 'zt', 6, 66, 88, 3.1);
          out += box('r13-w line', 6, 92, null, null, '<b>' + W.kicker + '</b>' + W.line1 + ' ' + W.line2);
          out += foot(115, 14, 114.4);
        } else if (!partner) {
          out += art(HH, { k: .62, cx: 80, cy: 13, bar: 50.5, foot: 84 });
          out += logo(5, 5, 14, 14) + box('r13-kick', 21, 7, 36, null, kick);
          out += titleBox('r13-ttl', spec, 5, 26, 90, 17.5, TT);
          out += box('r13-tag', 5, 44.2, 88, null, R.tagline(spec));
          out += S.length === 1 ? sess(5, 53.5, 57, true) : sess(5, 53, 57, false);
          out += where(66, 53, 29, S.length === 1 ? 13 : 19);
          out += foot(86, 11.5, 86.3);
        } else {
          out += art(HH, { k: .38, cx: 85, cy: 8.5, bar: 0, foot: 84 });
          out += logo(5, 5, 22, 11.5) + box('r13-kick', 29, 7, 30, null, kick);
          out += titleBox('r13-ttl', spec, 5, 19.8, 90, 11.6, TT);
          out += box('r13-tag', 5, 32.4, 88, null, R.tagline(spec));
          out += topicList(5, 37.2, 90);
          out += zoneTable(spec, 'zt', 5, 43.5, 90, 2.75);
          out += box('r13-w line', 5, 69, null, null, '<b>' + W.kicker + '</b>' + W.line1 + ' ' + W.line2);
          out += foot(86, 11.5, 86.3);
        }
        return out + '</div>';
      }
    };
  })());

  /* =====================================================================
     R14 · Comic book: inked panels on a white page, halftone fills, speed lines,
     a POW starburst behind the title, a speech bubble for the tagline, caption boxes for dates.
     ===================================================================== */
  F.registerSet('R', 14, (function () {
    var INK = '#111', YEL = '#FFE03A', RED = '#E5322B', CYAN = '#2BB3E6', CREAM = '#FFF7D1', C = 'r14';
    function burst(cx, cy, rx, ry, n) {
      var pts = [], i;
      for (i = 0; i < n * 2; i++) {
        var a = -Math.PI / 2 + i * Math.PI / n, k = i % 2 ? 0.74 + 0.06 * Math.sin(i * 2.3) : 1 + 0.07 * Math.sin(i * 1.7);
        pts.push(f(cx + rx * k * Math.cos(a)) + ' ' + f(cy + ry * k * Math.sin(a)));
      }
      return 'M' + pts.join('L') + 'Z';
    }
    function rect(r) { return 'M' + f(r[0]) + ' ' + f(r[1]) + 'H' + f(r[0] + r[2]) + 'V' + f(r[1] + r[3]) + 'H' + f(r[0]) + 'Z'; }
    // The page-size dots keep each fill's bounding box as big as the page, so the layout check treats the
    // big panels as background (free space for callouts) rather than as objects.
    function page(HH) { return 'M0 0h.01v.01h-.01zM99.99 ' + f(HH - .01) + 'h.01v.01h-.01z'; }
    function art(HH, o) {
      var s = '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true"><defs>';
      s += '<pattern id="r14dk" width="1.6" height="1.6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx=".8" cy=".8" r=".42" fill="#1B7FB0" fill-opacity=".55"/></pattern>';
      s += '<pattern id="r14dy" width="1.6" height="1.6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx=".8" cy=".8" r=".34" fill="#F2B600" fill-opacity=".55"/></pattern>';
      s += '<pattern id="r14dr" width="1.6" height="1.6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx=".8" cy=".8" r=".46" fill="#9E1712" fill-opacity=".5"/></pattern>';
      s += '<clipPath id="r14ca' + o.id + '"><path d="' + rect(o.A) + '"/></clipPath></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="#fff"/>';
      var P = page(HH);
      // panel A: cyan with dots and speed lines, the burst on top
      s += '<path d="' + rect(o.A) + P + '" fill="' + CYAN + '"/><path d="' + rect(o.A) + P + '" fill="url(#r14dk)"/>';
      var g = '<g clip-path="url(#r14ca' + o.id + ')" stroke="#fff" stroke-opacity=".75" stroke-width=".35">';
      for (var i = 0; i < 40; i++) { var a = i * Math.PI / 20 + .04, r0 = o.b[2] * 1.05, r1 = 120;
        g += '<line x1="' + f(o.b[0] + r0 * Math.cos(a)) + '" y1="' + f(o.b[1] + r0 * .55 * Math.sin(a)) + '" x2="' + f(o.b[0] + r1 * Math.cos(a)) + '" y2="' + f(o.b[1] + r1 * Math.sin(a)) + '"/>'; }
      s += g + '</g>';
      s += '<path d="' + burst(o.b[0] + .8, o.b[1] + 1, o.b[2] * 1.06, o.b[3] * 1.08, 13) + '" fill="' + RED + '" stroke="' + INK + '" stroke-width=".6" stroke-linejoin="round"/>';
      s += '<path d="' + burst(o.b[0], o.b[1], o.b[2], o.b[3], 13) + '" fill="' + YEL + '" stroke="' + INK + '" stroke-width=".6" stroke-linejoin="round"/>';
      // other panels
      if (o.Y) s += '<path d="' + o.Y.map(rect).join('') + P + '" fill="' + CREAM + '"/><path d="' + o.Y.map(rect).join('') + P + '" fill="url(#r14dy)"/>';
      if (o.Rd) s += '<path d="' + o.Rd.map(rect).join('') + P + '" fill="' + RED + '"/><path d="' + o.Rd.map(rect).join('') + P + '" fill="url(#r14dr)"/>';
      // ink outlines of every panel in one path
      var all = [o.A].concat(o.Y || [], o.Rd || []);
      s += '<path d="' + all.map(rect).join('') + '" fill="none" stroke="' + INK + '" stroke-width=".8" stroke-linejoin="miter"/>';
      // invisible keep-out strips along every panel edge so callouts stay inside a panel, never on a gutter
      all.forEach(function (r) {
        [[r[0] - .9, r[1] - .9, r[2] + 1.8, 1.8], [r[0] - .9, r[1] + r[3] - .9, r[2] + 1.8, 1.8], [r[0] - .9, r[1] - .9, 1.8, r[3] + 1.8], [r[0] + r[2] - .9, r[1] - .9, 1.8, r[3] + 1.8]].forEach(function (k) {
          s += '<rect x="' + f(k[0]) + '" y="' + f(k[1]) + '" width="' + f(k[2]) + '" height="' + f(k[3]) + '" fill="transparent"/>'; });
      });
      return s + '</svg>';
    }
    return {
      name: 'Comic book: inked panels, halftone, POW starburst title, speech bubbles',
      fonts: 'family=Bangers&family=Comic+Neue:wght@400;700',
      css: [baseCss(C, '#fff', INK, '"Comic Neue",sans-serif'),
        '.r14 .r14-logo{background:#fff;border:.45cqw solid ' + INK + ';display:flex;align-items:center;justify-content:center;padding:.8cqw;box-shadow:.6cqw .6cqw 0 ' + INK + '}',
        '.r14 .r14-logo img{max-width:100%;max-height:100%;display:block}',
        '.r14 .r14-cap{background:' + YEL + ';border:.35cqw solid ' + INK + ';font-family:Bangers,sans-serif;font-size:2.1cqw;letter-spacing:.08em;padding:.3cqw 1.1cqw;white-space:nowrap;line-height:1.2}',
        '.r14 .r14-ttl{font-family:Bangers,sans-serif;color:' + RED + ';text-align:center;align-items:center;white-space:nowrap;letter-spacing:.03em;transform:rotate(-3deg);' +
          'text-shadow:-.18cqw -.18cqw 0 ' + INK + ',.18cqw -.18cqw 0 ' + INK + ',-.18cqw .18cqw 0 ' + INK + ',.18cqw .18cqw 0 ' + INK + ',.55cqw .55cqw 0 ' + INK + '}',
        '.r14 .r14-bub{background:#fff;border:.4cqw solid ' + INK + ';border-radius:50%;padding:1.7cqw 7cqw;text-align:center;font-weight:700;font-size:2.5cqw;line-height:1.2}',
        '.r14 .r14-bub::after{content:"";position:absolute;left:14%;top:-2.6cqw;width:3.4cqw;height:3.4cqw;background:#fff;border-left:.4cqw solid ' + INK + ';border-top:.4cqw solid ' + INK + ';transform:skewX(25deg) rotate(10deg);clip-path:polygon(0 0,100% 0,0 100%)}',
        '.r14 .r14-s .cap{display:inline-block}',
        '.r14 .r14-s .tm{font-weight:700;font-size:2.4cqw;margin-top:.8cqw;white-space:nowrap}',
        '.r14 .r14-s .tp{font-weight:700;font-size:2.5cqw;line-height:1.15;margin-top:.3cqw;color:#1B5E9E}',
        '.r14 .r14-s.big .dn{font-family:Bangers,sans-serif;color:' + RED + ';line-height:.9;letter-spacing:.02em;text-shadow:.35cqw .35cqw 0 ' + INK + '}',
        '.r14 .r14-s.big{display:flex;align-items:center;gap:2.4cqw}',
        '.r14 .r14-w .k{font-family:Bangers,sans-serif;font-size:4cqw;color:#fff;letter-spacing:.05em;text-shadow:.3cqw .3cqw 0 ' + INK + '}',
        '.r14 .r14-w .bb{position:relative;background:#fff;border:.4cqw solid ' + INK + ';border-radius:2.6cqw;padding:1.3cqw 1.7cqw;margin-top:1cqw}',
        '.r14 .r14-w .a{font-weight:700;font-size:2.5cqw;line-height:1.1}',
        '.r14 .r14-w .b{font-size:1.9cqw;line-height:1.2;margin-top:.4cqw;font-weight:700;color:#444}',
        '.r14 .r14-w.line{background:' + RED + ';border:.35cqw solid ' + INK + ';padding:.5cqw 1.4cqw;white-space:nowrap;color:#fff;font-weight:700;font-size:1.95cqw}',
        '.r14 .r14-w.line b{font-family:Bangers,sans-serif;font-weight:400;font-size:2.6cqw;letter-spacing:.06em;margin-right:1cqw;vertical-align:-.15cqw}',
        '.r14 .r14-tp{display:flex;flex-wrap:wrap;gap:.8cqw 1.2cqw}',
        '.r14 .r14-tp .cap{font-family:"Comic Neue",sans-serif;font-weight:700;font-size:2.1cqw;letter-spacing:0}',
        '.r14 .r14-tp .cap b{font-family:Bangers,sans-serif;font-weight:400;letter-spacing:.08em;color:' + RED + ';margin-right:.8cqw}',
        '.r14 .zt{background:#fff;border:.4cqw solid ' + INK + ';box-shadow:.6cqw .6cqw 0 ' + INK + '}',
        '.r14 .zt .r{border-bottom:.14cqw solid #ccc}',
        '.r14 .zt .th{background:' + INK + ';color:' + YEL + ';font-family:Bangers,sans-serif;font-size:1.7cqw;letter-spacing:.1em}',
        '.r14 .zt .l{font-weight:700;font-size:2.1cqw}',
        '.r14 .zt .d{font-weight:700;font-size:1.85cqw;color:#333}',
        '.r14 .zt .r .t{font-family:Bangers,sans-serif;font-size:2.5cqw;letter-spacing:.04em}',
        '.r14 .zt .r.h{background:' + YEL + '}',
        '.r14 .r14-ft .rg{font-family:Bangers,sans-serif;font-size:4.3cqw;line-height:1;letter-spacing:.04em;white-space:nowrap}',
        '.r14 .r14-ft .rg span{color:' + RED + ';text-shadow:.25cqw .25cqw 0 ' + INK + '}',
        '.r14 .r14-ft .sm{font-weight:700;font-size:1.75cqw;line-height:1.25;margin-top:.4cqw}',
        '.r14 .r14-ft .bd{margin-top:.6cqw}',
        '.r14 .r14-ft .bd>span:not(.vfx-logo){font-family:Bangers,sans-serif;font-size:1.6cqw;letter-spacing:.08em;border:.2cqw solid ' + INK + ';padding:.2cqw .8cqw;white-space:nowrap}',
        '.r14 .r14-qr{position:absolute;right:1.2cqw;top:50%;transform:translateY(-50%);background:#fff;padding:.6cqw;border:.4cqw solid ' + INK + '}',
        '.r14 .r14-ft{background:#fff;border:.8cqw solid ' + INK + ';padding:.8cqw 2.6cqw}',
        '.r14.sq .r14-ft{padding:.5cqw 2cqw}',
        '.r14.sq .r14-ft .rg{font-size:3.5cqw}.r14.sq .r14-ft .sm{font-size:1.45cqw;margin-top:.1cqw}.r14.sq .r14-ft .bd{margin-top:.4cqw}',
        '.r14.sq .r14-bub{font-size:2.1cqw;padding:1.2cqw 4cqw}.r14.sq .r14-cap{font-size:1.8cqw}',
        '.r14.sq .r14-s .tm{font-size:2cqw;margin-top:.5cqw}.r14.sq .r14-s .tp{font-size:2.1cqw}',
        '.r14.sq .r14-w .k{font-size:3.3cqw}.r14.sq .r14-w .a{font-size:2.1cqw}.r14.sq .r14-w .b{font-size:1.65cqw}.r14.sq .r14-w .bb{padding:1cqw 1.3cqw;margin-top:.6cqw}',
        '.r14.sq .r14-tp .cap{font-size:1.8cqw}.r14.sq .r14-w.line{font-size:1.7cqw}.r14.sq .r14-w.line b{font-size:2.2cqw}',
        '.r14.sq .zt .l{font-size:1.8cqw}.r14.sq .zt .d{font-size:1.6cqw}.r14.sq .zt .r .t{font-size:2.1cqw}.r14.sq .zt .th{font-size:1.45cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        partner = !!partner && R.zoom(spec);
        var S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), HH = sq ? 100 : 129.41, out = root(C, sq, partner);
        var TT = { cap: sq ? 9 : 11, k: 0.44, lh: 1.0, n: 3 };
        var kick = partner ? 'For families across the Pacific!' : 'LDAH presents!';
        function sess(x, y, w) {
          if (S.length === 1) {
            var s = S[0];
            return box('r14-s big', x, y, w, null, '<div class="dn" style="font-size:' + (sq ? 10 : 13) + 'cqw">' + s.day + '</div><div><div class="r14-cap cap">' + s.dow + ' · ' + s.monFull + '</div><div class="tm">' + s.time + '</div>' + (s.lesson ? '<div class="tp">' + s.lesson + '</div>' : '') + '</div>');
          }
          return S.map(function (s, i) {
            return box('r14-s', x, y + i * (sq ? 9.4 : 11.6), w, null, '<div class="r14-cap cap">' + s.dow + ', ' + s.mon + ' ' + s.day + '</div><div class="tm">' + s.time + '</div>' + (s.lesson ? '<div class="tp">' + s.lesson + '</div>' : ''));
          }).join('');
        }
        function where(x, y, w) { return box('r14-w', x, y, w, null, '<div class="k">' + W.kicker + '!</div><div class="bb"><div class="a">' + W.line1 + '</div><div class="b">' + W.line2 + '</div></div>'); }
        // footer = one inked white panel (a real box, so callouts never land on it) with the QR inside
        function foot(r, qs) {
          return box('r14-ft', r[0], r[1], r[2], r[3], '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div><div class="bd">' + R.badges(spec, partner) + '</div>' +
            '<div class="r14-qr" style="width:' + f(qs) + 'cqw;height:' + f(qs) + 'cqw">' + H.qrImg(spec, partner) + '</div>');
        }
        function topicList(x, y, w) {
          if (!topics(S).length) return '';
          return box('r14-tp', x, y, w, null, S.map(function (s, i) { return s.lesson ? '<div class="r14-cap cap"><b>' + (S.length > 1 ? s.mon + ' ' + s.day : 'Topic') + '</b>' + s.lesson + '</div>' : ''; }).join(''));
        }
        var logo = function (x, y, w, h) { return box('r14-logo', x, y, w, h, R.logo(spec, partner)); };
        if (!sq && !partner) {
          out += art(HH, { id: 'a', A: [3, 3, 94, 63], b: [50, 34, 41, 20], Y: [[3, 68.5, 56, 42]], Rd: [[61, 68.5, 36, 42]] });
          out += logo(6.5, 6.5, 17, 14) + box('r14-cap', 70, 6.5, null, null, kick);
          out += titleBox('r14-ttl', spec, 19, 22, 62, 24, TT);
          out += box('r14-bub', 18, 52.5, 72, null, R.tagline(spec));
          out += sess(6.5, 72, 50);
          out += where(64.5, 72, 29);
          out += foot([3, 112.5, 94, 14.4], 11.4);
        } else if (!sq) {
          out += art(HH, { id: 'b', A: [3, 3, 94, 54], b: [52, 30, 39, 16.5], Y: [[3, 59.5, 94, 51]] });
          out += logo(6.5, 6.5, 25, 13) + box('r14-cap', 62, 6.5, null, null, kick);
          out += titleBox('r14-ttl', spec, 22, 20, 60, 20, TT);
          out += box('r14-bub', 16, 44.5, 74, null, R.tagline(spec));
          out += topicList(6.5, 62.5, 87);
          out += zoneTable(spec, 'zt', 6.5, 70.5, 86.5, 3.05);
          out += box('r14-w line', 6.5, 96.5, null, null, '<b>' + W.kicker + '!</b>' + W.line1 + ' ' + W.line2);
          out += foot([3, 112.5, 94, 14.4], 11.4);
        } else if (!partner) {
          out += art(HH, { id: 'c', A: [2.5, 2.5, 95, 42], b: [52, 21, 36, 14], Y: [[2.5, 46.5, 55, 38]], Rd: [[59.5, 46.5, 38, 38]] });
          out += logo(5, 5, 14, 11.5) + box('r14-cap', 74, 5, null, null, kick);
          out += titleBox('r14-ttl', spec, 22, 12.5, 60, 17, TT);
          out += box('r14-bub', 14, 34, 76, null, R.tagline(spec), 'padding:1cqw 6cqw');
          out += sess(5, 49, 50);
          out += where(62.5, 49, 32);
          out += foot([2.5, 86.3, 95, 11.6], 9.4);
        } else {
          out += art(HH, { id: 'd', A: [2.5, 2.5, 95, 31], b: [60, 16.5, 33, 11], Y: [[2.5, 35.5, 95, 49]] });
          out += logo(5, 5, 21, 11) + box('r14-cap', 5, 18, null, null, kick);
          out += titleBox('r14-ttl', spec, 35, 9.5, 50, 13.5, TT);
          out += box('r14-bub', 8, 26.2, 84, null, R.tagline(spec), 'padding:.7cqw 4cqw');
          out += topicList(5, 37.5, 90);
          out += zoneTable(spec, 'zt', 5, 43, 89, 2.45);
          out += box('r14-w line', 5, 64.5, null, null, '<b>' + W.kicker + '!</b>' + W.line1 + ' ' + W.line2);
          out += foot([2.5, 86.3, 95, 11.6], 9.4);
        }
        return out + '</div>';
      }
    };
  })());

  /* =====================================================================
     R15 · Kraft and stamps: brown kraft paper, a cream card taped down with masking tape,
     marker title, typewriter details on index cards, red and blue rubber-stamp ink marks.
     ===================================================================== */
  F.registerSet('R', 15, (function () {
    var KRAFT = '#C49A6C', BROWN = '#2E1F14', RED = '#B3261E', NAVY = '#24407A', CARD = '#FBF6EA', TAPE = '#EADFC0', C = 'r15';
    function tape(x, y, w, h, rot) {
      var n = 5, s = 'M' + f(x) + ' ' + f(y), i;
      for (i = 1; i <= n; i++) s += 'L' + f(x + w) + ' ' + f(y + (i - .5) * h / n + (i % 2 ? .25 : -.25));
      s += 'L' + f(x + w) + ' ' + f(y + h);
      s += 'L' + f(x) + ' ' + f(y + h);
      for (i = n; i >= 1; i--) s += 'L' + f(x + (i % 2 ? .35 : -.1)) + ' ' + f(y + (i - .5) * h / n);
      return '<path d="' + s + 'Z" fill="' + TAPE + '" fill-opacity=".86" stroke="#B9A57A" stroke-opacity=".35" stroke-width=".12" transform="rotate(' + rot + ' ' + f(x + w / 2) + ' ' + f(y + h / 2) + ')"/>';
    }
    function roundStamp(cx, cy, r, ink, top, mid, id) {
      var s = '<g opacity=".78" filter="url(#r15ink)">';
      s += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="none" stroke="' + ink + '" stroke-width="' + f(r * .07) + '"/>';
      s += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r * .62) + '" fill="none" stroke="' + ink + '" stroke-width="' + f(r * .035) + '"/>';
      s += '<path id="' + id + '" d="M' + f(cx - r * .8) + ' ' + f(cy) + 'A' + f(r * .8) + ' ' + f(r * .8) + ' 0 1 1 ' + f(cx + r * .8) + ' ' + f(cy) + 'A' + f(r * .8) + ' ' + f(r * .8) + ' 0 1 1 ' + f(cx - r * .8) + ' ' + f(cy) + '" fill="none"/>';
      s += '<text font-family="Special Elite,monospace" font-size="' + f(r * .19) + '" fill="' + ink + '" letter-spacing="' + f(r * .02) + '"><textPath href="#' + id + '">' + top + '</textPath></text>';
      s += '<text x="' + f(cx) + '" y="' + f(cy + r * .15) + '" text-anchor="middle" font-family="Special Elite,monospace" font-size="' + f(r * .38) + '" fill="' + ink + '">' + mid + '</text>';
      return s + '</g>';
    }
    function rectStamp(x, y, w, h, ink, txt, rot) {
      return '<g opacity=".72" filter="url(#r15ink)" transform="rotate(' + rot + ' ' + f(x + w / 2) + ' ' + f(y + h / 2) + ')"><rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" fill="none" stroke="' + ink + '" stroke-width=".5"/>' +
        '<rect x="' + f(x + .9) + '" y="' + f(y + .9) + '" width="' + f(w - 1.8) + '" height="' + f(h - 1.8) + '" fill="none" stroke="' + ink + '" stroke-width=".2"/>' +
        '<text x="' + f(x + w / 2) + '" y="' + f(y + h * .66) + '" text-anchor="middle" font-family="Special Elite,monospace" font-size="' + f(h * .36) + '" letter-spacing=".15" fill="' + ink + '">' + txt + '</text></g>';
    }
    function art(HH, o) {
      var s = '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true"><defs>';
      s += '<filter id="r15grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .32  0 0 0 0 .2  0 0 0 0 .1  0 0 0 -1.1 .62"/></filter>';
      s += '<filter id="r15fib" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .5" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .95  0 0 0 0 .85  0 0 0 0 .7  0 0 0 -1.6 .9"/></filter>';
      s += '<filter id="r15ink" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="11" result="t"/><feColorMatrix in="t" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.5" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>';
      s += '<filter id="r15sh" x="-5%" y="-5%" width="110%" height="115%"><feDropShadow dx=".2" dy=".45" stdDeviation=".45" flood-color="#3a2410" flood-opacity=".35"/></filter></defs>';
      s += '<rect width="100" height="' + f(HH) + '" fill="' + KRAFT + '"/>';
      s += '<rect width="100" height="' + f(HH) + '" filter="url(#r15fib)" opacity=".55"/>';
      s += '<rect width="100" height="' + f(HH) + '" filter="url(#r15grain)" opacity=".5"/>';
      // the main card
      var c = o.card;
      s += '<g transform="rotate(' + c[4] + ' ' + f(c[0] + c[2] / 2) + ' ' + f(c[1] + c[3] / 2) + ')"><rect x="' + f(c[0]) + '" y="' + f(c[1]) + '" width="' + f(c[2]) + '" height="' + f(c[3]) + '" fill="' + CARD + '" filter="url(#r15sh)"/>';
      s += '<line x1="' + f(c[0] + 4) + '" y1="' + f(c[1] + 6) + '" x2="' + f(c[0] + c[2] - 4) + '" y2="' + f(c[1] + 6) + '" stroke="' + RED + '" stroke-opacity=".35" stroke-width=".18"/></g>';
      (o.stamps || []).forEach(function (st) { s += st; });
      (o.tapes || []).forEach(function (t) { s += tape(t[0], t[1], t[2], t[3], t[4]); });
      return s + '</svg>';
    }
    return {
      name: 'Kraft and stamps: kraft paper, masking tape, rubber-stamp ink, marker and typewriter',
      fonts: 'family=Permanent+Marker&family=Special+Elite',
      css: [baseCss(C, KRAFT, BROWN, '"Special Elite",monospace'),
        '.r15 .r15-logo{background:#fff;display:flex;align-items:center;justify-content:center;padding:1cqw;box-shadow:.2cqw .5cqw 1cqw rgba(58,36,16,.35);transform:rotate(-2deg)}',
        '.r15 .r15-logo img{max-width:100%;max-height:100%;display:block}',
        '.r15 .r15-kick{font-size:1.7cqw;letter-spacing:.14em;color:' + RED + '}',
        '.r15 .r15-ttl{font-family:"Permanent Marker",cursive;color:' + BROWN + ';white-space:nowrap;transform:rotate(-1.2deg)}',
        '.r15 .r15-tag{font-size:2.5cqw;line-height:1.3;color:#4A3424}',
        '.r15 .r15-s{background:repeating-linear-gradient(#fff 0 2.6cqw,#CFE0F2 2.6cqw 2.75cqw);background-color:#fff;border-top:1.1cqw solid #F0D2CF;box-shadow:.2cqw .5cqw 1cqw rgba(58,36,16,.35);padding:1.4cqw 1.8cqw 1.2cqw}',
        '.r15 .r15-s .dw{font-family:"Permanent Marker",cursive;font-size:3cqw;line-height:1.05;color:' + RED + ';white-space:nowrap}',
        '.r15 .r15-s .tm{font-size:2.2cqw;line-height:1.3;white-space:nowrap}',
        '.r15 .r15-s .tp{font-size:2.2cqw;line-height:1.25;color:' + NAVY + '}',
        '.r15 .r15-s.one{display:flex;align-items:center;gap:2.4cqw}',
        '.r15 .r15-s.one .dn{font-family:"Permanent Marker",cursive;color:' + RED + ';font-size:9cqw;line-height:1}',
        '.r15 .r15-k{display:inline-block;border:.45cqw solid ' + RED + ';outline:.18cqw solid ' + RED + ';outline-offset:.35cqw;color:' + RED + ';font-size:2.6cqw;letter-spacing:.2em;padding:.3cqw 1.2cqw;opacity:.85;transform:rotate(-4deg)}',
        '.r15 .r15-w .a{font-family:"Permanent Marker",cursive;font-size:3cqw;line-height:1.1;margin-top:1.4cqw}',
        '.r15 .r15-w .b{font-size:2cqw;line-height:1.3;margin-top:.4cqw}',
        '.r15 .r15-w.line{white-space:nowrap;font-size:2cqw}',
        '.r15 .r15-w.line .r15-k{font-size:2cqw;margin-right:2cqw;transform:rotate(-2deg)}',
        '.r15 .r15-tp{font-size:2.2cqw;line-height:1.45}',
        '.r15 .r15-tp b{font-family:"Permanent Marker",cursive;font-weight:400;color:' + RED + ';margin-right:1.2cqw}',
        '.r15 .zt{background:' + CARD + ';box-shadow:.2cqw .5cqw 1cqw rgba(58,36,16,.35);padding:.6cqw 0}',
        '.r15 .zt .r{border-bottom:.12cqw dashed #CDBFA3}',
        '.r15 .zt .th{font-size:1.45cqw;letter-spacing:.14em;color:' + RED + '}',
        '.r15 .zt .l{font-size:2.05cqw}',
        '.r15 .zt .d{font-size:1.85cqw;color:#5A4433}',
        '.r15 .zt .r .t{font-family:"Permanent Marker",cursive;font-size:2.2cqw}',
        '.r15 .zt .r.h{background:rgba(242,201,76,.55)}',
        '.r15 .r15-ft .rg{font-family:"Permanent Marker",cursive;font-size:4.4cqw;line-height:1.1;white-space:nowrap;color:' + BROWN + '}',
        '.r15 .r15-ft .rg span{color:' + RED + '}',
        '.r15 .r15-ft .sm{font-size:1.75cqw;line-height:1.3;margin-top:.4cqw;color:' + BROWN + '}',
        '.r15 .r15-ft .bd{margin-top:1cqw}',
        '.r15 .r15-ft .bd>span:not(.vfx-logo){font-size:1.4cqw;border:.15cqw solid ' + BROWN + ';padding:.3cqw .8cqw;white-space:nowrap}',
        '.r15 .r15-qr{background:#fff;padding:1cqw;box-shadow:.2cqw .5cqw 1cqw rgba(58,36,16,.35);transform:rotate(2deg)}',
        '.r15.sq .r15-ft .rg{font-size:3.6cqw}.r15.sq .r15-ft .sm{font-size:1.5cqw;margin-top:.2cqw}.r15.sq .r15-ft .bd{margin-top:.6cqw}',
        '.r15.sq .r15-s{padding:.7cqw 1.5cqw .9cqw;border-top-width:.8cqw;background:repeating-linear-gradient(#fff 0 2.3cqw,#CFE0F2 2.3cqw 2.42cqw)}.r15.sq .r15-s .dw{font-size:2.5cqw}.r15.sq .r15-s .tm{font-size:1.85cqw}.r15.sq .r15-s .tp{font-size:1.85cqw}.r15.sq .r15-s.one .dn{font-size:7cqw}',
        '.r15.sq .r15-k{font-size:2.1cqw}.r15.sq .r15-w .a{font-size:2.5cqw;margin-top:1cqw}.r15.sq .r15-w .b{font-size:1.7cqw}',
        '.r15.sq .r15-tag{font-size:2.1cqw}.r15.sq .r15-kick{font-size:1.45cqw}.r15.sq .r15-tp{font-size:1.85cqw;line-height:1.35}.r15.sq .r15-w.line,.r15.sq .r15-w.line .r15-k{font-size:1.75cqw}',
        '.r15.sq .zt .l{font-size:1.8cqw}.r15.sq .zt .d{font-size:1.6cqw}.r15.sq .zt .r .t{font-size:1.9cqw}.r15.sq .zt .th{font-size:1.25cqw}'
      ].join('\n'),
      fn: function (spec, partner, sq, H) {
        partner = !!partner && R.zoom(spec);
        var S = R.sessions(spec), W = R.where(spec), G = R.register(spec, partner), HH = sq ? 100 : 129.41, out = root(C, sq, partner);
        var TT = { cap: sq ? 9 : 11, k: 0.6, lh: 1.12, n: 3 };
        var kick = partner ? 'FOR FAMILIES ACROSS THE PACIFIC' : 'LDAH PRESENTS';
        var st = function (cx, cy, r, id) { return roundStamp(cx, cy, r, RED, 'LEADERSHIP · ACHIEVEMENT · HAWAIʻI ·', 'LDAH', 'r15p' + id); };
        function sess(x, y, w) {
          if (S.length === 1) {
            var s = S[0];
            return box('r15-s one', x, y, w, null, '<div class="dn">' + s.day + '</div><div><div class="dw">' + s.dow + ', ' + s.monFull + '</div><div class="tm">' + s.time + '</div>' + (s.lesson ? '<div class="tp">' + s.lesson + '</div>' : '') + '</div>', 'transform:rotate(-1deg)');
          }
          return S.map(function (s, i) {
            return box('r15-s', x + (i ? 1.5 : 0), y + i * (sq ? 10.2 : 12), w, null, '<div class="dw">' + s.dow + ', ' + s.mon + ' ' + s.day + '</div><div class="tm">' + s.time + '</div>' + (s.lesson ? '<div class="tp">' + s.lesson + '</div>' : ''), 'transform:rotate(' + (i ? 1 : -1.2) + 'deg)');
          }).join('');
        }
        function where(x, y, w) { return box('r15-w', x, y, w, null, '<div class="r15-k">' + W.kicker + '</div><div class="a">' + W.line1 + '</div><div class="b">' + W.line2 + '</div>'); }
        function foot(x, y, qx, qy, qs) {
          return box('r15-ft', x, y, 70, null, '<div class="rg">' + G.big + '</div><div class="sm">' + G.small + '</div><div class="bd">' + R.badges(spec, partner) + '</div>')
            + box('r15-qr', qx, qy, qs, qs, H.qrImg(spec, partner));
        }
        function topicList(x, y, w) {
          if (!topics(S).length) return '';
          return box('r15-tp', x, y, w, null, S.map(function (s, i) { return s.lesson ? '<div><b>' + (S.length > 1 ? s.mon + ' ' + s.day : 'Topic:') + '</b>' + s.lesson + '</div>' : ''; }).join(''));
        }
        var logo = function (x, y, w, h) { return box('r15-logo', x, y, w, h, R.logo(spec, partner)); };
        if (!sq && !partner) {
          out += art(HH, { card: [6.5, 24, 87, 46, -.8], stamps: [st(84, 13.5, 8.5, 'a'), rectStamp(47, 8.5, 24, 7, NAVY, 'FAMILY EVENT', -6)],
            tapes: [[4, 23, 13, 3.6, -32], [83, 23, 13, 3.6, 30], [9, 3.8, 13, 3.4, -4], [80.5, 108.5, 12, 3.4, 8]] });
          out += logo(7, 6, 18, 15);
          out += box('r15-kick', 11, 27.5, null, null, kick);
          out += titleBox('r15-ttl', spec, 10, 32, 80, 25, TT);
          out += box('r15-tag', 11, 58.5, 78, null, R.tagline(spec));
          out += sess(6.5, 75, 54);
          out += where(66, 75, 28);
          out += foot(6.5, 113, 79, 111, 14);
        } else if (!sq) {
          out += art(HH, { card: [6.5, 25, 87, 34, -.8], stamps: [st(84, 13.5, 8.5, 'b')],
            tapes: [[4, 24, 13, 3.6, -32], [83, 24, 13, 3.6, 30], [12, 3.8, 13, 3.4, -4], [80.5, 108.5, 12, 3.4, 8]] });
          out += logo(7, 6, 26, 14);
          out += box('r15-kick', 11, 28.5, null, null, kick);
          out += titleBox('r15-ttl', spec, 10, 32.5, 80, 17, TT);
          out += box('r15-tag', 11, 50.5, 78, null, R.tagline(spec));
          out += topicList(8, 62, 84);
          out += zoneTable(spec, 'zt', 7, 70, 86, 3);
          out += box('r15-w line', 8, 97.5, null, null, '<span class="r15-k">' + W.kicker + '</span>' + W.line1 + ' ' + W.line2);
          out += foot(6.5, 113, 79, 111, 14);
        } else if (!partner) {
          out += art(HH, { card: [5, 19, 90, 33, -.6], stamps: [st(87, 10.5, 6.5, 'c'), rectStamp(46, 5.5, 21, 6, NAVY, 'FAMILY EVENT', -6)],
            tapes: [[2.5, 18, 11, 3, -32], [86.5, 18, 11, 3, 30], [7, 2.8, 11, 3, -4]] });
          out += logo(5.5, 4.5, 14, 12);
          out += box('r15-kick', 9, 21.5, null, null, kick);
          out += titleBox('r15-ttl', spec, 8, 25, 84, 18.5, TT);
          out += box('r15-tag', 9, 44.6, 82, null, R.tagline(spec));
          out += sess(5, 55, 56);
          out += where(66, 55, 29);
          out += foot(5, 85, 83, 84, 12);
        } else {
          out += art(HH, { card: [5, 17.5, 90, 23, -.6], stamps: [st(87, 9.5, 6, 'd')],
            tapes: [[2.5, 16.5, 11, 3, -32], [86.5, 16.5, 11, 3, 30], [10, 2.8, 11, 3, -4]] });
          out += logo(5.5, 4.5, 20, 11);
          out += box('r15-kick', 9, 19.6, null, null, kick);
          out += titleBox('r15-ttl', spec, 8, 22.5, 84, 11.5, TT);
          out += box('r15-tag', 9, 34.6, 82, null, R.tagline(spec));
          out += topicList(6, 42, 88);
          out += zoneTable(spec, 'zt', 5, 48.5, 90, 2.55);
          out += box('r15-w line', 6, 71.5, null, null, '<span class="r15-k">' + W.kicker + '</span>' + W.line1 + ' ' + W.line2);
          out += foot(5, 85, 83, 84, 12);
        }
        return out + '</div>';
      }
    };
  })());
})();
/* Virtual Event Builder: Random series, designs R16–R20 (STAGE, 2026-11-12).
   R16 Soft gradient glass · R17 Big date · R18 Atomic mid-century · R19 Notebook doodles · R20 Mosaic tiles.
   Every block of text is its own absolutely-positioned direct child of the flyer root (the layout check
   compares those), drawn art sits in one <svg> direct child, and each layout keeps open space for the
   guest speaker box and callouts that VEBFlyers.decorate() places afterwards. Sizes are in cqw
   (letter height = 129.41cqw, square = 100cqw). */
(function () {
  'use strict';
  var F = window.VEBFlyers; if (!F || !F.random || !F.registerSet) return;

  function f(n) { return String(Math.round(n * 100) / 100); }
  function plain(s) { return String(s || '').replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/gi, 'x'); }
  function st(fs, lh, extra) { return ' style="font-size:' + f(fs) + 'cqw;line-height:' + lh + ';' + (extra || '') + '"'; }

  /* Shared toolkit for one flyer. p = class prefix ('r16' ...). */
  function kit(p, spec, partner, sq, H) {
    var R = F.random, Z = R.zoom(spec), P = !!partner && Z;   // partner layout only for Zoom events
    var k = { R: R, H: H, spec: spec, Z: Z, P: P, sq: !!sq, HH: sq ? 100 : 129.41, p: p,
              S: R.sessions(spec), W: R.where(spec), G: R.register(spec, P), tag: R.tagline(spec) };
    k.v = sq ? (P ? 'psq' : 'sq') : (P ? 'pl' : 'l');
    k.box = function (cls, x, y, w, inner, extra) {
      return '<div class="' + cls + '" style="left:' + f(x) + 'cqw;top:' + f(y) + 'cqw;' + (w != null ? 'width:' + f(w) + 'cqw;' : '') + (extra || '') + '">' + inner + '</div>';
    };
    k.lines = function (html, fs, w, ch) { return Math.max(1, Math.ceil(plain(html).length * fs * (ch || 0.5) / w)); };
    k.text = function (cls, x, y, w, html, fs, lh, ch, extra) {
      var n = k.lines(html, fs, w, ch);
      return { html: k.box(cls, x, y, w, html, 'font-size:' + f(fs) + 'cqw;line-height:' + lh + ';' + (extra || '')), h: n * fs * lh, n: n };
    };
    // Title: fewest lines that reach ok*cap, else the line count that gives the biggest type.
    k.title = function (cls, x, y, w, maxL, cap, ch, lh, extra, ok, wrap) {
      var best = null;
      for (var n = 1; n <= maxL; n++) {
        var ls = R.titleLines(spec, n), fs = R.fitSize(ls, w, cap, ch);
        if (!best || fs > best.fs + 0.01) best = { ls: ls, fs: fs };
        if (fs >= cap * (ok || 0.8)) { best = { ls: ls, fs: fs }; break; }
      }
      var inner = wrap ? best.ls.map(wrap).join('<br>') : best.ls.join('<br>');
      return { html: k.box(cls, x, y, w, inner, 'font-size:' + f(best.fs) + 'cqw;line-height:' + lh + ';' + (extra || '')), h: best.ls.length * best.fs * lh, fs: best.fs, n: best.ls.length };
    };
    k.logo = function (cls, x, y, w, h, extra) { return k.box(cls, x, y, w, R.logo(spec, P), 'height:' + f(h) + 'cqw;' + (extra || '')); };
    k.qr = function (cls, x, y, s, extra) { return k.box(cls, x, y, s, H.qrImg(spec, P), 'height:' + f(s) + 'cqw;' + (extra || '')); };
    k.badges = function (cls, x, y, w, h, extra) { return k.box(cls, x, y, w, '<div class="' + p + '-bdr">' + R.badges(spec, P) + '</div>', 'height:' + f(h) + 'cqw;' + (extra || '')); };
    // 7-row local time table for the Pacific partner flyers.
    k.table = function (cls, x, y, w, rh, fs) {
      var rows = H.zoneRows(spec.sessions || []);
      var h = '<div class="' + p + '-tr th" style="height:' + f(rh * 0.9) + 'cqw;font-size:' + f(fs * 0.78) + 'cqw"><span>WHERE YOU ARE</span><span>DAY</span><span>YOUR TIME</span></div>';
      h += rows.map(function (r) {
        return '<div class="' + p + '-tr' + (r.home ? ' hm' : '') + '" style="height:' + f(rh) + 'cqw;font-size:' + f(fs) + 'cqw"><span>' + r.label + '</span><span>' + r.days + '</span><span>' + r.time + '</span></div>';
      }).join('');
      return { html: k.box(cls, x, y, w, h), h: rh * 7 + rh * 0.9 };
    };
    // Footer: register lines + sponsor row on the left, QR on the right, bottoms aligned at yb.
    k.foot = function (x, yb, w, qs, big, sm, bh, o) {
      o = o || {};
      var wt = w - qs - (o.gapQ == null ? 3 : o.gapQ), bigFs = Math.min(big, wt / (25 * (o.bch || 0.6)));
      var sl = k.lines(k.G.small, sm, wt, o.sch || 0.5), h = bigFs * 1.15 + 0.7 + sl * sm * 1.3 + 1 + bh, top = yb - h;
      var html = k.box(p + '-rg', x, top, wt, k.G.big, 'font-size:' + f(bigFs) + 'cqw;line-height:1.15;' + (o.al || ''))
        + k.box(p + '-sm', x, top + bigFs * 1.15 + 0.7, wt, k.G.small.replace(/(\S+)$/, '<span style="white-space:nowrap">$1</span>'), 'font-size:' + f(sm) + 'cqw;line-height:1.3;' + (o.al || ''))
        + k.badges(p + '-bd', x, yb - bh, wt, bh)
        + k.qr(p + '-qr', x + w - qs, yb - qs, qs);
      return { html: html, top: Math.min(top, yb - qs) };
    };
    k.root = function (inner, cls) { return '<div class="vfx ' + p + (sq ? ' sq' : '') + (P ? ' partner' : '') + (cls ? ' ' + cls : '') + '">' + inner + '</div>'; };
    return k;
  }

  // Session cards side by side (1 or 2). o: cls, gap, pad, padX, d, m, t, l, dense, lch
  function sessCards(k, x, y, w, o) {
    var S = k.S, n = Math.max(1, S.length), cw = (w - o.gap * (n - 1)) / n, inner = cw - 2 * o.padX, ll = 0;
    S.forEach(function (s) { if (s.lesson) ll = Math.max(ll, k.lines(s.lesson, o.l, inner, o.lch || 0.5)); });
    var tl = Math.max(1, k.lines(S[0] ? S[0].time : '', o.t, inner, 0.55));
    var h = 2 * o.pad + (o.dense ? o.m * 1.15 : o.d * 1.3 + o.m * 1.1) + tl * o.t * 1.3 + (ll ? ll * o.l * 1.25 + 0.5 : 0);
    var html = S.map(function (s, i) {
      var top = o.dense ? '<div class="m"' + st(o.m, 1.15) + '><small>' + s.dow + '</small> ' + s.mon + ' ' + s.day + '</div>'
                        : '<div class="d"' + st(o.d, 1.3) + '>' + s.dow + '</div><div class="m"' + st(o.m, 1.1) + '>' + s.mon + ' ' + s.day + '</div>';
      return k.box(o.cls, x + i * (cw + o.gap), y, cw, top + '<div class="t"' + st(o.t, 1.3) + '>' + s.time + '</div>'
        + (s.lesson ? '<div class="l"' + st(o.l, 1.25, 'margin-top:.5cqw') + '>' + s.lesson + '</div>' : ''),
        'height:' + f(h) + 'cqw;padding:' + f(o.pad) + 'cqw ' + f(o.padX) + 'cqw;');
    }).join('');
    return { html: html, h: h, cw: cw };
  }
  // Where card: kicker + line1 + line2. o: cls, pad, padX, kf, l1, l2
  function whereCard(k, x, y, w, o) {
    var W = k.W, inner = w - 2 * o.padX, n1 = W.line1 ? k.lines(W.line1, o.l1, inner, 0.55) : 0, n2 = W.line2 ? k.lines(W.line2, o.l2, inner, 0.5) : 0;
    var h = 2 * o.pad + o.kf * 1.3 + n1 * o.l1 * 1.2 + n2 * o.l2 * 1.3;
    return { html: k.box(o.cls, x, y, w, '<div class="k"' + st(o.kf, 1.3) + '>' + W.kicker + '</div>'
      + (W.line1 ? '<div class="a"' + st(o.l1, 1.2) + '>' + W.line1 + '</div>' : '') + (W.line2 ? '<div class="b"' + st(o.l2, 1.3) + '>' + W.line2 + '</div>' : ''),
      'height:' + f(h) + 'cqw;padding:' + f(o.pad) + 'cqw ' + f(o.padX) + 'cqw;'), h: h };
  }
  // Copy of a variant table with its type sizes scaled by sc (used to shrink a crowded layout until it fits).
  var SCALE = ['cap', 'tagFs', 'd', 'm', 't', 'l', 'w1', 'w2', 'kf', 'dw', 't2', 'chip', 'pad', 'rh', 'tfs'];
  function sv(V, sc) { var o = {}; for (var key in V) o[key] = (SCALE.indexOf(key) >= 0 && typeof V[key] === 'number') ? V[key] * sc : V[key]; return o; }
  function fitStack(lim, build) { var c; for (var sc = 1; ; sc -= 0.04) { c = build(sc); if (c.y <= lim || sc < 0.66) return c; } }
  function baseCss(p, font, color, bg) {
    return '.' + p + '{container-type:inline-size;aspect-ratio:8.5/11;position:relative;overflow:hidden;font-family:' + font + ';color:' + color + ';' + bg + '}'
      + '.' + p + '.sq{aspect-ratio:1/1}.' + p + ' *{box-sizing:border-box}'
      + '.' + p + '>div{position:absolute;z-index:2}.' + p + '>svg{position:absolute;left:0;top:0;width:100%;height:100%;z-index:0;pointer-events:none}'
      + '.' + p + ' .' + p + '-logo img{width:100%;height:100%;object-fit:contain;display:block}'
      + '.' + p + ' .' + p + '-qr{background:#fff;padding:.6cqw}.' + p + ' .' + p + '-qr img{width:100%;height:100%;display:block}'
      + '.' + p + ' .' + p + '-bdr{display:flex;align-items:center;gap:1.2cqw;height:100%;flex-wrap:nowrap}'
      + '.' + p + ' .' + p + '-bdr>span:not(.vfx-logo){font-weight:700;font-size:1.7cqw;white-space:nowrap}'
      + '.' + p + ' .' + p + '-tr{display:grid;grid-template-columns:37% 36% 27%;align-items:center;padding:0 1.2cqw;white-space:nowrap}'
      + '.' + p + ' .' + p + '-tr span:last-child{text-align:right}'
      + '.' + p + ' .' + p + '-rg span{white-space:nowrap}';
  }
  // A generic content stack (title, tagline, sessions, where, [table]) used by R16/R18/R19/R20.
  function stack(k, c) {
    var o = '', y = c.top, x = c.x, w = c.w;
    var t = k.title(c.p + '-ttl', x, y, w, c.maxL, c.cap, c.ch, c.lh, c.tAl || '', c.ok, c.wrap); o += t.html; y += t.h + c.g1;
    if (c.after) { o += c.after(y); y += c.afterH || 0; }
    if (k.tag) { var g = k.text(c.p + '-tag', x + (c.tagX || 0), y, c.tagW || w, k.tag, c.tagFs, 1.25, c.tagCh || 0.5, c.tAl || ''); o += g.html; y += g.h + c.g2; }
    var row = c.row || k.S.length < 2, rowW = row ? (k.S.length > 1 ? w * 0.68 : w * 0.56) : w;
    var s = c.sess(k, x, y, rowW); o += s.html;
    if (row) { var wh = c.where(k, x + rowW + c.gapX, y, w - rowW - c.gapX, s.h); o += wh.html; y += Math.max(s.h, wh.h) + c.g3; }
    else { y += s.h + c.g3; var wh2 = c.where(k, c.whX == null ? x : c.whX, y, c.whW || w); o += wh2.html; y += wh2.h + c.g3; }
    if (k.P) { var tb = k.table(c.p + '-tb', x, y, w, c.rh, c.tfs); o += tb.html; y += tb.h; }
    return { html: o, y: y, t: t };
  }

  /* =================== R16 · Soft gradient glass =================== */
  F.registerSet('R', 16, (function () {
    var INK = '#221a4c', SUB = '#4a3f86', PINK = '#d61f74', VIO = '#6d28d9';
    var BG = 'background-color:#f4f0ff;background-image:'
      + 'radial-gradient(ellipse 55% 42% at 8% 14%,rgba(255,122,182,.9),rgba(255,122,182,0) 100%),'
      + 'radial-gradient(ellipse 58% 40% at 96% 26%,rgba(139,92,246,.75),rgba(139,92,246,0) 100%),'
      + 'radial-gradient(ellipse 60% 38% at 4% 72%,rgba(56,189,248,.62),rgba(56,189,248,0) 100%),'
      + 'radial-gradient(ellipse 55% 40% at 98% 92%,rgba(253,170,100,.85),rgba(253,170,100,0) 100%),'
      + 'radial-gradient(ellipse 45% 30% at 58% 52%,rgba(94,234,212,.5),rgba(94,234,212,0) 100%),'
      + 'radial-gradient(ellipse 40% 26% at 40% 104%,rgba(244,114,182,.55),rgba(244,114,182,0) 100%)';
    var GL = 'background:rgba(255,255,255,.6);border:.22cqw solid rgba(255,255,255,.95);border-radius:2.6cqw;box-shadow:0 1cqw 3.2cqw rgba(70,40,150,.17),inset 0 .2cqw 0 rgba(255,255,255,.7)';
    function sess(V) { return function (k, x, y, w) {
      return sessCards(k, x, y, w, { cls: 'r16-card r16-s', gap: V.gap, pad: V.pad, padX: V.padX, d: V.d, m: V.m, t: V.t, l: V.l, dense: V.dense });
    }; }
    function where(V) { return function (k, x, y, w, h) {
      var r = whereCard(k, x, y, w, { cls: 'r16-card r16-w', pad: V.pad, padX: V.padX, kf: V.d, l1: V.w1, l2: V.w2 });
      if (h && h > r.h) r.html = r.html.replace('height:' + f(r.h) + 'cqw', 'height:' + f(h) + 'cqw');
      return r;
    }; }
    var VS = {
      l:   { logo: [5, 5, 17, 17], top: 27, cap: 13, maxL: 3, tagFs: 3.3, gap: 3, pad: 2.3, padX: 2.8, d: 1.9, m: 5.2, t: 2.5, l: 2.4, w1: 3, w2: 2.3, dense: false, row: false, whW: 56, rh: 0, tfs: 0, foot: [4, 18, 4.1, 2.2, 5.6] },
      pl:  { logo: [5, 5, 27, 13], top: 21.5, cap: 10, maxL: 3, tagFs: 2.9, gap: 2.4, pad: 1.7, padX: 2.2, d: 1.6, m: 3.6, t: 2.1, l: 2, w1: 2.4, w2: 1.9, dense: true, row: true, rh: 3.15, tfs: 1.85, foot: [3.5, 15, 3.6, 2, 5] },
      sq:  { logo: [5, 4.5, 13, 13], top: 21, cap: 9.5, maxL: 3, tagFs: 2.7, gap: 2, pad: 1.6, padX: 2, d: 1.5, m: 3.6, t: 2, l: 1.9, w1: 2.3, w2: 1.8, dense: true, row: true, rh: 0, tfs: 0, foot: [3, 13.5, 3.3, 1.85, 4.4] },
      psq: { logo: [5, 4, 20, 9.5], top: 16, cap: 6.2, maxL: 2, tagFs: 2.2, gap: 1.6, pad: 1.1, padX: 1.6, d: 1.3, m: 2.7, t: 1.75, l: 1.65, w1: 1.9, w2: 1.6, dense: true, row: true, rh: 3.05, tfs: 1.65, foot: [2.6, 11.5, 2.9, 1.6, 3.6] }
    };
    return {
      name: 'Soft gradient glass: blurred colour blobs behind frosted cards',
      fonts: 'family=Plus+Jakarta+Sans:wght@400;500;600;700;800',
      css: baseCss('r16', '"Plus Jakarta Sans",Arial,sans-serif', INK, BG)
        + '.r16 .r16-card,.r16 .r16-gl{' + GL + '}.r16>.r16-gl{z-index:1}'
        + '.r16 .r16-logo{' + GL + ';padding:1.6cqw;border-radius:50%}.r16.partner .r16-logo{border-radius:2.6cqw;padding:1.2cqw 1.8cqw}'
        + '.r16 .r16-ttl{font-weight:800;letter-spacing:-.025em;white-space:nowrap;color:' + INK + '}'
        + '.r16 .r16-tag{font-weight:500;color:' + SUB + '}'
        + '.r16 .r16-s .d{font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:' + PINK + '}'
        + '.r16 .r16-s .m{font-weight:800;letter-spacing:-.02em;white-space:nowrap}.r16 .r16-s .m small{font-size:.62em;letter-spacing:.16em;text-transform:uppercase;color:' + PINK + ';vertical-align:.12em;margin-right:.3em}'
        + '.r16 .r16-s .t{font-weight:600;color:' + VIO + '}.r16 .r16-s .l{font-weight:500;color:' + SUB + '}'
        + '.r16 .r16-w .k{font-weight:800;letter-spacing:.2em;color:' + PINK + '}.r16 .r16-w .a{font-weight:700}.r16 .r16-w .b{font-weight:500;color:' + SUB + '}'
        + '.r16 .r16-tb{' + GL + ';padding:.6cqw 0;overflow:hidden}.r16 .r16-tr{color:' + INK + ';font-weight:500}.r16 .r16-tr.th{font-weight:800;letter-spacing:.14em;color:' + PINK + '}'
        + '.r16 .r16-tr.hm{background:linear-gradient(90deg,#f9a8d4,#c4b5fd);font-weight:800}'
        + '.r16 .r16-rg{font-weight:800;letter-spacing:-.01em}.r16 .r16-rg span{color:' + VIO + '}.r16 .r16-sm{font-weight:500;color:' + SUB + '}'
        + '.r16 .r16-qr{border-radius:1.4cqw;box-shadow:0 .6cqw 1.6cqw rgba(70,40,150,.2)}',
      fn: function (spec, partner, sq, H) {
        var k = kit('r16', spec, partner, sq, H), V = VS[k.v], HH = k.HH, o = '';
        o += '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">'
          + [[30, 9, .5], [44, 14, .35], [9, 52, .4], [93, 60, .45], [70, 4, .3], [24, HH - 30, .35], [88, HH - 40, .3]].map(function (d) { return '<circle cx="' + d[0] + '" cy="' + f(d[1]) + '" r="' + d[2] + '" fill="#fff" opacity=".9"/>'; }).join('')
          + '</svg>';
        o += k.logo('r16-logo', V.logo[0], V.logo[1], V.logo[2], V.logo[3]);
        var FT = V.foot, yb = HH - FT[0] - 2, ft = k.foot(FT[0] + 3.2, yb, 100 - 2 * FT[0] - 5, FT[1], FT[2], FT[3], FT[4]), gt = ft.top - 2.2;
        var c = fitStack(gt - (sq ? 3 : 4), function (sc) { var W2 = sv(V, sc);
          return stack(k, { p: 'r16', x: 6, w: 88, top: V.top, maxL: V.maxL, cap: W2.cap, ch: 0.6, lh: 1.04, g1: sq ? 1.4 : 2, g2: sq ? 2 : 3, g3: sq ? 2 : 2.6, gapX: V.gap,
            tagFs: W2.tagFs, tagW: 84, sess: sess(W2), where: where(W2), row: V.row, whW: V.whW, rh: W2.rh, tfs: W2.tfs }); });
        o += c.html;
        o += k.box('r16-gl', FT[0], gt, 100 - 2 * FT[0], '', 'height:' + f(HH - FT[0] - gt) + 'cqw;');
        o += ft.html;
        return k.root(o);
      }
    };
  })());

  /* =================== R17 · Big date (Swiss typographic) =================== */
  F.registerSet('R', 17, (function () {
    var INK = '#111111', RED = '#E63312', GREY = '#5b5b5b', PAPER = '#F6F4EF';
    var VS = {
      l:   { logo: [5, 5, 20, 11], rule: 19, N: 52, ny: 19, mf: 9, tf: 2.6, ttop: 0, cap: 11, maxL: 3, tagFs: 3.1, rk: 1.75, rv: 2.7, rowH: 0, fr: 27, foot: [5, 15, 4.4, 2.2, 5.4] },
      pl:  { logo: [5, 5, 26, 11], rule: 19, N: 34, ny: 20.5, mf: 6.4, tf: 2.3, cap: 8.4, maxL: 2, tagFs: 2.7, rk: 1.5, rv: 2.3, rh: 3.0, tfs: 1.8, fr: 22, foot: [5, 13, 3.6, 1.95, 4.6] },
      sq:  { logo: [5, 4.5, 15, 9], rule: 16, N: 36, ny: 16.5, mf: 6.2, tf: 2.1, cap: 7.4, maxL: 2, tagFs: 2.45, rk: 1.4, rv: 2.15, fr: 19.5, foot: [5, 13, 3.4, 1.85, 4.4] },
      psq: { logo: [5, 4, 19, 8], rule: 14.5, N: 21, ny: 15.5, mf: 4.2, tf: 1.9, cap: 5.6, maxL: 2, tagFs: 2.05, rk: 1.25, rv: 1.85, rh: 3.15, tfs: 1.62, fr: 14.6, foot: [4.5, 11.5, 2.9, 1.6, 3.5] }
    };
    return {
      name: 'Big date: Swiss poster with the first day as a giant numeral',
      fonts: 'family=Archivo:wght@400;500;600;700;800;900',
      css: baseCss('r17', 'Archivo,Arial,sans-serif', INK, 'background:' + PAPER)
        + '.r17 .r17-num{font-weight:900;color:' + RED + ';letter-spacing:-.065em;line-height:.8;white-space:nowrap}'
        + '.r17 .r17-mo{font-weight:900;letter-spacing:-.02em;text-transform:uppercase;line-height:.92}.r17 .r17-mo i{font-style:normal;color:' + RED + '}'
        + '.r17 .r17-tm{font-weight:600}.r17 .r17-tm b{display:block;font-weight:800;letter-spacing:.16em;color:' + RED + ';font-size:.62em;margin-bottom:.5cqw}'
        + '.r17 .r17-ttl{font-weight:900;letter-spacing:-.03em;white-space:nowrap}'
        + '.r17 .r17-tag{font-weight:500;color:' + GREY + '}'
        + '.r17 .r17-row{display:grid;border-top:.2cqw solid ' + INK + ';padding-top:.9cqw}.r17 .r17-row .k{font-weight:800;letter-spacing:.16em;color:' + RED + ';text-transform:uppercase;padding-top:.3em}.r17 .r17-row .v{font-weight:600}.r17 .r17-row .v em{font-style:normal;font-weight:400;color:' + GREY + '}'
        + '.r17 .r17-tb{border-top:.35cqw solid ' + INK + ';border-bottom:.2cqw solid ' + INK + '}.r17 .r17-tr{border-bottom:.1cqw solid #cfcac0;font-weight:500}.r17 .r17-tr:last-child{border-bottom:0}.r17 .r17-tr.th{font-weight:800;letter-spacing:.14em;color:' + GREY + '}.r17 .r17-tr.hm{background:' + RED + ';color:#fff;font-weight:800}'
        + '.r17 .r17-rg{font-weight:900;letter-spacing:-.02em}.r17 .r17-rg span{color:' + RED + '}.r17 .r17-sm{font-weight:500;color:' + GREY + '}'
        + '.r17 .r17-qr{padding:0;background:#fff}.r17 .r17-k{font-weight:800;letter-spacing:.2em;color:' + GREY + ';white-space:nowrap}',
      fn: function (spec, partner, sq, H) {
        var k = kit('r17', spec, partner, sq, H), V0 = VS[k.v], HH = k.HH, S = k.S, s0 = S[0] || { day: '', mon: '', dow: '', time: '', lesson: '' };
        var FT = V0.foot, ft = k.foot(5, HH - FT[0], 90, FT[1], FT[2], FT[3], FT[4], { bch: 0.62 }), frY = Math.min(HH - V0.fr, ft.top - 2.4);
        function build(sc) {
          var V = {}, key; for (key in V0) V[key] = V0[key];
          ['N', 'mf', 'tf', 'cap', 'tagFs', 'rk', 'rv', 'rh', 'tfs'].forEach(function (q) { if (V[q]) V[q] *= (q === 'N' ? Math.max(sc, 0.8) * sc : sc); });
          var o = '', digits = String(s0.day).length || 1, N = V.N * (digits === 1 ? 1.15 : 1), numW = digits * 0.6 * N - 0.065 * N * (digits - 1);
          var ny = V.ny + 2.2, rc = 5 + numW + 3, rw = 95 - rc, nh = N * 0.8;
          // art: hairline rules + one red square, Swiss grid ticks
          var svg = '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">'
            + '<rect x="5" y="' + f(V.rule - 0.18) + '" width="90" height=".36" fill="' + INK + '"/>'
            + '<rect x="5" y="' + f(frY - 0.18) + '" width="90" height=".36" fill="' + INK + '"/>'
            + '<rect x="' + f(rc) + '" y="' + f(V.rule + 1.6) + '" width="1.6" height="1.6" fill="' + RED + '"/>';
          [5, 27.5, 50, 72.5, 95].forEach(function (x) { svg += '<line x1="' + x + '" y1="' + f(V.rule - 1.2) + '" x2="' + x + '" y2="' + f(V.rule) + '" stroke="' + INK + '" stroke-width=".25"/>'; });
          o += svg + '</svg>';
          o += k.logo('r17-logo', V.logo[0], V.logo[1], V.logo[2], V.logo[3], 'object-position:left');
          // hero numeral + month/day/time column
          o += k.box('r17-num', 3.6, ny - N * 0.06, null, String(s0.day), 'font-size:' + f(N) + 'cqw;height:' + f(nh + N * 0.06) + 'cqw;');
          var mfs = Math.min(V.mf, rw / (3 * 0.66)), cy = ny + 1.6 + 2.4;
          o += k.box('r17-mo', rc, cy, rw, s0.mon + '<br><i>' + s0.dow + '</i>', 'font-size:' + f(mfs) + 'cqw;');
          cy += mfs * 0.92 * 2 + (sq ? 1.6 : 2.4);
          var tm = k.text('r17-tm', rc, cy, rw, s0.time, V.tf, 1.25, 0.55);
          o += k.box('r17-tm', rc, cy, rw, '<b>' + (S.length > 1 ? 'FIRST SESSION' : 'TIME') + '</b>' + s0.time, 'font-size:' + f(V.tf) + 'cqw;line-height:1.25;');
          cy += tm.h + V.tf * 0.62 * 1.3 + 1.2;
          if (k.P) { // the where line sits in the side column on partner flyers
            var wt = k.text('r17-tm', rc, cy, rw, '<b>' + k.W.kicker + '</b>' + k.W.line1 + ' ' + k.W.line2, V.tf * 0.92, 1.25, 0.52); o += wt.html; cy += wt.h + V.tf * 0.92 * 0.62 * 1.3 + 0.5;
          }
          var y = Math.max(ny + nh, cy) + (sq ? 2.2 : 3.2);
          var t = k.title('r17-ttl', 5, y, 90, V.maxL, V.cap, 0.6, 0.98); o += t.html; y += t.h + (sq ? 1 : 1.6);
          if (k.tag) { var g = k.text('r17-tag', 5, y, 86, k.tag, V.tagFs, 1.25, 0.5); o += g.html; y += g.h + (sq ? 1.6 : 2.6); }
          // Swiss data rows
          var rows = [];
          S.forEach(function (s, i) {
            if (i === 0) { if (s.lesson) rows.push([S.length > 1 ? '01' : 'TOPIC', s.lesson]); }
            else rows.push(['0' + (i + 1), s.dow + ', ' + s.mon + ' ' + s.day + ' <em>' + s.time + '</em>' + (s.lesson ? ': ' + s.lesson : '')]);
          });
          if (!k.P) rows.push([k.W.kicker, k.W.line1 + (k.W.line2 ? ' <em>' + k.W.line2 + '</em>' : '')]);
          var kc = sq ? 14 : 15.5;
          rows.forEach(function (r) {
            var n = k.lines(r[1], V.rv, 90 - kc, 0.52), h = n * V.rv * 1.25 + 0.9 + (sq ? 1.1 : 1.6);
            o += k.box('r17-row', 5, y, 90, '<div class="k"' + st(V.rk, 1.3) + '>' + r[0] + '</div><div class="v"' + st(V.rv, 1.25) + '>' + r[1] + '</div>', 'grid-template-columns:' + kc + 'cqw 1fr;');
            y += h;
          });
          if (k.P) { var tb = k.table('r17-tb', 5, y + 0.4, 90, V.rh, V.tfs); o += tb.html; y += tb.h + 0.4; }
          return { html: o, y: y };
        }
        var c = fitStack(frY - (sq ? 3 : 3.5), build);
        return k.root(c.html + ft.html);
      }
    };
  })());

  /* =================== R18 · Atomic mid-century =================== */
  F.registerSet('R', 18, (function () {
    var CREAM = '#F8EFD9', TEAL = '#1C8C8A', MUST = '#E9B23B', ORNG = '#E2652B', BRN = '#3B2A1E';
    function star(cx, cy, r, fill, pts) { // n-point starburst
      pts = pts || 8; var d = '';
      for (var i = 0; i < pts * 2; i++) { var a = Math.PI * i / pts - Math.PI / 2, rr = i % 2 ? r * 0.28 : r; d += (i ? 'L' : 'M') + f(cx + rr * Math.cos(a)) + ' ' + f(cy + rr * Math.sin(a)); }
      return '<path d="' + d + 'Z" fill="' + fill + '"/>';
    }
    function boomerang(cx, cy, s, rot, fill) {
      return '<path transform="translate(' + f(cx) + ' ' + f(cy) + ') rotate(' + rot + ') scale(' + s + ')" d="M-5 1 C-3 -3 3 -3 5 1 C4 2 3 2 2.4 1.1 C1 -.6 -1 -.6 -2.4 1.1 C-3 2 -4 2 -5 1Z" fill="' + fill + '"/>';
    }
    function atom(cx, cy, r) {
      return [0, 60, 120].map(function (a, i) {
        return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + r + '" ry="' + f(r * 0.34) + '" transform="rotate(' + a + ' ' + cx + ' ' + cy + ')" fill="none" stroke="' + BRN + '" stroke-width=".32"/>'
          + '<circle cx="' + f(cx + r * Math.cos(a * Math.PI / 180)) + '" cy="' + f(cy + r * Math.sin(a * Math.PI / 180)) + '" r=".75" fill="' + [ORNG, TEAL, MUST][i] + '"/>';
      }).join('') + '<circle cx="' + cx + '" cy="' + cy + '" r="1.4" fill="' + ORNG + '"/>';
    }
    function sess(V) { return function (k, x, y, w) {
      return sessCards(k, x, y, w, { cls: 'r18-s', gap: V.gap, pad: V.pad, padX: V.padX, d: V.d, m: V.m, t: V.t, l: V.l, dense: V.dense });
    }; }
    function where(V) { return function (k, x, y, w, h) {
      var r = whereCard(k, x, y, w, { cls: 'r18-w', pad: V.pad, padX: V.padX, kf: V.d, l1: V.w1, l2: V.w2 });
      if (h && h > r.h) r.html = r.html.replace('height:' + f(r.h) + 'cqw', 'height:' + f(h) + 'cqw');
      return r;
    }; }
    var VS = {
      l:   { logo: [6, 5, 16, 16], scr: [6, 25, 6.2], top: 33.5, cap: 11.5, maxL: 3, tagFs: 3.3, gap: 3, pad: 2.2, padX: 2.8, d: 2.6, m: 5.4, t: 2.5, l: 2.4, w1: 2.9, w2: 2.3, dense: false, row: false, whW: 58, band: 25, foot: [3.5, 16, 4.2, 2.2, 5.4] },
      pl:  { logo: [6, 5, 26, 12], scr: [6, 19.5, 4.8], top: 25.5, cap: 9, maxL: 3, tagFs: 2.8, gap: 2.4, pad: 1.6, padX: 2, d: 1.6, m: 3.5, t: 2.1, l: 2, w1: 2.3, w2: 1.85, dense: true, row: true, rh: 3.1, tfs: 1.85, band: 20, foot: [3, 13.5, 3.7, 2, 4.8] },
      sq:  { logo: [5, 4.5, 13, 13], scr: [5, 19.5, 4.6], top: 25.5, cap: 8.6, maxL: 3, tagFs: 2.6, gap: 2, pad: 1.5, padX: 1.9, d: 1.5, m: 3.4, t: 1.95, l: 1.85, w1: 2.2, w2: 1.75, dense: true, row: true, band: 18, foot: [2.8, 12.5, 3.3, 1.85, 4.3] },
      psq: { logo: [5, 4, 19, 9], scr: [27, 5.8, 3.6], top: 15.2, cap: 5.8, maxL: 2, tagFs: 2.1, gap: 1.5, pad: 1, padX: 1.5, d: 1.25, m: 2.6, t: 1.7, l: 1.6, w1: 1.85, w2: 1.55, dense: true, row: true, rh: 3.05, tfs: 1.6, band: 15.5, foot: [2.4, 11, 2.9, 1.6, 3.5] }
    };
    return {
      name: 'Atomic mid-century: starbursts, boomerangs and orbits in teal, mustard and orange',
      fonts: 'family=Yellowtail&family=Josefin+Sans:wght@400;600;700',
      css: baseCss('r18', '"Josefin Sans",Arial,sans-serif', BRN, 'background:' + CREAM)
        + '.r18 .r18-logo{background:#fff;border-radius:50%;padding:1.8cqw;box-shadow:0 0 0 .7cqw ' + TEAL + ',0 0 0 1.4cqw ' + MUST + '}.r18.partner .r18-logo{border-radius:2cqw;padding:1cqw 1.6cqw}'
        + '.r18 .r18-scr{font-family:Yellowtail,cursive;color:' + ORNG + ';white-space:nowrap;line-height:1.1}'
        + '.r18 .r18-ttl{font-weight:700;text-transform:uppercase;letter-spacing:.01em;white-space:nowrap;color:' + BRN + '}'
        + '.r18 .r18-tag{font-weight:600;color:' + TEAL + '}'
        + '.r18 .r18-s{background:' + TEAL + ';color:' + CREAM + ';border-radius:5cqw 1cqw 5cqw 1cqw;box-shadow:.8cqw .8cqw 0 ' + MUST + '}'
        + '.r18 .r18-s .d{font-family:Yellowtail,cursive;color:' + MUST + '}.r18 .r18-s .m{font-weight:700;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap}.r18 .r18-s .m small{font-family:Yellowtail,cursive;text-transform:none;color:' + MUST + ';font-size:.9em;margin-right:.15em;letter-spacing:0}'
        + '.r18 .r18-s .t{font-weight:600}.r18 .r18-s .l{font-weight:400;color:#fff}'
        + '.r18 .r18-w{background:' + ORNG + ';color:#fff;border-radius:1cqw 5cqw 1cqw 5cqw;box-shadow:.8cqw .8cqw 0 ' + BRN + '}.r18 .r18-w .k{font-weight:700;letter-spacing:.24em;color:' + CREAM + '}.r18 .r18-w .a{font-weight:700}.r18 .r18-w .b{font-weight:400}'
        + '.r18 .r18-tb{background:#fffaf0;border:.4cqw solid ' + TEAL + ';border-radius:2cqw;overflow:hidden}.r18 .r18-tr{font-weight:600}.r18 .r18-tr.th{background:' + TEAL + ';color:' + CREAM + ';letter-spacing:.14em}.r18 .r18-tr.hm{background:' + MUST + ';font-weight:700}'
        + '.r18 .r18-rg{font-weight:700;color:' + CREAM + ';letter-spacing:.02em}.r18 .r18-rg span{color:' + MUST + '}.r18 .r18-sm{color:' + CREAM + ';font-weight:400}'
        + '.r18 .r18-qr{border-radius:1cqw;box-shadow:0 0 0 .5cqw ' + MUST + '}.r18 .r18-bdr>span:not(.vfx-logo){color:' + CREAM + '}',
      fn: function (spec, partner, sq, H) {
        var k = kit('r18', spec, partner, sq, H), V = VS[k.v], HH = k.HH, o = '';
        var bandTop = HH - V.band;
        // art: starbursts, boomerangs and an atom, kept to the corners and edges
        var a = '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
        a += '<rect x="0" y="' + f(bandTop) + '" width="100" height="' + f(V.band) + '" fill="' + BRN + '"/>';
        a += '<path d="M0 ' + f(bandTop) + ' Q 25 ' + f(bandTop - 2.2) + ' 50 ' + f(bandTop) + ' T 100 ' + f(bandTop) + '" fill="none" stroke="' + MUST + '" stroke-width=".9"/>';
        if (!sq) {
          a += atom(88, 11, 8) + star(97, 27, 3.6, MUST) + star(74, 5, 1.8, ORNG, 4);
          if (!k.P) a += boomerang(98.5, bandTop - 31, 1.0, -60, ORNG) + boomerang(3, bandTop - 40, 0.9, 70, TEAL);
          a += star(3.5, bandTop - 9, 2.2, MUST, 4);
          a += star(93, bandTop - 6, 1.6, TEAL, 4) + boomerang(97, 50, 0.7, 100, MUST);
        } else {
          a += atom(90, 9, 6.5) + star(97.5, 21, 2.6, MUST) + star(2.5, bandTop - 6, 1.6, MUST, 4) + boomerang(97, bandTop - 4, 0.6, -30, ORNG);
        }
        // tiny sparkles across the cream
        [[30, 3], [60, 2.5], [4, 30], [52, 98], [97, 70]].forEach(function (d) { if (d[1] < bandTop - 3) a += star(d[0], d[1], 0.9, ORNG, 4); });
        o += a + '</svg>';
        o += k.logo('r18-logo', V.logo[0], V.logo[1], V.logo[2], V.logo[3]);
        o += k.box('r18-scr', V.scr[0], V.scr[1], null, 'Join us for', 'font-size:' + V.scr[2] + 'cqw;');
        var FT = V.foot;
        var c = fitStack(bandTop - (sq ? 4 : 5), function (sc) { var W2 = sv(V, sc);
          return stack(k, { p: 'r18', x: 6, w: 88, top: V.top, maxL: V.maxL, cap: W2.cap, ch: 0.74, lh: 1.02, g1: sq ? 1.2 : 1.8, g2: sq ? 2 : 3, g3: sq ? 2.2 : 3, gapX: V.gap + 0.8,
            tagFs: W2.tagFs, tagW: 84, sess: sess(W2), where: where(W2), row: V.row, whW: V.whW, rh: W2.rh, tfs: W2.tfs }); });
        o += c.html;
        o += k.foot(6, HH - FT[0], 88, FT[1], FT[2], FT[3], FT[4]).html;
        return k.root(o);
      }
    };
  })());

  /* =================== R19 · Notebook doodles =================== */
  F.registerSet('R', 19, (function () {
    var INKB = '#1d3a8a', RED = '#d62828', PEN = '#222', YEL = '#ffe36e', GRN = '#2a9d5c';
    var PAPER = 'background-color:#fffdf6;background-image:repeating-linear-gradient(180deg,transparent 0,transparent 3.95cqw,rgba(70,130,200,.32) 3.95cqw,rgba(70,130,200,.32) 4.1cqw);background-position:0 9cqw';
    function sdoodle(cx, cy, r, col) { var d = ''; for (var i = 0; i < 10; i++) { var a = Math.PI * i / 5 - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; d += (i ? 'L' : 'M') + f(cx + rr * Math.cos(a)) + ' ' + f(cy + rr * Math.sin(a)); } return '<path d="' + d + 'Z" fill="none" stroke="' + col + '" stroke-width=".35" stroke-linejoin="round"/>'; }
    function sess(V) { return function (k, x, y, w) {
      return sessCards(k, x, y, w, { cls: 'r19-s', gap: V.gap, pad: V.pad, padX: V.padX, d: V.d, m: V.m, t: V.t, l: V.l, dense: V.dense, lch: 0.45 });
    }; }
    function where(V) { return function (k, x, y, w, h) {
      var r = whereCard(k, x, y, w, { cls: 'r19-w', pad: V.pad, padX: V.padX, kf: V.d, l1: V.w1, l2: V.w2 });
      if (h && h > r.h) r.html = r.html.replace('height:' + f(r.h) + 'cqw', 'height:' + f(h) + 'cqw');
      return r;
    }; }
    var VS = {
      l:   { mx: 15, logo: [19, 9, 16, 14], top: 28, cap: 11, maxL: 3, tagFs: 4, gap: 3, pad: 1.6, padX: 2.4, d: 3.4, m: 4.6, t: 3, l: 3.1, w1: 3.1, w2: 2.8, dense: false, row: false, whW: 52, foot: [4.5, 15, 4.3, 2.5, 5.4] },
      pl:  { mx: 14, logo: [18, 8.5, 26, 11], top: 23, cap: 8.6, maxL: 3, tagFs: 3.2, gap: 2.4, pad: 1.3, padX: 1.8, d: 2, m: 3.6, t: 2.4, l: 2.5, w1: 2.5, w2: 2.2, dense: true, row: true, rh: 3.1, tfs: 1.95, foot: [3.5, 13, 3.6, 2.2, 4.6] },
      sq:  { mx: 12, logo: [16, 8, 12, 11], top: 22, cap: 8.4, maxL: 3, tagFs: 3, gap: 2, pad: 1.2, padX: 1.6, d: 2, m: 3.4, t: 2.2, l: 2.3, w1: 2.3, w2: 2, dense: true, row: true, foot: [3, 12.5, 3.3, 2, 4.2] },
      psq: { mx: 11, logo: [14.5, 7, 18, 7.5], top: 16, cap: 5.6, maxL: 2, tagFs: 2.4, gap: 1.5, pad: .8, padX: 1.3, d: 1.5, m: 2.6, t: 1.85, l: 1.85, w1: 1.9, w2: 1.7, dense: true, row: true, rh: 3.05, tfs: 1.65, foot: [2.6, 11, 2.9, 1.75, 3.4] }
    };
    return {
      name: 'Notebook doodles: lined paper, red margin, spiral holes and marker doodles',
      fonts: 'family=Permanent+Marker&family=Patrick+Hand&family=Caveat:wght@600;700',
      css: baseCss('r19', '"Patrick Hand","Comic Sans MS",cursive', PEN, PAPER)
        + '.r19 .r19-logo{background:#fff;padding:1cqw;border:.25cqw solid #d8d2c0;transform:rotate(-3deg);box-shadow:.4cqw .5cqw 0 rgba(0,0,0,.08)}'
        + '.r19 .r19-ttl{font-family:"Permanent Marker",cursive;color:' + INKB + ';white-space:nowrap}.r19 .r19-ttl span{background:linear-gradient(180deg,transparent 58%,rgba(255,227,110,.85) 58%,rgba(255,227,110,.85) 92%,transparent 92%);padding:0 .15em}'
        + '.r19 .r19-tag{font-family:Caveat,cursive;font-weight:700;color:' + RED + '}'
        + '.r19 .r19-s{border:.3cqw dashed ' + INKB + ';border-radius:1.6cqw;background:rgba(255,255,255,.55)}'
        + '.r19 .r19-s .d{font-family:"Permanent Marker",cursive;color:' + RED + ';text-transform:uppercase;letter-spacing:.06em}.r19 .r19-s .m{font-family:"Permanent Marker",cursive;color:' + INKB + ';white-space:nowrap}.r19 .r19-s .m small{color:' + RED + ';font-size:.8em;text-transform:uppercase;margin-right:.2em}'
        + '.r19 .r19-s .t{color:' + PEN + '}.r19 .r19-s .l{font-family:Caveat,cursive;font-weight:700;color:' + GRN + '}'
        + '.r19 .r19-w{background:' + YEL + ';transform:rotate(-1.6deg);box-shadow:.5cqw .8cqw 1cqw rgba(0,0,0,.15)}.r19 .r19-w .k{font-family:"Permanent Marker",cursive;color:' + RED + ';letter-spacing:.08em}.r19 .r19-w .a{color:' + PEN + '}.r19 .r19-w .b{color:#4a4a4a}'
        + '.r19 .r19-tb{background:#fff;border:.3cqw solid ' + INKB + ';border-radius:1cqw}.r19 .r19-tr{color:' + PEN + '}.r19 .r19-tr.th{font-family:"Permanent Marker",cursive;color:' + RED + ';letter-spacing:.06em}.r19 .r19-tr.hm{background:rgba(255,227,110,.9)}'
        + '.r19 .r19-rg{font-family:"Permanent Marker",cursive;color:' + PEN + '}.r19 .r19-rg span{color:' + RED + '}.r19 .r19-sm{color:#333}'
        + '.r19 .r19-qr{transform:rotate(2deg);box-shadow:.3cqw .4cqw 0 rgba(0,0,0,.1)}',
      fn: function (spec, partner, sq, H) {
        var k = kit('r19', spec, partner, sq, H), V = VS[k.v], HH = k.HH, o = '', mx = V.mx;
        var a = '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">';
        a += '<line x1="' + mx + '" y1="0" x2="' + mx + '" y2="' + f(HH) + '" stroke="#e05a5a" stroke-width=".3"/>';
        // spiral binding along the top
        for (var x = 4; x < 98; x += sq ? 5.2 : 5.6) a += '<circle cx="' + f(x) + '" cy="3.4" r="1.05" fill="#5f5a50"/><path d="M' + f(x - .3) + ' 3.4 C' + f(x - 1.4) + ' 1 ' + f(x + .6) + ' -1 ' + f(x + .9) + ' 1.2" fill="none" stroke="#9a948a" stroke-width=".35"/>';
        var cx = mx + 4, cw = 94 - cx;
        var FT = V.foot, ft = k.foot(cx, HH - FT[0], 94 - cx, FT[1], FT[2], FT[3], FT[4], { bch: 0.62 });
        var c = fitStack(ft.top - (sq ? 4 : 5), function (sc) { var W2 = sv(V, sc);
          return stack(k, { p: 'r19', x: cx, w: cw, top: V.top, maxL: V.maxL, cap: W2.cap, ch: 0.62, lh: 1.12, g1: sq ? 0.6 : 1, g2: sq ? 1.8 : 2.6, g3: sq ? 2.1 : 3, gapX: V.gap + 0.6,
            tagFs: W2.tagFs, tagW: cw - 2, tagCh: 0.42, sess: sess(W2), where: where(W2), row: V.row, whW: V.whW, rh: W2.rh, tfs: W2.tfs, wrap: function (l) { return '<span>' + l + '</span>'; } }); });
        // doodles that sit by the content (small, or off to the side of it)
        var d = '';
        d += sdoodle(mx / 2 + 0.5, c.t ? V.top + 4 : 30, sq ? 1.8 : 2.2, RED) + sdoodle(mx / 2, V.top + c.t.h + 6, 1.4, INKB);
        var ay = HH - (sq ? 11 : 14);
        d += '<path d="M' + f(mx / 2 - 2) + ' ' + f(ay - 6) + ' C ' + f(mx / 2 - 3) + ' ' + f(ay) + ' ' + f(mx / 2) + ' ' + f(ay + 2) + ' ' + f(mx - 1) + ' ' + f(ay + 1.5) + ' M ' + f(mx - 2.6) + ' ' + f(ay) + ' L ' + f(mx - 1) + ' ' + f(ay + 1.5) + ' L ' + f(mx - 2.8) + ' ' + f(ay + 3) + '" fill="none" stroke="' + RED + '" stroke-width=".4" stroke-linecap="round" stroke-linejoin="round"/>';
        d += '<path d="M' + f(cx) + ' ' + f(V.top + c.t.h + 0.3) + ' q 3 -1.2 6 0 t 6 0 t 6 0 t 6 0" fill="none" stroke="' + RED + '" stroke-width=".4" stroke-linecap="round"/>';
        d += '<g fill="none" stroke="' + GRN + '" stroke-width=".35" stroke-linecap="round"><path d="M' + f(mx / 2) + ' ' + f(HH * 0.55) + ' m -1.6 0 a 1.6 1.6 0 1 0 3.2 0 a 1.6 1.6 0 1 0 -3.2 0"/><path d="M' + f(mx / 2) + ' ' + f(HH * 0.55 - 2.6) + ' v -1 M' + f(mx / 2) + ' ' + f(HH * 0.55 + 2.6) + ' v 1 M' + f(mx / 2 - 2.6) + ' ' + f(HH * 0.55) + ' h -1 M' + f(mx / 2 + 2.6) + ' ' + f(HH * 0.55) + ' h 1"/></g>';
        d += '<path d="M' + f(mx / 2 + 1) + ' ' + f(HH * 0.72) + ' l -1.8 2.6 h 2.2 l -1.6 3" fill="none" stroke="' + INKB + '" stroke-width=".4" stroke-linejoin="round"/>';
        d += sdoodle(96.5, HH - (sq ? 27 : 33), 1.3, INKB);
        o += a + d + '</svg>';
        o += k.logo('r19-logo', V.logo[0], V.logo[1], V.logo[2], V.logo[3]);
        o += c.html;
        o += ft.html;
        // two strips of tape on the QR
        var qs = FT[1], qx = 94 - qs, qy = HH - FT[0] - qs;
        o += '<div class="r19-tape" style="left:' + f(qx - 1.6) + 'cqw;top:' + f(qy - 1) + 'cqw;width:' + f(qs * 0.42) + 'cqw;height:' + f(qs * 0.16) + 'cqw;background:rgba(240,225,170,.75);transform:rotate(-35deg);z-index:3"></div>'
          + '<div class="r19-tape" style="left:' + f(qx + qs - qs * 0.32) + 'cqw;top:' + f(qy + qs - qs * 0.08) + 'cqw;width:' + f(qs * 0.42) + 'cqw;height:' + f(qs * 0.16) + 'cqw;background:rgba(240,225,170,.75);transform:rotate(-35deg);z-index:3"></div>';
        return k.root(o);
      }
    };
  })());

  /* =================== R20 · Mosaic tiles =================== */
  F.registerSet('R', 20, (function () {
    var NAVY = '#1D3557', TERRA = '#D9653B', TEAL = '#1B8A8F', MUST = '#F2B134', SAGE = '#8FB996', BLUSH = '#F4A7A0', CREAM = '#F6EFE2';
    var PAL = [TERRA, TEAL, NAVY, MUST, SAGE, BLUSH, TEAL, TERRA, MUST];
    function rnd(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
    function mosaic(HH, t, ring) {
      var r = rnd(97), s = '', nx = Math.ceil(100 / t), ny = Math.ceil(HH / t);
      for (var j = 0; j < ny; j++) for (var i = 0; i < nx; i++) {
        if (i >= ring && i < nx - ring && j >= ring && j < ny - ring) continue;
        var x = i * t, y = j * t, a = PAL[Math.floor(r() * PAL.length)], b = PAL[Math.floor(r() * PAL.length)], g = 0.22, q = r();
        if (q < 0.45) s += '<rect x="' + f(x + g) + '" y="' + f(y + g) + '" width="' + f(t - 2 * g) + '" height="' + f(t - 2 * g) + '" fill="' + a + '"/>';
        else if (q < 0.8) s += '<path d="M' + f(x + g) + ' ' + f(y + g) + 'h' + f(t - 2 * g) + 'L' + f(x + g) + ' ' + f(y + t - g) + 'Z" fill="' + a + '"/><path d="M' + f(x + t - g) + ' ' + f(y + g + .3) + 'V' + f(y + t - g) + 'H' + f(x + g + .3) + 'Z" fill="' + b + '"/>';
        else s += '<rect x="' + f(x + g) + '" y="' + f(y + g) + '" width="' + f(t - 2 * g) + '" height="' + f(t - 2 * g) + '" fill="' + a + '"/><circle cx="' + f(x + t / 2) + '" cy="' + f(y + t / 2) + '" r="' + f(t * 0.26) + '" fill="' + CREAM + '"/>';
      }
      // invisible frame sides so callouts stay on the card, not on the tiles
      var fw = ring * t;
      [[0, 0, 100, fw], [0, HH - fw, 100, fw], [0, 0, fw, HH], [100 - fw, 0, fw, HH]].forEach(function (b) { s += '<rect x="' + f(b[0]) + '" y="' + f(b[1]) + '" width="' + f(b[2]) + '" height="' + f(b[3]) + '" fill="none"/>'; });
      return s;
    }
    function strip(x, y, n, t) { var s = ''; for (var i = 0; i < n; i++) s += '<rect x="' + f(x + i * (t + .4)) + '" y="' + f(y) + '" width="' + f(t) + '" height="' + f(t) + '" fill="' + [TERRA, MUST, TEAL, NAVY, SAGE, BLUSH][i % 6] + '"/>'; return s; }
    function sess(V) { return function (k, x, y, w) { // date chip (tile) + text
      var S = k.S, n = Math.max(1, S.length), cw = (w - V.gap * (n - 1)) / n, chip = V.chip, tw = cw - chip - 1.6, ll = 0;
      S.forEach(function (s) { if (s.lesson) ll = Math.max(ll, k.lines(s.lesson, V.l, tw, 0.5)); });
      var tl = k.lines(S[0] ? S[0].time : '', V.t, tw, 0.52), h = Math.max(chip, V.dw * 1.3 + tl * V.t * 1.3 + (ll ? ll * V.l * 1.25 + 0.4 : 0));
      return { html: S.map(function (s, i) {
        return k.box('r20-s', x + i * (cw + V.gap), y, cw, '<div class="c c' + i + '" style="width:' + f(chip) + 'cqw;height:' + f(chip) + 'cqw"><b' + st(chip * 0.46, 1) + '>' + s.day + '</b><i' + st(chip * 0.2, 1.1) + '>' + s.mon + '</i></div>'
          + '<div class="x"><div class="d"' + st(V.dw, 1.3) + '>' + s.dow + ', ' + s.mon + ' ' + s.day + '</div><div class="t"' + st(V.t, 1.3) + '>' + s.time + '</div>' + (s.lesson ? '<div class="l"' + st(V.l, 1.25, 'margin-top:.4cqw') + '>' + s.lesson + '</div>' : '') + '</div>',
          'height:' + f(h) + 'cqw;');
      }).join(''), h: h };
    }; }
    function where(V) { return function (k, x, y, w, h) {
      var r = whereCard(k, x, y, w, { cls: 'r20-w', pad: V.pad, padX: V.padX, kf: V.kf, l1: V.w1, l2: V.w2 });
      if (h && h > r.h) r.html = r.html.replace('height:' + f(r.h) + 'cqw', 'height:' + f(h) + 'cqw');
      return r;
    }; }
    var VS = {
      l:   { t: 4.2, ring: 2, card: 9.4, logo: [14, 13.5, 15, 15], top: 33, cap: 10, maxL: 3, tagFs: 3.1, gap: 3, chip: 10, dw: 2.6, t2: 0, l: 2.3, kf: 1.8, w1: 2.8, w2: 2.3, pad: 1.6, padX: 2.4, row: false, whW: 50, foot: [13.5, 14, 3.9, 2.0, 5.2] },
      pl:  { t: 4.2, ring: 1, card: 5.2, logo: [10, 9, 25, 11.5], top: 24, cap: 8.4, maxL: 3, tagFs: 2.7, gap: 2.2, chip: 7.5, dw: 2.1, l: 1.95, kf: 1.5, w1: 2.2, w2: 1.85, pad: 1.1, padX: 1.8, row: true, rh: 3.1, tfs: 1.85, foot: [8.5, 12.5, 3.5, 1.95, 4.6] },
      sq:  { t: 3.6, ring: 1, card: 4.6, logo: [10, 8.5, 12, 12], top: 23, cap: 8, maxL: 3, tagFs: 2.5, gap: 2, chip: 7.5, dw: 1.95, l: 1.8, kf: 1.4, w1: 2.1, w2: 1.75, pad: 1.1, padX: 1.6, row: true, foot: [8, 12, 3.2, 1.8, 4.1] },
      psq: { t: 3.6, ring: 1, card: 4.6, logo: [9.5, 7.5, 17, 7.5], top: 16.5, cap: 5.4, maxL: 2, tagFs: 2.05, gap: 1.5, chip: 6, dw: 1.6, l: 1.55, kf: 1.2, w1: 1.75, w2: 1.5, pad: .7, padX: 1.3, row: true, rh: 3.05, tfs: 1.6, foot: [7, 10.5, 2.8, 1.6, 3.4] }
    };
    VS.l.t2 = 2.3; VS.pl.t2 = 1.95; VS.sq.t2 = 1.8; VS.psq.t2 = 1.55;
    return {
      name: 'Mosaic tiles: a frame of coloured square and triangle tiles around a clean card',
      fonts: 'family=DM+Serif+Display&family=DM+Sans:wght@400;500;700;800',
      css: baseCss('r20', '"DM Sans",Arial,sans-serif', NAVY, 'background:' + CREAM)
        + '.r20>.r20-card{z-index:1;background:#fffdf8;border-radius:1.2cqw;box-shadow:0 .6cqw 2.4cqw rgba(29,53,87,.28)}'
        + '.r20 .r20-ttl{font-family:"DM Serif Display",Georgia,serif;color:' + NAVY + ';white-space:nowrap;text-align:center;letter-spacing:-.005em}'
        + '.r20 .r20-tag{text-align:center;color:' + TEAL + ';font-weight:500}'
        + '.r20 .r20-s{display:flex;gap:1.6cqw;align-items:flex-start}.r20 .r20-s .c{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;border-radius:.6cqw}'
        + '.r20 .r20-s .c0{background:' + TERRA + '}.r20 .r20-s .c1{background:' + TEAL + '}.r20 .r20-s .c b{font-family:"DM Serif Display",serif;font-weight:400}.r20 .r20-s .c i{font-style:normal;font-weight:800;letter-spacing:.14em;text-transform:uppercase}'
        + '.r20 .r20-s .x{flex:1;min-width:0}.r20 .r20-s .d{font-weight:800;color:' + NAVY + '}.r20 .r20-s .t{font-weight:500;color:#36475e}.r20 .r20-s .l{font-weight:700;color:' + TERRA + '}'
        + '.r20 .r20-w{border:.35cqw solid ' + TEAL + ';border-radius:.8cqw;background:#fff}.r20 .r20-w .k{font-weight:800;letter-spacing:.2em;color:' + TEAL + '}.r20 .r20-w .a{font-weight:700}.r20 .r20-w .b{color:#36475e}'
        + '.r20 .r20-tb{border:.3cqw solid ' + NAVY + ';border-radius:.8cqw;overflow:hidden}.r20 .r20-tr{font-weight:500}.r20 .r20-tr:nth-child(odd){background:#f3ede1}.r20 .r20-tr.th{background:' + NAVY + ';color:#fff;font-weight:800;letter-spacing:.14em}.r20 .r20-tr.hm{background:' + MUST + ';font-weight:800}'
        + '.r20 .r20-rg{font-weight:800}.r20 .r20-rg span{color:' + TERRA + '}.r20 .r20-sm{color:#36475e}'
        + '.r20 .r20-qr{padding:0}',
      fn: function (spec, partner, sq, H) {
        var k = kit('r20', spec, partner, sq, H), V = VS[k.v], HH = k.HH, o = '', ci = V.card;
        var cx = ci + (sq || k.P ? 4.4 : 4.6), cw = 100 - 2 * cx;
        o += '<svg viewBox="0 0 100 ' + f(HH) + '" preserveAspectRatio="none" aria-hidden="true">' + mosaic(HH, V.t, V.ring) + '</svg>';
        o += k.box('r20-card', ci, ci, 100 - 2 * ci, '', 'height:' + f(HH - 2 * ci) + 'cqw;');
        o += k.logo('r20-logo', V.logo[0], V.logo[1], V.logo[2], V.logo[3]);
        var tile = sq ? 1.5 : 1.8, n = 9;
        var FT = V.foot, fx = Math.min(cx, ci + 3.6), ft = k.foot(fx, HH - FT[0], 100 - 2 * fx, FT[1], FT[2], FT[3], FT[4], { bch: 0.6 });
        var c = fitStack(ft.top - (sq ? 4 : 5), function (sc) { var W2 = sv(V, sc);
          return stack(k, { p: 'r20', x: cx, w: cw, top: V.top, maxL: V.maxL, cap: W2.cap, ch: 0.5, lh: 1.08, g1: sq ? 1 : 1.4, g2: sq ? 2 : 3, g3: sq ? 2 : 2.8, gapX: V.gap,
          tagFs: W2.tagFs, tagX: 3, tagW: cw - 6, sess: sess({ gap: V.gap, chip: W2.chip, dw: W2.dw, t: W2.t2, l: W2.l }), where: where(W2), row: V.row, whW: V.whW, whX: cx + (cw - (V.whW || cw)) / 2, rh: W2.rh, tfs: W2.tfs,
          after: function (y) { return '<svg class="r20-strip" viewBox="0 0 ' + f(n * (tile + .4)) + ' ' + f(tile) + '" style="position:absolute;left:' + f(50 - n * (tile + .4) / 2) + 'cqw;top:' + f(y) + 'cqw;width:' + f(n * (tile + .4)) + 'cqw;height:' + f(tile) + 'cqw;z-index:2">' + strip(0, 0, n, tile) + '</svg>'; },
          afterH: tile + (sq ? 1.4 : 2) }); });
        o += c.html;
        o += ft.html;
        return k.root(o);
      }
    };
  })());
})();
