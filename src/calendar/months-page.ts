/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";
import { format, isSameMonth, setMonth } from "date-fns";
import { IDateConfig, isDisabled } from "./calendar-utils";
import view from "./months-page.html";

@customElement("months-page")
@inlineView(view)
export class MonthsPage {
  @bindable()
  public month: Date;

  @bindable()
  public config: IDateConfig;

  protected isAttached: boolean = false;

  protected attached() {
    this.isAttached = true;
  }

  protected getMonth(month: number): KeyValue {
    const date = setMonth(this.month, month);

    const classes = [];
    if (this.config) {
      if (isDate(this.config.date) && isSameMonth(date, this.config.date)) {
        classes.push("selected");
      }

      if (isDisabled({ disabled: [], ...this.config }, date)) {
        classes.push("disabled");
      }
    }

    return { date, label: format(date, "MMM"), classes: classes.join(" ") };
  }
}
