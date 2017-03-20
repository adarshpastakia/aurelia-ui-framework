//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";
import {UIUtils} from "../../utils/ui-utils";

@autoinject()
@inlineView(`<template class="ui-dropdown" select.trigger="select($event)" click.trigger="toggleDropdown($event)" css.bind="{'min-width':width}">
  <div class="ui-label"><span><ui-glyph class.bind="glyph" glyph.bind="glyph" if.bind="glyph"></ui-glyph>\${display}</span>
  <ui-glyph class="ui-caret" glyph="ui-caret-down"></ui-glyph></div>
  <ul class="ui-list-container ui-floating" ref="dropdown"><slot></slot></ul></template>`)
@customElement('ui-dropdown')
export class UIDropdown {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.disabledChanged(this.disabled);
  }
  attached() {
    this.tether = UIUtils.tether(this.element, this.dropdown);
    this.obMouseup = UIEvent.subscribe('mouseclick', (evt) => {
      if (getParentByClass(evt.target, 'ui-list-container') == this.dropdown) return;
      this.element.classList.remove('ui-open');
    });
    UIEvent.queueTask(() => this.valueChanged(this.value));
  }
  detached() {
    this.tether.dispose();
    this.obMouseup.dispose();
  }
  unbind() { }
  // end aurelia hooks

  @children('.ui-list-item') items = [];

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';

  @bindable() width = '5em';
  @bindable() model = null;
  @bindable() disabled = false;

  @bindable() beforeselect: any;

  private tether;
  private dropdown;
  private obMouseup;
  private selected;
  private glyph = '';
  private display = '';

  valueChanged(newValue) {
    if (this.selected)
      this.selected.element.classList.remove('ui-selected');

    let it = this.items.find(it => it.value == newValue);
    if (!it) it = this.items[0];
    this.value = it.value;
    this.display = it.element.innerText;
    this.glyph = it.element.au.controller.viewModel.glyph;
    (this.selected = it).element.classList.add('ui-selected');
    UIEvent.queueTask(() => UIEvent.fireEvent('change', this.element, this.value));
  }

  disabledChanged(newValue) {
    this.element.classList[(this.disabled = isTrue(newValue)) ? 'add' : 'remove']('ui-disabled');
  }

  select(evt) {
    if (isFunction(this.beforeselect)) {
      let ret = this.beforeselect({ value: evt.detail.value, model: evt.detail.model });
      if (ret instanceof Promise) ret.then(b => {
        if (b) {
          this.value = evt.detail.value;
          this.model = evt.detail.model;
        }
      });
      else if (ret !== false) {
        this.value = evt.detail.value;
        this.model = evt.detail.model;
      }
    }
    else {
      this.value = evt.detail.value;
      this.model = evt.detail.model;
    }
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

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() label = '';
}

@autoinject()
@inlineView(`<template class="ui-list-item" click.trigger="fireSelect($event)" mouseover.trigger="hilightItem($event)">
  <ui-glyph class.bind="glyph" glyph.bind="glyph" if.bind="glyph"></ui-glyph>&nbsp;<slot></slot></template>`)
@customElement('ui-list-item')
export class UIListItem {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() model;
  @bindable() glyph = '';
  @bindable() value = '';

  hilightItem(evt) {
    let h = this.element.parentElement.querySelector('.ui-list-item.ui-hilight');
    if (h !== null) h.classList.remove('ui-hilight');
    evt.target.classList.add('ui-hilight');
  }

  fireSelect(evt) {
    UIEvent.fireEvent('select', this.element, { value: this.value, model: this.model });
  }
}
