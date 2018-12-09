var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, bindingMode, customElement, inlineView, observable, PLATFORM, viewResources } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { BaseInput } from "./base-input";
var UIInput = /** @class */ (function (_super) {
    __extends(UIInput, _super);
    function UIInput(element) {
        var _this = _super.call(this, element) || this;
        _this.value = "";
        _this.country = "";
        _this.readonly = false;
        _this.disabled = false;
        _this.inputValue = "";
        _this.inputCountry = "";
        _this.placeholder = "";
        _this.ignoreChange = false;
        return _this;
    }
    UIInput.prototype.attached = function () {
        this.countryChanged();
    };
    UIInput.prototype.valueChanged = function () {
        var _this = this;
        if (!this.ignoreChange) {
            this.ignoreChange = true;
            this.inputValue = PhoneLib.formatInput(this.value, this.country);
            UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
        }
    };
    UIInput.prototype.countryChanged = function () {
        this.inputCountry = this.country;
        this.placeholder = PhoneLib.getExample(this.country || "ae", PhoneLib.TYPE.FIXED_LINE_OR_MOBILE, !!this.country);
    };
    UIInput.prototype.inputValueChanged = function () {
        var _this = this;
        if (!this.ignoreChange) {
            this.ignoreChange = true;
            var val = "" + this.inputValue;
            if (!this.country && val !== "" && !val.startsWith("+")) {
                val = "+" + val;
            }
            this.inputValue = PhoneLib.formatInput(val, this.country);
            this.inputCountry = PhoneLib.getIso2Code(val, this.country);
            this.value = PhoneLib.format(val, this.country, PhoneLib.FORMAT.FULL);
            UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
        }
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", String)
    ], UIInput.prototype, "value", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIInput.prototype, "country", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIInput.prototype, "errors", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIInput.prototype, "readonly", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIInput.prototype, "disabled", void 0);
    __decorate([
        observable(),
        __metadata("design:type", Object)
    ], UIInput.prototype, "inputValue", void 0);
    UIInput = __decorate([
        autoinject(),
        customElement("ui-phone"),
        viewResources(PLATFORM.moduleName("./input-wrapper")),
        inlineView("<template class=\"ui-input ui-phone ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <ui-flag code.bind=\"inputCountry\"></ui-flag>\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\"\n      readonly.bind=\"readonly\" value.two-way=\"inputValue\" type.one-time=\"type\" autocomplete.bind=\"autocomplete\"\n      keypress.trigger=\"fireEnter($event)\"/>\n  </input-wrapper>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UIInput);
    return UIInput;
}(BaseInput));
export { UIInput };
