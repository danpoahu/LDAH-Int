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

  // ── Event Summary helpers ──────────────────────────────────────────────
  // Attendance-total + demographic override rows. The form used to re-save
  // these numbers on every save, which froze the then-current auto value as a
  // permanent override (e.g. New Parent saved as 0 before attendance was
  // marked, then shown as "0 (override)" once auto became 2). These helpers
  // make a row persist an override ONLY when it truly differs from auto, so
  // rows otherwise keep tracking the live auto value.

  // Returns the number to store, or null meaning "no override — track auto".
  function esOverrideToPersist(inputVal, autoVal) {
    if (inputVal === '' || inputVal == null) return null;
    var n = parseInt(inputVal, 10);
    if (isNaN(n)) return null;
    return (n === autoVal) ? null : n;
  }

  // Display value + whether it's a real override. Saved number wins; otherwise auto.
  function esResolveOverride(savedVal, autoVal) {
    if (typeof savedVal === 'number') return { value: savedVal, overridden: savedVal !== autoVal };
    return { value: autoVal, overridden: false };
  }

  function normalizeEmail(email) {
    return String(email == null ? '' : email).trim().toLowerCase();
  }

  // Dedup-safe contact lookup by email. Blank email never matches (avoids the
  // duplicate-contact problem that has bitten enrichment).
  function findContactByEmail(contacts, email) {
    var e = normalizeEmail(email);
    if (!e || !Array.isArray(contacts)) return null;
    for (var i = 0; i < contacts.length; i++) {
      if (normalizeEmail(contacts[i] && contacts[i].email) === e) return contacts[i];
    }
    return null;
  }

  // Attendance Total = explicit override if set, else signups-attended + walk-ins.
  function resolveAttendanceTotal(signupsAttended, manualCount, override) {
    if (typeof override === 'number') return override;
    return (signupsAttended || 0) + (manualCount || 0);
  }

  // ── Children array builder (LDAH-Int contact form) ──
  // Merge an ordered list of form children over the contact's existing
  // children[] (matched by index) so addedAt + any non-form fields survive a
  // round-trip. Drops fully-empty cards. Keeps a stored, more-specific
  // government age bucket when it canonicalizes to the same dropdown value
  // (continues the age-range-schema-migration guard). PURE: does not stamp
  // addedAt — the caller stamps it on any returned child lacking one.
  var _AR_CANON = { 'Birth-2 yrs':'0-2','Birth-2':'0-2','3-5 yrs':'3-5','6-11 yrs':'6-12','6-11':'6-12','12-14 yrs':'13-17','12-14':'13-17','15-18 yrs':'13-17','15-18':'13-17','Beyond H.S.':'Adult','Beyond HS':'Adult' };
  function _canonAgeRange(v) { return _AR_CANON[v] || v || ''; }
  function buildChildren(formChildren, prevChildren) {
    formChildren = Array.isArray(formChildren) ? formChildren : [];
    prevChildren = Array.isArray(prevChildren) ? prevChildren : [];
    var out = [];
    formChildren.forEach(function (fc, i) {
      fc = fc || {};
      var name = String(fc.name || '').trim();
      var ageRange = fc.ageRange || '';
      var gender = fc.gender || '';
      var ethnicity = fc.ethnicity || '';
      var disab = Array.isArray(fc.disabilityCategories) ? fc.disabilityCategories : [];
      if (!name && !ageRange && !gender && !ethnicity && !disab.length) return; // empty card → skip
      var prev = prevChildren[i] || {};
      // Keep the stored, more-specific age bucket when it maps to the same
      // dropdown value (e.g. stored "12-14" vs form "13-17").
      if (prev.ageRange && _canonAgeRange(prev.ageRange) === ageRange) ageRange = prev.ageRange;
      out.push(Object.assign({}, prev, {
        name: name, ageRange: ageRange, gender: gender,
        ethnicity: ethnicity, disabilityCategories: disab
      }));
    });
    return out;
  }

  // ── Phone search normalization (global search) ──
  // Strip a value down to its digits so phone matching is format-agnostic
  // (stored values vary: "(808) 221-8943", "8082218943", "808-221-8943").
  function phoneDigits(s) { return String(s == null ? '' : s).replace(/\D/g, ''); }
  // True when the query "looks like" a phone (>= 7 digits) and those digits
  // appear in one of the record's phone values. Joins with a non-digit
  // separator so a query can't span two different stored numbers.
  function gsPhoneMatch(query, phoneValues) {
    var qd = phoneDigits(query);
    if (qd.length < 7) return false;
    var arr = Array.isArray(phoneValues) ? phoneValues : [phoneValues];
    var blob = arr.map(phoneDigits).filter(Boolean).join(' ');
    return blob.indexOf(qd) !== -1;
  }

  // ── Materials distribution (event summary + interactions) ──
  // Stable, map-safe key for a material label. Rename-sensitive by design
  // (retire+add rather than rename mid-year to keep historical counts aligned).
  function materialSlug(label) {
    return String(label == null ? '' : label).toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  }
  // Normalize a distribution capture: managed rows [{label,count}] -> a
  // slug-keyed counts map (nonzero only); "Other" rows [{name,count}] -> an
  // array of named rows only (count coerced to a number, 0 allowed). PURE.
  function collectDistribution(managed, other) {
    managed = Array.isArray(managed) ? managed : [];
    other = Array.isArray(other) ? other : [];
    var counts = {};
    managed.forEach(function (m) {
      var n = parseInt(m && m.count, 10);
      if (!(n > 0)) return;
      var slug = materialSlug(m && m.label);
      if (!slug) return;
      counts[slug] = n;
    });
    var outOther = [];
    other.forEach(function (o) {
      var name = String((o && o.name) || '').trim();
      if (!name) return;
      var n = parseInt(o && o.count, 10);
      if (isNaN(n)) n = 0;
      outOther.push({ name: name, count: n });
    });
    return { counts: counts, other: outOther };
  }

  var api = {
    formatNameSmart: formatNameSmart,
    formatPhone: formatPhone,
    attachFormatter: attachFormatter,
    activeSignupDates: activeSignupDates,
    datesOverlap: datesOverlap,
    findDuplicateGroups: findDuplicateGroups,
    recommendKeeper: recommendKeeper,
    esOverrideToPersist: esOverrideToPersist,
    esResolveOverride: esResolveOverride,
    normalizeEmail: normalizeEmail,
    findContactByEmail: findContactByEmail,
    resolveAttendanceTotal: resolveAttendanceTotal,
    buildChildren: buildChildren,
    phoneDigits: phoneDigits,
    gsPhoneMatch: gsPhoneMatch,
    materialSlug: materialSlug,
    collectDistribution: collectDistribution
  };

  global.LDAHFormat = api;
})(typeof window !== 'undefined' ? window : this);
