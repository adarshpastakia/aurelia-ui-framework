/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UISidebar {
    protected element: Element;
    align: string;
    label: string;
    width: string;
    maxWidth: string;
    titleBg: string;
    titleColor: string;
    titleWeight: string;
    collapsed: boolean;
    protected peek: boolean;
    protected collapsible: boolean;
    private obClick;
    constructor(element: Element);
    protected detached(): void;
    readonly toggleIcon: string;
}
