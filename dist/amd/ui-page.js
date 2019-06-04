define(['exports', './chunk', 'aurelia-framework', 'aurelia-event-aggregator', './chunk3', 'resize-observer-polyfill'], function (exports, __chunk_1, aureliaFramework, aureliaEventAggregator, __chunk_3, ResizeObserver) { 'use strict';

  ResizeObserver = ResizeObserver && ResizeObserver.hasOwnProperty('default') ? ResizeObserver['default'] : ResizeObserver;

  var UIContent = (function () {
      function UIContent(element) {
          this.obResize = new ResizeObserver(function () {
              return element.dispatchEvent(__chunk_3.UIInternal.createEvent("resize", element.getBoundingClientRect()));
          });
          this.obResize.observe(element);
      }
      UIContent.prototype.detached = function () {
          this.obResize.disconnect();
      };
      UIContent = __chunk_1.__decorate([
          aureliaFramework.customElement("ui-content"),
          aureliaFramework.inlineView("<template class=\"ui-section__content\" ref=\"vmElement\"><slot></slot></template>"),
          __chunk_1.__metadata("design:paramtypes", [Element])
      ], UIContent);
      return UIContent;
  }());

  var UISection = (function () {
      function UISection(element) {
          if (element.hasAttribute("centered")) {
              element.classList.add("ui-section--centered");
          }
      }
      UISection = __chunk_1.__decorate([
          aureliaFramework.customElement("ui-section"),
          aureliaFramework.inlineView("<template class=\"ui-section au-animate animate-slide-in-right animate-slide-out-left\" role=\"main\"><slot></slot></template>"),
          __chunk_1.__metadata("design:paramtypes", [Element])
      ], UISection);
      return UISection;
  }());

  var UISectionFoot = (function () {
      function UISectionFoot() {
      }
      UISectionFoot = __chunk_1.__decorate([
          aureliaFramework.customElement("ui-section-foot"),
          aureliaFramework.inlineView("<template class=\"ui-section__foot\"><slot></slot></template>")
      ], UISectionFoot);
      return UISectionFoot;
  }());

  var UISectionHead = (function () {
      function UISectionHead() {
      }
      UISectionHead = __chunk_1.__decorate([
          aureliaFramework.customElement("ui-section-head"),
          aureliaFramework.inlineView("<template class=\"ui-section__head\"><slot></slot></template>")
      ], UISectionHead);
      return UISectionHead;
  }());

  var UIPage = (function () {
      function UIPage() {
          this.pageTitle = "";
      }
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIPage.prototype, "pageTitle", void 0);
      UIPage = __chunk_1.__decorate([
          aureliaFramework.customElement("ui-page"),
          aureliaFramework.inlineView("<template class=\"ui-page au-animate animate-slide-in-right animate-slide-out-left\" role=\"main\">\n  <div class=\"ui-page__title\" if.bind=\"pageTitle\">${pageTitle}</div>\n  <slot name=\"page-alert\"></slot>\n  <div class=\"ui-page__body\"><slot></slot></div>\n</template>")
      ], UIPage);
      return UIPage;
  }());
  var Page = [UIPage, UISection, UISectionHead, UISectionFoot, UIContent];

  exports.Page = Page;

});
//# sourceMappingURL=ui-page.js.map
