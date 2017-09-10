export declare class UITooltip {
    element: Element;
    static tooltipEl: any;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    unbind(): void;
    theme: string;
    message: string;
    private tether;
    private timer;
    show(): void;
    hide(): void;
}
