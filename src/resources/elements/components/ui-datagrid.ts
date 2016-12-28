// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIFormat} from "../../utils/ui-format";
import {UIEvent} from "../../utils/ui-event";
import {UIUtils} from "../../utils/ui-utils";

@inlineView(`<template>
  <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}">
  <div if.bind="col.type=='normal'"><span class="\${col.class}" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>
  <div if.bind="col.type=='link'"><a class="ui-link \${col.class} \${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}" click.trigger="col.fireClick($event,record[col.dataId],record)"><ui-glyph glyph.bind="col.getGlyph(record[col.dataId],record)" if.bind="col.glyph"></ui-glyph> <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></a></div>
  <div if.bind="col.type=='button'" class="btn-fix"><ui-button click.trigger="col.fireClick($event,record[col.dataId],record)" theme.bind="col.getTheme(record[col.dataId],record)" small square glyph.bind="col.getGlyph(record[col.dataId],record)" disabled.bind="col.isDisabled(record[col.dataId],record)" dropdown.bind="dropdown" menuopen.trigger="col.fireMenuOpen($event, record)"><span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></ui-button></div>
  </td>
  <td class="ui-expander"><div>&nbsp;</div></td>
</template>`)
@customElement('ui-dg-row')
export class UIDgRow {
  bind(bindingContext: Object, overrideContext: Object) {
    this.record = bindingContext['record'];
    this.cols = overrideContext['parentOverrideContext'].bindingContext.cols;
  }

  cols;
  record;
}

@autoinject()
@inlineView(`<template class="ui-datagrid"><div class="ui-hidden"><slot></slot></div>
<div show.bind="resizing" ref="ghost" class="ui-dg-ghost"></div>
<div if.bind="loaded && (!data || data.length==0)" class="ui-dg-empty"><slot name="dg-empty"></slot></div>
<div>
<table ref="dgHead" width.bind="tableWidth" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <thead><tr>
    <td repeat.for="col of cols" click.trigger="doSort(col)" class="\${col.sortable?'ui-sortable':''} \${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>
      <span class="ui-dg-header" innerhtml.bind='col.getTitle()'></span>
      <span class="ui-filter" if.bind="col.filter"><ui-glyph glyph="ui-funnel"></ui-glyph></span>
      <span class="ui-sort \${col.dataId==sortColumn ? sortOrder:''}" if.bind="col.sortable"></span>
      <span class="ui-resizer" if.bind="col.resize" mousedown.trigger="resizeColumn($event,col,cols[$index+1])"></span>
    </div></td>
    <td class="ui-expander"><div><span class="ui-dg-header">&nbsp;</span></div></td>
  </tr></thead>
</table>
</div>
<div class="ui-dg-wrapper" ref="scroller" scroll.trigger="scrolling() & debounce:1">
<table width.bind="calculateWidth(cols,resizing)" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tbody>
    <tr if.bind="!virtual" class="\${$even?'even':'odd'}" as-element="ui-dg-row" repeat.for="record of paged" click.delegate="fireSelect($parent.selected=record)" 
      class="\${$parent.selected==record?'ui-selected':''}"></tr>
  
    <tr if.bind="virtual" class="\${$even?'even':'odd'}" as-element="ui-dg-row" virtual-repeat.for="record of paged" click.delegate="fireSelect($parent.selected=record)" 
      class="\${$parent.selected==record?'ui-selected':''}"></tr>

    <tr class="filler"><td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>&nbsp;</div></td><td class="ui-expander"><div>&nbsp;</div></td></tr>
  </tbody>
</table></div>
<div>
<table ref="dgFoot" width.bind="tableWidth" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  
  <tfoot if.bind="summaryRow && data && data.length!=0"><tr>
    <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}"><div innerhtml.bind='col.getSummary(summaryRow, filtered)'></div></td>
    <td class="ui-expander"><div>&nbsp;</div></td>
  </tr></tfoot>
</table>
</div>
<div class="ui-dg-loader" if.bind="isBusy">
  <div class="ui-loader-div">
    <ui-glyph class="ui-anim-loader" glyph="ui-loader"></ui-glyph>
  </div>
</div></template>`)
@customElement('ui-datagrid')
export class UIDatagrid {
  constructor(public element: Element) {
    this.virtual = element.hasAttribute('virtual');
    if (element.hasAttribute('auto-height')) this.element.classList.add('ui-auto-size');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.columnsChanged(this.columns);
    this.dataChanged(this.data);
    if (this.pager) {
      if (!(this.pager instanceof UIPager)) throw new Error('Pager must be instance of UIPager');
      this.obPageChange = UIEvent.observe(this.pager, 'page').subscribe(() => this.makePage());
    }
  }
  attached() {
    this.scrolling();
  }
  detached() {
    if (this.obPageChange) this.obPageChange.dispose();
  }
  unbind() { }
  // end aurelia hooks

  @children('ui-dg-column,ui-dg-button,ui-dg-link') columns;

  @bindable() data = [];
  @bindable() loaded = true;
  @bindable() summaryRow = false;
  @bindable() sortColumn = '';
  @bindable() sortOrder = '';

