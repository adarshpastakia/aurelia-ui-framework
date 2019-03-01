/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";
import { BaseInput } from "./base-input";

@customElement("ui-input-addon")
@inlineView(
  `<template class="ui-input__addon" click.trigger="focusInput() & debounce:10" css.bind="{width}"><slot><ui-icon icon.bind="icon"></ui-icon></slot></template>`
)
export class UIInputAddon {
  @bindable()
  protected width: string = "auto";
  @bindable()
  protected icon: string = "";

  constructor(protected element: Element) {
    if (element.hasAttribute("align-end")) {
      element.classList.add("ui-input__addon--end");
    }
  }

  protected focusInput() {
    try {
      let el = this.element;
      if (getViewModel(el.nextElementSibling) instanceof UIInputAddon) {
        el = el.nextElementSibling;
      }
      const vm = getViewModel(el.nextElementSibling);
      if (vm instanceof BaseInput) {
        vm.focus();
      } else if (el.nextElementSibling instanceof HTMLInputElement) {
        el.nextElementSibling.focus();
      }
    } catch (e) {
      //
    }
  }
}
