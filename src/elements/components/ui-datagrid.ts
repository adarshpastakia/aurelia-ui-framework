//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customElement, bindable, bindingMode, children, inlineView, containerless, DOM, TemplatingEngine, computedFrom, Container, ViewCompiler, ViewSlot } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import { UIDataSource } from "../../data/ui-datasource";
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";

const logger = getLogger('UIDatagrid');

@autoinject()
@inlineView(`<template class="ui-dg-cell" css.bind="{width: column.columnWidth+'px', minWidth: column.columnMinWidth+'px'}" click.delegate="doSort()">
  <div class="ui-dg-cell-content">\${column.headerTitle}</div>
  <div class="ui-dg-cell-icon ui-sort \${sortOrder}" if.bind="column.sortable">
    <ui-glyph glyph="glyph-caret-up"></ui-glyph>
    <ui-glyph glyph="glyph-caret-down"></ui-glyph>
  </div>
  <div class="ui-dg-cell-icon ui-filter" if.bind="column.filter">
    <ui-glyph glyph="glyph-funnel"></ui-glyph>
  </div>
  <div class="ui-dg-cell-resize" if.bind="column.resizeable" mousedown.trigger="fireResize($event)" click.trigger="$event.stopPropagation() && false"></div>
</template>`)
export class HeaderCell {
  @bindable() ds;
  @bindable() column;

  constructor(public element: Element) { }

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

  fireResize(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const startX = evt.x || evt.clientX;
    UIEvent.fireEvent('resize', this.element, { column: this.column, startX });

    return false;
  }
}

@autoinject()
@inlineView(`<template class="ui-dg-cell" css.bind="{width: column.columnWidth+'px', minWidth: column.columnMinWidth+'px'}">
<div class="ui-dg-cell-content \${column.align}" ref="elContent"></div>
</template>`)
export class BodyCell {
  constructor(public element: Element, private container: Container, private compiler: ViewCompiler) { }

  @bindable() column;
  @bindable() record;

  private slot;
  private elContent;

  private viewModel;

  attached() {
    if (this.elContent.innerHTML) return;
    let template = '';
    if (this.column.tpl) {
      template = this.column.tpl;
      this.viewModel = this.column.$parent;
      if (this.column.class) this.element.classList.add(this.column.class);
    }
    else if (this.column.type == 'normal')
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
      template = `<ui-button click.trigger="column.fireClick($event,record[column.dataId],record)" show.bind="column.isVisible(record[column.dataId],record)" theme.bind="column.getTheme(record[column.dataId],record)" small square glyph.bind="column.getGlyph(record[column.dataId],record)" width.bind="column.buttonWidth" disabled.bind="column.isDisabled(record[column.dataId],record)" dropdown.bind="column.dropdown" menuopen.trigger="column.fireMenuOpen($event, record)" label.bind="column.getLabel(record[column.dataId],record)">
      </ui-button>`;
      this.element.classList.add('btn-fix');
    }

