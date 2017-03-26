var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, bindingMode, children, inlineView, DOM } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";
let UIButton = class UIButton {
    constructor(element) {
        this.element = element;
        this.glyph = '';
        this.label = '';
        this.value = '';
        this.theme = 'default';
        this.width = 'auto';
        this.busy = false;
        this.disabled = false;
        this.isDisabled = false;
        if (this.element.hasAttribute('primary'))
            this.theme = 'primary';
        else if (this.element.hasAttribute('secondary'))
            this.theme = 'secondary';
        else if (this.element.hasAttribute('light'))
            this.theme = 'light';
        else if (this.element.hasAttribute('dark'))
            this.theme = 'dark';
        else if (this.element.hasAttribute('info'))
            this.theme = 'info';
        else if (this.element.hasAttribute('danger'))
            this.theme = 'danger';
        else if (this.element.hasAttribute('success'))
            this.theme = 'success';
        else if (this.element.hasAttribute('warning'))
            this.theme = 'warning';
        if (this.element.hasAttribute('icon-top'))
            this.element.classList.add('ui-icon-top');
        if (this.element.hasAttribute('big'))
            this.element.classList.add('ui-big');
        if (this.element.hasAttribute('small'))
            this.element.classList.add('ui-small');
        if (this.element.hasAttribute('square'))
            this.element.classList.add('ui-square');
        if (this.element.hasAttribute('round'))
            this.element.classList.add('ui-round');
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) {
        this.busy = isTrue(this.busy);
        this.disabled = isTrue(this.disabled);
        if (this.form)
            this.dropdown = this.form;
    }
    attached() {
        if (this.dropdown) {
            this.obMouseup = UIEvent.subscribe('mouseclick', (evt) => {
                if (getParentByClass(evt.target, 'ui-button') == this.element)
                    return;
                if (this.form && getParentByClass(evt.target, 'ui-floating') == this.dropdown)
                    return;
                this.element.classList.remove('ui-open');
                this.dropdown.classList.remove('ui-open');
            });
            this.element.classList.add('ui-btn-dropdown');
            this.dropdown.classList.add('ui-floating');
            this.tether = UIUtils.tether(this.element, this.dropdown);
        }
    }
    detached() {
        if (this.tether)
            this.tether.dispose();
        if (this.obMouseup)
            this.obMouseup.dispose();
        if (this.dropdown)
            DOM.removeNode(this.dropdown);
    }
    unbind() { }
    disable(b) {
        this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
    }
    toggleDropdown(evt) {
        if (evt.button != 0)
            return true;
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
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "theme", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "dropdown", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "form", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "busy", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "disabled", void 0);
UIButton = __decorate([
    autoinject(),
    inlineView(`<template role="button" class="ui-button \${theme} \${busy?'ui-busy':''} \${disabled?'ui-disabled':''}" click.trigger="toggleDropdown($event)" data-value="\${value}" css.bind="{width: width}">
    <span class="ui-indicator"><ui-glyph if.bind="busy" class="ui-anim-busy" glyph="ui-busy"></ui-glyph></span>
    <ui-glyph if.bind="glyph" class="ui-btn-icon \${glyph}" glyph.bind="glyph"></ui-glyph>
    <span if.bind="glyph && label">&nbsp;</span>
    <span class="ui-label"><slot>\${label}</slot></span>
    <ui-glyph class="ui-caret" glyph="ui-caret-down" if.bind="!form && dropdown"></ui-glyph></template>`),
    customElement('ui-button'),
    __metadata("design:paramtypes", [Element])
], UIButton);
export { UIButton };
let UIButtonGroup = class UIButtonGroup {
    constructor(element) {
        this.element = element;
        this.buttons = [];
        this.value = '';
        this.disabled = false;
        if (this.element.hasAttribute('vertical'))
            this.element.classList.add('ui-vertical');
        else
            this.element.classList.add('ui-horizontal');
        if (this.element.hasAttribute('toggle'))
            this.element.classList.add('ui-toggle');
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) {
        this.disabled = isTrue(this.disabled);
    }
    attached() { }
    detached() { }
    unbind() { }
    disabledChanged(newValue) {
        this.disabled = isTrue(newValue);
    }
    buttonsChanged() {
        this.valueChanged(this.value);
    }
    valueChanged(newValue) {
        if (this.active)
            this.active.element.classList.remove('ui-active');
        if (this.buttons.length > 0 && (this.active = _.find(this.buttons, (b) => b.value === this.value)))
            this.active.element.classList.add('ui-active');
    }
    clickEvent(evt) {
        if (evt.target.dataset['value'])
            this.value = evt.target.dataset['value'];
    }
};
__decorate([
    children('ui-button'),
    __metadata("design:type", Object)
], UIButtonGroup.prototype, "buttons", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIButtonGroup.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButtonGroup.prototype, "disabled", void 0);
UIButtonGroup = __decorate([
    autoinject(),
    inlineView(`<template class="ui-button-group \${disabled?'ui-disabled':''}" click.trigger="clickEvent($event)"><slot></slot></template>`),
    customElement('ui-button-group'),
    __metadata("design:paramtypes", [Element])
], UIButtonGroup);
export { UIButtonGroup };
