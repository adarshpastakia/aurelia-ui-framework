export declare class UIRibbon {
    ribbon: any;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    message: string;
    theme: string;
    private parentEl;
    themeChanged(newValue: any): void;
    messageChanged(newValue: any): any;
}
