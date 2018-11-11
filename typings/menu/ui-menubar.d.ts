export declare class UIMenubar {
    protected element: Element;
    private wrapperEl;
    private overflowEl;
    private hasOverflow;
    private obResize;
    constructor(element: Element);
    protected attached(): void;
    protected detached(): void;
    protected calculateOverflow(): void;
    protected resetOverflow(): void;
}
