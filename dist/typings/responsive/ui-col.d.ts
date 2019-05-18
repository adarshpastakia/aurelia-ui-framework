export declare class UICol {
    protected element: Element;
    size: "auto" | "fill" | string;
    width: string;
    maxWidth: string;
    minWidth: string;
    align: "" | "top" | "middle" | "bottom" | "stretch";
    constructor(element: Element);
    readonly sizes: string;
    readonly classes: string;
}
