export declare class UIButtonGroup {
    protected element: Element;
    value: string;
    separator: string;
    size: "nm" | "sm" | "md" | "lg";
    type: "default" | "outline" | "solid" | "tool";
    disabled: boolean;
    private currentSelected;
    private buttons;
    private readonly toggle;
    private elDisabled;
    constructor(element: Element);
    readonly isDisabled: boolean;
    disable(disabled: boolean): void;
    protected attached(): void;
    protected buttonsChanged(): void;
    protected valueChanged(newValue: any, oldValue: any): void;
    protected buttonClicked($event: CustomEvent): void;
}
