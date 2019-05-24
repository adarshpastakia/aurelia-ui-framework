/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { format, formatDistance, formatDistanceStrict, isValid, parseISO, toDate } from "date-fns";
import kramed from "kramed";
import numeral from "numeral";

export namespace UIFormat {
  export function toHTML(md): string {
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

  // Dates
  function parseDate(dt: string | Date) {
    return typeof dt === "string" ? parseISO(dt) : dt;
  }

  export function date(dt: AnyObject, ft: string = "dd MMM yyyy"): string {
    dt = parseDate(dt);
    return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
  }

  export function time(dt: AnyObject, ft: string = "hh:mm a"): string {
    dt = parseDate(dt);
    return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
  }

  export function datetime(dt: AnyObject, ft: string = "dd MMM yyyy hh:mm a"): string {
    dt = parseDate(dt);
    return !dt || !isValid(dt) ? null : format(dt, ft, { awareOfUnicodeTokens: true });
  }

  export function utcDate(dt): string {
    dt = parseDate(dt);
    return !dt || !isValid(dt) ? null : toDate(dt).toISOString();
  }

  export function dateToISO(dt): string {
    dt = parseDate(dt);
    return !dt || !isValid(dt)
      ? null
      : format(dt, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
          awareOfUnicodeTokens: true
        });
  }

  export function age(dt: AnyObject): string {
    dt = parseDate(dt);
    return !dt || !isValid(dt) ? "" : formatDistanceStrict(dt, new Date());
  }

  export function fromNow(dt: AnyObject): string {
    dt = parseDate(dt);
    return !dt || !isValid(dt) ? "" : formatDistance(dt, new Date(), { addSuffix: true });
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
