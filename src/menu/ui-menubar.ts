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
  <ui-button type="link" no-caret class="ui-menu__overflow" ui-theme="secondary" show.bind="hasOverflow">
    <ui-svg-icon class="ui-btn__icon" icon="overflow"></ui-svg-icon>
    <ui-drop><ui-menu ref="elOverflow"></ui-menu></ui-drop>
  </ui-button>
</template>`)
export class UIMenubar {
  protected elWrapper: Element;
  protected elOverflow: Element;

  protected hasOverflow: boolean = false;
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
    this.resetOverflow();
    this.elWrapper.children.forEach(item => {
      if (item.offsetLeft + item.offsetWidth + 50 >= this.elWrapper.offsetWidth) {
        this.elOverflow.appendChild(item);
        this.hasOverflow = true;
      }
    });
  }

  protected resetOverflow(): void {
    this.hasOverflow = false;
    this.elOverflow.children.forEach(child => {
      this.elWrapper.appendChild(child);
    });
  }
}
