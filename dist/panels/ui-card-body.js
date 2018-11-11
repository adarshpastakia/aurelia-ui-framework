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
import { autoinject, customElement, inlineView } from "aurelia-framework";
var UICardTitle = /** @class */ (function () {
    function UICardTitle(element) {
        this.element = element;
    }
    UICardTitle = __decorate([
        autoinject(),
        customElement("ui-card-title"),
        inlineView("<template class='ui-card__title'><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UICardTitle);
    return UICardTitle;
}());
export { UICardTitle };
var UICardMeta = /** @class */ (function () {
    function UICardMeta(element) {
        this.element = element;
    }
    UICardMeta = __decorate([
        autoinject(),
        customElement("ui-card-meta"),
        inlineView("<template class='ui-card__meta'><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UICardMeta);
    return UICardMeta;
}());
export { UICardMeta };
var UICardList = /** @class */ (function () {
    function UICardList(element) {
        this.element = element;
    }
    UICardList = __decorate([
        autoinject(),
        customElement("ui-card-list"),
        inlineView("<template class='ui-card__list'><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UICardList);
    return UICardList;
}());
export { UICardList };
var UICardContent = /** @class */ (function () {
    function UICardContent(element) {
        this.element = element;
        if (element.hasAttribute("fill")) {
            element.classList.add("ui-card__content--fill");
        }
    }
    UICardContent = __decorate([
        autoinject(),
        customElement("ui-card-content"),
        inlineView("<template class='ui-card__content'><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UICardContent);
    return UICardContent;
}());
export { UICardContent };
var UICardMedia = /** @class */ (function () {
    function UICardMedia(element) {
        this.element = element;
        if (element.hasAttribute("top")) {
            element.classList.add("ui-card__media--top");
        }
    }
    UICardMedia = __decorate([
        autoinject(),
        customElement("ui-card-media"),
        inlineView("<template class='ui-card__media'><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UICardMedia);
    return UICardMedia;
}());
export { UICardMedia };
