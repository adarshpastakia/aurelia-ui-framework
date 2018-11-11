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
import { autoinject, bindable, bindingMode, computedFrom, customElement, inlineView, PLATFORM, viewResources } from "aurelia-framework";
import { BaseInput } from "./base-input";
var UIInput = /** @class */ (function (_super) {
    __extends(UIInput, _super);
    function UIInput(element) {
        var _this = _super.call(this, element) || this;
        _this.value = "";
        _this.number = null;
        _this.type = "text";
        _this.placeholder = "";
        _this.autocomplete = "";
        _this.maxlength = 0;
        _this.readonly = false;
        _this.disabled = false;
        if (element.hasAttribute("number") || element.hasAttribute("number.bind")) {
            _this.type = "number";
        }
        return _this;
    }
    UIInput.prototype.attached = function () {
        this.maxlengthChanged();
    };
    Object.defineProperty(UIInput.prototype, "counter", {
        get: function () {
            if (this.maxlength) {
                return "" + (this.maxlength - this.value.length);
            }
            else {
                return "" + this.value.length;
            }
        },
        enumerable: true,
        configurable: true
    });
    UIInput.prototype.maxlengthChanged = function () {
        if (this.inputEl) {
            this.inputEl.removeAttribute("maxLength");
            if (this.maxlength > 0) {
                this.inputEl.maxLength = this.maxlength;
            }
        }
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", String)
    ], UIInput.prototype, "value", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Number)
    ], UIInput.prototype, "number", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIInput.prototype, "type", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIInput.prototype, "placeholder", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIInput.prototype, "autocomplete", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Number)
    ], UIInput.prototype, "maxlength", void 0);
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
        computedFrom("value", "maxlength"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UIInput.prototype, "counter", null);
    UIInput = __decorate([
        autoinject(),
        customElement("ui-input"),
        viewResources(PLATFORM.moduleName("./input-wrapper")),
        inlineView("<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\"\n      readonly.bind=\"readonly\" value.two-way=\"value\" type.one-time=\"type\" autocomplete.bind=\"autocomplete\"\n      keypress.trigger=\"fireEnter($event)\"/>\n  </input-wrapper>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UIInput);
    return UIInput;
}(BaseInput));
export { UIInput };
