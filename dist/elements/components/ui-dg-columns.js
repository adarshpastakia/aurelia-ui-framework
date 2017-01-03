var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', "../../utils/ui-format", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_format_1, ui_event_1) {
    "use strict";
    var UIDataColumn = (function () {
        function UIDataColumn(element) {
            this.element = element;
            this.dataType = 'text';
            this.align = 'ui-text-start';
            this.left = 0;
            this.locked = 1;
            this.resize = false;
            this.sortable = false;
            this.resize = element.hasAttribute('resizeable');
            this.sortable = element.hasAttribute('sortable');
            this.locked = element.hasAttribute('locked') ? 0 : 1;
            if (element.hasAttribute('center'))
                this.align = 'ui-text-center';
            else if (element.hasAttribute('end'))
                this.align = 'ui-text-end';
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
        }
        UIDataColumn.prototype.getWidth = function (tw) {
            this.width = convertToPx(this.width || this.minWidth || 250);
            tw += this.width;
            return this.width;
        };
        UIDataColumn.prototype.getTitle = function () {
            return this.element.innerHTML || '&nbsp;';
        };
        UIDataColumn.prototype.getValue = function (value, record) {
            return this.processValue(value, record) || '&nbsp;';
        };
        UIDataColumn.prototype.processValue = function (value, record) {
            var retVal = '';
            if (isFunction(this.value))
                value = this.value(({ value: value, record: record }));
            if (isFunction(this.display))
                retVal = this.display(({ value: value, record: record })) || '';
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
            return retVal;
        };
        UIDataColumn.prototype.getSummary = function (summaryRow, data) {
            if (!this.summary)
                return '&nbsp;';
            var retVal = '', symbol = '';
            if (_.isObject(summaryRow)) {
                retVal = summaryRow[this.dataId];
                symbol = summaryRow[this.symbol];
            }
            else if (isFunction(this.summary))
                retVal = this.summary({ data: data });
            else {
                switch (this.summary) {
                    case 'sum':
                        retVal = _.sumBy(data, this.dataId);
                        break;
                    case 'avg':
                        retVal = _['meanBy'](data, this.dataId);
                        break;
                    default: return this.summary;
                }
            }
            if (isFunction(this.display))
                retVal = this.display(({ value: retVal, record: summaryRow, forSummary: true })) || '&nbsp;';
            else {
                switch (this.dataType) {
                    case 'number':
                        retVal = ui_format_1.UIFormat.number(retVal, this.format);
                        break;
                    case 'currency':
                        retVal = ui_format_1.UIFormat.currency(retVal, symbol || this.symbol || '$', this.format);
                        break;
                    case 'percent':
                        retVal = ui_format_1.UIFormat.percent(retVal);
                        break;
                    case 'exrate':
                        retVal = ui_format_1.UIFormat.exRate(retVal);
                        break;
                }
            }
            if (this.summary == 'avg')
                retVal = '<small>avg.</small> ' + retVal;
            return retVal;
        };
        return UIDataColumn;
    }());
    exports.UIDataColumn = UIDataColumn;
    var UIDGColumn = (function (_super) {
        __extends(UIDGColumn, _super);
        function UIDGColumn(element) {
            _super.call(this, element);
            this.element = element;
            this.type = 'normal';
            this.class = '';
            this.summary = '';
        }
        UIDGColumn.prototype.created = function (owningView, myView) { };
        UIDGColumn.prototype.bind = function (bindingContext, overrideContext) { };
        UIDGColumn.prototype.attached = function () { };
        UIDGColumn.prototype.detached = function () { };
        UIDGColumn.prototype.unbind = function () { };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "display", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "summary", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "symbol", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGColumn.prototype, "format", void 0);
        UIDGColumn = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-dg-column'), 
            __metadata('design:paramtypes', [Element])
        ], UIDGColumn);
        return UIDGColumn;
    }(UIDataColumn));
    exports.UIDGColumn = UIDGColumn;
    var UIDGLink = (function (_super) {
        __extends(UIDGLink, _super);
        function UIDGLink(element) {
            _super.call(this, element);
            this.element = element;
            this.type = 'link';
            this.class = '';
            this.disabled = null;
        }
        UIDGLink.prototype.created = function (owningView, myView) { };
        UIDGLink.prototype.bind = function (bindingContext, overrideContext) { };
        UIDGLink.prototype.attached = function () { };
        UIDGLink.prototype.detached = function () { };
        UIDGLink.prototype.unbind = function () { };
        UIDGLink.prototype.isDisabled = function (value, record) {
            if (isFunction(this.disabled))
                return this.disabled(({ value: value, record: record }));
            if (this.disabled != null)
                return record[this.disabled];
            return false;
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
            ui_event_1.UIEvent.fireEvent('click', this.element, ({ value: value, record: record }));
            return false;
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGLink.prototype, "disabled", void 0);
        UIDGLink = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-dg-link'), 
            __metadata('design:paramtypes', [Element])
        ], UIDGLink);
        return UIDGLink;
    }(UIDataColumn));
    exports.UIDGLink = UIDGLink;
    var UIDGButton = (function (_super) {
        __extends(UIDGButton, _super);
        function UIDGButton(element) {
            _super.call(this, element);
            this.element = element;
            this.type = 'button';
            this.theme = 'default';
            this.disabled = null;
            this.align = 'ui-text-center';
        }
        UIDGButton.prototype.created = function (owningView, myView) { };
        UIDGButton.prototype.bind = function (bindingContext, overrideContext) { };
        UIDGButton.prototype.attached = function () { };
        UIDGButton.prototype.detached = function () { };
        UIDGButton.prototype.unbind = function () { };
        UIDGButton.prototype.isDisabled = function (value, record) {
            if (isFunction(this.disabled))
                return this.disabled(({ value: value, record: record }));
            if (this.disabled != null)
                return record[this.disabled];
            return false;
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
            if (isFunction(this.theme))
                return this.theme(({ value: value, record: record }));
            return this.theme;
        };
        UIDGButton.prototype.fireClick = function ($event, value, record) {
            $event.stopPropagation();
            $event.preventDefault();
            if (this.isDisabled(value, record))
                return;
            ui_event_1.UIEvent.fireEvent('click', this.element, ({ value: value, record: record }));
            return false;
        };
        UIDGButton.prototype.fireMenuOpen = function ($event, record) {
            $event.stopPropagation();
            return ui_event_1.UIEvent.fireEvent('menuopen', this.element, ({ record: record }));
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "dataId", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "minWidth", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDGButton.prototype, "disabled", void 0);
        UIDGButton = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-dg-button'), 
            __metadata('design:paramtypes', [Element])
        ], UIDGButton);
        return UIDGButton;
    }(UIDataColumn));
    exports.UIDGButton = UIDGButton;
});
