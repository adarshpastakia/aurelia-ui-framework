/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, computedFrom, customElement, inlineView } from "aurelia-framework";

@customElement("ui-field-wrapper")
@inlineView(`<template class="ui-field__wrapper \${classes}">
  <slot></slot>
  </template>`)
export class UIFieldWrapper {
  @bindable()
  public plain: string | boolean = false;

  @computedFrom("plain")
  get classes(): string {
    const classes = [];
    if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
      classes.push("ui-field__wrapper--plain");
    }
    return classes.join(" ");
  }
}
