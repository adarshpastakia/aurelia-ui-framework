/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { Subscription } from "aurelia-event-aggregator";
import { customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@customElement("ui-menubar")
@inlineView(`<template class="ui-menu__bar">
  <div class="ui-menu__bar__wrapper" ref="wrapperEl"><slot></slot></div>
  <ui-button type="tool" size="sm" no-caret class="ui-menu__overflow" ui-theme="secondary" show.bind="hasOverflow">
    <ui-svg-icon class="ui-btn__icon" icon="overflow"></ui-svg-icon>
    <ui-drop close-on-click="false"><ui-menu ref="overflowEl"></ui-menu></ui-drop>
  </ui-button>
</template>`)
export class UIMenubar {
  private wrapperEl: Element;
  private overflowEl: Element;

  private hasOverflow: boolean = false;
  private obResize: Subscription;

  constructor(protected element: Element) {
    this.obResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, t =>
      this.calculateOverflow()
    );
  }

  protected attached(): void {
    UIInternal.queueTask(() => this.calculateOverflow());
  }

  protected detached(): void {
    this.obResize.dispose();
  }

  protected calculateOverflow(): void {
    this.resetOverflow();
    const overflowItems = [];
    const isRtl = window.getComputedStyle(this.wrapperEl).direction === "rtl";
    // @ts-ignore
    [...this.wrapperEl.children].reverse().forEach(item => {
      if (
        (!isRtl && this.wrapperEl.offsetWidth - (item.offsetLeft + item.offsetWidth) <= 30) ||
        (isRtl && this.wrapperEl.offsetWidth - item.offsetLeft >= this.wrapperEl.offsetWidth - 30)
      ) {
        overflowItems.splice(0, 0, item);
        this.hasOverflow = true;
      }
    });
    this.overflowEl.append(...overflowItems);
  }

  protected resetOverflow(): void {
    this.hasOverflow = false;
    this.overflowEl.children.forEach(child => {
      this.wrapperEl.appendChild(child);
    });
  }
}
