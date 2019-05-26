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
        <div class="ui-datagrid__cell" css.bind="column.css">
          <div class="ui-datagrid__cell__wrapper" ref="el"></div>
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
  }

  protected recordChanged() {
    this.column.compileCell(this.el, this.record);
  }
}
