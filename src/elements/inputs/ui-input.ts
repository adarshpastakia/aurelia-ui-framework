//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customElement, bindable, bindingMode, inlineView } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";

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
    this.element.classList[(this.isDisabled = this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
  }

  readonlyChanged(newValue) {
    this.element.classList[(this.readonly = !!newValue) ? 'add' : 'remove']('ui-readonly');
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
      if (getParentByClass(document.activeElement, 'ui-input-group')) return;
      this.element.classList.remove('ui-focus');
      if (el) el.classList.remove('ui-focus');
    }
    UIEvent.fireEvent(evt.type, this.element, this.value);
  }
}

@autoinject()
@inlineView(`<template class="ui-input-wrapper" css.bind="{width: width}"><div role="input" class="ui-input-control" dir.bind="dir"><slot></slot>
  <span class="ui-error" if.bind="errors"><ui-glyph glyph="glyph-invalid"></ui-glyph><ul class="ui-error-list"><li repeat.for="err of errors" innerhtml.bind="err"></li></ul></span>
  <input ref="inputEl" type.bind="type" value.bind="value" maxlength.bind="maxlength" dir.bind="dir"
    focus.trigger="fireEvent($event)" blur.trigger="fireEvent($event)" step="any"
    input.trigger="fireEvent($event)" change.trigger="fireEvent($event)"
    keypress.trigger="checkInput($event)" placeholder.bind="placeholder"
    disabled.bind="isDisabled" readonly.bind="readonly" size="1"/>
  <span class="ui-clear" if.bind="clear && value" click.trigger="clearInput()">&times;</span>
  <span class="ui-counter" if.bind="counter" innerhtml.bind="maxlength - value.length"></span></div>
  <div class="ui-input-info" if.bind="helpText" innerhtml.bind="helpText"></div>
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

  bind(bindingContext: Object, overrideContext: Object) {
    super.bind.apply(this, arguments);
    if (!isNaN(this.number)) this.numberChanged(this.number);
    if (!isNaN(this.decimal)) this.decimalChanged(this.decimal);

    //need to be in bind and not in constructor - to avoid reseting to `false` after bind
    if (this.element.hasAttribute('readonly')) this.readonly = true;
    if (this.element.hasAttribute('disabled')) this.isDisabled = this.disabled = true;
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) number;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) decimal;

  @bindable() dir = '';
  @bindable() width = 'auto';
  @bindable() errors = null;
  @bindable() maxlength = 1000;
  @bindable() disabled = false;
  @bindable() readonly = false;
  @bindable() helpText = '';
  @bindable() placeholder = '';

  private type = 'text';
  private clear = false;
  private counter = false;

  valueChanged(newValue) {
    if (this.type === 'number') {
      let num = parseFloat(newValue);
      this.decimal = this.number = isNaN(num) ? null : num;
      if (!this.number && this.number !== 0) {
        this.value = '';
      }
    }
  }

  numberChanged(newValue) {
    this.value = (!newValue && newValue !== 0) ? '' : newValue;
  }

  decimalChanged(newValue) {
    this.value = (!newValue && newValue !== 0) ? '' : newValue;
  }

  fireEvent(evt) {
    if (evt.type === 'input') {
      if (this.type === 'email') this.value = this.value.toLowerCase();
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
      return /[0-9\.\-]/.test(String.fromCharCode(code));
    }
    return true;
  }
}


@autoinject()
@inlineView(`<template class="ui-input-wrapper ui-file-input">
  <div class="ui-control-wrapper">
    <div class="ui-file-drop-zone \${dragging?'dragging':''}" ref="dropZone" click.trigger="inputEl.click()"
      dragover.trigger="dragEnter($event)" dragleave.trigger="dragExit($event)" drop.trigger="drop($event)">
    <span><i class="fi-ui-upload-white"></i> Drop files here<br/>or<br/>click to browse</span>
    </div>
    <input type="file" ref="inputEl" class="ui-file-input-el" change.trigger="fileChoose($event)" />
    <div class="ui-file-list">
      <p repeat.for="file of files" class="ui-row ui-row-h ui-nowrap ui-align-center">
      <a click.trigger="remove($index)"><ui-glyph glyph="glyph-dialog-close" class="ui-text-danger"></ui-glyph></a>
      <span class="ui-row ui-row-h ui-nowrap ui-align-center"><ui-glyph glyph="glyph-icon-file" class="ui-text-muted ui-font-large"></ui-glyph><span>\${file.name}<br/>(<small innerhtml.bind="file.size | number:'0.00b'"></small>)</span></span></p>
    </div>
  </div>
</template>`)
@customElement('ui-file')
export class UIFileInput {
  static FILE_IMAGES = 'png,jpg,jpeg,tiff';
  static FILE_DOCS = 'doc,docx,xls,xlsx,ppt,pptx,csv,rtf,txt,pdf';

  @bindable() maxFiles = 10;
  @bindable() fileTypes = '';

  constructor(public element: Element) { }

  attached() {
    this.files = [];
    this.inputEl.value = '';
    this.inputEl.draggedFiles = this.files;
  }

  inputEl;
  files = [];
  dragging = false;
  dragEnter($event) {
    this.dragging = true;
    $event.preventDefault();
    return false;
  }

  dragExit($event) {
    this.dragging = false;
  }

  drop($event) {
    this.dragging = false;
    $event.preventDefault();

    var dt = $event.dataTransfer;
    var files = dt.files;
    for (var i = 0; i < files.length; i++) {
      var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.FileTypes[files[i].type] || 'txt' }
      if (this.files.length == this.maxFiles) this.files.splice(0, 1);
      this.files.push(f);
    }
    UIEvent.fireEvent('change', this.element, this.files.length);
  }

  fileChoose(evt) {
    evt.stopPropagation();
    var files = this.inputEl.files;
    for (var i = 0; i < files.length; i++) {
      var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.FileTypes[files[i].type] || 'txt' }
      if (this.files.length == this.maxFiles) this.files.splice(0, 1);
      this.files.push(f);
    }
    UIEvent.fireEvent('change', this.element, this.files.length);
  }

  remove(index) {
    this.files.splice(index, 1);
    UIEvent.fireEvent('change', this.element, this.files.length);
  }

}
