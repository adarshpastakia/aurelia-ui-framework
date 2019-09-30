define(['exports', './_tslib', 'aurelia-framework'], function (exports, _tslib, aureliaFramework) { 'use strict';

  var UICardContent = (function () {
      function UICardContent(element) {
          this.element = element;
          if (element.hasAttribute("fill")) {
              element.classList.add("ui-card__content--fill");
          }
      }
      UICardContent = _tslib.__decorate([
          aureliaFramework.customElement("ui-card-content"),
          aureliaFramework.inlineView("<template class='ui-card__content'><slot></slot></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UICardContent);
      return UICardContent;
  }());

  var UICardList = (function () {
      function UICardList(element) {
          this.element = element;
      }
      UICardList = _tslib.__decorate([
          aureliaFramework.customElement("ui-card-list"),
          aureliaFramework.inlineView("<template class='ui-card__list'><slot></slot></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UICardList);
      return UICardList;
  }());

  var UICardMedia = (function () {
      function UICardMedia(element) {
          this.element = element;
          if (element.hasAttribute("top")) {
              element.classList.add("ui-card__media--top");
          }
      }
      UICardMedia = _tslib.__decorate([
          aureliaFramework.customElement("ui-card-media"),
          aureliaFramework.inlineView("<template class='ui-card__media'><slot></slot></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UICardMedia);
      return UICardMedia;
  }());

  var UICardMeta = (function () {
      function UICardMeta(element) {
          this.element = element;
      }
      UICardMeta = _tslib.__decorate([
          aureliaFramework.customElement("ui-card-meta"),
          aureliaFramework.inlineView("<template class='ui-card__meta'><slot></slot></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UICardMeta);
      return UICardMeta;
  }());

  var UICardTitle = (function () {
      function UICardTitle(element) {
          this.element = element;
      }
      UICardTitle = _tslib.__decorate([
          aureliaFramework.customElement("ui-card-title"),
          aureliaFramework.inlineView("<template class='ui-card__title'><slot></slot></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UICardTitle);
      return UICardTitle;
  }());

  var UICard = (function () {
      function UICard(element) {
          this.element = element;
          this.width = "";
          this.minWidth = "8rem";
          this.maxWidth = "100vw";
          this.height = "";
          this.minHeight = "unset";
          this.maxHeight = "100vh";
      }
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UICard.prototype, "width", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UICard.prototype, "minWidth", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UICard.prototype, "maxWidth", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UICard.prototype, "height", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UICard.prototype, "minHeight", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UICard.prototype, "maxHeight", void 0);
      UICard = _tslib.__decorate([
          aureliaFramework.customElement("ui-card"),
          aureliaFramework.inlineView("<template class='ui-panel-base ui-card' css.bind='{width, minWidth, maxWidth, height, minHeight, maxHeight}'>\n<slot name=\"panel-header\"></slot>\n<div class=\"ui-card__body\"><slot></slot></div>\n<slot name=\"panel-footer\"></slot>\n</template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UICard);
      return UICard;
  }());
  var Card = [UICard, UICardContent, UICardMeta, UICardMedia, UICardList, UICardTitle];

  exports.Card = Card;

});
//# sourceMappingURL=ui-card.js.map
