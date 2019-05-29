/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, customElement, inlineView } from "aurelia-framework";
import { IMenuItems } from "../../menus/ui-menus";
import { UIInternal } from "../../utils/ui-internal";

@containerless()
@customElement("ui-data-card")
@inlineView(`<template><a class="ui-datalist__card" ref="vmElement" data-open.bind="open" click.trigger="fireClick($event)">
  <slot name="panel-header"></slot>
  <slot></slot>
  <div class="ui-datalist__toolbox">
    <slot name="card-actions"></slot>
    <ui-button-group vertical if.bind="actions">
      <ui-button type="tool" no-caret>
        <ui-svg-icon icon="overflow"></ui-svg-icon>
        <ui-drop anchor="br" position="tr">
          <ui-menu menu-items.bind="actions"></ui-menu>
        </ui-drop>
      </ui-button>
      <ui-button type="tool" click.trigger="open = !open">
        <ui-svg-icon icon="caret"></ui-svg-icon>
      </ui-button>
    </ui-button-group>
  </div>
  <slot name="panel-footer"></slot>
</a></template>`)
export class UIDataCard {
  @bindable()
  public href: string;
  @bindable()
  public actions: IMenuItems[];

  @bindable()
  public open: boolean = false;

  protected vmElement;

  constructor(private element: Element) {
  }

  protected attached() {
    this.hrefChanged();
  }

  protected hrefChanged(): void {
    if (this.vmElement) {
      if (this.href) {
        this.vmElement.href = this.href;
      } else if (this.element.hasAttribute("click.trigger")) {
        this.vmElement.href = "javascript:;";
      } else if (this.vmElement.attributes.getNamedItem("href")) {
        this.vmElement.attributes.removeNamedItem("href");
      }
    }
  }

  protected fireClick($event: MouseEvent): boolean {
    if (hasParent($event.target, "ui-datalist__toolbox", "ui-datalist__card")) {
      $event.stopEvent();
      return false;
    }
    if (!this.href) {
      return this.element.dispatchEvent(UIInternal.createEvent("click"));
    }
  }
}
