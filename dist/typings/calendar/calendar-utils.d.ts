export declare enum CALENDAR_VIEWS {
    DAYS = 0,
    MONTHS = 1,
    YEARS = 2,
    DECADES = 3
}
export declare enum CALENDAR_NAVIGATION {
    FIRST = "first",
    LAST = "last",
    PREV = "prev",
    NEXT = "next"
}
export declare enum CALENDAR_GRAIN {
    DAY = "$day",
    WEEK = "$week",
    MONTH = "$month",
    YEAR = "$year"
}
export declare type IDateDisabled = string[] | (({ date: Date }: {
    date: any;
}) => boolean) | undefined;
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
export declare const parseDate: (date: string | Date) => Date;
export declare const parseRange: (date: string | [string, string]) => [Date, Date];
export declare const getTitle: (month: Date, view: CALENDAR_VIEWS) => string;
export declare const changeMonth: (month: Date, view: CALENDAR_VIEWS, grain: string) => Date;
export declare const buildHeaderConfig: (month: Date, view: CALENDAR_VIEWS, config: IDateConfig) => {
    firstDisabled: boolean;
    lastDisabled: boolean;
    prevDisabled: boolean;
    nextDisabled: boolean;
    firstTooltip: string;
    lastTooltip: string;
    prevTooltip: string;
    nextTooltip: string;
} | {
    prevDisabled: boolean;
    nextDisabled: boolean;
    prevTooltip: string;
    nextTooltip: string;
    firstDisabled?: undefined;
    lastDisabled?: undefined;
    firstTooltip?: undefined;
    lastTooltip?: undefined;
};
export declare const isBeforeMin: (month: Date, minDate: Date, n?: number) => boolean;
export declare const isAfterMax: (month: Date, maxDate: Date, n?: number) => boolean;
export declare const isDisabled: (config: IDateConfig, date: Date) => boolean;
