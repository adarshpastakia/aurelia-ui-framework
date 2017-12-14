//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customElement, bindable, bindingMode, children, inlineView, containerless, DOM, TemplatingEngine, computedFrom, Container, ViewCompiler, ViewSlot } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template class="ui-dg-cell" css.bind="{width: column.width, minWidth: column.minWidth}" click.trigger="doSort()">
  <div class="ui-dg-cell-content">\${column.headTitle}</div>
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
  @bindable() ds;
  @bindable() column;

  @computedFrom('ds.sortBy', 'ds.orderBy')
  get sortOrder() {
    if (this.ds.sortBy !== this.column.dataId) return '';
    return this.ds.orderBy;
  }

  doSort() {
    if (!this.column.sortable) return;
    if (this.ds.sortBy !== this.column.dataId) this.ds.sort(this.column.dataId, 'asc');
    else this.ds.sort(this.column.dataId, this.ds.orderBy === 'asc' ? 'desc' : 'asc');
  }
}

@autoinject()
@inlineView(`<template class="ui-dg-cell" css.bind="{width: column.width, minWidth: column.minWidth}">
<div class="ui-dg-cell-content \${column.align}" ref="elContent"></div>
</template>`)
export class BodyCell {
  constructor(public element: Element, private container: Container, private compiler: ViewCompiler) { }

  @bindable() column;
  @bindable() record;

  private slot;
  private elContent;

  attached() {
    if (this.elContent.innerHTML) return;
    let template = '';
    if (this.column.type == 'normal')
      template = `<span class="\${column.class}" innerhtml.bind='column.getValue(record[column.dataId],record)'></span>`;
    else if (this.column.type == 'glyph')
      template = `<div title.bind="column.getTooltip(record[column.dataId],record)">
      <ui-glyph class="\${column.class}" glyph.bind="column.getGlyph(record[column.dataId],record)"></ui-glyph>
      </div>`;
    else if (this.column.type == 'link')
      template = `<a class="ui-link \${column.class} \${column.isDisabled(record[column.dataId],record)?'ui-disabled':''}" click.trigger="column.fireClick($event,record[column.dataId],record)" show.bind="column.isVisible(record[column.dataId],record)">
        <ui-glyph glyph.bind="column.getGlyph(record[column.dataId],record)" if.bind="column.glyph"></ui-glyph>
        <span innerhtml.bind="column.getLabel(record[column.dataId],record)"></span>
      </a>`;
    else if (this.column.type == 'button') {
      template = `<ui-button click.trigger="column.fireClick($event,record[column.dataId],record)" show.bind="column.isVisible(record[column.dataId],record)" theme.bind="column.getTheme(record[column.dataId],record)" small square glyph.bind="column.getGlyph(record[column.dataId],record)" disabled.bind="column.isDisabled(record[column.dataId],record)" dropdown.bind="column.dropdown" menuopen.trigger="column.fireMenuOpen($event, record)" label.bind="column.getLabel(record[column.dataId],record)">
      </ui-button>`;
      this.element.classList.add('btn-fix');
    }

    let viewFactory = this.compiler.compile(`<template>${template}</template>`);
    let view = viewFactory.create(this.container);
    view.bind(this);
    // DOM.appendNode(div, this.element);
    this.slot = new ViewSlot(this.elContent, true);
    this.slot.add(view);
    this.slot.attached();
  }
  detached() {
    if (this.slot) this.slot.detached();
  }
}

@autoinject()
@inlineView(`<template class="ui-dg-row \${record.__selected__?'ui-selected':''}">
<div class="ui-dg-lock-group" css.bind="{transform: 'translateX('+(parent.scrollLeft)+'px)'}">
  <div class="ui-dg-cell ui-row-head" css.bind="{width: parent.counterWidth+'px'}" if.bind="parent.rowCounter">
    <div class="ui-dg-cell-content ui-text-center">\${(index+1) + (parent.dataSource.recordsPerPage * parent.dataSource.page)}</div>
  </div>
  <body-cell repeat.for="column of parent.colLocked" record.bind="record" column.bind="column"></body-cell>
</div>
<body-cell repeat.for="column of parent.cols" record.bind="record" column.bind="column"></body-cell>
<div class="ui-dg-cell"><div class="ui-dg-cell-content">&nbsp;</div></div>
</template>`)
export class BodyRow {
  bind(bindingContext, overrideContext) {
    this.index = overrideContext.$index;
    this.parent = overrideContext.parentOverrideContext.bindingContext;
  }
  @bindable() record;

