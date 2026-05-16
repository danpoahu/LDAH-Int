# CMS Migration to LDAH-Int — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all CMS functionality from W2 `cms.html` and `page-admin.html` into LDAH-Int as native sections, using existing Firebase Auth and role-based access control.

**Architecture:** Single-page vanilla JS app (`index.html`). New sections follow existing patterns: `data-roles` for access control, `.overlay.active` modals, `.field` grid forms, `_showToast()` feedback, Firestore CRUD, Firebase Storage uploads. Same Firebase project (`ldah-932d5`), same collections, zero data migration.

**Tech Stack:** Vanilla JS, Firebase Firestore + Storage + Auth, HTML5 drag-and-drop, `contenteditable` + `document.execCommand` for rich text

**Spec:** `docs/superpowers/specs/2026-03-21-cms-migration-design.md`

**Backup:** Branch `pre-cms-migration-backup` preserves current state

---

## File Map

All changes are in a single file:

- **Modify:** `/Volumes/Xcode_Projects/React/LDAH-Internal/index.html` (~10,800 lines)
  - CSS additions: after existing styles (~line 2950)
  - HTML additions: new nav group after Admin nav group (~line 3063), new sections before closing `</main>`
  - JS additions: after existing JS functions, before closing `</script>`

---

## Shared Patterns Reference

Every task below uses these patterns from the existing codebase. Read these before implementing any task.

### Nav Link Pattern
```html
<!-- In sidebar, inside .nav-group-body -->
<a href="javascript:void(0)" data-section="sectionName" data-roles="superAdmin,admin,webAdmin,appAdmin">Label</a>
```

### Section Pattern
```html
<section id="sectionNameSection" style="display:none;">
  <h2>Section Title</h2>
  <!-- content -->
</section>
```

### Section Routing (add to existing nav click handler ~line 5533)
```javascript
} else if (section === 'sectionName') {
  _showFullWidth(document.getElementById('sectionNameSection'), loadSectionName);
}
```

### Modal Pattern
```html
<div class="overlay" id="snOverlay">
  <div class="modal">
    <div class="modal-header">
      <div class="left"><img src="logo_transparent.png" alt="LDAH logo"/><div>Modal Title</div></div>
      <button class="close" type="button" onclick="closeSnModal()">&times;</button>
    </div>
    <div class="modal-body">
      <div class="field"><label>Field Name</label><input id="snFieldName"></div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeSnModal()">Cancel</button>
      <button class="btn btn-primary" onclick="saveSn()">Save</button>
    </div>
  </div>
</div>
```

### CRUD Pattern
```javascript
// Load
var snap = await db.collection('collectionName').orderBy('field').get();
var items = []; snap.forEach(doc => items.push({ id: doc.id, ...doc.data() }));

// Create
await db.collection('collectionName').add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });

// Update
await db.collection('collectionName').doc(id).update(data);

// Delete
await db.collection('collectionName').doc(id).delete();

// After any mutation:
loadSectionName(); // reload list
_showToast('Saved!', '#16A34A');
```

### Photo Upload Pattern
```javascript
var storagePath = 'folder/' + Date.now() + '_' + file.name;
var ref = storage.ref(storagePath);
await ref.put(file);
var url = await ref.getDownloadURL();
// Save url to Firestore document
```

### Drag-to-Reorder Pattern
```javascript
// On each card: draggable="true" data-id="docId"
// ondragstart: store dragged element
// ondragover: e.preventDefault(), add .drag-over class
// ondragleave: remove .drag-over class
// ondrop: splice array, batch update order fields in Firestore
var batch = db.batch();
items.forEach((item, i) => batch.update(db.collection('name').doc(item.id), { order: i }));
await batch.commit();
```

### Escape HTML (existing function)
```javascript
rsEscape(str) // use this for all user-supplied text rendered as HTML
```

### Toast (existing function)
```javascript
_showToast('Message', '#16A34A'); // green success
_showToast('Error: ' + err.message, '#DC2626'); // red error
```

---

## Task 1: Website Nav Group + CSS Foundation

**Files:** Modify `index.html`
**What:** Add the "Website" nav group to the sidebar and all shared CMS CSS styles.

- [ ] **Step 1: Add CSS for CMS sections**

Add after existing styles (~line 2950), before `</style>`. These shared styles will be used by all CMS sections:

```css
/* ── CMS Website Sections ── */
.cms-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; margin-top: 16px; }
.cms-card {
  background: white; border-radius: var(--radius); padding: 16px;
  box-shadow: var(--shadow-soft); border: 1px solid rgba(8,145,178,.08);
  cursor: pointer; transition: .18s ease; position: relative;
}
.cms-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
.cms-card .cms-card-photo {
  width: 80px; height: 80px; border-radius: 14px; object-fit: cover;
  background: var(--sand-light); border: 2px solid rgba(8,145,178,.12);
}
.cms-card .cms-card-title { font-weight: 800; font-size: 1.05rem; color: var(--text-dark); margin-bottom: 2px; }
.cms-card .cms-card-subtitle { font-size: 0.88rem; color: var(--text-soft); }
.cms-card .cms-card-bio { font-size: 0.85rem; color: var(--text-soft); margin-top: 6px; max-height: 3.6em; overflow: hidden; }
.cms-card .cms-card-row { display: flex; align-items: center; gap: 12px; }
.cms-card .cms-drag-handle {
  position: absolute; left: -4px; top: 50%; transform: translateY(-50%);
  cursor: grab; font-size: 1.2rem; color: var(--text-soft); opacity: 0.4; padding: 8px;
}
.cms-card .cms-drag-handle:hover { opacity: 1; }
.cms-card.dragging { opacity: 0.4; }
.cms-card.drag-over { border: 2px dashed var(--ocean-mid); }

.cms-toolbar {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  margin-bottom: 16px; padding: 12px 16px;
  background: white; border-radius: var(--radius); box-shadow: var(--shadow-soft);
}
.cms-toolbar input[type="search"] {
  flex: 1; min-width: 200px; padding: 10px 14px; border-radius: 14px;
  border: 1px solid rgba(8,145,178,.18); background: var(--sand-light);
  font-size: 0.95rem; outline: none;
}
.cms-toolbar select {
  padding: 10px 14px; border-radius: 14px;
  border: 1px solid rgba(8,145,178,.18); background: var(--sand-light);
  font-size: 0.95rem; outline: none;
}

.cms-tabs {
  display: flex; gap: 4px; margin-bottom: 16px;
  background: white; border-radius: var(--radius); padding: 4px;
  box-shadow: var(--shadow-soft); width: fit-content;
}
.cms-tab {
  padding: 8px 18px; border-radius: 14px; border: none; cursor: pointer;
  font-weight: 700; font-size: 0.9rem; background: transparent;
  color: var(--text-soft); transition: .15s;
}
.cms-tab.active { background: var(--ocean-deep); color: white; }

.cms-info-tip {
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; border-radius: 50%; background: rgba(8,145,178,.12);
  color: var(--ocean-deep); font-size: 0.7rem; font-weight: 900; cursor: help;
  margin-left: 6px;
}
.cms-info-tip:hover { background: var(--ocean-mid); color: white; }

.cms-empty { text-align: center; padding: 48px 24px; color: var(--text-soft); }
.cms-empty p { font-size: 1.1rem; margin-bottom: 12px; }

.cms-photo-upload {
  width: 100%; height: 160px; border: 2px dashed rgba(8,145,178,.25);
  border-radius: 14px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; cursor: pointer;
  background: var(--sand-light); transition: .15s; position: relative; overflow: hidden;
}
.cms-photo-upload:hover { border-color: var(--ocean-mid); background: rgba(8,145,178,.04); }
.cms-photo-upload img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.cms-photo-upload .cms-photo-label {
  font-size: 0.85rem; color: var(--text-soft); font-weight: 600;
  position: relative; z-index: 1; background: rgba(255,255,255,.85);
  padding: 4px 12px; border-radius: 8px;
}

.cms-saved-indicator {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 999px; font-size: 0.82rem; font-weight: 700;
  background: rgba(16,163,127,.12); color: #10A37F;
  opacity: 0; transition: opacity .3s;
}
.cms-saved-indicator.show { opacity: 1; }

.cms-section-note {
  font-size: 0.88rem; color: var(--text-soft); padding: 8px 14px;
  background: rgba(8,145,178,.06); border-radius: 10px; margin-bottom: 12px;
  border-left: 3px solid var(--ocean-mid);
}

.cms-badge-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px; border-radius: 999px; padding: 0 6px;
  background: var(--sunset-coral); color: white; font-size: 0.72rem; font-weight: 800;
  margin-left: 6px;
}
```

