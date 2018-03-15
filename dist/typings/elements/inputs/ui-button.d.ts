export declare class UIButton {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    glyph: string;
    label: string;
    value: string;
    width: string;
    splitTheme: string;
    splitGlyph: string;
    dropdown: any;
    busy: boolean;
    disabled: boolean;
    buttonEl: any;
    private labelEl;
    private hasLabel;
    private tether;
    private obMouseup;
    private hideOnClick;
    split: boolean;
    isDisabled: boolean;
    hideCaret: boolean;
    disable(b: any): void;
    disabledChanged(newValue: any): void;
    hideDropdown(): boolean;
    toggleDropdown(evt: any, isSplit: any): boolean;
}
export declare class UIButtonGroup {
    element: Element;
    constructor(element: Element);
    attached(): void;
    buttons: any[];
    value: string;
    separator: string;
    disabled: boolean;
    private size;
    buttonsChanged(): void;
    active: any;
    valueChanged(newValue: any): void;
    clickEvent(evt: any): void;
}
