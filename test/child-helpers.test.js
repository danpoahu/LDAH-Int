const test = require('node:test');
const assert = require('node:assert');
const { LDAHFormat } = require('../STAGE/formatters.js');
const { buildChildren } = LDAHFormat;

const C = (name, ageRange, gender, ethnicity, disab) => ({
  name: name || '', ageRange: ageRange || '', gender: gender || '',
  ethnicity: ethnicity || '', disabilityCategories: disab || []
});

test('buildChildren: single child round-trips its fields', () => {
  const out = buildChildren([C('Samyra', '6-12', 'Female', 'Hawaiian/Part Hawaiian', ['Autism Spectrum (ASD)'])], []);
  assert.strictEqual(out.length, 1);
  assert.strictEqual(out[0].name, 'Samyra');
  assert.strictEqual(out[0].ageRange, '6-12');
  assert.strictEqual(out[0].gender, 'Female');
  assert.strictEqual(out[0].ethnicity, 'Hawaiian/Part Hawaiian');
  assert.deepStrictEqual(out[0].disabilityCategories, ['Autism Spectrum (ASD)']);
});

test('buildChildren: trims name and keeps two children in order', () => {
  const out = buildChildren([C('  Kai  ', '3-5'), C('Leira', '13-17')], []);
  assert.strictEqual(out.length, 2);
  assert.strictEqual(out[0].name, 'Kai');
  assert.strictEqual(out[1].name, 'Leira');
});

test('buildChildren: drops a fully-empty card', () => {
  const out = buildChildren([C('Kai', '3-5'), C('', '', '', '', [])], []);
  assert.strictEqual(out.length, 1);
  assert.strictEqual(out[0].name, 'Kai');
});

test('buildChildren: a card with only a name is kept', () => {
  const out = buildChildren([C('Just A Name')], []);
  assert.strictEqual(out.length, 1);
  assert.strictEqual(out[0].name, 'Just A Name');
});

test('buildChildren: preserves addedAt + non-form fields from prevChildren by index', () => {
  const prev = [{ name: 'Old', ageRange: '6-12', addedAt: 'TS1', notes: 'keep me' }];
  const out = buildChildren([C('New Name', '6-12', 'Male')], prev);
  assert.strictEqual(out[0].name, 'New Name'); // form wins
  assert.strictEqual(out[0].gender, 'Male');
  assert.strictEqual(out[0].addedAt, 'TS1');   // preserved
  assert.strictEqual(out[0].notes, 'keep me'); // preserved
});

test('buildChildren: new children (no prev) get no addedAt (caller stamps)', () => {
  const out = buildChildren([C('Kai', '3-5')], []);
  assert.strictEqual(out[0].addedAt, undefined);
});

test('buildChildren: keeps the stored government age bucket when it canonicalizes to the form value', () => {
  // Patricia's child stored as "12-14" (new bucket); dropdown only has "13-17".
  const prev = [{ name: 'Child', ageRange: '12-14', addedAt: 'TS' }];
  const out = buildChildren([C('Child', '13-17')], prev);
  assert.strictEqual(out[0].ageRange, '12-14'); // do NOT downgrade to the dropdown bucket
});

test('buildChildren: a genuinely changed age range is written', () => {
  const prev = [{ name: 'Child', ageRange: '0-2', addedAt: 'TS' }];
  const out = buildChildren([C('Child', '6-12')], prev);
  assert.strictEqual(out[0].ageRange, '6-12');
});

test('buildChildren: index alignment holds when an earlier card is empty', () => {
  const prev = [{ name: 'A', addedAt: 'TS_A' }, { name: 'B', addedAt: 'TS_B' }];
  const out = buildChildren([C('', '', '', '', []), C('B2', '3-5')], prev);
  assert.strictEqual(out.length, 1);
  assert.strictEqual(out[0].name, 'B2');
  assert.strictEqual(out[0].addedAt, 'TS_B'); // matched prev index 1, not 0
});

test('buildChildren: handles undefined/null inputs safely', () => {
  assert.deepStrictEqual(buildChildren([], undefined), []);
  assert.deepStrictEqual(buildChildren(undefined, undefined), []);
});
