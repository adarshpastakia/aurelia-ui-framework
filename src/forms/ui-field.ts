/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bindable, computedFrom, customElement, inlineView } from "aurelia-framework";

@customElement("ui-field")
@inlineView(`<template aria-required.bind="required" aria-disabled.bind="disabled" class="ui-field \${classes}" css.bind="{width}">
<label class="ui-field__label" role="text" click.trigger="focus()">\${label}</label>
<slot></slot>
</template>`)
export class UIField {
  @bindable()
  public label: string = "";
  @bindable()
  public plain: string | boolean = false;
  @bindable()
  public required: string | boolean = false;
  @bindable()
  public disabled: string | boolean = false;

  @bindable()
  public width: string = "auto";

  constructor(protected element: Element) {
    if (element.hasAttribute("nolabel")) {
      element.classList.add("ui-field--nolabel");
    }
    if (element.hasAttribute("inline")) {
      element.classList.add("ui-field--inline");
    }
  }

  public focus(): void {
    const el: HTMLInputElement = this.element.querySelector("input, textarea");
    if (el !== null) {
      el.focus();
    }
  }

  @computedFrom("plain", "required")
  get classes(): string {
    const classes = [];
    if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
      classes.push("ui-field--plain");
    }
    if (this.required === "" || this.required === "required" || isTrue(this.required)) {
      classes.push("ui-field--required");
    }
    return classes.join(" ");
  }
}
