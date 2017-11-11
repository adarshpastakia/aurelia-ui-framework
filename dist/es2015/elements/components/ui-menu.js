var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, inlineView, containerless, child } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
let UIMenubar = class UIMenubar {
    constructor(element) {
        this.element = element;
        this.isOverflow = false;
    }
    attached() {
        this.obResize = UIEvent.subscribe('windowresize', () => this.arrange());
        this.obClick = UIEvent.subscribe('mouseclick', (evt) => {
            if (getParentByClass(evt.target, 'ui-menubar-toggle') == this.element)
                return;
            this.overflow.classList.remove('ui-open');
        });
        this.tether = UIUtils.tether(this.element, this.overflow, { resize: false, position: 'br' });
        window.setTimeout(() => this.arrange(), 100);
    }
    detached() {
        this.tether.dispose();
        this.obClick.dispose();
        this.obResize.dispose();
    }
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
};
UIMenu = __decorate([
    autoinject(),
    inlineView('<template class="ui-menu"><slot></slot></template>'),
    customElement('ui-menu'),
    __metadata("design:paramtypes", [Element])
], UIMenu);
export { UIMenu };
let UIMenuTitle = class UIMenuTitle {
    constructor(element) {
        this.element = element;
    }
};
UIMenuTitle = __decorate([
    autoinject(),
    inlineView('<template class="ui-menu-section-title"><slot></slot></template>'),
    customElement('ui-menu-section'),
    __metadata("design:paramtypes", [Element])
], UIMenuTitle);
export { UIMenuTitle };
let UIMenuGroup = class UIMenuGroup {
    constructor(element) {
        this.element = element;
        this.label = '';
        this.collapsed = false;
        this.collapsible = false;
        this.collapsible = element.hasAttribute('collapsible');
    }
    toggleCollapse(event) {
        this.collapsed = !this.collapsed;
        event.stopPropagation();
        event.preventDefault();
        return false;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuGroup.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuGroup.prototype, "collapsed", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuGroup.prototype, "collapsible", void 0);
__decorate([
    child('ui-menu-item.ui-active'),
    __metadata("design:type", Object)
], UIMenuGroup.prototype, "hasActive", void 0);
UIMenuGroup = __decorate([
    autoinject(),
    inlineView('<template class="ui-menu-section ${collapsible?\'ui-collapsible\':\'\'} ${collapsed?\'ui-collapsed\':\'\'}"><div mouseup.trigger="toggleCollapse($event)" if.bind="label" class="ui-menu-section-title ${hasActive?\'ui-has-active\':\'\'}"><ui-glyph glyph="glyph-chevron-down" if.bind="collapsible"></ui-glyph><span innerhtml.bind="label"></span></div><div class="ui-menu-section-body"><slot></slot></div></template>'),
    customElement('ui-menu-group'),
    __metadata("design:paramtypes", [Element])
], UIMenuGroup);
export { UIMenuGroup };
let UIMenuItem = class UIMenuItem {
    constructor(element) {
        this.element = element;
        this.id = '';
        this.description = '';
        this.glyph = '';
        this.class = '';
        this.active = false;
        this.disabled = false;
        this.href = 'javascript:void(0)';
    }
    bind(bindingContext, overrideContext) {
        this.active = !!(this.active);
        this.disabled = !!(this.disabled);
    }
    click(evt) {
        if (evt.button != 0)
            return true;
        evt.cancelBubble = true;
        evt.stopPropagation();
        if (this.href !== 'javascript:void(0)')
            return true;
        return UIEvent.fireEvent('click', this.element, this.id);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuItem.prototype, "id", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenuItem.prototype, "description", void 0);
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
    <ui-glyph if.bind="glyph" class="ui-menu-icon \${glyph}" glyph.bind="glyph"></ui-glyph><span class="ui-menu-label"><slot></slot><small if.bind="description">\${description}</small></span></a></template>`),
    customElement('ui-menu-item'),
    __metadata("design:paramtypes", [Element])
], UIMenuItem);
export { UIMenuItem };
