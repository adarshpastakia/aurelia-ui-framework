/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import {
  bindable,
  bindingMode,
  computedFrom,
  customElement,
  viewResources
} from "aurelia-framework";
import { parseISO, startOfDay, startOfMonth } from "date-fns";
import { CalendarHead } from "./calendar-head";
import {
  CALENDAR_VIEWS,
  changeMonth,
  getTitle,
  isAfterMax,
  isBeforeMin,
  parseDate
} from "./calendar-utils";
import { DaysPage } from "./days-page";
import { MonthsPage } from "./months-page";
import { TimePage } from "./time-page";
import { YearsPage } from "./years-page";

@customElement("ui-date-picker")
@viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
export class UIDatePicker {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public date: string | undefined;

  @bindable()
  public minDate: string | undefined;
  @bindable()
  public maxDate: string | undefined;

  @bindable()
  public disabledDates: string[] | ((dt: Date) => boolean) | undefined;

  protected currentPage = CALENDAR_VIEWS.DAYS;
  protected month: Date = startOfMonth(new Date());

  protected time: Date = parseISO("2018-01-01T00:00:00.000");

  protected VIEWS = CALENDAR_VIEWS;

  protected dateChanged() {
    this.time = parseISO(this.date);
    this.month = startOfMonth(parseISO(this.date));
  }

  @computedFrom("date", "minDate", "maxDate", "disabledDates")
  get config() {
    return {
      date: parseISO(this.date),
      minDate: parseISO(this.minDate),
      maxDate: parseISO(this.maxDate),
      disabled: this.disabledDatesList
    };
  }

  @computedFrom("month", "currentPage")
  get title(): string {
    return getTitle(this.month, this.currentPage);
  }

  @computedFrom("month", "currentPage", "minDate")
  get isPrevDisabled(): boolean {
    return isBeforeMin(this.month, this.minDate, -1);
  }
  @computedFrom("month", "currentPage", "minDate")
  get isFirstDisabled(): boolean {
    return isBeforeMin(this.month, this.minDate, -12);
  }
  @computedFrom("month", "currentPage", "maxDate")
  get isNextDisabled(): boolean {
    return isAfterMax(this.month, this.maxDate, 1);
  }
  @computedFrom("month", "currentPage", "maxDate")
  get isLastDisabled(): boolean {
    return isAfterMax(this.month, this.maxDate, 12);
  }

  get disabledDatesList() {
    if (isArray(this.disabledDates)) {
      return this.disabledDates.map(d => {
        const dt = parseDate(d);
        return dt ? startOfDay(dt).toISOString() : null;
      });
    }
    return this.disabledDates;
  }

  protected headerClicked($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.dataset.tool) {
      if (target.dataset.tool === CalendarHead.TITLE) {
        if (this.currentPage !== CALENDAR_VIEWS.YEARS) {
          this.currentPage++;
        }
      } else {
        this.month = changeMonth(this.month, this.currentPage, target.dataset.tool);
      }
    }
  }

  protected selectDate($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.dataset.date) {
      this.updateDate(startOfDay(new Date(target.dataset.date)));
    }
  }

  protected timeChanged(newTime: Date) {
    this.updateDate(this.date ? parseISO(this.date) : new Date(), newTime);
  }

  protected selectMonth($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.dataset.date) {
      this.month = new Date(target.dataset.date);
      this.currentPage--;
    }
  }

  protected cancelSelection() {
    this.currentPage = CALENDAR_VIEWS.DAYS;
  }

  protected selectToday() {
    this.date = new Date().toISOString();
    this.currentPage = CALENDAR_VIEWS.DAYS;
  }

  private updateDate(dt: Date, tm: Date = this.time) {
    dt.setHours(tm.getHours());
    dt.setMinutes(tm.getMinutes());
    this.date = dt.toISOString();
  }
}
