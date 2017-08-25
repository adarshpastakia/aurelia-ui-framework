//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM, Container, ViewCompiler, ViewSlot } from 'aurelia-framework';
import { UIFormat } from "../../utils/ui-format";
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template></template>`)
@customElement('ui-dg-cell')
export class UIDgCell {
  constructor(public element: Element, private container: Container, private compiler: ViewCompiler) { }

  @bindable() col;
  @bindable() type;
  @bindable() record;
  @bindable() parent;

  slot;

  attached() {
    if (this.element.innerHTML) return;
    let template = '';
    if (this.type == 'subview') {
      if (isFunction(this.parent.subview)) template = this.parent.subview({ record: this.record });
      else template = this.parent.subview;
    }
    else if (this.col.type == 'normal')
      template = `<span class="\${col.class}" innerhtml.bind='col.getValue(record[col.dataId],record)'></span>`;
    else if (this.col.type == 'glyph')
      template = `<div title.bind="col.getTooltip(record[col.dataId],record)">
        <ui-glyph class="\${col.class} \${col.getGlyph(record[col.dataId],record)}" glyph.bind="col.getGlyph(record[col.dataId],record)"></ui-glyph>
        </div>`;
    else if (this.col.type == 'link')
      template = `<a class="ui-link \${col.class} \${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}" click.trigger="col.fireClick($event,record[col.dataId],record)" show.bind="col.isVisible(record[col.dataId],record)">
          <ui-glyph glyph.bind="col.getGlyph(record[col.dataId],record)" if.bind="col.glyph"></ui-glyph>
          <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span>
        </a>`;
    else if (this.col.type == 'button') {
      template = `<ui-button click.trigger="col.fireClick($event,record[col.dataId],record)" show.bind="col.isVisible(record[col.dataId],record)" theme.bind="col.getTheme(record[col.dataId],record)" small square glyph.bind="col.getGlyph(record[col.dataId],record)" disabled.bind="col.isDisabled(record[col.dataId],record)" dropdown.bind="col.dropdown" menuopen.trigger="col.fireMenuOpen($event, record)">
          <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span>
        </ui-button>`;
      this.element.classList.add('btn-fix');
    }

    let viewFactory = this.compiler.compile(`<template>${template}</template>`);
    let view = viewFactory.create(this.container);
    view.bind(this);
    // DOM.appendNode(div, this.element);
    this.slot = new ViewSlot(this.element, true);
    this.slot.add(view);
    this.slot.attached();
  }
  bind() {
    if (this.slot) this.slot.attached();
  }
  detached() {
    if (this.slot) this.slot.detached();
  }
}

@autoinject()
@inlineView(`<template><div class="ui-dg-row level-\${level} \${record.isOpen?'ui-expanded':''} \${parent.selected==record?'ui-selected':''} \${odd?'even':'odd'} \${last?'last':''}" click.trigger="parent.fireSelect(parent.selected=record)">
    <div class="ui-dg-lock-holder" css.bind="{transform: 'translateX('+parent.scrollLeft+'px)'}">
      <div class="ui-dg-expander" if.bind="parent.rowExpander" ref="rowExpand" click.trigger="$event.stopPropagation()" css.bind="{'min-width': parent.expandWidth+'px'}">
        <ui-glyph glyph="glyph" repeat.for="i of level"></ui-glyph>
        <a click.trigger="record.isOpen=!record.isOpen" if.bind="record.subdata||parent.subview"><ui-glyph glyph="\${record.isOpen?'glyph-icon-minus':'glyph-icon-plus'}"></ui-glyph></a>
      </div>
      <div class="ui-dg-expander ui-text-center" if.bind="parent.rowCounter" click.trigger="$event.stopPropagation()" ref="rowCounter" css.bind="{'min-width': parent.counterWidth+'px'}">\${index}</div>
      <ui-dg-cell class="ui-dg-cell \${col.align}" repeat.for="col of parent.colLocked" css.bind="{width:col.getWidth(col.width)+'px'}" col.bind="col" parent.bind="parent" record.bind="record">
      </ui-dg-cell>
    </div>
    <ui-dg-cell class="ui-dg-cell \${col.align}" repeat.for="col of parent.cols" css.bind="{width:col.getWidth(col.width)+'px'}" col.bind="col" parent.bind="parent" record.bind="record">
    </ui-dg-cell>
  </div>
  <ui-dg-row containerless if.bind="!parent.subview&&record.subdata&&record.isOpen" level.bind="level+1" parent.bind="parent" record.bind="rec" index.bind="$index" odd.bind="$odd" repeat.for="rec of record.subdata"></ui-dg-row>

  <div class="ui-dg-row" if.bind="parent.subview && record.isOpen" css.bind="{transform: 'translateX('+parent.scrollLeft+'px)'}">
    <div class="ui-dg-expander" if.bind="parent.rowExpander" click.trigger="$event.stopPropagation()" css.bind="{'min-width': parent.expandWidth+'px'}"></div>
    <div class="ui-dg-expander ui-text-center" if.bind="parent.rowCounter" click.trigger="$event.stopPropagation()" css.bind="{'min-width': parent.counterWidth+'px'}"></div>
    <ui-dg-cell class="ui-dg-subview" parent.bind="parent" record.bind="record" type="subview"></ui-dg-cell>
  </div>
