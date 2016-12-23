// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIFormat} from "../../utils/ui-format";
import {UIEvent} from "../../utils/ui-event";
import {UIUtils} from "../../utils/ui-utils";

@autoinject()
@inlineView(`<template class="ui-datagrid"><div class="ui-hidden"><slot></slot></div>
<div show.bind="resizing" ref="ghost" class="ui-dg-ghost"></div>
<div show.bind="!data || data.length==0" class="ui-dg-empty"><slot name="dg-empty"></slot></div>
<div class="ui-dg-wrapper" ref="scroller">
<table width.bind="calculateWidth(cols,resizing)" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tbody>
    <tr repeat.for="record of data" click.delegate="fireSelect($parent.selected=record)" class="\${$parent.selected==record?'ui-selected':''}">
      <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}">
      <div if.bind="col.type=='normal'"><span class="\${col.class}" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>
      <div if.bind="col.type=='link'"><a class="ui-link \${col.class} \${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}" click.trigger="col.fireClick($event,record[col.dataId],record)"><ui-glyph glyph.bind="col.getGlyph(record[col.dataId],record)" if.bind="col.glyph"></ui-glyph> <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></a></div>
      <div if.bind="col.type=='button'" class="btn-fix"><ui-button click.trigger="col.fireClick($event,record[col.dataId],record)" theme.bind="col.getTheme(record[col.dataId],record)" small square glyph.bind="col.getGlyph(record[col.dataId],record)" disabled.bind="col.isDisabled(record[col.dataId],record)" dropdown.bind="dropdown" menuopen.trigger="col.fireMenuOpen($event, record)"><span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></ui-button></div>
      </td>
      <td class="ui-expander"><div>&nbsp;</div></td>
    </tr>
    
    <tr><td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>&nbsp;</div></td><td class="ui-expander"><div>&nbsp;</div></td></tr>
  </tbody>
  <thead ref="dgHead"><tr>
    <td repeat.for="col of cols" click.trigger="doSort(col)" class="\${col.sortable?'ui-sortable':''} \${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>
      <span class="ui-dg-header" innerhtml.bind='col.getTitle()'></span>
      <span class="ui-sort \${col.dataId==sortColumn ? sortOrder:''}" if.bind="col.sortable"></span>
      <span class="ui-resizer" if.bind="col.resize" mousedown.trigger="resizeColumn($event,col,cols[$index+1])"></span>
    </div></td>
    <td class="ui-expander"><div><span class="ui-dg-header">&nbsp;</span></div></td>
  </tr></thead>
  <tfoot if.bind="summaryRow && data && data.length!=0" ref="dgFoot"><tr>
    <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}"><div innerhtml.bind='col.getSummary(summaryRow, data)'></div></td>
    <td class="ui-expander"><div>&nbsp;</div></td>
  </tr></tfoot>
</table></div></template>`)
@customElement('ui-datagrid')
export class UIDatagrid {
  constructor(public element: Element) {
    if (element.hasAttribute('auto-height')) this.element.classList.add('ui-auto-size');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.columnsChanged(this.columns);
  }
  attached() {
    this.scrolling();
  }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @children('ui-dg-column,ui-dg-button,ui-dg-link') columns;

  @bindable() data = [];
  @bindable() summaryRow = false;
  @bindable() sortColumn = '';
  @bindable() sortOrder = '';

  private cols = [];
  private tableWidth;

  columnsChanged(newValue) {
    this.cols = _.sortBy(this.columns, 'locked');
  }

  dataChanged(newValue) {
    UIEvent.queueTask(() => {
      this.data = _.orderBy(this.data, [this.sortColumn, 'ID', 'id'], [this.sortOrder, this.sortOrder, this.sortOrder]);
      this.scrolling();
    });
  }

