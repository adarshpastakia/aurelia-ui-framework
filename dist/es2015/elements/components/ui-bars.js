var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, inlineView } from 'aurelia-framework';
let UIToolbar = class UIToolbar {
    constructor(element) {
        this.element = element;
        if (element.hasAttribute('start'))
            element.classList.add('ui-start');
        if (element.hasAttribute('compact'))
            element.classList.add('ui-compact');
    }
};
UIToolbar = __decorate([
    autoinject(),
    inlineView(`<template class="ui-toolbar"><slot></slot></template>`),
    customElement('ui-toolbar'),
    __metadata("design:paramtypes", [Element])
], UIToolbar);
export { UIToolbar };
let UIStatsbar = class UIStatsbar {
    constructor(element) {
        this.element = element;
        if (element.hasAttribute('small'))
            element.classList.add('ui-small');
        if (element.hasAttribute('icon-top'))
            element.classList.add('ui-icon-top');
        if (element.hasAttribute('icon-end'))
            element.classList.add('ui-icon-end');
        if (element.hasAttribute('vertical'))
            element.classList.add('ui-vertical');
        if (element.hasAttribute('icon-only'))
            element.classList.add('ui-icon-only');
    }
};
UIStatsbar = __decorate([
    autoinject(),
    inlineView(`<template class="ui-statsbar"><slot></slot></template>`),
    customElement('ui-statsbar'),
    __metadata("design:paramtypes", [Element])
], UIStatsbar);
export { UIStatsbar };
let UIStat = class UIStat {
    constructor(element) {
        this.element = element;
        this.glyph = '';
        this.label = '';
        if (element.hasAttribute('icon-end'))
            element.classList.add('ui-icon-end');
        if (element.hasAttribute('icon-only'))
            element.classList.add('ui-icon-only');
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIStat.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIStat.prototype, "label", void 0);
UIStat = __decorate([
    autoinject(),
    inlineView(`<template class="ui-stat"><ui-glyph glyph.bind="glyph" if.bind="glyph"></ui-glyph>
  <div><div class="ui-stat-value"><slot></slot></div><div class="ui-stat-label" innerhtml.bind="label" if.bind="label"></div></div></template>`),
    customElement('ui-stat'),
    __metadata("design:paramtypes", [Element])
], UIStat);
export { UIStat };
