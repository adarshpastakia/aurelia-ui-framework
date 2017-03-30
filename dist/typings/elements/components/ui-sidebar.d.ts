export declare class UIAffixPoint {
}
export declare class UIAffixContent {
}
export declare class UISidebar {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    label: string;
    collapsed: boolean;
    position: string;
    glyph: string;
    contentCls: string;
    private affixEl;
    private affixPoint;
    private contentEl;
    private obClick;
    private miniDisplay;
    private collapsible;
    collapsedChanged(newValue: any): void;
    toggleCollapse($event: any): boolean;
    showOverlay($event: any): boolean;
    watchScroll(e: any): void;
}
