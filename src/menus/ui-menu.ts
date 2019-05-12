/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView, viewResources } from "aurelia-framework";
import { MenuItem } from "./menu-item";
import { IMenuItems } from "./ui-menus";

@customElement("ui-menu")
@viewResources(MenuItem)
@inlineView(`<template class="ui-menu"><slot>
  <template if.bind="menuItems">
    <menu-item repeat.for="item of menuItems" item.bind="item"></menu-item>
  </template>
</slot></template>`)
export class UIMenu {
  @bindable()
  public menuItems: IMenuItems[];

  constructor(protected element: Element) {}

  protected attached(): void {
    const active = this.element.querySelector(".ui-menu__item__link[data-active='true']");
    if (active) {
      active.scrollIntoView({ block: "center", inline: "nearest" });
    }
  }
}
