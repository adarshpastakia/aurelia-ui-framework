/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, bindingMode, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-checkbox")
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

  private checkChanged($event: TextEvent) {
    $event.stopPropagation();
    this.element.dispatchEvent(UIInternal.createEvent("change", this));
  }
}
