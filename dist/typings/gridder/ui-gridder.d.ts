import { View } from "aurelia-framework";
import { GridderUtils } from "./gridder-utils";
import { UIGridderCell } from "./ui-gridder-cell";
export interface IGridderConfig {
    order?: number;
    row?: number;
    col?: number;
    rowSpan?: number;
    colSpan?: number;
}
declare class UIGridder {
    private element;
    protected ghost: HTMLElement & {
        startWidth: number;
        startHeight: number;
    };
    protected utils: typeof GridderUtils;
    protected owningView: AnyObject;
    private cells;
    constructor(element: Element);
    protected created(owningView: View): void;
    protected attached(): void;
    protected cellsChanged(): void;
    protected startDrag($event: DragEvent): boolean;
    protected stopDrag($event: DragEvent): boolean;
}
export declare const Gridder: (typeof UIGridderCell | typeof UIGridder)[];
export {};
