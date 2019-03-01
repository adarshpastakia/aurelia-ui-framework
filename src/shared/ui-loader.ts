/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("ui-loader")
@inlineView(`<template><div ref="vmElement" class="ui-loader" if.bind="busy">
  <div><ui-svg-icon icon="loader" class="ui-anim--spin"></ui-svg-icon></div>
</div></template>`)
export class UILoader {
  @bindable()
  public busy: boolean = false;
}
