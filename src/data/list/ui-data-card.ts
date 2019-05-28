/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, customElement, inlineView } from "aurelia-framework";
import { IMenuItems } from "../../menus/ui-menus";

@containerless()
@customElement("ui-data-card")
@inlineView(`<template><a class="ui-datalist__card" ref="vmElement" data-open.bind="open">
  <slot name="panel-header"></slot>
  <slot></slot>
  <div class="ui-datalist__toolbox">
    <slot name="card-actions"></slot>
    <ui-button-group vertical if.bind="actions">
      <ui-button type="tool" menu-items.bind="actions" no-caret>
        <ui-svg-icon icon="overflow"></ui-svg-icon>
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
  public actions: IMenuItems[];

  @bindable()
  public open: boolean = false;

  protected vmElement;
}
