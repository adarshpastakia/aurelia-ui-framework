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
var UIBadgeBase = (function () {
    function UIBadgeBase(element, bg) {
        this.value = '';
        this.badgeEl = document.createElement('div');
        this.badgeEl.classList.add('ui-badge');
        this.badgeEl.classList.add(bg);
        if (element.nodeType == Node.ELEMENT_NODE)
            element.appendChild(this.badgeEl);
        if (element.nodeType == Node.COMMENT_NODE)
            element.previousSibling.appendChild(this.badgeEl);
    }
    UIBadgeBase.prototype.created = function (owningView, myView) { };
    UIBadgeBase.prototype.bind = function (bindingContext, overrideContext) { this.valueChanged(this.value); };
    UIBadgeBase.prototype.attached = function () { };
    UIBadgeBase.prototype.detached = function () { };
    UIBadgeBase.prototype.unbind = function () { };
    UIBadgeBase.prototype.valueChanged = function (newValue) {
        this.badgeEl.classList[newValue ? 'remove' : 'add']('ui-hidden');
        this.badgeEl.innerHTML = newValue;
    };
    return UIBadgeBase;
}());
var UIBadge = (function (_super) {
    __extends(UIBadge, _super);
    function UIBadge(element) {
        var _this = _super.call(this, element, 'ui-bg-dark') || this;
        _this.element = element;
        return _this;
    }
    return UIBadge;
}(UIBadgeBase));
UIBadge = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.customAttribute('badge'),
    __metadata("design:paramtypes", [Element])
], UIBadge);
exports.UIBadge = UIBadge;
var UIBadgePrimary = (function (_super) {
    __extends(UIBadgePrimary, _super);
    function UIBadgePrimary(element) {
        var _this = _super.call(this, element, 'ui-bg-primary') || this;
        _this.element = element;
        return _this;
    }
    return UIBadgePrimary;
}(UIBadgeBase));
UIBadgePrimary = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.customAttribute('badge-primary'),
    __metadata("design:paramtypes", [Element])
], UIBadgePrimary);
exports.UIBadgePrimary = UIBadgePrimary;
var UIBadgeSecondary = (function (_super) {
    __extends(UIBadgeSecondary, _super);
    function UIBadgeSecondary(element) {
        var _this = _super.call(this, element, 'ui-bg-secondary') || this;
        _this.element = element;
        return _this;
    }
    return UIBadgeSecondary;
}(UIBadgeBase));
UIBadgeSecondary = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.customAttribute('badge-secondary'),
    __metadata("design:paramtypes", [Element])
], UIBadgeSecondary);
exports.UIBadgeSecondary = UIBadgeSecondary;
var UIBadgeInfo = (function (_super) {
    __extends(UIBadgeInfo, _super);
    function UIBadgeInfo(element) {
        var _this = _super.call(this, element, 'ui-bg-info') || this;
        _this.element = element;
        return _this;
    }
    return UIBadgeInfo;
}(UIBadgeBase));
UIBadgeInfo = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.customAttribute('badge-info'),
    __metadata("design:paramtypes", [Element])
], UIBadgeInfo);
exports.UIBadgeInfo = UIBadgeInfo;
var UIBadgeDanger = (function (_super) {
    __extends(UIBadgeDanger, _super);
    function UIBadgeDanger(element) {
        var _this = _super.call(this, element, 'ui-bg-danger') || this;
        _this.element = element;
        return _this;
    }
    return UIBadgeDanger;
}(UIBadgeBase));
UIBadgeDanger = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.customAttribute('badge-danger'),
    __metadata("design:paramtypes", [Element])
], UIBadgeDanger);
exports.UIBadgeDanger = UIBadgeDanger;
var UIBadgeSuccess = (function (_super) {
    __extends(UIBadgeSuccess, _super);
    function UIBadgeSuccess(element) {
        var _this = _super.call(this, element, 'ui-bg-success') || this;
        _this.element = element;
        return _this;
    }
    return UIBadgeSuccess;
}(UIBadgeBase));
UIBadgeSuccess = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.customAttribute('badge-success'),
    __metadata("design:paramtypes", [Element])
], UIBadgeSuccess);
exports.UIBadgeSuccess = UIBadgeSuccess;
var UIBadgeWarning = (function (_super) {
    __extends(UIBadgeWarning, _super);
    function UIBadgeWarning(element) {
        var _this = _super.call(this, element, 'ui-bg-warning') || this;
        _this.element = element;
        return _this;
    }
    return UIBadgeWarning;
}(UIBadgeBase));
UIBadgeWarning = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.customAttribute('badge-warning'),
    __metadata("design:paramtypes", [Element])
], UIBadgeWarning);
exports.UIBadgeWarning = UIBadgeWarning;
