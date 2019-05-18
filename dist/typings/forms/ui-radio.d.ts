export declare class UIRadio {
    protected element: Element;
    checked: AnyObject;
    model: AnyObject;
    name: string;
    matcher: () => void;
    disabled: boolean;
    protected isDisabled: boolean;
    constructor(element: Element);
    disable(b: boolean): void;
    private checkChanged;
}
