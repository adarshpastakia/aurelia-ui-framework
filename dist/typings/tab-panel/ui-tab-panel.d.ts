import { View } from "aurelia-framework";
import { UITab } from "./ui-tab";
import { UITabbarEnd } from "./ui-tab-end";
import { UITabbarStart } from "./ui-tab-start";
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
declare class UITabPanel {
    protected element: Element;
    tabs: UITabConfig[];
    active: string;
    align: "top" | "bottom";
    beforechange: () => Promise<boolean> | boolean;
    beforeclose: () => Promise<boolean> | boolean;
    protected innerTabs: UITabConfig[];
    protected activeTab: UITabConfig;
    private owningView;
    private composeVm;
    private wrapperEl;
    private overflowEl;
    private hasOverflow;
    private obResize;
    private isAttached;
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
export declare const TabPanel: (typeof UITab | typeof UITabbarEnd | typeof UITabbarStart | typeof UITabPanel)[];
export {};
