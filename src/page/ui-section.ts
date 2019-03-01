/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-section")
@inlineView(
  `<template class="ui-section au-animate animate-slide-in-right animate-slide-out-left" role="main"><slot></slot></template>`
)
export class UISection {
  constructor(element: Element) {
    if (element.hasAttribute("centered")) {
      element.classList.add("ui-section--centered");
    }
  }
}
