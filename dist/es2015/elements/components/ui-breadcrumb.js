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
let UIChip = class UIChip {
    constructor(element) {
        this.element = element;
        this.id = '';
        this.label = '';
        this.color = '';
        this.theme = '';
        this.canClose = false;
        if (element.hasAttribute('big'))
            element.classList.add('big');
        if (element.hasAttribute('small'))
            element.classList.add('small');
        if (this.element.hasAttribute('primary'))
            this.theme = 'primary';
        else if (this.element.hasAttribute('secondary'))
            this.theme = 'secondary';
        else if (this.element.hasAttribute('light'))
            this.theme = 'light';
        else if (this.element.hasAttribute('dark'))
            this.theme = 'dark';
        else if (this.element.hasAttribute('info'))
            this.theme = 'info';
        else if (this.element.hasAttribute('danger'))
            this.theme = 'danger';
        else if (this.element.hasAttribute('success'))
            this.theme = 'success';
        else if (this.element.hasAttribute('warning'))
            this.theme = 'warning';
        this.canClose = element.hasAttribute('removable');
    }
    remove() {
        UIEvent.fireEvent('remove', this.element, this.id);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIChip.prototype, "id", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIChip.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIChip.prototype, "color", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIChip.prototype, "theme", void 0);
UIChip = __decorate([
    autoinject(),
    inlineView(`<template class="ui-chip \${theme}"><span class="ui-chip-label" css.bind="{'background-color':color}">\${label}</span><span class="ui-chip-value"><slot></slot></span><a click.trigger="remove()" class="ui-chip-close" if.bind="canClose">&times</a></template>`),
    customElement('ui-chip'),
    __metadata("design:paramtypes", [Element])
], UIChip);
export { UIChip };
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
