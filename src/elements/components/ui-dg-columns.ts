//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customElement, bindable, bindingMode, children, inlineView, noView, DOM, TemplatingEngine, computedFrom } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";

@autoinject()
@inlineView(`<template><slot></slot></template>`)
@customElement('ui-dg-column-group')
export class UIDGColumnGroup {
  constructor(public element: Element) {
    this.locked = element.hasAttribute('locked') ? 0 : 1;
  }

  @bindable() label;
  @children('ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph') columns;

  locked = 1;
  isGroup = true;
}

@noView()
@autoinject()
@customElement('ui-dg-column')
export class UIDgColumn {
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

    this.label = element['innerText'];
  }

  @bindable() dataId;
  @bindable() value;
  @bindable() display;

  @bindable() width = '120px';
  @bindable() minWidth = '40px';
  @bindable() dataType = 'text';

  @bindable() class = '';
  @bindable() format = '';
  @bindable() summary = '';

  label = '';
  locked = 1;
  sortable = false;
  resizeable = false;
  align = 'ui-text-start';
}
