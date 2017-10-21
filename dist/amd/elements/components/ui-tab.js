var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-utils", "../../utils/ui-event", "lodash"], function (require, exports, aurelia_framework_1, ui_utils_1, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UITabbarStart = (function () {
        function UITabbarStart() {
        }
        UITabbarStart = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-tabbar-start'),
            aurelia_framework_1.inlineView("<template><div slot=\"ui-tabbar-start\" class=\"ui-tabbar-links\"><slot></slot></div></template>")
        ], UITabbarStart);
        return UITabbarStart;
    }());
    exports.UITabbarStart = UITabbarStart;
    var UITabbarEnd = (function () {
        function UITabbarEnd() {
        }
        UITabbarEnd = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-tabbar-end'),
            aurelia_framework_1.inlineView("<template><div slot=\"ui-tabbar-end\" class=\"ui-tabbar-links\"><slot></slot></div></template>")
        ], UITabbarEnd);
        return UITabbarEnd;
    }());
    exports.UITabbarEnd = UITabbarEnd;
    var UITabbarToggle = (function () {
        function UITabbarToggle(element) {
            this.element = element;
            this.disabled = false;
            this.isDisabled = false;
        }
        UITabbarToggle.prototype.attached = function () {
            var _this = this;
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-button') == _this.element)
                        return;
                    _this.element.classList.remove('ui-open');
                    _this.dropdown.classList.remove('ui-open');
                });
                this.element.classList.add('ui-btn-dropdown');
                this.dropdown.classList.add('ui-floating');
                this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
            }
        };
        UITabbarToggle.prototype.detached = function () {
            if (this.tether)
                this.tether.dispose();
            if (this.obMouseup)
                this.obMouseup.dispose();
            if (this.dropdown)
                aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UITabbarToggle.prototype.toggleDropdown = function (evt) {
            if (evt.button != 0)
                return true;
            if (this.dropdown) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.cancelBubble = true;
                if (this.element.classList.contains('ui-open')) {
                    ui_event_1.UIEvent.fireEvent('menuhide', this.element);
                    this.element.classList.remove('ui-open');
                    this.dropdown.classList.remove('ui-open');
                }
                else {
                    if (ui_event_1.UIEvent.fireEvent('menuopen', this.element) !== false) {
                        this.element.classList.add('ui-open');
                        this.dropdown.classList.add('ui-open');
                        this.tether.position();
                    }
                }
                return false;
            }
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabbarToggle.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabbarToggle.prototype, "disabled", void 0);
        UITabbarToggle = __decorate([
            aurelia_framework_1.customElement('ui-tabbar-toggle'),
            aurelia_framework_1.inlineView("<template class=\"ui-tabbar-toggle ui-tab-button ${disabled?'ui-disabled':''}\" click.trigger=\"toggleDropdown($event)\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UITabbarToggle);
        return UITabbarToggle;
    }());
    exports.UITabbarToggle = UITabbarToggle;
    var UITabPanel = (function () {
        function UITabPanel(element) {
            this.element = element;
            this.isOverflow = false;
            this.height = "auto";
            this.tabs = [];
            this.activeTab = 0;
            this.noTabs = false;
            if (element.hasAttribute('bottom'))
                element.classList.add('bottom');
            if (element.hasAttribute('noborder'))
                element.classList.add('noborder');
            this.noTabs = element.hasAttribute('notabs');
        }
        UITabPanel.prototype.attached = function () {
            var _this = this;
            if (!this.noTabs) {
                this.obResize = ui_event_1.UIEvent.subscribe('windowresize', function () { return _this.arrange(); });
                this.obClick = ui_event_1.UIEvent.subscribe('mouseclick', function () { return _this.overflow.classList.remove('ui-open'); });
                this.tether = ui_utils_1.UIUtils.tether(this.overflowToggle, this.overflow, { resize: false, position: 'br' });
                window.setTimeout(function () { return _this.arrange(); }, 500);
            }
        };
        UITabPanel.prototype.detached = function () {
            if (!this.noTabs) {
                this.tether.dispose();
                this.obClick.dispose();
                this.obResize.dispose();
            }
        };
        UITabPanel.prototype.tabsChanged = function () {
            var _this = this;
            if (!this.activeTabEl && this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
                this.activateTab(_.find(this.tabs, ['disabled', false]));
            ui_event_1.UIEvent.queueTask(function () { return _this.arrange(); });
        };
        UITabPanel.prototype.activeTabChanged = function (newValue) {
            if (this.tabs.length == 0)
                return;
            var tab = (_.find(this.tabs, ['id', newValue]) || this.tabs[newValue] || this.activeTabEl);
            if (this.activeTabEl)
                this.activeTabEl.active = false;
            (this.activeTabEl = tab).active = true;
        };
        UITabPanel.prototype.close = function (id, force) {
            if (force === void 0) { force = false; }
            var tab = _.find(this.tabs, ['id', id]);
            if (tab)
                force ? this.doClose(tab) : this.closeTab(tab);
        };
        UITabPanel.prototype.closeTab = function (tab) {
            var _this = this;
            tab.canDeactivate()
                .then(function (b) {
                if (b === true) {
                    if (isFunction(tab.beforeclose)) {
                        var ret = tab.beforeclose(tab);
                        if (ret instanceof Promise)
                            ret.then(function (b) {
                                if (b) {
                                    _this.doClose(tab);
                                }
                            });
                        else if (ret !== false) {
                            _this.doClose(tab);
                        }
                    }
                    else if (ui_event_1.UIEvent.fireEvent('beforeclose', tab.element, tab) !== false) {
                        _this.doClose(tab);
                    }
                }
            });
        };
        UITabPanel.prototype.doClose = function (tab) {
            _.remove(this.tabs, ['id', tab.id]);
            if (this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
                this.activateTab(_.findLast(this.tabs, ['disabled', false]));
            tab.remove();
            ui_event_1.UIEvent.fireEvent('closed', this.element, tab);
        };
        UITabPanel.prototype.activateTab = function (newTab) {
            if (this.activeTabEl)
                this.activeTabEl.active = false;
            (this.activeTabEl = newTab).active = true;
            this.activeTab = newTab.id;
            ui_event_1.UIEvent.fireEvent('activate', newTab.element, newTab);
        };
        UITabPanel.prototype.canActivate = function (id) {
            var tab = _.find(this.tabs, ['id', id]);
            if (tab) {
                if (this.activeTabEl)
                    this.activeTabEl.active = false;
                (this.activeTabEl = tab).active = true;
                return true;
            }
            return false;
        };
        UITabPanel.prototype.arrange = function () {
            if (!this.wrapper)
                return;
            this.overflow.classList.remove('ui-open');
            for (var i = 0, c = this.overflow['children']; i < c.length; i++) {
                this.wrapper.insertBefore(c[i], this.overflowToggle);
            }
            if (this.tabs.length > 0 && (this.isOverflow = (this.wrapper.lastElementChild.previousElementSibling.offsetLeft + this.wrapper.lastElementChild.previousElementSibling.offsetWidth > this.wrapper.offsetWidth))) {
                for (var c = this.wrapper['children'], i = c.length - 2; i >= 0; i--) {
                    if (c[i].offsetLeft + c[i].offsetWidth > this.wrapper.offsetWidth) {
                        if (this.overflow.hasChildNodes)
                            this.overflow.insertBefore(c[i], this.overflow.childNodes[0]);
                        else
                            this.overflow.appendChild(c[i]);
                    }
                }
            }
        };
        UITabPanel.prototype.showOverflow = function (evt) {
            if (evt.button != 0)
                return true;
            if (!this.overflow.classList.contains('ui-open')) {
                this.overflow.classList.add('ui-open');
                this.tether.position();
            }
            else
                this.overflow.classList.remove('ui-open');
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.children('ui-tab'),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "tabs", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "activeTab", void 0);
        UITabPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tab-panel\" css.bind=\"{'min-height': height}\"><div class=\"ui-tabbar\">\n  <slot name=\"ui-tabbar-start\"></slot>\n  <div class=\"ui-tabbar-buttons\" ref=\"wrapper\" if.bind=\"!noTabs\">\n    <a click.trigger=\"activateTab(tab)\" repeat.for=\"tab of tabs\" class=\"ui-tab-button ${tab.active?'ui-active':''} ${tab.disabled?'ui-disabled':''}\">\n      <ui-glyph if.bind=\"tab.glyph\" class=\"ui-tab-icon ${tab.glyphClass}\" glyph.bind=\"tab.glyph\"></ui-glyph>\n      <span class=\"ui-label\" if.bind=\"tab.label\" innerhtml.bind=\"tab.label\"></span>\n      <span if.bind=\"tab.closeable\" class=\"ui-close\" click.trigger=\"closeTab(tab)\">&nbsp;&times;</span>\n    </a>\n    <div class=\"ui-tabbar-toggle ui-tab-button\" ref=\"overflowToggle\" show.bind=\"isOverflow\" click.trigger=\"showOverflow($event)\"><ui-glyph glyph=\"glyph-handle-overflow\"></ui-glyph></div>\n  </div>\n  <slot name=\"ui-tabbar-end\"></slot>\n  <div class=\"ui-menu ui-tabbar-overflow ui-floating\" ref=\"overflow\"></div>\n  </div><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-tab-panel'),
            __metadata("design:paramtypes", [Element])
        ], UITabPanel);
        return UITabPanel;
    }());
    exports.UITabPanel = UITabPanel;
    var UITab = (function () {
        function UITab(element) {
            this.element = element;
            this.id = '';
            this.glyph = '';
            this.label = '';
            this.glyphClass = '';
            this.disabled = false;
            this.active = false;
            this.closeable = false;
            if (element.hasAttribute('flex'))
                element.classList.add('ui-flexed');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
            this.id = 'tab-' + (UITab_1.seed++);
            this.closeable = element.hasAttribute('closeable');
        }
        UITab_1 = UITab;
        UITab.prototype.bind = function (bindingContext, overrideContext) {
            this.disabled = isTrue(this.disabled);
        };
        UITab.prototype.remove = function () {
            try {
                if (this.viewModel)
                    this.viewModel.detached();
            }
            catch (e) { }
            aurelia_framework_1.DOM.removeNode(this.element);
            try {
                if (this.viewModel)
                    this.viewModel.unbind();
            }
            catch (e) { }
        };
        UITab.prototype.canDeactivate = function () {
            var instance = this.viewModel;
            if (instance && typeof instance.canDeactivate === 'function') {
                var result = instance.canDeactivate();
                if (result instanceof Promise) {
                    return result;
                }
                if (result !== null && result !== undefined) {
                    return Promise.resolve(result);
                }
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        };
        Object.defineProperty(UITab.prototype, "viewModel", {
            get: function () {
                if (this.element.firstElementChild && this.element.firstElementChild.tagName.toLowerCase() == 'compose')
                    return this.element.firstElementChild.au.compose.viewModel.currentViewModel;
                return null;
            },
            enumerable: true,
            configurable: true
        });
        UITab.seed = 0;
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "glyphClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "beforeclose", void 0);
        UITab = UITab_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tab ${active?'ui-active':''}\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-tab'),
            __metadata("design:paramtypes", [Element])
        ], UITab);
        return UITab;
        var UITab_1;
    }());
    exports.UITab = UITab;
});
