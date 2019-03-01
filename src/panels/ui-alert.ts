/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, containerless, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import view from "./ui-alert.html";

@containerless()
@customElement("ui-alert")
@inlineView(view)
export class UIAlert {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public open = false;
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

  protected closeable: boolean = false;

  constructor(protected element: Element) {
    this.closeable = element.hasAttribute("closeable");
  }

  protected close(result: boolean): void {
    if (this.element.dispatchEvent(UIInternal.createEvent("close", result)) !== false) {
      this.open = false;
    }
  }
}
