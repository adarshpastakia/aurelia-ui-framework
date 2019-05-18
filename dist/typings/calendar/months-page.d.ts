import { IDateConfig } from "./calendar-utils";
export declare class MonthsPage {
    month: Date;
    config: IDateConfig;
    protected isAttached: boolean;
    protected attached(): void;
    protected getMonth(month: number): KeyValue;
}
