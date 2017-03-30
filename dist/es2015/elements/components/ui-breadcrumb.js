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
import { UIEvent } from "../../utils/ui-event";
let UIBreadcrumb = class UIBreadcrumb {
    constructor(element) {
        this.element = element;
        if (element.hasAttribute('primary'))
            element.classList.add('ui-theme');
        if (element.hasAttribute('primary'))
            element.classList.add('primary');
        if (element.hasAttribute('secondary'))
            element.classList.add('ui-theme');
        if (element.hasAttribute('secondary'))
            element.classList.add('secondary');
    }
    fireChange($event) {
        $event.cancelBubble = true;
        $event.stopPropagation();
        if (!isEmpty($event.detail))
            UIEvent.fireEvent('change', this.element, $event.detail);
        return false;
    }
};
UIBreadcrumb = __decorate([
    autoinject(),
    inlineView(`<template class="ui-breadcrumb" crumbclicked.delegate="fireChange($event)"><slot></slot></template>`),
    customElement('ui-breadcrumb'),
    __metadata("design:paramtypes", [Element])
], UIBreadcrumb);
export { UIBreadcrumb };
let UICrumb = class UICrumb {
    constructor(element) {
        this.element = element;
        this.id = '';
        this.href = 'javascript:;';
    }
    fireClick($event) {
        $event.cancelBubble = true;
        $event.stopPropagation();
        UIEvent.fireEvent('crumbclicked', this.element, this.id);
        return false;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UICrumb.prototype, "id", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UICrumb.prototype, "href", void 0);
UICrumb = __decorate([
    autoinject(),
    inlineView(`<template class="ui-crumb"><a href="crumb.href || 'javascript:;'" click.trigger="fireClick($event)"><slot></slot></a></template>`),
    customElement('ui-crumb'),
    __metadata("design:paramtypes", [Element])
], UICrumb);
export { UICrumb };
