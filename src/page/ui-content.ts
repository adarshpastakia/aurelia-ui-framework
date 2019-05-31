/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";
import ResizeObserver from "resize-observer-polyfill";
import { UIInternal } from "../utils/ui-internal";

@customElement("ui-content")
@inlineView(`<template class="ui-section__content" ref="vmElement"><slot></slot></template>`)
export class UIContent {
  private obResize: ResizeObserver;

  constructor(element: Element) {
    this.obResize = new ResizeObserver(() =>
      element.dispatchEvent(UIInternal.createEvent("resize", element.getBoundingClientRect())));
    this.obResize.observe(element);
  }

  protected detached() {
    this.obResize.disconnect();
  }
}
