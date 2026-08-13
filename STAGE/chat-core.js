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
    '          <!-- Recent conversations -->' +
    '          <div class="chat-roster-section">' +
    '            <div class="chat-roster-label">💬 Recent Chats</div>' +
    '            <div id="chatConversationsList" class="chat-conversations"></div>' +
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
    '            <label for="chatClientSelect">📎 Link to client:</label>' +
    '            <select id="chatClientSelect">' +
    '              <option value="">None (general chat)</option>' +
    '            </select>' +
    '          </div>' +
    '          <div class="chat-modal-input-area">' +
    '            <input class="chat-modal-input" id="chatModalInput" placeholder="Type your message…" maxlength="500" />' +
    '            <span class="chat-char-count" id="chatCharCount">0 / 500</span>' +
    '            <button class="chat-modal-send" id="chatModalSend" type="button">Send</button>' +
    '          </div>' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
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
        chatOnlineList, chatOfflineList, chatShowMoreBtn, chatConversationsList,
        chatClientSelect, chatCharCount, chatSearchInput, chatEmptyState,
        chatSidebarToggle, chatSidebar, chatZoomBtn;

    // ── State ──
    var _chatActiveConvId = null;
    var _chatActiveOtherUid = null;
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
      // Stop listening to messages and header presence
      if (_chatMessagesUnsub) { _chatMessagesUnsub(); _chatMessagesUnsub = null; }
      if (_chatHeaderPresenceUnsub) { _chatHeaderPresenceUnsub(); _chatHeaderPresenceUnsub = null; }
      _chatActiveConvId = null;
      _chatActiveOtherUid = null;
      updateChatBadge();
    }

    // ── Pop-out window: opens chat.html in its own resizable window and
    // remembers the monitor/size it was left on. saveGeom() is polled from
    // here (the opener) once a second while the popup is open — a popup
    // cannot reliably write its own geometry as it closes. ──
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
      _popWin = window.open('chat.html', 'ldahChat',
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

    // Attach FAB button click — auto-open first unread conversation
    function handleFabClick(e) {
      e.stopPropagation();
      if (_popWin && !_popWin.closed) { _popWin.focus(); return; }
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

    function _chatMaybeSuggestClient(text, sentClientId) {
      try {
        if (sentClientId) return;                       // already linked, nothing to ask
        var match = _chatFindClientMention(text);
        if (!match) return;
        var key = _chatActiveConvId + '|' + match.id;
        if (_chatNudgeDismissed[key]) return;
        _chatShowClientNudge(match, key);
      } catch (e) { console.warn('chat client nudge:', e && e.message); }
    }

    function _chatShowClientNudge(contact, key) {
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
          if (chatClientSelect) chatClientSelect.value = contact.id;   // future messages log too
          db().collection('chatConversations').doc(_chatActiveConvId)
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
          // Treat as offline if lastSeen is stale (> 15 min) even if online flag is true
          var lastSeenMs = d.lastSeen ? d.lastSeen.toMillis() : 0;
          var isStale = lastSeenMs < staleThreshold;
          if (d.online && !isStale) {
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
      var originalTitle = document.title;
      window._ldahChatTitleSignal = function(unread) {
        document.title = unread > 0
          ? '(' + unread + ') New Message — LDAH-Int'
          : originalTitle;
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
              if (_chatModalOpen && _chatActiveConvId === change.doc.id) return;
              // This is an incoming message in a conversation I'm not looking at
              if (d.lastReadBy && !d.lastReadBy.includes(myUid)) {
                shouldChime = true;
              }
            });
            if (shouldChime && _ownsChime) playNotifSound();
          }
          _chatUnreadCount = unread;
          _chatUnreadByUser = unreadByUser;
          updateChatBadge();
          if (_ownsChime && typeof window._ldahChatTitleSignal === 'function') window._ldahChatTitleSignal(unread);
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
      if (_chatUnreadCount > 0 && !_chatModalOpen) {
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
          if (!snap.empty) {
            var convDoc = snap.docs[0];
            _chatActiveConvId = convDoc.id;
            _chatLoadedOlderMessages = [];
            _chatOldestMessageTs = null;
            _chatHasMoreOlder = true;
            _lastListenerMessages = [];
            loadConversationMessages(convDoc.id, otherName, otherUid);
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
            db().collection('chatConversations').add(convData).then(function(docRef) {
              _chatActiveConvId = docRef.id;
              _chatLoadedOlderMessages = [];
              _chatOldestMessageTs = null;
              _chatHasMoreOlder = true;
              _lastListenerMessages = [];
              loadConversationMessages(docRef.id, otherName, otherUid);
            });
          }
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
        var lastSeenMs = d.lastSeen ? d.lastSeen.toMillis() : 0;
        var isStale = lastSeenMs < (Date.now() - 15 * 60 * 1000);
        if (d.online && !isStale) {
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

          // Mark conversation as read only if modal is open and this is the active conversation
          if (_chatModalOpen && _chatActiveConvId === convId) {
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

        // If this is a screen share request message (sent by other person, not me),
        // add the "Share My Screen" button
        var shareBtn = '';
        if (!isMe && m.text && m.text.indexOf('📺') === 0 && m.text.indexOf('Share My Screen') > -1 && m.screenShareSession) {
          shareBtn = '<br><button class="chat-share-btn" data-convid="' + _escHTML(m.screenShareConvId || _chatActiveConvId) + '" data-sessionid="' + _escHTML(m.screenShareSession) + '">📺 Share My Screen</button>';
        }
        // Also detect the standard request message pattern and show button
        if (!isMe && m.screenShareSession && m.text && m.text.indexOf('would like to see your screen') > -1) {
          shareBtn = '<br><button class="chat-share-btn" data-convid="' + _escHTML(_chatActiveConvId) + '" data-sessionid="' + _escHTML(m.screenShareSession) + '">📺 Share My Screen</button>';
        }

        html += '<div class="' + cls + '">'
          + '<div class="chat-message-header">'
          + '<div class="chat-message-name">' + nameDisplay + clientTag + '</div>'
          + '<div class="chat-message-time">' + timeStr + '</div>'
          + '</div>'
          + '<div class="chat-message-text">' + textHtml + shareBtn + '</div>'
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

      // Capture scroll state before re-render so we can preserve the user's visual position
      var prevScrollHeight = chatModalMessages ? chatModalMessages.scrollHeight : 0;
      var prevScrollTop = chatModalMessages ? chatModalMessages.scrollTop : 0;

      db().collection('chatConversations').doc(_chatActiveConvId)
        .collection('messages')
        .where('createdAt', '<', _chatOldestMessageTs)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get()
        .then(function(snap) {
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

    // ── Send Message ──
    function sendChatMessage() {
      var text = (chatModalInput ? chatModalInput.value : '').trim();
      if (!text || !_chatActiveConvId) return;
      if (text.length > 500) text = text.substring(0, 500);

      var myUid = getMyUid();
      var myName = getMyName();
      if (!myUid) return;

      var clientId = chatClientSelect ? chatClientSelect.value : '';
      var clientName = '';
      if (clientId && chatClientSelect) {
        var selectedOpt = chatClientSelect.options[chatClientSelect.selectedIndex];
        clientName = selectedOpt ? selectedOpt.textContent : '';
      }

      var msgData = {
        senderId: myUid,
        senderName: myName,
        text: text,
        clientId: clientId || null,
        clientName: clientName || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        readBy: [myUid]
      };

      // Write message to subcollection
      db().collection('chatConversations').doc(_chatActiveConvId)
        .collection('messages').add(msgData)
        .then(function() {
          // Update conversation metadata
          var convUpdate = {
            lastMessage: text.length > 80 ? text.substring(0, 80) + '…' : text,
            lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastSenderId: myUid,
            lastReadBy: [myUid]
          };
          db().collection('chatConversations').doc(_chatActiveConvId).update(convUpdate);

          // Auto-log to interactions if client-linked
          if (clientId && clientName) {
            logChatToInteraction(text, clientId, clientName, myName, myUid);
          }
          // Not linked, but the message names a family? Offer the link.
          _chatMaybeSuggestClient(text, clientId);
        })
        .catch(function(err) {
          console.error('Chat send error:', err);
        });

      // Clear input
      chatModalInput.value = '';
      if (chatCharCount) {
        chatCharCount.textContent = '0 / 500';
        chatCharCount.className = 'chat-char-count';
      }
    }

    // Send button + Enter key listeners are wired from wireEvents().

    // ── Auto-Log Client-Linked Chat to Interactions ──
    function logChatToInteraction(text, clientId, clientName, createdBy, createdByUid) {
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
        chatConversationId: _chatActiveConvId
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
    if (chatOpen) {
      chatOpen.addEventListener('click', handleFabClick);
      chatOpen.onclick = handleFabClick;
    }
    var popBtn = document.getElementById('chatPopOut');
    if (popBtn) popBtn.addEventListener('click', openPopOut);
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
  }

  function mount(el, opts) {
    opts = opts || {};
    _mode = opts.mode || 'modal';
    _host = opts.host || {};
    el.innerHTML = MODAL_MARKUP + (_mode === 'modal' ? FAB_MARKUP : '');
    bindElements();
    wireEvents();
    if (_mode === 'window') {
      document.body.classList.add('chat-window-mode');
      var po = document.getElementById('chatPopOut');
      if (po) po.style.display = 'none';
    }
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
    if (_ownHeartbeat) clearInterval(_ownHeartbeat);
  }

  return { mount: mount, MARKUP: MODAL_MARKUP };
})();
