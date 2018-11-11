import { BaseInput } from "./base-input";
export declare class UIInput extends BaseInput {
    date: Date | string;
    minDate: string;
    maxDate: string;
    disabledDays: number[];
    disabledDates: (({ date }: {
        date: any;
    }) => boolean) | string[];
    placeholder: string;
    errors: string | string[];
    readonly: string | boolean;
    disabled: string | boolean;
    constructor(element: Element);
    protected attached(): void;
}
