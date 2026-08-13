# Chat Pop-Out Window & Screenshots — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let LDAH staff pop the internal chat out of the dashboard into its own resizable window that can live on a second monitor, and paste screenshots straight into a conversation.

**Architecture:** Lift the chat CSS, chat JS, and WebRTC screen-share JS out of the `STAGE/index.html` monolith into three shared files. Both the main dashboard and a new lightweight `STAGE/chat.html` pop-out page load those same files, so there is exactly one chat implementation. Screenshots are pasted from the clipboard, downscaled in-browser, uploaded to Firebase Storage under a `chatImages/` prefix, and auto-deleted after 90 days by a bucket lifecycle rule.

**Tech Stack:** Vanilla ES5-style JS (no build step, no framework), Firebase compat SDK 10.7.1 (Firestore + Auth + Storage), static hosting via GitHub Pages, Canvas API for downscaling, `localStorage` for cross-window coordination.

**Spec:** `docs/superpowers/specs/2026-08-13-chat-popout-screenshots-design.md`

## Global Constraints

- **STAGE ONLY.** Every file touched is under `STAGE/`. The live root `index.html` is never modified. Nothing is promoted to live in this plan.
- **No build step.** Files are served as-is. No bundler, no transpiler, no npm dependency may be added.
- **ES5-compatible syntax** in `chat-core.js` and `rtc-screenshare.js` — `var`, `function`, no arrow functions or `let`/`const` in the moved code. This matches the surrounding house style and keeps the moves byte-identical.
- **Bump the version string every task.** `STAGE/index.html:5286` holds `v147.30-STAGE`. Each task bumps the patch number (`v147.31-STAGE`, `v147.32-STAGE`, …) and updates the matching `?v=` cache-busting query on every `chat.css` / `chat-core.js` / `rtc-screenshare.js` tag in both hosts. STAGE has a PWA cache that serves stale JS otherwise.
- **Never `git add -A`.** This repo is PUBLIC. Add only the exact files named in each task's commit step.
- **No real client names** in code, comments, test data, or commit messages.
- Firebase bucket is `ldah-932d5.firebasestorage.app`. Storage compat SDK is already loaded at `STAGE/index.html:27`.
- There is **no automated test framework** in this repo. Verification is (a) mechanical checks — byte-diff and `node --check` — and (b) explicit browser observations. Every task states both.

## Verified line boundaries (as of commit `19b27c7`)

| Block | Lines in `STAGE/index.html` |
|---|---|
| Chat + screen-share CSS | `1632`–`2330` |
| Chat modal markup | `9000`–`9082` |
| Screen-share viewer markup | `9084`–`9100` |
| Sounds `<script>` (**stays put** — also defines the alert bell) | `9102`–`9196` |
| Chat FAB markup | `9198`–`9203` |
| Chat JS `<script>` | `9643`–`10725` |
| Screen-share comment + `<script>` | `10727`–`11176` |

> Line numbers shift after every task. **Re-locate blocks by their anchor comments, not by these numbers**, once Task 1 is done.

---

### Task 1: Extract the chat + screen-share CSS

Pure move. No rule is added, removed, or reworded.

**Files:**
- Create: `STAGE/chat.css`
- Modify: `STAGE/index.html` (remove `1632`–`2330`, add one `<link>`)

**Interfaces:**
- Consumes: nothing.
- Produces: `STAGE/chat.css`, containing every `.chat-*`, `.screenshare-*`, and `.conversation-item` rule plus the two `@media` blocks at the end of the range.

- [ ] **Step 1: Cut the block into the new file**

```bash
cd /Volumes/Xcode_Projects/React/LDAH-Internal/STAGE
sed -n '1632,2330p' index.html > chat.css
head -3 chat.css   # expect: /* Internal chat drawer */ ...
tail -3 chat.css   # expect the closing } of the max-width:768px media query
```

- [ ] **Step 2: Verify the cut is chat-only before deleting anything**

```bash
grep -nvE '^\s*($|/\*|\*|\}|@media|\.chat|\.screenshare|\.conversation-item|[a-z-]+\s*:|\.roster|#chat)' chat.css | head -20
```

Expected: only nested-selector lines inside the media queries (`.chat-modal{`, `.chat-modal-sidebar.hidden{`, etc.). **If any non-chat selector appears, stop and report it** — the range is wrong.

- [ ] **Step 3: Remove the block from index.html and link the file**

```bash
sed -i '' '1632,2330d' index.html
```

Then insert this line immediately before the `</style>` tag that closed the block's stylesheet — find it with `grep -n '</style>' index.html | head -3` and place the `<link>` on the line *after* that `</style>`:

```html
<link rel="stylesheet" href="chat.css?v=147.31">
```

- [ ] **Step 4: Prove the move was byte-identical**

```bash
cd /Volumes/Xcode_Projects/React/LDAH-Internal
git show HEAD:STAGE/index.html | sed -n '1632,2330p' > /Volumes/Xcode_Projects/_verify_css.txt
diff /Volumes/Xcode_Projects/_verify_css.txt STAGE/chat.css && echo "IDENTICAL"
rm /Volumes/Xcode_Projects/_verify_css.txt
```

Expected: `IDENTICAL`. Any diff means the extraction lost or altered a rule — fix before continuing.

- [ ] **Step 5: Browser check**

Open `STAGE/index.html` in Safari, sign in, open chat. Expected: the chat modal, roster, message bubbles, FAB, and badge look **exactly** as before. Resize the window below 768px — the roster still slides away behind the ☰ toggle.

- [ ] **Step 6: Bump the version and commit**

Change `STAGE/index.html:5286` `v147.30-STAGE` → `v147.31-STAGE`.

```bash
git add STAGE/chat.css STAGE/index.html
git commit -m "refactor(int): extract chat + screen-share CSS to chat.css — v147.31

Pure move, verified byte-identical against HEAD. STAGE only."
```

---

### Task 2: Extract the screen-share JS

Pure move. The IIFE is lifted whole; nothing inside it changes.

**Files:**
- Create: `STAGE/rtc-screenshare.js`
- Modify: `STAGE/index.html` (remove the screen-share `<script>`, add a `<script src>`)

**Interfaces:**
- Consumes: `STAGE/chat.css` (Task 1) for `.screenshare-*` styles.
- Produces: globals `window.rtcRequestScreenShare(convId, otherUid, otherName)`, `window.rtcStartSharing(convId, sessionId)`, `window.rtcStop()`. Depends on globals `firebase` and `window.currentUserData`, and on the `#screenshareOverlay` markup staying in the host page.

- [ ] **Step 1: Locate the block by anchor**

