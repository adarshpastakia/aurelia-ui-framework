var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-format"], function (require, exports, aurelia_framework_1, ui_event_1, ui_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDGColumnGroup = (function () {
        function UIDGColumnGroup(element) {
            this.element = element;
            this.locked = 1;
            this.isGroup = true;
            this.locked = element.hasAttribute('locked') ? 0 : 1;
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGColumnGroup.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.children('ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph,ui-dg-tpl'),
            __metadata("design:type", Object)
        ], UIDGColumnGroup.prototype, "columns", void 0);
        UIDGColumnGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-dg-column-group'),
            __metadata("design:paramtypes", [Element])
        ], UIDGColumnGroup);
        return UIDGColumnGroup;
    }());
    exports.UIDGColumnGroup = UIDGColumnGroup;
    var UIDataColumn = (function () {
        function UIDataColumn(element) {
            this.element = element;
            this.width = '120px';
            this.minWidth = '40px';
            this.dataType = 'text';
            this.class = '';
            this.format = '';
            this.symbol = '$';
            this.summary = '';
            this.headerTitle = undefined;
            this.locked = 1;
            this.sortable = false;
            this.resizeable = false;
            this.align = 'ui-text-start';
            this.resizeable = element.hasAttribute('resizeable');
            this.sortable = element.hasAttribute('sortable');
            this.locked = element.hasAttribute('locked') ? 0 : 1;
            if (element.hasAttribute('center'))
                this.align = "ui-text-center";
            if (element.hasAttribute('end'))
                this.align = "ui-text-end";
            if (element.hasAttribute('age'))
                this.dataType = 'age';
            else if (element.hasAttribute('date'))
                this.dataType = 'date';
            else if (element.hasAttribute('time'))
                this.dataType = 'time';
            else if (element.hasAttribute('datetime'))
                this.dataType = 'datetime';
            else if (element.hasAttribute('fromnow'))
                this.dataType = 'fromnow';
            else if (element.hasAttribute('number'))
                this.dataType = 'number';
            else if (element.hasAttribute('currency'))
                this.dataType = 'currency';
            else if (element.hasAttribute('percent'))
                this.dataType = 'percent';
            else if (element.hasAttribute('exrate'))
                this.dataType = 'exrate';
            if (this.headerTitle === undefined)
                this.headerTitle = element['innerText'];
        }
        Object.defineProperty(UIDataColumn.prototype, "columnWidth", {
            get: function () {
                return convertToPx(this.width || this.minWidth || 250);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIDataColumn.prototype, "columnMinWidth", {
            get: function () {
                return convertToPx(this.minWidth || 40);
            },
            enumerable: true,
            configurable: true
        });
        UIDataColumn.prototype.getValue = function (value, record) {
            return this.processValue(value, record);
        };
        UIDataColumn.prototype.processValue = function (value, record) {
            var retVal = '';
            if (isFunction(this.value))
                value = this.value(({ value: value, record: record }));
            if (isFunction(this.display))
                retVal = this.display(({ value: value, record: record }));
            else {
                switch (this.dataType) {
                    case 'age':
                        retVal = ui_format_1.UIFormat.age(value);
                        break;
                    case 'date':
                        retVal = ui_format_1.UIFormat.date(value, this.format);
                        break;
                    case 'time':
                        retVal = ui_format_1.UIFormat.time(value, this.format);
                        break;
                    case 'datetime':
                        retVal = ui_format_1.UIFormat.datetime(value, this.format);
                        break;
                    case 'fromnow':
                        retVal = ui_format_1.UIFormat.fromNow(value);
                        break;
                    case 'number':
                        retVal = ui_format_1.UIFormat.number(value, this.format);
                        break;
                    case 'currency':
                        retVal = ui_format_1.UIFormat.currency(value, record[this.symbol] || this.symbol || '$', this.format);
                        break;
                    case 'percent':
                        retVal = ui_format_1.UIFormat.percent(value);
                        break;
                    case 'exrate':
                        retVal = ui_format_1.UIFormat.exRate(value);
                        break;
                    default:
                        retVal = value;
                        break;
                }
            }
            return isEmpty(retVal) ? '&nbsp;' : retVal;
        };
        __decorate([
            aurelia_framework_1.computedFrom('width', 'minWidth'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIDataColumn.prototype, "columnWidth", null);
        __decorate([
            aurelia_framework_1.computedFrom('minWidth'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIDataColumn.prototype, "columnMinWidth", null);
        return UIDataColumn;
    }());
    exports.UIDataColumn = UIDataColumn;
    var UIDgTplColumn = (function (_super) {
        __extends(UIDgTplColumn, _super);
        function UIDgTplColumn(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.type = "normal";
            _this.headerTitle = '';
            _this.width = '120px';
            _this.minWidth = '40px';
            _this.class = '';
            _this.summary = '';
            _this.tpl = _this.element.innerHTML;
            _this.element.innerHTML = "";
            return _this;
        }
        UIDgTplColumn.prototype.bind = function (bindingContext) {
            this.$parent = bindingContext;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgTplColumn.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgTplColumn.prototype, "headerTitle", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgTplColumn.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgTplColumn.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgTplColumn.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgTplColumn.prototype, "summary", void 0);
        UIDgTplColumn = __decorate([
            aurelia_framework_1.noView(),
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.processContent(false),
            aurelia_framework_1.customElement('ui-dg-tpl'),
            __metadata("design:paramtypes", [Element])
        ], UIDgTplColumn);
        return UIDgTplColumn;
    }(UIDataColumn));
    exports.UIDgTplColumn = UIDgTplColumn;
    var UIDgColumn = (function (_super) {
        __extends(UIDgColumn, _super);
        function UIDgColumn(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.type = "normal";
            _this.width = '120px';
            _this.minWidth = '40px';
            _this.dataType = 'text';
            _this.class = '';
            _this.format = '';
            _this.symbol = '$';
            _this.summary = '';
            return _this;
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "display", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "dataType", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "format", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "symbol", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgColumn.prototype, "summary", void 0);
        UIDgColumn = __decorate([
            aurelia_framework_1.noView(),
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-dg-column'),
            __metadata("design:paramtypes", [Element])
        ], UIDgColumn);
        return UIDgColumn;
    }(UIDataColumn));
    exports.UIDgColumn = UIDgColumn;
    var UIDGGlyph = (function (_super) {
        __extends(UIDGGlyph, _super);
        function UIDGGlyph(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.type = 'glyph';
            _this.width = 32;
            _this.class = '';
            return _this;
        }
        UIDGGlyph.prototype.getGlyph = function (value, record) {
            if (isFunction(this.glyph))
                return this.glyph({ value: value, record: record });
            if (this.glyphMap && this.glyphMap[(value + '').toLowerCase()])
                return this.glyphMap[(value + '').toLowerCase()];
            return this.glyph || value;
        };
        UIDGGlyph.prototype.getTooltip = function (value, record) {
            if (isFunction(this.tooltip))
                return this.tooltip({ value: value, record: record });
            if (this.tooltipMap && this.tooltipMap[(value + '').toLowerCase()])
                return this.tooltipMap[(value + '').toLowerCase()];
            return this.tooltip || value;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGGlyph.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGGlyph.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGGlyph.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGGlyph.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGGlyph.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGGlyph.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGGlyph.prototype, "tooltip", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGGlyph.prototype, "glyphMap", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGGlyph.prototype, "tooltipMap", void 0);
        UIDGGlyph = __decorate([
            aurelia_framework_1.noView(),
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-dg-glyph'),
            __metadata("design:paramtypes", [Element])
        ], UIDGGlyph);
        return UIDGGlyph;
    }(UIDataColumn));
    exports.UIDGGlyph = UIDGGlyph;
    var UIDGLink = (function (_super) {
        __extends(UIDGLink, _super);
        function UIDGLink(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.type = 'link';
            _this.class = '';
            _this.show = null;
            _this.disabled = null;
            return _this;
        }
        UIDGLink.prototype.isDisabled = function (value, record) {
            if (isFunction(this.disabled))
                return this.disabled(({ value: value, record: record }));
            if (this.disabled != null)
                return record[this.disabled];
            return false;
        };
        UIDGLink.prototype.isVisible = function (value, record) {
            if (isFunction(this.show))
                return this.show(({ value: value, record: record }));
            if (this.show != null)
                return record[this.show];
            return true;
        };
        UIDGLink.prototype.getGlyph = function (value, record) {
            if (isFunction(this.glyph))
                return this.glyph(({ value: value, record: record }));
            return record[this.glyph] || this.glyph;
        };
        UIDGLink.prototype.getLabel = function (value, record) {
            if (isFunction(this.label))
                return this.label(({ value: value, record: record }));
            return this.label || this.processValue(value, record) || '';
        };
        UIDGLink.prototype.fireClick = function ($event, value, record) {
            $event.stopPropagation();
            $event.preventDefault();
            if (this.isDisabled(value, record))
                return;
            ui_event_1.UIEvent.fireEvent('click', this.element, ({ target: $event.target, value: value, record: record }));
            return false;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGLink.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGLink.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGLink.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGLink.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGLink.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGLink.prototype, "headerTitle", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGLink.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGLink.prototype, "show", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGLink.prototype, "disabled", void 0);
        UIDGLink = __decorate([
            aurelia_framework_1.noView(),
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-dg-link'),
            __metadata("design:paramtypes", [Element])
        ], UIDGLink);
        return UIDGLink;
    }(UIDataColumn));
    exports.UIDGLink = UIDGLink;
    var UIDGButton = (function (_super) {
        __extends(UIDGButton, _super);
        function UIDGButton(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.type = 'button';
            _this.buttonWidth = 'auto';
            _this.buttonTheme = 'default';
            _this.show = null;
            _this.disabled = null;
            _this.align = 'ui-text-center';
            return _this;
        }
        UIDGButton.prototype.isDisabled = function (value, record) {
            if (isFunction(this.disabled))
                return this.disabled(({ value: value, record: record }));
            if (this.disabled != null)
                return record[this.disabled];
            return false;
        };
        UIDGButton.prototype.isVisible = function (value, record) {
            if (isFunction(this.show))
                return this.show(({ value: value, record: record }));
            if (this.show != null)
                return record[this.show];
            return true;
        };
        UIDGButton.prototype.getGlyph = function (value, record) {
            if (isFunction(this.glyph))
                return this.glyph(({ value: value, record: record }));
            return record[this.glyph] || this.glyph;
        };
        UIDGButton.prototype.getLabel = function (value, record) {
            if (isFunction(this.label))
                return this.label(({ value: value, record: record }));
            return this.label || this.processValue(value, record) || '';
        };
        UIDGButton.prototype.getTheme = function (value, record) {
            if (isFunction(this.buttonTheme))
                return this.buttonTheme(({ value: value, record: record }));
            return this.buttonTheme;
        };
        UIDGButton.prototype.fireClick = function ($event, value, record) {
            $event.stopPropagation();
            $event.preventDefault();
            if (this.isDisabled(value, record))
                return;
            ui_event_1.UIEvent.fireEvent('click', this.element, ({ target: $event.target, value: value, record: record }));
            return false;
        };
        UIDGButton.prototype.fireMenuOpen = function ($event, record) {
            $event.stopPropagation();
            return ui_event_1.UIEvent.fireEvent('menuopen', this.element, ({ record: record }));
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "headerTitle", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "buttonWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "buttonTheme", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "show", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDGButton.prototype, "disabled", void 0);
        UIDGButton = __decorate([
            aurelia_framework_1.noView(),
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-dg-button'),
            __metadata("design:paramtypes", [Element])
        ], UIDGButton);
        return UIDGButton;
    }(UIDataColumn));
    exports.UIDGButton = UIDGButton;
});
