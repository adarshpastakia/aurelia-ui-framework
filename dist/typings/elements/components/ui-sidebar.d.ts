import { View } from 'aurelia-framework';
export declare class UISidebar {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    label: string;
    collapsed: boolean;
    position: string;
    glyph: string;
    contentCls: string;
    private obClick;
    private miniDisplay;
    private collapsible;
    collapsedChanged(newValue: any): void;
    toggleCollapse($event: any): boolean;
    showOverlay($event: any): boolean;
}