- [ ] **Step 2: Add Website nav group HTML**

Add after the Admin nav group (~line 3063), before closing `</nav>`:

```html
<div class="nav-group collapsed" id="navGroupWebsite" data-roles="superAdmin,admin,webAdmin,appAdmin">
  <div class="nav-group-header" onclick="toggleNavGroup('website')">Website</div>
  <div class="nav-group-body">
    <a href="javascript:void(0)" data-section="cmsTeamBoard" data-roles="superAdmin,admin,webAdmin,appAdmin">Team & Board</a>
    <a href="javascript:void(0)" data-section="cmsGalleries" data-roles="superAdmin,admin,webAdmin,appAdmin">Galleries</a>
    <a href="javascript:void(0)" data-section="cmsResources" data-roles="superAdmin,admin,webAdmin,appAdmin">Resources</a>
    <a href="javascript:void(0)" data-section="cmsFaqs" data-roles="superAdmin,admin,webAdmin,appAdmin">FAQs</a>
    <a href="javascript:void(0)" data-section="cmsEvents" data-roles="superAdmin,admin,webAdmin,appAdmin">Events & Programs</a>
    <a href="javascript:void(0)" data-section="cmsVolunteers" data-roles="superAdmin,admin,webAdmin,appAdmin">Volunteers</a>
    <a href="javascript:void(0)" data-section="cmsWebData" data-roles="superAdmin,admin,webAdmin,appAdmin">Website Data</a>
    <a href="javascript:void(0)" data-section="cmsPageEditor" data-roles="superAdmin,admin,webAdmin,appAdmin">Page Editor</a>
  </div>
</div>
```

- [ ] **Step 3: Add `toggleNavGroup` support for 'website'**

The existing `toggleNavGroup` function (~line 5499) is hardcoded for only `'main'` and `'admin'`. Add a `'website'` case. Find the function and add:

```javascript
} else if (group === 'website') {
  var wg = document.getElementById('navGroupWebsite');
  if (wg) wg.classList.toggle('collapsed');
}
```

Alternatively, if you can refactor the function to be generic (using `'navGroup' + group.charAt(0).toUpperCase() + group.slice(1)`), that's cleaner and will handle any future nav groups automatically. But if the existing branches have special logic, just add the third branch.

- [ ] **Step 4: Test nav group visibility**

Log in as `superAdmin` — Website group should appear in sidebar, collapsed.
Log in as `dailyUser` — Website group should be hidden (verify `applyRolePermissions()` hides it).
Click "Website" header — group should expand, showing all 8 links.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add Website nav group and shared CMS styles"
```

---

## Task 2: Team & Board Section

**Files:** Modify `index.html`
**What:** Card-based management for team and board members with photo upload and drag-to-reorder.

- [ ] **Step 1: Add Team & Board section HTML**

Add before closing `</main>`:

```html
<section id="cmsTeamBoardSection" style="display:none;">
  <h2>Team & Board</h2>

  <div class="cms-tabs" id="cmsTeamBoardTabs">
    <button class="cms-tab active" onclick="cmsSwitchTeamBoardTab('team')">Team Members</button>
    <button class="cms-tab" onclick="cmsSwitchTeamBoardTab('board')">Board Members</button>
  </div>

  <!-- Team Tab -->
  <div id="cmsTeamTab">
    <div class="cms-toolbar">
      <button class="btn btn-primary" onclick="cmsOpenPersonModal('team')">Add New Team Member</button>
    </div>
    <div class="cms-cards" id="cmsTeamCards">
      <div class="cms-empty"><p>Loading team members...</p></div>
    </div>
  </div>

  <!-- Board Tab -->
  <div id="cmsBoardTab" style="display:none;">
    <div class="cms-toolbar">
      <button class="btn btn-primary" onclick="cmsOpenPersonModal('board')">Add New Board Member</button>
    </div>
    <div class="cms-cards" id="cmsBoardCards">
      <div class="cms-empty"><p>Loading board members...</p></div>
    </div>
  </div>

  <!-- Person Edit Modal -->
  <div class="overlay" id="cmsPersonOverlay">
    <div class="modal">
      <div class="modal-header">
        <div class="left"><img src="logo_transparent.png" alt="LDAH logo"/><div id="cmsPersonModalTitle">Add Team Member</div></div>
        <button class="close" type="button" onclick="cmsClosePersonModal()">&times;</button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="cmsPersonEditId">
        <input type="hidden" id="cmsPersonEditType">
        <div class="field"><label>Name</label><input id="cmsPersonName" placeholder="Full name"></div>
        <div class="field"><label>Title / Role</label><input id="cmsPersonRole" placeholder="e.g. Executive Director"></div>
        <div class="field" id="cmsPersonPhoneField"><label>Phone</label><input id="cmsPersonPhone" placeholder="Phone number"></div>
        <div class="field" id="cmsPersonEmailField"><label>Email</label><input id="cmsPersonEmail" placeholder="Email address"></div>
        <div class="field" style="grid-column: span 2;">
          <label>Photo <span class="cms-info-tip" title="This photo appears on the Who We Are page of the website">i</span></label>
          <div class="cms-photo-upload" id="cmsPersonPhotoUpload" onclick="document.getElementById('cmsPersonPhotoInput').click()">
            <span class="cms-photo-label">Click to upload photo</span>
          </div>
          <input type="file" id="cmsPersonPhotoInput" accept="image/*" style="display:none" onchange="cmsPreviewPersonPhoto(this)">
        </div>
        <div class="field" style="grid-column: span 2;">
          <label>Bio</label>
          <textarea id="cmsPersonBio" placeholder="Short bio (shown on the website)" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-ghost" onclick="cmsClosePersonModal()">Cancel</button>
        <button class="btn btn-primary" onclick="cmsSavePerson()">Save</button>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Team & Board JS**

