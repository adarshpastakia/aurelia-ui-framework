export declare class UITooltip {
    protected element: Element;
    value: string;
    theme: string;
    position: "left" | "right" | "top" | "bottom";
    private id;
    private timer;
    private parentEl;
    constructor(element: Element);
    protected attached(): void;
    protected detached(): void;
    protected show(): void;
    protected hide(): void;
    protected valueChanged(): void;
    private showFn;
    private hideFn;
}
