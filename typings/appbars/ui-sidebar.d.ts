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
    minWidth: string;
    titleBg: string;
    titleColor: string;
    titleWeight: string;
    toggleCollapse: boolean;
    collapsed: boolean;
    protected peek: boolean;
    protected resizable: boolean;
    protected collapsible: boolean;
    protected closeOnClick: boolean;
    private obClick;
    private bodyEl;
    private startX;
    private isResizing;
    constructor(element: Element);
    protected bind(): void;
    protected detached(): void;
    readonly toggleIcon: string;
    protected startResize($event: MouseEvent): void;
    protected resize($event: MouseEvent): void;
    protected stopResize(): void;
    private doResize;
    private endResize;
}
