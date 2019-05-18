export declare class BasePanel {
    pinned: boolean;
    expanded: boolean;
    collapsed: boolean;
    beforeclose: () => Promise<boolean> | boolean;
    protected closeable: boolean;
    protected expandable: boolean;
    protected collapsible: boolean;
    protected element: Element;
    close(): Promise<boolean>;
    protected bind(): void;
    protected toggleExpand(expand: boolean): void;
    protected toggleCollapse(collapse: boolean): void;
    protected remove(): boolean;
}
