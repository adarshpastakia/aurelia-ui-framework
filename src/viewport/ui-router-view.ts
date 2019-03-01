/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-router-view")
@inlineView(
  `<template><router-view swap-order="with" name.bind="name" class="ui-router-view" ref="vmElement"></router-view></template>`
)
export class UIRouterView {
  @bindable() public name: string = "";
}