Add before closing `</script>`:

```javascript
/* ── CMS: Team & Board ── */
var _cmsTeamMembers = [];
var _cmsBoardMembers = [];
var _cmsDraggedCard = null;

function cmsSwitchTeamBoardTab(tab) {
  document.getElementById('cmsTeamTab').style.display = tab === 'team' ? '' : 'none';
  document.getElementById('cmsBoardTab').style.display = tab === 'board' ? '' : 'none';
  document.querySelectorAll('#cmsTeamBoardTabs .cms-tab').forEach(function(b, i) {
    b.classList.toggle('active', (tab === 'team' && i === 0) || (tab === 'board' && i === 1));
  });
  if (tab === 'board' && _cmsBoardMembers.length === 0) cmsLoadBoard();
}

window.cmsLoadTeamBoard = async function() { await cmsLoadTeam(); };

async function cmsLoadTeam() {
  var container = document.getElementById('cmsTeamCards');
  container.innerHTML = '<div class="cms-empty"><p>Loading...</p></div>';
  try {
    var snap = await db.collection('teamMembers').orderBy('order').get();
    _cmsTeamMembers = [];
    snap.forEach(function(doc) {
      var d = doc.data();
      if (!d.archived) _cmsTeamMembers.push({ id: doc.id, ...d });
    });
    cmsRenderPeopleCards(_cmsTeamMembers, container, 'team');
  } catch (err) {
    container.innerHTML = '<div class="cms-empty" style="color:#DC2626;">Error: ' + err.message + '</div>';
  }
}

async function cmsLoadBoard() {
  var container = document.getElementById('cmsBoardCards');
  container.innerHTML = '<div class="cms-empty"><p>Loading...</p></div>';
  try {
    var snap = await db.collection('boardMembers').orderBy('order').get();
    _cmsBoardMembers = [];
    snap.forEach(function(doc) {
      var d = doc.data();
      if (!d.archived) _cmsBoardMembers.push({ id: doc.id, ...d });
    });
    cmsRenderPeopleCards(_cmsBoardMembers, container, 'board');
  } catch (err) {
    container.innerHTML = '<div class="cms-empty" style="color:#DC2626;">Error: ' + err.message + '</div>';
  }
}

function cmsRenderPeopleCards(people, container, type) {
  if (!people.length) {
    container.innerHTML = '<div class="cms-empty"><p>No ' + type + ' members yet.</p><p>Click "Add New" to get started.</p></div>';
    return;
  }
  var html = '';
  people.forEach(function(p) {
    var photoHtml = p.photoUrl
      ? '<img src="' + rsEscape(p.photoUrl) + '" class="cms-card-photo" alt="' + rsEscape(p.name) + '">'
      : '<div class="cms-card-photo" style="display:flex;align-items:center;justify-content:center;font-size:1.8rem;color:var(--text-soft);">&#128100;</div>';
    html += '<div class="cms-card" draggable="true" data-id="' + p.id + '" data-type="' + type + '">' +
      '<div class="cms-drag-handle" title="Drag to reorder">&#9776;</div>' +
      '<div class="cms-card-row">' + photoHtml +
      '<div><div class="cms-card-title">' + rsEscape(p.name || '') + '</div>' +
      '<div class="cms-card-subtitle">' + rsEscape(p.role || '') + '</div>';
    if (type === 'team') {
      if (p.phone) html += '<div class="cms-card-subtitle">' + rsEscape(p.phone) + '</div>';
      if (p.email) html += '<div class="cms-card-subtitle">' + rsEscape(p.email) + '</div>';
    }
    html += '</div></div>';
    if (p.bio) html += '<div class="cms-card-bio">' + rsEscape(p.bio || '') + '</div>';
    html += '<div style="display:flex;gap:8px;margin-top:10px;">' +
      '<button class="btn btn-ghost" style="font-size:.82rem;padding:6px 12px;" onclick="event.stopPropagation();cmsOpenPersonModal(\'' + type + '\',\'' + p.id + '\')">Edit</button>' +
      '<button class="btn btn-ghost" style="font-size:.82rem;padding:6px 12px;color:#DC2626;" onclick="event.stopPropagation();cmsArchivePerson(\'' + type + '\',\'' + p.id + '\',\'' + rsEscape(p.name || '') + '\')">Delete</button>' +
      '</div></div>';
  });
  container.innerHTML = html;
  // Attach drag handlers
  container.querySelectorAll('.cms-card[draggable]').forEach(function(card) {
    card.addEventListener('dragstart', cmsCardDragStart);
    card.addEventListener('dragend', cmsCardDragEnd);
    card.addEventListener('dragover', cmsCardDragOver);
    card.addEventListener('dragleave', cmsCardDragLeave);
    card.addEventListener('drop', function(e) { cmsCardDrop(e, type); });
  });
}

function cmsCardDragStart(e) { _cmsDraggedCard = this; this.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
function cmsCardDragEnd() { this.classList.remove('dragging'); document.querySelectorAll('.cms-card').forEach(function(c) { c.classList.remove('drag-over'); }); }
function cmsCardDragOver(e) { e.preventDefault(); if (this !== _cmsDraggedCard) this.classList.add('drag-over'); }
function cmsCardDragLeave() { this.classList.remove('drag-over'); }

async function cmsCardDrop(e, type) {
  e.preventDefault();
  this.classList.remove('drag-over');
  if (this === _cmsDraggedCard) return;
  var items = type === 'team' ? _cmsTeamMembers : _cmsBoardMembers;
  var collection = type === 'team' ? 'teamMembers' : 'boardMembers';
  var dragId = _cmsDraggedCard.getAttribute('data-id');
  var targetId = this.getAttribute('data-id');
  var dragIdx = items.findIndex(function(i) { return i.id === dragId; });
  var targetIdx = items.findIndex(function(i) { return i.id === targetId; });
  var moved = items.splice(dragIdx, 1)[0];
  items.splice(targetIdx, 0, moved);
  var batch = db.batch();
  items.forEach(function(item, i) { batch.update(db.collection(collection).doc(item.id), { order: i }); });
  try {
    await batch.commit();
    var container = type === 'team' ? document.getElementById('cmsTeamCards') : document.getElementById('cmsBoardCards');
    cmsRenderPeopleCards(items, container, type);
    _showToast('Order saved!', '#16A34A');
  } catch (err) { _showToast('Error reordering: ' + err.message, '#DC2626'); }
}

window.cmsOpenPersonModal = async function(type, docId) {
  document.getElementById('cmsPersonEditId').value = docId || '';
  document.getElementById('cmsPersonEditType').value = type;
  document.getElementById('cmsPersonModalTitle').textContent = docId ? 'Edit ' + (type === 'team' ? 'Team' : 'Board') + ' Member' : 'Add ' + (type === 'team' ? 'Team' : 'Board') + ' Member';
  document.getElementById('cmsPersonName').value = '';
  document.getElementById('cmsPersonRole').value = '';
  document.getElementById('cmsPersonPhone').value = '';
  document.getElementById('cmsPersonEmail').value = '';
  document.getElementById('cmsPersonBio').value = '';
  // Show/hide phone+email for team only
  document.getElementById('cmsPersonPhoneField').style.display = type === 'team' ? '' : 'none';
  document.getElementById('cmsPersonEmailField').style.display = type === 'team' ? '' : 'none';
  // Reset photo
  var photoUpload = document.getElementById('cmsPersonPhotoUpload');
  photoUpload.innerHTML = '<span class="cms-photo-label">Click to upload photo</span>';
  document.getElementById('cmsPersonPhotoInput').value = '';

  if (docId) {
    try {
      var doc = await db.collection(type === 'team' ? 'teamMembers' : 'boardMembers').doc(docId).get();
      if (doc.exists) {
        var d = doc.data();
        document.getElementById('cmsPersonName').value = d.name || '';
        document.getElementById('cmsPersonRole').value = d.role || '';
        document.getElementById('cmsPersonPhone').value = d.phone || '';
        document.getElementById('cmsPersonEmail').value = d.email || '';
        document.getElementById('cmsPersonBio').value = d.bio || '';
        if (d.photoUrl) {
          photoUpload.innerHTML = '<img src="' + d.photoUrl + '" alt="Current photo"><span class="cms-photo-label">Click to change photo</span>';
        }
      }
    } catch (e) { console.error(e); }
  }
  document.getElementById('cmsPersonOverlay').classList.add('active');
  setTimeout(function() { document.getElementById('cmsPersonName').focus(); }, 50);
};

window.cmsClosePersonModal = function() {
  document.getElementById('cmsPersonOverlay').classList.remove('active');
};

window.cmsPreviewPersonPhoto = function(input) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 5 * 1024 * 1024) { alert('Photo must be under 5 MB.'); input.value = ''; return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var upload = document.getElementById('cmsPersonPhotoUpload');
    upload.innerHTML = '<img src="' + e.target.result + '" alt="Preview"><span class="cms-photo-label">Click to change photo</span>';
  };
  reader.readAsDataURL(file);
};

window.cmsSavePerson = async function() {
  var name = document.getElementById('cmsPersonName').value.trim();
  if (!name) { alert('Name is required.'); return; }
  var type = document.getElementById('cmsPersonEditType').value;
  var editId = document.getElementById('cmsPersonEditId').value;
  var collection = type === 'team' ? 'teamMembers' : 'boardMembers';

  var data = {
    name: name,
    role: document.getElementById('cmsPersonRole').value.trim(),
    bio: document.getElementById('cmsPersonBio').value.trim(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  if (type === 'team') {
    data.phone = document.getElementById('cmsPersonPhone').value.trim();
    data.email = document.getElementById('cmsPersonEmail').value.trim();
  }

  try {
    // Handle photo upload if new file selected
    var fileInput = document.getElementById('cmsPersonPhotoInput');
    if (fileInput.files && fileInput.files[0]) {
      var file = fileInput.files[0];
        var storagePath = 'teamMembers/' + Date.now() + '_' + file.name;
      var ref = storage.ref(storagePath);
      await ref.put(file);
      data.photoUrl = await ref.getDownloadURL();
    }

    if (editId) {
      await db.collection(collection).doc(editId).update(data);
    } else {
      var items = type === 'team' ? _cmsTeamMembers : _cmsBoardMembers;
      data.order = items.length;
      data.archived = false;
      data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await db.collection(collection).add(data);
    }
    cmsClosePersonModal();
    if (type === 'team') cmsLoadTeam(); else cmsLoadBoard();
    _showToast('Saved!', '#16A34A');
  } catch (err) { _showToast('Error: ' + err.message, '#DC2626'); }
};

window.cmsArchivePerson = async function(type, docId, name) {
  if (!confirm('Delete "' + name + '" from the website? This can be undone by restoring from the database.')) return;
  try {
    var collection = type === 'team' ? 'teamMembers' : 'boardMembers';
    await db.collection(collection).doc(docId).update({ archived: true });
    if (type === 'team') cmsLoadTeam(); else cmsLoadBoard();
    _showToast('Removed from website.', '#16A34A');
  } catch (err) { _showToast('Error: ' + err.message, '#DC2626'); }
};
```

