export declare class UIDataGrid {
    private element;
    dataSource: any;
    checkable: boolean;
    selected: KeyValue[];
    columns: any;
    protected ds: any;
    protected showCounter: any;
    constructor(element: Element);
    protected attached(): void;
    protected dataSourceChanged(): void;
    protected toggleSelection($event: any, record: any): void;
    protected toggleSelectionAll($event: any): void;
}
