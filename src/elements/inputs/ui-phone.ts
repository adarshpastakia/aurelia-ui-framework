//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customElement, bindable, bindingMode, inlineView } from 'aurelia-framework';
import { UIBaseInput } from "./ui-input";
import { UIEvent } from "../../utils/ui-event";

@autoinject()
@inlineView(`<template class="ui-input-wrapper"><div role="input" class="ui-input-control ui-phone"><span ref="prefixEl"></span>
  <span class="ui-error" if.bind="errors"><ui-glyph glyph="glyph-invalid"></ui-glyph><ul class="ui-error-list"><li repeat.for="err of errors" innerhtml.bind="err"></li></ul></span>
  <input ref="inputEl" type="tel" dir="ltr" size="1"
    focus.trigger="fireEvent($event)" blur.trigger="fireEvent($event)"
    input.trigger="fireEvent($event)" change.trigger="fireEvent($event)"
    keypress.trigger="checkInput($event)" placeholder.bind="placeholder"
    disabled.bind="isDisabled" readonly.bind="readonly"/>
  <span class="ui-clear" if.bind="clear && value" click.trigger="clearInput()">&times;</span></div>
  <div class="ui-input-info" if.bind="helpText" innerhtml.bind="helpText"></div>
</template>`)
@customElement('ui-phone')
export class UIPhone extends UIBaseInput {
  constructor(public element: Element) {
    super();
    this.clear = element.hasAttribute('clear');

    if (this.national = element.hasAttribute('country') || element.hasAttribute('country.bind')) this.country = 'us';
  }

  bind(bindingContext: Object, overrideContext: Object) {
    super.bind.apply(this, arguments);
    this.countryChanged(this.country);
    UIEvent.queueTask(() => this.valueChanged(this.value));
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) phone;

  @bindable() errors = null;
  @bindable() country = '';
  @bindable() disabled = false;
  @bindable() readonly = false;
  @bindable() helpText = '';

  private clear = false;
  private national = false;

  private prefixEl;
  private placeholder = '';
  private ignore = false;

  valueChanged(newValue) {
    if (this.ignore) return;
    this.formatPhone(newValue);
  }

  countryChanged(newValue) {
    let ct;
    this.placeholder = PhoneLib.getExample(newValue || 'us', PhoneLib.TYPE.FIXED_LINE_OR_MOBILE, this.national);
    this.prefixEl.className = 'ui-flag ' + newValue;
    this.formatPhone(this.inputEl.value);
  }

  formatPhone(val) {
    this.ignore = true;
    this.inputEl.value = PhoneLib.formatInput(val, this.country);
    this.phone = PhoneLib.getNumberInfo(val, this.country);
    this.value = PhoneLib.format(val, this.country, PhoneLib.FORMAT.FULL);
    if (!this.national) this.prefixEl.className = 'ui-flag ' + PhoneLib.getIso2Code(val);
    setTimeout(() => this.ignore = false, 100);
  }

  fireEvent(evt) {
    if (evt.type === 'input') {
      let val = this.inputEl.value;
      let len = val.length;
      let start = evt.target.selectionStart;

      if (val == '' || val == '+') val = '';
      else if (!this.national && !(/^\+/.test(val))) val = '+' + val;
      this.formatPhone(val);
      if (len < this.inputEl.value.length) start += (this.inputEl.value.length - len);
      try { evt.target.setSelectionRange(start, start); } catch (e) { }
    }
    super.fireEvent(evt);
  }

  checkInput(evt) {
    evt.stopPropagation();
    let code = evt.keyCode || evt.which;
    if (evt.ctrlKey || evt.metaKey || evt.altKey || code == 9 || code == 8) return true;
    if (code == 13) return UIEvent.fireEvent('enterpressed', this.element);

    return /[0-9]/.test(String.fromCharCode(code));
  }
}
