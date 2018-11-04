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
  customElement,
  DOM,
  inlineView
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-panel")
export class UIPanel {
  @bindable()
  public label: string = "";
  @bindable()
  public icon: string = "";

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public collapsed: boolean = false;

  @bindable()
  public width: string = "auto";
  @bindable()
  public minWidth: string = "16rem";
  @bindable()
  public maxWidth: string = "100vw";
  @bindable()
  public height: string = "auto";
  @bindable()
  public minHeight: string = "none";
  @bindable()
  public maxHeight: string = "100vh";

  @bindable()
  public beforeclose: () => Promise<boolean> | boolean;

  protected closeable: boolean = false;
  protected collapsible: boolean = false;

  constructor(protected element: Element) {
    this.closeable = element.hasAttribute("closeable");
    this.collapsible = element.hasAttribute("collapsible");
  }

  public close(): Promise<boolean> {
    return UIInternal.fireCallbackEvent(this, "beforeclose").then(
      b => (b ? this.remove() : false)
    );
  }

  protected toggleExpand(expand: boolean): void {
    this.collapsed = !expand;
  }

  private remove(): boolean {
    this.element.dispatchEvent(UIInternal.createEvent("close"));
    UIInternal.queueTask(() => DOM.removeNode(this.element));
    return true;
  }
}

@autoinject()
@customElement("ui-panel-group")
@inlineView(`<template class="ui-panel__group"><slot></slot></template>`)
export class UIPanelGroup {
  // TODO: add toggle to create accordion style
}
