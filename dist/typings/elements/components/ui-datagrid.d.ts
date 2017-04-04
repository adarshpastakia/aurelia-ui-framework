export declare class UIDgRow {
    level: number;
    record: any;
    parent: any;
    expand(evt: any): boolean;
    getSubdata(): any;
}
export declare class UIDatagrid {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    columns: any;
    store: any;
    pager: any;
    summaryRow: boolean;
    private cols;
    private tableWidth;
    private virtual;
    private isBusy;
    private obDataChange;
    private obPageChange;
    private handleSize;
    columnsChanged(newValue: any): void;
    storeChanged(newValue: any): void;
    dgHead: any;
    dgFoot: any;
    scroller: any;
    selected: any;
    private scrolling();
    private doSort(col);
    private calculateWidth(cols);
    private fireSelect(record);
    move: any;
    stop: any;
    diff: any;
    startX: any;
    ghost: any;
    colNext: any;
    colResize: any;
    resizing: boolean;
    resizeColumn(evt: any, col: any, next: any): boolean;
    resize(evt: any): void;
    resizeEnd(evt: any): boolean;
}
export declare class UIDGEmpty {
}
export declare class UIPager {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    page: number;
    style: string;
    store: any;
    totalPages: number;
    fireChange(): void;
}
export declare class UIDGFilter {
    element: Element;
    constructor(element: Element);
}
