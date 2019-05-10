/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, customElement, inlineView, observable, viewResources } from "aurelia-framework";
import { AsYouType, CountryCode, getExampleNumber } from "libphonenumber-js";
// tslint:disable-next-line:no-submodule-imports
import examples from "libphonenumber-js/examples.mobile.json";
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
      this.update(this.value);
      UIInternal.queueTask(() => (this.ignoreChange = false));
    }
  }

  protected countryChanged(): void {
    this.inputCountry = this.country;
    // @ts-ignore
    const examplePhone = getExampleNumber((this.country || "US") as CountryCode, examples);
    this.placeholder = !!this.country ? examplePhone.formatNational() : examplePhone.formatInternational();
  }

  protected inputValueChanged(): void {
    if (!this.ignoreChange) {
      this.ignoreChange = true;

      let val = `${this.inputValue}`;
      if (!this.country && val !== "" && !val.startsWith("+")) {
        val = `+${val}`;
      }
      this.update(val);
      UIInternal.queueTask(() => (this.ignoreChange = false));
    }
  }

  private update(value: string) {
    const newInput = new AsYouType(this.country as CountryCode);
    this.inputValue = newInput.input(value);
    this.inputCountry = this.country || newInput.country;
    if (newInput.getNumber()) {
      this.value = newInput.getNumber().number.toString();
    }
  }
}
