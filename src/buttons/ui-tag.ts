/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bindable, containerless, customElement, DOM, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@containerless()
@customElement("ui-tag")
@inlineView(
  `<template><a class="ui-tag ui-tag--\${type} ui-tag--\${size}" click.delegate="fireClick($event)" ref="vmElement">
    <div class="ui-tag__label">\${label}</div>
    <div class="ui-tag__icon"><slot name="avatar"><ui-icon if.bind="icon" icon.bind="icon"></ui-icon></slot></div>
    <div class="ui-tag__value"><slot></slot></div>
    <div class="ui-tag__close" if.bind="closeable" click.trigger="[$event.stopEvent(), close()]">&times;</div>
  </a></template>`
)
export class UITag {
  @bindable()
  public id: string = "";
  @bindable()
  public label: string = "";
  @bindable()
  public icon: string = "";
  @bindable()
  public href: string = "";
  @bindable()
  public size: "nm" | "md" | "lg" = "nm";
  @bindable()
  public type: "normal" | "solid" = "normal";

  @bindable()
  public closeable: boolean = false;

  protected vmElement: HTMLAnchorElement;

  protected style: string = "normal";

  constructor(protected element: Element) {}

  public close(): void {
    UIInternal.fireCallbackEvent(this, "beforeclose", this.id).then(b =>
      b ? this.remove() : undefined
    );
  }

  protected bind() {
    this.hrefChanged();
    this.closeable = !isFalse(this.closeable);
  }

  protected hrefChanged(): void {
    if (this.vmElement) {
      if (this.href) {
        this.vmElement.href = this.href;
      } else if (this.vmElement.attributes.getNamedItem("href")) {
        this.vmElement.attributes.removeNamedItem("href");
      }
    }
  }

  protected fireClick($event: MouseEvent): boolean {
    if (!this.href) {
      $event.stopEvent();
      return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
    }
  }

  private remove(): void {
    this.element.dispatchEvent(UIInternal.createEvent("close", this.id));
    UIInternal.queueTask(() => DOM.removeNode(this.vmElement));
  }
}
