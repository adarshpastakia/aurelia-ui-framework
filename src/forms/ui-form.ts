/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, containerless, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-form")
@inlineView(`<template><form ref="vmElement" role="form" aria-disabled.bind="disabled" class="ui-form"
   enterpressed.delegate="fireSubmit($event)"><slot></slot></form></template>`)
export class UIForm {
  @bindable()
  public disabled: boolean = false;

  protected fields: Element[] = [];

  private vmElement;

  constructor(private element: Element) {}

  protected attached(): void {
    UIInternal.queueTask(() => {
      const el: HTMLInputElement = this.vmElement.querySelector(
        "[autofocus] input, [autofocus] textarea"
      );
      if (el !== null) {
        el.focus();
      }
      this.fields = this.vmElement.querySelectorAll(
        "ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle"
      );
      this.disabledChanged();
    });
  }

  protected disabledChanged(): void {
    this.fields.forEach(el => el.au.controller.viewModel.disable(!!this.disabled));
  }

  protected fireSubmit(): void {
    this.element.dispatchEvent(UIInternal.createEvent("submit"));
  }
}
