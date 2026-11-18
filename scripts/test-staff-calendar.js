// Pure helpers of the Staff calendar (STAGE/index.html, between SC-PURE markers).
//   node scripts/test-staff-calendar.js
const fs = require('fs'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'STAGE', 'index.html'), 'utf8');
const a = html.indexOf('/* SC-PURE-START */'), b = html.indexOf('/* SC-PURE-END */');
if (a < 0 || b < 0) { console.error('FAIL: SC-PURE markers missing'); process.exit(1); }
const { _scParseTime, _scRoleFor, _scLayoutDay } = new Function(html.slice(a, b) + '; return {_scParseTime,_scRoleFor,_scLayoutDay};')();
let pass = 0, fail = 0;
const eq = (n, x, y) => { if (JSON.stringify(x) === JSON.stringify(y)) pass++; else { fail++; console.error('FAIL ' + n + '\n  expected ' + JSON.stringify(y) + '\n  actual   ' + JSON.stringify(x)); } };
eq('4pm', _scParseTime('4pm'), { start: '16:00', end: '' });
eq('range', _scParseTime('10:00 AM – 12:00 PM'), { start: '10:00', end: '12:00' });
eq('label', _scParseTime('December 3rd -- 4pm'), { start: '16:00', end: '' });
eq('9-11am', _scParseTime('9-11am'), { start: '09:00', end: '11:00' });
eq('TBA', _scParseTime('TBA'), null);
eq('blank', _scParseTime(''), null);
eq('Morning', _scParseTime('Morning'), null);
eq('12pm', _scParseTime('12pm').start, '12:00');
eq('12am', _scParseTime('12am').start, '00:00');
eq('5:30-7 pm', _scParseTime('5:30-7 pm'), { start: '17:30', end: '19:00' });
eq('24h', _scParseTime('15:00-17:00'), { start: '15:00', end: '17:00' });
eq('Dec 3rd no time', _scParseTime('December 3rd'), null);
eq('Dec 5 range', _scParseTime('December 5 -- 10am-2pm'), { start: '10:00', end: '14:00' });
eq('Dec 3 4pm', _scParseTime('December 3 -- 4pm'), { start: '16:00', end: '' });
eq('Dec 3 - 4:00 PM', _scParseTime('Dec 3 - 4:00 PM'), { start: '16:00', end: '' });
eq('Nov 21 - 9am', _scParseTime('Nov 21 - 9am'), { start: '09:00', end: '' });
eq('12/5 -- 10:00am', _scParseTime('12/5 -- 10:00am'), { start: '10:00', end: '' });
eq('Sat, Dec 5, 2026 9-11am', _scParseTime('Saturday, December 5, 2026 9-11am'), { start: '09:00', end: '11:00' });
eq('1:00-3:00 bare = afternoon', _scParseTime('1:00-3:00'), { start: '13:00', end: '15:00' });
eq('bare 9:30 stays morning', _scParseTime('9:30'), { start: '09:30', end: '' });
eq('11:00-1:00 bare', _scParseTime('11:00-1:00'), { start: '11:00', end: '13:00' });
const nameOf = (u) => ({ B: 'pat lee' })[u] || '';
eq('lead', _scRoleFor({ leadUids: ['A'] }, 'A', nameOf), 'lead');
eq('helper', _scRoleFor({ leadUids: [], helperUids: ['A'] }, 'A', nameOf), 'helper');
eq('attendee', _scRoleFor({ attendeeUids: ['A'] }, 'A', nameOf), 'attendee');
eq('everyone', _scRoleFor({ everyone: true }, 'A', nameOf), 'everyone');
eq('not on it', _scRoleFor({ leadUids: ['X'] }, 'A', nameOf), '');
eq('name match', _scRoleFor({ leadUids: [], leadNames: ['Pat Lee '] }, 'B', nameOf), 'lead');
eq('lead beats helper', _scRoleFor({ leadUids: ['A'], helperUids: ['A'] }, 'A', nameOf), 'lead');
eq('layout', _scLayoutDay([{ start: '09:00', end: '10:00' }, { start: '09:30', end: '11:00' }, { start: '09:45', end: '10:15' }, { start: '13:00', end: '14:00' }]),
  [{ col: 0, cols: 3 }, { col: 1, cols: 3 }, { col: 2, cols: 3 }, { col: 0, cols: 1 }]);
eq('no end = 60 min', _scLayoutDay([{ start: '09:00', end: '' }, { start: '09:50', end: '10:30' }, { start: '10:00', end: '10:30' }]),
  [{ col: 0, cols: 2 }, { col: 1, cols: 2 }, { col: 0, cols: 2 }]);
eq('reuse column', _scLayoutDay([{ start: '09:00', end: '10:00' }, { start: '10:00', end: '11:00' }]), [{ col: 0, cols: 1 }, { col: 0, cols: 1 }]);
console.log(pass + ' passed, ' + fail + ' failed'); process.exit(fail ? 1 : 0);
