/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";
import ResizeObserver from "resize-observer-polyfill";
import { UIInternal } from "../utils/ui-internal";

interface IBreadcrumbItem {
  icon?: string;
  href?: string;
  labels?: string;
}

@customElement("ui-breadcrumbs")
@inlineView(`<template class="ui-breadcrumbs">
  <div class="ui-breadcrumbs__overflow" show.bind="hasOverflow">
  <ui-button type="tool" size="xs" no-caret ui-theme="secondary">
    <ui-svg-icon class="ui-btn__icon" icon="ellipsis"></ui-svg-icon>
    <ui-drop close-on-click="false"><ui-menu ref="overflowEl"></ui-menu></ui-drop>
  </ui-button>
  </div>
  <div class="ui-breadcrumbs__wrapper" ref="wrapperEl">
  <template repeat.for="item of items">
    <template if.bind="item.href">
    <a class="ui-breadcrumbs__link" href.bind="item.href"><ui-icon if.bind="item.icon" icon.bind="item.icon"></ui-icon>\${item.label}</a>
    </template>
    <template else>
    <span class="ui-breadcrumbs__label"><ui-icon if.bind="item.icon" icon.bind="item.icon"></ui-icon>\${item.label}</span>
    </template>
  </template>
  </div>
</template>`)
export class UIBreadcrumbs {
  @bindable()
  public items: IBreadcrumbItem[] = [];

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
    this.resetOverflow();
    if (this.wrapperEl.offsetWidth > this.element.offsetWidth) {
      this.hasOverflow = true;
      while (this.wrapperEl.offsetWidth > this.element.offsetWidth - 50) {
        this.overflowEl.appendChild(this.wrapperEl.children[0]);
      }
    } else {
      this.hasOverflow = false;
    }
  }

  protected resetOverflow(): void {
    this.hasOverflow = false;
    // @ts-ignore
    [...this.overflowEl.children].reverse().forEach(child => {
      this.wrapperEl.insertBefore(child, this.wrapperEl.children[0]);
    });
  }
}
