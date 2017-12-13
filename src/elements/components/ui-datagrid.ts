//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customElement, bindable, bindingMode, children, inlineView, containerless, DOM, TemplatingEngine, computedFrom } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template class="ui-dg-cell" css.bind="{width: column.width, minWidth: column.minWidth}">
  <div class="ui-dg-cell-content">\${column.label}</div>
  <div class="ui-dg-cell-icon ui-sort \${sortOrder}" if.bind="column.sortable">
    <ui-glyph glyph="glyph-caret-up"></ui-glyph>
    <ui-glyph glyph="glyph-caret-down"></ui-glyph>
  </div>
  <div class="ui-dg-cell-icon ui-filter" if.bind="column.filter">
    <ui-glyph glyph="glyph-funnel"></ui-glyph>
  </div>
  <div class="ui-dg-cell-resize" if.bind="column.resizeable"></div>
</template>`)
export class HeaderCell {
  @bindable() column;
  @bindable() sorted = false;
  @bindable() order = 'asc';

  @computedFrom('sorted', 'order')
  get sortOrder() {
    if (!this.sorted) return '';
    return this.order;
  }
}

@autoinject()
@inlineView(`<template class="ui-datagrid"><div class="ui-hide"><slot></slot></div>
<div class="ui-dg-head">
  <div class="ui-dg-row" css.bind="{transform: 'translateX('+(scrollLeft*-1)+'px)'}">
    <div class="ui-dg-lock-group" css.bind="{transform: 'translateX('+(scrollLeft)+'px)'}">
      <template repeat.for="column of colHead | filter:'locked':0">
      <header-cell column.bind="column" if.bind="!column.isGroup"></header-cell>
      <div class="ui-dg-col-group" if.bind="column.isGroup">
        <div class="ui-dg-col-group-title">\${column.label}</div>
        <div class="ui-dg-col-group-cells">
          <header-cell column.bind="inColumn" repeat.for="inColumn of column.columns"></header-cell>
        </div>
      </div>
      </template>
    </div>
    <template repeat.for="column of colHead | filter:'locked':1">
    <header-cell column.bind="column" if.bind="!column.isGroup"></header-cell>
    <div class="ui-dg-col-group" if.bind="column.isGroup">
      <div class="ui-dg-col-group-title">\${column.label}</div>
      <div class="ui-dg-col-group-cells">
        <header-cell column.bind="inColumn" repeat.for="inColumn of column.columns"></header-cell>
      </div>
    </div>
    </template>
  </div>
</div>
<div class="ui-dg-body"></div>
<div class="ui-dg-foot"></div>
</template>`)
@customElement('ui-datagrid')
export class UIDatagrid {
  constructor(public element: Element, private engine: TemplatingEngine) {
    // if(element.hasAttribute('virtual'))
    this.rowCounter = element.hasAttribute('row-counter');
    this.rowExpander = element.hasAttribute('row-expander');
    if (!element.hasAttribute('scroll')) this.element.classList.add('ui-auto-size');
  }

  @children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph') columns;

  @bindable() dataSource;

  cols = [];
  colHead = [];
  colLocked = [];

  private virtual = false;
  private rowCounter = false;
  private rowExpander = false;

  columnsChanged(c?) {
    this.colHead = _.sortBy(this.columns, 'locked');
    let cols = _.sortBy(_.flatMap(this.columns, c => c.columns || [c]), 'locked');
    this.cols = _.filter(cols, (c: any) => c.locked == 1);
    this.colLocked = _.filter(cols, (c: any) => c.locked == 0);
  }
}
