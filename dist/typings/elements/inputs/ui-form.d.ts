export declare class UIForm {
    element: Element;
    constructor(element: Element);
    attached(): void;
    formEl: any;
    class: string;
    busy: boolean;
    disabled: boolean;
    inputEls: any;
    busyChanged(newValue: any): void;
    disabledChanged(newValue: any): void;
    disableInputs(newValue: any): void;
    fireSubmit(): void;
}
export declare class UIFieldset {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    class: string;
    legend: string;
    disabled: boolean;
    checked: boolean;
    inputEls: any;
    private fieldsetEl;
    private collapsible;
    checkedChanged(newValue: any): void;
    disabledChanged(newValue: any): void;
    disableInputs(newValue: any): void;
}
export declare class UIInputGroup {
    element: Element;
    constructor(element: Element);
    width: string;
    innerWidth: string;
}
export declare class UIInputInfo {
    element: Element;
    constructor(element: Element);
    class: string;
}
export declare class UIInputAddon {
    element: Element;
    constructor(element: Element);
    glyph: string;
    glyphClass: string;
    focusEl(): boolean;
}
export declare class UIInputLabel {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    static seed: number;
    private label;
    for: string;
    class: string;
    width: string;
}
