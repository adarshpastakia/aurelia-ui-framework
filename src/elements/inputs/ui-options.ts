//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, inlineView } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";

@autoinject()
@inlineView('<template class="ui-input-group ui-option-group cols-\${cols}"><slot name="inputLabel"></slot><div class="ui-group-wrapper" change.trigger="changed($event)"><slot></slot></div></template>')
@customElement('ui-option-group')
export class UIOptionGroup {
  constructor(public element: Element) {
    if (element.hasAttribute('vertical')) element.classList.add('ui-vertical');
    this.name = "ui-optgroup-" + (UIOptionGroup.seed++);
  }

  bind(bindingContext: Object, overrideContext: Object) {
    this.valueChanged(this.value);
  }
  attached() {
    let els = this.element.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < els.length; i++)els[i]['name'] = this.name;
  }

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
  <ui-glyph glyph.bind="checked?'glyph-check-on':'glyph-check-off'"></ui-glyph>
  <label for.bind="for" class="ui-option-label"><slot></slot></label></template>`)
@customElement('ui-checkbox')
export class UICheckbox {
  constructor(public element: Element) {
    this.for = 'ui-checkbox-' + (UICheckbox.seed++);
  }

  bind(bindingContext: Object, overrideContext: Object) {
    this.disabledChanged(this.disabled);
    this.checked = this.checked || this.element.hasAttribute('checked');
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay }) checked = false;

  @bindable() disabled = false;

  static seed = 1;
  private for = '';
  isDisabled = false;

  disable(b) {
    this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
  }
  disabledChanged(newValue) {
    this.disable(this.disabled = !!newValue);
  }
}

@autoinject()
@inlineView(`<template class="ui-option ui-radio"><input type="radio" name="\${name}" id.bind="for" value.bind="value"
  disabled.bind="disabled" checked.bind="checked" change.trigger="changed($event)"/>
  <ui-glyph class="off" glyph="glyph-radio-off"></ui-glyph><ui-glyph class="on" glyph="glyph-radio-on"></ui-glyph>
  <label for.bind="for" class="ui-option-label"><slot></slot></label></template>`)
@customElement('ui-radio')
export class UIRadio {
  constructor(public element: Element) { this.for = 'ui-radio-' + (UIRadio.seed++); }

  bind(bindingContext: Object, overrideContext: Object) {
    this.disabledChanged(this.disabled);
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay }) checked = false;

  @bindable() name = '';
  @bindable() value = '';
  @bindable() disabled = false;

  static seed = 1;
  private for = '';
  isDisabled = false;

  disable(b) {
    this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
  }
  disabledChanged(newValue) {
    this.disable(this.disabled = !!newValue);
  }

  changed($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    return UIEvent.fireEvent('change', this.element, this.value);
  }
}

@autoinject()
@inlineView(`<template class="ui-option ui-switch-control">
<div class="ui-switch" css.bind="{width: size}">
  <input class="ui-switch-input" type="checkbox" id.bind="for" disabled.bind="disabled" checked.bind="checked" change.trigger="fireChange($event)"/>
  <label class="ui-switch-inner" for.bind="for" data-on="\${onLabel}" data-off="\${offLabel}"></label>
  <div class="ui-switch-handle"></div>
</div><label class="ui-option-label" for.bind="for"><slot></slot></label>
</template>`)
@customElement('ui-switch')
export class UISwitch {
  constructor(public element: Element) {
    this.for = 'ui-switch-' + (UISwitch.seed++);
  }

  bind(bindingContext: Object, overrideContext: Object) {
    this.checked = this.checked || this.element.hasAttribute('checked') || (this.value == this.onValue);
    this.value = !!(this.checked) ? this.onValue : this.offValue;
    this.disabledChanged(this.disabled);
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay }) checked: any = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value: any = '';

  @bindable() size = 'auto';
  @bindable() class = '';
  @bindable() onLabel = 'on';
  @bindable() offLabel = 'off';
  @bindable() onValue = true;
  @bindable() offValue = false;
  @bindable() disabled = false;

  static seed = 1;
  private for = '';
  isDisabled = false;

  checkedChanged(newValue) {
    this.value = newValue ? this.onValue : this.offValue;
  }
  valueChanged(newValue) {
    this.checked = newValue === this.onValue;
  }

  disable(b) {
    this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
  }
  disabledChanged(newValue) {
    this.disable(this.disabled = !!newValue);
  }

  private fireChange($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    this.value = this.checked ? this.onValue : this.offValue;
    return UIEvent.fireEvent('change', this.element, this.value);
  }
}
