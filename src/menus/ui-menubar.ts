/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";
import ResizeObserver from "resize-observer-polyfill";
import { calculateOverflow } from "../utils/ui-common";
import { UIInternal } from "../utils/ui-internal";

@customElement("ui-menubar")
@inlineView(`<template class="ui-menu__bar">
  <div class="ui-menu__bar__wrapper" ref="wrapperEl"><slot></slot></div>
  <ui-button type="tool" size="xs" no-caret class="ui-menu__overflow" ui-theme="secondary" show.bind="hasOverflow">
    <ui-svg-icon class="ui-btn__icon" icon="overflow"></ui-svg-icon>
    <ui-drop close-on-click="false"><ui-menu ref="overflowEl"></ui-menu></ui-drop>
  </ui-button>
</template>`)
export class UIMenubar {
  private wrapperEl: Element;
  private overflowEl: Element;

  private hasOverflow: boolean = false;
  private obResize: ResizeObserver;

  constructor(protected element: Element) {
    this.obResize = new ResizeObserver(() => this.calculateOverflow());
    this.obResize.observe(element);
  }

  protected attached(): void {
    UIInternal.queueTask(() => this.calculateOverflow());
  }

  protected detached(): void {
    this.obResize.disconnect();
  }

  protected calculateOverflow(): void {
    this.hasOverflow = calculateOverflow(this.wrapperEl, this.overflowEl);
  }
}
