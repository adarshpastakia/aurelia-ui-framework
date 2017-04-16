import * as kramed from "kramed";
import * as moment from "moment";
import * as numeral from "numeral";
export var UIFormat;
(function (UIFormat) {
    function toHTML(md) {
        return kramed(md).replace(/(\<a href=)/gi, '<a target="_blank" href=');
    }
    UIFormat.toHTML = toHTML;
    function date(dt, ft = 'DD MMM YYYY') {
        let x;
        return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
    }
    UIFormat.date = date;
    function time(dt, ft = 'hh:mm A') {
        let x;
        return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
    }
    UIFormat.time = time;
    function datetime(dt, ft = 'DD MMM YYYY hh:mm A') {
        let x;
        return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
    }
    UIFormat.datetime = datetime;
    function dateToISO(dt) {
        let x;
        return !dt || !(x = moment(dt)).isValid() ? null : x.toISOString();
    }
    UIFormat.dateToISO = dateToISO;
    function utcDate(dt) {
        let x;
        return !dt || !(x = moment(dt)).isValid() ? null : x.utc();
    }
    UIFormat.utcDate = utcDate;
    function age(dt) {
        let x;
        return !dt || !(x = moment(dt)).isValid() ? '' : x.fromNow(true);
    }
    UIFormat.age = age;
    function fromNow(dt) {
        let x;
        return !dt || !(x = moment(dt)).isValid() ? '' : x.fromNow(false);
    }
    UIFormat.fromNow = fromNow;
    function number(nm, fm = '0,0[.]00') {
        let ret = nm === null || isNaN(nm) ? '' : numeral(nm).format(fm);
        if (fm.indexOf('{') === 0) {
            let minlen = fm.length - 2;
            if (ret.length < minlen) {
                ret = Array(minlen - ret.length + 1).join('0') + ret;
            }
        }
        return ret;
    }
    UIFormat.number = number;
    function currency(nm, sy = '$', fm = '$ 0,0.00') {
        return nm === null || isNaN(nm) ? '' :
            numeral(nm)
                .format(fm)
                .replace('$', sy);
    }
    UIFormat.currency = currency;
    function percent(nm) {
        return nm === null || isNaN(nm) ? '' :
            numeral(nm > 1 ? nm / 100 : nm)
                .format('0.00%');
    }
    UIFormat.percent = percent;
    function exRate(nm) {
        return nm === null || isNaN(nm) ? '' :
            numeral(nm > 0 ? 1 / nm : nm)
                .format('0.0000[a]');
    }
    UIFormat.exRate = exRate;
})(UIFormat || (UIFormat = {}));
