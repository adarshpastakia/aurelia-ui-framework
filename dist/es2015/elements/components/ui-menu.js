var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, inlineView, containerless } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
let UIMenubar = class UIMenubar {
    constructor(element) {
        this.element = element;
        this.isOverflow = false;
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() {
        this.obResize = UIEvent.subscribe('windowresize', () => this.arrange());
        this.obClick = UIEvent.subscribe('mouseclick', () => this.overflow.classList.remove('ui-open'));
        this.tether = UIUtils.tether(this.overflowToggle, this.overflow, { resize: false, position: 'br' });
        window.setTimeout(() => this.arrange(), 500);
    }
    detached() {
        this.tether.dispose();
        this.obClick.dispose();
        this.obResize.dispose();
    }
    unbind() { }
    arrange() {
        this.overflow.classList.remove('ui-open');
        for (let i = 0, c = this.overflow['children']; i < c.length; i++) {
            this.wrapper.appendChild(c[i]);
        }
        if (this.isOverflow = (this.wrapper.lastElementChild.offsetLeft + this.wrapper.lastElementChild.offsetWidth > this.wrapper.offsetWidth)) {
            for (let c = this.wrapper['children'], i = c.length - 1; i >= 0; i--) {
                if (c[i].offsetLeft + c[i].offsetWidth > this.wrapper.offsetWidth) {
                    if (this.overflow.hasChildNodes)
                        this.overflow.insertBefore(c[i], this.overflow.childNodes[0]);
                    else
                        this.overflow.appendChild(c[i]);
                }
            }
        }
    }
    showOverflow(evt) {
        if (evt.button != 0)
            return true;
        if (!this.overflow.classList.contains('ui-open')) {
            this.overflow.classList.add('ui-open');
            this.tether.position();
        }
        else
            this.overflow.classList.remove('ui-open');
    }
};
UIMenubar = __decorate([
    autoinject(),
    inlineView(`
<template class="ui-menubar">
  <div class="ui-menubar-wrapper" ref="wrapper"><slot></slot></div>
  <div class="ui-menubar-toggle" ref="overflowToggle" show.bind="isOverflow" click.trigger="showOverflow($event)"><ui-glyph glyph="glyph-handle-overflow"></ui-glyph></div>
  <div class="ui-menu ui-menubar-overflow ui-floating" ref="overflow"></div>
</template>`),
    customElement('ui-menubar'),
    __metadata("design:paramtypes", [Element])
], UIMenubar);
export { UIMenubar };
let UIMenu = class UIMenu {
    constructor(element) {
        this.element = element;
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() { }
    detached() { }
    unbind() { }
};
UIMenu = __decorate([
    autoinject(),
    inlineView('<template class="ui-menu"><slot></slot></template>'),
    customElement('ui-menu'),
    __metadata("design:paramtypes", [Element])
], UIMenu);
export { UIMenu };
let UIMenuSection = class UIMenuSection {
    constructor(element) {
        this.element = element;
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() { }
    detached() { }
    unbind() { }
};
UIMenuSection = __decorate([
    autoinject(),
    inlineView('<template class="ui-menu-section-title"><slot></slot></template>'),
    customElement('ui-menu-section'),
    __metadata("design:paramtypes", [Element])
], UIMenuSection);
export { UIMenuSection };
let UIMenuGroup = class UIMenuGroup {
    constructor(element) {
        this.element = element;
        this.label = '';
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
], UIMenuGroup.prototype, "label", void 0);
UIMenuGroup = __decorate([
    autoinject(),
    inlineView('<template class="ui-menu-section"><div if.bind="label" class="ui-menu-section-title" innerhtml.bind="label"></div><slot></slot></template>'),
    customElement('ui-menu-group'),
    __metadata("design:paramtypes", [Element])
], UIMenuGroup);
export { UIMenuGroup };
let UIMenuItem = class UIMenuItem {
    constructor(element) {
        this.element = element;
        this.glyph = '';
        this.class = '';
        this.active = false;
        this.disabled = false;
        this.href = 'javascript:void(0)';
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) {
        this.active = isTrue(this.active);
    }
    attached() { }
    detached() { }
    unbind() { }
    click(evt) {
        if (evt.button != 0)
            return true;
        evt.cancelBubble = true;
        evt.stopPropagation();
        return UIEvent.fireEvent('click', this.element);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuItem.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuItem.prototype, "class", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuItem.prototype, "active", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuItem.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuItem.prototype, "href", void 0);
UIMenuItem = __decorate([
    autoinject(),
    containerless(),
    inlineView(`<template><a class="ui-menu-item \${active?'ui-active':''} \${disabled?'ui-disabled':''} \${class}" href.bind="href" click.trigger="click($event)">
    <ui-glyph if.bind="glyph" class="ui-menu-icon \${glyph}" glyph.bind="glyph"></ui-glyph><span class="ui-menu-label"><slot></slot></span></a></template>`),
    customElement('ui-menu-item'),
    __metadata("design:paramtypes", [Element])
], UIMenuItem);
export { UIMenuItem };
