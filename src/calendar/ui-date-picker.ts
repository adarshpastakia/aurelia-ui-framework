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
import { isValid, parseISO, startOfDay, startOfMonth } from "date-fns";
import { UIFormat } from "../utils/ui-format";
import { CalendarHead } from "./calendar-head";
import {
  buildHeaderConfig,
  CALENDAR_VIEWS,
  changeMonth,
  getTitle,
  IDateConfig,
  IDateDisabled,
  IDatePreset,
  IHeaderConfig,
  parseDate
} from "./calendar-utils";
import { DaysPage } from "./days-page";
import { MonthsPage } from "./months-page";
import { TimePage } from "./time-page";
import view from "./ui-date-picker.html";
import { YearsPage } from "./years-page";

@customElement("ui-date-picker")
@inlineView(view)
@viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
export class UIDatePicker {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public date: string | undefined;

  @bindable()
  public minDate: string | undefined;
  @bindable()
  public maxDate: string | undefined;

  @bindable()
  public disabledDates: IDateDisabled;

  @bindable()
  public format: string = "dd MMM yyyy HH:mm";

  @bindable()
  public datePresets: IDatePreset[] = [];

  @bindable({ defaultBindingMode: bindingMode.fromView })
  public dateLabel: string;

  protected currentPage = CALENDAR_VIEWS.DAYS;
  protected month: Date = startOfMonth(new Date());

  protected time: Date = parseISO("2018-01-01T00:00:00.000");

  protected VIEWS = CALENDAR_VIEWS;

  private selectedDate: Date;

  protected bind() {
    this.dateChanged();
  }

  protected dateChanged() {
    this.selectedDate = parseDate(this.date);
    if (isValid(this.selectedDate)) {
      this.time = new Date(this.selectedDate);
      this.month = startOfMonth(this.selectedDate);

      const preset = this.datePresets.find(p => p.preset === this.date);
      this.dateLabel = preset ? preset.label : UIFormat.datetime(this.selectedDate, this.format);
    }
  }

  @computedFrom("selectedDate", "currentPage", "minDate", "maxDate", "disabledDates")
  get config(): IDateConfig {
    return {
      date: this.selectedDate,
      page: this.currentPage,
      minDate: parseDate(this.minDate),
      maxDate: parseDate(this.maxDate),
      disabled: this.disabledDatesList
    };
  }

  @computedFrom("month", "currentPage")
  get title(): string {
    return getTitle(this.month, this.currentPage);
  }

  @computedFrom("month", "currentPage", "minDate", "maxDate")
  get headerOptions(): IHeaderConfig {
    return buildHeaderConfig(this.month, this.currentPage, this.config);
  }

  get disabledDatesList() {
    if (isArray(this.disabledDates)) {
      return this.disabledDates.map(d => {
        const dt = parseDate(d);
        return !isEmpty(dt) ? startOfDay(dt).toISOString() : null;
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
    this.updateDate(this.date ? parseDate(this.date) : new Date(), newTime);
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

  protected selectPreset(preset) {
    this.cancelSelection();
    this.date = preset;
  }

  private updateDate(dt: Date, tm: Date = this.time) {
    dt.setHours(tm.getHours());
    dt.setMinutes(tm.getMinutes());
    this.date = dt.toISOString();
  }
}
