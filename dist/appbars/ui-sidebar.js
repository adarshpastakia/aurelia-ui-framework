/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, bindingMode, computedFrom, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UISidebar = /** @class */ (function () {
    function UISidebar(element) {
        var _this = this;
        this.element = element;
        this.align = "start";
        this.width = "24rem";
        this.maxWidth = "40vw";
        this.collapsed = false;
        this.peek = false;
        this.collapsible = false;
        this.collapsible = element.hasAttribute("collapsible");
        this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, function () { return (_this.peek = false); });
    }
    UISidebar.prototype.detached = function () {
        if (this.obClick) {
            this.obClick.dispose();
        }
    };
    Object.defineProperty(UISidebar.prototype, "toggleIcon", {
        get: function () {
            return (this.collapsed ? "expand" : "collapse") + "-" + this.align;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "align", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "width", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "maxWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "titleBg", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "titleColor", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "titleWeight", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Boolean)
    ], UISidebar.prototype, "collapsed", void 0);
    __decorate([
        computedFrom("collapsed", "align"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UISidebar.prototype, "toggleIcon", null);
    UISidebar = __decorate([
        autoinject(),
        customElement("ui-sidebar"),
        __metadata("design:paramtypes", [Element])
    ], UISidebar);
    return UISidebar;
}());
export { UISidebar };
