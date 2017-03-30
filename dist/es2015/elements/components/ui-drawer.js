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
let UIDrawer = class UIDrawer {
    constructor(element) {
        this.element = element;
        this.position = "start";
        this.glyph = 'glyph-arrow-left';
        this.bodyCls = '';
        if (element.hasAttribute('close-on-click'))
            element.addEventListener('mouseup', (e) => { if (e.button == 0)
                this.closeDrawer(); });
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) {
        if (this.element.hasAttribute('scroll'))
            this.bodyCls += ' ui-scroll';
        if (this.element.hasAttribute('padded'))
            this.bodyCls += ' ui-pad-all';
        if (this.position == 'end')
            this.glyph = 'glyph-arrow-right';
    }
    attached() { }
    detached() { }
    unbind() { }
    closeDrawer() {
        this.element.classList.remove('show');
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDrawer.prototype, "position", void 0);
UIDrawer = __decorate([
    autoinject(),
    inlineView(`<template class="ui-drawer \${position}">
  <div class="ui-drawer-content ui-row-vertical ui-align-stretch">
    <a class="ui-drawer-close ui-col-auto" click.trigger="closeDrawer()"><ui-glyph glyph.bind="glyph"></ui-glyph></a>
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
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() { }
    detached() { }
    unbind() { }
    openDrawer(evt) {
        if (evt.button != 0)
            return true;
        evt.stopPropagation();
        evt.cancelBubble = true;
        if (this.drawer && this.drawer.classList) {
            this.drawer.classList.add('show');
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
    inlineView('<template class="ui-drawer-toggle ui-link" click.trigger="openDrawer($event)"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>'),
    customElement('ui-drawer-toggle'),
    __metadata("design:paramtypes", [Element])
], UIDrawerToggle);
export { UIDrawerToggle };
