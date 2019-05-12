/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView, ViewSlot } from "aurelia-framework";
import { AppRouter } from "aurelia-router";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIInternal } from "../utils/ui-internal";
import { UIRouterView } from "./ui-router-view";
import { UIViewportFooter } from "./ui-viewport-footer";
import { UIViewportHeader } from "./ui-viewport-header";
import view from "./ui-viewport.html";

@customElement("ui-viewport")
@inlineView(view)
class UIViewport {
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

export const Viewport = [UIViewport, UIViewportHeader, UIViewportFooter, UIRouterView];
