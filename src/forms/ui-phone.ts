/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import {
  autoinject,
  bindable,
  bindingMode,
  customElement,
  inlineView,
  observable,
  PLATFORM,
  viewResources
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { BaseInput } from "./base-input";

@autoinject()
@customElement("ui-phone")
@viewResources(PLATFORM.moduleName("./input-wrapper"))
@inlineView(`<template class="ui-input ui-phone \${classes}" aria-disabled.bind="disabled || isDisabled" aria-readonly.bind="readonly">
  <input-wrapper>
    <slot></slot>
    <ui-flag code.bind="inputCountry"></ui-flag>
    <input ref="inputEl" role="textbox" size="1" placeholder.bind="placeholder" disabled.bind="disabled || isDisabled || isPlain"
      readonly.bind="readonly" value.two-way="inputValue" type.one-time="type" autocomplete.bind="autocomplete"
      keypress.trigger="fireEnter($event)"/>
  </input-wrapper>
</template>`)
export class UIInput extends BaseInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: string = "";

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
      this.country || "ae",
      PhoneLib.TYPE.FIXED_LINE_OR_MOBILE,
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
      this.inputCountry = PhoneLib.getIso2Code(val, this.country);
      this.value = PhoneLib.format(val, this.country, PhoneLib.FORMAT.FULL);
      UIInternal.queueTask(() => (this.ignoreChange = false));
    }
  }
}
