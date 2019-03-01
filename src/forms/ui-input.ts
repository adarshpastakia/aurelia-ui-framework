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
import { UIInternal } from "../utils/ui-internal";
import { BaseInput } from "./base-input";
import { InputWrapper } from "./input-wrapper";
import view from "./ui-input.html";

@customElement("ui-input")
@viewResources(InputWrapper)
@inlineView(view)
export class UIInput extends BaseInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: string = "";
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public number: number = null;

  @bindable()
  public type: "text" | "number" | "url" | "email" | "password" = "text";
  @bindable()
  public placeholder: string = "";
  @bindable()
  public autocomplete: string = "";

  @bindable()
  public maxlength: number = 0;
  @bindable()
  public errors: string | string[];

  @bindable()
  public readonly: string | boolean = false;
  @bindable()
  public disabled: string | boolean = false;

  private ignoreChange: boolean = false;

  constructor(element: Element) {
    super(element);
    if (element.hasAttribute("number") || element.hasAttribute("number.bind")) {
      this.type = "number";
    }
  }

  protected attached(): void {
    this.maxlengthChanged();
  }

  protected valueChanged(): void {
    if (!this.ignoreChange && this.type === "number") {
      this.ignoreChange = true;
      this.number = isNaN(this.value) ? null : parseFloat(this.value);
      UIInternal.queueTask(() => (this.ignoreChange = false));
    }
  }

  protected numberChanged(): void {
    if (!this.ignoreChange && this.type === "number") {
      this.ignoreChange = true;
      this.value = this.number.toString();
      UIInternal.queueTask(() => (this.ignoreChange = false));
    }
  }

  @computedFrom("value", "maxlength")
  get counter() {
    if (this.maxlength) {
      return `${this.maxlength - (this.value ? this.value.length : 0)}`;
    } else {
      return `${this.value ? this.value.length : 0}`;
    }
  }

  protected maxlengthChanged(): void {
    if (this.inputEl) {
      this.inputEl.removeAttribute("maxLength");
      if (this.maxlength > 0) {
        this.inputEl.maxLength = this.maxlength;
      }
    }
  }
}
