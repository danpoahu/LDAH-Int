/**
 * LDAH-Int — internal chat. THE single implementation.
 * Loaded by index.html (in-app modal) and chat.html (pop-out window).
 * Moved verbatim from index.html on 2026-08-13; given its own markup +
 * host contract on 2026-08-13 (window.LDAHChat.mount(el, opts)) so a
 * second host page can run this exact module with no globals required.
 *
 * Do not fork this file. If chat behaviour needs to change, change it here.
 */
window.LDAHChat = (function () {
  'use strict';
  var _host = {};
  var _mode = 'modal';

  /* ── Hidden presence ──────────────────────────────────────────────────
     SECOND COPY. index.html carries the same three constants and the same
     two functions (search it for _PRESENCE_OFFICE_HOURS_UIDS). They must
     stay identical — change one, change the other, or the roster here and
     the presence strip there will disagree about who is on screen.
     Two independent reasons to hide someone; either one is enough:
       1. `invisible: true` on their chatPresence doc — set by hand from the
          dashboard's "Viewing as" bar and persists until it is turned off.
       2. Office hours — one uid is shown 8am-3pm HST on weekdays only.
     Office hours can only hide, never reveal: a person who has switched
     themselves off stays off inside their working hours too.
     By uid, not name, because this file is public and served. HST is read
     explicitly rather than from the viewer's clock so the hours are his,
     not whoever happens to be looking. (2026-09-04) */
  var _PRESENCE_OFFICE_HOURS_UIDS = ['YmGV2TlBGqR01dVdxZ0rtFLEFCG3'];
  var _PRESENCE_OFFICE_OPEN_HOUR = 8;    // 8am HST
  var _PRESENCE_OFFICE_SHUT_HOUR = 15;   // 3pm HST

  function _presenceWithinOfficeHours() {
    var hst = new Date(new Date().toLocaleString('en-US', { timeZone: 'Pacific/Honolulu' }));
    var day = hst.getDay();                       // 0 Sun .. 6 Sat
    if (day === 0 || day === 6) return false;     // never at the weekend
    var h = hst.getHours();
    return h >= _PRESENCE_OFFICE_OPEN_HOUR && h < _PRESENCE_OFFICE_SHUT_HOUR;
  }

  function _presenceHidden(uid, data) {
    if (data && data.invisible === true) return true;
    if (_PRESENCE_OFFICE_HOURS_UIDS.indexOf(uid) === -1) return false;
    return !_presenceWithinOfficeHours();
  }

  // ── markup, moved verbatim out of index.html ──
  var MODAL_MARKUP = '' +
    '  <div class="chat-modal-overlay" id="chatModalOverlay">' +
    '    <div class="chat-modal">' +
    '      <!-- Sidebar with roster + conversations -->' +
    '      <div class="chat-modal-sidebar">' +
    '        <div class="chat-modal-sidebar-header">' +
    '          <h3>Team Messages</h3>' +
    '          <p>Internal staff communications</p>' +
    '        </div>' +
    '        <div class="chat-sidebar-search">' +
    '          <input id="chatSearchInput" placeholder="Search conversations…" />' +
    '        </div>' +
    '        <div class="chat-sidebar-scroll">' +
    '          <!-- Online users -->' +
    '          <div class="chat-roster-section">' +
    '            <div class="chat-roster-label">🟢 Online</div>' +
    '            <div id="chatOnlineList" class="chat-roster-list"></div>' +
    '          </div>' +
    '          <div class="chat-roster-divider"></div>' +
    '          <!-- Offline users -->' +
    '          <div class="chat-roster-section">' +
    '            <div class="chat-roster-label">⚫ Offline</div>' +
    '            <div id="chatOfflineList" class="chat-roster-list"></div>' +
    '            <button id="chatShowMoreOffline" class="chat-show-more" style="display:none;">▼ Show more</button>' +
    '          </div>' +
    '          <div class="chat-roster-divider"></div>' +
    '          <!-- Recent conversations. COLLAPSED BY DEFAULT, and deliberately not' +
    '               persisted: an always-open list of every recent thread is what used' +
    '               to give the sidebar an unbounded natural height, and the grid then' +
    '               clipped the bottom of the OTHER column — which is where the message' +
    '               composer lives. The roster above is the primary way in; the list' +
    '               stays in the DOM (not deleted) so renderConversations, the unread' +
    '               badges and the chime all keep working untouched. -->' +
    '          <div class="chat-roster-section">' +
    '            <button id="chatRecentToggle" class="chat-show-more" type="button" aria-expanded="false" aria-controls="chatConversationsList">▶ Recent Chats</button>' +
    '            <div id="chatConversationsList" class="chat-conversations" hidden></div>' +
    '          </div>' +
    '        </div>' +
    '      </div>' +
    '' +
    '      <!-- Main chat area -->' +
    '      <div class="chat-modal-main">' +
    '        <div class="chat-modal-header">' +
    '          <div class="chat-modal-header-left">' +
    '            <div class="chat-modal-avatar" id="chatHeaderAvatar">💬</div>' +
    '            <div class="chat-modal-header-info">' +
    '              <h4 id="chatHeaderName">Team Messages</h4>' +
    '              <p id="chatHeaderStatus">Select a conversation</p>' +
    '              <p id="chatHeaderLocalTime" style="font-size:.75rem;opacity:.85;margin:0;display:none;"></p>' +
    '            </div>' +
    '          </div>' +
    '          <div class="chat-modal-header-actions">' +
    '            <button class="chat-sidebar-toggle" id="chatSidebarToggle" type="button" aria-label="Toggle roster" title="Show roster">☰</button>' +
    '            <button class="chat-zoom-btn" id="chatZoomBtn" type="button" title="Ask this person to share their screen with you (no download needed)">' +
    '              <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm3 14h12v2H6v-2z"/></svg>' +
    '              <span class="chat-zoom-label">Request Screen Sharing</span>' +
    '            </button>' +
    '            <button class="chat-popout-btn" id="chatPopOut" type="button" title="Open chat in its own window (drag it to another monitor)">' +
    '              <svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>' +
    '            </button>' +
    '            <button class="chat-modal-close" id="chatModalClose" type="button" aria-label="Close chat">×</button>' +
    '          </div>' +
    '        </div>' +
    '' +
    /* ── IT_Help intake — button tree (v2, 2026-09-04) ───────────────────
       Replaces the two free-text questions ("what were you trying to do" /
       "what happened instead") with a two-press button tree. Staff wrote
       "it's broken" into those boxes and the round trip started anyway; the
       ten first-press buttons are the ten shapes of every report actually
       received, so one press already says more than a paragraph did.

       Everything below the head is rendered by JS — see CI_TREE. The shell
       only has to exist so the CSS and the ids are stable. */
    '        <div class="chat-intake" id="chatIntake" style="display:none;">' +
    '          <div class="chat-intake-card" id="ciCard">' +
    '            <div class="chat-intake-head">' +
    '              <div class="chat-intake-title" id="ciTitle">What is happening?</div>' +
    '              <button type="button" class="chat-intake-skip" id="chatIntakeSkip">Skip — just let me type</button>' +
    '            </div>' +
    '            <button type="button" class="ci-back" id="ciBack" style="display:none;">‹ Back</button>' +
    '            <div class="ci-step" id="ciStep"></div>' +
    '            <div class="ci-send" id="ciSend" style="display:none;">' +
    '              <div class="ci-chosen" id="ciChosen"></div>' +
    '              <label class="chat-intake-lbl" for="ciNote">Anything you want to add</label>' +
    '              <input class="chat-intake-inp" id="ciNote" maxlength="200" placeholder="">' +
    '              <div class="ci-note-hint">One line is plenty. You can leave this blank.</div>' +
    '              <div class="ci-shot" id="ciShot">' +
    '                <div class="chat-intake-lbl" id="ciShotHead">A picture of your screen</div>' +
    '                <div class="ci-warn">The picture will show whatever is on your screen right now — that can include families’ names, emails and phone numbers. Only Daniel sees it. Close anything private first if you would rather not send it.</div>' +
    '                <div class="ci-howto" id="ciHowTo"></div>' +
    '                <div class="ci-shotbox" id="ciShotBox" tabindex="0">' +
    '                  <img class="ci-shot-thumb" id="ciShotThumb" alt="Picture you are about to send" style="display:none;">' +
    '                  <div class="ci-shot-empty" id="ciShotEmpty">Nothing here yet.</div>' +
    '                  <div class="ci-shot-size" id="ciShotSize"></div>' +
    '                </div>' +
    '                <div class="ci-shot-actions">' +
    '                  <button type="button" class="ci-file-btn" id="ciPickBtn">Choose a picture</button>' +
    '                  <button type="button" class="ci-file-btn" id="ciShotClear" style="display:none;">Remove this picture</button>' +
    '                </div>' +
    '                <input type="file" accept="image/*" id="ciFile" class="ci-file-input" tabindex="-1" aria-hidden="true">' +
    '                <div class="ci-skipnote">You can send this without a picture.</div>' +
    '              </div>' +
    '              <div class="ci-noshot" id="ciNoShot" style="display:none;">Please do not send a picture of this one. Photographing someone else’s information spreads it further. Send this on its own and Daniel will look straight away.</div>' +
    '              <label class="ci-check"><input type="checkbox" id="ciBlocked"><span>I cannot carry on until this is fixed</span></label>' +
    '              <label class="ci-check"><input type="checkbox" id="ciCall"><span>I would rather talk this through</span></label>' +
    '              <div class="chat-intake-foot">' +
    '                <button type="button" class="chat-intake-send" id="chatIntakeSend">Send this to Daniel</button>' +
    '              </div>' +
    '            </div>' +
    '          </div>' +
    '        </div>' +
    '        </div>' +
    '        <div class="chat-drop-hint" id="chatDropHint" aria-hidden="true">' +
    '          <div class="chat-drop-hint-inner">' +
    '            <div class="chat-drop-hint-icon">\u2b06\ufe0e</div>' +
    '            <div class="chat-drop-hint-title">Drop the screenshot here</div>' +
    '            <div class="chat-drop-hint-sub">PNG or JPG \u00b7 up to 10MB \u00b7 you can also just paste it</div>' +
    '          </div>' +
    '        </div>' +
    '        <div class="chat-modal-messages" id="chatModalMessages">' +
    '          <div class="chat-empty-state" id="chatEmptyState">' +
    '            <div style="font-size:2.5rem;margin-bottom:8px;">💬</div>' +
    '            <div style="font-weight:800;font-size:1.1rem;color:var(--text-dark);margin-bottom:4px;">Select a team member to start chatting</div>' +
    '            <div style="font-weight:600;font-size:.88rem;color:var(--text-soft);">Choose someone from the roster on the left</div>' +
    '          </div>' +
    '        </div>' +
    '' +
    '        <div class="chat-modal-footer">' +
    '          <div class="chat-modal-audit">' +
    '            <div class="chat-modal-audit-icon">🔒</div>' +
    '            <div class="chat-modal-audit-text">All messages are logged with timestamps for audit compliance.</div>' +
    '          </div>' +
    '          <div class="chat-client-link">' +
    '            <button type="button" id="chatNewRequest" class="chat-new-request" style="display:none;"' +
    '                    title="Start a new help request">+ New request</button>' +
    '            <label for="chatClientSelect">📎 Link to client:</label>' +
    '            <select id="chatClientSelect">' +
    '              <option value="">None (general chat)</option>' +
    '            </select>' +
    '          </div>' +
    '          <div class="chat-img-preview" id="chatImgPreview" style="display:none;">' +
    '            <img id="chatImgPreviewThumb" alt="Screenshot to send">' +
    '            <div class="chat-img-preview-meta">' +
    '              <div class="chat-img-preview-name">Screenshot</div>' +
    '              <div class="chat-img-preview-size" id="chatImgPreviewSize"></div>' +
    '            </div>' +
    '            <button type="button" class="chat-img-preview-x" id="chatImgPreviewX"' +
    '                    aria-label="Remove screenshot">&times;</button>' +
    '          </div>' +
    '          <div class="chat-modal-input-area">' +
    '            <!-- name + autocomplete are here to stop iOS guessing. With no name and' +
    '                 no autocomplete, Safari treats a lone text input as a possible username' +
    '                 field and offers the passwords key in its AutoFill bar. Safari only' +
    '                 sometimes honours autocomplete="off", so this reduces the prompt rather' +
    '                 than guaranteeing it is gone — the bar itself is iPadOS system UI.' +
    '                 enterkeyhint="send" is the real win: Return becomes Send on a tablet. -->' +
    '            <input class="chat-modal-input" id="chatModalInput" placeholder="Type your message…" maxlength="500"' +
    '                   name="message" autocomplete="off" autocorrect="on" spellcheck="true" enterkeyhint="send" />' +
    '            <span class="chat-char-count" id="chatCharCount">0 / 500</span>' +
    '            <button class="chat-modal-send" id="chatModalSend" type="button">Send</button>' +
    '          </div>' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '' +
    '  <!-- Screenshot lightbox (Task 9) -->' +
    '  <div class="chat-lightbox" id="chatLightbox">' +
    '    <div class="chat-lightbox-bar">' +
    '      <a id="chatLightboxOpen" href="#" target="_blank" rel="noopener">Open original</a>' +
    '      <button type="button" id="chatLightboxClose">Close</button>' +
    '    </div>' +
    '    <img id="chatLightboxImg" alt="Screenshot">' +
    '  </div>';

  var FAB_MARKUP = '' +
    '  <div class="chat-launch">' +
    '    <div style="position:relative;">' +
    '      <button class="chat-fab" id="chatOpen" type="button" title="Open internal chat">💬</button>' +
    '      <div class="chat-badge" id="chatBadge" style="display:none;"></div>' +
    '    </div>' +
    '  </div>';

  // ── host capability accessors — fall back to our own reads ──
  function hostContacts() {
    if (_host.getContacts) {
      var list = _host.getContacts();
      if (list && list.length) return Promise.resolve(list);
    }
    return db().collection('contacts').orderBy('displayName').get().then(function (snap) {
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

  // ── private formatter fallbacks — prefer the host's copy when present ──
  function _escHTML(s) {
    if (typeof window.escHTML === 'function') return window.escHTML(s);
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }
  function _rsEscape(str) {
    if (typeof window.rsEscape === 'function') return window.rsEscape(str);
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }
  function _getInitials(name) {
    if (typeof window.getInitials === 'function') return window.getInitials(name);
    if (!name) return '??';
    var parts = name.trim().split(/\s+/);
    return ((parts[0] || '')[0] || '') + ((parts[1] || '')[0] || '');
  }
  function _formatTime(ts) {
    if (typeof window.formatTime === 'function') return window.formatTime(ts);
    if (!ts) return '';
    var d = ts.toDate ? ts.toDate() : new Date(ts);
    var now = new Date();
    var diffMs = now - d;
    var diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) {
      var hh = d.getHours() % 12 || 12;
      var mm = String(d.getMinutes()).padStart(2, '0');
      var ampm = d.getHours() >= 12 ? 'PM' : 'AM';
      return hh + ':' + mm + ' ' + ampm;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }
  function _formatRole(role) {
    if (typeof window.formatRole === 'function') return window.formatRole(role);
    if (!role) return '';
    return role.replace(/([A-Z])/g, ' $1').replace(/^./, function(s){ return s.toUpperCase(); }).trim();
  }
  function _linkifyURLs(escapedText) {
    if (typeof window.linkifyURLs === 'function') return window.linkifyURLs(escapedText);
    escapedText = escapedText.replace(/anydesk:(\d+)/g, '<a href="anydesk:$1" style="color:#004E7C;text-decoration:underline;font-weight:800;">Click here to connect via AnyDesk</a>');
    escapedText = escapedText.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:var(--ocean-deep);text-decoration:underline;font-weight:700;">$1</a>');
    return escapedText;
  }

  // ── private chime fallback — index.html's sounds block (not moved) defines
  //    window._playChatChime; use it when present, else synthesize our own ──
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

  // ══════════════════════════════════════════════════════
  // Real-Time Chat System (Firestore-backed)
  // ══════════════════════════════════════════════════════
    // Lazy-init db — Firebase config loads in a later script block
    var _db = null;
    function db() {
      if (!_db) _db = firebase.firestore();
      return _db;
    }
    // DOM refs — looked up by bindElements() once mount() has injected the markup
    var chatModalOverlay, chatModalClose, chatModalSend, chatModalInput, chatModalMessages,
        chatBadge, chatOpen, chatHeaderAvatar, chatHeaderName, chatHeaderStatus,
        chatOnlineList, chatOfflineList, chatShowMoreBtn, chatConversationsList, chatRecentToggle,
        chatClientSelect, chatCharCount, chatSearchInput, chatEmptyState,
        chatSidebarToggle, chatSidebar, chatZoomBtn;

    // ── State ──
    var _chatActiveConvId = null;
    var _chatActiveOtherUid = null;
    // Monotonic "which conversation-open is current" counter. Bumped at the top of
    // openConversation(); every one of its async resolutions compares against it and
    // discards itself if a newer open has started. See openConversation().
    var _chatConvOpenSeq = 0;
    var _chatMessagesUnsub = null;
    var _chatRosterUnsub = null;
    var _chatHeaderPresenceUnsub = null;
    var _chatConvsUnsub = null;
    var _chatShowAllOffline = false;
    var _chatModalOpen = false;
    var _chatUnreadCount = -1; // -1 = first load (don't chime for existing unreads)
    var _chatUnreadByUser = {}; // uid -> unread count for roster badges
    var _chatConvsList = []; // cached conversations for auto-open
    var _chatLocalTimeInterval = null; // interval for updating header local time
    var _chatOldestMessageTs = null; // oldest createdAt currently loaded (listener + paginated)
    var _chatLoadedOlderMessages = []; // messages fetched via pagination (older than the live listener window)
    var _chatHasMoreOlder = true; // flips false when a paginated fetch returns < 50
    var _chatPaginating = false; // guard against double-click while a fetch is in flight
    var _lastRosterOnline = []; // cached roster (online) for _refreshRoster() re-renders
    var _lastRosterOffline = []; // cached roster (offline) for _refreshRoster() re-renders

    // ── Favorites (localStorage, zero Firestore cost) ──
    var _chatFavorites = new Set(JSON.parse(localStorage.getItem('chatFavorites') || '[]'));

    function toggleFavorite(uid) {
      if (_chatFavorites.has(uid)) {
        _chatFavorites.delete(uid);
      } else {
        _chatFavorites.add(uid);
      }
      localStorage.setItem('chatFavorites', JSON.stringify(Array.from(_chatFavorites)));
      // Re-render roster
      if (typeof window.initChatRoster === 'function') window.initChatRoster();
    }

    // ── Helpers ──
    function getMyUid() {
      return window.currentUserData ? window.currentUserData.uid : null;
    }
    function getMyName() {
      return window.currentUserData ? window.currentUserData.displayName : 'Unknown';
    }
    // getInitials/formatTime now live at module scope as _getInitials/_formatTime
    // (private fallbacks that prefer the host's copy when present).

    // ── Header Local Time ──
    function updateChatHeaderLocalTime() {
      var el = document.getElementById('chatHeaderLocalTime');
      if (!el || !_chatActiveOtherUid) { if (el) el.style.display = 'none'; return; }
      if (!window.getUserLocalTimeStr) { el.style.display = 'none'; return; }
      var uid = _chatActiveOtherUid;
      // Get time and date from the user's timezone
      var lt = window.getUserLocalTimeStr(uid);
      if (!lt) { el.style.display = 'none'; return; }
      // Get their local date
      var loc = window._userLocations ? window._userLocations[uid] : null;
      var tz = loc && loc.label && window.getTimezoneForLocation ? window.getTimezoneForLocation(loc.label) : null;
      var dateStr = '';
      if (tz) {
        try {
          dateStr = new Date().toLocaleDateString('en-US', { timeZone: tz, month: 'short', day: 'numeric' });
        } catch(e) {}
      }
      var name = (chatHeaderName ? chatHeaderName.textContent : '').split(' ')[0] || 'Their';
      el.textContent = name + "'s Local Time: " + lt + (dateStr ? ', ' + dateStr : '');
      el.style.display = 'block';
    }

    function startChatLocalTimeTicker() {
      if (_chatLocalTimeInterval) clearInterval(_chatLocalTimeInterval);
      updateChatHeaderLocalTime();
      _chatLocalTimeInterval = setInterval(updateChatHeaderLocalTime, 30000);
    }

    // ── Open / Close Modal ──
    function openChatModal() {
      if (!chatModalOverlay) return;
      chatModalOverlay.classList.add('active');
      _chatModalOpen = true;
      // Populate client dropdown from contacts cache
      populateChatClientSelect();
      // On mobile, ensure sidebar is visible so user can pick a conversation
      if (window.innerWidth <= 768) {
        var _sb = document.querySelector('.chat-modal-sidebar');
        var _sbt = document.getElementById('chatSidebarToggle');
        if (_sb) _sb.classList.remove('hidden');
        if (_sbt) { _sbt.textContent = '✕'; _sbt.title = 'Hide roster'; }
      }
      setTimeout(function(){ if(chatModalInput) chatModalInput.focus(); }, 50);
    }
    function closeChatModal() {
      if (chatModalOverlay) chatModalOverlay.classList.remove('active');
      _chatModalOpen = false;
      // A pending screenshot is tied to the conversation you paste it into — it must not
      // survive to be posted somewhere else after the modal is reopened. The client link
      // is tied to the conversation the same way.
      clearPendingImage();
      resetClientLink();
      // Stop listening to messages and header presence
      if (_chatMessagesUnsub) { _chatMessagesUnsub(); _chatMessagesUnsub = null; }
      if (_chatHeaderPresenceUnsub) { _chatHeaderPresenceUnsub(); _chatHeaderPresenceUnsub = null; }
      _chatActiveConvId = null;
      _chatActiveOtherUid = null;
      // Invalidate any openConversation() lookup still in flight. Without this, a lookup
      // started just before the modal was closed resolves afterwards, re-sets
      // _chatActiveConvId and re-subscribes a messages listener for a closed modal.
      _chatConvOpenSeq++;
      updateChatBadge();
    }

    // ── Is the chat surface actually in front of the person right now? ──
    // Modal mode: the overlay IS the surface, so _chatModalOpen answers it.
    // Window mode: the pop-out is the whole document, and openChatModal() never
    // runs there — which is why _chatModalOpen was permanently false and the
    // pop-out never marked anything read and chimed at the thread you were reading.
    // A pop-out can be minimised, on another desktop, or buried behind the
    // dashboard, so it must ASK the browser rather than assume it is being looked
    // at. Both conditions are required: page visible AND window focused. Visibility
    // alone would mark messages read while the window sits behind another one —
    // telling a colleague their message was seen when nobody saw it. Read receipts
    // are a claim about a human, so they fail closed.
    function chatIsVisible() {
      if (_mode !== 'window') return _chatModalOpen;
      if (typeof document.visibilityState === 'string' &&
          document.visibilityState !== 'visible') return false;
      return (typeof document.hasFocus === 'function') ? document.hasFocus() : true;
    }

    // Marks whatever conversation is on screen as read, if the surface is really
    // visible. Called from the messages listener AND on focus/visibility changes:
    // in window mode a message routinely lands while the pop-out is behind
    // something else, and no snapshot fires again when the person brings it
    // forward, so without these the unread state would never clear.
    function markActiveConversationRead() {
      var myUid = getMyUid();
      var convId = _chatActiveConvId;   // read synchronously, never across an await
      if (!myUid || !convId || !chatIsVisible()) return;
      db().collection('chatConversations').doc(convId).update({
        lastReadBy: firebase.firestore.FieldValue.arrayUnion(myUid)
      }).catch(function () {});
    }

    // ── Pop-out window: opens chat.html in its own resizable window and
    // remembers the monitor/size it was left on. saveGeom() is polled from
    // here (the opener) once a second while the popup is open — a popup
    // cannot reliably write its own geometry as it closes. ──
    var _popWin = null;
    var _popPoll = null;

    // Roomy-screen default. Anything at 1920x1080 or larger comes out of readGeom()
    // at exactly these numbers; the clamp below only bites on smaller screens.
    var CHAT_WIN_DEFAULT_W = 1180;
    var CHAT_WIN_DEFAULT_H = 820;
    var CHAT_WIN_DEFAULT_X = 120;
    var CHAT_WIN_DEFAULT_Y = 80;
    // Never collapse to something unusable: below this the roster and the composer
    // have nowhere to go.
    var CHAT_WIN_MIN_W = 320;
    var CHAT_WIN_MIN_H = 380;
    // Breathing room so the window frame is never flush against the screen edge.
    var CHAT_WIN_MARGIN = 40;

    function _num(v, fallback) {
      return (typeof v === 'number' && isFinite(v)) ? v : fallback;
    }

    // Fit a geometry inside the screen that is actually in front of the person.
    // Most LDAH staff are on Dell laptops around 1366x768, where the old fixed
    // 1180x820 default was TALLER THAN THE SCREEN and then pushed down another 80px —
    // putting the message input and the Send button off the bottom edge and making
    // the window unusable. Stored geometry had the same fault in reverse: a size set
    // on a 27" desk monitor was replayed verbatim onto the laptop.
    //
    // Note availWidth/availHeight describe the CURRENT screen, not the whole
    // multi-monitor desktop. A position remembered on a second monitor that is no
    // longer attached therefore gets pulled back onto this one. That is the right
    // trade: a visible window beats a perfectly restored invisible one.
    function clampGeom(g) {
      var sw = _num(window.screen && window.screen.availWidth, 1024);
      var sh = _num(window.screen && window.screen.availHeight, 768);

      var maxW = Math.max(CHAT_WIN_MIN_W, sw - CHAT_WIN_MARGIN);
      var maxH = Math.max(CHAT_WIN_MIN_H, sh - CHAT_WIN_MARGIN);

      var w = Math.max(CHAT_WIN_MIN_W, Math.min(_num(g.w, CHAT_WIN_DEFAULT_W), maxW));
      var h = Math.max(CHAT_WIN_MIN_H, Math.min(_num(g.h, CHAT_WIN_DEFAULT_H), maxH));

      // Position is clamped LAST, against the already-clamped size, so that x + w and
      // y + h both still land on-screen. The bottom edge matters most — that is where
      // the composer and Send button live.
      var x = Math.max(0, Math.min(_num(g.x, CHAT_WIN_DEFAULT_X), sw - w));
      var y = Math.max(0, Math.min(_num(g.y, CHAT_WIN_DEFAULT_Y), sh - h));

      return { w: w, h: h, x: x, y: y };
    }

    // Both the stored geometry and the default go through clampGeom() — neither is
    // trustworthy on its own.
    function readGeom() {
      var g = null;
      try {
        var stored = JSON.parse(localStorage.getItem('ldahChatWindow') || 'null');
        // Sanity gate on what was stored, kept from before: anything smaller than this
        // is a garbage write rather than a window someone deliberately made small.
        if (stored && stored.w > 300 && stored.h > 300) g = stored;
      } catch (e) {}
      if (!g) {
        g = { w: CHAT_WIN_DEFAULT_W, h: CHAT_WIN_DEFAULT_H,
              x: CHAT_WIN_DEFAULT_X, y: CHAT_WIN_DEFAULT_Y };
      }
      return clampGeom(g);
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

    // Returns true when the window ends up open — freshly opened, or already open
    // and now focused — and false when the browser blocked it. Pass silent=true when
    // the caller has its own fallback and does not want the "allow pop-ups" toast.
    function openPopOut(silent) {
      if (_popWin && !_popWin.closed) { _popWin.focus(); return true; }
      var g = readGeom();
      _popWin = window.open('chat.html', 'ldahChat',
        'width=' + g.w + ',height=' + g.h + ',left=' + g.x + ',top=' + g.y +
        ',resizable=yes,scrollbars=yes');
      if (!_popWin) {
        if (!silent) hostToast('Allow pop-ups for this site to use the chat window.', '#D97706');
        return false;
      }
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
      return true;
    }

    function setPoppedOutState(on) {
      if (!chatOpen) return;
      chatOpen.classList.toggle('popped-out', on);
      chatOpen.title = on ? 'Chat is open in its own window — click to focus it'
                          : 'Open internal chat';
    }

    // Opens the in-app modal and, when anything is unread, jumps straight to the
    // first unread conversation. This is the fallback path for the FAB now that the
    // button goes to the pop-out window; the Pop Out button in the modal header is
    // the way back out to a window from here.
    function openChatModalToUnread() {
      openChatModal();
      // If there are unread messages, jump straight to the first unread conversation
      if (_chatUnreadCount > 0 && _chatConvsList.length > 0) {
        var myUid = getMyUid();
        var firstUnread = _chatConvsList.find(function(c) {
          return c.lastReadBy && !c.lastReadBy.includes(myUid) && c.lastSenderId !== myUid;
        });
        if (firstUnread) {
          var otherUid = (firstUnread.participants || []).find(function(p) { return p !== myUid; });
          var otherName = (firstUnread.participantNames && firstUnread.participantNames[otherUid]) || 'Unknown';
          openConversation(otherUid, otherName);
        }
      }
    }

    // Below this width a separate window is meaningless — a phone or an iPad gets
    // the modal instead. Same value as @media(max-width:768px) in chat.css, which
    // is what reflows the modal to full-screen; keep the two in step.
    var CHAT_MOBILE_BREAKPOINT = 768;

    var _lastFabEvent = null;

    // FAB click. The chat button opens the pop-out window DIRECTLY — one click, no
    // modal in between. The modal is still reachable, but only as a fallback for the
    // two cases where a separate window cannot serve: a small screen, and pop-ups
    // being blocked. Neither may leave the button doing nothing.
    function handleFabClick(e) {
      if (e && e.stopPropagation) e.stopPropagation();
      // The FAB is wired twice on purpose (addEventListener AND .onclick), so a single
      // click runs this handler twice with the same Event object. That was harmless
      // while it only re-opened the modal; now it would attempt the window twice and
      // double the toast below. Same event, second pass: drop it.
      if (e) { if (e === _lastFabEvent) return; _lastFabEvent = e; }
      // 1. Already popped out — focus that window, never open a second one.
      if (_popWin && !_popWin.closed) { _popWin.focus(); return; }
      // 2. Small screen — the modal is the only sensible surface.
      if (window.innerWidth <= CHAT_MOBILE_BREAKPOINT) { openChatModalToUnread(); return; }
      // 3. The normal path: straight to the window.
      if (openPopOut(true)) return;
      // 4. window.open returned null — pop-ups are blocked. Open the modal rather
      //    than leaving a dead button, and say why chat landed in the page.
      openChatModalToUnread();
      hostToast('Pop-ups are blocked, so chat opened here in the page.', '#D97706');
    }
    // FAB / close / overlay / keydown / sidebar-toggle / zoom-btn / char-counter
    // listeners are wired from wireEvents(), called by mount() once bindElements()
    // has resolved the DOM refs above.

    // On mobile, hide sidebar when a conversation is opened
    var _origOpenConversation = typeof openConversation === 'function' ? openConversation : null;
    function _wrapConvOpen() {
      if (chatSidebar && window.innerWidth <= 768) {
        chatSidebar.classList.add('hidden');
        if (chatSidebarToggle) { chatSidebarToggle.textContent = '☰'; chatSidebarToggle.title = 'Show roster'; }
      }
    }

    // ── Populate Client Dropdown ──
    /* ── "Is this about a family?" nudge ─────────────────────────────────────
       Staff work remotely and chat is properly full of chit-chat; that is fine
       and it is not going anywhere. But when a message DOES name a family, the
       client link almost never gets set — 3 messages out of 804 — so the
       auto-log to that family's interactions never fires.

       So: suggest, never assume. Nothing is linked or recorded automatically.
       A toast offers the link, the person decides, and a decline is remembered
       for that conversation so it does not ask twice. Banter stays banter. */
    var _chatNudgeDismissed = {};   // convId|contactId -> true, for this session

    function _chatFindClientMention(text) {
      if (!text || !_chatContacts || !_chatContacts.length) return null;
      var hay = ' ' + String(text).toLowerCase().replace(/[^a-z0-9\s']/g, ' ') + ' ';
      var best = null;
      for (var i = 0; i < _chatContacts.length; i++) {
        var c = _chatContacts[i];
        var nm = String(c.displayName || '').trim();
        if (!nm) continue;
        // Colleagues are contacts too. Someone saying "ask Leilani" is not a
        // client note, so anyone on an LDAH address is skipped.
        if (/@ldahawaii\.org/i.test(String(c.email || ''))) continue;
        var low = nm.toLowerCase();
        var parts = low.split(/\s+/).filter(Boolean);
        var hit = false;
        // Couples are stored as one contact ("Erica & Kenji Au"), but staff write
        // "Erica Au" — so first-plus-last also counts, which is distinctive even
        // when the surname is short. A short surname ALONE never is: "Au" and
        // "Lee" match far too much ordinary prose.
        var toks = parts.filter(function(w) { return w !== '&' && w !== 'and'; });
        var first = toks[0], last = toks[toks.length - 1];
        if (parts.length >= 2 && hay.indexOf(' ' + low + ' ') !== -1) hit = true;
        else if (first && last && first !== last &&
                 hay.indexOf(' ' + first + ' ') !== -1 && hay.indexOf(' ' + last + ' ') !== -1) hit = true;
        else if (last && last.length >= 6 && hay.indexOf(' ' + last + ' ') !== -1) hit = true;
        if (hit && (!best || nm.length > best.displayName.length)) best = c;
      }
      return best;
    }

    // convId is the conversation this send was actually for (passed in from writeMessage(),
    // which received it as an explicit parameter) — NOT read from _chatActiveConvId here,
    // because the user can switch conversations while this nudge sits on screen waiting for
    // a click. The nudge must act on the conversation it was raised for.
    function _chatMaybeSuggestClient(text, sentClientId, convId) {
      try {
        if (sentClientId) return;                       // already linked, nothing to ask
        var match = _chatFindClientMention(text);
        if (!match) return;
        var key = convId + '|' + match.id;
        if (_chatNudgeDismissed[key]) return;
        _chatShowClientNudge(match, key, convId);
      } catch (e) { console.warn('chat client nudge:', e && e.message); }
    }

    function _chatShowClientNudge(contact, key, convId) {
      var old = document.getElementById('chatClientNudge');
      if (old) old.remove();
      var box = document.createElement('div');
      box.id = 'chatClientNudge';
      box.style.cssText = 'position:fixed;bottom:96px;left:24px;z-index:4200;max-width:330px;' +
        'background:#fff;border:1px solid #C4B5FD;border-left:4px solid #7C3AED;border-radius:12px;' +
        'box-shadow:0 8px 28px rgba(15,23,42,.18);padding:14px 16px;font-size:.86rem;color:#0f172a;';
      box.innerHTML =
        '<div style="font-weight:700;margin-bottom:4px;color:#5B21B6;">Is this about ' + _rsEscape(contact.displayName) + '?</div>' +
        '<div style="color:#475569;line-height:1.45;margin-bottom:10px;">Link this chat to them and it will be saved to their record. ' +
          'Leave it if you are just talking.</div>' +
        '<div style="display:flex;gap:8px;">' +
          '<button type="button" class="btn btn-primary" style="font-size:.8rem;padding:5px 12px;background:#7C3AED;border-color:#6D28D9;" ' +
            'id="chatNudgeYes">Link to ' + _rsEscape(String(contact.displayName).split(/\s+/)[0]) + '</button>' +
          '<button type="button" class="btn btn-ghost" style="font-size:.8rem;padding:5px 10px;" id="chatNudgeNo">No thanks</button>' +
        '</div>';
      document.body.appendChild(box);

      var close = function() { if (box && box.parentNode) box.remove(); };
      box.querySelector('#chatNudgeNo').onclick = function() { _chatNudgeDismissed[key] = true; close(); };
      box.querySelector('#chatNudgeYes').onclick = function() {
        _chatNudgeDismissed[key] = true;
        try {
          // Always update the conversation this nudge was raised for (convId) — that is the
          // correct target even if a different conversation is on screen now. But
          // chatClientSelect is the dropdown for whatever conversation is CURRENTLY
          // displayed, so only sync it when that still happens to be the same conversation;
          // otherwise setting it would silently point the on-screen conversation's future
          // messages at a client that was actually mentioned in a different thread.
          if (chatClientSelect && convId === _chatActiveConvId) chatClientSelect.value = contact.id;
          db().collection('chatConversations').doc(convId)
            .update({ clientId: contact.id, clientName: contact.displayName });
          hostToast('Linked to ' + contact.displayName + '. Messages here now save to their record.', '#16A34A');
        } catch (e) { console.warn('chat link failed:', e && e.message); }
        close();
      };
      // Never sit there forever — it is a suggestion, not a task.
      setTimeout(close, 20000);
    }

    var _chatContacts = []; // local cache for chat dropdown
    function populateChatClientSelect() {
      if (!chatClientSelect) return;
      // If we already have contacts cached, render them
      if (_chatContacts.length) {
        renderChatClientOptions();
        return;
      }
      // hostContacts() tries the host's live list first (e.g. index.html's
      // _allContacts cache), falling back to a direct Firestore read.
      hostContacts().then(function(list) {
        _chatContacts = list || [];
        renderChatClientOptions();
      }).catch(function(err) {
        console.warn('Could not load contacts for chat dropdown:', err.message);
      });
    }
    // The client link is a property of the conversation it was chosen in — but the
    // <select> is a single shared control, and nothing used to reset it. Two helpers
    // make that explicit: capture the choice at SEND time (never at write time, which
    // is after a Storage upload has been awaited), and clear it whenever the
    // conversation changes.
    function currentClientLink() {
      var id = chatClientSelect ? chatClientSelect.value : '';
      var name = '';
      if (id && chatClientSelect) {
        var opt = chatClientSelect.options[chatClientSelect.selectedIndex];
        name = opt ? opt.textContent : '';
      }
      return { id: id || '', name: name || '' };
    }
    // Leaving a conversation with a client still selected silently tagged the NEXT
    // conversation's messages — and the Interactions records auto-logged from them —
    // with the previous family. Called from exactly the paths that clear a pending
    // screenshot, for exactly the same reason.
    function resetClientLink() {
      if (chatClientSelect) chatClientSelect.value = '';
    }

    function renderChatClientOptions() {
      if (!chatClientSelect) return;
      var current = chatClientSelect.value;
      chatClientSelect.innerHTML = '<option value="">None (general chat)</option>';
      _chatContacts.forEach(function(c) {
        var opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.displayName;
        chatClientSelect.appendChild(opt);
      });
      chatClientSelect.value = current || '';
    }

    // ── Roster: Online / Offline Users ──
    var _chatArchivedUids = new Set();
    window.initChatRoster = function() {
      var myUid = getMyUid();
      if (!myUid) return;

      // Load archived UIDs first, then start presence listener
      db().collection('userRoles').where('isArchived', '==', true).get().then(function(archivedSnap) {
        _chatArchivedUids = new Set();
        archivedSnap.forEach(function(doc) { _chatArchivedUids.add(doc.id); });
      }).catch(function() { /* proceed without filter */ });

      if (_chatRosterUnsub) _chatRosterUnsub();
      _chatRosterUnsub = db().collection('chatPresence').onSnapshot(function(snap) {
        var online = [];
        var offline = [];
        var staleThreshold = Date.now() - (15 * 60 * 1000); // 15 min staleness check
        snap.forEach(function(doc) {
          var d = doc.data();
          if (d.uid === myUid) return; // exclude self
          if (_chatArchivedUids.has(d.uid || doc.id)) return; // exclude archived
          // Hidden people are not rendered at all — not online, not offline.
          // An entry in either list is still their name on someone's screen.
          if (_presenceHidden(d.uid || doc.id, d)) return;
          // Treat as offline if lastSeen is stale (> 15 min) even if online flag is true
          var lastSeenMs = d.lastSeen ? d.lastSeen.toMillis() : 0;
          var isStale = lastSeenMs < staleThreshold;
          /* alwaysOnline exempts an account from the staleness check (2026-09-01).
             IT_Help is answered by a Cloud Function, so it genuinely is available
             around the clock — there is no browser to send a heartbeat, and it
             showed as offline for something that never sleeps. A flag rather
             than a cron: no writes, nothing to keep running. */
          if (d.alwaysOnline === true || (d.online && !isStale)) {
            online.push(d);
          } else {
            offline.push(d);
          }
        });
        online.sort(function(a, b) { return (a.displayName || '').localeCompare(b.displayName || ''); });
        offline.sort(function(a, b) { return (a.displayName || '').localeCompare(b.displayName || ''); });
        _lastRosterOnline = online;
        _lastRosterOffline = offline;
        renderRoster(online, offline);
      }, function(err) {
        console.warn('Chat roster listener error (Firestore rules may need updating for chatPresence):', err.message);
        if (chatOnlineList) chatOnlineList.innerHTML = '<div style="padding:6px 10px;font-size:.82rem;color:var(--text-soft);font-weight:600;">Roster unavailable</div>';
      });
    };

    window._refreshRoster = function() {
      if (_lastRosterOnline.length > 0 || _lastRosterOffline.length > 0) {
        renderRoster(_lastRosterOnline, _lastRosterOffline);
      }
    };

    function renderRoster(online, offline) {
      var searchVal = (chatSearchInput ? chatSearchInput.value.trim().toLowerCase() : '');

      // Helper: sort favorites to top
      function favSort(a, b) {
        var aFav = _chatFavorites.has(a.uid) ? 0 : 1;
        var bFav = _chatFavorites.has(b.uid) ? 0 : 1;
        if (aFav !== bFav) return aFav - bFav;
        return (a.displayName || '').localeCompare(b.displayName || '');
      }

      // Helper: build roster item HTML with star
      function rosterItemHtml(u, dotClass, rightText) {
        var activeClass = u.uid === _chatActiveOtherUid ? ' active-conv' : '';
        var isFav = _chatFavorites.has(u.uid);
        var starCls = 'roster-star' + (isFav ? ' fav' : '');
        // Weather snippet
        var weatherHtml = '';
        var w = hostWeather(u.uid);
        if (w) {
          weatherHtml = '<span class="roster-weather">' + w.icon + ' ' + w.temp + '°</span>';
        }
        // Unread badge for this user
        var unreadBadge = '';
        var uc = _chatUnreadByUser[u.uid] || 0;
        if (uc > 0) {
          unreadBadge = '<span class="roster-unread-badge">' + uc + '</span>';
        }
        return '<div class="chat-roster-item' + activeClass + '" data-uid="' + u.uid + '" data-name="' + (u.displayName || '').replace(/"/g, '&quot;') + '">'
          + '<div class="roster-dot ' + dotClass + '"></div>'
          + '<span class="roster-name">' + _escHTML(u.displayName || 'Unknown') + '</span>'
          + weatherHtml
          + unreadBadge
          + '<span class="roster-role">' + rightText + '</span>'
          + '<button class="' + starCls + '" data-fav-uid="' + u.uid + '" title="' + (isFav ? 'Remove from favorites' : 'Add to favorites') + '">' + (isFav ? '★' : '☆') + '</button>'
          + '</div>';
      }

      // Online list
      if (chatOnlineList) {
        var filteredOnline = online;
        if (searchVal) {
          filteredOnline = online.filter(function(u) { return u.displayName.toLowerCase().indexOf(searchVal) !== -1; });
        }
        filteredOnline.sort(favSort);

        if (filteredOnline.length === 0) {
          chatOnlineList.innerHTML = '<div style="padding:6px 10px;font-size:.82rem;color:var(--text-soft);font-weight:600;">' + (online.length === 0 ? 'No team members online' : 'No matches') + '</div>';
        } else {
          var html = '';
          var hasFavHeader = false;
          var hasRegHeader = false;
          filteredOnline.forEach(function(u) {
            var isFav = _chatFavorites.has(u.uid);
            if (isFav && !hasFavHeader) {
              html += '<div class="chat-fav-header">★ Favorites</div>';
              hasFavHeader = true;
            }
            if (!isFav && hasFavHeader && !hasRegHeader) {
              html += '<div class="chat-roster-divider"></div>';
              hasRegHeader = true;
            }
            html += rosterItemHtml(u, 'online', _escHTML(_formatRole(u.role)));
          });
          chatOnlineList.innerHTML = html;
        }
      }

      // Offline list
      if (chatOfflineList) {
        var visibleOffline = offline;
        if (searchVal) {
          visibleOffline = offline.filter(function(u) { return u.displayName.toLowerCase().indexOf(searchVal) !== -1; });
        }
        visibleOffline.sort(favSort);
        var showCount = _chatShowAllOffline ? visibleOffline.length : Math.min(5, visibleOffline.length);
        var html = '';
        var hasFavHeader = false;
        var hasRegHeader = false;
        for (var i = 0; i < showCount; i++) {
          var u = visibleOffline[i];
          var isFav = _chatFavorites.has(u.uid);
          if (isFav && !hasFavHeader) {
            html += '<div class="chat-fav-header">★ Favorites</div>';
            hasFavHeader = true;
          }
          if (!isFav && hasFavHeader && !hasRegHeader) {
            html += '<div class="chat-roster-divider"></div>';
            hasRegHeader = true;
          }
          var lastSeenStr = u.lastSeen ? _formatTime(u.lastSeen) : '';
          html += rosterItemHtml(u, 'offline', lastSeenStr ? lastSeenStr : _escHTML(_formatRole(u.role)));
        }
        chatOfflineList.innerHTML = html || '<div style="padding:6px 10px;font-size:.82rem;color:var(--text-soft);font-weight:600;">No offline users</div>';

        // Show more button
        if (chatShowMoreBtn) {
          if (visibleOffline.length > 5 && !_chatShowAllOffline) {
            chatShowMoreBtn.style.display = 'block';
            chatShowMoreBtn.textContent = '▼ Show ' + (visibleOffline.length - 5) + ' more';
          } else {
            chatShowMoreBtn.style.display = 'none';
          }
        }
      }

      // Attach click handlers
      document.querySelectorAll('.chat-roster-item[data-uid]').forEach(function(el) {
        el.addEventListener('click', function() {
          var uid = el.getAttribute('data-uid');
          var name = el.getAttribute('data-name');
          openConversation(uid, name);
        });
      });

      // Attach star/favorite click handlers (stop propagation so it doesn't open chat)
      document.querySelectorAll('.roster-star[data-fav-uid]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          toggleFavorite(btn.getAttribute('data-fav-uid'));
        });
      });
    }

    // formatRole/escHTML/linkifyURLs now live at module scope as
    // _formatRole/_escHTML/_linkifyURLs (private fallbacks that prefer the
    // host's copy when present).

    // Show-more-offline toggle and search-filter click/input listeners are
    // now wired from wireEvents(), called by mount().

    // ── Tab title: persistent unread prefix (Gmail-style, fires regardless of tab focus) ──
    (function() {
      // Each host owns its own base title: the dashboard's, and the pop-out's
      // "Name — LDAH Chat", which chat.html only sets once auth resolves — AFTER
      // this file has loaded. Capturing document.title once at load time therefore
      // froze the pop-out on its pre-auth title and then stamped the dashboard's
      // "— LDAH-Int" suffix over it. Instead: remember the last title WE wrote, and
      // treat any title that is not that as the host's current base. A host is then
      // free to rename its own window at any time and the unread prefix follows.
      var lastSignalled = null;
      var baseTitle = document.title;
      window._ldahChatTitleSignal = function(unread) {
        if (document.title !== lastSignalled) baseTitle = document.title;
        var next = unread > 0 ? '(' + unread + ') ' + baseTitle : baseTitle;
        document.title = next;
        lastSignalled = next;
      };
    })();

    // ── Conversations List ──
    window.initChatConversations = function() {
      var myUid = getMyUid();
      if (!myUid) return;

      if (_chatConvsUnsub) _chatConvsUnsub();
      _chatConvsUnsub = db().collection('chatConversations')
        .where('participants', 'array-contains', myUid)
        .orderBy('lastMessageAt', 'desc')
        .limit(20)
        .onSnapshot(function(snap) {
          var convs = [];
          var unread = 0;
          var unreadByUser = {};
          snap.forEach(function(doc) {
            var d = doc.data();
            d._id = doc.id;
            convs.push(d);
            // Check unread: lastMessage not read by me
            var isUnreadCheck = d.lastReadBy && !d.lastReadBy.includes(myUid) && d.lastSenderId !== myUid;
            if (isUnreadCheck) {
              unread++;
              // Track which user sent the unread message
              var otherUid = (d.participants || []).find(function(p) { return p !== myUid; });
              if (otherUid) {
                unreadByUser[otherUid] = (unreadByUser[otherUid] || 0) + 1;
              }
            }
          });
          renderConversations(convs);
          _chatConvsList = convs;
          // Chime logic — like Lync:
          // - Only after first load (skip initial snapshot)
          // - Only for incoming messages (not my own sends)
          // - Not when I'm actively viewing the conversation that got the message
          if (_chatUnreadCount >= 0 && snap.docChanges) {
            var shouldChime = false;
            snap.docChanges().forEach(function(change) {
              if (change.type !== 'modified') return;
              var d = change.doc.data();
              // Skip if I sent this message
              if (d.lastSenderId === myUid) return;
              // Skip if I'm viewing this exact conversation right now
              if (chatIsVisible() && _chatActiveConvId === change.doc.id) return;
              // This is an incoming message in a conversation I'm not looking at
              if (d.lastReadBy && !d.lastReadBy.includes(myUid)) {
                shouldChime = true;
              }
            });
            if (shouldChime && ownsChimeNow()) playNotifSound();
          }
          _chatUnreadCount = unread;
          _chatUnreadByUser = unreadByUser;
          updateChatBadge();
          if (ownsChimeNow() && typeof window._ldahChatTitleSignal === 'function') window._ldahChatTitleSignal(unread);
          // Refresh roster to show/hide unread badges
          if (typeof window._refreshRoster === 'function') window._refreshRoster();
        }, function(err) {
          console.warn('Chat conversations listener error (Firestore rules may need updating for chatConversations):', err.message);
        });
    };

    function renderConversations(convs) {
      if (!chatConversationsList) return;
      var myUid = getMyUid();
      if (convs.length === 0) {
        chatConversationsList.innerHTML = '<div style="padding:8px 10px;font-size:.82rem;color:var(--text-soft);font-weight:600;">No conversations yet</div>';
        return;
      }
      var html = '';
      convs.forEach(function(c) {
        var otherUid = c.participants.find(function(p) { return p !== myUid; }) || '';
        var otherName = (c.participantNames && c.participantNames[otherUid]) || 'Unknown';
        var activeClass = c._id === _chatActiveConvId ? ' active' : '';
        var isUnread = c.lastReadBy && !c.lastReadBy.includes(myUid) && c.lastSenderId !== myUid;
        html += '<div class="conversation-item' + activeClass + '" data-convid="' + c._id + '" data-otheruid="' + otherUid + '" data-othername="' + otherName.replace(/"/g, '&quot;') + '">'
          + (isUnread ? '<div class="conv-unread"></div>' : '')
          + '<div class="name">' + _escHTML(otherName) + '</div>'
          + '<div class="preview">' + _escHTML(c.lastMessage || '') + '</div>'
          + '<div class="time">' + _formatTime(c.lastMessageAt) + '</div>'
          + '</div>';
      });
      chatConversationsList.innerHTML = html;

      // Attach click handlers
      chatConversationsList.querySelectorAll('.conversation-item[data-convid]').forEach(function(el) {
        el.addEventListener('click', function() {
          var convId = el.getAttribute('data-convid');
          var otherUid = el.getAttribute('data-otheruid');
          var otherName = el.getAttribute('data-othername');
          // Leaving whatever conversation was active — a pending screenshot and a
          // client link both belong to that one, not this one.
          clearPendingImage();
          resetClientLink();
          // This sets the active conversation directly rather than going through
          // openConversation(), so invalidate any openConversation() lookup still in
          // flight — otherwise it resolves a moment later and overwrites this choice.
          _chatConvOpenSeq++;
          _chatActiveConvId = convId;
          _chatActiveOtherUid = otherUid;
          _chatLoadedOlderMessages = [];
          _chatOldestMessageTs = null;
          _chatHasMoreOlder = true;
          _lastListenerMessages = [];
          loadConversationMessages(convId, otherName, otherUid);
        });
      });
    }

    function updateChatBadge() {
      if (!chatBadge) return;
      if (_chatUnreadCount > 0 && !chatIsVisible()) {
        chatBadge.textContent = _chatUnreadCount;
        chatBadge.style.display = 'block';
        if (chatOpen) chatOpen.classList.add('has-unread');
      } else {
        chatBadge.style.display = 'none';
        if (chatOpen) chatOpen.classList.remove('has-unread');
      }
    }

    // ── Open / Create Conversation ──
    function openConversation(otherUid, otherName) {
      var myUid = getMyUid();
      if (!myUid || !otherUid) return;

      // Leaving whatever conversation was active — a pending screenshot and a
      // client link both belong to that one, not this one.
      clearPendingImage();
      resetClientLink();
      _ciHide();                                       // and neither does a half-filled intake

      // Captured at the START of this operation. Two clicks in quick succession start two
      // lookups; they can resolve out of order, and the LAST one the user clicked is the
      // one they are looking at. Each resolution checks this before touching any state, and
      // DISCARDS itself if a newer open has begun. (Discard, not complete: everything the
      // resolution does — set the active conversation, reset the pagination cache, swap the
      // message listener — paints into the current view.)
      var openSeq = ++_chatConvOpenSeq;

      // There is NO active conversation until the lookup below resolves. Leaving the
      // PREVIOUS conversation's id sitting in _chatActiveConvId across that await is the
      // same stale-global defect as the screenshot leak, and it is reachable with plain
      // typing: the header already shows the new person, but sendChatMessage() and the Zoom
      // screen-share button both read _chatActiveConvId, so pressing Send in that window
      // posted the message into the PREVIOUS conversation — a different family's thread.
      // Nulling it makes every consumer fail safe (Send no-ops and leaves the text in the
      // box, Zoom says "select a conversation first") until the real id is known.
      _chatActiveConvId = null;

      _chatActiveOtherUid = otherUid;

      // On mobile, auto-hide sidebar when opening a conversation
      if (window.innerWidth <= 768) {
        var _sb = document.querySelector('.chat-modal-sidebar');
        var _sbt = document.getElementById('chatSidebarToggle');
        if (_sb) _sb.classList.add('hidden');
        if (_sbt) { _sbt.textContent = '☰'; _sbt.title = 'Show roster'; }
      }

      // Update header
      if (chatHeaderAvatar) chatHeaderAvatar.textContent = _getInitials(otherName);
      if (chatHeaderName) chatHeaderName.textContent = otherName;
      if (chatHeaderStatus) chatHeaderStatus.textContent = 'Loading…';
      if (chatEmptyState) chatEmptyState.style.display = 'none';
      startChatLocalTimeTicker();

      // Look for existing conversation
      var participants = [myUid, otherUid].sort();
      db().collection('chatConversations')
        .where('participants', '==', participants)
        .limit(1)
        .get()
        .then(function(snap) {
          // A newer openConversation() started while this lookup was in flight — the user
          // has already moved on. DISCARD this resolution rather than letting it overwrite
          // the conversation they actually ended up on.
          if (openSeq !== _chatConvOpenSeq) return;
          if (!snap.empty) {
            var convDoc = snap.docs[0];
            _chatActiveConvId = convDoc.id;
            // A paste that landed in the gap between clearPendingImage() above and this
            // resolving was stamped with whatever conversation was active before the user
            // clicked — stale, not wrong-in-the-leak sense (nothing has been sent yet), but
            // it would falsely trip the pi.convId mismatch guard in sendWithImage() and
            // reject a legitimate "open conversation, paste, send" sequence. Re-stamp it to
            // the conversation the user is now actually looking at.
            if (_pendingImage) _pendingImage.convId = _chatActiveConvId;
            _chatLoadedOlderMessages = [];
            _chatOldestMessageTs = null;
            _chatHasMoreOlder = true;
            _lastListenerMessages = [];
            loadConversationMessages(convDoc.id, otherName, otherUid);
            _ciMaybeShow(convDoc.id, otherUid);       // IT_Help intake, empty threads only
          } else {
            // Create new conversation
            var convData = {
              participants: participants,
              participantNames: {},
              lastMessage: '',
              lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
              lastSenderId: '',
              lastReadBy: [myUid],
              clientId: null,
              clientName: null,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            convData.participantNames[myUid] = getMyName();
            convData.participantNames[otherUid] = otherName;
            return db().collection('chatConversations').add(convData).then(function(docRef) {
              // Same superseded-open discard as the branch above — this add() is a second
              // await, so the user has had even longer to click somewhere else.
              if (openSeq !== _chatConvOpenSeq) return;
              _chatActiveConvId = docRef.id;
              // Same re-stamp as the existing-conversation branch above.
              if (_pendingImage) _pendingImage.convId = _chatActiveConvId;
              _chatLoadedOlderMessages = [];
              _chatOldestMessageTs = null;
              _chatHasMoreOlder = true;
              _lastListenerMessages = [];
              loadConversationMessages(docRef.id, otherName, otherUid);
              _ciMaybeShow(docRef.id, otherUid);      // brand-new thread — definitionally empty
            });
          }
        })
        .catch(function(err) {
          // The lookup/create failed. _chatActiveConvId is null, which is the safe state
          // (nothing can be sent into the wrong thread), but the header would otherwise sit
          // on "Loading…" forever with no explanation.
          if (openSeq !== _chatConvOpenSeq) return;
          console.warn('Chat open conversation failed:', err && err.message);
          if (chatHeaderStatus) chatHeaderStatus.textContent = 'Could not open';
        });
    }

    // ── Load Messages for a Conversation ──
    function loadConversationMessages(convId, otherName, otherUid) {
      var myUid = getMyUid();
      // Update header
      if (chatHeaderAvatar) chatHeaderAvatar.textContent = _getInitials(otherName);
      if (chatHeaderName) chatHeaderName.textContent = otherName;
      startChatLocalTimeTicker();

      // Check presence for status (real-time listener so it updates live)
      if (_chatHeaderPresenceUnsub) _chatHeaderPresenceUnsub();
      _chatHeaderPresenceUnsub = db().collection('chatPresence').doc(otherUid).onSnapshot(function(doc) {
        if (!doc.exists) { if (chatHeaderStatus) chatHeaderStatus.textContent = 'Offline'; return; }
        var d = doc.data();
        /* Hidden reads as a plain "Offline" with no time attached. A
           "Last seen 9:42am" is the very fact being withheld — it would
           report activity to the minute for someone who has switched
           themselves off. Deliberately before the alwaysOnline branch. */
        if (_presenceHidden(otherUid, d)) {
          if (chatHeaderStatus) chatHeaderStatus.textContent = 'Offline';
          return;
        }
        var lastSeenMs = d.lastSeen ? d.lastSeen.toMillis() : 0;
        var isStale = lastSeenMs < (Date.now() - 15 * 60 * 1000);
        /* Same alwaysOnline exemption as the roster — otherwise the roster would
           show IT_Help online while the header of that very thread said
           "Last seen 21 Aug". */
        if (d.alwaysOnline === true) {
          if (chatHeaderStatus) chatHeaderStatus.textContent = '🟢 Always available';
        } else if (d.online && !isStale) {
          if (chatHeaderStatus) chatHeaderStatus.textContent = '🟢 Online';
        } else {
          var ls = d.lastSeen ? _formatTime(d.lastSeen) : '';
          if (chatHeaderStatus) chatHeaderStatus.textContent = ls ? 'Last seen ' + ls : 'Offline';
        }
      });

      // Unsubscribe previous listener
      if (_chatMessagesUnsub) _chatMessagesUnsub();

      // Subscribe to messages
      _chatMessagesUnsub = db().collection('chatConversations').doc(convId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(100)
        .onSnapshot(function(snap) {
          var messages = [];
          snap.forEach(function(doc) {
            var d = doc.data();
            d._id = doc.id;
            messages.push(d);
          });
          messages.reverse();
          _lastListenerMessages = messages; // cache for pagination re-renders
          renderMessages(messages);

          // Mark as read only when the chat surface is genuinely in front of the
          // person AND this is the conversation on screen. chatIsVisible() answers
          // that for both hosts; see its comment.
          if (chatIsVisible() && _chatActiveConvId === convId) {
            db().collection('chatConversations').doc(convId).update({
              lastReadBy: firebase.firestore.FieldValue.arrayUnion(myUid)
            }).catch(function(){});
          }

          // Chime handled by conversations-level listener (not per-message)
        }, function(err) {
          console.warn('Chat messages listener error:', err && err.message);
        });

      // Highlight active conversation in sidebar
      document.querySelectorAll('.conversation-item').forEach(function(el) {
        el.classList.toggle('active', el.getAttribute('data-convid') === convId);
      });
      document.querySelectorAll('.chat-roster-item').forEach(function(el) {
        el.classList.toggle('active-conv', el.getAttribute('data-uid') === otherUid);
      });
    }

    // ── Render Messages ──
    // listenerMessages = the latest-100 window from the real-time listener (oldest-first after reverse).
    // We merge paginated older messages on top, dedupe by doc id, and sort asc by createdAt for display.
    function renderMessages(listenerMessages) {
      if (!chatModalMessages) return;
      var myUid = getMyUid();

      // Merge paginated older messages + listener window, dedupe by doc id
      var byId = new Map();
      (_chatLoadedOlderMessages || []).forEach(function(m) { if (m && m._id) byId.set(m._id, m); });
      (listenerMessages || []).forEach(function(m) { if (m && m._id) byId.set(m._id, m); });
      var messages = Array.from(byId.values());
      // Sort ascending by createdAt (oldest → newest). Missing timestamps sort to end.
      messages.sort(function(a, b) {
        var ta = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
        var tb = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
        return ta - tb;
      });

      // Track oldest currently-shown timestamp for pagination cursor
      _chatOldestMessageTs = messages.length > 0 ? messages[0].createdAt : null;

      if (messages.length === 0) {
        chatModalMessages.innerHTML = '<div class="chat-empty-state"><div style="font-size:2rem;margin-bottom:6px;">👋</div><div style="font-weight:700;color:var(--text-soft);">Start the conversation!</div></div>';
        return;
      }

      // "Load older messages" button — shown when the listener is at-or-over its 100 cap OR we've paginated already.
      // Rationale: if listener returned <100, there definitely aren't older ones. Once we've loaded any older
      // page, we leave the button unless _chatHasMoreOlder flipped false.
      var showLoadOlder = _chatHasMoreOlder && ((listenerMessages && listenerMessages.length >= 100) || (_chatLoadedOlderMessages && _chatLoadedOlderMessages.length > 0));
      var html = '';
      if (showLoadOlder) {
        html += '<div style="text-align:center;padding:8px 0 12px 0;">'
          + '<button id="chatLoadOlderBtn" type="button" style="background:rgba(100,116,139,.12);color:var(--text-soft);border:1px solid rgba(100,116,139,.2);border-radius:8px;padding:6px 14px;font-size:.8rem;font-weight:700;cursor:pointer;">Load older messages</button>'
          + '</div>';
      }

      messages.forEach(function(m) {
        var isMe = m.senderId === myUid;
        var cls = isMe ? 'chat-message me' : 'chat-message them';
        var nameDisplay = isMe ? 'You' : _escHTML(m.senderName || 'Unknown');
        var timeStr = m.createdAt ? _formatTime(m.createdAt) : '';
        var clientTag = m.clientId && m.clientName ? '<span style="font-size:.72rem;background:rgba(8,145,178,.12);color:var(--ocean-deep);padding:2px 6px;border-radius:6px;font-weight:700;margin-left:8px;">📎 ' + _escHTML(m.clientName) + '</span>' : '';

        var textHtml = _linkifyURLs(_escHTML(m.text || ''));

        // ── Screenshot rendering (Task 9) ──
        // Expiry is decided by message age (90 days), not by a failed image fetch —
        // that avoids a broken-image flash for messages we already know are gone.
        // The onerror handler wired below (event delegation) is only a backstop for
        // edge cases (deleted object, network blip) inside the 90-day window.
        var imgHtml = '';
        if (m.hasImage) {
          var ageMs = m.createdAt && m.createdAt.toMillis
            ? (Date.now() - m.createdAt.toMillis()) : 0;
          if (ageMs > 90 * 24 * 60 * 60 * 1000) {
            imgHtml = '<div class="chat-msg-img-gone">[screenshot expired]</div>';
          } else {
            var rawW = Number(m.imageW), rawH = Number(m.imageH);
            var hasDims = rawW > 0 && rawH > 0;
            var tw = Math.min(320, hasDims ? rawW : 320);
            var th = hasDims ? Math.round(tw * (rawH / rawW)) : Math.round(tw * 0.6);
            imgHtml = '<img class="chat-msg-img" loading="lazy"' +
              ' src="' + _escHTML(m.imageUrl || '') + '"' +
              ' width="' + tw + '" height="' + th + '"' +
              ' alt="Screenshot">';
          }
        }

        // If this is a screen share request message (sent by other person, not me),
        // add the "Share My Screen" button
        // The button's data-convid comes ONLY from the message that carries the
        // request. It used to fall back to _chatActiveConvId, which is the
        // conversation on screen at RENDER time — not necessarily the one this
        // message belongs to. A stale id there would open a screen-share signalling
        // channel under the wrong conversation. No id on the message means the
        // message is malformed, so no button: fail closed.
        var shareBtn = '';
        var shareConvId = m.screenShareConvId || '';
        var isShareReq = !isMe && m.screenShareSession && m.text &&
          ((m.text.indexOf('📺') === 0 && m.text.indexOf('Share My Screen') > -1) ||
           m.text.indexOf('would like to see your screen') > -1);
        if (isShareReq && shareConvId) {
          shareBtn = '<br><button class="chat-share-btn" data-convid="' + _escHTML(shareConvId) + '" data-sessionid="' + _escHTML(m.screenShareSession) + '">📺 Share My Screen</button>';
        }

        /* Mark an automatic answer. Nobody should think they are talking to a
           person when they are not — the reply is posted under the IT_Help
           name, so without this badge it is indistinguishable. (2026-09-01) */
        var autoTag = (m.isAutoReply === true)
          ? '<span class="chat-auto-tag" title="Written automatically by the IT Help assistant, not by a person">Answered automatically</span>'
          : '';

        html += '<div class="' + cls + '">'
          + '<div class="chat-message-header">'
          + '<div class="chat-message-name">' + nameDisplay + clientTag + autoTag + '</div>'
          + '<div class="chat-message-time">' + timeStr + '</div>'
          + '</div>'
          + '<div class="chat-message-text">' + imgHtml + textHtml + shareBtn + '</div>'
          + '</div>';
      });
      chatModalMessages.innerHTML = html;
      chatModalMessages.scrollTop = chatModalMessages.scrollHeight;

      // Wire up the "Load older messages" button if present
      var _olderBtn = document.getElementById('chatLoadOlderBtn');
      if (_olderBtn) {
        _olderBtn.addEventListener('click', loadOlderMessages);
      }
    }

    // ── Load Older Messages (pagination) ──
    // Fires when the user clicks "Load older messages". Purely read-only — does NOT touch the live listener.
    // Fetches the next 50 messages older than _chatOldestMessageTs, merges them into _chatLoadedOlderMessages,
    // re-renders, and preserves scroll position so the user doesn't lose their place.
    function loadOlderMessages() {
      if (_chatPaginating) return;
      if (!_chatActiveConvId) return;
      if (!_chatOldestMessageTs) return;
      if (!_chatHasMoreOlder) return;
      _chatPaginating = true;

      // Captured at the START of this operation and used for every decision below —
      // never re-read from the global after the .get() await.
      var convId = _chatActiveConvId;

      // Capture scroll state before re-render so we can preserve the user's visual position
      var prevScrollHeight = chatModalMessages ? chatModalMessages.scrollHeight : 0;
      var prevScrollTop = chatModalMessages ? chatModalMessages.scrollTop : 0;

      db().collection('chatConversations').doc(convId)
        .collection('messages')
        .where('createdAt', '<', _chatOldestMessageTs)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get()
        .then(function(snap) {
          // DISCARD, not complete. Everything below paints into the message pane and
          // mutates shared view state (_chatLoadedOlderMessages, _chatHasMoreOlder, the
          // scroll position) that the conversation switch has already reset for the NEW
          // conversation. Merging this page in would show one family's older messages
          // inside another family's visible thread. The page is read-only — nothing is
          // lost by dropping it; clicking "Load older" again in the original conversation
          // re-fetches it.
          if (convId !== _chatActiveConvId) return;
          var older = [];
          snap.forEach(function(doc) {
            var d = doc.data();
            d._id = doc.id;
            older.push(d);
          });
          // If fewer than 50 returned, no more older messages exist
          if (older.length < 50) _chatHasMoreOlder = false;

          if (older.length > 0) {
            // Reverse so we have oldest-first, then prepend to our cache
            older.reverse();
            // Dedupe against what we already have
            var existingIds = new Set((_chatLoadedOlderMessages || []).map(function(m) { return m._id; }));
            older.forEach(function(m) {
              if (!existingIds.has(m._id)) _chatLoadedOlderMessages.push(m);
            });

            // Re-render using the CURRENT listener state. We reconstruct listener messages
            // by pulling them out of the DOM isn't reliable — instead we synthesize from
            // what's already in the combined set minus our paginated cache. Simplest: trigger
            // a re-render by calling renderMessages with an empty listener array, since
            // renderMessages merges _chatLoadedOlderMessages with the listener arg. But that
            // loses the listener window! Instead, keep a reference to the last listener batch.
            renderMessages(_lastListenerMessages || []);

            // Preserve scroll position: the new content was prepended, so scrollHeight grew.
            // Keep the user looking at the same relative message by adjusting scrollTop by delta.
            if (chatModalMessages) {
              var newScrollHeight = chatModalMessages.scrollHeight;
              chatModalMessages.scrollTop = prevScrollTop + (newScrollHeight - prevScrollHeight);
            }
          } else {
            // Nothing to prepend; re-render to drop the button if _chatHasMoreOlder flipped
            renderMessages(_lastListenerMessages || []);
          }
        })
        .catch(function(err) {
          console.warn('Load older messages failed:', err && err.message);
        })
        .finally(function() {
          _chatPaginating = false;
        });
    }

    // Holds the latest listener batch so loadOlderMessages can re-render without waiting for a listener tick
    var _lastListenerMessages = [];

    // ── Screenshot Paste (Task 8) ──
    // Clipboard paste only — no file picker, no drag-and-drop, no capture button.
    // That is an explicit product decision, not an oversight.
    var _pendingImage = null;   // { blob, w, h, previewUrl, convId }
    // Monotonic generation counter for the pending-image slot. Bumped on every paste and
    // by clearPendingImage() — which already runs on every path that leaves or changes the
    // active conversation (closeChatModal, the roster click handler, openConversation,
    // reinitChat), on the ✕ button, and after a successful send. handleImagePaste()
    // captures it BEFORE the decode await; setPendingImage() discards the decoded image if
    // it no longer matches. Without this there is nothing to clear during the decode, so a
    // paste in conversation A followed by a switch to B before the decode resolved got
    // stamped for B and would have been sent there.
    var _pendingImageGen = 0;
    /* The intake card paints its own copy of the pending screenshot (the footer
       preview strip is underneath the overlay). It must never show — or send —
       an image stamped for a different conversation, so the same convId check
       sendWithImage() makes is made here too rather than reading _pendingImage
       raw. */
    function _ciPending() {
      if (!_pendingImage || !_chatActiveConvId) return null;
      if (_pendingImage.convId !== _chatActiveConvId) return null;
      return _pendingImage;
    }
    var _sendingImage = false;  // in-flight guard — separate from setSendBusy()'s visual state,
                                 // because the Enter-key handler bypasses the disabled button.
    var MAX_RAW_BYTES = 10 * 1024 * 1024;
    var MAX_EDGE = 1600;
    var JPEG_QUALITY = 0.82;

    // Shared by paste and drop — the size guard, the generation stamp and the
    // downscale are identical either way, and having two copies is how they drift.
    function acceptImageFile(file, how) {
      if (!file) return;
      // The "it is showing me someone else's information" leaf hides the picture
      // area, but paste and drag-drop are bound wider than that area is — without
      // this, a drop still armed a screenshot of the leak.
      if (_ciVisible() && _ciShotSuppressed()) {
        hostToast('Please do not send a picture of this one — just send the report.', '#B45309');
        return;
      }
      if (!/^image\//.test(file.type || '')) {
        hostToast('That is not an image \u2014 drop a PNG or JPG screenshot.', '#DC2626');
        return;
      }
      if (file.size > MAX_RAW_BYTES) {
        hostToast('That image is too large (max 10MB).', '#DC2626');
        return;
      }
      // Captured at the START — before the decode await — so the resolution below can tell
      // whether this image is still the one the user is waiting on.
      var gen = ++_pendingImageGen;
      downscaleImage(file).then(function (pi) { setPendingImage(pi, gen); }).catch(function (err) {
        console.warn('chat image ' + (how || 'paste') + ':', err && err.message);
        hostToast('Could not read that image.', '#DC2626');
      });
    }

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
      acceptImageFile(file, 'paste');
    }

    /* ── IT_Help intake — button tree (v2, 2026-09-04, Daniel) ────────────
       v1 asked "what were you trying to do" and "what happened instead" as
       free text. What came back was "it's broken" and "it didn't work", so
       the round trip it was meant to save happened anyway.

       v2 asks nothing that has to be typed. Ten buttons, then at most one
       more, then send. Every one of the ten first-press labels is the shape
       of a report that was genuinely received — they are worded the way the
       person said it, not the way a developer would file it.

       IT_Help ONLY. Daniel asked explicitly that threads with a person stay
       free text — someone messaging him may be asking about a family, and a
       report form is the wrong shape for that. */
    var CHAT_HELPDESK_UID = 'Lwz0SNVIRAcC68tVQdzE2BBCapt1';   // ". IT_Help"

    /* The tree. `key` is the stable contract value and must never change once
       shipped — it is what any report or triage rule will group on; `label` is
       what the person reads and may be reworded freely.

       `ph`   — placeholder for the one optional line on the send screen.
       `shot` — replaces the standard screenshot heading where a picture is
                the whole answer.
       `noShot` on a LEAF suppresses the picture area entirely. */
    var CI_TREE = [
      { key: 'no-response', label: 'Nothing happens when I click',
        ph: 'Which button, if you remember',
        detail: [
          /* The obvious second press here is a pointer-picker — "show me the
             button" — and that is deliberately out of scope. The one thing
             the tree must not do is trap someone who just wants to type. */
          { key: 'rather-type', label: 'I would rather just type it' }
        ] },
      { key: 'error-message', label: 'A message came up on the screen',
        ph: 'What the message said, if you remember',
        shot: 'A picture of that message is the fastest way to fix this.',
        detail: [] },
      { key: 'looks-wrong', label: 'Something looks wrong or is missing',
        ph: 'Which page you were on',
        detail: [
          { key: 'missing',      label: 'Something that should be here is missing' },
          { key: 'not-right',    label: 'Something here is not right' },
          { key: 'someone-else', label: 'It is showing me someone else’s information',
            noShot: true }
        ] },
      { key: 'will-not-save', label: 'It will not save',
        ph: 'What you were saving',
        detail: [
          { key: 'still-on-screen', label: 'My work is still on the screen' },
          { key: 'work-gone',       label: 'My work is gone' }
        ] },
      { key: 'unexpected', label: 'It did something different from what I expected',
        ph: 'What you expected it to do',
        detail: [] },
      { key: 'system-auto', label: 'Something the system does on its own went wrong',
        ph: 'Who it was for, and roughly when',
        detail: [
          { key: 'email-sent',   label: 'A message went out that should not have' },
          { key: 'not-arrived',  label: 'Something did not arrive' },
          { key: 'no-task',      label: 'A task or reminder did not appear' }
        ] },
      { key: 'slow', label: 'It is very slow, or it will not finish loading',
        ph: 'Which page is slow',
        detail: [
          { key: 'this-page',      label: 'Only this page is slow' },
          { key: 'whole-internet', label: 'Everything on the internet is slow right now' },
          { key: 'not-sure',       label: 'I am not sure' }
        ] },
      { key: 'signed-out', label: 'It signed me out, or it will not let me in',
        ph: 'What you were doing when it happened',
        detail: [
          { key: 'signed-out-working', label: 'It signed me out while I was working' },
          { key: 'password',           label: 'It will not accept my password' },
          { key: 'no-permission',      label: 'It says I do not have permission' }
        ] },
      { key: 'do-for-me', label: 'I need you to do something for me',
        ph: 'What you would like done',
        detail: [] },
      /* Separated by a rule in the UI: the nine above are "something is wrong",
         this one is not, and running them together made people pick the nearest
         wrong-sounding button rather than admitting they had a question. */
      { key: 'question', label: 'I am not sure how to do this — I have a question',
        ph: 'What you would like to know',
        rule: true, detail: [] }
    ];

    var _ci = null;        // { branch, detail, note, blocked, wantsCall } — live answer
    var _ciConvId = null;
    var _ciPasteBound = false;

    /* ── Severity is DERIVED, never asked ──────────────────────────────────
       Asking "how urgent is this?" measures how assertive someone is, not how
       broken the system is. The two people most likely to be blocked are the
       two least likely to say so. So it is read off the answers instead, and
       the "I cannot carry on" tickbox may only ever RAISE it — someone who
       ticks it on a slow page is still blocked; someone who leaves it unticked
       on a data leak is still an incident. */
    var CI_SEV_RANK = { watching: 0, slowing: 1, blocked: 2, incident: 3 };

    function _ciSeverity(branchKey, detailKey, blocked) {
      var sev = 'slowing';
      if (detailKey === 'someone-else') sev = 'incident';
      else if (detailKey === 'work-gone' || branchKey === 'signed-out') sev = 'blocked';
      else if (detailKey === 'whole-internet') sev = 'watching';
      if (blocked && CI_SEV_RANK['blocked'] > CI_SEV_RANK[sev]) sev = 'blocked';
      return sev;
    }

    /* ── Which keyboard is in front of them ────────────────────────────────
       Getting this wrong is worse than saying nothing: telling a Windows user
       to press Cmd is the moment they decide the help desk does not know what
       it is doing. iPadOS reports itself as MacIntel, so touch points are the
       only reliable separator. */
    function _ciPlatform() {
      var ua = navigator.userAgent || '';
      var plat = navigator.platform || '';
      var touch = navigator.maxTouchPoints || 0;
      if (/iPad|iPhone|iPod/.test(ua) || (plat === 'MacIntel' && touch > 1)) return 'ipad';
      if (/Mac/.test(plat) || /Mac OS X/.test(ua)) return 'mac';
      if (/Win/.test(plat) || /Windows/.test(ua)) return 'win';
      return 'other';
    }
    function _ciHowToText() {
      switch (_ciPlatform()) {
        case 'win':
          return 'Hold Windows + Shift + S, drag a box around what you can see, then click the grey box above and press Ctrl + V.';
        case 'mac':
          return 'Hold Cmd + Shift + 4, drag a box around what you can see, then click the grey box above and press Cmd + V.';
        case 'ipad':
          return 'Take a screenshot the usual way, then tap Choose a picture.';
        default:
          return 'Take a screenshot, then click the grey box above and paste it in — or use Choose a picture.';
      }
    }

    /* ── Styles ────────────────────────────────────────────────────────────
       Injected from here rather than added to chat.css so the tree ships as
       one file: chat.css is shared with two host pages that carry their own
       cache-bust, and a form that half-renders because one of them is stale
       is exactly the kind of thing this form exists to report.
       Reuses .chat-intake / .chat-intake-card / -head / -title / -skip / -lbl
       / -inp / -foot / -send, which chat.css already defines. */
    var CI_CSS = '' +
      '.ci-back{background:none;border:none;padding:6px 0;margin:0 0 4px;cursor:pointer;' +
      'font-family:inherit;font-size:.8rem;font-weight:700;color:var(--ocean-mid,#0891B2);min-height:44px}' +
      '.ci-step{display:flex;flex-direction:column;gap:7px}' +
      '.ci-opt{display:block;width:100%;text-align:left;box-sizing:border-box;' +
      'min-height:44px;padding:11px 13px;border:1px solid #cbd5e1;border-radius:9px;' +
      'background:#fff;color:#1d2b32;font-family:inherit;font-size:.87rem;font-weight:600;' +
      'line-height:1.3;cursor:pointer;white-space:normal;overflow-wrap:break-word}' +
      '.ci-opt:hover{border-color:var(--ocean-mid,#0891B2);background:#f2fbfd}' +
      '.ci-opt:focus-visible{outline:3px solid rgba(8,145,178,.35);outline-offset:1px}' +
      '.ci-rule{height:1px;background:var(--line,#dfe7ea);margin:6px 0 1px}' +
      '.ci-chosen{font-size:.82rem;font-weight:700;color:var(--ocean-deep,#075985);' +
      'background:#f2fbfd;border:1px solid #d6eef4;border-radius:8px;padding:8px 10px;' +
      'margin-bottom:4px;line-height:1.35;overflow-wrap:break-word}' +
      '.ci-note-hint{font-size:.72rem;color:var(--text-soft,#64748b);margin:4px 0 2px}' +
      '.ci-shot{margin-top:12px}' +
      '.ci-warn{font-size:.74rem;line-height:1.4;color:#7c2d12;background:#fffbeb;' +
      'border:1px solid #fde68a;border-radius:8px;padding:8px 10px;margin:0 0 8px}' +
      '.ci-howto{font-size:.75rem;line-height:1.4;color:var(--text-soft,#64748b);margin:8px 0 0}' +
      '.ci-shotbox{border:1.5px dashed #cbd5e1;border-radius:9px;background:#f8fafc;' +
      'min-height:74px;display:flex;flex-direction:column;align-items:center;' +
      'justify-content:center;gap:4px;padding:10px;text-align:center}' +
      '.ci-shotbox:focus-visible{outline:3px solid rgba(8,145,178,.35);outline-offset:1px}' +
      '.ci-shot-empty{font-size:.76rem;color:var(--text-soft,#64748b)}' +
      '.ci-shot-size{font-size:.7rem;color:var(--text-soft,#64748b)}' +
      '.ci-shot-thumb{max-width:100%;max-height:150px;border-radius:6px;display:block}' +
      '.ci-shot-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}' +
      '.ci-file-btn{min-height:44px;padding:8px 13px;border:1px solid #cbd5e1;border-radius:8px;' +
      'background:#fff;color:#3d545e;font-family:inherit;font-size:.79rem;font-weight:700;cursor:pointer}' +
      '.ci-file-btn:hover{border-color:var(--ocean-mid,#0891B2)}' +
      '.ci-file-input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}' +
      '.ci-skipnote{font-size:.74rem;color:var(--text-soft,#64748b);margin-top:8px}' +
      '.ci-noshot{font-size:.79rem;line-height:1.45;color:#7c2d12;background:#fffbeb;' +
      'border:1px solid #fde68a;border-radius:8px;padding:9px 11px;margin-top:12px}' +
      '.ci-check{display:flex;align-items:center;gap:9px;min-height:44px;cursor:pointer;' +
      'font-size:.83rem;font-weight:600;color:#1d2b32;line-height:1.3}' +
      '.ci-check input{width:19px;height:19px;flex:none;accent-color:var(--ocean-mid,#0891B2)}' +
      /* Every target in the card clears 44px, and nothing in it may push the
         panel sideways — 1366x768 laptops, and a horizontal scrollbar under a
         form is how people conclude it is broken. */
      '.chat-intake .chat-intake-send{min-height:44px}' +
      '.chat-intake .chat-intake-skip{min-height:44px;display:inline-flex;align-items:center}' +
      '.chat-intake .chat-intake-inp{min-height:44px;box-sizing:border-box}' +
      '.chat-intake .chat-intake-card *{max-width:100%}' +
      /* The card must never grow past the panel OR past the physical screen —
         staff are on 1366x768 and a Send button below the fold reads as a
         form that does not work. --ci-maxh is set in _ciClamp(). */
      '.chat-intake-card{max-height:var(--ci-maxh,none);overflow-y:auto;overflow-x:hidden}' +
      /* The drop hint sits at z-index 40 and the intake at 45, so while the
         form is open a dragged screenshot had nothing to land on visually. */
      '.chat-intake.ci-open ~ .chat-drop-hint{z-index:60}';

    function _ciInjectCss() {
      if (document.getElementById('ldah-ci-css')) return;
      var st = document.createElement('style');
      st.id = 'ldah-ci-css';
      st.textContent = CI_CSS;
      (document.head || document.documentElement).appendChild(st);
    }

    function _ciClamp() {
      var h = window.innerHeight || 0;
      try {
        if (window.screen && screen.availHeight) h = Math.min(h || screen.availHeight, screen.availHeight);
      } catch (e) {}
      if (!h) return;
      var card = document.getElementById('ciCard');
      if (card) card.style.setProperty('--ci-maxh', Math.max(240, h - 92) + 'px');
    }

    /* ── Rendering ─────────────────────────────────────────────────────────
       Buttons are built, never concatenated into innerHTML — the labels are
       ours, but this file is public and served, and one future label carrying
       a family's name through innerHTML is a class of bug worth designing out
       rather than remembering to avoid. */
    function _ciBtn(label, onClick) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ci-opt';
      b.textContent = label;
      b.addEventListener('click', onClick);
      return b;
    }

    function _ciSetTitle(t) {
      var el = document.getElementById('ciTitle');
      if (el) el.textContent = t;
    }

    function _ciShowStep1() {
      _ci.branch = null; _ci.detail = null;
      var step = document.getElementById('ciStep');
      var send = document.getElementById('ciSend');
      var back = document.getElementById('ciBack');
      if (!step) return;
      step.style.display = '';
      if (send) send.style.display = 'none';
      if (back) back.style.display = 'none';
      _ciSetTitle('What is happening?');
      step.innerHTML = '';
      CI_TREE.forEach(function (br) {
        if (br.rule) {
          var hr = document.createElement('div');
          hr.className = 'ci-rule';
          step.appendChild(hr);
        }
        step.appendChild(_ciBtn(br.label, function () { _ciPickBranch(br); }));
      });
      _ciClamp();
    }

    function _ciPickBranch(br) {
      _ci.branch = br; _ci.detail = null;
      if (!br.detail || !br.detail.length) { _ciShowSend(); return; }
      var step = document.getElementById('ciStep');
      var back = document.getElementById('ciBack');
      if (!step) return;
      step.style.display = '';
      var send = document.getElementById('ciSend');
      if (send) send.style.display = 'none';
      if (back) { back.style.display = ''; back.textContent = '‹ Back'; }
      _ciSetTitle(br.label);
      step.innerHTML = '';
      br.detail.forEach(function (d) {
        step.appendChild(_ciBtn(d.label, function () { _ci.detail = d; _ciShowSend(); }));
      });
      _ciClamp();
      try { step.firstChild && step.firstChild.focus(); } catch (e) {}
    }

    function _ciShowSend() {
      var br = _ci.branch, d = _ci.detail;
      var step = document.getElementById('ciStep');
      var send = document.getElementById('ciSend');
      var back = document.getElementById('ciBack');
      if (step) { step.style.display = 'none'; step.innerHTML = ''; }
      if (send) send.style.display = '';
      if (back) { back.style.display = ''; back.textContent = '‹ Back'; }
      _ciSetTitle('Send this to Daniel');

      var chosen = document.getElementById('ciChosen');
      if (chosen) chosen.textContent = br.label + (d ? ' — ' + d.label : '');

      // Carried on _ci, not read fresh from the DOM, so that pressing Back to
      // check which button they chose does not throw away the line they typed.
      var note = document.getElementById('ciNote');
      if (note) { note.value = _ci.note || ''; note.placeholder = br.ph || ''; }

      /* The one leaf that must never ask for a picture. Photographing another
         family's details to report that you can see them puts a second copy
         of the leak into Storage and into a chat thread. */
      var noShot = !!(d && d.noShot);
      var shot = document.getElementById('ciShot');
      var noShotMsg = document.getElementById('ciNoShot');
      if (shot) shot.style.display = noShot ? 'none' : '';
      if (noShotMsg) noShotMsg.style.display = noShot ? '' : 'none';
      if (noShot) clearPendingImage();

      var head = document.getElementById('ciShotHead');
      if (head) head.textContent = br.shot || 'A picture of your screen';
      var howTo = document.getElementById('ciHowTo');
      if (howTo) howTo.textContent = _ciHowToText();

      var b1 = document.getElementById('ciBlocked'), b2 = document.getElementById('ciCall');
      if (b1) b1.checked = !!_ci.blocked;
      if (b2) b2.checked = !!_ci.wantsCall;

      _ciSyncShot();
      _ciClamp();
      if (note) setTimeout(function () { try { note.focus(); } catch (e) {} }, 60);
    }

    /* Keep whatever they have typed or ticked before moving off the send
       screen — see the note in _ciShowSend(). */
    function _ciStash() {
      if (!_ci) return;
      var note = document.getElementById('ciNote');
      _ci.note = note ? note.value : '';
      _ci.blocked = !!(document.getElementById('ciBlocked') || {}).checked;
      _ci.wantsCall = !!(document.getElementById('ciCall') || {}).checked;
    }

    function _ciBack() {
      var send = document.getElementById('ciSend');
      var onSend = send && send.style.display !== 'none';
      if (onSend) _ciStash();
      if (onSend && _ci.branch && _ci.branch.detail && _ci.branch.detail.length) {
        _ciPickBranch(_ci.branch);
      } else {
        _ciShowStep1();
      }
    }

    /* Mirrors the pending screenshot into the card. The footer preview strip
       still runs untouched — it is simply behind this overlay, which covers
       the whole main column, so without this the picture they just pasted
       vanished and they pasted it again. */
    function _ciSyncShot() {
      var thumb = document.getElementById('ciShotThumb');
      var empty = document.getElementById('ciShotEmpty');
      var size  = document.getElementById('ciShotSize');
      var clr   = document.getElementById('ciShotClear');
      if (!thumb) return;
      var pi = _ciPending();
      if (pi) {
        thumb.src = pi.previewUrl;
        thumb.style.display = '';
        if (empty) empty.style.display = 'none';
        if (size) size.textContent = pi.w + '×' + pi.h + ' · ' + Math.round(pi.blob.size / 1024) + ' KB';
        if (clr) clr.style.display = '';
      } else {
        thumb.removeAttribute('src');
        thumb.style.display = 'none';
        if (empty) empty.style.display = '';
        if (size) size.textContent = '';
        if (clr) clr.style.display = 'none';
      }
    }

    /* True when the send screen is showing a leaf that must not carry a picture. */
    function _ciShotSuppressed() {
      var shot = document.getElementById('ciShot');
      var send = document.getElementById('ciSend');
      if (!shot || !send || send.style.display === 'none') return false;
      return shot.style.display === 'none';
    }

    function _ciVisible() {
      var el = document.getElementById('chatIntake');
      return !!(el && el.style.display !== 'none');
    }

    /* Paste while the form is open: the two elements the paste handler is
       bound to (composer, message list) are both underneath this overlay and
       cannot take focus, so nothing would ever fire. Bound at document level
       only while the form is on screen, and removed on hide. */
    function _ciDocPaste(e) {
      if (!_ciVisible()) return;
      if (_ciShotSuppressed()) return;                       // the no-picture leaf
      handleImagePaste(e);
    }
    function _ciBindPaste(on) {
      if (on === _ciPasteBound) return;
      if (on) document.addEventListener('paste', _ciDocPaste);
      else document.removeEventListener('paste', _ciDocPaste);
      _ciPasteBound = on;
    }

    function _ciHide() {
      var el = document.getElementById('chatIntake');
      if (el) { el.style.display = 'none'; el.classList.remove('ci-open'); }
      _ciBindPaste(false);
      _ciConvId = null;
    }

    function _ciReset(convId) {
      _ciConvId = convId;
      _ci = { branch: null, detail: null, note: '', blocked: false, wantsCall: false };
      clearPendingImage();
      var el = document.getElementById('chatIntake');
      if (el) { el.style.display = 'flex'; el.classList.add('ci-open'); }
      _ciBindPaste(true);
      _ciShowStep1();
      var btn = document.getElementById('chatIntakeSend');
      if (btn) { btn.disabled = false; btn.textContent = 'Send this to Daniel'; }
    }

    /* Shown per HELP REQUEST, not per thread.
       It first checked only that the thread was empty — which meant it appeared
       once, ever, because nobody starts a fresh chat window with IT_Help; they
       reuse the same thread forever. The form would have been dead after the
       first question. (Caught by Daniel, 2026-09-01.)
       So: empty thread, or the last message is more than CHAT_INTAKE_IDLE_MS
       old, which is a new request rather than a continuation. Mid-exchange it
       stays out of the way, and _ciOpen() puts it back on demand. */
    var CHAT_INTAKE_IDLE_MS = 2 * 60 * 60 * 1000;   // 2 hours

    function _ciMaybeShow(convId, otherUid) {
      _ciHide();
      window._ciSetNewRequestVisible(otherUid);
      if (!convId || otherUid !== CHAT_HELPDESK_UID) return;
      db().collection('chatConversations').doc(convId)
        .collection('messages').orderBy('createdAt', 'desc').limit(1).get()
        .then(function (snap) {
          if (!snap.empty) {
            var last = snap.docs[0].data() || {};
            var lastMs = 0;
            try { lastMs = last.createdAt ? last.createdAt.toMillis() : 0; } catch (e) { lastMs = 0; }
            // A message with no server timestamp yet is one just sent — mid-exchange.
            if (!lastMs || (Date.now() - lastMs) < CHAT_INTAKE_IDLE_MS) return;
          }
          if (_chatActiveConvId !== convId) return;      // they clicked elsewhere meanwhile
          _ciReset(convId);
        })
        .catch(function (e) { console.warn('intake check:', e && e.message); });
    }

    /* Open the form on demand. The idle rule above covers the common case, but a
       second problem twenty minutes after the first is still a new request, and
       nobody should have to wait two hours to get the form back. */
    window._ciOpen = function () {
      var convId = _chatActiveConvId;
      if (!convId) return;
      _ciReset(convId);
    };

    /* The button only makes sense in an IT_Help thread — hidden everywhere else. */
    window._ciSetNewRequestVisible = function (otherUid) {
      var b = document.getElementById('chatNewRequest');
      if (b) b.style.display = (otherUid === CHAT_HELPDESK_UID) ? 'inline-block' : 'none';
    };

    /* ── Where they were when it broke ─────────────────────────────────────
       window.ldahIssueContext() is provided by the host page. It is called
       through try/catch and type-checked first: this form is the one thing
       that has to keep working on the day the rest of the dashboard does not,
       so a missing or throwing helper degrades to {} and nothing else.
       JSON round-tripped because Firestore rejects a document containing
       `undefined` anywhere in it, and this object is written by other code. */
    var CI_CONTEXT_MAX = 4000;
    function _ciContext() {
      try {
        if (typeof window.ldahIssueContext !== 'function') return {};
        var raw = window.ldahIssueContext();
        if (!raw || typeof raw !== 'object') return {};
        var json = JSON.stringify(raw);
        if (!json || json.length > CI_CONTEXT_MAX) return {};
        var clean = JSON.parse(json);
        return (clean && typeof clean === 'object' && !Array.isArray(clean)) ? clean : {};
      } catch (e) {
        console.warn('issue context unavailable:', e && e.message);
        return {};
      }
    }

    function _ciSubmit() {
      var convId = _ciConvId;                      // captured BEFORE the write, same reason as writeMessage
      if (!convId || !_ci || !_ci.branch) { _ciHide(); return; }

      var br = _ci.branch, d = _ci.detail;
      var note = ((document.getElementById('ciNote') || {}).value || '').trim();
      if (note.length > 200) note = note.substring(0, 200);
      var blocked   = !!(document.getElementById('ciBlocked') || {}).checked;
      var wantsCall = !!(document.getElementById('ciCall') || {}).checked;

      // Reads as a message, not as a form dump — this lands in a chat thread
      // that both of them scroll through later.
      var lines = [br.label];
      if (d) lines.push(d.label);
      if (note) lines.push(note);
      if (blocked)   lines.push('I cannot carry on until this is fixed.');
      if (wantsCall) lines.push('I would rather talk this through.');
      var text = lines.join('\n');
      if (text.length > 500) text = text.substring(0, 500);

      var extra = {
        helpRequest: {
          v: 2,
          branch: br.key,
          branchLabel: br.label,
          detail: d ? d.key : '',
          detailLabel: d ? d.label : '',
          note: note,
          blocked: blocked,
          wantsCall: wantsCall,
          severity: _ciSeverity(br.key, d ? d.key : '', blocked),
          context: _ciContext(),
          source: 'button-tree'
        }
      };

      var btn = document.getElementById('chatIntakeSend');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      function done(err) {
        if (btn) { btn.disabled = false; btn.textContent = 'Send this to Daniel'; }
        if (!err) _ciHide();
      }

      // A picture goes through the same upload path as any other screenshot —
      // one pipeline, so a fix to either only has to be made once.
      var pi = _ciPending();
      var noShot = !!(d && d.noShot);
      if (pi && !noShot) { sendWithImage(text, extra, done, { id: '', name: '' }); return; }

      writeMessage(text, extra, convId, null)
        .then(function () { done(null); })
        .catch(function (e) {
          hostToast('Could not send that: ' + (e && e.message), '#DC2626');
          done(e);
        });
    }

    /* ── Drag and drop (2026-09-01, Daniel) ────────────────────────────────
       Paste already worked; drop did not exist at all, so a dragged screenshot
       fell through to the browser default and opened in a new window — which
       looks exactly like a broken feature. Both routes now land in
       acceptImageFile().

       preventDefault() on dragover is what actually stops the navigation. Doing
       it only on drop is not enough: without a dragover handler the element is
       not a drop target, the drop never fires on it, and the browser navigates.
       That is the whole bug.

       Scoped to the chat panel. The Downloads page has its own drop zone and the
       rest of the app must keep its normal behaviour, so nothing is bound at
       document level. */
    var _dragDepth = 0;   // dragenter/dragleave fire per child element; a plain
                          // boolean flickers the hint as the pointer crosses a message.

    function _dragHasFile(e) {
      var dt = e.dataTransfer;
      if (!dt) return false;
      if (dt.types) {
        for (var i = 0; i < dt.types.length; i++) if (dt.types[i] === 'Files') return true;
      }
      return false;
    }
    function _showDropHint(on) {
      var el = document.getElementById('chatDropHint');
      if (el) el.classList.toggle('active', !!on);
    }
    function handleChatDragEnter(e) {
      if (!_dragHasFile(e)) return;            // text/link drags keep normal behaviour
      e.preventDefault();
      _dragDepth++;
      _showDropHint(true);
    }
    function handleChatDragOver(e) {
      if (!_dragHasFile(e)) return;
      e.preventDefault();                       // REQUIRED — without this, no drop event
      try { e.dataTransfer.dropEffect = 'copy'; } catch (_) {}
    }
    function handleChatDragLeave(e) {
      if (!_dragHasFile(e)) return;
      _dragDepth = Math.max(0, _dragDepth - 1);
      if (_dragDepth === 0) _showDropHint(false);
    }
    function handleChatDrop(e) {
      if (!_dragHasFile(e)) return;
      e.preventDefault();
      e.stopPropagation();
      _dragDepth = 0;
      _showDropHint(false);
      var dt = e.dataTransfer;
      var file = null;
      // .items is the reliable route in Chrome; .files is the fallback.
      if (dt.items && dt.items.length) {
        for (var i = 0; i < dt.items.length; i++) {
          if (dt.items[i].kind === 'file' && /^image\//.test(dt.items[i].type)) {
            file = dt.items[i].getAsFile(); break;
          }
        }
      }
      if (!file && dt.files && dt.files.length) {
        for (var j = 0; j < dt.files.length; j++) {
          if (/^image\//.test(dt.files[j].type || '')) { file = dt.files[j]; break; }
        }
      }
      if (!file) {
        hostToast('That is not an image \u2014 drop a PNG or JPG screenshot.', '#DC2626');
        return;
      }
      acceptImageFile(file, 'drop');
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

    function setPendingImage(pi, gen) {
      // DISCARD, not complete. This runs after the image-decode/canvas-resize await, and
      // the preview strip it paints belongs to the composer of whatever conversation is on
      // screen NOW. A generation bump means the user switched conversations, hit ✕, or
      // pasted something newer while this image was decoding — in the switch case,
      // stamping and showing it here would put one family's screenshot into another
      // family's composer, ready to send. Dropping a decoded blob costs nothing; the user
      // can paste again.
      if (gen !== _pendingImageGen) return;
      // Stamp the conversation the screenshot was pasted into. sendWithImage() re-checks
      // this against the active conversation before uploading, as a second line of defense
      // behind the clearPendingImage() calls on every leave-conversation path.
      pi.convId = _chatActiveConvId;
      _pendingImage = pi;
      var box = document.getElementById('chatImgPreview');
      document.getElementById('chatImgPreviewThumb').src = pi.previewUrl;
      document.getElementById('chatImgPreviewSize').textContent =
        pi.w + '×' + pi.h + ' · ' + Math.round(pi.blob.size / 1024) + ' KB';
      box.style.display = 'flex';
      _ciSyncShot();
      // Focus belongs to the intake card while it is open — pulling it to the
      // composer underneath the overlay loses the caret entirely.
      if (chatModalInput && !_ciVisible()) chatModalInput.focus();
    }

    function clearPendingImage() {
      _pendingImage = null;
      // Invalidate any paste whose decode is still in flight — see _pendingImageGen.
      _pendingImageGen++;
      var box = document.getElementById('chatImgPreview');
      if (box) box.style.display = 'none';
      _ciSyncShot();
    }

    // ── Send Message ──
    // writeMessage() is the single write path shared by the text-only send and the
    // screenshot send (sendWithImage). `extra` is merged into the message document;
    // when extra.hasImage is set the conversation preview + Interactions log text
    // switch to the screenshot wording instead of the raw message text.
    // convId is passed explicitly rather than read from _chatActiveConvId at write time.
    // sendWithImage() awaits a Storage upload before calling this, and the live global can
    // change mid-upload (user clicks another conversation while a screenshot is uploading) —
    // reading the global here would write the message into whatever conversation happens to
    // be active when the write fires, not the one the send was actually for. Callers pass the
    // convId they captured at send time so the target conversation is fixed for the whole call.
    function writeMessage(text, extra, convId, client) {
      extra = extra || {};
      var myUid = getMyUid();
      var myName = getMyName();
      if (!myUid) return Promise.reject(new Error('not signed in'));
      if (!convId) return Promise.reject(new Error('no target conversation'));

      // `client` is captured by the CALLER at send time and passed in, for exactly the
      // same reason convId is. sendWithImage() awaits a Storage upload before reaching
      // here, and during that upload the user can switch conversations (which now
      // resets the dropdown) or pick a different family. Reading chatClientSelect at
      // write time tagged the message AND the auto-logged Interaction with whichever
      // family happened to be selected when the write finally fired — the wrong
      // family's file.
      client = client || { id: '', name: '' };
      var clientId = client.id || '';
      var clientName = client.name || '';

      var msgData = {
        senderId: myUid,
        senderName: myName,
        text: text || '',
        clientId: clientId || null,
        clientName: clientName || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        readBy: [myUid]
      };
      var k;
      for (k in extra) { if (extra.hasOwnProperty(k)) msgData[k] = extra[k]; }

      var preview = extra.hasImage
        ? '📷 Screenshot'
        : (text.length > 80 ? text.substring(0, 80) + '…' : text);

      // Write message to subcollection
      return db().collection('chatConversations').doc(convId)
        .collection('messages').add(msgData)
        .then(function() {
          // Update conversation metadata
          var convUpdate = {
            lastMessage: preview,
            lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastSenderId: myUid,
            lastReadBy: [myUid]
          };
          db().collection('chatConversations').doc(convId).update(convUpdate);

          // Auto-log to interactions if client-linked
          if (clientId && clientName) {
            var interactionText = extra.hasImage ? ('[screenshot]' + (text ? ' ' + text : '')) : text;
            logChatToInteraction(interactionText, clientId, clientName, myName, myUid, convId);
          }
          // Not linked, but the message names a family? Offer the link. Pass convId
          // explicitly — same reasoning as above, this also runs after the write await.
          _chatMaybeSuggestClient(text, clientId, convId);
        });
    }

    function sendChatMessage() {
      if (_sendingImage) return;   // an upload is already in flight — Enter-key double-fire guard
      var text = (chatModalInput ? chatModalInput.value : '').trim();
      if ((!text && !_pendingImage) || !_chatActiveConvId) return;
      if (_pendingImage) { sendWithImage(text); return; }

      if (text.length > 500) text = text.substring(0, 500);
      if (!getMyUid()) return;

      // Text-only send is synchronous (no await between "user pressed Send" and this call),
      // so _chatActiveConvId can't drift underneath it — but it still passes convId
      // explicitly, the same as sendWithImage(), so writeMessage() has one signature used
      // consistently rather than one caller being the odd one out.
      writeMessage(text, {}, _chatActiveConvId, currentClientLink()).catch(function(err) {
        console.error('Chat send error:', err);
      });

      // Clear input
      chatModalInput.value = '';
      if (chatCharCount) {
        chatCharCount.textContent = '0 / 500';
        chatCharCount.className = 'chat-char-count';
      }
    }

    /* extraFields/cb exist for the IT_Help intake, which sends a screenshot AND a
       structured helpRequest in one message and has its own button to re-enable.
       The plain composer still calls sendWithImage(text) and behaves exactly as
       before — one upload path, so a fix to it only has to be made once. */
    function sendWithImage(caption, extraFields, cb, clientOverride) {
      function _done(err) { if (cb) { try { cb(err || null); } catch (e) {} } }
      if (_sendingImage) { _done(new Error('already sending')); return; }
                                   // in-flight guard — setSendBusy()'s disabled state alone
                                   // doesn't stop the Enter-key handler from firing again
      var pi = _pendingImage;
      var convId = _chatActiveConvId;
      // Captured here, beside convId, and carried through the upload — see writeMessage().
      // clientOverride is how the IT_Help intake sends with no family attached: a
      // stale selection in the (covered) dropdown would otherwise file a broken
      // button as an interaction on someone's case.
      var client = clientOverride || currentClientLink();

      // Belt-and-braces: clearPendingImage() runs on every path that changes or leaves
      // the conversation (closeChatModal, roster click, openConversation), so this should
      // be unreachable. It exists so a future code path that forgets to clear the pending
      // image cannot post a screenshot into the wrong, client-linked thread.
      if (!pi || !convId || pi.convId !== convId) {
        clearPendingImage();
        hostToast('That screenshot was for a different conversation — please paste it again.', '#DC2626');
        _done(new Error('screenshot belonged to another conversation'));
        return;
      }

      _sendingImage = true;
      var _sendErr = null;
      setSendBusy(true);
      var id = db().collection('chatConversations').doc(convId)
                 .collection('messages').doc().id;
      var path = 'chatImages/' + convId + '/' + id + '.jpg';
      var storageRef = firebase.storage().ref(path);
      storageRef.put(pi.blob, { contentType: 'image/jpeg' })
        .then(function (snap) { return snap.ref.getDownloadURL(); })
        .then(function (url) {
          // Re-check immediately before the write too, not only before the upload started.
          // The real fix is that writeMessage() below is handed `convId` — the value
          // captured at the top of this function — explicitly, so the write always targets
          // the conversation this send was for regardless of what _chatActiveConvId has
          // drifted to during the upload. This check is the belt to that parameter's braces:
          // pi/convId are locals that can't actually change within one call, so it should
          // never trip, but it costs nothing and it means a future edit that reintroduces a
          // mutable convId here fails safe instead of leaking.
          if (pi.convId !== convId) {
            return storageRef.delete().catch(function (delErr) {
              console.warn('Chat image cleanup delete failed:', delErr && delErr.message);
            }).then(function () {
              throw new Error('conversation changed during upload — screenshot not sent');
            });
          }
          var _fields = {
            hasImage: true, imageUrl: url, imagePath: path,
            imageW: pi.w, imageH: pi.h, imageBytes: pi.blob.size
          };
          if (extraFields) {
            for (var _k in extraFields) {
              if (extraFields.hasOwnProperty(_k)) _fields[_k] = extraFields[_k];
            }
          }
          return writeMessage(caption, _fields, convId, client).catch(function (writeErr) {
            // Upload succeeded but the message doc failed to write — the Storage object
            // would otherwise be an orphan no message ever references. Clean it up so the
            // 13-month purge isn't the only thing standing between us and a leaked image.
            // Guarded in its own catch so a failed cleanup can't mask the original error.
            return storageRef.delete().catch(function (delErr) {
              console.warn('Chat image cleanup delete failed:', delErr && delErr.message);
            }).then(function () {
              throw writeErr;
            });
          });
        })
        .then(function () {
          // Only clear the UI once the message document is actually written. A failed
          // send must leave the screenshot + caption in place so the user can retry.
          clearPendingImage();
          if (chatModalInput) chatModalInput.value = '';
          if (chatCharCount) {
            chatCharCount.textContent = '0 / 500';
            chatCharCount.className = 'chat-char-count';
          }
        })
        .catch(function (err) {
          _sendErr = err;
          console.error('Chat image send error:', err);
          hostToast('Could not send that screenshot: ' + (err && err.message), '#DC2626');
        })
        .finally(function () {
          _sendingImage = false;
          setSendBusy(false);
          _done(_sendErr);
        });
    }

    function setSendBusy(busy) {
      if (!chatModalSend) return;
      chatModalSend.disabled = busy;
      chatModalSend.textContent = busy ? 'Sending…' : 'Send';
    }

    // Send button + Enter key listeners are wired from wireEvents().

    // ── Auto-Log Client-Linked Chat to Interactions ──
    // convId is passed explicitly (same principle as writeMessage()) rather than read from
    // _chatActiveConvId — this runs inside writeMessage()'s post-write .then(), after the
    // Firestore add() await, so the live global can have moved on to a different
    // conversation by the time this fires if the user clicked the roster in between.
    function logChatToInteraction(text, clientId, clientName, createdBy, createdByUid, convId) {
      var preview = text.length > 120 ? text.substring(0, 120) + '…' : text;
      hostLogInteraction({
        clientName: clientName,
        clientId: clientId,
        type: 'Chat Note',
        channel: 'Internal Chat',
        notes: 'Chat message: ' + preview,
        status: 'Closed',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: createdBy,
        createdByUid: createdByUid,
        chatConversationId: convId
      }).catch(function(err) {
        console.error('Chat interaction log error:', err);
      });
    }

    // ── Notification Sound ──
    function playNotifSound() {
      _chime();
    }

    // ══════════════════════════════════════════════════════
    // Single-chimer ownership — exactly one open window (dashboard
    // modal or pop-out) owns the audible chime + unread title flash.
    // localStorage heartbeat; pop-out outranks the dashboard while both
    // are alive; a stale (>10s) heartbeat is reclaimed by whoever polls next.
    // ══════════════════════════════════════════════════════
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
      // If setItem throws (private browsing, full quota), _ownsChime still
      // flips true — readOwner() will then always see null and every window
      // will self-claim. That degrades to a double chime, not silence, which
      // is the safer failure direction.
      try { localStorage.setItem(CHIME_KEY, JSON.stringify({ id: _winId, ts: Date.now() })); } catch (e) {}
      _ownsChime = true;
    }

    function releaseChime() {
      var o = readOwner();
      if (o && o.id === _winId) { try { localStorage.removeItem(CHIME_KEY); } catch (e) {} }
      _ownsChime = false;
    }

    // Heartbeat bookkeeping only — keeps the localStorage key fresh and hands
    // ownership over promptly in the normal (unfrozen) case. Do NOT gate a
    // chime on the _ownsChime flag this sets: backgrounded tabs get their
    // timers throttled/frozen by the browser, so a cached flag can go stale
    // for an unbounded time. Use ownsChimeNow() at chime time instead.
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

    // The authoritative check, read fresh from localStorage at the moment a
    // chime decision actually needs to be made. A message arriving is rare
    // enough that a synchronous read here is cheap, and unlike the cached
    // _ownsChime flag it can't be stale because a backgrounded tab's timers
    // got frozen.
    function ownsChimeNow() {
      var o = readOwner();
      if (!o) { claimChime(); return true; }                              // nobody owns it — take it
      if (o.id === _winId) { return true; }                               // we own it
      if (Date.now() - (o.ts || 0) > STALE_MS) { claimChime(); return true; }  // owner went stale — take over
      return false;                                                        // someone else owns it, stay quiet
    }

    function _onChimeStorage(e) {
      if (e.key === CHIME_KEY) evaluateOwnership();
    }

    // ══════════════════════════════════════════════════════
    // Pop-out liveness beacon.
    // The dashboard marks the user offline from DASHBOARD activity — a 10-minute
    // idle timer and a beforeunload handler. Working in the pop-out is precisely
    // what makes that activity stop, so colleagues watched an actively-typing
    // person flap offline. The pop-out stamps this key while it lives; the
    // dashboard asks window.ldahChatPopoutAlive() before writing online:false.
    // Same localStorage channel as the single-chimer rule above, same origin.
    // ══════════════════════════════════════════════════════
    var POPOUT_ALIVE_KEY = 'ldahChatPopoutAlive';
    // Five missed beats. Generous enough that a throttled background timer does
    // not read as death, short enough that a closed window frees presence fast.
    var POPOUT_ALIVE_STALE_MS = 15000;

    function beatPopoutAlive() {
      if (_mode !== 'window') return;
      try { localStorage.setItem(POPOUT_ALIVE_KEY, String(Date.now())); } catch (e) {}
    }
    function clearPopoutAlive() {
      if (_mode !== 'window') return;
      try { localStorage.removeItem(POPOUT_ALIVE_KEY); } catch (e) {}
    }
    // Read fresh from localStorage on every call, deliberately — never a cached
    // flag. A backgrounded dashboard tab has its timers throttled, so anything it
    // cached about the pop-out could be arbitrarily stale.
    window.ldahChatPopoutAlive = function () {
      try {
        var ts = Number(localStorage.getItem(POPOUT_ALIVE_KEY) || 0);
        return !!ts && (Date.now() - ts) < POPOUT_ALIVE_STALE_MS;
      } catch (e) { return false; }
    };

    function _onChatPagehide() {
      releaseChime();
      clearPopoutAlive();
    }

    function startOwnership() {
      evaluateOwnership();
      beatPopoutAlive();
      if (_ownHeartbeat) clearInterval(_ownHeartbeat);
      _ownHeartbeat = setInterval(function () {
        evaluateOwnership();
        beatPopoutAlive();
      }, 3000);
      window.addEventListener('storage', _onChimeStorage);
      // pagehide fires reliably where beforeunload does not (see the DM resume-email work)
      window.addEventListener('pagehide', _onChatPagehide);
    }

    function stopOwnership() {
      if (_ownHeartbeat) { clearInterval(_ownHeartbeat); _ownHeartbeat = null; }
      window.removeEventListener('storage', _onChimeStorage);
      window.removeEventListener('pagehide', _onChatPagehide);
      releaseChime();
      clearPopoutAlive();
    }

    // ── Initialize Chat on Login ──
    // Called from showApp() indirectly — we hook into the existing flow
    var _chatInitDone = false;
    var _origShowApp = window._origShowApp; // in case needed

    // Poll for currentUserData to be set, then init
    function tryInitChat() {
      if (_chatInitDone) return;
      if (!window.currentUserData || !window.currentUserData.uid) {
        setTimeout(tryInitChat, 500);
        return;
      }
      _chatInitDone = true;
      window.initChatRoster();
      window.initChatConversations();
    }
    // Re-init chat for new user (called from onAuthStateChanged)
    window.reinitChat = function() {
      _chatInitDone = false;
      if (_chatConvsUnsub) { _chatConvsUnsub(); _chatConvsUnsub = null; }
      _chatConvsList = [];
      _chatUnreadCount = -1;
      _chatUnreadByUser = {};
      _chatActiveConvId = null;
      _chatActiveOtherUid = null;
      // Auth changed — nothing started under the previous user may land.
      _chatConvOpenSeq++;
      clearPendingImage();
      resetClientLink();
      tryInitChat();
    };

    // Mount-time polling start (setTimeout(tryInitChat, …)) now lives in mount().

    // Re-init if auth state changes (handled by presence code in auth block)

  // ── DOM binding + event wiring — called from mount(), once the markup exists ──
  function bindElements() {
    chatModalOverlay = document.getElementById('chatModalOverlay');
    chatModalClose = document.getElementById('chatModalClose');
    chatModalSend = document.getElementById('chatModalSend');
    chatModalInput = document.getElementById('chatModalInput');
    chatModalMessages = document.getElementById('chatModalMessages');
    chatBadge = document.getElementById('chatBadge');
    chatOpen = document.getElementById('chatOpen');
    chatHeaderAvatar = document.getElementById('chatHeaderAvatar');
    chatHeaderName = document.getElementById('chatHeaderName');
    chatHeaderStatus = document.getElementById('chatHeaderStatus');
    chatOnlineList = document.getElementById('chatOnlineList');
    chatOfflineList = document.getElementById('chatOfflineList');
    chatShowMoreBtn = document.getElementById('chatShowMoreOffline');
    chatRecentToggle = document.getElementById('chatRecentToggle');
    chatConversationsList = document.getElementById('chatConversationsList');
    chatClientSelect = document.getElementById('chatClientSelect');
    chatCharCount = document.getElementById('chatCharCount');
    chatSearchInput = document.getElementById('chatSearchInput');
    chatEmptyState = document.getElementById('chatEmptyState');
    chatSidebarToggle = document.getElementById('chatSidebarToggle');
    chatSidebar = document.querySelector('.chat-modal-sidebar');
    chatZoomBtn = document.getElementById('chatZoomBtn');
  }

  function wireEvents() {
    // ── Lightbox Escape handler (Task 9) ──
    // Registered FIRST, before the modal-closing Escape handler below. Both listeners
    // are bound to `document`; stopImmediatePropagation (NOT stopPropagation) is required
    // to stop the modal-closing handler from also firing on the same keydown, because
    // stopPropagation only stops the event travelling to OTHER elements — it does nothing
    // to sibling listeners already registered on the same element. stopImmediatePropagation
    // stops those too, but only ones registered after this one, hence the ordering here.
    document.addEventListener('keydown', function(e) {
      if (e.key !== 'Escape') return;
      var lb = document.getElementById('chatLightbox');
      if (lb && lb.classList.contains('active')) {
        e.stopImmediatePropagation();
        lb.classList.remove('active');
      }
    });

    if (chatOpen) {
      chatOpen.addEventListener('click', handleFabClick);
      chatOpen.onclick = handleFabClick;
    }
    var popBtn = document.getElementById('chatPopOut');
    // Wrapped, not passed by reference: addEventListener would hand the click Event
    // in as the silent flag and suppress the blocked-pop-ups toast this button relies on.
    if (popBtn) popBtn.addEventListener('click', function () { openPopOut(); });
    if (chatModalClose) chatModalClose.addEventListener('click', closeChatModal);
    if (chatModalOverlay) chatModalOverlay.addEventListener('click', function(e) {
      if (e.target === chatModalOverlay) closeChatModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && chatModalOverlay && chatModalOverlay.classList.contains('active')) {
        closeChatModal();
      }
    });

    // ── Sidebar Toggle (tablet/mobile) ──
    if (chatSidebarToggle && chatSidebar) {
      chatSidebarToggle.addEventListener('click', function() {
        chatSidebar.classList.toggle('hidden');
        chatSidebarToggle.textContent = chatSidebar.classList.contains('hidden') ? '☰' : '✕';
        chatSidebarToggle.title = chatSidebar.classList.contains('hidden') ? 'Show roster' : 'Hide roster';
      });
    }

    // ── Zoom Screen Share Button ──
    if (chatZoomBtn) {
      chatZoomBtn.addEventListener('click', function() {
        if (!_chatActiveOtherUid || !_chatActiveConvId) {
          alert('Select a conversation first, then click Request Screen Sharing.');
          return;
        }
        if (!confirm('Request this person to share their screen with you?')) return;
        // Use WebRTC screen share
        window.rtcRequestScreenShare(_chatActiveConvId, _chatActiveOtherUid,
          document.getElementById('chatHeaderName') ? document.getElementById('chatHeaderName').textContent : 'User');
      });
    }

    // ── Character Counter ──
    if (chatModalInput && chatCharCount) {
      chatModalInput.addEventListener('input', function() {
        var len = chatModalInput.value.length;
        chatCharCount.textContent = len + ' / 500';
        chatCharCount.className = 'chat-char-count' + (len >= 490 ? ' danger' : len >= 450 ? ' warn' : '');
      });
    }

    // Show more offline toggle
    if (chatShowMoreBtn) {
      chatShowMoreBtn.addEventListener('click', function() {
        _chatShowAllOffline = !_chatShowAllOffline;
        // Re-trigger roster render
        if (_chatRosterUnsub) {
          // Quick way: just re-init
          window.initChatRoster();
        }
      });
    }

    // Recent Chats disclosure. Starts closed on every mount by design — there is
    // no saved preference, so a stale "open" state can never come back and grow the
    // sidebar again on the next window.
    if (chatRecentToggle && chatConversationsList) {
      chatRecentToggle.addEventListener('click', function() {
        var open = chatConversationsList.hasAttribute('hidden');
        if (open) chatConversationsList.removeAttribute('hidden');
        else chatConversationsList.setAttribute('hidden', '');
        chatRecentToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        chatRecentToggle.textContent = (open ? '▼' : '▶') + ' Recent Chats';
      });
    }

    // Search filter
    if (chatSearchInput) {
      chatSearchInput.addEventListener('input', function() {
        // Re-trigger roster render by re-initing
        if (_chatRosterUnsub) window.initChatRoster();
      });
    }

    // Send button + Enter key
    if (chatModalSend) chatModalSend.addEventListener('click', sendChatMessage);
    if (chatModalInput) chatModalInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); sendChatMessage(); }
    });

    // ── Screenshot paste (Task 8) ──
    if (chatModalInput)    chatModalInput.addEventListener('paste', handleImagePaste);
    if (chatModalMessages) chatModalMessages.addEventListener('paste', handleImagePaste);

    // ── IT_Help intake — button tree (2026-09-04) ──
    var _ciNewBtn = document.getElementById('chatNewRequest');
    if (_ciNewBtn) _ciNewBtn.addEventListener('click', function () { window._ciOpen(); });
    var _ciSendBtn = document.getElementById('chatIntakeSend');
    if (_ciSendBtn) _ciSendBtn.addEventListener('click', _ciSubmit);
    var _ciSkipBtn = document.getElementById('chatIntakeSkip');
    if (_ciSkipBtn) _ciSkipBtn.addEventListener('click', _ciHide);
    var _ciBackBtn = document.getElementById('ciBack');
    if (_ciBackBtn) _ciBackBtn.addEventListener('click', _ciBack);

    // Third route to a screenshot, beside paste and drag-drop: on an iPad
    // there is no clipboard paste and nothing to drag, so without a file
    // picker the picture area is decoration on the device most likely to
    // need it.
    var _ciFile = document.getElementById('ciFile');
    var _ciPickBtn = document.getElementById('ciPickBtn');
    if (_ciPickBtn && _ciFile) _ciPickBtn.addEventListener('click', function () { _ciFile.click(); });
    if (_ciFile) _ciFile.addEventListener('change', function () {
      var f = _ciFile.files && _ciFile.files[0];
      // Reset first: picking the SAME file twice fires no change event otherwise,
      // which reads as the picker being broken.
      _ciFile.value = '';
      if (f) acceptImageFile(f, 'picker');
    });
    var _ciShotClear = document.getElementById('ciShotClear');
    if (_ciShotClear) _ciShotClear.addEventListener('click', clearPendingImage);
    // The paste instruction says "click the grey box, then paste" — so the box
    // has to be able to take focus and actually receive the paste event.
    var _ciShotBox = document.getElementById('ciShotBox');
    if (_ciShotBox) _ciShotBox.addEventListener('click', function () {
      try { _ciShotBox.focus(); } catch (e) {}
    });
    // Enter in the one free-text line sends, the same as the composer does.
    var _ciNoteInp = document.getElementById('ciNote');
    if (_ciNoteInp) _ciNoteInp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); _ciSubmit(); }
    });

    // ── Screenshot drag-and-drop (2026-09-01) ──
    // Bound to the overlay so the whole open chat is a target: dropping on the
    // roster, a message or the composer all work. All four events are needed —
    // see handleChatDragOver for why dragover is the load-bearing one.
    if (chatModalOverlay) {
      chatModalOverlay.addEventListener('dragenter', handleChatDragEnter);
      chatModalOverlay.addEventListener('dragover',  handleChatDragOver);
      chatModalOverlay.addEventListener('dragleave', handleChatDragLeave);
      chatModalOverlay.addEventListener('drop',      handleChatDrop);
    }
    var xBtn = document.getElementById('chatImgPreviewX');
    if (xBtn) xBtn.addEventListener('click', clearPendingImage);

    // ── Screenshot rendering: lightbox (Task 9) ──
    // Click-to-zoom via event delegation on the messages container (messages are
    // re-rendered wholesale, so binding to individual <img> elements would leak).
    if (chatModalMessages) {
      chatModalMessages.addEventListener('click', function (e) {
        var img = e.target.closest ? e.target.closest('.chat-msg-img') : null;
        if (!img) return;
        var lb = document.getElementById('chatLightbox');
        document.getElementById('chatLightboxImg').src = img.src;
        document.getElementById('chatLightboxOpen').href = img.src;
        if (lb) lb.classList.add('active');
      });

      // Backstop for a thumbnail that fails to load inside the 90-day window
      // (e.g. the underlying Storage object was deleted out of band). Expiry is
      // normally decided by message age in renderMessages, not by this handler —
      // see the ageMs check there. The 'error' event does not bubble, so this is
      // registered on the CAPTURE phase to still observe it from an ancestor;
      // deliberately not an inline onerror="" attribute so nothing in message
      // data (imageUrl included) is ever concatenated into an HTML attribute
      // value that a script parser has to re-decode.
      chatModalMessages.addEventListener('error', function (e) {
        var img = e.target;
        if (!img || !img.classList || !img.classList.contains('chat-msg-img')) return;
        var gone = document.createElement('div');
        gone.className = 'chat-msg-img-gone';
        gone.textContent = '[screenshot expired]';
        if (img.parentNode) img.parentNode.replaceChild(gone, img);
      }, true);
    }

    var lbClose = document.getElementById('chatLightboxClose');
    if (lbClose) lbClose.addEventListener('click', function () {
      document.getElementById('chatLightbox').classList.remove('active');
    });

    // ── Read receipts follow real attention ──
    // chatIsVisible() can be false when a message arrives (pop-out minimised or
    // behind the dashboard) and true a moment later when the person brings the
    // window forward. No Firestore snapshot fires on that transition, so these two
    // listeners are the only thing that clears the unread state — without them the
    // count, the title prefix and the roster badges would stick until the next
    // inbound message. Harmless in modal mode: markActiveConversationRead() is a
    // no-op unless a conversation is open and the surface is visible.
    window.addEventListener('focus', markActiveConversationRead);
    document.addEventListener('visibilitychange', markActiveConversationRead);
  }

  // ── Real viewport height ──────────────────────────────────────────────────
  // iOS/iPadOS resolves 100vh — and a position:fixed `bottom` — against the LARGE
  // viewport, i.e. the height the page WOULD have if Safari's URL and tab bars were
  // hidden. They usually are not, so the bottom of the chat sat behind the browser
  // chrome with the composer inside it, unreachable: the modal is not a scroll
  // container, so there was nothing for the user to scroll back to. visualViewport
  // reports what is genuinely on screen RIGHT NOW, which also shrinks when the
  // on-screen keyboard opens — the case that matters most, because that is exactly
  // when someone is trying to type.
  var _vvRaf = 0;
  function syncViewportHeight() {
    if (_vvRaf) return;                       // collapse bursts of resize/scroll events
    _vvRaf = requestAnimationFrame(function () {
      _vvRaf = 0;
      var vv = window.visualViewport;
      var h = (vv && vv.height) ? vv.height : window.innerHeight;
      if (!h) return;
      document.documentElement.style.setProperty('--chat-vvh', Math.round(h) + 'px');
    });
  }
  function watchViewportHeight() {
    syncViewportHeight();
    var vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', syncViewportHeight);
      vv.addEventListener('scroll', syncViewportHeight);
    }
    window.addEventListener('resize', syncViewportHeight);
    window.addEventListener('orientationchange', syncViewportHeight);
    // Safari settles the keyboard animation after the resize event fires.
    window.addEventListener('focusin', function () { setTimeout(syncViewportHeight, 300); });
  }

  function mount(el, opts) {
    opts = opts || {};
    _mode = opts.mode || 'modal';
    _host = opts.host || {};
    el.innerHTML = MODAL_MARKUP + (_mode === 'modal' ? FAB_MARKUP : '');
    /* The launcher belongs in the top bar next to Alerts, not floating over the
       corner of the page. Re-parented rather than re-authored so every behaviour
       hanging off it — unread badge, popped-out state, click handler — keeps
       working untouched. Falls back to the floating position when the host page
       offers no slot, which is what chat.html itself does. */
    try {
      var _slot = document.getElementById('topbarChatSlot');
      var _launch = el.querySelector('.chat-launch');
      if (_slot && _launch) { _slot.appendChild(_launch); _launch.classList.add('in-topbar'); }
    } catch (_e) {}
    _ciInjectCss();
    bindElements();
    wireEvents();
    if (_mode === 'window') {
      document.body.classList.add('chat-window-mode');
      var po = document.getElementById('chatPopOut');
      if (po) po.style.display = 'none';
      // openChatModal() is what populates the "Link to client" dropdown, and it never
      // runs in window mode — so the pop-out, which is the surface staff actually use,
      // shipped with nothing in it but the placeholder and no way to link a chat to a
      // family. Same host-capability path as the modal (hostContacts, host cache first,
      // Firestore fallback) — no second fetch mechanism.
      populateChatClientSelect();
    }
    watchViewportHeight();
    window.addEventListener('resize', _ciClamp);
    setTimeout(tryInitChat, _mode === 'window' ? 200 : 1000);
    startOwnership();
    return { open: openChatModal, close: closeChatModal, destroy: teardown };
  }

  function teardown() {
    if (_chatMessagesUnsub) _chatMessagesUnsub();
    if (_chatRosterUnsub) _chatRosterUnsub();
    if (_chatConvsUnsub) _chatConvsUnsub();
    if (_chatHeaderPresenceUnsub) _chatHeaderPresenceUnsub();
    if (_chatLocalTimeInterval) clearInterval(_chatLocalTimeInterval);
    window.removeEventListener('resize', _ciClamp);
    _ciBindPaste(false);
    stopOwnership();
  }

  return { mount: mount, MARKUP: MODAL_MARKUP };
})();
