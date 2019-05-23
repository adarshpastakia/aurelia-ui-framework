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
  endOfWeek,
  endOfYear,
  format,
  isAfter,
  isBefore,
  isValid,
  parseISO,
  startOfDay,
  startOfDecade,
  startOfMinute,
  startOfMonth,
  startOfWeek,
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
  date?: [Date, Date] | Date | undefined;

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
    const dt = startOfMinute(new Date());
    if (date.startsWith(CALENDAR_GRAIN.DAY)) {
      return addDays(dt, parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
    } else if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
      return addWeeks(dt, parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10));
    } else if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
      return addMonths(dt, parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10));
    } else if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
      return addYears(dt, parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10));
    } else {
      return parseISO(date);
    }
  } else if (date) {
    return date as Date;
  }
  return null;
};

export const parseRange = (date: string | [string, string] | undefined): [Date, Date] => {
  if (isString(date)) {
    const before = date.includes("-");
    if (date.startsWith(CALENDAR_GRAIN.DAY)) {
      const today = startOfDay(new Date());
      const diff = addDays(new Date(), parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
      return before ? [diff, today] : [today, diff];
    }
    if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
      const start = startOfWeek(new Date());
      const end = endOfWeek(new Date());
      const diff = parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10);
      return [addWeeks(start, diff), addWeeks(end, diff)];
    }
    if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
      const start = startOfMonth(new Date());
      const end = endOfMonth(new Date());
      const diff = parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10);
      return [addMonths(start, diff), addMonths(end, diff)];
    }
    if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
      const start = startOfYear(new Date());
      const end = endOfYear(new Date());
      const diff = parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10);
      return [addYears(start, diff), addYears(end, diff)];
    }
  } else if (isArray(date)) {
    return [parseISO(date[0]), parseISO(date[1])];
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
      firstDisabled: isBeforeMin(month, startOfYear(config.minDate), -12),
      lastDisabled: isAfterMax(month, endOfYear(config.maxDate), 12),
      prevDisabled: isBeforeMin(month, startOfMonth(config.minDate), -1),
      nextDisabled: isAfterMax(month, endOfMonth(config.maxDate), 1),

      firstTooltip: format(addMonths(month, -12), "MMM yyyy"),
      lastTooltip: format(addMonths(month, 12), "MMM yyyy"),
      prevTooltip: format(addMonths(month, -1), "MMM yyyy"),
      nextTooltip: format(addMonths(month, 1), "MMM yyyy")
    };
  }
  if (view === CALENDAR_VIEWS.MONTHS) {
    return {
      prevDisabled: isBeforeMin(month, startOfYear(config.minDate), -12),
      nextDisabled: isAfterMax(month, endOfYear(config.maxDate), 12),
      prevTooltip: format(addYears(month, -1), "yyyy"),
      nextTooltip: format(addYears(month, 1), "yyyy")
    };
  }
  if (view === CALENDAR_VIEWS.YEARS) {
    const start = startOfDecade(month);
    const end = endOfDecade(month);
    return {
      prevDisabled: isBeforeMin(month, startOfDecade(config.minDate), -120),
      nextDisabled: isAfterMax(month, endOfDecade(config.maxDate), 120),
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

  if (config.page === CALENDAR_VIEWS.DAYS) {
    min = startOfDay(min);
    max = startOfDay(max);
  }
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
