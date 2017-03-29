//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";
import {UIUtils} from "../../utils/ui-utils";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template role="button" class="ui-button \${theme} \${busy?'ui-busy':''} \${disabled?'ui-disabled':''}" click.trigger="toggleDropdown($event)" data-value="\${value}" css.bind="{width: width}">
    <span class="ui-indicator"><ui-glyph if.bind="busy" class="ui-anim-busy" glyph="glyph-busy"></ui-glyph></span>
    <ui-glyph if.bind="glyph" class="ui-btn-icon \${glyph}" glyph.bind="glyph"></ui-glyph>
    <span if.bind="glyph && label">&nbsp;</span>
    <span class="ui-label"><slot>\${label}</slot></span>
    <ui-glyph class="ui-caret" glyph="glyph-caret-down" if.bind="!form && dropdown"></ui-glyph></template>`)
@customElement('ui-button')
export class UIButton {
  constructor(public element: Element) {
    if (this.element.hasAttribute('primary')) this.theme = 'primary';
    else if (this.element.hasAttribute('secondary')) this.theme = 'secondary';
    else if (this.element.hasAttribute('light')) this.theme = 'light';
    else if (this.element.hasAttribute('dark')) this.theme = 'dark';
    else if (this.element.hasAttribute('info')) this.theme = 'info';
    else if (this.element.hasAttribute('danger')) this.theme = 'danger';
    else if (this.element.hasAttribute('success')) this.theme = 'success';
    else if (this.element.hasAttribute('warning')) this.theme = 'warning';

    if (this.element.hasAttribute('icon-top')) this.element.classList.add('ui-icon-top');
    if (this.element.hasAttribute('big')) this.element.classList.add('ui-big');
    if (this.element.hasAttribute('small')) this.element.classList.add('ui-small');
    if (this.element.hasAttribute('square')) this.element.classList.add('ui-square');
    if (this.element.hasAttribute('round')) this.element.classList.add('ui-round');
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.busy = isTrue(this.busy);
    this.disabled = isTrue(this.disabled);

    if (this.form) this.dropdown = this.form;
  }
  attached() {
    if (this.dropdown) {
      this.obMouseup = UIEvent.subscribe('mouseclick', (evt) => {
        if (getParentByClass(evt.target, 'ui-button') == this.element) return;
        if (this.form && getParentByClass(evt.target, 'ui-floating') == this.dropdown) return;
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
  unbind() { }
  // end aurelia hooks

  @bindable() glyph = '';
  @bindable() label = '';
  @bindable() value = '';
  @bindable() theme = 'default';
  @bindable() width = 'auto';
  @bindable() dropdown;
  @bindable() form;
  @bindable() busy = false;
  @bindable() disabled = false;

  private tether;
  private obMouseup;
  isDisabled = false;

  disable(b) {
    this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
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
@inlineView(`<template class="ui-button-group \${disabled?'ui-disabled':''}" click.trigger="clickEvent($event)"><slot></slot></template>`)
@customElement('ui-button-group')
export class UIButtonGroup {
  constructor(public element: Element) {
    if (this.element.hasAttribute('vertical')) this.element.classList.add('ui-vertical');
    else this.element.classList.add('ui-horizontal');

    if (this.element.hasAttribute('toggle')) this.element.classList.add('ui-toggle');
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

  @children('ui-button') buttons = [];
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';
  @bindable() disabled = false;

  disabledChanged(newValue) {
    this.disabled = isTrue(newValue);
  }

  buttonsChanged() {
    this.valueChanged(this.value);
  }
  active;
  valueChanged(newValue) {
    if (this.active) this.active.element.classList.remove('ui-active');
    if (this.buttons.length > 0 && (this.active = _.find(this.buttons, (b: any) => b.value === this.value)))
      this.active.element.classList.add('ui-active');
  }

  clickEvent(evt) {
    if (evt.target.dataset['value']) this.value = evt.target.dataset['value'];
  }
}
