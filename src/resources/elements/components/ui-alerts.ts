// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@customElement('ui-toast')
@inlineView(`<template class="ui-toast opening" click.trigger="startClose()"><div class="ui-wrapper">
  <ui-glyph glyph.bind="glyph" if.bind="glyph"></ui-glyph>
  <span class="ui-message"><slot><slot></span><span class="ui-close">&times;</span>
</div></template>`)
export class UIToast {
  constructor(public element: Element) {
    if (element.hasAttribute('dark')) element.classList.add('dark');
    else if (element.hasAttribute('primary')) element.classList.add('primary');
    else if (element.hasAttribute('secondary')) element.classList.add('secondary');
    else if (element.hasAttribute('info')) element.classList.add('info');
    else if (element.hasAttribute('danger')) element.classList.add('danger');
    else if (element.hasAttribute('success')) element.classList.add('success');
    else if (element.hasAttribute('warning')) element.classList.add('warning');
    else element.classList.add('light');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    UIEvent.queueTask(() => {
      this.element.classList.remove('opening');
      if (!isNaN(this.timeout) && parseInt(this.timeout + '') > 0) {
        setTimeout(() => this.startClose(), parseInt(this.timeout + '') + 1000);
      }
    });
  }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() glyph = '';
  @bindable() timeout = 5000;

  private closeable = true;

  private startClose() {
    this.element.classList.add('closing');
    setTimeout(() => DOM.removeNode(this.element), 1000);
  }
}