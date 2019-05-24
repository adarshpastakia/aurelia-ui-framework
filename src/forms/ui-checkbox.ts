/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import view from "./ui-checkbox.html";

@customElement("ui-checkbox")
@inlineView(view)
export class UICheckbox {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public checked: AnyObject;
  @bindable()
  public model: AnyObject;

  @bindable()
  public matcher: () => void;
  @bindable()
  public disabled: boolean = false;

  protected isDisabled: boolean = false;

  constructor(protected element: Element) {}

  public disable(b: boolean): void {
    this.isDisabled = b;
  }

  protected bind(): void {
    if (this.checked === "true") {
      this.checked = true;
    }
  }

  protected checkChanged($event: TextEvent) {
    $event.stopPropagation();
    this.element.dispatchEvent(UIInternal.createEvent("change", this));
  }
}
