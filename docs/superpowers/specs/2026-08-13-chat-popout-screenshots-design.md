# Internal Chat — Pop-Out Window & Screenshots — Design Spec

**Date:** 2026-08-13 · **Approved by:** Daniel · **App:** LDAH-Int (staff dashboard) · **Scope: STAGE only**

## Goal
Let staff pop the internal chat out of the dashboard into its own resizable window that can live on a
second monitor, and let them paste a screenshot straight into a conversation. Live root is untouched.

**Versions:** STAGE is `v147.30-STAGE`, live is `v147.10`. Target for this work: `v147.31-STAGE`.

---

## 1. Current state

Chat lives entirely inline in `STAGE/index.html` (47,874 lines). It provides: roster with live presence,
conversations, 500-char text messages, client linking, auto-logging to Interactions, unread badge + chime,
message pagination, admin Chat Logs, 13-month purge, and a WebRTC live screen-share request wired into the
chat header.

| Block | Lines in `STAGE/index.html` | Size |
|---|---|---|
| Chat CSS | ~1632–2330 | ~700 |
| Chat JS | ~9645–10740 | ~1,100 |
| WebRTC screen share (CSS ~2202, JS) | ~10728–11165 | ~440 |

**Dependency audit result.** The chat block reaches outside itself for only ~15 small helpers:
`db()`, `escHTML`, `rsEscape`, `getInitials`, `formatTime`, `formatRole`, `linkifyURLs`, `getMyUid`,
`getMyName`, `_showToast`, `playNotifSound`, `window._playChatChime`, `window.getTimezoneForLocation`,
`getWeatherForUid`, `_allContacts`/`_userLocations`. The screen-share module needs only `firebase` and
`window.currentUserData`. Both are cleanly liftable.

Firebase Storage compat SDK is **already loaded** (`index.html:27`), bucket
`ldah-932d5.firebasestorage.app`.

---

## 2. Approach — one implementation, two hosts

Chosen over (a) opening `index.html?chat=1` in the popup, which boots the whole 47k-line app twice and
doubles every Firestore listener, and (b) a `postMessage`-driven dumb view, which dies whenever the main
tab reloads.

### Files — all under `STAGE/`

| File | | Contents |
|---|---|---|
| `STAGE/chat.css` | new | Chat + screen-share-viewer styles, moved verbatim from `index.html` |
| `STAGE/chat-core.js` | new | The single chat implementation. Owns its own markup via `LDAHChat.mount()` so the HTML cannot drift between hosts |
| `STAGE/rtc-screenshare.js` | new | Live WebRTC screen share, moved. Extracted so *Request Screen Sharing* still works in the popped-out window |
| `STAGE/chat.html` | new | Pop-out host page: Firebase SDKs + config + auth guard + mount in `window` mode |
| `STAGE/index.html` | edit | Three inline blocks replaced by one `<link>` + two `<script>` tags; chat modal markup becomes an empty mount div. Net −2,200 lines |

**Cache-busting is mandatory.** STAGE has a PWA cache that will serve stale JS. Every asset tag carries
`?v=147.31`, bumped on each release.

```html
<link rel="stylesheet" href="chat.css?v=147.31">
<script src="rtc-screenshare.js?v=147.31"></script>
<script src="chat-core.js?v=147.31"></script>
```

### Host contract

`chat-core.js` talks to Firebase directly and works standalone. The `host` object is optional — it only
lets the main app hand over data it already holds so the same reads do not happen twice.

```js
LDAHChat.mount(el, {
  mode: 'modal' | 'window',
  host: { getContacts, getWeatherForUid, toast, logInteraction }   // all optional
});
```

Anything not supplied falls back to chat-core's own Firestore reads. That fallback is what makes the
pop-out independent of whether the main tab is open, reloaded, or closed.

The six pure formatters (`escHTML`, `rsEscape`, `getInitials`, `formatTime`, `formatRole`,
`linkifyURLs`) are copied **into** `chat-core.js` as private functions. `index.html` keeps its own copies
for the rest of the app. Duplicating six one-line pure functions is accepted; duplicating the chat
implementation is not.

---

## 3. The pop-out window

