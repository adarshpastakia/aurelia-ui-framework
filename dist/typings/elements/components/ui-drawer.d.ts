import { View } from 'aurelia-framework';
export declare class UIDrawer {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    position: string;
    private glyph;
    private bodyCls;
    closeDrawer(): void;
}
export declare class UIDrawerToggle {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    drawer: any;
    glyph: string;
    openDrawer(evt: any): boolean;
}