```bash
cd /Volumes/Xcode_Projects/React/LDAH-Internal/STAGE
grep -n "WebRTC Screen Share System" index.html
grep -n "window.rtcStop = rtcStop;" index.html
```

The block runs from the `<!-- ═══ WebRTC Screen Share System` comment through the `</script>` that follows `})();` after `window.rtcStop = rtcStop;`. Note the two line numbers as `$START` and `$END`.

- [ ] **Step 2: Cut the IIFE body into the new file**

Write `STAGE/rtc-screenshare.js` containing exactly the lines between `<script>` and `</script>` (the IIFE, `(function() { 'use strict'; … })();`), prefixed with this header:

```js
/**
 * LDAH-Int — WebRTC screen share (moved verbatim from index.html, 2026-08-13).
 * Loaded by both index.html and chat.html so the chat header's
 * "Request Screen Sharing" button works in the popped-out window too.
 *
 * Requires in the host page: firebase (compat), window.currentUserData,
 * and the #screenshareOverlay markup.
 */
```

- [ ] **Step 3: Replace the block in index.html**

Delete `$START`–`$END` and put this in its place:

```html
<!-- WebRTC screen share — see rtc-screenshare.js -->
<script src="rtc-screenshare.js?v=147.32"></script>
```

- [ ] **Step 4: Syntax check and byte-diff the moved code**

```bash
cd /Volumes/Xcode_Projects/React/LDAH-Internal
node --check STAGE/rtc-screenshare.js && echo "SYNTAX OK"
# Compare against HEAD, ignoring only the new header comment:
git show HEAD:STAGE/index.html | sed -n "${START},${END}p" | grep -v '^\s*<' > /Volumes/Xcode_Projects/_verify_rtc.txt
tail -n +9 STAGE/rtc-screenshare.js > /Volumes/Xcode_Projects/_verify_new.txt
diff /Volumes/Xcode_Projects/_verify_rtc.txt /Volumes/Xcode_Projects/_verify_new.txt && echo "IDENTICAL"
rm /Volumes/Xcode_Projects/_verify_rtc.txt /Volumes/Xcode_Projects/_verify_new.txt
```

Expected: `SYNTAX OK` and `IDENTICAL`.

- [ ] **Step 5: Browser check — the full screen-share round trip**

With two browser profiles signed in as two different staff accounts:
1. Profile A opens chat, selects Profile B, clicks **Request Screen Sharing**.
2. Profile B sees the `📺 Share My Screen` button in the message, clicks it, picks a window.
3. Profile A's `#screenshareOverlay` shows the live video; Fullscreen works; **End Session** stops it.

Expected: identical to before the move. Check the console for `rtc` errors.

- [ ] **Step 6: Bump the version and commit**

Bump to `v147.32-STAGE` and update the `?v=` on both asset tags.

```bash
git add STAGE/rtc-screenshare.js STAGE/index.html
git commit -m "refactor(int): extract WebRTC screen share to rtc-screenshare.js — v147.32

Pure move, verified byte-identical against HEAD. STAGE only."
```

---

### Task 3: Extract the chat JS

Pure move — still driven by the markup that remains in `index.html`. The `mount()` refactor is Task 4, deliberately separate so this task stays mechanically verifiable.

**Files:**
- Create: `STAGE/chat-core.js`
- Modify: `STAGE/index.html` (remove the chat `<script>`, add a `<script src>`)

**Interfaces:**
- Consumes: `chat.css` (Task 1), `rtc-screenshare.js` (Task 2).
- Produces: globals `window.initChatRoster()`, `window.initChatConversations()`, `window.reinitChat()`, `window._ldahChatTitleSignal(unread)`. Still depends on host globals `escHTML`, `rsEscape`, `getInitials`, `formatTime`, `formatRole`, `linkifyURLs`, `_showToast`, `window._playChatChime`, `window.getTimezoneForLocation`, `getWeatherForUid`, `_allContacts`, `window.currentUserData`.

- [ ] **Step 1: Locate the block by anchor**

```bash
cd /Volumes/Xcode_Projects/React/LDAH-Internal/STAGE
grep -n "Real-Time Chat System (Firestore-backed)" index.html
grep -n "setTimeout(tryInitChat, 1000);" index.html
```

The block is the `<script>` opening just above the banner comment through the `</script>` after the IIFE's `})();`. Note them as `$START` and `$END`.

- [ ] **Step 2: Cut the IIFE into the new file**

Write `STAGE/chat-core.js` = this header, then the IIFE verbatim:

```js
/**
 * LDAH-Int — internal chat. THE single implementation.
 * Loaded by index.html (in-app modal) and chat.html (pop-out window).
 * Moved verbatim from index.html on 2026-08-13.
 *
 * Do not fork this file. If chat behaviour needs to change, change it here.
 */
```

- [ ] **Step 3: Replace the block in index.html**

```html
<!-- Internal chat — see chat-core.js -->
<script src="chat-core.js?v=147.33"></script>
```

Load order matters: this tag must come **after** `rtc-screenshare.js` and after the Firebase config block, and the chat modal markup must still be in the DOM above it (the IIFE calls `getElementById` at parse time).

- [ ] **Step 4: Syntax check and byte-diff**

```bash
cd /Volumes/Xcode_Projects/React/LDAH-Internal
node --check STAGE/chat-core.js && echo "SYNTAX OK"
git show HEAD:STAGE/index.html | sed -n "${START},${END}p" | grep -v '^\s*<script' | grep -v '^\s*</script' > /Volumes/Xcode_Projects/_verify_chat.txt
tail -n +9 STAGE/chat-core.js > /Volumes/Xcode_Projects/_verify_new.txt
diff /Volumes/Xcode_Projects/_verify_chat.txt /Volumes/Xcode_Projects/_verify_new.txt && echo "IDENTICAL"
rm /Volumes/Xcode_Projects/_verify_chat.txt /Volumes/Xcode_Projects/_verify_new.txt
```

Expected: `SYNTAX OK` and `IDENTICAL`.

- [ ] **Step 5: Full regression pass in the browser**

This is the gate for the whole plan — everything later builds on it. Two profiles, two staff accounts. Check each:

- [ ] Chat opens from the FAB; roster shows online/offline with correct presence dots
- [ ] Send and receive text both directions; chime fires; unread badge counts correctly
- [ ] Favourite star, roster search, "Show more" offline
- [ ] Client linking dropdown; the client-mention nudge appears and the Interactions row is written
- [ ] "Load older messages" pagination
- [ ] Request Screen Sharing → accept → viewer → stop
- [ ] Admin → Chat Logs loads and expands; the Purge count is correct
- [ ] Hard reload with the PWA cache cleared, then repeat the basics
- [ ] Browser console is clean of new errors

