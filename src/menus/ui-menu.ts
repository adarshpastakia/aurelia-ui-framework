/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { autoinject, customElement, inlineView } from "aurelia-framework";

@autoinject()
@customElement("ui-menu")
@inlineView(`<template class="ui-menu"><slot></slot></template>`)
export class UIMenu {
  constructor(protected element: Element) {}

  protected attached(): void {
    const active = this.element.querySelector(".ui-menu__item__link[data-active='true']");
    if (active) {
      active.scrollIntoView({ block: "center", inline: "nearest" });
    }
  }
}
