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
import { autoinject, bindable, computedFrom, customElement, inlineView } from "aurelia-framework";
var UIField = /** @class */ (function () {
    function UIField(element) {
        this.element = element;
        this.label = "";
        this.plain = false;
        this.required = false;
        this.disabled = false;
        this.width = "auto";
        if (element.hasAttribute("nolabel")) {
            element.classList.add("ui-field--nolabel");
        }
        if (element.hasAttribute("inline")) {
            element.classList.add("ui-field--inline");
        }
    }
    UIField.prototype.focus = function () {
        var el = this.element.querySelector("input, textarea");
        if (el !== null) {
            el.focus();
        }
    };
    Object.defineProperty(UIField.prototype, "classes", {
        get: function () {
            var classes = [];
            if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
                classes.push("ui-field--plain");
            }
            if (this.required === "" || this.required === "required" || isTrue(this.required)) {
                classes.push("ui-field--required");
            }
            return classes.join(" ");
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIField.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIField.prototype, "plain", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIField.prototype, "required", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIField.prototype, "disabled", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIField.prototype, "width", void 0);
    __decorate([
        computedFrom("plain", "required"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], UIField.prototype, "classes", null);
    UIField = __decorate([
        autoinject(),
        customElement("ui-field"),
        inlineView("<template aria-required.bind=\"required\" aria-disabled.bind=\"disabled\" class=\"ui-field ${classes}\" css.bind=\"{width}\">\n<label class=\"ui-field__label\" role=\"text\" click.trigger=\"focus()\">${label}</label>\n<slot></slot>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UIField);
    return UIField;
}());
export { UIField };
var UIFieldWrapper = /** @class */ (function () {
    function UIFieldWrapper() {
        this.plain = false;
    }
    Object.defineProperty(UIFieldWrapper.prototype, "classes", {
        get: function () {
            var classes = [];
            if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
                classes.push("ui-field__wrapper--plain");
            }
            return classes.join(" ");
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIFieldWrapper.prototype, "plain", void 0);
    __decorate([
        computedFrom("plain"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], UIFieldWrapper.prototype, "classes", null);
    UIFieldWrapper = __decorate([
        autoinject(),
        customElement("ui-field-wrapper"),
        inlineView("<template class=\"ui-field__wrapper ${classes}\">\n  <slot></slot>\n  </template>")
    ], UIFieldWrapper);
    return UIFieldWrapper;
}());
export { UIFieldWrapper };
