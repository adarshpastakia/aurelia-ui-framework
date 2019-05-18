export declare class UIField {
    protected element: Element;
    label: string;
    plain: string | boolean;
    required: string | boolean;
    disabled: string | boolean;
    width: string;
    constructor(element: Element);
    focus(): void;
    readonly classes: string;
}
