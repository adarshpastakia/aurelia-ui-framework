//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customElement, bindable, processContent, bindingMode, children, inlineView, noView, DOM, TemplatingEngine, computedFrom } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import { UIFormat } from "../../utils/ui-format";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template><slot></slot></template>`)
@customElement('ui-dg-column-group')
export class UIDGColumnGroup {
  constructor(public element: Element) {
    this.locked = element.hasAttribute('locked') ? 0 : 1;
  }

  @bindable() label;
  @children('ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph,ui-dg-tpl') columns;

  locked = 1;
  isGroup = true;
}

export class UIDataColumn {
  constructor(public element: Element) {
    this.resizeable = element.hasAttribute('resizeable');
    this.sortable = element.hasAttribute('sortable');
    this.locked = element.hasAttribute('locked') ? 0 : 1;

    if (element.hasAttribute('center')) this.align = "ui-text-center";
    if (element.hasAttribute('end')) this.align = "ui-text-end";

    if (element.hasAttribute('age')) this.dataType = 'age';
    else if (element.hasAttribute('date')) this.dataType = 'date';
    else if (element.hasAttribute('time')) this.dataType = 'time';
    else if (element.hasAttribute('datetime')) this.dataType = 'datetime';
    else if (element.hasAttribute('fromnow')) this.dataType = 'fromnow';
    else if (element.hasAttribute('number')) this.dataType = 'number';
    else if (element.hasAttribute('currency')) this.dataType = 'currency';
    else if (element.hasAttribute('percent')) this.dataType = 'percent';
    else if (element.hasAttribute('exrate')) this.dataType = 'exrate';

    if (this.headerTitle === undefined) this.headerTitle = element['innerText'];
  }

  dataId;
  value;
  display;
  tpl;

  width: any = '120px';
  minWidth = '40px';
  dataType = 'text';

  class = '';
  format = '';
  symbol = '$';
  summary = '';

  headerTitle = undefined;
  locked = 1;
  sortable = false;
  resizeable = false;
  align = 'ui-text-start';

  @computedFrom('width', 'minWidth')
  get columnWidth() {
    return convertToPx(this.width || this.minWidth || 250);
  }
  @computedFrom('minWidth')
  get columnMinWidth() {
    return convertToPx(this.minWidth || 40);
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
}

@noView()
@autoinject()
@processContent(false)
@customElement('ui-dg-tpl')
export class UIDgTplColumn extends UIDataColumn {
  type = "normal";
  constructor(public element: Element) {
    super(element);
    this.tpl = this.element.innerHTML;
    this.element.innerHTML = "";
  }

  @bindable() dataId;
  @bindable() headerTitle = '';

  @bindable() width: any = '120px';
  @bindable() minWidth = '40px';

  @bindable() class = '';
  @bindable() summary = '';

  $parent;

  bind(bindingContext) {
    this.$parent = bindingContext;
  }
}

@noView()
@autoinject()
@customElement('ui-dg-column')
export class UIDgColumn extends UIDataColumn {
  type = "normal";
  constructor(public element: Element) { super(element); }

  @bindable() dataId;
  @bindable() value;
  @bindable() display;

  @bindable() width: any = '120px';
  @bindable() minWidth = '40px';
  @bindable() dataType = 'text';

  @bindable() class = '';
  @bindable() format = '';
  @bindable() symbol = '$';
  @bindable() summary = '';
}

@noView()
@autoinject()
@customElement('ui-dg-glyph')
export class UIDGGlyph extends UIDataColumn {
  type = 'glyph';
  constructor(public element: Element) { super(element); }

  @bindable() dataId;
  @bindable() width = 32;
  @bindable() minWidth;

  @bindable() class = '';
  @bindable() label;
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

@noView()
@autoinject()
@customElement('ui-dg-link')
export class UIDGLink extends UIDataColumn {
  type = 'link';
  constructor(public element: Element) { super(element); }

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() glyph;
  @bindable() label;
  @bindable() headerTitle;
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

@noView()
@autoinject()
@customElement('ui-dg-button')
export class UIDGButton extends UIDataColumn {
  type = 'button';
  constructor(public element: Element) {
    super(element);
    this.align = 'ui-text-center';
  }

  @bindable() dataId;
  @bindable() width;
  @bindable() minWidth;

  @bindable() glyph;
  @bindable() label;
  @bindable() headerTitle;
  @bindable() dropdown;
  @bindable() buttonWidth: any = 'auto';
  @bindable() buttonTheme: any = 'default';
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
    if (isFunction(this.buttonTheme)) return this.buttonTheme(({ value, record }));
    return this.buttonTheme;
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
