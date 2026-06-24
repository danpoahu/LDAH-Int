const test = require('node:test');
const assert = require('node:assert');
const { LDAHFormat } = require('../STAGE/formatters.js');
const {
  esOverrideToPersist,
  esResolveOverride,
  normalizeEmail,
  findContactByEmail,
  resolveAttendanceTotal,
} = LDAHFormat;

// ── esOverrideToPersist: only store an override when it DIFFERS from auto ──
test('esOverrideToPersist: input equals auto -> null (do not freeze)', () => {
  assert.strictEqual(esOverrideToPersist('2', 2), null);
});
test('esOverrideToPersist: input differs from auto -> the number', () => {
  assert.strictEqual(esOverrideToPersist('5', 2), 5);
});
test('esOverrideToPersist: blank/NaN -> null (no override)', () => {
  assert.strictEqual(esOverrideToPersist('', 2), null);
  assert.strictEqual(esOverrideToPersist(null, 2), null);
  assert.strictEqual(esOverrideToPersist('abc', 2), null);
});
test('esOverrideToPersist: deliberate 0 when auto is 2 -> 0 (real override)', () => {
  assert.strictEqual(esOverrideToPersist('0', 2), 0);
});

// ── esResolveOverride: display value + overridden flag ──
test('esResolveOverride: no saved value -> shows auto, not overridden', () => {
  assert.deepStrictEqual(esResolveOverride(undefined, 2), { value: 2, overridden: false });
});
test('esResolveOverride: saved differs from auto -> shows saved, overridden', () => {
  assert.deepStrictEqual(esResolveOverride(0, 2), { value: 0, overridden: true });
});
test('esResolveOverride: saved equals auto -> shows it, not overridden', () => {
  assert.deepStrictEqual(esResolveOverride(2, 2), { value: 2, overridden: false });
});

// ── normalizeEmail ──
test('normalizeEmail: trims and lowercases', () => {
  assert.strictEqual(normalizeEmail('  Marie@Example.COM '), 'marie@example.com');
});
test('normalizeEmail: null/undefined -> empty string', () => {
  assert.strictEqual(normalizeEmail(null), '');
  assert.strictEqual(normalizeEmail(undefined), '');
});

// ── findContactByEmail: dedup-safe match ──
const CONTACTS = [
  { id: 'c1', displayName: 'Marie B', email: 'Marie@Example.com' },
  { id: 'c2', displayName: 'Jon K', email: 'jon@k.com' },
  { id: 'c3', displayName: 'No Email' },
];
test('findContactByEmail: case-insensitive match', () => {
  assert.strictEqual(findContactByEmail(CONTACTS, 'marie@example.COM').id, 'c1');
});
test('findContactByEmail: no match -> null', () => {
  assert.strictEqual(findContactByEmail(CONTACTS, 'nobody@x.com'), null);
});
test('findContactByEmail: blank email never matches (incl. contacts without email)', () => {
  assert.strictEqual(findContactByEmail(CONTACTS, ''), null);
  assert.strictEqual(findContactByEmail(CONTACTS, '   '), null);
});

// ── resolveAttendanceTotal: override wins, else attended + walk-ins ──
test('resolveAttendanceTotal: no override -> attended + manual count', () => {
  assert.strictEqual(resolveAttendanceTotal(5, 3, null), 8);
});
test('resolveAttendanceTotal: override wins', () => {
  assert.strictEqual(resolveAttendanceTotal(5, 3, 12), 12);
});
test('resolveAttendanceTotal: zero signups + walk-ins (Parent Talk Cafe)', () => {
  assert.strictEqual(resolveAttendanceTotal(0, 4, null), 4);
});
