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
var UITextarea = /** @class */ (function (_super) {
    __extends(UITextarea, _super);
    function UITextarea(element) {
        var _this = _super.call(this, element) || this;
        _this.value = "";
        _this.number = null;
        _this.placeholder = "";
        _this.rows = 4;
        _this.maxlength = 0;
        _this.readonly = false;
        _this.disabled = false;
        return _this;
    }
    Object.defineProperty(UITextarea.prototype, "counter", {
        get: function () {
            if (this.maxlength) {
                return this.value.length + " of " + this.maxlength;
            }
            else {
                return "" + this.value.length;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", String)
    ], UITextarea.prototype, "value", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Number)
    ], UITextarea.prototype, "number", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UITextarea.prototype, "placeholder", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Number)
    ], UITextarea.prototype, "rows", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Number)
    ], UITextarea.prototype, "maxlength", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UITextarea.prototype, "errors", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UITextarea.prototype, "readonly", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UITextarea.prototype, "disabled", void 0);
    __decorate([
        computedFrom("value", "maxlength"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UITextarea.prototype, "counter", null);
    UITextarea = __decorate([
        autoinject(),
        customElement("ui-textarea"),
        viewResources(PLATFORM.moduleName("./input-wrapper")),
        inlineView("<template class=\"ui-input ui-input--textarea ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <textarea class=\"ui-input__control\" ref=\"inputEl\" role=\"textbox\" rows.bind=\"rows\" placeholder.bind=\"placeholder\"\n      disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\"></textarea>\n  </input-wrapper>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UITextarea);
    return UITextarea;
}(BaseInput));
export { UITextarea };
