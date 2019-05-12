import { customElement, inlineView, bindable } from 'aurelia-framework';
import { a as __decorate, b as __metadata } from './chunk3.js';

let UICardContent = class UICardContent {
    constructor(element) {
        this.element = element;
        if (element.hasAttribute("fill")) {
            element.classList.add("ui-card__content--fill");
        }
    }
};
UICardContent = __decorate([
    customElement("ui-card-content"),
    inlineView("<template class='ui-card__content'><slot></slot></template>"),
    __metadata("design:paramtypes", [Element])
], UICardContent);

let UICardList = class UICardList {
    constructor(element) {
        this.element = element;
    }
};
UICardList = __decorate([
    customElement("ui-card-list"),
    inlineView("<template class='ui-card__list'><slot></slot></template>"),
    __metadata("design:paramtypes", [Element])
], UICardList);

let UICardMedia = class UICardMedia {
    constructor(element) {
        this.element = element;
        if (element.hasAttribute("top")) {
            element.classList.add("ui-card__media--top");
        }
    }
};
UICardMedia = __decorate([
    customElement("ui-card-media"),
    inlineView("<template class='ui-card__media'><slot></slot></template>"),
    __metadata("design:paramtypes", [Element])
], UICardMedia);

let UICardMeta = class UICardMeta {
    constructor(element) {
        this.element = element;
    }
};
UICardMeta = __decorate([
    customElement("ui-card-meta"),
    inlineView("<template class='ui-card__meta'><slot></slot></template>"),
    __metadata("design:paramtypes", [Element])
], UICardMeta);

let UICardTitle = class UICardTitle {
    constructor(element) {
        this.element = element;
    }
};
UICardTitle = __decorate([
    customElement("ui-card-title"),
    inlineView("<template class='ui-card__title'><slot></slot></template>"),
    __metadata("design:paramtypes", [Element])
], UICardTitle);

let UICard = class UICard {
    constructor(element) {
        this.element = element;
        this.width = "";
        this.minWidth = "8rem";
        this.maxWidth = "100vw";
        this.height = "";
        this.minHeight = "unset";
        this.maxHeight = "100vh";
    }
};
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
__decorate([
    bindable(),
    __metadata("design:type", String)
], UICard.prototype, "height", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UICard.prototype, "minHeight", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UICard.prototype, "maxHeight", void 0);
UICard = __decorate([
    customElement("ui-card"),
    inlineView(`<template class='ui-panel-base ui-card' css.bind='{width, minWidth, maxWidth, height, minHeight, maxHeight}'>
<slot name="panel-header"></slot>
<div class="ui-card__body"><slot></slot></div>
<slot name="panel-footer"></slot>
</template>`),
    __metadata("design:paramtypes", [Element])
], UICard);
const Card = [UICard, UICardContent, UICardMeta, UICardMedia, UICardList, UICardTitle];

export { Card };
//# sourceMappingURL=ui-card.js.map
