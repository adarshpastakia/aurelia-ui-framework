export declare class UITreePanel {
    protected element: Element;
    dataSource: AnyObject[];
    labelSearch: string;
    labelEmpty: string;
    labelLess: string;
    labelMore: string;
    maxNodes: number;
    protected searchable: boolean;
    private rootNode;
    constructor(element: Element);
    protected bind(): void;
    protected dataSourceChanged(): void;
}