</template>`)
@customElement('ui-dg-row')
export class UIDgRow {
  constructor(public element: Element) { }

  @bindable() level = 0;
  @bindable() index;
  @bindable() record;
  @bindable() parent;
  @bindable() odd;

  last = false;
  rowExpand;
  rowCounter;
  bind(bindingContext: any, overrideContext: any) {
    if (this.level > 0 && !overrideContext.$first && overrideContext.$last) this.last = true;
  }

  indexChanged() {
    UIEvent.queueTask(() => {
      if (this.rowExpand && this.parent.expandWidth < this.rowExpand.offsetWidth) this.parent.expandWidth = this.rowExpand.offsetWidth;
      if (this.rowCounter && this.parent.counterWidth < this.rowCounter.offsetWidth) this.parent.counterWidth = this.rowCounter.offsetWidth;
    });
  }
  attached() {
    if (this.rowExpand && this.parent.expandWidth < this.rowExpand.offsetWidth) this.parent.expandWidth = this.rowExpand.offsetWidth;
    if (this.rowCounter && this.parent.counterWidth < this.rowCounter.offsetWidth) this.parent.counterWidth = this.rowCounter.offsetWidth;
  }
}

@autoinject()
@inlineView(`<template class="ui-datagrid"><div class="ui-hidden"><slot></slot></div>
<div show.bind="resizing" ref="ghost" class="ui-dg-ghost"></div>
<div ref="dgHead" class="ui-dg-header">
  <div class="ui-dg-row" css.bind="{transform: 'translateX('+(scrollLeft*-1)+'px)'}">
    <div class="ui-dg-expander" if.bind="rowExpander" css.bind="{width: expandWidth+'px',transform: 'translateX('+(scrollLeft)+'px)'}"></div>
    <div class="ui-dg-expander" if.bind="rowCounter" css.bind="{width: counterWidth+'px',transform: 'translateX('+(scrollLeft)+'px)'}"></div>
    <template repeat.for="col of colHead">
    <div if.bind="!col.columns" css.bind="{width:col.getWidth(col.width)+'px', transform: 'translateX('+(col.locked==0?scrollLeft:0)+'px)'}"
      mouseup.trigger="doSort(col)" class="ui-dg-cell \${col.sortable?'ui-sortable':''} \${col.locked==0?'ui-locked':''}">
    <span class="ui-title" innerhtml.bind='col.getTitle()'></span>
    <span class="ui-filter" if.bind="col.filter"><ui-glyph glyph="glyph-funnel"></ui-glyph></span>
    <span class="ui-sort \${col.dataId==sortColumn ? sortOrder:''}" if.bind="col.sortable"></span>
    <span class="ui-resizer" if.bind="col.resize" mousedown.trigger="resizeColumn($event,col)"></span>
    </div>
    <div if.bind="col.columns" class="ui-dg-group \${col.locked==0?'ui-locked':''}" css.bind="{transform: 'translateX('+(col.locked==0?scrollLeft:0)+'px)'}">
    <div class="ui-title" innerhtml.bind='col.getTitle()'></div>
    <div class="ui-dg-cols">
    <div repeat.for="colin of col.columns" class="ui-dg-cell" css.bind="{width:colin.getWidth(colin.width)+'px'}"
      mouseup.trigger="doSort(colin)" class="\${colin.sortable?'ui-sortable':''}">
    <span class="ui-title" innerhtml.bind='colin.getTitle()'></span>
    <span class="ui-filter" if.bind="colin.filter"><ui-glyph glyph="glyph-funnel"></ui-glyph></span>
    <span class="ui-sort \${colin.dataId==sortColumn ? sortOrder:''}" if.bind="colin.sortable"></span>
    <span class="ui-resizer" if.bind="colin.resize" mousedown.trigger="resizeColumn($event,colin)"></span>
    </div>
    </div>
    </div>
    </template>
  </div>
