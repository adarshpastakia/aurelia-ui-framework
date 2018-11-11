export declare class UIMenubar {
    element: Element;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    private tether;
    private isOverflow;
    private wrapper;
    private overflow;
    private overflowToggle;
    private obClick;
    private obResize;
    arrange(): void;
    showOverflow(evt: any): boolean;
}
export declare class UIMenu {
    element: Element;
    constructor(element: Element);
}
export declare class UIMenuSection {
    element: Element;
    constructor(element: Element);
}
export declare class UIMenuGroup {
    element: Element;
    constructor(element: Element);
    label: string;
}
export declare class UIMenuItem {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    id: string;
    glyph: string;
    class: string;
    active: boolean;
    disabled: boolean;
    href: string;
    private click;
}
