System.register(["aurelia-framework", "../../utils/ui-event"], function (exports_1, context_1) {
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
    var aurelia_framework_1, ui_event_1, UIToast, UIAlert, UIPrompt;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ui_event_1_1) {
                ui_event_1 = ui_event_1_1;
            }
        ],
        execute: function () {
            UIToast = (function () {
                function UIToast(element) {
                    this.element = element;
                    this.glyph = '';
                    this.timeout = 5000;
                    if (element.hasAttribute('dark'))
                        element.classList.add('dark');
                    else if (element.hasAttribute('primary'))
                        element.classList.add('primary');
                    else if (element.hasAttribute('secondary'))
                        element.classList.add('secondary');
                    else if (element.hasAttribute('info'))
                        element.classList.add('info');
                    else if (element.hasAttribute('danger'))
                        element.classList.add('danger');
                    else if (element.hasAttribute('success'))
                        element.classList.add('success');
                    else if (element.hasAttribute('warning'))
                        element.classList.add('warning');
                    else
                        element.classList.add('light');
                }
                UIToast.prototype.bind = function (bindingContext, overrideContext) {
                    var _this = this;
                    if (bindingContext)
                        Object.assign(this, bindingContext);
                    ui_event_1.UIEvent.queueTask(function () {
                        _this.element.classList.add('open');
                        if (!isNaN(_this.timeout) && parseInt(_this.timeout + '') > 0) {
                            setTimeout(function () { return _this.startClose(); }, parseInt(_this.timeout + '') + 1000);
                        }
                    });
                };
                UIToast.prototype.startClose = function (force) {
                    var _this = this;
                    this.element.classList.remove('open');
                    setTimeout(function () { return aurelia_framework_1.DOM.removeNode(_this.element); }, 1000);
                    return true;
                };
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIToast.prototype, "glyph", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIToast.prototype, "timeout", void 0);
                UIToast = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.customElement('ui-toast'),
                    aurelia_framework_1.inlineView("<template class=\"ui-toast\" click.trigger=\"startClose()\"><div class=\"ui-wrapper\">\n  <ui-glyph glyph.bind=\"glyph\" class.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>\n  <span class=\"ui-message\"><slot><slot></span><span class=\"ui-close\">&times;</span>\n</div></template>"),
                    __metadata("design:paramtypes", [Element])
                ], UIToast);
                return UIToast;
            }());
            exports_1("UIToast", UIToast);
            UIAlert = (function () {
                function UIAlert(element) {
                    this.element = element;
                    this.glyph = '';
                    this.okLabel = 'OK';
                    this.cancelLabel = 'Cancel';
                    this.confirm = false;
                    this.confirm = element.hasAttribute('confirm');
                }
                UIAlert.prototype.bind = function (bindingContext, overrideContext) {
                    var _this = this;
                    if (bindingContext)
                        Object.assign(this, bindingContext);
                    ui_event_1.UIEvent.queueTask(function () {
                        _this.element.classList.add('open');
                        if (_this.focusBlock)
                            _this.focusBlock.focus();
                    });
                };
                UIAlert.prototype.closeAlert = function (b) {
                    var _this = this;
                    this.element.classList.remove('open');
                    setTimeout(function () {
                        if (_this.closeCallback)
                            _this.closeCallback(b);
                        aurelia_framework_1.DOM.removeNode(_this.element);
                    }, 100);
                };
                UIAlert.prototype.cancelBlur = function ($event) {
                    $event.preventDefault();
                    this.focusBlock.focus();
                    return false;
                };
                UIAlert.prototype.checkKey = function ($event) {
                    var key = ($event.keyCode || $event.which);
                    if (key == 13)
                        this.closeAlert(true);
                    if (key == 27)
                        this.closeAlert(false);
                };
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIAlert.prototype, "glyph", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIAlert.prototype, "okLabel", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIAlert.prototype, "cancelLabel", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIAlert.prototype, "closeCallback", void 0);
                UIAlert = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.inlineView("<template class=\"ui-alert-shim\"><div class=\"ui-alert\">\n  <div class=\"ui-wrapper\">\n  <input style=\"position:absolute;opacity:0;\" ref=\"focusBlock\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"/>\n  <ui-glyph glyph.bind=\"glyph\" class.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>\n  <span class=\"ui-message\"><slot><slot></span></div>\n  <div class=\"ui-button-bar\"><button click.trigger=\"closeAlert(true)\" t.bind=\"okLabel\">${okLabel}</button><button show.bind=\"confirm\" click.trigger=\"closeAlert(false)\" t.bind=\"cancelLabel\">${cancelLabel}</button></div>\n  </div></template>"),
                    aurelia_framework_1.customElement('ui-alert'),
                    __metadata("design:paramtypes", [Element])
                ], UIAlert);
                return UIAlert;
            }());
            exports_1("UIAlert", UIAlert);
            UIPrompt = (function () {
                function UIPrompt(element) {
                    this.element = element;
                    this.glyph = '';
                    this.okLabel = 'OK';
                    this.cancelLabel = 'Cancel';
                    this.changed = false;
                    this.multiline = false;
                    this.value = '';
                    this.multiline = element.hasAttribute('multiline');
                }
                UIPrompt.prototype.bind = function (bindingContext, overrideContext) {
                    var _this = this;
                    if (bindingContext)
                        Object.assign(this, bindingContext);
                    ui_event_1.UIEvent.queueTask(function () {
                        _this.element.classList.add('open');
                        if (_this.focusBlock)
                            _this.focusBlock.focus();
                    });
                };
                UIPrompt.prototype.closeAlert = function (b) {
                    var _this = this;
                    if (b && isEmpty(this.value))
                        return this.changed = true;
                    this.element.classList.remove('open');
                    setTimeout(function () {
                        if (_this.closeCallback)
                            _this.closeCallback(b ? _this.value : null);
                        aurelia_framework_1.DOM.removeNode(_this.element);
                    }, 100);
                };
                UIPrompt.prototype.cancelBlur = function ($event) {
                    $event.preventDefault();
                    this.focusBlock.focus();
                    return false;
                };
                UIPrompt.prototype.checkKey = function ($event) {
                    var key = ($event.keyCode || $event.which);
                    if (!this.multiline && key == 13)
                        this.closeAlert(true);
                    if (key == 27)
                        this.closeAlert(false);
                    return true;
                };
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIPrompt.prototype, "glyph", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIPrompt.prototype, "okLabel", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIPrompt.prototype, "cancelLabel", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIPrompt.prototype, "closeCallback", void 0);
                UIPrompt = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.inlineView("<template class=\"ui-alert-shim\"><div class=\"ui-alert\">\n  <div class=\"ui-wrapper\">\n  <ui-glyph glyph.bind=\"glyph\" class.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>\n  <span class=\"ui-message\"><slot><slot></span></div>\n  <ui-input-group>\n    <ui-input class=\"${changed && value==''?'ui-invalid':''}\" errors.bind=\"changed && value==''?['Value needed']:null\" if.bind=\"!multiline\" ref=\"focusBlock\" value.bind=\"value\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"></ui-input>\n    <ui-textarea class=\"${changed && value==''?'ui-invalid':''}\" errors.bind=\"changed && value==''?['Value needed']:null\" if.bind=\"multiline\" rows=\"4\" ref=\"focusBlock\" value.bind=\"value\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"></ui-textarea>\n  </ui-input-group>\n  <div class=\"ui-button-bar\"><button click.trigger=\"closeAlert(true)\" t.bind=\"okLabel\">${okLabel}</button><button click.trigger=\"closeAlert(false)\" t.bind=\"cancelLabel\">${cancelLabel}</button></div>\n  </div></template>"),
                    aurelia_framework_1.customElement('ui-prompt'),
                    __metadata("design:paramtypes", [Element])
                ], UIPrompt);
                return UIPrompt;
            }());
            exports_1("UIPrompt", UIPrompt);
        }
    };
});