- [ ] **Step 3: Add routing for Team & Board**

Find the section switching code (~line 5533) and add inside the nav click handler's if/else chain:

```javascript
} else if (section === 'cmsTeamBoard') {
  _showFullWidth(document.getElementById('cmsTeamBoardSection'), cmsLoadTeamBoard);
}
```

Also hide `cmsTeamBoardSection` in the "hide all sections" block at the top of the handler:

```javascript
var cmsTeamBoardSec = document.getElementById('cmsTeamBoardSection');
if (cmsTeamBoardSec) cmsTeamBoardSec.style.display = 'none';
```

- [ ] **Step 4: Test Team & Board**

1. Log in as superAdmin
2. Click Website > Team & Board — should load team members from Firestore
3. Click "Add New Team Member" — modal opens with Name, Title, Phone, Email, Photo, Bio
4. Fill in fields, upload photo, save — card appears in grid
5. Click card's Edit button — modal opens with existing data
6. Drag a card to reorder — order persists after reload
7. Switch to Board tab — loads board members (no phone/email fields)
8. Delete a member — confirm dialog, then removed from view

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add Team & Board CMS section with photo upload and drag-to-reorder"
```

---

## Task 3: Galleries Section

**Files:** Modify `index.html`
**What:** Photo gallery management for both "Who We Are" and "Volunteer" page galleries on one page.

- [ ] **Step 1: Add Galleries section HTML**

Add before closing `</main>`:

```html
<section id="cmsGalleriesSection" style="display:none;">
  <h2>Galleries</h2>

  <!-- Gallery 1 -->
  <div class="cms-section-note">Who We Are Page Photos — These photos appear in the gallery on the Who We Are page of the website.</div>
  <div class="cms-toolbar">
    <button class="btn btn-primary" onclick="cmsAddGalleryPhoto('gallery')">Add Photo</button>
    <input type="file" id="cmsGallery1FileInput" accept="image/*" style="display:none" onchange="cmsUploadGalleryPhoto(this, 'gallery')">
  </div>
  <div class="cms-cards" id="cmsGallery1Cards" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
    <div class="cms-empty"><p>Loading...</p></div>
  </div>

  <hr style="margin: 32px 0; border: none; border-top: 2px solid rgba(8,145,178,.1);">

  <!-- Gallery 2 -->
  <div class="cms-section-note">Volunteer Page Photos — These photos appear in the gallery on the Volunteer page of the website.</div>
  <div class="cms-toolbar">
    <button class="btn btn-primary" onclick="cmsAddGalleryPhoto('gallery2')">Add Photo</button>
    <input type="file" id="cmsGallery2FileInput" accept="image/*" style="display:none" onchange="cmsUploadGalleryPhoto(this, 'gallery2')">
  </div>
  <div class="cms-cards" id="cmsGallery2Cards" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
    <div class="cms-empty"><p>Loading...</p></div>
  </div>
