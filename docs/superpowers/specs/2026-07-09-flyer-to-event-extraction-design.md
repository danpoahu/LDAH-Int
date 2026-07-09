# Flyer → Event Auto-Fill — Design Spec

**Date:** 2026-07-09
**Status:** Draft for review
**Author:** Daniel Pellegrini (Oahu App Design) + Claude
**Scope:** STAGE only until explicit go-live sign-off

---

## 1. Summary

Let CMS staff **upload an event flyer** and have Claude read it and **pre-fill the existing Add Event form** — title, description, session dates/times/topics, location — for the staffer to **verify and save**. Replaces ~5 minutes of manual typing per event with a ~5-second read plus a quick review, and eliminates the year-less date-entry mistakes that caused the July 2026 attendance/reminder bugs *at the source*.

Origin: the "solve it before it's created" conversation after fixing the year-less signup-date incident. Proven feasible by a throwaway extraction test on the real July Learning Labs flyer, which matched Firestore exactly.

## 2. Goals

- Upload flyer → auto-fill the **existing** CMS Add Event form → human verifies → save (existing save path).
- Reuse what already exists: the event form, Firebase Storage `event-images`, and the `_cmsForceYearOnSignupDate` guard (v145.4.10).
- Keep the human as the final gate — the AI output is always a draft.

## 3. Non-goals (YAGNI)

- **No auto-save** — every extraction is human-verified before it becomes an event.
- No bulk / multi-flyer upload.
- No editing existing or past events from a flyer.
- No QR-code / registration-link parsing.
- No live deployment until Daniel signs off.

## 4. User flow

1. In the CMS Add Event modal (STAGE), a **"✨ Start from a flyer"** button sits at the top.
2. Staff picks a flyer file — **JPG / PNG / PDF**.
3. The flyer uploads to Firebase Storage (existing `event-images` path); a **"Reading your flyer…"** spinner shows (~3–6 s).
4. The client calls the `extractEventFromFlyer` Cloud Function with the uploaded file's Storage path.
5. The CF fetches the flyer, calls Claude (**Haiku 4.5**) with a structured-output schema + one reference LDAH flyer, and returns validated JSON.
6. The client maps the JSON into the **existing** form fields; AI-filled fields get a subtle **highlight + "AI · verify" tag**. Signup dates pass through `_cmsForceYearOnSignupDate` as a final safety net.
7. The uploaded flyer is also set as the event's **display image** (`imageUrl`) — one upload, two jobs.
8. Staff review, edit anything, and click **Save** — the existing `cmsSaveEvent` path; nothing about saving changes.

## 5. Extraction schema (Claude structured output)

```jsonc
{
  "title": "string",
  "description": "string",
  "modality": "virtual | in-person | hybrid",
  "location": "string",             // "Zoom" for virtual
  "dayOfWeek": "string | null",
  "timeStart": "string | null",     // "5:00 PM"
  "timeEnd":   "string | null",     // "6:00 PM"
  "contactPhone": "string | null",
  "website": "string | null",
  "sessions": [
    { "date": "Month D, YYYY", "topic": "string", "description": "string" }
  ],
  "_confidence": { "<field>": "high | medium | low" }  // optional, drives highlighting
}
```

- The CF post-processes `sessions[]` → **`signupDates[]`** in the canonical `"Month D, YYYY, TIME - Topic"` format (year always present), then the client's year-guard is a redundant final check.
- If a flyer omits the year (rare — most print it), the extractor infers the **nearest-occurrence** year.

Example (from the real July flyer, verified against Firestore):
```json
{
  "title": "Learning Labs — Leadership Training for Parents",
  "modality": "virtual", "location": "Zoom",
  "dayOfWeek": "Wednesday", "timeStart": "5:00 PM", "timeEnd": "6:00 PM",
  "contactPhone": "808-536-9684", "website": "www.LDAHawaii.org",
  "sessions": [
    { "date": "July 8, 2026",  "topic": "A-B-C's of Advocacy", "description": "Build confidence, understand your rights, communicate effectively — one letter at a time." },
    { "date": "July 22, 2026", "topic": "Parents as Collaborative Leaders", "description": "Build your leadership style, be a part of a collaborative partnership with your IEP Team while advocating for your child." }
  ]
}
```

