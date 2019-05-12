System.register(['./chunk.js', 'aurelia-framework', 'aurelia-event-aggregator', './chunk3.js', 'resize-observer-polyfill'], function (exports, module) {
  'use strict';
  var __decorate, __metadata, customElement, inlineView, bindable, UIInternal, ResizeObserver;
  return {
    setters: [function (module) {
      __decorate = module.b;
      __metadata = module.c;
    }, function (module) {
      customElement = module.customElement;
      inlineView = module.inlineView;
      bindable = module.bindable;
    }, function () {}, function (module) {
      UIInternal = module.a;
    }, function (module) {
      ResizeObserver = module.default;
    }],
    execute: function () {

      var UIContent = (function () {
          function UIContent(element) {
              this.obResize = new ResizeObserver(function () {
                  return element.dispatchEvent(UIInternal.createEvent("resize"));
              });
              this.obResize.observe(element);
          }
          UIContent.prototype.detached = function () {
              this.obResize.disconnect();
          };
          UIContent = __decorate([
              customElement("ui-content"),
              inlineView("<template class=\"ui-section__content\" ref=\"vmElement\"><slot></slot></template>"),
              __metadata("design:paramtypes", [Element])
          ], UIContent);
          return UIContent;
      }());

      var UISection = (function () {
          function UISection(element) {
              if (element.hasAttribute("centered")) {
                  element.classList.add("ui-section--centered");
              }
          }
          UISection = __decorate([
              customElement("ui-section"),
              inlineView("<template class=\"ui-section au-animate animate-slide-in-right animate-slide-out-left\" role=\"main\"><slot></slot></template>"),
              __metadata("design:paramtypes", [Element])
          ], UISection);
          return UISection;
      }());

      var UISectionFoot = (function () {
          function UISectionFoot() {
          }
          UISectionFoot = __decorate([
              customElement("ui-section-foot"),
              inlineView("<template class=\"ui-section__foot\"><slot></slot></template>")
          ], UISectionFoot);
          return UISectionFoot;
      }());

      var UISectionHead = (function () {
          function UISectionHead() {
          }
          UISectionHead = __decorate([
              customElement("ui-section-head"),
              inlineView("<template class=\"ui-section__head\"><slot></slot></template>")
          ], UISectionHead);
          return UISectionHead;
      }());

      var UIPage = (function () {
          function UIPage() {
              this.pageTitle = "";
          }
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIPage.prototype, "pageTitle", void 0);
          UIPage = __decorate([
              customElement("ui-page"),
              inlineView("<template class=\"ui-page au-animate animate-slide-in-right animate-slide-out-left\" role=\"main\">\n  <div class=\"ui-page__title\" if.bind=\"pageTitle\">${pageTitle}</div>\n  <slot name=\"page-alert\"></slot>\n  <div class=\"ui-page__body\"><slot></slot></div>\n</template>")
          ], UIPage);
          return UIPage;
      }());
      var Page = exports('Page', [UIPage, UISection, UISectionHead, UISectionFoot, UIContent]);

    }
  };
});
//# sourceMappingURL=ui-page.js.map
