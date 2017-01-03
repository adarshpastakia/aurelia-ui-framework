import { View } from 'aurelia-framework';
import { UIBaseInput } from "./ui-input";
export declare class UIPhone extends UIBaseInput {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    value: string;
    phone: any;
    errors: any;
    country: string;
    disabled: boolean;
    readonly: boolean;
    info: string;
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
