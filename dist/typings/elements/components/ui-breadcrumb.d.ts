export declare class UIChip {
    element: Element;
    constructor(element: Element);
    id: string;
    label: string;
    color: string;
    private canClose;
    remove(): void;
}
export declare class UIBreadcrumb {
    element: Element;
    constructor(element: Element);
    private fireChange($event);
}
export declare class UICrumb {
    element: Element;
    constructor(element: Element);
    id: string;
    href: string;
    private fireClick($event);
}
