/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-viewport-header")
@inlineView(
  `<template><header dir.bind="dir" class="ui-viewport__header" slot="ui-viewport__header" ref="vmElement"><slot></slot></header></template>`
)
export class UIViewportHeader {
  @bindable()
  public dir = "ltr";
}
