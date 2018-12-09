/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare enum UIDateRangeKeys {
    TODAY = "TODAY",
    YESTERDAY = "YESTERDAY",
    THIS_WEEK = "THIS_WEEK",
    LAST_WEEK = "LAST_WEEK",
    NEXT_WEEK = "NEXT_WEEK",
    THIS_MONTH = "THIS_MONTH",
    LAST_MONTH = "LAST_MONTH",
    NEXT_MONTH = "NEXT_MONTH",
    THIS_QUARTER = "THIS_QUARTER",
    LAST_QUARTER = "LAST_QUARTER",
    NEXT_QUARTER = "NEXT_QUARTER",
    THIS_YEAR = "THIS_YEAR",
    LAST_YEAR = "LAST_YEAR",
    NEXT_YEAR = "NEXT_YEAR",
    LAST_7 = "LAST_7",
    NEXT_7 = "NEXT_7",
    LAST_15 = "LAST_15",
    NEXT_15 = "NEXT_15",
    LAST_30 = "LAST_30",
    NEXT_30 = "NEXT_30",
    LAST_60 = "LAST_60",
    NEXT_60 = "NEXT_60",
    LAST_90 = "LAST_90",
    NEXT_90 = "NEXT_90",
    CUSTOM = "CUSTOM",
    DIVIDER = "-"
}
declare enum UIDateRangeLabels {
    TODAY = "Today",
    YESTERDAY = "Yesterday",
    THIS_WEEK = "This Week",
    LAST_WEEK = "Last Week",
    NEXT_WEEK = "Next Week",
    THIS_MONTH = "This Month",
    LAST_MONTH = "Last Month",
    NEXT_MONTH = "Next Month",
    THIS_QUARTER = "This Quarter",
    LAST_QUARTER = "Last Quarter",
    NEXT_QUARTER = "Next Quarter",
    THIS_YEAR = "This Year",
    LAST_YEAR = "Last Year",
    NEXT_YEAR = "Next Year",
    LAST_7 = "Last 7 Days",
    NEXT_7 = "Next 7 Days",
    LAST_15 = "Last 15 Days",
    NEXT_15 = "Next 15 Days",
    LAST_30 = "Last 30 Days",
    NEXT_30 = "Next 30 Days",
    LAST_60 = "Last 60 Days",
    NEXT_60 = "Next 60 Days",
    LAST_90 = "Last 90 Days",
    NEXT_90 = "Next 90 Days",
    CUSTOM = "Custom Range"
}
export declare class UIDateRange {
    protected element: Element;
    start: Date | string;
    end: Date | string;
    minDate: string;
    maxDate: string;
    disabled: boolean;
    rangeSelectors: UIDateRangeKeys[];
    protected tempStart: any;
    protected DateRangeLabels: typeof UIDateRangeLabels;
    protected startVm: AnyObject;
    protected endVm: AnyObject;
    protected active: string;
    protected selectStarted: boolean;
    protected startMonth: Date;
    protected endMonth: Date;
    protected withTime: boolean;
    constructor(element: Element);
    protected attached(): void;
    protected minDateChanged(): void;
    protected maxDateChanged(): void;
    readonly range: {
        start: any;
        end: any;
    } | {
        start: string | Date;
        end: string | Date;
    };
    protected weekChanged(week: any): void;
    protected startMonthChanged(month: any): void;
    protected endMonthChanged(month: any): void;
    protected setRange(date: any, timeChange: any): void;
    protected cancelSelection(): void;
    protected hilightDate($event: UIEvent): void;
}
export {};
