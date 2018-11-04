/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import {
  autoinject,
  bindable,
  bindingMode,
  children,
  customElement,
  DOM,
  inlineView
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

let tabSeed = 0;

export interface UITabConfig {
  id: string;
  icon?: string;
  label?: string;
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

  constructor(protected element: Element) {
    if (element.hasAttribute("no-border")) {
      element.classList.add("ui-tab__panel--noborder");
    }
  }

  public activateTab(id: string): Promise<boolean> {
    return UIInternal.fireCallbackEvent(this, "beforechange").then(
      b => (b ? this.activate(id) : undefined)
    );
  }

  public closeTab(id: string): Promise<boolean> {
    return UIInternal.fireCallbackEvent(this, "beforeclose").then(
      b => (b ? this.remove(id) : false)
    );
  }

  protected innerTabsChanged(): void {
    this.tabs = this.innerTabs || this.tabs;
    this.tabsChanged();
  }

  protected tabsChanged(): void {
    this.tabs.forEach(tab => (this.active = tab.active ? tab.id : undefined));
    if (!this.active) {
      this.activeTab = this.tabs[0];
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
}

@autoinject()
@customElement("ui-tab")
@inlineView(`<template class="ui-tab" data-active.bind="active"><slot></slot></template>`)
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
  public href: string;
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
