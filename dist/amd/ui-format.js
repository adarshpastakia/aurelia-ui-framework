define(['exports', 'date-fns', 'kramed', 'numeral'], function (exports, dateFns, kramed, numeral) { 'use strict';

  kramed = kramed && kramed.hasOwnProperty('default') ? kramed['default'] : kramed;
  numeral = numeral && numeral.hasOwnProperty('default') ? numeral['default'] : numeral;

  (function (UIFormat) {
      function toHTML(md) {
          return kramed(md, {
              gfm: true,
              tables: true,
              breaks: true,
              pedantic: false,
              sanitize: false,
              smartLists: true,
              smartypants: false
          }).replace(/(<a href=)/gi, '<a class="ui-link" target="_blank" href=');
      }
      UIFormat.toHTML = toHTML;
      function parseDate(dt) {
          return typeof dt === "string" ? dateFns.parseISO(dt) : dt;
      }
      function date(dt, ft) {
          if (ft === void 0) { ft = "dd MMM yyyy"; }
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt)
              ? null
              : dateFns.format(dt, ft, { useAdditionalDayOfYearTokens: true, useAdditionalWeekYearTokens: true });
      }
      UIFormat.date = date;
      function time(dt, ft) {
          if (ft === void 0) { ft = "hh:mm a"; }
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt)
              ? null
              : dateFns.format(dt, ft, { useAdditionalDayOfYearTokens: true, useAdditionalWeekYearTokens: true });
      }
      UIFormat.time = time;
      function datetime(dt, ft) {
          if (ft === void 0) { ft = "dd MMM yyyy hh:mm a"; }
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt)
              ? null
              : dateFns.format(dt, ft, { useAdditionalDayOfYearTokens: true, useAdditionalWeekYearTokens: true });
      }
      UIFormat.datetime = datetime;
      function utcDate(dt) {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt) ? null : dateFns.toDate(dt).toISOString();
      }
      UIFormat.utcDate = utcDate;
      function dateToISO(dt) {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt)
              ? null
              : dateFns.format(dt, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
                  useAdditionalDayOfYearTokens: true,
                  useAdditionalWeekYearTokens: true
              });
      }
      UIFormat.dateToISO = dateToISO;
      function age(dt) {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt) ? "" : dateFns.formatDistanceStrict(dt, new Date());
      }
      UIFormat.age = age;
      function fromNow(dt) {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt) ? "" : dateFns.formatDistance(dt, new Date(), { addSuffix: true });
      }
      UIFormat.fromNow = fromNow;
      function number(nm, fm) {
          if (fm === void 0) { fm = "0,0[.]00"; }
          return nm === null || isNaN(nm) ? "" : numeral(nm).format(fm);
      }
      UIFormat.number = number;
      function currency(nm, sy, fm) {
          if (sy === void 0) { sy = "$"; }
          if (fm === void 0) { fm = "$ 0,0.00"; }
          return nm === null || isNaN(nm)
              ? ""
              : numeral(nm)
                  .format(fm)
                  .replace("$", sy);
      }
      UIFormat.currency = currency;
      function percent(nm) {
          return nm === null || isNaN(nm) ? "" : numeral(nm > 1 ? nm / 100 : nm).format("0.00%");
      }
      UIFormat.percent = percent;
  })(exports.UIFormat || (exports.UIFormat = {}));

});
//# sourceMappingURL=ui-format.js.map
