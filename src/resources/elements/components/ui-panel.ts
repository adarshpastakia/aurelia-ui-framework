// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@inlineView(`<template class="ui-panel \${collapsed?'ui-collapse':''}" collapse.trigger="toggleCollapse()" close.trigger="closePanel()"><slot></slot></template>`)
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

  closePanel() {
    DOM.removeNode(this.element);
  }

  private collapsed = false;
  toggleCollapse() {
    setTimeout(() => this.collapsed = !this.collapsed, 200);
  }
}

@autoinject()
@inlineView(`<template class="ui-panel-body" css.bind="{'max-height': maxHeight,'flex-basis':height}"><slot></slot></template>`)
@customElement('ui-panel-body')
export class UIPanelBody {
  constructor(public element: Element) {
    if (element.hasAttribute('flex')) element.classList.add('ui-row-column');
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
    if (_.find(this.panels, ['collapsed', false]) == null) this.panels[0].collapsed = false;
  }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @children('ui-panel') panels;

  uncollapse() {
    // let panel: any = _.find(this.panels, ['collapsed', false])
    // if (panel) panel.collapsed = true;
  }
}

@autoinject()
@inlineView(`<template class="ui-header"><slot></slot></template>`)
@customElement('ui-header')
export class UIHeader {
  constructor(public element: Element) {
    if (this.element.hasAttribute('primary')) element.classList.add('ui-primary');
    else if (this.element.hasAttribute('secondary')) element.classList.add('ui-secondary');
    else if (this.element.hasAttribute('dark')) element.classList.add('ui-dark');
    else if (this.element.hasAttribute('light')) element.classList.add('ui-light');
    else if (this.element.hasAttribute('info')) element.classList.add('ui-info');
    else if (this.element.hasAttribute('danger')) element.classList.add('ui-danger');
    else if (this.element.hasAttribute('success')) element.classList.add('ui-success');
    else if (this.element.hasAttribute('warning')) element.classList.add('ui-warning');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks
}

@autoinject()
@inlineView(`<template><button tabindex="-1" class="ui-header-button ui-\${type}" click.trigger="fireEvent($event)">
  <slot><span class.bind="icon"></span></slot></button></template>`)
@customElement('ui-header-tool')
export class UIHeaderTool {
  constructor(public element: Element) {
    if (element.hasAttribute('close')) this.type = "close";
    if (element.hasAttribute('refresh')) this.type = "refresh";
    if (element.hasAttribute('collapse')) this.type = "collapse";
    if (element.hasAttribute('expand')) this.type = "expand";
    if (element.hasAttribute('minimize')) this.type = "minimize";

    if (element.hasAttribute('close')) this.icon = "fi-ui-close";
    if (element.hasAttribute('refresh')) this.icon = "fi-ui-refresh";
    if (element.hasAttribute('collapse')) this.icon = "fi-ui-angle-up";
    if (element.hasAttribute('expand')) this.icon = "fi-ui-dialog-expand";
    if (element.hasAttribute('minimize')) this.icon = "fi-ui-dialog-minimize";
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  private type = '';
  private icon = '';

  fireEvent(evt) {
    if (evt.button != 0) return true;
    return UIEvent.fireEvent(this.type, this.element);
  }
}

@autoinject()
@inlineView(`<template class="ui-header-title ui-inline-block ui-col-fill"><span class="ui-icon \${icon}"></span>&nbsp;<slot></slot></template>`)
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

  @bindable() icon = '';
}