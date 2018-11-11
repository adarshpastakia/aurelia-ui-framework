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
import { autoinject, bindable, customElement, DOM } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIAlert = /** @class */ (function () {
    function UIAlert(element) {
        this.element = element;
        this.icon = "";
        this.alertTitle = "";
        this.okLabel = "OK";
        this.cancelLabel = "Cancel";
        this.type = "alert";
        this.closeable = false;
        this.closeable = element.hasAttribute("closeable");
    }
    UIAlert.prototype.close = function (result) {
        var _this = this;
        if (this.element.dispatchEvent(UIInternal.createEvent("close", result)) !== false) {
            this.element.classList.remove("ui-alert--show");
            setTimeout(function () {
                DOM.removeNode(_this.element);
            }, 500);
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIAlert.prototype, "icon", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIAlert.prototype, "alertTitle", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIAlert.prototype, "okLabel", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIAlert.prototype, "cancelLabel", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIAlert.prototype, "type", void 0);
    UIAlert = __decorate([
        autoinject(),
        customElement("ui-alert"),
        __metadata("design:paramtypes", [Element])
    ], UIAlert);
    return UIAlert;
}());
export { UIAlert };
