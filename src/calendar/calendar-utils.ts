/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import {
  addMonths,
  addYears,
  endOfDecade,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  parseISO,
  startOfDecade,
  startOfMonth
} from "date-fns";

export enum CALENDAR_VIEWS {
  DAYS,
  MONTHS,
  YEARS,
  DECADES
}

export enum CALENDAR_GRAIN {
  FIRST = "first",
  LAST = "last",
  PREV = "prev",
  NEXT = "next"
}

export interface IDateConfig {
  date: Date | undefined;
  start: Date | undefined;
  end: Date | undefined;

  minDate: Date | undefined;
  maxDate: Date | undefined;

  disabledDates: Date[] | ((dt: Date) => boolean) | undefined;
}

export const getTitle = (month: Date, view: CALENDAR_VIEWS) => {
  if (view === CALENDAR_VIEWS.DAYS) {
    return format(month, "MMMM yyyy");
  }
  if (view === CALENDAR_VIEWS.MONTHS) {
    return format(month, "yyyy");
  }
  if (view === CALENDAR_VIEWS.YEARS) {
    return format(startOfDecade(month), "yyyy") + "-" + format(endOfDecade(month), "yyyy");
  }
  return "-";
};

export const changeMonth = (month: Date, view: CALENDAR_VIEWS, grain: string) => {
  if (view === CALENDAR_VIEWS.DAYS) {
    switch (grain) {
      case CALENDAR_GRAIN.FIRST:
        return addMonths(month, -12);
      case CALENDAR_GRAIN.LAST:
        return addMonths(month, 12);
      case CALENDAR_GRAIN.PREV:
        return addMonths(month, -1);
      case CALENDAR_GRAIN.NEXT:
        return addMonths(month, 1);
    }
  }
  if (view === CALENDAR_VIEWS.MONTHS) {
    switch (grain) {
      case CALENDAR_GRAIN.PREV:
        return addYears(month, -1);
      case CALENDAR_GRAIN.NEXT:
        return addYears(month, 1);
    }
  }
  if (view === CALENDAR_VIEWS.YEARS) {
    switch (grain) {
      case CALENDAR_GRAIN.PREV:
        return addYears(month, -10);
      case CALENDAR_GRAIN.NEXT:
        return addYears(month, 10);
    }
  }
  return month;
};

export const isBeforeMin = (month: Date, minDate: string, n: number) => {
  return minDate ? isBefore(addMonths(month, n), startOfMonth(parseISO(minDate))) : false;
};

export const isAfterMax = (month: Date, maxDate: string, n: number) => {
  return maxDate ? isAfter(addMonths(month, n), endOfMonth(parseISO(maxDate))) : false;
};
