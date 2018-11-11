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
import { autoinject, bindable, containerless, customElement, DOM, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIBadge = /** @class */ (function () {
    function UIBadge(element) {
        this.element = element;
        this.value = "";
        this.icon = "";
        this.href = "";
        this.size = "nm";
        this.style = "normal";
        this.closeable = false;
        if (element.hasAttribute("solid")) {
            this.style = "solid";
        }
        this.closeable = element.hasAttribute("closeable");
        this.hrefChanged();
    }
    UIBadge.prototype.close = function () {
        var _this = this;
        UIInternal.fireCallbackEvent(this, "beforeclose").then(function (b) { return (b ? _this.remove() : undefined); });
    };
    UIBadge.prototype.hrefChanged = function () {
        if (this.vmElement) {
            if (this.href) {
                this.vmElement.href = this.href;
            }
            else if (this.vmElement.attributes.getNamedItem("href")) {
                this.vmElement.attributes.removeNamedItem("href");
            }
        }
    };
    UIBadge.prototype.fireClick = function ($event) {
        if (!this.href) {
            $event.stopEvent();
            return this.element.dispatchEvent(UIInternal.createEvent("click", this.value));
        }
    };
    UIBadge.prototype.remove = function () {
        var _this = this;
        this.element.dispatchEvent(UIInternal.createEvent("close"));
        UIInternal.queueTask(function () { return DOM.removeNode(_this.vmElement); });
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIBadge.prototype, "value", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIBadge.prototype, "icon", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIBadge.prototype, "href", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIBadge.prototype, "size", void 0);
    UIBadge = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-badge"),
        inlineView("<template><a class=\"ui-badge ui-badge--${style} ui-badge--${size}\" click.delegate=\"fireClick($event)\" ref=\"vmElement\">\n    <div class=\"ui-badge__label\"><slot></slot></div>\n    <div class=\"ui-badge__icon\"><slot name=\"avatar\"><ui-icon if.bind=\"icon\" icon.bind=\"icon\"></ui-icon></slot></div>\n    <div class=\"ui-badge__value\">${value}</div>\n    <div class=\"ui-badge__close\" if.bind=\"closeable\" click.trigger=\"[$event.stopEvent(), close()]\">&times;</div>\n  </a></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIBadge);
    return UIBadge;
}());
export { UIBadge };
