'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk.js');
var aureliaFramework = require('aurelia-framework');
require('aurelia-event-aggregator');
var __chunk_3 = require('./chunk3.js');
var ResizeObserver = _interopDefault(require('resize-observer-polyfill'));

var tabSeed = 0;
var UITab = (function () {
    function UITab(element) {
        this.element = element;
        this.id = "";
        this.label = "";
        this.icon = "";
        this.active = false;
        this.disabled = false;
        this.closeable = false;
        this.id = "tab__" + tabSeed++;
    }
    UITab.prototype.bind = function () {
        this.closeable = !isFalse(this.closeable);
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UITab.prototype, "id", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UITab.prototype, "label", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UITab.prototype, "icon", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UITab.prototype, "active", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UITab.prototype, "disabled", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UITab.prototype, "view", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UITab.prototype, "model", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UITab.prototype, "viewModel", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UITab.prototype, "closeable", void 0);
    UITab = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-tab"),
        aureliaFramework.inlineView("<template class=\"ui-tab\" data-active.bind=\"active\" data-hide.bind=\"!!view || !!viewModel\"><slot></slot></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UITab);
    return UITab;
}());

var UITabbarEnd = (function () {
    function UITabbarEnd(element) {
        this.element = element;
    }
    UITabbarEnd = __chunk_1.__decorate([
        aureliaFramework.containerless(),
        aureliaFramework.customElement("ui-tabbar-end"),
        aureliaFramework.inlineView("<template><div slot=\"tabbar-end\"><slot></slot></div></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UITabbarEnd);
    return UITabbarEnd;
}());

var view = "<template class=\"ui-tab__panel\" data-align.bind=\"align\">\n  <div class=\"ui-tab__bar\">\n    <div class=\"ui-tab__bar__start\">\n      <slot name=\"tabbar-start\"></slot>\n    </div>\n    <div class=\"ui-tab__bar__wrapper\" ref=\"wrapperEl\">\n      <!-- repeat tabs -->\n      <template repeat.for=\"tab of tabs\">\n        <div class=\"ui-tab__button\" data-id.bind=\"tab.id\" data-active.bind=\"tab.active\" data-disabled.bind=\"tab.disabled\" click.trigger=\"activateTab(tab.id)\" ui-tooltip.bind=\"tab.label\">\n          <span class=\"ui-tab__button__icon\" if.bind=\"tab.icon\">\n            <ui-icon icon.bind=\"tab.icon\"></ui-icon>\n          </span>\n          <span class=\"ui-tab__button__label\" innerhtml.bind=\"tab.label\"></span>\n          <span class=\"ui-tab__button__close\" if.bind=\"tab.closeable\" click.trigger=\"[closeTab(tab.id), $event.stopEvent()]\">\n            <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n          </span>\n        </div>\n      </template>\n    </div>\n    <div class=\"ui-tab__bar__end\">\n      <slot name=\"tabbar-end\"></slot>\n    </div>\n    <div class=\"ui-tab__bar__overflow\" show.bind=\"hasOverflow\">\n      <ui-button no-caret type=\"link\" ui-theme=\"secondary\" size=\"sm\">\n        <ui-svg-icon class=\"ui-btn__icon\" icon=\"overflow\"></ui-svg-icon>\n        <ui-drop><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n      </ui-button>\n    </div>\n  </div>\n  <div class=\"ui-tab__body\">\n    <slot></slot>\n\n    <compose view-model.ref=\"composeVm\" class=\"ui-section\" view.bind=\"activeTab.view\" model.bind=\"activeTab.model\" view-model.bind=\"activeTab.viewModel\"></compose>\n  </div>\n</template>\n";

var UITabbarStart = (function () {
    function UITabbarStart(element) {
        this.element = element;
    }
    UITabbarStart = __chunk_1.__decorate([
        aureliaFramework.containerless(),
        aureliaFramework.customElement("ui-tabbar-start"),
        aureliaFramework.inlineView("<template><div slot=\"tabbar-start\"><slot></slot></div></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UITabbarStart);
    return UITabbarStart;
}());

var UITabPanel = (function () {
    function UITabPanel(element) {
        var _this = this;
        this.element = element;
        this.tabs = [];
        this.align = "top";
        this.hasOverflow = false;
        this.isAttached = false;
        if (element.hasAttribute("no-border")) {
            element.classList.add("ui-tab__panel--noborder");
        }
        this.obResize = new ResizeObserver(function () { return _this.calculateOverflow(); });
        this.obResize.observe(element);
    }
    UITabPanel.prototype.activateTab = function (id) {
        return __chunk_1.__awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __chunk_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = true;
                        if (!this.composeVm.currentViewModel) return [3, 2];
                        return [4, __chunk_3.UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate")];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (result) {
                            return [2, __chunk_3.UIInternal.fireCallbackEvent(this, "beforechange", {
                                    activeTab: this.activeTab.id,
                                    activeViewModel: this.composeVm.currentViewModel,
                                    newTab: id
                                }).then(function (b) { return (b ? _this.activate(id) : undefined); })];
                        }
                        else {
                            return [2, Promise.resolve(false)];
                        }
                        return [2];
                }
            });
        });
    };
    UITabPanel.prototype.closeTab = function (id) {
        return __chunk_1.__awaiter(this, void 0, void 0, function () {
            var tab, result;
            var _this = this;
            return __chunk_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tab = this.tabs.find(function (t) { return t.id === id; });
                        result = true;
                        if (!(this.activeTab.id === id && this.composeVm.currentViewModel)) return [3, 2];
                        return [4, __chunk_3.UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate")];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (result) {
                            return [2, __chunk_3.UIInternal.fireCallbackEvent(this, "beforeclose", tab.id).then(function (b) {
                                    return b ? _this.remove(id) : false;
                                })];
                        }
                        else {
                            return [2, Promise.resolve(false)];
                        }
                        return [2];
                }
            });
        });
    };
    UITabPanel.prototype.created = function (owningView) {
        this.owningView = owningView;
    };
    UITabPanel.prototype.attached = function () {
        var _this = this;
        this.composeVm.owningView = this.owningView;
        this.composeVm.viewResources = this.owningView.resources;
        setTimeout(function () { return _this.calculateOverflow(); }, 200);
        this.isAttached = true;
        this.tabsChanged();
    };
    UITabPanel.prototype.detached = function () {
        this.obResize.disconnect();
    };
    UITabPanel.prototype.innerTabsChanged = function () {
        this.tabs = this.innerTabs || this.tabs;
        this.tabsChanged();
    };
    UITabPanel.prototype.tabsChanged = function () {
        if (this.isAttached) {
            this.active = (this.tabs.find(function (tab) { return tab.active; }) || {}).id;
            if (!this.active) {
                this.activeTab = this.tabs.find(function (tab) { return !tab.disabled; }) || {};
                this.active = this.activeTab.id;
                this.activeTab.active = true;
            }
        }
    };
    UITabPanel.prototype.activate = function (id) {
        var newTab = this.tabs.find(function (tab) { return tab.id === id; });
        if (newTab) {
            this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("change", id));
            if (this.activeTab) {
                this.activeTab.active = false;
            }
            this.activeTab = newTab;
            this.active = this.activeTab.id;
            this.activeTab.active = true;
            return true;
        }
        return false;
    };
    UITabPanel.prototype.remove = function (id) {
        var tab = this.tabs.find(function (t) { return t.id === id; });
        this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("close", id));
        this.tabs.splice(this.tabs.indexOf(tab), 1);
        if (tab.element) {
            __chunk_3.UIInternal.queueTask(function () { return aureliaFramework.DOM.removeNode(tab.element); });
        }
        return true;
    };
    UITabPanel.prototype.calculateOverflow = function () {
        var _this = this;
        var _a;
        this.resetOverflow();
        var overflowItems = [];
        var isRtl = window.getComputedStyle(this.wrapperEl).direction === "rtl";
        __chunk_1.__spread(this.wrapperEl.children).reverse().forEach(function (item) {
            if ((!isRtl && _this.wrapperEl.offsetWidth - (item.offsetLeft + item.offsetWidth) <= 30) ||
                (isRtl && _this.wrapperEl.offsetWidth - item.offsetLeft >= _this.wrapperEl.offsetWidth - 30)) {
                overflowItems.splice(0, 0, item);
                _this.hasOverflow = true;
            }
        });
        (_a = this.overflowEl).append.apply(_a, __chunk_1.__spread(overflowItems));
    };
    UITabPanel.prototype.resetOverflow = function () {
        var _this = this;
        this.hasOverflow = false;
        this.overflowEl.children.forEach(function (child) {
            _this.wrapperEl.appendChild(child);
        });
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Array)
    ], UITabPanel.prototype, "tabs", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable({ bindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", String)
    ], UITabPanel.prototype, "active", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UITabPanel.prototype, "align", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Function)
    ], UITabPanel.prototype, "beforechange", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Function)
    ], UITabPanel.prototype, "beforeclose", void 0);
    __chunk_1.__decorate([
        aureliaFramework.children("ui-tab"),
        __chunk_1.__metadata("design:type", Array)
    ], UITabPanel.prototype, "innerTabs", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable({ bindingMode: aureliaFramework.bindingMode.toView }),
        __chunk_1.__metadata("design:type", Object)
    ], UITabPanel.prototype, "activeTab", void 0);
    UITabPanel = __chunk_1.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customElement("ui-tab-panel"),
        aureliaFramework.inlineView(view),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UITabPanel);
    return UITabPanel;
}());
var TabPanel = [UITabPanel, UITab, UITabbarStart, UITabbarEnd];

exports.TabPanel = TabPanel;
//# sourceMappingURL=ui-tab-panel.js.map
