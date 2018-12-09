/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UIDrawer {
    protected element: Element;
    align: string;
    width: string;
    maxWidth: string;
    protected peek: boolean;
    protected closeOnClick: boolean;
    private obClick;
    constructor(element: Element);
    protected detached(): void;
}
