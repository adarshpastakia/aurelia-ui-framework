/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("ui-avatar")
@inlineView(`<template class="ui-avatar"><slot><ui-icon ui-font.bind="size" icon.bind="icon"></ui-icon></slot></template>`)
export class UIAvatar {
  @bindable()
  public icon: string = "";
  @bindable()
  public size: string = "nm";

  constructor(protected element: Element) {
    if (element.hasAttribute("round")) {
      element.classList.add("ui-avatar--round");
    }
    if (element.hasAttribute("flip-on-rtl")) {
      element.classList.add("flip-on-rtl");
    }
  }
}
