/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UIToggle {
    protected element: Element;
    checked: AnyObject;
    model: AnyObject;
    matcher: () => void;
    disabled: boolean;
    protected isDisabled: boolean;
    constructor(element: Element);
    disable(b: boolean): void;
    protected bind(): void;
    private checkChanged;
}
