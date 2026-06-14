// test-event-label.js  —  run with: node scripts/test-event-label.js

// 1) PASTE the real _rsParseSessionDate(str) from index.html (~line 31797) here:
function _rsParseSessionDate(raw) {
  if (!raw) return null;
  try {
    var d;
    if (raw && raw.toDate) d = raw.toDate();
    else if (raw && raw.seconds) d = new Date(raw.seconds * 1000);
    else if (typeof raw === 'string') {
      // "YYYY-MM-DD"
      var iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (iso) {
        d = new Date(parseInt(iso[1],10), parseInt(iso[2],10)-1, parseInt(iso[3],10));
        return d;
      }
      // Strip a trailing time range so strings like "May 13, 2026, 5:00 pm - 6:00 pm"
      // (irregular spacing breaks new Date) still parse to just the date.
      var named = raw.match(/^([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s*(\d{4})/);
      if (named) {
        d = new Date(named[1] + ' ' + named[2] + ', ' + named[3]);
        if (!isNaN(d.getTime())) return new Date(d.getFullYear(), d.getMonth(), d.getDate());
      }
      // "Wednesday, April 22, 2026"
      d = new Date(raw);
      if (!isNaN(d.getTime())) return new Date(d.getFullYear(), d.getMonth(), d.getDate());
      return null;
    } else {
      d = new Date(raw);
    }
    if (!d || isNaN(d.getTime())) return null;
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  } catch (_) { return null; }
}

// 2) Helpers under test (these get copied into index.html in Step 4):
function _rsOrdinal(n){
  var s = ['th','st','nd','rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function _rsEventSessionLabel(ev, key){
  ev = ev || {};
  var title = (ev.title || 'Event').trim();
  var isSingle = (!key || key === '_single');
  var series = title.indexOf(':') >= 0 ? title.slice(0, title.indexOf(':')).trim() : title;
  var dateSource = isSingle ? ((ev.signupDates && ev.signupDates[0]) || ev.eventDate || '') : key;
  var d = (typeof _rsParseSessionDate === 'function') ? _rsParseSessionDate(dateSource) : null;
  if (!d || isNaN(d.getTime())) return title + (isSingle ? '' : ' (' + key + ')');
  var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var formattedDate = MONTHS[d.getMonth()] + ' ' + _rsOrdinal(d.getDate());
  var src = (typeof dateSource === 'string') ? dateSource : '';
  var parts = src.split(' - ');
  var topic = parts.length >= 3 ? parts[1].trim() : '';
  return series + ' ' + formattedDate + (topic ? ' ' + topic : '');
}

// 3) Assertions
var assert = require('assert');
var ev = { title: 'Learning Labs: For the Month of June, Navigating Transitions and Understanding ADHD' };

// multi-date conforming key
assert.strictEqual(
  _rsEventSessionLabel(ev, 'June 10, 2026 - Navigating Transitions - 5:00 PM'),
  'Learning Labs June 10th Navigating Transitions');

// ordinals
assert.strictEqual(_rsOrdinal(1), '1st');
assert.strictEqual(_rsOrdinal(2), '2nd');
assert.strictEqual(_rsOrdinal(3), '3rd');
assert.strictEqual(_rsOrdinal(11), '11th');
assert.strictEqual(_rsOrdinal(21), '21st');
assert.strictEqual(_rsOrdinal(10), '10th');

// single-date event uses signupDates[0]; no topic segment → series + date only
assert.strictEqual(
  _rsEventSessionLabel({ title: 'Coffee Chat', signupDates: ['May 13, 2026, 5:00 pm - 6:00 pm'] }, '_single'),
  'Coffee Chat May 13th');

// non-conforming title (no colon), conforming key → whole title is the series
assert.strictEqual(
  _rsEventSessionLabel({ title: 'Reading Strategies' }, 'July 8, 2026 - Reading Strategies - 3:00 PM'),
  'Reading Strategies July 8th Reading Strategies');

// unparseable date → graceful fallback to old behavior
assert.strictEqual(
  _rsEventSessionLabel({ title: 'Mystery Event' }, 'whenever - TBD'),
  'Mystery Event (whenever - TBD)');

console.log('ALL LABEL TESTS PASSED');
