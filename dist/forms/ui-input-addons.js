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
import { autoinject, bindable, customElement, inlineView } from "aurelia-framework";
import { BaseInput } from "./base-input";
var UIInputAddon = /** @class */ (function () {
    function UIInputAddon(element) {
        this.element = element;
        this.width = "auto";
        if (element.hasAttribute("align-end")) {
            element.classList.add("ui-input__addon--end");
        }
    }
    UIInputAddon_1 = UIInputAddon;
    UIInputAddon.prototype.focusInput = function () {
        try {
            var el = this.element;
            if (getViewModel(el.nextElementSibling) instanceof UIInputAddon_1) {
                el = el.nextElementSibling;
            }
            var vm = getViewModel(el.nextElementSibling);
            if (vm instanceof BaseInput) {
                vm.focus();
            }
            else if (el.nextElementSibling instanceof HTMLInputElement) {
                el.nextElementSibling.focus();
            }
        }
        catch (e) {
            //
        }
    };
    var UIInputAddon_1;
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIInputAddon.prototype, "width", void 0);
    UIInputAddon = UIInputAddon_1 = __decorate([
        autoinject(),
        customElement("ui-input-addon"),
        inlineView("<template class=\"ui-input__addon\" click.trigger=\"focusInput() & debounce:10\" css.bind=\"{width}\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIInputAddon);
    return UIInputAddon;
}());
export { UIInputAddon };
var UIInputInfo = /** @class */ (function () {
    function UIInputInfo(element) {
        this.element = element;
    }
    UIInputInfo = __decorate([
        autoinject(),
        customElement("ui-input-info"),
        inlineView("<template class=\"ui-input__info\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIInputInfo);
    return UIInputInfo;
}());
export { UIInputInfo };
