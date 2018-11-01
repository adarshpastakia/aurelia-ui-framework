/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, bindingMode, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-radio")
export class UIRadio {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public checked: AnyObject;
  @bindable()
  public model: AnyObject;

  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public name: string = "optGroup";
  @bindable()
  public matcher: () => void;
  @bindable()
  public disabled: boolean = false;

  protected isDisabled: boolean = false;

  constructor(private element: Element) {}

  public disable(b: boolean): void {
    this.isDisabled = b;
  }

  private checkChanged($event: TextEvent) {
    $event.stopPropagation();
    this.element.dispatchEvent(UIInternal.createEvent("change", this));
  }
}
