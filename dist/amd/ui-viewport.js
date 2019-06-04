define(['exports', './chunk', 'aurelia-framework', './chunk2', 'aurelia-event-aggregator', './chunk3', 'aurelia-router'], function (exports, __chunk_1, aureliaFramework, __chunk_2, aureliaEventAggregator, __chunk_3, aureliaRouter) { 'use strict';

  var UIRouterView = (function () {
      function UIRouterView() {
          this.name = "";
      }
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIRouterView.prototype, "name", void 0);
      UIRouterView = __chunk_1.__decorate([
          aureliaFramework.containerless(),
          aureliaFramework.customElement("ui-router-view"),
          aureliaFramework.inlineView("<template><router-view swap-order=\"with\" name.bind=\"name\" class=\"ui-router-view\" ref=\"vmElement\"></router-view></template>")
      ], UIRouterView);
      return UIRouterView;
  }());

  var UIViewportFooter = (function () {
      function UIViewportFooter() {
          this.dir = "ltr";
      }
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Object)
      ], UIViewportFooter.prototype, "dir", void 0);
      UIViewportFooter = __chunk_1.__decorate([
          aureliaFramework.containerless(),
          aureliaFramework.customElement("ui-viewport-footer"),
          aureliaFramework.inlineView("<template><footer dir.bind=\"dir\" class=\"ui-viewport__footer\" slot=\"ui-viewport__footer\" ref=\"vmElement\"><slot></slot></footer></template>")
      ], UIViewportFooter);
      return UIViewportFooter;
  }());

  var UIViewportHeader = (function () {
      function UIViewportHeader() {
          this.dir = "ltr";
      }
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Object)
      ], UIViewportHeader.prototype, "dir", void 0);
      UIViewportHeader = __chunk_1.__decorate([
          aureliaFramework.containerless(),
          aureliaFramework.customElement("ui-viewport-header"),
          aureliaFramework.inlineView("<template><header dir.bind=\"dir\" class=\"ui-viewport__header\" slot=\"ui-viewport__header\" ref=\"vmElement\"><slot></slot></header></template>")
      ], UIViewportHeader);
      return UIViewportHeader;
  }());

  var view = "<template class=\"ui-viewport\" role=\"main\">\n  <slot name=\"ui-viewport__header\"></slot>\n  <div class=\"ui-viewport__body\">\n    <slot></slot>\n    <div class=\"ui-viewport__dialog-container\" ref=\"dialogContainer\"></div>\n    <div class=\"ui-viewport__alert-container\" ref=\"appConfig.AlertContainer\"></div>\n    <div class=\"ui-viewport__toast-container\" ref=\"appConfig.ToastContainer\"></div>\n  </div>\n  <section role=\"tablist\" class=\"ui-viewport__taskbar\">\n    <div class=\"ui-viewport__taskbar--start\"><slot name=\"taskbar-start\"></slot></div>\n    <div class=\"ui-viewport__taskbar__wrapper\" ref=\"taskbarContainer\"></div>\n    <div class=\"ui-viewport__taskbar--end\"><slot name=\"taskbar-links\"></slot></div>\n  </section>\n  <slot name=\"ui-viewport__footer\"></slot>\n  <div class=\"ui-viewport__floating-container\" ref=\"appConfig.FloatingContainer\"></div>\n  <ui-loader busy.bind=\"router.isNavigating\"></ui-loader>\n</template>\n";

  var UIViewport = (function () {
      function UIViewport(appConfig, router) {
          var _this = this;
          this.appConfig = appConfig;
          this.router = router;
          window.addEventListener("resize", function () { return __chunk_3.UIInternal.broadcast(__chunk_3.UIInternal.EVT_VIEWPORT_RESIZE); });
          document.addEventListener("mouseup", function ($event) { return _this.broadcastEvent($event); });
      }
      UIViewport.prototype.attached = function () {
          this.appConfig.DialogContainer = new aureliaFramework.ViewSlot(this.dialogContainer, true);
          this.appConfig.TaskbarContainer = new aureliaFramework.ViewSlot(this.taskbarContainer, true);
          this.appConfig.DialogContainer.attached();
          this.appConfig.TaskbarContainer.attached();
      };
      UIViewport.prototype.broadcastEvent = function ($event) {
          if (!hasParent($event.target, this.appConfig.FloatingContainer)) {
              __chunk_3.UIInternal.broadcast(__chunk_3.UIInternal.EVT_VIEWPORT_CLICK, $event.target);
          }
      };
      UIViewport = __chunk_1.__decorate([
          aureliaFramework.customElement("ui-viewport"),
          aureliaFramework.inlineView(view),
          __chunk_1.__metadata("design:paramtypes", [__chunk_2.UIAppConfig, aureliaRouter.AppRouter])
      ], UIViewport);
      return UIViewport;
  }());
  var Viewport = [UIViewport, UIViewportHeader, UIViewportFooter, UIRouterView];

  exports.Viewport = Viewport;

});
//# sourceMappingURL=ui-viewport.js.map
