/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";
import { addYears, format, isSameYear, startOfDecade } from "date-fns";
import { IDateConfig, isDisabled } from "./calendar-utils";
import view from "./years-page.html";

@customElement("years-page")
@inlineView(view)
export class YearsPage {
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
    this.pageStart = addYears(startOfDecade(this.month), -1);
  }

  protected getYear(year: number): KeyValue {
    const date = addYears(this.pageStart, year);

    const classes = [];
    if (year === 0 || year === 11) {
      classes.push("date-other");
    }
    if (this.config) {
      if (isDate(this.config.date) && isSameYear(date, this.config.date)) {
        classes.push("selected");
      }

      if (isDisabled({ disabled: [], ...this.config }, date)) {
        classes.push("disabled");
      }
    }

    return { date, label: format(date, "yyyy"), classes: classes.join(" ") };
  }
}
