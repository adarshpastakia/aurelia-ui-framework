/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UIDate {
    protected element: Element;
    date: Date | string;
    minDate: string;
    maxDate: string;
    disabledDays: number[];
    disabledDates: ((date: any) => boolean) | string[];
    disabled: boolean;
    protected currentMonth: Date;
    protected dateRange: {
        start: Date | string;
        end: Date | string;
    };
    protected monthChanged: (month: Date) => void;
    protected weekChanged: (week: Date) => void;
    protected internalDateChanged: (date: Date, timeChange: boolean) => void;
    protected time: any;
    protected hilight: any;
    protected currentYear: number;
    protected decadeStart: number;
    protected currentView: "date" | "month" | "year";
    protected withTime: boolean;
    constructor(element: Element);
    protected dateChanged(date: any): void;
    protected minDateChanged(): void;
    protected maxDateChanged(): void;
    hour: string;
    minute: string;
    ampm: boolean;
    readonly pageStart: Date;
    protected getWeek(date: any, week: any): string;
    protected getDay(date: any, week: any, day: any): string;
    protected getDate(date: any, week: any, day: any): string;
    protected getClasses(date: any, week: any, day: any): string;
    protected isDateDisabled(dt?: Date): boolean;
    protected previous(unit: any): void;
    protected next(unit: any): void;
    protected resetDecade(): void;
    protected currentMonthChanged(): void;
    protected setCurrentMonth($event: UIEvent): void;
    protected getMonthDate(year: any, month: any): string;
    protected getMonthName(year: any, month: any): string;
    protected setCurrentYear($event: UIEvent): void;
    protected selectToday(): void;
    protected selectDate($event: UIEvent): void;
    protected hilightDate($event: UIEvent): void;
    protected fireChange(timeChange?: boolean): void;
}
