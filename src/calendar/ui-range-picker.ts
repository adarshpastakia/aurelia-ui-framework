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
  inlineView,
  viewResources
} from "aurelia-framework";
import {
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
  buildHeaderConfig,
  CALENDAR_VIEWS,
  changeMonth,
  getTitle,
  IDateDisabled,
  IHeaderConfig,
  parseDate
} from "./calendar-utils";
import { DaysPage } from "./days-page";
import { MonthsPage } from "./months-page";
import { TimePage } from "./time-page";
import view from "./ui-range-picker.html";
import { YearsPage } from "./years-page";

@customElement("ui-range-picker")
@inlineView(view)
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
  public disabledDates: IDateDisabled;

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
      disabled: this.disabledDatesList
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

  @computedFrom("startMonth", "startPage", "minDate", "maxDate")
  get startHeaderOptions(): IHeaderConfig {
    return buildHeaderConfig(this.startMonth, this.startPage, {
      ...this.config,
      page: this.startPage
    });
  }
  @computedFrom("endMonth", "endPage", "minDate", "maxDate")
  get endHeaderOptions(): IHeaderConfig {
    return buildHeaderConfig(this.endMonth, this.endPage, { ...this.config, page: this.endPage });
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
      case "$week":
        this.start = startOfWeek(new Date()).toISOString();
        this.end = endOfWeek(new Date()).toISOString();
        break;
    }
  }
}
