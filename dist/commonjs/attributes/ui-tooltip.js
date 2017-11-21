"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ui_utils_1 = require("../utils/ui-utils");
var UITooltipBase = (function () {
    function UITooltipBase(element) {
        this.position = '';
        this.theme = '';
        this.value = '';
        if (element.nodeType == Node.ELEMENT_NODE) {
            this.parentEl = element;
        }
        if (element.nodeType == Node.COMMENT_NODE) {
            this.parentEl = element.previousSibling;
        }
    }
    UITooltipBase_1 = UITooltipBase;
    UITooltipBase.prototype.attached = function () {
        var _this = this;
        if (!UITooltipBase_1.tooltipEl) {
            var el = UITooltipBase_1.tooltipEl = document.createElement('div');
            el.classList.add('ui-tooltip');
            ui_utils_1.UIUtils.overlayContainer.appendChild(el);
        }
        this.parentEl.addEventListener('mouseenter', function () { return _this.show(); });
        this.parentEl.addEventListener('mouseleave', function () { return _this.hide(); });
    };
    UITooltipBase.prototype.detached = function () { this.hide(); };
    UITooltipBase.prototype.unbind = function () { this.hide(); };
    UITooltipBase.prototype.show = function () {
        var position = this.position;
        var theme = this.theme;
        var value = this.value;
        if (typeof this.value === 'object') {
            position = this.value.position || 'top';
            theme = this.value.theme || 'light';
            value = this.value.value || '';
        }
        if (isEmpty(this.value))
            return;
        var el = UITooltipBase_1.tooltipEl;
        el.className = 'ui-tooltip ui-' + theme;
        el.innerHTML = value;
        this.tether = ui_utils_1.UIUtils.tether(this.parentEl, el, { resize: false, oppEdge: true, position: UITooltip.POSITIONS[position] || 'tc' });
        this.timer = setTimeout(function () { return el.classList.add('ui-show'); }, 700);
    };
    UITooltipBase.prototype.hide = function () {
        clearTimeout(this.timer);
        if (this.tether)
            this.tether.dispose();
        UITooltipBase_1.tooltipEl.className = 'ui-tooltip';
        this.tether = null;
    };
    UITooltipBase.POSITIONS = {
        top: 'tc',
        bottom: 'bc',
        start: 'cl',
        end: 'cr'
    };
    UITooltipBase = UITooltipBase_1 = __decorate([
        aurelia_framework_1.noView(),
        __metadata("design:paramtypes", [Element])
    ], UITooltipBase);
    return UITooltipBase;
    var UITooltipBase_1;
}());
exports.UITooltipBase = UITooltipBase;
var UITooltip = (function (_super) {
    __extends(UITooltip, _super);
    function UITooltip(element) {
        var _this = _super.call(this, element) || this;
        _this.element = element;
        _this.position = 'top';
        _this.theme = 'light';
        _this.value = '';
        return _this;
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITooltip.prototype, "position", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITooltip.prototype, "theme", void 0);
    __decorate([
        aurelia_framework_1.bindable({ primaryProperty: true }),
        __metadata("design:type", Object)
    ], UITooltip.prototype, "value", void 0);
    UITooltip = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('tooltip'),
        __metadata("design:paramtypes", [Element])
    ], UITooltip);
    return UITooltip;
}(UITooltipBase));
exports.UITooltip = UITooltip;
var UITooltipDark = (function (_super) {
    __extends(UITooltipDark, _super);
    function UITooltipDark(element) {
        var _this = _super.call(this, element) || this;
        _this.element = element;
        _this.theme = 'dark';
        return _this;
    }
    UITooltipDark = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('tooltip-dark'),
        __metadata("design:paramtypes", [Element])
    ], UITooltipDark);
    return UITooltipDark;
}(UITooltipBase));
exports.UITooltipDark = UITooltipDark;
var UITooltipPrimary = (function (_super) {
    __extends(UITooltipPrimary, _super);
    function UITooltipPrimary(element) {
        var _this = _super.call(this, element) || this;
        _this.element = element;
        _this.theme = 'primary';
        return _this;
    }
    UITooltipPrimary = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('tooltip-primary'),
        __metadata("design:paramtypes", [Element])
    ], UITooltipPrimary);
    return UITooltipPrimary;
}(UITooltipBase));
exports.UITooltipPrimary = UITooltipPrimary;
var UITooltipSecondary = (function (_super) {
    __extends(UITooltipSecondary, _super);
    function UITooltipSecondary(element) {
        var _this = _super.call(this, element) || this;
        _this.element = element;
        _this.theme = 'secondary';
        return _this;
    }
    UITooltipSecondary = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('tooltip-secondary'),
        __metadata("design:paramtypes", [Element])
    ], UITooltipSecondary);
    return UITooltipSecondary;
}(UITooltipBase));
exports.UITooltipSecondary = UITooltipSecondary;