**If any item fails, fix it before Task 4.** A regression here is a mis-cut extraction, not a feature bug.

- [ ] **Step 6: Bump the version and commit**

Bump to `v147.33-STAGE`, update all three `?v=` tags.

```bash
git add STAGE/chat-core.js STAGE/index.html
git commit -m "refactor(int): extract chat to chat-core.js — v147.33

Pure move, verified byte-identical against HEAD. STAGE only.
Completes the extraction; index.html is ~2,200 lines smaller."
```

---

### Task 4: Give chat-core its own markup and a host contract

Now `chat-core.js` becomes self-contained: it renders its own DOM and stops assuming `index.html`'s helpers exist.

**Files:**
- Modify: `STAGE/chat-core.js`
- Modify: `STAGE/index.html` (chat modal markup `9000`–`9082` and FAB `9198`–`9203` become a mount div)

**Interfaces:**
- Consumes: everything from Task 3.
- Produces: `window.LDAHChat.mount(el, opts)` where `opts = { mode: 'modal'|'window', host?: { getContacts, getWeatherForUid, toast, logInteraction } }`. Returns `{ open(), close(), destroy() }`. Also `window.LDAHChat.MARKUP` (string) for the two hosts.

- [ ] **Step 1: Move the markup into chat-core.js**

Cut the chat modal markup (`<div class="chat-modal-overlay" id="chatModalOverlay">` … its closing `</div>`) and the FAB markup (`<div class="chat-launch">` … `</div>`) out of `index.html` and into `chat-core.js` as string constants:

```js
  var MODAL_MARKUP = '' +
    '<div class="chat-modal-overlay" id="chatModalOverlay">' +
    /* …the modal markup, verbatim, one line per source line… */
    '</div>';

  var FAB_MARKUP = '' +
    '<div class="chat-launch">' +
      '<div style="position:relative;">' +
        '<button class="chat-fab" id="chatOpen" type="button" title="Open internal chat">&#128172;</button>' +
        '<div class="chat-badge" id="chatBadge" style="display:none;"></div>' +
      '</div>' +
    '</div>';
```

The screen-share overlay markup (`#screenshareOverlay`) stays in `index.html` for now and is added to `chat.html` in Task 5 — it belongs to `rtc-screenshare.js`, not to chat.

- [ ] **Step 2: Add the private fallback helpers**

The six pure formatters get private copies in `chat-core.js` so the file works with no host. Each prefers the host's version when present:

```js
  function _escHTML(s) {
    if (typeof window.escHTML === 'function') return window.escHTML(s);
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
```

Do the same for `_rsEscape`, `_getInitials`, `_formatTime`, `_formatRole`, `_linkifyURLs` — copy each body from the current `index.html` definition so behaviour is identical. Then replace every call inside the IIFE with the underscored version.

- [ ] **Step 3: Add the private chime fallback**

`window._playChatChime` lives in `index.html`'s shared sounds block, which is **not** being moved (it also defines the alert bell). So:

```js
  function _chime() {
    if (typeof window._playChatChime === 'function') { window._playChatChime(); return; }
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(880, ctx.currentTime);
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + 0.36);
    } catch (e) {}
  }
```

Replace the body of `playNotifSound()` with a call to `_chime()`.

- [ ] **Step 4: Wrap the IIFE in the mount API**

Convert the top-level IIFE so its body runs inside `mount()` rather than at parse time. The `getElementById` lookups near the top move to the start of `mount()`, after the markup is injected:

```js
window.LDAHChat = (function () {
  'use strict';
  var _host = {};
  var _mode = 'modal';

  // ── host capability accessors — fall back to our own reads ──
  function hostContacts() {
    if (_host.getContacts) return Promise.resolve(_host.getContacts());
    return db().collection('contacts').get().then(function (snap) {
      var out = []; snap.forEach(function (d) {
        out.push({ id: d.id, displayName: d.data().displayName || '' });
      }); return out;
    });
  }
  function hostToast(msg, color) {
    if (_host.toast) return _host.toast(msg, color);
    if (typeof window._showToast === 'function') return window._showToast(msg, color);
    console.log('[chat]', msg);
  }
  function hostWeather(uid) {
    return _host.getWeatherForUid ? _host.getWeatherForUid(uid) : null;
  }
  function hostLogInteraction(payload) {
    if (_host.logInteraction) return _host.logInteraction(payload);
    return db().collection('interactions').add(payload);
  }

  /* …the entire existing chat body, unchanged except for the
     _escHTML/_chime/host* substitutions… */

  function mount(el, opts) {
    opts = opts || {};
    _mode = opts.mode || 'modal';
    _host = opts.host || {};
    el.innerHTML = MODAL_MARKUP + (_mode === 'modal' ? FAB_MARKUP : '');
    bindElements();        // the getElementById block, now a function
    wireEvents();          // the addEventListener block, now a function
    if (_mode === 'window') { document.body.classList.add('chat-window-mode'); }
    setTimeout(tryInitChat, _mode === 'window' ? 200 : 1000);
    return { open: openChatModal, close: closeChatModal, destroy: teardown };
  }

  function teardown() {
    if (_chatMessagesUnsub) _chatMessagesUnsub();
    if (_chatRosterUnsub) _chatRosterUnsub();
    if (_chatConvsUnsub) _chatConvsUnsub();
    if (_chatHeaderPresenceUnsub) _chatHeaderPresenceUnsub();
    if (_chatLocalTimeInterval) clearInterval(_chatLocalTimeInterval);
  }

  return { mount: mount, MARKUP: MODAL_MARKUP };
})();
```

Keep `window.initChatRoster`, `window.initChatConversations`, and `window.reinitChat` assigned as they are today — `index.html`'s auth block calls them.

- [ ] **Step 5: Mount from index.html**

Where the modal markup used to be:

```html
<div id="chatMount"></div>
```

And after the `chat-core.js` script tag:

```html
<script>
  LDAHChat.mount(document.getElementById('chatMount'), {
    mode: 'modal',
    host: {
      getContacts: function () { return window._allContacts || []; },
      getWeatherForUid: function (uid) {
        return typeof getWeatherForUid === 'function' ? getWeatherForUid(uid) : null;
      },
      toast: function (m, c) { if (typeof _showToast === 'function') _showToast(m, c); }
    }
  });
</script>
```

- [ ] **Step 6: Verify**

```bash
node --check STAGE/chat-core.js && echo "SYNTAX OK"
```

Then re-run the **entire Task 3 Step 5 regression checklist** in the browser. Nothing visible may have changed.

