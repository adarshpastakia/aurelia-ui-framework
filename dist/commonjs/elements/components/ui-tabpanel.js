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
var ui_utils_1 = require("../../utils/ui-utils");
var ui_event_1 = require("../../utils/ui-event");
var _ = require("lodash");
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
        if (!this.tab && this.tabs.length > 0 && _.find(this.tabs, ['viewModel.active', true]) == null)
            this.activateTab(_.find(this.tabs, ['viewModel.disabled', false]));
        ui_event_1.UIEvent.queueTask(function () { return _this.arrange(); });
    };
    UITabPanel.prototype.activeTabChanged = function (newValue) {
        if (this.tabs.length == 0)
            return;
        var tab = (_.find(this.tabs, ['viewModel.id', newValue]) || this.tabs[newValue] || this.tab.buttonEl);
        console.log(this.tab, tab.viewModel);
        if (this.tab)
            this.tab.active = false;
        (this.tab = tab.viewModel).active = true;
    };
    UITabPanel.prototype.activateTab = function (newTab) {
        if (!newTab)
            return;
        this.activeTab = newTab.viewModel.id;
        ui_event_1.UIEvent.fireEvent('activate', this.element, newTab);
    };
    UITabPanel.prototype.canActivate = function (id) {
        var tab = _.find(this.tabs, ['viewModel.id', id]);
        if (tab && tab.viewModel) {
            if (this.tab)
                this.tab.active = false;
            (this.tab = tab.viewModel).active = true;
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
        aurelia_framework_1.children('.ui-tab-button'),
        __metadata("design:type", Object)
    ], UITabPanel.prototype, "tabs", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UITabPanel.prototype, "activeTab", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.fromView }),
        __metadata("design:type", Object)
    ], UITabPanel.prototype, "tab", void 0);
    UITabPanel = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-tab-panel\" css.bind=\"{'min-height': height}\"><div class=\"ui-tabbar\">\n  <slot name=\"ui-tabbar-start\"></slot>\n  <div class=\"ui-tabbar-buttons\" ref=\"wrapper\" show.bind=\"!noTabs\" tabactivated.trigger=\"activateTab($event.target)\">\n    <slot name=\"tab-button\"></slot>\n    <div class=\"ui-tabbar-toggle ui-tab-button\" ref=\"overflowToggle\" show.bind=\"isOverflow\" click.trigger=\"showOverflow($event)\"><ui-glyph glyph=\"glyph-handle-overflow\"></ui-glyph></div>\n  </div>\n  <slot name=\"ui-tabbar-end\"></slot>\n  <div class=\"ui-menu ui-tabbar-overflow ui-floating\" ref=\"overflow\"></div>\n  </div><div class=\"ui-tab-panel-body\"><slot></slot></div></template>"),
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
        this.glyphClass = '';
        this.disabled = false;
        this.active = false;
        this.href = 'javascript:;';
        this.view = '';
        this.model = null;
        this.viewModel = '';
        this.closeable = false;
        this.id = 'tab-' + (UITab_1.seed++);
        this.closeable = element.hasAttribute('closeable');
    }
    UITab_1 = UITab;
    UITab.prototype.bind = function (bindingContext, overrideContext) {
        this.disabled = this.disabled || this.element.hasAttribute('disabled');
    };
    UITab.prototype.attached = function () {
        this.buttonEl.viewModel = this;
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
        aurelia_framework_1.inlineView("<template><a ref=\"buttonEl\" slot=\"tab-button\" click.trigger=\"fireTabChange()\" href.bind=\"href\" class=\"ui-tab-button ${active?'ui-active':''} ${disabled?'ui-disabled':''}\">\n  <div><ui-glyph if.bind=\"glyph\" class=\"ui-tab-icon ${glyphClass}\" glyph.bind=\"glyph\"></ui-glyph>\n  <span class=\"ui-label\"><slot></slot></span></div>\n  <span if.bind=\"closeable\" class=\"ui-close\" click.trigger=\"closeTab()\">&nbsp;&times;</span>\n</a></template>"),
        aurelia_framework_1.customElement('ui-tab'),
        __metadata("design:paramtypes", [Element])
    ], UITab);
    return UITab;
    var UITab_1;
}());
exports.UITab = UITab;
