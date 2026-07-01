const test = require('node:test');
const assert = require('node:assert');
const { LDAHFormat } = require('../STAGE/formatters.js');
const { materialSlug, collectDistribution } = LDAHFormat;

test('materialSlug lowercases and slugifies safely', () => {
  assert.strictEqual(materialSlug('Agency Brochure'), 'agency_brochure');
  assert.strictEqual(materialSlug('Education & Training Brochure'), 'education_training_brochure');
  assert.strictEqual(materialSlug('Beyond H.S.'), 'beyond_h_s');
  assert.strictEqual(materialSlug('  Flyers  '), 'flyers');
  assert.strictEqual(materialSlug('Understanding ADHD Brochure'), 'understanding_adhd_brochure');
});

test('materialSlug collapses repeats and trims separators', () => {
  assert.strictEqual(materialSlug('A   ---   B'), 'a_b');
  assert.strictEqual(materialSlug('!!!Hello!!!'), 'hello');
  assert.strictEqual(materialSlug(''), '');
  assert.strictEqual(materialSlug(null), '');
});

test('collectDistribution keeps only nonzero counts, keyed by slug', () => {
  const managed = [
    { label: 'Agency Brochure', count: '2' },
    { label: 'Flyers', count: 0 },
    { label: 'Newsletters', count: '' },
    { label: 'Understanding Autism', count: 3 },
  ];
  const out = collectDistribution(managed, []);
  assert.deepStrictEqual(out.counts, { agency_brochure: 2, understanding_autism: 3 });
  assert.deepStrictEqual(out.other, []);
});

test('collectDistribution keeps only named Other rows, coercing counts to numbers', () => {
  const other = [
    { name: '  Spanish IEP Guide ', count: '4' },
    { name: '', count: '9' },       // no name -> dropped
    { name: 'Sticker packs', count: 0 }, // named but zero count still kept (it was distributed/handed)
  ];
  const out = collectDistribution([], other);
  assert.deepStrictEqual(out.other, [
    { name: 'Spanish IEP Guide', count: 4 },
    { name: 'Sticker packs', count: 0 },
  ]);
});

test('collectDistribution: bad numbers become 0, and everything-empty yields empty', () => {
  const out = collectDistribution(
    [{ label: 'Flyers', count: 'abc' }],
    [{ name: '', count: '' }]
  );
  assert.deepStrictEqual(out.counts, {});
  assert.deepStrictEqual(out.other, []);
});

test('collectDistribution handles undefined inputs', () => {
  const out = collectDistribution(undefined, undefined);
  assert.deepStrictEqual(out, { counts: {}, other: [] });
});
