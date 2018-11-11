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
import { autoinject, bindable, containerless, customElement, inlineView } from "aurelia-framework";
var UIHeader = /** @class */ (function () {
    function UIHeader(element) {
        this.element = element;
        this.label = "";
        this.icon = "";
    }
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIHeader.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIHeader.prototype, "icon", void 0);
    UIHeader = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-header"),
        inlineView("<template><div class=\"ui-header\" slot=\"panel-header\" ref=\"vmElement\">\n  <div class=\"ui-drag-handle\" ui-color=\"gray\" if.bind=\"draggable\"><ui-svg-icon icon=\"drag\"></ui-svg-icon></div>\n  <slot name=\"header-icon\"><div class=\"ui-header__icon\" if.bind=\"icon\"><ui-icon icon.bind=\"icon\"></ui-icon></div></slot>\n  <slot name=\"header-title\"><div class=\"ui-header__title\" if.bind=\"label\" innerhtml.bind=\"label\"></div></slot>\n  <slot></slot>\n  </div></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIHeader);
    return UIHeader;
}());
export { UIHeader };
var UIHeaderIcon = /** @class */ (function () {
    function UIHeaderIcon(element) {
        this.element = element;
        this.icon = "";
    }
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIHeaderIcon.prototype, "icon", void 0);
    UIHeaderIcon = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-header-icon"),
        inlineView("<template><div ref=\"vmElement\" slot=\"header-icon\" class='ui-header__icon'><ui-icon icon.bind=\"icon\"></ui-icon></div></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIHeaderIcon);
    return UIHeaderIcon;
}());
export { UIHeaderIcon };
var UIHeaderTitle = /** @class */ (function () {
    function UIHeaderTitle(element) {
        this.element = element;
    }
    UIHeaderTitle = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-header-title"),
        inlineView("<template><div ref=\"vmElement\" slot=\"header-title\" class='ui-header__title'><slot></slot></div></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIHeaderTitle);
    return UIHeaderTitle;
}());
export { UIHeaderTitle };
var UIHeaderActions = /** @class */ (function () {
    function UIHeaderActions(element) {
        this.element = element;
    }
    UIHeaderActions = __decorate([
        autoinject(),
        customElement("ui-header-actions"),
        inlineView("<template class=\"ui-header__actions\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIHeaderActions);
    return UIHeaderActions;
}());
export { UIHeaderActions };
var UIFooter = /** @class */ (function () {
    function UIFooter(element) {
        this.element = element;
    }
    UIFooter = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-footer"),
        inlineView("<template><div class=\"ui-footer\" slot=\"panel-footer\" ref=\"vmElement\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIFooter);
    return UIFooter;
}());
export { UIFooter };
