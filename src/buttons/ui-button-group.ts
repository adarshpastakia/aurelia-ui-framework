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
  child,
  children,
  customElement,
  inlineView
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { UIButton } from "./ui-button";

@autoinject()
@customElement("ui-button-group")
@inlineView(
  `<template class="ui-btn__group" click.delegate="buttonClicked($event)"><slot></slot></template>`
)
export class UIButtonGroup {
  @bindable({ bindingMode: bindingMode.twoWay })
  public value: string = "";

  @child("ui-button[data-active='true']")
  private currentSelected: UIButton;
  @children("ui-button")
  private buttons: UIButton[];

  private toggle: boolean = false;

  constructor(protected element: Element) {
    if (element.hasAttribute("equal")) {
      element.classList.add("ui-btn-group--equal");
    }
    if (element.hasAttribute("vertical")) {
      element.classList.add("ui-btn-group--vertical");
    }
    this.toggle = element.hasAttribute("toggle");
  }

  protected attached(): void {
    if (this.toggle) {
      UIInternal.queueTask(() => this.valueChanged(this.value, ""));
    }
  }

  protected valueChanged(newValue, oldValue): void {
    if (this.buttons) {
      const btn = this.buttons.find(b => b.value === newValue);
      if (btn) {
        if (this.currentSelected) {
          this.currentSelected.active = false;
        }
        (this.currentSelected = btn).active = true;
      } else {
        this.value = oldValue;
      }
    }
  }

  private buttonClicked($event: CustomEvent): void {
    $event.stopEvent();
    if ($event.detail && this.toggle) {
      this.value = $event.detail;
    }
  }
}
