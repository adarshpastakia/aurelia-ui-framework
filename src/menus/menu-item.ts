/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, containerless, customElement, inlineView } from "aurelia-framework";
import { IMenuItems } from "./index";

@containerless()
@customElement("menu-item")
@inlineView(`<template>
  <template if.bind="item.group">
    <ui-menu-group label.bind="item.group">
      <menu-item repeat.for="groupItem of item.items" item.bind="groupItem"></menu-item>
    </ui-menu-group>
  </template>
  <template if.bind="item.label">
    <ui-menu-item label.bind="item.label" icon.bind="item.icon" icon-color.bind="item.iconColor" href.bind="item.href"
    disabled.bind="typeof item.disabled === 'function' ? item.disabled() : item.disabled"
    active.bind="typeof item.active === 'function' ? item.active() : item.active"
    hide.bind="typeof item.hidden === 'function' ? item.hidden() : item.hidden"
    click.trigger="item.handler && item.handler()">
      <ui-drop if.bind="item.items">
        <ui-menu>
          <menu-item repeat.for="innerItem of item.items" item.bind="innerItem"></menu-item>
        </ui-menu>
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
}