- [ ] **Step 7: Bump and commit**

```bash
git add STAGE/chat-core.js STAGE/index.html
git commit -m "refactor(int): chat-core owns its markup + host contract — v147.34

LDAHChat.mount(el,{mode,host}); private formatter/chime fallbacks so the
module runs with no host. No behaviour change. STAGE only."
```

---

### Task 5: The pop-out page

**Files:**
- Create: `STAGE/chat.html`

**Interfaces:**
- Consumes: `chat.css`, `rtc-screenshare.js`, `chat-core.js`, `LDAHChat.mount()`.
- Produces: a standalone page at `STAGE/chat.html` that mounts chat in `window` mode.

- [ ] **Step 1: Write the page**

Copy the Firebase config object verbatim from `STAGE/index.html` (search `storageBucket`) — it is a public client config, not a secret.

```html
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>LDAH Chat</title>
<link rel="icon" href="icon-512.png">
<link rel="stylesheet" href="chat.css?v=147.35">
<style>
  :root{color-scheme:light}
  html,body{height:100%;margin:0;background:#eef2f7;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;}
  /* In window mode the modal fills the viewport instead of floating. */
  body.chat-window-mode .chat-modal-overlay{display:block;position:static;background:none;}
  body.chat-window-mode .chat-modal{
    position:static;transform:none;width:100%;height:100vh;max-width:none;
    border-radius:0;border:none;box-shadow:none;}
  body.chat-window-mode .chat-modal-close{display:none;}
  #chatSignedOut{display:none;padding:40px 24px;text-align:center;color:#334155;}
  #chatSignedOut a{color:#0891B2;font-weight:700;}
</style></head><body>
  <div id="chatSignedOut">
    <h2>Sign in to LDAH Internal first</h2>
    <p>This window shares the sign-in from the main dashboard.</p>
    <p><a href="index.html" target="_blank">Open LDAH Internal</a>, sign in, then reopen chat.</p>
  </div>
  <div id="chatMount"></div>

  <!-- Screen share viewer overlay — required by rtc-screenshare.js -->
  <div class="screenshare-overlay" id="screenshareOverlay">
    <div class="screenshare-toolbar">
      <div class="screenshare-toolbar-left">
        <div class="screenshare-status" id="screenshareStatus"></div>
        <span class="screenshare-label" id="screenshareLabel">Starting...</span>
      </div>
      <div class="screenshare-toolbar-right">
        <button class="screenshare-btn fullscreen" id="screenshareFull" type="button">Fullscreen</button>
        <button class="screenshare-btn stop" id="screenshareStop" type="button">End Session</button>
      </div>
    </div>
    <div class="screenshare-video-wrap">
      <video id="screenshareVideo" autoplay playsinline></video>
      <div class="screenshare-msg" id="screenshareMsg"></div>
    </div>
  </div>

<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-storage-compat.js"></script>
<script>
  firebase.initializeApp({ /* paste the config object from index.html verbatim */ });
</script>
<script src="rtc-screenshare.js?v=147.35"></script>
<script src="chat-core.js?v=147.35"></script>
<script>
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      document.getElementById('chatSignedOut').style.display = 'block';
      document.getElementById('chatMount').style.display = 'none';
      return;
    }
    document.getElementById('chatSignedOut').style.display = 'none';
    document.getElementById('chatMount').style.display = '';
    firebase.firestore().collection('userRoles').doc(user.uid).get().then(function (doc) {
      var d = doc.exists ? doc.data() : {};
      window.currentUserData = {
        uid: user.uid,
        displayName: d.displayName || user.email || 'Unknown',
        role: d.role || '', email: user.email
      };
      document.title = window.currentUserData.displayName + ' — LDAH Chat';
      LDAHChat.mount(document.getElementById('chatMount'), { mode: 'window' });
    });
  });
</script>
</body></html>
```

`window.currentUserData` must be set **before** `mount()` — `rtc-screenshare.js` reads it, and so does the presence write.

- [ ] **Step 2: Verify signed-out state**

Open `STAGE/chat.html` in a browser profile that is **not** signed in. Expected: the "Sign in to LDAH Internal first" panel, no console errors, no empty roster.

- [ ] **Step 3: Verify signed-in state**

In a signed-in profile, open `STAGE/chat.html` directly. Expected: full roster, conversations load, send and receive works against the other profile, the title bar shows the user's name. Resize to ~420px wide — the roster collapses behind ☰ and nothing overflows horizontally.

- [ ] **Step 4: Verify screen share from the pop-out**

Request Screen Sharing from `chat.html`; accept in the other profile. Expected: the viewer overlay works exactly as it does in the dashboard.

- [ ] **Step 5: Bump and commit**

```bash
git add STAGE/chat.html STAGE/index.html
git commit -m "feat(int): standalone chat.html pop-out page — v147.35

Mounts chat-core in window mode off the shared Firebase session.
Signed-out state shows a sign-in prompt. STAGE only."
```

---

### Task 6: The Pop Out button, window geometry, and FAB state

**Files:**
- Modify: `STAGE/chat-core.js` (header markup + pop-out logic)
- Modify: `STAGE/chat.css` (button style)

**Interfaces:**
- Consumes: `STAGE/chat.html` (Task 5).
- Produces: `localStorage` key `ldahChatWindow` = `{"w":1180,"h":820,"x":120,"y":80}`.

- [ ] **Step 1: Add the button to the header markup**

In `MODAL_MARKUP`, inside `.chat-modal-header-actions`, immediately before the `chat-modal-close` button:

```html
<button class="chat-popout-btn" id="chatPopOut" type="button"
        title="Open chat in its own window (drag it to another monitor)">&#9082;</button>
```

Guard it in `mount()` so it never appears in the pop-out itself:

```js
    if (_mode === 'window') {
      var po = document.getElementById('chatPopOut');
      if (po) po.style.display = 'none';
    }
```

- [ ] **Step 2: Style it in chat.css**

```css
    .chat-popout-btn{
      background:rgba(255,255,255,.22); color:#fff; border:none;
      width:32px; height:32px; border-radius:9px; cursor:pointer;
      font-size:1.05rem; line-height:1; transition:background .18s;
    }
    .chat-popout-btn:hover{ background:rgba(255,255,255,.35); }
```

- [ ] **Step 3: Implement the pop-out**