</section>
```

- [ ] **Step 2: Add Galleries JS**

```javascript
/* ── CMS: Galleries ── */
var _cmsGallery1 = [];
var _cmsGallery2 = [];

window.cmsLoadGalleries = async function() {
  await Promise.all([cmsLoadGallery('gallery', 'cmsGallery1Cards'), cmsLoadGallery('gallery2', 'cmsGallery2Cards')]);
};

async function cmsLoadGallery(collection, containerId) {
  var container = document.getElementById(containerId);
  container.innerHTML = '<div class="cms-empty"><p>Loading...</p></div>';
  try {
    var snap = await db.collection(collection).orderBy('order').get();
    var items = [];
    snap.forEach(function(doc) { var d = doc.data(); if (!d.archived) items.push({ id: doc.id, ...d }); });
    if (collection === 'gallery') _cmsGallery1 = items; else _cmsGallery2 = items;
    cmsRenderGalleryCards(items, container, collection);
  } catch (err) {
    container.innerHTML = '<div class="cms-empty" style="color:#DC2626;">Error: ' + err.message + '</div>';
  }
}

function cmsRenderGalleryCards(items, container, collection) {
  if (!items.length) {
    container.innerHTML = '<div class="cms-empty"><p>No photos yet. Click "Add Photo" to get started.</p></div>';
    return;
  }
  var html = '';
  items.forEach(function(item) {
    html += '<div class="cms-card" draggable="true" data-id="' + item.id + '" data-collection="' + collection + '" style="padding:8px;">' +
      '<div class="cms-drag-handle" title="Drag to reorder" style="top:12px;">&#9776;</div>' +
      '<img src="' + rsEscape(item.imageUrl || '') + '" alt="' + rsEscape(item.caption || 'Gallery photo') + '" style="width:100%;height:160px;object-fit:cover;border-radius:10px;">' +
      '<div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center;">' +
      '<span style="font-size:.85rem;color:var(--text-soft);">' + rsEscape(item.caption || '') + '</span>' +
      '<button class="btn btn-ghost" style="font-size:.78rem;padding:4px 10px;color:#DC2626;" onclick="event.stopPropagation();cmsDeleteGalleryPhoto(\'' + collection + '\',\'' + item.id + '\',\'' + rsEscape(item.imageUrl || '') + '\')">Delete</button>' +
      '</div></div>';
  });
  container.innerHTML = html;
  container.querySelectorAll('.cms-card[draggable]').forEach(function(card) {
    card.addEventListener('dragstart', cmsCardDragStart);
    card.addEventListener('dragend', cmsCardDragEnd);
    card.addEventListener('dragover', cmsCardDragOver);
    card.addEventListener('dragleave', cmsCardDragLeave);
    card.addEventListener('drop', function(e) { cmsGalleryDrop(e, collection); });
  });
}

window.cmsAddGalleryPhoto = function(collection) {
  document.getElementById(collection === 'gallery' ? 'cmsGallery1FileInput' : 'cmsGallery2FileInput').click();
};

