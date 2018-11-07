/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, bindingMode, customElement } from "aurelia-framework";
import { addMonths, isAfter, isSameMonth, startOfMonth, subMonths, toDate } from "date-fns";

@autoinject()
@customElement("ui-date-range")
export class UIDateRange {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public start: Date | string = new Date();
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public end: Date | string = new Date();

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

  protected startVm;
  protected endVm;

  protected startMonth = startOfMonth(new Date());
  protected endMonth = addMonths(startOfMonth(new Date()), 1);

  constructor(private element: Element) {}

  protected attached(): void {
    this.startVm.monthChanged = month => this.startMonthChanged(month);
    this.endVm.monthChanged = month => this.endMonthChanged(month);

    this.startVm.currentMonth = this.startMonth;
    this.endVm.currentMonth = this.endMonth;
  }

  protected startMonthChanged(month) {
    this.startMonth = month;
    if (isSameMonth(this.startMonth, this.endMonth) || isAfter(this.startMonth, this.endMonth)) {
      this.endMonth = addMonths(this.startMonth, 1);
    }

    this.startVm.currentMonth = this.startMonth;
    this.endVm.currentMonth = this.endMonth;
  }
  protected endMonthChanged(month) {
    this.endMonth = month;
    if (isSameMonth(this.startMonth, this.endMonth) || isAfter(this.startMonth, this.endMonth)) {
      this.startMonth = subMonths(this.endMonth, 1);
    }

    this.startVm.currentMonth = this.startMonth;
    this.endVm.currentMonth = this.endMonth;
  }

  protected setRange(date): void {
    if (!this.start || this.end) {
      this.end = undefined;
      this.start = date;
      this.startVm.currentMonth = startOfMonth(this.start);
    } else {
      if (isAfter(this.start, date)) {
        this.start = date;
        this.startVm.currentMonth = startOfMonth(this.start);
      } else {
        this.end = date;
        if (!isSameMonth(this.start, this.end)) {
          this.endVm.currentMonth = startOfMonth(this.end);
        }
      }
    }
  }

  protected hilightDate($event: UIEvent): void {
    if (($event.target as HTMLElement).dataset.date) {
      this.startVm.hilight = toDate(($event.target as HTMLElement).dataset.date);
      this.endVm.hilight = toDate(($event.target as HTMLElement).dataset.date);
    }
  }
}