```js
  var _popWin = null;
  var _popPoll = null;

  function readGeom() {
    try {
      var g = JSON.parse(localStorage.getItem('ldahChatWindow') || 'null');
      if (g && g.w > 300 && g.h > 300) return g;
    } catch (e) {}
    return { w: 1180, h: 820, x: 120, y: 80 };
  }

  function saveGeom() {
    if (!_popWin || _popWin.closed) return;
    try {
      localStorage.setItem('ldahChatWindow', JSON.stringify({
        w: _popWin.outerWidth, h: _popWin.outerHeight,
        x: _popWin.screenX,    y: _popWin.screenY
      }));
    } catch (e) {}
  }

  function openPopOut() {
    if (_popWin && !_popWin.closed) { _popWin.focus(); return; }
    var g = readGeom();
    _popWin = window.open('chat.html',  'ldahChat',
      'width=' + g.w + ',height=' + g.h + ',left=' + g.x + ',top=' + g.y +
      ',resizable=yes,scrollbars=yes');
    if (!_popWin) { hostToast('Allow pop-ups for this site to use the chat window.', '#D97706'); return; }
    closeChatModal();
    setPoppedOutState(true);
    if (_popPoll) clearInterval(_popPoll);
    _popPoll = setInterval(function () {
      if (!_popWin || _popWin.closed) {
        clearInterval(_popPoll); _popPoll = null; _popWin = null;
        setPoppedOutState(false);
      } else {
        saveGeom();   // poll-save; the popup cannot write its own geometry on close
      }
    }, 1000);
  }

  function setPoppedOutState(on) {
    if (!chatOpen) return;
    chatOpen.classList.toggle('popped-out', on);
    chatOpen.title = on ? 'Chat is open in its own window — click to focus it'
                        : 'Open internal chat';
  }
```

Then in `handleFabClick()`, before anything else:

```js
      if (_popWin && !_popWin.closed) { _popWin.focus(); return; }
```

And wire the button in `wireEvents()`:

```js
    var popBtn = document.getElementById('chatPopOut');
    if (popBtn) popBtn.addEventListener('click', openPopOut);
```

- [ ] **Step 4: Style the popped-out FAB state**

```css
    .chat-fab.popped-out{ opacity:.55; }
    .chat-fab.popped-out::after{
      content:"\29FA"; position:absolute; right:-2px; bottom:-2px;
      background:var(--ocean-deep); color:#fff; border-radius:50%;
      width:18px; height:18px; font-size:.6rem; line-height:18px; text-align:center;
    }
```

- [ ] **Step 5: Verify**

- [ ] Pop Out opens the window; the in-app modal closes; the FAB dims and shows the badge
- [ ] Drag the window to the second monitor, resize it, close it, click the FAB, Pop Out again → **same monitor, same size**
- [ ] With the pop-out open, clicking the FAB focuses it rather than opening the modal
- [ ] Close the pop-out → within ~1s the FAB returns to normal and opens the modal again
- [ ] Reload the main dashboard while the pop-out is open → the pop-out keeps working
- [ ] Close the main dashboard tab entirely → the pop-out keeps working
- [ ] The Pop Out button is **not** visible inside the pop-out
- [ ] Block pop-ups in the browser, click Pop Out → the amber toast appears, nothing breaks

- [ ] **Step 6: Bump and commit** (`v147.36-STAGE`)

```bash
git add STAGE/chat-core.js STAGE/chat.css STAGE/index.html
git commit -m "feat(int): Pop Out button + window geometry memory — v147.36

Chat opens in its own resizable window and reopens on the monitor it
was left on. FAB focuses the pop-out while it is open. STAGE only."
```

---

### Task 7: The single-chimer rule

Two windows may be open at once; exactly one owns the unread badge and the chime.

**Files:**
- Modify: `STAGE/chat-core.js`

**Interfaces:**
- Consumes: Task 6.
- Produces: `localStorage` key `ldahChatActiveWindow` = `{"id":"<random>","ts":<epoch ms>}`.

- [ ] **Step 1: Implement ownership**

```js
  var _winId = 'w' + Math.random().toString(36).slice(2) + Date.now();
  var _ownsChime = false;
  var _ownHeartbeat = null;
  var CHIME_KEY = 'ldahChatActiveWindow';
  var STALE_MS = 10000;

  function readOwner() {
    try { return JSON.parse(localStorage.getItem(CHIME_KEY) || 'null'); }
    catch (e) { return null; }
  }

  function claimChime() {
    try { localStorage.setItem(CHIME_KEY, JSON.stringify({ id: _winId, ts: Date.now() })); } catch (e) {}
    _ownsChime = true;
  }

  function releaseChime() {
    var o = readOwner();
    if (o && o.id === _winId) { try { localStorage.removeItem(CHIME_KEY); } catch (e) {} }
    _ownsChime = false;
  }

  function evaluateOwnership() {
    var o = readOwner();
    if (!o) { claimChime(); return; }
    if (o.id === _winId) { _ownsChime = true; claimChime(); return; }   // refresh ts
    // Someone else owns it. Take over only if their heartbeat is stale.
    if (Date.now() - (o.ts || 0) > STALE_MS) { claimChime(); return; }
    // The pop-out outranks the dashboard while both are alive.
    _ownsChime = (_mode === 'window');
    if (_ownsChime) claimChime();
  }

  function startOwnership() {
    evaluateOwnership();
    if (_ownHeartbeat) clearInterval(_ownHeartbeat);
    _ownHeartbeat = setInterval(evaluateOwnership, 3000);
    window.addEventListener('storage', function (e) {
      if (e.key === CHIME_KEY) evaluateOwnership();
    });
    // pagehide fires reliably where beforeunload does not (see the DM resume-email work)
    window.addEventListener('pagehide', releaseChime);
  }
```

Call `startOwnership()` at the end of `mount()`.

- [ ] **Step 2: Gate the chime and the title flash**

In the conversations listener, replace the chime call:

```js
            if (shouldChime && _ownsChime) playNotifSound();
```

And gate the title signal:

```js
          if (_ownsChime && typeof window._ldahChatTitleSignal === 'function') {
            window._ldahChatTitleSignal(unread);
          }
```

Messages still render in both windows — only the audible chime and the title flash are gated.

- [ ] **Step 3: Verify**

- [ ] Dashboard only, pop-out closed → dashboard chimes on an incoming message
- [ ] Pop-out open → **only the pop-out chimes**; the dashboard stays silent but still shows the message
- [ ] Close the pop-out → the dashboard chimes again on the next message
- [ ] Force-quit the pop-out (kill the window without a clean unload) → the dashboard reclaims the chime within ~10s
- [ ] Reload the dashboard while the pop-out is open → the pop-out still owns the chime; no double chime at any point
- [ ] In DevTools → Application → Local Storage, `ldahChatActiveWindow.ts` advances every ~3s

- [ ] **Step 4: Bump and commit** (`v147.37-STAGE`)

