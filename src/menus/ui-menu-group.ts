/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-menu-group")
@inlineView(
  `<template><fieldset class="ui-menu__group" data-collapsed.bind="collapsed" ref="vmElement">
    <legend class="ui-menu__group__label" if.bind="label" innerhtml.bind="label" click.trigger="collapsed = !collapsed"></legend>
    <div class="ui-menu__group__container"><slot></slot></div>
  </fieldset></template>`
)
export class UIMenuGroup {
  @bindable()
  public label: string = "";
  @bindable()
  public collapsed: boolean = false;

  private vmElement: Element;

  constructor(protected element: Element) {}

  protected attached(): void {
    if (this.element.hasAttribute("collapsible")) {
      this.vmElement.classList.add("ui-menu__group--collapsible");
    }
  }
}
