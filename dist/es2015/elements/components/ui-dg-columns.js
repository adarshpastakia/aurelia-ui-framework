var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, processContent, children, inlineView, noView, computedFrom } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIFormat } from "../../utils/ui-format";
let UIDGColumnGroup = class UIDGColumnGroup {
    constructor(element) {
        this.element = element;
        this.locked = 1;
        this.isGroup = true;
        this.locked = element.hasAttribute('locked') ? 0 : 1;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGColumnGroup.prototype, "label", void 0);
__decorate([
    children('ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph,ui-dg-tpl'),
    __metadata("design:type", Object)
], UIDGColumnGroup.prototype, "columns", void 0);
UIDGColumnGroup = __decorate([
    autoinject(),
    inlineView(`<template><slot></slot></template>`),
    customElement('ui-dg-column-group'),
    __metadata("design:paramtypes", [Element])
], UIDGColumnGroup);
export { UIDGColumnGroup };
export class UIDataColumn {
    constructor(element) {
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
    get columnWidth() {
        return convertToPx(this.width || this.minWidth || 250);
    }
    get columnMinWidth() {
        return convertToPx(this.minWidth || 40);
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
}
__decorate([
    computedFrom('width', 'minWidth'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataColumn.prototype, "columnWidth", null);
__decorate([
    computedFrom('minWidth'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataColumn.prototype, "columnMinWidth", null);
let UIDgTplColumn = class UIDgTplColumn extends UIDataColumn {
    constructor(element) {
        super(element);
        this.element = element;
        this.type = "normal";
        this.headerTitle = '';
        this.width = '120px';
        this.minWidth = '40px';
        this.class = '';
        this.summary = '';
        this.tpl = this.element.innerHTML;
        this.element.innerHTML = "";
    }
    bind(bindingContext) {
        this.$parent = bindingContext;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgTplColumn.prototype, "dataId", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgTplColumn.prototype, "headerTitle", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgTplColumn.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgTplColumn.prototype, "minWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgTplColumn.prototype, "class", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgTplColumn.prototype, "summary", void 0);
UIDgTplColumn = __decorate([
    noView(),
    autoinject(),
    processContent(false),
    customElement('ui-dg-tpl'),
    __metadata("design:paramtypes", [Element])
], UIDgTplColumn);
export { UIDgTplColumn };
let UIDgColumn = class UIDgColumn extends UIDataColumn {
    constructor(element) {
        super(element);
        this.element = element;
        this.type = "normal";
        this.width = '120px';
        this.minWidth = '40px';
        this.dataType = 'text';
        this.class = '';
        this.format = '';
        this.symbol = '$';
        this.summary = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "dataId", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "display", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "minWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "dataType", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "class", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "format", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "symbol", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgColumn.prototype, "summary", void 0);
UIDgColumn = __decorate([
    noView(),
    autoinject(),
    customElement('ui-dg-column'),
    __metadata("design:paramtypes", [Element])
], UIDgColumn);
export { UIDgColumn };
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
], UIDGGlyph.prototype, "label", void 0);
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
    noView(),
    autoinject(),
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
], UIDGLink.prototype, "headerTitle", void 0);
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
    noView(),
    autoinject(),
    customElement('ui-dg-link'),
    __metadata("design:paramtypes", [Element])
], UIDGLink);
export { UIDGLink };
let UIDGButton = class UIDGButton extends UIDataColumn {
    constructor(element) {
        super(element);
        this.element = element;
        this.type = 'button';
        this.buttonWidth = 'auto';
        this.buttonTheme = 'default';
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
        if (isFunction(this.buttonTheme))
            return this.buttonTheme(({ value, record }));
        return this.buttonTheme;
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
], UIDGButton.prototype, "headerTitle", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "dropdown", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "buttonWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "buttonTheme", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "show", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDGButton.prototype, "disabled", void 0);
UIDGButton = __decorate([
    noView(),
    autoinject(),
    customElement('ui-dg-button'),
    __metadata("design:paramtypes", [Element])
], UIDGButton);
export { UIDGButton };
