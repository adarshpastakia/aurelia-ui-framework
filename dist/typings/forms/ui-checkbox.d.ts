export declare class UICheckbox {
    protected element: Element;
    checked: AnyObject;
    model: AnyObject;
    matcher: () => void;
    disabled: boolean;
    protected isDisabled: boolean;
    constructor(element: Element);
    disable(b: boolean): void;
    protected bind(): void;
    protected checkChanged($event: TextEvent): void;
}
