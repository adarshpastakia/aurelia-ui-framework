export declare class UIButton {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
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
    bind(bindingContext: Object, overrideContext: Object): void;
    buttons: any[];
    value: string;
    disabled: boolean;
    disabledChanged(newValue: any): void;
    buttonsChanged(): void;
    active: any;
    valueChanged(newValue: any): void;
    clickEvent(evt: any): void;
}
