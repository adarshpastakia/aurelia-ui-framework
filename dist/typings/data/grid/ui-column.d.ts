import { View } from "aurelia-framework";
interface ICallbackModel {
    value: string;
    record: KeyValue;
}
export declare class UIColumn {
    private element;
    readonly css: {
        width: string;
        minWidth: string;
        maxWidth: string;
    };
    dataId: string;
    label: string;
    width: string;
    minWidth: string;
    maxWidth: string;
    value: (model: ICallbackModel) => string | number | boolean | Date;
    format: string | ((model: ICallbackModel) => string);
    type: "text" | "number" | "date" | "time" | "datetime" | "currency" | "url";
    align: "start" | "center" | "end";
    locked: false | "start" | "end";
    template: any;
    resizeable: boolean;
    sortable: boolean;
    noPadding: boolean;
    protected isRtl: any;
    protected startX: any;
    protected isResizing: any;
    private owningView;
    constructor(element: Element);
    compileCell(el: Element, record: KeyValue): boolean;
    protected created(owningView: View): void;
    protected bind(): void;
    protected onDrag: ($event: any) => void;
    protected onDragEnd: ($event: any) => void;
    protected startResize($event: MouseEvent): void;
    protected resize($event: MouseEvent): void;
    protected stopResize($event: MouseEvent): void;
    private processValue;
}
export {};