</div>
<div show.bind="data.length==0" class="ui-dg-empty"><slot name="dg-empty"></slot></div>
<div ref="dgBody" class="ui-dg-body" scroll.trigger="(scrollLeft = dgBody.scrollLeft)" if.bind="!virtual">
  <ui-dg-row containerless parent.bind="$parent" record.bind="record" index.bind="$index" odd.bind="$odd" repeat.for="record of paged"></ui-dg-row>
  <div class="ui-dg-row ui-dg-filler">
    <div class="ui-dg-lock-holder" css.bind="{transform: 'translateX('+scrollLeft+'px)'}">
      <div class="ui-dg-expander" if.bind="rowExpander" css.bind="{width: expandWidth+'px'}"></div>
      <div class="ui-dg-expander" if.bind="rowCounter" css.bind="{width: counterWidth+'px'}"></div>
      <div class="ui-dg-cell \${col.align}" repeat.for="col of colLocked" css.bind="{width:col.getWidth(col.width)+'px'}"></div>
    </div>
    <div class="ui-dg-cell \${col.align}" repeat.for="col of cols" css.bind="{width:col.getWidth(col.width)+'px'}"></div>
  </div>
</div>
<div ref="dgBody" class="ui-dg-body" scroll.trigger="(scrollLeft = dgBody.scrollLeft)" if.bind="virtual">
  <ui-dg-row parent.bind="$parent" record.bind="record" index.bind="$index" odd.bind="$odd" virtual-repeat.for="record of paged"></ui-dg-row>
  <div class="ui-dg-row ui-dg-filler">
    <div class="ui-dg-lock-holder" css.bind="{transform: 'translateX('+scrollLeft+'px)'}">
      <div class="ui-dg-expander" if.bind="rowExpander" css.bind="{width: expandWidth+'px'}"></div>
      <div class="ui-dg-expander" if.bind="rowCounter" css.bind="{width: counterWidth+'px'}"></div>
      <div class="ui-dg-cell \${col.align}" repeat.for="col of colLocked" css.bind="{width:col.getWidth(col.width)+'px'}"></div>
    </div>
    <div class="ui-dg-cell \${col.align}" repeat.for="col of cols" css.bind="{width:col.getWidth(col.width)+'px'}"></div>
  </div>
