/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import {
  autoinject,
  bindable,
  bindingMode,
  computedFrom,
  customElement,
  observable
} from "aurelia-framework";
import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  addYears,
  format,
  getDay,
  getHours,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subYears,
  toDate
} from "date-fns";
import { UIInternal } from "../utils/ui-internal";

const FORMAT_NO_TIME = "yyyy-MM-dd'T'00:00:00.000";
const FORMAT_NO_TIMEZONE = "yyyy-MM-dd'T'HH:mm:ss.000";

@autoinject()
@customElement("ui-date")
export class UIDate {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public date: Date | string = new Date();

  @bindable()
  public minDate: string;
  @bindable()
  public maxDate: string;
  @bindable()
  public disabledDays: number[] = [];
  @bindable()
  public disabledDates: ((date) => boolean) | string[];

  @bindable()
  public disabled: boolean = false;

  @observable()
  protected currentMonth = startOfMonth(new Date());
  @observable()
  protected dateRange: { start: Date | string; end: Date | string };

  protected monthChanged: (month: Date) => void;
  protected weekChanged: (week: Date) => void;
  protected internalDateChanged: (date: Date, timeChange: boolean) => void;

  protected time;
  protected hilight;
  protected currentYear = getYear(new Date());
  protected decadeStart = 0;
  protected currentView: "date" | "month" | "year" = "date";

  protected withTime: boolean = true;

  constructor(protected element: Element) {
    this.resetDecade();
    this.withTime = !element.hasAttribute("no-time");
  }

  protected dateChanged(date): void {
    if (date) {
      this.time = toDate(this.date);
      this.currentYear = getYear(this.date);

      if (
        !this.dateRange &&
        !isSameMonth(
          format(this.currentMonth, FORMAT_NO_TIMEZONE),
          format(this.date, FORMAT_NO_TIMEZONE)
        )
      ) {
        this.currentMonth = startOfMonth(this.date);
      }
    }
  }

  protected minDateChanged(): void {
    if (isBefore(this.date, this.minDate)) {
      this.date = toDate(this.minDate);
    }
  }

  protected maxDateChanged(): void {
    if (isAfter(this.date, this.maxDate)) {
      this.date = toDate(this.maxDate);
    }
  }

  @computedFrom("time")
  get hour() {
    return this.time ? format(this.time, "hh") : "";
  }
  set hour(h) {
    this.time = addHours(this.time, parseInt(h, 10));
    this.date = toDate(
      format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000")
    );
    if (isBefore(this.date, this.minDate)) {
      this.date = toDate(this.minDate);
    }
    if (isAfter(this.date, this.maxDate)) {
      this.date = toDate(this.maxDate);
    }
    this.fireChange(true);
  }
  @computedFrom("time")
  get minute() {
    return this.time ? format(this.time, "mm") : "";
  }
  set minute(m) {
    this.time = addMinutes(this.time, parseInt(m, 10));
    this.date = toDate(
      format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000")
    );
    if (isBefore(this.date, this.minDate)) {
      this.date = toDate(this.minDate);
    }
    if (isAfter(this.date, this.maxDate)) {
      this.date = toDate(this.maxDate);
    }
    this.fireChange(true);
  }
  @computedFrom("time")
  get ampm() {
    return getHours(this.time) >= 12;
  }
  set ampm(pm) {
    this.time = addHours(this.time, pm ? 12 : -12);
    this.date = toDate(
      format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000")
    );
    if (isBefore(this.date, this.minDate)) {
      this.date = toDate(this.minDate);
    }
    if (isAfter(this.date, this.maxDate)) {
      this.date = toDate(this.maxDate);
    }
    this.fireChange(true);
  }

  @computedFrom(
    "currentMonth",
    "currentView",
    "date",
    "hilight",
    "dateRange",
    "minDate",
    "maxDate",
    "disabledDays",
    "disabledDates"
  )
  get pageStart(): Date {
    let pageStart = startOfWeek(this.currentMonth);
    if (getDay(this.currentMonth) < 3) {
      pageStart = subDays(pageStart, 7);
    }
    return pageStart;
  }

