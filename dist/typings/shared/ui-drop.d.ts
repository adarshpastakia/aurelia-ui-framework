import { UITether } from "../utils/ui-tether";
export declare class UIDrop {
    protected element: Element;
    class: string;
    vmElement: HTMLDivElement;
    isOpen: boolean;
    stretch: boolean;
    closeOnClick: boolean;
    attachToViewport: boolean;
    position: UITether.Position;
    anchorPosition: UITether.Position;
    private tetherObj;
    private anchorEl;
    private obClick;
    private obResize;
    private obViewportResize;
    constructor(element: Element);
    tether(anchorEl: Element): void;
    updatePosition(): void;
    toggleDrop(open?: boolean): void;
    closeDrop(): void;
    protected disposeListeners(): void;
    protected detached(): void;
    protected close($event: UIEvent): void;
    private canClose;
}
