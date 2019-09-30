System.register(['./_tslib.js', 'aurelia-framework', './ui-app-config.js', 'aurelia-logging'], function (exports) {
  'use strict';
  var __assign, __read, Container, DOM, UIAppConfig, getLogger;
  return {
    setters: [function (module) {
      __assign = module.c;
      __read = module.e;
    }, function (module) {
      Container = module.Container;
      DOM = module.DOM;
    }, function (module) {
      UIAppConfig = module.U;
    }, function (module) {
      getLogger = module.getLogger;
    }],
    execute: function () {

      exports('U', void 0);

      var UITether;
      (function (UITether) {
          function tether(anchorEl, dropdownEl, config) {
              if (config === void 0) { config = Config; }
              return attach(anchorEl, dropdownEl, __assign(__assign({}, Config), config));
          }
          UITether.tether = tether;
          var Config = {
              anchorPosition: "bl",
              attachToViewport: false,
              position: "tl",
              resize: true
          };
          var logger = getLogger("UITether");
          function updatePosition(anchorEl, dropdownEl, scrollerEl, config) {
              var anchorRect = anchorEl.getBoundingClientRect();
              var dropdownRect = dropdownEl.getBoundingClientRect();
              var scrollerRect = scrollerEl.getBoundingClientRect();
              if (config.resize !== false) {
                  dropdownEl.style.minWidth = anchorRect.width + "px";
              }
              var _a = __read(config.position.split(""), 2), posY = _a[0], posX = _a[1];
              var _b = __read(config.anchorPosition.split(""), 2), anchorY = _b[0], anchorX = _b[1];
              var rtl = isRtl(scrollerEl);
              var x = 0;
              var y = 0;
              var clientHeight = document.body.clientHeight;
              var clientWidth = document.body.clientWidth;
              var clientX = 0;
              var clientY = 0;
              logger.debug("tether", {
                  rtl: rtl,
                  anchorRect: anchorRect,
                  anchorX: anchorX,
                  anchorY: anchorY,
                  dropdownRect: dropdownRect,
                  posX: posX,
                  posY: posY
              });
              if (!config.attachToViewport) {
                  clientHeight = scrollerRect.bottom;
                  clientWidth = scrollerRect.right;
                  clientX = scrollerRect.left;
                  clientY = scrollerRect.top;
              }
              if (anchorX === (rtl ? "r" : "l")) {
                  x = anchorRect.left;
              }
              else if (anchorX === (rtl ? "l" : "r")) {
                  x = anchorRect.right;
              }
              else if (anchorX === "c") {
                  x = anchorRect.left + anchorRect.width / 2;
              }
              if (anchorY === "t") {
                  y = anchorRect.top;
              }
              else if (anchorY === "b") {
                  y = anchorRect.bottom;
              }
              else if (anchorY === "c") {
                  y = anchorRect.top + anchorRect.height / 2;
              }
              if (posX === (rtl ? "l" : "r")) {
                  x -= dropdownRect.width;
              }
              if (posX === "c") {
                  x -= dropdownRect.width / 2;
              }
              if (posY === "b") {
                  y -= dropdownRect.height;
              }
              if (posY === "c") {
                  y -= dropdownRect.height / 2;
              }
              logger.debug("tether2", { x: x, y: y });
              if (x + dropdownRect.width > clientWidth) {
                  x = anchorRect.right - dropdownRect.width;
              }
              else if (x < clientX) {
                  x = anchorRect.left;
              }
              if (y + dropdownRect.height > clientHeight) {
                  y =
                      posY === "t" && anchorY === "b" ? anchorRect.top - dropdownRect.height - 2 : anchorRect.bottom;
              }
              else if (y < clientY) {
                  y =
                      posY === "b" && anchorY === "t" ? anchorRect.bottom - dropdownRect.height : anchorRect.top;
              }
              logger.debug("tether3", { x: x, y: y });
              if (!config.attachToViewport) {
                  x -= scrollerRect.left - scrollerEl.scrollLeft + 2;
                  y -= scrollerRect.top - scrollerEl.scrollTop + 1;
                  logger.debug("tether4", { x: x, y: y });
                  if (rtl && scrollerEl.scrollHeight > scrollerEl.offsetHeight) {
                      x -= 5;
                  }
                  logger.debug("tether5", { x: x, y: y });
              }
              dropdownEl.style.transform = "translate(" + x + "px, " + y + "px)";
          }
          function scrollHandler(scrollCallbacks) {
              if (scrollCallbacks === void 0) { scrollCallbacks = new Set(); }
              scrollCallbacks.forEach(function (c) { return c(); });
          }
          function getParentScroller(el) {
              var styles = ["scroll", "auto"];
              el = el.parentElement;
              do {
                  var style = window.getComputedStyle(el);
                  if (styles.includes(style.overflow) ||
                      styles.includes(style.overflowX) ||
                      styles.includes(style.overflowY)) {
                      return el;
                  }
                  el = el.parentElement;
              } while (el !== null);
              return null;
          }
          function initScroller(anchorEl, scrollCallback) {
              var scroller = getParentScroller(anchorEl) || document.body;
              if (!scroller.scrollHandler) {
                  scroller.scrollHandler = function () { return scrollHandler(scroller.scrollCallbacks); };
                  scroller.addEventListener("scroll", scroller.scrollHandler);
                  scroller.scrollCallbacks = new Set();
              }
              scroller.scrollCallbacks.add(scrollCallback);
              return scroller;
          }
          function attach(anchorEl, dropdownEl, config) {
              var container = Container.instance.get(UIAppConfig).FloatingContainer;
              config.attachToViewport ? container.appendChild(dropdownEl.parentElement || dropdownEl) : fn();
              var scroller;
              var scrollCallback = function () {
                  if (dropdownEl.parentElement.dataset.open) {
                      updatePosition(anchorEl, dropdownEl, scroller, config);
                  }
              };
              scroller = initScroller(anchorEl, scrollCallback);
              return {
                  dispose: function () {
                      scroller.scrollCallbacks.delete(scrollCallback);
                      if (dropdownEl.parentElement === Container.instance.get(UIAppConfig).FloatingContainer) {
                          DOM.removeNode(dropdownEl);
                      }
                      else {
                          DOM.removeNode(dropdownEl.parentElement);
                      }
                  },
                  updatePosition: function (newAnchorEl, newConfig) {
                      if (newConfig === void 0) { newConfig = {}; }
                      anchorEl = newAnchorEl || anchorEl;
                      scroller = initScroller(anchorEl, scrollCallback);
                      updatePosition(anchorEl, dropdownEl, scroller, __assign(__assign({}, config), newConfig));
                  }
              };
          }
      })(UITether || (UITether = exports('U', {})));

    }
  };
});
//# sourceMappingURL=ui-tether.js.map
