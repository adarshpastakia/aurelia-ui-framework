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
import { autoinject, bindable, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIDrawer = /** @class */ (function () {
    function UIDrawer(element) {
        var _this = this;
        this.element = element;
        this.align = "start";
        this.width = "24rem";
        this.maxWidth = "40vw";
        this.peek = false;
        this.closeOnClick = false;
        this.closeOnClick = element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
        this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, function (target) {
            return !_this.closeOnClick && getParentByClass(target, "ui-drawer__body") ? undefined : (_this.peek = false);
        });
    }
    UIDrawer.prototype.detached = function () {
        if (this.obClick) {
            this.obClick.dispose();
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDrawer.prototype, "align", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDrawer.prototype, "width", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDrawer.prototype, "maxWidth", void 0);
    UIDrawer = __decorate([
        autoinject(),
        customElement("ui-drawer"),
        __metadata("design:paramtypes", [Element])
    ], UIDrawer);
    return UIDrawer;
}());
export { UIDrawer };
