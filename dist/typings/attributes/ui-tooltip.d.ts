export declare class UITooltipBase {
    element: Element;
    static tooltipEl: any;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    unbind(): void;
    theme: string;
    value: string;
    private tether;
    private timer;
    show(): void;
    hide(): void;
}
export declare class UITooltip extends UITooltipBase {
    element: Element;
    constructor(element: Element);
    theme: string;
    value: string;
}
export declare class UITooltipDark extends UITooltipBase {
    element: Element;
    constructor(element: Element);
}
export declare class UITooltipPrimary extends UITooltipBase {
    element: Element;
    constructor(element: Element);
}
export declare class UITooltipSecondary extends UITooltipBase {
    element: Element;
    constructor(element: Element);
}
