/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, bindingMode, customElement } from "aurelia-framework";
import { addMonths, isAfter, isSameMonth, startOfMonth, subMonths } from "date-fns";

@autoinject()
@customElement("ui-date-range")
export class UIDateRange {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public startDate: Date | string;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public endDate: Date | string;

  @bindable()
  public minDate: string;
  @bindable()
  public maxDate: string;
  @bindable()
  public disabledDays: number[];
  @bindable()
  public disabledDates: (({ date }) => boolean) | string[];

  @bindable()
  public disabled: boolean = false;

  protected startMonth = startOfMonth(new Date());
  protected endMonth = addMonths(startOfMonth(new Date()), 1);

  constructor(private element: Element) {}

  protected startMonthChanged(month) {
    this.startMonth = month;
    if (isSameMonth(this.startMonth, this.endMonth) || isAfter(this.startMonth, this.endMonth)) {
      this.endMonth = addMonths(this.startMonth, 1);
    }
  }
  protected endMonthChanged(month) {
    this.endMonth = month;
    if (isSameMonth(this.startMonth, this.endMonth) || isAfter(this.startMonth, this.endMonth)) {
      this.startMonth = subMonths(this.endMonth, 1);
    }
  }
}
