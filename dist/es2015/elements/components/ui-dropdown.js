var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, bindingMode, children, inlineView, containerless } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
let UIDropdown = class UIDropdown {
    constructor(element) {
        this.element = element;
        this.items = [];
        this.value = '';
        this.width = '5em';
        this.model = null;
        this.disabled = false;
        this.defaultText = 'Select';
        this.glyph = '';
        this.display = '';
        this.isDisabled = false;
    }
    bind(bindingContext, overrideContext) {
        this.disabledChanged(this.disabled);
    }
    attached() {
        this.tether = UIUtils.tether(this.element, this.dropdown);
        this.obMouseup = UIEvent.subscribe('mouseclick', (evt) => {
            if (getParentByClass(evt.target, 'ui-dropdown') == this.element)
                return true;
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
    valueChanged(newValue) {
        if (this.selected)
            this.selected.element.classList.remove('ui-selected');
        let it = this.items.find(it => it.value == newValue);
        if (it) {
            if (it.value != newValue)
                this.value = it.value;
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
            if (it)
                this.display = it.element.innerText;
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
            if (ret instanceof Promise)
                ret.then(b => {
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
    doChange(params) {
        this.value = params.value;
        this.model = params.model;
    }
    toggleDropdown(evt) {
        this.element.classList[this.element.classList.contains('ui-open') ? 'remove' : 'add']('ui-open');
        this.tether.position();
    }
};
__decorate([
    children('.ui-list-item'),
    __metadata("design:type", Object)
], UIDropdown.prototype, "items", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIDropdown.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDropdown.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDropdown.prototype, "model", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDropdown.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDropdown.prototype, "defaultText", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDropdown.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDropdown.prototype, "beforeselect", void 0);
UIDropdown = __decorate([
    autoinject(),
    inlineView(`<template class="ui-dropdown" select.trigger="select($event)" click.trigger="toggleDropdown($event)" css.bind="{'min-width':width}">
  <div class="ui-label">
  <div class="ui-addon-icon" if.bind="glyph"><ui-glyph class.bind="glyph" glyph.bind="glyph"></ui-glyph></div>
  <ui-glyph class="ui-invalid-icon" glyph="glyph-invalid"></ui-glyph><span>\${display}</span>
  <ui-glyph class="ui-caret" glyph="glyph-caret-down"></ui-glyph></div>
  <ul class="ui-list-container ui-floating" ref="dropdown"><slot></slot></ul></template>`),
    customElement('ui-dropdown'),
    __metadata("design:paramtypes", [Element])
], UIDropdown);
export { UIDropdown };
let UIListGroup = class UIListGroup {
    constructor(element) {
        this.element = element;
        this.label = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIListGroup.prototype, "label", void 0);
UIListGroup = __decorate([
    autoinject(),
    containerless(),
    inlineView(`<template><div class="ui-list-group" if.bind="label" innerhtml.bind="label"></div><slot></slot></template>`),
    customElement('ui-list-group'),
    __metadata("design:paramtypes", [Element])
], UIListGroup);
export { UIListGroup };
let UIListItem = class UIListItem {
    constructor(element) {
        this.element = element;
        this.glyph = '';
        this.value = '';
    }
    hilightItem(evt) {
        let h = this.element.parentElement.querySelector('.ui-list-item.ui-hilight');
        if (h !== null)
            h.classList.remove('ui-hilight');
        evt.target.classList.add('ui-hilight');
    }
    unhilightItem(evt) {
        evt.target.classList.remove('ui-hilight');
    }
    fireSelect(evt) {
        UIEvent.fireEvent('select', this.element, { value: this.value, model: this.model });
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIListItem.prototype, "model", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIListItem.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIListItem.prototype, "value", void 0);
UIListItem = __decorate([
    autoinject(),
    inlineView(`<template class="ui-list-item" click.trigger="fireSelect($event)" mouseover.trigger="hilightItem($event)" mouseout.trigger="unhilightItem($event)">
  <ui-glyph class.bind="glyph" glyph.bind="glyph" if.bind="glyph"></ui-glyph><span if.bind="glyph">&nbsp;</span><slot></slot></template>`),
    customElement('ui-list-item'),
    __metadata("design:paramtypes", [Element])
], UIListItem);
export { UIListItem };
