// LDAH training tracker (v2, 2026-09-27). One pattern for every training deck.
//
// Put the Firebase compat SDKs (app, auth, firestore 10.7.1) in <head>, then load this
// file LAST, after the deck's own scripts.
//
//  * Uses the dashboard's own sign-in (same origin), so nobody logs in twice, and
//    greets the person by their dashboard name (calls the deck's setName() if it has one).
//  * One record per person per training in partnerTrainingProgress, id KEY__email-slug.
//    KEY = ?tid= when the dashboard passes one, else this file's name without .html.
//    The Staff Training report and the sign-in popup use the same KEY.
//  * Engine decks (deck-engine.js) are followed automatically by wrapping enter()/begin().
//    Older walkthroughs call  ldahTrack.scene(index0, total)  from their own go() function.
//  * Records: who (name, email, uid, role), startedAt, lastActiveAt, completedAt, status,
//    activeSeconds, visits, opens by source (popup / self), scene/furthest/total/percent,
//    slideSeconds/slideVisits, quiz results (ldahTrack.quiz from the deck's ask()).
//  * Time counts only while the page is on screen AND (the deck is playing, or there was
//    input in the last 90s, or the slide changed in the last 120s).
//  * Not signed in, or a downloaded copy: the deck still plays, nothing is saved.
(function () {
  var FB = {
    apiKey: 'AIzaSyAU3CQ07bCVKlJ1qGak-150kaJEyPKldLk',
    authDomain: 'ldah-932d5.firebaseapp.com',
    projectId: 'ldah-932d5',
    storageBucket: 'ldah-932d5.firebasestorage.app',
    messagingSenderId: '662130454003',
    appId: '1:662130454003:web:437576d5a5811ecd8df686'
  };
  var TICK_S = 5, INPUT_S = 90, SCENE_S = 120, FLUSH_MS = 15000;
  var qs = new URLSearchParams(location.search);
  var KEY = (qs.get('tid') || (location.pathname.split('/').pop() || 'training').replace(/\.html?$/i, '')).replace(/[^A-Za-z0-9_-]/g, '-');
  var SRC = qs.get('src') === 'popup' ? 'popup' : 'self';
  var title = (document.title || KEY).replace(/\s*[—–-]\s*Training\s*$/i, '').replace(/^LDAH\s*[—–-]\s*/i, '').replace(/^LDAH Internal\s*[—–-]\s*/i, '');
  var slug = function (s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };

  var ME = null, ref = null, ready = false, flushing = false, dirty = false;
  var pend = { active: 0, slide: {}, visit: {} }, pendQuiz = {};
  var lastInput = Date.now(), lastScene = 0, sceneIdx = 0, sceneTotal = 0;
  var furthest = 0, completed = false;
  var seenFirst = {}, knownFurthest = 0, knownCompleted = false;

  function note(html) {
    var n = document.getElementById('trackNote');
    if (!n) {
      n = document.createElement('div'); n.id = 'trackNote';
      n.style.cssText = 'position:fixed;left:12px;top:10px;z-index:2147483000;font:600 12px/1.3 system-ui,sans-serif;color:#fff;background:rgba(11,58,83,.72);padding:6px 10px;border-radius:8px;max-width:60vw;pointer-events:none;transition:opacity .6s';
      (document.body || document.documentElement).appendChild(n);
    }
    n.innerHTML = html; n.style.opacity = '1';
  }
  ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) {
    addEventListener(ev, function () { lastInput = Date.now(); }, { passive: true, capture: true });
  });

  function totalNow() {
    if (sceneTotal) return sceneTotal;
    try { if (typeof SC !== 'undefined' && SC.length) return SC.length; } catch (e) {}
    return 0;
  }
  function enginePlaying() { try { return typeof playing !== 'undefined' && !!playing; } catch (e) { return false; } }

  function onScene(i, t) {
    if (typeof t === 'number' && t > 0) sceneTotal = t;
    sceneIdx = Math.max(0, i | 0);
    lastScene = Date.now();
    var n = sceneIdx + 1, tot = totalNow();
    pend.visit[n] = (pend.visit[n] || 0) + 1;
    if (n > furthest) furthest = n;
    if (tot && n >= tot) completed = true;
    dirty = true;
    flush();
  }

  // Engine decks: follow enter()/begin().
  if (typeof window.enter === 'function') {
    var _enter = window.enter;
    window.enter = function (i) { var r = _enter.apply(this, arguments); onScene(i); return r; };
  }
  if (typeof window.begin === 'function') {
    var _begin = window.begin;
    window.begin = function () { var r = _begin.apply(this, arguments); onScene(0); return r; };
  }

  setInterval(function () {
    if (document.visibilityState !== 'visible') return;
    var now = Date.now();
    if (!enginePlaying() && now - lastInput > INPUT_S * 1000 && now - lastScene > SCENE_S * 1000) return;
    var n = sceneIdx + 1;
    pend.active += TICK_S;
    pend.slide[n] = (pend.slide[n] || 0) + TICK_S;
    dirty = true;
  }, TICK_S * 1000);
  setInterval(flush, FLUSH_MS);
  addEventListener('pagehide', flush);
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });

  window.ldahTrack = {
    key: KEY,
    // Older walkthroughs: call from go() with the 0-based slide index and slide count.
    scene: function (i, total) { onScene(i, total); },
    // Quiz answers: section label ('Section 2'), question index, correct?
    quiz: function (sec, qIndex, correct) {
      var k = 'S' + (String(sec).replace(/\D+/g, '') || '0') + '.q' + qIndex;
      var p = pendQuiz[k] || (pendQuiz[k] = { attempts: 0, first: null });
      p.attempts += 1;
      if (p.first === null) p.first = !!correct;
      dirty = true;
      flush();
    }
  };

  function flush() {
    if (!ready || !ref || !dirty || flushing) return;
    var inc = firebase.firestore.FieldValue.increment;
    var tot = totalNow(), n = sceneIdx + 1;
    var upd = { lastActiveAt: firebase.firestore.FieldValue.serverTimestamp(), updatedAt: new Date().toISOString(), scene: n };
    if (tot) upd.total = tot;
    if (pend.active) upd.activeSeconds = inc(pend.active);
    Object.keys(pend.slide).forEach(function (s) { upd['slideSeconds.' + s] = inc(pend.slide[s]); });
    Object.keys(pend.visit).forEach(function (s) { upd['slideVisits.' + s] = inc(pend.visit[s]); });
    Object.keys(pendQuiz).forEach(function (k) {
      var q = pendQuiz[k];
      upd['quiz.' + k + '.attempts'] = inc(q.attempts);
      if (q.first !== null && !seenFirst[k]) { upd['quiz.' + k + '.firstTry'] = q.first; seenFirst[k] = true; }
    });
    var best = Math.max(furthest, knownFurthest);
    if (best) { upd.furthest = best; if (tot) upd.percent = Math.min(100, Math.round(best / tot * 100)); knownFurthest = best; }
    if (completed && !knownCompleted) { upd.completedAt = new Date().toISOString(); knownCompleted = true; }
    upd.status = knownCompleted ? 'completed' : 'in-progress';
    pend = { active: 0, slide: {}, visit: {} }; pendQuiz = {}; dirty = false; flushing = true;
    ref.update(upd).catch(function (e) { console.warn('training tracker write failed', e && e.code); })
      .then(function () { flushing = false; });
  }

  try {
    if (!window.firebase || !firebase.initializeApp || location.protocol === 'file:') throw 0;
    if (!firebase.apps.length) firebase.initializeApp(FB);
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user || user.isAnonymous) {
        note('Not signed in. You can still watch, but your progress won’t be saved. Sign in to the dashboard, then reload.');
        return;
      }
      var db = firebase.firestore();
      db.collection('userRoles').doc(user.uid).get().then(function (d) {
        var r = (d && d.exists) ? (d.data() || {}) : {};
        var name = String(r.displayName || user.displayName || (user.email || '').split('@')[0]).replace(/^[.\s]+/, '');
        ME = { uid: user.uid, email: (user.email || '').toLowerCase(), name: name, role: r.role || '' };
        if (typeof window.setName === 'function') { try { window.setName(name); } catch (e) {} }
        note('Signed in as <b>' + name.replace(/</g, '&lt;') + '</b>. Your progress is saved.');
        setTimeout(function () { var n = document.getElementById('trackNote'); if (n) n.style.opacity = '0'; }, 6000);
        ref = db.collection('partnerTrainingProgress').doc(KEY + '__' + slug(ME.email));
        return ref.get().then(function (snap) {
          var old = snap.exists ? (snap.data() || {}) : {};
          knownFurthest = old.furthest || 0; knownCompleted = old.status === 'completed';
          Object.keys(old.quiz || {}).forEach(function (s) {
            Object.keys(old.quiz[s] || {}).forEach(function (q) {
              if (typeof (old.quiz[s][q] || {}).firstTry === 'boolean') seenFirst[s + '.' + q] = true;
            });
          });
          var inc = firebase.firestore.FieldValue.increment, ts = firebase.firestore.FieldValue.serverTimestamp();
          var base = {
            personName: ME.name, personEmail: ME.email, uid: ME.uid, role: ME.role,
            partner: ME.role === 'partner' || ME.role === 'superPartner',
            sessionId: KEY, sessionTitle: title, kind: 'deck',
            visits: inc(1), lastActiveAt: ts, lastSource: SRC
          };
          base[SRC === 'popup' ? 'opensPopup' : 'opensSelf'] = inc(1);
          if (!snap.exists) {
            base.startedAt = ts; base.sessionDate = new Date().toISOString().slice(0, 10);
            base.status = 'in-progress'; base.activeSeconds = 0; base.furthest = 0; base.percent = 0; base.skips = 0;
            if (totalNow()) base.total = totalNow();
          }
          return ref.set(base, { merge: true }).then(function () { ready = true; if (!furthest) onScene(sceneIdx, 0); else if (dirty) flush(); });
        });
      }).catch(function (e) {
        console.warn('training tracker sign-in read failed', e && e.code);
        note('Signed in, but progress can’t be saved right now.');
      });
    });
  } catch (e) {
    note('Downloaded copy: progress isn’t saved. Open the online link to have it recorded.');
  }
})();
