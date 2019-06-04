export declare class UIDrawer {
    protected element: Element;
    align: string;
    width: string;
    maxWidth: string;
    protected push: boolean;
    protected closeOnClick: boolean;
    private readonly obClick;
    private isAttached;
    constructor(element: Element);
    protected attached(): void;
    protected detached(): void;
    protected widthChanged(): void;
}
