/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UIContainer {
    protected element: Element;
    constructor(element: Element);
}
export declare class UIGrid {
    protected element: Element;
    size: string;
    constructor(element: Element);
}
export declare class UIRow {
    protected element: Element;
    halign: string;
    valign: string;
    constructor(element: Element);
    readonly classes: string;
}
export declare class UIColumn {
    protected element: Element;
    size: string;
    width: string;
    maxWidth: string;
    minWidth: string;
    align: string;
    constructor(element: Element);
    readonly sizes: string;
    readonly classes: string;
}
