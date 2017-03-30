import { View } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { UIApplication } from "../../utils/ui-application";
export declare class UIViewport {
    element: Element;
    httpClient: HttpClient;
    app: UIApplication;
    router: any;
    constructor(element: Element, httpClient: HttpClient, app: UIApplication);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    private dialogContainer;
    private overlayContainer;
    private taskbarContainer;
}
export declare class UIRouterView {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    name: string;
    class: string;
}
export declare class UIAppHeader {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    class: string;
}
export declare class UIAppFooter {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    class: string;
}
export declare class UIAppQuickLinks {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    class: string;
}
export declare class UIAppTitle {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    src: any;
    class: string;
}