    let viewFactory = this.compiler.compile(`<template>${template}</template>`);
    let view = viewFactory.create(this.container);
    view.bind({ record: this.record, column: this.column, viewModel: this.viewModel });
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
  <div class="ui-dg-cell ui-cell-checkbox" click.trigger="parent.toggleRecordCheck($event,record)" if.bind="parent.rowCheckbox">
    <ui-glyph glyph.bind="record.__selected__?'glyph-tree-check-on':'glyph-tree-check-off'"></ui-glyph>
  </div>
  <body-cell repeat.for="column of parent.colLocked" record.bind="record" column.bind="column"></body-cell>
</div>
<body-cell repeat.for="column of parent.cols" record.bind="record" column.bind="column"></body-cell>
<div class="ui-dg-cell last-cell"><div class="ui-dg-cell-content">&nbsp;</div></div>
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
<div class="ui-dg-ghost" ref="ghostEl" css.bind="{height: element.offsetHeight+'px'}"></div>
<div class="ui-dg-head" resize.trigger="startResize($event)">
  <div class="ui-dg-row" css.bind="{transform: 'translateX('+(scrollLeft*-1)+'px)'}">
    <div class="ui-dg-lock-group" css.bind="{transform: 'translateX('+(scrollLeft)+'px)'}">
      <div class="ui-dg-cell ui-row-head" css.bind="{width: counterWidth+'px'}" if.bind="rowCounter"></div>
      <div class="ui-dg-cell ui-cell-checkbox" if.bind="rowCheckbox"></div>
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
        <header-cell column.bind="inColumn" ds.bind="dataSource" repeat.for="inColumn of column.columns"></header-cell>
      </div>
    </div>
    </template>
    <div class="ui-dg-cell last-cell"><div class="ui-dg-cell-content">&nbsp;</div></div>
  </div>
</div>
<div class="ui-dg-body \${rowSelect?'ui-row-hilight':''}" scroll.trigger="scrollLeft = $event.target.scrollLeft" ref="elDgBody" if.bind="virtual">
  <body-row virtual-repeat.for="record of dataSource.data" record.bind="record" click.trigger="fireSelect($event, record)"></body-row>
</div>
<div class="ui-dg-body \${rowSelect?'ui-row-hilight':''}" scroll.trigger="scrollLeft = $event.target.scrollLeft" ref="elDgBody" if.bind="!virtual">
  <body-row repeat.for="record of dataSource.data" record.bind="record" click.trigger="fireSelect($event, record)"></body-row>
  <div class="ui-dg-row ui-last-row">
    <div class="ui-dg-lock-group" css.bind="{transform: 'translateX('+(scrollLeft)+'px)'}">
      <div class="ui-dg-cell ui-row-head" css.bind="{width: counterWidth+'px'}" if.bind="rowCounter"></div>
      <div class="ui-dg-cell ui-cell-checkbox" if.bind="rowCheckbox"></div>
      <div repeat.for="column of colLocked" class="ui-dg-cell" css.bind="{width: column.columnWidth+'px', minWidth: column.columnMinWidth+'px'}"></div>
    </div>
    <div repeat.for="column of cols" class="ui-dg-cell" css.bind="{width: column.columnWidth+'px', minWidth: column.columnMinWidth+'px'}"></div>
    <div class="ui-dg-cell last-cell"></div>
  </div>
</div>
<div class="ui-dg-foot"></div>
</template>`)
@customElement('ui-datagrid')
export class UIDatagrid {
  constructor(public element: Element, private engine: TemplatingEngine) {
    this.virtual = element.hasAttribute('virtual');
    this.rowSelect = element.hasAttribute('rowselect') || element.hasAttribute('rowselect.trigger');
    this.rowCheckbox = element.hasAttribute('row-checkbox');
    this.rowCounter = element.hasAttribute('row-counter');
    this.rowExpander = element.hasAttribute('row-expander');
    if (!element.hasAttribute('scroll')) this.element.classList.add('ui-auto-size');
  }

  bind() {
    this.dataSourceChanged(this.dataSource);
  }

  attached() {
    UIEvent.queueTask(() => {
      this.columnsChanged(this.columns);
    });

    this.obLocaleChange = UIEvent.subscribe(UIEvent.I18N_CHANGE_EVENT, () => this['elDgBody'].scrollLeft = this['elDgBody'].scrollLeft * -1);
  }

  detached() {
    if (this.obPageChange) this.obPageChange.dispose();
    if (this.obLocaleChange) this.obLocaleChange.dispose();
  }

  @children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph,ui-dg-tpl') columns;

  @bindable() dataSource;

  @bindable({ defaultBindingMode: bindingMode.fromView }) selectedRows = [];

  cols = [];
  colHead = [];
  colLocked = [];

  private counterWidth = 32;

  private virtual = false;
  private rowSelect = false;
  private rowCheckbox = false;
  private rowCounter = false;
  private rowExpander = false;

  private obPageChange;
  private obLocaleChange;

  columnsChanged(columns) {
    this.colHead = _.sortBy(columns, 'locked');
    this.cols = _.flatMap(_.filter(columns, (c: any) => c.locked == 1), c => c.columns || c);
    this.colLocked = _.flatMap(_.filter(columns, (c: any) => c.locked == 0), c => c.columns || c);
  }

  dataSourceChanged(newValue) {
    if (this.obPageChange) this.obPageChange.dispose();
    if (_.isArray(newValue)) {
      const ds = new UIDataSource();
      ds.load(newValue);
      this.dataSource = ds;
    }
    this.obPageChange = UIEvent.observe(this.dataSource, 'data', () => this.selectedRows = []);
  }

  toggleRecordCheck($event, record) {
    $event.stopPropagation();
    $event.preventDefault();
    record.__selected__ = !record.__selected__;
    this.selectedRows = _.filter(this.dataSource.data, ['__selected__', true]);
  }

  private fireSelect($event, record) {
    // $event.stopPropagation();
    // $event.preventDefault();
    if (!this.rowSelect) return;
    UIEvent.fireEvent('rowselect', this.element, ({ record }));
    // return false;
  }

  private _X = 0;
  private ghostEl;
  private _column;
  private _columnEl;
  private _evtStop;
  private _evtMove;
  private _isRtl;
  private _resizing = true;
  private startResize(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this._isRtl = isRtl(this.element);
    this._X = evt.detail.startX;
    this._resizing = true;
    this._column = evt.detail.column;
    this._columnEl = evt.target;

    this.ghostEl.classList.add('resizing');
    this.ghostEl.style.left = (this._columnEl.offsetLeft + (this._isRtl ? 0 : this._column.columnWidth)) + 'px';
    document.addEventListener('mouseup', this._evtStop = evt => this.endResize(evt));
    document.addEventListener('mousemove', this._evtMove = evt => this.onResize(evt));
  }

  private onResize(evt) {
    let w = this._column.columnWidth;
    let diff = (evt.x || evt.clientX || 0) - this._X;

    if (this._isRtl) diff = diff * -1;

    if (w + diff < this._column.columnMinWidth) w = this._column.columnMinWidth;
    else if (w + diff > 500) w = 500;
    else w = w + diff;

    this._X = evt.x || evt.clientX;
    this._column.width = w;
    this.ghostEl.style.left = (this._columnEl.offsetLeft + (this._isRtl ? 0 : this._column.columnWidth)) + 'px';

    return false;
  }

  private endResize(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this._resizing = false;
    this.ghostEl.classList.remove('resizing');

    document.removeEventListener('mouseup', this._evtStop);
    document.removeEventListener('mousemove', this._evtMove);

    return false;
  }
}
