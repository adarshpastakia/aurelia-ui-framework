/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UIForm {
    protected element: Element;
    disabled: boolean;
    private vmElement;
    constructor(element: Element);
    protected attached(): void;
    protected disabledChanged(): void;
    protected fireSubmit(): void;
}
