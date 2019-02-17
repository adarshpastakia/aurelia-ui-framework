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
  viewResources
} from "aurelia-framework";
import { UIDate } from "./../calendar/ui-date";
import { BaseInput } from "./base-input";
import { InputWrapper } from "./input-wrapper";

@autoinject()
@customElement("ui-date-input")
@viewResources(InputWrapper, UIDate)
@inlineView(`<template class="ui-input \${classes}" aria-disabled.bind="disabled || isDisabled" aria-readonly.bind="readonly">
  <input-wrapper>
    <slot></slot>
    <input ref="inputEl" role="textbox" size="1" placeholder.bind="placeholder" disabled.bind="disabled || isDisabled || isPlain"
      readonly.one-time="true" value.one-way="date | datetime" 
      focus.trigger="toggleDrop(true)" blur.trigger="canToggleDrop($event)"
      keypress.trigger="fireEnter($event)"/>
  </input-wrapper>
  <ui-drop view-model.ref="dropEl" class="ui-scroll--no">
    <ui-date date.bind="date" min-date.bind="minDate" max-date.bind="maxDate"
      disabled-days.bind="disabledDays" disabled-dates.bind="disabledDates"></ui-date>
  </ui-drop>
</template>`)
export class UIDateInput extends BaseInput {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public date: Date | string = new Date();

  @bindable()
  public minDate: string;
  @bindable()
  public maxDate: string;
  @bindable()
  public disabledDays: number[];
  @bindable()
  public disabledDates: (({ date }) => boolean) | string[];

  @bindable()
  public placeholder: string = "";

  @bindable()
  public errors: string | string[];

  @bindable()
  public readonly: string | boolean = false;
  @bindable()
  public disabled: string | boolean = false;

  constructor(element: Element) {
    super(element);
    this.dropHandle = "calendar";
  }

  protected attached(): void {
    this.dropEl.attachToViewport = isTrue(this.element.getAttribute("attach-to-viewport"));
    this.dropEl.closeOnClick = false;
    this.dropEl.stretch = false;
    this.dropEl.tether(this.element);
  }
}
