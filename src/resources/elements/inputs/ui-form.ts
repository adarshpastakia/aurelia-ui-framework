// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@customElement('ui-form')
@inlineView(`<template class="ui-form"><form validation-renderer="ui-validator" enterpressed.trigger="fireSubmit()" submit.trigger="return false"><slot></slot></form></template>`)
export class UIForm {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() {
    UIEvent.queueTask(() => {
      let el: any = this.element.querySelector('input,textarea');
      if (el !== null) el.focus();
      if (this.busy) this.busyChanged(true);
    });
  }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() busy: boolean;

  busyChanged(newValue: any) {
    let els = this.element.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list');
    _.forEach(els, el => {
      try {
        el.au.controller.viewModel.disable(isTrue(newValue));
      } catch (e) {
      }
    });
  }

  fireSubmit() {
    UIEvent.fireEvent('submit', this.element);
  }
}

@autoinject()
@inlineView('<template class="ui-fieldset"><fieldset><legend if.bind="legend"><span if.bind="!collapsable">\${legend}</span><ui-checkbox if.bind="collapsable" checked.bind="enabled">\${legend}</ui-checkbox></legend><slot></slot></fieldset></template>')
@customElement('ui-fieldset')
export class UIFieldset {
  constructor(public element: Element) {
    this.collapsable = element.hasAttribute('enabled') || element.hasAttribute('enabled.bind');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.enabled = isTrue(this.enabled);
  }
  attached() {
    this.enabledChanged(this.enabled);
  }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() legend = '';
  @bindable() enabled = true;

  private collapsable = false;

  enabledChanged(newValue: any) {
    this.element.classList[isTrue(newValue) ? 'remove' : 'add']('ui-collapse');
    let els = this.element.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list');
    _.forEach(els, el => {
      try {
        el.au.controller.viewModel.disable(isFalse(newValue));
      } catch (e) {
      }
    });
  }
}

@autoinject()
@inlineView(`<template class="ui-input-group"><slot name="inputLabel"></slot>
  <div><div class="ui-group-wrapper" css.bind="{'width':width}"><slot></slot></div><slot name="inputInfo"></slot></div></template>`)
@customElement('ui-input-group')
export class UIInputGroup {
  constructor(public element: Element) {
    if (element.hasAttribute('plain')) element.classList.add('ui-plain');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() width = 'auto';
}

@autoinject()
@containerless()
@inlineView('<template><div slot="inputInfo" class="ui-input-info \${class}"><slot></slot></div></template>')
@customElement('ui-input-info')
export class UIInputInfo {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() class = '';
}


@autoinject()
@customElement('ui-input-addon')
@inlineView(`<template class="ui-input-addon" click.trigger="focusEl()"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>`)
export class UIInputAddon {
  constructor(public element: Element) {
    if (element.hasAttribute('end')) element.classList.add('ui-end');
    else element.classList.add('ui-start');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() glyph = '';

  focusEl() {
    let el = this.element.nextElementSibling;
    if (el && el['focus']) el['focus']();
  }
}

@autoinject()
@containerless()
@inlineView('<template><label ref="label" slot="inputLabel" class="ui-input-label \${class}" for.bind="for"><slot></slot></label></template>')
@customElement('ui-input-label')
export class UIInputLabel {
  constructor(public element: Element) {
    if (element.hasAttribute('align-top')) this.class += ' ui-align-top';
    if (element.hasAttribute('required')) this.class += ' ui-required';
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() {
    if (isEmpty(this.for)) {
      let el = this.label.parentElement.querySelector('input:not([type="checkbox"]):not([type="radio"]),textarea');
      if (el) {
        if (!el.id) el.id = 'ui-input-' + (UIInputLabel.seed++);
        this.for = el.id;
      }
    }
  }
  detached() { }
  unbind() { }
  // end aurelia hooks

  static seed = 1;

  private label;

  @bindable() for = '';
  @bindable() class = '';
}