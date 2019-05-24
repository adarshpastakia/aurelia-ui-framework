/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, computedFrom, customElement, inlineView, viewResources } from "aurelia-framework";
import { addMonths, endOfDay, isAfter, isBefore, isSameMonth, startOfDay, startOfMonth } from "date-fns";
import { UIFormat } from "../utils/ui-format";
import { CalendarHead } from "./calendar-head";
import {
  buildHeaderConfig,
  CALENDAR_VIEWS,
  changeMonth,
  getTitle,
  IDatePreset,
  IHeaderConfig,
  parseDate,
  parseRange
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
  public date: [string, string] | string | undefined;

  @bindable()
  public minDate: string | undefined;
  @bindable()
  public maxDate: string | undefined;

  @bindable()
  public format: string = "dd MMM yyyy";

  @bindable()
  public datePresets: IDatePreset[] = [];

  @bindable({ defaultBindingMode: bindingMode.fromView })
  public dateLabel: string;

  protected startMonth = startOfMonth(new Date());
  protected endMonth = startOfMonth(addMonths(new Date(), 1));

  protected startPage = CALENDAR_VIEWS.DAYS;
  protected endPage = CALENDAR_VIEWS.DAYS;

  protected VIEWS = CALENDAR_VIEWS;

  protected hilight: Date;

  protected selecting: Date;

  private selectedDate: [Date, Date];

  protected bind() {
    this.dateChanged();
  }

  protected dateChanged() {
    this.selectedDate = parseRange(this.date);
    if (this.selectedDate) {
      this.startMonth = startOfMonth(this.selectedDate[0]);
      this.endMonth = startOfMonth(this.selectedDate[1]);

      const preset = this.datePresets.find(p => p.preset === this.date);
      this.dateLabel = preset
        ? preset.label
        : `${UIFormat.date(this.selectedDate[0], this.format)} ~ ${UIFormat.date(
          this.selectedDate[1],
          this.format
        )}`;
    }
  }

  @computedFrom("selectedDate", "hilight", "selecting", "minDate", "maxDate", "disabledDates")
  get config() {
    return {
      date: this.selecting ? ([this.selecting, this.hilight] as [Date, Date]) : this.selectedDate,
      minDate: parseDate(this.minDate),
      maxDate: parseDate(this.maxDate),
      disabled: []
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
      if (this.selecting) {
        this.date = isBefore(date, this.selecting)
          ? [startOfDay(date).toISOString(), endOfDay(this.selecting).toISOString()]
          : [startOfDay(this.selecting).toISOString(), endOfDay(date).toISOString()];
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
    this.cancelSelection();
    this.date = preset;
  }
}
