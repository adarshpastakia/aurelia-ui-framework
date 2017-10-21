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
var ui_utils_1 = require("../utils/ui-utils");
var UITooltip = (function () {
    function UITooltip(element) {
        this.element = element;
        this.theme = 'light';
        this.message = '';
        if (!UITooltip_1.tooltipEl) {
            var el = UITooltip_1.tooltipEl = document.createElement('div');
            el.classList.add('ui-tooltip');
            document.body.appendChild(el);
        }
    }
    UITooltip_1 = UITooltip;
    UITooltip.prototype.attached = function () {
        var _this = this;
        this.element.addEventListener('mouseenter', function () { return _this.show(); });
        this.element.addEventListener('mouseleave', function () { return _this.hide(); });
    };
    UITooltip.prototype.detached = function () { this.hide(); };
    UITooltip.prototype.unbind = function () { this.hide(); };
    UITooltip.prototype.show = function () {
        if (isEmpty(this.message))
            return;
        var el = UITooltip_1.tooltipEl;
        el.className = 'ui-tooltip ' + this.theme;
        el.innerHTML = this.message;
        this.tether = ui_utils_1.UIUtils.tether(this.element, el, { resize: false, position: 'tc' });
        this.timer = setTimeout(function () { return el.classList.add('show'); }, 700);
    };
    UITooltip.prototype.hide = function () {
        clearTimeout(this.timer);
        if (this.tether)
            this.tether.dispose();
        UITooltip_1.tooltipEl.className = 'ui-tooltip';
        this.tether = null;
    };
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITooltip.prototype, "theme", void 0);
    __decorate([
        aurelia_framework_1.bindable({ primaryProperty: true }),
        __metadata("design:type", Object)
    ], UITooltip.prototype, "message", void 0);
    UITooltip = UITooltip_1 = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('tooltip'),
        __metadata("design:paramtypes", [Element])
    ], UITooltip);
    return UITooltip;
    var UITooltip_1;
}());
exports.UITooltip = UITooltip;
