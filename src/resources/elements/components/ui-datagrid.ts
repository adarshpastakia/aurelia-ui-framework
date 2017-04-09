//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM } from 'aurelia-framework';
import { UIFormat } from "../../utils/ui-format";
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import { BaseDataSource, UILocalDS } from "../../data/ui-data-source";
import * as _ from "lodash";

@inlineView(`<template><tr ref="row" class="level-\${level} \${record.isOpen?'ui-expanded':''} \${parent.selected==record?'ui-selected':''}" dblclick.delegate="parent.setEditMode(record,col)"  click.delegate="parent.fireSelect(parent.selected = record )">
  <td class="ui-expander" css="paddind-left:\${level}0px" if.bind="parent.handleSize>0">
    <div><a if.bind="record.subdata" click.trigger="expand($event)"><ui-glyph glyph.bind="record.isOpen?'glyph-icon-minus':'glyph-icon-plus'"></ui-glyph></a></div>
  </td>
  
  <td class="\${col.locked==0?'ui-locked':''} \${col.align} ui-cell-\${col.dataId}"  css.bind="{left: col.left+'px'}" repeat.for="col of parent.cols" col.bind="col" parent.bind="parent" record.bind="record" level.bind="level" as-element="ui-dg-cell"></td>

  <td class="filler"><div>&nbsp;</div></td></tr>

  <ui-dg-row containerless if.bind="record.isOpen" level.bind="level+1" parent.bind="parent"
    record.bind="rec" parentRecord.bind="record" repeat.for="rec of getSubdata()"  class="\${$last?'ui-last-inner':''}">
  </ui-dg-row>
</template>`)

@customElement('ui-dg-row')
export class UIDgRow {
  row;
  @bindable() level = 0;
  @bindable() record;
  @bindable() parent;
  @bindable() parentRecord;

  expand(evt) {
    this.record.isOpen = !this.record.isOpen;
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  }
  getSubdata() {
    if (isFunction(this.record.subdata)) return this.record.subdata(this.record);
    return this.record.subdata;
  }
}

@autoinject()
@inlineView(`<template class="ui-datagrid"><div class="ui-hidden"><slot></slot></div>
<div show.bind="resizing" ref="ghost" class="ui-dg-ghost"></div>
<div show.bind="store.isEmpty" class="ui-dg-empty"><slot name="dg-empty"></slot></div>
<div>
<table ref="dgHead" width.bind="tableWidth" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col width="\${handleSize}" if.bind="handleSize>0"/>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <thead><tr>
    <td class="ui-expander" if.bind="handleSize>0"><div>&nbsp;</div></td>
    <td repeat.for="col of cols" mouseup.trigger="store.sort(col.dataId, (col.dataId==store.sortBy&&store.orderBy=='asc')?'desc':'asc')" class="\${col.sortable?'ui-sortable':''} \${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>
      <span class="ui-dg-header" innerhtml.bind='col.getTitle()'></span>
      <span class="ui-filter" if.bind="col.filter"><ui-glyph glyph="glyph-funnel"></ui-glyph></span>
      <span class="ui-sort \${col.dataId==sortColumn ? sortOrder:''}" if.bind="col.sortable"></span>
      <span class="ui-resizer" if.bind="col.resize" mousedown.trigger="resizeColumn($event,col,cols[$index+1])"></span>
    </div></td>
    <td class="filler"><div><span class="ui-dg-header">&nbsp;</span></div></td>
  </tr></thead>
</table>
</div>
<div class="ui-dg-wrapper" ref="scroller" scroll.trigger="scrolling() & debounce:1">
<table width.bind="calculateWidth(cols,resizing)" css.bind="{'table-layout': tableWidth?'fixed':'auto' }" ref="mainTable">
  <colgroup>
    <col width="\${handleSize}" if.bind="handleSize>0"/>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tbody if.bind="!virtual" class="\${$even?'even':'odd'}" parent.bind="$parent"
    as-element="ui-dg-row" record.bind="record" repeat.for="record of store.data">
  </tbody>
  <tbody if.bind="virtual" class="\${$even?'even':'odd'}" parent.bind="$parent"
    as-element="ui-dg-row" record.bind="record" virtual-repeat.for="record of store.data">
  </tbody>
</table>
<table width.bind="tableWidth" class="filler" css.bind="{'table-layout': tableWidth?'fixed':'auto', height:((scroller.offsetHeight<mainTable.offsetHeight?0:scroller.offsetHeight-mainTable.offsetHeight)+'px') }">
  <colgroup>
    <col width="\${handleSize}" if.bind="handleSize>0"/>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tbody class="odd"><tr class="filler">
    <td class="ui-expander" if.bind="handleSize>0"><div>&nbsp;</div></td>
    <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>&nbsp;</div></td>
    <td class="filler"><div>&nbsp;</div></td>
  </tr></tbody>
</table></div>
<div>
<table ref="dgFoot" width.bind="tableWidth" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col width="\${handleSize}" if.bind="handleSize>0"/>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tfoot if.bind="summaryRow"><tr>
    <td class="ui-expander" if.bind="handleSize>0"><div>&nbsp;</div></td>
    <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}"><div innerhtml.bind='col.getSummary(summaryRow, store.data)'></div></td>
    <td class="filler"><div>&nbsp;</div></td>
  </tr></tfoot>
</table>
</div>
<div class="ui-dg-loader" if.bind="store.isLoading">
  <div class="ui-loader-div">
    <ui-glyph class="ui-anim-loader" glyph="glyph-loader"></ui-glyph>
  </div>
</div></template>`)
@customElement('ui-datagrid')
export class UIDatagrid {
  constructor(public element: Element) {
    this.virtual = element.hasAttribute('virtual');
    if (!element.hasAttribute('scroll')) this.element.classList.add('ui-auto-size');
    if (!element.hasAttribute('row-expander')) this.handleSize = 0;
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.columnsChanged(this.columns);
    if (this.pager) {
      if (!(this.pager instanceof UIPager)) throw new Error('Pager must be instance of UIPager');
      this.obPageChange = UIEvent.observe(this.pager, 'page').subscribe(pg => this.store.loadPage(pg));
    }
    if (!(this.store instanceof BaseDataSource))
      this.store = new UILocalDS(this.store);

    // this.obDataChange = UIEvent.observe(this.store, 'data').subscribe(data => this.store.loadPage(pg));
  }
  attached() {
    this.scrolling();
    UIEvent.queueTask(() => (!this.store.isLoaded ? this.store.fetchData() : null));
  }
  detached() {
    if (this.obPageChange) this.obPageChange.dispose();
  }
  // unbind() { }
  // end aurelia hooks

