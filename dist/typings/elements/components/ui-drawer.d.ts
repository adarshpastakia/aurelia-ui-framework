export declare class UIDrawer {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    position: string;
    private glyph;
    private bodyCls;
    closeDrawer(): void;
}
export declare class UIDrawerToggle {
    element: Element;
    constructor(element: Element);
    drawer: any;
    glyph: string;
    openDrawer(evt: any): boolean;
}
