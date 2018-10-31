/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, computedFrom, customElement, inlineView } from "aurelia-framework";

@autoinject()
@customElement("ui-container")
@inlineView(`<template class='ui-container'><slot></slot></template>`)
export class UIContainer {
  constructor(protected element: Element) {
    if (element.hasAttribute("fluid")) {
      element.classList.add("ui-container--fluid");
    }
  }
}

@autoinject()
@customElement("ui-grid")
@inlineView(`<template class='ui-grid ui-grid--\${size}'><slot></slot></template>`)
export class UIGrid {
  @bindable()
  public size: string = "nm";

  constructor(protected element: Element) {}
}

@autoinject()
@customElement("ui-row")
@inlineView(`<template class.bind='classes'><slot></slot></template>`)
export class UIRow {
  @bindable()
  public halign: string = "";
  @bindable()
  public valign: string = "";

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

@autoinject()
@customElement("ui-col")
@inlineView(
  `<template class.bind='classes' css.bind="{ width, maxWidth, minWidth}"><slot></slot></template>`
)
export class UIColumn {
  @bindable()
  public size: string = "";
  @bindable()
  public width: string = "auto";
  @bindable()
  public maxWidth: string = "none";
  @bindable()
  public minWidth: string = "none";
  @bindable()
  public align: string = "";

  constructor(protected element: Element) {}

  get sizes(): string {
    return this.size
      .split(",")
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
