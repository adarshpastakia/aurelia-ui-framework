System.register(["aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, ui_event_1, ui_utils_1, UIDropdown, UIListGroup, UIListItem;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ui_event_1_1) {
                ui_event_1 = ui_event_1_1;
            },
            function (ui_utils_1_1) {
                ui_utils_1 = ui_utils_1_1;
            }
        ],
        execute: function () {
            UIDropdown = (function () {
                function UIDropdown(element) {
                    this.element = element;
                    this.items = [];
                    this.value = '';
                    this.width = '5em';
                    this.model = null;
                    this.disabled = false;
                    this.glyph = '';
                    this.display = '';
                }
                UIDropdown.prototype.created = function (owningView, myView) { };
                UIDropdown.prototype.bind = function (bindingContext, overrideContext) {
                    this.disabledChanged(this.disabled);
                };
                UIDropdown.prototype.attached = function () {
                    var _this = this;
                    this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
                    this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                        if (getParentByClass(evt.target, 'ui-list-container') == _this.dropdown)
                            return;
                        _this.element.classList.remove('ui-open');
                    });
                    ui_event_1.UIEvent.queueTask(function () { return _this.valueChanged(_this.value); });
                };
                UIDropdown.prototype.detached = function () {
                    this.tether.dispose();
                    this.obMouseup.dispose();
                };
                UIDropdown.prototype.unbind = function () { };
                UIDropdown.prototype.valueChanged = function (newValue) {
                    var _this = this;
                    if (this.selected)
                        this.selected.element.classList.remove('ui-selected');
                    var it = this.items.find(function (it) { return it.value == newValue; });
                    if (!it)
                        it = this.items[0];
                    this.value = it.value;
                    this.display = it.element.innerText;
                    this.glyph = it.element.au.controller.viewModel.glyph;
                    (this.selected = it).element.classList.add('ui-selected');
                    ui_event_1.UIEvent.queueTask(function () { return ui_event_1.UIEvent.fireEvent('change', _this.element, _this.value); });
                };
                UIDropdown.prototype.disabledChanged = function (newValue) {
                    this.element.classList[(this.disabled = isTrue(newValue)) ? 'add' : 'remove']('ui-disabled');
                };
                UIDropdown.prototype.select = function (evt) {
                    var _this = this;
                    var params = { value: evt.detail.value, model: evt.detail.model };
                    if (isFunction(this.beforeselect)) {
                        var ret = this.beforeselect(params);
                        if (ret instanceof Promise)
                            ret.then(function (b) {
                                if (b) {
                                    _this.doChange(params);
                                }
                            });
                        else if (ret !== false) {
                            this.doChange(params);
                        }
                    }
                    else if (ui_event_1.UIEvent.fireEvent('beforeselect', this.element, params) !== false) {
                        this.doChange(params);
                    }
                };
                UIDropdown.prototype.doChange = function (params) {
                    this.value = params.value;
                    this.model = params.model;
                };
                UIDropdown.prototype.toggleDropdown = function (evt) {
                    this.element.classList[this.element.classList.contains('ui-open') ? 'remove' : 'add']('ui-open');
                    this.tether.position();
                };
                return UIDropdown;
            }());
            __decorate([
                aurelia_framework_1.children('.ui-list-item'),
                __metadata("design:type", Object)
            ], UIDropdown.prototype, "items", void 0);
            __decorate([
                aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
                __metadata("design:type", Object)
            ], UIDropdown.prototype, "value", void 0);
            __decorate([
                aurelia_framework_1.bindable(),
                __metadata("design:type", Object)
            ], UIDropdown.prototype, "width", void 0);
            __decorate([
                aurelia_framework_1.bindable(),
                __metadata("design:type", Object)
            ], UIDropdown.prototype, "model", void 0);
            __decorate([
                aurelia_framework_1.bindable(),
                __metadata("design:type", Object)
            ], UIDropdown.prototype, "disabled", void 0);
            __decorate([
                aurelia_framework_1.bindable(),
                __metadata("design:type", Object)
            ], UIDropdown.prototype, "beforeselect", void 0);
            UIDropdown = __decorate([
                aurelia_framework_1.autoinject(),
                aurelia_framework_1.inlineView("<template class=\"ui-dropdown\" select.trigger=\"select($event)\" click.trigger=\"toggleDropdown($event)\" css.bind=\"{'min-width':width}\">\n  <div class=\"ui-label\"><span><ui-glyph class.bind=\"glyph\" glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>${display}</span>\n  <ui-glyph class=\"ui-caret\" glyph=\"ui-caret-down\"></ui-glyph></div>\n  <ul class=\"ui-list-container ui-floating\" ref=\"dropdown\"><slot></slot></ul></template>"),
                aurelia_framework_1.customElement('ui-dropdown'),
                __metadata("design:paramtypes", [Element])
            ], UIDropdown);
            exports_1("UIDropdown", UIDropdown);
            UIListGroup = (function () {
                function UIListGroup(element) {
                    this.element = element;
                    this.label = '';
                }
                UIListGroup.prototype.created = function (owningView, myView) { };
                UIListGroup.prototype.bind = function (bindingContext, overrideContext) { };
                UIListGroup.prototype.attached = function () { };
                UIListGroup.prototype.detached = function () { };
                UIListGroup.prototype.unbind = function () { };
                return UIListGroup;
            }());
            __decorate([
                aurelia_framework_1.bindable(),
                __metadata("design:type", Object)
            ], UIListGroup.prototype, "label", void 0);
            UIListGroup = __decorate([
                aurelia_framework_1.autoinject(),
                aurelia_framework_1.containerless(),
                aurelia_framework_1.inlineView("<template><div class=\"ui-list-group\" if.bind=\"label\" innerhtml.bind=\"label\"></div><slot></slot></template>"),
                aurelia_framework_1.customElement('ui-list-group'),
                __metadata("design:paramtypes", [Element])
            ], UIListGroup);
            exports_1("UIListGroup", UIListGroup);
            UIListItem = (function () {
                function UIListItem(element) {
                    this.element = element;
                    this.glyph = '';
                    this.value = '';
                }
                UIListItem.prototype.created = function (owningView, myView) { };
                UIListItem.prototype.bind = function (bindingContext, overrideContext) { };
                UIListItem.prototype.attached = function () { };
                UIListItem.prototype.detached = function () { };
                UIListItem.prototype.unbind = function () { };
                UIListItem.prototype.hilightItem = function (evt) {
                    var h = this.element.parentElement.querySelector('.ui-list-item.ui-hilight');
                    if (h !== null)
                        h.classList.remove('ui-hilight');
                    evt.target.classList.add('ui-hilight');
                };
                UIListItem.prototype.fireSelect = function (evt) {
                    ui_event_1.UIEvent.fireEvent('select', this.element, { value: this.value, model: this.model });
                };
                return UIListItem;
            }());
            __decorate([
                aurelia_framework_1.bindable(),
                __metadata("design:type", Object)
            ], UIListItem.prototype, "model", void 0);
            __decorate([
                aurelia_framework_1.bindable(),
                __metadata("design:type", Object)
            ], UIListItem.prototype, "glyph", void 0);
            __decorate([
                aurelia_framework_1.bindable(),
                __metadata("design:type", Object)
            ], UIListItem.prototype, "value", void 0);
            UIListItem = __decorate([
                aurelia_framework_1.autoinject(),
                aurelia_framework_1.inlineView("<template class=\"ui-list-item\" click.trigger=\"fireSelect($event)\" mouseover.trigger=\"hilightItem($event)\">\n  <ui-glyph class.bind=\"glyph\" glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>&nbsp;<slot></slot></template>"),
                aurelia_framework_1.customElement('ui-list-item'),
                __metadata("design:paramtypes", [Element])
            ], UIListItem);
            exports_1("UIListItem", UIListItem);
        }
    };
});