</div>
<div ref="dgFoot" class="ui-dg-footer" if.bind="summaryRow">
  <div class="ui-dg-row" css.bind="{transform: 'translateX('+(scrollLeft*-1)+'px)'}">
    <div class="ui-dg-lock-holder" css.bind="{transform: 'translateX('+scrollLeft+'px)'}">
      <div class="ui-dg-expander" if.bind="rowExpander" css.bind="{width: expandWidth+'px'}"></div>
      <div class="ui-dg-expander" if.bind="rowCounter" css.bind="{width: counterWidth+'px'}"></div>
      <div class="ui-dg-cell \${col.align}" repeat.for="col of colLocked" css.bind="{width:col.getWidth(col.width)+'px'}">
        <div innerhtml.bind='col.getSummary(summaryRow, data)'></div>
      </div>
    </div>
    <div class="ui-dg-cell \${col.align}" repeat.for="col of cols" css.bind="{width:col.getWidth(col.width)+'px'}">
      <div innerhtml.bind='col.getSummary(summaryRow, data)'></div>
    </div>
  </div>
</div>
<div class="ui-dg-loader" if.bind="isBusy">
  <div class="ui-loader-div">
    <ui-glyph class="ui-anim-loader" glyph="glyph-loader"></ui-glyph>
  </div>
