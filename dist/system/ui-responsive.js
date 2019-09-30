System.register(['./_tslib.js', 'aurelia-framework'], function (exports) {
  'use strict';
  var __decorate, __metadata, bindable, computedFrom, customElement, inlineView;
  return {
    setters: [function (module) {
      __decorate = module.a;
      __metadata = module.b;
    }, function (module) {
      bindable = module.bindable;
      computedFrom = module.computedFrom;
      customElement = module.customElement;
      inlineView = module.inlineView;
    }],
    execute: function () {

      var UICol = (function () {
          function UICol(element) {
              this.element = element;
              this.size = "";
              this.width = "unset";
              this.maxWidth = "unset";
              this.minWidth = "unset";
              this.align = "";
              if (element.hasAttribute("content-stretch")) {
                  element.classList.add("content-stretch");
              }
          }
          Object.defineProperty(UICol.prototype, "sizes", {
              get: function () {
                  return this.size
                      .split(" ")
                      .map(function (s) { return "ui-col--" + s.trim(); })
                      .join(" ");
              },
              enumerable: true,
              configurable: true
          });
          Object.defineProperty(UICol.prototype, "classes", {
              get: function () {
                  var classes = ["ui-col"];
                  if (this.align) {
                      classes.push("ui-col--" + this.align);
                  }
                  if (this.size) {
                      classes.push(this.sizes);
                  }
                  return classes.join(" ");
              },
              enumerable: true,
              configurable: true
          });
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UICol.prototype, "size", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UICol.prototype, "width", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UICol.prototype, "maxWidth", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UICol.prototype, "minWidth", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UICol.prototype, "align", void 0);
          __decorate([
              computedFrom("align", "size"),
              __metadata("design:type", String),
              __metadata("design:paramtypes", [])
          ], UICol.prototype, "classes", null);
          UICol = __decorate([
              customElement("ui-col"),
              inlineView("<template class.bind='classes' css.bind=\"{ width, maxWidth, minWidth}\"><slot></slot></template>"),
              __metadata("design:paramtypes", [Element])
          ], UICol);
          return UICol;
      }());

      var UIContainer = (function () {
          function UIContainer(element) {
              this.element = element;
              if (element.hasAttribute("fluid")) {
                  element.classList.add("ui-container--fluid");
              }
          }
          UIContainer = __decorate([
              customElement("ui-container"),
              inlineView("<template class='ui-container'><slot></slot></template>"),
              __metadata("design:paramtypes", [Element])
          ], UIContainer);
          return UIContainer;
      }());

      var UIGrid = (function () {
          function UIGrid(element) {
              this.element = element;
              this.size = "nm";
          }
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIGrid.prototype, "size", void 0);
          UIGrid = __decorate([
              customElement("ui-grid"),
              inlineView("<template class='ui-grid ui-grid--${size}'><slot></slot></template>"),
              __metadata("design:paramtypes", [Element])
          ], UIGrid);
          return UIGrid;
      }());

      var UIRow = (function () {
          function UIRow(element) {
              this.element = element;
              this.halign = "";
              this.valign = "";
              if (element.hasAttribute("vertical") && element.hasAttribute("reverse")) {
                  element.classList.add("ui-row--vertical--reverse");
              }
              else if (element.hasAttribute("vertical")) {
                  element.classList.add("ui-row--vertical");
              }
              else if (element.hasAttribute("reverse")) {
                  element.classList.add("ui-row--reverse");
              }
              if (element.hasAttribute("nowrap")) {
                  element.classList.add("ui-row--nowrap");
              }
              if (element.hasAttribute("auto")) {
                  element.classList.add("ui-row--auto");
              }
          }
          Object.defineProperty(UIRow.prototype, "classes", {
              get: function () {
                  var classes = ["ui-row"];
                  if (this.halign) {
                      classes.push("ui-row--" + this.halign);
                  }
                  if (this.valign) {
                      classes.push("ui-row--" + this.valign);
                  }
                  return classes.join(" ");
              },
              enumerable: true,
              configurable: true
          });
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIRow.prototype, "halign", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIRow.prototype, "valign", void 0);
          __decorate([
              computedFrom("halign", "valign"),
              __metadata("design:type", String),
              __metadata("design:paramtypes", [])
          ], UIRow.prototype, "classes", null);
          UIRow = __decorate([
              customElement("ui-row"),
              inlineView("<template class.bind='classes'><slot></slot></template>"),
              __metadata("design:paramtypes", [Element])
          ], UIRow);
          return UIRow;
      }());

      var Responsive = exports('Responsive', [UIContainer, UIRow, UICol, UIGrid]);

    }
  };
});
//# sourceMappingURL=ui-responsive.js.map
