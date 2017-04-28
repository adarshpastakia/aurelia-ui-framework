import { Container, ViewCompiler } from 'aurelia-framework';
export declare class UIDgCell {
    element: Element;
    private container;
    private compiler;
    constructor(element: Element, container: Container, compiler: ViewCompiler);
    col: any;
    type: any;
    record: any;
    parent: any;
    attached(): void;
}
export declare class UIDgRow {
    element: Element;
    constructor(element: Element);
    level: number;
    index: any;
    record: any;
    parent: any;
    extraClass: string;
    rowExpand: any;
    rowCounter: any;
    bind(bindingContext: any, overrideContext: any): void;
    attached(): void;
}
export declare class UIDatagrid {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    columns: any;
    data: any;
    store: any;
    subview: any;
    selected: any;
    summaryRow: boolean;
    cols: any[];
    colHead: any[];
    colLocked: any[];
    virtual: boolean;
    editable: boolean;
    rowCounter: boolean;
    rowExpander: boolean;
    expandWidth: number;
    counterWidth: number;
    obPageChange: any;
    columnsChanged(c?: any): void;
    dataChanged(newValue: any): void;
    private doSort(col);
    private fireSelect(record, evt);
    private makeEditable($event, record);
    isRtl: boolean;
    move: any;
    stop: any;
    diff: any;
    dgBody: any;
    startX: any;
    ghost: any;
    colResize: any;
    resizing: boolean;
    resizeColumn(evt: any, col: any): boolean;
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
    store: any;
    style: string;
    totalPages: number;
    fireChange(): void;
}
export declare class UIDGFilter {
    element: Element;
    constructor(element: Element);
}