- A **⧉ Pop Out** button joins the chat header, next to *Request Screen Sharing*.
- Opens `chat.html` as a named window `ldahChat`. Last size and position are stored in `localStorage`
  under `ldahChatWindow` so it reopens on the monitor it was left on. Layout works down to ~420px wide
  for a narrow side dock (roster collapses, same breakpoint logic already in `chat.css`).
- On pop-out, the in-app modal closes. The FAB switches to a "chat is in its own window" state and
  focuses the pop-out on click. When the pop-out closes, the FAB reverts (polled via `popup.closed`,
  plus a `pagehide` write from the popup — `beforeunload` is unreliable, see the DM resume-email work).
- The pop-out authenticates off the shared Firebase session on the same origin (auth persistence is
  LOCAL). Not signed in → a "Sign in to LDAH Internal first" panel with a link back to `index.html`,
  not a crash or an empty roster.

### Single-chimer rule

Both windows can be open at once, so exactly one must own the unread badge and the chime.

- `localStorage` key `ldahChatActiveWindow` = `{id, ts}`, rewritten every 3s by whichever window owns it.
- The pop-out claims ownership on load and releases it on `pagehide`.
- The main tab claims ownership if the key is missing or its `ts` is older than 10s (covers a popup that
  was force-quit).
- Non-owners still render messages; they just do not chime and do not flash the title.
- Ownership is read via the `storage` event, which fires cross-window and survives a reload of either
  side.

Both windows write presence (`chatPresence/{uid}` → online). Identical values, so the double write is
harmless and no coordination is needed.

---

## 4. Screenshots — paste only

Explicitly **paste-only**. No file picker, no drag-and-drop, no in-app capture button.

### Input
`paste` handler on the message input and the message pane; scans `e.clipboardData.items` for an
`image/*` type. Staff take the shot with Cmd-Shift-4 (Mac) or Win-Shift-S (PC), then Cmd/Ctrl-V.

### Preview and send
A preview strip above the input shows a thumbnail, the file size, and a ✕ to remove it. Whatever is typed
in the message box becomes the caption (optional). Enter or Send uploads, then posts the message. Send is
disabled while the upload is in flight, with a progress state on the button.

### Processing
- Downscale in-browser via canvas: max **1600px** on the long edge, JPEG **quality 0.82**.
- Reject raw images over **10MB** with a toast; reject non-image pastes silently (normal text paste).
- Never upload the original — a 4K screenshot would otherwise be a ~6MB upload.

### Storage and schema
Upload to `chatImages/{convId}/{autoId}.jpg`. The message document gains:

```js
{
  text: '<caption or empty string>',
  hasImage: true,
  imageUrl:  '<download URL>',
  imagePath: 'chatImages/{convId}/{autoId}.jpg',
  imageW: 1600, imageH: 900,
  imageBytes: 184320,
  // ...existing fields unchanged
}
```

`hasImage` exists so list views and the purge can find image messages without parsing `imageUrl`.

### Rendering
- Bubble shows a thumbnail up to 320px wide, with `width`/`height` attributes from `imageW`/`imageH` so
  the message list does not jump as images load.
- Click opens a full-size lightbox: Esc closes, an *Open original* link opens the URL in a new tab.
- Conversation list preview and admin Chat Logs show `📷 Screenshot` (plus the caption if present).
- Client-linked messages log `Chat message: [screenshot]` (plus caption) to Interactions. **The image is
  not copied onto the client record.**

---

## 5. Retention — 90 days

### Access
Storage rules, managed in the console / Rules API (this repo has no `firebase.json` or rules files):

```
match /chatImages/{convId}/{file} {
  allow read:  if request.auth != null;
  allow write: if request.auth != null
               && request.resource.size < 10 * 1024 * 1024
               && request.resource.contentType.matches('image/.*');
}
```

### Auto-delete
A Cloud Storage object lifecycle rule on the bucket — Delete, age 90 days, scoped by prefix so it can
never touch anything else:

```bash
cat > /Volumes/Xcode_Projects/lifecycle-chatimages.json <<'JSON'
{"lifecycle":{"rule":[
  {"action":{"type":"Delete"},
   "condition":{"age":90,"matchesPrefix":["chatImages/"]}}
]}}
JSON

# Read the current policy FIRST — this command replaces the whole lifecycle
# config, so any existing rules must be merged into the JSON above.
gcloud storage buckets describe gs://ldah-932d5.firebasestorage.app --format="json(lifecycle)"

gcloud storage buckets update gs://ldah-932d5.firebasestorage.app \
  --lifecycle-file=/Volumes/Xcode_Projects/lifecycle-chatimages.json
```