  @bindable() pager;
  @bindable() perPage = 50;

  private cols = [];
  private paged = [];
  private filtered = [];
  private tableWidth;

  private virtual = false;
  private isBusy = false;
  private obPageChange;

  columnsChanged(newValue) {
    this.cols = _.sortBy(this.columns, 'locked');
  }

  dataChanged(newValue) {
    UIEvent.queueTask(() => {
      if (this.pager) {
        this.pager.page = 0;
        this.pager.totalPages = Math.ceil(this.data.length / this.perPage);
      }
      this.filter();
      this.scrolling();
    });
  }

  dgHead;
  dgFoot;
  scroller;
  private scrolling() {
    this.dgHead.style.transform = `translateX(-${this.scroller.scrollLeft}px)`;
    if (this.dgFoot) this.dgFoot.style.transform = this.dgHead.style.transform;
  }
  private filter() {
    this.filtered = this.data;
    this.makePage();
  }
  private makePage() {
    this.isBusy = true;
    UIEvent.queueTask(() => {
      let data = _.orderBy(this.filtered, [this.sortColumn, 'ID', 'id'], [this.sortOrder, this.sortOrder, this.sortOrder]);
      if (this.pager) {
        data = _.slice(data, this.pager.page * this.perPage, (this.pager.page * this.perPage) + this.perPage);
      }
      this.paged = data;
      this.loaded = true;
      UIEvent.queueTask(() => this.isBusy = false);
    });
  }
  private doSort(col) {
    if (!col.sortable) return;
    if (this.sortColumn != col.dataId) this.sortOrder = 'asc';
    if (this.sortColumn == col.dataId) this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
    this.sortColumn = col.dataId;
    UIEvent.queueTask(() => this.makePage());
  }

  private calculateWidth(cols) {
    let w = 0;
    _.forEach(cols, c => { c.left = w; w += c.getWidth(); });
    return (this.tableWidth = (w + 20) + 'px');
  }

  private fireSelect(record) {
    UIEvent.fireEvent('rowselect', this.element, ({ record }));
  }

  move;
  stop;
  diff;
  startX;
  ghost;
  colNext;
  colResize;
  resizing = false;
  resizeColumn(evt, col, next) {
    if (evt.button != 0) return true;
    this.diff = 0;
    this.colResize = col;
    this.colNext = next;
    this.resizing = true;
    this.startX = (evt.x || evt.clientX);
    this.ghost.style.left = (col.left + parseInt(col.width) - (col.locked == 0 ? 0 : this.scroller.scrollLeft)) + 'px';
    document.addEventListener('mouseup', this.stop = evt => this.resizeEnd(evt));
    document.addEventListener('mousemove', this.move = evt => this.resize(evt));
  }
  resize(evt) {
    var x = (evt.x || evt.clientX) - this.startX;
    if (x < 0 && (parseInt(this.colResize.width) + this.diff) <= (this.colResize.minWidth || 80)) return;
    if (x > 0 && (parseInt(this.colResize.width) + this.diff) >= (500)) return;

    this.startX = (evt.x || evt.clientX);
    this.diff += x;
    this.ghost.style.left = (parseInt(this.ghost.style.left) + x) + 'px';
  }
  resizeEnd(evt) {
    this.resizing = false;
    if (this.colNext) this.colNext.left += this.diff;
    this.colResize.width = (parseInt(this.colResize.width) + this.diff);
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('mouseup', this.stop);
  }
}

@containerless()
@customElement('ui-dg-empty')
@inlineView(`<template><div slot="dg-empty"><slot></slot></div></template>`)
export class UIDGEmpty { }

@autoinject()
@inlineView(`<template class="ui-pager">
  <a class="pg-first \${page==0?'disabled':''}" click.trigger="fireChange(page=0)"><ui-glyph glyph="ui-\${style}-double-left"></ui-glyph></a>
  <a class="pg-prev \${page==0?'disabled':''}" click.trigger="fireChange(page=page-1)" click.trigger="fireChange(page=totalPages)"><ui-glyph glyph="ui-\${style}-left"></ui-glyph></a>
  <span class="pg-input">\${page+1} of \${totalPages}</span>
  <a class="pg-next \${page+1>=totalPages?'disabled':''}" click.trigger="fireChange(page=page+1)"><ui-glyph glyph="ui-\${style}-right"></ui-glyph></a>
  <a class="pg-last \${page+1>=totalPages?'disabled':''}" click.trigger="fireChange(page=totalPages-1)"><ui-glyph glyph="ui-\${style}-double-right"></ui-glyph></a>
</template>`)
@customElement('ui-pager')
export class UIPager {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable({ defaultBindingMode: bindingMode.twoWay }) page = 0;

  @bindable() style = "chevron";
  @bindable() totalPages = 1;

  fireChange() {
    UIEvent.fireEvent('change', this.element, this.page);
  }
}

@autoinject()
@inlineView(`<template class="ui-filter"></template>`)
@customElement('ui-dg-filter')
export class UIDGFilter {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks
}