```bash
git add STAGE/chat-core.js STAGE/index.html
git commit -m "feat(int): single-chimer rule across dashboard and pop-out — v147.37

localStorage heartbeat decides which window owns the chime and unread
title flash. Pop-out wins while alive; 10s staleness hands it back."
```

---

### Task 8: Paste a screenshot — capture, preview, downscale, upload, send

**Files:**
- Modify: `STAGE/chat-core.js`
- Modify: `STAGE/chat.css`

**Interfaces:**
- Consumes: Task 4's mount API.
- Produces: message documents with `hasImage: true`, `imageUrl`, `imagePath`, `imageW`, `imageH`, `imageBytes`. Storage objects at `chatImages/{convId}/{autoId}.jpg`.

- [ ] **Step 1: Add the preview strip markup**

In `MODAL_MARKUP`, immediately above `<div class="chat-modal-input-area">`:

```html
<div class="chat-img-preview" id="chatImgPreview" style="display:none;">
  <img id="chatImgPreviewThumb" alt="Screenshot to send">
  <div class="chat-img-preview-meta">
    <div class="chat-img-preview-name">Screenshot</div>
    <div class="chat-img-preview-size" id="chatImgPreviewSize"></div>
  </div>
  <button type="button" class="chat-img-preview-x" id="chatImgPreviewX"
          aria-label="Remove screenshot">&times;</button>
</div>
```

- [ ] **Step 2: Style it**

```css
    .chat-img-preview{
      display:flex; align-items:center; gap:10px; margin-bottom:6px;
      padding:8px 10px; background:rgba(8,145,178,.08);
      border:1px solid rgba(8,145,178,.22); border-radius:10px;
    }
    .chat-img-preview img{
      width:56px; height:42px; object-fit:cover; border-radius:6px;
      border:1px solid rgba(8,145,178,.25);
    }
    .chat-img-preview-meta{ flex:1; min-width:0; }
    .chat-img-preview-name{ font-weight:700; font-size:.8rem; color:var(--text-dark); }
    .chat-img-preview-size{ font-size:.72rem; color:var(--text-soft); }
    .chat-img-preview-x{
      background:none; border:none; font-size:1.3rem; line-height:1;
      color:var(--text-soft); cursor:pointer; padding:0 4px;
    }
    .chat-img-preview-x:hover{ color:#ef4444; }
```

- [ ] **Step 3: Implement capture and downscale**

```js
  var _pendingImage = null;   // { blob, w, h, previewUrl }
  var MAX_RAW_BYTES = 10 * 1024 * 1024;
  var MAX_EDGE = 1600;
  var JPEG_QUALITY = 0.82;

  function handleImagePaste(e) {
    var items = (e.clipboardData && e.clipboardData.items) || [];
    var file = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].kind === 'file' && /^image\//.test(items[i].type)) {
        file = items[i].getAsFile(); break;
      }
    }
    if (!file) return;                       // plain text paste — leave it alone
    e.preventDefault();
    if (file.size > MAX_RAW_BYTES) {
      hostToast('That image is too large (max 10MB).', '#DC2626');
      return;
    }
    downscaleImage(file).then(setPendingImage).catch(function (err) {
      console.warn('chat image paste:', err && err.message);
      hostToast('Could not read that image.', '#DC2626');
    });
  }

  function downscaleImage(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth, h = img.naturalHeight;
        var scale = Math.min(1, MAX_EDGE / Math.max(w, h));
        var tw = Math.round(w * scale), th = Math.round(h * scale);
        var cv = document.createElement('canvas');
        cv.width = tw; cv.height = th;
        cv.getContext('2d').drawImage(img, 0, 0, tw, th);
        cv.toBlob(function (blob) {
          URL.revokeObjectURL(url);
          if (!blob) { reject(new Error('toBlob failed')); return; }
          resolve({ blob: blob, w: tw, h: th, previewUrl: cv.toDataURL('image/jpeg', 0.5) });
        }, 'image/jpeg', JPEG_QUALITY);
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('decode failed')); };
      img.src = url;
    });
  }

  function setPendingImage(pi) {
    _pendingImage = pi;
    var box = document.getElementById('chatImgPreview');
    document.getElementById('chatImgPreviewThumb').src = pi.previewUrl;
    document.getElementById('chatImgPreviewSize').textContent =
      pi.w + '×' + pi.h + ' · ' + Math.round(pi.blob.size / 1024) + ' KB';
    box.style.display = 'flex';
    if (chatModalInput) chatModalInput.focus();
  }

  function clearPendingImage() {
    _pendingImage = null;
    var box = document.getElementById('chatImgPreview');
    if (box) box.style.display = 'none';
  }
```

Wire in `wireEvents()`:

```js
    if (chatModalInput)    chatModalInput.addEventListener('paste', handleImagePaste);
    if (chatModalMessages) chatModalMessages.addEventListener('paste', handleImagePaste);
    var xBtn = document.getElementById('chatImgPreviewX');
    if (xBtn) xBtn.addEventListener('click', clearPendingImage);
```

- [ ] **Step 4: Upload on send**

`sendChatMessage()` currently returns early on empty text. Change the guard and add the upload branch:

```js
    function sendChatMessage() {
      var text = (chatModalInput ? chatModalInput.value : '').trim();
      if ((!text && !_pendingImage) || !_chatActiveConvId) return;
      if (_pendingImage) { sendWithImage(text); return; }
      /* …existing text-only path, unchanged… */
    }

    function sendWithImage(caption) {
      var pi = _pendingImage;
      var convId = _chatActiveConvId;
      setSendBusy(true);
      var id = db().collection('chatConversations').doc(convId)
                 .collection('messages').doc().id;
      var path = 'chatImages/' + convId + '/' + id + '.jpg';
      firebase.storage().ref(path).put(pi.blob, { contentType: 'image/jpeg' })
        .then(function (snap) { return snap.ref.getDownloadURL(); })
        .then(function (url) {
          clearPendingImage();
          if (chatModalInput) chatModalInput.value = '';
          if (chatCharCount) {
            chatCharCount.textContent = '0 / 500';
            chatCharCount.className = 'chat-char-count';
          }
          return writeMessage(caption, {
            hasImage: true, imageUrl: url, imagePath: path,
            imageW: pi.w, imageH: pi.h, imageBytes: pi.blob.size
          });
        })
        .catch(function (err) {
          console.error('Chat image send error:', err);
          hostToast('Could not send that screenshot: ' + (err && err.message), '#DC2626');
        })
        .finally(function () { setSendBusy(false); });
    }

    function setSendBusy(busy) {
      if (!chatModalSend) return;
      chatModalSend.disabled = busy;
      chatModalSend.textContent = busy ? 'Sending…' : 'Send';
    }
```