> **One-time change outside the repo.** `buckets update --lifecycle-file` **replaces** the entire
> lifecycle configuration — the existing policy must be read and merged first. Requires the
> **"info (Work)"** ADC profile. Confirm with Daniel before running.

### What staff see afterwards
Messages older than 90 days render a **[screenshot expired]** placeholder based on **message age**, not on
a failed image fetch — so there is no broken-image flash while the browser tries and fails. An `onerror`
handler falls back to the same placeholder for edge cases.

### Purge
The existing 13-month **Purge Old Chats** is extended to delete any `imagePath` still present before it
deletes the message documents. Most will already be gone via lifecycle; this is the backstop. Storage
delete failures are caught and logged, never blocking the Firestore purge. The purge audit CSV gains an
image-count column.

---

## 6. Build order and risk

The risk is not the features — it is lifting 2,200 lines out of a 47,874-line file.

1. **Extraction only.** Pure move, no logic edits, in its own commit. Verified by diffing the extracted
   text against what was removed. Smoke-tested on STAGE before anything is built on top.
2. **Pop-out window.** `chat.html`, the Pop Out button, window geometry persistence, single-chimer rule.
3. **Screenshots.** Paste, preview, downscale, upload, render, lightbox.
4. **Retention.** Storage rules, lifecycle rule, expired placeholder, purge extension.

Each step is a separate commit. Live root is never touched, so there is nothing to promote until Daniel
says so.

---

## 7. Test checklist (manual, STAGE, two browser profiles = two staff accounts)

**Extraction (must pass before step 2 starts)**
- [ ] Chat opens, roster shows online/offline with correct presence dots
- [ ] Send and receive text both directions; chime fires; unread badge counts correctly
- [ ] Favorites star, roster search, Show more offline
- [ ] Client linking + the client-mention nudge; Interactions row is written
- [ ] Load older messages pagination
- [ ] Request Screen Sharing → accept → viewer shows the shared screen → stop
- [ ] Admin Chat Logs loads and expands; Purge count is correct
- [ ] Hard-reload with cache cleared (PWA) and repeat the basics

**Pop-out**
- [ ] Pop Out opens the window; the in-app modal closes; the FAB shows the popped-out state
- [ ] Drag to a second monitor, resize, close, reopen → same monitor, same size
- [ ] Resize to ~420px wide — roster collapses, nothing overflows
- [ ] Reload the main tab while the pop-out is open → pop-out keeps working
- [ ] Close the main tab entirely → pop-out keeps working
- [ ] Only one window chimes; force-quit the pop-out → main tab reclaims the chime within ~10s
- [ ] Open `chat.html` directly while signed out → sign-in panel, no crash
- [ ] Screen share request works *from the pop-out*

**Screenshots**
- [ ] Paste a screenshot on Mac (Cmd-Shift-4) and on the PC (Win-Shift-S)
- [ ] Preview strip appears; ✕ removes it; caption sends with it
- [ ] Send with no caption; send with a caption
- [ ] A 4K screenshot lands well under 1MB in Storage
- [ ] A >10MB image is refused with a toast
- [ ] Pasting plain text still behaves normally
- [ ] Thumbnail renders without layout jump; lightbox opens, Esc closes, Open original works
- [ ] Conversation list and Chat Logs show `📷 Screenshot`
- [ ] Client-linked screenshot writes `Chat message: [screenshot]` to Interactions with no image
- [ ] Both windows render an image sent from the other

**Retention**
- [ ] Storage rules block an unauthenticated read
- [ ] Backdate a test message >90 days → `[screenshot expired]` placeholder, no broken image
- [ ] Purge Old Chats deletes image objects and reports the count

---

## 8. Out of scope

File picker · drag-and-drop · in-app screen-capture button · non-image attachments · PDFs or documents in
chat · changes to how live screen sharing works · anything outside `STAGE/` · promoting any of this to
live.
