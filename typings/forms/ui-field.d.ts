/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
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
export declare class UIFieldWrapper {
    plain: string | boolean;
    readonly classes: string;
}
