// Shared helpers for the PTI pink-sheet backfill pipeline.
// Mirrors the project house pattern: ADC access token + Firestore REST via curl,
// no firebase-admin dependency.
const { execSync } = require('child_process');

const PROJECT = 'ldah-932d5';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

// Stable batch id for this whole effort. Used as the rollback key and as the
// provenance marker stamped on every doc/field we touch. Date is fixed (not
// generated) so re-runs reference the same batch.
const BATCH_ID = 'pti-pinksheet-2026-06-24';
const SOURCE_FILE = 'Hawaii_PTI_2025_2030DP.xlsx';

let _tok = null;
function token() {
  if (!_tok) _tok = execSync('gcloud auth application-default print-access-token').toString().trim();
  return _tok;
}

function curl(method, url, body) {
  const args = ['-s', '-X', method,
    '-H', `Authorization: Bearer ${token()}`,
    '-H', 'Content-Type: application/json'];
  if (body !== undefined) args.push('-d', JSON.stringify(body));
  args.push(url);
  const cmd = 'curl ' + args.map(a => `'${String(a).replace(/'/g, "'\\''")}'`).join(' ');
  const out = execSync(cmd, { maxBuffer: 64 * 1024 * 1024 }).toString();
  if (!out) return {};
  let j;
  try { j = JSON.parse(out); } catch (e) { throw new Error('Bad JSON from Firestore: ' + out.slice(0, 400)); }
  if (j.error) throw new Error(`Firestore ${method} ${url} -> ${j.error.status}: ${j.error.message}`);
  return j;
}

// ---- value <-> Firestore REST encoding --------------------------------------
function enc(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (v instanceof Date) return { timestampValue: v.toISOString() };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(enc) } };
  if (typeof v === 'object') {
    const fields = {};
    for (const k of Object.keys(v)) fields[k] = enc(v[k]);
    return { mapValue: { fields } };
  }
  return { stringValue: String(v) };
}
function dec(val) {
  if (val == null) return null;
  if ('nullValue' in val) return null;
  if ('booleanValue' in val) return val.booleanValue;
  if ('integerValue' in val) return Number(val.integerValue);
  if ('doubleValue' in val) return val.doubleValue;
  if ('timestampValue' in val) return val.timestampValue;
  if ('stringValue' in val) return val.stringValue;
  if ('arrayValue' in val) return (val.arrayValue.values || []).map(dec);
  if ('mapValue' in val) {
    const o = {}; const f = val.mapValue.fields || {};
    for (const k of Object.keys(f)) o[k] = dec(f[k]);
    return o;
  }
  return null;
}
function decDoc(d) {
  const o = { _name: d.name, _id: d.name.split('/').pop() };
  const f = d.fields || {};
  for (const k of Object.keys(f)) o[k] = dec(f[k]);
  return o;
}

// ---- collection listing -----------------------------------------------------
function listAll(collection, mask) {
  const out = [];
  let pageToken = '';
  do {
    let url = `${BASE}/${collection}?pageSize=300`;
    if (mask) for (const m of mask) url += `&mask.fieldPaths=${encodeURIComponent(m)}`;
    if (pageToken) url += `&pageToken=${encodeURIComponent(pageToken)}`;
    const j = curl('GET', url);
    (j.documents || []).forEach(d => out.push(decDoc(d)));
    pageToken = j.nextPageToken || '';
  } while (pageToken);
  return out;
}

function getDoc(path) {
  try { return decDoc(curl('GET', `${BASE}/${path}`)); }
  catch (e) { if (/NOT_FOUND/.test(e.message)) return null; throw e; }
}

// create with server-generated id under a collection
function createDoc(collection, fields) {
  const body = { fields: {} };
  for (const k of Object.keys(fields)) body.fields[k] = enc(fields[k]);
  const j = curl('POST', `${BASE}/${collection}`, body);
  return j.name.split('/').pop();
}

// patch specific field paths; pass value undefined to DELETE that field
function patchDoc(path, fieldValues) {
  const paths = Object.keys(fieldValues);
  const body = { fields: {} };
  for (const p of paths) {
    if (fieldValues[p] === undefined) continue; // delete: in mask, absent from body
    setNested(body.fields, p, enc(fieldValues[p]));
  }
  const mask = paths.map(p => `updateMask.fieldPaths=${encodeURIComponent(p)}`).join('&');
  curl('PATCH', `${BASE}/${path}?${mask}`, body);
}
function setNested(fields, path, encoded) {
  const parts = path.split('.');
  let cur = fields;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (!cur[p]) cur[p] = { mapValue: { fields: {} } };
    cur = cur[p].mapValue.fields;
  }
  cur[parts[parts.length - 1]] = encoded;
}

function deleteDoc(path) { curl('DELETE', `${BASE}/${path}`); }

module.exports = {
  PROJECT, BASE, BATCH_ID, SOURCE_FILE,
  curl, enc, dec, decDoc, listAll, getDoc, createDoc, patchDoc, deleteDoc,
};
