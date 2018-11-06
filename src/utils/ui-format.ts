//
// @description :
// @author    : Adarsh Pastakia
// @copyright   : 2016
// @license   : MIT

import { format, formatDistance, formatDistanceStrict, isValid, toDate } from "date-fns";
import kramed from "kramed";
import numeral from "numeral";

export namespace UIFormat {
  export function toHTML(md): string {
    return kramed(md).replace(/(\<a href=)/gi, '<a class="ui-link" target="_blank" href=');
  }

  // Dates
  export function date(dt: AnyObject, ft: string = "dd MMM yyyy"): string {
    return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
  }

  export function time(dt: AnyObject, ft: string = "hh:mm A"): string {
    return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
  }

  export function datetime(dt: AnyObject, ft: string = "dd MMM yyyy hh:mm A"): string {
    return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
  }

  export function dateToISO(dt): string {
    return !dt || !isValid(dt)
      ? null
      : format(dt, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { awareOfUnicodeTokens: true });
  }

  export function utcDate(dt): string {
    return !dt || !isValid(dt)
      ? null
      : format(toDate(dt).toUTCString(), "yyyy-MM-dd'T'HH:mm:ss.SSS", { awareOfUnicodeTokens: true });
  }

  export function age(dt: AnyObject): string {
    return !dt || !isValid(dt) ? "" : formatDistanceStrict(new Date(), dt);
  }

  export function fromNow(dt: AnyObject): string {
    return !dt || !isValid(dt) ? "" : formatDistance(new Date(), dt);
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
