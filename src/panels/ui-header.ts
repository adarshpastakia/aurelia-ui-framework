/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-header")
@inlineView(`<template><div class="ui-header" slot="panel-header" ref="vmElement">
  <div class="ui-drag-handle" ui-color="gray" if.bind="draggable"><ui-svg-icon icon="drag"></ui-svg-icon></div>
  <slot name="header-icon"><div class="ui-header__icon" if.bind="icon"><ui-icon icon.bind="icon"></ui-icon></div></slot>
  <slot name="header-title"><div class="ui-header__title" if.bind="label" innerhtml.bind="label"></div></slot>
  <slot></slot>
  </div></template>`)
export class UIHeader {
  @bindable()
  public label = "";
  @bindable()
  public icon = "";

  constructor(protected element: Element) {}
}
