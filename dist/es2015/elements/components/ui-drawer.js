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
        this.position = "start";
        this.closeGlyph = 'glyph-arrow-left';
        this.bodyCls = '';
        if (element.hasAttribute('fluid'))
            this.element.classList.add('ui-fluid');
        if (element.hasAttribute('large'))
            this.element.classList.add('ui-large');
        if (element.hasAttribute('close-on-click'))
            element.addEventListener('mouseup', (e) => { if (e.button == 0)
                this.closeDrawer(); });
    }
    bind(bindingContext, overrideContext) {
        if (this.element.hasAttribute('scroll'))
            this.bodyCls += ' ui-scroll';
        if (this.element.hasAttribute('padded'))
            this.bodyCls += ' ui-pad-all';
        if (this.position == 'end' && this.closeGlyph === 'glyph-arrow-left')
            this.closeGlyph = 'glyph-arrow-right';
    }
    closeDrawer() {
        if (UIEvent.fireEvent('beforeclose', this.element) !== false) {
            this.element.classList.remove('ui-show');
            UIEvent.fireEvent('close', this.element);
        }
    }
    openDrawer() {
        if (UIEvent.fireEvent('beforeopen', this.element) !== false) {
            this.element.classList.add('ui-show');
            UIEvent.fireEvent('open', this.element);
        }
    }
};
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
    inlineView(`<template class="ui-drawer ui-\${position}">
  <div class="ui-drawer-content ui-row-vertical ui-align-stretch ui-row-nowrap">
    <a class="ui-drawer-close ui-col-auto" click.trigger="closeDrawer()"><ui-glyph glyph.bind="closeGlyph"></ui-glyph></a>
    <div class="ui-drawer-body ui-col-fill \${bodyCls}"><slot></slot></div>
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
        if (this.drawer && this.drawer.classList) {
            this.drawer.classList.add('ui-show');
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