## 6. Cloud Function: `extractEventFromFlyer`

- **Location:** `LDAH_W2/functions` (gen1). New function — no change to any live behavior.
- **Trigger:** HTTPS `onCall` (or `onRequest`), **auth-gated to logged-in LDAH staff** (verify Firebase Auth ID token; reject anonymous).
- **Input:** Storage path (or short-lived signed URL) of the uploaded flyer (image or PDF).
- **Process:**
  1. Fetch the file via Admin SDK → base64.
  2. Call the Anthropic Messages API: `claude-haiku-4-5`, a system prompt describing the LDAH flyer layout + **one few-shot reference flyer**, the image/document content block, and a **tool with `input_schema`** to force the JSON above (structured output).
  3. Validate the returned JSON against the schema; map `sessions` → `signupDates`.
- **Output:** validated JSON (+ any low-confidence flags).
- **Secret:** `ANTHROPIC_API_KEY` in **Secret Manager** (`firebase functions:secrets:set`, set by Daniel; never in the repo or chat).
- **Logging:** compact usage log (tokens/cost/event id) to console or a small collection. No PII — flyers are public.
- **Guardrails:** request timeout; one model call per upload; graceful failure (§8).

## 7. Model & cost

- **Model: Claude Haiku 4.5** — fastest, lowest cost, vision-capable; more than enough for LDAH's consistent flyer layout. Escalate to Sonnet only if accuracy ever slips.
- **Cost:** ~pennies per flyer; ~3 flyers/month → cents/month. The **$20 account cap** is ~50–100× realistic spend.
- **Latency:** ~3–6 s typical; UI shows a spinner so it feels expected.

## 8. Error handling / fallback

- If the CF errors, times out, or returns low confidence: the form **stays fully usable**, a non-blocking notice appears ("Couldn't read the flyer automatically — please fill it in manually"), and staff enter data exactly as they do today. Nothing breaks.
- Per-field low confidence → stronger highlight so the reviewer's eye goes there first.
- **Never auto-saves.** The human is always the gate.

## 9. Security & privacy

- **Flyers are public marketing materials — no PII** — so sending them to the Anthropic API is low-risk (unlike participant documents).
- CF is **auth-gated** (staff only).
- API key lives **only** in Secret Manager.
- No key or flyer content committed to the repo; logs hold only ordinary usage metrics.

## 10. STAGE-only rollout

- Build the CF (new/STAGE-safe) + the CMS panel in `STAGE/index.html` **only**.
- Run a **timed throwaway test** with the real key against real flyers to confirm latency + quality.
- Promote to live **only** after Daniel's explicit sign-off (copy STAGE→live per the usual promotion, strip banner/version markers).

## 11. Testing plan

- **Unit:** schema validation; `sessions → signupDates` mapping (year always present); year-inference edge cases (year-less flyer, year-boundary).
- **Integration:** run the CF against the real LDAH flyers we have (July LL confirmed; also the past ones) and diff extracted JSON vs. known Firestore data.
- **UX:** prefill → highlight → edit → save round-trips through the existing form; fallback path when extraction fails.
- **Timing:** measure real round-trip latency with the live key.

## 12. Defaults to confirm at review

1. **Model = Haiku 4.5** (recommended).
2. **Reuse the flyer as the event `imageUrl`** (one upload serves extraction + display image).
3. **Title = flyer-as-written**, staff adjusts to the "For the Month of…" house style in the verify step (can teach the model the house convention later).

## 13. Rough build phases (for the implementation plan)

1. **CF** `extractEventFromFlyer` — schema, prompt + few-shot, secret, auth gate.
2. **Timed test harness** against real flyers (latency + accuracy).
3. **CMS (STAGE):** "Start from a flyer" button, upload + spinner, call CF, prefill + highlight, set `imageUrl`.
4. **Fallback + polish** (error notice, per-field confidence highlighting).
5. **Daniel STAGE test → sign-off → live.**
