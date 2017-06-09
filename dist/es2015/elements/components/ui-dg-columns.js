var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, children, inlineView } from 'aurelia-framework';
import { UIFormat } from "../../utils/ui-format";
import { UIEvent } from "../../utils/ui-event";
import * as _ from "lodash";
export class UIDataColumn {
    constructor(element) {
        this.element = element;
        this.width = 0;
        this.minWidth = 0;
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
    getWidth(tw) {
        this.width = convertToPx(this.width || this.minWidth || 250);
        return this.width;
    }
    getTitle() {
        return this.element.innerHTML + '&nbsp;';
    }
    getValue(value, record) {
        return this.processValue(value, record);
    }
    processValue(value, record) {
        let retVal = '';
        if (isFunction(this.value))
            value = this.value(({ value, record }));
        if (isFunction(this.display))
            retVal = this.display(({ value, record }));
        else {
            switch (this.dataType) {
                case 'age':
                    retVal = UIFormat.age(value);
                    break;
                case 'date':
                    retVal = UIFormat.date(value, this.format);
                    break;
                case 'time':
                    retVal = UIFormat.time(value, this.format);
                    break;
                case 'datetime':
                    retVal = UIFormat.datetime(value, this.format);
                    break;
                case 'fromnow':
                    retVal = UIFormat.fromNow(value);
                    break;
                case 'number':
                    retVal = UIFormat.number(value, this.format);
                    break;
                case 'currency':
                    retVal = UIFormat.currency(value, record[this.symbol] || this.symbol || '$', this.format);
                    break;
                case 'percent':
                    retVal = UIFormat.percent(value);
                    break;
                case 'exrate':
                    retVal = UIFormat.exRate(value);
                    break;
                default:
                    retVal = value;
                    break;
            }
        }
        return isEmpty(retVal) ? '&nbsp;' : retVal;
    }
    getSummary(summaryRow, data) {
        if (!this.summary)
            return '&nbsp;';
        let retVal = '', symbol = '';
        if (_.isObject(summaryRow)) {
            retVal = summaryRow[this.dataId];
            symbol = summaryRow[this.symbol];
        }
        else if (isFunction(this.summary))
            retVal = this.summary(data);
        else {
            switch (this.summary) {
                case 'sum':
                    retVal = _.sumBy(data, this.dataId);
                    break;
                case 'avg':
                    retVal = _['meanBy'](data, this.dataId);
                    break;
                default: return this.summary || '&nbsp;';
            }
        }
        if (isFunction(this.display))
            retVal = this.display(({ value: retVal, record: summaryRow, forSummary: true })) || '&nbsp;';
        else {
            switch (this.dataType) {
                case 'number':
                    retVal = UIFormat.number(retVal, this.format);
                    break;
                case 'currency':
                    retVal = UIFormat.currency(retVal, symbol || this.symbol || '$', this.format);
                    break;
                case 'percent':
                    retVal = UIFormat.percent(retVal);
                    break;
                case 'exrate':
                    retVal = UIFormat.exRate(retVal);
                    break;
            }
        }
        if (this.summary == 'avg')
            retVal = '<small>avg.</small> ' + retVal;
        return retVal;
    }
}
let UIDGColumnGroup = class UIDGColumnGroup {
    constructor(element) {
        this.element = element;
        this.locked = 1;
        this.isGroup = true;
        this.locked = element.hasAttribute('locked') ? 0 : 1;
    }
    getTitle() {
        return this.label + '&nbsp;';
    }
    getWidth() {
        return 'auto';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumnGroup.prototype, "label", void 0);
__decorate([
    children('ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
    __metadata("design:type", Object)
], UIDGColumnGroup.prototype, "columns", void 0);
UIDGColumnGroup = __decorate([
    autoinject(),
    inlineView(`<template><slot></slot></template>`),
    customElement('ui-dg-column-group'),
    __metadata("design:paramtypes", [Element])
], UIDGColumnGroup);
export { UIDGColumnGroup };
let UIDGColumn = class UIDGColumn extends UIDataColumn {
    constructor(element) {
        super(element);
        this.element = element;
        this.type = 'normal';
        this.class = '';
        this.summary = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumn.prototype, "dataId", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumn.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumn.prototype, "minWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumn.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumn.prototype, "display", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumn.prototype, "class", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumn.prototype, "summary", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumn.prototype, "symbol", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumn.prototype, "format", void 0);
UIDGColumn = __decorate([
    autoinject(),
    inlineView(`<template><slot></slot></template>`),
    customElement('ui-dg-column'),
    __metadata("design:paramtypes", [Element])
], UIDGColumn);
export { UIDGColumn };
let UIDGGlyph = class UIDGGlyph extends UIDataColumn {
    constructor(element) {
        super(element);
        this.element = element;
        this.type = 'glyph';
        this.width = 32;
        this.class = '';
    }
    getGlyph(value, record) {
        if (isFunction(this.glyph))
            return this.glyph({ value, record });
        if (this.glyphMap && this.glyphMap[(value + '').toLowerCase()])
            return this.glyphMap[(value + '').toLowerCase()];
        return this.glyph || value;
    }
    getTooltip(value, record) {
        if (isFunction(this.tooltip))
            return this.tooltip({ value, record });
        if (this.tooltipMap && this.tooltipMap[(value + '').toLowerCase()])
            return this.tooltipMap[(value + '').toLowerCase()];
        return this.tooltip || value;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGGlyph.prototype, "dataId", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGGlyph.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGGlyph.prototype, "minWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGGlyph.prototype, "class", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGGlyph.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGGlyph.prototype, "tooltip", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGGlyph.prototype, "glyphMap", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGGlyph.prototype, "tooltipMap", void 0);
UIDGGlyph = __decorate([
    autoinject(),
    inlineView(`<template><slot></slot></template>`),
    customElement('ui-dg-glyph'),
    __metadata("design:paramtypes", [Element])
], UIDGGlyph);
export { UIDGGlyph };
let UIDGLink = class UIDGLink extends UIDataColumn {
    constructor(element) {
        super(element);
        this.element = element;
        this.type = 'link';
        this.class = '';
        this.show = null;
        this.disabled = null;
    }
    isDisabled(value, record) {
        if (isFunction(this.disabled))
            return this.disabled(({ value, record }));
        if (this.disabled != null)
            return record[this.disabled];
        return false;
    }
    isVisible(value, record) {
        if (isFunction(this.show))
            return this.show(({ value, record }));
        if (this.show != null)
            return record[this.show];
        return true;
    }
    getGlyph(value, record) {
        if (isFunction(this.glyph))
            return this.glyph(({ value, record }));
        return record[this.glyph] || this.glyph;
    }
    getLabel(value, record) {
        if (isFunction(this.label))
            return this.label(({ value, record }));
        return this.label || this.processValue(value, record) || '';
    }
    fireClick($event, value, record) {
        $event.stopPropagation();
        $event.preventDefault();
        if (this.isDisabled(value, record))
            return;
        UIEvent.fireEvent('click', this.element, ({ target: $event.target, value: value, record: record }));
        return false;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGLink.prototype, "dataId", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGLink.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGLink.prototype, "minWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGLink.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGLink.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGLink.prototype, "class", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGLink.prototype, "show", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGLink.prototype, "disabled", void 0);
UIDGLink = __decorate([
    autoinject(),
    inlineView(`<template><slot></slot></template>`),
    customElement('ui-dg-link'),
    __metadata("design:paramtypes", [Element])
], UIDGLink);
export { UIDGLink };
let UIDGButton = class UIDGButton extends UIDataColumn {
    constructor(element) {
        super(element);
        this.element = element;
        this.type = 'button';
        this.theme = 'default';
        this.show = null;
        this.disabled = null;
        this.align = 'ui-text-center';
    }
    isDisabled(value, record) {
        if (isFunction(this.disabled))
            return this.disabled(({ value, record }));
        if (this.disabled != null)
            return record[this.disabled];
        return false;
    }
    isVisible(value, record) {
        if (isFunction(this.show))
            return this.show(({ value, record }));
        if (this.show != null)
            return record[this.show];
        return true;
    }
    getGlyph(value, record) {
        if (isFunction(this.glyph))
            return this.glyph(({ value, record }));
        return record[this.glyph] || this.glyph;
    }
    getLabel(value, record) {
        if (isFunction(this.label))
            return this.label(({ value, record }));
        return this.label || this.processValue(value, record) || '';
    }
    getTheme(value, record) {
        if (isFunction(this.theme))
            return this.theme(({ value, record }));
        return this.theme;
    }
    fireClick($event, value, record) {
        $event.stopPropagation();
        $event.preventDefault();
        if (this.isDisabled(value, record))
            return;
        UIEvent.fireEvent('click', this.element, ({ target: $event.target, value: value, record: record }));
        return false;
    }
    fireMenuOpen($event, record) {
        $event.stopPropagation();
        return UIEvent.fireEvent('menuopen', this.element, ({ record }));
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "dataId", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "minWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "dropdown", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "theme", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "show", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "disabled", void 0);
UIDGButton = __decorate([
    autoinject(),
    inlineView(`<template><slot></slot></template>`),
    customElement('ui-dg-button'),
    __metadata("design:paramtypes", [Element])
], UIDGButton);
export { UIDGButton };