  dgHead;
  dgFoot;
  scroller;
  private scrolling() {
    // let x = this.scroller.scrollTop - (this.dgFoot.offsetTop + this.dgFoot.offsetHeight - this.scroller.offsetHeight);
    // this.dgHead.style.transform = `translateY(${this.scroller.scrollTop}px)`;
    // this.dgFoot.style.transform = `translateY(${x > 0 ? 0 : x}px)`;
  }
  private doSort(col) {
    if (!col.sortable) return;
    if (this.sortColumn != col.dataId) this.sortOrder = 'asc';
    if (this.sortColumn == col.dataId) this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
    this.sortColumn = col.dataId;
    UIEvent.queueTask(() => this.data = _.orderBy(this.data, [this.sortColumn, 'ID', 'id'], [this.sortOrder, this.sortOrder, this.sortOrder]));
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

@autoinject()
@containerless()
@inlineView(`<template><div slot="dg-empty"><slot></slot></div></template>`)
@customElement('ui-dg-empty')
export class UIDGEmpty {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks
}

export class UIDataColumn {
  constructor(public element: Element) {
    this.resize = element.hasAttribute('resizeable');
    this.sortable = element.hasAttribute('sortable');
    this.locked = element.hasAttribute('locked') ? 0 : 1;

    //alignment
    if (element.hasAttribute('center')) this.align = 'ui-text-center';
    else if (element.hasAttribute('end')) this.align = 'ui-text-end';

    if (element.hasAttribute('age')) this.dataType = 'age';
    else if (element.hasAttribute('date')) this.dataType = 'date';
    else if (element.hasAttribute('time')) this.dataType = 'time';
    else if (element.hasAttribute('datetime')) this.dataType = 'datetime';
    else if (element.hasAttribute('fromnow')) this.dataType = 'fromnow';
    else if (element.hasAttribute('number')) this.dataType = 'number';
    else if (element.hasAttribute('currency')) this.dataType = 'currency';
    else if (element.hasAttribute('percent')) this.dataType = 'percent';
    else if (element.hasAttribute('exrate')) this.dataType = 'exrate';

  }

  dataId;
  width;
  minWidth;

  value;
  display;
  summary;

  format;
  symbol;
  dataType = 'text';
  align = 'ui-text-start';

  left = 0;
  locked = 1;
  resize = false;
  sortable = false;

  getWidth(tw) {
    this.width = convertToPx(this.width || this.minWidth || 250);
    tw += this.width;
    return this.width;
  }
  getTitle() {
    return this.element.innerHTML;
  }
  getValue(value, record) {
    return this.processValue(value, record) || '&nbsp;';
  }
  processValue(value, record) {
    let retVal = '';
    // let value = record[this.dataId];
    if (isFunction(this.value)) value = this.value(({ value, record }));
    if (isFunction(this.display))
      retVal = this.display(({ value, record })) || '';
    else {
      switch (this.dataType) {
        case 'age': retVal = UIFormat.age(value); break;
        case 'date': retVal = UIFormat.date(value, this.format); break;
        case 'time': retVal = UIFormat.time(value, this.format); break;
        case 'datetime': retVal = UIFormat.datetime(value, this.format); break;
        case 'fromnow': retVal = UIFormat.fromNow(value); break;
        case 'number': retVal = UIFormat.number(value, this.format); break;
        case 'currency': retVal = UIFormat.currency(value, record[this.symbol] || this.symbol || '$', this.format); break;
        case 'percent': retVal = UIFormat.percent(value); break;
        case 'exrate': retVal = UIFormat.exRate(value); break;
        default: retVal = value; break;
      }
    }
    return retVal;
  }

  getSummary(summaryRow, data) {
    if (!this.summary) return '&nbsp;';
    let retVal: any = '', symbol = '';
    // let value = record[this.dataId];
    if (_.isObject(summaryRow)) {
      retVal = summaryRow[this.dataId];
      symbol = summaryRow[this.symbol];
    }
    else if (isFunction(this.summary))
      retVal = this.summary({ data });
    else {
      switch (this.summary) {
        case 'sum': retVal = _.sumBy(data, this.dataId); break;
        case 'avg': retVal = _['meanBy'](data, this.dataId); break;
        default: return this.summary;
      }
    }
    if (isFunction(this.display))
      retVal = this.display(({ value: retVal, record: summaryRow, forSummary: true })) || '&nbsp;';
    else {
      switch (this.dataType) {
        // case 'age': retVal = UIFormat.age(retVal); break;
        // case 'date': retVal = UIFormat.date(retVal, this.format); break;
        // case 'time': retVal = UIFormat.time(retVal, this.format); break;
        // case 'datetime': retVal = UIFormat.datetime(retVal, this.format); break;
        // case 'fromnow': retVal = UIFormat.fromNow(retVal); break;
        case 'number': retVal = UIFormat.number(retVal, this.format); break;
        case 'currency': retVal = UIFormat.currency(retVal, symbol || this.symbol || '$', this.format); break;
        case 'percent': retVal = UIFormat.percent(retVal); break;
        case 'exrate': retVal = UIFormat.exRate(retVal); break;
      }
    }
    if (this.summary == 'avg') retVal = '<small>avg.</small> ' + retVal;
    return retVal;
  }
}

@autoinject()
@inlineView(`<template><slot></slot></template>`)
@customElement('ui-dg-column')
export class UIDGColumn extends UIDataColumn {
  type = 'normal';
  constructor(public element: Element) { super(element); }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() value;
  @bindable() display;
  @bindable() class = '';
  @bindable() summary = '';

  @bindable() symbol;
  @bindable() format;
}

@autoinject()
@inlineView(`<template><slot></slot></template>`)
@customElement('ui-dg-link')
export class UIDGLink extends UIDataColumn {
  type = 'link';
  constructor(public element: Element) { super(element); }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() glyph;
  @bindable() label;
  @bindable() class = '';
  @bindable() disabled = null;

  isDisabled(value, record) {
    if (isFunction(this.disabled)) return this.disabled(({ value, record }));
    if (this.disabled != null) return record[this.disabled];
    return false;
  }

  getGlyph(value, record) {
    if (isFunction(this.glyph)) return this.glyph(({ value, record }));
    return record[this.glyph] || this.glyph;
  }

  getLabel(value, record) {
    if (isFunction(this.label)) return this.label(({ value, record }));
    return this.label || this.processValue(value, record) || '';
  }

  fireClick($event, value, record) {
    $event.stopPropagation();
    $event.preventDefault();
    if (this.isDisabled(value, record)) return;
    UIEvent.fireEvent('click', this.element, ({ value, record }));
    return false;
  }
}

@autoinject()
@inlineView(`<template><slot></slot></template>`)
@customElement('ui-dg-button')
export class UIDGButton extends UIDataColumn {
  type = 'button';
  constructor(public element: Element) {
    super(element);
    this.align = 'ui-text-center';
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() glyph;
  @bindable() label;
  @bindable() dropdown;
  @bindable() theme: any = 'default';
  @bindable() disabled = null;

  isDisabled(value, record) {
    if (isFunction(this.disabled)) return this.disabled(({ value, record }));
    if (this.disabled != null) return record[this.disabled];
    return false;
  }

  getGlyph(value, record) {
    if (isFunction(this.glyph)) return this.glyph(({ value, record }));
    return record[this.glyph] || this.glyph;
  }

  getLabel(value, record) {
    if (isFunction(this.label)) return this.label(({ value, record }));
    return this.label || this.processValue(value, record) || '';
  }

  getTheme(value, record) {
    if (isFunction(this.theme)) return this.theme(({ value, record }));
    return this.theme;
  }

  fireClick($event, value, record) {
    $event.stopPropagation();
    $event.preventDefault();
    if (this.isDisabled(value, record)) return;
    UIEvent.fireEvent('click', this.element, ({ value, record }));
    return false;
  }

  fireMenuOpen($event, record) {
    $event.stopPropagation();
    return UIEvent.fireEvent('menuopen', this.element, ({ record }));
  }
}

/*
<div if.bind="col.type=='switch'" class="no-padding"><ui-switch change.trigger="col.fireChange($event.detail,record)" theme.bind="col.theme" value.bind="record[col.dataId]" off-label.bind="col.offLabel" off-value.bind="col.offValue" on-label.bind="col.onLabel" on-value.bind="col.onValue" width.bind="col.width" disabled.bind="col.isDisabled(record[col.dataId],record)">\${record[col.dataId]}</ui-switch></div>

@autoinject()
@inlineView(`<template><slot></slot></template>`)
@customElement('ui-dg-switch')
export class UIDGSwitch extends UIDataColumn {
  type = 'switch';
  constructor(public element: Element) {
    super(element);
    this.align = 'ui-text-center';
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() dataId;
  @bindable() width = '4em';
  @bindable() minWidth = '4em';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  checked: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: any = '';

  @bindable() size = '4em';
  @bindable() class = '';
  @bindable() onLabel = 'on';
  @bindable() offLabel = 'off';
  @bindable() onValue = true;
  @bindable() offValue = false;
  @bindable() theme = 'default';
  @bindable() disabled = null;

  isDisabled(value, record) {
    if (isFunction(this.disabled)) return this.disabled(({ value, record }));
    if (this.disabled != null) return record[this.disabled];
    return false;
  }
  fireChange(value, record) {
    UIEvent.fireEvent('change', this.element, ({ value, record }));
  }
}
*/