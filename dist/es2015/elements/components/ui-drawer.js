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
import { UIEvent } from '../../utils/ui-event';
let UIDrawer = class UIDrawer {
    constructor(element) {
        this.element = element;
        this.css = {
            show: 'ui-drawer-show',
            fluid: 'ui-drawer-fluid',
            large: 'ui-drawer-large'
        };
        this.width = '';
        this.bodyClass = '';
        this.contentClass = "";
        this.position = "start";
        this.closeGlyph = 'glyph-arrow-left';
        if (element.hasAttribute('fluid'))
            this.element.classList.add(this.css.fluid);
        if (element.hasAttribute('large'))
            this.element.classList.add(this.css.large);
        if (element.hasAttribute('close-on-click'))
            element.addEventListener('mouseup', (e) => { if (e.button == 0)
                this.closeDrawer(); });
    }
    bind(bindingContext, overrideContext) {
        if (this.element.hasAttribute('scroll'))
            this.bodyClass += ' ui-scroll';
        if (this.element.hasAttribute('padded'))
            this.bodyClass += ' ui-pad-all';
        if (this.element.hasAttribute('compact'))
            this.bodyClass += 'ui-compact';
        if (this.position == 'end' && this.closeGlyph === 'glyph-arrow-left')
            this.closeGlyph = 'glyph-arrow-right';
        if (this.width)
            this.contentEl['style'].flexBasis = this.width;
    }
    closeDrawer() {
        if (UIEvent.fireEvent('beforeclose', this.element) !== false) {
            this.element.classList.remove(this.css.show);
            UIEvent.fireEvent('close', this.element);
        }
    }
    openDrawer() {
        if (UIEvent.fireEvent('beforeopen', this.element) !== false) {
            this.element.classList.add(this.css.show);
            UIEvent.fireEvent('open', this.element);
        }
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDrawer.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDrawer.prototype, "bodyClass", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDrawer.prototype, "contentClass", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDrawer.prototype, "position", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDrawer.prototype, "closeGlyph", void 0);
UIDrawer = __decorate([
    autoinject(),
    inlineView(`<template class="ui-drawer ui-drawer-\${position}">
  <div ref="contentEl" class="ui-drawer-content ui-row ui-row-v ui-align-stretch ui-nowrap \${contentClass}">
    <a class="ui-drawer-close" click.trigger="closeDrawer()"><ui-glyph glyph.bind="closeGlyph"></ui-glyph></a>
    <slot name="drawer-head"></slot>
    <div class="ui-drawer-body \${bodyClass}"><slot></slot></div>
    <slot name="drawer-foot"></slot>
  </div>
  <div class="ui-drawer-shim" click.trigger="closeDrawer()"></div>
</template>`),
    customElement('ui-drawer'),
    __metadata("design:paramtypes", [Element])
], UIDrawer);
export { UIDrawer };
let UIDrawerToggle = class UIDrawerToggle {
    constructor(element) {
        this.element = element;
        this.glyph = 'glyph-handle-menu';
    }
    openDrawer(evt) {
        if (!this.drawer)
            throw Error('Drawer element required');
        if (evt.button != 0)
            return true;
        evt.stopPropagation();
        evt.cancelBubble = true;
        if (this.drawer && this.drawer.au.controller) {
            this.drawer.au.controller.viewModel.openDrawer();
        }
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDrawerToggle.prototype, "drawer", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDrawerToggle.prototype, "glyph", void 0);
UIDrawerToggle = __decorate([
    autoinject(),
    inlineView('<template class="ui-drawer-toggle" click.trigger="openDrawer($event)"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>'),
    customElement('ui-drawer-toggle'),
    __metadata("design:paramtypes", [Element])
], UIDrawerToggle);
export { UIDrawerToggle };
