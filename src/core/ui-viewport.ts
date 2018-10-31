/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import {
  autoinject,
  bindable,
  containerless,
  customElement,
  inlineView,
  ViewSlot
} from "aurelia-framework";
import { AppRouter } from "aurelia-router";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-viewport")
export class UIViewport {
  private dialogContainer;
  private taskbarContainer;

  constructor(private appConfig: UIAppConfig, protected router: AppRouter) {
    window.addEventListener("resize", () => UIInternal.broadcast(UIInternal.EVT_VIEWPORT_RESIZE));
    document.addEventListener("mouseup", $event => this.broadcastEvent($event));
  }

  protected attached(): void {
    this.appConfig.DialogContainer = new ViewSlot(this.dialogContainer, true);
    this.appConfig.TaskbarContainer = new ViewSlot(this.taskbarContainer, true);

    this.appConfig.DialogContainer.attached();
    this.appConfig.TaskbarContainer.attached();
  }

  protected broadcastEvent($event: MouseEvent): void {
    if (!hasParent($event.target as HTMLElement, this.appConfig.FloatingContainer)) {
      UIInternal.broadcast(UIInternal.EVT_VIEWPORT_CLICK, $event.target);
    }
  }
}

@autoinject()
@containerless()
@customElement("ui-viewport-header")
@inlineView(
  `<template><header class="ui-viewport__header" slot="ui-viewport__header" ref="vmElement"><slot></slot></header></template>`
)
export class UIViewportHeader {}

@autoinject()
@containerless()
@customElement("ui-viewport-footer")
@inlineView(
  `<template><footer class="ui-viewport__footer" slot="ui-viewport__footer" ref="vmElement"><slot></slot></footer></template>`
)
export class UIViewportFooter {}

@autoinject()
@containerless()
@customElement("ui-router-view")
@inlineView(
  `<template><router-view class="ui-router-view" ref="vmElement"></router-view></template>`
)
export class UIRouterView {}

@autoinject()
@customElement("ui-divider")
@inlineView("<template class='ui-divider'></template>")
export class UIDivider {}

@autoinject()
@customElement("ui-filler")
@inlineView("<template class='ui-col ui-col--fill'></template>")
export class UIFiller {}

@autoinject()
@customElement("ui-loader")
@inlineView(`<template><div ref="vmElement" class="ui-loader" if.bind="busy">
  <div><ui-svg-icon icon="loader" class="ui-anim--spin"></ui-svg-icon></div>
</div></template>`)
export class UILoader {
  @bindable()
  public busy: boolean = false;
}
