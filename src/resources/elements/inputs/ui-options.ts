// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@inlineView('<template class="ui-input-group ui-option-group cols-\${cols}"><slot name="inputLabel"></slot><div class="ui-group-wrapper" change.trigger="changed($event)"><slot></slot></div></template>')
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
  @bindable() cols = 'auto';

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
@inlineView(`<template class="ui-option ui-checkbox"><input type="checkbox" id.bind="for" disabled.bind="disabled" checked.bind="checked"/>
  <span></span>
  <label for.bind="for" class="ui-option-label"><slot></slot></label></template>`)
@customElement('ui-checkbox')
export class UICheckbox {
  constructor(public element: Element) { this.for = 'ui-checkbox-' + (UICheckbox.seed++); }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.checked = isTrue(this.checked);
    this.disabledChanged(this.disabled);
  }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable({ defaultBindingMode: bindingMode.twoWay }) checked = false;

  @bindable() disabled = false;

  static seed = 1;
  private for = '';

  disabledChanged(newValue) {
    this.element.classList[(this.disabled = isTrue(newValue)) ? 'add' : 'remove']('ui-disabled');
  }
}

@autoinject()
@inlineView(`<template class="ui-option ui-radio"><input type="radio" name="\${name}" id.bind="for" value.bind="value" 
  disabled.bind="disabled" checked.bind="checked" change.trigger="changed($event)"/>
  <span></span>
  <label for.bind="for" class="ui-option-label"><slot></slot></label></template>`)
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

  @bindable() name = '';
  @bindable() value = '';
  @bindable() disabled = false;

  static seed = 1;
  private for = '';

  disabledChanged(newValue) {
    this.element.classList[(this.disabled = isTrue(newValue)) ? 'add' : 'remove']('ui-disabled');
  }

  changed($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    return UIEvent.fireEvent('change', this.element, this.value);
  }
}

@autoinject()
@inlineView(`<template class="ui-option ui-switch-control">
<div class="ui-switch \${disabled?'ui-disabled':''} \${theme}" css.bind="{width: size}">
  <input class="ui-switch-input" type="checkbox" id.bind="for" disabled.bind="disabled" checked.bind="checked" change.trigger="fireChange($event)"/>
  <label class="ui-switch-inner" for.bind="for" data-on="\${onLabel}" data-off="\${offLabel}"></label>
  <div class="ui-switch-handle"></div>
</div><label class="ui-switch-label" for.bind="for"><slot></slot></label>
</template>`)
@customElement('ui-switch')
export class UISwitch {
  constructor(public element: Element) {
    this.for = 'ui-switch-' + (UISwitch.seed++);
    if (this.element.hasAttribute('primary')) this.theme = 'primary';
    else if (this.element.hasAttribute('secondary')) this.theme = 'secondary';
    else if (this.element.hasAttribute('dark')) this.theme = 'dark';
    else if (this.element.hasAttribute('info')) this.theme = 'info';
    else if (this.element.hasAttribute('danger')) this.theme = 'danger';
    else if (this.element.hasAttribute('success')) this.theme = 'success';
    else if (this.element.hasAttribute('warning')) this.theme = 'warning';
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.checked = isTrue(this.checked) || (this.value == this.onValue);
    this.value = isTrue(this.checked) ? this.onValue : this.offValue;
    this.disabled = isTrue(this.disabled);
  }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable({ defaultBindingMode: bindingMode.twoWay }) checked: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value: any = '';

  @bindable() size = '0';
  @bindable() class = '';
  @bindable() onLabel = 'on';
  @bindable() offLabel = 'off';
  @bindable() onValue = true;
  @bindable() offValue = false;
  @bindable() disabled = false;
  @bindable() theme = 'default';

  static seed = 1;
  private for = '';

  checkedChanged(newValue) {
    this.value = newValue ? this.onValue : this.offValue;
  }
  valueChanged(newValue) {
    this.checked = newValue == this.onValue;
  }

  private fireChange($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    this.value = this.checked ? this.onValue : this.offValue;
    return UIEvent.fireEvent('change', this.element, this.value);
  }
}