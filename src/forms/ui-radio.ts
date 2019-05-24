/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import view from "./ui-radio.html";

@customElement("ui-radio")
@inlineView(view)
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

  constructor(protected element: Element) {}

  public disable(b: boolean): void {
    this.isDisabled = b;
  }

  protected checkChanged($event: TextEvent) {
    $event.stopPropagation();
    this.element.dispatchEvent(UIInternal.createEvent("change", this));
  }
}
