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
var UIPage = /** @class */ (function () {
    function UIPage() {
        this.pageTitle = "";
    }
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIPage.prototype, "pageTitle", void 0);
    UIPage = __decorate([
        autoinject(),
        customElement("ui-page"),
        inlineView("<template class=\"ui-page\" role=\"main\">\n  <div class=\"ui-page__title\" if.bind=\"pageTitle\">${pageTitle}</div>\n  <div class=\"ui-page__body\"><slot></slot></div>\n</template>")
    ], UIPage);
    return UIPage;
}());
export { UIPage };
var UISection = /** @class */ (function () {
    function UISection(element) {
        if (element.hasAttribute("centered")) {
            element.classList.add("ui-section--centered");
        }
    }
    UISection = __decorate([
        autoinject(),
        customElement("ui-section"),
        inlineView("<template class=\"ui-section\" role=\"main\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UISection);
    return UISection;
}());
export { UISection };
var UISectionHead = /** @class */ (function () {
    function UISectionHead() {
    }
    UISectionHead = __decorate([
        autoinject(),
        customElement("ui-section-head"),
        inlineView("<template class=\"ui-section__head\"><slot></slot></template>")
    ], UISectionHead);
    return UISectionHead;
}());
export { UISectionHead };
var UISectionFoot = /** @class */ (function () {
    function UISectionFoot() {
    }
    UISectionFoot = __decorate([
        autoinject(),
        customElement("ui-section-foot"),
        inlineView("<template class=\"ui-section__foot\"><slot></slot></template>")
    ], UISectionFoot);
    return UISectionFoot;
}());
export { UISectionFoot };
var UIContent = /** @class */ (function () {
    function UIContent() {
    }
    UIContent = __decorate([
        autoinject(),
        customElement("ui-content"),
        inlineView("<template class=\"ui-section__content\" ref=\"vmElement\"><slot></slot></template>")
    ], UIContent);
    return UIContent;
}());
export { UIContent };
