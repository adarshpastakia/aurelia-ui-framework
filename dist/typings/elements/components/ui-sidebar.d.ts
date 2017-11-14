export declare class UISidebar {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    label: any;
    bodyClass: any;
    width: any;
    collapsed: boolean;
    position: string;
    glyph: string;
    private labelEl;
    private contentEl;
    private obClick;
    private obResize;
    private forceCollapse;
    private compact;
    private miniDisplay;
    private collapsible;
    collapsedChanged(newValue: any): void;
    toggleCollapse($event: any): boolean;
    showOverlay($event: any): boolean;
}