  protected getWeek(date, week): string {
    return format(addWeeks(date, week), "ww");
  }
  protected getDay(date, week, day): string {
    const dt = addDays(addWeeks(date, week), day);
    return format(dt, "dd");
  }
  protected getDate(date, week, day): string {
    const dt = addDays(addWeeks(date, week), day);
    return format(dt, "yyyy-MM-dd");
  }
  protected getClasses(date, week, day): string {
    const dt = addDays(addWeeks(date, week), day);
    const classes = ["ui-date__cell", "ui-date__cell--date"];
    if (isSameDay(dt, new Date())) {
      classes.push("ui-date__cell--date--today");
    }

    // Check disabled dates
    if (this.isDateDisabled(dt)) {
      classes.push("ui-date__cell--date--disabled");
    } else if (!isSameMonth(dt, this.currentMonth)) {
      classes.push("ui-date__cell--date--muted");
    }

    // Check for date range
    if (this.dateRange) {
      if (this.dateRange.start && isSameDay(dt, this.dateRange.start)) {
        classes.push("ui-date__cell--date--start");
      }
      if (this.dateRange.end && isSameDay(dt, this.dateRange.end)) {
        classes.push("ui-date__cell--date--end");
      }
      if (
        this.dateRange.start &&
        !this.dateRange.end &&
        this.hilight &&
        isAfter(this.hilight, this.dateRange.start) &&
        isWithinInterval(dt, { ...this.dateRange, end: this.hilight })
      ) {
        classes.push("ui-date__cell--date--hilight");
      }
      try {
        if (this.dateRange.start && this.dateRange.end && isWithinInterval(dt, this.dateRange)) {
          classes.push("ui-date__cell--date--hilight");
        }
      } catch (e) {
        //
      }
    } else if (isSameDay(dt, this.date)) {
      classes.push("ui-date__cell--date--selected");
    }
    return classes.join(" ");
  }

  protected isDateDisabled(dt = new Date()): boolean {
    return (
      isBefore(dt, format(this.minDate, FORMAT_NO_TIME)) ||
      isAfter(dt, format(this.maxDate, FORMAT_NO_TIME)) ||
      (this.disabledDays && this.disabledDays.includes(getDay(dt))) ||
      (isArray(this.disabledDates) && this.disabledDates.includes(dt.toISOString())) ||
      (typeof this.disabledDates === "function" && this.disabledDates(dt))
    );
  }

  protected previous(unit): void {
    if (unit === "month") {
      this.currentMonth = subMonths(this.currentMonth, 1);
      this.resetDecade();
    } else if (unit === "year") {
      this.currentMonth = subYears(this.currentMonth, 1);
      this.currentYear--;
      this.resetDecade();
    } else if (unit === "decade") {
      this.decadeStart -= 20;
    }
  }

  protected next(unit): void {
    if (unit === "month") {
      this.currentMonth = addMonths(this.currentMonth, 1);
      this.resetDecade();
    } else if (unit === "year") {
      this.currentMonth = addYears(this.currentMonth, 1);
      this.currentYear++;
      this.resetDecade();
    } else if (unit === "decade") {
      this.decadeStart += 20;
    }
  }

  protected resetDecade(): void {
    const startYear = this.currentYear;
    this.decadeStart = startYear - (startYear % 20) + 1;
  }

  protected currentMonthChanged(): void {
    if (isFunction(this.monthChanged)) {
      this.monthChanged(this.currentMonth);
    }
  }

  protected setCurrentMonth($event: UIEvent): void {
    if (($event.target as HTMLElement).dataset.date) {
      this.currentMonth = toDate(($event.target as HTMLElement).dataset.date);
      this.currentView = "date";
    }
  }

  protected getMonthDate(year, month) {
    return format(new Date(year, month, 1), "yyyy-MM-dd");
  }

  protected getMonthName(year, month) {
    return format(new Date(year, month, 1), "MMM");
  }

  protected setCurrentYear($event: UIEvent): void {
    if (($event.target as HTMLElement).dataset.year) {
      this.currentYear = parseInt(($event.target as HTMLElement).dataset.year, 10);
      this.currentView = "month";
    }
  }

  protected selectToday(): void {
    if (!this.isDateDisabled()) {
      this.date = new Date();
      this.fireChange();
    }
  }

  protected selectDate($event: UIEvent): void {
    if (($event.target as HTMLElement).dataset.date) {
      this.date = toDate(
        format(($event.target as HTMLElement).dataset.date, "yyyy-MM-dd") +
          "T" +
          format(this.time, "HH:mm:ss.000")
      );
      if (isBefore(this.date, this.minDate)) {
        this.date = toDate(this.minDate);
      }
      if (isAfter(this.date, this.maxDate)) {
        this.date = toDate(this.maxDate);
      }
      this.fireChange();
    }
    if (($event.target as HTMLElement).dataset.week) {
      if (isFunction(this.weekChanged)) {
        this.weekChanged(toDate(($event.target as HTMLElement).dataset.week));
      }
    }
  }

  protected hilightDate($event: UIEvent): void {
    if (($event.target as HTMLElement).dataset.date) {
      this.hilight = toDate(($event.target as HTMLElement).dataset.date);
    }
  }

  protected fireChange(timeChange = false) {
    if (isFunction(this.internalDateChanged)) {
      this.internalDateChanged(toDate(this.date), timeChange);
    }
    this.element.dispatchEvent(UIInternal.createEvent("change", this.date));
  }
}
