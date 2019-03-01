/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("ui-flag")
@inlineView(`<template ui-font.bind="size" class="ui-flag \${code}"></template>`)
export class UIFlag {
  @bindable()
  public code: string = "";
  @bindable()
  public size: string = "nm";

  constructor(protected element: Element) {
    if (element.hasAttribute("round")) {
      element.classList.add("ui-icon--round");
    }
  }
}
