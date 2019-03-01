/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@customElement("ui-form")
@inlineView(`<template class="ui-block"><form ref="vmElement" role="form" aria-disabled.bind="disabled" class="ui-form"
   enterpressed.delegate="fireSubmit($event)" validation-renderer="ui-validator"><slot></slot></form></template>`)
export class UIForm {
  @bindable()
  public disabled: boolean = false;

  private vmElement;

  constructor(protected element: Element) {}

  protected attached(): void {
    UIInternal.queueTask(() => {
      const el: HTMLInputElement = this.vmElement.querySelector(
        "[autofocus] input, [autofocus] textarea"
      );
      if (el !== null) {
        el.focus();
      }
      this.disabledChanged();
    });
  }

  protected disabledChanged(): void {
    if (this.vmElement) {
      const fields = this.vmElement.querySelectorAll(
        "ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle,ui-select,ui-list,ui-date-input"
      );
      fields.forEach(el => el.au.controller.viewModel.disable(!!this.disabled));
    }
  }

  protected fireSubmit(): void {
    this.element.dispatchEvent(UIInternal.createEvent("submit"));
  }
}
