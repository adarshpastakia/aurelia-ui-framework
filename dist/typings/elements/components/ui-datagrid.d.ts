import { TemplatingEngine, Container, ViewCompiler } from 'aurelia-framework';
export declare class HeaderCell {
    element: Element;
    ds: any;
    column: any;
    constructor(element: Element);
    readonly sortOrder: any;
    doSort(): void;
    fireResize(evt: any): boolean;
}
export declare class BodyCell {
    element: Element;
    private container;
    private compiler;
    constructor(element: Element, container: Container, compiler: ViewCompiler);
    column: any;
    record: any;
    private slot;
    private elContent;
    attached(): void;
    detached(): void;
}
export declare class BodyRow {
    bind(bindingContext: any, overrideContext: any): void;
    record: any;
    index: number;
    parent: any;
}
export declare class UIDatagrid {
    element: Element;
    private engine;
    constructor(element: Element, engine: TemplatingEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    columns: any;
    dataSource: any;
    viewTpl: any;
    selectedRows: any[];
    cols: any[];
    colHead: any[];
    colLocked: any[];
    private counterWidth;
    private virtual;
    private rowSelect;
    private rowCheckbox;
    private rowCounter;
    private rowExpander;
    private obPageChange;
    columnsChanged(columns: any): void;
    dataSourceChanged(newValue: any): void;
    toggleRecordCheck($event: any, record: any): void;
    private fireSelect($event, record);
    private _X;
    private ghostEl;
    private _column;
    private _columnEl;
    private _evtStop;
    private _evtMove;
    private _isRtl;
    private _resizing;
    private startResize(evt);
    private onResize(evt);
    private endResize(evt);
}
