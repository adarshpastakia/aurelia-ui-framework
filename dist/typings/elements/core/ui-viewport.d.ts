import { HttpClient } from 'aurelia-fetch-client';
import { UIApplication } from "../../utils/ui-application";
export declare class UIViewport {
    element: Element;
    httpClient: HttpClient;
    app: UIApplication;
    router: any;
    constructor(element: Element, httpClient: HttpClient, app: UIApplication);
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
    src: any;
    href: string;
    class: string;
}
