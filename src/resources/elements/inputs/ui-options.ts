// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@inlineView('<template class="ui-input-group ui-option-group"><slot name="inputLabel"></slot><div class="ui-group-wrapper" change.trigger="changed($event)"><slot></slot></div></template>')
@customElement('ui-option-group')
export class UIOptionGroup {
  constructor(public element: Element) {
    if (element.hasAttribute('vertical')) element.classList.add('ui-vertical');
    this.name = "ui-optgroup-" + (UIOptionGroup.seed++);
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.valueChanged(this.value);
  }
  attached() {
    let els = this.element.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < els.length; i++)els[i]['name'] = this.name;
  }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value: any = '';

  @bindable() name = '';

  static seed = 1;

  valueChanged(newValue) {
    UIEvent.queueTask(() => {
      let opt = this.element.querySelector(`input[value="${newValue}"]`);
      if (opt != null) opt['checked'] = true;
    });
  }

  changed($event) {
    this.value = $event.detail;
  }
}

@autoinject()
@inlineView(`<template class="ui-option ui-checkbox"><input type="checkbox" id.bind="for" disabled.bind="disabled" checked.bind="checked"/><span></span>
  <label for.bind="for" class="ui-option-label"><slot></slot></label></template>`)
@customElement('ui-checkbox')
export class UICheckbox {
  constructor(public element: Element) { this.for = 'ui-checkbox-' + (UICheckbox.seed++); }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.disabledChanged(this.disabled);
  }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable({ defaultBindingMode: bindingMode.twoWay }) checked = false;

  @bindable() for = '';
  @bindable() disabled = false;

  static seed = 1;

  disabledChanged(newValue) {
    this.element.classList[(this.disabled = isTrue(newValue)) ? 'add' : 'remove']('ui-disabled');
  }
}

@autoinject()
@inlineView(`<template class="ui-option ui-radio"><input type="radio" id.bind="for" value.bind="value" 
  disabled.bind="disabled" checked.bind="checked" change.trigger="changed($event)"/>
  <span></span><label for.bind="for" class="ui-option-label"><slot></slot></label></template>`)
@customElement('ui-radio')
export class UIRadio {
  constructor(public element: Element) { this.for = 'ui-radio-' + (UIRadio.seed++); }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.disabledChanged(this.disabled);
  }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable({ defaultBindingMode: bindingMode.twoWay }) checked = false;

  @bindable() for = '';
  @bindable() value = '';
  @bindable() disabled = false;

  static seed = 1;

  disabledChanged(newValue) {
    this.element.classList[(this.disabled = isTrue(newValue)) ? 'add' : 'remove']('ui-disabled');
  }

  changed($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    return UIEvent.fireEvent('change', this.element, this.value);
  }
}