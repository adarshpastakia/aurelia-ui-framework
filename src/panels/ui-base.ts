/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, containerless, customElement, inlineView } from "aurelia-framework";

@autoinject()
@containerless()
@customElement("ui-header")
@inlineView(`<template><div class="ui-header" slot="panel-header" ref="vmElement">
  <div class="ui-drag-handle" ui-color="muted" if.bind="draggable"><ui-svg-icon icon="drag"></ui-svg-icon></div>
  <slot name="header-icon"><div class="ui-header__icon" if.bind="icon"><ui-icon icon.bind="icon"></ui-icon></div></slot>
  <slot name="header-title"><div class="ui-header__title" if.bind="label" innerhtml.bind="label"></div></slot>
  <slot></slot>
  </div></template>`)
export class UIHeader {
  @bindable()
  public label = "";
  @bindable()
  public icon = "";

  constructor(private element: Element) {}
}

@autoinject()
@containerless()
@customElement("ui-header-icon")
@inlineView(
  `<template><div ref="vmElement" slot="header-icon" class='ui-header__icon'><ui-icon icon.bind="icon"></ui-icon></div></template>`
)
export class UIHeaderIcon {
  @bindable()
  public icon: string = "";
  constructor(private element: Element) {}
}

@autoinject()
@containerless()
@customElement("ui-header-title")
@inlineView(
  `<template><div ref="vmElement" slot="header-title" class='ui-header__title'><slot></slot></div></template>`
)
export class UIHeaderTitle {
  constructor(private element: Element) {}
}

@autoinject()
@customElement("ui-header-actions")
@inlineView(`<template class="ui-header__actions"><slot></slot></template>`)
export class UIHeaderActions {
  constructor(private element: Element) {}
}

@autoinject()
@containerless()
@customElement("ui-footer")
@inlineView(
  `<template><div class="ui-footer" slot="panel-footer" ref="vmElement"><slot></slot></template>`
)
export class UIFooter {
  constructor(private element: Element) {}
}
