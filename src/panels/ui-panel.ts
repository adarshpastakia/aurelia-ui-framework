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
  public label = "";
  @bindable()
  public icon = "";

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

  protected closable: boolean = false;
  protected collapsible: boolean = false;

  constructor(protected element: Element) {
    this.closable = element.hasAttribute("closable");
    this.collapsible = element.hasAttribute("collapsible");
  }

  public close(): void {
    UIInternal.fireCallbackEvent(this, "beforeclose").then(b => (b ? this.remove() : undefined));
  }

  protected toggleExpand(expand: boolean): void {
    this.collapsed = !expand;
  }

  private remove(): void {
    this.element.dispatchEvent(UIInternal.createEvent("close"));
    UIInternal.queueTask(() => DOM.removeNode(this.element));
  }
}

@autoinject()
@customElement("ui-panel-group")
@inlineView(`<template class="ui-panel__group"><slot></slot></template>`)
export class UIPanelGroup {
  // TODO: add toggle to create accordion style
}
