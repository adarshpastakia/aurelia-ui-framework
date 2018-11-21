/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, customElement } from "aurelia-framework";
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

  protected peek: boolean = false;
  protected closeOnClick: boolean = false;

  private obClick;

  constructor(protected element: Element) {
    this.closeOnClick = element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
    this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, target =>
      !this.closeOnClick && getParentByClass(target, "ui-drawer__body") ? undefined : (this.peek = false)
    );
  }

  protected detached(): void {
    if (this.obClick) {
      this.obClick.dispose();
    }
  }
}
