/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-viewport-footer")
@inlineView(
  `<template><footer dir.bind="dir" class="ui-viewport__footer" slot="ui-viewport__footer" ref="vmElement"><slot></slot></footer></template>`
)
export class UIViewportFooter {
  @bindable()
  public dir = "ltr";
}
