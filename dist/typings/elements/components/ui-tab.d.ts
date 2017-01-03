import { View } from 'aurelia-framework';
export declare class UITabPanel {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    height: string;
    tabs: any[];
    activeTab: number;
    private noTabs;
    private activeTabEl;
    private tabsChanged();
    private activeTabChanged(newValue);
    private closeTab(tab);
    private activateTab(tab);
}
export declare class UITab {
    element: Element;
    static seed: number;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    id: string;
    glyph: string;
    label: string;
    disabled: boolean;
    active: boolean;
    closeable: boolean;
    remove(): void;
}
