/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import {
  autoinject,
  bindable,
  containerless,
  customElement,
  DOM,
  inlineView
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
// @containerless()
@customElement("ui-badge")
@inlineView(
  `<template><a href.bind="href" class="ui-badge ui-badge--\${style} ui-badge--\${size}" click.trigger="fireClick($event)" ref="vmElement">
    <div class="ui-badge__label"><slot></slot></div>
    <div class="ui-badge__icon"><slot name="avatar"><ui-icon if.bind="icon" icon.bind="icon"></ui-icon></slot></div>
    <div class="ui-badge__value">\${value}</div>
    <div class="ui-badge__close" if.bind="closeable" click.trigger="[$event.stopEvent(), close()]">&times;</div>
  </a></template>`
)
export class UIBadge {
  @bindable()
  public value: string = "";
  @bindable()
  public icon: string = "";
  @bindable()
  public href: string = "";
  @bindable()
  public size: string = "nm";

  private style: string = "normal";
  private closeable: boolean = false;

  constructor(protected element: Element) {
    if (element.hasAttribute("solid")) {
      this.style = "solid";
    }
    this.closeable = element.hasAttribute("closeable");
  }

  public close(): void {
    UIInternal.fireCallbackEvent(this, "beforeclose").then(b => (b ? this.remove() : undefined));
  }

  protected fireClick($event: MouseEvent): boolean {
    if (!this.href) {
      $event.stopEvent();
      return this.element.dispatchEvent(UIInternal.createEvent("click", this.value));
    }
  }

  private remove(): void {
    this.element.dispatchEvent(UIInternal.createEvent("close"));
    UIInternal.queueTask(() => DOM.removeNode(this.element));
  }
}
