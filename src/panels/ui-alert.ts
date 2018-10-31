/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, containerless, customElement, DOM } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-alert")
export class UIAlert {
  @bindable()
  public icon = "";
  @bindable()
  public alertTitle = "";
  @bindable()
  public okLabel = "OK";
  @bindable()
  public cancelLabel = "Cancel";
  @bindable()
  public type: "alert" | "confirm" = "alert";

  constructor(private element: Element) {}

  protected close(result: boolean): void {
    if (this.element.dispatchEvent(UIInternal.createEvent("close", result)) !== false) {
      this.element.classList.remove("ui-alert--show");
      setTimeout(() => {
        DOM.removeNode(this.element);
      }, 500);
    }
  }
}
