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
import { autoinject, bindable, bindingMode, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIRadio = /** @class */ (function () {
    function UIRadio(element) {
        this.element = element;
        this.name = "optGroup";
        this.disabled = false;
        this.isDisabled = false;
    }
    UIRadio.prototype.disable = function (b) {
        this.isDisabled = b;
    };
    UIRadio.prototype.checkChanged = function ($event) {
        $event.stopPropagation();
        this.element.dispatchEvent(UIInternal.createEvent("change", this));
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIRadio.prototype, "checked", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIRadio.prototype, "model", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.oneTime }),
        __metadata("design:type", String)
    ], UIRadio.prototype, "name", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Function)
    ], UIRadio.prototype, "matcher", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIRadio.prototype, "disabled", void 0);
    UIRadio = __decorate([
        autoinject(),
        customElement("ui-radio"),
        __metadata("design:paramtypes", [Element])
    ], UIRadio);
    return UIRadio;
}());
export { UIRadio };
