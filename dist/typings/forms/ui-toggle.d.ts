export declare class UIToggle {
    protected element: Element;
    checked: AnyObject;
    model: AnyObject;
    matcher: () => void;
    disabled: boolean;
    labelOn: string;
    labelOff: string;
    width: string;
    protected isDisabled: boolean;
    constructor(element: Element);
    disable(b: boolean): void;
    protected bind(): void;
    protected checkChanged($event: TextEvent): void;
}
