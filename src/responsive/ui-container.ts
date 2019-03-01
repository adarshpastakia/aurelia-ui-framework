/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-container")
@inlineView(`<template class='ui-container'><slot></slot></template>`)
export class UIContainer {
  constructor(protected element: Element) {
    if (element.hasAttribute("fluid")) {
      element.classList.add("ui-container--fluid");
    }
  }
}
