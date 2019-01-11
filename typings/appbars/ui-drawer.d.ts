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
    protected push: boolean;
    protected closeOnClick: boolean;
    private obClick;
    private isAttached;
    constructor(element: Element);
    protected attached(): void;
    protected detached(): void;
    protected widthChanged(): void;
}
export declare class UIDrawerToggle {
    drawer: HTMLElement;
    protected toggleOpen(): void;
}
