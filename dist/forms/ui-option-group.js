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
import { autoinject, bindable, bindingMode, children, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { UIRadio } from "./ui-radio";
var UIOptionGroup = /** @class */ (function () {
    function UIOptionGroup() {
        this.value = false;
        this.name = "optGroup";
        this.disabled = false;
        this.options = [];
    }
    UIOptionGroup.prototype.optionsChanged = function () {
        var _this = this;
        if (this.options !== null) {
            this.options.forEach(function (element) {
                if (element instanceof UIRadio) {
                    element.name = _this.name;
                }
                element.matcher = _this.matcher;
            });
            this.valueChanged();
        }
    };
    UIOptionGroup.prototype.checkChanged = function ($event) {
        var _this = this;
        if (this.value !== false) {
            UIInternal.queueTask(function () {
                _this.value = $event.detail.checked;
            });
        }
    };
    UIOptionGroup.prototype.valueChanged = function () {
        var _this = this;
        if (this.options && this.value !== false) {
            UIInternal.queueTask(function () {
                _this.options.forEach(function (element) { return (element.checked = _this.value); });
            });
        }
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIOptionGroup.prototype, "value", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIOptionGroup.prototype, "name", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Function)
    ], UIOptionGroup.prototype, "matcher", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIOptionGroup.prototype, "disabled", void 0);
    __decorate([
        children("ui-radio, ui-checkbox, ui-toggle"),
        __metadata("design:type", Array)
    ], UIOptionGroup.prototype, "options", void 0);
    UIOptionGroup = __decorate([
        autoinject(),
        customElement("ui-option-group"),
        inlineView("<template class=\"ui-option__group ${disabled ? 'ui-option--disabled' : ''}\" change.trigger=\"checkChanged($event)\"><slot></slot></template>")
    ], UIOptionGroup);
    return UIOptionGroup;
}());
export { UIOptionGroup };
