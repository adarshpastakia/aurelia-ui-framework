import { View } from 'aurelia-framework';
export declare class UIBaseInput {
    value: string;
    inputEl: any;
    element: any;
    disabled: boolean;
    readonly: boolean;
    isDisabled: boolean;
    bind(bindingContext: Object, overrideContext: Object): void;
    disabledChanged(newValue: any): void;
    readonlyChanged(newValue: any): void;
    disable(b: any): void;
    clearInput(): void;
    focus(): void;
    fireEvent(evt: any): void;
}
export declare class UIInput extends UIBaseInput {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    value: string;
    number: any;
    decimal: any;
    dir: string;
    width: string;
    errors: any;
    maxlength: number;
    disabled: boolean;
    readonly: boolean;
    info: string;
    placeholder: string;
    private type;
    private clear;
    private counter;
    private ignore;
    valueChanged(newValue: any): void;
    numberChanged(newValue: any): void;
    decimalChanged(newValue: any): void;
    fireEvent(evt: any): void;
    checkInput(evt: any): any;
}
export declare class UIFileInput {
    element: Element;
    static FILE_IMAGES: string;
    static FILE_DOCS: string;
    fileTypes: string;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    inputEl: any;
    files: any[];
    dragging: boolean;
    dragEnter($event: any): boolean;
    dragExit($event: any): void;
    drop($event: any): void;
    fileChoose(): void;
    remove(index: any): void;
}
