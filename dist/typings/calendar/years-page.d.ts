import { IDateConfig } from "./calendar-utils";
export declare class YearsPage {
    month: Date;
    config: IDateConfig;
    protected pageStart: Date;
    protected isAttached: boolean;
    protected attached(): void;
    protected monthChanged(newMonth: any): void;
    protected getYear(year: number): KeyValue;
}
