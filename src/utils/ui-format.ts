//
// @description :
// @author    : Adarsh Pastakia
// @copyright   : 2016
// @license   : MIT

import kramed from "kramed";
import moment from "moment";
import numeral from "numeral";

(moment as typeof moment & {
  suppressDeprecationWarnings: boolean;
}).suppressDeprecationWarnings = true;

export namespace UIFormat {
  export function toHTML(md): string {
    return kramed(md).replace(/(\<a href=)/gi, '<a class="ui-link" target="_blank" href=');
  }

  // Dates
  export function date(dt: AnyObject, ft: string = "DD MMM YYYY"): string {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
  }

  export function time(dt: AnyObject, ft: string = "hh:mm A"): string {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
  }

  export function datetime(dt: AnyObject, ft: string = "DD MMM YYYY hh:mm A"): string {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
  }

  export function dateToISO(dt): string {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.toISOString();
  }

  export function utcDate(dt): string {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? null : x.utc();
  }

  export function age(dt: AnyObject): string {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? "" : x.fromNow(true);
  }

  export function fromNow(dt: AnyObject): string {
    let x;
    return !dt || !(x = moment(dt)).isValid() ? "" : x.fromNow(false);
  }

  // Numbers
  export function number(nm: AnyObject, fm: string = "0,0[.]00"): string {
    return nm === null || isNaN(nm) ? "" : numeral(nm).format(fm);
  }

  export function currency(nm: AnyObject, sy: string = "$", fm: string = "$ 0,0.00"): string {
    return nm === null || isNaN(nm)
      ? ""
      : numeral(nm)
          .format(fm)
          .replace("$", sy);
  }

  export function percent(nm: AnyObject): string {
    return nm === null || isNaN(nm) ? "" : numeral(nm > 1 ? nm / 100 : nm).format("0.00%");
  }
}
