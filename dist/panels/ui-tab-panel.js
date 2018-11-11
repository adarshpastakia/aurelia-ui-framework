var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { autoinject, bindable, bindingMode, children, containerless, customElement, DOM, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var tabSeed = 0;
var UITabPanel = /** @class */ (function () {
    function UITabPanel(element) {
        var _this = this;
        this.element = element;
        this.tabs = [];
        this.hasOverflow = false;
        if (element.hasAttribute("no-border")) {
            element.classList.add("ui-tab__panel--noborder");
        }
        this.obResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, function (t) {
            return _this.calculateOverflow();
        });
    }
    UITabPanel.prototype.activateTab = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tab, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tab = this.tabs.find(function (t) { return t.id === id; });
                        result = true;
                        if (!this.composeVm.currentViewModel) return [3 /*break*/, 2];
                        return [4 /*yield*/, UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate")];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (result) {
                            return [2 /*return*/, UIInternal.fireCallbackEvent(this, "beforechange", {
                                    activeTab: this.activeTab.id,
                                    activeViewModel: this.composeVm.currentViewModel,
                                    newTab: id
                                }).then(function (b) { return (b ? _this.activate(id) : undefined); })];
                        }
                        else {
                            return [2 /*return*/, Promise.resolve(false)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UITabPanel.prototype.closeTab = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var tab, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tab = this.tabs.find(function (t) { return t.id === id; });
                        result = true;
                        if (!(this.activeTab.id === id && this.composeVm.currentViewModel)) return [3 /*break*/, 2];
                        return [4 /*yield*/, UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate")];
                    case 1:
                        result = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (result) {
                            return [2 /*return*/, UIInternal.fireCallbackEvent(this, "beforeclose", {
                                    activaTab: tab.id
                                }).then(function (b) { return (b ? _this.remove(id) : false); })];
                        }
                        else {
                            return [2 /*return*/, Promise.resolve(false)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Set current owningView
    UITabPanel.prototype.created = function (owningView) {
        this.owningView = owningView;
    };
    // Update compose owningView and viewResource to current owningView
    UITabPanel.prototype.attached = function () {
        var _this = this;
        this.composeVm.owningView = this.owningView;
        this.composeVm.viewResources = this.owningView.resources;
        setTimeout(function () { return _this.calculateOverflow(); }, 200);
    };
    UITabPanel.prototype.detached = function () {
        this.obResize.dispose();
    };
    UITabPanel.prototype.innerTabsChanged = function () {
        this.tabs = this.innerTabs || this.tabs;
        this.tabsChanged();
    };
    UITabPanel.prototype.tabsChanged = function () {
        this.active = (this.tabs.find(function (tab) { return tab.active; }) || {}).id;
        if (!this.active) {
            this.activeTab = this.tabs.find(function (tab) { return !tab.disabled; }) || {};
            this.active = this.activeTab.id;
            this.activeTab.active = true;
        }
    };
    UITabPanel.prototype.activate = function (id) {
        var newTab = this.tabs.find(function (tab) { return tab.id === id; });
        if (newTab) {
            this.element.dispatchEvent(UIInternal.createEvent("change", { tab: newTab }));
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
        this.element.dispatchEvent(UIInternal.createEvent("close", { tab: tab }));
        this.tabs.splice(this.tabs.indexOf(tab), 1);
        if (tab.element) {
            UIInternal.queueTask(function () { return DOM.removeNode(tab.element); });
        }
        return true;
    };
    UITabPanel.prototype.calculateOverflow = function () {
        var _this = this;
        var _a;
        this.resetOverflow();
        var overflowItems = [];
        var isRtl = window.getComputedStyle(this.wrapperEl).direction === "rtl";
        // @ts-ignore
        __spread(this.wrapperEl.children).reverse().forEach(function (item) {
            if ((!isRtl && _this.wrapperEl.offsetWidth - (item.offsetLeft + item.offsetWidth) <= 30) ||
                (isRtl && _this.wrapperEl.offsetWidth - item.offsetLeft >= _this.wrapperEl.offsetWidth - 30)) {
                overflowItems.splice(0, 0, item);
                _this.hasOverflow = true;
            }
        });
        (_a = this.overflowEl).append.apply(_a, __spread(overflowItems));
    };
    UITabPanel.prototype.resetOverflow = function () {
        var _this = this;
        this.hasOverflow = false;
        this.overflowEl.children.forEach(function (child) {
            _this.wrapperEl.appendChild(child);
        });
    };
    __decorate([
        bindable(),
        __metadata("design:type", Array)
    ], UITabPanel.prototype, "tabs", void 0);
    __decorate([
        bindable({ bindingMode: bindingMode.twoWay }),
        __metadata("design:type", String)
    ], UITabPanel.prototype, "active", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Function)
    ], UITabPanel.prototype, "beforechange", void 0);
    __decorate([
        children("ui-tab"),
        __metadata("design:type", Array)
    ], UITabPanel.prototype, "innerTabs", void 0);
    __decorate([
        bindable({ bindingMode: bindingMode.toView }),
        __metadata("design:type", Object)
    ], UITabPanel.prototype, "activeTab", void 0);
    UITabPanel = __decorate([
        autoinject(),
        customElement("ui-tab-panel"),
        __metadata("design:paramtypes", [Element])
    ], UITabPanel);
    return UITabPanel;
}());
export { UITabPanel };
var UITab = /** @class */ (function () {
    function UITab(element) {
        this.element = element;
        this.id = "";
        this.label = "";
        this.icon = "";
        this.active = false;
        this.disabled = false;
        this.closeable = false;
        this.id = "tab__" + tabSeed++;
        this.closeable = element.hasAttribute("closeable");
    }
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UITab.prototype, "id", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UITab.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UITab.prototype, "icon", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UITab.prototype, "active", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UITab.prototype, "disabled", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UITab.prototype, "view", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UITab.prototype, "model", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UITab.prototype, "viewModel", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Function)
    ], UITab.prototype, "beforeclose", void 0);
    UITab = __decorate([
        autoinject(),
        customElement("ui-tab"),
        inlineView("<template class=\"ui-tab\" data-active.bind=\"active\" data-hide.bind=\"!!view || !!viewModel\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UITab);
    return UITab;
}());
export { UITab };
var UITabbarStart = /** @class */ (function () {
    function UITabbarStart(element) {
        this.element = element;
    }
    UITabbarStart = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-tabbar-start"),
        inlineView("<template><div slot=\"tabbar-start\"><slot></slot></div></template>"),
        __metadata("design:paramtypes", [Element])
    ], UITabbarStart);
    return UITabbarStart;
}());
export { UITabbarStart };
var UITabbarEnd = /** @class */ (function () {
    function UITabbarEnd(element) {
        this.element = element;
    }
    UITabbarEnd = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-tabbar-end"),
        inlineView("<template><div slot=\"tabbar-end\"><slot></slot></div></template>"),
        __metadata("design:paramtypes", [Element])
    ], UITabbarEnd);
    return UITabbarEnd;
}());
export { UITabbarEnd };