</div><template>`)
@customElement('ui-datagrid')
export class UIDatagrid {
  constructor(public element: Element) {
    this.virtual = element.hasAttribute('virtual');
    this.rowCounter = element.hasAttribute('row-counter');
    this.rowExpander = element.hasAttribute('row-expander');
    if (!element.hasAttribute('scroll')) this.element.classList.add('ui-auto-size');
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    if (this.pager) {
      if (!(this.pager instanceof UIPager)) throw new Error('Pager must be instance of UIPager');
      this.obPageChange = UIEvent.observe(this.pager, 'page', () => this.makePage());
    }
  }
  attached() {
    UIEvent.queueTask(() => {
      this.columnsChanged(this.columns);
      this.dataChanged(this.data);
    });
  }
  detached() {
    if (this.obPageChange) this.obPageChange.dispose();
  }
  // unbind() { }
  // end aurelia hooks

  @children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph') columns;

  @bindable() data = [];
  @bindable() subview;
  @bindable() summaryRow = false;
  @bindable() sortColumn = '';
  @bindable() sortOrder = '';

  @bindable() pager;
  @bindable() perPage = 50;


  cols = [];
  colHead = [];
  colLocked = [];
  virtual = false;
  rowCounter = false;
  rowExpander = false;
  expandWidth = 0;
  counterWidth = 0;

  private loaded = false;
  private isBusy = false;
  private paged = [];
  private filtered = [];

  selected;
  obPageChange;

  columnsChanged(c?) {
    this.colHead = _.sortBy(this.columns, 'locked');
    let cols = _.sortBy(_.flatMap(this.columns, c => c.columns || [c]), 'locked');
    this.colLocked = _.filter(cols, (c: any) => c.locked == 0);
    this.cols = _.filter(cols, (c: any) => c.locked == 1);
  }

  dataChanged(newValue) {
    UIEvent.queueTask(() => {
      if (this.pager) {
        this.pager.page = 0;
        this.pager.totalPages = Math.ceil(this.data.length / this.perPage);
      }
      this.filter();
    });
  }

  private filter() {
    this.filtered = this.data;
    this.makePage();
  }
  private makePage() {
    this.isBusy = true;
    // this.paged = [];
    UIEvent.queueTask(() => {
      let data = _.orderBy(this.filtered, [this.sortColumn, 'ID', 'id'], [this.sortOrder, this.sortOrder, this.sortOrder]);
      if (this.pager) {
        let pp = parseInt(this.perPage + '');
        data = _.slice(data, this.pager.page * pp, (this.pager.page * pp) + pp);
      }
      this.paged = data;
      this.loaded = true;
      UIEvent.queueTask(() => this.isBusy = false);
    });
  }
  private doSort(col) {
    if (!col.sortable || this.resizing) return;
    if (this.sortColumn != col.dataId) this.sortOrder = 'asc';
    if (this.sortColumn == col.dataId) this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
    this.sortColumn = col.dataId;
    UIEvent.queueTask(() => this.makePage());
  }

  private fireSelect(record) {
    UIEvent.fireEvent('rowselect', this.element, ({ record }));
  }

  isRtl = false;
  move;
  stop;
  diff;
  dgBody;
  startX;
  ghost;
  colResize;
  resizing = false;
  resizeColumn(evt, col) {
    if (evt.button != 0) return true;
    this.isRtl = window.isRtl(this.element);
    this.diff = 0;
    this.colResize = col;
    this.resizing = true;
    this.startX = (evt.x || evt.clientX);
    this.ghost.style[this.isRtl ? 'left' : 'right'] = "none";
    this.ghost.style[this.isRtl ? 'right' : 'left'] = (getParentByClass(evt.target, 'ui-dg-cell').offsetLeft + parseInt(col.width)) + 'px';
    document.addEventListener('mouseup', this.stop = evt => this.resizeEnd(evt));
    document.addEventListener('mousemove', this.move = evt => this.resize(evt));
  }
  resize(evt) {
    var x = (evt.x || evt.clientX) - this.startX;
    x = (this.isRtl ? -1 : 1) * x;
    if (x < 0 && (parseInt(this.colResize.width) + x) <= (this.colResize.minWidth || 80)) return;
    if (x > 0 && (parseInt(this.colResize.width) + x) >= (500)) return;

    this.startX = (evt.x || evt.clientX);
    this.diff += x;
    this.colResize.width = (parseInt(this.colResize.width) + x);
    this.ghost.style[this.isRtl ? 'right' : 'left'] = (parseInt(this.ghost.style[this.isRtl ? 'right' : 'left']) + x) + 'px';
  }
  resizeEnd(evt) {
    this.resizing = false;
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('mouseup', this.stop);
    evt.stopPropagation();
    return false;
  }
}

@containerless()
@customElement('ui-dg-empty')
@inlineView(`<template><div slot="dg-empty"><slot></slot></div></template>`)
export class UIDGEmpty { }

@autoinject()
@inlineView(`<template class="ui-pager">
  <a class="pg-first \${page==0?'disabled':''}" click.trigger="fireChange(page=0)"><ui-glyph glyph="glyph-\${style}-double-left"></ui-glyph></a>
  <a class="pg-prev \${page==0?'disabled':''}" click.trigger="fireChange(page=page-1)" click.trigger="fireChange(page=totalPages)"><ui-glyph glyph="glyph-\${style}-left"></ui-glyph></a>
  <span class="pg-input">\${page+1} of \${totalPages}</span>
  <a class="pg-next \${page+1>=totalPages?'disabled':''}" click.trigger="fireChange(page=page+1)"><ui-glyph glyph="glyph-\${style}-right"></ui-glyph></a>
  <a class="pg-last \${page+1>=totalPages?'disabled':''}" click.trigger="fireChange(page=totalPages-1)"><ui-glyph glyph="glyph-\${style}-double-right"></ui-glyph></a>
</template>`)
@customElement('ui-pager')
export class UIPager {
  constructor(public element: Element) { }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    if (this.store)
      this.totalPages = this.store.totalPages;
  }
  attached() {
    if (this.store && !this.store.isLoaded) UIEvent.queueTask(() => this.store.loadPage(this.page));
  }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable({ defaultBindingMode: bindingMode.twoWay }) page = 0;

  @bindable() style = "chevron";
  @bindable() store;
  @bindable() totalPages = 1;

  fireChange() {
    if (this.store) this.store.loadPage(this.page);
    UIEvent.fireEvent('change', this.element, this.page);
  }
}

@autoinject()
@inlineView(`<template class="ui-filter"></template>`)
@customElement('ui-dg-filter')
export class UIDGFilter {
  constructor(public element: Element) { }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks
}
