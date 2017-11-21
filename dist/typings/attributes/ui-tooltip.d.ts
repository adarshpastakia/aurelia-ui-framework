export declare class UITooltipBase {
    static tooltipEl: any;
    static POSITIONS: {
        top: string;
        bottom: string;
        start: string;
        end: string;
    };
    constructor(element: Element);
    attached(): void;
    detached(): void;
    unbind(): void;
    position: string;
    theme: string;
    value: any;
    private parentEl;
    private tether;
    private timer;
    show(): void;
    hide(): void;
}
export declare class UITooltip extends UITooltipBase {
    element: Element;
    constructor(element: Element);
    position: string;
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
