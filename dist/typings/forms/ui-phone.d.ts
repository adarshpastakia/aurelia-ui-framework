import { BaseInput } from "./base-input";
export declare class UIPhone extends BaseInput {
    value: string;
    type: "mobile" | "fixed" | "any";
    country: string;
    errors: string | string[];
    readonly: string | boolean;
    disabled: string | boolean;
    protected inputValue: string;
    protected inputCountry: string;
    protected placeholder: string;
    private ignoreChange;
    constructor(element: Element);
    protected attached(): void;
    protected valueChanged(): void;
    protected countryChanged(): void;
    protected inputValueChanged(): void;
    private update;
}
