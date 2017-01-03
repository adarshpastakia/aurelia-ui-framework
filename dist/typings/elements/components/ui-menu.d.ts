import { View } from 'aurelia-framework';
export declare class UIMenubar {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
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
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
}
export declare class UIMenuSection {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
}
export declare class UIMenuGroup {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    label: string;
}
export declare class UIMenuItem {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    glyph: string;
    class: string;
    active: boolean;
    disabled: boolean;
    href: string;
    private click(evt);
}
