/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@customElement("ui-drawer")
@inlineView(`<template class="ui-drawer" data-push.bind="push" data-align.bind="align">
<div class="ui-drawer__shim"></div>
<div class="ui-drawer__body" css.bind="{width, maxWidth}">
  <slot></slot>
</div>
</template>
`)
export class UIDrawer {
  @bindable()
  public align: string = "start";
  @bindable()
  public width: string = "24rem";
  @bindable()
  public maxWidth: string = "40vw";

  protected push: boolean = false;
  protected closeOnClick: boolean = false;

  private readonly obClick;
  private isAttached = false;

  constructor(protected element: Element) {
    this.push = element.hasAttribute("push");
    this.closeOnClick =
      element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));

    this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, target =>
      !this.closeOnClick && hasParent(target, "ui-drawer__body", "ui-drawer")
        ? undefined
        : ((element as HTMLElement).dataset.peek = "false")
    );
  }

  protected attached() {
    UIInternal.queueTask(() =>
      (this.element.nextElementSibling as HTMLElement).style.setProperty(
        "--drawer-width",
        this.width
      )
    );
    this.isAttached = true;
  }

  protected detached(): void {
    if (this.obClick) {
      this.obClick.dispose();
    }
  }

  protected widthChanged(): void {
    if (this.isAttached) {
      (this.element.nextElementSibling as HTMLElement).style.setProperty(
        "--drawer-width",
        this.width
      );
    }
  }
}
