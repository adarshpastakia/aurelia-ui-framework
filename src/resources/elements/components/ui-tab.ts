// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@inlineView(`<template class="ui-tab-panel" css.bind="{'min-height': height}"><div class="ui-tab-bar" if.bind="!noTabs">
    <a click.trigger="activateTab(tab)" repeat.for="tab of tabs" class="ui-tab-button \${tab.active?'ui-active':''} \${tab.disabled?'ui-disabled':''}">
      <span if.bind="tab.glyph" class="fi-ui-\${tab.glyph}"></span>
      <span class="ui-label">\${tab.label}</span>
      <span if.bind="tab.closeable" class="ui-close" click.trigger="closeTab(tab)">&nbsp;&times;</span>
    </a>
  </div><slot></slot></template>`)
@customElement('ui-tab-panel')
export class UITabPanel {
  constructor(public element: Element) {
    if (element.hasAttribute('bottom')) element.classList.add('bottom');
    if (element.hasAttribute('noborder')) element.classList.add('noborder');
    this.noTabs = element.hasAttribute('no-tabs');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() height = "auto";
  @children('ui-tab') tabs = [];
  @bindable({ defaultBindingMode: bindingMode.twoWay }) activeTab = 0;

  private noTabs = false;
  private activeTabEl;

  private tabsChanged() {
    if (this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
      (this.activeTabEl = _.find(this.tabs, ['disabled', false])).active = true;
  }

  private activeTabChanged(newValue) {
    if (this.tabs.length == 0) return;
    if (this.activeTabEl) this.activeTabEl.active = false;
    (this.activeTabEl = (this.tabs[newValue] || this.activeTabEl)).active = true;
  }

  private closeTab(tab) {
    if (UIEvent.fireEvent('beforeclose', this.element, tab)) {
      tab.remove();
      UIEvent.fireEvent('close', this.element, tab);
    }
  }

  private activateTab(tab) {
    if (UIEvent.fireEvent('beforechange', this.element, tab)) {
      if (this.activeTabEl) this.activeTabEl.active = false;
      (this.activeTabEl = tab).active = true;
      UIEvent.fireEvent('change', this.element, tab);
    }
  }
}

@autoinject()
@inlineView(`<template class="ui-tab \${active?'ui-active':''}"><slot></slot></template>`)
@customElement('ui-tab')
export class UITab {
  static seed = 0;
  constructor(public element: Element) {
    if (element.hasAttribute('flex')) element.classList.add('ui-flexed');
    if (element.hasAttribute('scroll')) element.classList.add('ui-scroll');
    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');

    this.id = 'tab-' + (UITab.seed++);
    this.closeable = element.hasAttribute('closeable');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.disabled = isTrue(this.disabled);
  }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() id = '';
  @bindable() glyph = '';
  @bindable() label = '';
  @bindable() disabled = false;

  public active = false;
  public closeable = false;

  remove() {
    DOM.removeNode(this.element);
  }
}