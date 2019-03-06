/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, computedFrom, customElement, inlineView } from "aurelia-framework";

@customElement("ui-password-meter")
@inlineView(
  `<template class="ui-password-meter" css.bind="strength" ui-tooltip.bind="tooltip"></template>`
)
export class UIPasswordMeter {
  @bindable()
  public score: number = 0;
  @bindable()
  public hasPassword: boolean = false;
  @bindable()
  public tooltip: string = "";

  @bindable()
  public maxStrength: number = 4;

  @computedFrom("score", "maxStrength", "hasPassword")
  get strength() {
    if (this.hasPassword) {
      const s = (this.score / this.maxStrength) * 100;
      return { "--password-strength": `${s || 5}%` };
    }
    return { "--password-strength": 0 };
  }
}