window.cmsUploadGalleryPhoto = async function(input, collection) {
  if (!input.files || !input.files[0]) return;
  var file = input.files[0];
  if (file.size > 5 * 1024 * 1024) { alert('Photo must be under 5 MB.'); input.value = ''; return; }
  _showToast('Uploading...', '#0891B2');
  try {
    var storagePath = collection + '/' + Date.now() + '_' + file.name;
    var ref = storage.ref(storagePath);
    await ref.put(file);
    var url = await ref.getDownloadURL();
    var items = collection === 'gallery' ? _cmsGallery1 : _cmsGallery2;
    await db.collection(collection).add({
      imageUrl: url, caption: '', order: items.length,
      archived: false, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    input.value = '';
    var containerId = collection === 'gallery' ? 'cmsGallery1Cards' : 'cmsGallery2Cards';
    await cmsLoadGallery(collection, containerId);
    _showToast('Photo added!', '#16A34A');
  } catch (err) { _showToast('Error: ' + err.message, '#DC2626'); }
};

window.cmsDeleteGalleryPhoto = async function(collection, docId, imageUrl) {
  if (!confirm('Delete this photo from the website?')) return;
  try {
    await db.collection(collection).doc(docId).update({ archived: true });
    if (imageUrl && imageUrl.includes('firebase')) {
      try { await storage.refFromURL(imageUrl).delete(); } catch(e) {}
    }
    var containerId = collection === 'gallery' ? 'cmsGallery1Cards' : 'cmsGallery2Cards';
    await cmsLoadGallery(collection, containerId);
    _showToast('Photo removed.', '#16A34A');
  } catch (err) { _showToast('Error: ' + err.message, '#DC2626'); }
};

async function cmsGalleryDrop(e, collection) {
  e.preventDefault();
  this.classList.remove('drag-over');
  if (this === _cmsDraggedCard) return;
  var items = collection === 'gallery' ? _cmsGallery1 : _cmsGallery2;
  var dragId = _cmsDraggedCard.getAttribute('data-id');
  var targetId = this.getAttribute('data-id');
  var dragIdx = items.findIndex(function(i) { return i.id === dragId; });
  var targetIdx = items.findIndex(function(i) { return i.id === targetId; });
  var moved = items.splice(dragIdx, 1)[0];
  items.splice(targetIdx, 0, moved);
  var batch = db.batch();
  items.forEach(function(item, i) { batch.update(db.collection(collection).doc(item.id), { order: i }); });
  try {
    await batch.commit();
    var containerId = collection === 'gallery' ? 'cmsGallery1Cards' : 'cmsGallery2Cards';
    cmsRenderGalleryCards(items, document.getElementById(containerId), collection);
    _showToast('Order saved!', '#16A34A');
  } catch (err) { _showToast('Error reordering: ' + err.message, '#DC2626'); }
}
```

- [ ] **Step 3: Add routing for Galleries**

Add to nav click handler and section hide block (same pattern as Task 2):

```javascript
} else if (section === 'cmsGalleries') {
  _showFullWidth(document.getElementById('cmsGalleriesSection'), cmsLoadGalleries);
}
```

- [ ] **Step 4: Test Galleries**

1. Click Website > Galleries — both gallery sections load
2. "Who We Are" label and "Volunteer" label clearly visible
3. Add photo to Gallery 1 — uploads, appears in grid
4. Drag to reorder — persists
5. Delete a photo — confirm, removed
6. Same for Gallery 2
7. Check W2 public site — galleries still display correctly

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add Galleries CMS section with dual gallery management"
```

---

## Task 4: Resources Section

**Files:** Modify `index.html`
**What:** Community resources management with search, filter, and CSV export.

- [ ] **Step 1: Add Resources section HTML and modal**

Section with search toolbar, filter dropdown, cards grid, and edit modal. Fields: Name, Type, Services, City, Island, Phone, Email, Logo. Include "Add New Resource" button and "Export CSV" button in toolbar.

- [ ] **Step 2: Add Resources JS**

Key functions:
- `cmsLoadResources()` — load from `resources` collection, orderBy('name'), filter out archived
- `cmsRenderResources()` — card grid with logo thumbnail, name, type, city
- `cmsFilterResources()` — client-side search by name/services/city/type
- `cmsOpenResourceModal(docId?)` — open modal, populate if editing
- `cmsSaveResource()` — create or update, handle logo upload to `resources/{timestamp}_{filename}`
- `cmsArchiveResource(docId)` — set archived=true with confirmation
- `cmsExportResourcesCSV()` — download CSV with headers: Name, Type, Services, City, Island, Phone, Email

- [ ] **Step 3: Add routing**

Same pattern: add to nav click handler and section hide block.

- [ ] **Step 4: Test Resources**

1. Load resources — cards appear with logos
2. Search filters correctly
3. Add new resource with logo — appears in list
4. Edit existing — data populates modal
5. Archive — removed from view
6. Export CSV — downloads file with correct data

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add Resources CMS section with search, filter, and CSV export"
```

---

## Task 5: FAQs Section

**Files:** Modify `index.html`
**What:** FAQ categories and items management with drag-to-reorder.

- [ ] **Step 1: Add FAQs section HTML**

Two tabs: Categories and FAQ Items. Categories tab shows simple list with add/edit/delete and drag-to-reorder. FAQ Items tab shows cards grouped by category with expand/collapse for answers.

- [ ] **Step 2: Add FAQs JS**

Key functions:
- `cmsLoadFaqs()` — load both `categories` and `faqs` collections
- `cmsRenderCategories()` — simple list with drag handles, edit/delete buttons
- `cmsRenderFaqItems()` — cards grouped by category, question as title, expandable answer
- `cmsSaveCategory()` / `cmsDeleteCategory()` — CRUD for categories
- `cmsOpenFaqModal(docId?)` — modal with Question (text input), Answer (rich text `contenteditable` div with formatting toolbar — same toolbar as Page Editor: bold, italic, underline, color, size), Category (dropdown populated from categories)
- `cmsSaveFaq()` — create or update FAQ item, read answer from `contenteditable` div's innerHTML
- `cmsDeleteFaq()` — delete with confirmation
- Category and FAQ drag-to-reorder using batch order updates

- [ ] **Step 3: Add routing**

- [ ] **Step 4: Test FAQs**

1. Categories tab — add, edit, delete, reorder categories
2. FAQ Items tab — add new FAQ with category, edit, delete
3. Expand FAQ card to see full answer
4. Reorder FAQs within a category
5. Verify data appears correctly on W2 public site

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add FAQs CMS section with categories and items management"
```

---

## Task 6: Events & Programs Section

**Files:** Modify `index.html`
**What:** One-time events and recurring programs management with signup viewing.

- [ ] **Step 1: Add Events section HTML**

Two tabs: One-Time Events and Ongoing Programs. Each tab shows cards with date, title, location, signup count badge. Edit modal includes: Title, Description, Date, Time, Location, Image upload, Signup Dates (dynamic array), Custom Questions (dynamic array), Show Group Field toggle.

- [ ] **Step 2: Add Events JS**

Key functions:
- `cmsLoadEvents()` — load `events` collection + each event's `signups` subcollection for counts
- `cmsLoadPrograms()` — load `recurringEvents` collection + signup subcollections
- `cmsRenderEvents()` — cards with signup count badges, new/attention indicators
- `cmsOpenEventModal(docId?, isRecurring?)` — modal with all event fields
- `cmsSaveEvent()` — create/update, handle image upload to `event-images/{timestamp}_{filename}`
- `cmsArchiveEvent()` — archive with confirmation
- `cmsViewSignups(eventId, isRecurring)` — open modal showing signup list with status, admin notes
- `cmsUpdateSignupStatus(eventId, signupId, status)` — update individual signup
- `cmsExportSignupsCSV(eventTitle)` — export event's signups to CSV
- Dynamic UI for adding/removing signup dates and custom questions arrays

- [ ] **Step 3: Add routing**

- [ ] **Step 4: Test Events**

1. One-Time Events tab — loads events with signup counts
2. Add new event with image, signup dates, custom questions
3. View signups modal — shows registrations with status
4. Update signup status — saves to Firestore
5. Export signups to CSV
6. Programs tab — same functionality for recurring events
7. Archive an event — removed from view

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add Events & Programs CMS section with signup management"
```

---

## Task 7: Volunteers Section

**Files:** Modify `index.html`
**What:** Volunteer opportunities and applications management with status tracking.

- [ ] **Step 1: Add Volunteers section HTML**

Two tabs: Opportunities and Applications. Opportunities show cards with title, description, image. Applications show filterable list by status (All/New/Contacted/Interviewing/Accepted/Declined) with status buttons and admin notes.

- [ ] **Step 2: Add Volunteers JS**

Key functions:
- `cmsLoadVolunteers()` — load `volunteerOpportunities` and `volunteers` collections
- `cmsRenderOpportunities()` — cards with drag-to-reorder, image, edit/archive buttons
- `cmsOpenOpportunityModal(docId?)` — modal with Title, Description, Requirements, Image, Always Post toggle, Start/End dates
- `cmsSaveOpportunity()` — create/update, image upload to `volunteerOpportunities/{timestamp}_{filename}` (must match spec exactly)
- `cmsRenderApplications()` — cards sorted by status priority, grouped by opportunity
- `cmsUpdateAppStatus(appId, status)` — update status field
- `cmsSaveAppNotes(appId)` — save admin notes
- `cmsExportApplicationsCSV()` — export all applications grouped by opportunity
- Status filter buttons for applications

- [ ] **Step 3: Add routing**

- [ ] **Step 4: Test Volunteers**

1. Opportunities tab — loads positions, add/edit/reorder/archive
2. Applications tab — loads applications grouped by opportunity
3. Filter by status — filters correctly
4. Update application status — saves, re-renders with new status
5. Save admin notes — persists
6. Export to CSV — correct grouping and data

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add Volunteers CMS section with applications and status tracking"
```

---

## Task 8: Website Data Section

**Files:** Modify `index.html`
**What:** Read-only display of form submissions with status management and CSV export.

- [ ] **Step 1: Add Website Data section HTML**

Four tabs: Provider Requests, Anti-Bullying Pledges, Event Requests, Contact Messages. Each tab has a status filter dropdown and export CSV button. Cards show submission data with expandable details and status update buttons.

- [ ] **Step 2: Add Website Data JS**

Key functions (per tab):
- `cmsLoadWebData()` — loads all four collections
- `cmsLoadProviders()` — load `providers` collection, render cards with: org name, contact name, email, service type, category, message, status buttons
- `cmsLoadPledges()` — load `pledges` collection, render with: name, location, email, message, status (new/viewed/acknowledged)
- `cmsLoadEventRequests()` — load `eventRequests` collection, render with: name, email, phone, preferred date, sponsor, event info, status (pending/reviewed/approved/scheduled/declined/completed)
- `cmsLoadContactMessages()` — load `contactSubmissions` collection, render with: name, email, phone, message, status (new/read/replied)
- `cmsUpdateWebDataStatus(collection, docId, status)` — update status field
- `cmsExportProvidersCsv()`, `cmsExportPledgesCsv()`, `cmsExportEventRequestsCsv()`, `cmsExportContactsCsv()` — CSV export per tab
- Status filter for each tab

- [ ] **Step 3: Add routing**

- [ ] **Step 4: Test Website Data**

1. Each tab loads correct data
2. Status filters work
3. Status update buttons save correctly
4. Expandable details show full content
5. CSV export works for each tab

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add Website Data CMS section with four data tabs and CSV export"
```

---

## Task 9: Page Editor Section

**Files:** Modify `index.html`
**What:** Form-based page content editor with rich text and photo upload.

- [ ] **Step 1: Add Page Editor CSS**

Rich text toolbar styles, page tab navigation, form field descriptive labels, saved indicator.

- [ ] **Step 2: Add Page Editor section HTML**

Page selector tabs across the top (Home, Who We Are, Events, Volunteer, Resources, Contact, Readiness, Special Ed, Military, Pacific, Community). Below tabs: a form area that dynamically renders fields for the selected page. Each field has a descriptive label (e.g., "This text appears at the top of the Home page"). Text fields use `contenteditable` divs with a formatting toolbar. Photo fields show current image with "Change Photo" button. Saved indicator in top-right.

Pacific tab shows sub-tabs for each island: American Samoa, CNMI, FSM, Guam, Marshall Islands, Palau.

- [ ] **Step 3: Add Page Editor JS**

Key functions:
- `cmsLoadPageEditor()` — load first page by default (Home)
- `cmsLoadPageContent(pageName)` — read `pageContent` doc for page, render form fields
- `cmsPageFieldDefinitions` — object mapping each page to its fields with labels, types (text/richtext/photo), and descriptive hints. Example:
  ```javascript
  home: [
    { key: 'heroTitle', label: 'Hero Title', type: 'text', hint: 'Main headline at the top of the Home page' },
    { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'richtext', hint: 'Text below the main headline' },
    { key: 'heroPhoto', label: 'Hero Photo', type: 'photo', hint: 'Background image for the hero section' },
    // ...
  ]
  ```
- `cmsRenderPageFields(pageName, data)` — render form fields based on definitions
- `cmsSavePageField(pageName, fieldKey, value)` — auto-save individual field to Firestore `pageContent` doc
- `cmsUploadPagePhoto(pageName, fieldKey, file)` — upload to `gallery/{pageName}_{fieldKey}_{timestamp}.jpg`, save URL to Firestore
- Rich text toolbar: `cmsFmtBold()`, `cmsFmtItalic()`, `cmsFmtUnderline()`, `cmsFmtColor(color)`, `cmsFmtSize(size)`, `cmsFmtHeading()`, `cmsFmtParagraph()`, `cmsFmtLineBreak()`
  - All use `document.execCommand()` on the focused `contenteditable` div
- Auto-save with debounce (500ms after last keystroke) + green "Saved" indicator

**Important:** To build the field definitions, read the existing `page-admin.html` to see which fields exist for each page. The field keys must match exactly what `page-admin.html` uses (e.g., `heroTitle`, `heroSubtitle`, `stat1Number`, `service1Title`, etc.) since the public W2 pages read these same field names.

- [ ] **Step 4: Add routing**

- [ ] **Step 5: Test Page Editor**

1. Click Page Editor — Home page fields load
2. Switch to Who We Are — correct fields load with current content
3. Edit a text field — auto-saves after typing stops, green "Saved" indicator flashes
4. Use rich text toolbar — bold, italic, color, size all work
5. Change a photo — uploads, preview updates, saves to Firestore
6. Switch to Pacific — sub-tabs for each island appear
7. Check W2 public site — changes from Page Editor appear correctly

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add Page Editor CMS section with rich text and auto-save"
```

---

## Task 10: AI Helper Chatbot

**Files:** Modify `index.html`
**What:** Floating AI help button on Website sections with context-aware Q&A.

- [ ] **Step 1: Add AI Helper CSS**

Floating button (bottom-LEFT, 56px, z-index 9000), chat panel (360px wide, slides up), message bubbles, quick action buttons. Ensure it does NOT overlap the existing chat button (bottom-right).

- [ ] **Step 2: Add AI Helper HTML**

```html
<!-- AI CMS Helper (bottom-left, only on Website sections) -->
<div id="cmsAiHelper" style="display:none;">
  <button id="cmsAiBtn" onclick="cmsToggleAiChat()" title="CMS Help" style="position:fixed;bottom:24px;left:24px;z-index:9000;width:56px;height:56px;border-radius:50%;background:var(--ocean-deep);color:white;border:none;font-size:1.4rem;cursor:pointer;box-shadow:0 4px 16px rgba(8,145,178,.35);">?</button>
  <div id="cmsAiPanel" style="display:none;position:fixed;bottom:90px;left:24px;z-index:9001;width:360px;max-height:480px;background:white;border-radius:var(--radius);box-shadow:0 12px 40px rgba(0,0,0,.2);overflow:hidden;">
    <div style="padding:12px 16px;background:var(--ocean-deep);color:white;font-weight:700;">LDAH CMS Help</div>
    <div id="cmsAiMessages" style="height:320px;overflow-y:auto;padding:12px;"></div>
    <div style="display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(0,0,0,.08);">
      <input id="cmsAiInput" placeholder="Ask about CMS features..." style="flex:1;padding:8px 12px;border-radius:10px;border:1px solid rgba(8,145,178,.18);outline:none;" onkeydown="if(event.key==='Enter')cmsSendAiMessage()">
      <button class="btn btn-primary" style="padding:8px 14px;" onclick="cmsSendAiMessage()">Send</button>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Add AI Helper JS**

Key functions:
- `cmsToggleAiChat()` — show/hide panel
- `cmsSendAiMessage()` — check Q&A cache first, fallback to Cloud Function
- `cmsAiQaCache` — expanded array of 150+ Q&A patterns covering all CMS sections (team, board, gallery, resources, FAQs, events, volunteers, data, page editor)
- `cmsAiMatchCache(question)` — word-frequency scoring to find best cached answer
- `cmsAiCallCloudFunction(question, context)` — POST to `https://us-central1-ldah-932d5.cloudfunctions.net/ldahCmsHelp` with message, pageContext (current CMS section), history
- `cmsShowAiHelper()` / `cmsHideAiHelper()` — show when on Website sections, hide otherwise

Integrate visibility into section routing: when navigating to any `cms*` section, call `cmsShowAiHelper()`. When navigating away, call `cmsHideAiHelper()`.

- [ ] **Step 4: Test AI Helper**

1. Navigate to any Website section — floating ? button appears bottom-left
2. Navigate to Dashboard — ? button disappears
3. Click ? — chat panel opens
4. Ask "how do I add a team member" — cached answer appears
5. Ask something obscure — Cloud Function is called, response appears
6. Verify chat button (bottom-right) is not covered

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add AI Helper chatbot for CMS sections"
```

---

## Task 11: Badge Counts on Nav Items

**Files:** Modify `index.html`
**What:** Show pending counts (new volunteer applications, unread contact messages, etc.) as badge numbers on Website nav items.

- [ ] **Step 1: Add badge count JS**

```javascript
/* ── CMS: Nav Badge Counts ── */
async function cmsUpdateNavBadges() {
  try {
    // Pending volunteer applications
    var volSnap = await db.collection('volunteers').where('status', '==', 'new').get();
    cmsSetNavBadge('cmsVolunteers', volSnap.size);

    // Unread contact messages
    var contactSnap = await db.collection('contactSubmissions').where('status', '==', 'new').get();
    cmsSetNavBadge('cmsWebData', contactSnap.size);
  } catch (e) { console.error('Badge count error:', e); }
}

function cmsSetNavBadge(sectionName, count) {
  var link = document.querySelector('.nav a[data-section="' + sectionName + '"]');
  if (!link) return;
  var existing = link.querySelector('.cms-badge-count');
  if (existing) existing.remove();
  if (count > 0) {
    var badge = document.createElement('span');
    badge.className = 'cms-badge-count';
    badge.textContent = count;
    link.appendChild(badge);
  }
}
```

Call `cmsUpdateNavBadges()` after login (inside auth state change listener) for users with CMS roles.

- [ ] **Step 2: Test badges**

1. Log in — badge counts appear on Volunteers and Website Data nav items
2. Mark a volunteer application as "contacted" — badge count decreases on next page load

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add badge counts on Website nav items for pending actions"
```

---

## Task 12: Final Integration Testing & Version Bump

**Files:** Modify `index.html`
**What:** Full end-to-end testing and version bump.

- [ ] **Step 1: Full test pass**

Test every section as superAdmin:
1. Team & Board — CRUD, photo upload, drag reorder, tab switching
2. Galleries — both galleries, upload, reorder, delete
3. Resources — CRUD, search, filter, logo upload, CSV export
4. FAQs — categories and items CRUD, reorder
5. Events & Programs — CRUD, image upload, signups view, signup status, signup CSV export
6. Volunteers — opportunities CRUD, applications list, status updates, admin notes, CSV export
7. Website Data — all four tabs load, status updates, CSV exports
8. Page Editor — all pages load, text editing, rich text toolbar, photo upload, auto-save, Pacific sub-pages
9. AI Helper — appears/disappears correctly, cached answers work, Cloud Function fallback works
10. Badge counts — accurate numbers on nav items

- [ ] **Step 2: Test role access**

1. Log in as `webAdmin` — Website group visible, all sections accessible
2. Log in as `appAdmin` — same access
3. Log in as `dailyUser` — Website group hidden
4. Log in as `partner` — Website group hidden

- [ ] **Step 3: Test alongside W2 CMS**

1. Make a change in LDAH-Int CMS (e.g., edit a team member name)
2. Verify change appears on W2 public site
3. Make a change in W2 cms.html (e.g., edit same team member)
4. Verify change appears in LDAH-Int CMS on reload
5. Both systems coexist, no conflicts

- [ ] **Step 4: Version bump**

Update the version display in LDAH-Int (search for current version string, e.g., "v91") and increment to next version.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: CMS migration complete — version bump to v92"
```

---

## Implementation Notes

- **Storage paths are critical.** The public W2 website reads images from specific Firebase Storage paths. Every upload in LDAH-Int CMS must use the exact paths from the spec. If paths don't match, images won't display on the public site.
- **Naming collision:** The existing codebase has a `resourcesSection` (for LDAH-Int resources/file uploads). The new CMS resources section uses `cmsResourcesSection` to avoid conflict. Be careful not to confuse the two.
- **Upload progress UX:** When uploading photos, disable the Save button and show "Saving..." text. For large files (up to 5MB), the upload can take several seconds. Use `_showToast('Uploading...', '#0891B2')` before the upload starts.
- **Info tooltips on every section:** Add `<span class="cms-info-tip" title="explanation">i</span>` next to fields that might confuse non-technical users. Explain what each field does and where it appears on the website.
- **Read W2 `cms.html` before each task** to verify Firestore field names match exactly. The new CMS must write the same field names the public site reads.
- **Rich text toolbar is shared:** Build the `contenteditable` + `execCommand` toolbar once (in Task 5 or Task 9, whichever comes first) and reuse it for both FAQs and Page Editor.

## Post-Implementation Notes

- **W2 cms.html stays active** — do not modify it. Both systems work in parallel.
- **Cutover is user-driven** — redirect cms.html only when Daniel confirms all CMS users have LDAH-Int logins and have tested it.
- **Backup branch** `pre-cms-migration-backup` allows full rollback if needed.
- **Future work:** Expand AI helper to all LDAH-Int sections (not just Website).
