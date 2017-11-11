export declare class UIViewport {
    element: Element;
    router: any;
    constructor(element: Element);
    attached(): void;
    private dialogContainer;
    private overlayContainer;
    private taskbarContainer;
}
export declare class UIRouterView {
    element: Element;
    constructor(element: Element);
    name: string;
    class: string;
}
export declare class UIAppHeader {
    element: Element;
    constructor(element: Element);
    class: string;
}
export declare class UIAppBanner {
    element: Element;
    constructor(element: Element);
    class: string;
}
export declare class UIAppFooter {
    element: Element;
    constructor(element: Element);
    class: string;
}
export declare class UIAppQuickLinks {
    element: Element;
    constructor(element: Element);
    class: string;
}
export declare class UIAppTitle {
    element: Element;
    constructor(element: Element);
    href: string;
    src: string;
    class: string;
}
