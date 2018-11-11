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
import { autoinject, bindable, bindingMode, child, children, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { UIButton } from "./ui-button";
var UIButtonGroup = /** @class */ (function () {
    function UIButtonGroup(element) {
        this.element = element;
        this.value = "";
        this.separator = "";
        this.toggle = false;
        if (element.hasAttribute("equal")) {
            element.classList.add("ui-btn-group--equal");
        }
        if (element.hasAttribute("vertical")) {
            element.classList.add("ui-btn-group--vertical");
        }
        this.toggle = element.hasAttribute("toggle");
    }
    UIButtonGroup.prototype.attached = function () {
        var _this = this;
        if (this.separator) {
            this.element.classList.add("ui-btn__group--with-separator");
        }
        if (this.toggle) {
            UIInternal.queueTask(function () { return _this.valueChanged(_this.value, ""); });
        }
    };
    UIButtonGroup.prototype.buttonsChanged = function () {
        var _this = this;
        this.buttons.forEach(function (b) { return (b.element.dataset.separator = _this.separator); });
    };
    UIButtonGroup.prototype.valueChanged = function (newValue, oldValue) {
        if (this.buttons) {
            var btn = this.buttons.find(function (b) { return b.value === newValue; });
            if (btn) {
                if (this.currentSelected) {
                    this.currentSelected.active = false;
                }
                (this.currentSelected = btn).active = true;
            }
            else {
                this.value = oldValue;
            }
        }
    };
    UIButtonGroup.prototype.buttonClicked = function ($event) {
        $event.stopEvent();
        if ($event.detail && this.toggle) {
            this.value = $event.detail;
        }
    };
    __decorate([
        bindable({ bindingMode: bindingMode.twoWay }),
        __metadata("design:type", String)
    ], UIButtonGroup.prototype, "value", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIButtonGroup.prototype, "separator", void 0);
    __decorate([
        child("ui-button[data-active='true']"),
        __metadata("design:type", UIButton)
    ], UIButtonGroup.prototype, "currentSelected", void 0);
    __decorate([
        children("ui-button"),
        __metadata("design:type", Array)
    ], UIButtonGroup.prototype, "buttons", void 0);
    UIButtonGroup = __decorate([
        autoinject(),
        customElement("ui-button-group"),
        inlineView("<template class=\"ui-btn__group\" click.delegate=\"buttonClicked($event)\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIButtonGroup);
    return UIButtonGroup;
}());
export { UIButtonGroup };
