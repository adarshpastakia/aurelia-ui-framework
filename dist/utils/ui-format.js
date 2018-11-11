//
// @description :
// @author    : Adarsh Pastakia
// @copyright   : 2016
// @license   : MIT
import { format, formatDistance, formatDistanceStrict, isValid, toDate } from "date-fns";
import kramed from "kramed";
import numeral from "numeral";
export var UIFormat;
(function (UIFormat) {
    function toHTML(md) {
        return kramed(md).replace(/(\<a href=)/gi, '<a class="ui-link" target="_blank" href=');
    }
    UIFormat.toHTML = toHTML;
    // Dates
    function date(dt, ft) {
        if (ft === void 0) { ft = "dd MMM yyyy"; }
        return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
    }
    UIFormat.date = date;
    function time(dt, ft) {
        if (ft === void 0) { ft = "hh:mm a"; }
        return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
    }
    UIFormat.time = time;
    function datetime(dt, ft) {
        if (ft === void 0) { ft = "dd MMM yyyy hh:mm a"; }
        return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
    }
    UIFormat.datetime = datetime;
    function dateToISO(dt) {
        return !dt || !isValid(dt) ? null : toDate(dt).toISOString();
    }
    UIFormat.dateToISO = dateToISO;
    function utcDate(dt) {
        return !dt || !isValid(dt)
            ? null
            : format(dt, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
                awareOfUnicodeTokens: true
            });
    }
    UIFormat.utcDate = utcDate;
    function age(dt) {
        return !dt || !isValid(dt) ? "" : formatDistanceStrict(dt, new Date());
    }
    UIFormat.age = age;
    function fromNow(dt) {
        return !dt || !isValid(dt) ? "" : formatDistance(dt, new Date(), { addSuffix: true });
    }
    UIFormat.fromNow = fromNow;
    // Numbers
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
})(UIFormat || (UIFormat = {}));
