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
import { autoinject, bindable, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIForm = /** @class */ (function () {
    function UIForm(element) {
        this.element = element;
        this.disabled = false;
    }
    UIForm.prototype.attached = function () {
        var _this = this;
        UIInternal.queueTask(function () {
            var el = _this.vmElement.querySelector("[autofocus] input, [autofocus] textarea");
            if (el !== null) {
                el.focus();
            }
            _this.disabledChanged();
        });
    };
    UIForm.prototype.disabledChanged = function () {
        var _this = this;
        if (this.vmElement) {
            var fields = this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle,ui-select,ui-list,ui-date-input");
            fields.forEach(function (el) { return el.au.controller.viewModel.disable(!!_this.disabled); });
        }
    };
    UIForm.prototype.fireSubmit = function () {
        this.element.dispatchEvent(UIInternal.createEvent("submit"));
    };
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIForm.prototype, "disabled", void 0);
    UIForm = __decorate([
        autoinject(),
        customElement("ui-form"),
        inlineView("<template><form ref=\"vmElement\" role=\"form\" aria-disabled.bind=\"disabled\" class=\"ui-form\"\n   enterpressed.delegate=\"fireSubmit($event)\" validation-renderer=\"ui-validator\"><slot></slot></form></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIForm);
    return UIForm;
}());
export { UIForm };
