import { View } from 'aurelia-framework';
export declare class UIButton {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    glyph: string;
    label: string;
    value: string;
    theme: string;
    width: string;
    dropdown: any;
    form: any;
    busy: boolean;
    disabled: boolean;
    private tether;
    private obMouseup;
    isDisabled: boolean;
    disable(b: any): void;
    toggleDropdown(evt: any): boolean;
}
export declare class UIButtonGroup {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    buttons: any[];
    value: string;
    disabled: boolean;
    disabledChanged(newValue: any): void;
    buttonsChanged(): void;
    active: any;
    valueChanged(newValue: any): void;
    clickEvent(evt: any): void;
}
