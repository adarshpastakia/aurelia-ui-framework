export declare class UIPanel {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    height: string;
    expanded: boolean;
    collapsed: boolean;
    beforeclose: any;
    close(): void;
    collapse(): void;
    expand(): void;
    restore(): void;
    private toggleCollapse();
}
export declare class UIPanelBody {
    element: Element;
    constructor(element: Element);
    height: string;
    minheight: string;
    maxheight: string;
}
export declare class UIPanelGroup {
    element: Element;
    constructor(element: Element);
    attached(): void;
    panels: any;
    private allowtoggle;
    private uncollapse();
}
export declare class UIHeader {
    element: Element;
    constructor(element: Element);
    theme: string;
}
export declare class UIHeaderTool {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    glyph: string;
    dropdown: any;
    disabled: boolean;
    private tether;
    private obMouseup;
    private type;
    private fireEvent(evt);
}
export declare class UIHeaderTitle {
    element: Element;
    constructor(element: Element);
    glyph: string;
}
