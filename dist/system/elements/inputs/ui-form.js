System.register(["aurelia-framework", "../../utils/ui-event", "lodash"], function (exports_1, context_1) {
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
    var aurelia_framework_1, ui_event_1, _, UIForm, UIFieldset, UIInputGroup, UIInputInfo, UIInputAddon, UIInputLabel;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ui_event_1_1) {
                ui_event_1 = ui_event_1_1;
            },
            function (_1) {
                _ = _1;
            }
        ],
        execute: function () {
            UIForm = (function () {
                function UIForm(element) {
                    this.element = element;
                }
                UIForm.prototype.attached = function () {
                    var _this = this;
                    ui_event_1.UIEvent.queueTask(function () {
                        var el = _this.element.querySelector('input,textarea');
                        if (el !== null)
                            el.focus();
                        if (_this.busy)
                            _this.busyChanged(_this.busy);
                        if (_this.disabled)
                            _this.disabledChanged(_this.disabled);
                    });
                };
                UIForm.prototype.busyChanged = function (newValue) {
                    this.disableInputs(!!newValue || this.disabled);
                };
                UIForm.prototype.disabledChanged = function (newValue) {
                    this.disableInputs(newValue);
                };
                UIForm.prototype.disableInputs = function (newValue) {
                    var els = this.element.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list,ui-dropdown');
                    _.forEach(els, function (el) {
                        try {
                            el.au.controller.viewModel.disable(!!newValue);
                        }
                        catch (e) {
                        }
                    });
                };
                UIForm.prototype.fireSubmit = function () {
                    if (!this.busy)
                        ui_event_1.UIEvent.fireEvent('submit', this.element);
                };
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Boolean)
                ], UIForm.prototype, "busy", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Boolean)
                ], UIForm.prototype, "disabled", void 0);
                UIForm = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.customElement('ui-form'),
                    aurelia_framework_1.inlineView("<template class=\"ui-form\"><form ref=\"formEl\" validation-renderer=\"ui-validator\" enterpressed.trigger=\"fireSubmit()\" submit.trigger=\"false\"><slot></slot></form></template>"),
                    __metadata("design:paramtypes", [Element])
                ], UIForm);
                return UIForm;
            }());
            exports_1("UIForm", UIForm);
            UIFieldset = (function () {
                function UIFieldset(element) {
                    this.element = element;
                    this.legend = '';
                    this.checked = true;
                    this.collapsible = false;
                    this.collapsible = element.hasAttribute('checked') || element.hasAttribute('checked.bind');
                }
                UIFieldset.prototype.bind = function (bindingContext, overrideContext) {
                    this.checked = !!this.checked;
                };
                UIFieldset.prototype.attached = function () {
                    this.checkedChanged(this.checked);
                    if (this.disabled)
                        this.disabledChanged(this.disabled);
                };
                UIFieldset.prototype.checkedChanged = function (newValue) {
                    this.element.classList[!!newValue ? 'remove' : 'add']('ui-collapse');
                    this.disableInputs(!newValue);
                };
                UIFieldset.prototype.disabledChanged = function (newValue) {
                    this.disableInputs(!!newValue);
                };
                UIFieldset.prototype.disableInputs = function (newValue) {
                    var els = this.container.querySelectorAll('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list,ui-dropdown');
                    _.forEach(els, function (el) {
                        try {
                            el.au.controller.viewModel.disable(!!newValue);
                        }
                        catch (e) {
                        }
                    });
                };
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIFieldset.prototype, "legend", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Boolean)
                ], UIFieldset.prototype, "disabled", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
                    __metadata("design:type", Object)
                ], UIFieldset.prototype, "checked", void 0);
                UIFieldset = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.inlineView('<template class="ui-fieldset"><fieldset><legend if.bind="legend"><span if.bind="!collapsible">\${legend}</span><ui-checkbox if.bind="collapsible" checked.bind="checked">\${legend}</ui-checkbox></legend><div ref="container"><slot></slot></div></fieldset></template>'),
                    aurelia_framework_1.customElement('ui-fieldset'),
                    __metadata("design:paramtypes", [Element])
                ], UIFieldset);
                return UIFieldset;
            }());
            exports_1("UIFieldset", UIFieldset);
            UIInputGroup = (function () {
                function UIInputGroup(element) {
                    this.element = element;
                    this.width = '15em';
                    if (element.hasAttribute('plain'))
                        element.classList.add('ui-plain');
                }
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIInputGroup.prototype, "width", void 0);
                UIInputGroup = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.inlineView("<template class=\"ui-input-group\"><slot name=\"inputLabel\"></slot>\n  <div css.bind=\"{'flex-basis':width}\"><div class=\"ui-group-wrapper\"><slot></slot></div><slot name=\"inputInfo\"></slot></div></template>"),
                    aurelia_framework_1.customElement('ui-input-group'),
                    __metadata("design:paramtypes", [Element])
                ], UIInputGroup);
                return UIInputGroup;
            }());
            exports_1("UIInputGroup", UIInputGroup);
            UIInputInfo = (function () {
                function UIInputInfo(element) {
                    this.element = element;
                    this.class = '';
                }
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
                return UIInputInfo;
            }());
            exports_1("UIInputInfo", UIInputInfo);
            UIInputAddon = (function () {
                function UIInputAddon(element) {
                    this.element = element;
                    this.glyph = '';
                    if (element.hasAttribute('end'))
                        element.classList.add('ui-end');
                    else
                        element.classList.add('ui-start');
                }
                UIInputAddon.prototype.focusEl = function () {
                    var el = this.element.nextElementSibling;
                    if (el && el['focus'])
                        ui_event_1.UIEvent.queueTask(function () { return el['focus'](); });
                    return true;
                };
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
                return UIInputAddon;
            }());
            exports_1("UIInputAddon", UIInputAddon);
            UIInputLabel = (function () {
                function UIInputLabel(element) {
                    this.element = element;
                    this.for = '';
                    this.class = '';
                    this.width = '8em';
                }
                UIInputLabel_1 = UIInputLabel;
                UIInputLabel.prototype.bind = function (bindingContext, overrideContext) {
                    if (this.element.hasAttribute('align-top'))
                        this.class += ' ui-align-top';
                    if (this.element.hasAttribute('required'))
                        this.class += ' ui-required';
                    if (this.element.hasAttribute('align-top'))
                        this.width = '100%';
                };
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
                var UIInputLabel_1;
                UIInputLabel.seed = 1;
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIInputLabel.prototype, "for", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIInputLabel.prototype, "class", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIInputLabel.prototype, "width", void 0);
                UIInputLabel = UIInputLabel_1 = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.containerless(),
                    aurelia_framework_1.inlineView("<template><label ref=\"label\" slot=\"inputLabel\" class=\"ui-input-label ${class}\" for.bind=\"for\" css.bind=\"{'flex-basis':width}\"><slot></slot></label></template>"),
                    aurelia_framework_1.customElement('ui-input-label'),
                    __metadata("design:paramtypes", [Element])
                ], UIInputLabel);
                return UIInputLabel;
            }());
            exports_1("UIInputLabel", UIInputLabel);
        }
    };
});
