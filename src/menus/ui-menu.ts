/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView, viewResources } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { MenuItem } from "./menu-item";
import { IMenuItems } from "./ui-menus";

@customElement("ui-menu")
@viewResources(MenuItem)
@inlineView(`<template class="ui-menu"><slot>
  <div if.bind="isLoading" ui-padding="xs" ui-align="center"><ui-svg-icon icon="busy" class="ui-anim--spin"></ui-svg-icon></div>
  <template if.bind="!isLoading && items && items.length">
    <menu-item repeat.for="item of items" item.bind="item" noitems-label.bind="noitemsLabel"></menu-item>
  </template>
  <template if.bind="!isLoading && items && items.length===0">
    <div ui-padding="xs" ui-color="muted" ui-font="sm" innerhtml.bind="noitemsLabel"></div>
  </template>
</slot></template>`)
export class UIMenu {
  @bindable()
  public menuItems: IMenuItems[] | (() => IMenuItems[]);

  @bindable()
  public noitemsLabel: string = "No Menu";

  protected items;
  protected isLoading = false;

  constructor(protected element: Element) {
  }

  protected attached(): void {
    this.loadMenuItems();

    UIInternal.queueTask(() => {
      const active = this.element.querySelector(".ui-menu__item__link[data-active='true']");
      if (active) {
        active.scrollIntoView({ block: "center", inline: "nearest" });
      }
    });
  }

  protected loadMenuItems() {
    if (isFunction(this.menuItems)) {
      this.isLoading = true;

      const ret = this.menuItems();
      if (ret instanceof Promise) {
        ret.then(items => {
          this.items = items;
          this.isLoading = false;
        });
      } else {
        this.items = ret;
        this.isLoading = false;
      }

    } else if (isArray(this.menuItems)) {
      this.items = this.menuItems;
    } else {
      this.items = undefined;
    }
  }
}
