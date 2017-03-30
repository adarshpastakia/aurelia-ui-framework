//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';

@autoinject()
@inlineView(`<template class="ui-toolbar"><slot></slot></template>`)
@customElement('ui-toolbar')
export class UIToolbar {
  constructor(public element: Element) {
    if (element.hasAttribute('dark')) element.classList.add('dark');
    if (element.hasAttribute('light')) element.classList.add('light');
    if (element.hasAttribute('primary')) element.classList.add('primary');
    if (element.hasAttribute('secondary')) element.classList.add('secondary');
    if (element.hasAttribute('info')) element.classList.add('info');
    if (element.hasAttribute('danger')) element.classList.add('danger');
    if (element.hasAttribute('success')) element.classList.add('success');
    if (element.hasAttribute('warning')) element.classList.add('warning');

    if (element.hasAttribute('start')) element.classList.add('ui-start');
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks
}

@autoinject()
@inlineView(`<template class="ui-divider"></template>`)
@customElement('ui-divider')
export class UIDivider {
  constructor(public element: Element) { }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks
}

@autoinject()
@inlineView(`<template class="ui-statsbar"><slot></slot></template>`)
@customElement('ui-statsbar')
export class UIStatsbar {
  constructor(public element: Element) {
    if (element.hasAttribute('small')) element.classList.add('ui-small');
    if (element.hasAttribute('vertical')) element.classList.add('ui-vertical');

    if (element.hasAttribute('dark')) element.classList.add('dark');
    if (element.hasAttribute('light')) element.classList.add('light');
    if (element.hasAttribute('muted')) element.classList.add('muted');
    if (element.hasAttribute('primary')) element.classList.add('primary');
    if (element.hasAttribute('secondary')) element.classList.add('secondary');
    if (element.hasAttribute('info')) element.classList.add('info');
    if (element.hasAttribute('danger')) element.classList.add('danger');
    if (element.hasAttribute('success')) element.classList.add('success');
    if (element.hasAttribute('warning')) element.classList.add('warning');

    if (element.hasAttribute('dark-bg')) element.classList.add('dark-bg');
    if (element.hasAttribute('light-bg')) element.classList.add('light-bg');
    if (element.hasAttribute('primary-bg')) element.classList.add('primary-bg');
    if (element.hasAttribute('secondary-bg')) element.classList.add('secondary-bg');
    if (element.hasAttribute('info-bg')) element.classList.add('info-bg');
    if (element.hasAttribute('danger-bg')) element.classList.add('danger-bg');
    if (element.hasAttribute('success-bg')) element.classList.add('success-bg');
    if (element.hasAttribute('warning-bg')) element.classList.add('warning-bg');
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks
}

@autoinject()
@inlineView(`<template class="ui-stat"><ui-glyph glyph.bind="glyph" if.bind="glyph"></ui-glyph>
  <div class="ui-stat-value"><slot></slot><div class="ui-stat-label" innerhtml.bind="label" if.bind="label"></div></div></template>`)
@customElement('ui-stat')
export class UIStat {
  constructor(public element: Element) {
    if (element.hasAttribute('dark')) element.classList.add('dark');
    if (element.hasAttribute('light')) element.classList.add('light');
    if (element.hasAttribute('muted')) element.classList.add('muted');
    if (element.hasAttribute('primary')) element.classList.add('primary');
    if (element.hasAttribute('secondary')) element.classList.add('secondary');
    if (element.hasAttribute('info')) element.classList.add('info');
    if (element.hasAttribute('danger')) element.classList.add('danger');
    if (element.hasAttribute('success')) element.classList.add('success');
    if (element.hasAttribute('warning')) element.classList.add('warning');

    if (element.hasAttribute('dark-bg')) element.classList.add('dark-bg');
    if (element.hasAttribute('light-bg')) element.classList.add('light-bg');
    if (element.hasAttribute('primary-bg')) element.classList.add('primary-bg');
    if (element.hasAttribute('secondary-bg')) element.classList.add('secondary-bg');
    if (element.hasAttribute('info-bg')) element.classList.add('info-bg');
    if (element.hasAttribute('danger-bg')) element.classList.add('danger-bg');
    if (element.hasAttribute('success-bg')) element.classList.add('success-bg');
    if (element.hasAttribute('warning-bg')) element.classList.add('warning-bg');
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable() glyph = '';
  @bindable() label = '';
}
