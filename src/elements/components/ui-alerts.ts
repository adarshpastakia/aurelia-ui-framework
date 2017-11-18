//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, inlineView, DOM } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";

@autoinject()
@customElement('ui-toast')
@inlineView(`<template class="ui-toast" click.trigger="startClose()"><div class="ui-wrapper">
  <ui-glyph glyph.bind="glyph"></ui-glyph>
  <span class="ui-message"><slot><slot></span><span class="ui-close">&times;</span>
</div></template>`)
export class UIToast {
  constructor(public element: Element) { }

  bind(bindingContext: Object, overrideContext: Object) {
    if (bindingContext) Object.assign(this, bindingContext);
    UIEvent.queueTask(() => {
      this.element.classList.add('ui-open');
      if (!isNaN(this.timeout) && parseInt(this.timeout + '') > 0) {
        setTimeout(() => this.startClose(), parseInt(this.timeout + ''));
      }
    });
  }

  @bindable() show = true;
  @bindable() glyph = '';
  @bindable() timeout = 0;

  private startClose(force?) {
    if (UIEvent.fireEvent('close', this.element) !== false) {
      this.element.classList.remove('ui-open');
      setTimeout(() => DOM.removeNode(this.element), 500);
    }
    return true;
  }
}

@autoinject()
@inlineView(`<template class="ui-alert-shim"><div class="ui-alert">
  <div class="ui-wrapper">
  <input style="position:absolute;opacity:0;" ref="focusBlock" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"/>
  <ui-glyph glyph.bind="glyph" class.bind="glyph" if.bind="glyph"></ui-glyph>
  <span class="ui-message"><slot><slot></span></div>
  <div class="ui-button-bar"><button click.trigger="closeAlert(true)" t.bind="okLabel">\${okLabel}</button><button show.bind="confirm" click.trigger="closeAlert(false)" t.bind="cancelLabel">\${cancelLabel}</button></div>
  </div></template>`)
@customElement('ui-alert')
export class UIAlert {
  constructor(public element: Element) {
    this.confirm = element.hasAttribute('confirm');
  }

  bind(bindingContext: Object, overrideContext: Object) {
    if (bindingContext) Object.assign(this, bindingContext);
    UIEvent.queueTask(() => {
      this.element.classList.add('ui-open');
      if (this.focusBlock) this.focusBlock.focus();
    });
  }

  @bindable() glyph = '';
  @bindable() okLabel = 'OK';
  @bindable() cancelLabel = 'Cancel';
  @bindable() closeCallback;

  private confirm = false;
  private focusBlock;

  closeAlert(b) {
    this.element.classList.remove('ui-open');
    setTimeout(() => {
      if (this.closeCallback) this.closeCallback(b);
      DOM.removeNode(this.element);
    }, 100);
  }
  cancelBlur($event) {
    $event.preventDefault();
    this.focusBlock.focus();
    return false;
  }
  checkKey($event) {
    let key = ($event.keyCode || $event.which);
    if (key == 13) this.closeAlert(true);
    if (key == 27) this.closeAlert(false);
  }
}

@autoinject()
@inlineView(`<template class="ui-alert-shim"><div class="ui-alert">
  <div class="ui-wrapper">
  <ui-glyph glyph.bind="glyph" class.bind="glyph" if.bind="glyph"></ui-glyph>
  <span class="ui-message"><slot><slot></span></div>
  <ui-input-group>
    <ui-input class="\${changed && value==''?'ui-invalid':''}" errors.bind="changed && value==''?['Value needed']:null" if.bind="!multiline" ref="focusBlock" value.bind="value" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"></ui-input>
    <ui-textarea class="\${changed && value==''?'ui-invalid':''}" errors.bind="changed && value==''?['Value needed']:null" if.bind="multiline" rows="4" ref="focusBlock" value.bind="value" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"></ui-textarea>
  </ui-input-group>
  <div class="ui-button-bar"><button click.trigger="closeAlert(true)" t.bind="okLabel">\${okLabel}</button><button click.trigger="closeAlert(false)" t.bind="cancelLabel">\${cancelLabel}</button></div>
  </div></template>`)
@customElement('ui-prompt')
export class UIPrompt {
  constructor(public element: Element) {
    this.multiline = element.hasAttribute('multiline');
  }

  bind(bindingContext: Object, overrideContext: Object) {
    if (bindingContext) Object.assign(this, bindingContext);
    UIEvent.queueTask(() => {
      this.element.classList.add('ui-open');
      if (this.focusBlock) this.focusBlock.focus();
    });
  }

  @bindable() glyph = '';
  @bindable() okLabel = 'OK';
  @bindable() cancelLabel = 'Cancel';
  @bindable() closeCallback;

  private changed = false;
  private multiline = false;
  private focusBlock;
  private value = '';

  closeAlert(b) {
    if (b && isEmpty(this.value)) return this.changed = true;
    this.element.classList.remove('ui-open');
    setTimeout(() => {
      if (this.closeCallback) this.closeCallback(b ? this.value : null);
      DOM.removeNode(this.element);
    }, 100);
  }
  cancelBlur($event) {
    $event.preventDefault();
    this.focusBlock.focus();
    return false;
  }
  checkKey($event) {
    let key = ($event.keyCode || $event.which);
    if (!this.multiline && key == 13) this.closeAlert(true);
    if (key == 27) this.closeAlert(false);
    return true;
  }
}
