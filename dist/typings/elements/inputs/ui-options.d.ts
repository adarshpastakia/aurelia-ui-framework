export declare class UIOptionGroup {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    value: any;
    name: string;
    cols: string;
    static seed: number;
    valueChanged(newValue: any): void;
    changed($event: any): void;
}
export declare class UICheckbox {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    checked: boolean;
    disabled: boolean;
    static seed: number;
    private for;
    isDisabled: boolean;
    disabledChanged(newValue: any): void;
    disable(b: any): void;
}
export declare class UIRadio {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    checked: boolean;
    name: string;
    value: string;
    disabled: boolean;
    static seed: number;
    private for;
    isDisabled: boolean;
    disabledChanged(newValue: any): void;
    disable(b: any): void;
    changed($event: any): any;
}
export declare class UISwitch {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    checked: boolean;
    value: any;
    size: string;
    class: string;
    onLabel: string;
    offLabel: string;
    onValue: boolean;
    offValue: boolean;
    disabled: boolean;
    theme: string;
    static seed: number;
    private for;
    isDisabled: boolean;
    checkedChanged(newValue: any): void;
    valueChanged(newValue: any): void;
    disable(b: any): void;
    private fireChange;
}
