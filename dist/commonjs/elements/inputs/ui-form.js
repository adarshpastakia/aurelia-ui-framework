"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ui_event_1 = require("../../utils/ui-event");
var _ = require("lodash");
var UIForm = (function () {
    function UIForm(element) {
        this.element = element;
    }
    UIForm.prototype.created = function (owningView, myView) { };
    UIForm.prototype.bind = function (bindingContext, overrideContext) { };
    UIForm.prototype.attached = function () {
        var _this = this;
        ui_event_1.UIEvent.queueTask(function () {
            var el = _this.element.querySelector('input,textarea');
            if (el !== null)
                el.focus();
            if (_this.busy)
                _this.busyChanged(true);
        });
    };
    UIForm.prototype.detached = function () { };
    UIForm.prototype.unbind = function () { };
    UIForm.prototype.busyChanged = function (newValue) {
        var els = this.element.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list');
        _.forEach(els, function (el) {
            try {
                el.au.controller.viewModel.disable(isTrue(newValue));
            }
            catch (e) {
            }
        });
    };
    UIForm.prototype.fireSubmit = function () {
        if (!this.busy)
            ui_event_1.UIEvent.fireEvent('submit', this.element);
    };
    return UIForm;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Boolean)
], UIForm.prototype, "busy", void 0);
UIForm = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.customElement('ui-form'),
    aurelia_framework_1.inlineView("<template class=\"ui-form\"><form ref=\"formEl\" validation-renderer=\"ui-validator\" enterpressed.trigger=\"fireSubmit()\" submit.trigger=\"return false\"><slot></slot></form></template>"),
    __metadata("design:paramtypes", [Element])
], UIForm);
exports.UIForm = UIForm;
var UIFieldset = (function () {
    function UIFieldset(element) {
        this.element = element;
        this.legend = '';
        this.enabled = true;
        this.collapsable = false;
        this.collapsable = element.hasAttribute('enabled') || element.hasAttribute('enabled.bind');
    }
    UIFieldset.prototype.created = function (owningView, myView) { };
    UIFieldset.prototype.bind = function (bindingContext, overrideContext) {
        this.enabled = isTrue(this.enabled);
    };
    UIFieldset.prototype.attached = function () {
        this.enabledChanged(this.enabled);
    };
    UIFieldset.prototype.detached = function () { };
    UIFieldset.prototype.unbind = function () { };
    UIFieldset.prototype.enabledChanged = function (newValue) {
        this.element.classList[isTrue(newValue) ? 'remove' : 'add']('ui-collapse');
        var els = this.container.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list');
        _.forEach(els, function (el) {
            try {
                el.au.controller.viewModel.disable(isFalse(newValue));
            }
            catch (e) {
            }
        });
    };
    return UIFieldset;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIFieldset.prototype, "legend", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIFieldset.prototype, "enabled", void 0);
UIFieldset = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView('<template class="ui-fieldset"><fieldset><legend if.bind="legend"><span if.bind="!collapsable">\${legend}</span><ui-checkbox if.bind="collapsable" checked.bind="enabled">\${legend}</ui-checkbox></legend><div ref="container"><slot></slot></div></fieldset></template>'),
    aurelia_framework_1.customElement('ui-fieldset'),
    __metadata("design:paramtypes", [Element])
], UIFieldset);
exports.UIFieldset = UIFieldset;
var UIInputGroup = (function () {
    function UIInputGroup(element) {
        this.element = element;
        this.width = 'auto';
        if (element.hasAttribute('plain'))
            element.classList.add('ui-plain');
    }
    UIInputGroup.prototype.created = function (owningView, myView) { };
    UIInputGroup.prototype.bind = function (bindingContext, overrideContext) { };
    UIInputGroup.prototype.attached = function () { };
    UIInputGroup.prototype.detached = function () { };
    UIInputGroup.prototype.unbind = function () { };
    return UIInputGroup;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIInputGroup.prototype, "width", void 0);
UIInputGroup = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-input-group\"><slot name=\"inputLabel\"></slot>\n  <div><div class=\"ui-group-wrapper\" css.bind=\"{'width':width}\"><slot></slot></div><slot name=\"inputInfo\"></slot></div></template>"),
    aurelia_framework_1.customElement('ui-input-group'),
    __metadata("design:paramtypes", [Element])
], UIInputGroup);
exports.UIInputGroup = UIInputGroup;
var UIInputInfo = (function () {
    function UIInputInfo(element) {
        this.element = element;
        this.class = '';
    }
    UIInputInfo.prototype.created = function (owningView, myView) { };
    UIInputInfo.prototype.bind = function (bindingContext, overrideContext) { };
    UIInputInfo.prototype.attached = function () { };
    UIInputInfo.prototype.detached = function () { };
    UIInputInfo.prototype.unbind = function () { };
    return UIInputInfo;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIInputInfo.prototype, "class", void 0);
UIInputInfo = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.containerless(),
    aurelia_framework_1.inlineView('<template><div slot="inputInfo" class="ui-input-info \${class}"><slot></slot></div></template>'),
    aurelia_framework_1.customElement('ui-input-info'),
    __metadata("design:paramtypes", [Element])
], UIInputInfo);
exports.UIInputInfo = UIInputInfo;
var UIInputAddon = (function () {
    function UIInputAddon(element) {
        this.element = element;
        this.glyph = '';
        if (element.hasAttribute('end'))
            element.classList.add('ui-end');
        else
            element.classList.add('ui-start');
    }
    UIInputAddon.prototype.created = function (owningView, myView) { };
    UIInputAddon.prototype.bind = function (bindingContext, overrideContext) { };
    UIInputAddon.prototype.attached = function () { };
    UIInputAddon.prototype.detached = function () { };
    UIInputAddon.prototype.unbind = function () { };
    UIInputAddon.prototype.focusEl = function () {
        var el = this.element.nextElementSibling;
        if (el && el['focus'])
            ui_event_1.UIEvent.queueTask(function () { return el['focus'](); });
        return true;
    };
    return UIInputAddon;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIInputAddon.prototype, "glyph", void 0);
UIInputAddon = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.customElement('ui-input-addon'),
    aurelia_framework_1.inlineView("<template class=\"ui-input-addon\" click.trigger=\"focusEl()\"><slot><ui-glyph glyph.bind=\"glyph\"></ui-glyph></slot></template>"),
    __metadata("design:paramtypes", [Element])
], UIInputAddon);
exports.UIInputAddon = UIInputAddon;
var UIInputLabel = UIInputLabel_1 = (function () {
    function UIInputLabel(element) {
        this.element = element;
        this.for = '';
        this.class = '';
        if (element.hasAttribute('align-top'))
            this.class += ' ui-align-top';
        if (element.hasAttribute('required'))
            this.class += ' ui-required';
    }
    UIInputLabel.prototype.created = function (owningView, myView) { };
    UIInputLabel.prototype.bind = function (bindingContext, overrideContext) { };
    UIInputLabel.prototype.attached = function () {
        if (isEmpty(this.for)) {
            var el = this.label.parentElement.querySelector('input:not([type="checkbox"]):not([type="radio"]),textarea');
            if (el) {
                if (!el.id)
                    el.id = 'ui-input-' + (UIInputLabel_1.seed++);
                this.for = el.id;
            }
        }
    };
    UIInputLabel.prototype.detached = function () { };
    UIInputLabel.prototype.unbind = function () { };
    return UIInputLabel;
}());
UIInputLabel.seed = 1;
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIInputLabel.prototype, "for", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIInputLabel.prototype, "class", void 0);
UIInputLabel = UIInputLabel_1 = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.containerless(),
    aurelia_framework_1.inlineView('<template><label ref="label" slot="inputLabel" class="ui-input-label \${class}" for.bind="for"><slot></slot></label></template>'),
    aurelia_framework_1.customElement('ui-input-label'),
    __metadata("design:paramtypes", [Element])
], UIInputLabel);
exports.UIInputLabel = UIInputLabel;
var UIInputLabel_1;
