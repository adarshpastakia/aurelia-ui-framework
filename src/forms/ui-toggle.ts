/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, bindingMode, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-toggle")
@inlineView(
  `<template class="ui-option" data-disabled.bind="disabled || isDisabled"><label class="ui-option__control">
    <input size="1" type="checkbox" checked.bind="checked" model.bind="model" matcher.bind="matcher" disabled.bind="disabled" change.trigger="checkChanged($event)" />
    <div class="ui-option__toggle"></div>
    <span><slot></slot></span>
  </label></template>`
)
export class UIToggle {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public checked: AnyObject;
  @bindable()
  public model: AnyObject;

  @bindable()
  public matcher: () => void;
  @bindable()
  public disabled: boolean = false;

  protected isDisabled: boolean = false;

  constructor(private element: Element) {}

  public disable(b: boolean): void {
    this.isDisabled = b;
  }

  protected bind(): void {
    if (isTrue(this.checked)) {
      this.checked = true;
    }
  }

  private checkChanged($event: TextEvent) {
    $event.stopPropagation();
    this.element.dispatchEvent(UIInternal.createEvent("change", this));
  }
}
