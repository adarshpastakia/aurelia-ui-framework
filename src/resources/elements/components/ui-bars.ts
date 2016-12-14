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
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks
}

@autoinject()
@inlineView(`<template class="ui-divider"></template>`)
@customElement('ui-divider')
export class UIDivider {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks
}