  index = 0;
  parent;
}

@autoinject()
@inlineView(`<template class="ui-datagrid"><div class="ui-hide"><slot></slot></div>
<div class="ui-dg-head">
  <div class="ui-dg-row" css.bind="{transform: 'translateX('+(scrollLeft*-1)+'px)'}">
    <div class="ui-dg-lock-group" css.bind="{transform: 'translateX('+(scrollLeft)+'px)'}">
      <div class="ui-dg-cell ui-row-head" css.bind="{width: counterWidth+'px'}" if.bind="rowCounter"></div>
      <template repeat.for="column of colHead | filter:'locked':0">
      <header-cell column.bind="column" ds.bind="dataSource" if.bind="!column.isGroup"></header-cell>
      <div class="ui-dg-col-group" if.bind="column.isGroup">
        <div class="ui-dg-col-group-title">\${column.label}</div>
        <div class="ui-dg-col-group-cells">
          <header-cell column.bind="inColumn" ds.bind="dataSource" repeat.for="inColumn of column.columns"></header-cell>
        </div>
      </div>
      </template>
    </div>
    <template repeat.for="column of colHead | filter:'locked':1">
    <header-cell column.bind="column" ds.bind="dataSource" if.bind="!column.isGroup"></header-cell>
    <div class="ui-dg-col-group" if.bind="column.isGroup">
      <div class="ui-dg-col-group-title">\${column.label}</div>
      <div class="ui-dg-col-group-cells">
        <header-cell column.bind="inColumn" repeat.for="inColumn of column.columns"></header-cell>
      </div>
    </div>
    </template>
    <div class="ui-dg-cell"><div class="ui-dg-cell-content">&nbsp;</div></div>
  </div>
</div>
<div class="ui-dg-body" scroll.trigger="scrollLeft = $event.target.scrollLeft">
  <body-row repeat.for="record of dataSource.data" record.bind="record"></body-row>
  <div class="ui-dg-row ui-last-row">
    <div class="ui-dg-lock-group" css.bind="{transform: 'translateX('+(scrollLeft)+'px)'}">
      <div class="ui-dg-cell ui-row-head" css.bind="{width: counterWidth+'px'}" if.bind="rowCounter"></div>
      <div repeat.for="column of colLocked" class="ui-dg-cell" css.bind="{width: column.width, minWidth: column.minWidth}"></div>
    </div>
    <div repeat.for="column of cols" class="ui-dg-cell" css.bind="{width: column.width, minWidth: column.minWidth}"></div>
    <div class="ui-dg-cell"><div class="ui-dg-cell-content">&nbsp;</div></div>
  </div>
</div>
<div class="ui-dg-foot"></div>
</template>`)
@customElement('ui-datagrid')
export class UIDatagrid {
  constructor(public element: Element, private engine: TemplatingEngine) {
    // if (element.hasAttribute('virtual'))
    this.rowCounter = element.hasAttribute('row-counter');
    this.rowExpander = element.hasAttribute('row-expander');
    if (!element.hasAttribute('scroll')) this.element.classList.add('ui-auto-size');
  }

  attached() {
    UIEvent.queueTask(() => {
      this.columnsChanged(this.columns);
    });
  }

  @children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph') columns;

  @bindable() dataSource;

  cols = [];
  colHead = [];
  colLocked = [];

  private counterWidth = 32;

  private virtual = false;
  private rowCounter = false;
  private rowExpander = false;

  columnsChanged(columns) {
    this.colHead = _.sortBy(columns, 'locked');
    this.cols = _.flatMap(_.filter(columns, (c: any) => c.locked == 1), c => c.columns || c);
    this.colLocked = _.flatMap(_.filter(columns, (c: any) => c.locked == 0), c => c.columns || c);
  }
}