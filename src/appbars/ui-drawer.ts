/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-drawer")
export class UIDrawer {
  @bindable()
  public align: string = "start";
  @bindable()
  public width: string = "24rem";
  @bindable()
  public maxWidth: string = "40vw";

  protected push: boolean = false;
  protected closeOnClick: boolean = false;

  private obClick;
  private isAttached = false;

  constructor(protected element: Element) {
    this.push = element.hasAttribute("push");
    this.closeOnClick =
      element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
    this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, target =>
      !this.closeOnClick && getParentByClass(target, "ui-drawer__body")
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

@autoinject()
@customElement("ui-drawer-toggle")
@inlineView(
  "<template class='ui-drawer__toggler' click.trigger='toggleOpen()'><slot><ui-svg-icon icon='menu'></ui-svg-icon></slot></template>"
)
export class UIDrawerToggle {
  @bindable() public drawer: HTMLElement;

  protected toggleOpen() {
    this.drawer.dataset.peek = `${!isTrue(this.drawer.dataset.peek)}`;
  }
}