Refactor the existing send body into `writeMessage(text, extra)` so both paths share one write. `extra` is merged into the message document; the conversation's `lastMessage` preview becomes `'📷 Screenshot'` when `extra.hasImage` is set, and the Interactions log text becomes `'Chat message: [screenshot]' + (caption ? ' ' + caption : '')`.

- [ ] **Step 5: Verify**

- [ ] Cmd-Shift-4 on the Mac, then Cmd-V → the preview strip appears with correct dimensions and KB
- [ ] Win-Shift-S on the PC, then Ctrl-V → same
- [ ] ✕ clears the preview
- [ ] Send with no caption; send with a caption — both post
- [ ] Send button shows "Sending…" and is disabled during the upload
- [ ] A 4K screenshot lands **under 1MB** in Storage (check the object size in the Firebase console)
- [ ] Pasting plain text into the input still just pastes text
- [ ] Firebase console → Storage shows the object at `chatImages/{convId}/{id}.jpg`
- [ ] The conversation list preview shows `📷 Screenshot`
- [ ] A client-linked screenshot writes `Chat message: [screenshot]` to Interactions **with no image**

- [ ] **Step 6: Bump and commit** (`v147.38-STAGE`)

```bash
git add STAGE/chat-core.js STAGE/chat.css STAGE/index.html
git commit -m "feat(int): paste a screenshot into chat — v147.38

Clipboard paste only. Downscaled to 1600px/q0.82 in-browser, uploaded to
chatImages/{convId}/, 10MB raw cap. STAGE only."
```

---

### Task 9: Render screenshots in the message list

**Files:**
- Modify: `STAGE/chat-core.js` (`renderMessages`, Chat Logs helper)
- Modify: `STAGE/chat.css`
- Modify: `STAGE/index.html` (`toggleChatLog` renderer)

**Interfaces:**
- Consumes: Task 8's message schema.
- Produces: `.chat-msg-img` thumbnails and a `#chatLightbox` overlay.

- [ ] **Step 1: Render the thumbnail in the bubble**

In `renderMessages`, after `textHtml` is built and before the bubble string is assembled:

```js
        var imgHtml = '';
        if (m.hasImage) {
          var ageMs = m.createdAt && m.createdAt.toMillis
            ? (Date.now() - m.createdAt.toMillis()) : 0;
          if (ageMs > 90 * 24 * 60 * 60 * 1000) {
            imgHtml = '<div class="chat-msg-img-gone">[screenshot expired]</div>';
          } else {
            var tw = Math.min(320, m.imageW || 320);
            var th = (m.imageW && m.imageH)
              ? Math.round(tw * (m.imageH / m.imageW)) : Math.round(tw * 0.6);
            imgHtml = '<img class="chat-msg-img" loading="lazy"' +
              ' src="' + _escHTML(m.imageUrl || '') + '"' +
              ' width="' + tw + '" height="' + th + '"' +
              ' alt="Screenshot" onerror="this.outerHTML=' +
              '\'&lt;div class=&quot;chat-msg-img-gone&quot;&gt;[screenshot expired]&lt;/div&gt;\'">';
          }
        }
```

Then include `imgHtml` in the bubble, above the caption text:

```js
          + '<div class="chat-message-text">' + imgHtml + textHtml + shareBtn + '</div>'
```

**Expiry is decided by message age, not by a failed fetch** — that avoids a broken-image flash. The `onerror` is only a backstop.

- [ ] **Step 2: Style the thumbnail and placeholder**

```css
    .chat-msg-img{
      display:block; max-width:320px; width:100%; height:auto;
      border-radius:9px; margin:2px 0 6px; cursor:zoom-in;
      border:1px solid rgba(8,145,178,.2); background:#f1f5f9;
    }
    .chat-msg-img-gone{
      display:inline-block; padding:8px 12px; margin:2px 0 6px;
      background:rgba(100,116,139,.1); border:1px dashed rgba(100,116,139,.35);
      border-radius:8px; font-size:.8rem; color:var(--text-soft); font-style:italic;
    }
    .chat-lightbox{
      display:none; position:fixed; inset:0; z-index:99999;
      background:rgba(15,23,42,.9); align-items:center; justify-content:center;
    }
    .chat-lightbox.active{ display:flex; }
    .chat-lightbox img{ max-width:94vw; max-height:88vh; border-radius:10px; }
    .chat-lightbox-bar{
      position:absolute; top:14px; right:18px; display:flex; gap:12px; align-items:center;
    }
    .chat-lightbox-bar a, .chat-lightbox-bar button{
      background:rgba(255,255,255,.16); color:#fff; border:none; border-radius:8px;
      padding:7px 14px; font-size:.85rem; font-weight:700; cursor:pointer;
      text-decoration:none;
    }
```

- [ ] **Step 3: Add the lightbox**

Append to `MODAL_MARKUP`:

```html
<div class="chat-lightbox" id="chatLightbox">
  <div class="chat-lightbox-bar">
    <a id="chatLightboxOpen" href="#" target="_blank" rel="noopener">Open original</a>
    <button type="button" id="chatLightboxClose">Close</button>
  </div>
  <img id="chatLightboxImg" alt="Screenshot">
</div>
```

Wire it with event delegation in `wireEvents()`:

```js
    if (chatModalMessages) {
      chatModalMessages.addEventListener('click', function (e) {
        var img = e.target.closest ? e.target.closest('.chat-msg-img') : null;
        if (!img) return;
        var lb = document.getElementById('chatLightbox');
        document.getElementById('chatLightboxImg').src = img.src;
        document.getElementById('chatLightboxOpen').href = img.src;
        lb.classList.add('active');
      });
    }
    var lbClose = document.getElementById('chatLightboxClose');
    if (lbClose) lbClose.addEventListener('click', function () {
      document.getElementById('chatLightbox').classList.remove('active');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var lb = document.getElementById('chatLightbox');
      if (lb && lb.classList.contains('active')) {
        e.stopPropagation();                 // do not also close the chat modal
        lb.classList.remove('active');
      }
    });
```

The lightbox Escape handler must be registered **before** the existing modal-closing Escape handler so `stopPropagation` reaches it first — add it at the top of `wireEvents()`.

- [ ] **Step 4: Show image messages in admin Chat Logs**

In `STAGE/index.html`'s `toggleChatLog`, where each message row is built, prefix the text with the image marker:

```js
        var body = (m.hasImage ? '📷 Screenshot ' : '') + (m.text || '');
```

- [ ] **Step 5: Verify**

