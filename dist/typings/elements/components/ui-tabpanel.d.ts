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
    tab: any;
    private noTabs;
    private useRouter;
    private tabsChanged();
    private activeTabChanged(newValue);
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
    attached(): void;
    id: string;
    glyph: string;
    glyphClass: string;
    disabled: boolean;
    active: boolean;
    href: string;
    view: string;
    model: any;
    viewModel: string;
    private buttonEl;
    closeable: boolean;
    private fireTabChange();
}
