/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UIButtonGroup {
    protected element: Element;
    value: string;
    separator: string;
    private currentSelected;
    private buttons;
    private toggle;
    constructor(element: Element);
    protected attached(): void;
    protected buttonsChanged(): void;
    protected valueChanged(newValue: any, oldValue: any): void;
    private buttonClicked;
}
