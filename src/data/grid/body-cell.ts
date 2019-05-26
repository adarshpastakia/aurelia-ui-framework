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
        <div class="ui-datagrid__cell" css.bind="column.css" data-resizing.bind="column.isResizing">
          <div class="ui-datagrid__cell__wrapper" ref="el" ui-align.bind="column.align"></div>
        </div>
      </template>`)
export class BodyCell {
  @bindable()
  public column: UIColumn;
  @bindable()
  public record: KeyValue;

  protected el;

  protected attached() {
    this.recordChanged();
    if (this.column.noPadding) {
      this.el.style.paddingTop = 0;
      this.el.style.paddingBottom = 0;
    }
  }

  protected recordChanged() {
    this.column.compileCell(this.el, this.record);
  }
}
