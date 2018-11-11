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
import { autoinject, bindable, bindingMode, customElement, inlineView, PLATFORM, viewResources } from "aurelia-framework";
import { BaseInput } from "./base-input";
var UIInput = /** @class */ (function (_super) {
    __extends(UIInput, _super);
    function UIInput(element) {
        var _this = _super.call(this, element) || this;
        _this.date = new Date();
        _this.placeholder = "";
        _this.readonly = false;
        _this.disabled = false;
        _this.dropHandle = "calendar";
        return _this;
    }
    UIInput.prototype.attached = function () {
        this.dropEl.attachToViewport = isTrue(this.element.getAttribute("attach-to-viewport"));
        this.dropEl.closeOnClick = false;
        this.dropEl.stretch = false;
        this.dropEl.tether(this.element);
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIInput.prototype, "date", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIInput.prototype, "minDate", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIInput.prototype, "maxDate", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Array)
    ], UIInput.prototype, "disabledDays", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIInput.prototype, "disabledDates", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIInput.prototype, "placeholder", void 0);
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
    UIInput = __decorate([
        autoinject(),
        customElement("ui-date-input"),
        viewResources(PLATFORM.moduleName("./input-wrapper")),
        inlineView("<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\"\n      readonly.one-time=\"true\" value.one-way=\"date | datetime\" \n      focus.trigger=\"toggleDrop(true)\" blur.trigger=\"canToggleDrop($event)\"\n      keypress.trigger=\"fireEnter($event)\"/>\n  </input-wrapper>\n  <ui-drop view-model.ref=\"dropEl\" class=\"ui-scroll--no\">\n    <ui-date date.bind=\"date\" min-date.bind=\"minDate\" max-date.bind=\"maxDate\"\n      disabled-days.bind=\"disabledDays\" disabled-dates.bind=\"disabledDates\"></ui-date>\n  </ui-drop>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UIInput);
    return UIInput;
}(BaseInput));
export { UIInput };
