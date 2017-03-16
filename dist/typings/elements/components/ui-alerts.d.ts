import { View } from 'aurelia-framework';
export declare class UIToast {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    glyph: string;
    timeout: number;
    private startClose();
}
export declare class UIAlert {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    glyph: string;
    okLabel: string;
    cancelLabel: string;
    closeCallback: any;
    private confirm;
    private focusBlock;
    closeAlert(b: any): void;
    cancelBlur($event: any): boolean;
    checkKey($event: any): void;
}
export declare class UIPrompt {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    glyph: string;
    okLabel: string;
    cancelLabel: string;
    closeCallback: any;
    private changed;
    private multiline;
    private focusBlock;
    private value;
    closeAlert(b: any): boolean;
    cancelBlur($event: any): boolean;
    checkKey($event: any): boolean;
}
