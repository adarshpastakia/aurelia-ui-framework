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
import { autoinject, bindable, customElement, inlineView } from "aurelia-framework";
var UICard = /** @class */ (function () {
    function UICard(element) {
        this.element = element;
        this.width = "auto";
        this.minWidth = "16rem";
        this.maxWidth = "100vw";
    }
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UICard.prototype, "width", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UICard.prototype, "minWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UICard.prototype, "maxWidth", void 0);
    UICard = __decorate([
        autoinject(),
        customElement("ui-card"),
        inlineView("<template class='ui-panel-base ui-card' css.bind='{width, minWidth, maxWidth}'>\n<slot name=\"panel-header\"></slot>\n<div class=\"ui-card__body\"><slot></slot></div>\n<slot name=\"panel-footer\"></slot>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UICard);
    return UICard;
}());
export { UICard };
