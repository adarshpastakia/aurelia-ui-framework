/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfDecade,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isValid,
  parseISO,
  startOfDay,
  startOfDecade,
  startOfMonth,
  startOfYear
} from "date-fns";

export enum CALENDAR_VIEWS {
  DAYS,
  MONTHS,
  YEARS,
  DECADES
}

export enum CALENDAR_NAVIGATION {
  FIRST = "first",
  LAST = "last",
  PREV = "prev",
  NEXT = "next"
}

export enum CALENDAR_GRAIN {
  DAY = "$day",
  WEEK = "$week",
  MONTH = "$month",
  YEAR = "$year"
}

export type IDateDisabled = string[] | (({ date: Date }) => boolean) | undefined;

export interface IDatePreset {
  preset: string;
  label: string;
}

export interface IDateConfig {
  date?: Date | undefined;
  start?: Date | undefined;
  end?: Date | undefined;

  minDate: Date | undefined;
  maxDate: Date | undefined;

  disabled: IDateDisabled;

  page: CALENDAR_VIEWS;
}

export interface IHeaderConfig {
  firstDisabled?: boolean;
  prevDisabled?: boolean;
  lastDisabled?: boolean;
  nextDisabled?: boolean;

  firstTooltip?: string;
  lastTooltip?: string;
  prevTooltip?: string;
  nextTooltip?: string;
}

export const parseDate = (date: Date | string | undefined): Date => {
  if (isString(date)) {
    if (date.startsWith(CALENDAR_GRAIN.DAY)) {
      return addDays(new Date(), parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
    } else if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
      return addWeeks(new Date(), parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10));
    } else if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
      return addMonths(new Date(), parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10));
    } else if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
      return addYears(new Date(), parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10));
    } else {
      return parseISO(date);
    }
  } else if (date) {
    return date as Date;
  }
  return null;
};

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
      case CALENDAR_NAVIGATION.FIRST:
        return addMonths(month, -12);
      case CALENDAR_NAVIGATION.LAST:
        return addMonths(month, 12);
      case CALENDAR_NAVIGATION.PREV:
        return addMonths(month, -1);
      case CALENDAR_NAVIGATION.NEXT:
        return addMonths(month, 1);
    }
  }
  if (view === CALENDAR_VIEWS.MONTHS) {
    switch (grain) {
      case CALENDAR_NAVIGATION.PREV:
        return addYears(month, -1);
      case CALENDAR_NAVIGATION.NEXT:
        return addYears(month, 1);
    }
  }
  if (view === CALENDAR_VIEWS.YEARS) {
    switch (grain) {
      case CALENDAR_NAVIGATION.PREV:
        return addYears(month, -10);
      case CALENDAR_NAVIGATION.NEXT:
        return addYears(month, 10);
    }
  }
  return month;
};

export const buildHeaderConfig = (month: Date, view: CALENDAR_VIEWS, config: IDateConfig) => {
  if (view === CALENDAR_VIEWS.DAYS) {
    return {
      firstDisabled: isBeforeMin(month, config.minDate, -12),
      lastDisabled: isAfterMax(month, config.maxDate, 12),
      prevDisabled: isBeforeMin(month, config.minDate, -1),
      nextDisabled: isAfterMax(month, config.maxDate, 1),

      firstTooltip: format(addMonths(month, -12), "MMM yyyy"),
      lastTooltip: format(addMonths(month, 12), "MMM yyyy"),
      prevTooltip: format(addMonths(month, -1), "MMM yyyy"),
      nextTooltip: format(addMonths(month, 1), "MMM yyyy")
    };
  }
  if (view === CALENDAR_VIEWS.MONTHS) {
    return {
      prevDisabled: isBeforeMin(month, config.minDate, -12),
      nextDisabled: isAfterMax(month, config.maxDate, 12),
      prevTooltip: format(addYears(month, -1), "yyyy"),
      nextTooltip: format(addYears(month, 1), "yyyy")
    };
  }
  if (view === CALENDAR_VIEWS.YEARS) {
    const start = startOfDecade(month);
    const end = endOfDecade(month);
    return {
      prevDisabled: isBeforeMin(month, config.minDate, -120),
      nextDisabled: isAfterMax(month, config.maxDate, 120),
      prevTooltip: format(addYears(start, -10), "yyyy") + "-" + format(addYears(start, -1), "yyyy"),
      nextTooltip: format(addYears(end, 1), "yyyy") + "-" + format(addYears(end, 10), "yyyy")
    };
  }
};

export const isBeforeMin = (month: Date, minDate: Date, n: number = 0) => {
  return isValid(minDate) ? isBefore(addMonths(startOfDay(month), n), startOfDay(minDate)) : false;
};

export const isAfterMax = (month: Date, maxDate: Date, n: number = 0) => {
  return isValid(maxDate) ? isAfter(addMonths(startOfDay(month), n), startOfDay(maxDate)) : false;
};

export const isDisabled = (config: IDateConfig, date: Date): boolean => {
  let min = config.minDate;
  let max = config.maxDate;

  if (config.page === CALENDAR_VIEWS.MONTHS) {
    min = startOfMonth(startOfDay(min));
    max = endOfMonth(startOfDay(max));
  }
  if (config.page === CALENDAR_VIEWS.YEARS) {
    min = startOfYear(startOfDay(min));
    max = startOfYear(startOfDay(max));
  }
  if (isBefore(date, min)) {
    return true;
  }
  if (isAfter(date, max)) {
    return true;
  }
  if (config.page === CALENDAR_VIEWS.DAYS && config.disabled) {
    const { disabled } = config;
    if (isArray(disabled)) {
      return disabled.includes(startOfDay(date).toISOString());
    } else if (isFunction(disabled)) {
      return disabled({ date });
    }
  }
  return false;
};
