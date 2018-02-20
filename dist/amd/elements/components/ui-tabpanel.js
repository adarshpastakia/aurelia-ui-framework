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
            this.class = '';
            this.disabled = false;
            this.isDisabled = false;
        }
        UITabbarToggle.prototype.attached = function () {
            var _this = this;
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-tab-button') == _this.buttonEl)
                        return;
                    _this.buttonEl.classList.remove('ui-open');
                    _this.dropdown.classList.remove('ui-open');
                });
                this.buttonEl.classList.add('ui-btn-dropdown');
                this.dropdown.classList.add('ui-floating');
                this.tether = ui_utils_1.UIUtils.tether(this.buttonEl, this.dropdown);
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
                if (this.buttonEl.classList.contains('ui-open')) {
                    ui_event_1.UIEvent.fireEvent('menuhide', this.element);
                    this.buttonEl.classList.remove('ui-open');
                    this.dropdown.classList.remove('ui-open');
                }
                else {
                    if (ui_event_1.UIEvent.fireEvent('menuopen', this.buttonEl) !== false) {
                        this.buttonEl.classList.add('ui-open');
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
        ], UITabbarToggle.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabbarToggle.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabbarToggle.prototype, "disabled", void 0);
        UITabbarToggle = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-tabbar-toggle'),
            aurelia_framework_1.inlineView("<template><div ref=\"buttonEl\" slot=\"tab-button\" class=\"ui-tabbar-toggle ui-tab-button ${disabled?'ui-disabled':''} ${class}\" click.trigger=\"toggleDropdown($event)\"><slot><ui-glyph glyph=\"glyph-icon-plus\"></ui-glyph></slot></div></template>"),
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
            this.active = 0;
            this.noTabs = false;
            this.useRouter = false;
            if (element.hasAttribute('bottom'))
                element.classList.add('ui-bottom');
            if (element.hasAttribute('noborder'))
                element.classList.add('ui-noborder');
            this.noTabs = element.hasAttribute('notabs');
            this.useRouter = element.hasAttribute('use-router');
        }
        UITabPanel.prototype.attached = function () {
            var _this = this;
            if (!this.noTabs) {
                this.obResize = ui_event_1.UIEvent.subscribe('windowresize', function () { return _this.arrange(); });
                this.obClick = ui_event_1.UIEvent.subscribe('mouseclick', function () { return _this.overflow.classList.remove('ui-open'); });
                this.tether = ui_utils_1.UIUtils.tether(this.overflowToggle, this.overflow, { resize: false, position: 'br' });
                window.setTimeout(function () { return _this.arrange(); }, 500);
            }
            ui_event_1.UIEvent.queueTask(this.tabsChanged.bind(this));
        };
        UITabPanel.prototype.detached = function () {
            if (!this.noTabs) {
                this.tether.dispose();
                this.obClick.dispose();
                this.obResize.dispose();
            }
        };
        UITabPanel.prototype.tabsChanged = function () {
            var tabs = this.element.querySelectorAll('a.ui-tab-button');
            if (!this.activeTab && tabs.length > 0 && _.find(tabs, ['viewModel.active', true]) == null)
                this.activateTab(_.find(tabs, ['viewModel.disabled', false]));
        };
        UITabPanel.prototype.activeChanged = function (newValue) {
            var tabs = this.element.querySelectorAll('a.ui-tab-button');
            if (tabs.length == 0)
                return;
            var tab = (_.find(tabs, ['viewModel.id', newValue]) || tabs[newValue] || this.activeTab.buttonEl);
            if (this.activeTab)
                this.activeTab.active = false;
            (this.activeTab = tab.viewModel).active = true;
        };
        UITabPanel.prototype.activateTab = function (newTab) {
            if (!newTab)
                return;
            this.active = newTab.viewModel.id;
            ui_event_1.UIEvent.fireEvent('change', this.element, newTab.viewModel);
        };
        UITabPanel.prototype.canActivate = function (id) {
            var tabs = this.element.querySelectorAll('a.ui-tab-button');
            var tab = _.find(tabs, ['viewModel.id', id]);
            if (tab && tab.viewModel) {
                if (this.activeTab)
                    this.activeTab.active = false;
                (this.activeTab = tab.viewModel).active = true;
                return true;
            }
            return false;
        };
        UITabPanel.prototype.arrange = function () {
            if (!this.wrapper)
                return;
            this.overflow.classList.remove('ui-open');
            var tabs = this.element.querySelectorAll('a.ui-tab-button');
            for (var i = 0, c = this.overflow['children']; i < c.length; i++) {
                this.wrapper.insertBefore(c[i], this.overflowToggle);
            }
            if (tabs.length > 0 && (this.isOverflow = (this.wrapper.lastElementChild.previousElementSibling.offsetLeft + this.wrapper.lastElementChild.previousElementSibling.offsetWidth > this.wrapper.offsetWidth))) {
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
        UITabPanel.prototype.tabClose = function (tab) {
            var _this = this;
            this.canClose()
                .then(function () {
                tab.close();
                if (!_this.activeTab || _this.activeTab.id === tab.id)
                    ui_event_1.UIEvent.queueTask(function () { return [_this.activeTab = null, _this.tabsChanged(), _this.arrange()]; });
            });
        };
        UITabPanel.prototype.canClose = function () {
            var instance = null;
            if (instance && typeof instance.canClose === 'function') {
                var result = instance.canClose();
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
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "active", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.fromView }),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "activeTab", void 0);
        UITabPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tab-panel\" css.bind=\"{'min-height': height}\"><div class=\"ui-tabbar\" tabclosing.trigger=\"tabClose($event.detail)\" tabactivated.trigger=\"activateTab($event.target)\">\n  <slot name=\"ui-tabbar-start\"></slot>\n  <div class=\"ui-tabbar-buttons\" ref=\"wrapper\" show.bind=\"!noTabs\">\n    <slot name=\"tab-button\"></slot>\n    <div class=\"ui-tabbar-toggle ui-tab-button\" ref=\"overflowToggle\" show.bind=\"isOverflow\" click.trigger=\"showOverflow($event)\"><ui-glyph glyph=\"glyph-handle-overflow\"></ui-glyph></div>\n  </div>\n  <slot name=\"ui-tabbar-end\"></slot>\n  <div class=\"ui-menu ui-tabbar-overflow ui-floating\" ref=\"overflow\"></div>\n  </div><div class=\"ui-tab-panel-body\"><slot></slot></div></template>"),
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
            this.class = '';
            this.glyph = '';
            this.glyphClass = '';
            this.disabled = false;
            this.closeable = false;
            this.active = false;
            this.href = 'javascript:;';
            this.view = '';
            this.model = null;
            this.viewModel = '';
            this.id = 'tab-' + (UITab_1.seed++);
        }
        UITab_1 = UITab;
        UITab.prototype.bind = function (bindingContext, overrideContext) {
            this.closeable = this.closeable || this.element.hasAttribute('closeable');
            this.disabled = this.disabled || this.element.hasAttribute('disabled');
        };
        UITab.prototype.attached = function () {
            this.buttonEl.viewModel = this;
        };
        UITab.prototype.close = function () {
            var _this = this;
            ui_event_1.UIEvent.fireEvent('close', this.element, this);
            ui_event_1.UIEvent.queueTask(function () { return aurelia_framework_1.DOM.removeNode(_this.buttonEl); });
        };
        UITab.prototype.activeChanged = function (newValue) {
            if (!!newValue && this.href !== 'javascript:;')
                this.buttonEl.click();
        };
        UITab.prototype.fireTabClose = function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            ui_event_1.UIEvent.fireEvent('tabclosing', this.buttonEl, this);
            return false;
        };
        UITab.prototype.fireTabChange = function () {
            if (this.href === 'javascript:;')
                ui_event_1.UIEvent.fireEvent('tabactivated', this.buttonEl);
            return true;
        };
        UITab.seed = 0;
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "glyph", void 0);
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
        ], UITab.prototype, "closeable", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "active", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "href", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "view", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "viewModel", void 0);
        UITab = UITab_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><a ref=\"buttonEl\" slot=\"tab-button\" click.trigger=\"fireTabChange()\" href.bind=\"href\" class=\"ui-tab-button ${active?'ui-active':''} ${disabled?'ui-disabled':''} ${class}\">\n  <div><ui-glyph if.bind=\"glyph\" class=\"ui-tab-icon ${glyphClass}\" glyph.bind=\"glyph\"></ui-glyph>\n  <span class=\"ui-label\"><slot></slot></span></div>\n  <span if.bind=\"closeable\" class=\"ui-close\" click.trigger=\"fireTabClose($event)\">&nbsp;&times;</span>\n</a></template>"),
            aurelia_framework_1.customElement('ui-tab'),
            __metadata("design:paramtypes", [Element])
        ], UITab);
        return UITab;
        var UITab_1;
    }());
    exports.UITab = UITab;
});
