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
let UISidebar = class UISidebar {
    constructor(element) {
        this.element = element;
        this.label = "";
        this.collapsed = false;
        this.position = "start";
        this.glyph = 'glyph-arrow-left';
        this.contentCls = '';
        this.compact = false;
        this.miniDisplay = false;
        this.collapsible = false;
        if (element.hasAttribute('scroll'))
            this.contentCls += ' ui-scroll';
        if (element.hasAttribute('flex'))
            this.contentCls += ' ui-row ui-row-v ui-align-stretch ui-nowrap';
        if (element.hasAttribute('padded'))
            this.contentCls += ' ui-pad-all';
        if (this.miniDisplay = element.hasAttribute('mini-display'))
            element.classList.add('ui-sidebar-mini');
        if (this.compact = element.hasAttribute('compact')) {
            element.classList.add('ui-sidebar-compact');
            element.classList.add('ui-sidebar-mini');
        }
        this.collapsible = element.hasAttribute('collapsible');
        this.obClick = UIEvent.subscribe('mouseclick', () => {
            this.element.classList.remove('ui-sidebar-show');
        });
    }
    bind(bindingContext, overrideContext) {
        this.collapsed = !!(this.collapsed);
        if (this.position === 'end' && this.glyph === 'glyph-arrow-left')
            this.glyph = "glyph-arrow-right";
    }
    attached() {
        if (this.label instanceof HTMLElement)
            [this.labelEl.innerHTML = '', this.labelEl.appendChild(this.label)];
    }
    detached() {
        if (this.obClick)
            this.obClick.dispose();
    }
    collapsedChanged(newValue) {
        this.glyph = (this.position == 'end' && !(newValue)) || (this.position == 'start' && !!(newValue)) ? "glyph-arrow-right" : "glyph-arrow-left";
    }
    toggleCollapse($event) {
        this.collapsed = !this.collapsed;
        this.element.classList.remove('ui-sidebar-show');
        $event.cancelBubble = true;
        return true;
    }
    showOverlay($event) {
        if (this.miniDisplay || $event.target != this.element)
            return true;
        if (this.collapsed)
            this.element.classList.add('ui-sidebar-show');
        else
            this.element.classList.remove('ui-sidebar-show');
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISidebar.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISidebar.prototype, "collapsed", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISidebar.prototype, "position", void 0);
UISidebar = __decorate([
    autoinject(),
    inlineView(`<template class="ui-sidebar ui-row ui-row-v ui-row-nowrap ui-align-stretch \${compact || collapsed?'ui-sidebar-collapse':''} ui-sidebar-\${position}" click.trigger="showOverlay($event)">
  <div class="ui-sidebar-head ui-row ui-row-h ui-row-nowrap ui-align-stretch" if.bind="!compact && (collapsible || label)">
  <div class="ui-sidebar-title ui-column-fill" ref="labelEl">\${label}</div>
  <a click.trigger="toggleCollapse($event)" class="ui-sidebar-close" if.bind="collapsible"><ui-glyph glyph.bind="glyph"></ui-glyph></a></div>
  <slot name="affix-content"></slot>
  <div class="ui-sidebar-content ui-column-fill \${contentCls}" ref="contentEl"><slot></slot></div>
</template>`),
    customElement('ui-sidebar'),
    __metadata("design:paramtypes", [Element])
], UISidebar);
export { UISidebar };
