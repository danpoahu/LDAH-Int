# Multiple Children on the Contact Form (LDAH-Int)

**Date:** 2026-06-30
**Status:** Approved (Daniel)
**Ship to:** live (`v145.1.0`) + STAGE (`v146.1.0-STAGE`)

## Problem

The contact form (Contacts → Add/Edit) exposes only **one** child. The data model
already stores `children[]` (array of `{name, ageRange, gender, ethnicity,
disabilityCategories, addedAt}`), but the form only ever reads/writes `children[0]`.
There is no way to enter a 2nd child when adding (or editing) a contact, even though
families served by LDAH frequently have more than one child with a disability, and
grant/federal reporting counts are per-child.

## Decisions (Daniel)

- **Full demographics per child** — each additional child captures the same fields as
  the first (name, age range, gender, ethnicity, disability categories).
- **Add + edit** — opening any contact lists all existing children; each editable;
  add/remove supported.

## Design

### UI
- Keep the existing "Child Information" section as **Child 1** (unchanged fixed
  fields: `ctChildName`, `ctChildAgeRange`, `ctChildGender`, `ctEthnicity`,
  `ctDisabilityGrid`). This minimizes risk to working code.
- Below it, add a container `#ctMoreChildren` and a **"+ Add another child"** button.
  Each additional child renders as a `.ct-child-card` with the same five fields
  (class-based selectors, not IDs, to avoid collisions) and a **"× Remove"** button.
- On **open (edit)**: bind Child 1 from `children[0]` as today; render one card in
  `#ctMoreChildren` for each of `children[1..]`.
- On **add**: Child 1 blank, no extra cards (button adds them).

### Data
- Pure helper **`LDAHFormat.buildChildren(formChildren, prevChildren)`** in the shared
  `formatters.js` (root + STAGE kept identical):
  - `formChildren` = `[child1, ...extraCards]` in order, each
    `{name, ageRange, gender, ethnicity, disabilityCategories[]}`.
  - Merges each form child over `prevChildren[i]` (by index) so `addedAt` and any
    non-form fields survive a round-trip.
  - **Age-range preservation:** if `prevChildren[i].ageRange` canonicalizes to the
    same government bucket as the form value (e.g. stored `"12-14"` vs dropdown
    `"13-17"`), keep the stored, more-specific value (continues the
    age-range-schema-migration guard).
  - Drops a child that is entirely empty (no name/age/gender/ethnicity/disability).
  - Pure — does **not** stamp `addedAt`; the caller stamps `addedAt` (Timestamp.now())
    on any returned child lacking it.
- On save (both the edit and new-contact branches), `data.children =
  ctCollectChildrenForSave(prevChildren)`. Legacy flat top-level fields
  (`childAgeRange/childGender/ethnicity/disabilityCategories`) continue to mirror
  Child 1 (unchanged), so existing readers/reporting keep working.
- Because the form writes the whole array explicitly via read-modify-write, it cannot
  reintroduce the enrichment append-dupe quirk (a separate code path).

### Scope
- LDAH-Int contact form only (`ct*`). The quick-add modal and W2/App signup forms are
  unchanged.

### Testing
- TDD `buildChildren` in `test/child-helpers.test.js` (`node --test`): index merge,
  addedAt/non-form-field preservation, age-range bucket preservation, empty-drop,
  new vs existing, order.
- Manual `node --check` on touched inline script blocks; smoke on STAGE.

## Out of scope
- Per-child UI on W2/App public forms.
- Backfilling/migrating existing multi-child data (none needed; additive).
