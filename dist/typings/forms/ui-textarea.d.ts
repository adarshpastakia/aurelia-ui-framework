import { BaseInput } from "./base-input";
export declare class UITextarea extends BaseInput {
    value: string;
    number: number;
    placeholder: string;
    rows: number;
    maxlength: number;
    errors: string | string[];
    readonly: string | boolean;
    disabled: string | boolean;
    constructor(element: Element);
    readonly counter: string;
}
