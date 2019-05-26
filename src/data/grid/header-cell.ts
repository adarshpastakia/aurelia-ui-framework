/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, containerless, inlineView } from "aurelia-framework";
import { UIColumn } from "./ui-column";

@containerless()
@inlineView(`<template>
        <div class="ui-datagrid__cell" css.bind="css" with.bind="column">
          <div class="ui-datagrid__cell__wrapper" innerhtml.bind="label"></div>
          <div class="ui-datagrid__cell__sorter" if.bind="sortable">
            <i></i>
            <i></i>
          </div>
          <div class="ui-datagrid__cell__resizer" if.bind="resizeable"></div>
        </div>
      </template>`)
export class HeaderCell {
  @bindable()
  public column: UIColumn;
}
