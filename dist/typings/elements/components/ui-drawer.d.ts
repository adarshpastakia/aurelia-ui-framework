export declare class UIDrawer {
    element: Element;
    css: {
        show: string;
        fluid: string;
        large: string;
    };
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    private contentEl;
    width: string;
    bodyClass: string;
    contentClass: string;
    position: string;
    closeGlyph: string;
    closeDrawer(): void;
    openDrawer(): void;
}
export declare class UIDrawerToggle {
    element: Element;
    constructor(element: Element);
    drawer: any;
    glyph: string;
    openDrawer(evt: any): boolean;
}
