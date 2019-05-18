import { IDateConfig } from "./calendar-utils";
export declare class DaysPage {
    month: Date;
    config: IDateConfig;
    protected pageStart: Date;
    protected isAttached: boolean;
    protected attached(): void;
    protected monthChanged(newMonth: any): void;
    protected weekTitle(week: number): string;
    protected weekNumber(week: number): string;
    protected getDate(week: number, day: number): KeyValue;
}
