const test = require('node:test');
const assert = require('node:assert');
const { LDAHFormat } = require('../STAGE/formatters.js');
const { phoneDigits, gsPhoneMatch } = LDAHFormat;

test('phoneDigits strips all non-digits', () => {
  assert.strictEqual(phoneDigits('(808) 221-8943'), '8082218943');
  assert.strictEqual(phoneDigits('808-221-8943'), '8082218943');
  assert.strictEqual(phoneDigits('+1 808.221.8943'), '18082218943');
  assert.strictEqual(phoneDigits(''), '');
  assert.strictEqual(phoneDigits(null), '');
  assert.strictEqual(phoneDigits(undefined), '');
});

test('gsPhoneMatch matches across formats (query vs stored)', () => {
  assert.strictEqual(gsPhoneMatch('(808) 221-8943', ['8082218943']), true);
  assert.strictEqual(gsPhoneMatch('808-221-8943', ['(808) 221-8943']), true);
  assert.strictEqual(gsPhoneMatch('8082218943', ['(808) 221-8943']), true);
  assert.strictEqual(gsPhoneMatch('808.221.8943', ['8082218943']), true);
});

test('gsPhoneMatch matches a 7-digit local part', () => {
  assert.strictEqual(gsPhoneMatch('221-8943', ['(808) 221-8943']), true);
  assert.strictEqual(gsPhoneMatch('2218943', ['(808) 221-8943']), true);
});

test('gsPhoneMatch ignores queries with fewer than 7 digits', () => {
  assert.strictEqual(gsPhoneMatch('808', ['(808) 221-8943']), false);
  assert.strictEqual(gsPhoneMatch('john', ['(808) 221-8943']), false);
  assert.strictEqual(gsPhoneMatch('96797', ['(808) 221-8943']), false); // a zip, not a phone
});

test('gsPhoneMatch returns false when no stored phone matches', () => {
  assert.strictEqual(gsPhoneMatch('5551234', ['(808) 221-8943']), false);
  assert.strictEqual(gsPhoneMatch('8082218943', ['']), false);
  assert.strictEqual(gsPhoneMatch('8082218943', []), false);
});

test('gsPhoneMatch accepts a string or array, and skips null/blank entries', () => {
  assert.strictEqual(gsPhoneMatch('2218943', '(808) 221-8943'), true);
  assert.strictEqual(gsPhoneMatch('2218943', [null, '', '(808) 221-8943']), true);
});

test('gsPhoneMatch will not span across two different stored numbers', () => {
  // digits of "8943" + "8085" must not join into one match
  assert.strictEqual(gsPhoneMatch('89438085', ['(808) 221-8943', '(808) 555-1234']), false);
});
