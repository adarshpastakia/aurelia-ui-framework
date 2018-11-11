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
import { autoinject, bindable, customAttribute } from "aurelia-framework";
import { UITether } from "../utils/ui-tether";
var TooltipEl;
var UITooltip = /** @class */ (function () {
    function UITooltip(element) {
        var _this = this;
        this.element = element;
        this.value = "";
        this.theme = "";
        this.position = "";
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
        TooltipEl.tether.updatePosition(this.parentEl);
        this.timer = setTimeout(function () { return (TooltipEl.dataset.open = "true"); }, 500);
    };
    UITooltip.prototype.hide = function () {
        clearTimeout(this.timer);
        TooltipEl.dataset.open = "false";
    };
    __decorate([
        bindable({ primaryProperty: true }),
        __metadata("design:type", Object)
    ], UITooltip.prototype, "value", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UITooltip.prototype, "theme", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UITooltip.prototype, "position", void 0);
    UITooltip = __decorate([
        autoinject(),
        customAttribute("ui-tooltip"),
        __metadata("design:paramtypes", [Element])
    ], UITooltip);
    return UITooltip;
}());
export { UITooltip };
