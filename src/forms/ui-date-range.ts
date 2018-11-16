/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, bindingMode, computedFrom, customElement } from "aurelia-framework";
import {
  addMonths,
  endOfWeek,
  isAfter,
  isBefore,
  isWithinInterval,
  startOfMonth,
  subMonths,
  toDate
} from "date-fns";

export enum UIDateRangeKeys {
  TODAY = "TODAY",
  YESTERDAY = "YESTERDAY",
  THIS_WEEK = "THIS_WEEK",
  LAST_WEEK = "LAST_WEEK",
  NEXT_WEEK = "NEXT_WEEK",
  THIS_MONTH = "THIS_MONTH",
  LAST_MONTH = "LAST_MONTH",
  NEXT_MONTH = "NEXT_MONTH",
  THIS_QUARTER = "THIS_QUARTER",
  LAST_QUARTER = "LAST_QUARTER",
  NEXT_QUARTER = "NEXT_QUARTER",
  THIS_YEAR = "THIS_YEAR",
  LAST_YEAR = "LAST_YEAR",
  NEXT_YEAR = "NEXT_YEAR",
  LAST_7 = "LAST_7",
  NEXT_7 = "NEXT_7",
  LAST_15 = "LAST_15",
  NEXT_15 = "NEXT_15",
  LAST_30 = "LAST_30",
  NEXT_30 = "NEXT_30",
  LAST_60 = "LAST_60",
  NEXT_60 = "NEXT_60",
  LAST_90 = "LAST_90",
  NEXT_90 = "NEXT_90",
  CUSTOM = "CUSTOM",
  DIVIDER = "-"
}
enum UIDateRangeLabels {
  TODAY = "Today",
  YESTERDAY = "Yesterday",
  THIS_WEEK = "This Week",
  LAST_WEEK = "Last Week",
  NEXT_WEEK = "Next Week",
  THIS_MONTH = "This Month",
  LAST_MONTH = "Last Month",
  NEXT_MONTH = "Next Month",
  THIS_QUARTER = "This Quarter",
  LAST_QUARTER = "Last Quarter",
  NEXT_QUARTER = "Next Quarter",
  THIS_YEAR = "This Year",
  LAST_YEAR = "Last Year",
  NEXT_YEAR = "Next Year",
  LAST_7 = "Last 7 Days",
  NEXT_7 = "Next 7 Days",
  LAST_15 = "Last 15 Days",
  NEXT_15 = "Next 15 Days",
  LAST_30 = "Last 30 Days",
  NEXT_30 = "Next 30 Days",
  LAST_60 = "Last 60 Days",
  NEXT_60 = "Next 60 Days",
  LAST_90 = "Last 90 Days",
  NEXT_90 = "Next 90 Days",
  CUSTOM = "Custom Range"
}

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
  public disabled: boolean = false;

  @bindable()
  public rangeSelectors: UIDateRangeKeys[] = [
    UIDateRangeKeys.TODAY,
    UIDateRangeKeys.YESTERDAY,
    UIDateRangeKeys.LAST_WEEK,
    UIDateRangeKeys.THIS_WEEK,
    UIDateRangeKeys.NEXT_WEEK,
    UIDateRangeKeys.LAST_MONTH,
    UIDateRangeKeys.THIS_MONTH,
    UIDateRangeKeys.NEXT_MONTH,
    UIDateRangeKeys.DIVIDER,
    UIDateRangeKeys.LAST_7,
    UIDateRangeKeys.NEXT_7,
    UIDateRangeKeys.LAST_15,
    UIDateRangeKeys.NEXT_15,
    UIDateRangeKeys.LAST_30,
    UIDateRangeKeys.NEXT_30
  ];

  protected tempStart;

  protected DateRangeLabels = UIDateRangeLabels;

  protected startVm: AnyObject = {};
  protected endVm: AnyObject = {};
  protected active: string = UIDateRangeKeys.CUSTOM;

  protected selectStarted = false;

  protected startMonth = startOfMonth(new Date());
  protected endMonth = addMonths(startOfMonth(new Date()), 1);

  protected withTime: boolean = true;

  constructor(protected element: Element) {
    this.withTime = !element.hasAttribute("no-time");
    if ((element as HTMLElement).dataset.notime) {
      this.withTime = !(element as HTMLElement).dataset.notime;
    }
  }

  protected attached(): void {
    this.startVm.monthChanged = month => this.startMonthChanged(month);
    this.endVm.monthChanged = month => this.endMonthChanged(month);

    this.startVm.weekChanged = week => this.weekChanged(week);
    this.endVm.weekChanged = week => this.weekChanged(week);

    this.startVm.withTime = this.endVm.withTime = !this.element.hasAttribute("no-time");

    this.startVm.internalDateChanged = (date, timeChange) =>
      timeChange
        ? isAfter(this.end, date)
          ? (this.start = date)
          : (this.start = this.end = date)
        : this.setRange(date, timeChange);
    this.endVm.internalDateChanged = (date, timeChange) =>
      timeChange
        ? isAfter(date, this.start)
          ? (this.end = date)
          : (this.start = this.end = date)
        : this.setRange(date, timeChange);

    this.startVm.currentMonth = this.startMonth;
    this.endVm.currentMonth = this.endMonth;
  }

  protected minDateChanged(): void {
    if (isBefore(this.start, this.minDate)) {
      this.start = this.end = undefined;
    }
  }

  protected maxDateChanged(): void {
    if (isAfter(this.end, this.maxDate)) {
      this.start = this.end = undefined;
    }
  }

  @computedFrom("selectStarted", "tempStart", "start", "end")
  get range() {
    return (this.startVm.dateRange = this.endVm.dateRange = this.selectStarted
      ? { start: this.tempStart, end: undefined }
      : { start: this.start, end: this.end });
  }

  protected weekChanged(week) {
    if (
      isWithinInterval(week, { start: this.minDate, end: this.maxDate }) ||
      isWithinInterval(endOfWeek(week), { start: this.minDate, end: this.maxDate })
    ) {
      this.start = isBefore(week, this.minDate) ? this.minDate : week;
      this.end = isAfter(endOfWeek(week), this.maxDate) ? this.maxDate : endOfWeek(week);
      this.startVm.currentMonth = startOfMonth(this.start);
      this.endVm.currentMonth = startOfMonth(this.end);
    }
  }

  protected startMonthChanged(month) {
    this.startMonth = month;
    if (isAfter(this.startMonth, this.endMonth)) {
      this.endMonth = addMonths(this.startMonth, 1);
    }

    this.startVm.currentMonth = this.startMonth;
    this.endVm.currentMonth = this.endMonth;
  }
  protected endMonthChanged(month) {
    this.endMonth = month;
    if (isAfter(this.startMonth, this.endMonth)) {
      this.startMonth = subMonths(this.endMonth, 1);
    }

    this.startVm.currentMonth = this.startMonth;
    this.endVm.currentMonth = this.endMonth;
  }

  protected setRange(date, timeChange): void {
    if (!timeChange) {
      if (!this.selectStarted) {
        this.tempStart = date;
        this.selectStarted = true;
        this.startVm.currentMonth = startOfMonth(this.tempStart);
      } else {
        if (isAfter(this.tempStart, date)) {
          this.tempStart = date;
          this.startVm.currentMonth = startOfMonth(this.tempStart);
        } else {
          this.start = this.tempStart;
          this.end = date;
          this.startVm.currentMonth = startOfMonth(this.tempStart);
          this.endVm.currentMonth = startOfMonth(this.end);

          this.tempStart = undefined;
          this.selectStarted = false;
          // fire change
        }
      }
    }
  }

  protected cancelSelection(): void {
    this.selectStarted = false;
    this.tempStart = false;

    this.start = toDate(this.start);
    this.end = toDate(this.end);
  }

  protected hilightDate($event: UIEvent): void {
    if (($event.target as HTMLElement).dataset.date) {
      this.startVm.hilight = toDate(($event.target as HTMLElement).dataset.date);
      this.endVm.hilight = toDate(($event.target as HTMLElement).dataset.date);
    }
  }
}
