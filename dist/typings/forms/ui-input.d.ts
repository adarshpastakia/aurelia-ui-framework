import { BaseInput } from "./base-input";
export declare class UIInput extends BaseInput {
    value: string;
    number: number;
    type: "text" | "number" | "url" | "email" | "password";
    placeholder: string;
    autocomplete: string;
    maxlength: number;
    errors: string | string[];
    readonly: string | boolean;
    disabled: string | boolean;
    private ignoreChange;
    constructor(element: Element);
    protected attached(): void;
    protected valueChanged(): void;
    protected numberChanged(): void;
    readonly counter: string;
    protected maxlengthChanged(): void;
}
