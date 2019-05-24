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
  `<template class="ui-btn__group" click.delegate="buttonClicked($event)" data-disabled.bind="isDisabled" data-size.bind="size"><slot></slot></template>`
)
export class UIButtonGroup {
  @bindable({ bindingMode: bindingMode.twoWay })
  public value: string = "";
  @bindable()
  public separator: string = "";

  @bindable()
  public size: "nm" | "sm" | "md" | "lg" = "nm";
  @bindable()
  public type: "default" | "solid" | "link" = "default";
  @bindable()
  public disabled: boolean = false;

  @child("ui-button[data-active='true']")
  private currentSelected: UIButton;
  @children("ui-button")
  private buttons: UIButton[];

  private readonly toggle: boolean = false;

  constructor(protected element: Element) {
    if (element.hasAttribute("equal")) {
      element.classList.add("ui-btn__group--equal");
    }
    if (element.hasAttribute("vertical")) {
      element.classList.add("ui-btn__group--vertical");
    }
    this.toggle = element.hasAttribute("toggle");
  }

  protected attached(): void {
    if (this.separator) {
      this.element.classList.add("ui-btn__group--with-separator");
    }
    if (this.toggle) {
      UIInternal.queueTask(() => this.valueChanged(this.value, ""));
    }
  }

  protected buttonsChanged(): void {
    this.buttons.forEach(b => {
      (b.element as HTMLElement).dataset.separator = this.separator;
      (b.element as HTMLElement).au.controller.viewModel.type = this.type;
    });
  }

  protected valueChanged(newValue, oldValue): void {
    if (this.buttons) {
      const btn = this.buttons.find(b => b.id === newValue);
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

  protected buttonClicked($event: CustomEvent): void {
    $event.stopEvent();
    if ($event.detail && this.toggle) {
      this.value = $event.detail;
    }
  }
}
