import { TemplatingEngine, Container, ViewCompiler } from 'aurelia-framework';
export declare class HeaderCell {
    ds: any;
    column: any;
    readonly sortOrder: any;
    doSort(): void;
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
    toggleRecordCheck(record: any): void;
    private fireSelect($event, record);
}
