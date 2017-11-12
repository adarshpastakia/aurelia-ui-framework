import { UIBaseInput } from "./ui-input";
export declare class UIPhone extends UIBaseInput {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    value: string;
    phone: any;
    errors: any;
    country: string;
    disabled: boolean;
    readonly: boolean;
    helpText: string;
    private clear;
    private national;
    private prefixEl;
    private placeholder;
    private ignore;
    valueChanged(newValue: any): void;
    countryChanged(newValue: any): void;
    formatPhone(val: any): void;
    fireEvent(evt: any): void;
    checkInput(evt: any): any;
}
