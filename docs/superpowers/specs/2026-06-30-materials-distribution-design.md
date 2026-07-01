# Materials Distribution Tracking (LDAH-Int)

**Date:** 2026-06-30
**Status:** Approved (Daniel)
**Ship to:** live (`v145.2.0`) + STAGE (`v146.2.0-STAGE`)

## Problem / goal
LDAH distributes documents & supplies to families both at events and one-on-one
(email / phone). Today the Event Summary tracks materials as a fixed 8-row number
table (# Packed / # Disseminated), hardcoded in two places; interactions capture
nothing. We want, for **grant/federal reporting**: an admin-maintained materials
list, "Other" free-text capture that is individually auditable at year-end, and the
ability to record distributions during an interaction.

## Decisions (Daniel)
- Materials become an **admin-maintained list** (things change seasonally) — reuse the
  existing Manage Lists (`lookupLists`) admin system as a new **Materials** category.
- **One shared master list** feeds both Event Summary and interactions.
- Event Summary: **2 "Other"** free-text rows (name + # Packed + # Disseminated).
- Interaction: **distributed column only** (no "packed") + 2 "Other" rows (name + # distributed).
- Every "Other" entry must be **individually auditable at year-end** (name + count on a
  record carrying date / channel / grant / contact / owner).
- The **year-end audit report** is a **follow-up** (data captured first).

## Design

### A. Materials managed list
- New `lookupLists/materials` doc `{ items: [labels], updatedAt, updatedBy }`, seeded (if
  absent) with the current 8 labels: Agency Brochure, Education & Training Brochure, What
  is a Learning Disability Brochure, Understanding ADHD Brochure, Understanding Dyslexia
  Brochure, Understanding Autism, Flyers, Newsletters.
- Add `materials: []` to `_lookupLists`; a **Materials** section in the Manage Lists admin
  UI reusing the existing `addLookupItem/renderLookupList/saveLookupList` (plain strings).
- **Keying:** counts are stored keyed by a **slug of the label** (`materialSlug`: lower-case,
  non-alphanumeric → `_`, collapse repeats, trim) so map keys are safe and stable per label.
  Renaming a material does NOT retroactively relabel past counts (rare; use retire+add
  mid-year). TDD `materialSlug`.
- **Migration:** the 3 existing event docs use legacy camelCase keys
  (`agencyBrochure`…`newsletters`). A one-off script rewrites their
  `materialsPacked`/`materialsDisseminated` (in `summary` and `sessionSummaries[date]`) from
  camelCase → `materialSlug(label)`. Idempotent; `--commit` to write; backup to Reports.

### B. Event Summary
- Replace the hardcoded `_materialKeys` (render at ~27543 + save at ~27814) with rows built
  from `_lookupLists.materials`, keyed by `materialSlug(label)`. Two columns unchanged
  (# Packed / # Disseminated). Input ids `esMatPacked_<slug>` / `esMatDiss_<slug>`.
- Add **2 "Other" rows**: `esMatOtherName_1/2`, `esMatOtherPacked_1/2`, `esMatOtherDiss_1/2`.
- Save `materialsPacked` / `materialsDisseminated` (slug-keyed) as today, plus
  `materialsOther: [{ name, packed, disseminated }]` (rows with a non-empty name only),
  into `summary` / `sessionSummaries[date]`.

### C. Interaction "Materials Distributed" add-on
- Opt-in section in the New Interaction modal mirroring the Case-Advocacy toggle: checkbox
  `intMaterials` → `_toggleMaterialsPicker('int')` reveals `intMaterialsPicker`, which lists
  the managed materials as **# distributed** number inputs (class `.intMatDistrib`,
  `data-slug`) + **2 "Other"** rows (name + # distributed).
- Built into the interaction `data` before `add` (no post-add side effect):
  `materialsDistributed: { slug: n>0 }` and `materialsOther: [{ name, count }]` (named rows
  only). Omit both keys when nothing was logged.
- Reset clears the section in `resetInteractionModal`.
- Reporting slice comes for free: interaction already stores `channel` (email/phone),
  `grantProgram`, `contactName/contactId`, `owner`, `createdAt`.

### Shared helper (TDD, in `formatters.js` root+STAGE)
- `materialSlug(label)` → stable slug.
- `collectDistribution(managedCounts, otherRows)` → `{ counts: {slug:n>0}, other: [{name,count}] }`,
  dropping zero counts and unnamed "Other" rows. Used by the interaction save; the event
  summary reuses `materialSlug` + its own two-column collection inline.

## Out of scope (follow-ups)
- **Year-end audit report** enumerating every "Other" line + per-material totals (next build).
- W2/App public forms.

## Testing
- `test/materials-helpers.test.js`: `materialSlug` (spaces, `&`, `.`, case, collapse) and
  `collectDistribution` (drops zeros/blank names, keeps named-only, string→number).
- `node --check` all inline script blocks (both files); simulate against real data;
  migrate the 3 legacy records with backup.
