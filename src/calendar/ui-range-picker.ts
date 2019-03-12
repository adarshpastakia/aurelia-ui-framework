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
import {
  addDays,
  addMonths,
  endOfDay,
  endOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek
} from "date-fns";
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

@customElement("ui-range-picker")
@viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
export class UIRangePicker {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public start: string | undefined;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public end: string | undefined;

  @bindable()
  public minDate: string | undefined;
  @bindable()
  public maxDate: string | undefined;

  @bindable()
  public disabledDates: Array<Date | string> | ((dt: Date) => boolean) | undefined;

  protected startMonth = startOfMonth(new Date());
  protected endMonth = startOfMonth(addMonths(new Date(), 1));

  protected startPage = CALENDAR_VIEWS.DAYS;
  protected endPage = CALENDAR_VIEWS.DAYS;

  protected VIEWS = CALENDAR_VIEWS;

  protected hilight: Date;

  protected selecting: Date;

  protected startChanged() {
    this.startMonth = startOfMonth(parseISO(this.start));
  }

  protected endChanged() {
    this.endMonth = startOfMonth(parseISO(this.end));
  }

  @computedFrom("start", "end", "hilight", "selecting", "minDate", "maxDate", "disabledDates")
  get config() {
    return {
      start: this.selecting ? this.selecting : parseISO(this.start),
      end: this.selecting ? this.hilight : parseISO(this.end),
      minDate: parseISO(this.minDate),
      maxDate: parseISO(this.maxDate),
      disabled: this.disabledDates
    };
  }

  @computedFrom("startMonth", "startPage")
  get startTitle(): string {
    return getTitle(this.startMonth, this.startPage);
  }

  @computedFrom("endMonth", "endPage")
  get endTitle(): string {
    return getTitle(this.endMonth, this.endPage);
  }

  @computedFrom("startMonth", "startPage", "minDate")
  get isStartPrevDisabled(): boolean {
    return isBeforeMin(this.startMonth, this.minDate, -1);
  }
  @computedFrom("startMonth", "startPage", "minDate")
  get isStartFirstDisabled(): boolean {
    return isBeforeMin(this.startMonth, this.minDate, -12);
  }
  @computedFrom("startMonth", "startPage", "maxDate")
  get isStartNextDisabled(): boolean {
    return isAfterMax(this.startMonth, this.maxDate, 1);
  }
  @computedFrom("startMonth", "startPage", "maxDate")
  get isStartLastDisabled(): boolean {
    return isAfterMax(this.startMonth, this.maxDate, 12);
  }

  @computedFrom("endMonth", "endPage", "minDate")
  get isEndPrevDisabled(): boolean {
    return isBeforeMin(this.endMonth, this.minDate, -1);
  }
  @computedFrom("endMonth", "endPage", "minDate")
  get isEndFirstDisabled(): boolean {
    return isBeforeMin(this.endMonth, this.minDate, -12);
  }
  @computedFrom("endMonth", "endPage", "maxDate")
  get isEndNextDisabled(): boolean {
    return isAfterMax(this.endMonth, this.maxDate, 1);
  }
  @computedFrom("endMonth", "endPage", "maxDate")
  get isEndLastDisabled(): boolean {
    return isAfterMax(this.endMonth, this.maxDate, 12);
  }

  protected disabledDatesChanged(value) {
    if (isArray(value)) {
      this.disabledDates = value.map(d => {
        const dt = parseDate(d);
        return dt ? startOfDay(dt) : null;
      });
    }
  }

  protected startHeaderClicked($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.dataset.tool) {
      if (target.dataset.tool === CalendarHead.TITLE) {
        if (this.startPage !== CALENDAR_VIEWS.YEARS) {
          this.startPage++;
        }
      } else {
        this.startMonth = changeMonth(this.startMonth, this.startPage, target.dataset.tool);

        if (
          isSameMonth(this.startMonth, this.endMonth) ||
          isAfter(this.startMonth, this.endMonth)
        ) {
          this.endMonth = addMonths(this.startMonth, 1);
        }
      }
    }
  }

  protected endHeaderClicked($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.dataset.tool) {
      if (target.dataset.tool === CalendarHead.TITLE) {
        if (this.endPage !== CALENDAR_VIEWS.YEARS) {
          this.endPage++;
        }
      } else {
        this.endMonth = changeMonth(this.endMonth, this.endPage, target.dataset.tool);

        if (
          isSameMonth(this.startMonth, this.endMonth) ||
          isBefore(this.endMonth, this.startMonth)
        ) {
          this.startMonth = addMonths(this.endMonth, -1);
        }
      }
    }
  }

  protected selectDate($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.dataset.date) {
      const date = new Date(target.dataset.date);
      if (this.selecting && (isSameDay(date, this.selecting) || isAfter(date, this.selecting))) {
        this.end = endOfDay(date).toISOString();
        this.start = startOfDay(this.selecting).toISOString();
        this.selecting = null;
      } else {
        this.selecting = date;
      }
    }
  }

  protected selectStartMonth($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.dataset.date) {
      this.startMonth = new Date(target.dataset.date);
      this.startPage--;

      if (isSameMonth(this.startMonth, this.endMonth) || isAfter(this.startMonth, this.endMonth)) {
        this.endMonth = addMonths(this.startMonth, 1);
      }
    }
  }

  protected selectEndMonth($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.dataset.date) {
      this.endMonth = new Date(target.dataset.date);
      this.endPage--;

      if (isSameMonth(this.startMonth, this.endMonth) || isBefore(this.endMonth, this.startMonth)) {
        this.startMonth = addMonths(this.endMonth, -1);
      }
    }
  }

  protected cancelSelection() {
    this.selecting = null;
    this.startPage = CALENDAR_VIEWS.DAYS;
    this.endPage = CALENDAR_VIEWS.DAYS;
  }

  protected hilightDate($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.dataset.date) {
      this.hilight = new Date(target.dataset.date);
    }
  }

  protected selectPreset(preset) {
    this.selecting = null;
    switch (preset) {
      case "week":
        this.start = startOfWeek(new Date()).toISOString();
        this.end = endOfWeek(new Date()).toISOString();
        break;
      case "-7":
        this.start = addDays(new Date(), -6).toISOString();
        this.end = endOfDay(new Date()).toISOString();
        break;
    }
  }
}
