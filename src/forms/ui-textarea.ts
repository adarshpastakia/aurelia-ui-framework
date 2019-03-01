/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import {
  bindable,
  bindingMode,
  computedFrom,
  customElement,
  inlineView,
  viewResources
} from "aurelia-framework";
import { BaseInput } from "./base-input";
import { InputWrapper } from "./input-wrapper";
import view from "./ui-textarea.html";

@customElement("ui-textarea")
@viewResources(InputWrapper)
@inlineView(view)
export class UITextarea extends BaseInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: string = "";
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public number: number = null;

  @bindable()
  public placeholder: string = "";

  @bindable()
  public rows: number = 4;
  @bindable()
  public maxlength: number = 0;
  @bindable()
  public errors: string | string[];

  @bindable()
  public readonly: string | boolean = false;
  @bindable()
  public disabled: string | boolean = false;

  constructor(element: Element) {
    super(element);
  }

  @computedFrom("value", "maxlength")
  get counter() {
    if (this.maxlength) {
      return `${this.value ? this.value.length : 0} of ${this.maxlength}`;
    } else {
      return `${this.value ? this.value.length : 0}`;
    }
  }
}
