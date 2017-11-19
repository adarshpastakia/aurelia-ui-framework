var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseList = (function () {
        function BaseList() {
            this.value = '';
            this.options = [];
            this.clear = true;
            this.readonly = false;
            this.disabled = false;
            this.allowSearch = true;
            this.forceSelect = true;
            this.valueProperty = 'id';
            this.iconProperty = 'icon';
            this.displayProperty = 'text';
            this.original = [];
            this.filtered = [];
            this.isDisabled = false;
            this.isTagInput = false;
            this.showDropdown = false;
        }
        BaseList.prototype.bind = function (bindingContext, overrideContext) {
            this.readonlyChanged(this.readonly);
            this.disabledChanged(this.disabled);
            this.forceSelect = isTrue(this.forceSelect);
            this.optionsChanged(this.options);
            this.valueChanged(this.value);
        };
        BaseList.prototype.attached = function () {
            var _this = this;
            this.floating = this.dropdown.classList.contains('ui-floating');
            if (this.floating) {
                this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-list-container') == _this.dropdown)
                        return true;
                    _this.closeDropdown();
                });
            }
            ui_event_1.UIEvent.queueTask(function () { return _this.valueChanged(_this.value, true); });
        };
        BaseList.prototype.detached = function () {
            if (this.floating) {
                this.tether.dispose();
                this.obMouseup.dispose();
            }
        };
        BaseList.prototype.disabledChanged = function (newValue) {
            this.element.classList[(this.isDisabled = this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
        };
        BaseList.prototype.readonlyChanged = function (newValue) {
            this.element.classList[(this.readonly = !!newValue) ? 'add' : 'remove']('ui-readonly');
        };
        BaseList.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        BaseList.prototype.clearInput = function () {
            this.value = '';
            this.inputEl.focus();
        };
        BaseList.prototype.focus = function () {
            this.inputEl.focus();
        };
        BaseList.prototype.valueChanged = function (newValue, oldValue) {
            var _this = this;
            if (!this.isTagInput) {
                var item = _['findChildren'](this.filtered = this.original, 'items', 'value', newValue === null ? '' : newValue);
                this.elValue = item.text;
                if (!this.forceSelect && !this.elValue)
                    this.elValue = newValue === null ? '' : newValue;
                else if (!this.elValue)
                    this.value = '';
                this.model = item.model;
            }
            else {
                var v = (newValue || '').split(',');
                _.forEach(v, function (n) { return _['findChildren'](_this.filtered = _this.original, 'items', 'value', n).disabled = true; });
            }
            ui_event_1.UIEvent.queueTask(function () {
                _this.hilight = _this.dropdown.querySelector('.ui-selected');
                _this.scrollIntoView();
            });
        };
        BaseList.prototype.optionsChanged = function (newValue) {
            var _this = this;
            var groups = [];
            if (_.isArray(newValue)) {
                var list_1 = [];
                _.forEach(newValue, function (v) { return list_1.push({
                    value: v[_this.valueProperty] == null ? v : v[_this.valueProperty],
                    text: v[_this.displayProperty] == null ? v : v[_this.displayProperty],
                    display: v[_this.displayProperty] == null ? v : v[_this.displayProperty],
                    icon: v[_this.iconProperty], model: v
                }); });
                groups.push({ items: list_1 });
                this.allowSearch = !this.forceSelect || list_1.length > 10;
            }
            else {
                var count_1 = 0;
                _.forEach(newValue, function (g, k) {
                    var list = [];
                    _.forEach(g, function (v) { return list.push({
                        value: v[_this.valueProperty] == null ? v : v[_this.valueProperty],
                        text: v[_this.displayProperty] == null ? v : v[_this.displayProperty],
                        display: v[_this.displayProperty] == null ? v : v[_this.displayProperty],
                        icon: v[_this.iconProperty], model: v
                    }); });
                    groups.push({ label: k, items: list });
                    count_1 += list.length;
                });
                this.allowSearch = !this.forceSelect || count_1 > 10;
            }
            this.original = this.filtered = groups;
        };
        BaseList.prototype.hilightItem = function (evt) {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
            (this.hilight = evt.target).classList.add('ui-hilight');
        };
        BaseList.prototype.unhilightItem = function (evt) {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h !== null) {
                h.classList.remove('ui-hilight');
                this.hilight = null;
            }
        };
        BaseList.prototype.scrollIntoView = function () {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight') || this.dropdown.querySelector('.ui-list-item.ui-selected');
            if (h !== null) {
                if (h.offsetTop < this.dropdown.scrollTop || h.offsetTop - this.dropdown.scrollTop > this.dropdown.clientHeight - 10)
                    this.dropdown.scrollTop = h.offsetTop - (this.dropdown.offsetHeight / 2);
            }
            else {
                this.dropdown.scrollTop = 0;
            }
        };
        BaseList.prototype.openDropdown = function () {
            if (this.readonly || this.disabled)
                return true;
            this.dropdown.isOpen = true;
            this.dropdown.classList.add('ui-open');
            if (this.floating)
                this.tether.position();
            this.unhilightItem();
            this.scrollIntoView();
        };
        BaseList.prototype.closeDropdown = function () {
            this.dropdown.isOpen = false;
            this.dropdown.classList.remove('ui-open');
        };
        BaseList.prototype.toggleDropdown = function (evt) {
            evt.stopPropagation();
            evt.cancelBubble = true;
            this.inputEl.focus();
            this.dropdown.isOpen ? this.closeDropdown() : this.openDropdown();
        };
        BaseList.prototype.fireEvent = function (evt) {
            evt.stopPropagation();
            var el = getParentByClass(this.element, 'ui-input-group');
            if (evt.type === 'focus') {
                this.inputEl.select();
                this.element.classList.add('ui-focus');
                if (el)
                    el.classList.add('ui-focus');
            }
            if (evt.type === 'blur') {
                this.element.classList.remove('ui-focus');
                if (el)
                    el.classList.remove('ui-focus');
                if (!this.dropdown.isOpen)
                    this.scrollIntoView();
            }
            ui_event_1.UIEvent.fireEvent(evt.type, this.element, this.value);
        };
        BaseList.prototype.keyDown = function (evt) {
            var _this = this;
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            if (this.readonly || this.disabled)
                return true;
            var code = (evt.keyCode || evt.which);
            if (code == 13 && this.dropdown.isOpen) {
                if (this.hilight)
                    this.hilight.click();
                if (!this.hilight && this.forceSelect)
                    this.elValue = _['findChildren'](this.filtered = this.original, 'items', 'value', this.value).text;
                if (!this.hilight && !this.forceSelect)
                    this.addValue(this.inputEl.value);
                this.closeDropdown();
                return false;
            }
            else if (code == 13 && !this.dropdown.isOpen) {
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element, this);
            }
            if (code == 8 && this.elValue == '') {
                return this.removeValue(null);
            }
            if (code === 9) {
                if (!this.isTagInput) {
                    this.elValue = _['findChildren'](this.filtered = this.original, 'items', 'value', this.value).text;
                    if (!this.forceSelect && !this.elValue)
                        this.elValue = this.value;
                }
                else {
                    this.elValue = '';
                }
                this.closeDropdown();
                return true;
            }
            if (this.filtered.length == 0)
                return true;
            if (!this.dropdown.isOpen) {
                this.openDropdown();
            }
            if (!this.hilight)
                this.hilight = this.dropdown.querySelector('.ui-selected');
            if (code === 38) {
                if (!this.hilight)
                    this.hilight = this.dropdown.querySelector('.ui-list-item:last-child');
                else if (this.hilight) {
                    this.hilight.classList.remove('ui-hilight');
                    var prev = this.hilight.previousElementSibling;
                    this.hilight = prev || this.hilight;
                }
                while (this.hilight != null && (this.hilight.classList.contains('ui-list-group') || this.hilight.classList.contains('ui-disabled')))
                    this.hilight = this.hilight.previousElementSibling;
                ui_event_1.UIEvent.queueTask(function () {
                    if (_this.hilight)
                        _this.hilight.classList.add('ui-hilight');
                    _this.scrollIntoView();
                });
                return false;
            }
            if (code === 40) {
                if (!this.hilight)
                    this.hilight = this.dropdown.querySelector('.ui-list-item');
                else if (this.hilight) {
                    this.hilight.classList.remove('ui-hilight');
                    var next = this.hilight.nextElementSibling;
                    this.hilight = next || this.hilight;
                }
                while (this.hilight != null && (this.hilight.classList.contains('ui-list-group') || this.hilight.classList.contains('ui-disabled')))
                    this.hilight = this.hilight.nextElementSibling;
                ui_event_1.UIEvent.queueTask(function () {
                    if (_this.hilight)
                        _this.hilight.classList.add('ui-hilight');
                    _this.scrollIntoView();
                });
                return false;
            }
            return true;
        };
        BaseList.prototype.search = function () {
            var _this = this;
            if (this.hilight != null)
                this.hilight.classList.remove('hilight');
            this.hilight = null;
            this.dropdown.scrollTop = 0;
            var groups = [];
            var rx = new RegExp(getAscii(this.elValue), 'i');
            _.forEach(_.cloneDeep(this.original), function (v, k) {
                var list = _.filter(v.items, function (n) {
                    var lbl = n.text + '';
                    var asc = getAscii(lbl);
                    if (rx.test(asc)) {
                        var start = asc.search(rx);
                        lbl = lbl.substr(0, start + _this.elValue.length) + '</u>' +
                            lbl.substr(start + _this.elValue.length);
                        lbl = lbl.substr(0, start) + '<u>' + lbl.substr(start);
                        n.display = lbl;
                        return true;
                    }
                    return false;
                });
                if (list.length !== 0)
                    groups.push({ label: v.label, items: list });
            });
            if (!this.forceSelect && !this.isTagInput)
                this.value = this.elValue;
            ui_event_1.UIEvent.queueTask(function () { return _this.filtered = groups; });
            ;
        };
        BaseList.prototype.fireSelect = function (model) {
            if (this.readonly || this.disabled)
                return;
            this.filtered = this.original;
            this.unhilightItem(null);
            this.inputEl.focus();
            if (!this.isTagInput && model) {
                this.value = model[this.valueProperty] == null ? model : model[this.valueProperty];
                ui_event_1.UIEvent.fireEvent('select', this.element, this.model = model);
                this.fireChange();
            }
            this.closeDropdown();
        };
        BaseList.prototype.fireChange = function () {
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        BaseList.prototype.addValue = function (val) {
            this.model = null;
            this.value = val;
            this.fireChange();
        };
        BaseList.prototype.removeValue = function (val) { };
        return BaseList;
    }());
    exports.BaseList = BaseList;
    var UICombo = (function (_super) {
        __extends(UICombo, _super);
        function UICombo(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.errors = null;
            _this.disabled = false;
            _this.readonly = false;
            _this.helpText = '';
            _this.placeholder = '';
            _this.emptyText = 'No Results';
            _this.iconClass = '';
            _this.valueProperty = 'value';
            _this.displayProperty = 'text';
            _this.iconProperty = 'icon';
            _this.forceSelect = true;
            _this.clear = element.hasAttribute('clear');
            return _this;
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UICombo.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UICombo.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "emptyText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "iconClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "displayProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "iconProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICombo.prototype, "forceSelect", void 0);
        UICombo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-list\"><div role=\"input\" class=\"ui-input-control\"><slot></slot>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" value.bind=\"elValue\" autocomplete=\"off\" size=\"1\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\" click.trigger=\"openDropdown($event)\"\n    input.trigger=\"search() & debounce:200\" change.trigger=\"fireEvent($event)\" select.trigger=\"$event.stopPropagation()\"\n    keydown.trigger=\"keyDown($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"!allowSearch || readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-input-addon ui-dropdown-handle\" click.trigger=\"toggleDropdown($event)\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></span></div>\n\n  <div class=\"ui-list-container ui-floating\" ref=\"dropdown\">\n    <div if.bind=\"filtered.length==0\" class=\"ui-text-muted ui-pad-h\">${emptyText}</div>\n    <template repeat.for=\"group of filtered\"><div if.bind=\"group.label\" class=\"ui-list-group\">${group.label}</div>\n    <div class=\"ui-list-item ${item.value==value?'ui-selected':''} ${item.disabled?'ui-disabled':''}\" repeat.for=\"item of group.items\"\n      mouseover.trigger=\"hilightItem($event)\" click.trigger=\"fireSelect(item.model)\">\n      <span class=\"${iconClass} ${item.icon}\" if.bind=\"item.icon\"></span>&nbsp;<span innerhtml.bind=\"item.display\"></span></div>\n    </template></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-combo'),
            __metadata("design:paramtypes", [Element])
        ], UICombo);
        return UICombo;
    }(BaseList));
    exports.UICombo = UICombo;
    var UITags = (function (_super) {
        __extends(UITags, _super);
        function UITags(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.errors = null;
            _this.disabled = false;
            _this.readonly = false;
            _this.helpText = '';
            _this.placeholder = '';
            _this.emptyText = 'No Results';
            _this.iconClass = '';
            _this.valueProperty = 'value';
            _this.displayProperty = 'text';
            _this.iconProperty = 'icon';
            _this.forceSelect = true;
            _this.isTagInput = true;
            _this.clear = element.hasAttribute('clear');
            return _this;
        }
        UITags.prototype.getDisplay = function (tag) {
            return _['findChildren'](this.original, 'items', 'value', tag).text || tag;
        };
        UITags.prototype.addValue = function (val) {
            var _this = this;
            if (!val)
                return;
            var v = [];
            if (this.value)
                v = this.value.split(',');
            if (v.indexOf(val) == -1) {
                v.push(val);
                _['findChildren'](this.filtered = this.original, 'items', 'value', val).disabled = true;
            }
            this.value = v.join(',');
            this.elValue = '';
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h)
                h.classList.remove('ui-hilight');
            ui_event_1.UIEvent.queueTask(function () { return _this.tether.position(); });
        };
        UITags.prototype.removeValue = function (val) {
            var _this = this;
            var v = [];
            if (this.value)
                v = this.value.split(',');
            if (!val)
                _['findChildren'](this.filtered = this.original, 'items', 'value', v.pop()).disabled = false;
            else {
                _['findChildren'](this.filtered = this.original, 'items', 'value', val).disabled = false;
                if (v.indexOf(val) != -1)
                    v.splice(v.indexOf(val), 1);
            }
            this.value = v.join(',');
            this.elValue = '';
            ui_event_1.UIEvent.queueTask(function () { return _this.tether.position(); });
        };
        UITags.prototype.fireSelect = function (model) {
            var val = model ? (model[this.valueProperty] == null ? model : model[this.valueProperty]) : '';
            this.addValue(this.forceSelect ? val : (val || this.elValue));
            _super.prototype.fireSelect.call(this, model);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITags.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "emptyText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "iconClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "displayProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "iconProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITags.prototype, "forceSelect", void 0);
        UITags = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-list ui-tags\"><div role=\"input\" class=\"ui-input-control\"><slot></slot>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <div class=\"ui-tag-item\" repeat.for=\"tag of value | split\" if.bind=\"tag!=''\"><span innerhtml.bind=\"getDisplay(tag)\"></span><i class=\"ui-clear\" click.trigger=\"removeValue(tag)\">&times;</i></div>\n  <input ref=\"inputEl\" value.bind=\"elValue\" autocomplete=\"off\" size=\"1\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\" select.trigger=\"$event.stopPropagation()\"\n    input.trigger=\"search() & debounce:200\" change.trigger=\"fireEvent($event)\"\n    keydown.trigger=\"keyDown($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"!allowSearch || readonly\"/></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n\n  <div class=\"ui-list-container ui-floating\" ref=\"dropdown\">\n    <div if.bind=\"filtered.length==0\" class=\"ui-text-muted ui-pad-h\">${emptyText}</div>\n    <template repeat.for=\"group of filtered\"><div if.bind=\"group.label\" class=\"ui-list-group\">${group.label}</div>\n    <div class=\"ui-list-item ${item.disabled?'ui-disabled':''}\" repeat.for=\"item of group.items\"\n      mouseover.trigger=\"hilightItem($event)\" click.trigger=\"fireSelect(item.model)\">\n      <span class=\"${iconClass} ${item.icon}\" if.bind=\"item.icon\"></span>&nbsp;<span innerhtml.bind=\"item.display\"></span></div>\n    </template>\n  </div>\n</template>"),
            aurelia_framework_1.customElement('ui-tags'),
            __metadata("design:paramtypes", [Element])
        ], UITags);
        return UITags;
    }(BaseList));
    exports.UITags = UITags;
    var UIList = (function (_super) {
        __extends(UIList, _super);
        function UIList(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.errors = null;
            _this.disabled = false;
            _this.readonly = false;
            _this.helpText = '';
            _this.placeholder = '';
            _this.emptyText = 'No Results';
            _this.iconClass = '';
            _this.valueProperty = 'value';
            _this.displayProperty = 'text';
            _this.iconProperty = 'icon';
            _this.forceSelect = true;
            _this.clear = element.hasAttribute('clear');
            if (_this.element.hasAttribute('fill'))
                _this.element.classList.add('ui-fill');
            return _this;
        }
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIList.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIList.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "emptyText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "iconClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "valueProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "displayProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "iconProperty", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIList.prototype, "forceSelect", void 0);
        UIList = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-list ui-listbox\"><div role=\"input\" class=\"ui-input-control\">\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" value.bind=\"elValue\" class=\"ui-input ui-remove\" autocomplete=\"off\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\" size=\"1\"\n    input.trigger=\"search() & debounce:200\" change.trigger=\"fireEvent($event)\"\n    keydown.trigger=\"keyDown($event)\" placeholder.bind=\"placeholder\" select.trigger=\"$event.stopPropagation()\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"true\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n\n  <div class=\"ui-list-container\" ref=\"dropdown\" mouseout.trigger=\"unhilightItem()\">\n    <div if.bind=\"filtered.length==0\" class=\"ui-text-muted ui-pad-h\">${emptyText}</div>\n    <template repeat.for=\"group of filtered\"><div if.bind=\"group.label\" class=\"ui-list-group\">${group.label}</div>\n    <div class=\"ui-list-item ${item.value==value?'ui-selected':''} ${item.disabled?'ui-disabled':''}\" repeat.for=\"item of group.items\"\n      mouseover.trigger=\"hilightItem($event)\" click.trigger=\"fireSelect(item.model)\">\n      <span class=\"${iconClass} ${item.icon}\" if.bind=\"item.icon\"></span>&nbsp;<span innerhtml.bind=\"item.display\"></span></div>\n    </template>\n  </div></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-list'),
            __metadata("design:paramtypes", [Element])
        ], UIList);
        return UIList;
    }(BaseList));
    exports.UIList = UIList;
});
