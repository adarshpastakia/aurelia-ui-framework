/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, computedFrom, customElement, inlineView } from "aurelia-framework";

@customElement("ui-row")
@inlineView(`<template class.bind='classes'><slot></slot></template>`)
export class UIRow {
  @bindable()
  public halign: "" | "start" | "center" | "end" | "spaced" | "even" = "";
  @bindable()
  public valign: "" | "top" | "middle" | "bottom" | "stretch" = "";

  constructor(protected element: Element) {
    if (element.hasAttribute("vertical") && element.hasAttribute("reverse")) {
      element.classList.add("ui-row--vertical--reverse");
    } else if (element.hasAttribute("vertical")) {
      element.classList.add("ui-row--vertical");
    } else if (element.hasAttribute("reverse")) {
      element.classList.add("ui-row--reverse");
    }
    if (element.hasAttribute("nowrap")) {
      element.classList.add("ui-row--nowrap");
    }
    if (element.hasAttribute("auto")) {
      element.classList.add("ui-row--auto");
    }
  }

  @computedFrom("halign", "valign")
  get classes(): string {
    const classes = ["ui-row"];
    if (this.halign) {
      classes.push(`ui-row--${this.halign}`);
    }
    if (this.valign) {
      classes.push(`ui-row--${this.valign}`);
    }

    return classes.join(" ");
  }
}
