System.register(['./chunk.js', 'aurelia-framework', './chunk2.js', 'aurelia-event-aggregator', './chunk3.js', 'aurelia-router'], function (exports, module) {
  'use strict';
  var __decorate, __metadata, bindable, containerless, customElement, inlineView, ViewSlot, UIAppConfig, UIInternal, AppRouter;
  return {
    setters: [function (module) {
      __decorate = module.b;
      __metadata = module.c;
    }, function (module) {
      bindable = module.bindable;
      containerless = module.containerless;
      customElement = module.customElement;
      inlineView = module.inlineView;
      ViewSlot = module.ViewSlot;
    }, function (module) {
      UIAppConfig = module.a;
    }, function () {}, function (module) {
      UIInternal = module.a;
    }, function (module) {
      AppRouter = module.AppRouter;
    }],
    execute: function () {

      var UIRouterView = (function () {
          function UIRouterView() {
              this.name = "";
          }
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIRouterView.prototype, "name", void 0);
          UIRouterView = __decorate([
              containerless(),
              customElement("ui-router-view"),
              inlineView("<template><router-view swap-order=\"with\" name.bind=\"name\" class=\"ui-router-view\" ref=\"vmElement\"></router-view></template>")
          ], UIRouterView);
          return UIRouterView;
      }());

      var UIViewportFooter = (function () {
          function UIViewportFooter() {
          }
          UIViewportFooter = __decorate([
              containerless(),
              customElement("ui-viewport-footer"),
              inlineView("<template><footer class=\"ui-viewport__footer\" slot=\"ui-viewport__footer\" ref=\"vmElement\"><slot></slot></footer></template>")
          ], UIViewportFooter);
          return UIViewportFooter;
      }());

      var UIViewportHeader = (function () {
          function UIViewportHeader() {
          }
          UIViewportHeader = __decorate([
              containerless(),
              customElement("ui-viewport-header"),
              inlineView("<template><header class=\"ui-viewport__header\" slot=\"ui-viewport__header\" ref=\"vmElement\"><slot></slot></header></template>")
          ], UIViewportHeader);
          return UIViewportHeader;
      }());

      var view = "<template class=\"ui-viewport\" role=\"main\">\n  <slot name=\"ui-viewport__header\"></slot>\n  <div class=\"ui-viewport__body\">\n    <slot></slot>\n    <div class=\"ui-viewport__dialog-container\" ref=\"dialogContainer\"></div>\n    <div class=\"ui-viewport__alert-container\" ref=\"appConfig.AlertContainer\"></div>\n    <div class=\"ui-viewport__toast-container\" ref=\"appConfig.ToastContainer\"></div>\n  </div>\n  <section role=\"tablist\" class=\"ui-viewport__taskbar\">\n    <div class=\"ui-viewport__taskbar--start\"><slot name=\"taskbar-start\"></slot></div>\n    <div class=\"ui-viewport__taskbar__wrapper\" ref=\"taskbarContainer\"></div>\n    <div class=\"ui-viewport__taskbar--end\"><slot name=\"taskbar-links\"></slot></div>\n  </section>\n  <slot name=\"ui-viewport__footer\"></slot>\n  <div class=\"ui-viewport__floating-container\" ref=\"appConfig.FloatingContainer\"></div>\n  <ui-loader busy.bind=\"router.isNavigating\"></ui-loader>\n</template>\n";

      var UIViewport = (function () {
          function UIViewport(appConfig, router) {
              var _this = this;
              this.appConfig = appConfig;
              this.router = router;
              window.addEventListener("resize", function () { return UIInternal.broadcast(UIInternal.EVT_VIEWPORT_RESIZE); });
              document.addEventListener("mouseup", function ($event) { return _this.broadcastEvent($event); });
          }
          UIViewport.prototype.attached = function () {
              this.appConfig.DialogContainer = new ViewSlot(this.dialogContainer, true);
              this.appConfig.TaskbarContainer = new ViewSlot(this.taskbarContainer, true);
              this.appConfig.DialogContainer.attached();
              this.appConfig.TaskbarContainer.attached();
          };
          UIViewport.prototype.broadcastEvent = function ($event) {
              if (!hasParent($event.target, this.appConfig.FloatingContainer)) {
                  UIInternal.broadcast(UIInternal.EVT_VIEWPORT_CLICK, $event.target);
              }
          };
          UIViewport = __decorate([
              customElement("ui-viewport"),
              inlineView(view),
              __metadata("design:paramtypes", [UIAppConfig, AppRouter])
          ], UIViewport);
          return UIViewport;
      }());
      var Viewport = exports('Viewport', [UIViewport, UIViewportHeader, UIViewportFooter, UIRouterView]);

    }
  };
});
//# sourceMappingURL=ui-viewport.js.map
