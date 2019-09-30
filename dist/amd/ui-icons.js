define(['exports', './_tslib', 'aurelia-framework'], function (exports, _tslib, aureliaFramework) { 'use strict';

  var UIAvatar = (function () {
      function UIAvatar(element) {
          this.element = element;
          this.icon = "";
          this.size = "nm";
          if (element.hasAttribute("round")) {
              element.classList.add("ui-avatar--round");
          }
          if (element.hasAttribute("flip-on-rtl")) {
              element.classList.add("flip-on-rtl");
          }
      }
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UIAvatar.prototype, "icon", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UIAvatar.prototype, "size", void 0);
      UIAvatar = _tslib.__decorate([
          aureliaFramework.customElement("ui-avatar"),
          aureliaFramework.inlineView("<template class=\"ui-avatar\"><slot><ui-icon ui-font.bind=\"size\" icon.bind=\"icon\"></ui-icon></slot></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UIAvatar);
      return UIAvatar;
  }());

  var UIFlag = (function () {
      function UIFlag(element) {
          this.element = element;
          this.code = "";
          this.size = "nm";
          if (element.hasAttribute("round")) {
              element.classList.add("ui-icon--round");
          }
      }
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UIFlag.prototype, "code", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UIFlag.prototype, "size", void 0);
      UIFlag = _tslib.__decorate([
          aureliaFramework.customElement("ui-flag"),
          aureliaFramework.inlineView("<template ui-font.bind=\"size\" class=\"ui-flag ${code}\"></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UIFlag);
      return UIFlag;
  }());

  var UIIcon = (function () {
      function UIIcon(element) {
          this.element = element;
          this.icon = "";
          this.size = "nm";
          if (element.hasAttribute("round")) {
              element.classList.add("ui-icon--round");
          }
          if (element.hasAttribute("flip-on-rtl")) {
              element.classList.add("flip-on-rtl");
          }
      }
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UIIcon.prototype, "icon", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UIIcon.prototype, "size", void 0);
      UIIcon = _tslib.__decorate([
          aureliaFramework.customElement("ui-icon"),
          aureliaFramework.inlineView("<template ui-font.bind=\"size\" class=\"ui-icon ${icon}\"><slot></slot></template>"),
          _tslib.__metadata("design:paramtypes", [Element])
      ], UIIcon);
      return UIIcon;
  }());

  var none = " ";
  var unknown = "M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z";
  var loader = "M8.111,1.747C9.299,1.254,10.62,1,12,1c6.075,0,11,4.925,11,11s-4.925,11-11,11S1,18.075,1,12c0-1.38,0.254-2.701,0.718-3.918c0.526,0.526,1.11,0.882,1.732,1.098C3.158,10.067,3,11.015,3,12c0,4.971,4.029,9,9,9s9-4.029,9-9s-4.029-9-9-9c-0.985,0-1.933,0.158-2.82,0.451C8.964,2.828,8.608,2.244,8.111,1.747z M4.929,2.929c1.105,0,2,0.896,2,2c0,1.105-0.895,2-2,2c-1.104,0-2-0.895-2-2C2.929,3.824,3.824,2.929,4.929,2.929z";
  var busy = "M16,13V11H21V13H16M14.83,7.76L17.66,4.93L19.07,6.34L16.24,9.17L14.83,7.76M11,16H13V21H11V16M11,3H13V8H11V3M4.93,17.66L7.76,14.83L9.17,16.24L6.34,19.07L4.93,17.66M4.93,6.34L6.34,4.93L9.17,7.76L7.76,9.17L4.93,6.34M8,13H3V11H8V13M19.07,17.66L17.66,19.07L14.83,16.24L16.24,14.83L19.07,17.66Z";
  var alert = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";
  var cross = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
  var caret = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
  var minus = "M19,13H5V11H19V13Z";
  var plus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
  var menu = "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
  var help = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z";
  var expand = "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z";
  var collapse = "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z";
  var drag = "M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z";
  var resizer = "M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z";
  var calendar = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z";
  var clock = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";
  var ellipsis = "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";
  var overflow = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
  var file = "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z";
  var upload = "M14,13V17H10V13H7L12,8L17,13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z";
  var pinned = "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z";
  var unpinned = "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z";
  var Icons = {
  	none: none,
  	"check-off": "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
  	"check-on": "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
  	"radio-off": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  	"radio-on": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z",
  	"radio-check": "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z",
  	unknown: unknown,
  	loader: loader,
  	busy: busy,
  	alert: alert,
  	cross: cross,
  	caret: caret,
  	minus: minus,
  	plus: plus,
  	menu: menu,
  	help: help,
  	expand: expand,
  	collapse: collapse,
  	drag: drag,
  	resizer: resizer,
  	calendar: calendar,
  	clock: clock,
  	ellipsis: ellipsis,
  	overflow: overflow,
  	"folder-closed": "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z",
  	"folder-open": "M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z",
  	"folder-empty": "M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z",
  	file: file,
  	upload: upload,
  	pinned: pinned,
  	unpinned: unpinned,
  	"collapse-start": "M11.92,19.92L4,12L11.92,4.08L13.33,5.5L7.83,11H22V13H7.83L13.34,18.5L11.92,19.92M4,12V2H2V22H4V12Z",
  	"collapse-end": "M12.08,4.08L20,12L12.08,19.92L10.67,18.5L16.17,13H2V11H16.17L10.67,5.5L12.08,4.08M20,12V22H22V2H20V12Z",
  	"expand-start": "M4,2H2V22H4V13H18.17L12.67,18.5L14.08,19.92L22,12L14.08,4.08L12.67,5.5L18.17,11H4V2Z",
  	"expand-end": "M20,22H22V2H20V11H5.83L11.33,5.5L9.92,4.08L2,12L9.92,19.92L11.33,18.5L5.83,13H20V22Z",
  	"page-first": "M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z",
  	"page-last": "M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z",
  	"page-previous": "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
  	"page-next": "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
  	"tree-expand": "M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z",
  	"tree-collapse": "M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M17,11V13H7V11H17Z",
  	"tree-closed": "M10,17L15,12L10,7V17Z",
  	"tree-open": "M7,10L12,15L17,10H7Z",
  	"tree-check-on": "M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z",
  	"tree-check-off": "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
  	"tree-check-half": "M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,17H7V7H17V17Z",
  	"dlg-minimize": "M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  	"dlg-help": "M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z",
  	"dlg-close": "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  	"dlg-expand": "M12,1.998c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10c5.522,0,10-4.477,10-10C22,6.475,17.521,1.998,12,1.998z M7.757,16.244V9.171l7.071,7.073H7.757z M16.242,14.83l-7.07-7.073h7.07V14.83z",
  	"dlg-collapse": "M12,1.998c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10c5.522,0,10-4.477,10-10C22,6.475,17.521,1.998,12,1.998z M11.646,19.428l-7.07-7.073h7.07V19.428z M12.354,11.645V4.572l7.07,7.072H12.354z"
  };

  var UISvgIcon = (function () {
      function UISvgIcon() {
          this.icon = "";
          this.class = "";
          this.viewBox = "0 0 24 24";
          this.iconPath = "";
      }
      UISvgIcon.prototype.bind = function () {
          this.iconChanged();
      };
      UISvgIcon.prototype.iconChanged = function () {
          this.iconPath = Icons[this.icon];
          if (!this.iconPath) {
              this.iconPath = Icons.unknown;
          }
      };
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UISvgIcon.prototype, "icon", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", String)
      ], UISvgIcon.prototype, "class", void 0);
      _tslib.__decorate([
          aureliaFramework.bindable(),
          _tslib.__metadata("design:type", Object)
      ], UISvgIcon.prototype, "viewBox", void 0);
      UISvgIcon = _tslib.__decorate([
          aureliaFramework.containerless(),
          aureliaFramework.customElement("ui-svg-icon"),
          aureliaFramework.inlineView("<template><svg ref=\"vmElement\" slot=\"svg-icon\" class=\"ui-icon ui-svg-icon ${class}\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"24\" height=\"24\" viewBox=\"${viewBox}\"><path d.bind=\"iconPath\"></path></svg></template>")
      ], UISvgIcon);
      return UISvgIcon;
  }());

  var Icons$1 = [UIIcon, UIFlag, UISvgIcon, UIAvatar];

  exports.Icons = Icons$1;

});
//# sourceMappingURL=ui-icons.js.map
