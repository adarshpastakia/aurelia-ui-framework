export declare class UIRibbon {
    element: Element;
    ribbon: any;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): any;
    message: string;
    theme: string;
    themeChanged(newValue: any): void;
    messageChanged(newValue: any): any;
}
