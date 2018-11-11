/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
import { autoinject, customAttribute } from "aurelia-framework";
var BaseAttribute = /** @class */ (function () {
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
        autoinject(),
        __metadata("design:paramtypes", [Element])
    ], BaseAttribute);
    return BaseAttribute;
}());
var UITheme = /** @class */ (function (_super) {
    __extends(UITheme, _super);
    function UITheme() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-theme";
        return _this;
    }
    UITheme = __decorate([
        autoinject(),
        customAttribute("ui-theme")
    ], UITheme);
    return UITheme;
}(BaseAttribute));
export { UITheme };
var UIBg = /** @class */ (function (_super) {
    __extends(UIBg, _super);
    function UIBg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-bg";
        return _this;
    }
    UIBg = __decorate([
        autoinject(),
        customAttribute("ui-bg")
    ], UIBg);
    return UIBg;
}(BaseAttribute));
export { UIBg };
var UIColor = /** @class */ (function (_super) {
    __extends(UIColor, _super);
    function UIColor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-color";
        return _this;
    }
    UIColor = __decorate([
        autoinject(),
        customAttribute("ui-color")
    ], UIColor);
    return UIColor;
}(BaseAttribute));
export { UIColor };
var UIHover = /** @class */ (function (_super) {
    __extends(UIHover, _super);
    function UIHover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-hover";
        return _this;
    }
    UIHover = __decorate([
        autoinject(),
        customAttribute("ui-hover")
    ], UIHover);
    return UIHover;
}(BaseAttribute));
export { UIHover };
var UIPadding = /** @class */ (function (_super) {
    __extends(UIPadding, _super);
    function UIPadding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-padding";
        return _this;
    }
    UIPadding = __decorate([
        autoinject(),
        customAttribute("ui-padding")
    ], UIPadding);
    return UIPadding;
}(BaseAttribute));
export { UIPadding };
var UIMargin = /** @class */ (function (_super) {
    __extends(UIMargin, _super);
    function UIMargin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-margin";
        return _this;
    }
    UIMargin = __decorate([
        autoinject(),
        customAttribute("ui-margin")
    ], UIMargin);
    return UIMargin;
}(BaseAttribute));
export { UIMargin };
var UIBorder = /** @class */ (function (_super) {
    __extends(UIBorder, _super);
    function UIBorder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-border";
        return _this;
    }
    UIBorder = __decorate([
        autoinject(),
        customAttribute("ui-border")
    ], UIBorder);
    return UIBorder;
}(BaseAttribute));
export { UIBorder };
var UIFont = /** @class */ (function (_super) {
    __extends(UIFont, _super);
    function UIFont() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-font";
        return _this;
    }
    UIFont = __decorate([
        autoinject(),
        customAttribute("ui-font")
    ], UIFont);
    return UIFont;
}(BaseAttribute));
export { UIFont };
var UIWeight = /** @class */ (function (_super) {
    __extends(UIWeight, _super);
    function UIWeight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-weight";
        return _this;
    }
    UIWeight = __decorate([
        autoinject(),
        customAttribute("ui-weight")
    ], UIWeight);
    return UIWeight;
}(BaseAttribute));
export { UIWeight };
var UIText = /** @class */ (function (_super) {
    __extends(UIText, _super);
    function UIText() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-text";
        return _this;
    }
    UIText = __decorate([
        autoinject(),
        customAttribute("ui-text")
    ], UIText);
    return UIText;
}(BaseAttribute));
export { UIText };
var UIAlign = /** @class */ (function (_super) {
    __extends(UIAlign, _super);
    function UIAlign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-align";
        return _this;
    }
    UIAlign = __decorate([
        autoinject(),
        customAttribute("ui-align")
    ], UIAlign);
    return UIAlign;
}(BaseAttribute));
export { UIAlign };
var UIGutter = /** @class */ (function (_super) {
    __extends(UIGutter, _super);
    function UIGutter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-gutter";
        return _this;
    }
    UIGutter = __decorate([
        autoinject(),
        customAttribute("ui-gutter")
    ], UIGutter);
    return UIGutter;
}(BaseAttribute));
export { UIGutter };
var UIHide = /** @class */ (function (_super) {
    __extends(UIHide, _super);
    function UIHide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-hide";
        return _this;
    }
    UIHide = __decorate([
        autoinject(),
        customAttribute("ui-hide")
    ], UIHide);
    return UIHide;
}(BaseAttribute));
export { UIHide };
var UIShow = /** @class */ (function (_super) {
    __extends(UIShow, _super);
    function UIShow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-show";
        return _this;
    }
    UIShow = __decorate([
        autoinject(),
        customAttribute("ui-show")
    ], UIShow);
    return UIShow;
}(BaseAttribute));
export { UIShow };
var UIClip = /** @class */ (function (_super) {
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
        autoinject(),
        customAttribute("ui-clip")
    ], UIClip);
    return UIClip;
}(BaseAttribute));
export { UIClip };
var UIPaper = /** @class */ (function (_super) {
    __extends(UIPaper, _super);
    function UIPaper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-paper";
        _this.singular = true;
        return _this;
    }
    UIPaper = __decorate([
        autoinject(),
        customAttribute("ui-paper")
    ], UIPaper);
    return UIPaper;
}(BaseAttribute));
export { UIPaper };
var UIScroll = /** @class */ (function (_super) {
    __extends(UIScroll, _super);
    function UIScroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-scroll";
        return _this;
    }
    UIScroll = __decorate([
        autoinject(),
        customAttribute("ui-scroll")
    ], UIScroll);
    return UIScroll;
}(BaseAttribute));
export { UIScroll };
