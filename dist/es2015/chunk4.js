import { parseISO, isValid, format, toDate, formatDistanceStrict, formatDistance } from 'date-fns';
import kramed from 'kramed';
import numeral from 'numeral';

var UIFormat;
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
        }).replace(/(\<a href=)/gi, '<a class="ui-link" target="_blank" href=');
    }
    UIFormat.toHTML = toHTML;
    function parseDate(dt) {
        return typeof dt === "string" ? parseISO(dt) : dt;
    }
    function date(dt, ft = "dd MMM yyyy") {
        dt = parseDate(dt);
        return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
    }
    UIFormat.date = date;
    function time(dt, ft = "hh:mm a") {
        dt = parseDate(dt);
        return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
    }
    UIFormat.time = time;
    function datetime(dt, ft = "dd MMM yyyy hh:mm a") {
        dt = parseDate(dt);
        return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
    }
    UIFormat.datetime = datetime;
    function dateToISO(dt) {
        dt = parseDate(dt);
        return !dt || !isValid(dt) ? null : toDate(dt).toISOString();
    }
    UIFormat.dateToISO = dateToISO;
    function utcDate(dt) {
        dt = parseDate(dt);
        return !dt || !isValid(dt)
            ? null
            : format(dt, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
                awareOfUnicodeTokens: true
            });
    }
    UIFormat.utcDate = utcDate;
    function age(dt) {
        dt = parseDate(dt);
        return !dt || !isValid(dt) ? "" : formatDistanceStrict(dt, new Date());
    }
    UIFormat.age = age;
    function fromNow(dt) {
        dt = parseDate(dt);
        return !dt || !isValid(dt) ? "" : formatDistance(dt, new Date(), { addSuffix: true });
    }
    UIFormat.fromNow = fromNow;
    function number(nm, fm = "0,0[.]00") {
        return nm === null || isNaN(nm) ? "" : numeral(nm).format(fm);
    }
    UIFormat.number = number;
    function currency(nm, sy = "$", fm = "$ 0,0.00") {
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

export { UIFormat as a };
//# sourceMappingURL=chunk4.js.map