  @children('ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph') columns;

  @bindable() store;
  @bindable() pager;
  @bindable() summaryRow = false;


  private observerDisposer;
  private observer;
  private cols = [];
  private tableWidth;

  private virtual = false;
  private isBusy = false;
  private obDataChange;
  private obPageChange;
  private handleSize = 30;



  columnsChanged(newValue) {
    this.cols = _.sortBy(this.columns, 'locked');
  }

  storeChanged(newValue) {
    if (!(newValue instanceof BaseDataSource))
      this.store = new UILocalDS(newValue);
  }

  /********inline edit implementations***********/

  @bindable() recid = "id"; //sets the primary key name of the record. If not set, it assumes "id"

  editingRecord; //stores a reference to the current editing record
  isEditing = false; //stores the row state


  setEditMode(record) {
    this.editingRecord = record;
    record.isEditing = true;
  }

 pushChanges(record){
   this.store.pushChanges(record);
 }

 undoChanges(record){
    this.store.undoChanges(record);
 }
 getChanges(){
   return this.store.getChanges();
 }
 commit(){
   this.store.commit().then(()=>{
    let elements = this.element.querySelectorAll('.ui-value-changed');
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('ui-value-changed');
    }
    if (this.editingRecord) {
      this.editingRecord.isEditing = false;
    }
   });
   
 }

  /********end inline edit implementations***********/


  dgHead;
  dgFoot;
  scroller;
  selected;
  private scrolling() {
    this.dgHead.style.transform = `translateX(-${this.scroller.scrollLeft}px)`;
    if (this.dgFoot) this.dgFoot.style.transform = this.dgHead.style.transform;
  }
  private doSort(col) {
    if (!col.sortable) return;
  }

  private calculateWidth(cols) {
    let w = this.handleSize;
    _.forEach(cols, c => { c.left = w; w += c.getWidth(); });
    return (this.tableWidth = (w + 20) + 'px');
  }

  private fireSelect(record) {
    this.selected = record;
    //convenience method to exit the edit mode when another row is selected...
    if (this.editingRecord && record != this.editingRecord) {
      this.editingRecord.isEditing = false;
    }
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
