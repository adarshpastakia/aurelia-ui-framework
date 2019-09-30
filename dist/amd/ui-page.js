define(['exports', './_tslib', 'aurelia-framework', 'aurelia-event-aggregator', './ui-internal', 'resize-observer-polyfill'], function (exports, _tslib, aureliaFramework, aureliaEventAggregator, uiInternal, ResizeObserver) { 'use strict';

  ResizeObserver = ResizeObserver && ResizeObserver.hasOwnProperty('default') ? ResizeObserver['default'] : ResizeObserver;

  var UIContent = (function () {
      function UIContent(element) {
          this.element = element;
      }
      UIContent.prototype.attached = function () {
          var _this = this;
          this.obResize = new ResizeObserver(function () {
              return _this.element.dispatchEvent(uiInternal.UIInternal.createEvent("resize", _this.element.getBoundingClientRect()));
          });
          this.obResize.observe(this.element);
      };
      UIContent.prototype.detached = function () {
          this.obResize.disconnect();
      };
      UIContent = _tslib.__decorate([
          aureliaFramework.customElement("ui-content"),
          aureliaFramework.inlineView("<template class=\"ui-section__content\" ref=\"vmElement\"><slot></slot></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UIContent);
      return UIContent;
  }());

  var UISection = (function () {
      function UISection(element) {
          if (element.hasAttribute("centered")) {
              element.classList.add("ui-section--centered");
          }
      }
      UISection = _tslib.__decorate([
          aureliaFramework.customElement("ui-section"),
          aureliaFramework.inlineView("<template class=\"ui-section au-animate animate-slide-in-right animate-slide-out-left\" role=\"main\"><slot></slot></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UISection);
      return UISection;
  }());

  var UISectionFoot = (function () {
      function UISectionFoot() {
      }
      UISectionFoot = _tslib.__decorate([
          aureliaFramework.customElement("ui-section-foot"),
          aureliaFramework.inlineView("<template class=\"ui-section__foot\"><slot></slot></template>")
      ], UISectionFoot);
      return UISectionFoot;
  }());

  var UISectionHead = (function () {
      function UISectionHead() {
      }
      UISectionHead = _tslib.__decorate([
          aureliaFramework.customElement("ui-section-head"),
          aureliaFramework.inlineView("<template class=\"ui-section__head\"><slot></slot></template>")
      ], UISectionHead);
      return UISectionHead;
  }());

  var UIPage = (function () {
      function UIPage() {
          this.pageTitle = "";
      }
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UIPage.prototype, "pageTitle", void 0);
      UIPage = _tslib.__decorate([
          aureliaFramework.customElement("ui-page"),
          aureliaFramework.inlineView("<template class=\"ui-page au-animate animate-slide-in-right animate-slide-out-left\" role=\"main\">\n  <div class=\"ui-page__title\" if.bind=\"pageTitle\">${pageTitle}</div>\n  <slot name=\"page-alert\"></slot>\n  <div class=\"ui-page__body\"><slot></slot></div>\n</template>")
      ], UIPage);
      return UIPage;
  }());
  var Page = [UIPage, UISection, UISectionHead, UISectionFoot, UIContent];

  exports.Page = Page;

});
//# sourceMappingURL=ui-page.js.map