- [ ] Thumbnail appears in the bubble at the correct aspect ratio, with **no layout jump** as it loads
- [ ] Both windows render an image sent from the other
- [ ] Click → lightbox opens; **Open original** opens the full image in a new tab; Close works
- [ ] Escape closes the lightbox and leaves the chat modal open; a second Escape closes the chat modal
- [ ] Admin → Chat Logs shows `📷 Screenshot` on image rows
- [ ] Temporarily point one message's `imageUrl` at a 404 → the `[screenshot expired]` placeholder replaces it, no broken-image icon

- [ ] **Step 6: Bump and commit** (`v147.39-STAGE`)

```bash
git add STAGE/chat-core.js STAGE/chat.css STAGE/index.html
git commit -m "feat(int): render screenshots with lightbox + expired placeholder — v147.39

Expiry decided by message age (90d), not by a failed fetch. STAGE only."
```

---

### Task 10: Retention — rules, lifecycle, and purge

**Files:**
- Modify: `STAGE/index.html` (`purgeOldChats`)
- Create: `/Volumes/Xcode_Projects/lifecycle-chatimages.json` (working file, not committed)

**Interfaces:**
- Consumes: Task 8's `imagePath` field.
- Produces: a Storage lifecycle rule and Storage security rules. Both live outside this repo.

- [ ] **Step 1: Extend Purge Old Chats to delete image objects**

In `window.purgeOldChats`, inside the loop that reads each conversation's messages, collect image paths and delete them before the Firestore batch deletes:

```js
        var imagePaths = [];
        msgSnap.forEach(function (mDoc) {
          var m = mDoc.data();
          if (m.imagePath) imagePaths.push(m.imagePath);
        });

        // Storage failures must never block the Firestore purge.
        var imgDeleted = 0;
        for (var ip = 0; ip < imagePaths.length; ip++) {
          try {
            await firebase.storage().ref(imagePaths[ip]).delete();
            imgDeleted++;
          } catch (x) {
            console.warn('purge: image already gone or undeletable:', imagePaths[ip], x && x.code);
          }
        }
        totalImagesDeleted += imgDeleted;
```

Declare `var totalImagesDeleted = 0;` before the loop, add an **Images deleted** column to the audit CSV, and include the count in the completion toast.

- [ ] **Step 2: Publish the Storage security rules**

These are managed in the Firebase console (this repo has no `firebase.json`). Add to the existing `storage.rules`, inside `service firebase.storage { match /b/{bucket}/o { … } }`:

```
      match /chatImages/{convId}/{file} {
        allow read: if request.auth != null;
        allow write: if request.auth != null
                     && request.resource.size < 10 * 1024 * 1024
                     && request.resource.contentType.matches('image/.*');
      }
```

**Do not replace the existing rules file** — add this match block alongside what is already there.

- [ ] **Step 3: Read the current lifecycle policy before changing it**

```bash
gcloud storage buckets describe gs://ldah-932d5.firebasestorage.app --format="json(lifecycle)"
```

**Record the output.** `buckets update --lifecycle-file` **replaces** the entire lifecycle configuration — any existing rule must be merged into the JSON in the next step or it will be silently dropped.

- [ ] **Step 4: Apply the 90-day rule**

```bash
cat > /Volumes/Xcode_Projects/lifecycle-chatimages.json <<'JSON'
{"lifecycle":{"rule":[
  {"action":{"type":"Delete"},
   "condition":{"age":90,"matchesPrefix":["chatImages/"]}}
]}}
JSON

gcloud storage buckets update gs://ldah-932d5.firebasestorage.app \
  --lifecycle-file=/Volumes/Xcode_Projects/lifecycle-chatimages.json

gcloud storage buckets describe gs://ldah-932d5.firebasestorage.app --format="json(lifecycle)"
```

> **Confirm with Daniel before running this.** It is a one-time change to a shared bucket, needs the **"info (Work)"** ADC profile, and any pre-existing lifecycle rule from Step 3 must be merged into the JSON above first.

- [ ] **Step 5: Verify**

- [ ] Signed-out `fetch()` of a `chatImages/` download URL is rejected
- [ ] An upload of a non-image blob to `chatImages/` is rejected by the rules
- [ ] `buckets describe` shows the Delete/90/`chatImages/` rule **and** every rule recorded in Step 3
- [ ] Backdate a test message's `createdAt` past 90 days → the bubble shows `[screenshot expired]`
- [ ] Run Purge Old Chats against a backdated test conversation → the audit CSV reports the image count and the Storage objects are gone
- [ ] Purge still completes when an image is already deleted (delete one by hand first, then purge)

- [ ] **Step 6: Bump and commit** (`v147.40-STAGE`)

```bash
git add STAGE/index.html
git commit -m "feat(int): purge deletes chat screenshots; 90-day retention — v147.40

Purge Old Chats now deletes chatImages/ objects and reports the count.
Storage rules + a 90-day bucket lifecycle rule applied out of band."
```

---

### Task 11: Final pass and hand-off

**Files:** none — verification only.

- [ ] **Step 1: Confirm live is untouched**

```bash
cd /Volumes/Xcode_Projects/React/LDAH-Internal
git diff --stat HEAD~10 HEAD -- . ':(exclude)STAGE' ':(exclude)docs'
```

Expected: **empty**. Anything listed means live root was modified — revert it.

- [ ] **Step 2: Confirm the extraction actually shrank the monolith**

```bash
wc -l STAGE/index.html STAGE/chat-core.js STAGE/chat.css STAGE/rtc-screenshare.js STAGE/chat.html
```

Expected: `STAGE/index.html` around 45,600 lines, down from 47,874.

- [ ] **Step 3: Run the full spec test checklist**

Work through §7 of `docs/superpowers/specs/2026-08-13-chat-popout-screenshots-design.md` end to end with two profiles on two monitors. Every box must pass.

- [ ] **Step 4: Push**

```bash
git push origin main
```

Then confirm the GitHub Actions run went green — **push does not mean deployed** for this repo.

- [ ] **Step 5: Report to Daniel**

State plainly: what shipped to STAGE, the STAGE version number, that live is unchanged, whether the bucket lifecycle rule was applied or is still pending his go-ahead, and anything on the checklist that did not pass.

---

## Commit-to-spec mapping

The spec described four coarse commits; this plan refines them into ten so each has its own verification gate.

| Spec step | Plan tasks |
|---|---|
| 1. Extraction | 1, 2, 3, 4 |
| 2. Pop-out window | 5, 6, 7 |
| 3. Screenshots | 8, 9 |
| 4. Retention | 10 |
| — | 11 (final pass) |
