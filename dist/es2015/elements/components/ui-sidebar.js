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
let UIAffixPoint = class UIAffixPoint {
};
UIAffixPoint = __decorate([
    inlineView('<template class="ui-affix-point"></template>'),
    customElement('ui-affix-point')
], UIAffixPoint);
export { UIAffixPoint };
let UIAffixContent = class UIAffixContent {
};
UIAffixContent = __decorate([
    containerless(),
    inlineView('<template><div class="ui-affix-content" slot="affix-content"><slot></slot></div></template>'),
    customElement('ui-affix-content')
], UIAffixContent);
export { UIAffixContent };
let UISidebar = class UISidebar {
    constructor(element) {
        this.element = element;
        this.label = "";
        this.collapsed = false;
        this.position = "start";
        this.glyph = 'ui-arrow-left';
        this.contentCls = '';
        this.miniDisplay = false;
        this.collapsible = false;
        if (element.hasAttribute('scroll'))
            this.contentCls += ' ui-scroll';
        if (element.hasAttribute('flex'))
            this.contentCls += ' ui-row-vertical';
        if (element.hasAttribute('padded'))
            this.contentCls += ' ui-pad-all';
        if (element.hasAttribute('small'))
            element.classList.add('ui-small');
        if (this.miniDisplay = element.hasAttribute('mini-display'))
            element.classList.add('ui-mini-display');
        this.collapsible = element.hasAttribute('collapsible');
        this.obClick = UIEvent.subscribe('mouseclick', () => {
            element.classList.remove('ui-show-overlay');
        });
    }
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) {
        this.collapsed = isTrue(this.collapsed);
        if (this.position == 'end')
            this.glyph = "ui-arrow-right";
    }
    attached() {
        this.affixPoint = this.element.querySelector('.ui-affix-point');
        this.affixEl = this.element.querySelector('.ui-affix-content');
    }
    detached() {
        if (this.obClick)
            this.obClick.dispose();
    }
    unbind() { }
    collapsedChanged(newValue) {
        this.glyph = (this.position == 'end' && !isTrue(newValue)) || (this.position == 'start' && isTrue(newValue)) ? "ui-arrow-right" : "ui-arrow-left";
    }
    toggleCollapse($event) {
        this.collapsed = !this.collapsed;
        this.element.classList.remove('ui-show-overlay');
        $event.cancelBubble = true;
        return true;
    }
    showOverlay($event) {
        if (this.miniDisplay || $event.target != this.element)
            return true;
        if (this.collapsed)
            this.element.classList.add('ui-show-overlay');
        else
            this.element.classList.remove('ui-show-overlay');
    }
    watchScroll(e) {
        if (this.affixEl) {
            let point = 0;
            if (this.affixPoint)
                point = this.affixPoint.offsetTop;
            if (this.contentEl.scrollTop > point)
                this.affixEl.classList.add('ui-animate');
            else
                this.affixEl.classList.remove('ui-animate');
        }
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
    inlineView(`<template class="ui-sidebar ui-row-vertical ui-row-stretch \${collapsed?'ui-collapse':''} \${position}" click.trigger="showOverlay($event)">
  <div class="ui-col-auto ui-row ui-row-end ui-row-middle ui-sidebar-head \${position=='start'?'':'ui-reverse'}" if.bind="collapsible || label">
  <div class="ui-col-fill ui-sidebar-title">\${label}</div>
  <a click.trigger="toggleCollapse($event)" class="ui-col-auto ui-sidebar-close" if.bind="collapsible"><ui-glyph glyph.bind="glyph"></ui-glyph></a></div>
  <slot name="affix-content"></slot>
  <div class="ui-col-fill ui-sidebar-content \${contentCls}" ref="contentEl" scroll.trigger="watchScroll($event) & debounce"><slot></slot></div>
</template>`),
    customElement('ui-sidebar'),
    __metadata("design:paramtypes", [Element])
], UISidebar);
export { UISidebar };
