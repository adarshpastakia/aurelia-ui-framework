//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT

import * as kramed from "kramed";
import * as moment from "moment";
import * as numeral from "numeral";

export module UIFormat {
  export function toHTML(md) {
    return kramed(md).replace(/(\<a href=)/gi, '<a target="_blank" href=');
  }

  // Dates
  export function date(dt: any, ft: string = 'DD MMM YYYY') {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
  }

  export function time(dt: any, ft: string = 'hh:mm A') {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
  }

  export function datetime(dt: any, ft: string = 'DD MMM YYYY hh:mm A') {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
  }

  export function dateToISO(dt) {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.toISOString();
  }

  export function utcDate(dt) {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.utc();
  }

  export function age(dt: any): string {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? '' : x.fromNow(true);
  }

  export function fromNow(dt: any): string {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? '' : x.fromNow(false);
  }

  // Numbers
  export function number(nm: any, fm: string = '0,0[.]00'): string {
    let ret = nm === null || isNaN(nm) ? '' : numeral(nm).format(fm);
    if (fm.indexOf('{') === 0) {
      let minlen = fm.length - 2;
      if (ret.length < minlen) {
        ret = Array(minlen - ret.length + 1).join('0') + ret;
      }
    }
    return ret;
  }

  export function currency(nm: any, sy: string = '$', fm: string = '$ 0,0.00'): string {
    return nm === null || isNaN(nm) ? '' :
      numeral(nm)
        .format(fm)
        .replace('$', sy);
  }

  export function percent(nm: any): string {
    return nm === null || isNaN(nm) ? '' :
      numeral(nm > 1 ? nm / 100 : nm)
        .format('0.00%');
  }

  export function exRate(nm: any): string {
    return nm === null || isNaN(nm) ? '' :
      numeral(nm > 0 ? 1 / nm : nm)
        .format('0.0000[a]');
  }
}
