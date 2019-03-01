/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, computedFrom, customElement, inlineView } from "aurelia-framework";

@customElement("ui-col")
@inlineView(
  `<template class.bind='classes' css.bind="{ width, maxWidth, minWidth}"><slot></slot></template>`
)
export class UICol {
  @bindable()
  public size: "auto" | "fill" | string = "";
  @bindable()
  public width: string = "unset";
  @bindable()
  public maxWidth: string = "unset";
  @bindable()
  public minWidth: string = "unset";
  @bindable()
  public align: "" | "top" | "middle" | "bottom" | "stretch" = "";

  constructor(protected element: Element) {
    if (element.hasAttribute("content-stretch")) {
      element.classList.add("content-stretch");
    }
  }

  get sizes(): string {
    return this.size
      .split(" ")
      .map(s => `ui-col--${s.trim()}`)
      .join(" ");
  }

  @computedFrom("align", "size")
  get classes(): string {
    const classes = ["ui-col"];
    if (this.align) {
      classes.push(`ui-col--${this.align}`);
    }
    if (this.size) {
      classes.push(this.sizes);
    }

    return classes.join(" ");
  }
}
