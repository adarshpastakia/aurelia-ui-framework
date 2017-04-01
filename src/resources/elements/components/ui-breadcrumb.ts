//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@inlineView(`<template class="ui-chip"><span class="ui-chip-label" css.bind="{'background-color':color}">\${label}</span><span class="ui-chip-value"><slot></slot></span><a click.trigger="remove()" class="ui-chip-close" if.bind="canClose">&times</a></template>`)
@customElement('ui-chip')
export class UIChip {
  constructor(public element: Element) {
    if (element.hasAttribute('big')) element.classList.add('big');
    if (element.hasAttribute('small')) element.classList.add('small');

    this.canClose = element.hasAttribute('removable');
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable() id = '';
  @bindable() label = '';
  @bindable() color = '';

  private canClose = false;

  remove() {
    UIEvent.fireEvent('remove', this.element, this.id);
  }
}

@autoinject()
@inlineView(`<template class="ui-breadcrumb" crumbclicked.delegate="fireChange($event)"><slot></slot></template>`)
@customElement('ui-breadcrumb')
export class UIBreadcrumb {
  constructor(public element: Element) {
    if (element.hasAttribute('primary')) element.classList.add('ui-theme');
    if (element.hasAttribute('primary')) element.classList.add('primary');
    if (element.hasAttribute('secondary')) element.classList.add('ui-theme');
    if (element.hasAttribute('secondary')) element.classList.add('secondary');
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  private fireChange($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    if (!isEmpty($event.detail)) UIEvent.fireEvent('change', this.element, $event.detail);
    return false;
  }
}
@autoinject()
@inlineView(`<template class="ui-crumb"><a href="crumb.href || 'javascript:;'" click.trigger="fireClick($event)"><slot></slot></a></template>`)
@customElement('ui-crumb')
export class UICrumb {
  constructor(public element: Element) { }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable() id = '';
  @bindable() href = 'javascript:;';

  private fireClick($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    UIEvent.fireEvent('crumbclicked', this.element, this.id);
    return false;
  }
}
