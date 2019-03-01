/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-header-icon")
@inlineView(
  `<template><div ref="vmElement" slot="header-icon" class='ui-header__icon'><slot><ui-icon icon.bind="icon"></ui-icon></slot></div></template>`
)
export class UIHeaderIcon {
  @bindable()
  public icon: string = "";
  constructor(protected element: Element) {}
}
