export declare class UIDialogElement {
    protected element: Element;
    label: string;
    icon: string;
    width: string;
    minWidth: string;
    maxWidth: string;
    height: string;
    minHeight: string;
    maxHeight: string;
    help: boolean | (() => void);
    modal: boolean;
    closeable: boolean;
    maximizable: boolean;
    minimizable: boolean;
    hideToolbox: boolean;
    beforeclose: () => Promise<boolean> | boolean;
    returnPromise: (arg: {
        result?: AnyObject;
        cancelled?: boolean;
    }) => void;
    protected active: boolean;
    protected minimized: boolean;
    protected maximized: boolean;
    private dialogEl;
    private position;
    private taskButton;
    private previousPosition;
    constructor(element: Element);
    cancel(): void;
    close(result?: AnyObject): void;
    minimize(): void;
    activate(): void;
    protected bind(): void;
    protected attached(): void;
    protected startDrag($event: MouseEvent): void;
    readonly css: {
        bottom: string;
        left: string;
        right: string;
        top: string;
        height: string;
        maxHeight: string;
        maxWidth: string;
        minHeight: string;
        minWidth: string;
        width: string;
    };
}
