/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
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
