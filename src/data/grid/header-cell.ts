/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, inlineView } from "aurelia-framework";
import { UIInternal } from "../../utils/ui-internal";
import { UIColumn } from "./ui-column";

@containerless()
@inlineView(`<template>
        <div class="ui-datagrid__cell" css.bind="css" with.bind="column">
          <div class="ui-datagrid__cell__wrapper" innerhtml.bind="label"
            click.trigger="fireSortEvent()"></div>
          <div class="ui-datagrid__cell__sorter" 
            data-sort.bind="sortBy === dataId ? sortOrder : ''">
            <i if.bind="sortable"></i>
            <i if.bind="sortable"></i>
          </div>
          <div class="ui-datagrid__cell__resizer" if.bind="resizeable" mousedown.trigger="startResize($event)"></div>
        </div>
      </template>`)
export class HeaderCell {
  @bindable()
  public column: UIColumn;

  @bindable()
  public sortBy: string;
  @bindable()
  public sortOrder: string;

  constructor(private element: Element) {}

  protected fireSortEvent() {
    if (this.column.sortable) {
      this.element.dispatchEvent(UIInternal.createEvent("sort"));
    }
  }
}
