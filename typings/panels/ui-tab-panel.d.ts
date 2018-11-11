import { View } from "aurelia-framework";
export interface UITabConfig {
    id?: string;
    icon?: string;
    label?: string;
    tooltip?: string;
    active?: boolean;
    disabled?: boolean;
    closeable?: boolean;
    href?: string;
    view?: AnyObject;
    model?: AnyObject;
    element?: AnyObject;
    viewModel?: AnyObject;
}
export declare class UITabPanel {
    protected element: Element;
    tabs: UITabConfig[];
    active: string;
    beforechange: () => Promise<boolean> | boolean;
    protected innerTabs: UITabConfig[];
    protected activeTab: UITabConfig;
    private owningView;
    private composeVm;
    private wrapperEl;
    private overflowEl;
    private hasOverflow;
    private obResize;
    constructor(element: Element);
    activateTab(id: string): Promise<boolean>;
    closeTab(id: string): Promise<boolean>;
    protected created(owningView: View): void;
    protected attached(): void;
    protected detached(): void;
    protected innerTabsChanged(): void;
    protected tabsChanged(): void;
    protected activate(id: string): boolean;
    protected remove(id: string): boolean;
    protected calculateOverflow(): void;
    protected resetOverflow(): void;
}
export declare class UITab {
    protected element: Element;
    id: string;
    label: string;
    icon: string;
    active: boolean;
    disabled: boolean;
    view: AnyObject;
    model: AnyObject;
    viewModel: AnyObject;
    beforeclose: () => Promise<boolean> | boolean;
    protected closeable: boolean;
    constructor(element: Element);
}
export declare class UITabbarStart {
    protected element: Element;
    constructor(element: Element);
}
export declare class UITabbarEnd {
    protected element: Element;
    constructor(element: Element);
}
