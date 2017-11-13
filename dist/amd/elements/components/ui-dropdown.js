var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDropdown = (function () {
        function UIDropdown(element) {
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
        UIDropdown.prototype.bind = function (bindingContext, overrideContext) {
            this.disabledChanged(this.disabled);
        };
        UIDropdown.prototype.attached = function () {
            var _this = this;
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
            this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                if (getParentByClass(evt.target, 'ui-dropdown') == _this.element)
                    return true;
                _this.element.classList.remove('ui-open');
            });
            this.obLocale = ui_event_1.UIEvent.subscribe('i18n:locale:changed', function (e) { return _this.localeChanged(); });
            ui_event_1.UIEvent.queueTask(function () { return _this.valueChanged(_this.value); });
        };
        UIDropdown.prototype.detached = function () {
            this.tether.dispose();
            this.obMouseup.dispose();
            this.obLocale.dispose();
        };
        UIDropdown.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (this.selected)
                this.selected.element.classList.remove('ui-selected');
            var it = this.items.find(function (it) { return it.value == newValue; });
            if (it) {
                if (it.value != newValue)
                    this.value = it.value;
                this.display = it.element.innerText;
                (this.selected = it).element.classList.add('ui-selected');
                ui_event_1.UIEvent.queueTask(function () { return ui_event_1.UIEvent.fireEvent('change', _this.element, _this.value); });
            }
            else {
                this.display = this.defaultText;
                this.glyph = '';
            }
        };
        UIDropdown.prototype.localeChanged = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var it = _this.items.find(function (it) { return it.value == _this.value; });
                if (it)
                    _this.display = it.element.innerText;
            });
        };
        UIDropdown.prototype.disabledChanged = function (newValue) {
            this.element.classList[(this.isDisabled = this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
        };
        UIDropdown.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UIDropdown.prototype.select = function (evt) {
            var _this = this;
            var params = { value: evt.detail.value, model: evt.detail.model };
            if (typeof this.beforeselect === "function") {
                var ret = this.beforeselect(params);
                if (ret instanceof Promise)
                    ret.then(function (b) {
                        if (b !== false) {
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
        ], UIDropdown.prototype, "defaultText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "beforeselect", void 0);
        UIDropdown = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-dropdown\" select.trigger=\"select($event)\" click.trigger=\"toggleDropdown($event)\" css.bind=\"{'min-width':width}\">\n  <div class=\"ui-label\">\n  <div class=\"ui-addon-icon\" if.bind=\"glyph\"><ui-glyph class.bind=\"glyph\" glyph.bind=\"glyph\"></ui-glyph></div>\n  <ui-glyph class=\"ui-invalid-icon\" glyph=\"glyph-invalid\"></ui-glyph><span>${display}</span>\n  <ui-glyph class=\"ui-caret\" glyph=\"glyph-caret-down\"></ui-glyph></div>\n  <ul class=\"ui-list-container ui-floating\" ref=\"dropdown\"><slot></slot></ul></template>"),
            aurelia_framework_1.customElement('ui-dropdown'),
            __metadata("design:paramtypes", [Element])
        ], UIDropdown);
        return UIDropdown;
    }());
    exports.UIDropdown = UIDropdown;
    var UIListGroup = (function () {
        function UIListGroup(element) {
            this.element = element;
            this.label = '';
        }
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
        return UIListGroup;
    }());
    exports.UIListGroup = UIListGroup;
    var UIListItem = (function () {
        function UIListItem(element) {
            this.element = element;
            this.glyph = '';
            this.value = '';
        }
        UIListItem.prototype.hilightItem = function (evt) {
            var h = this.element.parentElement.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
            evt.target.classList.add('ui-hilight');
        };
        UIListItem.prototype.unhilightItem = function (evt) {
            evt.target.classList.remove('ui-hilight');
        };
        UIListItem.prototype.fireSelect = function (evt) {
            ui_event_1.UIEvent.fireEvent('select', this.element, { value: this.value, model: this.model });
        };
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
            aurelia_framework_1.inlineView("<template class=\"ui-list-item\" click.trigger=\"fireSelect($event)\" mouseover.trigger=\"hilightItem($event)\" mouseout.trigger=\"unhilightItem($event)\">\n  <ui-glyph class.bind=\"glyph\" glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph><span if.bind=\"glyph\">&nbsp;</span><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-list-item'),
            __metadata("design:paramtypes", [Element])
        ], UIListItem);
        return UIListItem;
    }());
    exports.UIListItem = UIListItem;
});
