import { CALENDAR_VIEWS, IDateConfig, IDateDisabled, IDatePreset, IHeaderConfig } from "./calendar-utils";
export declare class UIDatePicker {
    date: string | undefined;
    minDate: string | undefined;
    maxDate: string | undefined;
    disabledDates: IDateDisabled;
    format: string;
    datePresets: IDatePreset[];
    dateLabel: string;
    protected currentPage: CALENDAR_VIEWS;
    protected month: Date;
    protected time: Date;
    protected VIEWS: typeof CALENDAR_VIEWS;
    private selectedDate;
    protected bind(): void;
    protected dateChanged(): void;
    readonly config: IDateConfig;
    readonly title: string;
    readonly headerOptions: IHeaderConfig;
    readonly disabledDatesList: IDateDisabled;
    protected headerClicked($event: MouseEvent): void;
    protected selectDate($event: MouseEvent): void;
    protected timeChanged(newTime: Date): void;
    protected selectMonth($event: MouseEvent): void;
    protected cancelSelection(): void;
    protected selectPreset(preset: any): void;
    private updateDate;
}
