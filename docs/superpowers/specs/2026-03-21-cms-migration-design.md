# CMS Migration to LDAH-Int — Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Author:** DP Consulting

## Overview

Migrate the LDAH W2 website CMS functionality (currently in `cms.html` and `page-admin.html`) into LDAH-Int as native sections. This eliminates the hardcoded `ldah2024` password by leveraging LDAH-Int's existing Firebase Auth and role-based access control.

## Goals

1. Consolidate CMS into LDAH-Int so staff have one place to manage everything
2. Eliminate the hardcoded `ldah2024` password security risk
3. Make editing easier and cleaner than the current CMS design
4. Zero disruption — W2 cms.html stays active until all CMS users have migrated to LDAH-Int
5. Zero data migration — same Firestore collections, same Firebase project (`ldah-932d5`)

## Non-Goals

- Removing or modifying W2 cms.html during build phase
- Changing the public W2 website behavior
- Adding the AI helper to non-Website sections of LDAH-Int (future work)
- Adding new CMS features not already in cms.html
- Migrating the CMS Dashboard/Analytics tab (LDAH-Int has its own dashboard; CMS-relevant counts like pending volunteer applications will appear as badge counts on the Website nav items instead)

## Access Control

New sections are visible only to users with roles: `superAdmin`, `admin`, `webAdmin`, `appAdmin`.

Uses the existing `data-roles` attribute pattern already in LDAH-Int. The `admin` role is included because existing admin users may currently manage the CMS via the shared password — they should not lose access after migration.

## Navigation Structure

New "Website" nav group in LDAH-Int sidebar:

```
Website
  ├── Team & Board
  ├── Galleries
  ├── Resources
  ├── FAQs
  ├── Events & Programs
  ├── Volunteers
  ├── Website Data
  └── Page Editor
```

## Section Details

### Team & Board

- Card-based layout for team members and board members (two tabs or two visual groups on same page)
- Each card shows: photo, name, title, bio preview
- Click card to edit via modal (labeled fields: "Name", "Title", "Bio", "Photo")
- Drag handle on left of each card to reorder
- "Add New Team Member" / "Add New Board Member" buttons
- Photo upload: click photo area, pick file, see preview before saving
- Delete with confirmation dialog

**Firestore:** `teamMembers`, `boardMembers` (existing, no changes)

### Galleries

- Two clearly labeled sections on one page:
  - **"Who We Are Page Photos"** — with note: "These photos appear in the gallery on the Who We Are page"
  - **"Volunteer Page Photos"** — with note: "These photos appear in the gallery on the Volunteer page"
- Photo grid with drag-to-reorder
- Click to add new photos, click existing to replace
- Max 5MB per photo, auto-compressed
- Delete with confirmation

**Firestore:** `gallery`, `gallery2` (existing, no changes)

### Resources

- Card-based layout for community resources
- Each card shows: title, description preview, category, link
- Search and filter by category
- Click card to edit via modal (labeled fields: "Title", "Description", "URL", "Category", "Logo")
- "Add New Resource" button
- Archive/delete with confirmation
- Export to CSV

**Firestore:** `resources` (existing, no changes)

### FAQs

- Two tabs: Categories and FAQ Items
- Categories: simple list with add/edit/delete
- FAQ Items: card per FAQ showing question preview, assigned category, expand to see answer
- Add/edit via modal with: Question, Answer (rich text), Category (dropdown)

**Firestore:** `categories`, `faqs` (existing, no changes)

### Events & Programs

- Two tabs: One-Time Events and Ongoing Programs
- Events: card per event with date, title, location, signup count
- Programs: card per program with schedule, recurrence info, signup count
- Click card to edit, view signups list within the card/modal
- Add new via modal with clearly labeled fields

**Firestore:** `events`, `recurringEvents`, plus their `signups` subcollections (existing, no changes)

### Volunteers

- Two tabs: Opportunities and Applications
- Opportunities: card per position with title, description
- Applications: filterable list by status (Pending/Approved/Declined), click to review
- Status update buttons directly on application cards

**Firestore:** `volunteerOpportunities`, `volunteers` (existing, no changes)

### Website Data

- Four tabs: Provider Requests, Anti-Bullying Pledges, Event Requests, Contact Messages
- Each tab shows submissions in a clean card list
- Read-only display with relevant fields
- Export to CSV button per tab

**Firestore:** `providers`, `pledges`, `eventRequests`, `contactSubmissions` (existing, no changes)

### Page Editor

