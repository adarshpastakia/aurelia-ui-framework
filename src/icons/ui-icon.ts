/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("ui-icon")
@inlineView(`<template ui-font.bind="size" class="ui-icon \${icon}"><slot></slot></template>`)
export class UIIcon {
  @bindable()
  public icon: string = "";
  @bindable()
  public size: string = "nm";

  constructor(protected element: Element) {
    if (element.hasAttribute("round")) {
      element.classList.add("ui-icon--round");
    }
    if (element.hasAttribute("flip-on-rtl")) {
      element.classList.add("flip-on-rtl");
    }
  }
}
