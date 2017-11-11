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
        if (element.nodeType == Node.ELEMENT_NODE) {
            this.parentEl = element;
        }
        if (element.nodeType == Node.COMMENT_NODE) {
            this.parentEl = element.previousSibling;
        }
    }
    UIBadgeBase.prototype.attached = function () {
        if (this.parentEl.classList.contains('ui-button')) {
            this.parentEl.firstElementChild.appendChild(this.badgeEl);
        }
        else {
            this.parentEl.appendChild(this.badgeEl);
        }
        this.parentEl.classList.add('ui-has-badge');
    };
    UIBadgeBase.prototype.bind = function (bindingContext, overrideContext) { this.valueChanged(this.value); };
    UIBadgeBase.prototype.valueChanged = function (newValue) {
        this.badgeEl.classList[newValue ? 'remove' : 'add']('ui-hidden');
        this.badgeEl.dataset['value'] = newValue;
    };
    UIBadgeBase = __decorate([
        aurelia_framework_1.noView(),
        __metadata("design:paramtypes", [Element, String])
    ], UIBadgeBase);
    return UIBadgeBase;
}());
exports.UIBadgeBase = UIBadgeBase;
var UIBadge = (function (_super) {
    __extends(UIBadge, _super);
    function UIBadge(element) {
        var _this = _super.call(this, element, 'ui-gray') || this;
        _this.element = element;
        _this.theme = 'gray';
        _this.value = '';
        return _this;
    }
    UIBadge.prototype.bind = function () {
        this.valueChanged(this.value);
        this.badgeEl.className = "ui-badge ui-" + this.theme;
    };
    UIBadge.prototype.themeChanged = function (newValue) {
        this.badgeEl.className = "ui-badge ui-" + newValue;
    };
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIBadge.prototype, "theme", void 0);
    __decorate([
        aurelia_framework_1.bindable({ primaryProperty: true }),
        __metadata("design:type", Object)
    ], UIBadge.prototype, "value", void 0);
    UIBadge = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('badge'),
        __metadata("design:paramtypes", [Element])
    ], UIBadge);
    return UIBadge;
}(UIBadgeBase));
exports.UIBadge = UIBadge;
var UIBadgeDark = (function (_super) {
    __extends(UIBadgeDark, _super);
    function UIBadgeDark(element) {
        var _this = _super.call(this, element, 'ui-dark') || this;
        _this.element = element;
        return _this;
    }
    UIBadgeDark = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('badge-dark'),
        __metadata("design:paramtypes", [Element])
    ], UIBadgeDark);
    return UIBadgeDark;
}(UIBadgeBase));
exports.UIBadgeDark = UIBadgeDark;
var UIBadgePrimary = (function (_super) {
    __extends(UIBadgePrimary, _super);
    function UIBadgePrimary(element) {
        var _this = _super.call(this, element, 'ui-primary') || this;
        _this.element = element;
        return _this;
    }
    UIBadgePrimary = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('badge-primary'),
        __metadata("design:paramtypes", [Element])
    ], UIBadgePrimary);
    return UIBadgePrimary;
}(UIBadgeBase));
exports.UIBadgePrimary = UIBadgePrimary;
var UIBadgeSecondary = (function (_super) {
    __extends(UIBadgeSecondary, _super);
    function UIBadgeSecondary(element) {
        var _this = _super.call(this, element, 'ui-secondary') || this;
        _this.element = element;
        return _this;
    }
    UIBadgeSecondary = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('badge-secondary'),
        __metadata("design:paramtypes", [Element])
    ], UIBadgeSecondary);
    return UIBadgeSecondary;
}(UIBadgeBase));
exports.UIBadgeSecondary = UIBadgeSecondary;
var UIBadgeInfo = (function (_super) {
    __extends(UIBadgeInfo, _super);
    function UIBadgeInfo(element) {
        var _this = _super.call(this, element, 'ui-info') || this;
        _this.element = element;
        return _this;
    }
    UIBadgeInfo = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('badge-info'),
        __metadata("design:paramtypes", [Element])
    ], UIBadgeInfo);
    return UIBadgeInfo;
}(UIBadgeBase));
exports.UIBadgeInfo = UIBadgeInfo;
var UIBadgeDanger = (function (_super) {
    __extends(UIBadgeDanger, _super);
    function UIBadgeDanger(element) {
        var _this = _super.call(this, element, 'ui-danger') || this;
        _this.element = element;
        return _this;
    }
    UIBadgeDanger = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('badge-danger'),
        __metadata("design:paramtypes", [Element])
    ], UIBadgeDanger);
    return UIBadgeDanger;
}(UIBadgeBase));
exports.UIBadgeDanger = UIBadgeDanger;
var UIBadgeSuccess = (function (_super) {
    __extends(UIBadgeSuccess, _super);
    function UIBadgeSuccess(element) {
        var _this = _super.call(this, element, 'ui-success') || this;
        _this.element = element;
        return _this;
    }
    UIBadgeSuccess = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('badge-success'),
        __metadata("design:paramtypes", [Element])
    ], UIBadgeSuccess);
    return UIBadgeSuccess;
}(UIBadgeBase));
exports.UIBadgeSuccess = UIBadgeSuccess;
var UIBadgeWarning = (function (_super) {
    __extends(UIBadgeWarning, _super);
    function UIBadgeWarning(element) {
        var _this = _super.call(this, element, 'ui-warning') || this;
        _this.element = element;
        return _this;
    }
    UIBadgeWarning = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customAttribute('badge-warning'),
        __metadata("design:paramtypes", [Element])
    ], UIBadgeWarning);
    return UIBadgeWarning;
}(UIBadgeBase));
exports.UIBadgeWarning = UIBadgeWarning;
