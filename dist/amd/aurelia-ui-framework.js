define(['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-logging', 'date-fns', 'kramed', 'numeral', 'libphonenumber-js', 'libphonenumber-js/examples.mobile.json', 'aurelia-validation', 'resize-observer-polyfill', 'aurelia-router', 'aurelia-metadata', 'aurelia-fetch-client'], function (exports, aureliaFramework, aureliaEventAggregator, aureliaLogging, dateFns, kramed, numeral, libphonenumberJs, examples, aureliaValidation, ResizeObserver, aureliaRouter, aureliaMetadata, aureliaFetchClient) { 'use strict';

    kramed = kramed && kramed.hasOwnProperty('default') ? kramed['default'] : kramed;
    numeral = numeral && numeral.hasOwnProperty('default') ? numeral['default'] : numeral;
    examples = examples && examples.hasOwnProperty('default') ? examples['default'] : examples;
    ResizeObserver = ResizeObserver && ResizeObserver.hasOwnProperty('default') ? ResizeObserver['default'] : ResizeObserver;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
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
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
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
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var UIInternal;
    (function (UIInternal) {
        UIInternal.EVT_VIEWPORT_CLICK = "EVT_VIEWPORT_CLICK";
        UIInternal.EVT_VIEWPORT_RESIZE = "EVT_VIEWPORT_RESIZE";
        function queueTask(task) {
            aureliaFramework.Container.instance.get(aureliaFramework.TaskQueue).queueTask(task);
        }
        UIInternal.queueTask = queueTask;
        function queueMicroTask(task) {
            aureliaFramework.Container.instance.get(aureliaFramework.TaskQueue).queueMicroTask(task);
        }
        UIInternal.queueMicroTask = queueMicroTask;
        function broadcast(name, data) {
            aureliaFramework.Container.instance.get(aureliaEventAggregator.EventAggregator).publish(name, data);
        }
        UIInternal.broadcast = broadcast;
        function subscribe(name, callback) {
            return aureliaFramework.Container.instance.get(aureliaEventAggregator.EventAggregator).subscribe(name, callback);
        }
        UIInternal.subscribe = subscribe;
        function subscribeOnce(name, callback) {
            return aureliaFramework.Container.instance.get(aureliaEventAggregator.EventAggregator).subscribeOnce(name, callback);
        }
        UIInternal.subscribeOnce = subscribeOnce;
        function observe(data, property, callback) {
            return aureliaFramework.Container.instance
                .get(aureliaFramework.BindingEngine)
                .observe(data, property)
                .subscribe(callback);
        }
        UIInternal.observe = observe;
        function createEvent(name, data) {
            return aureliaFramework.DOM.createCustomEvent(name, {
                bubbles: true,
                cancelable: true,
                detail: data
            });
        }
        UIInternal.createEvent = createEvent;
        function fireCallbackEvent(vm, event, data) {
            var ret = isFunction(vm[event])
                ? vm[event](data)
                : vm.element.dispatchEvent(UIInternal.createEvent(event, data));
            if (ret instanceof Promise) {
                return ret;
            }
            else {
                return Promise.resolve(ret !== false);
            }
        }
        UIInternal.fireCallbackEvent = fireCallbackEvent;
        function invokeLifecycle(instance, name, model) {
            if (instance && typeof instance[name] === "function") {
                var result = instance[name](model);
                if (result instanceof Promise) {
                    return result;
                }
                if (result !== null && result !== undefined) {
                    return Promise.resolve(result);
                }
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        }
        UIInternal.invokeLifecycle = invokeLifecycle;
        function compileTemplate(tpl, viewModel) {
            if (viewModel === void 0) { viewModel = {}; }
            var viewFactory = aureliaFramework.Container.instance
                .get(aureliaFramework.ViewCompiler)
                .compile(tpl, aureliaFramework.Container.instance.get(aureliaFramework.ViewResources));
            var view = viewFactory.create(aureliaFramework.Container.instance);
            view.bind(viewModel);
            return view;
        }
        UIInternal.compileTemplate = compileTemplate;
    })(UIInternal || (UIInternal = {}));

    var UIBadge = (function () {
        function UIBadge(element) {
            this.element = element;
            this.value = "";
            this.icon = "";
            this.theme = "";
            this.tooltip = "";
        }
        UIBadge.prototype.attached = function () {
            if (this.value || this.icon) {
                var vm = getViewModel(this.element);
                var view = UIInternal.compileTemplate("<template><div class=\"ui-badge\" ui-theme.bind=\"theme\" ui-tooltip.bind=\"tooltip\">\n        <ui-icon icon.bind=\"icon\" if.bind=\"icon\"></ui-icon>${value}\n      </div></template>", this);
                (vm ? (vm.badgeEl ? vm.badgeEl : vm.vmElement) : this.element).appendChild(view.fragment);
                view.attached();
            }
        };
        __decorate([
            aureliaFramework.bindable({ primaryProperty: true }),
            __metadata("design:type", String)
        ], UIBadge.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIBadge.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIBadge.prototype, "theme", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIBadge.prototype, "tooltip", void 0);
        UIBadge = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-badge"),
            __metadata("design:paramtypes", [Element])
        ], UIBadge);
        return UIBadge;
    }());

    var BaseAttribute = (function () {
        function BaseAttribute(element) {
            this.element = element;
            this.prefix = "";
            this.value = "default";
            this.oldValue = "default";
            this.singular = false;
        }
        BaseAttribute.prototype.bind = function () {
            this.toggleClass();
        };
        BaseAttribute.prototype.valueChanged = function () {
            this.toggleClass();
        };
        BaseAttribute.prototype.toggleClass = function () {
            var _this = this;
            var el = this.element;
            var vm = getViewModel(this.element);
            if (vm && vm.vmElement) {
                el = vm.vmElement;
            }
            if (el.classList) {
                if (this.oldValue && !this.singular) {
                    this.oldValue.split(" ").forEach(function (p) { return el.classList.remove(_this.prefix + "--" + p.trim()); });
                }
                else {
                    el.classList.remove("" + this.prefix);
                }
                this.oldValue = this.value;
                if (this.value && !this.singular) {
                    this.value.split(" ").forEach(function (p) { return el.classList.add(_this.prefix + "--" + p.trim()); });
                }
                else if (!isFalse(this.value)) {
                    el.classList.add("" + this.prefix);
                }
            }
        };
        BaseAttribute = __decorate([
            aureliaFramework.autoinject(),
            __metadata("design:paramtypes", [Element])
        ], BaseAttribute);
        return BaseAttribute;
    }());
    var UITheme = (function (_super) {
        __extends(UITheme, _super);
        function UITheme() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-theme";
            return _this;
        }
        UITheme = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-theme")
        ], UITheme);
        return UITheme;
    }(BaseAttribute));
    var UIBg = (function (_super) {
        __extends(UIBg, _super);
        function UIBg() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-bg";
            return _this;
        }
        UIBg = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-bg")
        ], UIBg);
        return UIBg;
    }(BaseAttribute));
    var UIColor = (function (_super) {
        __extends(UIColor, _super);
        function UIColor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-color";
            return _this;
        }
        UIColor = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-color")
        ], UIColor);
        return UIColor;
    }(BaseAttribute));
    var UIHover = (function (_super) {
        __extends(UIHover, _super);
        function UIHover() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-hover";
            return _this;
        }
        UIHover = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-hover")
        ], UIHover);
        return UIHover;
    }(BaseAttribute));
    var UIShadow = (function (_super) {
        __extends(UIShadow, _super);
        function UIShadow() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-shadow";
            return _this;
        }
        UIShadow = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-shadow")
        ], UIShadow);
        return UIShadow;
    }(BaseAttribute));
    var UIPadding = (function (_super) {
        __extends(UIPadding, _super);
        function UIPadding() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-padding";
            return _this;
        }
        UIPadding = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-padding")
        ], UIPadding);
        return UIPadding;
    }(BaseAttribute));
    var UIMargin = (function (_super) {
        __extends(UIMargin, _super);
        function UIMargin() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-margin";
            return _this;
        }
        UIMargin = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-margin")
        ], UIMargin);
        return UIMargin;
    }(BaseAttribute));
    var UIBorder = (function (_super) {
        __extends(UIBorder, _super);
        function UIBorder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-border";
            return _this;
        }
        UIBorder = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-border")
        ], UIBorder);
        return UIBorder;
    }(BaseAttribute));
    var UIFont = (function (_super) {
        __extends(UIFont, _super);
        function UIFont() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-font";
            return _this;
        }
        UIFont = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-font")
        ], UIFont);
        return UIFont;
    }(BaseAttribute));
    var UIWeight = (function (_super) {
        __extends(UIWeight, _super);
        function UIWeight() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-weight";
            return _this;
        }
        UIWeight = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-weight")
        ], UIWeight);
        return UIWeight;
    }(BaseAttribute));
    var UIText = (function (_super) {
        __extends(UIText, _super);
        function UIText() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-text";
            return _this;
        }
        UIText = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-text")
        ], UIText);
        return UIText;
    }(BaseAttribute));
    var UIAlign = (function (_super) {
        __extends(UIAlign, _super);
        function UIAlign() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-align";
            return _this;
        }
        UIAlign = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-align")
        ], UIAlign);
        return UIAlign;
    }(BaseAttribute));
    var UIGutter = (function (_super) {
        __extends(UIGutter, _super);
        function UIGutter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-gutter";
            return _this;
        }
        UIGutter = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-gutter")
        ], UIGutter);
        return UIGutter;
    }(BaseAttribute));
    var UIHide = (function (_super) {
        __extends(UIHide, _super);
        function UIHide() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-hide";
            return _this;
        }
        UIHide = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-hide")
        ], UIHide);
        return UIHide;
    }(BaseAttribute));
    var UIShow = (function (_super) {
        __extends(UIShow, _super);
        function UIShow() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-show";
            return _this;
        }
        UIShow = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-show")
        ], UIShow);
        return UIShow;
    }(BaseAttribute));
    var UIClip = (function (_super) {
        __extends(UIClip, _super);
        function UIClip() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-clip";
            _this.singular = true;
            return _this;
        }
        UIClip.prototype.bind = function () {
            _super.prototype.bind.call(this);
            this.valueChanged();
        };
        UIClip.prototype.valueChanged = function () {
            this.element.style.cssText = "--line-clamp: " + this.value + ";";
        };
        UIClip = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-clip")
        ], UIClip);
        return UIClip;
    }(BaseAttribute));
    var UILine = (function (_super) {
        __extends(UILine, _super);
        function UILine() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-line";
            _this.singular = true;
            return _this;
        }
        UILine.prototype.bind = function () {
            _super.prototype.bind.call(this);
            this.valueChanged();
        };
        UILine.prototype.valueChanged = function () {
            this.element.style.cssText = "line-height: " + this.value + ";";
        };
        UILine = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-line")
        ], UILine);
        return UILine;
    }(BaseAttribute));
    var UIPaper = (function (_super) {
        __extends(UIPaper, _super);
        function UIPaper() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-paper";
            _this.singular = true;
            return _this;
        }
        UIPaper = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-paper")
        ], UIPaper);
        return UIPaper;
    }(BaseAttribute));
    var UILink = (function (_super) {
        __extends(UILink, _super);
        function UILink() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-link";
            _this.singular = true;
            return _this;
        }
        UILink = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-link")
        ], UILink);
        return UILink;
    }(BaseAttribute));
    var UIScroll = (function (_super) {
        __extends(UIScroll, _super);
        function UIScroll() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prefix = "ui-scroll";
            return _this;
        }
        UIScroll = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-scroll")
        ], UIScroll);
        return UIScroll;
    }(BaseAttribute));

    var Helpers = /*#__PURE__*/Object.freeze({
        UITheme: UITheme,
        UIBg: UIBg,
        UIColor: UIColor,
        UIHover: UIHover,
        UIShadow: UIShadow,
        UIPadding: UIPadding,
        UIMargin: UIMargin,
        UIBorder: UIBorder,
        UIFont: UIFont,
        UIWeight: UIWeight,
        UIText: UIText,
        UIAlign: UIAlign,
        UIGutter: UIGutter,
        UIHide: UIHide,
        UIShow: UIShow,
        UIClip: UIClip,
        UILine: UILine,
        UIPaper: UIPaper,
        UILink: UILink,
        UIScroll: UIScroll
    });

    var UIAppConfig = (function () {
        function UIAppConfig() {
        }
        return UIAppConfig;
    }());

    var UITether;
    (function (UITether) {
        function tether(anchorEl, dropdownEl, config) {
            if (config === void 0) { config = Config; }
            return attach(anchorEl, dropdownEl, __assign({}, Config, config));
        }
        UITether.tether = tether;
        var Config = {
            anchorPosition: "bl",
            attachToViewport: false,
            position: "tl",
            resize: true
        };
        var logger = aureliaLogging.getLogger("UITether");
        function updatePosition(anchorEl, dropdownEl, scrollerEl, config) {
            var anchorRect = anchorEl.getBoundingClientRect();
            var dropdownRect = dropdownEl.getBoundingClientRect();
            var scrollerRect = scrollerEl.getBoundingClientRect();
            if (config.resize !== false) {
                dropdownEl.style.minWidth = anchorRect.width + "px";
            }
            var _a = __read(config.position.split(""), 2), posY = _a[0], posX = _a[1];
            var _b = __read(config.anchorPosition.split(""), 2), anchorY = _b[0], anchorX = _b[1];
            var isRtl = window.getComputedStyle(scrollerEl).direction === "rtl";
            var x = 0;
            var y = 0;
            var clientHeight = document.body.clientHeight;
            var clientWidth = document.body.clientWidth;
            var clientX = 0;
            var clientY = 0;
            logger.debug("tether", {
                anchorRect: anchorRect,
                anchorX: anchorX,
                anchorY: anchorY,
                dropdownRect: dropdownRect,
                posX: posX,
                posY: posY
            });
            if (!config.attachToViewport) {
                clientHeight = scrollerRect.bottom;
                clientWidth = scrollerRect.right;
                clientX = scrollerRect.left;
                clientY = scrollerRect.top;
            }
            if (anchorX === (isRtl ? "r" : "l")) {
                x = anchorRect.left;
            }
            else if (anchorX === (isRtl ? "l" : "r")) {
                x = anchorRect.right;
            }
            else if (anchorX === "c") {
                x = anchorRect.left + anchorRect.width / 2;
            }
            if (anchorY === "t") {
                y = anchorRect.top;
            }
            else if (anchorY === "b") {
                y = anchorRect.bottom;
            }
            if (posX === (isRtl ? "l" : "r")) {
                x -= dropdownRect.width;
            }
            if (posX === "c") {
                x -= dropdownRect.width / 2;
            }
            if (posY === "b") {
                y -= dropdownRect.height;
            }
            if (x + dropdownRect.width > clientWidth) {
                x = anchorRect.right - dropdownRect.width;
            }
            else if (x < clientX) {
                x = anchorRect.left;
            }
            if (y + dropdownRect.height > clientHeight) {
                y =
                    posY === "t" && anchorY === "b" ? anchorRect.top - dropdownRect.height : anchorRect.bottom;
            }
            else if (y < clientY) {
                y =
                    posY === "b" && anchorY === "t" ? anchorRect.bottom - dropdownRect.height : anchorRect.top;
            }
            if (!config.attachToViewport) {
                x -= scrollerRect.left - scrollerEl.scrollLeft;
                y -= scrollerRect.top - scrollerEl.scrollTop;
                x -= 1;
                y -= 1;
                if (isRtl && scrollerEl.scrollHeight > scrollerEl.offsetHeight) {
                    x -= 5;
                }
            }
            dropdownEl.style.transform = "translate(" + x + "px, " + y + "px)";
        }
        function scrollHandler(scrollCallbacks) {
            if (scrollCallbacks === void 0) { scrollCallbacks = new Set(); }
            scrollCallbacks.forEach(function (c) { return c(); });
        }
        function getParentScroller(el) {
            var styles = ["scroll", "auto"];
            el = el.parentElement;
            do {
                var style = window.getComputedStyle(el);
                if (styles.includes(style.overflow) ||
                    styles.includes(style.overflowX) ||
                    styles.includes(style.overflowY)) {
                    return el;
                }
                el = el.parentElement;
            } while (el !== null);
            return null;
        }
        function attach(anchorEl, dropdownEl, config) {
            var scroller = getParentScroller(anchorEl) || document.body;
            var scrollCallback = function () {
                if (dropdownEl.parentElement.dataset.open) {
                    updatePosition(anchorEl, dropdownEl, scroller, config);
                }
            };
            if (!scroller.scrollHandler) {
                scroller.scrollHandler = function () { return scrollHandler(scroller.scrollCallbacks); };
                scroller.addEventListener("scroll", scroller.scrollHandler);
                scroller.scrollCallbacks = new Set();
            }
            var container = aureliaFramework.Container.instance.get(UIAppConfig).FloatingContainer;
            config.attachToViewport ? container.appendChild(dropdownEl.parentElement || dropdownEl) : fn();
            scroller.scrollCallbacks.add(scrollCallback);
            return {
                dispose: function () {
                    scroller.scrollCallbacks.delete(scrollCallback);
                    if (dropdownEl.parentElement === aureliaFramework.Container.instance.get(UIAppConfig).FloatingContainer) {
                        aureliaFramework.DOM.removeNode(dropdownEl);
                    }
                    else {
                        aureliaFramework.DOM.removeNode(dropdownEl.parentElement);
                    }
                },
                updatePosition: function (newAnchorEl) {
                    anchorEl = newAnchorEl || anchorEl;
                    updatePosition(anchorEl, dropdownEl, scroller, config);
                }
            };
        }
    })(UITether || (UITether = {}));

    var TooltipEl;
    var seed = 0;
    var UITooltip = (function () {
        function UITooltip(element) {
            var _this = this;
            this.element = element;
            this.value = "";
            this.theme = "";
            this.position = "";
            this.id = "tooltip-" + seed++;
            this.showFn = function () { return _this.show(); };
            this.hideFn = function () { return _this.hide(); };
        }
        UITooltip.prototype.attached = function () {
            if (this.element.nodeType === Node.ELEMENT_NODE) {
                this.parentEl = this.element;
            }
            if (this.element.nodeType === Node.COMMENT_NODE) {
                this.parentEl = this.element.previousElementSibling;
            }
            if (!TooltipEl) {
                TooltipEl = document.createElement("div");
                TooltipEl.className = "ui-tooltip";
                TooltipEl.tether = UITether.tether(this.parentEl, TooltipEl, {
                    anchorPosition: "tc",
                    attachToViewport: true,
                    position: "bc",
                    resize: false
                });
            }
            this.parentEl.addEventListener("mouseenter", this.showFn);
            this.parentEl.addEventListener("mouseleave", this.hideFn);
        };
        UITooltip.prototype.detached = function () {
            this.hide();
            this.parentEl.removeEventListener("mouseenter", this.showFn);
            this.parentEl.removeEventListener("mouseleave", this.hideFn);
        };
        UITooltip.prototype.show = function () {
            if (isEmpty(this.value)) {
                return;
            }
            TooltipEl.className = "ui-tooltip ui-theme--" + this.theme;
            TooltipEl.innerHTML = this.value;
            TooltipEl.dataset.id = this.id;
            TooltipEl.tether.updatePosition(this.parentEl);
            this.timer = setTimeout(function () { return (TooltipEl.dataset.open = "true"); }, 500);
        };
        UITooltip.prototype.hide = function () {
            clearTimeout(this.timer);
            TooltipEl.dataset.open = "false";
        };
        UITooltip.prototype.valueChanged = function () {
            if (TooltipEl && TooltipEl.dataset.open === "true" && TooltipEl.dataset.id === this.id) {
                this.show();
            }
        };
        __decorate([
            aureliaFramework.bindable({ primaryProperty: true }),
            __metadata("design:type", Object)
        ], UITooltip.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UITooltip.prototype, "theme", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UITooltip.prototype, "position", void 0);
        UITooltip = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customAttribute("ui-tooltip"),
            __metadata("design:paramtypes", [Element])
        ], UITooltip);
        return UITooltip;
    }());

    var Attributes = __spread([UIBadge, UITooltip], Object.keys(Helpers).map(function (k) { return Helpers[k]; }));

    var view = "<template class=\"ui-btn__wrapper\" data-disabled.bind=\"isDisabled\" data-busy.bind=\"busy\" data-type.bind=\"type\" data-size.bind=\"size\" data-active.bind=\"active\">\n  <div class=\"ui-btn__inner\" click.trigger=\"$event.stopEvent()\">\n    <a ref=\"badgeEl\" class=\"ui-btn\" click.trigger=\"fireClick($event)\" data-active.bind=\"active\" data-open.bind=\"!split && dropEl.isOpen\">\n      <div class=\"ui-btn__icon\" if.bind=\"busy\">\n        <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n      </div>\n      <slot name=\"svg-icon\"></slot>\n      <div class=\"ui-btn__icon\" if.bind=\"icon && !busy\">\n        <ui-icon icon.bind=\"icon\"></ui-icon>\n      </div>\n      <div class=\"ui-btn__label\"><slot>${label}</slot></div>\n      <div class=\"ui-btn__caret\" if.bind=\"hasDrop && !split\">\n        <ui-svg-icon icon=\"caret\"></ui-svg-icon>\n      </div>\n    </a>\n    <template if.bind=\"hasDrop && split\">\n      <div class=\"ui-btn__divider\"></div>\n      <a class=\"ui-btn ui-btn__caret ui-btn__caret--split\" data-open.bind=\"split && dropEl.isOpen\" click.trigger=\"toggleDrop()\">\n        <ui-svg-icon icon=\"caret\"></ui-svg-icon>\n      </a>\n    </template>\n  </div>\n  <slot name=\"ui-drop\"><ui-drop view-model.ref=\"dropEl\" if.bind=\"menuItems\"><ui-menu menu-items.bind=\"menuItems\"></ui-menu></ui-drop></slot>\n</template>\n";

    var UIButton = (function () {
        function UIButton(element) {
            this.element = element;
            this.icon = "";
            this.href = "";
            this.label = "";
            this.size = "nm";
            this.type = "default";
            this.id = "";
            this.busy = false;
            this.active = false;
            this.disabled = false;
            this.hasDrop = false;
            this.split = false;
            this.elDisabled = false;
            if (element.hasAttribute("icon-hilight")) {
                element.classList.add("ui-btn__icon--hilight");
            }
            if (element.hasAttribute("icon-end")) {
                element.classList.add("ui-btn__icon--end");
            }
            if (element.hasAttribute("icon-top")) {
                element.classList.add("ui-btn__icon--top");
            }
            if (element.hasAttribute("no-caret")) {
                element.classList.add("ui-btn__caret--hide");
            }
            if (element.hasAttribute("block")) {
                element.classList.add("ui-btn--block");
            }
            this.split = element.hasAttribute("split");
        }
        Object.defineProperty(UIButton.prototype, "isDisabled", {
            get: function () {
                return this.disabled || this.elDisabled;
            },
            enumerable: true,
            configurable: true
        });
        UIButton.prototype.disable = function (disabled) {
            this.elDisabled = disabled;
        };
        UIButton.prototype.attached = function () {
            var _this = this;
            UIInternal.queueTask(function () {
                _this.hasDrop = !!_this.elDropdown || !!_this.dropEl;
                if (_this.hasDrop) {
                    if (!_this.dropEl) {
                        _this.dropEl = getSlotViewModel(_this.elDropdown);
                    }
                    _this.dropEl.tether(_this.element);
                }
            });
            this.hrefChanged();
        };
        UIButton.prototype.hrefChanged = function () {
            if (this.badgeEl) {
                if (this.href) {
                    this.badgeEl.href = this.href;
                }
                else if (this.badgeEl.attributes.getNamedItem("href")) {
                    this.badgeEl.attributes.removeNamedItem("href");
                }
            }
        };
        UIButton.prototype.fireClick = function ($event) {
            if (!this.href) {
                if (this.hasDrop && !this.split) {
                    this.toggleDrop();
                }
                else {
                    return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
                }
                return false;
            }
        };
        UIButton.prototype.toggleDrop = function () {
            var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
            var afterEvent = this.dropEl.isOpen ? "close" : "open";
            if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
                this.dropEl.toggleDrop();
                this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
            }
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIButton.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIButton.prototype, "href", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIButton.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIButton.prototype, "size", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIButton.prototype, "type", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIButton.prototype, "id", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIButton.prototype, "busy", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIButton.prototype, "active", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIButton.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UIButton.prototype, "menuItems", void 0);
        __decorate([
            aureliaFramework.child("div.ui-drop"),
            __metadata("design:type", Element)
        ], UIButton.prototype, "elDropdown", void 0);
        __decorate([
            aureliaFramework.computedFrom("disabled", "elDisabled"),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [])
        ], UIButton.prototype, "isDisabled", null);
        UIButton = __decorate([
            aureliaFramework.customElement("ui-button"),
            aureliaFramework.inlineView(view),
            __metadata("design:paramtypes", [Element])
        ], UIButton);
        return UIButton;
    }());

    var UIButtonGroup = (function () {
        function UIButtonGroup(element) {
            this.element = element;
            this.value = "";
            this.separator = "";
            this.size = "nm";
            this.type = "default";
            this.disabled = false;
            this.toggle = false;
            if (element.hasAttribute("equal")) {
                element.classList.add("ui-btn__group--equal");
            }
            if (element.hasAttribute("vertical")) {
                element.classList.add("ui-btn__group--vertical");
            }
            this.toggle = element.hasAttribute("toggle");
        }
        UIButtonGroup.prototype.attached = function () {
            var _this = this;
            if (this.separator) {
                this.element.classList.add("ui-btn__group--with-separator");
            }
            if (this.toggle) {
                UIInternal.queueTask(function () { return _this.valueChanged(_this.value, ""); });
            }
        };
        UIButtonGroup.prototype.buttonsChanged = function () {
            var _this = this;
            this.buttons.forEach(function (b) {
                b.element.dataset.separator = _this.separator;
                b.element.au.controller.viewModel.type = _this.type;
            });
        };
        UIButtonGroup.prototype.valueChanged = function (newValue, oldValue) {
            if (this.buttons) {
                var btn = this.buttons.find(function (b) { return b.id === newValue; });
                if (btn) {
                    if (this.currentSelected) {
                        this.currentSelected.active = false;
                    }
                    (this.currentSelected = btn).active = true;
                }
                else {
                    this.value = oldValue;
                }
            }
        };
        UIButtonGroup.prototype.buttonClicked = function ($event) {
            $event.stopEvent();
            if ($event.detail && this.toggle) {
                this.value = $event.detail;
            }
        };
        __decorate([
            aureliaFramework.bindable({ bindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", String)
        ], UIButtonGroup.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIButtonGroup.prototype, "separator", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIButtonGroup.prototype, "size", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIButtonGroup.prototype, "type", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIButtonGroup.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.child("ui-button[data-active='true']"),
            __metadata("design:type", UIButton)
        ], UIButtonGroup.prototype, "currentSelected", void 0);
        __decorate([
            aureliaFramework.children("ui-button"),
            __metadata("design:type", Array)
        ], UIButtonGroup.prototype, "buttons", void 0);
        UIButtonGroup = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customElement("ui-button-group"),
            aureliaFramework.inlineView("<template class=\"ui-btn__group\" click.delegate=\"buttonClicked($event)\" data-disabled.bind=\"isDisabled\" data-size.bind=\"size\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIButtonGroup);
        return UIButtonGroup;
    }());

    var UITag = (function () {
        function UITag(element) {
            this.element = element;
            this.id = "";
            this.label = "";
            this.icon = "";
            this.href = "";
            this.size = "nm";
            this.type = "normal";
            this.closeable = false;
            this.style = "normal";
        }
        UITag.prototype.close = function () {
            var _this = this;
            UIInternal.fireCallbackEvent(this, "beforeclose", this.id).then(function (b) {
                return b ? _this.remove() : undefined;
            });
        };
        UITag.prototype.bind = function () {
            this.hrefChanged();
            this.closeable = !isFalse(this.closeable);
        };
        UITag.prototype.hrefChanged = function () {
            if (this.vmElement) {
                if (this.href) {
                    this.vmElement.href = this.href;
                }
                else if (this.vmElement.attributes.getNamedItem("href")) {
                    this.vmElement.attributes.removeNamedItem("href");
                }
            }
        };
        UITag.prototype.fireClick = function ($event) {
            if (!this.href) {
                $event.stopEvent();
                return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
            }
        };
        UITag.prototype.remove = function () {
            var _this = this;
            this.element.dispatchEvent(UIInternal.createEvent("close", this.id));
            UIInternal.queueTask(function () { return aureliaFramework.DOM.removeNode(_this.vmElement); });
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITag.prototype, "id", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITag.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITag.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITag.prototype, "href", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITag.prototype, "size", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITag.prototype, "type", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UITag.prototype, "closeable", void 0);
        UITag = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-tag"),
            aureliaFramework.inlineView("<template><a class=\"ui-tag ui-tag--${type} ui-tag--${size}\" click.delegate=\"fireClick($event)\" ref=\"vmElement\">\n    <div class=\"ui-tag__label\">${label}</div>\n    <div class=\"ui-tag__icon\"><slot name=\"avatar\"><ui-icon if.bind=\"icon\" icon.bind=\"icon\"></ui-icon></slot></div>\n    <div class=\"ui-tag__value\"><slot></slot></div>\n    <div class=\"ui-tag__close\" if.bind=\"closeable\" click.trigger=\"[$event.stopEvent(), close()]\">&times;</div>\n  </a></template>"),
            __metadata("design:paramtypes", [Element])
        ], UITag);
        return UITag;
    }());

    var Buttons = [UIButton, UIButtonGroup, UITag];

    (function (UIFormat) {
        function toHTML(md) {
            return kramed(md, {
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            }).replace(/(\<a href=)/gi, '<a class="ui-link" target="_blank" href=');
        }
        UIFormat.toHTML = toHTML;
        function parseDate(dt) {
            return typeof dt === "string" ? dateFns.parseISO(dt) : dt;
        }
        function date(dt, ft) {
            if (ft === void 0) { ft = "dd MMM yyyy"; }
            dt = parseDate(dt);
            return !dt || !dateFns.isValid(dt) ? null : dateFns.format(dt, ft, { awareOfUnicodeTokens: true });
        }
        UIFormat.date = date;
        function time(dt, ft) {
            if (ft === void 0) { ft = "hh:mm a"; }
            dt = parseDate(dt);
            return !dt || !dateFns.isValid(dt) ? null : dateFns.format(dt, ft, { awareOfUnicodeTokens: true });
        }
        UIFormat.time = time;
        function datetime(dt, ft) {
            if (ft === void 0) { ft = "dd MMM yyyy hh:mm a"; }
            dt = parseDate(dt);
            return !dt || !dateFns.isValid(dt) ? null : dateFns.format(dt, ft, { awareOfUnicodeTokens: true });
        }
        UIFormat.datetime = datetime;
        function dateToISO(dt) {
            dt = parseDate(dt);
            return !dt || !dateFns.isValid(dt) ? null : dateFns.toDate(dt).toISOString();
        }
        UIFormat.dateToISO = dateToISO;
        function utcDate(dt) {
            dt = parseDate(dt);
            return !dt || !dateFns.isValid(dt)
                ? null
                : dateFns.format(dt, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
                    awareOfUnicodeTokens: true
                });
        }
        UIFormat.utcDate = utcDate;
        function age(dt) {
            dt = parseDate(dt);
            return !dt || !dateFns.isValid(dt) ? "" : dateFns.formatDistanceStrict(dt, new Date());
        }
        UIFormat.age = age;
        function fromNow(dt) {
            dt = parseDate(dt);
            return !dt || !dateFns.isValid(dt) ? "" : dateFns.formatDistance(dt, new Date(), { addSuffix: true });
        }
        UIFormat.fromNow = fromNow;
        function number(nm, fm) {
            if (fm === void 0) { fm = "0,0[.]00"; }
            return nm === null || isNaN(nm) ? "" : numeral(nm).format(fm);
        }
        UIFormat.number = number;
        function currency(nm, sy, fm) {
            if (sy === void 0) { sy = "$"; }
            if (fm === void 0) { fm = "$ 0,0.00"; }
            return nm === null || isNaN(nm)
                ? ""
                : numeral(nm)
                    .format(fm)
                    .replace("$", sy);
        }
        UIFormat.currency = currency;
        function percent(nm) {
            return nm === null || isNaN(nm) ? "" : numeral(nm > 1 ? nm / 100 : nm).format("0.00%");
        }
        UIFormat.percent = percent;
    })(exports.UIFormat || (exports.UIFormat = {}));

    var view$1 = "<template class=\"ui-calendar__header\">\n  <a class=\"ui-calendar__tool first\" data-tool=\"first\" if.bind=\"showFirstLast\" data-disabled.bind=\"config.firstDisabled\" ui-tooltip.bind=\"config.firstTooltip\"><ui-svg-icon icon=\"page-first\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__tool prev\" data-tool=\"prev\" data-disabled.bind=\"config.prevDisabled\" ui-tooltip.bind=\"config.prevTooltip\"><ui-svg-icon icon=\"page-previous\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__title\" data-tool=\"title\"><slot></slot></a>\n  <a class=\"ui-calendar__tool next\" data-tool=\"next\" data-disabled.bind=\"config.nextDisabled\" ui-tooltip.bind=\"config.nextTooltip\"><ui-svg-icon icon=\"page-next\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__tool last\" data-tool=\"last\" if.bind=\"showFirstLast\" data-disabled.bind=\"config.lastDisabled\" ui-tooltip.bind=\"config.lastTooltip\"><ui-svg-icon icon=\"page-last\"></ui-svg-icon></a>\n</template>\n";

    var CalendarHead = (function () {
        function CalendarHead() {
            this.showFirstLast = false;
            this.config = {};
        }
        CalendarHead.TITLE = "title";
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], CalendarHead.prototype, "showFirstLast", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], CalendarHead.prototype, "config", void 0);
        CalendarHead = __decorate([
            aureliaFramework.customElement("calendar-head"),
            aureliaFramework.inlineView(view$1)
        ], CalendarHead);
        return CalendarHead;
    }());

    var CALENDAR_VIEWS;
    (function (CALENDAR_VIEWS) {
        CALENDAR_VIEWS[CALENDAR_VIEWS["DAYS"] = 0] = "DAYS";
        CALENDAR_VIEWS[CALENDAR_VIEWS["MONTHS"] = 1] = "MONTHS";
        CALENDAR_VIEWS[CALENDAR_VIEWS["YEARS"] = 2] = "YEARS";
        CALENDAR_VIEWS[CALENDAR_VIEWS["DECADES"] = 3] = "DECADES";
    })(CALENDAR_VIEWS || (CALENDAR_VIEWS = {}));
    var CALENDAR_NAVIGATION;
    (function (CALENDAR_NAVIGATION) {
        CALENDAR_NAVIGATION["FIRST"] = "first";
        CALENDAR_NAVIGATION["LAST"] = "last";
        CALENDAR_NAVIGATION["PREV"] = "prev";
        CALENDAR_NAVIGATION["NEXT"] = "next";
    })(CALENDAR_NAVIGATION || (CALENDAR_NAVIGATION = {}));
    var CALENDAR_GRAIN;
    (function (CALENDAR_GRAIN) {
        CALENDAR_GRAIN["DAY"] = "$day";
        CALENDAR_GRAIN["WEEK"] = "$week";
        CALENDAR_GRAIN["MONTH"] = "$month";
        CALENDAR_GRAIN["YEAR"] = "$year";
    })(CALENDAR_GRAIN || (CALENDAR_GRAIN = {}));
    var parseDate = function (date) {
        if (isString(date)) {
            if (date.startsWith(CALENDAR_GRAIN.DAY)) {
                return dateFns.addDays(new Date(), parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
            }
            else if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
                return dateFns.addWeeks(new Date(), parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10));
            }
            else if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
                return dateFns.addMonths(new Date(), parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10));
            }
            else if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
                return dateFns.addYears(new Date(), parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10));
            }
            else {
                return dateFns.parseISO(date);
            }
        }
        else if (date) {
            return date;
        }
        return null;
    };
    var parseRange = function (date) {
        if (isString(date)) {
            var before = date.includes("-");
            if (date.startsWith(CALENDAR_GRAIN.DAY)) {
                var today = dateFns.startOfDay(new Date());
                var diff = dateFns.addDays(new Date(), parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
                return before ? [diff, today] : [today, diff];
            }
            if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
                var start = dateFns.startOfWeek(new Date());
                var end = dateFns.endOfWeek(new Date());
                var diff = parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10);
                return [dateFns.addWeeks(start, diff), dateFns.addWeeks(end, diff)];
            }
            if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
                var start = dateFns.startOfMonth(new Date());
                var end = dateFns.endOfMonth(new Date());
                var diff = parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10);
                return [dateFns.addMonths(start, diff), dateFns.addMonths(end, diff)];
            }
            if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
                var start = dateFns.startOfYear(new Date());
                var end = dateFns.endOfYear(new Date());
                var diff = parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10);
                return [dateFns.addYears(start, diff), dateFns.addYears(end, diff)];
            }
        }
        else if (isArray(date)) {
            return [dateFns.parseISO(date[0]), dateFns.parseISO(date[1])];
        }
        return null;
    };
    var getTitle = function (month, view) {
        if (view === CALENDAR_VIEWS.DAYS) {
            return dateFns.format(month, "MMMM yyyy");
        }
        if (view === CALENDAR_VIEWS.MONTHS) {
            return dateFns.format(month, "yyyy");
        }
        if (view === CALENDAR_VIEWS.YEARS) {
            return dateFns.format(dateFns.startOfDecade(month), "yyyy") + "-" + dateFns.format(dateFns.endOfDecade(month), "yyyy");
        }
        return "-";
    };
    var changeMonth = function (month, view, grain) {
        if (view === CALENDAR_VIEWS.DAYS) {
            switch (grain) {
                case CALENDAR_NAVIGATION.FIRST:
                    return dateFns.addMonths(month, -12);
                case CALENDAR_NAVIGATION.LAST:
                    return dateFns.addMonths(month, 12);
                case CALENDAR_NAVIGATION.PREV:
                    return dateFns.addMonths(month, -1);
                case CALENDAR_NAVIGATION.NEXT:
                    return dateFns.addMonths(month, 1);
            }
        }
        if (view === CALENDAR_VIEWS.MONTHS) {
            switch (grain) {
                case CALENDAR_NAVIGATION.PREV:
                    return dateFns.addYears(month, -1);
                case CALENDAR_NAVIGATION.NEXT:
                    return dateFns.addYears(month, 1);
            }
        }
        if (view === CALENDAR_VIEWS.YEARS) {
            switch (grain) {
                case CALENDAR_NAVIGATION.PREV:
                    return dateFns.addYears(month, -10);
                case CALENDAR_NAVIGATION.NEXT:
                    return dateFns.addYears(month, 10);
            }
        }
        return month;
    };
    var buildHeaderConfig = function (month, view, config) {
        if (view === CALENDAR_VIEWS.DAYS) {
            return {
                firstDisabled: isBeforeMin(month, config.minDate, -12),
                lastDisabled: isAfterMax(month, config.maxDate, 12),
                prevDisabled: isBeforeMin(month, config.minDate, -1),
                nextDisabled: isAfterMax(month, config.maxDate, 1),
                firstTooltip: dateFns.format(dateFns.addMonths(month, -12), "MMM yyyy"),
                lastTooltip: dateFns.format(dateFns.addMonths(month, 12), "MMM yyyy"),
                prevTooltip: dateFns.format(dateFns.addMonths(month, -1), "MMM yyyy"),
                nextTooltip: dateFns.format(dateFns.addMonths(month, 1), "MMM yyyy")
            };
        }
        if (view === CALENDAR_VIEWS.MONTHS) {
            return {
                prevDisabled: isBeforeMin(month, config.minDate, -12),
                nextDisabled: isAfterMax(month, config.maxDate, 12),
                prevTooltip: dateFns.format(dateFns.addYears(month, -1), "yyyy"),
                nextTooltip: dateFns.format(dateFns.addYears(month, 1), "yyyy")
            };
        }
        if (view === CALENDAR_VIEWS.YEARS) {
            var start = dateFns.startOfDecade(month);
            var end = dateFns.endOfDecade(month);
            return {
                prevDisabled: isBeforeMin(month, config.minDate, -120),
                nextDisabled: isAfterMax(month, config.maxDate, 120),
                prevTooltip: dateFns.format(dateFns.addYears(start, -10), "yyyy") + "-" + dateFns.format(dateFns.addYears(start, -1), "yyyy"),
                nextTooltip: dateFns.format(dateFns.addYears(end, 1), "yyyy") + "-" + dateFns.format(dateFns.addYears(end, 10), "yyyy")
            };
        }
    };
    var isBeforeMin = function (month, minDate, n) {
        if (n === void 0) { n = 0; }
        return dateFns.isValid(minDate) ? dateFns.isBefore(dateFns.addMonths(dateFns.startOfDay(month), n), dateFns.startOfDay(minDate)) : false;
    };
    var isAfterMax = function (month, maxDate, n) {
        if (n === void 0) { n = 0; }
        return dateFns.isValid(maxDate) ? dateFns.isAfter(dateFns.addMonths(dateFns.startOfDay(month), n), dateFns.startOfDay(maxDate)) : false;
    };
    var isDisabled = function (config, date) {
        var min = config.minDate;
        var max = config.maxDate;
        if (config.page === CALENDAR_VIEWS.MONTHS) {
            min = dateFns.startOfMonth(dateFns.startOfDay(min));
            max = dateFns.endOfMonth(dateFns.startOfDay(max));
        }
        if (config.page === CALENDAR_VIEWS.YEARS) {
            min = dateFns.startOfYear(dateFns.startOfDay(min));
            max = dateFns.startOfYear(dateFns.startOfDay(max));
        }
        if (dateFns.isBefore(date, min)) {
            return true;
        }
        if (dateFns.isAfter(date, max)) {
            return true;
        }
        if (config.page === CALENDAR_VIEWS.DAYS && config.disabled) {
            var disabled = config.disabled;
            if (isArray(disabled)) {
                return disabled.includes(dateFns.startOfDay(date).toISOString());
            }
            else if (isFunction(disabled)) {
                return disabled({ date: date });
            }
        }
        return false;
    };

    var view$2 = "<template data-page=\"days\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <span class=\"ui-calendar__page__head\">#</span>\n      <span class=\"ui-calendar__page__head\" repeat.for=\"w of 7\">${weekTitle(w)}</span>\n    </div>\n    <div class=\"ui-calendar__page__row\" repeat.for=\"w of 6\">\n      <span class=\"ui-calendar__page__cell week\">${weekNumber(w, month)}</span>\n      <a repeat.for=\"d of 7\" with.bind=\"getDate(w, d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell date ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

    var DaysPage = (function () {
        function DaysPage() {
            this.isAttached = false;
        }
        DaysPage.prototype.attached = function () {
            this.isAttached = true;
        };
        DaysPage.prototype.monthChanged = function (newMonth) {
            this.month = newMonth || new Date();
            var start = dateFns.startOfMonth(this.month);
            this.pageStart = dateFns.startOfWeek(dateFns.startOfMonth(this.month));
            if (dateFns.getDay(start) < 3) {
                this.pageStart = dateFns.addWeeks(this.pageStart, -1);
            }
        };
        DaysPage.prototype.weekTitle = function (week) {
            return dateFns.format(dateFns.setDay(new Date(), week), "E").substr(0, 2);
        };
        DaysPage.prototype.weekNumber = function (week) {
            return dateFns.format(dateFns.addWeeks(this.pageStart, week), "ww");
        };
        DaysPage.prototype.getDate = function (week, day) {
            var date = dateFns.addDays(dateFns.addWeeks(this.pageStart, week), day);
            var classes = [];
            if (!dateFns.isSameMonth(this.month, date)) {
                classes.push("date-other");
            }
            if (dateFns.isSameDay(new Date(), date)) {
                classes.push("date-today");
            }
            if (this.config) {
                if (isArray(this.config.date)) {
                    if (dateFns.isAfter(dateFns.startOfDay(date), this.config.date[0]) &&
                        dateFns.isBefore(dateFns.endOfDay(date), this.config.date[1])) {
                        classes.push("select-hilight");
                    }
                    if (dateFns.isSameDay(date, this.config.date[0])) {
                        classes.push("select-start");
                    }
                    if (dateFns.isSameDay(date, this.config.date[1])) {
                        classes.push("select-end");
                    }
                }
                if (isDate(this.config.date) && dateFns.isSameDay(date, this.config.date)) {
                    classes.push("selected");
                }
                if (isDisabled(this.config, date)) {
                    classes.push("disabled");
                }
            }
            return { date: date, label: dateFns.format(date, "dd"), classes: classes.join(" ") };
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Date)
        ], DaysPage.prototype, "month", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], DaysPage.prototype, "config", void 0);
        DaysPage = __decorate([
            aureliaFramework.customElement("days-page"),
            aureliaFramework.inlineView(view$2)
        ], DaysPage);
        return DaysPage;
    }());

    var view$3 = "<template data-page=\"months\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <a repeat.for=\"d of 12\" with.bind=\"getMonth(d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell month ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

    var MonthsPage = (function () {
        function MonthsPage() {
            this.isAttached = false;
        }
        MonthsPage.prototype.attached = function () {
            this.isAttached = true;
        };
        MonthsPage.prototype.getMonth = function (month) {
            var date = dateFns.setMonth(this.month, month);
            var classes = [];
            if (this.config) {
                if (isDate(this.config.date) && dateFns.isSameMonth(date, this.config.date)) {
                    classes.push("selected");
                }
                if (isDisabled(__assign({ disabled: [] }, this.config), date)) {
                    classes.push("disabled");
                }
            }
            return { date: date, label: dateFns.format(date, "MMM"), classes: classes.join(" ") };
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Date)
        ], MonthsPage.prototype, "month", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], MonthsPage.prototype, "config", void 0);
        MonthsPage = __decorate([
            aureliaFramework.customElement("months-page"),
            aureliaFramework.inlineView(view$3)
        ], MonthsPage);
        return MonthsPage;
    }());

    var view$4 = "<template data-page=\"time\" class=\"ui-calendar__clock\">\n  <ui-slider min=\"1\" max=\"12\" value.to-view=\"hour\" change.trigger=\"hour = $event.target.value & debounce\"></ui-slider>\n  <ui-slider min=\"0\" max=\"59\" value.to-view=\"minute\" change.trigger=\"minute = $event.target.value & debounce\"></ui-slider>\n\n  <div class=\"ui-calendar__clock__ampm\" data-value.bind=\"ampm\" click.trigger=\"switchAmpm()\">\n    <div></div>\n  </div>\n</template>\n";

    var TimePage = (function () {
        function TimePage(element) {
            this.element = element;
            this.time = new Date();
        }
        Object.defineProperty(TimePage.prototype, "hour", {
            get: function () {
                var hr = dateFns.getHours(this.time);
                return "" + (hr === 0 || hr === 12 ? 12 : hr > 12 ? hr - 12 : hr);
            },
            set: function (hour) {
                var newHr = parseInt(hour === "12" ? "0" : hour, 10);
                var hr = dateFns.getHours(this.time);
                this.time = dateFns.setHours(this.time, hr < 12 ? newHr : newHr + 12);
                this.fireChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimePage.prototype, "minute", {
            get: function () {
                return dateFns.getMinutes(this.time);
            },
            set: function (min) {
                this.time = dateFns.setMinutes(this.time, min);
                this.fireChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimePage.prototype, "ampm", {
            get: function () {
                return dateFns.getHours(this.time) < 12 ? "am" : "pm";
            },
            enumerable: true,
            configurable: true
        });
        TimePage.prototype.switchAmpm = function () {
            var hr = dateFns.getHours(this.time);
            this.time = dateFns.setHours(this.time, hr < 12 ? hr + 12 : hr - 12);
            this.fireChange();
        };
        TimePage.prototype.fireChange = function () {
            this.element.dispatchEvent(UIInternal.createEvent("change", this.time));
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Date)
        ], TimePage.prototype, "time", void 0);
        __decorate([
            aureliaFramework.computedFrom("time"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], TimePage.prototype, "hour", null);
        __decorate([
            aureliaFramework.computedFrom("time"),
            __metadata("design:type", Number),
            __metadata("design:paramtypes", [Number])
        ], TimePage.prototype, "minute", null);
        __decorate([
            aureliaFramework.computedFrom("time"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], TimePage.prototype, "ampm", null);
        TimePage = __decorate([
            aureliaFramework.customElement("time-page"),
            aureliaFramework.inlineView(view$4),
            __metadata("design:paramtypes", [Element])
        ], TimePage);
        return TimePage;
    }());

    var view$5 = "<template class=\"ui-calendar\">\n  <calendar-head click.delegate=\"headerClicked($event)\" config.bind=\"headerOptions\" show-first-last.bind=\"currentPage === VIEWS.DAYS\">${title}\n  </calendar-head>\n  <days-page if.bind=\"currentPage === VIEWS.DAYS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectDate($event)\"></days-page>\n  <months-page if.bind=\"currentPage === VIEWS.MONTHS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectMonth($event)\"></months-page>\n  <years-page if.bind=\"currentPage === VIEWS.YEARS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectMonth($event)\"></years-page>\n  <time-page time.bind=\"time\" change.trigger=\"timeChanged($event.detail)\"></time-page>\n  <div class=\"ui-calendar__footer\">\n    <div class=\"ui-calendar__tags\">\n      <a class=\"ui-calendar__tag\" repeat.for=\"preset of datePresets\" data-active.bind=\"preset.preset == date\" click.trigger=\"selectPreset(preset.preset)\">${preset.label}</a>\n    </div>\n    <a if.bind=\"selecting || currentPage !== VIEWS.DAYS\" class=\"ui-calendar__tag cancel\" click.trigger=\"cancelSelection()\">Cancel</a>\n  </div>\n</template>\n";

    var view$6 = "<template data-page=\"years\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <a repeat.for=\"d of 12\" with.bind=\"getYear(d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell year ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

    var YearsPage = (function () {
        function YearsPage() {
            this.isAttached = false;
        }
        YearsPage.prototype.attached = function () {
            this.isAttached = true;
        };
        YearsPage.prototype.monthChanged = function (newMonth) {
            this.month = newMonth || new Date();
            this.pageStart = dateFns.addYears(dateFns.startOfDecade(this.month), -1);
        };
        YearsPage.prototype.getYear = function (year) {
            var date = dateFns.addYears(this.pageStart, year);
            var classes = [];
            if (year === 0 || year === 11) {
                classes.push("date-other");
            }
            if (this.config) {
                if (isDate(this.config.date) && dateFns.isSameYear(date, this.config.date)) {
                    classes.push("selected");
                }
                if (isDisabled(__assign({ disabled: [] }, this.config), date)) {
                    classes.push("disabled");
                }
            }
            return { date: date, label: dateFns.format(date, "yyyy"), classes: classes.join(" ") };
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Date)
        ], YearsPage.prototype, "month", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], YearsPage.prototype, "config", void 0);
        YearsPage = __decorate([
            aureliaFramework.customElement("years-page"),
            aureliaFramework.inlineView(view$6)
        ], YearsPage);
        return YearsPage;
    }());

    var UIDatePicker = (function () {
        function UIDatePicker() {
            this.format = "dd MMM yyyy HH:mm";
            this.datePresets = [];
            this.currentPage = CALENDAR_VIEWS.DAYS;
            this.month = dateFns.startOfMonth(new Date());
            this.time = dateFns.parseISO("2018-01-01T00:00:00.000");
            this.VIEWS = CALENDAR_VIEWS;
        }
        UIDatePicker.prototype.bind = function () {
            this.dateChanged();
        };
        UIDatePicker.prototype.dateChanged = function () {
            var _this = this;
            this.selectedDate = parseDate(this.date);
            if (dateFns.isValid(this.selectedDate)) {
                this.time = new Date(this.selectedDate);
                this.month = dateFns.startOfMonth(this.selectedDate);
                var preset = this.datePresets.find(function (p) { return p.preset === _this.date; });
                this.dateLabel = preset ? preset.label : exports.UIFormat.datetime(this.selectedDate, this.format);
            }
        };
        Object.defineProperty(UIDatePicker.prototype, "config", {
            get: function () {
                return {
                    date: this.selectedDate,
                    page: this.currentPage,
                    minDate: parseDate(this.minDate),
                    maxDate: parseDate(this.maxDate),
                    disabled: this.disabledDatesList
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIDatePicker.prototype, "title", {
            get: function () {
                return getTitle(this.month, this.currentPage);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIDatePicker.prototype, "headerOptions", {
            get: function () {
                return buildHeaderConfig(this.month, this.currentPage, this.config);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIDatePicker.prototype, "disabledDatesList", {
            get: function () {
                if (isArray(this.disabledDates)) {
                    return this.disabledDates.map(function (d) {
                        var dt = parseDate(d);
                        return !isEmpty(dt) ? dateFns.startOfDay(dt).toISOString() : null;
                    });
                }
                return this.disabledDates;
            },
            enumerable: true,
            configurable: true
        });
        UIDatePicker.prototype.headerClicked = function ($event) {
            var target = $event.target;
            if (target.dataset.tool) {
                if (target.dataset.tool === CalendarHead.TITLE) {
                    if (this.currentPage !== CALENDAR_VIEWS.YEARS) {
                        this.currentPage++;
                    }
                }
                else {
                    this.month = changeMonth(this.month, this.currentPage, target.dataset.tool);
                }
            }
        };
        UIDatePicker.prototype.selectDate = function ($event) {
            var target = $event.target;
            if (target.dataset.date) {
                this.updateDate(dateFns.startOfDay(new Date(target.dataset.date)));
            }
        };
        UIDatePicker.prototype.timeChanged = function (newTime) {
            this.updateDate(this.date ? dateFns.parseISO(this.date) : new Date(), newTime);
        };
        UIDatePicker.prototype.selectMonth = function ($event) {
            var target = $event.target;
            if (target.dataset.date) {
                this.month = new Date(target.dataset.date);
                this.currentPage--;
            }
        };
        UIDatePicker.prototype.cancelSelection = function () {
            this.currentPage = CALENDAR_VIEWS.DAYS;
        };
        UIDatePicker.prototype.selectPreset = function (preset) {
            this.cancelSelection();
            this.date = preset;
        };
        UIDatePicker.prototype.updateDate = function (dt, tm) {
            if (tm === void 0) { tm = this.time; }
            dt.setHours(tm.getHours());
            dt.setMinutes(tm.getMinutes());
            this.date = dt.toISOString();
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", String)
        ], UIDatePicker.prototype, "date", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDatePicker.prototype, "minDate", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDatePicker.prototype, "maxDate", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIDatePicker.prototype, "disabledDates", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDatePicker.prototype, "format", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UIDatePicker.prototype, "datePresets", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.fromView }),
            __metadata("design:type", String)
        ], UIDatePicker.prototype, "dateLabel", void 0);
        __decorate([
            aureliaFramework.computedFrom("selectedDate", "currentPage", "minDate", "maxDate", "disabledDates"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIDatePicker.prototype, "config", null);
        __decorate([
            aureliaFramework.computedFrom("month", "currentPage"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], UIDatePicker.prototype, "title", null);
        __decorate([
            aureliaFramework.computedFrom("month", "currentPage", "minDate", "maxDate"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIDatePicker.prototype, "headerOptions", null);
        UIDatePicker = __decorate([
            aureliaFramework.customElement("ui-date-picker"),
            aureliaFramework.inlineView(view$5),
            aureliaFramework.viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
        ], UIDatePicker);
        return UIDatePicker;
    }());

    var view$7 = "<template class=\"ui-calendar\">\n  <div class=\"ui-calendar__range\">\n    <div>\n      <calendar-head click.delegate=\"startHeaderClicked($event)\" config.bind=\"startHeaderOptions\" show-first-last.bind=\"startPage === VIEWS.DAYS\">${startTitle}\n      </calendar-head>\n      <days-page if.bind=\"startPage === VIEWS.DAYS\" month.bind=\"startMonth\" config.to-view=\"config\" mouseover.delegate=\"hilightDate($event)\" click.delegate=\"selectDate($event)\"></days-page>\n      <months-page if.bind=\"startPage === VIEWS.MONTHS\" month.bind=\"startMonth\" config.to-view=\"config\" click.delegate=\"selectStartMonth($event)\"></months-page>\n      <years-page if.bind=\"startPage === VIEWS.YEARS\" month.bind=\"startMonth\" config.to-view=\"config\" click.delegate=\"selectStartMonth($event)\"></years-page>\n    </div>\n    <ui-divider></ui-divider>\n    <div>\n      <calendar-head click.delegate=\"endHeaderClicked($event)\" config.bind=\"endHeaderOptions\" show-first-last.bind=\"endPage === VIEWS.DAYS\">${endTitle}\n      </calendar-head>\n      <days-page if.bind=\"endPage === VIEWS.DAYS\" month.bind=\"endMonth\" config.to-view=\"config\" mouseover.delegate=\"hilightDate($event)\" click.delegate=\"selectDate($event)\"></days-page>\n      <months-page if.bind=\"endPage === VIEWS.MONTHS\" month.bind=\"endMonth\" config.to-view=\"config\" click.delegate=\"selectEndMonth($event)\"></months-page>\n      <years-page if.bind=\"endPage === VIEWS.YEARS\" month.bind=\"endMonth\" config.to-view=\"config\" click.delegate=\"selectEndMonth($event)\"></years-page>\n    </div>\n  </div>\n  <div class=\"ui-calendar__footer\">\n    <div class=\"ui-calendar__tags\">\n      <a class=\"ui-calendar__tag\" repeat.for=\"preset of datePresets\" data-active.bind=\"preset.preset == date\" click.trigger=\"selectPreset(preset.preset)\">${preset.label}</a>\n    </div>\n    <a if.bind=\"selecting || startPage !== VIEWS.DAYS || endPage !== VIEWS.DAYS\" class=\"ui-calendar__tag cancel\" click.trigger=\"cancelSelection()\">Cancel</a>\n  </div>\n</template>\n";

    var UIRangePicker = (function () {
        function UIRangePicker() {
            this.format = "dd MMM yyyy";
            this.datePresets = [];
            this.startMonth = dateFns.startOfMonth(new Date());
            this.endMonth = dateFns.startOfMonth(dateFns.addMonths(new Date(), 1));
            this.startPage = CALENDAR_VIEWS.DAYS;
            this.endPage = CALENDAR_VIEWS.DAYS;
            this.VIEWS = CALENDAR_VIEWS;
        }
        UIRangePicker.prototype.bind = function () {
            this.dateChanged();
        };
        UIRangePicker.prototype.dateChanged = function () {
            var _this = this;
            this.selectedDate = parseRange(this.date);
            if (this.selectedDate) {
                this.startMonth = dateFns.startOfMonth(this.selectedDate[0]);
                this.endMonth = dateFns.startOfMonth(this.selectedDate[1]);
                var preset = this.datePresets.find(function (p) { return p.preset === _this.date; });
                this.dateLabel = preset
                    ? preset.label
                    : exports.UIFormat.date(this.selectedDate[0], this.format) + " ~ " + exports.UIFormat.date(this.selectedDate[1], this.format);
            }
        };
        Object.defineProperty(UIRangePicker.prototype, "config", {
            get: function () {
                return {
                    date: this.selecting ? [this.selecting, this.hilight] : this.selectedDate,
                    minDate: parseDate(this.minDate),
                    maxDate: parseDate(this.maxDate),
                    disabled: []
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRangePicker.prototype, "startTitle", {
            get: function () {
                return getTitle(this.startMonth, this.startPage);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRangePicker.prototype, "endTitle", {
            get: function () {
                return getTitle(this.endMonth, this.endPage);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRangePicker.prototype, "startHeaderOptions", {
            get: function () {
                return buildHeaderConfig(this.startMonth, this.startPage, __assign({}, this.config, { page: this.startPage }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRangePicker.prototype, "endHeaderOptions", {
            get: function () {
                return buildHeaderConfig(this.endMonth, this.endPage, __assign({}, this.config, { page: this.endPage }));
            },
            enumerable: true,
            configurable: true
        });
        UIRangePicker.prototype.startHeaderClicked = function ($event) {
            var target = $event.target;
            if (target.dataset.tool) {
                if (target.dataset.tool === CalendarHead.TITLE) {
                    if (this.startPage !== CALENDAR_VIEWS.YEARS) {
                        this.startPage++;
                    }
                }
                else {
                    this.startMonth = changeMonth(this.startMonth, this.startPage, target.dataset.tool);
                    if (dateFns.isSameMonth(this.startMonth, this.endMonth) ||
                        dateFns.isAfter(this.startMonth, this.endMonth)) {
                        this.endMonth = dateFns.addMonths(this.startMonth, 1);
                    }
                }
            }
        };
        UIRangePicker.prototype.endHeaderClicked = function ($event) {
            var target = $event.target;
            if (target.dataset.tool) {
                if (target.dataset.tool === CalendarHead.TITLE) {
                    if (this.endPage !== CALENDAR_VIEWS.YEARS) {
                        this.endPage++;
                    }
                }
                else {
                    this.endMonth = changeMonth(this.endMonth, this.endPage, target.dataset.tool);
                    if (dateFns.isSameMonth(this.startMonth, this.endMonth) ||
                        dateFns.isBefore(this.endMonth, this.startMonth)) {
                        this.startMonth = dateFns.addMonths(this.endMonth, -1);
                    }
                }
            }
        };
        UIRangePicker.prototype.selectDate = function ($event) {
            var target = $event.target;
            if (target.dataset.date) {
                var date = new Date(target.dataset.date);
                if (this.selecting) {
                    this.date = dateFns.isBefore(date, this.selecting)
                        ? [dateFns.startOfDay(date).toISOString(), dateFns.endOfDay(this.selecting).toISOString()]
                        : [dateFns.startOfDay(this.selecting).toISOString(), dateFns.endOfDay(date).toISOString()];
                    this.selecting = null;
                }
                else {
                    this.selecting = date;
                }
            }
        };
        UIRangePicker.prototype.selectStartMonth = function ($event) {
            var target = $event.target;
            if (target.dataset.date) {
                this.startMonth = new Date(target.dataset.date);
                this.startPage--;
                if (dateFns.isSameMonth(this.startMonth, this.endMonth) || dateFns.isAfter(this.startMonth, this.endMonth)) {
                    this.endMonth = dateFns.addMonths(this.startMonth, 1);
                }
            }
        };
        UIRangePicker.prototype.selectEndMonth = function ($event) {
            var target = $event.target;
            if (target.dataset.date) {
                this.endMonth = new Date(target.dataset.date);
                this.endPage--;
                if (dateFns.isSameMonth(this.startMonth, this.endMonth) || dateFns.isBefore(this.endMonth, this.startMonth)) {
                    this.startMonth = dateFns.addMonths(this.endMonth, -1);
                }
            }
        };
        UIRangePicker.prototype.cancelSelection = function () {
            this.selecting = null;
            this.startPage = CALENDAR_VIEWS.DAYS;
            this.endPage = CALENDAR_VIEWS.DAYS;
        };
        UIRangePicker.prototype.hilightDate = function ($event) {
            var target = $event.target;
            if (target.dataset.date) {
                this.hilight = new Date(target.dataset.date);
            }
        };
        UIRangePicker.prototype.selectPreset = function (preset) {
            this.cancelSelection();
            this.date = preset;
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIRangePicker.prototype, "date", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIRangePicker.prototype, "minDate", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIRangePicker.prototype, "maxDate", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIRangePicker.prototype, "format", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UIRangePicker.prototype, "datePresets", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.fromView }),
            __metadata("design:type", String)
        ], UIRangePicker.prototype, "dateLabel", void 0);
        __decorate([
            aureliaFramework.computedFrom("selectedDate", "hilight", "selecting", "minDate", "maxDate", "disabledDates"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIRangePicker.prototype, "config", null);
        __decorate([
            aureliaFramework.computedFrom("startMonth", "startPage"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], UIRangePicker.prototype, "startTitle", null);
        __decorate([
            aureliaFramework.computedFrom("endMonth", "endPage"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], UIRangePicker.prototype, "endTitle", null);
        __decorate([
            aureliaFramework.computedFrom("startMonth", "startPage", "minDate", "maxDate"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIRangePicker.prototype, "startHeaderOptions", null);
        __decorate([
            aureliaFramework.computedFrom("endMonth", "endPage", "minDate", "maxDate"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIRangePicker.prototype, "endHeaderOptions", null);
        UIRangePicker = __decorate([
            aureliaFramework.customElement("ui-range-picker"),
            aureliaFramework.inlineView(view$7),
            aureliaFramework.viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
        ], UIRangePicker);
        return UIRangePicker;
    }());

    var Calendar = [UIDatePicker, UIRangePicker];

    var UICard = (function () {
        function UICard(element) {
            this.element = element;
            this.width = "";
            this.minWidth = "8rem";
            this.maxWidth = "100vw";
            this.height = "";
            this.minHeight = "unset";
            this.maxHeight = "100vh";
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICard.prototype, "width", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICard.prototype, "minWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICard.prototype, "maxWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICard.prototype, "height", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICard.prototype, "minHeight", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICard.prototype, "maxHeight", void 0);
        UICard = __decorate([
            aureliaFramework.customElement("ui-card"),
            aureliaFramework.inlineView("<template class='ui-panel-base ui-card' css.bind='{width, minWidth, maxWidth, height, minHeight, maxHeight}'>\n<slot name=\"panel-header\"></slot>\n<div class=\"ui-card__body\"><slot></slot></div>\n<slot name=\"panel-footer\"></slot>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], UICard);
        return UICard;
    }());

    var UICardContent = (function () {
        function UICardContent(element) {
            this.element = element;
            if (element.hasAttribute("fill")) {
                element.classList.add("ui-card__content--fill");
            }
        }
        UICardContent = __decorate([
            aureliaFramework.customElement("ui-card-content"),
            aureliaFramework.inlineView("<template class='ui-card__content'><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UICardContent);
        return UICardContent;
    }());

    var UICardList = (function () {
        function UICardList(element) {
            this.element = element;
        }
        UICardList = __decorate([
            aureliaFramework.customElement("ui-card-list"),
            aureliaFramework.inlineView("<template class='ui-card__list'><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UICardList);
        return UICardList;
    }());

    var UICardMedia = (function () {
        function UICardMedia(element) {
            this.element = element;
            if (element.hasAttribute("top")) {
                element.classList.add("ui-card__media--top");
            }
        }
        UICardMedia = __decorate([
            aureliaFramework.customElement("ui-card-media"),
            aureliaFramework.inlineView("<template class='ui-card__media'><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UICardMedia);
        return UICardMedia;
    }());

    var UICardMeta = (function () {
        function UICardMeta(element) {
            this.element = element;
        }
        UICardMeta = __decorate([
            aureliaFramework.customElement("ui-card-meta"),
            aureliaFramework.inlineView("<template class='ui-card__meta'><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UICardMeta);
        return UICardMeta;
    }());

    var UICardTitle = (function () {
        function UICardTitle(element) {
            this.element = element;
        }
        UICardTitle = __decorate([
            aureliaFramework.customElement("ui-card-title"),
            aureliaFramework.inlineView("<template class='ui-card__title'><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UICardTitle);
        return UICardTitle;
    }());

    var Card = [UICard, UICardContent, UICardMeta, UICardMedia, UICardList, UICardTitle];

    var NODE_ID = 0;
    var UITreeModel = (function () {
        function UITreeModel(children, maxNodes) {
            if (maxNodes === void 0) { maxNodes = 0; }
            this.maxNodes = maxNodes;
            this.children = [];
            this.nodes = [];
            this.children = children.map(function (child) { return new UITreeNode(child); });
            this.nodes = this.getExpandedTree(this.children.sortBy("label"));
        }
        UITreeModel.prototype.filter = function (query) {
            var filtered = this.filterNodes(this.children, query);
            this.nodes = this.getExpandedTree(filtered.sortBy("label"));
        };
        UITreeModel.prototype.toggleExpand = function (index) {
            var node = this.nodes[index];
            node.expanded = !node.expanded;
            if (node.expanded) {
                var injectedChildren = node.children.sortBy("label");
                if (injectedChildren.length === 0) {
                    injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
                }
                if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
                    injectedChildren = __spread(injectedChildren.slice(0, this.maxNodes), [
                        new UITreeNode({ id: "node-more", leaf: true }, node)
                    ]);
                }
                this.nodes = __spread(this.nodes.slice(0, index + 1), injectedChildren, this.nodes.slice(index + 1));
            }
            else {
                var lastIndex = this.nodes.lastIndex(node.id, "parentId");
                while (this.nodes[lastIndex].expanded) {
                    lastIndex = this.nodes.lastIndex(this.nodes[lastIndex].id, "parentId");
                }
                this.nodes = __spread(this.nodes.slice(0, index + 1), this.nodes.slice(lastIndex + 1));
            }
        };
        UITreeModel.prototype.toggleMore = function (index) {
            var node = this.nodes[index];
            node.showingMore = !node.showingMore;
            var parentIndex = this.nodes.index(node.parentId, "id");
            var injectedChildren = this.nodes[parentIndex].children.sortBy("label");
            if (!node.showingMore) {
                if (injectedChildren.length === 0) {
                    injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
                }
                if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
                    injectedChildren = __spread(injectedChildren.slice(0, this.maxNodes));
                }
            }
            this.nodes = __spread(this.nodes.slice(0, parentIndex + 1), injectedChildren, [
                this.nodes[index]
            ], this.nodes.slice(index + 1));
        };
        UITreeModel.prototype.getChecked = function () {
            var checked = [];
            this.getCheckedNodes(this.children, checked);
            return checked;
        };
        UITreeModel.prototype.getCheckedNodes = function (nodes, checked) {
            var _this = this;
            nodes.forEach(function (node) {
                if (node.checked === 1) {
                    checked.push(node);
                }
                if (node.children) {
                    _this.getCheckedNodes(node.childNodes, checked);
                }
            });
        };
        UITreeModel.prototype.getExpandedTree = function (children) {
            var _this = this;
            var nodes = [];
            children.forEach(function (child) {
                nodes.push(child);
                if (child.expanded) {
                    var injectedChildren = child.children.sortBy("label");
                    if (injectedChildren.length === 0) {
                        injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, child));
                    }
                    if (_this.maxNodes > 0 && injectedChildren.length > _this.maxNodes) {
                        injectedChildren = __spread(injectedChildren.slice(0, _this.maxNodes), [
                            new UITreeNode({ id: "node-more", leaf: true }, child)
                        ]);
                    }
                    nodes.push.apply(nodes, __spread(_this.getExpandedTree(injectedChildren)));
                }
            });
            return nodes;
        };
        UITreeModel.prototype.filterNodes = function (nodes, query) {
            var _this = this;
            return nodes.filter(function (child) {
                var retVal = !query ||
                    child.label
                        .ascii()
                        .toLocaleLowerCase()
                        .includes(query.ascii().toLocaleLowerCase());
                if (!child.leaf) {
                    child.filtered = _this.filterNodes(child.childNodes, query);
                    retVal = retVal || child.filtered.length > 0;
                }
                return retVal;
            });
        };
        return UITreeModel;
    }());
    var UITreeNode = (function () {
        function UITreeNode(node, parent) {
            var _this = this;
            this.parent = parent;
            this.childNodes = [];
            this.filtered = null;
            this.level = 0;
            this.checked = 0;
            this.id = node.id || "node__" + NODE_ID++;
            this.label = node.label;
            this.model = node.model;
            this.icon = node.icon;
            this.iconOpen = node.iconOpen;
            this.iconClosed = node.iconClosed;
            this.leaf = !!node.leaf;
            this.expanded = node.expanded;
            this.disabled = node.disabled;
            if (parent) {
                this.level = parent.level + 1;
                this.parentId = parent.id;
            }
            if (node.children) {
                this.childNodes = node.children.map(function (child) { return new UITreeNode(child, _this); });
            }
        }
        Object.defineProperty(UITreeNode.prototype, "nodeIcon", {
            get: function () {
                return (this.leaf ? this.icon : this.expanded ? this.iconOpen : this.iconClosed) || this.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITreeNode.prototype, "checkIcon", {
            get: function () {
                return this.checked === 2
                    ? "tree-check-half"
                    : this.checked
                        ? "tree-check-on"
                        : "tree-check-off";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITreeNode.prototype, "expandIcon", {
            get: function () {
                return this.expanded ? "tree-collapse" : "tree-expand";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UITreeNode.prototype, "children", {
            get: function () {
                return this.filtered || this.childNodes;
            },
            enumerable: true,
            configurable: true
        });
        UITreeNode.prototype.toggleCheck = function () {
            var _this = this;
            this.checked = this.checked ? 0 : 1;
            this.children.forEach(function (c) {
                c.updateChild("checked", _this.checked);
            });
            if (this.parent && this.parent.updatePartial) {
                this.parent.updatePartial();
            }
        };
        UITreeNode.prototype.updatePartial = function () {
            var allChecked = this.children.every(function (node) { return node.checked === 1; });
            var allUnchecked = this.children.every(function (node) { return node.checked === 0; });
            this.checked = allChecked ? 1 : allUnchecked ? 0 : 2;
            if (this.parent && this.parent.updatePartial) {
                this.parent.updatePartial();
            }
        };
        UITreeNode.prototype.updateChild = function (prop, v) {
            this[prop] = v;
            this.children.forEach(function (c) {
                c.updateChild(prop, v);
            });
        };
        __decorate([
            aureliaFramework.computedFrom("leaf", "icon", "expanded", "iconOpen", "iconClosed"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UITreeNode.prototype, "nodeIcon", null);
        __decorate([
            aureliaFramework.computedFrom("checked"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UITreeNode.prototype, "checkIcon", null);
        __decorate([
            aureliaFramework.computedFrom("expanded"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UITreeNode.prototype, "expandIcon", null);
        return UITreeNode;
    }());

    var view$8 = "<template class=\"ui-tree__node ${isSelected ? 'ui-tree--selected':''}\">\n  <div class=\"ui-tree__spacer\" repeat.for=\"i of node.level\"></div>\n  <template if.bind=\"node.id !== 'node-more' && node.id !== 'node-empty'\">\n    <div class=\"ui-tree__expander\" click.trigger=\"tree.toggleExpand(index)\" if.bind=\"!node.leaf\">\n      <ui-svg-icon icon.bind=\"node.expandIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__checkbox\" click.trigger=\"tree.toggleCheck(node)\" if.bind=\"tree.checkable !== false && node.level >= tree.checkable\">\n      <ui-svg-icon icon.bind=\"node.checkIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__icon\">\n      <ui-svg-icon if.bind=\"node.loading\" icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n      <ui-icon else class.bind=\"node.nodeIcon\"></ui-icon>\n    </div>\n    <div class=\"ui-tree__label\" click.trigger=\"tree.select(node)\">${node.label}</div>\n  </template>\n  <template if.bind=\"node.id === 'node-more'\">\n    <a class=\"ui-tree__show-more\" click.trigger=\"tree.toggleMore(index)\">\n      <span if.bind=\"node.showingMore\">${tree.labelLess}</span>\n      <span else>${tree.labelMore}</span>\n    </a>\n  </template>\n  <template if.bind=\"node.id === 'node-empty'\">\n    <div class=\"ui-tree__no-children\" ui-color=\"gray\">${tree.labelEmpty}</div>\n  </template>\n</template>\n";

    var TreeNode = (function () {
        function TreeNode() {
        }
        Object.defineProperty(TreeNode.prototype, "isSelected", {
            get: function () {
                return this.tree.value === this.node.id;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", UITreeNode)
        ], TreeNode.prototype, "node", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], TreeNode.prototype, "index", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", UITreePanel)
        ], TreeNode.prototype, "tree", void 0);
        __decorate([
            aureliaFramework.computedFrom("tree.value", "node.id"),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [])
        ], TreeNode.prototype, "isSelected", null);
        TreeNode = __decorate([
            aureliaFramework.inlineView(view$8)
        ], TreeNode);
        return TreeNode;
    }());

    var UITreePanel = (function () {
        function UITreePanel(element) {
            this.element = element;
            this.value = undefined;
            this.model = undefined;
            this.labelSearch = "Search...";
            this.labelEmpty = "No Items";
            this.labelLess = "Show Less...";
            this.labelMore = "Show More...";
            this.checkable = false;
            this.searchable = false;
            this.checkable = element.hasAttribute("checkable");
            this.searchable = element.hasAttribute("searchable");
        }
        UITreePanel.prototype.select = function (node) {
            var _this = this;
            if (this.checkable !== false) {
                if (node.level >= this.checkable) {
                    node.toggleCheck();
                    this.getCheckedValues();
                    this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
                }
            }
            else {
                return UIInternal.fireCallbackEvent(this, "beforeselect").then(function (b) {
                    return b ? _this.changeSelection(node) : false;
                });
            }
        };
        UITreePanel.prototype.bind = function () {
            this.rootNode = new UITreeModel(this.dataSource, this.maxNodes);
        };
        UITreePanel.prototype.dataSourceChanged = function () {
            this.rootNode = new UITreeModel(this.dataSource, this.maxNodes);
        };
        UITreePanel.prototype.toggleExpand = function (index) {
            this.rootNode.toggleExpand(index);
        };
        UITreePanel.prototype.toggleMore = function (index) {
            this.rootNode.toggleMore(index);
        };
        UITreePanel.prototype.toggleCheck = function (node) {
            node.toggleCheck();
            this.getCheckedValues();
            this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
        };
        UITreePanel.prototype.getCheckedValues = function () {
            var _this = this;
            this.value = [];
            this.model = [];
            this.rootNode.getChecked().forEach(function (checkedNode) {
                if (checkedNode.level >= _this.checkable) {
                    _this.value.push(checkedNode.id);
                    _this.model.push(checkedNode.model);
                }
            });
        };
        UITreePanel.prototype.searchTextChanged = function (query) {
            this.rootNode.filter(query);
        };
        UITreePanel.prototype.changeSelection = function (node) {
            this.value = node.id;
            this.model = node.model;
            this.element.dispatchEvent(UIInternal.createEvent("select", this.value));
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITreePanel.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITreePanel.prototype, "model", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UITreePanel.prototype, "dataSource", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITreePanel.prototype, "labelSearch", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITreePanel.prototype, "labelEmpty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITreePanel.prototype, "labelLess", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITreePanel.prototype, "labelMore", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UITreePanel.prototype, "maxNodes", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UITreePanel.prototype, "checkable", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UITreePanel.prototype, "searchable", void 0);
        UITreePanel = __decorate([
            aureliaFramework.customElement("ui-tree-panel"),
            aureliaFramework.viewResources(TreeNode),
            aureliaFramework.inlineView("<template class=\"ui-tree__panel\"><ui-field nolabel class=\"ui-tree__search\" if.bind=\"searchable\">\n  <ui-input type=\"search\" placeholder=\"${labelSearch}\" value.bind=\"searchText\" \n  clear.trigger=\"searchTextChanged()\" input.trigger=\"searchTextChanged(searchText) & debounce:200\">\n    <ui-input-addon class=\"ui-text-muted\"><ui-icon icon=\"mdi mdi-magnify\"></ui-icon></ui-input-addon></ui-input></ui-field>\n  <div class=\"ui-tree__container\" nodeclick.delegate=\"itemClicked($event.detail)\" nodeover.delegate=\"itemOver($event.detail)\" nodeout.delegate=\"itemOut($event.detail)\">\n    <tree-node virtual-repeat.for=\"child of rootNode.nodes\" node.bind=\"child\" tree.bind=\"$parent\" index.bind=\"$index\"></tree-node>\n  </div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UITreePanel);
        return UITreePanel;
    }());

    var DataPanels = [UITreePanel];

    var view$9 = "<template class=\"ui-option\" data-disabled.bind=\"disabled || isDisabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"checkbox\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <ui-svg-icon icon=\"check-off\"></ui-svg-icon>\n    <ui-svg-icon icon=\"check-on\"></ui-svg-icon>\n    <span>\n      <slot></slot>\n    </span>\n  </label>\n</template>\n";

    var UICheckbox = (function () {
        function UICheckbox(element) {
            this.element = element;
            this.disabled = false;
            this.isDisabled = false;
        }
        UICheckbox.prototype.disable = function (b) {
            this.isDisabled = b;
        };
        UICheckbox.prototype.bind = function () {
            if (this.checked === "true") {
                this.checked = true;
            }
        };
        UICheckbox.prototype.checkChanged = function ($event) {
            $event.stopPropagation();
            this.element.dispatchEvent(UIInternal.createEvent("change", this));
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UICheckbox.prototype, "checked", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UICheckbox.prototype, "model", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UICheckbox.prototype, "matcher", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UICheckbox.prototype, "disabled", void 0);
        UICheckbox = __decorate([
            aureliaFramework.customElement("ui-checkbox"),
            aureliaFramework.inlineView(view$9),
            __metadata("design:paramtypes", [Element])
        ], UICheckbox);
        return UICheckbox;
    }());

    var UIField = (function () {
        function UIField(element) {
            this.element = element;
            this.label = "";
            this.plain = false;
            this.required = false;
            this.disabled = false;
            this.width = "auto";
            if (element.hasAttribute("nolabel")) {
                element.classList.add("ui-field--nolabel");
            }
            if (element.hasAttribute("inline")) {
                element.classList.add("ui-field--inline");
            }
        }
        UIField.prototype.focus = function () {
            var el = this.element.querySelector("input, textarea");
            if (el !== null) {
                el.focus();
            }
        };
        Object.defineProperty(UIField.prototype, "classes", {
            get: function () {
                var classes = [];
                if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
                    classes.push("ui-field--plain");
                }
                if (this.required === "" || this.required === "required" || isTrue(this.required)) {
                    classes.push("ui-field--required");
                }
                return classes.join(" ");
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIField.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIField.prototype, "plain", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIField.prototype, "required", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIField.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIField.prototype, "width", void 0);
        __decorate([
            aureliaFramework.computedFrom("plain", "required"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], UIField.prototype, "classes", null);
        UIField = __decorate([
            aureliaFramework.customElement("ui-field"),
            aureliaFramework.inlineView("<template aria-required.bind=\"required\" aria-disabled.bind=\"disabled\" class=\"ui-field ${classes}\" css.bind=\"{width}\">\n<label class=\"ui-field__label\" role=\"text\" click.trigger=\"focus()\">${label}</label>\n<slot></slot>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], UIField);
        return UIField;
    }());

    var UIFieldWrapper = (function () {
        function UIFieldWrapper() {
            this.plain = false;
        }
        Object.defineProperty(UIFieldWrapper.prototype, "classes", {
            get: function () {
                var classes = [];
                if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
                    classes.push("ui-field__wrapper--plain");
                }
                return classes.join(" ");
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIFieldWrapper.prototype, "plain", void 0);
        __decorate([
            aureliaFramework.computedFrom("plain"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], UIFieldWrapper.prototype, "classes", null);
        UIFieldWrapper = __decorate([
            aureliaFramework.customElement("ui-field-wrapper"),
            aureliaFramework.inlineView("<template class=\"ui-field__wrapper ${classes}\">\n  <slot></slot>\n  </template>")
        ], UIFieldWrapper);
        return UIFieldWrapper;
    }());

    var view$a = "<template>\n  <fieldset class=\"ui-fieldset ${class}\" data-open.bind=\"!optional || checked\" ref=\"vmElement\">\n    <legend if.bind=\"label\">\n      <ui-checkbox if.bind=\"optional\" checked.bind=\"checked\">${label}</ui-checkbox>\n      <span if.bind=\"!optional\">${label}</span>\n    </legend>\n    <div class=\"ui-fieldset__body\">\n      <slot></slot>\n    </div>\n  </fieldset>\n</template>\n";

    var UIFieldset = (function () {
        function UIFieldset(element) {
            this.checked = false;
            this.label = "";
            this.class = "";
            this.disabled = false;
            this.fields = [];
            this.optional = false;
            this.optional = element.hasAttribute("optional");
        }
        UIFieldset.prototype.bind = function () {
            this.optional = this.optional || !!this.checked;
        };
        UIFieldset.prototype.attached = function () {
            var _this = this;
            UIInternal.queueTask(function () {
                _this.fields = _this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle");
                _this.disabledChanged();
            });
        };
        UIFieldset.prototype.disabledChanged = function () {
            var _this = this;
            this.fields.forEach(function (el) { return el.au.controller.viewModel.disable(!!_this.disabled); });
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Boolean)
        ], UIFieldset.prototype, "checked", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIFieldset.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIFieldset.prototype, "class", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIFieldset.prototype, "disabled", void 0);
        UIFieldset = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-fieldset"),
            aureliaFramework.inlineView(view$a),
            __metadata("design:paramtypes", [Element])
        ], UIFieldset);
        return UIFieldset;
    }());

    var BaseInput = (function () {
        function BaseInput(element) {
            this.element = element;
            this.maxlength = 0;
            this.allowClear = false;
            this.showCounter = false;
            this.readonly = false;
            this.disabled = false;
            this.isDisabled = false;
            this.allowClear = element.hasAttribute("clear") || element.hasAttribute("clear.trigger");
            this.showCounter = element.hasAttribute("counter");
        }
        BaseInput.prototype.focus = function () {
            this.inputEl.focus();
        };
        BaseInput.prototype.disable = function (b) {
            this.isDisabled = b;
        };
        Object.defineProperty(BaseInput.prototype, "classes", {
            get: function () {
                var classes = [];
                if (this.errors && this.errors.length > 0) {
                    classes.push("ui-input--invalid");
                }
                if (this.isTrue("readonly")) {
                    classes.push("ui-input--readonly");
                }
                if (this.isTrue("disabled") || this.isDisabled) {
                    classes.push("ui-input--disabled");
                }
                return classes.join(" ");
            },
            enumerable: true,
            configurable: true
        });
        BaseInput.prototype.bind = function () {
            this.readonly = this.isTrue("readonly");
            this.disabled = this.isTrue("disabled");
        };
        BaseInput.prototype.clear = function () {
            this.value = "";
            this.inputEl.focus();
            this.element.dispatchEvent(UIInternal.createEvent("clear"));
            this.element.dispatchEvent(UIInternal.createEvent("change"));
        };
        BaseInput.prototype.fireEnter = function ($event) {
            if ($event.keyCode === 13) {
                $event.stopEvent();
                this.element.dispatchEvent(UIInternal.createEvent("enterpressed", this.value));
            }
            return true;
        };
        BaseInput.prototype.canToggleDrop = function (evt) {
            if (evt.relatedTarget && evt.relatedTarget !== this.inputEl) {
                this.toggleDrop(false);
            }
        };
        BaseInput.prototype.toggleDrop = function (open) {
            var _this = this;
            if (open === true && this.dropEl.isOpen) {
                UIInternal.queueMicroTask(function () { return _this.dropEl.updatePosition(); });
                return;
            }
            var beforeEvent = this.dropEl.isOpen && !open ? "beforeclose" : "beforeopen";
            var afterEvent = this.dropEl.isOpen && !open ? "close" : "open";
            if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
                this.dropEl.toggleDrop(open);
                this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
                if (this.dropEl.isOpen) {
                    this.inputEl.select();
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        BaseInput.prototype.isTrue = function (prop) {
            return this[prop] === "" || this[prop] === prop || isTrue(this[prop]);
        };
        __decorate([
            aureliaFramework.computedFrom("isDisabled", "disabled", "readonly", "errors", "errors.length"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], BaseInput.prototype, "classes", null);
        return BaseInput;
    }());

    var view$b = "<template>\n  <div class=\"ui-input__error\" if.bind=\"errors && errors.length\">\n    <ui-svg-icon icon=\"alert\"></ui-svg-icon>\n    <ul>\n      <li repeat.for=\"err of errors\">${err.message || err}</li>\n    </ul>\n  </div>\n  <div class=\"ui-input__counter\" if.bind=\"showCounter && (value.length > 0 || maxlength > 0)\">\n    ${counter}\n  </div>\n  <div class=\"ui-input__clear\" if.bind=\"allowClear && value.length > 0\" click.trigger=\"clear()\">\n    <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n  </div>\n  <div class=\"ui-input__drop-handle\" if.bind=\"dropHandle\" click.trigger=\"toggleDrop()\">\n    <ui-svg-icon icon.bind=\"dropHandle\"></ui-svg-icon>\n  </div>\n  <slot></slot>\n</template>\n";

    var InputWrapper = (function () {
        function InputWrapper() {
        }
        InputWrapper = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.inlineView(view$b),
            aureliaFramework.processContent(function (compiler, resources, node, instruction) {
                instruction.inheritBindingContext = true;
                return true;
            })
        ], InputWrapper);
        return InputWrapper;
    }());

    var view$c = "<template class=\"ui-input ui-input-file ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <div ref=\"dropZone\" if.bind=\"maxFiles>1\" class=\"ui-input-file__dropzone ${dragging?'dragging':''}\" click.trigger=\"inputEl.click()\" dragover.trigger=\"dragEnter($event)\" dragleave.trigger=\"dragExit($event)\" drop.trigger=\"drop($event)\">\n      <ui-svg-icon icon=\"upload\"></ui-svg-icon>\n      <span>Drop files here<br>or click to browse</span>\n    </div>\n    <input type=\"file\" ref=\"inputEl\" role=\"file\" size=\"1\" change.trigger=\"fileChoose($event)\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n  <div class=\"ui-input-file__list\" if.bind=\"maxFiles>1\">\n    <div repeat.for=\"file of files\">\n      <a click.trigger=\"remove($index)\"><ui-svg-icon icon=\"cross\" ui-color=\"red\"></ui-svg-icon></a>\n      <label>${file.name}</label>\n      <span ui-color=\"muted\">(<small innerhtml.bind=\"file.size | number:'0.00b'\"></small>)</span>\n    </div>\n  </div>\n</template>\n";

    var UIFileInput = (function (_super) {
        __extends(UIFileInput, _super);
        function UIFileInput(element) {
            var _this = _super.call(this, element) || this;
            _this.value = "";
            _this.placeholder = "";
            _this.maxFiles = 1;
            _this.readonly = false;
            _this.disabled = false;
            _this.files = [];
            _this.dragging = false;
            return _this;
        }
        UIFileInput.prototype.attached = function () {
            this.files = [];
            this.inputEl.value = "";
            this.inputEl.draggedFiles = this.files;
        };
        UIFileInput.prototype.dragEnter = function ($event) {
            this.dragging = true;
            $event.preventDefault();
            return false;
        };
        UIFileInput.prototype.dragExit = function ($event) {
            this.dragging = false;
        };
        UIFileInput.prototype.drop = function ($event) {
            this.dragging = false;
            $event.preventDefault();
            this.mutateFiles($event.dataTransfer.files);
            return false;
        };
        UIFileInput.prototype.fileChoose = function (evt) {
            evt.stopPropagation();
            this.mutateFiles(this.inputEl.files);
        };
        UIFileInput.prototype.remove = function (index) {
            this.files.splice(index, 1);
            this.element.dispatchEvent(UIInternal.createEvent("change", this.files.length));
        };
        UIFileInput.prototype.mutateFiles = function (files) {
            var e_1, _a;
            try {
                for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    var f = {
                        file: file,
                        name: file.name,
                        size: file.size || 0,
                        ext: file.type
                    };
                    if (this.files.length === this.maxFiles) {
                        this.files.splice(0, 1);
                    }
                    this.files.push(f);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.element.dispatchEvent(UIInternal.createEvent("change", this.files.length));
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", String)
        ], UIFileInput.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIFileInput.prototype, "placeholder", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIFileInput.prototype, "errors", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UIFileInput.prototype, "maxFiles", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIFileInput.prototype, "readonly", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIFileInput.prototype, "disabled", void 0);
        UIFileInput = __decorate([
            aureliaFramework.customElement("ui-file"),
            aureliaFramework.viewResources(InputWrapper),
            aureliaFramework.inlineView(view$c),
            __metadata("design:paramtypes", [Element])
        ], UIFileInput);
        return UIFileInput;
    }(BaseInput));

    var UIForm = (function () {
        function UIForm(element) {
            this.element = element;
            this.disabled = false;
        }
        UIForm.prototype.attached = function () {
            var _this = this;
            UIInternal.queueTask(function () {
                var el = _this.vmElement.querySelector("[autofocus] input, [autofocus] textarea");
                if (el !== null) {
                    el.focus();
                }
                _this.disabledChanged();
            });
        };
        UIForm.prototype.disabledChanged = function () {
            var _this = this;
            if (this.vmElement) {
                var fields = this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle,ui-select,ui-list,ui-date-input");
                fields.forEach(function (el) { return el.au.controller.viewModel.disable(!!_this.disabled); });
            }
        };
        UIForm.prototype.fireSubmit = function () {
            this.element.dispatchEvent(UIInternal.createEvent("submit"));
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIForm.prototype, "disabled", void 0);
        UIForm = __decorate([
            aureliaFramework.customElement("ui-form"),
            aureliaFramework.inlineView("<template class=\"ui-block\"><form ref=\"vmElement\" role=\"form\" aria-disabled.bind=\"disabled\" class=\"ui-form\"\n   enterpressed.delegate=\"fireSubmit($event)\" validation-renderer=\"ui-validator\"><slot></slot></form></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIForm);
        return UIForm;
    }());

    var view$d = "<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\" type.bind=\"type\" autocomplete.bind=\"autocomplete\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n</template>\n";

    var UIInput = (function (_super) {
        __extends(UIInput, _super);
        function UIInput(element) {
            var _this = _super.call(this, element) || this;
            _this.value = "";
            _this.number = null;
            _this.type = "text";
            _this.placeholder = "";
            _this.autocomplete = "";
            _this.maxlength = 0;
            _this.readonly = false;
            _this.disabled = false;
            _this.ignoreChange = false;
            if (element.hasAttribute("number") || element.hasAttribute("number.bind")) {
                _this.type = "number";
            }
            return _this;
        }
        UIInput.prototype.attached = function () {
            this.maxlengthChanged();
        };
        UIInput.prototype.valueChanged = function () {
            var _this = this;
            if (!this.ignoreChange && this.type === "number") {
                this.ignoreChange = true;
                this.number = isNaN(this.value) ? null : parseFloat(this.value);
                UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
            }
        };
        UIInput.prototype.numberChanged = function () {
            var _this = this;
            if (!this.ignoreChange && this.type === "number") {
                this.ignoreChange = true;
                this.value = this.number.toString();
                UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
            }
        };
        Object.defineProperty(UIInput.prototype, "counter", {
            get: function () {
                if (this.maxlength) {
                    return "" + (this.maxlength - (this.value ? this.value.length : 0));
                }
                else {
                    return "" + (this.value ? this.value.length : 0);
                }
            },
            enumerable: true,
            configurable: true
        });
        UIInput.prototype.maxlengthChanged = function () {
            if (this.inputEl) {
                this.inputEl.removeAttribute("maxLength");
                if (this.maxlength > 0) {
                    this.inputEl.maxLength = this.maxlength;
                }
            }
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", String)
        ], UIInput.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Number)
        ], UIInput.prototype, "number", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIInput.prototype, "type", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIInput.prototype, "placeholder", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIInput.prototype, "autocomplete", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UIInput.prototype, "maxlength", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "errors", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "readonly", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.computedFrom("value", "maxlength"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIInput.prototype, "counter", null);
        UIInput = __decorate([
            aureliaFramework.customElement("ui-input"),
            aureliaFramework.viewResources(InputWrapper),
            aureliaFramework.inlineView(view$d),
            __metadata("design:paramtypes", [Element])
        ], UIInput);
        return UIInput;
    }(BaseInput));

    var UIInputAddon = (function () {
        function UIInputAddon(element) {
            this.element = element;
            this.width = "auto";
            this.icon = "";
            if (element.hasAttribute("align-end")) {
                element.classList.add("ui-input__addon--end");
            }
        }
        UIInputAddon_1 = UIInputAddon;
        UIInputAddon.prototype.focusInput = function () {
            try {
                var el = this.element;
                if (getViewModel(el.nextElementSibling) instanceof UIInputAddon_1) {
                    el = el.nextElementSibling;
                }
                var vm = getViewModel(el.nextElementSibling);
                if (vm instanceof BaseInput) {
                    vm.focus();
                }
                else if (el.nextElementSibling instanceof HTMLInputElement) {
                    el.nextElementSibling.focus();
                }
            }
            catch (e) {
            }
        };
        var UIInputAddon_1;
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIInputAddon.prototype, "width", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIInputAddon.prototype, "icon", void 0);
        UIInputAddon = UIInputAddon_1 = __decorate([
            aureliaFramework.customElement("ui-input-addon"),
            aureliaFramework.inlineView("<template class=\"ui-input__addon\" click.trigger=\"focusInput() & debounce:10\" css.bind=\"{width}\"><slot><ui-icon icon.bind=\"icon\"></ui-icon></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIInputAddon);
        return UIInputAddon;
    }());

    var UIInputInfo = (function () {
        function UIInputInfo(element) {
            this.element = element;
        }
        UIInputInfo = __decorate([
            aureliaFramework.customElement("ui-input-info"),
            aureliaFramework.inlineView("<template class=\"ui-input__info\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIInputInfo);
        return UIInputInfo;
    }());

    var view$e = "<template class=\"ui-option\" data-disabled.bind=\"isDisabled || disabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"radio\" name.bind=\"name\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <ui-svg-icon icon=\"radio-off\"></ui-svg-icon>\n    <ui-svg-icon icon=\"radio-on\"></ui-svg-icon>\n    <span>\n      <slot></slot>\n    </span>\n  </label>\n</template>\n";

    var UIRadio = (function () {
        function UIRadio(element) {
            this.element = element;
            this.name = "optGroup";
            this.disabled = false;
            this.isDisabled = false;
        }
        UIRadio.prototype.disable = function (b) {
            this.isDisabled = b;
        };
        UIRadio.prototype.checkChanged = function ($event) {
            $event.stopPropagation();
            this.element.dispatchEvent(UIInternal.createEvent("change", this));
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "checked", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "model", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneTime }),
            __metadata("design:type", String)
        ], UIRadio.prototype, "name", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UIRadio.prototype, "matcher", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIRadio.prototype, "disabled", void 0);
        UIRadio = __decorate([
            aureliaFramework.customElement("ui-radio"),
            aureliaFramework.inlineView(view$e),
            __metadata("design:paramtypes", [Element])
        ], UIRadio);
        return UIRadio;
    }());

    var UIOptionGroup = (function () {
        function UIOptionGroup() {
            this.value = false;
            this.name = "optGroup";
            this.disabled = false;
            this.options = [];
        }
        UIOptionGroup.prototype.optionsChanged = function () {
            var _this = this;
            if (this.options !== null) {
                this.options.forEach(function (element) {
                    if (element instanceof UIRadio) {
                        element.name = _this.name;
                    }
                    element.matcher = _this.matcher;
                });
                this.valueChanged();
            }
        };
        UIOptionGroup.prototype.checkChanged = function ($event) {
            var _this = this;
            if (this.value !== false) {
                UIInternal.queueTask(function () {
                    _this.value = $event.detail.checked;
                });
            }
        };
        UIOptionGroup.prototype.disabledChanged = function () {
            var _this = this;
            this.options.forEach(function (el) { return el.disable(!!_this.disabled); });
        };
        UIOptionGroup.prototype.valueChanged = function () {
            var _this = this;
            if (this.options && this.value !== false) {
                UIInternal.queueTask(function () {
                    _this.options.forEach(function (element) { return (element.checked = _this.value); });
                });
            }
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIOptionGroup.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIOptionGroup.prototype, "name", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UIOptionGroup.prototype, "matcher", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIOptionGroup.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.children("ui-radio, ui-checkbox, ui-toggle"),
            __metadata("design:type", Array)
        ], UIOptionGroup.prototype, "options", void 0);
        UIOptionGroup = __decorate([
            aureliaFramework.customElement("ui-option-group"),
            aureliaFramework.inlineView("<template class=\"ui-option__group ${disabled ? 'ui-option--disabled' : ''}\" change.trigger=\"checkChanged($event)\"><slot></slot></template>")
        ], UIOptionGroup);
        return UIOptionGroup;
    }());

    var UIPasswordMeter = (function () {
        function UIPasswordMeter() {
            this.score = 0;
            this.hasPassword = false;
            this.tooltip = "";
            this.maxStrength = 4;
        }
        Object.defineProperty(UIPasswordMeter.prototype, "strength", {
            get: function () {
                if (this.hasPassword) {
                    var s = (this.score / this.maxStrength) * 100;
                    return { "--password-strength": (s || 5) + "%" };
                }
                return { "--password-strength": 0 };
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UIPasswordMeter.prototype, "score", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIPasswordMeter.prototype, "hasPassword", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPasswordMeter.prototype, "tooltip", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UIPasswordMeter.prototype, "maxStrength", void 0);
        __decorate([
            aureliaFramework.computedFrom("score", "maxStrength", "hasPassword"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIPasswordMeter.prototype, "strength", null);
        UIPasswordMeter = __decorate([
            aureliaFramework.customElement("ui-password-meter"),
            aureliaFramework.inlineView("<template class=\"ui-password-meter\" css.bind=\"strength\" ui-tooltip.bind=\"tooltip\"></template>")
        ], UIPasswordMeter);
        return UIPasswordMeter;
    }());

    var view$f = "<template class=\"ui-input ui-phone ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <ui-flag code.bind=\"inputCountry\"></ui-flag>\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"inputValue\" autocomplete.bind=\"autocomplete\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n</template>\n";

    var UIPhone = (function (_super) {
        __extends(UIPhone, _super);
        function UIPhone(element) {
            var _this = _super.call(this, element) || this;
            _this.value = "";
            _this.type = "any";
            _this.country = "";
            _this.readonly = false;
            _this.disabled = false;
            _this.inputValue = "";
            _this.inputCountry = "";
            _this.placeholder = "";
            _this.ignoreChange = false;
            _this.showCounter = false;
            return _this;
        }
        UIPhone.prototype.attached = function () {
            this.countryChanged();
        };
        UIPhone.prototype.valueChanged = function () {
            var _this = this;
            if (!this.ignoreChange) {
                this.ignoreChange = true;
                this.update(this.value);
                UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
            }
        };
        UIPhone.prototype.countryChanged = function () {
            this.inputCountry = this.country;
            var examplePhone = libphonenumberJs.getExampleNumber((this.country || "US"), examples);
            this.placeholder = !!this.country ? examplePhone.formatNational() : examplePhone.formatInternational();
        };
        UIPhone.prototype.inputValueChanged = function () {
            var _this = this;
            if (!this.ignoreChange) {
                this.ignoreChange = true;
                var val = "" + this.inputValue;
                if (!this.country && val !== "" && !val.startsWith("+")) {
                    val = "+" + val;
                }
                this.update(val);
                UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
            }
        };
        UIPhone.prototype.update = function (value) {
            var newInput = new libphonenumberJs.AsYouType(this.country);
            this.inputValue = newInput.input(value);
            this.inputCountry = this.country || newInput.country;
            if (newInput.getNumber()) {
                this.value = newInput.getNumber().number.toString();
            }
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", String)
        ], UIPhone.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPhone.prototype, "type", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPhone.prototype, "country", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "errors", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "readonly", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.observable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "inputValue", void 0);
        UIPhone = __decorate([
            aureliaFramework.customElement("ui-phone"),
            aureliaFramework.viewResources(InputWrapper),
            aureliaFramework.inlineView(view$f),
            __metadata("design:paramtypes", [Element])
        ], UIPhone);
        return UIPhone;
    }(BaseInput));

    var UISlider = (function () {
        function UISlider() {
            this.value = 0;
            this.min = 0;
            this.max = 100;
            this.step = 1;
            this.disabled = false;
        }
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Number)
        ], UISlider.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UISlider.prototype, "min", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UISlider.prototype, "max", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UISlider.prototype, "step", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UISlider.prototype, "disabled", void 0);
        UISlider = __decorate([
            aureliaFramework.customElement("ui-slider"),
            aureliaFramework.inlineView("<template class=\"ui-slider\" css.bind=\"{'--slider-pos': (value-min)/(max-min)}\">\n<div class=\"ui-slider__bubble\">${value}</div>\n<span class=\"ui-slider__min\">${min}</span>\n<span class=\"ui-slider__max\">${max}</span>\n<div class=\"ui-slider__bar\">\n  <input type=\"range\" value.bind=\"value\" step.bind=\"step\" min.bind=\"min\" max.bind=\"max\" />\n</div>\n</template>")
        ], UISlider);
        return UISlider;
    }());

    var view$g = "<template class=\"ui-input ui-input--textarea ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <textarea class=\"ui-input__control\" ref=\"inputEl\" role=\"textbox\" rows.bind=\"rows\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\"></textarea>\n  </input-wrapper>\n</template>\n";

    var UITextarea = (function (_super) {
        __extends(UITextarea, _super);
        function UITextarea(element) {
            var _this = _super.call(this, element) || this;
            _this.value = "";
            _this.number = null;
            _this.placeholder = "";
            _this.rows = 4;
            _this.maxlength = 0;
            _this.readonly = false;
            _this.disabled = false;
            return _this;
        }
        Object.defineProperty(UITextarea.prototype, "counter", {
            get: function () {
                if (this.maxlength) {
                    return (this.value ? this.value.length : 0) + " of " + this.maxlength;
                }
                else {
                    return "" + (this.value ? this.value.length : 0);
                }
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", String)
        ], UITextarea.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Number)
        ], UITextarea.prototype, "number", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITextarea.prototype, "placeholder", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UITextarea.prototype, "rows", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Number)
        ], UITextarea.prototype, "maxlength", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "errors", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "readonly", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.computedFrom("value", "maxlength"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UITextarea.prototype, "counter", null);
        UITextarea = __decorate([
            aureliaFramework.customElement("ui-textarea"),
            aureliaFramework.viewResources(InputWrapper),
            aureliaFramework.inlineView(view$g),
            __metadata("design:paramtypes", [Element])
        ], UITextarea);
        return UITextarea;
    }(BaseInput));

    var view$h = "<template class=\"ui-option\" data-disabled.bind=\"disabled || isDisabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"checkbox\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <div class=\"ui-option__toggle\" css.bind=\"{'--toggle-on': labelOn, '--toggle-off': labelOff, width}\"></div>\n    <span><slot></slot></span>\n  </label>\n</template>\n";

    var UIToggle = (function () {
        function UIToggle(element) {
            this.element = element;
            this.disabled = false;
            this.labelOn = "";
            this.labelOff = "";
            this.isDisabled = false;
        }
        UIToggle.prototype.disable = function (b) {
            this.isDisabled = b;
        };
        UIToggle.prototype.bind = function () {
            if (isTrue(this.checked)) {
                this.checked = true;
            }
        };
        UIToggle.prototype.checkChanged = function ($event) {
            $event.stopPropagation();
            this.element.dispatchEvent(UIInternal.createEvent("change", this));
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIToggle.prototype, "checked", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIToggle.prototype, "model", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UIToggle.prototype, "matcher", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIToggle.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIToggle.prototype, "labelOn", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIToggle.prototype, "labelOff", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIToggle.prototype, "width", void 0);
        UIToggle = __decorate([
            aureliaFramework.customElement("ui-toggle"),
            aureliaFramework.inlineView(view$h),
            __metadata("design:paramtypes", [Element])
        ], UIToggle);
        return UIToggle;
    }());

    var Forms = [
        UICheckbox,
        UIField,
        UIFieldWrapper,
        UIFieldset,
        UIForm,
        UIInput,
        UIInputAddon,
        UIInputInfo,
        UIOptionGroup,
        UIPhone,
        UIRadio,
        UITextarea,
        UIToggle,
        UIPasswordMeter,
        UISlider,
        UIFileInput
    ];

    var registerValidators = function (container) {
        container.get(aureliaValidation.ValidationController).validateTrigger = aureliaValidation.validateTrigger.changeOrBlur;
        aureliaValidation.ValidationRules.customRule("url", function (value, obj) {
            return value === null ||
                value === undefined ||
                value === "" ||
                /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.test(value);
        }, "\${$displayName} is not a valid url.");
        aureliaValidation.ValidationRules.customRule("phone", function (value, obj) {
            return value === null || value === undefined || value === "" || libphonenumberJs.parsePhoneNumberFromString(value).isValid();
        }, "\${$displayName} is not a valid phone number.");
        aureliaValidation.ValidationRules.customRule("number", function (value, obj, min, max) {
            return value === null ||
                value === undefined ||
                value === "" ||
                (isNumber(value) &&
                    value >= (isEmpty(min) ? Number.MIN_VALUE : min) &&
                    value <= (isEmpty(max) ? Number.MAX_VALUE : max));
        }, "\${$displayName} must be an number value between \${$config.min} and \${$config.max}.", function (min, max) { return ({ min: min, max: max }); });
        aureliaValidation.ValidationRules.customRule("decimal", function (value, obj, min, max) {
            return value === null ||
                value === undefined ||
                value === "" ||
                (isDecimal(value) &&
                    value >= (isEmpty(min) ? Number.MIN_VALUE : min) &&
                    value <= (isEmpty(max) ? Number.MAX_VALUE : max));
        }, "\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.", function (min, max) { return ({ min: min, max: max }); });
    };
    var UIValidationRenderer = (function () {
        function UIValidationRenderer() {
        }
        UIValidationRenderer.prototype.render = function (instruction) {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
            try {
                for (var _e = __values(instruction.unrender), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var _g = _f.value, result = _g.result, elements = _g.elements;
                    try {
                        for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                            var element = elements_1_1.value;
                            this.remove(element, result);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (elements_1_1 && !elements_1_1.done && (_b = elements_1.return)) _b.call(elements_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var _h = __values(instruction.render), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var _k = _j.value, result = _k.result, elements = _k.elements;
                    try {
                        for (var elements_2 = __values(elements), elements_2_1 = elements_2.next(); !elements_2_1.done; elements_2_1 = elements_2.next()) {
                            var element = elements_2_1.value;
                            this.add(element, result);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (elements_2_1 && !elements_2_1.done && (_d = elements_2.return)) _d.call(elements_2);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        UIValidationRenderer.prototype.add = function (element, result) {
            if (result.valid) {
                return;
            }
            try {
                var vm = element.au.controller.viewModel;
                if (!vm.errors) {
                    vm.errors = [];
                }
                if (vm.errors.indexOf(result) >= 0) {
                    return;
                }
                vm.errors.push(result);
            }
            catch (E) {
            }
        };
        UIValidationRenderer.prototype.remove = function (element, result) {
            if (result.valid) {
                return;
            }
            try {
                var vm = element.au.controller.viewModel;
                var i = vm.errors.length;
                while (i--) {
                    var message = vm.errors[i];
                    if (message.id === result.id) {
                        vm.errors.splice(i, 1);
                        break;
                    }
                }
                if (vm.errors.length === 0) {
                    vm.errors = [];
                }
            }
            catch (E) {
            }
        };
        return UIValidationRenderer;
    }());

    var GridderUtils;
    (function (GridderUtils) {
        GridderUtils.minHeight = 100;
        var dropEl;
        var startX;
        var startY;
        var colSpan;
        var rowSpan;
        function startMove($event) {
            GridderUtils.dragEl = getParentByTag($event.target, "ui-gridder-cell");
            GridderUtils.dragEl.setAttribute("draggable", "true");
            if ($event.dataTransfer) {
                $event.dataTransfer.setData("text/plain", "drag");
            }
            GridderUtils.dragEl.style.zIndex = "2";
            GridderUtils.dragEl.style.opacity = "0.5";
            updateGhost(GridderUtils.dragEl);
            GridderUtils.dragEl.originalIndex = GridderUtils.cells.indexOf(getViewModel(GridderUtils.dragEl));
            return true;
        }
        GridderUtils.startMove = startMove;
        function move($event) {
            var current = getParentByTag($event.target, "ui-gridder-cell");
            current.setAttribute("draggable", "false");
            if (isTrue(current.dataset.allowDrop)) {
                $event.preventDefault();
                dropEl = current;
                updateGhost(dropEl);
            }
        }
        GridderUtils.move = move;
        function finishMove($event) {
            if (dropEl) {
                $event.preventDefault();
                if (dropEl !== GridderUtils.dragEl) {
                    var newIndex = GridderUtils.cells.indexOf(getViewModel(dropEl));
                    newIndex === GridderUtils.cells.length - 1
                        ? GridderUtils.dragEl.parentElement.appendChild(GridderUtils.dragEl)
                        : GridderUtils.dragEl.parentElement.insertBefore(GridderUtils.dragEl, newIndex > GridderUtils.dragEl.originalIndex ? dropEl.nextElementSibling : dropEl);
                }
            }
            GridderUtils.dragEl.style.zIndex = "unset";
            GridderUtils.dragEl.style.opacity = "1";
            GridderUtils.dragEl = null;
            dropEl = null;
        }
        GridderUtils.finishMove = finishMove;
        function startResize($event) {
            GridderUtils.dragEl = $event.target.parentElement;
            updateGhost(GridderUtils.dragEl);
            startX = $event.clientX || $event.x;
            startY = $event.clientY || $event.y;
            colSpan = parseInt(GridderUtils.dragEl.style.gridColumnEnd.replace("span ", ""), 10) || 1;
            rowSpan = parseInt(GridderUtils.dragEl.style.gridRowEnd.replace("span ", ""), 10) || 1;
            document.addEventListener("mousemove", resize);
            document.addEventListener("mouseup", stopResize);
        }
        GridderUtils.startResize = startResize;
        var resize = function ($event) {
            var x = $event.clientX || $event.x;
            var y = $event.clientY || $event.y;
            GridderUtils.ghost.style.width = GridderUtils.ghost.startWidth + (x - startX) + "px";
            GridderUtils.ghost.style.height = GridderUtils.ghost.startHeight + (y - startY) + "px";
            if (Math.round((x - startX) / GridderUtils.minWidth) > 0) {
                GridderUtils.dragEl.style.gridColumnEnd = "span " + (colSpan + Math.round((x - startX) / GridderUtils.minWidth));
            }
            else if (Math.round((startX - x) / GridderUtils.minWidth) > 0) {
                GridderUtils.dragEl.style.gridColumnEnd = "span " + (colSpan - Math.round((startX - x) / GridderUtils.minWidth));
            }
            else {
                GridderUtils.dragEl.style.gridColumnEnd = "span " + colSpan;
            }
            if (Math.round((y - startY) / GridderUtils.minHeight) > 0) {
                GridderUtils.dragEl.style.gridRowEnd = "span " + (rowSpan + Math.round((y - startY) / GridderUtils.minHeight));
            }
            else if (Math.round((startY - y) / GridderUtils.minHeight) > 0) {
                GridderUtils.dragEl.style.gridRowEnd = "span " + (rowSpan - Math.round((startY - y) / GridderUtils.minHeight));
            }
            else {
                GridderUtils.dragEl.style.gridRowEnd = "span " + rowSpan;
            }
            GridderUtils.ghost.style.top = GridderUtils.dragEl.offsetTop + "px";
            GridderUtils.ghost.style.left = GridderUtils.dragEl.offsetLeft + "px";
        };
        var stopResize = function ($event) {
            GridderUtils.dragEl = null;
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResize);
        };
        function updateGhost(el) {
            UIInternal.queueTask(function () {
                GridderUtils.ghost.startWidth = el.offsetWidth;
                GridderUtils.ghost.startHeight = el.offsetHeight;
                GridderUtils.ghost.style.top = el.offsetTop + "px";
                GridderUtils.ghost.style.left = el.offsetLeft + "px";
                GridderUtils.ghost.style.width = el.offsetWidth + "px";
                GridderUtils.ghost.style.height = el.offsetHeight + "px";
            });
        }
    })(GridderUtils || (GridderUtils = {}));

    var view$i = "<template class=\"ui-gridder\">\n  <div class=\"ui-gridder__container\" dragstart.trigger=\"startDrag($event)\" dragend.trigger=\"stopDrag($event)\">\n    <slot></slot>\n\n    <div class=\"ui-gridder__ghost\" ref=\"ghost\" show.bind=\"!!utils.dragEl\"></div>\n\n    <div class=\"ui-gridder__overlay\" if.bind=\"!!utils.dragEl\">\n      <template repeat.for=\"row of utils.rowCount\">\n        <template repeat.for=\"col of utils.colCount\">\n          <div class=\"ui-gridder__cell\" data-row.bind=\"row\" data-col.bind=\"col\"></div> </template></template>\n    </div>\n  </div>\n</template>\n";

    var UIGridder = (function () {
        function UIGridder(element) {
            this.element = element;
            this.utils = GridderUtils;
        }
        UIGridder.prototype.created = function (owningView) {
            this.owningView = owningView;
        };
        UIGridder.prototype.attached = function () {
            GridderUtils.colCount = 12;
            GridderUtils.minWidth = Math.floor(this.element.offsetWidth / GridderUtils.colCount);
            GridderUtils.ghost = this.ghost;
        };
        UIGridder.prototype.cellsChanged = function () {
            var _this = this;
            UIInternal.queueTask(function () {
                GridderUtils.cells = _this.cells;
                GridderUtils.rowCount = Math.floor(_this.element.firstElementChild.offsetHeight / GridderUtils.minHeight);
            });
        };
        UIGridder.prototype.startDrag = function ($event) {
            GridderUtils.startMove($event);
            return true;
        };
        UIGridder.prototype.stopDrag = function ($event) {
            GridderUtils.finishMove($event);
            return true;
        };
        __decorate([
            aureliaFramework.children("ui-gridder-cell"),
            __metadata("design:type", Object)
        ], UIGridder.prototype, "cells", void 0);
        UIGridder = __decorate([
            aureliaFramework.customElement("ui-gridder"),
            aureliaFramework.inlineView(view$i),
            __metadata("design:paramtypes", [Element])
        ], UIGridder);
        return UIGridder;
    }());

    var BasePanel = (function () {
        function BasePanel() {
            this.pinned = false;
            this.expanded = false;
            this.collapsed = false;
            this.closeable = false;
            this.expandable = false;
            this.collapsible = false;
        }
        BasePanel.prototype.close = function () {
            var _this = this;
            return UIInternal.fireCallbackEvent(this, "beforeclose").then(function (b) { return (b ? _this.remove() : false); });
        };
        BasePanel.prototype.bind = function () {
            this.closeable = !isFalse(this.closeable);
            this.expandable = !isFalse(this.expandable);
            this.collapsible = !isFalse(this.collapsible);
        };
        BasePanel.prototype.toggleExpand = function (expand) {
            this.expanded = expand;
            this.element.dispatchEvent(UIInternal.createEvent("expand", this.expanded));
        };
        BasePanel.prototype.toggleCollapse = function (collapse) {
            this.collapsed = collapse;
        };
        BasePanel.prototype.remove = function () {
            var _this = this;
            this.element.dispatchEvent(UIInternal.createEvent("close"));
            UIInternal.queueTask(function () { return aureliaFramework.DOM.removeNode(_this.element); });
            return true;
        };
        return BasePanel;
    }());

    var view$j = "<template class=\"ui-gridder__cell\" data-allow-drop.bind=\"!pinned\" dragenter.trigger=\"utils.move($event)\">\n  <div ref=\"vmElement\" class=\"ui-panel-base ui-panel\" data-expanded.bind=\"expanded\">\n    <div class=\"ui-panel__header\" data-autohide.bind=\"autoHideHeader\">\n      <ui-drag-handle if.bind=\"moveable && !pinned\"></ui-drag-handle>\n      <ui-header>\n        <slot name=\"header-icon\">\n          <ui-header-icon if.bind=\"icon\" icon.bind=\"icon\"></ui-header-icon>\n        </slot>\n        <ui-header-title if.bind=\"label\">${label}</ui-header-title>\n\n        <slot name=\"header-actions\"></slot>\n      </ui-header>\n      <div class=\"ui-panel__header__actions\" if.bind=\"closeable || expandable || pinnable\">\n        <ui-divider></ui-divider>\n        <template if.bind=\"pinnable\">\n          <ui-button type=\"tool\" click.trigger=\"togglePinned(!pinned)\" active.bind=\"pinned\">\n            <ui-svg-icon icon.bind=\"pinned?'pinned':'unpinned'\"></ui-svg-icon>\n          </ui-button>\n        </template>\n        <template if.bind=\"expandable\">\n          <ui-button type=\"tool\" click.trigger=\"toggleExpand(!expanded)\">\n            <ui-svg-icon icon.bind=\"expanded?'collapse':'expand'\"></ui-svg-icon>\n          </ui-button>\n        </template>\n        <template if.bind=\"closeable\">\n          <ui-button type=\"tool\" click.trigger=\"close()\">\n            <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n          </ui-button>\n        </template>\n      </div>\n    </div>\n    <div class=\"ui-panel__body\">\n      <slot></slot>\n    </div>\n    <slot name=\"panel-footer\"></slot>\n  </div>\n\n  <div if.bind=\"resizeable\" class=\"ui-gridder__resize\" mousedown.trigger=\"utils.startResize($event)\"></div>\n</template>\n";

    var UIGridderCell = (function (_super) {
        __extends(UIGridderCell, _super);
        function UIGridderCell(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.label = "";
            _this.icon = "";
            _this.pinned = false;
            _this.expanded = false;
            _this.closeable = false;
            _this.expandable = false;
            _this.moveable = false;
            _this.pinnable = false;
            _this.resizeable = false;
            _this.autoHideHeader = false;
            _this.utils = GridderUtils;
            return _this;
        }
        UIGridderCell.prototype.bind = function () {
            _super.prototype.bind.call(this);
            this.moveable = !isFalse(this.moveable);
            this.pinnable = !isFalse(this.pinnable);
            this.resizeable = !isFalse(this.resizeable);
            this.autoHideHeader = !isFalse(this.autoHideHeader);
        };
        UIGridderCell.prototype.attached = function () {
            this.element.style.gridArea = "\n    " + (this.config.row || "auto") + " / \n    " + (this.config.col || "auto") + " / \n    span " + this.config.rowSpan + " / \n    span " + this.config.colSpan;
        };
        UIGridderCell.prototype.togglePinned = function (pinned) {
            this.pinned = pinned;
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIGridderCell.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIGridderCell.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIGridderCell.prototype, "config", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Boolean)
        ], UIGridderCell.prototype, "pinned", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Boolean)
        ], UIGridderCell.prototype, "expanded", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIGridderCell.prototype, "closeable", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIGridderCell.prototype, "expandable", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIGridderCell.prototype, "moveable", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIGridderCell.prototype, "pinnable", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIGridderCell.prototype, "resizeable", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIGridderCell.prototype, "autoHideHeader", void 0);
        UIGridderCell = __decorate([
            aureliaFramework.customElement("ui-gridder-cell"),
            aureliaFramework.inlineView(view$j),
            __metadata("design:paramtypes", [Element])
        ], UIGridderCell);
        return UIGridderCell;
    }(BasePanel));

    var Gridder = [UIGridder, UIGridderCell];

    var UIFlag = (function () {
        function UIFlag(element) {
            this.element = element;
            this.code = "";
            this.size = "nm";
            if (element.hasAttribute("round")) {
                element.classList.add("ui-icon--round");
            }
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIFlag.prototype, "code", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIFlag.prototype, "size", void 0);
        UIFlag = __decorate([
            aureliaFramework.customElement("ui-flag"),
            aureliaFramework.inlineView("<template ui-font.bind=\"size\" class=\"ui-flag ${code}\"></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIFlag);
        return UIFlag;
    }());

    var UIIcon = (function () {
        function UIIcon(element) {
            this.element = element;
            this.icon = "";
            this.size = "nm";
            if (element.hasAttribute("round")) {
                element.classList.add("ui-icon--round");
            }
            if (element.hasAttribute("flip-on-rtl")) {
                element.classList.add("flip-on-rtl");
            }
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIIcon.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIIcon.prototype, "size", void 0);
        UIIcon = __decorate([
            aureliaFramework.customElement("ui-icon"),
            aureliaFramework.inlineView("<template ui-font.bind=\"size\" class=\"ui-icon ${icon}\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIIcon);
        return UIIcon;
    }());

    var none = " ";
    var unknown = "M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z";
    var loader = "M8.111,1.747C9.299,1.254,10.62,1,12,1c6.075,0,11,4.925,11,11s-4.925,11-11,11S1,18.075,1,12c0-1.38,0.254-2.701,0.718-3.918c0.526,0.526,1.11,0.882,1.732,1.098C3.158,10.067,3,11.015,3,12c0,4.971,4.029,9,9,9s9-4.029,9-9s-4.029-9-9-9c-0.985,0-1.933,0.158-2.82,0.451C8.964,2.828,8.608,2.244,8.111,1.747z M4.929,2.929c1.105,0,2,0.896,2,2c0,1.105-0.895,2-2,2c-1.104,0-2-0.895-2-2C2.929,3.824,3.824,2.929,4.929,2.929z";
    var busy = "M16,13V11H21V13H16M14.83,7.76L17.66,4.93L19.07,6.34L16.24,9.17L14.83,7.76M11,16H13V21H11V16M11,3H13V8H11V3M4.93,17.66L7.76,14.83L9.17,16.24L6.34,19.07L4.93,17.66M4.93,6.34L6.34,4.93L9.17,7.76L7.76,9.17L4.93,6.34M8,13H3V11H8V13M19.07,17.66L17.66,19.07L14.83,16.24L16.24,14.83L19.07,17.66Z";
    var alert = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";
    var cross = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
    var caret = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
    var minus = "M19,13H5V11H19V13Z";
    var plus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
    var menu = "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
    var help = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z";
    var expand = "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z";
    var collapse = "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z";
    var drag = "M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z";
    var resizer = "M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z";
    var calendar = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z";
    var clock = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";
    var ellipsis = "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";
    var overflow = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
    var file = "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z";
    var upload = "M14,13V17H10V13H7L12,8L17,13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z";
    var pinned = "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z";
    var unpinned = "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z";
    var Icons = {
    	none: none,
    	"check-off": "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
    	"check-on": "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
    	"radio-off": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
    	"radio-on": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z",
    	"radio-check": "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z",
    	unknown: unknown,
    	loader: loader,
    	busy: busy,
    	alert: alert,
    	cross: cross,
    	caret: caret,
    	minus: minus,
    	plus: plus,
    	menu: menu,
    	help: help,
    	expand: expand,
    	collapse: collapse,
    	drag: drag,
    	resizer: resizer,
    	calendar: calendar,
    	clock: clock,
    	ellipsis: ellipsis,
    	overflow: overflow,
    	"folder-closed": "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z",
    	"folder-open": "M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z",
    	"folder-empty": "M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z",
    	file: file,
    	upload: upload,
    	pinned: pinned,
    	unpinned: unpinned,
    	"collapse-start": "M11.92,19.92L4,12L11.92,4.08L13.33,5.5L7.83,11H22V13H7.83L13.34,18.5L11.92,19.92M4,12V2H2V22H4V12Z",
    	"collapse-end": "M12.08,4.08L20,12L12.08,19.92L10.67,18.5L16.17,13H2V11H16.17L10.67,5.5L12.08,4.08M20,12V22H22V2H20V12Z",
    	"expand-start": "M4,2H2V22H4V13H18.17L12.67,18.5L14.08,19.92L22,12L14.08,4.08L12.67,5.5L18.17,11H4V2Z",
    	"expand-end": "M20,22H22V2H20V11H5.83L11.33,5.5L9.92,4.08L2,12L9.92,19.92L11.33,18.5L5.83,13H20V22Z",
    	"page-first": "M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z",
    	"page-last": "M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z",
    	"page-previous": "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
    	"page-next": "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
    	"tree-expand": "M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z",
    	"tree-collapse": "M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M17,11V13H7V11H17Z",
    	"tree-closed": "M10,17L15,12L10,7V17Z",
    	"tree-open": "M7,10L12,15L17,10H7Z",
    	"tree-check-on": "M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z",
    	"tree-check-off": "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
    	"tree-check-half": "M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,17H7V7H17V17Z",
    	"dlg-minimize": "M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
    	"dlg-help": "M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z",
    	"dlg-close": "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
    	"dlg-expand": "M12,1.998c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10c5.522,0,10-4.477,10-10C22,6.475,17.521,1.998,12,1.998z M7.757,16.244V9.171l7.071,7.073H7.757z M16.242,14.83l-7.07-7.073h7.07V14.83z",
    	"dlg-collapse": "M12,1.998c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10c5.522,0,10-4.477,10-10C22,6.475,17.521,1.998,12,1.998z M11.646,19.428l-7.07-7.073h7.07V19.428z M12.354,11.645V4.572l7.07,7.072H12.354z"
    };

    var UISvgIcon = (function () {
        function UISvgIcon() {
            this.icon = "";
            this.class = "";
            this.viewBox = "0 0 24 24";
            this.iconPath = "";
        }
        UISvgIcon.prototype.bind = function () {
            this.iconChanged();
        };
        UISvgIcon.prototype.iconChanged = function () {
            this.iconPath = Icons[this.icon];
            if (!this.iconPath) {
                this.iconPath = Icons.unknown;
            }
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISvgIcon.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISvgIcon.prototype, "class", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UISvgIcon.prototype, "viewBox", void 0);
        UISvgIcon = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-svg-icon"),
            aureliaFramework.inlineView("<template><svg ref=\"vmElement\" slot=\"svg-icon\" class=\"ui-icon ui-svg-icon ${class}\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"24\" height=\"24\" viewBox=\"${viewBox}\"><path d.bind=\"iconPath\" /></svg></template>")
        ], UISvgIcon);
        return UISvgIcon;
    }());

    var Icons$1 = [UIIcon, UIFlag, UISvgIcon];

    /**
     * @author    : Adarsh Pastakia
     * @version   : 5.0.0
     * @copyright : 2018
     * @license   : MIT
     */

    Object.defineProperty(Object.prototype, "forEach", {
      writable: true,
      value: function(callback) {
        Object.entries(this).forEach(entry => callback(entry[1], entry[0]));
      }
    });

    Object.defineProperty(Array.prototype, "last", {
      writable: true,
      value: function() {
        return this.length > 0 ? this[this.length - 1] : null;
      }
    });

    /**
     * @param matcher: value or matcher function
     * @param prop: property to use for getting indexOf
     */
    Object.defineProperty(Array.prototype, "index", {
      writable: true,
      value: function(matcher, prop) {
        if (prop) {
          const flatMap = this.map(o => o[prop]);
          return flatMap.indexOf(matcher);
        } else if (isFunction(matcher)) {
          let index = -1;
          for (let i = 0; i < this.length; i--) {
            if (matcher(this[i])) {
              index = i;
              break;
            }
          }
          return index;
        } else {
          return this.indexOf(matcher);
        }
      }
    });

    /**
     * @param matcher: value or matcher function
     * @param prop: property to use for getting lastIndexOf
     */
    Object.defineProperty(Array.prototype, "lastIndex", {
      writable: true,
      value: function(matcher, prop) {
        if (prop) {
          const flatMap = this.map(o => o[prop]);
          return flatMap.lastIndexOf(matcher);
        } else if (isFunction(matcher)) {
          let index = -1;
          for (let i = this.length - 1; i >= 0; i--) {
            if (matcher(this[i])) {
              index = i;
              break;
            }
          }
          return index;
        } else {
          return this.lastIndexOf(matcher);
        }
      }
    });

    Object.defineProperty(Array.prototype, "remove", {
      writable: true,
      value: function(obj) {
        const idx = this.indexOf(obj);
        if (idx !== -1) {
          this.splice(idx, 1);
        }
        return idx !== -1;
      }
    });

    Object.defineProperty(Array.prototype, "groupBy", {
      writable: true,
      value: function(property) {
        if (isEmpty(property)) {
          throw new Error("Missing property to groupBy");
        }
        if (isEmpty(this)) {
          return new Map();
        }
        return this.reduce((a, b) => {
          let key = b;
          for(i of property.split('.')) key = key[i];
          if (!a.has(key)) {
            a.set(key, []);
          }
          a.get(key).push(b);
          return a;
        }, new Map());
      }
    });
    Object.defineProperty(Array.prototype, "sortBy", {
      writable: true,
      value: function(property, isAscending = true) {
        if (isEmpty(this)) {
          return [];
        }
        let sorter = (a, b) => ((a < b && isAscending) || (a > b && !isAscending) ? -1 : 1);
        if (typeof property === "string") {
          sorter = (a, b) =>
            (a[property] || "").toString().localeCompare((b[property] || "").toString()) *
              (isAscending ? 1 : -1) ===
            -1
              ? -1
              : 1;
        } else if (isArray(property)) {
          sorter = (a, b) => {
            for (const p of property) {
              if (a[p] !== undefined && b[p] !== undefined) {
                if (a[p].toString().localeCompare(b[p].toString()) !== 0) {
                  return a[p].toString().localeCompare(b[p].toString()) * (isAscending ? 1 : -1) === -1
                    ? -1
                    : 1;
                }
              }
            }
          };
        }
        return this.sort(sorter);
      }
    });

    const Countries = {
      toIso2: function(c) {
        var ctry = this.find(c);
        return ctry
          ? ctry.iso2
          : null;
      },
      toIso3: function(c) {
        var ctry = this.find(c);
        return ctry
          ? ctry.iso3
          : null;
      },
      find: function(c) {
        return this.list.find(function(ct) {
          return (ct.iso3.toLowerCase() === c.toLowerCase() || ct.iso2.toLowerCase() == c.toLowerCase());
        });
      },
      list: [
        {
          "continent": "Asia",
          "iso2": "AF",
          "iso3": "AFG",
          "name": "Afghanistan",
          "fullname": "The Islamic Republic of Afghanistan",
          "capital": "Kabul",
          "tld": ".af",
          "currency": "AFN",
          "phone": "+93"
        }, {
          "continent": "Europe",
          "iso2": "AL",
          "iso3": "ALB",
          "name": "Albania",
          "fullname": "The Republic of Albania",
          "capital": "Tirana",
          "tld": ".al",
          "currency": "ALL",
          "phone": "+355"
        }, {
          "continent": "Africa",
          "iso2": "DZ",
          "iso3": "DZA",
          "name": "Algeria",
          "fullname": "The People's Democratic Republic of Algeria",
          "capital": "Algiers",
          "tld": ".dz",
          "currency": "DZD",
          "phone": "+213"
        }, {
          "continent": "Oceania",
          "iso2": "AS",
          "iso3": "ASM",
          "name": "American Samoa",
          "fullname": "American Samoa",
          "capital": "Pago Pago",
          "tld": ".as",
          "currency": "USD",
          "phone": "+1684"
        }, {
          "continent": "Europe",
          "iso2": "AD",
          "iso3": "AND",
          "name": "Andorra",
          "fullname": "The Principality of Andorra",
          "capital": "Andorra la Vella",
          "tld": ".ad",
          "currency": "EUR",
          "phone": "+376"
        }, {
          "continent": "Africa",
          "iso2": "AO",
          "iso3": "AGO",
          "name": "Angola",
          "fullname": "The Republic of Angola",
          "capital": "Luanda",
          "tld": ".ao",
          "currency": "AOA",
          "phone": "+244"
        }, {
          "continent": "North America",
          "iso2": "AI",
          "iso3": "AIA",
          "name": "Anguilla",
          "fullname": "Anguilla",
          "capital": "The Valley",
          "tld": ".ai",
          "currency": "XCD",
          "phone": "+1264"
        }, {
          "continent": "North America",
          "iso2": "AG",
          "iso3": "ATG",
          "name": "Antigua And Barbuda",
          "fullname": "Antigua and Barbuda",
          "capital": "Saint John’s",
          "tld": ".ag",
          "currency": "XCD",
          "phone": "+1268"
        }, {
          "continent": "South America",
          "iso2": "AR",
          "iso3": "ARG",
          "name": "Argentina",
          "fullname": "The Argentine Republic",
          "capital": "Buenos Aires",
          "tld": ".ar",
          "currency": "ARS",
          "phone": "+54"
        }, {
          "continent": "Asia",
          "iso2": "AM",
          "iso3": "ARM",
          "name": "Armenia",
          "fullname": "The Republic of Armenia",
          "capital": "Yerevan",
          "tld": ".am",
          "currency": "AMD",
          "phone": "+374"
        }, {
          "continent": "North America",
          "iso2": "AW",
          "iso3": "ABW",
          "name": "Aruba",
          "fullname": "Aruba",
          "capital": "Oranjestad",
          "tld": ".aw",
          "currency": "ANG",
          "phone": "+297"
        }, {
          "continent": "Oceania",
          "iso2": "AU",
          "iso3": "AUS",
          "name": "Australia",
          "fullname": "Australia",
          "capital": "Canberra",
          "tld": ".au",
          "currency": "AUD",
          "phone": "+61"
        }, {
          "continent": "Europe",
          "iso2": "AT",
          "iso3": "AUT",
          "name": "Austria",
          "fullname": "The Republic of Austria",
          "capital": "Vienna",
          "tld": ".at",
          "currency": "EUR",
          "phone": "+43"
        }, {
          "continent": "Asia",
          "iso2": "AZ",
          "iso3": "AZE",
          "name": "Azerbaijan",
          "fullname": "The Republic of Azerbaijan",
          "capital": "Baku",
          "tld": ".az",
          "currency": "AZN",
          "phone": "+994"
        }, {
          "continent": "North America",
          "iso2": "BS",
          "iso3": "BHS",
          "name": "Bahamas",
          "fullname": "The Commonwealth of the Bahamas",
          "capital": "Nassau",
          "tld": ".bs",
          "currency": "BSD",
          "phone": "+1242"
        }, {
          "continent": "Asia",
          "iso2": "BH",
          "iso3": "BHR",
          "name": "Bahrain",
          "fullname": "The Kingdom of Bahrain",
          "capital": "Manama",
          "tld": ".bh",
          "currency": "BHD",
          "phone": "+973"
        }, {
          "continent": "Asia",
          "iso2": "BD",
          "iso3": "BGD",
          "name": "Bangladesh",
          "fullname": "The People's Republic of Bangladesh",
          "capital": "Dhaka",
          "tld": ".bd",
          "currency": "BDT",
          "phone": "+880"
        }, {
          "continent": "North America",
          "iso2": "BB",
          "iso3": "BRB",
          "name": "Barbados",
          "fullname": "Barbados",
          "capital": "Bridgetown",
          "tld": ".bb",
          "currency": "BBD",
          "phone": "+1246"
        }, {
          "continent": "Europe",
          "iso2": "BY",
          "iso3": "BLR",
          "name": "Belarus",
          "fullname": "The Republic of Belarus",
          "capital": "Minsk",
          "tld": ".by",
          "currency": "BYR",
          "phone": "+375"
        }, {
          "continent": "Europe",
          "iso2": "BE",
          "iso3": "BEL",
          "name": "Belgium",
          "fullname": "The Kingdom of Belgium",
          "capital": "Brussels",
          "tld": ".be",
          "currency": "EUR",
          "phone": "+32"
        }, {
          "continent": "North America",
          "iso2": "BZ",
          "iso3": "BLZ",
          "name": "Belize",
          "fullname": "Belize",
          "capital": "Belmopan",
          "tld": ".bz",
          "currency": "BZD",
          "phone": "+51"
        }, {
          "continent": "Africa",
          "iso2": "BJ",
          "iso3": "BEN",
          "name": "Benin",
          "fullname": "The Republic of Benin",
          "capital": "Porto-novo",
          "tld": ".bj",
          "currency": "XOF",
          "phone": "+229"
        }, {
          "continent": "North America",
          "iso2": "BM",
          "iso3": "BMU",
          "name": "Bermuda",
          "fullname": "Bermuda",
          "capital": "Hamilton",
          "tld": ".bm",
          "currency": "BMD",
          "phone": "+1441"
        }, {
          "continent": "Asia",
          "iso2": "BT",
          "iso3": "BTN",
          "name": "Bhutan",
          "fullname": "The Kingdom of Bhutan",
          "capital": "Thimphu",
          "tld": ".bt",
          "currency": "BTN",
          "phone": "+975"
        }, {
          "continent": "South America",
          "iso2": "BO",
          "iso3": "BOL",
          "name": "Bolivia",
          "fullname": "The Plurinational State of Bolivia",
          "capital": "La Paz",
          "tld": ".bo",
          "currency": "BOB",
          "phone": "+591"
        }, {
          "continent": "Europe",
          "iso2": "BA",
          "iso3": "BIH",
          "name": "Bosnia And Herzegovina",
          "fullname": "Bosnia and Herzegovina",
          "capital": "Sarajevo",
          "tld": ".ba",
          "currency": "BAM",
          "phone": "+387"
        }, {
          "continent": "Africa",
          "iso2": "BW",
          "iso3": "BWA",
          "name": "Botswana",
          "fullname": "The Republic of Botswana",
          "capital": "Gaborone",
          "tld": ".bw",
          "currency": "BWP",
          "phone": "+267"
        }, {
          "continent": "South America",
          "iso2": "BR",
          "iso3": "BRA",
          "name": "Brazil",
          "fullname": "The Federative Republic of Brazil",
          "capital": "Brasilia",
          "tld": ".br",
          "currency": "BRL",
          "phone": "+55"
        }, {
          "continent": "Asia",
          "iso2": "BN",
          "iso3": "BRN",
          "name": "Brunei Darussalam",
          "fullname": "Brunei Darussalam",
          "capital": "Bandar Seri Begawan",
          "tld": ".bn",
          "currency": "BND",
          "phone": "+673"
        }, {
          "continent": "Europe",
          "iso2": "BG",
          "iso3": "BGR",
          "name": "Bulgaria",
          "fullname": "The Republic of Bulgaria",
          "capital": "Sofia",
          "tld": ".bg",
          "currency": "BGN",
          "phone": "+359"
        }, {
          "continent": "Africa",
          "iso2": "BF",
          "iso3": "BFA",
          "name": "Burkina Faso",
          "fullname": "Burkina Faso",
          "capital": "Ouagadougou",
          "tld": ".bf",
          "currency": "XOF",
          "phone": "+226"
        }, {
          "continent": "Africa",
          "iso2": "BI",
          "iso3": "BDI",
          "name": "Burundi",
          "fullname": "The Republic of Burundi",
          "capital": "Bujumbura",
          "tld": ".bi",
          "currency": "BIF",
          "phone": "+257"
        }, {
          "continent": "Asia",
          "iso2": "KH",
          "iso3": "KHM",
          "name": "Cambodia",
          "fullname": "The Kingdom of Cambodia",
          "capital": "Phnom Penh",
          "tld": ".kh",
          "currency": "KHR",
          "phone": "+855"
        }, {
          "continent": "Africa",
          "iso2": "CM",
          "iso3": "CMR",
          "name": "Cameroon",
          "fullname": "The Republic of Cameroon",
          "capital": "Yaounde",
          "tld": ".cm",
          "currency": "XAF",
          "phone": "+237"
        }, {
          "continent": "North America",
          "iso2": "CA",
          "iso3": "CAN",
          "name": "Canada",
          "fullname": "Canada",
          "capital": "Ottawa",
          "tld": ".ca",
          "currency": "CAD",
          "phone": "+1"
        }, {
          "continent": "Africa",
          "iso2": "CV",
          "iso3": "CPV",
          "name": "Cape Verde",
          "fullname": "Republic of Cabo Verde",
          "capital": "Praia",
          "tld": ".cv",
          "currency": "CVE",
          "phone": "+238"
        }, {
          "continent": "North America",
          "iso2": "KY",
          "iso3": "CYM",
          "name": "Cayman Islands",
          "fullname": "Cayman Islands",
          "capital": "George Town",
          "tld": ".ky",
          "currency": "KYD",
          "phone": "+1345"
        }, {
          "continent": "Africa",
          "iso2": "CF",
          "iso3": "CAF",
          "name": "Central African Republic",
          "fullname": "The Central African Republic",
          "capital": "Bangui",
          "tld": ".cf",
          "currency": "XAF",
          "phone": "+236"
        }, {
          "continent": "Africa",
          "iso2": "TD",
          "iso3": "TCD",
          "name": "Chad",
          "fullname": "The Republic of Chad",
          "capital": "n'Djamena",
          "tld": ".td",
          "currency": "XAF",
          "phone": "+235"
        }, {
          "continent": "South America",
          "iso2": "CL",
          "iso3": "CHL",
          "name": "Chile",
          "fullname": "The Republic of Chile",
          "capital": "Santiago",
          "tld": ".cl",
          "currency": "CLP",
          "phone": "+56"
        }, {
          "continent": "Asia",
          "iso2": "CN",
          "iso3": "CHN",
          "name": "China",
          "fullname": "The People's Republic of China",
          "capital": "Beijing",
          "tld": ".cn",
          "currency": "CNY",
          "phone": "+86"
        }, {
          "continent": "South America",
          "iso2": "CO",
          "iso3": "COL",
          "name": "Colombia",
          "fullname": "The Republic of Colombia",
          "capital": "Bogotá",
          "tld": ".co",
          "currency": "COP",
          "phone": "+57"
        }, {
          "continent": "Africa",
          "iso2": "KM",
          "iso3": "COM",
          "name": "Comoros",
          "fullname": "The Union of the Comoros",
          "capital": "Moroni",
          "tld": ".km",
          "currency": "KMF",
          "phone": "+269"
        }, {
          "continent": "Africa",
          "iso2": "CG",
          "iso3": "COG",
          "name": "Congo",
          "fullname": "The Republic of the Congo",
          "capital": "Brazzaville",
          "tld": ".cg",
          "currency": "XAF",
          "phone": "+242"
        }, {
          "continent": "Oceania",
          "iso2": "CK",
          "iso3": "COK",
          "name": "Cook Islands",
          "fullname": "The Cook Islands",
          "capital": "Avarua",
          "tld": ".ck",
          "currency": "NZD",
          "phone": "+682"
        }, {
          "continent": "North America",
          "iso2": "CR",
          "iso3": "CRI",
          "name": "Costa Rica",
          "fullname": "The Republic of Costa Rica",
          "capital": "San Jose",
          "tld": ".cr",
          "currency": "CRC",
          "phone": "+56"
        }, {
          "continent": "Africa",
          "iso2": "CI",
          "iso3": "CIV",
          "name": "Côte D'ivoire",
          "fullname": "The Republic of Côte d'Ivoire",
          "capital": "Yamoussoukro",
          "tld": ".ci",
          "currency": "XOF",
          "phone": "+225"
        }, {
          "continent": "Europe",
          "iso2": "HR",
          "iso3": "HRV",
          "name": "Croatia",
          "fullname": "The Republic of Croatia",
          "capital": "Zagreb",
          "tld": ".hr",
          "currency": "HRK",
          "phone": "+385"
        }, {
          "continent": "North America",
          "iso2": "CU",
          "iso3": "CUB",
          "name": "Cuba",
          "fullname": "The Republic of Cuba",
          "capital": "Havana",
          "tld": ".cu",
          "currency": "CUP",
          "phone": "+53"
        }, {
          "continent": "Asia",
          "iso2": "CY",
          "iso3": "CYP",
          "name": "Cyprus",
          "fullname": "The Republic of Cyprus",
          "capital": "Nicosia",
          "tld": ".cy",
          "currency": "CYP",
          "phone": "+357"
        }, {
          "continent": "Europe",
          "iso2": "CZ",
          "iso3": "CZE",
          "name": "Czech Republic",
          "fullname": "The Czech Republic",
          "capital": "Prague",
          "tld": ".cz",
          "currency": "CZK",
          "phone": "+420"
        }, {
          "continent": "Europe",
          "iso2": "DK",
          "iso3": "DNK",
          "name": "Denmark",
          "fullname": "The Kingdom of Denmark",
          "capital": "Copenhagen",
          "tld": ".dk",
          "currency": "DKK",
          "phone": "+45"
        }, {
          "continent": "Africa",
          "iso2": "DJ",
          "iso3": "DJI",
          "name": "Djibouti",
          "fullname": "The Republic of Djibouti",
          "capital": "Djibouti",
          "tld": "dj",
          "currency": "DJF",
          "phone": "+253"
        }, {
          "continent": "North America",
          "iso2": "DM",
          "iso3": "DMA",
          "name": "Dominica",
          "fullname": "The Commonwealth of Dominica",
          "capital": "Roseau",
          "tld": ".dm",
          "currency": "XCD",
          "phone": "+1767"
        }, {
          "continent": "South America",
          "iso2": "DO",
          "iso3": "DOM",
          "name": "Dominican Republic",
          "fullname": "The Dominican Republic",
          "capital": "Santo Domingo",
          "tld": ".do",
          "currency": "DOP",
          "phone": "+1809"
        }, {
          "continent": "Africa",
          "iso2": "CD",
          "iso3": "COD",
          "name": "DR Congo",
          "fullname": "The Democratic Republic of the Congo",
          "capital": "Kinshasa",
          "tld": ".cd",
          "currency": "CDF",
          "phone": "+243"
        }, {
          "continent": "Oceania",
          "iso2": "TL",
          "iso3": "TLS",
          "name": "East Timor",
          "fullname": "The Democratic Republic of Timor-Leste",
          "capital": "Dilli",
          "tld": ".tl",
          "currency": "IDR",
          "phone": "+670"
        }, {
          "continent": "South America",
          "iso2": "EC",
          "iso3": "ECU",
          "name": "Ecuador",
          "fullname": "The Republic of Ecuador",
          "capital": "Quito",
          "tld": ".ec",
          "currency": "USD",
          "phone": "+593"
        }, {
          "continent": "Africa",
          "iso2": "EG",
          "iso3": "EGY",
          "name": "Egypt",
          "fullname": "The Arab Republic of Egypt",
          "capital": "Cairo",
          "tld": ".eg",
          "currency": "EGP",
          "phone": "+20"
        }, {
          "continent": "North America",
          "iso2": "SV",
          "iso3": "SLV",
          "name": "El Salvador",
          "fullname": "The Republic of el Salvador",
          "capital": "San Salvador",
          "tld": ".sv",
          "currency": "SVC",
          "phone": "+53"
        }, {
          "continent": "Africa",
          "iso2": "GQ",
          "iso3": "GNQ",
          "name": "Equatorial Guinea",
          "fullname": "The Republic of Equatorial Guinea",
          "capital": "Malabo",
          "tld": ".gq",
          "currency": "XAF",
          "phone": "+240"
        }, {
          "continent": "Africa",
          "iso2": "ER",
          "iso3": "ERI",
          "name": "Eritrea",
          "fullname": "The State of Eritrea",
          "capital": "Asmara",
          "tld": ".er",
          "currency": "ERN",
          "phone": "+291"
        }, {
          "continent": "Europe",
          "iso2": "EE",
          "iso3": "EST",
          "name": "Estonia",
          "fullname": "The Republic of Estonia",
          "capital": "Tallinn",
          "tld": ".ee",
          "currency": "EEK",
          "phone": "+372"
        }, {
          "continent": "Africa",
          "iso2": "ET",
          "iso3": "ETH",
          "name": "Ethiopia",
          "fullname": "The Federal Democratic Republic of Ethiopia",
          "capital": "Addis Ababa",
          "tld": ".et",
          "currency": "ETB",
          "phone": "+251"
        }, {
          "continent": "Europe",
          "iso2": "FO",
          "iso3": "FRO",
          "name": "Faroe Islands",
          "fullname": "Faroe Islands",
          "capital": "Palikir",
          "tld": ".fo",
          "currency": "DKK",
          "phone": "+298"
        }, {
          "continent": "Oceania",
          "iso2": "FJ",
          "iso3": "FJI",
          "name": "Fiji",
          "fullname": "The Republic of Fiji",
          "capital": "Suva",
          "tld": ".fj",
          "currency": "FJD",
          "phone": "+679"
        }, {
          "continent": "Europe",
          "iso2": "FI",
          "iso3": "FIN",
          "name": "Finland",
          "fullname": "The Republic of Finland",
          "capital": "Helsinki",
          "tld": ".fi",
          "currency": "EUR",
          "phone": "+358"
        }, {
          "continent": "Europe",
          "iso2": "FR",
          "iso3": "FRA",
          "name": "France",
          "fullname": "The French Republic",
          "capital": "Paris",
          "tld": ".fr",
          "currency": "EUR",
          "phone": "+33"
        }, {
          "continent": "South America",
          "iso2": "GF",
          "iso3": "GUF",
          "name": "French Guyana",
          "fullname": "French Guyana",
          "capital": "Cayenne",
          "tld": ".gf",
          "currency": "EUR",
          "phone": "+594"
        }, {
          "continent": "Oceania",
          "iso2": "PF",
          "iso3": "PYF",
          "name": "French Polynesia",
          "fullname": "French Polynesia",
          "capital": "Papeete",
          "tld": ".pf",
          "currency": "XPF",
          "phone": "+689"
        }, {
          "continent": "Africa",
          "iso2": "GA",
          "iso3": "GAB",
          "name": "Gabon",
          "fullname": "The Gabonese Republic",
          "capital": "Libreville",
          "tld": ".ga",
          "currency": "XAF",
          "phone": "+241"
        }, {
          "continent": "Africa",
          "iso2": "GM",
          "iso3": "GMB",
          "name": "Gambia",
          "fullname": "The Republic of the Gambia",
          "capital": "Banjul",
          "tld": ".gm",
          "currency": "GMD",
          "phone": "+220"
        }, {
          "continent": "Europe",
          "iso2": "GE",
          "iso3": "GEO",
          "name": "Georgia",
          "fullname": "Georgia",
          "capital": "Tbilisi",
          "tld": ".ge",
          "currency": "GEL",
          "phone": "+995"
        }, {
          "continent": "Europe",
          "iso2": "DE",
          "iso3": "DEU",
          "name": "Germany",
          "fullname": "The Federal Republic of Germany",
          "capital": "Berlin",
          "tld": ".de",
          "currency": "EUR",
          "phone": "+49"
        }, {
          "continent": "Africa",
          "iso2": "GH",
          "iso3": "GHA",
          "name": "Ghana",
          "fullname": "The Republic of Ghana",
          "capital": "Accra",
          "tld": ".gh",
          "currency": "GHC",
          "phone": "+233"
        }, {
          "continent": "Africa",
          "iso2": "GI",
          "iso3": "GIB",
          "name": "Gibraltar",
          "fullname": "Gibraltar",
          "capital": "Gibraltar",
          "tld": ".gi",
          "currency": "GIP",
          "phone": "+350"
        }, {
          "continent": "Europe",
          "iso2": "GR",
          "iso3": "GRC",
          "name": "Greece",
          "fullname": "The Hellenic Republic",
          "capital": "Athens",
          "tld": ".gr",
          "currency": "EUR",
          "phone": "+30"
        }, {
          "continent": "North America",
          "iso2": "GL",
          "iso3": "GRL",
          "name": "Greenland",
          "fullname": "Greenland",
          "capital": "Nuuk",
          "tld": ".gl",
          "currency": "DKK",
          "phone": "+299"
        }, {
          "continent": "North America",
          "iso2": "GD",
          "iso3": "GRD",
          "name": "Grenada",
          "fullname": "Grenada",
          "capital": "Saint George’s",
          "tld": ".gd",
          "currency": "XCD",
          "phone": "+1473"
        }, {
          "continent": "North America",
          "iso2": "GP",
          "iso3": "GLP",
          "name": "Guadeloupe",
          "fullname": "Guadeloupe",
          "capital": "Basse-Terre",
          "tld": ".gp",
          "currency": "EUR",
          "phone": "+590"
        }, {
          "continent": "Asia",
          "iso2": "GU",
          "iso3": "GUM",
          "name": "Guam",
          "fullname": "Guam",
          "capital": "Hagåtña",
          "tld": ".gu",
          "currency": "USD",
          "phone": "+1671"
        }, {
          "continent": "North America",
          "iso2": "GT",
          "iso3": "GTM",
          "name": "Guatemala",
          "fullname": "The Republic of Guatemala",
          "capital": "Guatemala City",
          "tld": ".gt",
          "currency": "GTQ",
          "phone": "+52"
        }, {
          "continent": "Europe",
          "iso2": "GG",
          "iso3": "GGY",
          "name": "Guernsey",
          "fullname": "Guernsey",
          "capital": "St. Peter Port",
          "tld": ".gg",
          "currency": "GGP",
          "phone": "+44"
        }, {
          "continent": "Africa",
          "iso2": "GN",
          "iso3": "GIN",
          "name": "Guinea",
          "fullname": "The Republic of Guinea",
          "capital": "Conakry",
          "tld": ".gn",
          "currency": "GNF",
          "phone": "+224"
        }, {
          "continent": "Africa",
          "iso2": "GW",
          "iso3": "GNB",
          "name": "Guinea-bissau",
          "fullname": "The Republic of Guinea-bissau",
          "capital": "Bissau",
          "tld": ".gw",
          "currency": "XOF",
          "phone": "+245"
        }, {
          "continent": "South America",
          "iso2": "GY",
          "iso3": "GUY",
          "name": "Guyana",
          "fullname": "The Republic of Guyana",
          "capital": "Georgetown",
          "tld": ".gy",
          "currency": "GYD",
          "phone": "+592"
        }, {
          "continent": "North America",
          "iso2": "HT",
          "iso3": "HTI",
          "name": "Haiti",
          "fullname": "The Republic of Haiti",
          "capital": "Port-au-prince",
          "tld": ".ht",
          "currency": "USD",
          "phone": "+59"
        }, {
          "continent": "North America",
          "iso2": "HN",
          "iso3": "HND",
          "name": "Honduras",
          "fullname": "The Republic of Honduras",
          "capital": "Tegucigalpa",
          "tld": ".hn",
          "currency": "HNL",
          "phone": "+54"
        }, {
          "continent": "Asia",
          "iso2": "HK",
          "iso3": "HKG",
          "name": "Hong Kong",
          "fullname": "Hong Kong Special Administrative Region of the People's Republic of China",
          "capital": "Hong Kong",
          "tld": ".hk",
          "currency": "HNL",
          "phone": "+852"
        }, {
          "continent": "Europe",
          "iso2": "HU",
          "iso3": "HUN",
          "name": "Hungary",
          "fullname": "Hungary",
          "capital": "Budapest",
          "tld": ".hu",
          "currency": "HUF",
          "phone": "+36"
        }, {
          "continent": "Europe",
          "iso2": "IS",
          "iso3": "ISL",
          "name": "Iceland",
          "fullname": "The Republic of Iceland",
          "capital": "Reykjavik",
          "tld": ".is",
          "currency": "ISK",
          "phone": "+354"
        }, {
          "continent": "Asia",
          "iso2": "IN",
          "iso3": "IND",
          "name": "India",
          "fullname": "The Republic of India",
          "capital": "New Delhi",
          "tld": ".in",
          "currency": "INR",
          "phone": "+91"
        }, {
          "continent": "Asia",
          "iso2": "ID",
          "iso3": "IDN",
          "name": "Indonesia",
          "fullname": "The Republic of Indonesia",
          "capital": "Jakarta",
          "tld": ".id",
          "currency": "IDR",
          "phone": "+62"
        }, {
          "continent": "Asia",
          "iso2": "IR",
          "iso3": "IRN",
          "name": "Iran",
          "fullname": "The Islamic Republic of Iran",
          "capital": "Tehran",
          "tld": ".ir",
          "currency": "IRR",
          "phone": "+98"
        }, {
          "continent": "Asia",
          "iso2": "IQ",
          "iso3": "IRQ",
          "name": "Iraq",
          "fullname": "The Republic of Iraq",
          "capital": "Baghdad",
          "tld": ".iq",
          "currency": "IQD",
          "phone": "+964"
        }, {
          "continent": "Europe",
          "iso2": "IE",
          "iso3": "IRL",
          "name": "Ireland",
          "fullname": "Ireland",
          "capital": "Dublin",
          "tld": ".ie",
          "currency": "EUR",
          "phone": "+353"
        }, {
          "continent": "Europe",
          "iso2": "IM",
          "iso3": "IMN",
          "name": "Isle Of Man",
          "fullname": "Isle Of Man",
          "capital": "Douglas",
          "tld": ".im",
          "currency": "IMP",
          "phone": "+44"
        }, {
          "continent": "Asia",
          "iso2": "IL",
          "iso3": "ISR",
          "name": "Israel",
          "fullname": "The State of Israel",
          "capital": "Tel Aviv",
          "tld": ".il",
          "currency": "ILS",
          "phone": "+972"
        }, {
          "continent": "Europe",
          "iso2": "IT",
          "iso3": "ITA",
          "name": "Italy",
          "fullname": "The Republic of Italy",
          "capital": "Rome",
          "tld": ".it",
          "currency": "EUR",
          "phone": "+39"
        }, {
          "continent": "North America",
          "iso2": "JM",
          "iso3": "JAM",
          "name": "Jamaica",
          "fullname": "Jamaica",
          "capital": "Kingston",
          "tld": ".jm",
          "currency": "JMD",
          "phone": "+1876"
        }, {
          "continent": "Asia",
          "iso2": "JP",
          "iso3": "JPN",
          "name": "Japan",
          "fullname": "Japan",
          "capital": "Tokyo",
          "tld": ".jp",
          "currency": "JPY",
          "phone": "+81"
        }, {
          "continent": "Europe",
          "iso2": "JE",
          "iso3": "JEY",
          "name": "Jersey",
          "fullname": "Jersey",
          "capital": "Saint Helier",
          "tld": ".je",
          "currency": "JEP",
          "phone": "+44"
        }, {
          "continent": "Asia",
          "iso2": "JO",
          "iso3": "JOR",
          "name": "Jordan",
          "fullname": "The Hashemite Kingdom of Jordan",
          "capital": "Amman",
          "tld": ".jo",
          "currency": "JOD",
          "phone": "+962"
        }, {
          "continent": "Asia",
          "iso2": "KZ",
          "iso3": "KAZ",
          "name": "Kazakhstan",
          "fullname": "The Republic of Kazakhstan",
          "capital": "Astana",
          "tld": ".kz",
          "currency": "KZT",
          "phone": "+7"
        }, {
          "continent": "Africa",
          "iso2": "KE",
          "iso3": "KEN",
          "name": "Kenya",
          "fullname": "The Republic of Kenya",
          "capital": "Nairobi",
          "tld": ".ke",
          "currency": "KES",
          "phone": "+254"
        }, {
          "continent": "Oceania",
          "iso2": "KI",
          "iso3": "KIR",
          "name": "Kiribati",
          "fullname": "The Republic of Kiribati",
          "capital": "Tarawa Atoll",
          "tld": ".ki",
          "currency": "AUD",
          "phone": "+686"
        }, {
          "continent": "Asia",
          "iso2": "KW",
          "iso3": "KWT",
          "name": "Kuwait",
          "fullname": "The State of Kuwait",
          "capital": "Kuwait City",
          "tld": ".kw",
          "currency": "KWD",
          "phone": "+965"
        }, {
          "continent": "Asia",
          "iso2": "KG",
          "iso3": "KGZ",
          "name": "Kyrgyzstan",
          "fullname": "The Kyrgyz Republic",
          "capital": "Bishkek",
          "tld": ".kg",
          "currency": "KGS",
          "phone": "+996"
        }, {
          "continent": "Asia",
          "iso2": "LA",
          "iso3": "LAO",
          "name": "Laos",
          "fullname": "The Lao People's Democratic Republic",
          "capital": "Vientiane",
          "tld": ".la",
          "currency": "LAK",
          "phone": "+856"
        }, {
          "continent": "Europe",
          "iso2": "LV",
          "iso3": "LVA",
          "name": "Latvia",
          "fullname": "The Republic of Latvia",
          "capital": "Riga",
          "tld": ".lv",
          "currency": "LVL",
          "phone": "+371"
        }, {
          "continent": "Asia",
          "iso2": "LB",
          "iso3": "LBN",
          "name": "Lebanon",
          "fullname": "The Lebanese Republic",
          "capital": "Beirut",
          "tld": ".lb",
          "currency": "LBP",
          "phone": "+961"
        }, {
          "continent": "Africa",
          "iso2": "LS",
          "iso3": "LSO",
          "name": "Lesotho",
          "fullname": "The Kingdom of Lesotho",
          "capital": "Maseru",
          "tld": ".ls",
          "currency": "LSL",
          "phone": "+266"
        }, {
          "continent": "Africa",
          "iso2": "LR",
          "iso3": "LBR",
          "name": "Liberia",
          "fullname": "The Republic of Liberia",
          "capital": "Monrovia",
          "tld": ".lr",
          "currency": "LRD",
          "phone": "+231"
        }, {
          "continent": "Africa",
          "iso2": "LY",
          "iso3": "LBY",
          "name": "Libya",
          "fullname": "Libya",
          "capital": "Tripoli",
          "tld": ".ly",
          "currency": "LYD",
          "phone": "+218"
        }, {
          "continent": "Europe",
          "iso2": "LI",
          "iso3": "LIE",
          "name": "Liechtenstein",
          "fullname": "The Principality of Liechtenstein",
          "capital": "Vaduz",
          "tld": ".li",
          "currency": "CHF",
          "phone": "+423"
        }, {
          "continent": "Europe",
          "iso2": "LT",
          "iso3": "LTU",
          "name": "Lithuania",
          "fullname": "The Republic of Lithuania",
          "capital": "Vilnius",
          "tld": ".lt",
          "currency": "LTL",
          "phone": "+370"
        }, {
          "continent": "Europe",
          "iso2": "LU",
          "iso3": "LUX",
          "name": "Luxembourg",
          "fullname": "The Grand Duchy of Luxembourg",
          "capital": "Luxembourg",
          "tld": ".lu",
          "currency": "EUR",
          "phone": "+352"
        }, {
          "continent": "Asia",
          "iso2": "MO",
          "iso3": "MAC",
          "name": "Macao",
          "fullname": "Macao Special Administrative Region of the People's Republic of China",
          "capital": "Macao",
          "tld": ".mo",
          "currency": "MOP",
          "phone": "+853"
        }, {
          "continent": "Europe",
          "iso2": "MK",
          "iso3": "MKD",
          "name": "Macedonia",
          "fullname": "The Former Yugoslav Republic of Macedonia",
          "capital": "Skopje",
          "tld": ".mk",
          "currency": "MKD",
          "phone": "+389"
        }, {
          "continent": "Africa",
          "iso2": "MG",
          "iso3": "MDG",
          "name": "Madagascar",
          "fullname": "The Republic of Madagascar",
          "capital": "Antananarivo",
          "tld": ".mg",
          "currency": "MGA",
          "phone": "+261"
        }, {
          "continent": "Africa",
          "iso2": "MW",
          "iso3": "MWI",
          "name": "Malawi",
          "fullname": "The Republic of Malawi",
          "capital": "Lilongwe",
          "tld": ".mw",
          "currency": "MWK",
          "phone": "+265"
        }, {
          "continent": "Asia",
          "iso2": "MY",
          "iso3": "MYS",
          "name": "Malaysia",
          "fullname": "Malaysia",
          "capital": "Kuala Lumpur",
          "tld": ".my",
          "currency": "MYR",
          "phone": "+60"
        }, {
          "continent": "Asia",
          "iso2": "MV",
          "iso3": "MDV",
          "name": "Maldives",
          "fullname": "The Republic of Maldives",
          "capital": "Male",
          "tld": ".mv",
          "currency": "MVR",
          "phone": "+960"
        }, {
          "continent": "Africa",
          "iso2": "ML",
          "iso3": "MLI",
          "name": "Mali",
          "fullname": "The Republic of Mali",
          "capital": "Bamako",
          "tld": ".ml",
          "currency": "XOF",
          "phone": "+223"
        }, {
          "continent": "Europe",
          "iso2": "MT",
          "iso3": "MLT",
          "name": "Malta",
          "fullname": "The Republic of Malta",
          "capital": "Valletta",
          "tld": ".mt",
          "currency": "EUR",
          "phone": "+356"
        }, {
          "continent": "Oceania",
          "iso2": "MH",
          "iso3": "MHL",
          "name": "Marshall Islands",
          "fullname": "The Republic of the Marshall Islands",
          "capital": "Majuro",
          "tld": ".mh",
          "currency": "USD",
          "phone": "+692"
        }, {
          "continent": "North America",
          "iso2": "MQ",
          "iso3": "MTQ",
          "name": "Martinique",
          "fullname": "Martinique",
          "capital": "Fort-de-France",
          "tld": ".mq",
          "currency": "EUR",
          "phone": "+596"
        }, {
          "continent": "Africa",
          "iso2": "MR",
          "iso3": "MRT",
          "name": "Mauritania",
          "fullname": "The Islamic Republic of Mauritania",
          "capital": "Nouakchott",
          "tld": ".mr",
          "currency": "MRO",
          "phone": "+222"
        }, {
          "continent": "Africa",
          "iso2": "MU",
          "iso3": "MUS",
          "name": "Mauritius",
          "fullname": "The Republic of Mauritius",
          "capital": "Port Louis",
          "tld": ".mu",
          "currency": "MUR",
          "phone": "+230"
        }, {
          "continent": "Africa",
          "iso2": "YT",
          "iso3": "MYT",
          "name": "Mayotte",
          "fullname": "The Department of Mayotte",
          "capital": "Mamoudzou",
          "tld": ".yt",
          "currency": "EUR",
          "phone": "+269"
        }, {
          "continent": "North America",
          "iso2": "MX",
          "iso3": "MEX",
          "name": "Mexico",
          "fullname": "The United Mexican States",
          "capital": "Mexico City",
          "tld": ".mx",
          "currency": "MXN",
          "phone": "+52"
        }, {
          "continent": "Oceania",
          "iso2": "FM",
          "iso3": "FSM",
          "name": "Micronesia",
          "fullname": "The Federated States of Micronesia",
          "capital": "Palikir",
          "tld": ".fm",
          "currency": "USD",
          "phone": "+691"
        }, {
          "continent": "Europe",
          "iso2": "MD",
          "iso3": "MDA",
          "name": "Moldova",
          "fullname": "The Republic of Moldova",
          "capital": "Chisinau",
          "tld": ".md",
          "currency": "MDL",
          "phone": "+373"
        }, {
          "continent": "Europe",
          "iso2": "MC",
          "iso3": "MCO",
          "name": "Monaco",
          "fullname": "The Principality of Monaco",
          "capital": "Monaco",
          "tld": ".mc",
          "currency": "EUR",
          "phone": "+377"
        }, {
          "continent": "Asia",
          "iso2": "MN",
          "iso3": "MNG",
          "name": "Mongolia",
          "fullname": "Mongolia",
          "capital": "Ulaanbaatar",
          "tld": ".mn",
          "currency": "MNT",
          "phone": "+976"
        }, {
          "continent": "Europe",
          "iso2": "ME",
          "iso3": "MNE",
          "name": "Montenegro",
          "fullname": "Montenegro",
          "capital": "Podgorica",
          "tld": ".me",
          "currency": "EUR",
          "phone": "+382"
        }, {
          "continent": "North America",
          "iso2": "MS",
          "iso3": "MSR",
          "name": "Montserrat",
          "fullname": "Montserrat",
          "capital": "Plymouth",
          "tld": ".ms",
          "currency": "XCD",
          "phone": "+1664"
        }, {
          "continent": "Africa",
          "iso2": "MA",
          "iso3": "MAR",
          "name": "Morocco",
          "fullname": "The Kingdom of Morocco",
          "capital": "Rabat",
          "tld": ".ma",
          "currency": "MAD",
          "phone": "+211"
        }, {
          "continent": "Africa",
          "iso2": "MZ",
          "iso3": "MOZ",
          "name": "Mozambique",
          "fullname": "The Republic of Mozambique",
          "capital": "Maputo",
          "tld": ".mz",
          "currency": "MZM",
          "phone": "+258"
        }, {
          "continent": "Asia",
          "iso2": "MM",
          "iso3": "MMR",
          "name": "Myanmar",
          "fullname": "The Republic of the Union of Myanmar",
          "capital": "Nypyidaw",
          "tld": ".mm",
          "currency": "MMK",
          "phone": "+95"
        }, {
          "continent": "Africa",
          "iso2": "NA",
          "iso3": "NAM",
          "name": "Namibia",
          "fullname": "The Republic of Namibia",
          "capital": "Windhoek",
          "tld": ".na",
          "currency": "ZAR",
          "phone": "+264"
        }, {
          "continent": "Oceania",
          "iso2": "NR",
          "iso3": "NRU",
          "name": "Nauru",
          "fullname": "The Republic of Nauru",
          "capital": "Yaren District",
          "tld": ".nr",
          "currency": "AUD",
          "phone": "+674"
        }, {
          "continent": "Asia",
          "iso2": "NP",
          "iso3": "NPL",
          "name": "Nepal",
          "fullname": "The Federal Democratic Republic of Nepal",
          "capital": "Kathmandu",
          "tld": ".np",
          "currency": "NPR",
          "phone": "+977"
        }, {
          "continent": "Europe",
          "iso2": "NL",
          "iso3": "NLD",
          "name": "Netherlands",
          "fullname": "The Kingdom of the Netherlands",
          "capital": "Amsterdam",
          "tld": ".nl",
          "currency": "EUR",
          "phone": "+31"
        }, {
          "continent": "Oceania",
          "iso2": "NZ",
          "iso3": "NZL",
          "name": "New Zealand",
          "fullname": "New Zealand",
          "capital": "Wellington",
          "tld": ".nz",
          "currency": "NZD",
          "phone": "+64"
        }, {
          "continent": "North America",
          "iso2": "NI",
          "iso3": "NIC",
          "name": "Nicaragua",
          "fullname": "The Republic of Nicaragua",
          "capital": "Managua",
          "tld": ".ni",
          "currency": "NIO",
          "phone": "+55"
        }, {
          "continent": "Africa",
          "iso2": "NE",
          "iso3": "NER",
          "name": "Niger",
          "fullname": "The Republic of the Niger",
          "capital": "Niamey",
          "tld": ".ne",
          "currency": "XOF",
          "phone": "+227"
        }, {
          "continent": "Africa",
          "iso2": "NG",
          "iso3": "NGA",
          "name": "Nigeria",
          "fullname": "The Federal Republic of Nigeria",
          "capital": "Abuja",
          "tld": ".ng",
          "currency": "NGN",
          "phone": "+234"
        }, {
          "continent": "Asia",
          "iso2": "KP",
          "iso3": "PRK",
          "name": "North Korea",
          "fullname": "The Democratic People's Republic of Korea",
          "capital": "Pyongyang",
          "tld": ".kp",
          "currency": "KPW",
          "phone": "+850"
        }, {
          "continent": "Europe",
          "iso2": "NO",
          "iso3": "NOR",
          "name": "Norway",
          "fullname": "The Kingdom of Norway",
          "capital": "Oslo",
          "tld": ".no",
          "currency": "NOK",
          "phone": "+47"
        }, {
          "continent": "Asia",
          "iso2": "OM",
          "iso3": "OMN",
          "name": "Oman",
          "fullname": "The Sultanate of Oman",
          "capital": "Muscat",
          "tld": ".om",
          "currency": "OMR",
          "phone": "+968"
        }, {
          "continent": "Asia",
          "iso2": "PK",
          "iso3": "PAK",
          "name": "Pakistan",
          "fullname": "The Islamic Republic of Pakistan",
          "capital": "Islamabad",
          "tld": ".pk",
          "currency": "PKR",
          "phone": "+92"
        }, {
          "continent": "Oceania",
          "iso2": "PW",
          "iso3": "PLW",
          "name": "Palau",
          "fullname": "The Republic of Palau",
          "capital": "Ngerulmud",
          "tld": ".pw",
          "currency": "USD",
          "phone": "+680"
        }, {
          "continent": "Asia",
          "iso2": "PS",
          "iso3": "PSE",
          "name": "Palestine",
          "fullname": "The State of Palestine",
          "capital": "Ramallah",
          "tld": ".ps",
          "currency": "",
          "phone": "+970"
        }, {
          "continent": "South America",
          "iso2": "PA",
          "iso3": "PAN",
          "name": "Panama",
          "fullname": "The Republic of Panama",
          "capital": "Panama City",
          "tld": ".pa",
          "currency": "USD",
          "phone": "+57"
        }, {
          "continent": "Oceania",
          "iso2": "PG",
          "iso3": "PNG",
          "name": "Papua New Guinea",
          "fullname": "Independent State of Papua New Guinea",
          "capital": "Port Moresby",
          "tld": ".pg",
          "currency": "PGK",
          "phone": "+675"
        }, {
          "continent": "South America",
          "iso2": "PY",
          "iso3": "PRY",
          "name": "Paraguay",
          "fullname": "The Republic of Paraguay",
          "capital": "Asunción",
          "tld": ".py",
          "currency": "PYG",
          "phone": "+595"
        }, {
          "continent": "South America",
          "iso2": "PE",
          "iso3": "PER",
          "name": "Peru",
          "fullname": "The Republic of Peru",
          "capital": "Lima",
          "tld": ".pe",
          "currency": "PEN",
          "phone": "+51"
        }, {
          "continent": "Asia",
          "iso2": "PH",
          "iso3": "PHL",
          "name": "Philippines",
          "fullname": "The Republic of the Philippines",
          "capital": "Manila",
          "tld": ".ph",
          "currency": "PHP",
          "phone": "+63"
        }, {
          "continent": "Oceania",
          "iso2": "PN",
          "iso3": "PCN",
          "name": "Pitcairn",
          "fullname": "Pitcairn",
          "capital": "Adamstown",
          "tld": ".pn",
          "currency": "NZD",
          "phone": "+649"
        }, {
          "continent": "Europe",
          "iso2": "PL",
          "iso3": "POL",
          "name": "Poland",
          "fullname": "The Republic of Poland",
          "capital": "Warsaw",
          "tld": ".pl",
          "currency": "PLN",
          "phone": "+48"
        }, {
          "continent": "Europe",
          "iso2": "PT",
          "iso3": "PRT",
          "name": "Portugal",
          "fullname": "The Portuguese Republic",
          "capital": "Lisbon",
          "tld": ".pt",
          "currency": "EUR",
          "phone": "+351"
        }, {
          "continent": "North America",
          "iso2": "PR",
          "iso3": "PRI",
          "name": "Puerto Rico",
          "fullname": "The Commonwealth of Puerto Rico",
          "capital": "San Juan",
          "tld": ".pr",
          "currency": "USD",
          "phone": "+1939"
        }, {
          "continent": "Asia",
          "iso2": "QA",
          "iso3": "QAT",
          "name": "Qatar",
          "fullname": "The State of Qatar",
          "capital": "Doha",
          "tld": ".qa",
          "currency": "QAR",
          "phone": "+974"
        }, {
          "continent": "Africa",
          "iso2": "RE",
          "iso3": "REU",
          "name": "Réunion",
          "fullname": "Réunion",
          "capital": "Saint-Denis",
          "tld": ".re",
          "currency": "EUR",
          "phone": "+262"
        }, {
          "continent": "Europe",
          "iso2": "RO",
          "iso3": "ROU",
          "name": "Romania",
          "fullname": "Romania",
          "capital": "Bucharest",
          "tld": ".ro",
          "currency": "RON",
          "phone": "+40"
        }, {
          "continent": "Asia",
          "iso2": "RU",
          "iso3": "RUS",
          "name": "Russia",
          "fullname": "The Russian Federation",
          "capital": "Moscow",
          "tld": ".ru",
          "currency": "RUB",
          "phone": "+7"
        }, {
          "continent": "Africa",
          "iso2": "RW",
          "iso3": "RWA",
          "name": "Rwanda",
          "fullname": "The Republic of Rwanda",
          "capital": "Kigali",
          "tld": ".rw",
          "currency": "RWF",
          "phone": "+250"
        }, {
          "continent": "Africa",
          "iso2": "SH",
          "iso3": "SHN",
          "name": "Saint Helena",
          "fullname": "Saint Helena",
          "capital": "Jamestown",
          "tld": ".sh",
          "currency": "SHP",
          "phone": "+290"
        }, {
          "continent": "North America",
          "iso2": "KN",
          "iso3": "KNA",
          "name": "Saint Kitts And Nevis",
          "fullname": "Saint Kitts and Nevis",
          "capital": "Basseterre",
          "tld": ".kn",
          "currency": "XCD",
          "phone": "+1869"
        }, {
          "continent": "South America",
          "iso2": "LC",
          "iso3": "LCA",
          "name": "Saint Lucia",
          "fullname": "Saint Lucia",
          "capital": "Castries",
          "tld": ".lc",
          "currency": "XCD",
          "phone": "+1758"
        }, {
          "continent": "North America",
          "iso2": "PM",
          "iso3": "SPM",
          "name": "Saint Pierre And Miquelon",
          "fullname": "Saint Pierre And Miquelon",
          "capital": "Saint-Pierre",
          "tld": ".pm",
          "currency": "EUR",
          "phone": "+508"
        }, {
          "continent": "South America",
          "iso2": "VC",
          "iso3": "VCT",
          "name": "Saint Vincent And The Grenadines",
          "fullname": "Saint Vincent and the Grenadines",
          "capital": "Kingstown",
          "tld": ".vc",
          "currency": "XCD",
          "phone": "+1784"
        }, {
          "continent": "Oceania",
          "iso2": "WS",
          "iso3": "WSM",
          "name": "Samoa",
          "fullname": "The Independent State of Samoa",
          "capital": "Apia",
          "tld": ".ws",
          "currency": "WST",
          "phone": "+685"
        }, {
          "continent": "Europe",
          "iso2": "SM",
          "iso3": "SMR",
          "name": "San Marino",
          "fullname": "The Republic of San Marino",
          "capital": "San Marino",
          "tld": ".sm",
          "currency": "EUR",
          "phone": "+378"
        }, {
          "continent": "Africa",
          "iso2": "ST",
          "iso3": "STP",
          "name": "São Tomé and Príncipe",
          "fullname": "The Democratic Republic of São Tomé and Príncipe",
          "capital": "São Tomé",
          "tld": ".st",
          "currency": "STD",
          "phone": "+239"
        }, {
          "continent": "Asia",
          "iso2": "SA",
          "iso3": "SAU",
          "name": "Saudi Arabia",
          "fullname": "The Kingdom of Saudi Arabia",
          "capital": "Riyadh",
          "tld": ".sa",
          "currency": "SAR",
          "phone": "+966"
        }, {
          "continent": "Africa",
          "iso2": "SN",
          "iso3": "SEN",
          "name": "Senegal",
          "fullname": "The Republic of Senegal",
          "capital": "Dakar",
          "tld": ".sn",
          "currency": "XOF",
          "phone": "+221"
        }, {
          "continent": "Europe",
          "iso2": "RS",
          "iso3": "SRB",
          "name": "Serbia",
          "fullname": "The Republic of Serbia",
          "capital": "Belgrade",
          "tld": ".cs",
          "currency": "EUR",
          "phone": "+381"
        }, {
          "continent": "Africa",
          "iso2": "SC",
          "iso3": "SYC",
          "name": "Seychelles",
          "fullname": "The Republic of Seychelles",
          "capital": "Victoria",
          "tld": ".sc",
          "currency": "SCR",
          "phone": "+248"
        }, {
          "continent": "Africa",
          "iso2": "SL",
          "iso3": "SLE",
          "name": "Sierra Leone",
          "fullname": "The Republic of Sierra Leone",
          "capital": "Freetown",
          "tld": ".sl",
          "currency": "SLL",
          "phone": "+232"
        }, {
          "continent": "Asia",
          "iso2": "SG",
          "iso3": "SGP",
          "name": "Singapore",
          "fullname": "The Republic of Singapore",
          "capital": "Singapore",
          "tld": ".sg",
          "currency": "SGD",
          "phone": "+65"
        }, {
          "continent": "Europe",
          "iso2": "SK",
          "iso3": "SVK",
          "name": "Slovakia",
          "fullname": "The Slovak Republic",
          "capital": "Bratislava",
          "tld": ".sk",
          "currency": "SKK",
          "phone": "+421"
        }, {
          "continent": "Europe",
          "iso2": "SI",
          "iso3": "SVN",
          "name": "Slovenia",
          "fullname": "The Republic of Slovenia",
          "capital": "Ljubljana",
          "tld": ".si",
          "currency": "SIT",
          "phone": "+386"
        }, {
          "continent": "Oceania",
          "iso2": "SB",
          "iso3": "SLB",
          "name": "Solomon Islands",
          "fullname": "Solomon Islands",
          "capital": "Honiara",
          "tld": ".sb",
          "currency": "SBD",
          "phone": "+677"
        }, {
          "continent": "Africa",
          "iso2": "SO",
          "iso3": "SOM",
          "name": "Somalia",
          "fullname": "The Federal Republic of Somalia",
          "capital": "Mogadishu",
          "tld": ".so",
          "currency": "SOS",
          "phone": "+252"
        }, {
          "continent": "Africa",
          "iso2": "ZA",
          "iso3": "ZAF",
          "name": "South Africa",
          "fullname": "The Republic of South Africa",
          "capital": "Pretoria",
          "tld": ".za",
          "currency": "ZAR",
          "phone": "+27"
        }, {
          "continent": "Asia",
          "iso2": "KR",
          "iso3": "KOR",
          "name": "South Korea",
          "fullname": "The Republic of Korea",
          "capital": "Seoul",
          "tld": ".kr",
          "currency": "KRW",
          "phone": "+82"
        }, {
          "continent": "Africa",
          "iso2": "SS",
          "iso3": "SSD",
          "name": "South Sudan",
          "fullname": "The Republic of South Sudan",
          "capital": "Juba",
          "tld": ".ss",
          "currency": "SSP",
          "phone": "+221"
        }, {
          "continent": "Europe",
          "iso2": "ES",
          "iso3": "ESP",
          "name": "Spain",
          "fullname": "The Kingdom of Spain",
          "capital": "Madrid",
          "tld": ".es",
          "currency": "EUR",
          "phone": "+34"
        }, {
          "continent": "Asia",
          "iso2": "LK",
          "iso3": "LKA",
          "name": "Sri Lanka",
          "fullname": "The Democratic Socialist Republic of Sri Lanka",
          "capital": "Colombo",
          "tld": ".lk",
          "currency": "LKR",
          "phone": "+94"
        }, {
          "continent": "Africa",
          "iso2": "SD",
          "iso3": "SDN",
          "name": "Sudan",
          "fullname": "The Republic of the Sudan",
          "capital": "Khartoum",
          "tld": ".sd",
          "currency": "SDD",
          "phone": "+249"
        }, {
          "continent": "South America",
          "iso2": "SR",
          "iso3": "SUR",
          "name": "Suriname",
          "fullname": "The Republic of Suriname",
          "capital": "Paramaribo",
          "tld": ".sr",
          "currency": "SRD",
          "phone": "+597"
        }, {
          "continent": "Africa",
          "iso2": "SZ",
          "iso3": "SWZ",
          "name": "Swaziland",
          "fullname": "The Kingdom of Swaziland",
          "capital": "Mbabane",
          "tld": ".sz",
          "currency": "SZL",
          "phone": "+268"
        }, {
          "continent": "Europe",
          "iso2": "SE",
          "iso3": "SWE",
          "name": "Sweden",
          "fullname": "The Kingdom of Sweden",
          "capital": "Stockholm",
          "tld": ".se",
          "currency": "SEK",
          "phone": "+46"
        }, {
          "continent": "Europe",
          "iso2": "CH",
          "iso3": "CHE",
          "name": "Switzerland",
          "fullname": "The Swiss Confederation",
          "capital": "Bern",
          "tld": ".ch",
          "currency": "CHF",
          "phone": "+41"
        }, {
          "continent": "Asia",
          "iso2": "SY",
          "iso3": "SYR",
          "name": "Syria",
          "fullname": "The Syrian Arab Republic",
          "capital": "Damascus",
          "tld": ".sy",
          "currency": "SYP",
          "phone": "+963"
        }, {
          "continent": "Asia",
          "iso2": "TW",
          "iso3": "TWN",
          "name": "Taiwan",
          "fullname": "Taiwan",
          "capital": "Taipei",
          "tld": ".tw",
          "currency": "TWD",
          "phone": "+886"
        }, {
          "continent": "Asia",
          "iso2": "TJ",
          "iso3": "TJK",
          "name": "Tajikistan",
          "fullname": "The Republic of Tajikistan",
          "capital": "Dushanbe",
          "tld": ".tj",
          "currency": "RUB",
          "phone": "+992"
        }, {
          "continent": "Africa",
          "iso2": "TZ",
          "iso3": "TZA",
          "name": "Tanzania",
          "fullname": "The United Republic of Tanzania",
          "capital": "Dar es Salaam",
          "tld": ".tz",
          "currency": "TZS",
          "phone": "+255"
        }, {
          "continent": "Asia",
          "iso2": "TH",
          "iso3": "THA",
          "name": "Thailand",
          "fullname": "The Kingdom of Thailand",
          "capital": "Bangkok",
          "tld": ".th",
          "currency": "THB",
          "phone": "+66"
        }, {
          "continent": "Africa",
          "iso2": "TG",
          "iso3": "TGO",
          "name": "Togo",
          "fullname": "The Togolese Republic",
          "capital": "Lomé",
          "tld": ".tg",
          "currency": "XOF",
          "phone": "+228"
        }, {
          "continent": "Oceania",
          "iso2": "TO",
          "iso3": "TON",
          "name": "Tonga",
          "fullname": "The Kingdom of Tonga",
          "capital": "Nukuʻalofa",
          "tld": ".to",
          "currency": "TOP",
          "phone": "+676"
        }, {
          "continent": "South America",
          "iso2": "TT",
          "iso3": "TTO",
          "name": "Trinidad And Tobago",
          "fullname": "The Republic of Trinidad and Tobago",
          "capital": "Port of Spain",
          "tld": ".tt",
          "currency": "TTD",
          "phone": "+1868"
        }, {
          "continent": "Africa",
          "iso2": "TN",
          "iso3": "TUN",
          "name": "Tunisia",
          "fullname": "The Republic of Tunisia",
          "capital": "Tunis",
          "tld": ".tn",
          "currency": "TND",
          "phone": "+216"
        }, {
          "continent": "Asia",
          "iso2": "TR",
          "iso3": "TUR",
          "name": "Turkey",
          "fullname": "The Republic of Turkey",
          "capital": "Ankara",
          "tld": ".tr",
          "currency": "TRY",
          "phone": "+90"
        }, {
          "continent": "Asia",
          "iso2": "TM",
          "iso3": "TKM",
          "name": "Turkmenistan",
          "fullname": "Turkmenistan",
          "capital": "Ashgabat",
          "tld": ".tm",
          "currency": "TMM",
          "phone": "+993"
        }, {
          "continent": "Oceania",
          "iso2": "TV",
          "iso3": "TUV",
          "name": "Tuvalu",
          "fullname": "Tuvalu",
          "capital": "Funafuti",
          "tld": ".tv",
          "currency": "TVD",
          "phone": "+688"
        }, {
          "continent": "Africa",
          "iso2": "UG",
          "iso3": "UGA",
          "name": "Uganda",
          "fullname": "The Republic of Uganda",
          "capital": "Kampala",
          "tld": ".ug",
          "currency": "UGX",
          "phone": "+256"
        }, {
          "continent": "Europe",
          "iso2": "UA",
          "iso3": "UKR",
          "name": "Ukraine",
          "fullname": "Ukraine",
          "capital": "Kiev",
          "tld": ".ua",
          "currency": "UAH",
          "phone": "+380"
        }, {
          "continent": "Asia",
          "iso2": "AE",
          "iso3": "UAE",
          "name": "United Arab Emirates",
          "fullname": "The United Arab Emirates",
          "capital": "Abu Dhabi",
          "tld": ".ae",
          "currency": "AED",
          "phone": "+971"
        }, {
          "continent": "Europe",
          "iso2": "GB",
          "iso3": "GBR",
          "name": "United Kingdom",
          "fullname": "The United Kingdom of Great Britain and Northern Ireland",
          "capital": "London",
          "tld": ".gb",
          "currency": "GBP",
          "phone": "+44"
        }, {
          "continent": "North America",
          "iso2": "US",
          "iso3": "USA",
          "name": "United States",
          "fullname": "The United States of America",
          "capital": "Washington, D.C.",
          "tld": ".us",
          "currency": "USD",
          "phone": "+1"
        }, {
          "continent": "South America",
          "iso2": "UY",
          "iso3": "URY",
          "name": "Uruguay",
          "fullname": "The Eastern Republic of Uruguay",
          "capital": "Montevideo",
          "tld": ".uy",
          "currency": "UYU",
          "phone": "+598"
        }, {
          "continent": "Asia",
          "iso2": "UZ",
          "iso3": "UZB",
          "name": "Uzbekistan",
          "fullname": "The Republic of Uzbekistan",
          "capital": "Tashkent",
          "tld": ".uz",
          "currency": "UZS",
          "phone": "+998"
        }, {
          "continent": "Oceania",
          "iso2": "VU",
          "iso3": "VUT",
          "name": "Vanuatu",
          "fullname": "The Republic of Vanuatu",
          "capital": "Port Vila",
          "tld": ".vu",
          "currency": "VUV",
          "phone": "+678"
        }, {
          "continent": "South America",
          "iso2": "VE",
          "iso3": "VEN",
          "name": "Venezuela",
          "fullname": "The Bolivarian Republic of Venezuela",
          "capital": "Caracas",
          "tld": ".ve",
          "currency": "VEB",
          "phone": "+58"
        }, {
          "continent": "Asia",
          "iso2": "VN",
          "iso3": "VNM",
          "name": "Vietnam",
          "fullname": "The Socialist Republic of Viet Nam",
          "capital": "Hanoi",
          "tld": ".vn",
          "currency": "VND",
          "phone": "+84"
        }, {
          "continent": "North America",
          "iso2": "VG",
          "iso3": "VGB",
          "name": "Virgin Islands, British",
          "fullname": "British Virgin Islands",
          "capital": "Road Town",
          "tld": ".vg",
          "currency": "USD",
          "phone": "+1284"
        }, {
          "continent": "South America",
          "iso2": "VI",
          "iso3": "VIR",
          "name": "Virgin Islands, US",
          "fullname": "U.S. Virgin Islands",
          "capital": "Charlotte Amalie",
          "tld": ".vi",
          "currency": "USD",
          "phone": "+1340"
        }, {
          "continent": "Africa",
          "iso2": "EH",
          "iso3": "ESH",
          "name": "Western Sahara",
          "fullname": "Western Sahara",
          "capital": "El-Aaiún",
          "tld": ".eh",
          "currency": "MAD",
          "phone": "+212"
        }, {
          "continent": "Asia",
          "iso2": "YE",
          "iso3": "YEM",
          "name": "Yemen",
          "fullname": "The Republic of Yemen",
          "capital": "Sana’a",
          "tld": ".ye",
          "currency": "YER",
          "phone": "+967"
        }, {
          "continent": "Africa",
          "iso2": "ZM",
          "iso3": "ZMB",
          "name": "Zambia",
          "fullname": "The Republic of Zambia",
          "capital": "Lusaka",
          "tld": ".zm",
          "currency": "ZMK",
          "phone": "+260"
        }, {
          "continent": "Africa",
          "iso2": "ZW",
          "iso3": "ZWE",
          "name": "Zimbabwe",
          "fullname": "The Republic of Zimbabwe",
          "capital": "Harare",
          "tld": ".zw",
          "currency": "ZWD",
          "phone": "+263"
        }
      ]
    };

    /**
     * @author    : Adarsh Pastakia
     * @version   : 5.0.0
     * @copyright : 2018
     * @license   : MIT
     */

    String.prototype.interpolate = function(model) {
      return this.replace(/\${([^{}]*)}/g, function(a, b) {
        var r = model[b];
        return typeof r === "string" || typeof r === "number" ? r : a;
      });
    };

    String.prototype.ascii = function() {
      str = this.toString();
      if (isEmpty(str)) return "";
      var conversions = {};
      conversions["ae"] = "ä|æ|ǽ";
      conversions["oe"] = "ö|œ";
      conversions["ue"] = "ü";
      conversions["Ae"] = "Ä";
      conversions["Ue"] = "Ü";
      conversions["Oe"] = "Ö";
      conversions["A"] = "À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ";
      conversions["a"] = "à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª";
      conversions["C"] = "Ç|Ć|Ĉ|Ċ|Č";
      conversions["c"] = "ç|ć|ĉ|ċ|č";
      conversions["D"] = "Ð|Ď|Đ";
      conversions["d"] = "ð|ď|đ";
      conversions["E"] = "È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě";
      conversions["e"] = "è|é|ê|ë|ē|ĕ|ė|ę|ě";
      conversions["G"] = "Ĝ|Ğ|Ġ|Ģ";
      conversions["g"] = "ĝ|ğ|ġ|ģ";
      conversions["H"] = "Ĥ|Ħ";
      conversions["h"] = "ĥ|ħ";
      conversions["I"] = "Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ";
      conversions["i"] = "ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı";
      conversions["J"] = "Ĵ";
      conversions["j"] = "ĵ";
      conversions["K"] = "Ķ";
      conversions["k"] = "ķ";
      conversions["L"] = "Ĺ|Ļ|Ľ|Ŀ|Ł";
      conversions["l"] = "ĺ|ļ|ľ|ŀ|ł";
      conversions["N"] = "Ñ|Ń|Ņ|Ň";
      conversions["n"] = "ñ|ń|ņ|ň|ŉ";
      conversions["O"] = "Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ";
      conversions["o"] = "ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º";
      conversions["R"] = "Ŕ|Ŗ|Ř";
      conversions["r"] = "ŕ|ŗ|ř";
      conversions["S"] = "Ś|Ŝ|Ş|Š";
      conversions["s"] = "ś|ŝ|ş|š|ſ";
      conversions["T"] = "Ţ|Ť|Ŧ";
      conversions["t"] = "ţ|ť|ŧ";
      conversions["U"] = "Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ";
      conversions["u"] = "ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ";
      conversions["Y"] = "Ý|Ÿ|Ŷ";
      conversions["y"] = "ý|ÿ|ŷ";
      conversions["W"] = "Ŵ";
      conversions["w"] = "ŵ";
      conversions["Z"] = "Ź|Ż|Ž";
      conversions["z"] = "ź|ż|ž";
      conversions["AE"] = "Æ|Ǽ";
      conversions["ss"] = "ß";
      conversions["IJ"] = "Ĳ";
      conversions["ij"] = "ĳ";
      conversions["OE"] = "Œ";
      conversions["f"] = "ƒ";
      for (var i in conversions) {
        var re = new RegExp(conversions[i], "g");
        str = str.replace(re, i);
      }
      return str;
    };

    /**
     * @author    : Adarsh Pastakia
     * @version   : 5.0.0
     * @copyright : 2018
     * @license   : MIT
     */

    const UA_EDGE = "ua-edge";
    const UA_OPERA = "ua-opera";
    const UA_CHROME = "ua-chrome";
    const UA_SAFARI = "ua-safari";
    const UA_FIREFOX = "ua-firefox";
    const UA_UNKNOWN = "ua-unknown";

    window.browserAgent = function() {
      var ua = (navigator.userAgent || "").toLowerCase();
      if (ua.indexOf("opr") >= 0) return UA_OPERA;
      else if (ua.indexOf("edge") >= 0) return UA_EDGE;
      else if (ua.indexOf("chrome") >= 0) return UA_CHROME;
      else if (ua.indexOf("safari") >= 0) return UA_SAFARI;
      else if (ua.indexOf("firefox") >= 0) return UA_FIREFOX;
      else return UA_UNKNOWN;
    };

    window.isTrue = function(b) {
      return /^(true|yes|1|y|on)$/i.test(b);
    };
    window.isFalse = function(b) {
      return /^(false|no|0|n|off)$/i.test(b);
    };
    window.isNull = function(a) {
      return a === undefined || a === null;
    };
    window.isEmpty = function(a) {
      if (typeof a === "number") return false;
      if (typeof a === "boolean") return false;
      if (a instanceof Map || a instanceof Set) return a.size === 0;
      return a === undefined || a === null || a === "" || a.length === 0 || Object.keys(a).length == 0;
    };
    window.isArray = Array.isArray;
    window.isDate = function(a) {
      return a instanceof Date;
    };
    window.isString = function(a) {
      return typeof a === "string";
    };
    window.isNumber = function(a) {
      return typeof a === "number" && Number.isInteger(a);
    };
    window.isDecimal = function(a) {
      return typeof a === "number";
    };
    window.isObject = function(a) {
      return a && typeof a === "object";
    };
    window.isFunction = function(a) {
      return typeof a === "function";
    };

    window.fn = () => null;
    window.getView = el => (el.au && el.au.controller ? el.au.controller.view : null);
    window.getViewModel = el => (el.au && el.au.controller ? el.au.controller.viewModel : null);
    window.getSlotViewModel = el => el.au["au-slot"].container.parent.viewModel;
    window.getComposeViewModel = el =>
      el.au && el.au.controller ? el.au.controller.viewModel.currentViewModel : null;

    window.isRtl = function(el) {
      rtl = false;
      do {
        if ((el.dir || el.style.direction) == "rtl") return true;
        if ((el.dir || el.style.direction) == "ltr") return false;
        el = el.parentElement;
      } while (el != null);
      return false;
    };

    window.hasParent = function(el, parent) {
      do {
        if (el === parent) return true;
        el = el.parentElement;
      } while (el !== null);
      return false;
    };

    window.getParentByTag = function(el, selector, last) {
      do {
        if (last && last instanceof Element && el === last) return null;
        if (
          last &&
          typeof last === "string" &&
          (el.classList.contains(last) || el.tagName.toLowerCase() === last.toLowerCase())
        )
          return null;
        if (el.tagName.toLowerCase() === selector.toLowerCase()) return el;
        el = el.parentElement;
      } while (el !== null);
      return null;
    };

    window.getParentByClass = function(el, selector, last) {
      do {
        if (last && last instanceof Element && el === last) return null;
        if (
          last &&
          typeof last === "string" &&
          (el.classList.contains(last) || el.tagName.toLowerCase() === last.toLowerCase())
        )
          return null;
        if (el.classList.contains(selector)) return el;
        el = el.parentElement;
      } while (el !== null);
      return null;
    };

    window.convertToPx = function(size, context) {
      var baseSize = "1";
      if ((size + "").indexOf("em") > -1)
        baseSize = getComputedStyle(context || document.documentElement).fontSize;
      if ((size + "").indexOf("rem") > -1)
        baseSize = getComputedStyle(document.documentElement).fontSize;
      if ((size + "").indexOf("vw") > -1 || (size + "").indexOf("%") > -1)
        baseSize = window.innerWidth / 100;
      return parseFloat(size) * parseFloat(baseSize);
    };

    window.Event.prototype.stopEvent = function(preventDefault = true) {
      if (preventDefault) {
        this.preventDefault();
      }
      this.stopPropagation();
      this.stopImmediatePropagation();
    };

    window.CustomEvent.prototype.stopEvent = function(preventDefault = true) {
      if (preventDefault) {
        this.preventDefault();
      }
      this.stopPropagation();
      this.stopImmediatePropagation();
    };

    var view$k = "<template class=\"ui-dropdown\">\n  <a data-active.bind=\"active\" disabled.bind=\"disabled\" click.trigger=\"toggleDrop($event)\" class=\"ui-dropdown__link\" data-open.bind=\"dropEl.isOpen\" data-disabled.bind=\"disabled\">\n    <ui-icon class=\"ui-dropdown__icon\" icon=\"${iconPrefix} ${model[iconProperty]}\" if.bind=\"iconProperty\"></ui-icon>\n    <div class=\"ui-input__error\" if.bind=\"errors && errors.length\">\n      <ui-svg-icon icon=\"alert\"></ui-svg-icon>\n      <ul>\n        <li repeat.for=\"err of errors\">${err}</li>\n      </ul>\n    </div>\n    <span class=\"ui-dropdown__label\">${selectedLabel}</span>\n    <ui-svg-icon class=\"ui-dropdown__caret\" icon=\"caret\"></ui-svg-icon>\n  </a>\n  <ui-drop view-model.ref=\"dropEl\">\n    <div>\n      <template repeat.for=\"option of options\">\n        <div class=\"ui-list__item ${(option[valueProperty] || option) === value?'ui-list__item--selected':''}\" click.trigger=\"select(option)\">\n          <ui-icon if.bind=\"iconProperty\" icon=\"${iconPrefix} ${option[iconProperty]}\"></ui-icon>\n          ${option[labelProperty] || option}\n        </div>\n      </template>\n    </div>\n  </ui-drop>\n</template>\n";

    var UIDropdown = (function () {
        function UIDropdown(element) {
            this.element = element;
            this.value = undefined;
            this.name = "";
            this.placeholder = "Select";
            this.labelProperty = "";
            this.valueProperty = "";
            this.iconProperty = "";
            this.iconPrefix = "";
            this.disabled = false;
            this.model = undefined;
        }
        UIDropdown.prototype.attached = function () {
            this.dropEl.tether(this.element);
            this.valueChanged();
        };
        UIDropdown.prototype.valueChanged = function () {
            var _this = this;
            if (this.options) {
                this.model = this.options.find(function (o) { return (o[_this.valueProperty] || o) === _this.value; });
            }
        };
        UIDropdown.prototype.select = function (model) {
            this.model = model;
            this.value = this.model[this.valueProperty] || this.model;
        };
        Object.defineProperty(UIDropdown.prototype, "selectedLabel", {
            get: function () {
                return !isNull(this.model) ? this.model[this.labelProperty] || this.model : this.placeholder;
            },
            enumerable: true,
            configurable: true
        });
        UIDropdown.prototype.toggleDrop = function ($event) {
            $event.stopEvent();
            var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
            var afterEvent = this.dropEl.isOpen ? "close" : "open";
            if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
                this.dropEl.toggleDrop();
                this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
            }
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UIDropdown.prototype, "errors", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDropdown.prototype, "name", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDropdown.prototype, "placeholder", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDropdown.prototype, "labelProperty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDropdown.prototype, "valueProperty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDropdown.prototype, "iconProperty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDropdown.prototype, "iconPrefix", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UIDropdown.prototype, "options", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIDropdown.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.computedFrom("model"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIDropdown.prototype, "selectedLabel", null);
        UIDropdown = __decorate([
            aureliaFramework.customElement("ui-dropdown"),
            aureliaFramework.inlineView(view$k),
            __metadata("design:paramtypes", [Element])
        ], UIDropdown);
        return UIDropdown;
    }());

    var view$l = "<template>\n  <div if.bind=\"$parent.innerOptions\" mouseout.trigger=\"hilightIndex = -1\">\n    <template repeat.for=\"option of innerOptions\">\n      <div if.bind=\"option.__type==='group'\" class=\"ui-list__title\">${option.label}</div>\n      <div else class.bind=\"listClass(option, $index, value, hilightIndex)\" with.bind=\"{option}\" ref=\"__el\" mouseover.trigger=\"hilightIndex = $index\" show.one-time=\"buildOption(option, __el, !inputValue)\" click.trigger=\"selectOption(option)\" data-model.bind=\"option\"></div>\n    </template>\n  </div>\n  <div if.bind=\"isLoading\" ui-padding ui-align=\"center\" ui-font=\"lg\" ui-color=\"gray\">\n    <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n  </div>\n  <div if.bind=\"isLoaded && innerOptions.length === 0\" ui-padding ui-color=\"gray\" ui-font=\"sm\">\n    ${noOptionsText}\n  </div>\n</template>\n";

    var ListContainer = (function () {
        function ListContainer() {
        }
        ListContainer = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.inlineView(view$l),
            aureliaFramework.processContent(function (compiler, resources, node, instruction) {
                instruction.inheritBindingContext = true;
                return true;
            })
        ], ListContainer);
        return ListContainer;
    }());

    var view$m = "<template>\n  <div class=\"ui-input__tags\" click.trigger=\"inputEl.focus()\">\n    <template if.bind=\"multiple\">\n      <div class=\"ui-tag\" repeat.for=\"m of model\">\n        <span with.bind=\"{m}\" show.one-time=\"buildOption(m, __el, true) & debounce\" ref=\"__el\"></span>\n        <span class=\"ui-tag__close\" click.trigger=\"removeOption(m)\">&#x00D7;</span>\n      </div>\n    </template>\n    <input ref=\"$parent.inputEl\" role=\"combo\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"inputValue\" input.trigger=\"filterOptions() & debounce\" keydown.trigger=\"checkKeyEvent($event)\" change.trigger=\"false\" focus.trigger=\"toggleDrop(true)\" blur.trigger=\"[canToggleDrop($event), resetQuery(true)] & debounce\">\n  </div>\n</template>\n";

    var ListInput = (function () {
        function ListInput() {
        }
        ListInput = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.inlineView(view$m),
            aureliaFramework.processContent(function (compiler, resources, node, instruction) {
                instruction.inheritBindingContext = true;
                return true;
            })
        ], ListInput);
        return ListInput;
    }());

    var KEY_DOWN = 40;
    var KEY_UP = 38;
    var BACKSPACE = 8;
    var ENTER = 13;
    var ListMaker = (function (_super) {
        __extends(ListMaker, _super);
        function ListMaker() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.value = undefined;
            _this.model = undefined;
            _this.name = "";
            _this.placeholder = "";
            _this.labelProperty = "";
            _this.valueProperty = "";
            _this.groupProperty = "";
            _this.options = [];
            _this.readonly = false;
            _this.disabled = false;
            _this.noOptionsText = "No Options";
            _this.multiple = false;
            _this.inputValue = "";
            _this.isLoaded = false;
            _this.isLoading = false;
            _this.isGrouped = false;
            _this.isFiltered = false;
            _this.ignoreChange = false;
            _this.allowAny = false;
            _this.hilightIndex = -1;
            return _this;
        }
        ListMaker.prototype.valueChanged = function () {
            var _this = this;
            if (this.ignoreChange) {
                return;
            }
            if (!this.valueProperty) {
                this.model = this.value;
                if (!this.multiple) {
                    this.inputValue = this.value ? this.value[this.labelProperty] || this.value : "";
                }
                return;
            }
            if (this.options && !isNull(this.value)) {
                if (this.multiple) {
                    this.model = this.options.filter(function (o) {
                        if (_this.matcher) {
                            return _this.value.some(function (value) {
                                return _this.matcher({ option: o, value: value });
                            });
                        }
                        else {
                            return _this.value.includes(o[_this.valueProperty] || o);
                        }
                    });
                }
                else {
                    this.model = this.options.find(function (o) {
                        if (_this.matcher) {
                            return _this.matcher({ option: o, value: _this.value });
                        }
                        else {
                            return _this.value === (o[_this.valueProperty] || o);
                        }
                    });
                }
            }
            else {
                this.model = null;
                this.inputValue = "";
            }
            if (!this.dropEl) {
                UIInternal.queueTask(function () {
                    var selected = _this.listContainer.querySelector(".ui-list__item--selected");
                    if (selected) {
                        selected.scrollIntoView({ block: "nearest" });
                    }
                });
            }
            this.resetQuery();
        };
        ListMaker.prototype.toggleDrop = function (open) {
            var _this = this;
            if (this.dropEl) {
                if (open === true && this.dropEl.isOpen) {
                    UIInternal.queueMicroTask(function () { return _this.dropEl.updatePosition(); });
                    return;
                }
                if (_super.prototype.toggleDrop.call(this, open)) {
                    this.loadOptions();
                }
            }
        };
        ListMaker.prototype.loadOptions = function () {
            if (this.query) {
                this.fetchOptions();
            }
            else {
                this.buildOptions(this.options);
            }
        };
        ListMaker.prototype.filterOptions = function () {
            var _this = this;
            this.isFiltered = !!this.inputValue;
            if (this.query) {
                this.fetchOptions(this.inputValue);
            }
            else {
                var query_1 = this.inputValue.ascii().toLowerCase();
                var options = this.options.filter(function (o) {
                    return (o[_this.labelProperty] || o)
                        .toString()
                        .ascii()
                        .toLowerCase()
                        .includes(query_1);
                });
                this.buildOptions(options);
            }
        };
        ListMaker.prototype.selectOption = function (model) {
            var _this = this;
            this.ignoreChange = true;
            this.hilightIndex = -1;
            if (this.multiple) {
                if (!(this.value || []).includes(model[this.valueProperty] || model)) {
                    this.value = this.value
                        ? __spread(this.value, [model[this.valueProperty] || model]) : [model[this.valueProperty] || model];
                    this.model = this.model ? __spread(this.model, [model]) : [model];
                }
                this.inputValue = "";
                this.inputEl.focus();
                this.inputEl.select();
            }
            else {
                if (this.labelProperty) {
                    model.$label = model[this.labelProperty] || model;
                }
                this.value = model[this.valueProperty] || model;
                this.model = model;
                this.resetQuery();
                if (this.dropEl) {
                    this.dropEl.closeDrop();
                }
            }
            if (this.isFiltered) {
                this.isFiltered = false;
                this.loadOptions();
            }
            this.element.dispatchEvent(UIInternal.createEvent("change", this.value));
            this.element.dispatchEvent(UIInternal.createEvent("select", this.model));
            setTimeout(function () { return (_this.ignoreChange = false); }, 500);
        };
        ListMaker.prototype.removeOption = function (model) {
            var _this = this;
            this.ignoreChange = true;
            this.model = __spread(this.model.filter(function (m) { return m !== model; }));
            this.value = this.value.filter(function (m) { return m !== (model[_this.valueProperty] || model); });
            setTimeout(function () { return (_this.ignoreChange = false); }, 500);
        };
        ListMaker.prototype.resetQuery = function (clearFilter) {
            this.hilightIndex = -1;
            if (this.multiple) {
                this.inputValue = "";
            }
            else {
                this.inputValue = this.model
                    ? (this.model[this.labelProperty] || this.model).replace("<u>", "").replace("</u>", "")
                    : "";
            }
            if (clearFilter && this.isFiltered) {
                this.isFiltered = false;
                this.loadOptions();
            }
        };
        ListMaker.prototype.clear = function () {
            this.model = null;
            this.value = null;
            this.inputValue = "";
            this.inputEl.focus();
            if (this.isFiltered) {
                this.loadOptions();
            }
        };
        ListMaker.prototype.fetchOptions = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.showLoading();
                            return [4, this.query({ query: query })];
                        case 1:
                            result = _a.sent();
                            if (!this.options) {
                                this.options = result;
                            }
                            this.buildOptions(result || []);
                            return [2];
                    }
                });
            });
        };
        ListMaker.prototype.showLoading = function () {
            var _this = this;
            this.isLoaded = false;
            this.isLoading = true;
            this.innerOptions = [];
            if (this.dropEl) {
                UIInternal.queueMicroTask(function () { return _this.dropEl.updatePosition(); });
            }
        };
        ListMaker.prototype.buildOptions = function (options, silent) {
            var _this = this;
            if (silent === void 0) { silent = false; }
            if (!silent) {
                this.showLoading();
            }
            var optionsClone = options.map(function (o) { return (isString(o) ? "" + o : __assign({}, o)); });
            UIInternal.queueTask(function () {
                _this.isLoading = false;
                if (_this.groupProperty) {
                    var groups = optionsClone
                        .sortBy([_this.groupProperty, _this.labelProperty])
                        .groupBy(_this.groupProperty);
                    groups.forEach(function (items, label) {
                        var _a;
                        return (_a = _this.innerOptions).push.apply(_a, __spread([{ __type: "group", label: label }], items));
                    });
                }
                else {
                    _this.innerOptions = optionsClone.sortBy(_this.labelProperty);
                }
                _this.isLoaded = true;
                UIInternal.queueTask(function () {
                    var selected = _this.listContainer.querySelector(".ui-list__item--selected");
                    if (selected) {
                        selected.scrollIntoView({ block: "nearest" });
                    }
                });
                if (_this.dropEl) {
                    UIInternal.queueTask(function () { return _this.dropEl.updatePosition(); });
                }
            });
        };
        ListMaker.prototype.listClass = function (option, index) {
            var _this = this;
            var classes = ["ui-list__item"];
            option.__selected = false;
            if (!this.multiple) {
                if (this.matcher) {
                    if (this.matcher({ option: option, value: this.value })) {
                        option.__selected = true;
                        classes.push("ui-list__item--selected");
                    }
                }
                else if ((option[this.valueProperty] || option) === this.value) {
                    option.__selected = true;
                    classes.push("ui-list__item--selected");
                }
            }
            else if (this.multiple && this.value) {
                if (this.matcher) {
                    this.value.forEach(function (value) {
                        if (_this.matcher({ option: option, value: value })) {
                            option.__selected = true;
                            classes.push("ui-list__item--disabled");
                        }
                    });
                }
                else if (this.value.includes(option[this.valueProperty] || option)) {
                    option.__selected = true;
                    classes.push("ui-list__item--disabled");
                }
            }
            if (this.hilightIndex === index) {
                classes.push("ui-list__item--hilight");
            }
            return classes.join(" ");
        };
        ListMaker.prototype.markOption = function (option) {
            var lbl = option[this.labelProperty] || "" + option;
            if (isEmpty(this.inputValue)) {
                return lbl;
            }
            var rx = new RegExp(this.inputValue, "i");
            var asc = lbl.toString().ascii();
            if (rx.test(asc)) {
                var start = asc.search(rx);
                lbl =
                    lbl.substr(0, start) +
                        "<u>" +
                        lbl.substr(start, this.inputValue.length) +
                        "</u>" +
                        lbl.substr(start + this.inputValue.length);
            }
            return lbl;
        };
        ListMaker.prototype.buildOption = function (option, el, unmark) {
            if (unmark === void 0) { unmark = false; }
            if (el) {
                el.innerHTML = "";
                var tpl = this.template
                    ? this.template.outerHTML
                    : "<template><div innerhtml.bind=\"$label\"></div></template>";
                var model = {
                    $label: this.isFiltered && !unmark
                        ? this.markOption(option)
                        : option[this.labelProperty] || option,
                    $model: option,
                    $value: option[this.valueProperty] || option
                };
                var view = UIInternal.compileTemplate(tpl, model);
                view.appendNodesTo(el);
            }
            return true;
        };
        ListMaker.prototype.checkKeyEvent = function ($event) {
            var _this = this;
            if ([KEY_DOWN, KEY_UP].includes($event.keyCode)) {
                if (this.dropEl && !this.dropEl.isOpen) {
                    this.dropEl.toggleDrop();
                }
                if ($event.keyCode === KEY_DOWN) {
                    this.hilightIndex =
                        this.hilightIndex === -1 && this.model
                            ? this.innerOptions.indexOf(this.model)
                            : this.hilightIndex >= this.innerOptions.length || this.hilightIndex < -1
                                ? -1
                                : this.hilightIndex;
                    while (this.hilightIndex + 1 !== this.innerOptions.length &&
                        (this.innerOptions[this.hilightIndex + 1].__type === "group" ||
                            this.innerOptions[this.hilightIndex + 1].__selected ||
                            this.innerOptions[this.hilightIndex + 1].__disabled)) {
                        this.hilightIndex++;
                    }
                    this.hilightIndex = this.hilightIndex + 1;
                }
                if ($event.keyCode === KEY_UP) {
                    this.hilightIndex =
                        this.hilightIndex === -1 && this.model
                            ? this.innerOptions.indexOf(this.model)
                            : this.hilightIndex === -1
                                ? this.innerOptions.length
                                : this.hilightIndex;
                    while (this.hilightIndex - 1 > 0 &&
                        (this.innerOptions[this.hilightIndex - 1].__type === "group" ||
                            this.innerOptions[this.hilightIndex - 1].__selected ||
                            this.innerOptions[this.hilightIndex - 1].__disabled)) {
                        this.hilightIndex--;
                    }
                    this.hilightIndex = this.hilightIndex - 1;
                }
                UIInternal.queueTask(function () {
                    var selected = _this.listContainer.querySelector(".ui-list__item--hilight");
                    if (selected) {
                        selected.scrollIntoView({ block: "nearest" });
                    }
                });
                $event.stopEvent();
            }
            else if (this.hilightIndex !== -1 && $event.keyCode === ENTER) {
                this.selectOption(this.innerOptions[this.hilightIndex]);
                $event.stopEvent();
            }
            else if (this.allowAny && !!this.inputValue.trim() && $event.keyCode === ENTER) {
                this.selectOption(this.inputValue);
                $event.stopEvent();
            }
            else if (this.multiple && $event.keyCode === BACKSPACE) {
                if (this.model.length > 0 && this.inputValue.length === 0) {
                    $event.stopEvent();
                    this.removeOption(this.model.last());
                }
            }
            else {
                this.fireEnter($event);
            }
            return true;
        };
        return ListMaker;
    }(BaseInput));

    var view$n = "<template class=\"ui-input ui-list ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper model.bind=\"$this\">\n    <slot></slot>\n    <list-input></list-input>\n    <div class=\"ui-list__container\" ref=\"listContainer\" css.bind=\"{height}\">\n      <list-container></list-container>\n    </div>\n  </input-wrapper>\n</template>\n";

    var UIList = (function (_super) {
        __extends(UIList, _super);
        function UIList(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.value = undefined;
            _this.model = undefined;
            _this.name = "";
            _this.height = "20em";
            _this.placeholder = "";
            _this.labelProperty = "";
            _this.valueProperty = "";
            _this.groupProperty = "";
            _this.readonly = false;
            _this.disabled = false;
            _this.noOptionsText = "No Options";
            _this.multiple = element.hasAttribute("multiple");
            _this.allowAny = element.hasAttribute("allow-any");
            _this.template = _this.element.querySelector("template");
            return _this;
        }
        UIList.prototype.bind = function () {
            var _this = this;
            if (!isNull(this.model)) {
                if (this.multiple) {
                    this.value = this.multiple
                        ? this.model.map(function (o) { return o[_this.valueProperty] || o; })
                        : this.model[this.labelProperty] || this.model;
                }
            }
            this.isGrouped = !!this.groupProperty;
            this.valueChanged();
        };
        UIList.prototype.attached = function () {
            this.loadOptions();
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIList.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIList.prototype, "model", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UIList.prototype, "errors", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIList.prototype, "name", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIList.prototype, "height", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIList.prototype, "placeholder", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIList.prototype, "labelProperty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIList.prototype, "valueProperty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIList.prototype, "groupProperty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UIList.prototype, "query", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UIList.prototype, "options", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIList.prototype, "readonly", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIList.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIList.prototype, "noOptionsText", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UIList.prototype, "matcher", void 0);
        UIList = __decorate([
            aureliaFramework.customElement("ui-list"),
            aureliaFramework.viewResources(InputWrapper, ListInput, ListContainer),
            aureliaFramework.inlineView(view$n),
            __metadata("design:paramtypes", [Element])
        ], UIList);
        return UIList;
    }(ListMaker));

    var view$o = "<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <list-input></list-input>\n  </input-wrapper>\n  <ui-drop view-model.ref=\"dropEl\" class=\"ui-list\" close.trigger=\"resetQuery()\">\n    <div ref=\"listContainer\" class=\"ui-list__container\">\n      <list-container></list-container>\n    </div>\n  </ui-drop>\n</template>\n";

    var UISelect = (function (_super) {
        __extends(UISelect, _super);
        function UISelect(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.value = undefined;
            _this.model = undefined;
            _this.name = "";
            _this.placeholder = "";
            _this.labelProperty = "";
            _this.valueProperty = "";
            _this.groupProperty = "";
            _this.readonly = false;
            _this.disabled = false;
            _this.noOptionsText = "No Options";
            _this.dropHandle = "caret";
            _this.multiple = element.hasAttribute("multiple");
            _this.allowAny = element.hasAttribute("allow-any");
            _this.template = _this.element.querySelector("template");
            return _this;
        }
        UISelect.prototype.attached = function () {
            this.dropEl.attachToViewport = isTrue(this.element.getAttribute("attach-to-viewport"));
            this.dropEl.closeOnClick = !this.multiple;
            this.dropEl.tether(this.element);
        };
        UISelect.prototype.bind = function () {
            var _this = this;
            if (!isNull(this.model)) {
                if (this.multiple) {
                    this.value = this.multiple
                        ? this.model.map(function (o) { return o[_this.valueProperty] || o; })
                        : this.model[this.labelProperty] || this.model;
                }
            }
            this.isGrouped = !!this.groupProperty;
            this.valueChanged();
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UISelect.prototype, "value", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UISelect.prototype, "model", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UISelect.prototype, "errors", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISelect.prototype, "name", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISelect.prototype, "placeholder", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISelect.prototype, "labelProperty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISelect.prototype, "valueProperty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISelect.prototype, "groupProperty", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UISelect.prototype, "query", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UISelect.prototype, "options", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UISelect.prototype, "readonly", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UISelect.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISelect.prototype, "noOptionsText", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UISelect.prototype, "matcher", void 0);
        UISelect = __decorate([
            aureliaFramework.customElement("ui-select"),
            aureliaFramework.viewResources(InputWrapper, ListInput, ListContainer),
            aureliaFramework.inlineView(view$o),
            __metadata("design:paramtypes", [Element])
        ], UISelect);
        return UISelect;
    }(ListMaker));

    var Lists = [UIList, UISelect, UIDropdown];

    var UIBreadcrumbs = (function () {
        function UIBreadcrumbs(element) {
            var _this = this;
            this.element = element;
            this.items = [];
            this.hasOverflow = false;
            this.obResize = new ResizeObserver(function () { return _this.calculateOverflow(); });
            this.obResize.observe(element);
        }
        UIBreadcrumbs.prototype.attached = function () {
            var _this = this;
            UIInternal.queueTask(function () { return _this.calculateOverflow(); });
        };
        UIBreadcrumbs.prototype.detached = function () {
            this.obResize.disconnect();
        };
        UIBreadcrumbs.prototype.calculateOverflow = function () {
            this.resetOverflow();
            if (this.wrapperEl.offsetWidth > this.element.offsetWidth) {
                this.hasOverflow = true;
                while (this.wrapperEl.offsetWidth > this.element.offsetWidth - 50) {
                    this.overflowEl.appendChild(this.wrapperEl.children[0]);
                }
            }
            else {
                this.hasOverflow = false;
            }
        };
        UIBreadcrumbs.prototype.resetOverflow = function () {
            var _this = this;
            this.hasOverflow = false;
            __spread(this.overflowEl.children).reverse().forEach(function (child) {
                _this.wrapperEl.insertBefore(child, _this.wrapperEl.children[0]);
            });
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIBreadcrumbs.prototype, "items", void 0);
        UIBreadcrumbs = __decorate([
            aureliaFramework.customElement("ui-breadcrumbs"),
            aureliaFramework.inlineView("<template class=\"ui-breadcrumbs\">\n  <div class=\"ui-breadcrumbs__overflow\" show.bind=\"hasOverflow\">\n  <ui-button type=\"tool\" size=\"xs\" no-caret ui-theme=\"secondary\">\n    <ui-svg-icon class=\"ui-btn__icon\" icon=\"ellipsis\"></ui-svg-icon>\n    <ui-drop close-on-click=\"false\"><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n  </ui-button>\n  </div>\n  <div class=\"ui-breadcrumbs__wrapper\" ref=\"wrapperEl\">\n  <template repeat.for=\"item of items\">\n    <template if.bind=\"item.href\">\n    <a class=\"ui-breadcrumbs__link\" href.bind=\"item.href\"><ui-icon if.bind=\"item.icon\" icon.bind=\"item.icon\"></ui-icon>${item.label}</a>\n    </template>\n    <template else>\n    <span class=\"ui-breadcrumbs__label\"><ui-icon if.bind=\"item.icon\" icon.bind=\"item.icon\"></ui-icon>${item.label}</span>\n    </template>\n  </template>\n  </div>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], UIBreadcrumbs);
        return UIBreadcrumbs;
    }());

    var MenuItem = (function () {
        function MenuItem() {
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], MenuItem.prototype, "item", void 0);
        MenuItem = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("menu-item"),
            aureliaFramework.inlineView("<template>\n  <template if.bind=\"item.group\">\n    <ui-menu-group label.bind=\"item.group\">\n      <menu-item repeat.for=\"groupItem of item.items\" item.bind=\"groupItem\"></menu-item>\n    </ui-menu-group>\n  </template>\n  <template if.bind=\"item.label\">\n    <ui-menu-item label.bind=\"item.label\" href.bind=\"item.href\"\n    icon.bind=\"item.icon\" icon-color.bind=\"item.iconColor\" ui-badge=\"value.bind:item.badge; theme.bind:item.badgeTheme;\"\n    disabled.bind=\"typeof item.disabled === 'function' ? item.disabled() : item.disabled\"\n    active.bind=\"typeof item.active === 'function' ? item.active() : item.active\"\n    hide.bind=\"typeof item.hidden === 'function' ? item.hidden() : item.hidden\"\n    click.trigger=\"item.handler && item.handler()\">\n      <ui-drop if.bind=\"item.items\">\n        <ui-menu>\n          <menu-item repeat.for=\"innerItem of item.items\" item.bind=\"innerItem\"></menu-item>\n        </ui-menu>\n      </ui-drop>\n    </ui-menu-item>\n  </template>\n  <template if.bind=\"item === '-'\">\n    <ui-divider></ui-divider>\n  </template>\n</template>")
        ], MenuItem);
        return MenuItem;
    }());

    var UIMenu = (function () {
        function UIMenu(element) {
            this.element = element;
        }
        UIMenu.prototype.attached = function () {
            var active = this.element.querySelector(".ui-menu__item__link[data-active='true']");
            if (active) {
                active.scrollIntoView({ block: "center", inline: "nearest" });
            }
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UIMenu.prototype, "menuItems", void 0);
        UIMenu = __decorate([
            aureliaFramework.customElement("ui-menu"),
            aureliaFramework.viewResources(MenuItem),
            aureliaFramework.inlineView("<template class=\"ui-menu\"><slot>\n  <template if.bind=\"menuItems\">\n    <menu-item repeat.for=\"item of menuItems\" item.bind=\"item\"></menu-item>\n  </template>\n</slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIMenu);
        return UIMenu;
    }());

    var UIMenuGroup = (function () {
        function UIMenuGroup(element) {
            this.element = element;
            this.label = "";
            this.collapsed = false;
        }
        UIMenuGroup.prototype.attached = function () {
            if (this.element.hasAttribute("collapsible")) {
                this.vmElement.classList.add("ui-menu__group--collapsible");
            }
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIMenuGroup.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIMenuGroup.prototype, "collapsed", void 0);
        UIMenuGroup = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-menu-group"),
            aureliaFramework.inlineView("<template><fieldset class=\"ui-menu__group\" data-collapsed.bind=\"collapsed\" ref=\"vmElement\">\n    <legend class=\"ui-menu__group__label\" if.bind=\"label\" innerhtml.bind=\"label\" click.trigger=\"collapsed = !collapsed\"></legend>\n    <div class=\"ui-menu__group__container\"><slot></slot></div>\n  </fieldset></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIMenuGroup);
        return UIMenuGroup;
    }());

    var view$p = "<template class=\"ui-menu__item\" value.bind=\"value\">\n  <a ref=\"badgeEl\" data-active.bind=\"active\" data-disabled.bind=\"disabled\" click.trigger=\"fireClick($event)\" class=\"ui-menu__item__link\" data-open.bind=\"!split && dropEl.isOpen\">\n    <ui-icon class=\"ui-menu__item__icon\" icon.bind=\"icon\" if.bind=\"icon\" ui-color.bind=\"iconColor\"></ui-icon>\n    <span class=\"ui-menu__item__label\">\n      <slot>${label}</slot>\n    </span>\n    <ui-svg-icon if.bind=\"!split && hasDrop\" class=\"ui-menu__item__caret\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <a data-active.bind=\"split && dropEl.isOpen\" class=\"ui-menu__item__caret ui-menu__item__caret--split\" if.bind=\"split && hasDrop\" click.trigger=\"toggleDrop()\" data-open.bind=\"split && dropEl.isOpen\">\n    <ui-svg-icon class=\"ui-icon__caret split\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <slot name=\"ui-drop\"></slot>\n</template>\n";

    var UIMenuItem = (function () {
        function UIMenuItem(element) {
            this.element = element;
            this.label = "";
            this.href = "";
            this.icon = "";
            this.iconColor = "";
            this.active = false;
            this.disabled = false;
            this.dropIcon = "caret";
            this.isInMenubar = false;
            this.hasDrop = false;
            this.split = element.hasAttribute("split");
        }
        UIMenuItem.prototype.attached = function () {
            var _this = this;
            UIInternal.queueTask(function () {
                _this.hasDrop = !!_this.elDropdown;
                _this.isInMenubar = !!getParentByClass(_this.element, "ui-menu__bar");
                var isInDropdown = !!getParentByClass(_this.element, "ui-drop__body");
                if (_this.hasDrop) {
                    _this.dropEl = getSlotViewModel(_this.elDropdown);
                    if (isInDropdown || !_this.isInMenubar) {
                        _this.dropIcon = "page-next";
                        _this.dropEl.position = "tl";
                        _this.dropEl.anchorPosition = "tr";
                        _this.dropEl.stretch = false;
                        _this.dropEl.attachToViewport = isInDropdown;
                    }
                    _this.dropEl.tether(_this.element);
                }
            });
            this.hrefChanged();
        };
        UIMenuItem.prototype.hrefChanged = function () {
            if (this.badgeEl) {
                if (this.href) {
                    this.badgeEl.href = this.href;
                }
                else if (this.badgeEl.attributes.getNamedItem("href")) {
                    this.badgeEl.attributes.removeNamedItem("href");
                }
            }
        };
        UIMenuItem.prototype.activeChanged = function () {
            if (this.active) {
                this.element.scrollIntoView({ block: "center", inline: "nearest" });
            }
        };
        UIMenuItem.prototype.fireClick = function ($event) {
            if (!this.href) {
                $event.stopEvent();
                if (this.hasDrop && !this.split) {
                    this.toggleDrop();
                    return false;
                }
                return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
            }
        };
        UIMenuItem.prototype.toggleDrop = function () {
            var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
            var afterEvent = this.dropEl.isOpen ? "close" : "open";
            if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
                this.dropEl.toggleDrop();
                this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
            }
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIMenuItem.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIMenuItem.prototype, "href", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIMenuItem.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIMenuItem.prototype, "iconColor", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIMenuItem.prototype, "id", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIMenuItem.prototype, "active", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIMenuItem.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.child(".ui-drop"),
            __metadata("design:type", Element)
        ], UIMenuItem.prototype, "elDropdown", void 0);
        UIMenuItem = __decorate([
            aureliaFramework.customElement("ui-menu-item"),
            aureliaFramework.inlineView(view$p),
            __metadata("design:paramtypes", [Element])
        ], UIMenuItem);
        return UIMenuItem;
    }());

    var UIMenubar = (function () {
        function UIMenubar(element) {
            var _this = this;
            this.element = element;
            this.hasOverflow = false;
            this.obResize = new ResizeObserver(function () { return _this.calculateOverflow(); });
            this.obResize.observe(element);
        }
        UIMenubar.prototype.attached = function () {
            var _this = this;
            UIInternal.queueTask(function () { return _this.calculateOverflow(); });
        };
        UIMenubar.prototype.detached = function () {
            this.obResize.disconnect();
        };
        UIMenubar.prototype.calculateOverflow = function () {
            var _this = this;
            var _a;
            this.resetOverflow();
            var overflowItems = [];
            var isRtl = window.getComputedStyle(this.wrapperEl).direction === "rtl";
            __spread(this.wrapperEl.children).reverse().forEach(function (item) {
                if ((!isRtl && _this.wrapperEl.offsetWidth - (item.offsetLeft + item.offsetWidth) <= 30) ||
                    (isRtl && _this.wrapperEl.offsetWidth - item.offsetLeft >= _this.wrapperEl.offsetWidth - 30)) {
                    overflowItems.splice(0, 0, item);
                    _this.hasOverflow = true;
                }
            });
            (_a = this.overflowEl).append.apply(_a, __spread(overflowItems));
        };
        UIMenubar.prototype.resetOverflow = function () {
            var _this = this;
            this.hasOverflow = false;
            this.overflowEl.children.forEach(function (child) {
                _this.wrapperEl.appendChild(child);
            });
        };
        UIMenubar = __decorate([
            aureliaFramework.customElement("ui-menubar"),
            aureliaFramework.inlineView("<template class=\"ui-menu__bar\">\n  <div class=\"ui-menu__bar__wrapper\" ref=\"wrapperEl\"><slot></slot></div>\n  <ui-button type=\"tool\" size=\"xs\" no-caret class=\"ui-menu__overflow\" ui-theme=\"secondary\" show.bind=\"hasOverflow\">\n    <ui-svg-icon class=\"ui-btn__icon\" icon=\"overflow\"></ui-svg-icon>\n    <ui-drop close-on-click=\"false\"><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n  </ui-button>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], UIMenubar);
        return UIMenubar;
    }());

    var Menus = [UIMenu, UIMenuGroup, UIMenuItem, UIMenubar, UIBreadcrumbs];

    var UIContent = (function () {
        function UIContent(element) {
            this.obResize = new ResizeObserver(function () {
                return element.dispatchEvent(UIInternal.createEvent("resize"));
            });
            this.obResize.observe(element);
        }
        UIContent.prototype.detached = function () {
            this.obResize.disconnect();
        };
        UIContent = __decorate([
            aureliaFramework.customElement("ui-content"),
            aureliaFramework.inlineView("<template class=\"ui-section__content\" ref=\"vmElement\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIContent);
        return UIContent;
    }());

    var UIPage = (function () {
        function UIPage() {
            this.pageTitle = "";
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPage.prototype, "pageTitle", void 0);
        UIPage = __decorate([
            aureliaFramework.customElement("ui-page"),
            aureliaFramework.inlineView("<template class=\"ui-page au-animate animate-slide-in-right animate-slide-out-left\" role=\"main\">\n  <div class=\"ui-page__title\" if.bind=\"pageTitle\">${pageTitle}</div>\n  <slot name=\"page-alert\"></slot>\n  <div class=\"ui-page__body\"><slot></slot></div>\n</template>")
        ], UIPage);
        return UIPage;
    }());

    var UISection = (function () {
        function UISection(element) {
            if (element.hasAttribute("centered")) {
                element.classList.add("ui-section--centered");
            }
        }
        UISection = __decorate([
            aureliaFramework.customElement("ui-section"),
            aureliaFramework.inlineView("<template class=\"ui-section au-animate animate-slide-in-right animate-slide-out-left\" role=\"main\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UISection);
        return UISection;
    }());

    var UISectionFoot = (function () {
        function UISectionFoot() {
        }
        UISectionFoot = __decorate([
            aureliaFramework.customElement("ui-section-foot"),
            aureliaFramework.inlineView("<template class=\"ui-section__foot\"><slot></slot></template>")
        ], UISectionFoot);
        return UISectionFoot;
    }());

    var UISectionHead = (function () {
        function UISectionHead() {
        }
        UISectionHead = __decorate([
            aureliaFramework.customElement("ui-section-head"),
            aureliaFramework.inlineView("<template class=\"ui-section__head\"><slot></slot></template>")
        ], UISectionHead);
        return UISectionHead;
    }());

    var Page = [UIPage, UISection, UISectionHead, UISectionFoot, UIContent];

    var view$q = "<template>\n  <div ref=\"vmElement\" slot=\"page-alert\" class=\"ui-alert ui-alert--inline\" data-open.bind=\"open\">\n    <div class=\"ui-alert__wrapper\">\n      <div if.bind=\"icon\" class=\"ui-alert__icon\">\n        <ui-icon icon.bind=\"icon\"></ui-icon>\n      </div>\n      <div if.bind=\"alertTitle\" class=\"ui-alert__title\" innerhtml.bind=\"alertTitle\"></div>\n      <div class=\"ui-alert__body\"><slot></slot></div>\n      <div class=\"ui-alert__close\" click.trigger=\"close(false)\" if.bind=\"closeable\">\n        <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n      </div>\n      <div class=\"ui-alert__footer\" if.bind=\"type==='confirm'\">\n        <a click.trigger=\"close(false)\">${cancelLabel}</a>\n        <a click.trigger=\"close(true)\" ui-weight=\"bold\">${okLabel}</a>\n      </div>\n    </div>\n  </div>\n</template>\n";

    var UIAlert = (function () {
        function UIAlert(element) {
            this.element = element;
            this.open = false;
            this.icon = "";
            this.alertTitle = "";
            this.okLabel = "OK";
            this.cancelLabel = "Cancel";
            this.type = "alert";
            this.closeable = false;
            this.closeable = element.hasAttribute("closeable");
        }
        UIAlert.prototype.close = function (result) {
            if (this.element.dispatchEvent(UIInternal.createEvent("close", result)) !== false) {
                this.open = false;
            }
        };
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIAlert.prototype, "open", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIAlert.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIAlert.prototype, "alertTitle", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIAlert.prototype, "okLabel", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIAlert.prototype, "cancelLabel", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIAlert.prototype, "type", void 0);
        UIAlert = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-alert"),
            aureliaFramework.inlineView(view$q),
            __metadata("design:paramtypes", [Element])
        ], UIAlert);
        return UIAlert;
    }());

    var view$r = "<template class=\"ui-dialog__wrapper\" data-modal.bind=\"modal\" data-minimized.bind=\"minimized\" data-active.bind=\"active\" mousedown.trigger=\"activate()\">\n  <div class=\"ui-panel-base ui-dialog\" css.bind=\"css\" ref=\"dialogEl\">\n    <div class=\"ui-panel__header\" mousedown.delegate=\"startDrag($event)\">\n      <slot name=\"panel-header\">\n        <ui-header>\n          <ui-header-icon icon.bind=\"icon\" if.bind=\"icon\"></ui-header-icon>\n          <ui-header-title>${label}</ui-header-title>\n        </ui-header>\n      </slot>\n      <div class=\"ui-panel__header__actions\" if.bind=\"!hideToolbox\" mousedown.delegate=\"false\">\n        <ui-divider></ui-divider>\n        <ui-button if.bind=\"help\" class=\"ui-dlg--tool\" ui-theme=\"info\" type=\"tool\">\n          <ui-svg-icon ui-color=\"blue\" view-box=\"2 2 20 20\" icon=\"dlg-help\"></ui-svg-icon>\n        </ui-button>\n        <ui-button disabled.bind=\"!maximizable\" class=\"ui-dlg--tool\" type=\"tool\" click.trigger=\"maximized = !maximized\">\n          <ui-svg-icon ui-color=\"teal\" view-box=\"2 2 20 20\" icon.bind=\"maximized?'dlg-collapse':'dlg-expand'\"></ui-svg-icon>\n        </ui-button>\n        <ui-button disabled.bind=\"modal || !minimizable\" class=\"ui-dlg--tool\" type=\"tool\" click.trigger=\"minimize()\">\n          <ui-svg-icon ui-color=\"yellow\" view-box=\"2 2 20 20\" icon=\"dlg-minimize\"></ui-svg-icon>\n        </ui-button>\n        <ui-button disabled.bind=\"!closeable\" class=\"ui-dlg--tool\" type=\"tool\" click.trigger=\"close()\">\n          <ui-svg-icon ui-color=\"red\" view-box=\"2 2 20 20\" icon=\"dlg-close\"></ui-svg-icon>\n        </ui-button>\n      </div>\n    </div>\n    <div class=\"ui-panel__body\" ref=\"vmElement\">\n      <slot></slot>\n    </div>\n    <slot name=\"panel-footer\"></slot>\n  </div>\n</template>\n";

    var UIDialogElement = (function () {
        function UIDialogElement(element) {
            this.element = element;
            this.label = "Dialog";
            this.icon = "";
            this.width = "50vw";
            this.minWidth = "36rem";
            this.maxWidth = "100%";
            this.height = "50vh";
            this.minHeight = "32rem";
            this.maxHeight = "100%";
            this.help = false;
            this.modal = false;
            this.closeable = true;
            this.maximizable = true;
            this.minimizable = true;
            this.hideToolbox = false;
            this.active = true;
            this.minimized = false;
            this.maximized = false;
            this.position = {
                bottom: "auto",
                left: "0",
                right: "auto",
                top: "0"
            };
            this.help = element.hasAttribute("help.trigger");
        }
        UIDialogElement.prototype.cancel = function () {
            this.close();
        };
        UIDialogElement.prototype.close = function (result) {
            UIInternal.broadcast("dlg:close", { dialog: this, result: result });
        };
        UIDialogElement.prototype.minimize = function () {
            this.minimized = !this.minimized;
            this.active = !this.minimized;
            UIInternal.broadcast("dlg:minimize", { dialog: this });
        };
        UIDialogElement.prototype.activate = function () {
            UIInternal.broadcast("dlg:activate", { dialog: this });
        };
        UIDialogElement.prototype.bind = function () {
            if (this.modal) {
                this.position = { bottom: "auto", left: "auto", right: "auto", top: "auto" };
            }
        };
        UIDialogElement.prototype.attached = function () {
            if (!this.modal) {
                var iconEl = this.element.querySelector(".ui-header__icon .ui-icon");
                var labelEl = this.element.querySelector(".ui-header__title");
                if (iconEl) {
                    this.icon = iconEl.au.controller.viewModel.icon;
                }
                this.taskButton = UIInternal.compileTemplate("<template><ui-button size=\"sm\" ui-theme=\"primary\" type.bind=\"active?'solid':'default'\" label.bind=\"label\" icon.bind=\"icon\"></ui-button></template>", this);
            }
        };
        UIDialogElement.prototype.startDrag = function ($event) {
            if ($event.button === 0) {
                $event.stopEvent();
                UIInternal.broadcast("dlg:drag", {
                    dialog: this,
                    startX: $event.x || $event.clientX,
                    startY: $event.y || $event.clientY
                });
            }
        };
        Object.defineProperty(UIDialogElement.prototype, "css", {
            get: function () {
                var pos = __assign({ height: this.height, maxHeight: this.maxHeight, maxWidth: this.maxWidth, minHeight: this.minHeight, minWidth: this.minWidth, width: this.width }, this.position);
                if (this.maximized) {
                    pos.top = pos.left = pos.right = pos.bottom = "0";
                    pos.width = pos.height = "auto";
                }
                return pos;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIDialogElement.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIDialogElement.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDialogElement.prototype, "width", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDialogElement.prototype, "minWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDialogElement.prototype, "maxWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDialogElement.prototype, "height", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDialogElement.prototype, "minHeight", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDialogElement.prototype, "maxHeight", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneWay }),
            __metadata("design:type", Object)
        ], UIDialogElement.prototype, "help", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneTime }),
            __metadata("design:type", Boolean)
        ], UIDialogElement.prototype, "modal", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneWay }),
            __metadata("design:type", Boolean)
        ], UIDialogElement.prototype, "closeable", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneWay }),
            __metadata("design:type", Boolean)
        ], UIDialogElement.prototype, "maximizable", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneWay }),
            __metadata("design:type", Boolean)
        ], UIDialogElement.prototype, "minimizable", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneWay }),
            __metadata("design:type", Boolean)
        ], UIDialogElement.prototype, "hideToolbox", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UIDialogElement.prototype, "beforeclose", void 0);
        __decorate([
            aureliaFramework.computedFrom("width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "minimized", "maximized", "position.left", "position.top"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIDialogElement.prototype, "css", null);
        UIDialogElement = __decorate([
            aureliaFramework.customElement("ui-dialog"),
            aureliaFramework.inlineView(view$r),
            __metadata("design:paramtypes", [Element])
        ], UIDialogElement);
        return UIDialogElement;
    }());

    var UIDrawer = (function () {
        function UIDrawer(element) {
            var _this = this;
            this.element = element;
            this.align = "start";
            this.width = "24rem";
            this.maxWidth = "40vw";
            this.push = false;
            this.closeOnClick = false;
            this.isAttached = false;
            this.push = element.hasAttribute("push");
            this.closeOnClick =
                element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
            this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, function (target) {
                return !_this.closeOnClick && getParentByClass(target, "ui-drawer__body")
                    ? undefined
                    : (element.dataset.peek = "false");
            });
        }
        UIDrawer.prototype.attached = function () {
            var _this = this;
            UIInternal.queueTask(function () {
                return _this.element.nextElementSibling.style.setProperty("--drawer-width", _this.width);
            });
            this.isAttached = true;
        };
        UIDrawer.prototype.detached = function () {
            if (this.obClick) {
                this.obClick.dispose();
            }
        };
        UIDrawer.prototype.widthChanged = function () {
            if (this.isAttached) {
                this.element.nextElementSibling.style.setProperty("--drawer-width", this.width);
            }
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDrawer.prototype, "align", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDrawer.prototype, "width", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDrawer.prototype, "maxWidth", void 0);
        UIDrawer = __decorate([
            aureliaFramework.customElement("ui-drawer"),
            aureliaFramework.inlineView("<template class=\"ui-drawer\" data-push.bind=\"push\" data-align.bind=\"align\">\n<div class=\"ui-drawer__shim\"></div>\n<div class=\"ui-drawer__body\" css.bind=\"{width, maxWidth}\">\n  <slot></slot>\n</div>\n</template>\n"),
            __metadata("design:paramtypes", [Element])
        ], UIDrawer);
        return UIDrawer;
    }());

    var UIDrawerToggle = (function () {
        function UIDrawerToggle() {
        }
        UIDrawerToggle.prototype.toggleOpen = function () {
            this.drawer.dataset.peek = "" + !isTrue(this.drawer.dataset.peek);
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", HTMLElement)
        ], UIDrawerToggle.prototype, "drawer", void 0);
        UIDrawerToggle = __decorate([
            aureliaFramework.customElement("ui-drawer-toggle"),
            aureliaFramework.inlineView("<template class='ui-drawer__toggler' click.trigger='toggleOpen()'><slot><ui-svg-icon icon='menu'></ui-svg-icon></slot></template>")
        ], UIDrawerToggle);
        return UIDrawerToggle;
    }());

    var UIFooter = (function () {
        function UIFooter(element) {
            this.element = element;
        }
        UIFooter = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-footer"),
            aureliaFramework.inlineView("<template><div class=\"ui-footer\" slot=\"panel-footer\" ref=\"vmElement\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIFooter);
        return UIFooter;
    }());

    var UIHeader = (function () {
        function UIHeader(element) {
            this.element = element;
            this.label = "";
            this.icon = "";
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIHeader.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UIHeader.prototype, "icon", void 0);
        UIHeader = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-header"),
            aureliaFramework.inlineView("<template><div class=\"ui-header\" slot=\"panel-header\" ref=\"vmElement\">\n  <slot name=\"header-icon\"><div class=\"ui-header__icon\" if.bind=\"icon\"><ui-icon icon.bind=\"icon\"></ui-icon></div></slot>\n  <slot name=\"header-title\"><div class=\"ui-header__title\" if.bind=\"label\" innerhtml.bind=\"label\"></div></slot>\n  <slot name=\"header-actions\"></slot>\n  </div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIHeader);
        return UIHeader;
    }());

    var UIHeaderActions = (function () {
        function UIHeaderActions(element) {
            this.element = element;
        }
        UIHeaderActions = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-header-actions"),
            aureliaFramework.inlineView("<template><div ref=\"vmElement\" slot=\"header-actions\" class=\"ui-header__actions\"><slot></slot></div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIHeaderActions);
        return UIHeaderActions;
    }());

    var UIHeaderIcon = (function () {
        function UIHeaderIcon(element) {
            this.element = element;
            this.icon = "";
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIHeaderIcon.prototype, "icon", void 0);
        UIHeaderIcon = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-header-icon"),
            aureliaFramework.inlineView("<template><div ref=\"vmElement\" slot=\"header-icon\" class='ui-header__icon'><slot><ui-icon icon.bind=\"icon\"></ui-icon></slot></div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIHeaderIcon);
        return UIHeaderIcon;
    }());

    var UIHeaderTitle = (function () {
        function UIHeaderTitle(element) {
            this.element = element;
        }
        UIHeaderTitle = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-header-title"),
            aureliaFramework.inlineView("<template><div ref=\"vmElement\" slot=\"header-title\" class='ui-header__title'><slot></slot></div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIHeaderTitle);
        return UIHeaderTitle;
    }());

    var view$s = "<template class=\"ui-panel-base ui-panel\" css.bind=\"{width, minWidth, maxWidth}\" data-expanded.bind=\"expanded\" data-collapsed.bind=\"collapsed\">\n  <div class=\"ui-panel__header\">\n    <ui-header>\n      <slot name=\"header-icon\">\n        <ui-header-icon if.bind=\"icon\" icon.bind=\"icon\"></ui-header-icon>\n      </slot>\n      <ui-header-title if.bind=\"label\">${label}</ui-header-title>\n      <slot name=\"header-actions\"></slot>\n    </ui-header>\n    <div class=\"ui-panel__header__actions\" if.bind=\"collapsible || closeable || expandable\">\n      <ui-divider></ui-divider>\n      <template if.bind=\"expandable\">\n        <ui-button type=\"tool\" click.trigger=\"toggleExpand(!expanded)\">\n          <ui-svg-icon icon.bind=\"expanded?'collapse':'expand'\"></ui-svg-icon>\n        </ui-button>\n      </template>\n      <template if.bind=\"collapsible && !expanded\">\n        <ui-button type=\"tool\" click.trigger=\"toggleCollapse(!collapsed)\">\n          <ui-svg-icon icon.bind=\"collapsed?'plus':'minus'\"></ui-svg-icon>\n        </ui-button>\n      </template>\n      <template if.bind=\"closeable\">\n        <ui-button type=\"tool\" click.trigger=\"close()\">\n          <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n        </ui-button>\n      </template>\n    </div>\n  </div>\n  <div class=\"ui-panel__body\" css.bind=\"{height, minHeight, maxHeight}\">\n    <slot></slot>\n  </div>\n  <slot name=\"panel-footer\"></slot>\n</template>\n";

    var UIPanel = (function (_super) {
        __extends(UIPanel, _super);
        function UIPanel(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.label = "";
            _this.icon = "";
            _this.collapsed = false;
            _this.expanded = false;
            _this.width = "";
            _this.minWidth = "16rem";
            _this.maxWidth = "100vw";
            _this.height = "";
            _this.minHeight = "unset";
            _this.maxHeight = "100vh";
            _this.closeable = false;
            _this.expandable = false;
            _this.collapsible = false;
            return _this;
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPanel.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPanel.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Boolean)
        ], UIPanel.prototype, "collapsed", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Boolean)
        ], UIPanel.prototype, "expanded", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPanel.prototype, "width", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPanel.prototype, "minWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPanel.prototype, "maxWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPanel.prototype, "height", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPanel.prototype, "minHeight", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIPanel.prototype, "maxHeight", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UIPanel.prototype, "beforeclose", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIPanel.prototype, "closeable", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIPanel.prototype, "expandable", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UIPanel.prototype, "collapsible", void 0);
        UIPanel = __decorate([
            aureliaFramework.customElement("ui-panel"),
            aureliaFramework.inlineView(view$s),
            __metadata("design:paramtypes", [Element])
        ], UIPanel);
        return UIPanel;
    }(BasePanel));

    var view$t = "<template class=\"ui-sidebar\" click.delegate=\"headTrigger === 'toggle' ? collapsed = false : peek = true\" data-peek.bind=\"peek\" data-collapsed.bind=\"collapsed\" data-position.bind=\"position\" data-align.bind=\"align\">\n  <div class=\"ui-sidebar__titlebar\" ui-bg.bind=\"titleBg\" ui-color.bind=\"titleColor\" ui-weight.bind=\"titleWeight\" if.bind=\"collapsible || label\" click.trigger=\"[collapsed = collapsible && !collapsed, $event.stopEvent()]\" css.bind=\"{width}\">\n    <div class=\"ui-sidebar__toggler\" if.bind=\"collapsible\">\n      <ui-svg-icon icon.bind=\"toggleIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-sidebar__title\" ui-color.bind=\"collapsed ? titleBg : ''\">\n      <slot name=\"sidebar-title\"><span if.bind=\"label\" innerhtml.bind=\"label\"></span></slot>\n    </div>\n  </div>\n  <div class=\"ui-sidebar__body\" css.bind=\"{width, maxWidth, minWidth}\" ref=\"bodyEl\">\n    <slot></slot>\n  </div>\n  <div class=\"ui-sidebar__resizer\" if.bind=\"resizeable\" data-resizing.bind=\"isResizing\" mousedown.trigger=\"startResize($event)\"></div>\n</template>\n";

    var UISidebar = (function () {
        function UISidebar(element) {
            var _this = this;
            this.element = element;
            this.position = "start";
            this.width = "24rem";
            this.maxWidth = "40vw";
            this.minWidth = "4rem";
            this.align = "top";
            this.headTrigger = "peek";
            this.collapsed = false;
            this.peek = false;
            this.resizeable = false;
            this.collapsible = false;
            this.closeOnClick = false;
            this.startX = 0;
            this.isResizing = false;
            this.doResize = function (e) { return _this.resize(e); };
            this.endResize = function () { return _this.stopResize(); };
            this.resizeable = element.hasAttribute("resizeable");
            this.collapsible = element.hasAttribute("collapsible");
            this.closeOnClick =
                element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
            this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, function (target) {
                return !_this.peek || (!_this.closeOnClick && getParentByClass(target, "ui-sidebar__body"))
                    ? undefined
                    : UIInternal.queueTask(function () { return (_this.peek = false); });
            });
        }
        UISidebar.prototype.detached = function () {
            if (this.obClick) {
                this.obClick.dispose();
            }
        };
        Object.defineProperty(UISidebar.prototype, "toggleIcon", {
            get: function () {
                return (this.collapsed ? "expand" : "collapse") + "-" + this.position;
            },
            enumerable: true,
            configurable: true
        });
        UISidebar.prototype.startResize = function ($event) {
            if ($event.button === 0 && !this.isResizing) {
                this.startX = $event.x || $event.clientX;
                this.isResizing = true;
                document.addEventListener("mousemove", this.doResize);
                document.addEventListener("mouseup", this.endResize);
                $event.stopEvent();
            }
        };
        UISidebar.prototype.resize = function ($event) {
            if (this.isResizing) {
                var diff = ($event.x || $event.clientX) - this.startX;
                if (this.position === "end") {
                    diff = -1 * diff;
                }
                if (isRtl(this.element)) {
                    diff = -1 * diff;
                }
                var newWidth = this.bodyEl.offsetWidth + diff;
                if (newWidth <= convertToPx(this.maxWidth) && newWidth >= convertToPx(this.minWidth)) {
                    this.width = newWidth + "px";
                    this.startX = $event.x || $event.clientX;
                }
                $event.stopEvent();
            }
        };
        UISidebar.prototype.stopResize = function () {
            this.isResizing = false;
            document.removeEventListener("mousemove", this.doResize);
            document.removeEventListener("mouseup", this.endResize);
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "position", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "width", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "maxWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "minWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "titleBg", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "titleColor", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "titleWeight", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "align", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UISidebar.prototype, "headTrigger", void 0);
        __decorate([
            aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", Boolean)
        ], UISidebar.prototype, "collapsed", void 0);
        __decorate([
            aureliaFramework.computedFrom("collapsed", "position"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UISidebar.prototype, "toggleIcon", null);
        UISidebar = __decorate([
            aureliaFramework.customElement("ui-sidebar"),
            aureliaFramework.inlineView(view$t),
            __metadata("design:paramtypes", [Element])
        ], UISidebar);
        return UISidebar;
    }());

    var UIToolbar = (function () {
        function UIToolbar(element) {
            this.element = element;
            if (element.hasAttribute("align-end")) {
                element.classList.add("ui-row--end");
            }
        }
        UIToolbar = __decorate([
            aureliaFramework.customElement("ui-toolbar"),
            aureliaFramework.inlineView("<template class=\"ui-toolbar\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIToolbar);
        return UIToolbar;
    }());

    var Panels = [
        UIHeader,
        UIHeaderIcon,
        UIHeaderTitle,
        UIHeaderActions,
        UIFooter,
        UIDrawer,
        UIDrawerToggle,
        UISidebar,
        UIToolbar,
        UIPanel,
        UIDialogElement,
        UIAlert
    ];

    var UICol = (function () {
        function UICol(element) {
            this.element = element;
            this.size = "";
            this.width = "unset";
            this.maxWidth = "unset";
            this.minWidth = "unset";
            this.align = "";
            if (element.hasAttribute("content-stretch")) {
                element.classList.add("content-stretch");
            }
        }
        Object.defineProperty(UICol.prototype, "sizes", {
            get: function () {
                return this.size
                    .split(" ")
                    .map(function (s) { return "ui-col--" + s.trim(); })
                    .join(" ");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UICol.prototype, "classes", {
            get: function () {
                var classes = ["ui-col"];
                if (this.align) {
                    classes.push("ui-col--" + this.align);
                }
                if (this.size) {
                    classes.push(this.sizes);
                }
                return classes.join(" ");
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICol.prototype, "size", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICol.prototype, "width", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICol.prototype, "maxWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICol.prototype, "minWidth", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UICol.prototype, "align", void 0);
        __decorate([
            aureliaFramework.computedFrom("align", "size"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], UICol.prototype, "classes", null);
        UICol = __decorate([
            aureliaFramework.customElement("ui-col"),
            aureliaFramework.inlineView("<template class.bind='classes' css.bind=\"{ width, maxWidth, minWidth}\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UICol);
        return UICol;
    }());

    var UIContainer = (function () {
        function UIContainer(element) {
            this.element = element;
            if (element.hasAttribute("fluid")) {
                element.classList.add("ui-container--fluid");
            }
        }
        UIContainer = __decorate([
            aureliaFramework.customElement("ui-container"),
            aureliaFramework.inlineView("<template class='ui-container'><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIContainer);
        return UIContainer;
    }());

    var UIGrid = (function () {
        function UIGrid(element) {
            this.element = element;
            this.size = "nm";
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIGrid.prototype, "size", void 0);
        UIGrid = __decorate([
            aureliaFramework.customElement("ui-grid"),
            aureliaFramework.inlineView("<template class='ui-grid ui-grid--${size}'><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIGrid);
        return UIGrid;
    }());

    var UIRow = (function () {
        function UIRow(element) {
            this.element = element;
            this.halign = "";
            this.valign = "";
            if (element.hasAttribute("vertical") && element.hasAttribute("reverse")) {
                element.classList.add("ui-row--vertical--reverse");
            }
            else if (element.hasAttribute("vertical")) {
                element.classList.add("ui-row--vertical");
            }
            else if (element.hasAttribute("reverse")) {
                element.classList.add("ui-row--reverse");
            }
            if (element.hasAttribute("nowrap")) {
                element.classList.add("ui-row--nowrap");
            }
            if (element.hasAttribute("auto")) {
                element.classList.add("ui-row--auto");
            }
        }
        Object.defineProperty(UIRow.prototype, "classes", {
            get: function () {
                var classes = ["ui-row"];
                if (this.halign) {
                    classes.push("ui-row--" + this.halign);
                }
                if (this.valign) {
                    classes.push("ui-row--" + this.valign);
                }
                return classes.join(" ");
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIRow.prototype, "halign", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIRow.prototype, "valign", void 0);
        __decorate([
            aureliaFramework.computedFrom("halign", "valign"),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [])
        ], UIRow.prototype, "classes", null);
        UIRow = __decorate([
            aureliaFramework.customElement("ui-row"),
            aureliaFramework.inlineView("<template class.bind='classes'><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIRow);
        return UIRow;
    }());

    var Responsive = [UIContainer, UIRow, UICol, UIGrid];

    var UIDivider = (function () {
        function UIDivider() {
        }
        UIDivider = __decorate([
            aureliaFramework.customElement("ui-divider"),
            aureliaFramework.inlineView("<template class='ui-divider'><slot></slot></template>")
        ], UIDivider);
        return UIDivider;
    }());

    var UIDragHandle = (function () {
        function UIDragHandle(element) {
            this.element = element;
        }
        UIDragHandle.prototype.fireDragEvent = function ($event, evt) {
            this.element.dispatchEvent(UIInternal.createEvent(evt));
            return true;
        };
        UIDragHandle = __decorate([
            aureliaFramework.customElement("ui-drag-handle"),
            aureliaFramework.inlineView("<template class=\"ui-drag-handle\" ui-color=\"gray\"\n    mousedown.trigger=\"fireDragEvent($event,'dragstart')\" click.trigger=\"fireDragEvent($event,'dragend')\"><ui-svg-icon icon=\"drag\"></ui-svg-icon></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIDragHandle);
        return UIDragHandle;
    }());

    var UIDrop = (function () {
        function UIDrop(element) {
            this.element = element;
            this.class = "";
            this.isOpen = false;
            this.stretch = true;
            this.closeOnClick = true;
            this.attachToViewport = false;
            this.position = element.getAttribute("position") || "tl";
            this.anchorPosition = element.getAttribute("anchor") || "bl";
            this.closeOnClick = !isFalse(element.getAttribute("close-on-click"));
            this.attachToViewport = element.hasAttribute("attach-to-viewport");
        }
        UIDrop.prototype.tether = function (anchorEl) {
            this.tetherObj = UITether.tether((this.anchorEl = anchorEl), this.vmElement, {
                anchorPosition: this.anchorPosition,
                attachToViewport: this.attachToViewport,
                position: this.position,
                resize: this.stretch
            });
        };
        UIDrop.prototype.updatePosition = function () {
            this.tetherObj.updatePosition();
        };
        UIDrop.prototype.toggleDrop = function (open) {
            var _this = this;
            this.disposeListeners();
            this.vmElement.dataset.show = "false";
            this.isOpen = open === undefined ? !this.isOpen : open;
            if (this.isOpen) {
                this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, function (t) { return _this.canClose(t); });
                this.obResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, function (t) {
                    return _this.updatePosition();
                });
                UIInternal.queueMicroTask(function () {
                    _this.tetherObj.updatePosition();
                    _this.vmElement.dataset.show = "true";
                });
            }
        };
        UIDrop.prototype.closeDrop = function () {
            var _this = this;
            UIInternal.queueTask(function () {
                _this.isOpen = false;
                _this.disposeListeners();
                _this.element.dispatchEvent(UIInternal.createEvent("close"));
            });
        };
        UIDrop.prototype.disposeListeners = function () {
            if (this.obClick) {
                this.obClick.dispose();
            }
            if (this.obResize) {
                this.obResize.dispose();
            }
        };
        UIDrop.prototype.detached = function () {
            this.disposeListeners();
            if (this.tetherObj) {
                this.tetherObj.dispose();
            }
        };
        UIDrop.prototype.canClose = function (t) {
            if (!hasParent(t, this.vmElement) && !hasParent(t, this.anchorEl)) {
                this.closeDrop();
            }
        };
        UIDrop.prototype.close = function ($event) {
            $event.stopEvent();
            if (this.closeOnClick) {
                this.closeDrop();
            }
        };
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIDrop.prototype, "class", void 0);
        UIDrop = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-drop"),
            aureliaFramework.inlineView("<template><div slot=\"ui-drop\" class=\"ui-drop\" mouseup.delegate=\"closeDrop()\" data-open.bind=\"isOpen\">\n  <div ref=\"vmElement\" class=\"ui-drop__body ${class}\" mouseup.delegate=\"close($event)\"><slot></slot></div>\n  </div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIDrop);
        return UIDrop;
    }());

    var UIFiller = (function () {
        function UIFiller() {
        }
        UIFiller = __decorate([
            aureliaFramework.customElement("ui-filler"),
            aureliaFramework.inlineView("<template class='ui-col ui-col--fill'></template>")
        ], UIFiller);
        return UIFiller;
    }());

    var UILoader = (function () {
        function UILoader() {
            this.busy = false;
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UILoader.prototype, "busy", void 0);
        UILoader = __decorate([
            aureliaFramework.customElement("ui-loader"),
            aureliaFramework.inlineView("<template><div ref=\"vmElement\" class=\"ui-loader\" if.bind=\"busy\">\n  <div><ui-svg-icon icon=\"loader\" class=\"ui-anim--spin\"></ui-svg-icon></div>\n</div></template>")
        ], UILoader);
        return UILoader;
    }());

    var UITextDivider = (function () {
        function UITextDivider() {
        }
        UITextDivider = __decorate([
            aureliaFramework.customElement("ui-text-divider"),
            aureliaFramework.inlineView("<template><fieldset class='ui-text-divider'><legend ref='vmElement'><slot></slot></legend></fieldset></template>")
        ], UITextDivider);
        return UITextDivider;
    }());

    var Shared = [UIDivider, UIDrop, UIFiller, UILoader, UITextDivider, UIDragHandle];

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
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITab.prototype, "id", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITab.prototype, "label", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITab.prototype, "icon", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UITab.prototype, "active", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UITab.prototype, "disabled", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "view", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "model", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "viewModel", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Boolean)
        ], UITab.prototype, "closeable", void 0);
        UITab = __decorate([
            aureliaFramework.customElement("ui-tab"),
            aureliaFramework.inlineView("<template class=\"ui-tab\" data-active.bind=\"active\" data-hide.bind=\"!!view || !!viewModel\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UITab);
        return UITab;
    }());

    var UITabbarEnd = (function () {
        function UITabbarEnd(element) {
            this.element = element;
        }
        UITabbarEnd = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-tabbar-end"),
            aureliaFramework.inlineView("<template><div slot=\"tabbar-end\"><slot></slot></div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UITabbarEnd);
        return UITabbarEnd;
    }());

    var view$u = "<template class=\"ui-tab__panel\" data-align.bind=\"align\">\n  <div class=\"ui-tab__bar\">\n    <div class=\"ui-tab__bar__start\">\n      <slot name=\"tabbar-start\"></slot>\n    </div>\n    <div class=\"ui-tab__bar__wrapper\" ref=\"wrapperEl\">\n      <!-- repeat tabs -->\n      <template repeat.for=\"tab of tabs\">\n        <div class=\"ui-tab__button\" data-id.bind=\"tab.id\" data-active.bind=\"tab.active\" data-disabled.bind=\"tab.disabled\" click.trigger=\"activateTab(tab.id)\" ui-tooltip.bind=\"tab.label\">\n          <span class=\"ui-tab__button__icon\" if.bind=\"tab.icon\">\n            <ui-icon icon.bind=\"tab.icon\"></ui-icon>\n          </span>\n          <span class=\"ui-tab__button__label\" innerhtml.bind=\"tab.label\"></span>\n          <span class=\"ui-tab__button__close\" if.bind=\"tab.closeable\" click.trigger=\"[closeTab(tab.id), $event.stopEvent()]\">\n            <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n          </span>\n        </div>\n      </template>\n    </div>\n    <div class=\"ui-tab__bar__end\">\n      <slot name=\"tabbar-end\"></slot>\n    </div>\n    <div class=\"ui-tab__bar__overflow\" show.bind=\"hasOverflow\">\n      <ui-button no-caret type=\"link\" ui-theme=\"secondary\" size=\"sm\">\n        <ui-svg-icon class=\"ui-btn__icon\" icon=\"overflow\"></ui-svg-icon>\n        <ui-drop><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n      </ui-button>\n    </div>\n  </div>\n  <div class=\"ui-tab__body\">\n    <slot></slot>\n\n    <compose view-model.ref=\"composeVm\" class=\"ui-section\" view.bind=\"activeTab.view\" model.bind=\"activeTab.model\" view-model.bind=\"activeTab.viewModel\"></compose>\n  </div>\n</template>\n";

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
            return __awaiter(this, void 0, void 0, function () {
                var tab, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tab = this.tabs.find(function (t) { return t.id === id; });
                            result = true;
                            if (!this.composeVm.currentViewModel) return [3, 2];
                            return [4, UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate")];
                        case 1:
                            result = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (result) {
                                return [2, UIInternal.fireCallbackEvent(this, "beforechange", {
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
            return __awaiter(this, void 0, void 0, function () {
                var tab, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tab = this.tabs.find(function (t) { return t.id === id; });
                            result = true;
                            if (!(this.activeTab.id === id && this.composeVm.currentViewModel)) return [3, 2];
                            return [4, UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate")];
                        case 1:
                            result = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (result) {
                                return [2, UIInternal.fireCallbackEvent(this, "beforeclose", tab.id).then(function (b) {
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
                this.element.dispatchEvent(UIInternal.createEvent("change", id));
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
            this.element.dispatchEvent(UIInternal.createEvent("close", id));
            this.tabs.splice(this.tabs.indexOf(tab), 1);
            if (tab.element) {
                UIInternal.queueTask(function () { return aureliaFramework.DOM.removeNode(tab.element); });
            }
            return true;
        };
        UITabPanel.prototype.calculateOverflow = function () {
            var _this = this;
            var _a;
            this.resetOverflow();
            var overflowItems = [];
            var isRtl = window.getComputedStyle(this.wrapperEl).direction === "rtl";
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
            aureliaFramework.bindable(),
            __metadata("design:type", Array)
        ], UITabPanel.prototype, "tabs", void 0);
        __decorate([
            aureliaFramework.bindable({ bindingMode: aureliaFramework.bindingMode.twoWay }),
            __metadata("design:type", String)
        ], UITabPanel.prototype, "active", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UITabPanel.prototype, "align", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UITabPanel.prototype, "beforechange", void 0);
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", Function)
        ], UITabPanel.prototype, "beforeclose", void 0);
        __decorate([
            aureliaFramework.children("ui-tab"),
            __metadata("design:type", Array)
        ], UITabPanel.prototype, "innerTabs", void 0);
        __decorate([
            aureliaFramework.bindable({ bindingMode: aureliaFramework.bindingMode.toView }),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "activeTab", void 0);
        UITabPanel = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.customElement("ui-tab-panel"),
            aureliaFramework.inlineView(view$u),
            __metadata("design:paramtypes", [Element])
        ], UITabPanel);
        return UITabPanel;
    }());

    var UITabbarStart = (function () {
        function UITabbarStart(element) {
            this.element = element;
        }
        UITabbarStart = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-tabbar-start"),
            aureliaFramework.inlineView("<template><div slot=\"tabbar-start\"><slot></slot></div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UITabbarStart);
        return UITabbarStart;
    }());

    var TabPanel = [UITabPanel, UITab, UITabbarStart, UITabbarEnd];

    var SplitValueConverter = (function () {
        function SplitValueConverter() {
        }
        SplitValueConverter.prototype.toView = function (object, char) {
            if (char === void 0) { char = ","; }
            return (object || "").split(new RegExp("[" + char + "]"));
        };
        SplitValueConverter = __decorate([
            aureliaFramework.valueConverter("split")
        ], SplitValueConverter);
        return SplitValueConverter;
    }());
    var ObjectMapValueConverter = (function () {
        function ObjectMapValueConverter() {
        }
        ObjectMapValueConverter.prototype.toView = function (object) {
            if (isEmpty(object)) {
                return new Map();
            }
            var map = new Map();
            object.forEach(function (value, key) { return map.set(key, value); });
            return map;
        };
        ObjectMapValueConverter = __decorate([
            aureliaFramework.valueConverter("objectMap")
        ], ObjectMapValueConverter);
        return ObjectMapValueConverter;
    }());
    var GroupValueConverter = (function () {
        function GroupValueConverter() {
        }
        GroupValueConverter.prototype.toView = function (array, property) {
            return array.groupBy(property);
        };
        GroupValueConverter = __decorate([
            aureliaFramework.valueConverter("group")
        ], GroupValueConverter);
        return GroupValueConverter;
    }());
    var SliceValueConverter = (function () {
        function SliceValueConverter() {
        }
        SliceValueConverter.prototype.toView = function (array, end) {
            if (end === void 0) { end = 0; }
            return end === 0 ? array : array.slice(0, end);
        };
        SliceValueConverter = __decorate([
            aureliaFramework.valueConverter("slice")
        ], SliceValueConverter);
        return SliceValueConverter;
    }());
    var FilterValueConverter = (function () {
        function FilterValueConverter() {
        }
        FilterValueConverter.prototype.toView = function (array, value, property) {
            if (isEmpty(array)) {
                return [];
            }
            if (isEmpty(value)) {
                return array;
            }
            if (array instanceof Map) {
                var map_1 = new Map();
                array.forEach(function (v, k) {
                    k.toString().includes(value) ||
                        (property
                            ? v[property].toString().includes(value.toString())
                            : v.toString().includes(value.toString()))
                        ? map_1.set(k, v)
                        : fn();
                });
                return map_1;
            }
            else {
                return array.filter(function (o) {
                    return property
                        ? o[property].toString().includes(value.toString())
                        : o.toString().includes(value.toString());
                });
            }
        };
        FilterValueConverter = __decorate([
            aureliaFramework.valueConverter("filter")
        ], FilterValueConverter);
        return FilterValueConverter;
    }());
    var OrderByValueConverter = (function () {
        function OrderByValueConverter() {
        }
        OrderByValueConverter.prototype.toView = function (array, property, isAscending) {
            if (isAscending === void 0) { isAscending = true; }
            if (isEmpty(array)) {
                return [];
            }
            if (array instanceof Map) {
                return new Map(__spread(array).sort(function (a, b) { return (a[property] > b[property] ? 1 : -1); }));
            }
            return __spread(array).sort(function (a, b) { return (a[property] > b[property] ? 1 : -1); });
        };
        OrderByValueConverter = __decorate([
            aureliaFramework.valueConverter("orderBy")
        ], OrderByValueConverter);
        return OrderByValueConverter;
    }());
    var SortValueConverter = (function () {
        function SortValueConverter() {
        }
        SortValueConverter.prototype.toView = function (array, property, isAscending) {
            if (isAscending === void 0) { isAscending = true; }
            if (isEmpty(array)) {
                return [];
            }
            if (array instanceof Map) {
                return new Map(__spread(array).sortBy("0", !!property));
            }
            return __spread(array).sortBy(property, isAscending && !!property !== false);
        };
        SortValueConverter = __decorate([
            aureliaFramework.valueConverter("sort")
        ], SortValueConverter);
        return SortValueConverter;
    }());

    var getPhone = function (value, country) {
        if (value === void 0) { value = ""; }
        if (country === void 0) { country = "us"; }
        var number = libphonenumberJs.parsePhoneNumberFromString(value || "", country);
        return number ? number : {
            country: "",
            formatNational: function () { return ""; },
            formatInternational: function () { return ""; }
        };
    };
    var JsonValueConverter = (function () {
        function JsonValueConverter() {
        }
        JsonValueConverter.prototype.toView = function (value) {
            return JSON.stringify(value);
        };
        JsonValueConverter = __decorate([
            aureliaFramework.valueConverter("json")
        ], JsonValueConverter);
        return JsonValueConverter;
    }());
    var MarkdownValueConverter = (function () {
        function MarkdownValueConverter() {
        }
        MarkdownValueConverter.prototype.toView = function (value) {
            return exports.UIFormat.toHTML(value || "");
        };
        MarkdownValueConverter = __decorate([
            aureliaFramework.valueConverter("md")
        ], MarkdownValueConverter);
        return MarkdownValueConverter;
    }());
    var PhoneValueConverter = (function () {
        function PhoneValueConverter() {
        }
        PhoneValueConverter.prototype.toView = function (value, country) {
            if (country === void 0) { country = ""; }
            return getPhone(value, country).formatInternational();
        };
        PhoneValueConverter = __decorate([
            aureliaFramework.valueConverter("phone")
        ], PhoneValueConverter);
        return PhoneValueConverter;
    }());
    var PhoneLocalValueConverter = (function () {
        function PhoneLocalValueConverter() {
        }
        PhoneLocalValueConverter.prototype.toView = function (value, country) {
            if (country === void 0) { country = "us"; }
            return getPhone(value, country).formatNational();
        };
        PhoneLocalValueConverter = __decorate([
            aureliaFramework.valueConverter("phoneLocal")
        ], PhoneLocalValueConverter);
        return PhoneLocalValueConverter;
    }());
    var PhoneHtmlValueConverter = (function () {
        function PhoneHtmlValueConverter() {
        }
        PhoneHtmlValueConverter.prototype.toView = function (value, country) {
            if (country === void 0) { country = ""; }
            var phoneNumber = getPhone(value, country);
            return "<span class=\"ui-flag " + phoneNumber.country + "\"></span>&nbsp;" + phoneNumber.formatInternational();
        };
        PhoneHtmlValueConverter = __decorate([
            aureliaFramework.valueConverter("phoneHtml")
        ], PhoneHtmlValueConverter);
        return PhoneHtmlValueConverter;
    }());
    var PhoneLocalHtmlValueConverter = (function () {
        function PhoneLocalHtmlValueConverter() {
        }
        PhoneLocalHtmlValueConverter.prototype.toView = function (value, country) {
            if (country === void 0) { country = "us"; }
            var phoneNumber = getPhone(value, country);
            return "<span class=\"ui-flag " + phoneNumber.country + "\"></span>&nbsp;" + phoneNumber.formatNational();
        };
        PhoneLocalHtmlValueConverter = __decorate([
            aureliaFramework.valueConverter("phoneLocalHtml")
        ], PhoneLocalHtmlValueConverter);
        return PhoneLocalHtmlValueConverter;
    }());
    var DateValueConverter = (function () {
        function DateValueConverter() {
        }
        DateValueConverter.prototype.toView = function (value, format) {
            return exports.UIFormat.date(value, format);
        };
        DateValueConverter = __decorate([
            aureliaFramework.valueConverter("date")
        ], DateValueConverter);
        return DateValueConverter;
    }());
    var TimeValueConverter = (function () {
        function TimeValueConverter() {
        }
        TimeValueConverter.prototype.toView = function (value, format) {
            return exports.UIFormat.time(value, format);
        };
        TimeValueConverter = __decorate([
            aureliaFramework.valueConverter("time")
        ], TimeValueConverter);
        return TimeValueConverter;
    }());
    var DatetimeValueConverter = (function () {
        function DatetimeValueConverter() {
        }
        DatetimeValueConverter.prototype.toView = function (value, format) {
            return exports.UIFormat.datetime(value, format);
        };
        DatetimeValueConverter = __decorate([
            aureliaFramework.valueConverter("datetime")
        ], DatetimeValueConverter);
        return DatetimeValueConverter;
    }());
    var FromNowValueConverter = (function () {
        function FromNowValueConverter() {
        }
        FromNowValueConverter.prototype.toView = function (value) {
            return exports.UIFormat.fromNow(value);
        };
        FromNowValueConverter = __decorate([
            aureliaFramework.valueConverter("fromnow")
        ], FromNowValueConverter);
        return FromNowValueConverter;
    }());
    var AgeValueConverter = (function () {
        function AgeValueConverter() {
        }
        AgeValueConverter.prototype.toView = function (value) {
            return exports.UIFormat.age(value);
        };
        AgeValueConverter = __decorate([
            aureliaFramework.valueConverter("age")
        ], AgeValueConverter);
        return AgeValueConverter;
    }());
    var UtcValueConverter = (function () {
        function UtcValueConverter() {
        }
        UtcValueConverter.prototype.toView = function (value) {
            return exports.UIFormat.utcDate(value);
        };
        UtcValueConverter = __decorate([
            aureliaFramework.valueConverter("utc")
        ], UtcValueConverter);
        return UtcValueConverter;
    }());
    var IsoValueConverter = (function () {
        function IsoValueConverter() {
        }
        IsoValueConverter.prototype.toView = function (value) {
            return exports.UIFormat.dateToISO(value);
        };
        IsoValueConverter = __decorate([
            aureliaFramework.valueConverter("iso")
        ], IsoValueConverter);
        return IsoValueConverter;
    }());
    var NumberValueConverter = (function () {
        function NumberValueConverter() {
        }
        NumberValueConverter.prototype.toView = function (value, format) {
            return exports.UIFormat.number(value, format);
        };
        NumberValueConverter = __decorate([
            aureliaFramework.valueConverter("number")
        ], NumberValueConverter);
        return NumberValueConverter;
    }());
    var CurrencyValueConverter = (function () {
        function CurrencyValueConverter() {
        }
        CurrencyValueConverter.prototype.toView = function (value, symbol, format) {
            return exports.UIFormat.currency(value, symbol, format);
        };
        CurrencyValueConverter = __decorate([
            aureliaFramework.valueConverter("currency")
        ], CurrencyValueConverter);
        return CurrencyValueConverter;
    }());
    var PercentValueConverter = (function () {
        function PercentValueConverter() {
        }
        PercentValueConverter.prototype.toView = function (value) {
            return exports.UIFormat.percent(value);
        };
        PercentValueConverter = __decorate([
            aureliaFramework.valueConverter("percent")
        ], PercentValueConverter);
        return PercentValueConverter;
    }());

    var ValueConverters = [
        FilterValueConverter,
        GroupValueConverter,
        ObjectMapValueConverter,
        SliceValueConverter,
        SortValueConverter,
        SplitValueConverter,
        OrderByValueConverter,
        AgeValueConverter,
        CurrencyValueConverter,
        DateValueConverter,
        DatetimeValueConverter,
        FromNowValueConverter,
        JsonValueConverter,
        MarkdownValueConverter,
        NumberValueConverter,
        PercentValueConverter,
        PhoneHtmlValueConverter,
        PhoneLocalHtmlValueConverter,
        PhoneLocalValueConverter,
        PhoneValueConverter,
        TimeValueConverter,
        UtcValueConverter,
        IsoValueConverter
    ];

    var UIRouterView = (function () {
        function UIRouterView() {
            this.name = "";
        }
        __decorate([
            aureliaFramework.bindable(),
            __metadata("design:type", String)
        ], UIRouterView.prototype, "name", void 0);
        UIRouterView = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-router-view"),
            aureliaFramework.inlineView("<template><router-view swap-order=\"with\" name.bind=\"name\" class=\"ui-router-view\" ref=\"vmElement\"></router-view></template>")
        ], UIRouterView);
        return UIRouterView;
    }());

    var view$v = "<template class=\"ui-viewport\" role=\"main\">\n  <slot name=\"ui-viewport__header\"></slot>\n  <div class=\"ui-viewport__body\">\n    <slot></slot>\n    <div class=\"ui-viewport__dialog-container\" ref=\"dialogContainer\"></div>\n    <div class=\"ui-viewport__alert-container\" ref=\"appConfig.AlertContainer\"></div>\n    <div class=\"ui-viewport__toast-container\" ref=\"appConfig.ToastContainer\"></div>\n  </div>\n  <section role=\"tablist\" class=\"ui-viewport__taskbar\">\n    <div class=\"ui-viewport__taskbar--start\"><slot name=\"taskbar-start\"></slot></div>\n    <div class=\"ui-viewport__taskbar__wrapper\" ref=\"taskbarContainer\"></div>\n    <div class=\"ui-viewport__taskbar--end\"><slot name=\"taskbar-links\"></slot></div>\n  </section>\n  <slot name=\"ui-viewport__footer\"></slot>\n  <div class=\"ui-viewport__floating-container\" ref=\"appConfig.FloatingContainer\"></div>\n  <ui-loader busy.bind=\"router.isNavigating\"></ui-loader>\n</template>\n";

    var UIViewport = (function () {
        function UIViewport(appConfig, router) {
            var _this = this;
            this.appConfig = appConfig;
            this.router = router;
            window.addEventListener("resize", function () { return UIInternal.broadcast(UIInternal.EVT_VIEWPORT_RESIZE); });
            document.addEventListener("mouseup", function ($event) { return _this.broadcastEvent($event); });
        }
        UIViewport.prototype.attached = function () {
            this.appConfig.DialogContainer = new aureliaFramework.ViewSlot(this.dialogContainer, true);
            this.appConfig.TaskbarContainer = new aureliaFramework.ViewSlot(this.taskbarContainer, true);
            this.appConfig.DialogContainer.attached();
            this.appConfig.TaskbarContainer.attached();
        };
        UIViewport.prototype.broadcastEvent = function ($event) {
            if (!hasParent($event.target, this.appConfig.FloatingContainer)) {
                UIInternal.broadcast(UIInternal.EVT_VIEWPORT_CLICK, $event.target);
            }
        };
        UIViewport = __decorate([
            aureliaFramework.customElement("ui-viewport"),
            aureliaFramework.inlineView(view$v),
            __metadata("design:paramtypes", [UIAppConfig, aureliaRouter.AppRouter])
        ], UIViewport);
        return UIViewport;
    }());

    var UIViewportFooter = (function () {
        function UIViewportFooter() {
        }
        UIViewportFooter = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-viewport-footer"),
            aureliaFramework.inlineView("<template><footer class=\"ui-viewport__footer\" slot=\"ui-viewport__footer\" ref=\"vmElement\"><slot></slot></footer></template>")
        ], UIViewportFooter);
        return UIViewportFooter;
    }());

    var UIViewportHeader = (function () {
        function UIViewportHeader() {
        }
        UIViewportHeader = __decorate([
            aureliaFramework.containerless(),
            aureliaFramework.customElement("ui-viewport-header"),
            aureliaFramework.inlineView("<template><header class=\"ui-viewport__header\" slot=\"ui-viewport__header\" ref=\"vmElement\"><slot></slot></header></template>")
        ], UIViewportHeader);
        return UIViewportHeader;
    }());

    var Viewport = [UIViewport, UIViewportHeader, UIViewportFooter, UIRouterView];

    var UIHttpService = (function () {
        function UIHttpService(httpClient, appConfig) {
            this.httpClient = httpClient;
            this.appConfig = appConfig;
            this.logger = aureliaLogging.getLogger("UIHttpService");
            this.logger.info("Initialized");
            httpClient.configure(function (config) {
                config.withBaseUrl(appConfig.ApiBaseUrl).withInterceptor({
                    request: function (request) {
                        this.logger.info("Requesting " + request.method + " " + request.url);
                        return request;
                    },
                    response: function (response) {
                        var _this = this;
                        this.logger.info("Response " + response.status + " " + response.url);
                        if (response instanceof TypeError) {
                            return Promise.reject({
                                errorCode: "500",
                                message: response.message || "Network Error!!"
                            });
                        }
                        if (response.status === 401 && response.url.includes(this.httpClient.baseUrl)) {
                            UIInternal.broadcast("auf:unauthorized", null);
                        }
                        else if (response.status >= 400) {
                            return response.text().then(function (resp) {
                                var body = {};
                                try {
                                    body = JSON.parse(resp);
                                }
                                catch (e) {
                                    _this.logger.debug(e.stack);
                                }
                                var errorCode = body.errorCode || body.error || "500";
                                var message = body.message || body.error || "Network Error!!";
                                return Promise.reject({ errorCode: errorCode, message: message });
                            });
                        }
                        return response;
                    }
                });
            });
        }
        UIHttpService.prototype.setBaseUrl = function (url) {
            this.httpClient.baseUrl = url;
        };
        UIHttpService.prototype.json = function (slug, query, headers) {
            var _this = this;
            if (query === void 0) { query = null; }
            if (headers === void 0) { headers = true; }
            this.logger.info("get [" + slug + "]");
            return this.httpClient
                .fetch(slug + this.buildQueryString(query), {
                headers: this.__getHeaders(headers),
                method: "get",
                mode: "cors"
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.text = function (slug, query, headers) {
            if (query === void 0) { query = null; }
            if (headers === void 0) { headers = false; }
            this.logger.info("text [" + slug + "]");
            return this.httpClient
                .fetch(slug + this.buildQueryString(query), {
                headers: this.__getHeaders(headers),
                method: "get",
                mode: "cors"
            })
                .then(function (resp) { return resp.text(); });
        };
        UIHttpService.prototype.blob = function (slug, query, headers) {
            if (query === void 0) { query = null; }
            if (headers === void 0) { headers = false; }
            this.logger.info("text [" + slug + "]");
            return this.httpClient
                .fetch(slug + this.buildQueryString(query), {
                headers: this.__getHeaders(headers),
                method: "get",
                mode: "cors"
            })
                .then(function (resp) { return resp.blob(); });
        };
        UIHttpService.prototype.patch = function (slug, body, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("patch [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                body: aureliaFetchClient.json(body),
                headers: this.__getHeaders(headers),
                method: "patch",
                mode: "cors"
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.put = function (slug, body, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("put [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                body: aureliaFetchClient.json(body),
                headers: this.__getHeaders(headers),
                method: "put",
                mode: "cors"
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.post = function (slug, body, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("post [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                body: aureliaFetchClient.json(body),
                headers: this.__getHeaders(headers),
                method: "post",
                mode: "cors"
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.delete = function (slug, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("delete [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                headers: this.__getHeaders(headers),
                method: "delete",
                mode: "cors"
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.upload = function (slug, form, headers) {
            if (headers === void 0) { headers = true; }
            this.logger.info("upload [" + slug + "]");
            return this.__upload("post", slug, form, headers);
        };
        UIHttpService.prototype.reupload = function (slug, form, headers) {
            if (headers === void 0) { headers = true; }
            this.logger.info("reupload [" + slug + "]");
            return this.__upload("put", slug, form, headers);
        };
        UIHttpService.prototype.buildQueryString = function (query) {
            if (!query) {
                return "";
            }
            return ("?" +
                Object.keys(query)
                    .map(function (k) { return escape(k) + "=" + escape(isObject(query[k]) ? JSON.stringify(query[k]) : query[k]); })
                    .join("&"));
        };
        UIHttpService.prototype.__upload = function (method, slug, form, headers) {
            var _this = this;
            var body = new FormData();
            for (var i = 0, q = form.querySelectorAll("input"); i < q.length; i++) {
                if (q[i].type === "file") {
                    var files = q[i]["draggedFiles"] || q[i].files;
                    for (var x = 0; x < files.length; x++) {
                        body.append(q[i].name || "file" + (i + 1) + (x + 1), files[x].file || files[x], files[x].name);
                    }
                }
                else {
                    body.append(q[i].name || "input" + (i + 1), q[i].value);
                }
            }
            return this.httpClient
                .fetch(slug, {
                body: body,
                headers: this.__getHeaders(headers),
                method: method,
                mode: "cors"
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.__getResponse = function (response) {
            if (response.status === 204) {
                return null;
            }
            return response.text().then(function (text) {
                try {
                    return JSON.parse(text);
                }
                catch (e) {
                    return {};
                }
            });
        };
        UIHttpService.prototype.__getHeaders = function (override) {
            if (override === void 0) { override = true; }
            var headers = {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "X-Requested-With": "Fetch"
            };
            Object.assign(headers, this.appConfig.ApiHeaders || {});
            if (override !== false) {
                if (isFunction(this.appConfig.AuthorizationHeader)) {
                    Object.assign(headers, this.appConfig.AuthorizationHeader() || {});
                }
                if (isObject(this.appConfig.AuthorizationHeader)) {
                    Object.assign(headers, this.appConfig.AuthorizationHeader || {});
                }
            }
            if (isObject(override)) {
                Object.assign(headers, override || {});
            }
            return headers;
        };
        UIHttpService = __decorate([
            aureliaFramework.autoinject(),
            __metadata("design:paramtypes", [aureliaFetchClient.HttpClient, UIAppConfig])
        ], UIHttpService);
        return UIHttpService;
    }());

    var ERROR_CODES = {
        NO_API: { errorCode: "AUF-DM:000", message: "API route required" },
        REJECTED: { errorCode: "AUF-DM:001", message: "REST call rejected" },
        UNKNOWNID: { errorCode: "AUF-DM:002", message: "Data model not loaded" }
    };
    var UIDataModel = (function () {
        function UIDataModel(id) {
            this.busy = false;
            this.idProperty = "id";
            this.loaded = false;
            this.metadata = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.properties, ModelMetadata, Object.getPrototypeOf(this));
            Object.defineProperties(this, this.metadata.propertyDefs);
            this.metadata.original = __assign({}, this.serialize());
            this.metadata.updated = __assign({}, this.serialize());
            Object.defineProperties(this, {
                apiSlug: {
                    enumerable: false,
                    writable: true
                },
                busy: {
                    enumerable: false
                },
                httpClient: {
                    enumerable: false,
                    value: aureliaFramework.Container.instance.get(UIHttpService),
                    writable: false
                },
                id: {
                    enumerable: true,
                    writable: true
                },
                idProperty: {
                    enumerable: false,
                    writable: true
                },
                loaded: {
                    enumerable: false
                },
                logger: {
                    enumerable: false,
                    value: aureliaLogging.getLogger(this.constructor.name)
                },
                metadata: {
                    enumerable: false
                }
            });
            this.logger.info("Model created");
            if (id) {
                this.get(id);
            }
        }
        Object.defineProperty(UIDataModel.prototype, "isDirty", {
            get: function () {
                return !!this.metadata.dirtyProps.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIDataModel.prototype, "dirtyProps", {
            get: function () {
                var ret = {};
                this.metadata.dirtyProps.forEach(function (prop) { return (ret[prop] = true); });
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        UIDataModel.serializeObject = function (o) {
            var _this = this;
            var pojo = {};
            if (o instanceof UIDataModel) {
                return o.serialize();
            }
            else if (o instanceof Map) {
                o.forEach(function (obj, key) { return (pojo[key] = _this.serializeProperty(obj)); });
            }
            else {
                Object.keys(o).forEach(function (key) { return (pojo[key] = _this.serializeProperty(o[key])); });
            }
            return pojo;
        };
        UIDataModel.serializeProperty = function (p) {
            if (isArray(p)) {
                return p.join(",");
            }
            else if (isObject(p)) {
                return this.serializeObject(p);
            }
            else {
                return isEmpty(p) ? null : p;
            }
        };
        UIDataModel.prototype.get = function (id) {
            var _this = this;
            if (!this.apiSlug) {
                return Promise.reject(ERROR_CODES.NO_API);
            }
            return this.callPreHook("preGet", id)
                .then(function (result) {
                if (result !== false) {
                    return _this.doGet(id);
                }
                Promise.reject(ERROR_CODES.REJECTED);
            })
                .then(function (response) { return _this.postGet(response); });
        };
        UIDataModel.prototype.save = function () {
            var _this = this;
            if (!this.apiSlug) {
                return Promise.reject(ERROR_CODES.NO_API);
            }
            return this.callPreHook("preSave")
                .then(function (result) {
                if (result !== false) {
                    if (_this.loaded) {
                        return _this.doPut();
                    }
                    else {
                        return _this.doPost();
                    }
                }
                Promise.reject(ERROR_CODES.REJECTED);
            })
                .then(function (response) {
                _this.loaded = true;
                _this.postSave(response);
            });
        };
        UIDataModel.prototype.delete = function () {
            var _this = this;
            if (!this.apiSlug) {
                return Promise.reject(ERROR_CODES.NO_API);
            }
            if (!this.loaded) {
                return Promise.reject(ERROR_CODES.UNKNOWNID);
            }
            return this.callPreHook("preDelete")
                .then(function (result) {
                if (result !== false) {
                    return _this.doDelete();
                }
                Promise.reject(ERROR_CODES.REJECTED);
            })
                .then(function (response) {
                _this.postDelete(response);
                _this.dispose();
            });
        };
        UIDataModel.prototype.update = function () {
            this.metadata.updated = __assign({}, this.serialize());
        };
        UIDataModel.prototype.reset = function () {
            this.metadata.updated = __assign({}, this.metadata.original);
            this.discard();
        };
        UIDataModel.prototype.discard = function () {
            var _this = this;
            this.metadata.dirtyProps = [];
            var updated = __assign({}, this.metadata.updated);
            this.metadata.serializableProps.forEach(function (prop) { return (_this[prop] = updated[prop]); });
        };
        UIDataModel.prototype.addObserver = function (ob) {
            this.metadata.observers.push(ob);
        };
        UIDataModel.prototype.observe = function (property, callback) {
            this.metadata.observers.push(UIInternal.observe(this, property, callback));
        };
        UIDataModel.prototype.dispose = function () {
            this.logger.info("Model Disposing");
            while (this.metadata.observers && this.metadata.observers.length) {
                this.metadata.observers.pop().dispose();
            }
        };
        UIDataModel.prototype.serialize = function () {
            var _this = this;
            var POJO = {};
            this.metadata.serializableProps.forEach(function (prop) { return (POJO[prop] = UIDataModel.serializeProperty(_this[prop])); });
            return POJO;
        };
        UIDataModel.prototype.deserialize = function (json) {
            var _this = this;
            this.loaded = true;
            if (json[this.idProperty]) {
                this.internalId = json[this.idProperty];
            }
            this.metadata.original = __assign({}, json);
            this.metadata.updated = __assign({}, json);
            Object.keys(json).forEach(function (prop) { return (_this[prop] = json[prop]); });
        };
        UIDataModel.prototype.preGet = function () {
        };
        UIDataModel.prototype.preSave = function () {
        };
        UIDataModel.prototype.preDelete = function () {
        };
        UIDataModel.prototype.postGet = function (response) {
        };
        UIDataModel.prototype.postSave = function (response) {
        };
        UIDataModel.prototype.postDelete = function (response) {
        };
        UIDataModel.prototype.generateId = function () {
            return Math.round(Math.random() * new Date().getTime()).toString(18);
        };
        UIDataModel.prototype.propertyGetter = function (prop) {
            return function () {
                return this["_" + prop];
            };
        };
        UIDataModel.prototype.propertySetter = function (prop) {
            return function (v) {
                this["_" + prop] = v;
                this.updateDirty(prop, v);
                return v;
            };
        };
        UIDataModel.prototype.updateDirty = function (prop, value) {
            var hasDirty = this.metadata.dirtyProps.indexOf(prop) > -1;
            var isDirty = this.metadata.original[prop] !== (value === "" ? null : value);
            if (!hasDirty && isDirty) {
                this.metadata.dirtyProps.push(prop);
            }
            if (hasDirty && !isDirty) {
                this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
            }
        };
        UIDataModel.prototype.callPreHook = function (hook, data) {
            var result = this[hook](data);
            if (result instanceof Promise) {
                return result;
            }
            if (result !== null && result !== undefined) {
                return Promise.resolve(result);
            }
            return Promise.resolve(true);
        };
        UIDataModel.prototype.doGet = function (id) {
            var _this = this;
            this.busy = true;
            return this.httpClient
                .json(this.apiSlug + id)
                .then(function (json) {
                _this.deserialize(json);
                _this.busy = false;
                return json;
            })
                .catch(function (e) {
                Promise.reject(e);
                _this.busy = false;
            });
        };
        UIDataModel.prototype.doPost = function () {
            var _this = this;
            this.busy = true;
            return this.httpClient
                .post(this.apiSlug, this.serialize())
                .then(function (json) {
                _this.deserialize(json);
                _this.busy = false;
                return json;
            })
                .catch(function (e) {
                Promise.reject(e);
                _this.busy = false;
            });
        };
        UIDataModel.prototype.doPut = function () {
            var _this = this;
            this.busy = true;
            return this.httpClient
                .put(this.apiSlug + this.internalId, this.serialize())
                .then(function (json) {
                _this.deserialize(json);
                _this.busy = false;
                return json;
            })
                .catch(function (e) {
                Promise.reject(e);
                _this.busy = false;
            });
        };
        UIDataModel.prototype.doDelete = function () {
            var _this = this;
            this.busy = true;
            return this.httpClient
                .delete(this.apiSlug + this.internalId)
                .then(function (json) {
                _this.busy = false;
                return json;
            })
                .catch(function (e) {
                Promise.reject(e);
                _this.busy = false;
            });
        };
        UIDataModel.prototype.doUpdate = function () {
            this.id = this[this.idProperty] || this.generateId();
            this.metadata.dirtyProps = [];
            this.metadata.original = __assign({}, this.serialize());
            this.metadata.updated = __assign({}, this.serialize());
        };
        __decorate([
            aureliaFramework.computedFrom("metadata.dirtyProps.length"),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [])
        ], UIDataModel.prototype, "isDirty", null);
        __decorate([
            aureliaFramework.computedFrom("metadata.dirtyProps.length"),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIDataModel.prototype, "dirtyProps", null);
        return UIDataModel;
    }());
    function serializable(defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return function (target, property) {
            if (!property) {
                throw Error("Decorator should be used on property only!");
            }
            var meta = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.properties, ModelMetadata, target);
            meta.serializableProps.push(property);
            meta.propertyDefs[property] = {
                enumerable: true,
                get: target.propertyGetter(property),
                set: target.propertySetter(property)
            };
            meta.propertyDefs["_" + property] = {
                enumerable: false,
                value: defaultValue,
                writable: true
            };
        };
    }
    var ModelMetadata = (function () {
        function ModelMetadata() {
            this.serializableProps = [];
            this.dirtyProps = [];
            this.observers = [];
            this.propertyDefs = {};
            this.updated = {};
            this.original = {};
        }
        return ModelMetadata;
    }());

    var UIApplication = (function () {
        function UIApplication(config) {
            this.config = config;
            this.logger = aureliaLogging.getLogger("UIApplication");
        }
        UIApplication.prototype.log = function (tag) {
            var _a;
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            (_a = this.logger).info.apply(_a, __spread([tag], rest));
        };
        UIApplication.prototype.debug = function (tag) {
            var _a;
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            (_a = this.logger).debug.apply(_a, __spread([tag], rest));
        };
        UIApplication = __decorate([
            aureliaFramework.singleton(),
            aureliaFramework.autoinject(),
            __metadata("design:paramtypes", [UIAppConfig])
        ], UIApplication);
        return UIApplication;
    }());

    var UIDialogService = (function () {
        function UIDialogService(appConfig, container, compositionEngine) {
            this.appConfig = appConfig;
            this.container = container;
            this.compositionEngine = compositionEngine;
            this.windows = [];
            this.initialized = false;
            this.dragObject = {
                dialog: undefined,
                dlgHeight: 0,
                dlgWidth: 0,
                isDragging: false,
                left: 0,
                maxHeight: 0,
                maxWidth: 0,
                startX: 0,
                startY: 0,
                top: 0
            };
        }
        UIDialogService.prototype.open = function (viewModel, model) {
            this.openDialog(viewModel, model);
        };
        UIDialogService.prototype.openModal = function (viewModel, model) {
            this.openDialog(viewModel, model, true);
        };
        UIDialogService.prototype.openDialog = function (viewModel, model, modal) {
            var _this = this;
            if (modal === void 0) { modal = false; }
            this.initialize();
            var instruction = {
                childContainer: this.container.createChild(),
                container: this.container,
                model: model,
                viewModel: viewModel
            };
            return new Promise(function (resolve) {
                _this.getViewModel(instruction)
                    .then(function (newInstruction) {
                    return UIInternal.invokeLifecycle(newInstruction.viewModel, "canActivate", model);
                })
                    .then(function (canActivate) {
                    return canActivate !== false
                        ? _this.compositionEngine.createController(instruction)
                        : Promise.reject(new Error("canActivate rejected"));
                })
                    .then(function (controller) {
                    controller.automate();
                    var dialog = controller.view.controllers.find(function (c) { return c.viewModel; });
                    dialog.viewModel.modal = modal;
                    dialog.viewModel.viewController = controller;
                    dialog.viewModel.returnPromise = resolve;
                    _this.appConfig.DialogContainer.add(controller.view);
                    if (dialog.viewModel.taskButton) {
                        _this.appConfig.TaskbarContainer.add(dialog.viewModel.taskButton);
                    }
                    controller.attached();
                    if (_this.activeWin) {
                        _this.activeWin.active = false;
                    }
                    _this.windows.unshift((_this.activeWin = dialog.viewModel));
                });
            });
        };
        UIDialogService.prototype.initialize = function () {
            var _this = this;
            if (!this.initialized) {
                this.initialized = true;
                UIInternal.subscribe("dlg:close", function (d) { return _this.closeDialog(d); });
                UIInternal.subscribe("dlg:activate", function (d) { return _this.activate(d.dialog); });
                UIInternal.subscribe("dlg:minimize", function (d) { return _this.minimizeDialog(d.dialog); });
                UIInternal.subscribe("dlg:drag", function (d) { return _this.startDrag(d); });
                document.addEventListener("mousemove", function (e) { return _this.drag(e); });
                document.addEventListener("mouseup", function (e) { return _this.stopDrag(e); });
                if (this.appConfig.TaskbarContainer) {
                    this.appConfig.TaskbarContainer.anchor.addEventListener("click", function (e) {
                        try {
                            var dialog = e.target.au.controller.scope.bindingContext;
                            if (dialog.minimized || dialog.active) {
                                dialog.minimize();
                            }
                            else {
                                _this.activate(dialog);
                            }
                        }
                        catch (ex) {
                        }
                    });
                }
            }
        };
        UIDialogService.prototype.startDrag = function (startObject) {
            this.dragObject = __assign({}, startObject, { dlgHeight: startObject.dialog.dialogEl.offsetHeight, dlgWidth: startObject.dialog.dialogEl.offsetWidth, isDragging: true, left: parseInt(startObject.dialog.position.left, 10), maxHeight: this.appConfig.DialogContainer.anchor.offsetHeight, maxWidth: this.appConfig.DialogContainer.anchor.offsetWidth, top: parseInt(startObject.dialog.position.top, 10) });
        };
        UIDialogService.prototype.drag = function ($event) {
            if (this.dragObject.isDragging) {
                var leftDiff = ($event.x || $event.clientX) - this.dragObject.startX;
                var topDiff = ($event.y || $event.clientY) - this.dragObject.startY;
                if (this.dragObject.left + leftDiff + this.dragObject.dlgWidth > this.dragObject.maxWidth) {
                    this.dragObject.dialog.position.left =
                        this.dragObject.maxWidth - this.dragObject.dlgWidth + "px";
                }
                else if (this.dragObject.left + leftDiff > 0) {
                    this.dragObject.dialog.position.left = this.dragObject.left + leftDiff + "px";
                }
                if (this.dragObject.top + topDiff + this.dragObject.dlgHeight > this.dragObject.maxHeight) {
                    this.dragObject.dialog.position.top =
                        this.dragObject.maxHeight - this.dragObject.dlgHeight + "px";
                }
                else if (this.dragObject.top + topDiff > 0) {
                    this.dragObject.dialog.position.top = this.dragObject.top + topDiff + "px";
                }
            }
        };
        UIDialogService.prototype.stopDrag = function ($event) {
            if (this.dragObject.isDragging) {
                this.dragObject.isDragging = false;
            }
        };
        UIDialogService.prototype.minimizeDialog = function (dialog) {
            if (dialog) {
                if (dialog.minimized && this.activeWin === dialog) {
                    this.activeWin = this.windows.find(function (d) { return !d.active && !d.minimized && d !== dialog; });
                    this.activeWin ? (this.activeWin.active = true) : fn();
                }
                else {
                    this.activate(dialog);
                }
            }
        };
        UIDialogService.prototype.closeDialog = function (detail) {
            var _this = this;
            if (detail && detail.dialog) {
                var dialog_1 = detail.dialog, result_1 = detail.result;
                UIInternal.invokeLifecycle(dialog_1.viewController.viewModel, "canDeactivate", result_1).then(function (canDeactivate) {
                    if (canDeactivate !== false) {
                        UIInternal.invokeLifecycle(dialog_1.viewController.viewModel, "deactivate");
                        _this.appConfig.DialogContainer.remove(dialog_1.viewController.view);
                        if (dialog_1.taskButton) {
                            _this.appConfig.TaskbarContainer.remove(dialog_1.taskButton);
                        }
                        dialog_1.viewController.unbind();
                        dialog_1.returnPromise({ result: result_1, cancelled: result_1 === undefined });
                        _this.windows.remove(dialog_1);
                        _this.activeWin = _this.windows.find(function (win) { return !win.minimized; });
                        if (_this.activeWin) {
                            _this.activeWin.active = true;
                        }
                    }
                });
            }
        };
        UIDialogService.prototype.activate = function (dialog) {
            if (this.activeWin) {
                this.activeWin.active = false;
            }
            this.activeWin = dialog;
            dialog.active = true;
        };
        UIDialogService.prototype.getViewModel = function (instruction) {
            if (isString(instruction.viewModel)) {
                return this.compositionEngine.ensureViewModel(instruction);
            }
            return Promise.resolve(instruction);
        };
        UIDialogService = __decorate([
            aureliaFramework.autoinject(),
            aureliaFramework.singleton(),
            __metadata("design:paramtypes", [UIAppConfig,
                aureliaFramework.Container,
                aureliaFramework.CompositionEngine])
        ], UIDialogService);
        return UIDialogService;
    }());

    var alertView = "<div class=\"ui-dialog__wrapper\" data-modal.bind=\"true\" ref=\"__el\" keydown.delegate=\"__keyCheck($event.keyCode)\">\n  <input blur.trigger=\"$event.target.focus()\" readonly.one-time=\"true\" tabindex=\"0\" css.bind=\"{opacity:0}\" ref=\"keyEl\">\n  <div class=\"ui-panel-base ui-dialog\" ui-border=\"xy ${theme}\" data-active.bind=\"true\" css.bind=\"{minWidth: '18rem'}\">\n    <div class=\"ui-panel__body\" ref=\"vmElement\">\n      <ui-row ui-color.bind=\"theme\">\n        <ui-col ui-padding=\"sm\" size=\"auto\" if.bind=\"icon\" ui-font=\"xl\">\n          <ui-icon icon.bind=\"icon\"></ui-icon>\n        </ui-col>\n        <ui-col ui-padding=\"sm\" size=\"fill\">\n          <div if.bind=\"title\" ui-weight=\"medium\" innerhtml.bind=\"title\"></div>\n          <div innerhtml.bind=\"message\"></div>\n        </ui-col>\n      </ui-row>\n    </div>\n    <div class=\"ui-footer\" ui-padding=\"y--sm\" ui-align=\"center\">\n      <ui-button if.bind=\"type!=='alert'\" click.trigger=\"__close(false)\" ui-theme.bind=\"theme\" type=\"outline\" size=\"sm\" css.bind=\"{minWidth:'4rem'}\">${cancelLabel}</ui-button>\n      <ui-button click.trigger=\"__close(true)\" ui-theme.bind=\"theme\" type=\"solid\" size=\"sm\" css.bind=\"{minWidth:'4rem'}\">${okLabel}</ui-button>\n    </div>\n  </div>\n</div>\n";

    var toastView = "<div class=\"${class} ui-alert\" data-open=\"false\" ui-theme.bind=\"theme\" ref=\"__el\">\n    <div class=\"ui-alert__wrapper\">\n      <div if.bind=\"icon\" class=\"ui-alert__icon\"><ui-icon icon.bind=\"icon\"></ui-icon></div>\n      <div if.bind=\"title\" class=\"ui-alert__title\" innerhtml.bind=\"title\"></div>\n      <div class=\"ui-alert__body\" innerhtml.bind=\"message\"></div>\n      <div class=\"ui-alert__close\" click.trigger=\"__close(false)\">\n        <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n      </div>\n      <div class=\"ui-alert__footer\" if.bind=\"type==='confirm'\">\n        <a click.trigger=\"__close(false)\">${cancelLabel}</a>\n        <a click.trigger=\"__close(true)\" ui-weight=\"bold\">${okLabel}</a>\n      </div>\n      <div if.bind=\"autoClose\" class=\"ui-alert__progress\" css.bind=\"{transitionDuration: timeout+'ms'}\"></div>\n    </div>\n  </div>\n\n";

    var UINotificationService = (function () {
        function UINotificationService(appConfig, container, compiler) {
            this.appConfig = appConfig;
            this.container = container;
            this.compiler = compiler;
        }
        UINotificationService.prototype.alert = function (message, title, config) {
            if (config === void 0) { config = {}; }
            config = this.buildConfig(message, title, config);
            config.type = "alert";
            return this.createAlert(config);
        };
        UINotificationService.prototype.confirm = function (message, title, config) {
            if (config === void 0) { config = {}; }
            config = this.buildConfig(message, title, config);
            config.type = "confirm";
            return this.createAlert(config);
        };
        UINotificationService.prototype.message = function (message, title, config) {
            if (config === void 0) { config = {}; }
            return this.createToast(this.buildConfig(message, title, config));
        };
        UINotificationService.prototype.toast = function (message, title, config) {
            if (config === void 0) { config = {}; }
            return this.createToast(this.buildConfig(message, title, config), true);
        };
        UINotificationService.prototype.buildConfig = function (message, title, config) {
            if (config === void 0) { config = {}; }
            if (isObject(message)) {
                config = message;
            }
            if (isString(message)) {
                config.message = message;
            }
            if (isString(title)) {
                config.title = title;
            }
            return config;
        };
        UINotificationService.prototype.createToast = function (config, forToastNotification) {
            var _this = this;
            return new Promise(function (resolve) {
                var cfg = __assign({ autoClose: true, cancelLabel: "Cancel", okLabel: "OK", theme: "default", timeout: 5000, type: "default", class: forToastNotification ? "ui-toast" : "ui-message" }, config);
                cfg.autoClose = cfg.type !== "confirm" && cfg.autoClose;
                var viewFactory = _this.compiler.compile("<template>" + toastView + "</template>");
                var view = viewFactory.create(_this.container);
                cfg.__close = function (b) {
                    view.firstChild.dataset.open = "false";
                    resolve(b !== false);
                    setTimeout(function () {
                        view.removeNodes();
                    }, 500);
                };
                view.bind(__assign({}, cfg));
                view.appendNodesTo(forToastNotification ? _this.appConfig.ToastContainer : _this.appConfig.AlertContainer);
                if (cfg.autoClose) {
                    setTimeout(cfg.__close, cfg.timeout);
                }
                UIInternal.queueTask(function () { return (view.firstChild.dataset.open = "true"); });
            });
        };
        UINotificationService.prototype.createAlert = function (config) {
            var _this = this;
            return new Promise(function (resolve) {
                var cfg = __assign({ cancelLabel: "Cancel", okLabel: "OK", theme: "default", type: "alert" }, config);
                var viewFactory = _this.compiler.compile("<template>" + alertView + "</template>");
                var view = viewFactory.create(_this.container);
                cfg.__keyCheck = function (key) {
                    if (key === 13 || (key === 27 && cfg.type === "alert")) {
                        cfg.__close(true);
                    }
                    else if (key === 27) {
                        cfg.__close(false);
                    }
                };
                cfg.__close = function (b) {
                    view.firstChild.classList.remove("ui-alert--show");
                    resolve(b !== false);
                    setTimeout(function () {
                        _this.appConfig.DialogContainer.remove(view);
                    }, 0);
                };
                view.bind(cfg);
                _this.appConfig.DialogContainer.add(view);
                cfg.keyEl.focus();
            });
        };
        UINotificationService = __decorate([
            aureliaFramework.singleton(),
            aureliaFramework.autoinject(),
            __metadata("design:paramtypes", [UIAppConfig,
                aureliaFramework.Container,
                aureliaFramework.ViewCompiler])
        ], UINotificationService);
        return UINotificationService;
    }());

    var Countries$1 = Countries;
    var queueTask = UIInternal.queueTask;
    var queueMicroTask = UIInternal.queueMicroTask;
    var broadcast = UIInternal.broadcast;
    var subscribe = UIInternal.subscribe;
    var subscribeOnce = UIInternal.subscribeOnce;
    var AppConfig = function () {
    };
    AppConfig.prototype.ApiBaseUrl = "";
    AppConfig.prototype.ApiHeaders = "";
    var UIFrameworkConfig = (function () {
        function UIFrameworkConfig(auConfig) {
            var _this = this;
            this.auConfig = auConfig;
            this.use = {
                all: function () {
                    _this.loadFromModule(Buttons);
                    _this.loadFromModule(Card);
                    _this.loadFromModule(Panels);
                    _this.loadFromModule(Menus);
                    _this.loadFromModule(Forms);
                    _this.loadFromModule(Lists);
                    _this.loadFromModule(TabPanel);
                    _this.loadFromModule(DataPanels);
                    _this.loadFromModule(Calendar);
                    _this.loadFromModule(Gridder);
                }
            };
            this.loadFromModule(Viewport);
            this.loadFromModule(Page);
            this.loadFromModule(Icons$1);
            this.loadFromModule(Responsive);
            this.loadFromModule(Shared);
            this.loadFromModule(Attributes);
            this.loadFromModule(ValueConverters);
        }
        UIFrameworkConfig.prototype.setApiBaseUrl = function (v) {
            AppConfig.prototype.ApiBaseUrl = v;
            return this;
        };
        UIFrameworkConfig.prototype.setApiHeaders = function (v) {
            AppConfig.prototype.ApiHeaders = v;
            return this;
        };
        UIFrameworkConfig.prototype.setKeyValue = function (key, v) {
            AppConfig.prototype[key] = v;
            return this;
        };
        UIFrameworkConfig.prototype.loadFromModule = function (moduleName) {
            this.auConfig.globalResources(moduleName);
        };
        return UIFrameworkConfig;
    }());
    function configure(auConfig, configCallback) {
        aureliaFramework.Container.instance = auConfig.container;
        auConfig.container.registerHandler("ui-validator", function (container) {
            return container.get(UIValidationRenderer);
        });
        registerValidators(auConfig.container);
        var config = new UIFrameworkConfig(auConfig);
        if (isFunction(configCallback)) {
            configCallback(config);
        }
        else {
            config.use.all();
        }
        auConfig.singleton(UIAppConfig, AppConfig);
    }

    exports.Countries = Countries$1;
    exports.UIApplication = UIApplication;
    exports.UIDataModel = UIDataModel;
    exports.UIDialogService = UIDialogService;
    exports.UIFrameworkConfig = UIFrameworkConfig;
    exports.UIHttpService = UIHttpService;
    exports.UINotificationService = UINotificationService;
    exports.broadcast = broadcast;
    exports.configure = configure;
    exports.queueMicroTask = queueMicroTask;
    exports.queueTask = queueTask;
    exports.serializable = serializable;
    exports.subscribe = subscribe;
    exports.subscribeOnce = subscribeOnce;

    Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=aurelia-ui-framework.js.map
