import { BasePanel } from "../panels/base-panel";
import { GridderUtils } from "./gridder-utils";
import { IGridderConfig } from "./ui-gridder";
export declare class UIGridderCell extends BasePanel {
    protected element: Element;
    label: string;
    icon: string;
    config: IGridderConfig;
    pinned: boolean;
    expanded: boolean;
    protected closeable: boolean;
    protected expandable: boolean;
    protected moveable: boolean;
    protected pinnable: boolean;
    protected resizeable: boolean;
    protected autoHideHeader: boolean;
    protected utils: typeof GridderUtils;
    protected vmElement: HTMLElement;
    constructor(element: Element);
    protected bind(): void;
    protected attached(): void;
    protected togglePinned(pinned: boolean): void;
}
