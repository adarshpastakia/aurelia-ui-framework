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
  format,
  getDay,
  getHours,
  getYear,
  isAfter,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  toDate
} from "date-fns";
import { UIInternal } from "../utils/ui-internal";

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
  public disabledDays: number[];
  @bindable()
  public disabledDates: (({ date }) => boolean) | string[];

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

  constructor(private element: Element) {
    this.resetDecade();
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

  @computedFrom("time")
  get hour() {
    return this.time ? format(this.time, "hh") : "";
  }
  set hour(h) {
    this.time = addHours(this.time, parseInt(h, 10));
    this.date = toDate(
      format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000")
    );
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
    if (!isSameMonth(dt, this.currentMonth)) {
      classes.push("ui-date__cell--date--muted");
    }
    if (isSameDay(dt, new Date())) {
      classes.push("ui-date__cell--date--today");
    }
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
      if (this.dateRange.start && this.dateRange.end && isWithinInterval(dt, this.dateRange)) {
        classes.push("ui-date__cell--date--hilight");
      }
    } else if (isSameDay(dt, this.date)) {
      classes.push("ui-date__cell--date--selected");
    }
    return classes.join(" ");
  }

  protected previous(unit): void {
    if (unit === "month") {
      this.currentMonth = subMonths(this.currentMonth, 1);
      this.resetDecade();
    } else if (unit === "year") {
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
    if (typeof this.monthChanged === "function") {
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
    this.date = new Date();
    this.fireChange();
  }

  protected selectDate($event: UIEvent): void {
    if (($event.target as HTMLElement).dataset.date) {
      this.date = toDate(
        format(($event.target as HTMLElement).dataset.date, "yyyy-MM-dd") +
          "T" +
          format(this.time, "HH:mm:ss.000")
      );
      this.fireChange();
    }
    if (($event.target as HTMLElement).dataset.week) {
      if (typeof this.weekChanged === "function") {
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
    if (typeof this.internalDateChanged === "function") {
      this.internalDateChanged(toDate(this.date), timeChange);
    }
    this.element.dispatchEvent(UIInternal.createEvent("change", this.date));
  }
}
