/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import {
  bindable,
  bindingMode,
  customElement,
  inlineView,
  observable,
  viewResources
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { BaseInput } from "./base-input";
import { InputWrapper } from "./input-wrapper";
import view from "./ui-phone.html";

@customElement("ui-phone")
@viewResources(InputWrapper)
@inlineView(view)
export class UIPhone extends BaseInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: string = "";

  @bindable()
  public type: "mobile" | "fixed" | "any" = "any";
  @bindable()
  public country: string = "";

  @bindable()
  public errors: string | string[];

  @bindable()
  public readonly: string | boolean = false;
  @bindable()
  public disabled: string | boolean = false;

  @observable()
  protected inputValue = "";

  protected inputCountry = "";
  protected placeholder = "";

  private ignoreChange: boolean = false;

  constructor(element: Element) {
    super(element);
    this.showCounter = false;
  }

  protected attached(): void {
    this.countryChanged();
  }

  protected valueChanged(): void {
    if (!this.ignoreChange) {
      this.ignoreChange = true;
      this.inputValue = PhoneLib.formatInput(this.value, this.country);
      UIInternal.queueTask(() => (this.ignoreChange = false));
    }
  }

  protected countryChanged(): void {
    this.inputCountry = this.country;
    this.placeholder = PhoneLib.getExample(
      this.country || "us",
      this.type === "mobile" ? PhoneLib.TYPE.MOBILE : PhoneLib.TYPE.FIXED_LINE_OR_MOBILE,
      !!this.country
    );
  }

  protected inputValueChanged(): void {
    if (!this.ignoreChange) {
      this.ignoreChange = true;

      let val = `${this.inputValue}`;
      if (!this.country && val !== "" && !val.startsWith("+")) {
        val = `+${val}`;
      }
      this.inputValue = PhoneLib.formatInput(val, this.country);
      this.inputCountry = this.country || PhoneLib.getIso2Code(val, this.country);
      this.value = PhoneLib.format(val, this.country, PhoneLib.FORMAT.FULL);
      UIInternal.queueTask(() => (this.ignoreChange = false));
    }
  }
}
