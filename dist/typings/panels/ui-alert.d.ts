export declare class UIAlert {
    protected element: Element;
    open: boolean;
    icon: string;
    alertTitle: string;
    okLabel: string;
    cancelLabel: string;
    type: "alert" | "confirm";
    protected closeable: boolean;
    constructor(element: Element);
    protected close(result: boolean): void;
}
