/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, bindingMode, computedFrom, customElement } from "aurelia-framework";
import {
  addDays,
  addMonths,
  addYears,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subYears,
  toDate
} from "date-fns";

@autoinject()
@customElement("ui-date")
export class UIDate {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public date: Date | string = new Date();
  @bindable()
  public dateRange: Array<Date | string>;

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

  @bindable()
  public monthChanged: (month: Date) => void;
  @bindable()
  protected currentMonth = startOfMonth(new Date());

  protected decadeStart = 0;
  protected currentView = "date";

  constructor(private element: Element) {
    this.resetDecade();
  }

  @computedFrom(
    "currentMonth",
    "currentView",
    "date",
    "dateRange",
    "minDate",
    "maxDate",
    "disabledDays",
    "disabledDates"
  )
  get datePage(): string {
    let page = `
    <span class="ui-date__head">#</span>
    <span class="ui-date__head">Su</span>
    <span class="ui-date__head">Mo</span>
    <span class="ui-date__head">Tu</span>
    <span class="ui-date__head">We</span>
    <span class="ui-date__head">Th</span>
    <span class="ui-date__head">Fr</span>
    <span class="ui-date__head">Sa</span>`;

    let pageStart = startOfWeek(this.currentMonth);
    if (getDay(this.currentMonth) < 3) {
      pageStart = subDays(pageStart, 7);
    }

    for (let row = 0; row < 6; row++) {
      page += `<span class="ui-date__cell--week">${format(
        addDays(pageStart, row * 7),
        "ww"
      )}</span>`;
      for (let col = 0; col < 7; col++) {
        const dt = addDays(pageStart, col + row * 7);
        page += `<span class="ui-date__cell ui-date__cell--date" data-muted="${!isSameMonth(
          dt,
          this.currentMonth
        )}"  data-selected="${this.getDateSelection(dt)}" data-today="${isSameDay(
          dt,
          new Date()
        )}" data-date="${format(dt, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")}">${format(dt, "dd")}</span>`;
      }
    }
    return page;
  }

  @computedFrom("currentView", "decadeStart")
  get yearPage(): string {
    let page = ``;

    for (let row = 0; row < 20; row++) {
      page += `<span class="ui-date__cell ui-date__cell--year" data-year="${this.decadeStart +
        row}">${this.decadeStart + row}</span>`;
    }
    return page;
  }

  protected previous(factor): void {
    if (factor === "year") {
      this.currentMonth = subYears(this.currentMonth, 1);
      this.resetDecade();
    } else if (factor === "month") {
      this.currentMonth = subMonths(this.currentMonth, 1);
      this.resetDecade();
    } else if (factor === "decade") {
      this.decadeStart -= 20;
    }
  }

  protected next(factor): void {
    if (factor === "year") {
      this.currentMonth = addYears(this.currentMonth, 1);
      this.resetDecade();
    } else if (factor === "month") {
      this.currentMonth = addMonths(this.currentMonth, 1);
      this.resetDecade();
    } else if (factor === "decade") {
      this.decadeStart += 20;
    }
  }

  protected resetDecade(): void {
    const startYear = this.currentMonth.getFullYear();
    this.decadeStart = startYear - (startYear % 20) + 1;
  }

  protected currentMonthChanged(): void {
    if (typeof this.monthChanged === "function") {
      this.monthChanged(this.currentMonth);
    }
  }

  protected getDateSelection(dt): string {
    if (this.dateRange) {
      //
    } else {
      return isSameDay(dt, this.date).toString();
    }
  }

  protected selectDate($event: UIEvent): void {
    if (($event.target as HTMLElement).dataset.date) {
      this.date = toDate(($event.target as HTMLElement).dataset.date);
    }
  }
}
