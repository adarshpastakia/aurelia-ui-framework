interface IBreadcrumbItem {
    icon?: string;
    href?: string;
    labels?: string;
}
export declare class UIBreadcrumbs {
    protected element: Element;
    items: IBreadcrumbItem[];
    private wrapperEl;
    private overflowEl;
    private hasOverflow;
    private obResize;
    constructor(element: Element);
    protected attached(): void;
    protected detached(): void;
    protected calculateOverflow(): void;
    protected resetOverflow(): void;
}
export {};
