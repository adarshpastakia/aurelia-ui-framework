// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";

export class UIBaseInput {
  value = '';
  inputEl;
  element;

  disabled = false;
  readonly = false;

  isDisabled = false;

  bind(bindingContext: Object, overrideContext: Object) {
    this.element['focus'] = () => this.focus();
    this.disabledChanged(this.disabled);
    this.readonlyChanged(this.readonly);
  }

  disabledChanged(newValue) {
    this.element.classList[(this.isDisabled = this.disabled = isTrue(newValue)) ? 'add' : 'remove']('ui-disabled');
  }

  readonlyChanged(newValue) {
    this.element.classList[(this.readonly = isTrue(newValue)) ? 'add' : 'remove']('ui-readonly');
  }

  disable(b) {
    this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
  }

  clearInput() {
    this.value = '';
    this.inputEl.focus();
    UIEvent.fireEvent('input', this.element, this.value);
    UIEvent.fireEvent('change', this.element, this.value);
  }

  focus() {
    this.inputEl.focus();
  }

  fireEvent(evt) {
    evt.stopPropagation();
    let el = getParentByClass(this.element, 'ui-input-group');
    if (evt.type === 'focus') {
      this.inputEl.select();
      this.element.classList.add('ui-focus');
      if (el) el.classList.add('ui-focus');
    }
    if (evt.type === 'blur') {
      this.element.classList.remove('ui-focus');
      if (el) el.classList.remove('ui-focus');
    }
    UIEvent.fireEvent(evt.type, this.element, this.value);
  }
}

@autoinject()
@inlineView(`<template class="ui-input-wrapper" css.bind="{width: width}"><div role="input" class="ui-input-control"><slot></slot>
  <span class="ui-error" if.bind="errors"><ui-glyph glyph="ui-invalid"></ui-glyph><ul class="ui-error-list"><li repeat.for="err of errors" innerhtml.bind="err"></li></ul></span>
  <input ref="inputEl" type.bind="type" value.bind="value" maxlength.bind="maxlength" dir.bind="dir"
    focus.trigger="fireEvent($event)" blur.trigger="fireEvent($event)"
    input.trigger="fireEvent($event)" change.trigger="fireEvent($event)"
    keypress.trigger="checkInput($event)" placeholder.bind="placeholder"
    disabled.bind="isDisabled" readonly.bind="readonly"/>
  <span class="ui-clear" if.bind="clear && value" click.trigger="clearInput()">&times;</span>
  <span class="ui-counter" if.bind="counter" innerhtml.bind="maxlength - value.length"></span></div>
  <div class="ui-input-info" if.bind="info" innerhtml.bind="info"></div>
</template>`)
@customElement('ui-input')
export class UIInput extends UIBaseInput {
  constructor(public element: Element) {
    super();
    this.clear = element.hasAttribute('clear');
    this.counter = element.hasAttribute('counter');

    if (element.hasAttribute('url')) this.type = 'url';
    if (element.hasAttribute('file')) this.type = 'file';
    if (element.hasAttribute('email')) this.type = 'email';
    if (element.hasAttribute('number') || element.hasAttribute('number.bind')) this.type = 'number';
    if (element.hasAttribute('decimal') || element.hasAttribute('decimal.bind')) this.type = 'number';
    if (element.hasAttribute('password')) this.type = 'password';
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    super.bind.apply(this, arguments);
    if (this.number) this.numberChanged(this.number);
    if (this.decimal) this.decimalChanged(this.decimal);
  }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) number;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) decimal;

  @bindable() dir = '';
  @bindable() width = 'auto';
  @bindable() errors = null;
  @bindable() maxlength = 99;
  @bindable() disabled = false;
  @bindable() readonly = false;
  @bindable() info = '';
  @bindable() placeholder = '';

  private type = 'text';
  private clear = false;
  private counter = false;

  private ignore = false;

  valueChanged(newValue) {
    if (this.ignore) return;
    this.ignore = true;
    this.number = isNaN(parseFloat(newValue)) ? null : parseFloat(newValue);
    this.decimal = isNaN(parseFloat(newValue)) ? null : parseFloat(newValue);
    if (this.type === 'number' && this.number === null) this.inputEl.value = this.value = '';
    setTimeout(() => this.ignore = false, 100);
  }
  numberChanged(newValue) {
    if (this.ignore) return;
    this.ignore = true;
    this.value = newValue || '';
    setTimeout(() => this.ignore = false, 100);
  }
  decimalChanged(newValue) {
    if (this.ignore) return;
    this.ignore = true;
    this.value = newValue || '';
    setTimeout(() => this.ignore = false, 100);
  }

  fireEvent(evt) {
    if (evt.type === 'input') {
      if (this.type === 'email' || this.type === 'url') this.value = this.value.toLowerCase();
    }
    super.fireEvent(evt);
  }

  checkInput(evt) {
    evt.stopPropagation();
    let code = evt.keyCode || evt.which;
    if (evt.ctrlKey || evt.metaKey || evt.altKey || code == 9 || code == 8) return true;
    if (code == 13) return UIEvent.fireEvent('enterpressed', this.element);
    if (this.type == 'email') return /[a-zA-Z0-9\@\-\.\_\&\+\$]/.test(String.fromCharCode(code));
    if (this.type == 'url') return /[a-zA-Z0-9\/\-\.\_\?\#\%\=\$\;\:\{\[\]\}\&\+]/.test(String.fromCharCode(code));
    if (this.type == 'number') {
      if (code == 45 && evt.target.value.indexOf('-') >= 0) return false;
      if (code == 46 && evt.target.value.indexOf('.') >= 0) return false;
      return /[0-9\.\-]/.test(String.fromCharCode(code));
    }
    return true;
  }
}