- Form-based editor (not visual click-to-edit)
- Page selector tabs: Home, Who We Are, Events, Volunteer, Resources, Contact, Readiness, Special Ed, Military, Pacific (with island sub-pages), Community
- Each page shows labeled fields: "Hero Title", "Hero Subtitle", "Section 1 Title", etc.
- Text fields use rich text toolbar (bold, italic, color, size)
- Photo fields show current image with "Change Photo" button
- Descriptive labels on every field: "This text appears at the top of the Who We Are page"
- Auto-save with green "Saved" indicator

**Firestore:** `pageContent` (existing, no changes)

## UX Principles

1. **Card-based layout** — visual cards, not table rows
2. **Big obvious buttons** — clear labels in LDAH brand colors
3. **Click to edit** — modals with labeled fields, no jargon
4. **Drag to reorder** — grab handle on card left side
5. **Delete with confirmation** — always asks "Are you sure?"
6. **Photo preview** — see the image before saving
7. **Auto-save indicator** — green "Saved" flash after changes
8. **No jargon** — "Team Member Name" not "displayName"
9. **Info tooltips** — (i) icons explaining what each field does and where it shows on the website
10. **Cleaner and easier** than current cms.html — feels like an iPad app, not a spreadsheet

## AI Helper Chatbot

- Floating help button on **bottom-LEFT** (chat button is bottom-right — no overlap)
- Visible only on Website sections
- Context-aware: knows which CMS section user is on
- Q&A cache significantly expanded beyond the current 90+ page-editor patterns to cover all CMS sections (team management, galleries, events, volunteers, resources, FAQs, data export)
- Claude API fallback via existing Cloud Function (`ldahCmsHelp`)
- Built modular for future expansion to all LDAH-Int sections

## Cutover Plan

1. **Build phase:** New CMS sections added to LDAH-Int. W2 cms.html untouched, `ldah2024` password stays active
2. **Testing phase:** Staff test new CMS in LDAH-Int alongside old cms.html. Both work, both hit same Firestore data
3. **Redirect phase:** When satisfied, cms.html gets a redirect message: "The CMS has moved! Log in to LDAH Internal to manage website content."
4. **Retirement:** cms.html removed only when all CMS users have updated passwords and successfully logged into LDAH-Int. Retirement is user-driven, not date-driven.

At no point does the public website break — it reads from the same Firestore collections regardless of which admin tool wrote the data.

## Firestore Collections Summary (All Existing)

| Section | Collection(s) | Migration Required |
|---------|--------------|-------------------|
| Team & Board | `teamMembers`, `boardMembers` | None |
| Galleries | `gallery`, `gallery2` | None |
| FAQs | `categories`, `faqs` | None |
| Events & Programs | `events`, `recurringEvents` + `signups` subcollections | None |
| Volunteers | `volunteerOpportunities`, `volunteers` | None |
| Resources | `resources` | None |
| Website Data | `contactSubmissions`, `providers`, `pledges`, `eventRequests` | None |
| Page Editor | `pageContent` | None |

## Firebase Storage Paths (Existing, No Changes)

| Content Type | Storage Path |
|-------------|-------------|
| Team/Board photos | `teamMembers/{timestamp}_{filename}` |
| Gallery 1 (Who We Are) | `gallery/{timestamp}_{filename}` |
| Gallery 2 (Volunteer) | `gallery2/{timestamp}_{filename}` |
| Resource logos | `resources/{timestamp}_{filename}` |
| Event images | `event-images/{timestamp}_{filename}` |
| Volunteer opportunity images | `volunteerOpportunities/{timestamp}_{filename}` |
| Page Editor photos | `gallery/{page}_{field}_{timestamp}.jpg` |

New LDAH-Int upload code must use these exact paths so the public website continues to find images.

## Page Editor: Pacific Island Sub-Pages

The Pacific page has 6 island sub-pages that must each be editable:
- American Samoa
- CNMI (Northern Mariana Islands)
- FSM (Federated States of Micronesia)
- Guam
- Marshall Islands
- Palau

## Rich Text Editing

Use `contenteditable` with `document.execCommand` — same approach as the existing `page-admin.html` toolbar. No external library needed. Toolbar provides: Bold, Italic, Underline, Heading, Paragraph, Line Break, Color (Dark/Grey/Navy/Teal/Orange/Red/White), Font Size (Small/Normal/Medium/Large/X-Large).

## Technical Notes

- LDAH-Int is a single-page vanilla JS app (`index.html`, currently ~10,800 lines)
- All new sections follow existing patterns: `data-roles` for access, modals for editing, Firestore listeners for real-time updates
- Same Firebase project and config — no new Firebase setup needed
- Firebase Storage paths for photo uploads remain unchanged
