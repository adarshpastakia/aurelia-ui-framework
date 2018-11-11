export declare class UITooltip {
    protected element: Element;
    value: string;
    theme: string;
    position: string;
    private timer;
    private parentEl;
    constructor(element: Element);
    protected attached(): void;
    protected detached(): void;
    protected show(): void;
    protected hide(): void;
    private showFn;
    private hideFn;
}
