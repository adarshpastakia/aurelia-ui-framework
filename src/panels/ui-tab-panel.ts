/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Subscription } from "aurelia-event-aggregator";
import {
  autoinject,
  bindable,
  bindingMode,
  children,
  containerless,
  customElement,
  DOM,
  inlineView,
  View
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

let tabSeed = 0;

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
@autoinject()
@customElement("ui-tab-panel")
export class UITabPanel {
  @bindable()
  public tabs: UITabConfig[] = [];
  @bindable({ bindingMode: bindingMode.twoWay })
  public active: string;

  @bindable()
  public beforechange: () => Promise<boolean> | boolean;

  @children("ui-tab")
  protected innerTabs: UITabConfig[];

  @bindable({ bindingMode: bindingMode.toView })
  protected activeTab: UITabConfig;

  private owningView: AnyObject;
  private composeVm: AnyObject;

  private wrapperEl: Element;
  private overflowEl: Element;

  private hasOverflow: boolean = false;
  private obResize: Subscription;

  constructor(protected element: Element) {
    if (element.hasAttribute("no-border")) {
      element.classList.add("ui-tab__panel--noborder");
    }
    this.obResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, t =>
      this.calculateOverflow()
    );
  }

  public async activateTab(id: string): Promise<boolean> {
    const tab = this.tabs.find(t => t.id === id);

    let result = true;
    if (this.composeVm.currentViewModel) {
      result = await UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate");
    }
    if (result) {
      return UIInternal.fireCallbackEvent(this, "beforechange", {
        activeTab: this.activeTab.id,
        activeViewModel: this.composeVm.currentViewModel,
        newTab: id
      }).then(b => (b ? this.activate(id) : undefined));
    } else {
      return Promise.resolve(false);
    }
  }

  public async closeTab(id: string): Promise<boolean> {
    const tab = this.tabs.find(t => t.id === id);

    let result = true;
    if (this.activeTab.id === id && this.composeVm.currentViewModel) {
      result = await UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate");
    }
    if (result) {
      return UIInternal.fireCallbackEvent(this, "beforeclose", {
        activaTab: tab.id
      }).then(b => (b ? this.remove(id) : false));
    } else {
      return Promise.resolve(false);
    }
  }

  // Set current owningView
  protected created(owningView: View) {
    this.owningView = owningView;
  }

  // Update compose owningView and viewResource to current owningView
  protected attached(): void {
    this.composeVm.owningView = this.owningView;
    this.composeVm.viewResources = this.owningView.resources;
    setTimeout(() => this.calculateOverflow(), 200);
  }

  protected detached(): void {
    this.obResize.dispose();
  }

  protected innerTabsChanged(): void {
    this.tabs = this.innerTabs || this.tabs;
    this.tabsChanged();
  }

  protected tabsChanged(): void {
    this.active = (this.tabs.find(tab => tab.active) || {}).id;
    if (!this.active) {
      this.activeTab = this.tabs.find(tab => !tab.disabled) || {};
      this.active = this.activeTab.id;
      this.activeTab.active = true;
    }
  }

  protected activate(id: string): boolean {
    const newTab = this.tabs.find(tab => tab.id === id);
    if (newTab) {
      this.element.dispatchEvent(UIInternal.createEvent("change", { tab: newTab }));

      if (this.activeTab) {
        this.activeTab.active = false;
      }
      this.activeTab = newTab;
      this.active = this.activeTab.id;
      this.activeTab.active = true;
      return true;
    }
    return false;
  }

  protected remove(id: string): boolean {
    const tab = this.tabs.find(t => t.id === id);
    this.element.dispatchEvent(UIInternal.createEvent("close", { tab }));
    this.tabs.splice(this.tabs.indexOf(tab), 1);
    if (tab.element) {
      UIInternal.queueTask(() => DOM.removeNode(tab.element));
    }
    return true;
  }

  protected calculateOverflow(): void {
    this.resetOverflow();
    const overflowItems = [];
    const isRtl = window.getComputedStyle(this.wrapperEl).direction === "rtl";
    // @ts-ignore
    [...this.wrapperEl.children].reverse().forEach(item => {
      if (
        (!isRtl && this.wrapperEl.offsetWidth - (item.offsetLeft + item.offsetWidth) <= 30) ||
        (isRtl && this.wrapperEl.offsetWidth - item.offsetLeft >= this.wrapperEl.offsetWidth - 30)
      ) {
        overflowItems.splice(0, 0, item);
        this.hasOverflow = true;
      }
    });
    this.overflowEl.append(...overflowItems);
  }

  protected resetOverflow(): void {
    this.hasOverflow = false;
    this.overflowEl.children.forEach(child => {
      this.wrapperEl.appendChild(child);
    });
  }
}

@autoinject()
@customElement("ui-tab")
@inlineView(
  `<template class="ui-tab" data-active.bind="active" data-hide.bind="!!view || !!viewModel"><slot></slot></template>`
)
export class UITab {
  @bindable()
  public id: string = "";
  @bindable()
  public label: string = "";
  @bindable()
  public icon: string = "";
  @bindable()
  public active: boolean = false;
  @bindable()
  public disabled: boolean = false;

  @bindable()
  public view: AnyObject;
  @bindable()
  public model: AnyObject;
  @bindable()
  public viewModel: AnyObject;

  @bindable()
  public beforeclose: () => Promise<boolean> | boolean;

  protected closeable: boolean = false;

  constructor(public element: Element) {
    this.id = `tab__${tabSeed++}`;
    this.closeable = element.hasAttribute("closeable");
  }
}

@autoinject()
@containerless()
@customElement("ui-tabbar-start")
@inlineView(`<template><div slot="tabbar-start"><slot></slot></div></template>`)
export class UITabbarStart {
  constructor(public element: Element) {}
}

@autoinject()
@containerless()
@customElement("ui-tabbar-end")
@inlineView(`<template><div slot="tabbar-end"><slot></slot></div></template>`)
export class UITabbarEnd {
  constructor(public element: Element) {}
}
