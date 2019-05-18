import { CALENDAR_VIEWS, IDatePreset, IHeaderConfig } from "./calendar-utils";
export declare class UIRangePicker {
    date: [string, string] | string | undefined;
    minDate: string | undefined;
    maxDate: string | undefined;
    format: string;
    datePresets: IDatePreset[];
    dateLabel: string;
    protected startMonth: Date;
    protected endMonth: Date;
    protected startPage: CALENDAR_VIEWS;
    protected endPage: CALENDAR_VIEWS;
    protected VIEWS: typeof CALENDAR_VIEWS;
    protected hilight: Date;
    protected selecting: Date;
    private selectedDate;
    protected bind(): void;
    protected dateChanged(): void;
    readonly config: {
        date: [Date, Date];
        minDate: Date;
        maxDate: Date;
        disabled: any[];
    };
    readonly startTitle: string;
    readonly endTitle: string;
    readonly startHeaderOptions: IHeaderConfig;
    readonly endHeaderOptions: IHeaderConfig;
    protected startHeaderClicked($event: MouseEvent): void;
    protected endHeaderClicked($event: MouseEvent): void;
    protected selectDate($event: MouseEvent): void;
    protected selectStartMonth($event: MouseEvent): void;
    protected selectEndMonth($event: MouseEvent): void;
    protected cancelSelection(): void;
    protected hilightDate($event: MouseEvent): void;
    protected selectPreset(preset: any): void;
}
