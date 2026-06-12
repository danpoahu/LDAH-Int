/**
 * LDAH shared input formatters — name and phone.
 * Idempotent: running twice is safe. Intended for onBlur handlers.
 * Keep this file identical across W2, LDAH App, and LDAH-Int.
 */
(function (global) {
  'use strict';

  var PARTICLES = ['de','del','dela','delas','delos','della','di','du','la','las','le','van','von','der','den','da','das','do','dos','of','the'];
  var ROMAN = /^(II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)$/i;
  var HONORIFIC = /^(jr|sr|dr|mr|mrs|ms|rev|prof|hon)\.?$/i;

  function capOneWord(token, isFirst) {
    if (!token) return '';
    var lower = token.toLowerCase();

    // Roman numerals / suffixes — ALL CAPS
    if (ROMAN.test(token)) return token.toUpperCase();

    // Honorifics — Jr., Sr., Dr., etc.
    if (HONORIFIC.test(token)) {
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    // Mc prefix — McDonald, McArthur
    if (/^mc[a-z]{2,}/i.test(lower)) {
      return 'Mc' + lower.charAt(2).toUpperCase() + lower.slice(3);
    }

    // O' prefix — O'Brien, O'Connor
    if (/^o'[a-z]/i.test(lower)) {
      return "O'" + lower.charAt(2).toUpperCase() + lower.slice(3);
    }

    // D' prefix — D'Angelo, D'Amico
    if (/^d'[a-z]/i.test(lower)) {
      return "D'" + lower.charAt(2).toUpperCase() + lower.slice(3);
    }

    // Default — capitalize first letter only
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  function formatNameSmart(input) {
    if (input == null) return input;
    var str = String(input).trim().replace(/\s+/g, ' ');
    if (!str) return '';

    // Split by spaces, each word gets processed, hyphens handled within words
    var words = str.split(' ').map(function (word, idx) {
      if (word.indexOf('-') !== -1) {
        return word.split('-').map(function (p) { return capOneWord(p, false); }).join('-');
      }
      return capOneWord(word, idx === 0);
    });

    // Second pass — lowercase particles unless first word
    return words.map(function (w, idx) {
      if (idx > 0 && PARTICLES.indexOf(w.toLowerCase()) !== -1) {
        return w.toLowerCase();
      }
      return w;
    }).join(' ');
  }

  function formatPhone(input) {
    if (input == null) return input;
    var raw = String(input);
    if (!raw.trim()) return '';

    var digits = raw.replace(/\D/g, '');

    // Strip leading 1 on 11-digit US numbers
    if (digits.length === 11 && digits.charAt(0) === '1') {
      digits = digits.slice(1);
    }

    // Only format clean 10-digit US numbers
    if (digits.length === 10) {
      return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
    }

    // Leave everything else alone — extensions, international, partial entries
    return raw.trim();
  }

  /**
   * Attach onBlur formatting to an input element.
   * @param {HTMLInputElement} el
   * @param {'name'|'phone'} kind
   */
  function attachFormatter(el, kind) {
    if (!el || el.dataset.ldahFormatted === '1') return;
    var fn = kind === 'phone' ? formatPhone : formatNameSmart;
    el.addEventListener('blur', function () {
      var formatted = fn(el.value);
      if (formatted !== el.value) el.value = formatted;
    });
    el.dataset.ldahFormatted = '1';
  }

  // ---- Duplicate signup detection (pure; no DOM/Firestore) ----
  function _normEmail(s) { return String(s == null ? '' : s).trim().toLowerCase(); }

  // Active dates for a signup: [] if the doc is cancelled; otherwise its
  // selectedDates minus any date whose dateStatusOverrides entry is 'cancelled'.
  // Override keys may be composite ("DATE|loc|time") or the bare date, so we
  // match by equality or substring either direction.
  function activeSignupDates(signup) {
    if (!signup || signup.status === 'cancelled' || signup.archived === true || signup.displaced === true) return [];
    var dates = Array.isArray(signup.selectedDates) ? signup.selectedDates.slice()
              : (signup.signupDates != null ? [].concat(signup.signupDates) : []);
    var ov = signup.dateStatusOverrides || {};
    var cancelledKeys = Object.keys(ov).filter(function (k) { return ov[k] === 'cancelled'; });
    return dates.filter(function (d) {
      var ds = String(d);
      return !cancelledKeys.some(function (k) {
        return k === ds || k.indexOf(ds) !== -1 || ds.indexOf(k) !== -1;
      });
    });
  }

  function datesOverlap(a, b) {
    if (!a || !b) return false;
    var setB = {}; b.forEach(function (d) { setB[String(d)] = true; });
    return a.some(function (d) { return !!setB[String(d)]; });
  }

  // Group signups by same email + overlapping active dates (transitively).
  // Input: array of signup objects {id, email, selectedDates, status, dateStatusOverrides}.
  // Output: array of groups, each an array of signup ids (length >= 2).
  function findDuplicateGroups(signups) {
    var byEmail = {};
    (signups || []).forEach(function (s) {
      var e = _normEmail(s.email);
      if (!e) return;
      var ad = activeSignupDates(s);
      if (!ad.length) return;
      (byEmail[e] = byEmail[e] || []).push({ id: s.id, dates: ad });
    });
    var groups = [];
    Object.keys(byEmail).forEach(function (e) {
      var recs = byEmail[e];
      var parent = recs.map(function (_, i) { return i; });
      function find(i) { while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; } return i; }
      function union(i, j) { parent[find(i)] = find(j); }
      for (var i = 0; i < recs.length; i++) {
        for (var j = i + 1; j < recs.length; j++) {
          if (datesOverlap(recs[i].dates, recs[j].dates)) union(i, j);
        }
      }
      var clusters = {};
      recs.forEach(function (r, idx) { var root = find(idx); (clusters[root] = clusters[root] || []).push(r.id); });
      Object.keys(clusters).forEach(function (root) {
        if (clusters[root].length >= 2) groups.push(clusters[root]);
      });
    });
    return groups;
  }

  // Recommend which record to KEEP. records: [{id, hasFeedback, hasAttendance, status, timestampMs}].
  // Keep richest (feedback > attendance > confirmed); tiebreak = earliest signup.
  function recommendKeeper(records) {
    function score(r) {
      return (r.hasFeedback ? 1000 : 0) + (r.hasAttendance ? 100 : 0) + (r.status === 'confirmed' ? 10 : 0);
    }
    return records.slice().sort(function (a, b) {
      var d = score(b) - score(a); if (d) return d;
      return (a.timestampMs || 0) - (b.timestampMs || 0);
    })[0];
  }

  var api = {
    formatNameSmart: formatNameSmart,
    formatPhone: formatPhone,
    attachFormatter: attachFormatter,
    activeSignupDates: activeSignupDates,
    datesOverlap: datesOverlap,
    findDuplicateGroups: findDuplicateGroups,
    recommendKeeper: recommendKeeper
  };

  global.LDAHFormat = api;
})(typeof window !== 'undefined' ? window : this);
