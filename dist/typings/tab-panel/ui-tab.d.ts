export declare class UITab {
    protected element: Element;
    id: string;
    label: string;
    icon: string;
    active: boolean;
    disabled: boolean;
    view: AnyObject;
    model: AnyObject;
    viewModel: AnyObject;
    closeable: boolean;
    constructor(element: Element);
    protected bind(): void;
}
