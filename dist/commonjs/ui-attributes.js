'use strict';

var _tslib = require('./_tslib.js');
var aureliaFramework = require('aurelia-framework');
require('./ui-app-config.js');
require('aurelia-event-aggregator');
var uiInternal = require('./ui-internal.js');
require('aurelia-logging');
var uiTether = require('./ui-tether.js');

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
            var view = uiInternal.UIInternal.compileTemplate("<template><div class=\"ui-badge\" ui-theme.bind=\"theme\" ui-tooltip.bind=\"tooltip\">\n        <ui-icon icon.bind=\"icon\" if.bind=\"icon\"></ui-icon>${value}\n      </div></template>", this);
            (vm ? (vm.badgeEl ? vm.badgeEl : vm.vmElement) : this.element).appendChild(view.fragment);
            view.attached();
        }
    };
    _tslib.__decorate([
        aureliaFramework.bindable({ primaryProperty: true }),
        _tslib.__metadata("design:type", String)
    ], UIBadge.prototype, "value", void 0);
    _tslib.__decorate([
        aureliaFramework.bindable(),
        _tslib.__metadata("design:type", String)
    ], UIBadge.prototype, "icon", void 0);
    _tslib.__decorate([
        aureliaFramework.bindable(),
        _tslib.__metadata("design:type", String)
    ], UIBadge.prototype, "theme", void 0);
    _tslib.__decorate([
        aureliaFramework.bindable(),
        _tslib.__metadata("design:type", String)
    ], UIBadge.prototype, "tooltip", void 0);
    UIBadge = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-badge"),
        _tslib.__metadata("design:paramtypes", [Element])
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
    BaseAttribute = _tslib.__decorate([
        aureliaFramework.autoinject(),
        _tslib.__metadata("design:paramtypes", [Element])
    ], BaseAttribute);
    return BaseAttribute;
}());
var UITheme = (function (_super) {
    _tslib.__extends(UITheme, _super);
    function UITheme() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-theme";
        return _this;
    }
    UITheme = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-theme")
    ], UITheme);
    return UITheme;
}(BaseAttribute));
var UIBg = (function (_super) {
    _tslib.__extends(UIBg, _super);
    function UIBg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-bg";
        return _this;
    }
    UIBg = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-bg")
    ], UIBg);
    return UIBg;
}(BaseAttribute));
var UIColor = (function (_super) {
    _tslib.__extends(UIColor, _super);
    function UIColor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-color";
        return _this;
    }
    UIColor = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-color")
    ], UIColor);
    return UIColor;
}(BaseAttribute));
var UIHover = (function (_super) {
    _tslib.__extends(UIHover, _super);
    function UIHover() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-hover";
        return _this;
    }
    UIHover = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-hover")
    ], UIHover);
    return UIHover;
}(BaseAttribute));
var UIShadow = (function (_super) {
    _tslib.__extends(UIShadow, _super);
    function UIShadow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-shadow";
        return _this;
    }
    UIShadow = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-shadow")
    ], UIShadow);
    return UIShadow;
}(BaseAttribute));
var UIPadding = (function (_super) {
    _tslib.__extends(UIPadding, _super);
    function UIPadding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-padding";
        return _this;
    }
    UIPadding = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-padding")
    ], UIPadding);
    return UIPadding;
}(BaseAttribute));
var UIMargin = (function (_super) {
    _tslib.__extends(UIMargin, _super);
    function UIMargin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-margin";
        return _this;
    }
    UIMargin = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-margin")
    ], UIMargin);
    return UIMargin;
}(BaseAttribute));
var UIBorder = (function (_super) {
    _tslib.__extends(UIBorder, _super);
    function UIBorder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-border";
        return _this;
    }
    UIBorder = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-border")
    ], UIBorder);
    return UIBorder;
}(BaseAttribute));
var UIFont = (function (_super) {
    _tslib.__extends(UIFont, _super);
    function UIFont() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-font";
        return _this;
    }
    UIFont = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-font")
    ], UIFont);
    return UIFont;
}(BaseAttribute));
var UIWeight = (function (_super) {
    _tslib.__extends(UIWeight, _super);
    function UIWeight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-weight";
        return _this;
    }
    UIWeight = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-weight")
    ], UIWeight);
    return UIWeight;
}(BaseAttribute));
var UIText = (function (_super) {
    _tslib.__extends(UIText, _super);
    function UIText() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-text";
        return _this;
    }
    UIText = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-text")
    ], UIText);
    return UIText;
}(BaseAttribute));
var UIAlign = (function (_super) {
    _tslib.__extends(UIAlign, _super);
    function UIAlign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-align";
        return _this;
    }
    UIAlign = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-align")
    ], UIAlign);
    return UIAlign;
}(BaseAttribute));
var UIGutter = (function (_super) {
    _tslib.__extends(UIGutter, _super);
    function UIGutter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-gutter";
        return _this;
    }
    UIGutter = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-gutter")
    ], UIGutter);
    return UIGutter;
}(BaseAttribute));
var UIHide = (function (_super) {
    _tslib.__extends(UIHide, _super);
    function UIHide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-hide";
        return _this;
    }
    UIHide = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-hide")
    ], UIHide);
    return UIHide;
}(BaseAttribute));
var UIShow = (function (_super) {
    _tslib.__extends(UIShow, _super);
    function UIShow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-show";
        return _this;
    }
    UIShow = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-show")
    ], UIShow);
    return UIShow;
}(BaseAttribute));
var UIClip = (function (_super) {
    _tslib.__extends(UIClip, _super);
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
    UIClip = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-clip")
    ], UIClip);
    return UIClip;
}(BaseAttribute));
var UILine = (function (_super) {
    _tslib.__extends(UILine, _super);
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
    UILine = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-line")
    ], UILine);
    return UILine;
}(BaseAttribute));
var UIPaper = (function (_super) {
    _tslib.__extends(UIPaper, _super);
    function UIPaper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-paper";
        _this.singular = true;
        return _this;
    }
    UIPaper = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-paper")
    ], UIPaper);
    return UIPaper;
}(BaseAttribute));
var UILink = (function (_super) {
    _tslib.__extends(UILink, _super);
    function UILink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-link";
        _this.singular = true;
        return _this;
    }
    UILink = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-link")
    ], UILink);
    return UILink;
}(BaseAttribute));
var UIScroll = (function (_super) {
    _tslib.__extends(UIScroll, _super);
    function UIScroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefix = "ui-scroll";
        return _this;
    }
    UIScroll = _tslib.__decorate([
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

var TooltipEl;
var seed = 0;
var UITooltip = (function () {
    function UITooltip(element) {
        var _this = this;
        this.element = element;
        this.value = "";
        this.theme = "";
        this.position = "bottom";
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
            TooltipEl.tether = uiTether.UITether.tether(this.parentEl, TooltipEl, {
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
        TooltipEl.dataset.pos = this.position;
        var anchorPosition = "tc";
        var position = "bc";
        switch (this.position) {
            case "right":
                anchorPosition = "cr";
                position = "cl";
                break;
            case "left":
                anchorPosition = "cl";
                position = "cr";
                break;
            case "bottom":
                anchorPosition = "bc";
                position = "tc";
                break;
        }
        TooltipEl.tether.updatePosition(this.parentEl, { position: position, anchorPosition: anchorPosition });
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
    _tslib.__decorate([
        aureliaFramework.bindable({ primaryProperty: true }),
        _tslib.__metadata("design:type", Object)
    ], UITooltip.prototype, "value", void 0);
    _tslib.__decorate([
        aureliaFramework.bindable(),
        _tslib.__metadata("design:type", Object)
    ], UITooltip.prototype, "theme", void 0);
    _tslib.__decorate([
        aureliaFramework.bindable(),
        _tslib.__metadata("design:type", String)
    ], UITooltip.prototype, "position", void 0);
    UITooltip = _tslib.__decorate([
        aureliaFramework.autoinject(),
        aureliaFramework.customAttribute("ui-tooltip"),
        _tslib.__metadata("design:paramtypes", [Element])
    ], UITooltip);
    return UITooltip;
}());

var Attributes = _tslib.__spread([UIBadge, UITooltip], Object.keys(Helpers).map(function (k) { return Helpers[k]; }));

exports.Attributes = Attributes;
//# sourceMappingURL=ui-attributes.js.map
