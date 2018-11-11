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
import { autoinject, bindable, bindingMode, containerless, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIFieldset = /** @class */ (function () {
    function UIFieldset(element) {
        this.checked = false;
        this.label = "";
        this.class = "";
        this.disabled = false;
        this.fields = [];
        this.optional = false;
        this.optional = element.hasAttribute("optional");
    }
    UIFieldset.prototype.bind = function () {
        this.optional = this.optional || !!this.checked;
    };
    UIFieldset.prototype.attached = function () {
        var _this = this;
        UIInternal.queueTask(function () {
            _this.fields = _this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle");
            _this.disabledChanged();
        });
    };
    UIFieldset.prototype.disabledChanged = function () {
        var _this = this;
        this.fields.forEach(function (el) { return el.au.controller.viewModel.disable(!!_this.disabled); });
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Boolean)
    ], UIFieldset.prototype, "checked", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIFieldset.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIFieldset.prototype, "class", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIFieldset.prototype, "disabled", void 0);
    UIFieldset = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-fieldset"),
        __metadata("design:paramtypes", [Element])
    ], UIFieldset);
    return UIFieldset;
}());
export { UIFieldset };
