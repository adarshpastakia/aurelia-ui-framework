/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Subscription } from "aurelia-event-aggregator";
import { autoinject, children, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-menubar")
@inlineView(`<template class="ui-menu__bar">
  <div class="ui-menu__bar__wrapper" ref="elWrapper"><slot></slot></div>
  <ui-button type="link" no-caret class="ui-menu__overflow" ui-theme="secondary">
    <ui-svg-icon class="ui-btn__icon" icon="overflow"></ui-svg-icon>
    <ui-dropdown><ui-menu ref="elOverflow"></ui-menu></ui-dropdown>
  </ui-button>
</template>`)
export class UIMenubar {
  protected elWrapper: Element;
  protected elOverflow: Element;

  protected obResize: Subscription;

  constructor(private element: Element) {
    this.obResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, t =>
      this.calculateOverflow()
    );
  }

  protected attached(): void {
    this.calculateOverflow();
  }

  protected detached(): void {
    this.obResize.dispose();
  }

  // TODO: add overflow functionality
  protected calculateOverflow(): void {
    const barWidth = this.element.offsetWidth - 50;
    this.resetOverflow();
    this.elWrapper.children.forEach(child => {
      const el = child.element || child;
      if (el.offsetLeft + el.offsetWidth >= barWidth) {
        this.elOverflow.appendChild(el);
      }
    });
  }

  protected resetOverflow(): void {
    this.elOverflow.children.forEach(child => {
      this.elWrapper.appendChild(child);
    });
  }
}
