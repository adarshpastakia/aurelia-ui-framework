System.register(['./_tslib.js', 'aurelia-framework', './ui-app-config.js', 'aurelia-event-aggregator', './ui-internal.js', 'aurelia-logging', 'resize-observer-polyfill', './ui-tether.js'], function (exports) {
  'use strict';
  var __decorate, __metadata, customElement, inlineView, bindable, containerless, UIInternal, ResizeObserver, UITether;
  return {
    setters: [function (module) {
      __decorate = module.a;
      __metadata = module.b;
    }, function (module) {
      customElement = module.customElement;
      inlineView = module.inlineView;
      bindable = module.bindable;
      containerless = module.containerless;
    }, function () {}, function () {}, function (module) {
      UIInternal = module.U;
    }, function () {}, function (module) {
      ResizeObserver = module.default;
    }, function (module) {
      UITether = module.U;
    }],
    execute: function () {

      var UIDivider = (function () {
          function UIDivider() {
          }
          UIDivider = __decorate([
              customElement("ui-divider"),
              inlineView("<template class='ui-divider'><slot></slot></template>")
          ], UIDivider);
          return UIDivider;
      }());

      var UIDragHandle = (function () {
          function UIDragHandle(element) {
              this.element = element;
          }
          UIDragHandle.prototype.fireDragEvent = function ($event, evt) {
              this.element.dispatchEvent(UIInternal.createEvent(evt));
              return true;
          };
          UIDragHandle = __decorate([
              customElement("ui-drag-handle"),
              inlineView("<template class=\"ui-drag-handle\" ui-color=\"gray\"\n    mousedown.trigger=\"fireDragEvent($event,'dragstart')\" click.trigger=\"fireDragEvent($event,'dragend')\"><ui-svg-icon icon=\"drag\"></ui-svg-icon></template>"),
              __metadata("design:paramtypes", [Element])
          ], UIDragHandle);
          return UIDragHandle;
      }());

      var UIDrop = (function () {
          function UIDrop(element) {
              this.element = element;
              this.class = "";
              this.isOpen = false;
              this.stretch = true;
              this.closeOnClick = true;
              this.attachToViewport = false;
              this.position = element.getAttribute("position") || "tl";
              this.anchorPosition = element.getAttribute("anchor") || "bl";
              this.closeOnClick = !isFalse(element.getAttribute("close-on-click"));
              this.attachToViewport = element.hasAttribute("attach-to-viewport");
          }
          UIDrop.prototype.tether = function (anchorEl) {
              this.tetherObj = UITether.tether((this.anchorEl = anchorEl), this.vmElement, {
                  anchorPosition: this.anchorPosition,
                  attachToViewport: this.attachToViewport,
                  position: this.position,
                  resize: this.stretch
              });
          };
          UIDrop.prototype.updatePosition = function () {
              this.tetherObj.updatePosition();
          };
          UIDrop.prototype.toggleDrop = function (open) {
              var _this = this;
              this.disposeListeners();
              this.vmElement.dataset.show = "false";
              this.isOpen = open === undefined ? !this.isOpen : open;
              if (this.isOpen) {
                  this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, function (t) { return _this.canClose(t); });
                  this.obViewportResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, function () {
                      return _this.updatePosition();
                  });
                  this.obResize = new ResizeObserver(function () { return _this.updatePosition(); });
                  this.obResize.observe(this.vmElement);
                  this.obResize.observe(this.anchorEl);
                  this.element.dispatchEvent(UIInternal.createEvent("open"));
                  UIInternal.queueMicroTask(function () {
                      _this.tetherObj.updatePosition();
                      _this.vmElement.dataset.show = "true";
                  });
              }
          };
          UIDrop.prototype.closeDrop = function () {
              var _this = this;
              UIInternal.queueTask(function () {
                  _this.isOpen = false;
                  _this.disposeListeners();
                  _this.element.dispatchEvent(UIInternal.createEvent("close"));
              });
          };
          UIDrop.prototype.disposeListeners = function () {
              if (this.obClick) {
                  this.obClick.dispose();
              }
              if (this.obResize) {
                  this.obResize.disconnect();
              }
              if (this.obViewportResize) {
                  this.obViewportResize.dispose();
              }
          };
          UIDrop.prototype.detached = function () {
              this.disposeListeners();
              if (this.tetherObj) {
                  this.tetherObj.dispose();
              }
          };
          UIDrop.prototype.close = function ($event) {
              if (this.closeOnClick) {
                  this.closeDrop();
              }
              else {
                  $event.stopEvent(true);
              }
          };
          UIDrop.prototype.canClose = function (t) {
              if (!hasParent(t, this.vmElement) && !hasParent(t, this.anchorEl)) {
                  this.closeDrop();
              }
          };
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIDrop.prototype, "class", void 0);
          UIDrop = __decorate([
              containerless(),
              customElement("ui-drop"),
              inlineView("<template><div slot=\"ui-drop\" class=\"ui-drop\" click.delegate=\"closeDrop()\" data-open.bind=\"isOpen\">\n  <div ref=\"vmElement\" class=\"ui-drop__body ${class}\" click.delegate=\"close($event)\"><slot></slot></div>\n  </div></template>"),
              __metadata("design:paramtypes", [Element])
          ], UIDrop);
          return UIDrop;
      }());

      var UIFiller = (function () {
          function UIFiller() {
          }
          UIFiller = __decorate([
              customElement("ui-filler"),
              inlineView("<template class='ui-col ui-col--fill'></template>")
          ], UIFiller);
          return UIFiller;
      }());

      var UILoader = (function () {
          function UILoader() {
              this.busy = false;
          }
          __decorate([
              bindable(),
              __metadata("design:type", Boolean)
          ], UILoader.prototype, "busy", void 0);
          UILoader = __decorate([
              customElement("ui-loader"),
              inlineView("<template><div ref=\"vmElement\" class=\"ui-loader\" if.bind=\"busy\">\n  <div><ui-svg-icon icon=\"loader\" class=\"ui-anim--spin\"></ui-svg-icon></div>\n</div></template>")
          ], UILoader);
          return UILoader;
      }());

      var UITextDivider = (function () {
          function UITextDivider() {
          }
          UITextDivider = __decorate([
              customElement("ui-text-divider"),
              inlineView("<template><fieldset class='ui-text-divider'><legend ref='vmElement'><slot></slot></legend></fieldset></template>")
          ], UITextDivider);
          return UITextDivider;
      }());

      var Shared = exports('Shared', [UIDivider, UIDrop, UIFiller, UILoader, UITextDivider, UIDragHandle]);

    }
  };
});
//# sourceMappingURL=ui-shared.js.map
