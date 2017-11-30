export declare class UIDatagrid {
    element: Element;
    constructor(element: Element);
    columns: any;
    dataSource: any;
    cols: any[];
    colHead: any[];
    colLocked: any[];
    private repeater;
    private rowCounter;
    private rowExpander;
    columnsChanged(c?: any): void;
}
