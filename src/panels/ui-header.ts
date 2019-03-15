/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@containerless()
@customElement("ui-header")
@inlineView(`<template><div class="ui-header" slot="panel-header" ref="vmElement">
  <div class="ui-drag-handle" ui-color="gray" if.bind="draggable"
    mousedown.trigger="fireDragEvent($event,'dragstart')" click.trigger="fireDragEvent($event,'dragend')"><ui-svg-icon icon="drag"></ui-svg-icon></div>
  <slot name="header-icon"><div class="ui-header__icon" if.bind="icon"><ui-icon icon.bind="icon"></ui-icon></div></slot>
  <slot name="header-title"><div class="ui-header__title" if.bind="label" innerhtml.bind="label"></div></slot>
  <slot name="header-actions"></slot>
  </div></template>`)
export class UIHeader {
  @bindable()
  public label = "";
  @bindable()
  public icon = "";
  @bindable()
  public draggable = false;

  constructor(protected element: Element) {}

  protected fireDragEvent($event: UIEvent, evt) {
    this.element.dispatchEvent(UIInternal.createEvent(evt));
    return true;
  }
}
