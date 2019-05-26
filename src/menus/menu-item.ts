/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, containerless, customElement, inlineView } from "aurelia-framework";
import { IMenuItems } from "./ui-menus";

@containerless()
@customElement("menu-item")
@inlineView(`<template>
  <template if.bind="item.group">
    <ui-menu-group label.bind="item.group">
      <menu-item repeat.for="groupItem of item.items" item.bind="groupItem"></menu-item>
    </ui-menu-group>
  </template>
  <template if.bind="item.label">
    <ui-menu-item label.bind="item.label" href.bind="item.href"
    icon.bind="item.icon" icon-color.bind="item.iconColor" ui-badge="value.bind:item.badge; theme.bind:item.badgeTheme;"
    disabled.bind="typeof item.disabled === 'function' ? item.disabled() : item.disabled"
    active.bind="typeof item.active === 'function' ? item.active() : item.active"
    hide.bind="typeof item.hidden === 'function' ? item.hidden() : item.hidden"
    click.delegate="onClick($event)">
      <ui-drop view-model.ref="dropEl" if.bind="item.items">
        <ui-menu if.bind="dropEl.isOpen" menu-items.bind="item.items" noitems-label.bind="noitemsLabel"></ui-menu>
      </ui-drop>
    </ui-menu-item>
  </template>
  <template if.bind="item === '-'">
    <ui-divider></ui-divider>
  </template>
</template>`)
export class MenuItem {
  @bindable()
  protected item: IMenuItems;

  @bindable()
  protected noitemsLabel: string = "No Menu";

  protected onClick($event) {
    // @ts-ignore
    if (this.item.items) {
      $event.stopPropagation();
    }
    // @ts-ignore
    if (this.item.handler) {
      // @ts-ignore
      this.item.handler();
    }
    return true;
  }
}
