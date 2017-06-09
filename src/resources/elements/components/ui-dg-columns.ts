//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIFormat} from "../../utils/ui-format";
import {UIEvent} from "../../utils/ui-event";
import {UIUtils} from "../../utils/ui-utils";
import * as _ from "lodash";

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
  width = 0;
  minWidth = 0;

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
    // tw += this.width;
    return this.width;
  }
  getTitle() {
    return this.element.innerHTML + '&nbsp;';
  }
  getValue(value, record) {
    return this.processValue(value, record);
  }
  processValue(value, record) {
    let retVal = '';
    // let value = record[this.dataId];
    if (isFunction(this.value)) value = this.value(({ value, record }));
    if (isFunction(this.display))
      retVal = this.display(({ value, record }));
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
    return isEmpty(retVal) ? '&nbsp;' : retVal;
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
      retVal = this.summary(data);
    else {
      switch (this.summary) {
        case 'sum': retVal = _.sumBy(data, this.dataId); break;
        case 'avg': retVal = _['meanBy'](data, this.dataId); break;
        default: return this.summary || '&nbsp;';
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
@customElement('ui-dg-column-group')
export class UIDGColumnGroup {
  constructor(public element: Element) {
    this.locked = element.hasAttribute('locked') ? 0 : 1;
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable() label;
  @children('ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph') columns;

  locked = 1;
  isGroup = true;

  getTitle() {
    return this.label + '&nbsp;';
  }
  getWidth() {
    return 'auto';
  }
}


@autoinject()
@inlineView(`<template><slot></slot></template>`)
@customElement('ui-dg-column')
export class UIDGColumn extends UIDataColumn {
  type = 'normal';
  constructor(public element: Element) { super(element); }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
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
@customElement('ui-dg-glyph')
export class UIDGGlyph extends UIDataColumn {
  type = 'glyph';
  constructor(public element: Element) { super(element); }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable() dataId;
  @bindable() width = 32;
  @bindable() minWidth;

  @bindable() class = '';
  @bindable() glyph;
  @bindable() tooltip;

  @bindable() glyphMap;
  @bindable() tooltipMap;

  getGlyph(value, record) {
    if (isFunction(this.glyph)) return this.glyph({ value, record });
    if (this.glyphMap && this.glyphMap[(value + '').toLowerCase()]) return this.glyphMap[(value + '').toLowerCase()];
    return this.glyph || value;
  }
  getTooltip(value, record) {
    if (isFunction(this.tooltip)) return this.tooltip({ value, record });
    if (this.tooltipMap && this.tooltipMap[(value + '').toLowerCase()]) return this.tooltipMap[(value + '').toLowerCase()];
    return this.tooltip || value;
  }
}

@autoinject()
@inlineView(`<template><slot></slot></template>`)
@customElement('ui-dg-link')
export class UIDGLink extends UIDataColumn {
  type = 'link';
  constructor(public element: Element) { super(element); }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() glyph;
  @bindable() label;
  @bindable() class = '';
  @bindable() show = null;
  @bindable() disabled = null;

  isDisabled(value, record) {
    if (isFunction(this.disabled)) return this.disabled(({ value, record }));
    if (this.disabled != null) return record[this.disabled];
    return false;
  }

  isVisible(value, record) {
    if (isFunction(this.show)) return this.show(({ value, record }));
    if (this.show != null) return record[this.show];
    return true;
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
    UIEvent.fireEvent('click', this.element, ({ target: $event.target, value: value, record: record }));
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
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() glyph;
  @bindable() label;
  @bindable() dropdown;
  @bindable() theme: any = 'default';
  @bindable() show = null;
  @bindable() disabled = null;

  isDisabled(value, record) {
    if (isFunction(this.disabled)) return this.disabled(({ value, record }));
    if (this.disabled != null) return record[this.disabled];
    return false;
  }

  isVisible(value, record) {
    if (isFunction(this.show)) return this.show(({ value, record }));
    if (this.show != null) return record[this.show];
    return true;
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
    UIEvent.fireEvent('click', this.element, ({ target: $event.target, value: value, record: record }));
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
