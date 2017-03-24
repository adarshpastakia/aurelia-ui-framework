//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template class="ui-panel \${collapsed?'ui-collapse':''}" css.bind="{'height':height}" collapse.trigger="toggleCollapse()" close.trigger="close()"><slot></slot></template>`)
@customElement('ui-panel')
export class UIPanel {
  constructor(public element: Element) {
    this.collapsed = element.hasAttribute('collapsed');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() height = 'auto';

  close() {
    DOM.removeNode(this.element);
  }
  collapse() {
    this.collapsed = true;
  }
  expand() {
    this.collapsed = false;
  }

  private collapsed = false;
  private toggleCollapse() {
    setTimeout(() => this.collapsed = !this.collapsed, 200);
  }
}

@autoinject()
@inlineView(`<template class="ui-panel-body" css.bind="{'max-height': maxHeight,'flex-basis':height}"><slot></slot></template>`)
@customElement('ui-panel-body')
export class UIPanelBody {
  constructor(public element: Element) {
    if (element.hasAttribute('flex')) element.classList.add('ui-flexed');
    if (element.hasAttribute('scroll')) element.classList.add('ui-scroll');
    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() height = 'auto';
  @bindable() maxHeight = 'auto';
}

@autoinject()
@inlineView(`<template class="ui-panel-group" collapse.delegate="uncollapse()"><slot></slot></template>`)
@customElement('ui-panel-group')
export class UIPanelGroup {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() {
    //if (_.find(this.panels, ['collapsed', false]) == null) this.panels[0].collapsed = false;
  }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @children('ui-panel') panels;

  private uncollapse() {
    // let panel: any = _.find(this.panels, ['collapsed', false])
    // if (panel) panel.collapsed = true;
  }
}

@autoinject()
@inlineView(`<template class="ui-header \${theme}"><slot></slot></template>`)
@customElement('ui-header')
export class UIHeader {
  constructor(public element: Element) {
    if (element.hasAttribute('primary')) this.theme = 'primary';
    else if (element.hasAttribute('secondary')) this.theme = 'secondary';
    else if (element.hasAttribute('dark')) this.theme = 'dark';
    else if (element.hasAttribute('light')) this.theme = 'light';
    else if (element.hasAttribute('info')) this.theme = 'info';
    else if (element.hasAttribute('danger')) this.theme = 'danger';
    else if (element.hasAttribute('success')) this.theme = 'success';
    else if (element.hasAttribute('warning')) this.theme = 'warning';
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() theme = 'default';
}

@autoinject()
@inlineView(`<template class="ui-header-tool"><button tabindex="-1" class="ui-header-button ui-\${type}" click.trigger="fireEvent($event)">
  <slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></button></template>`)
@customElement('ui-header-tool')
export class UIHeaderTool {
  constructor(public element: Element) {
    if (element.hasAttribute('close')) this.type = "close";
    if (element.hasAttribute('refresh')) this.type = "refresh";
    if (element.hasAttribute('collapse')) this.type = "collapse";
    if (element.hasAttribute('expand')) this.type = "expand";
    if (element.hasAttribute('minimize')) this.type = "minimize";

    if (element.hasAttribute('close')) this.glyph = "ui-dialog-close";
    if (element.hasAttribute('refresh')) this.glyph = "ui-refresh";
    if (element.hasAttribute('collapse')) this.glyph = "ui-chevron-up";
    if (element.hasAttribute('expand')) this.glyph = "ui-dialog-expand";
    if (element.hasAttribute('minimize')) this.glyph = "ui-dialog-minimize";
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  private type = '';
  private glyph = '';

  private fireEvent(evt) {
    if (evt.button != 0) return true;
    return UIEvent.fireEvent(this.type, this.element);
  }
}

@autoinject()
@inlineView(`<template class="ui-header-title ui-inline-block ui-col-fill"><ui-glyph glyph.bind="glyph" if.bind="glyph"></ui-glyph>&nbsp;<slot></slot></template>`)
@customElement('ui-header-title')
export class UIHeaderTitle {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() glyph = '';
}
