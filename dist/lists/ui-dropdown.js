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
import { autoinject, bindable, bindingMode, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIDropdown = /** @class */ (function () {
    function UIDropdown(element) {
        this.element = element;
        this.value = undefined;
        this.name = "";
        this.placeholder = "Select";
        this.labelProperty = "";
        this.valueProperty = "";
        this.iconProperty = "";
        this.disabled = false;
        this.model = undefined;
    }
    UIDropdown.prototype.attached = function () {
        this.dropEl.tether(this.element);
        this.valueChanged();
    };
    UIDropdown.prototype.valueChanged = function () {
        var _this = this;
        if (this.options) {
            this.model = this.options.find(function (o) { return (o[_this.valueProperty] || o) === _this.value; });
        }
    };
    UIDropdown.prototype.select = function ($event) {
        if ($event.detail) {
            this.model = $event.detail;
            this.value = this.model[this.valueProperty] || this.model;
        }
    };
    UIDropdown.prototype.toggleDrop = function ($event) {
        $event.stopEvent();
        var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
        var afterEvent = this.dropEl.isOpen ? "close" : "open";
        if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
            this.dropEl.toggleDrop();
            this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
        }
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIDropdown.prototype, "value", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Array)
    ], UIDropdown.prototype, "errors", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDropdown.prototype, "name", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDropdown.prototype, "placeholder", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDropdown.prototype, "labelProperty", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDropdown.prototype, "valueProperty", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDropdown.prototype, "iconProperty", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Array)
    ], UIDropdown.prototype, "options", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIDropdown.prototype, "disabled", void 0);
    UIDropdown = __decorate([
        autoinject(),
        customElement("ui-dropdown"),
        __metadata("design:paramtypes", [Element])
    ], UIDropdown);
    return UIDropdown;
}());
export { UIDropdown };
