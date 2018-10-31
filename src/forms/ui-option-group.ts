/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import {
  autoinject,
  bindable,
  bindingMode,
  children,
  customElement,
  inlineView
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { UICheckbox } from "./ui-checkbox";
import { UIRadio } from "./ui-radio";
import { UIToggle } from "./ui-toggle";

@autoinject()
@customElement("ui-option-group")
@inlineView(
  `<template class="ui-option__group \${disabled ? 'ui-option--disabled' : ''}" change.trigger="checkChanged($event)"><slot></slot></template>`
)
export class UIOptionGroup {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: AnyObject = false;

  @bindable()
  public name: string = "optGroup";
  @bindable()
  public matcher: () => void;
  @bindable()
  public disabled: boolean = false;

  @children("ui-radio, ui-checkbox, ui-toggle")
  private options: Array<UIRadio | UICheckbox | UIToggle> = [];

  protected optionsChanged(): void {
    if (this.options !== null) {
      this.options.forEach(element => {
        if (element instanceof UIRadio) {
          element.name = this.name;
        }
        element.matcher = this.matcher;
      });
      this.valueChanged();
    }
  }

  private checkChanged($event) {
    if (this.value !== false) {
      UIInternal.queueTask(() => {
        this.value = $event.detail.checked;
      });
    }
  }

  private valueChanged() {
    if (this.options && this.value !== false) {
      UIInternal.queueTask(() => {
        this.options.forEach(element => (element.checked = this.value));
      });
    }
  }
}
