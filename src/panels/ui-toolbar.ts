/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-toolbar")
@inlineView(`<template class="ui-toolbar"><slot></slot></template>`)
export class UIToolbar {
  constructor(protected element: Element) {
    if (element.hasAttribute("align-end")) {
      element.classList.add("ui-row--end");
    }
  }
}
