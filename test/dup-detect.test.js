const test = require('node:test');
const assert = require('node:assert');
const { LDAHFormat } = require('../formatters.js');
const { findDuplicateGroups, datesOverlap, activeSignupDates } = LDAHFormat;

const D = 'June 17, 2026 - 5:00 PM';
const D10 = 'June 10, 2026 - 5:00 PM';
const D24 = 'June 24, 2026 - 5:00 PM';

test('same date + same email (case-insensitive) -> one duplicate group', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'b', email: 'X@X.com', selectedDates: [D], status: 'confirmed' },
  ]);
  assert.equal(g.length, 1);
  assert.deepEqual(g[0].slice().sort(), ['a', 'b']);
});

test('different dates, same email -> no duplicate', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D10], status: 'confirmed' },
    { id: 'b', email: 'x@x.com', selectedDates: [D24], status: 'confirmed' },
  ]);
  assert.equal(g.length, 0);
});

test('partial overlap -> duplicate', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D10, D24], status: 'confirmed' },
    { id: 'b', email: 'x@x.com', selectedDates: [D10], status: 'confirmed' },
  ]);
  assert.equal(g.length, 1);
});

test('different emails, same date -> no duplicate', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'b', email: 'y@y.com', selectedDates: [D], status: 'confirmed' },
  ]);
  assert.equal(g.length, 0);
});

test('cancelled doc excluded from overlap', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'b', email: 'x@x.com', selectedDates: [D], status: 'cancelled' },
  ]);
  assert.equal(g.length, 0);
});

test('archived signup excluded from duplicates', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'b', email: 'x@x.com', selectedDates: [D], status: 'pending', archived: true },
  ]);
  assert.equal(g.length, 0);
});

test('displaced signup excluded from active dates', () => {
  assert.deepEqual(activeSignupDates({ selectedDates: [D], status: 'confirmed', displaced: true }), []);
});

test('date cancelled via dateStatusOverrides excluded', () => {
  const a = activeSignupDates({ selectedDates: [D10, D24], dateStatusOverrides: { [D10]: 'cancelled' } });
  assert.deepEqual(a, [D24]);
});

test('single multi-date signup is not a duplicate', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D10, D24], status: 'confirmed' },
  ]);
  assert.equal(g.length, 0);
});

test('datesOverlap basic', () => {
  assert.equal(datesOverlap([D10], [D10, D24]), true);
  assert.equal(datesOverlap([D10], [D24]), false);
});

test('three copies same date -> single group of three', () => {
  const g = findDuplicateGroups([
    { id: 'a', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'b', email: 'x@x.com', selectedDates: [D], status: 'confirmed' },
    { id: 'c', email: 'x@x.com', selectedDates: [D], status: 'pending' },
  ]);
  assert.equal(g.length, 1);
  assert.equal(g[0].length, 3);
});

test('recommendKeeper prefers attendance, then earliest', () => {
  const { recommendKeeper } = LDAHFormat;
  const keep = recommendKeeper([
    { id: 'late-empty', hasFeedback: false, hasAttendance: false, status: 'confirmed', timestampMs: 100 },
    { id: 'attended', hasFeedback: false, hasAttendance: true, status: 'confirmed', timestampMs: 200 },
  ]);
  assert.equal(keep.id, 'attended');
  const keep2 = recommendKeeper([
    { id: 'newer', hasAttendance: false, status: 'confirmed', timestampMs: 300 },
    { id: 'older', hasAttendance: false, status: 'confirmed', timestampMs: 100 },
  ]);
  assert.equal(keep2.id, 'older');
});
