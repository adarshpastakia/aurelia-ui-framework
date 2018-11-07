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
import { BaseInput } from "./base-input";

@autoinject()
@customElement("ui-textarea")
@viewResources(PLATFORM.moduleName("./input-wrapper"))
@inlineView(`<template class="ui-input ui-input--textarea \${classes}" aria-disabled.bind="disabled || isDisabled" aria-readonly.bind="readonly">
  <input-wrapper>
    <slot></slot>
    <textarea class="ui-input__control" ref="inputEl" role="textbox" rows.bind="rows" placeholder.bind="placeholder"
      disabled.bind="disabled || isDisabled || isPlain" readonly.bind="readonly" value.two-way="value"></textarea>
  </input-wrapper>
</template>`)
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
      return `${this.value.length} of ${this.maxlength}`;
    } else {
      return `${this.value.length}`;
    }
  }
}
