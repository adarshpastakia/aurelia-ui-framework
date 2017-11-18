//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM } from 'aurelia-framework';
import { UIUtils } from "../../utils/ui-utils";
import { UIEvent } from "../../utils/ui-event";
import * as _ from "lodash";

@containerless()
@customElement('ui-tabbar-start')
@inlineView(`<template><div slot="ui-tabbar-start" class="ui-tabbar-links"><slot></slot></div></template>`)
export class UITabbarStart { }

@containerless()
@customElement('ui-tabbar-end')
@inlineView(`<template><div slot="ui-tabbar-end" class="ui-tabbar-links"><slot></slot></div></template>`)
export class UITabbarEnd { }

@customElement('ui-tabbar-toggle')
@inlineView(`<template class="ui-tabbar-toggle ui-tab-button \${disabled?'ui-disabled':''}" click.trigger="toggleDropdown($event)"><slot></slot></template>`)
export class UITabbarToggle {
  @bindable() dropdown;
  @bindable() disabled = false;

  private tether;
  private obMouseup;
  isDisabled = false;

  constructor(public element: Element) { }

  attached() {
    if (this.dropdown) {
      this.obMouseup = UIEvent.subscribe('mouseclick', (evt) => {
        if (getParentByClass(evt.target, 'ui-button') == this.element) return;
        this.element.classList.remove('ui-open');
        this.dropdown.classList.remove('ui-open');
      });
      this.element.classList.add('ui-btn-dropdown');
      this.dropdown.classList.add('ui-floating');
      this.tether = UIUtils.tether(this.element, this.dropdown);
    }
  }
  detached() {
    if (this.tether) this.tether.dispose();
    if (this.obMouseup) this.obMouseup.dispose();
    if (this.dropdown) DOM.removeNode(this.dropdown);
  }

  toggleDropdown(evt) {
    if (evt.button != 0) return true;
    if (this.dropdown) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.cancelBubble = true;
      if (this.element.classList.contains('ui-open')) {
        UIEvent.fireEvent('menuhide', this.element);
        this.element.classList.remove('ui-open');
        this.dropdown.classList.remove('ui-open');
      }
      else {
        if (UIEvent.fireEvent('menuopen', this.element) !== false) {
          this.element.classList.add('ui-open');
          this.dropdown.classList.add('ui-open');
          this.tether.position();
        }
      }
      return false;
    }
    return true;
  }

}

@autoinject()
@inlineView(`<template class="ui-tab-panel" css.bind="{'min-height': height}"><div class="ui-tabbar">
  <slot name="ui-tabbar-start"></slot>
  <div class="ui-tabbar-buttons" ref="wrapper" show.bind="!noTabs" tabactivated.trigger="activateTab($event.target)">
    <slot name="tab-button"></slot>
    <div class="ui-tabbar-toggle ui-tab-button" ref="overflowToggle" show.bind="isOverflow" click.trigger="showOverflow($event)"><ui-glyph glyph="glyph-handle-overflow"></ui-glyph></div>
  </div>
  <slot name="ui-tabbar-end"></slot>
  <div class="ui-menu ui-tabbar-overflow ui-floating" ref="overflow"></div>
  </div><div class="ui-tab-panel-body"><slot></slot></div></template>`)
