import { BaseInput } from "./base-input";
export declare class UIInput extends BaseInput {
    value: string;
    number: number;
    type: "text" | "number" | "url" | "email";
    placeholder: string;
    autocomplete: string;
    maxlength: number;
    errors: string | string[];
    readonly: string | boolean;
    disabled: string | boolean;
    constructor(element: Element);
    protected attached(): void;
    readonly counter: string;
    protected maxlengthChanged(): void;
}
