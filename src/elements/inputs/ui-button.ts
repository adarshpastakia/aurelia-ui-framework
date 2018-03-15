//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, children, inlineView, DOM } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template class="ui-button \${busy?'ui-busy':''}" css.bind="{width: width}">
  <a role="button" tabindex="-1" class="ui-button-el" click.trigger="toggleDropdown($event, false)" data-value="\${value}" ref="buttonEl">
    <div class="ui-busy-icon"><ui-glyph glyph="glyph-busy" class="ui-anim-busy"></ui-glyph></div>
    <div class="ui-button-icon" if.bind="glyph"><ui-glyph glyph.bind="glyph"></ui-glyph></div>
    <div class="ui-button-label" ref="labelEl" show.bind="hasLabel"><slot>\${label}</slot></div>
    <div class="ui-button-caret" if.bind="!hideCaret && !split && !form && dropdown"><ui-glyph glyph="glyph-chevron-down"></ui-glyph></div>
  </a>
  <a role="button" tabindex="-1" class="ui-button-el ui-\${splitTheme}" if.bind="split" click.trigger="toggleDropdown($event, true)">
    <div class="ui-button-splitter"></div>
    <div class="ui-button-caret"><ui-glyph glyph="glyph-chevron-down"></ui-glyph></div>
  </a>
</template>`)
@customElement('ui-button')
export class UIButton {
  constructor(public element: Element) {
    if (this.element.hasAttribute('icon-top')) this.element.classList.add('ui-icon-top');
    if (this.element.hasAttribute('icon-end')) this.element.classList.add('ui-icon-end');
    else this.element.classList.add('ui-icon-start');
    if (this.element.hasAttribute('icon-hilight')) this.element.classList.add('ui-icon-hilight');

    if (this.element.hasAttribute('xlarge')) this.element.classList.add('ui-size-xl');
    if (this.element.hasAttribute('large')) this.element.classList.add('ui-size-lg');
    if (this.element.hasAttribute('small')) this.element.classList.add('ui-size-sm');

    this.split = this.element.hasAttribute('split');
    this.hideCaret = this.element.hasAttribute('hide-caret');
    this.hideOnClick = !isFalse(this.element.getAttribute('hide-on-click'));
  }

  bind(bindingContext: Object, overrideContext: Object) {
    this.disabledChanged(this.disabled);
  }
  attached() {
    this.hasLabel = !!(this.label || this.labelEl.childNodes[0].length);

    if (this.dropdown) {
      this.obMouseup = UIEvent.subscribe('mouseclick', (evt) => {
        if (getParentByClass(evt.target, 'ui-button') == this.element) return;
        if (!this.hideOnClick && getParentByClass(evt.target, 'ui-floating') == this.dropdown) return;
        this.hideDropdown();
      });
      this.element.classList.add('ui-btn-dropdown');
      this.dropdown.classList.add('ui-floating');
      this.tether = UIUtils.tether(this.element, this.dropdown, { position: this.split ? 'br' : 'bl' });
    }
  }
  detached() {
    if (this.tether) this.tether.dispose();
    if (this.obMouseup) this.obMouseup.dispose();
  }

  @bindable() glyph = '';
  @bindable() label = '';
  @bindable() value = '';
  @bindable() width = 'auto';
  @bindable() splitTheme = '';
  @bindable() splitGlyph = 'glyph-caret-down';
  @bindable() dropdown;
  @bindable() busy = false;
  @bindable() disabled = false;

  public buttonEl;
  private labelEl;
  private hasLabel = true;

  private tether;
  private obMouseup;
  private hideOnClick = true;

  split = false;
  isDisabled = false;
  hideCaret = false;

  disable(b) {
    this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
  }
  disabledChanged(newValue) {
    this.disable(this.disabled = !!newValue);
  }

  hideDropdown() {
    this.element.classList.remove('ui-open');
    this.dropdown.classList.remove('ui-open');
    return true;
  }

  toggleDropdown(evt, isSplit) {
    if (this.split && !isSplit) return this.hideDropdown();
    if (evt.button != 0) return true;
    if (this.dropdown) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.cancelBubble = true;
      if (this.element.classList.contains('ui-open')) {
        UIEvent.fireEvent('menuhide', this.element);
        this.hideDropdown();
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
@inlineView(`<template class="ui-button-group \${disabled?'ui-disabled':''}" click.trigger="clickEvent($event)" data-separator.bind="separator"><slot></slot></template>`)
@customElement('ui-button-group')
export class UIButtonGroup {
  constructor(public element: Element) {
    if (this.element.hasAttribute('vertical')) this.element.classList.add('ui-vertical');
    else this.element.classList.add('ui-horizontal');

    if (this.element.hasAttribute('toggle')) this.element.classList.add('ui-toggle');
    if (this.element.hasAttribute('separator')) this.element.classList.add('ui-has-separator');

    if (this.element.hasAttribute('small')) this.size = 'ui-size-sm';
    if (this.element.hasAttribute('large')) this.size = 'ui-size-lg';
    if (this.element.hasAttribute('xlarge')) this.size = 'ui-size-xl';
  }

  attached() {
    this.buttonsChanged();
  }

  @children('ui-button') buttons = [];
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';
  @bindable() separator = '';
  @bindable() disabled = false;

  private size = '';

  buttonsChanged() {
    this.valueChanged(this.value);
    if (this.size) this.buttons.forEach(b => b.element.classList.add(this.size));
    if (this.separator) this.buttons.forEach(b => b.element.dataset.separator = this.separator);
  }
  active;
  valueChanged(newValue) {
    if (this.active) this.active.element.classList.remove('ui-active');
    if (this.buttons.length > 0 && (this.active = _.find(this.buttons, (b: any) => b.value === this.value)))
      this.active.element.classList.add('ui-active');

    UIEvent.fireEvent('change', this.element, this.value);
  }

  clickEvent(evt) {
    if (evt.target.dataset['value']) this.value = evt.target.dataset['value'];
  }
}
