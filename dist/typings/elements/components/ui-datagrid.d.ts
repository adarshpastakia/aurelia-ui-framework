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
    slot: any;
    attached(): void;
    bind(): void;
    detached(): void;
}
export declare class UIDgRow {
    element: Element;
    constructor(element: Element);
    level: number;
    index: any;
    record: any;
    parent: any;
    odd: any;
    last: boolean;
    rowExpand: any;
    rowCounter: any;
    bind(bindingContext: any, overrideContext: any): void;
    indexChanged(): void;
    attached(): void;
}
export declare class UIDatagrid {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    columns: any;
    data: any[];
    subview: any;
    summaryRow: boolean;
    sortColumn: string;
    sortOrder: string;
    pager: any;
    perPage: number;
    cols: any[];
    colHead: any[];
    colLocked: any[];
    virtual: boolean;
    rowCounter: boolean;
    rowExpander: boolean;
    expandWidth: number;
    counterWidth: number;
    private loaded;
    private isBusy;
    private paged;
    private filtered;
    selected: any;
    obPageChange: any;
    columnsChanged(c?: any): void;
    dataChanged(newValue: any): void;
    private filter();
    private makePage();
    private doSort(col);
    private fireSelect(record);
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
    style: string;
    store: any;
    totalPages: number;
    fireChange(): void;
}
export declare class UIDGFilter {
    element: Element;
    constructor(element: Element);
}
