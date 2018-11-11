var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UIInputLabel_1;
import { autoinject, customElement, bindable, bindingMode, inlineView, containerless } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import * as _ from "lodash";
let UIForm = class UIForm {
    constructor(element) {
        this.element = element;
    }
    attached() {
        UIEvent.queueTask(() => {
            let el = this.element.querySelector('input,textarea');
            if (el !== null)
                el.focus();
            if (this.busy)
                this.busyChanged(this.busy);
            if (this.disabled)
                this.disabledChanged(this.disabled);
        });
    }
    busyChanged(newValue) {
        this.disableInputs(!!newValue || this.disabled);
    }
    disabledChanged(newValue) {
        this.disableInputs(newValue);
    }
    disableInputs(newValue) {
        let els = this.element.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list,ui-dropdown');
        _.forEach(els, el => {
            try {
                el.au.controller.viewModel.disable(!!newValue);
            }
            catch (e) {
            }
        });
    }
    fireSubmit() {
        if (!this.busy)
            UIEvent.fireEvent('submit', this.element);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIForm.prototype, "busy", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIForm.prototype, "disabled", void 0);
UIForm = __decorate([
    autoinject(),
    customElement('ui-form'),
    inlineView(`<template class="ui-form"><form ref="formEl" validation-renderer="ui-validator" enterpressed.trigger="fireSubmit()" submit.trigger="false"><slot></slot></form></template>`),
    __metadata("design:paramtypes", [Element])
], UIForm);
export { UIForm };
let UIFieldset = class UIFieldset {
    constructor(element) {
        this.element = element;
        this.legend = '';
        this.checked = true;
        this.collapsible = false;
        this.collapsible = element.hasAttribute('checked') || element.hasAttribute('checked.bind');
    }
    bind(bindingContext, overrideContext) {
        this.checked = !!this.checked;
    }
    attached() {
        this.checkedChanged(this.checked);
        if (this.disabled)
            this.disabledChanged(this.disabled);
    }
    checkedChanged(newValue) {
        this.element.classList[!!newValue ? 'remove' : 'add']('ui-collapse');
        this.disableInputs(!newValue);
    }
    disabledChanged(newValue) {
        this.disableInputs(!!newValue);
    }
    disableInputs(newValue) {
        let els = this.container.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list,ui-dropdown');
        _.forEach(els, el => {
            try {
                el.au.controller.viewModel.disable(!!newValue);
            }
            catch (e) {
            }
        });
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIFieldset.prototype, "legend", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIFieldset.prototype, "disabled", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIFieldset.prototype, "checked", void 0);
UIFieldset = __decorate([
    autoinject(),
    inlineView('<template class="ui-fieldset"><fieldset><legend if.bind="legend"><span if.bind="!collapsible">\${legend}</span><ui-checkbox if.bind="collapsible" checked.bind="checked">\${legend}</ui-checkbox></legend><div ref="container"><slot></slot></div></fieldset></template>'),
    customElement('ui-fieldset'),
    __metadata("design:paramtypes", [Element])
], UIFieldset);
export { UIFieldset };
let UIInputGroup = class UIInputGroup {
    constructor(element) {
        this.element = element;
        this.width = '15em';
        if (element.hasAttribute('plain'))
            element.classList.add('ui-plain');
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIInputGroup.prototype, "width", void 0);
UIInputGroup = __decorate([
    autoinject(),
    inlineView(`<template class="ui-input-group"><slot name="inputLabel"></slot>
  <div css.bind="{'flex-basis':width}"><div class="ui-group-wrapper"><slot></slot></div><slot name="inputInfo"></slot></div></template>`),
    customElement('ui-input-group'),
    __metadata("design:paramtypes", [Element])
], UIInputGroup);
export { UIInputGroup };
let UIInputInfo = class UIInputInfo {
    constructor(element) {
        this.element = element;
        this.class = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIInputInfo.prototype, "class", void 0);
UIInputInfo = __decorate([
    autoinject(),
    containerless(),
    inlineView('<template><div slot="inputInfo" class="ui-input-info \${class}"><slot></slot></div></template>'),
    customElement('ui-input-info'),
    __metadata("design:paramtypes", [Element])
], UIInputInfo);
export { UIInputInfo };
let UIInputAddon = class UIInputAddon {
    constructor(element) {
        this.element = element;
        this.glyph = '';
        if (element.hasAttribute('end'))
            element.classList.add('ui-end');
        else
            element.classList.add('ui-start');
    }
    focusEl() {
        let el = this.element.nextElementSibling;
        if (el && el['focus'])
            UIEvent.queueTask(() => el['focus']());
        return true;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIInputAddon.prototype, "glyph", void 0);
UIInputAddon = __decorate([
    autoinject(),
    customElement('ui-input-addon'),
    inlineView(`<template class="ui-input-addon" click.trigger="focusEl()"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UIInputAddon);
export { UIInputAddon };
let UIInputLabel = UIInputLabel_1 = class UIInputLabel {
    constructor(element) {
        this.element = element;
        this.for = '';
        this.class = '';
        this.width = '8em';
    }
    bind(bindingContext, overrideContext) {
        if (this.element.hasAttribute('align-top'))
            this.class += ' ui-align-top';
        if (this.element.hasAttribute('required'))
            this.class += ' ui-required';
        if (this.element.hasAttribute('align-top'))
            this.width = '100%';
    }
    attached() {
        if (isEmpty(this.for)) {
            let el = this.label.parentElement.querySelector('input:not([type="checkbox"]):not([type="radio"]),textarea');
            if (el) {
                if (!el.id)
                    el.id = 'ui-input-' + (UIInputLabel_1.seed++);
                this.for = el.id;
            }
        }
    }
};
UIInputLabel.seed = 1;
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIInputLabel.prototype, "for", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIInputLabel.prototype, "class", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIInputLabel.prototype, "width", void 0);
UIInputLabel = UIInputLabel_1 = __decorate([
    autoinject(),
    containerless(),
    inlineView(`<template><label ref="label" slot="inputLabel" class="ui-input-label \${class}" for.bind="for" css.bind="{'flex-basis':width}"><slot></slot></label></template>`),
    customElement('ui-input-label'),
    __metadata("design:paramtypes", [Element])
], UIInputLabel);
export { UIInputLabel };
