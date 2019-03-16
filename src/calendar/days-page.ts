/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";
import {
  addDays,
  addWeeks,
  endOfDay,
  format,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  setDay,
  startOfDay,
  startOfMonth,
  startOfWeek
} from "date-fns";
import { IDateConfig, isDisabled } from "./calendar-utils";
import view from "./days-page.html";

@customElement("days-page")
@inlineView(view)
export class DaysPage {
  @bindable()
  public month: Date;

  @bindable()
  public config: IDateConfig;

  protected pageStart: Date;
  protected isAttached: boolean = false;

  protected attached() {
    this.isAttached = true;
  }

  protected monthChanged(newMonth) {
    this.month = newMonth || new Date();
    const start = startOfMonth(this.month);
    this.pageStart = startOfWeek(startOfMonth(this.month));
    if (getDay(start) < 3) {
      this.pageStart = addWeeks(this.pageStart, -1);
    }
  }

  protected weekTitle(week: number): string {
    return format(setDay(new Date(), week), "E").substr(0, 2);
  }

  protected weekNumber(week: number): string {
    return format(addWeeks(this.pageStart, week), "ww");
  }

  protected getDate(week: number, day: number): KeyValue {
    const date = addDays(addWeeks(this.pageStart, week), day);

    const classes = [];
    if (!isSameMonth(this.month, date)) {
      classes.push("date-other");
    }
    if (isSameDay(new Date(), date)) {
      classes.push("date-today");
    }
    if (this.config) {
      if (isArray(this.config.date)) {
        if (
          isAfter(startOfDay(date), this.config.date[0]) &&
          isBefore(endOfDay(date), this.config.date[1])
        ) {
          classes.push("select-hilight");
        }
        if (isSameDay(date, this.config.date[0])) {
          classes.push("select-start");
        }
        if (isSameDay(date, this.config.date[1])) {
          classes.push("select-end");
        }
      }
      if (isDate(this.config.date) && isSameDay(date, this.config.date)) {
        classes.push("selected");
      }

      if (isDisabled(this.config, date)) {
        classes.push("disabled");
      }
    }

    return { date, label: format(date, "dd"), classes: classes.join(" ") };
  }
}
