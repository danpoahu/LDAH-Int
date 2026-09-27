// LDAH training deck tracker (2026-09-27).
// Load AFTER deck-engine.js, with the Firebase compat SDKs on the page.
//
// Uses the dashboard's own sign-in (same origin), so nobody logs in twice:
//  * greets the person by the name they have in the dashboard (userRoles.displayName)
//  * records one doc per person per deck in partnerTrainingProgress, id DECK_ID__email-slug
//    (the same collection and id shape the Staff Training report already reads)
//  * fields: who (name, email, uid, role), startedAt, lastActiveAt, activeSeconds,
//    visits, scene/furthest/total/percent, slideSeconds/slideVisits, quiz results,
//    status, completedAt
// Not signed in (or opened from a downloaded copy): the deck still plays, nothing is saved.
(function () {
  var FB = {
    apiKey: 'AIzaSyAU3CQ07bCVKlJ1qGak-150kaJEyPKldLk',
    authDomain: 'ldah-932d5.firebaseapp.com',
    projectId: 'ldah-932d5',
    storageBucket: 'ldah-932d5.firebasestorage.app',
    messagingSenderId: '662130454003',
    appId: '1:662130454003:web:437576d5a5811ecd8df686'
  };
  var TICK_S = 5, IDLE_S = 60, FLUSH_MS = 15000;
  var ME = null, ref = null, ready = false;
  var pend = { active: 0, slide: {}, visit: {} }, pendQuiz = {};
  var lastInput = Date.now(), furthest = 0, completed = false, dirty = false;
  var title = (document.title || '').replace(/\s*[—-]\s*Training\s*$/, '');
  var slug = function (s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };

  function note(html) {
    var n = document.getElementById('trackNote');
    if (!n) {
      n = document.createElement('div'); n.id = 'trackNote';
      n.style.cssText = 'position:fixed;left:12px;top:10px;z-index:50;font:600 12px/1.3 system-ui,sans-serif;color:#fff;background:rgba(11,58,83,.72);padding:6px 10px;border-radius:8px;max-width:60vw';
      document.body.appendChild(n);
    }
    n.innerHTML = html;
  }

  ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) {
    addEventListener(ev, function () { lastInput = Date.now(); }, { passive: true });
  });

  // Follow the deck: wrap the engine's scene switch.
  var _enter = window.enter;
  if (typeof _enter === 'function') {
    window.enter = function (i, autoplay) {
      var r = _enter.apply(this, arguments);
      onScene(i);
      return r;
    };
  }
  var _begin = window.begin;
  if (typeof _begin === 'function') {
    window.begin = function () { var r = _begin.apply(this, arguments); onScene(0); return r; };
  }

  function sceneNow() { try { return cur; } catch (e) { return 0; } }
  function total() { try { return SC.length; } catch (e) { return 0; } }
  function isPlaying() { try { return !!playing; } catch (e) { return false; } }

  function onScene(i) {
    var n = i + 1;
    pend.visit[n] = (pend.visit[n] || 0) + 1;
    if (n > furthest) furthest = n;
    if (n === total()) completed = true;
    dirty = true;
    flush(true);
  }

  setInterval(function () {
    if (document.visibilityState !== 'visible') return;
    if (!isPlaying() && Date.now() - lastInput > IDLE_S * 1000) return;
    var n = sceneNow() + 1;
    pend.active += TICK_S;
    pend.slide[n] = (pend.slide[n] || 0) + TICK_S;
    dirty = true;
  }, TICK_S * 1000);
  setInterval(function () { flush(false); }, FLUSH_MS);
  addEventListener('pagehide', function () { flush(true); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(true); });

  // Quiz results: called by the deck's ask() on every answer click.
  window.ldahTrack = {
    quiz: function (sec, qIndex, correct) {
      var key = 'S' + String(sec).replace(/\D+/g, '');
      var k = key + '.q' + qIndex;
      var p = pendQuiz[k] || (pendQuiz[k] = { attempts: 0, first: null });
      p.attempts += 1;
      if (p.first === null) p.first = !!correct;
      dirty = true;
      flush(true);
    }
  };

  var flushing = false;
  function flush(force) {
    if (!ready || !ref || !dirty || flushing) return;
    var inc = firebase.firestore.FieldValue.increment;
    var now = firebase.firestore.FieldValue.serverTimestamp();
    var n = sceneNow() + 1, t = total();
    var upd = {
      lastActiveAt: now, updatedAt: new Date().toISOString(),
      scene: n, total: t,
      status: completed ? 'completed' : 'in-progress'
    };
    if (pend.active) upd.activeSeconds = inc(pend.active);
    Object.keys(pend.slide).forEach(function (s) { upd['slideSeconds.' + s] = inc(pend.slide[s]); });
    Object.keys(pend.visit).forEach(function (s) { upd['slideVisits.' + s] = inc(pend.visit[s]); });
    Object.keys(pendQuiz).forEach(function (k) {
      var q = pendQuiz[k];
      upd['quiz.' + k + '.attempts'] = inc(q.attempts);
      if (q.first !== null) upd['quiz.' + k + '.firstTry'] = q.first;
    });
    if (furthest) { upd.furthest = furthest; upd.percent = t ? Math.round(furthest / t * 100) : 0; }
    if (completed && !knownCompleted) { upd.completedAt = new Date().toISOString(); knownCompleted = true; }
    var sentQuiz = pendQuiz;
    pend = { active: 0, slide: {}, visit: {} }; pendQuiz = {}; dirty = false;
    flushing = true;
    // firstTry must not be overwritten by a later retry: only send it the first time.
    Object.keys(sentQuiz).forEach(function (k) { if (seenFirst[k]) delete upd['quiz.' + k + '.firstTry']; else if (sentQuiz[k].first !== null) seenFirst[k] = true; });
    if (furthest && furthest < knownFurthest) { upd.furthest = knownFurthest; upd.percent = t ? Math.round(knownFurthest / t * 100) : 0; }
    if (knownCompleted) upd.status = 'completed';
    if (upd.furthest) knownFurthest = upd.furthest;
    ref.update(upd).catch(function (e) { console.warn('deck tracker write failed', e && e.code); })
      .then(function () { flushing = false; });
  }
  var seenFirst = {}, knownFurthest = 0, knownCompleted = false;

  // ---- sign-in ----
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
        if (typeof setName === 'function') setName(name);
        note('Signed in as <b>' + name.replace(/</g, '&lt;') + '</b>. Your progress is saved.');
        setTimeout(function () { var n = document.getElementById('trackNote'); if (n) n.style.opacity = '.55'; }, 6000);
        ref = db.collection('partnerTrainingProgress').doc(DECK_ID + '__' + slug(ME.email));
        return ref.get().then(function (snap) {
          var old = snap.exists ? (snap.data() || {}) : {};
          knownFurthest = old.furthest || 0; knownCompleted = old.status === 'completed';
          Object.keys(old.quiz || {}).forEach(function (s) {
            Object.keys(old.quiz[s] || {}).forEach(function (q) {
              if (typeof old.quiz[s][q].firstTry === 'boolean') seenFirst[s + '.' + q] = true;
            });
          });
          var base = {
            personName: ME.name, personEmail: ME.email, uid: ME.uid, role: ME.role,
            partner: ME.role === 'partner' || ME.role === 'superPartner',
            sessionId: DECK_ID, sessionTitle: title, sessionDate: new Date().toISOString().slice(0, 10),
            visits: firebase.firestore.FieldValue.increment(1),
            lastActiveAt: firebase.firestore.FieldValue.serverTimestamp()
          };
          if (!snap.exists) {
            base.startedAt = firebase.firestore.FieldValue.serverTimestamp();
            base.status = 'in-progress'; base.activeSeconds = 0; base.furthest = 0; base.total = total(); base.percent = 0; base.skips = 0;
            base.sessionDate = new Date().toISOString().slice(0, 10);
          } else { delete base.sessionDate; }
          return ref.set(base, { merge: true }).then(function () { ready = true; if (dirty) flush(true); });
        });
      }).catch(function (e) {
        console.warn('deck tracker sign-in read failed', e && e.code);
        note('Signed in, but progress can’t be saved right now.');
      });
    });
  } catch (e) {
    note('Downloaded copy: progress isn’t saved. Open the online link to have it recorded.');
  }
})();
