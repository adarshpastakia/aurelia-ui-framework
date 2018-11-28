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
  computedFrom,
  customElement,
  inlineView,
  PLATFORM,
  viewResources
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { BaseInput } from "./base-input";

@autoinject()
@customElement("ui-input")
@viewResources(PLATFORM.moduleName("./input-wrapper"))
@inlineView(`<template class="ui-input \${classes}" aria-disabled.bind="disabled || isDisabled" aria-readonly.bind="readonly">
  <input-wrapper>
    <slot></slot>
    <input ref="inputEl" role="textbox" size="1" placeholder.bind="placeholder" disabled.bind="disabled || isDisabled || isPlain"
      readonly.bind="readonly" value.two-way="value" type.one-time="type" autocomplete.bind="autocomplete"
      keypress.trigger="fireEnter($event)"/>
  </input-wrapper>
</template>`)
export class UIInput extends BaseInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: string = "";
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public number: number = null;

  @bindable()
  public type: "text" | "number" | "url" | "email" = "text";
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
      this.number = parseFloat(this.value);
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
      return `${this.maxlength - this.value.length}`;
    } else {
      return `${this.value.length}`;
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
