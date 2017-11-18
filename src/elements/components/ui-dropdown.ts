//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";

@autoinject()
@inlineView(`<template class="ui-dropdown" select.trigger="select($event)" click.trigger="toggleDropdown($event)" css.bind="{'min-width':width}">
  <div class="ui-label">
  <div class="ui-addon-icon" if.bind="glyph"><ui-glyph class.bind="glyph" glyph.bind="glyph"></ui-glyph></div>
  <ui-glyph class="ui-invalid-icon" glyph="glyph-invalid"></ui-glyph><span>\${display}</span>
  <ui-glyph class="ui-caret" glyph="glyph-caret-down"></ui-glyph></div>
  <ul class="ui-list-container ui-floating" ref="dropdown"><slot></slot></ul></template>`)
@customElement('ui-dropdown')
export class UIDropdown {
  constructor(public element: Element) { }

  bind(bindingContext: Object, overrideContext: Object) {
    this.disabledChanged(this.disabled);
  }
  attached() {
    this.tether = UIUtils.tether(this.element, this.dropdown);
    this.obMouseup = UIEvent.subscribe('mouseclick', (evt) => {
      if (getParentByClass(evt.target, 'ui-dropdown') == this.element) return true;
      this.element.classList.remove('ui-open');
    });
    this.obLocale = UIEvent.subscribe('i18n:locale:changed', e => this.localeChanged());
    UIEvent.queueTask(() => this.valueChanged(this.value));
  }
  detached() {
    this.tether.dispose();
    this.obMouseup.dispose();
    this.obLocale.dispose();
  }

  @children('.ui-list-item') items = [];

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';

  @bindable() width = '5em';
  @bindable() model = null;
  @bindable() disabled = false;
  @bindable() defaultText = 'Select';
  @bindable() glyph = '';

  @bindable() beforeselect: any;

  private tether;
  private dropdown;
  private obMouseup;
  private obLocale;
  private selected;
  private display = '';

  private isDisabled = false;

  valueChanged(newValue) {
    if (this.selected)
      this.selected.element.classList.remove('ui-selected');

    let it = this.items.find(it => it.value == newValue);
    // if (!it) it = this.items[0];
    if (it) {
      if (it.value != newValue) this.value = it.value;
      this.display = it.element.innerText;
      (this.selected = it).element.classList.add('ui-selected');
      UIEvent.queueTask(() => UIEvent.fireEvent('change', this.element, this.value));
    }
    else {
      this.display = this.defaultText;
      this.glyph = '';
    }
  }

  localeChanged() {
    UIEvent.queueTask(() => {
      let it = this.items.find(it => it.value == this.value);
      if (it) this.display = it.element.innerText;
    });
  }

  disabledChanged(newValue) {
    this.element.classList[(this.isDisabled = this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
  }

  disable(b) {
    this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
  }

  select(evt) {
    let params = { value: evt.detail.value, model: evt.detail.model };
    if (typeof this.beforeselect === "function") {
      let ret = this.beforeselect(params);
      if (ret instanceof Promise) ret.then(b => {
        if (b !== false) {
          this.doChange(params);
        }
      });
      else if (ret !== false) {
        this.doChange(params);
      }
    }
    else if (UIEvent.fireEvent('beforeselect', this.element, params) !== false) {
      this.doChange(params);
    }
  }

  private doChange(params) {
    this.value = params.value;
    this.model = params.model;
  }

  toggleDropdown(evt) {
    this.element.classList[this.element.classList.contains('ui-open') ? 'remove' : 'add']('ui-open');
    this.tether.position();
  }
}

@autoinject()
@containerless()
@inlineView(`<template><div class="ui-list-group" if.bind="label" innerhtml.bind="label"></div><slot></slot></template>`)
@customElement('ui-list-group')
export class UIListGroup {
  constructor(public element: Element) { }
  @bindable() label = '';
}

@autoinject()
@inlineView(`<template class="ui-list-item" click.trigger="fireSelect($event)" mouseover.trigger="hilightItem($event)" mouseout.trigger="unhilightItem($event)">
  <ui-glyph class.bind="glyph" glyph.bind="glyph" if.bind="glyph"></ui-glyph><span if.bind="glyph">&nbsp;</span><slot></slot></template>`)
@customElement('ui-list-item')
export class UIListItem {
  constructor(public element: Element) { }

  @bindable() model;
  @bindable() glyph = '';
  @bindable() value = '';

  hilightItem(evt) {
    let h = this.element.parentElement.querySelector('.ui-list-item.ui-hilight');
    if (h !== null) h.classList.remove('ui-hilight');
    evt.target.classList.add('ui-hilight');
  }
  unhilightItem(evt) {
    evt.target.classList.remove('ui-hilight');
  }

  fireSelect(evt) {
    UIEvent.fireEvent('select', this.element, { value: this.value, model: this.model });
  }
}
