# Flyer → Event Auto-Fill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let CMS staff upload an event flyer and have Claude pre-fill the existing Add Event form (title, description, sessions/dates/times, location) for human verify + save.

**Architecture:** A new additive Cloud Function `extractEventFromFlyer` (LDAH_W2/functions) sends the flyer image/PDF to Claude Haiku 4.5 with a tool-based structured-output schema and returns validated JSON. The STAGE-only CMS panel (LDAH-Internal/STAGE/index.html) uploads the flyer, calls the function, and pre-fills the existing form fields with a highlight for review. Nothing existing changes; the live dashboard has no button until sign-off.

**Tech Stack:** Firebase Cloud Functions gen1 (Node 20), `@anthropic-ai/sdk` (already installed, v0.39.0), Firebase Storage, vanilla JS single-file CMS. Tests: Node built-in `node --test` for pure helpers; a timed integration script for the function; manual STAGE verification for the UI.

## Global Constraints

- **STAGE only** — UI (button + flow) goes in `LDAH-Internal/STAGE/index.html` ONLY, never `index.html` (live), until Daniel signs off after STAGE testing.
- **Model:** `claude-haiku-4-5-20251001` (exact ID used by the existing `ldahCmsHelp` function).
- **Secret:** `ANTHROPIC_API_KEY_FLYER` (Daniel's new $20-capped key) — a SEPARATE secret so it never clobbers the existing `ANTHROPIC_API_KEY` used by `ldahCmsHelp`. Daniel sets it via `firebase functions:secrets:set ANTHROPIC_API_KEY_FLYER` (he pastes the key privately; it never goes in the repo or chat).
- **CORS origin:** `https://danpoahu.github.io` (constant `ALLOWED_ORIGIN` already in index.js; covers both live and STAGE Pages paths).
- **No auto-save** — extraction only pre-fills; the human always reviews and clicks Save.
- **Flyers are public** (no PII) — safe to send to the API.
- **Version bump** LDAH-Int on every push; STAGE keeps `-STAGE` suffix.
- Never `git add -A` in these repos (untracked functions/*.js hold PII); stage exact files only.

---

## File Structure

- **Create** `LDAH_W2/functions/flyerExtraction.js` — pure, testable helpers: the extraction JSON schema (for the Anthropic tool), and `sessionsToSignupDates(sessions)` (maps extracted sessions → canonical year-bearing `signupDates[]`). No Firebase/Anthropic imports → unit-testable in isolation.
- **Create** `LDAH_W2/functions/test/flyer-extraction.test.js` — `node --test` unit tests for the helpers.
- **Modify** `LDAH_W2/functions/index.js` — add `exports.extractEventFromFlyer` (mirrors `ldahCmsHelp` at index.js:96, requires `./flyerExtraction`).
- **Create** `scratchpad/flyer-timing-test.js` (not committed) — timed integration test hitting the deployed function with a real flyer.
- **Modify** `LDAH-Internal/STAGE/index.html` — "Start from a flyer" button in the event modal (near the existing image upload ~line 7080) + the extract/prefill JS (near `cmsPreviewEventImage` ~line 23205).

---

### Task 1: Pure extraction helpers + unit tests

**Files:**
- Create: `LDAH_W2/functions/flyerExtraction.js`
- Test: `LDAH_W2/functions/test/flyer-extraction.test.js`

**Interfaces:**
- Produces: `FLYER_TOOL_SCHEMA` (object — Anthropic tool `input_schema`), `sessionsToSignupDates(sessions: Array<{date,topic}>) : string[]`, `hasYear(s: string): boolean`.

- [ ] **Step 1: Write the failing test**

```js
// LDAH_W2/functions/test/flyer-extraction.test.js
const test = require("node:test");
const assert = require("node:assert");
const { sessionsToSignupDates, hasYear, FLYER_TOOL_SCHEMA } = require("../flyerExtraction");

test("sessionsToSignupDates builds canonical year-bearing labels", () => {
  const out = sessionsToSignupDates([
    { date: "July 8, 2026",  topic: "A-B-C's of Advocacy", time: "5:00 PM" },
    { date: "July 22, 2026", topic: "Parents as Collaborative Leaders", time: "5:00 PM" },
  ]);
  assert.deepStrictEqual(out, [
    "July 8, 2026, 5:00 PM - A-B-C's of Advocacy",
    "July 22, 2026, 5:00 PM - Parents as Collaborative Leaders",
  ]);
});

test("hasYear detects a 4-digit year", () => {
  assert.ok(hasYear("July 8, 2026"));
  assert.ok(!hasYear("July 8th, 5pm"));
});

test("sessionsToSignupDates keeps a year-less date usable (topic preserved)", () => {
  const out = sessionsToSignupDates([{ date: "July 8", topic: "Reading" }]);
  assert.ok(out[0].includes("Reading"));
});

test("FLYER_TOOL_SCHEMA has required top-level fields", () => {
  assert.strictEqual(FLYER_TOOL_SCHEMA.type, "object");
  for (const k of ["title", "description", "sessions"]) {
    assert.ok(FLYER_TOOL_SCHEMA.properties[k], "missing " + k);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd LDAH_W2/functions && node --test test/flyer-extraction.test.js`
Expected: FAIL — `Cannot find module '../flyerExtraction'`.

- [ ] **Step 3: Write minimal implementation**

```js
// LDAH_W2/functions/flyerExtraction.js
"use strict";

// Anthropic tool input_schema — forces Claude to return structured event data.
const FLYER_TOOL_SCHEMA = {
  type: "object",
  properties: {
    title:        { type: "string", description: "Event/series title as printed on the flyer" },
    description:  { type: "string", description: "1-2 sentence summary suitable for the public signup page" },
    modality:     { type: "string", enum: ["virtual", "in-person", "hybrid"] },
    location:     { type: "string", description: "'Zoom' for virtual; venue name otherwise" },
    dayOfWeek:    { type: ["string", "null"] },
    timeStart:    { type: ["string", "null"], description: "e.g. '5:00 PM'" },
    timeEnd:      { type: ["string", "null"], description: "e.g. '6:00 PM'" },
    contactPhone: { type: ["string", "null"] },
    website:      { type: ["string", "null"] },
    sessions: {
      type: "array",
      description: "One entry per dated session on the flyer",
      items: {
        type: "object",
        properties: {
          date:        { type: "string", description: "'Month D, YYYY' — ALWAYS include the year; infer it if not printed" },
          time:        { type: ["string", "null"], description: "e.g. '5:00 PM'" },
          topic:       { type: "string" },
          description: { type: "string" },
        },
        required: ["date", "topic"],
      },
    },
    confidence: { type: ["string", "null"], enum: ["high", "medium", "low", null] },
  },
  required: ["title", "description", "sessions"],
};

function hasYear(s) { return /\b20\d{2}\b/.test(String(s || "")); }

// Map extracted sessions -> canonical signupDates[] the CMS/parsers expect:
// "Month D, YYYY, TIME - Topic". Falls back gracefully if a field is missing.
function sessionsToSignupDates(sessions) {
  if (!Array.isArray(sessions)) return [];
  return sessions.map((s) => {
    const date = String((s && s.date) || "").trim();
    const time = String((s && s.time) || "").trim();
    const topic = String((s && s.topic) || "").trim();
    let label = date;
    if (time) label += ", " + time;
    if (topic) label += " - " + topic;
    return label.trim();
  }).filter(Boolean);
}

module.exports = { FLYER_TOOL_SCHEMA, hasYear, sessionsToSignupDates };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd LDAH_W2/functions && node --test test/flyer-extraction.test.js`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
cd /Volumes/Xcode_Projects/React/LDAH_W2
git add functions/flyerExtraction.js functions/test/flyer-extraction.test.js
git commit -m "feat(flyer): pure extraction schema + sessions->signupDates helper + tests"
```

---

### Task 2: `extractEventFromFlyer` Cloud Function

**Files:**
- Modify: `LDAH_W2/functions/index.js` (add export; require `./flyerExtraction` near the other requires at top)

**Interfaces:**
- Consumes: `FLYER_TOOL_SCHEMA`, `sessionsToSignupDates` from Task 1; `Anthropic` (already required at index.js:3); `ALLOWED_ORIGIN` (index.js:11).
- Produces: HTTPS endpoint `https://us-central1-ldah-932d5.cloudfunctions.net/extractEventFromFlyer`. POST body `{ fileBase64: string, mediaType: "image/jpeg"|"image/png"|"image/webp"|"application/pdf" }`. Returns `{ ok: true, event: { title, description, modality, location, dayOfWeek, timeStart, timeEnd, contactPhone, website, sessions, confidence, signupDates } }` or `{ ok: false, error }`.

- [ ] **Step 1: Add the require near the top of index.js** (after line 3, `const Anthropic = require("@anthropic-ai/sdk");`)

```js
const { FLYER_TOOL_SCHEMA, sessionsToSignupDates } = require("./flyerExtraction");
```

- [ ] **Step 2: Add the function** (place after `exports.ldahCmsHelp` block, ~index.js:163)

```js
// ── Flyer → Event extraction (STAGE CMS "Start from a flyer") ──
// Reads an uploaded event flyer (image or PDF) and returns structured event
// data via Claude tool-use. Additive + CORS-gated to the dashboard origin.
exports.extractEventFromFlyer = functions
  .runWith({ timeoutSeconds: 60, maxInstances: 3, secrets: ["ANTHROPIC_API_KEY_FLYER"] })
  .https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    if (req.method === "OPTIONS") { res.status(204).send(""); return; }
    if (req.method !== "POST") { res.status(405).json({ ok: false, error: "Method not allowed" }); return; }

    try {
      const { fileBase64, mediaType } = req.body || {};
      const okTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      if (!fileBase64 || typeof fileBase64 !== "string" || okTypes.indexOf(mediaType) === -1) {
        res.status(400).json({ ok: false, error: "Missing fileBase64 or unsupported mediaType" });
        return;
      }
      if (fileBase64.length > 9_000_000) { // ~6.7 MB binary
        res.status(413).json({ ok: false, error: "Flyer too large — please use a file under ~6 MB." });
        return;
      }

      const isPdf = mediaType === "application/pdf";
      const mediaBlock = isPdf
        ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: fileBase64 } }
        : { type: "image",    source: { type: "base64", media_type: mediaType,        data: fileBase64 } };

      const system = [
        "You extract structured event details from a Learning & Disabilities Association of Hawaii (LDAH) event flyer.",
        "LDAH flyers are consistent: a title band, a weekday + time range, and one or more dated sessions each with a topic and a short description.",
        "Return ONLY via the provided tool. Rules:",
        "- Every session 'date' MUST include the year in 'Month D, YYYY' form. If the flyer prints a year (usually near the title), use it. If not, infer the nearest upcoming year.",
        "- 'modality' is 'virtual' when the flyer mentions Zoom/online; set 'location' to 'Zoom' in that case.",
        "- Keep the topic verbatim; keep each description to the flyer's wording, trimmed to one or two sentences.",
        "- Set 'confidence' to 'low' if the flyer is blurry or fields are ambiguous.",
      ].join("\n");

      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY_FLYER });
      const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1200,
        system,
        tools: [{ name: "record_event", description: "Record the structured event details from the flyer.", input_schema: FLYER_TOOL_SCHEMA }],
        tool_choice: { type: "tool", name: "record_event" },
        messages: [{ role: "user", content: [mediaBlock, { type: "text", text: "Extract this LDAH event flyer." }] }],
      });

      const toolUse = (response.content || []).find((b) => b.type === "tool_use");
      if (!toolUse || !toolUse.input) {
        res.status(502).json({ ok: false, error: "No structured data returned" });
        return;
      }
      const ev = toolUse.input;
      ev.signupDates = sessionsToSignupDates(ev.sessions);
      res.status(200).json({ ok: true, event: ev });
    } catch (err) {
      console.error("extractEventFromFlyer error:", err && err.message);
      res.status(500).json({ ok: false, error: "Could not read the flyer. Please fill the form in manually." });
    }
  });
```

- [ ] **Step 3: Syntax check**

Run: `cd LDAH_W2/functions && node -c index.js`
Expected: no output (parses).

- [ ] **Step 4: Daniel sets the secret + deploy** (Daniel runs the secret command himself)

```bash
# Daniel, in his terminal — paste the key from your password manager when prompted:
cd /Volumes/Xcode_Projects/React/LDAH_W2
firebase functions:secrets:set ANTHROPIC_API_KEY_FLYER --project ldah-932d5
# then Claude deploys just this function:
firebase deploy --only functions:extractEventFromFlyer --project ldah-932d5
```
Expected: `functions[extractEventFromFlyer(us-central1)] Successful create operation.`

- [ ] **Step 5: Commit**

```bash
cd /Volumes/Xcode_Projects/React/LDAH_W2
git add functions/index.js
git commit -m "feat(flyer): extractEventFromFlyer Cloud Function (Haiku 4.5, tool-use, CORS-gated)"
git push
```

---

### Task 3: Timed integration test against a real flyer

**Files:**
- Create (not committed): `scratchpad/flyer-timing-test.js`

**Interfaces:**
- Consumes: the deployed `extractEventFromFlyer` endpoint; the real July flyer at `scratchpad/july-ll-flyer.jpg` (already downloaded this session; re-download from the event `imageUrl` if absent).

- [ ] **Step 1: Write the timing script**

```js
// scratchpad/flyer-timing-test.js
const fs = require("fs");
const path = process.argv[2] || "scratchpad/july-ll-flyer.jpg";
const b64 = fs.readFileSync(path).toString("base64");
const mediaType = path.endsWith(".pdf") ? "application/pdf" : "image/jpeg";
(async () => {
  const t0 = Date.now();
  const r = await fetch("https://us-central1-ldah-932d5.cloudfunctions.net/extractEventFromFlyer", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Origin": "https://danpoahu.github.io" },
    body: JSON.stringify({ fileBase64: b64, mediaType }),
  });
  const ms = Date.now() - t0;
  const json = await r.json();
  console.log("HTTP", r.status, "· round-trip", ms, "ms");
  console.log(JSON.stringify(json, null, 2));
})().catch((e) => { console.error(e); process.exit(1); });
```

- [ ] **Step 2: Run it and record the number**

Run: `cd /Volumes/Xcode_Projects/React && node LDAH_W2/../scratchpad/flyer-timing-test.js` (use the real scratchpad path)
Expected: HTTP 200; round-trip printed (target: single-digit seconds); `event.sessions` = July 8 (A-B-C's of Advocacy) + July 22 (Parents as Collaborative Leaders); `event.signupDates` both carry ", 2026,". Compare against known Firestore data.

- [ ] **Step 3: If accuracy is off**, adjust the `system` prompt in Task 2 (add a one-shot example of an LDAH flyer's fields), redeploy, re-run. Only escalate the model to `claude-sonnet-5` if Haiku is insufficient. (No commit — this is a throwaway harness.)

---

### Task 4: STAGE CMS — "Start from a flyer" button + prefill

**Files:**
- Modify: `LDAH-Internal/STAGE/index.html` — button near the event-image upload (~7080); JS near `cmsPreviewEventImage` (~23205).

**Interfaces:**
- Consumes: `extractEventFromFlyer` endpoint; existing field IDs `cmsEventTitle`, `cmsEventDescription`, `cmsEventLocation`, `cmsEventDate`, `cmsEventTime`, `cmsEventImageInput`; state `_cmsEventSignupDates`, functions `cmsRenderEventSignupDates()`, `_cmsForceYearOnSignupDate()`, `_showToast()`.

- [ ] **Step 1: Add the button** — inside the event modal, directly above the "Signup Date/Time Options" block (~line 7151), STAGE only:

```html
<div class="field" style="margin-top:1rem;">
  <button type="button" class="btn btn-primary" style="width:100%;padding:10px;font-size:.9rem;"
    onclick="document.getElementById('cmsFlyerInput').click()">✨ Start from a flyer — read &amp; auto-fill</button>
  <input type="file" id="cmsFlyerInput" accept="image/jpeg,image/png,image/webp,application/pdf" style="display:none" onchange="cmsExtractFromFlyer(this)">
  <div id="cmsFlyerStatus" style="margin-top:6px;font-size:.82rem;color:var(--text-soft);"></div>
</div>
```

- [ ] **Step 2: Add the extract + prefill JS** (near `cmsPreviewEventImage`, STAGE only)

```js
window.cmsExtractFromFlyer = async function(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 6 * 1024 * 1024) { alert('Please use a flyer under 6 MB.'); input.value=''; return; }
  var status = document.getElementById('cmsFlyerStatus');
  status.textContent = 'Reading your flyer…';
  try {
    var b64 = await new Promise(function(res, rej){
      var r = new FileReader();
      r.onload = function(){ res(String(r.result).split(',')[1]); };
      r.onerror = rej; r.readAsDataURL(file);
    });
    var resp = await fetch('https://us-central1-ldah-932d5.cloudfunctions.net/extractEventFromFlyer', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ fileBase64: b64, mediaType: file.type })
    });
    var data = await resp.json();
    if (!data.ok) throw new Error(data.error || 'Extraction failed');
    _cmsApplyFlyerExtraction(data.event);
    status.innerHTML = '<span style="color:#0E7490;font-weight:700;">Filled in from your flyer — please verify everything below.</span>';
  } catch (e) {
    status.innerHTML = '<span style="color:#B45309;">Couldn\'t read the flyer automatically — please fill the form in manually.</span>';
  } finally { input.value=''; }
};

function _cmsSetField(id, val, highlight) {
  var el = document.getElementById(id);
  if (!el || !val) return;
  el.value = val;
  if (highlight) { el.style.boxShadow = 'inset 0 0 0 2px #67E8F9'; setTimeout(function(){ el.style.boxShadow=''; }, 6000); }
}

function _cmsApplyFlyerExtraction(ev) {
  _cmsSetField('cmsEventTitle', ev.title, true);
  _cmsSetField('cmsEventDescription', ev.description, true);
  if (ev.modality !== 'virtual') _cmsSetField('cmsEventLocation', ev.location, true);
  else _cmsSetField('cmsEventLocation', 'Zoom', true);
  // First session date/time seed the primary event date/time inputs
  if (Array.isArray(ev.sessions) && ev.sessions[0]) {
    var d0 = _rsParseSessionDate(ev.sessions[0].date);
    if (d0) _cmsSetField('cmsEventDate', d0.getFullYear()+'-'+String(d0.getMonth()+1).padStart(2,'0')+'-'+String(d0.getDate()).padStart(2,'0'), true);
    if (ev.timeStart) _cmsSetField('cmsEventTime', ev.timeStart, true);
  }
  // Signup dates — prefer the function's canonical signupDates, run each through the year-guard
  var dates = Array.isArray(ev.signupDates) && ev.signupDates.length ? ev.signupDates
            : (ev.sessions || []).map(function(s){ return (s.date||'') + (s.time?(', '+s.time):'') + (s.topic?(' - '+s.topic):''); });
  _cmsEventSignupDates = dates.map(function(s){ return _cmsForceYearOnSignupDate(s).value; });
  _cmsSignupDateYearAddedIdx = -1;
  cmsRenderEventSignupDates();
}
```

- [ ] **Step 3: Bump STAGE version** — change the `buildVersion` span to the next `-STAGE` value.

- [ ] **Step 4: Commit (STAGE file only)**

```bash
cd /Volumes/Xcode_Projects/React/LDAH-Internal
git add STAGE/index.html
git commit -m "feat(flyer): STAGE CMS 'Start from a flyer' — upload, extract, prefill+highlight"
git push
```

---

### Task 5: Daniel STAGE test → sign-off → live

- [ ] **Step 1:** Daniel hard-refreshes the STAGE dashboard, opens Add Event, clicks "Start from a flyer," uploads the July flyer (or a new one), and confirms fields fill in correctly and are highlighted.
- [ ] **Step 2:** Daniel edits anything the AI got wrong, Saves, and confirms the event + signupDates (year present) look right in Firestore and on the public site.
- [ ] **Step 3:** Fix any issues found (adjust prompt/mapping/UI), re-deploy/re-push to STAGE, re-test.
- [ ] **Step 4:** On Daniel's explicit approval, promote the UI to live: copy the STAGE button + JS into `LDAH-Internal/index.html`, bump the live version, commit + push. (The Cloud Function is already deployed and shared.)

---

## Self-Review

**Spec coverage:** upload→extract→prefill (Tasks 3–4), schema (Task 1), CF w/ Haiku + secret + CORS gate (Task 2), timed test (Task 3), fallback (Task 4 error branch), STAGE-only + sign-off (Task 5), reuse-flyer-as-image (existing upload path, noted), year-guard reuse (Task 4 `_cmsForceYearOnSignupDate`). Covered.

**Placeholder scan:** none — all steps carry real code/commands.

**Type consistency:** `sessionsToSignupDates`/`hasYear`/`FLYER_TOOL_SCHEMA` names match across Tasks 1–2; endpoint body `{fileBase64, mediaType}` and response `{ok, event}` match between Tasks 2–4; `_cmsForceYearOnSignupDate` returns `{value}` (matches its v145.4.10 definition).

**Note / decision for Daniel:** the org already has an `ANTHROPIC_API_KEY` secret (used by `ldahCmsHelp`). This plan uses a SEPARATE secret `ANTHROPIC_API_KEY_FLYER` set to your new $20-capped key, so the flyer feature is isolated and capped and the existing CMS helper is untouched. At go-live you could consolidate onto one org key if desired.
