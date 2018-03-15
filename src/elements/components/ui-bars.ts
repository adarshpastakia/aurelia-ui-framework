//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, inlineView } from 'aurelia-framework';

@autoinject()
@inlineView(`<template class="ui-toolbar"><slot></slot></template>`)
@customElement('ui-toolbar')
export class UIToolbar {
  constructor(public element: Element) {
    if (element.hasAttribute('start')) element.classList.add('ui-start');
    if (element.hasAttribute('compact')) element.classList.add('ui-compact');
  }
}

@autoinject()
@inlineView(`<template class="ui-statsbar"><slot></slot></template>`)
@customElement('ui-statsbar')
export class UIStatsbar {
  constructor(public element: Element) {
    if (element.hasAttribute('small')) element.classList.add('ui-small');
    if (element.hasAttribute('icon-top')) element.classList.add('ui-icon-top');
    if (element.hasAttribute('icon-end')) element.classList.add('ui-icon-end');
    if (element.hasAttribute('vertical')) element.classList.add('ui-vertical');
    if (element.hasAttribute('icon-only')) element.classList.add('ui-icon-only');
  }
}

@autoinject()
@inlineView(`<template class="ui-stat"><ui-glyph glyph.bind="glyph" if.bind="glyph"></ui-glyph>
  <div><div class="ui-stat-value"><slot></slot></div><div class="ui-stat-label" innerhtml.bind="label" if.bind="label"></div></div></template>`)
@customElement('ui-stat')
export class UIStat {
  constructor(public element: Element) {

    if (element.hasAttribute('icon-end')) element.classList.add('ui-icon-end');
    if (element.hasAttribute('icon-only')) element.classList.add('ui-icon-only');
  }

  @bindable() glyph = '';
  @bindable() label = '';
}
