export declare class UIDrop {
    protected element: Element;
    class: string;
    vmElement: HTMLDivElement;
    isOpen: boolean;
    stretch: boolean;
    closeOnClick: boolean;
    attachToViewport: boolean;
    private position;
    private anchorPosition;
    private tetherObj;
    private anchorEl;
    private obClick;
    private obResize;
    constructor(element: Element);
    tether(anchorEl: Element): void;
    updatePosition(): void;
    toggleDrop(open?: boolean): void;
    closeDrop(): void;
    protected disposeListeners(): void;
    protected detached(): void;
    private canClose;
    private close;
}
