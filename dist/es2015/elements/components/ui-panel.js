var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, children, inlineView, DOM } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
let UIPanel = class UIPanel {
    constructor(element) {
        this.element = element;
        this.height = 'auto';
        this.collapsed = false;
        this.collapsed = element.hasAttribute('collapsed');
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() { }
    detached() { }
    unbind() { }
    close() {
        DOM.removeNode(this.element);
    }
    collapse() {
        this.collapsed = true;
    }
    expand() {
        this.collapsed = false;
    }
    toggleCollapse() {
        setTimeout(() => this.collapsed = !this.collapsed, 200);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPanel.prototype, "height", void 0);
UIPanel = __decorate([
    autoinject(),
    inlineView(`<template class="ui-panel \${collapsed?'ui-collapse':''}" css.bind="{'height':height}" collapse.trigger="toggleCollapse()" close.trigger="close()"><slot></slot></template>`),
    customElement('ui-panel'),
    __metadata("design:paramtypes", [Element])
], UIPanel);
export { UIPanel };
let UIPanelBody = class UIPanelBody {
    constructor(element) {
        this.element = element;
        this.height = 'auto';
        this.maxHeight = 'auto';
        if (element.hasAttribute('flex'))
            element.classList.add('ui-flexed');
        if (element.hasAttribute('scroll'))
            element.classList.add('ui-scroll');
        if (element.hasAttribute('padded'))
            element.classList.add('ui-pad-all');
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() { }
    detached() { }
    unbind() { }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPanelBody.prototype, "height", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPanelBody.prototype, "maxHeight", void 0);
UIPanelBody = __decorate([
    autoinject(),
    inlineView(`<template class="ui-panel-body" css.bind="{'max-height': maxHeight,'flex-basis':height}"><slot></slot></template>`),
    customElement('ui-panel-body'),
    __metadata("design:paramtypes", [Element])
], UIPanelBody);
export { UIPanelBody };
let UIPanelGroup = class UIPanelGroup {
    constructor(element) {
        this.element = element;
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() {
    }
    detached() { }
    unbind() { }
    uncollapse() {
    }
};
__decorate([
    children('ui-panel'),
    __metadata("design:type", Object)
], UIPanelGroup.prototype, "panels", void 0);
UIPanelGroup = __decorate([
    autoinject(),
    inlineView(`<template class="ui-panel-group" collapse.delegate="uncollapse()"><slot></slot></template>`),
    customElement('ui-panel-group'),
    __metadata("design:paramtypes", [Element])
], UIPanelGroup);
export { UIPanelGroup };
let UIHeader = class UIHeader {
    constructor(element) {
        this.element = element;
        this.theme = 'default';
        if (element.hasAttribute('primary'))
            this.theme = 'primary';
        else if (element.hasAttribute('secondary'))
            this.theme = 'secondary';
        else if (element.hasAttribute('dark'))
            this.theme = 'dark';
        else if (element.hasAttribute('light'))
            this.theme = 'light';
        else if (element.hasAttribute('info'))
            this.theme = 'info';
        else if (element.hasAttribute('danger'))
            this.theme = 'danger';
        else if (element.hasAttribute('success'))
            this.theme = 'success';
        else if (element.hasAttribute('warning'))
            this.theme = 'warning';
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() { }
    detached() { }
    unbind() { }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIHeader.prototype, "theme", void 0);
UIHeader = __decorate([
    autoinject(),
    inlineView(`<template class="ui-header \${theme}"><slot></slot></template>`),
    customElement('ui-header'),
    __metadata("design:paramtypes", [Element])
], UIHeader);
export { UIHeader };
let UIHeaderTool = class UIHeaderTool {
    constructor(element) {
        this.element = element;
        this.disabled = false;
        this.type = '';
        this.glyph = '';
        if (element.hasAttribute('close'))
            this.type = "close";
        if (element.hasAttribute('refresh'))
            this.type = "refresh";
        if (element.hasAttribute('collapse'))
            this.type = "collapse";
        if (element.hasAttribute('expand'))
            this.type = "expand";
        if (element.hasAttribute('minimize'))
            this.type = "minimize";
        if (element.hasAttribute('close'))
            this.glyph = "ui-dialog-close";
        if (element.hasAttribute('refresh'))
            this.glyph = "ui-refresh";
        if (element.hasAttribute('collapse'))
            this.glyph = "ui-chevron-up";
        if (element.hasAttribute('expand'))
            this.glyph = "ui-dialog-expand";
        if (element.hasAttribute('minimize'))
            this.glyph = "ui-dialog-minimize";
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) {
        this.disabled = isTrue(this.disabled);
    }
    attached() {
        if (this.dropdown) {
            this.obMouseup = UIEvent.subscribe('mouseclick', (evt) => {
                if (getParentByClass(evt.target, 'ui-button') == this.element)
                    return;
                this.element.classList.remove('ui-open');
                this.dropdown.classList.remove('ui-open');
            });
            this.dropdown.classList.add('ui-floating');
            this.tether = UIUtils.tether(this.element, this.dropdown, { position: 'br' });
        }
    }
    detached() {
        if (this.tether)
            this.tether.dispose();
        if (this.obMouseup)
            this.obMouseup.dispose();
        if (this.dropdown)
            DOM.removeNode(this.dropdown);
    }
    unbind() { }
    fireEvent(evt) {
        if (evt.button != 0)
            return true;
        if (this.dropdown) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.cancelBubble = true;
            if (this.element.classList.contains('ui-open')) {
                UIEvent.fireEvent('menuhide', this.element);
                this.element.classList.remove('ui-open');
                this.dropdown.classList.remove('ui-open');
            }
            else {
                if (UIEvent.fireEvent('menuopen', this.element) !== false) {
                    this.element.classList.add('ui-open');
                    this.dropdown.classList.add('ui-open');
                    this.tether.position();
                }
            }
            return false;
        }
        return UIEvent.fireEvent(this.type, this.element);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIHeaderTool.prototype, "dropdown", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIHeaderTool.prototype, "disabled", void 0);
UIHeaderTool = __decorate([
    autoinject(),
    inlineView(`<template class="ui-header-tool"><button disabled.bind="disabled" tabindex="-1" class="ui-header-button ui-\${type}" click.trigger="fireEvent($event)">
  <slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></button></template>`),
    customElement('ui-header-tool'),
    __metadata("design:paramtypes", [Element])
], UIHeaderTool);
export { UIHeaderTool };
let UIHeaderTitle = class UIHeaderTitle {
    constructor(element) {
        this.element = element;
        this.glyph = '';
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() { }
    detached() { }
    unbind() { }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIHeaderTitle.prototype, "glyph", void 0);
UIHeaderTitle = __decorate([
    autoinject(),
    inlineView(`<template class="ui-header-title ui-inline-block ui-col-fill"><ui-glyph glyph.bind="glyph" if.bind="glyph"></ui-glyph>&nbsp;<slot></slot></template>`),
    customElement('ui-header-title'),
    __metadata("design:paramtypes", [Element])
], UIHeaderTitle);
export { UIHeaderTitle };
