/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UIPanel {
    protected element: Element;
    label: string;
    icon: string;
    collapsed: boolean;
    width: string;
    minWidth: string;
    maxWidth: string;
    height: string;
    minHeight: string;
    maxHeight: string;
    beforeclose: () => Promise<boolean> | boolean;
    protected closeable: boolean;
    protected collapsible: boolean;
    constructor(element: Element);
    close(): Promise<boolean>;
    protected toggleExpand(expand: boolean): void;
    private remove;
}
export declare class UIPanelGroup {
}
