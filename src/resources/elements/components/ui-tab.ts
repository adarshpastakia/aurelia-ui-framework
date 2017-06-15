//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIUtils} from "../../utils/ui-utils";
import {UIEvent} from "../../utils/ui-event";
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
  <div class="ui-tabbar-buttons" ref="wrapper" if.bind="!noTabs">
    <a click.trigger="activateTab(tab)" repeat.for="tab of tabs" class="ui-tab-button \${tab.active?'ui-active':''} \${tab.disabled?'ui-disabled':''}">
      <ui-glyph if.bind="tab.glyph" class="ui-tab-icon \${tab.glyphClass}" glyph.bind="tab.glyph"></ui-glyph>
      <span class="ui-label" if.bind="tab.label" innerhtml.bind="tab.label"></span>
      <span if.bind="tab.closeable" class="ui-close" click.trigger="closeTab(tab)">&nbsp;&times;</span>
    </a>
    <div class="ui-tabbar-toggle ui-tab-button" ref="overflowToggle" show.bind="isOverflow" click.trigger="showOverflow($event)"><ui-glyph glyph="glyph-handle-overflow"></ui-glyph></div>
  </div>
  <slot name="ui-tabbar-end"></slot>
  <div class="ui-menu ui-tabbar-overflow ui-floating" ref="overflow"></div>
  </div><slot></slot></template>`)
@customElement('ui-tab-panel')
export class UITabPanel {
  constructor(public element: Element) {
    if (element.hasAttribute('bottom')) element.classList.add('bottom');
    if (element.hasAttribute('noborder')) element.classList.add('noborder');
    this.noTabs = element.hasAttribute('notabs');
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
  @children('ui-tab') tabs = [];
  @bindable({ defaultBindingMode: bindingMode.twoWay }) activeTab: any = 0;


  private noTabs = false;
  private activeTabEl;

  private tabsChanged() {
    if (!this.activeTabEl && this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
      this.activateTab(_.find(this.tabs, ['disabled', false]));
    UIEvent.queueTask(() => this.arrange());
  }

  private activeTabChanged(newValue) {
    if (this.tabs.length == 0) return;
    let tab = (_.find(this.tabs, ['id', newValue]) || this.tabs[newValue] || this.activeTabEl);
    if (this.activeTabEl) this.activeTabEl.active = false;
    (this.activeTabEl = tab).active = true;
  }

  public close(id, force = false) {
    let tab = _.find(this.tabs, ['id', id]);
    if (tab) force ? this.doClose(tab) : this.closeTab(tab);
  }

  private closeTab(tab) {
    tab.canDeactivate()
      .then(b => {
        if (b === true) {
          if (isFunction(tab.beforeclose)) {
            let ret = tab.beforeclose(tab);
            if (ret instanceof Promise) ret.then(b => {
              if (b) {
                this.doClose(tab);
              }
            });
            else if (ret !== false) {
              this.doClose(tab);
            }
          }
          else if (UIEvent.fireEvent('beforeclose', tab.element, tab) !== false) {
            this.doClose(tab);
          }
        }
      });
  }
  private doClose(tab) {
    _.remove(this.tabs, ['id', tab.id]);
    if (this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
      this.activateTab(_.findLast(this.tabs, ['disabled', false]));
    tab.remove();
    UIEvent.fireEvent('closed', this.element, tab);
  }

  private activateTab(newTab) {
    if (this.activeTabEl) this.activeTabEl.active = false;
    (this.activeTabEl = newTab).active = true;
    this.activeTab = newTab.id;
    UIEvent.fireEvent('activate', newTab.element, newTab);
  }

  public canActivate(id) {
    let tab = _.find(this.tabs, ['id', id]);
    if (tab) {
      if (this.activeTabEl) this.activeTabEl.active = false;
      (this.activeTabEl = tab).active = true;
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
  // created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.disabled = isTrue(this.disabled);
  }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  @bindable() id = '';
  @bindable() glyph = '';
  @bindable() label = '';
  @bindable() glyphClass = '';
  @bindable() disabled = false;

  @bindable() beforeclose: any;

  public active = false;
  public closeable = false;

  remove() {
    try {
      if (this.viewModel) this.viewModel.detached();
    } catch (e) { }
    DOM.removeNode(this.element);
    try {
      if (this.viewModel) this.viewModel.unbind();
    } catch (e) { }
  }

  canDeactivate() {
    let instance = this.viewModel;
    if (instance && typeof instance.canDeactivate === 'function') {
      let result = instance.canDeactivate();
      if (result instanceof Promise) {
        return result;
      }
      if (result !== null && result !== undefined) {
        return Promise.resolve(result);
      }
      return Promise.resolve(true);
    }
    return Promise.resolve(true);
  }

  get viewModel() {
    if (this.element.firstElementChild && this.element.firstElementChild.tagName.toLowerCase() == 'compose')
      return this.element.firstElementChild.au.compose.viewModel.currentViewModel;
    return null;
  }
}
