import { BasePanel } from "./base-panel";
export declare class UIPanel extends BasePanel {
    protected element: Element;
    label: string;
    icon: string;
    collapsed: boolean;
    expanded: boolean;
    width: string;
    minWidth: string;
    maxWidth: string;
    height: string;
    minHeight: string;
    maxHeight: string;
    beforeclose: () => Promise<boolean> | boolean;
    protected closeable: boolean;
    protected expandable: boolean;
    protected collapsible: boolean;
    constructor(element: Element);
}
