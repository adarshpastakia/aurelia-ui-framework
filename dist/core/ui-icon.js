var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { bindable, containerless, customElement, inlineView } from "aurelia-framework";
import Icons from "./ui-icons.json";
var UIIcon = /** @class */ (function () {
    function UIIcon(element) {
        this.element = element;
        this.icon = "";
        this.size = "nm";
        if (element.hasAttribute("flip-on-rtl")) {
            element.classList.add("flip-on-rtl");
        }
    }
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIIcon.prototype, "icon", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIIcon.prototype, "size", void 0);
    UIIcon = __decorate([
        customElement("ui-icon"),
        inlineView("<template ui-font.bind=\"size\" class=\"ui-icon ${icon}\"></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIIcon);
    return UIIcon;
}());
export { UIIcon };
var UIFlag = /** @class */ (function () {
    function UIFlag() {
        this.code = "";
        this.size = "nm";
    }
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIFlag.prototype, "code", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIFlag.prototype, "size", void 0);
    UIFlag = __decorate([
        customElement("ui-flag"),
        inlineView("<template ui-font.bind=\"size\" class=\"ui-flag ${code}\"></template>")
    ], UIFlag);
    return UIFlag;
}());
export { UIFlag };
var UISvgIcon = /** @class */ (function () {
    function UISvgIcon() {
        this.icon = "";
        this.class = "";
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
        bindable(),
        __metadata("design:type", String)
    ], UISvgIcon.prototype, "icon", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISvgIcon.prototype, "class", void 0);
    UISvgIcon = __decorate([
        containerless(),
        customElement("ui-svg-icon"),
        inlineView("<template><svg ref=\"vmElement\" slot=\"svg-icon\" class=\"ui-icon ${class}\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d.bind=\"iconPath\" /></svg></template>")
    ], UISvgIcon);
    return UISvgIcon;
}());
export { UISvgIcon };
