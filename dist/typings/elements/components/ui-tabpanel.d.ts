export declare class UITabbarStart {
}
export declare class UITabbarEnd {
}
export declare class UITabbarToggle {
    element: Element;
    dropdown: any;
    disabled: boolean;
    private tether;
    private obMouseup;
    isDisabled: boolean;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    toggleDropdown(evt: any): boolean;
}
export declare class UITabPanel {
    element: Element;
    constructor(element: Element);
    attached(): void;
    detached(): void;
    private tether;
    private isOverflow;
    private wrapper;
    private overflow;
    private overflowToggle;
    private obClick;
    private obResize;
    height: string;
    tabs: any[];
    activeTab: any;
    private noTabs;
    private activeTabEl;
    private tabsChanged();
    private activeTabChanged(newValue);
    close(id: any, force?: boolean): void;
    private closeTab(tab);
    private doClose(tab);
    private activateTab(newTab);
    canActivate(id: any): boolean;
    private arrange();
    private showOverflow(evt);
}
export declare class UITab {
    element: Element;
    static seed: number;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    id: string;
    glyph: string;
    label: string;
    glyphClass: string;
    disabled: boolean;
    beforeclose: any;
    active: boolean;
    closeable: boolean;
    remove(): void;
    canDeactivate(): Promise<any>;
    readonly viewModel: any;
}
