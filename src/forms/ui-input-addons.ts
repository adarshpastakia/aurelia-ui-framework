/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, customElement, inlineView } from "aurelia-framework";
import { BaseInput } from "./base-input";

@autoinject()
@customElement("ui-input-addon")
@inlineView(
  `<template class="ui-input__addon" click.trigger="focusInput() & debounce:10" css.bind="{width}"><slot></slot></template>`
)
export class UIInputAddon {
  @bindable()
  protected width: string = "auto";

  constructor(private element: Element) {
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

@autoinject()
@customElement("ui-input-info")
@inlineView(`<template class="ui-input__info"><slot></slot></template>`)
export class UIInputInfo {
  constructor(protected element: Element) {}
}
