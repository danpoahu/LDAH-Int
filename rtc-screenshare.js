/**
 * LDAH-Int — WebRTC screen share (moved verbatim from index.html, 2026-08-13).
 * Loaded by both index.html and chat.html so the chat header's
 * "Request Screen Sharing" button works in the popped-out window too.
 *
 * Requires in the host page: firebase (compat), window.currentUserData,
 * and the #screenshareOverlay markup.
 */
(function() {
  'use strict';

  var _rtcPeer = null;        // RTCPeerConnection
  var _rtcStream = null;      // MediaStream (local screen capture)
  var _rtcSignalUnsub = null; // Firestore listener on signals
  var _rtcRole = null;        // 'viewer' or 'sharer'
  var _rtcConvId = null;      // conversation ID for signal path
  var _rtcSessionId = null;   // unique session ID

  var STUN_SERVERS = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  var _rtcStatsTimer = null;  // polls getStats() to see whether video ACTUALLY arrives
  var _rtcSharerName = '';

  /* ── Viewer status ────────────────────────────────────────────────────────
     Negotiating a track is not the same as receiving one. ontrack fires as soon
     as the SDP names a video track, so the old code showed a green dot and
     "Viewing <name>'s screen" while zero bytes were flowing — which is what a
     firewall-blocked share looked like: indistinguishable from success, except
     the picture was black. States below are driven by real signals: the peer
     connection state, and inbound bytesReceived actually increasing. */
  // Local escaper: escHTML lives in a different <script> block and is not
  // visible from this IIFE.
  function ssEsc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function rtcSetViewerState(state, label, title, detail) {
    var dot = document.getElementById('screenshareStatus');
    var lab = document.getElementById('screenshareLabel');
    var msg = document.getElementById('screenshareMsg');
    if (dot) dot.className = 'screenshare-status ' + state;
    if (lab) lab.textContent = label;
    if (!msg) return;
    if (!title) { msg.className = 'screenshare-msg hidden'; msg.innerHTML = ''; return; }
    msg.className = 'screenshare-msg' + (state === 'failed' ? ' is-error' : '');
    msg.innerHTML = '<h4>' + ssEsc(title) + '</h4>' + (detail ? '<p>' + detail + '</p>' : '');
  }

  function rtcShowBlocked() {
    rtcSetViewerState('failed', 'Could not connect',
      'No video is coming through',
      'The screen share was accepted, but no video reached this computer. This is almost ' +
      'always the network blocking the direct connection between the two machines &mdash; ' +
      'office and guest Wi-Fi commonly do. Try again with one of you on a phone hotspot to ' +
      'confirm. If it works there, the office network is the cause.');
  }

  // Watch inbound video. The first time bytes actually increase we are genuinely
  // connected; if nothing arrives within the window, say so instead of sitting
  // on a black rectangle.
  function rtcWatchIncoming() {
    if (_rtcStatsTimer) clearInterval(_rtcStatsTimer);
    var last = 0, ticks = 0, everFlowed = false;
    _rtcStatsTimer = setInterval(function() {
      if (!_rtcPeer || typeof _rtcPeer.getStats !== 'function') return;
      ticks++;
      _rtcPeer.getStats(null).then(function(stats) {
        var bytes = 0;
        stats.forEach(function(r) {
          if (r.type === 'inbound-rtp' && (r.kind === 'video' || r.mediaType === 'video')) {
            bytes += (r.bytesReceived || 0);
          }
        });
        if (bytes > last) {
          last = bytes;
          if (!everFlowed) {
            everFlowed = true;
            rtcSetViewerState('connected', 'Viewing ' + _rtcSharerName + '\'s screen', '', '');
          }
        }
        // ~14s with nothing at all: the media path never formed.
        if (!everFlowed && ticks >= 14) {
          clearInterval(_rtcStatsTimer); _rtcStatsTimer = null;
          rtcShowBlocked();
        }
      }).catch(function(){});
    }, 1000);
  }

  function rtcStopWatching() {
    if (_rtcStatsTimer) { clearInterval(_rtcStatsTimer); _rtcStatsTimer = null; }
  }

  function rtcDb() { return firebase.firestore(); }
  function rtcMyUid() { return window.currentUserData ? window.currentUserData.uid : null; }
  function rtcMyName() { return window.currentUserData ? window.currentUserData.displayName : 'Unknown'; }
  function rtcMyRole() { return window.currentUserData ? window.currentUserData.role : ''; }

  // Signal path: chatConversations/{convId}/webrtcSignals
  function signalCol(convId) {
    return rtcDb().collection('chatConversations').doc(convId).collection('webrtcSignals');
  }

  // Clean up old signals for a conversation
  function cleanSignals(convId) {
    signalCol(convId).get().then(function(snap) {
      var batch = rtcDb().batch();
      snap.forEach(function(doc) { batch.delete(doc.ref); });
      if (snap.size > 0) batch.commit().catch(function(){});
    }).catch(function(){});
  }

  // ── VIEWER SIDE (Daniel / admin — requests to see someone's screen) ──

  window.rtcRequestScreenShare = function(convId, otherUid, otherName) {
    if (!convId || !otherUid) return;
    _rtcConvId = convId;
    _rtcSharerName = otherName || 'Staff';
    _rtcSessionId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    // Open the viewer straight away in a WAITING state. Previously nothing
    // appeared until the other person accepted, so a request that was never
    // answered looked identical to one that was never sent.
    var _ov = document.getElementById('screenshareOverlay');
    if (_ov) _ov.classList.add('active');
    rtcSetViewerState('waiting', 'Waiting for ' + _rtcSharerName,
      'Request sent to ' + _rtcSharerName,
      'They need to click <strong>Share My Screen</strong> in the chat. ' +
      'Their screen appears here as soon as they do.');

    // Clean old signals first
    cleanSignals(convId);

    // Write a "request" signal so the other person sees the share button
    signalCol(convId).add({
      type: 'request',
      sessionId: _rtcSessionId,
      fromUid: rtcMyUid(),
      fromName: rtcMyName(),
      toUid: otherUid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Send a chat message with the share button (write directly to include screenShareSession field)
    var msgText = '📺 ' + rtcMyName() + ' would like to see your screen. Please click the "Share My Screen" button below.';
    rtcDb().collection('chatConversations').doc(convId).collection('messages').add({
      senderId: rtcMyUid(),
      senderName: rtcMyName(),
      text: msgText,
      screenShareSession: _rtcSessionId,
      /* The renderer fails CLOSED: no screenShareConvId on the message means no
         button, deliberately, so a stale conversation id can never open a
         signalling channel under the wrong conversation. That hardening landed
         on the render side only — this sender never wrote the field, so the
         request arrived as text with no button under it and the other person had
         nothing to click. */
      screenShareConvId: convId,
      clientId: null,
      clientName: null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      readBy: [rtcMyUid()]
    }).then(function() {
      rtcDb().collection('chatConversations').doc(convId).update({
        lastMessage: '📺 Screen share request',
        lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastSenderId: rtcMyUid(),
        lastReadBy: [rtcMyUid()]
      });
    });

    _rtcRole = 'viewer';

    // Listen for the answer (the sharer's SDP answer + ICE candidates)
    _rtcSignalUnsub = signalCol(convId)
      .where('sessionId', '==', _rtcSessionId)
      .onSnapshot(function(snap) {
        snap.docChanges().forEach(function(change) {
          if (change.type !== 'added') return;
          var d = change.doc.data();
          if (d.fromUid === rtcMyUid()) return; // skip own signals

          if (d.type === 'offer') {
            // Sharer sent an offer — create answer
            handleOffer(d, convId);
          } else if (d.type === 'candidate' && _rtcPeer) {
            _rtcPeer.addIceCandidate(new RTCIceCandidate(JSON.parse(d.data)))
              .catch(function(){});
          }
        });
      });
  };

  function handleOffer(signal, convId) {
    _rtcPeer = new RTCPeerConnection(STUN_SERVERS);

    _rtcPeer.ontrack = function(e) {
      var video = document.getElementById('screenshareVideo');
      if (video && e.streams && e.streams[0]) {
        video.srcObject = e.streams[0];
        _rtcSharerName = signal.fromName || _rtcSharerName || 'Staff';
        showViewer(_rtcSharerName);
        // A track was NEGOTIATED. That is not the same as video arriving, so
        // stay amber until bytes actually move.
        rtcSetViewerState('connecting', 'Connecting to ' + _rtcSharerName + '...',
          'Connecting...',
          _rtcSharerName + ' accepted. Setting up the direct video connection between ' +
          'the two computers.');
        rtcWatchIncoming();
      }
    };

    _rtcPeer.onicecandidate = function(e) {
      if (e.candidate) {
        signalCol(convId).add({
          type: 'candidate',
          sessionId: _rtcSessionId,
          fromUid: rtcMyUid(),
          data: JSON.stringify(e.candidate),
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    };

    _rtcPeer.onconnectionstatechange = function() {
      if (!_rtcPeer) return;
      var st = _rtcPeer.connectionState;
      // 'failed' means the two machines could never reach each other. Say so and
      // leave the overlay up — closing it silently is what made this look like a
      // bug in the dashboard rather than a blocked network.
      if (st === 'failed') { rtcStopWatching(); rtcShowBlocked(); return; }
      if (st === 'disconnected') { rtcStop(); }
    };

    _rtcPeer.setRemoteDescription(new RTCSessionDescription(JSON.parse(signal.data)))
      .then(function() { return _rtcPeer.createAnswer(); })
      .then(function(answer) { return _rtcPeer.setLocalDescription(answer); })
      .then(function() {
        signalCol(convId).add({
          type: 'answer',
          sessionId: _rtcSessionId,
          fromUid: rtcMyUid(),
          data: JSON.stringify(_rtcPeer.localDescription),
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .catch(function(err) { console.error('WebRTC offer handling failed:', err); rtcStop(); });
  }

  // ── SHARER SIDE (staff member — shares their screen) ──

  window.rtcStartSharing = function(convId, sessionId) {
    if (!convId) return;
    _rtcConvId = convId;
    _rtcSessionId = sessionId;
    _rtcRole = 'sharer';

    // Prompt user to pick screen
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
      .then(function(stream) {
        _rtcStream = stream;

        // If they stop sharing via the browser's built-in "Stop sharing" button
        stream.getVideoTracks()[0].onended = function() { rtcStop(); };

        _rtcPeer = new RTCPeerConnection(STUN_SERVERS);

        stream.getTracks().forEach(function(track) {
          _rtcPeer.addTrack(track, stream);
        });

        _rtcPeer.onicecandidate = function(e) {
          if (e.candidate) {
            signalCol(convId).add({
              type: 'candidate',
              sessionId: _rtcSessionId,
              fromUid: rtcMyUid(),
              data: JSON.stringify(e.candidate),
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
          }
        };

        _rtcPeer.onconnectionstatechange = function() {
          if (_rtcPeer && (_rtcPeer.connectionState === 'disconnected' || _rtcPeer.connectionState === 'failed')) {
            rtcStop();
          }
        };

        // Listen for the viewer's answer
        _rtcSignalUnsub = signalCol(convId)
          .where('sessionId', '==', _rtcSessionId)
          .onSnapshot(function(snap) {
            snap.docChanges().forEach(function(change) {
              if (change.type !== 'added') return;
              var d = change.doc.data();
              if (d.fromUid === rtcMyUid()) return;

              if (d.type === 'answer' && _rtcPeer) {
                _rtcPeer.setRemoteDescription(new RTCSessionDescription(JSON.parse(d.data)))
                  .catch(function(err) { console.error('Set answer failed:', err); });
              } else if (d.type === 'candidate' && _rtcPeer) {
                _rtcPeer.addIceCandidate(new RTCIceCandidate(JSON.parse(d.data)))
                  .catch(function(){});
              }
            });
          });

        // Create and send the offer
        return _rtcPeer.createOffer();
      })
      .then(function(offer) {
        return _rtcPeer.setLocalDescription(offer);
      })
      .then(function() {
        signalCol(_rtcConvId).add({
          type: 'offer',
          sessionId: _rtcSessionId,
          fromUid: rtcMyUid(),
          fromName: rtcMyName(),
          data: JSON.stringify(_rtcPeer.localDescription),
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      })
      .catch(function(err) {
        // User cancelled the screen picker or error
        if (err.name !== 'NotAllowedError') console.error('Screen share error:', err);
        rtcStop();
      });
  };

  // ── VIEWER OVERLAY ──

  function showViewer(sharerName) {
    var overlay = document.getElementById('screenshareOverlay');
    var label = document.getElementById('screenshareLabel');
    if (overlay) overlay.classList.add('active');
    if (label) label.textContent = 'Viewing ' + sharerName + '\'s screen';
  }

  // Fullscreen toggle helper
  function toggleScreenShareFullscreen() {
    var el = document.getElementById('screenshareOverlay');
    if (!el) return;
    var isFs = document.fullscreenElement || document.webkitFullscreenElement;
    if (isFs) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    }
  }

  function updateFsButtonLabel() {
    var isFs = document.fullscreenElement || document.webkitFullscreenElement;
    if (fullBtn) fullBtn.textContent = isFs ? 'Exit Fullscreen' : 'Fullscreen';
  }

  // Fullscreen button — only for superAdmin/admin
  var fullBtn = document.getElementById('screenshareFull');
  if (fullBtn) {
    fullBtn.addEventListener('click', toggleScreenShareFullscreen);
  }

  // Double-click video to toggle fullscreen
  var ssVideo = document.getElementById('screenshareVideo');
  if (ssVideo) {
    ssVideo.addEventListener('dblclick', function() {
      var role = rtcMyRole();
      if (role === 'superAdmin' || role === 'admin') toggleScreenShareFullscreen();
    });
  }

  // Show/hide fullscreen button based on role
  function updateFullscreenVisibility() {
    if (!fullBtn) return;
    var role = rtcMyRole();
    fullBtn.style.display = (role === 'superAdmin' || role === 'admin') ? '' : 'none';
  }

  // Stop button
  var stopBtn = document.getElementById('screenshareStop');
  if (stopBtn) {
    stopBtn.addEventListener('click', function() { rtcStop(); });
  }

  // Listen for fullscreen exit (both standard and webkit)
  document.addEventListener('fullscreenchange', updateFsButtonLabel);
  document.addEventListener('webkitfullscreenchange', updateFsButtonLabel);

  // ── CLEANUP ──

  function rtcStop() {
    // Close peer connection
    rtcStopWatching();
    if (_rtcPeer) { try { _rtcPeer.close(); } catch(e){} _rtcPeer = null; }
    // Stop local stream tracks
    if (_rtcStream) {
      _rtcStream.getTracks().forEach(function(t) { t.stop(); });
      _rtcStream = null;
    }
    // Unsubscribe Firestore listener
    if (_rtcSignalUnsub) { _rtcSignalUnsub(); _rtcSignalUnsub = null; }
    // Clean up signals
    if (_rtcConvId) { cleanSignals(_rtcConvId); }
    // Hide viewer overlay
    var overlay = document.getElementById('screenshareOverlay');
    if (overlay) overlay.classList.remove('active');
    var video = document.getElementById('screenshareVideo');
    if (video) video.srcObject = null;
    rtcSetViewerState('', 'Starting...', '', '');
    _rtcSharerName = '';
    // Exit fullscreen if active
    if (document.fullscreenElement) document.exitFullscreen().catch(function(){});
    // Reset state
    _rtcRole = null;
    _rtcConvId = null;
    _rtcSessionId = null;
  }
  window.rtcStop = rtcStop;

  // ── LISTEN FOR INCOMING SCREEN SHARE REQUESTS (in chat messages) ──
  // The share button in chat messages is wired up via event delegation

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.chat-share-btn');
    if (!btn) return;
    e.preventDefault();
    var convId = btn.getAttribute('data-convid');
    var sessionId = btn.getAttribute('data-sessionid');
    if (convId && sessionId) {
      btn.textContent = 'Starting...';
      btn.style.opacity = '.6';
      btn.style.pointerEvents = 'none';
      window.rtcStartSharing(convId, sessionId);
    }
  });

  // Make fullscreen button visibility update when user data loads
  var _origShowApp = window.showApp;
  if (_origShowApp) {
    // Patch showApp to also update fullscreen visibility
    var _checkFsInterval = setInterval(function() {
      if (window.currentUserData) {
        updateFullscreenVisibility();
        clearInterval(_checkFsInterval);
      }
    }, 1000);
  }

})();
