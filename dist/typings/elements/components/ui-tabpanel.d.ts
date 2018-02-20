export declare class UITabbarStart {
}
export declare class UITabbarEnd {
}
export declare class UITabbarToggle {
    element: Element;
    class: string;
    dropdown: any;
    disabled: boolean;
    private tether;
    private buttonEl;
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
    active: any;
    activeTab: any;
    private noTabs;
    private useRouter;
    private tabsChanged();
    private activeChanged(newValue);
    private activateTab(newTab);
    canActivate(id: any): boolean;
    private arrange();
    private showOverflow(evt);
    private tabClose(tab);
    private canClose();
}
export declare class UITab {
    element: Element;
    static seed: number;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    id: string;
    class: string;
    glyph: string;
    glyphClass: string;
    disabled: boolean;
    closeable: boolean;
    active: boolean;
    href: string;
    view: string;
    model: any;
    viewModel: string;
    private buttonEl;
    close(): void;
    activeChanged(newValue: any): void;
    private fireTabClose(evt);
    private fireTabChange();
}