@customElement('ui-tab-panel')
export class UITabPanel {
  constructor(public element: Element) {
    if (element.hasAttribute('bottom')) element.classList.add('ui-bottom');
    if (element.hasAttribute('noborder')) element.classList.add('ui-noborder');
    this.noTabs = element.hasAttribute('notabs');
    this.useRouter = element.hasAttribute('use-router');
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  // bind(bindingContext: Object, overrideContext: Object) { }
  attached() {
    if (!this.noTabs) {
      this.obResize = UIEvent.subscribe('windowresize', () => this.arrange());
      this.obClick = UIEvent.subscribe('mouseclick', () => this.overflow.classList.remove('ui-open'));
      this.tether = UIUtils.tether(this.overflowToggle, this.overflow, { resize: false, position: 'br' });
      window.setTimeout(() => this.arrange(), 500);
    }
  }
  detached() {
    if (!this.noTabs) {
      this.tether.dispose();
      this.obClick.dispose();
      this.obResize.dispose();
    }
  }
  // unbind() { }
  // end aurelia hooks

  private tether;
  private isOverflow = false;

  private wrapper: Element;
  private overflow: Element;
  private overflowToggle: Element;

  private obClick;
  private obResize;

  @bindable() height = "auto";
  @children('.ui-tab-button') tabs = [];
  @bindable({ defaultBindingMode: bindingMode.twoWay }) activeTab: any = 0;
  @bindable({ defaultBindingMode: bindingMode.fromView }) tab;


  private noTabs = false;
  private useRouter = false;

  private tabsChanged() {
    if (!this.tab && this.tabs.length > 0 && _.find(this.tabs, ['viewModel.active', true]) == null)
      this.activateTab(_.find(this.tabs, ['viewModel.disabled', false]));
    UIEvent.queueTask(() => this.arrange());
  }

  private activeTabChanged(newValue) {
    if (this.tabs.length == 0) return;
    let tab = (_.find(this.tabs, ['viewModel.id', newValue]) || this.tabs[newValue] || this.tab.buttonEl);
    console.log(this.tab, tab.viewModel)
    if (this.tab) this.tab.active = false;
    (this.tab = tab.viewModel).active = true;
  }

  private activateTab(newTab) {
    if (!newTab) return;
    this.activeTab = newTab.viewModel.id;
    UIEvent.fireEvent('activate', this.element, newTab);
  }

  public canActivate(id) {
    let tab = _.find(this.tabs, ['viewModel.id', id]);
    if (tab && tab.viewModel) {
      if (this.tab) this.tab.active = false;
      (this.tab = tab.viewModel).active = true;
      return true;
    }
    return false;
  }

  private arrange() {
    if (!this.wrapper) return;
    this.overflow.classList.remove('ui-open');
    for (let i = 0, c = this.overflow['children']; i < c.length; i++) {
      this.wrapper.insertBefore(c[i], this.overflowToggle);
    }
    // this.wrapper.appendChild(this.overflowToggle);
    if (this.tabs.length > 0 && (this.isOverflow = (this.wrapper.lastElementChild.previousElementSibling.offsetLeft + this.wrapper.lastElementChild.previousElementSibling.offsetWidth > this.wrapper.offsetWidth))) {
      for (let c = this.wrapper['children'], i = c.length - 2; i >= 0; i--) {
        if (c[i].offsetLeft + c[i].offsetWidth > this.wrapper.offsetWidth) {
          if (this.overflow.hasChildNodes) this.overflow.insertBefore(c[i], this.overflow.childNodes[0]); else this.overflow.appendChild(c[i]);
        }
      }
    }
  }
  private showOverflow(evt) {
    if (evt.button != 0) return true;
    if (!this.overflow.classList.contains('ui-open')) {
      this.overflow.classList.add('ui-open');
      this.tether.position();
    }
    else
      this.overflow.classList.remove('ui-open');
  }

}

@autoinject()
@containerless()
@inlineView(`<template><a ref="buttonEl" slot="tab-button" click.trigger="fireTabChange()" href.bind="href" class="ui-tab-button \${active?'ui-active':''} \${disabled?'ui-disabled':''}">
  <div><ui-glyph if.bind="glyph" class="ui-tab-icon \${glyphClass}" glyph.bind="glyph"></ui-glyph>
  <span class="ui-label"><slot></slot></span></div>
  <span if.bind="closeable" class="ui-close" click.trigger="closeTab()">&nbsp;&times;</span>
</a></template>`)
@customElement('ui-tab')
export class UITab {
  static seed = 0;
  constructor(public element: Element) {
    this.id = 'tab-' + (UITab.seed++);
    this.closeable = element.hasAttribute('closeable');
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.disabled = this.disabled || this.element.hasAttribute('disabled');
  }
  attached() {
    this.buttonEl.viewModel = this;
  }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable() id = '';
  @bindable() glyph = '';
  @bindable() glyphClass = '';
  @bindable() disabled = false;
  @bindable() active = false;

  @bindable() href = 'javascript:;';
  @bindable() view = '';
  @bindable() model = null;
  @bindable() viewModel = '';

  private buttonEl;
  public closeable = false;

  private fireTabChange() {
    if (this.href === 'javascript:;') UIEvent.fireEvent('tabactivated', this.buttonEl);
    return true;
  }
}
