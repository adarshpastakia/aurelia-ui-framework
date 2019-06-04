define(['exports', './chunk', 'aurelia-framework', 'aurelia-event-aggregator', './chunk3'], function (exports, __chunk_1, aureliaFramework, aureliaEventAggregator, __chunk_3) { 'use strict';

  var view = "<template class=\"ui-btn__wrapper\" data-disabled.bind=\"isDisabled\" data-busy.bind=\"busy\" data-type.bind=\"type\" data-size.bind=\"size\" data-active.bind=\"active\">\n  <div class=\"ui-btn__inner\">\n    <a ref=\"badgeEl\" class=\"ui-btn\" click.trigger=\"fireClick($event)\" data-active.bind=\"active\" data-open.bind=\"!split && dropEl.isOpen\">\n      <div class=\"ui-btn__icon\" if.bind=\"busy\">\n        <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n      </div>\n      <slot name=\"svg-icon\"></slot>\n      <div class=\"ui-btn__icon\" if.bind=\"icon && !busy\">\n        <ui-icon icon.bind=\"icon\"></ui-icon>\n      </div>\n      <div class=\"ui-btn__label\"><slot>${label}</slot></div>\n      <div class=\"ui-btn__caret\" if.bind=\"hasDrop && !split\">\n        <ui-svg-icon icon=\"caret\"></ui-svg-icon>\n      </div>\n    </a>\n    <template if.bind=\"hasDrop && split\">\n      <div class=\"ui-btn__divider\"></div>\n      <a class=\"ui-btn ui-btn__caret ui-btn__caret--split\" data-open.bind=\"split && dropEl.isOpen\" click.trigger=\"toggleDrop()\">\n        <ui-svg-icon icon=\"caret\"></ui-svg-icon>\n      </a>\n    </template>\n  </div>\n  <slot name=\"ui-drop\">\n    <ui-drop view-model.ref=\"dropEl\" if.bind=\"menuItems\">\n      <ui-menu if.bind=\"dropEl.isOpen\" menu-items.bind=\"menuItems\"></ui-menu>\n    </ui-drop>\n  </slot>\n</template>\n";

  var UIButton = (function () {
      function UIButton(element) {
          this.element = element;
          this.icon = "";
          this.href = "";
          this.label = "";
          this.size = "nm";
          this.type = "default";
          this.id = "";
          this.busy = false;
          this.active = false;
          this.disabled = false;
          this.hasDrop = false;
          this.split = false;
          this.elDisabled = false;
          if (element.hasAttribute("icon-hilight")) {
              element.classList.add("ui-btn__icon--hilight");
          }
          if (element.hasAttribute("icon-end")) {
              element.classList.add("ui-btn__icon--end");
          }
          if (element.hasAttribute("icon-top")) {
              element.classList.add("ui-btn__icon--top");
          }
          if (element.hasAttribute("no-caret")) {
              element.classList.add("ui-btn__caret--hide");
          }
          if (element.hasAttribute("block")) {
              element.classList.add("ui-btn--block");
          }
          this.split = element.hasAttribute("split");
      }
      Object.defineProperty(UIButton.prototype, "isDisabled", {
          get: function () {
              return this.disabled || this.elDisabled;
          },
          enumerable: true,
          configurable: true
      });
      UIButton.prototype.disable = function (disabled) {
          this.elDisabled = disabled;
      };
      UIButton.prototype.attached = function () {
          var _this = this;
          __chunk_3.UIInternal.queueTask(function () {
              _this.hasDrop = !!_this.elDropdown || !!_this.dropEl;
              if (_this.hasDrop) {
                  if (!_this.dropEl) {
                      _this.dropEl = getSlotViewModel(_this.elDropdown);
                  }
                  _this.dropEl.tether(_this.element);
              }
          });
          this.hrefChanged();
      };
      UIButton.prototype.hrefChanged = function () {
          if (this.badgeEl) {
              if (this.href) {
                  this.badgeEl.href = this.href;
              }
              else if (this.badgeEl.attributes.getNamedItem("href")) {
                  this.badgeEl.attributes.removeNamedItem("href");
              }
          }
      };
      UIButton.prototype.fireClick = function ($event) {
          if (this.isDisabled || this.busy) {
              $event.stopEvent();
              return false;
          }
          if (!this.href) {
              if (this.hasDrop && !this.split) {
                  return this.toggleDrop();
              }
              else {
                  $event.stopEvent();
                  return this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("click", this.id));
              }
          }
      };
      UIButton.prototype.toggleDrop = function () {
          var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
          var afterEvent = this.dropEl.isOpen ? "close" : "open";
          if (this.element.dispatchEvent(__chunk_3.UIInternal.createEvent(beforeEvent)) !== false) {
              this.dropEl.toggleDrop();
              this.element.dispatchEvent(__chunk_3.UIInternal.createEvent(afterEvent));
          }
          return true;
      };
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIButton.prototype, "icon", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIButton.prototype, "href", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIButton.prototype, "label", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIButton.prototype, "size", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIButton.prototype, "type", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIButton.prototype, "id", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Boolean)
      ], UIButton.prototype, "busy", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Boolean)
      ], UIButton.prototype, "active", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Boolean)
      ], UIButton.prototype, "disabled", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Object)
      ], UIButton.prototype, "menuItems", void 0);
      __chunk_1.__decorate([
          aureliaFramework.child("div.ui-drop"),
          __chunk_1.__metadata("design:type", Element)
      ], UIButton.prototype, "elDropdown", void 0);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("disabled", "elDisabled"),
          __chunk_1.__metadata("design:type", Boolean),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIButton.prototype, "isDisabled", null);
      UIButton = __chunk_1.__decorate([
          aureliaFramework.customElement("ui-button"),
          aureliaFramework.inlineView(view),
          __chunk_1.__metadata("design:paramtypes", [Element])
      ], UIButton);
      return UIButton;
  }());

  var UIButtonGroup = (function () {
      function UIButtonGroup(element) {
          this.element = element;
          this.value = "";
          this.separator = "";
          this.size = "nm";
          this.type = "default";
          this.disabled = false;
          this.toggle = false;
          this.elDisabled = false;
          if (element.hasAttribute("equal")) {
              element.classList.add("ui-btn__group--equal");
          }
          if (element.hasAttribute("vertical")) {
              element.classList.add("ui-btn__group--vertical");
          }
          this.toggle = element.hasAttribute("toggle");
      }
      Object.defineProperty(UIButtonGroup.prototype, "isDisabled", {
          get: function () {
              return this.disabled || this.elDisabled;
          },
          enumerable: true,
          configurable: true
      });
      UIButtonGroup.prototype.disable = function (disabled) {
          this.elDisabled = disabled;
      };
      UIButtonGroup.prototype.attached = function () {
          var _this = this;
          if (this.separator) {
              this.element.classList.add("ui-btn__group--with-separator");
          }
          if (this.toggle) {
              __chunk_3.UIInternal.queueTask(function () { return _this.valueChanged(_this.value, ""); });
          }
      };
      UIButtonGroup.prototype.buttonsChanged = function () {
          var _this = this;
          this.buttons.forEach(function (b) {
              b.element.dataset.separator = _this.separator;
          });
      };
      UIButtonGroup.prototype.valueChanged = function (newValue, oldValue) {
          if (this.buttons) {
              var btn = this.buttons.find(function (b) { return b.id === newValue; });
              if (btn) {
                  if (this.currentSelected) {
                      this.currentSelected.active = false;
                  }
                  (this.currentSelected = btn).active = true;
              }
              else {
                  this.value = oldValue;
              }
          }
      };
      UIButtonGroup.prototype.buttonClicked = function ($event) {
          $event.stopEvent();
          if ($event.detail && this.toggle) {
              this.value = $event.detail;
          }
      };
      __chunk_1.__decorate([
          aureliaFramework.bindable({ bindingMode: aureliaFramework.bindingMode.twoWay }),
          __chunk_1.__metadata("design:type", String)
      ], UIButtonGroup.prototype, "value", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIButtonGroup.prototype, "separator", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIButtonGroup.prototype, "size", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIButtonGroup.prototype, "type", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Boolean)
      ], UIButtonGroup.prototype, "disabled", void 0);
      __chunk_1.__decorate([
          aureliaFramework.child("ui-button[data-active='true']"),
          __chunk_1.__metadata("design:type", UIButton)
      ], UIButtonGroup.prototype, "currentSelected", void 0);
      __chunk_1.__decorate([
          aureliaFramework.children("ui-button"),
          __chunk_1.__metadata("design:type", Array)
      ], UIButtonGroup.prototype, "buttons", void 0);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("disabled", "elDisabled"),
          __chunk_1.__metadata("design:type", Boolean),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIButtonGroup.prototype, "isDisabled", null);
      UIButtonGroup = __chunk_1.__decorate([
          aureliaFramework.autoinject(),
          aureliaFramework.customElement("ui-button-group"),
          aureliaFramework.inlineView("<template class=\"ui-btn__group\" click.delegate=\"buttonClicked($event)\" data-disabled.bind=\"isDisabled\" data-size.bind=\"size\" data-type.bind=\"type\"><slot></slot></template>"),
          __chunk_1.__metadata("design:paramtypes", [Element])
      ], UIButtonGroup);
      return UIButtonGroup;
  }());

  var UITag = (function () {
      function UITag(element) {
          this.element = element;
          this.id = "";
          this.label = "";
          this.icon = "";
          this.href = "";
          this.size = "nm";
          this.type = "normal";
          this.closeable = false;
          this.style = "normal";
      }
      UITag.prototype.close = function () {
          var _this = this;
          __chunk_3.UIInternal.fireCallbackEvent(this, "beforeclose", this.id).then(function (b) {
              return b ? _this.remove() : undefined;
          });
      };
      UITag.prototype.bind = function () {
          this.hrefChanged();
          this.closeable = !isFalse(this.closeable);
      };
      UITag.prototype.hrefChanged = function () {
          if (this.vmElement) {
              if (this.href) {
                  this.vmElement.href = this.href;
              }
              else if (this.vmElement.attributes.getNamedItem("href")) {
                  this.vmElement.attributes.removeNamedItem("href");
              }
          }
      };
      UITag.prototype.fireClick = function ($event) {
          if (!this.href) {
              $event.stopEvent();
              return this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("click", this.id));
          }
      };
      UITag.prototype.remove = function () {
          var _this = this;
          this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("close", this.id));
          __chunk_3.UIInternal.queueTask(function () { return aureliaFramework.DOM.removeNode(_this.vmElement); });
      };
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UITag.prototype, "id", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UITag.prototype, "label", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UITag.prototype, "icon", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UITag.prototype, "href", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UITag.prototype, "size", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UITag.prototype, "type", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Boolean)
      ], UITag.prototype, "closeable", void 0);
      UITag = __chunk_1.__decorate([
          aureliaFramework.containerless(),
          aureliaFramework.customElement("ui-tag"),
          aureliaFramework.inlineView("<template><a class=\"ui-tag ui-tag--${type} ui-tag--${size}\" click.delegate=\"fireClick($event)\" ref=\"vmElement\">\n    <div class=\"ui-tag__label\">${label}</div>\n    <div class=\"ui-tag__icon\"><slot name=\"avatar\"><ui-icon if.bind=\"icon\" icon.bind=\"icon\"></ui-icon></slot></div>\n    <div class=\"ui-tag__value\"><slot></slot></div>\n    <div class=\"ui-tag__close\" if.bind=\"closeable\" click.trigger=\"[$event.stopEvent(), close()]\">&times;</div>\n  </a></template>"),
          __chunk_1.__metadata("design:paramtypes", [Element])
      ], UITag);
      return UITag;
  }());

  var Buttons = [UIButton, UIButtonGroup, UITag];

  exports.Buttons = Buttons;

});
//# sourceMappingURL=ui-buttons.js.map
