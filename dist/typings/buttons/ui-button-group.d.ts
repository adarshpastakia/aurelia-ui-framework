export declare class UIButtonGroup {
    protected element: Element;
    value: string;
    separator: string;
    size: "nm" | "sm" | "md" | "lg";
    type: "default" | "solid" | "link";
    disabled: boolean;
    private currentSelected;
    private buttons;
    private toggle;
    constructor(element: Element);
    protected attached(): void;
    protected buttonsChanged(): void;
    protected valueChanged(newValue: any, oldValue: any): void;
    protected buttonClicked($event: CustomEvent): void;
}
