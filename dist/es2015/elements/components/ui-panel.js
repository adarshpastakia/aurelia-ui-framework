var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, bindingMode, children, inlineView, DOM } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";
let UIPanel = class UIPanel {
    constructor(element) {
        this.element = element;
        this.width = 'auto';
        this.height = 'auto';
        this.minheight = 'auto';
        this.maxheight = 'auto';
        this.expanded = false;
        this.collapsed = false;
    }
    bind(bindingContext, overrideContext) {
        this.collapsed = !!(this.collapsed) || this.element.hasAttribute('collapsed');
    }
    close() {
        if (isFunction(this.beforeclose)) {
            let ret = this.beforeclose();
            if (ret instanceof Promise)
                ret.then(b => {
                    if (b) {
                        this.remove();
                    }
                });
            else if (ret !== false) {
                this.remove();
            }
        }
        else if (UIEvent.fireEvent('beforeclose', this.element) !== false) {
            this.remove();
        }
    }
    remove() {
        DOM.removeNode(this.element);
        UIEvent.fireEvent('close', this.element);
    }
    collapse() {
        this.collapsed = true;
    }
    expand() {
        this.expanded = !this.expanded;
    }
    restore() {
        this.expanded = !this.expanded;
    }
    toggleCollapse() {
        setTimeout(() => this.collapsed = !this.collapsed, 200);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPanel.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPanel.prototype, "height", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPanel.prototype, "minheight", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPanel.prototype, "maxheight", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIPanel.prototype, "expanded", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIPanel.prototype, "collapsed", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPanel.prototype, "beforeclose", void 0);
UIPanel = __decorate([
    autoinject(),
    inlineView(`<template class="ui-panel \${collapsed?'ui-collapse':''} \${expanded?'ui-expand':''}" css.bind="{'max-height': maxheight,'min-height': minheight,'height':height, 'width': width}" collapse.trigger="toggleCollapse()" expand.trigger="expand()" restore.trigger="expand()" close.trigger="close()"><slot></slot></template>`),
    customElement('ui-panel'),
    __metadata("design:paramtypes", [Element])
], UIPanel);
export { UIPanel };
let UIPanelBody = class UIPanelBody {
    constructor(element) {
        this.element = element;
        if (element.hasAttribute('flex'))
            element.classList.add('ui-flexed');
        if (element.hasAttribute('scroll'))
            element.classList.add('ui-scroll');
        if (element.hasAttribute('padded'))
            element.classList.add('ui-pad-all');
        if (element.hasAttribute('compact'))
            element.classList.add('ui-compact');
    }
};
UIPanelBody = __decorate([
    autoinject(),
    inlineView(`<template class="ui-panel-body" css.bind="{'max-height': maxheight,'min-height': minheight,'flex-basis':height}"><slot></slot></template>`),
    customElement('ui-panel-body'),
    __metadata("design:paramtypes", [Element])
], UIPanelBody);
export { UIPanelBody };
let UIPanelGroup = class UIPanelGroup {
    constructor(element) {
        this.element = element;
        this.allowtoggle = false;
        this.allowtoggle = element.hasAttribute('toggle');
    }
    attached() {
        if (_.find(this.panels, ['collapsed', false]) == null)
            this.panels[0].collapsed = false;
    }
    uncollapse() {
        let panel = _.find(this.panels, ['collapsed', false]);
        if (this.allowtoggle && panel)
            panel.collapsed = true;
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
    }
};
UIHeader = __decorate([
    autoinject(),
    inlineView(`<template class="ui-header"><slot></slot></template>`),
    customElement('ui-header'),
    __metadata("design:paramtypes", [Element])
], UIHeader);
export { UIHeader };
let UIHeaderTool = class UIHeaderTool {
    constructor(element) {
        this.element = element;
        this.glyph = '';
        this.disabled = false;
        this.type = 'tool';
        if (element.hasAttribute('close'))
            this.type = "close";
        if (element.hasAttribute('refresh'))
            this.type = "refresh";
        if (element.hasAttribute('collapse'))
            this.type = "collapse";
        if (element.hasAttribute('expand'))
            this.type = "expand";
        if (element.hasAttribute('restore'))
            this.type = "restore";
        if (element.hasAttribute('minimize'))
            this.type = "minimize";
        if (element.hasAttribute('close'))
            this.glyph = "glyph-dialog-close";
        if (element.hasAttribute('refresh'))
            this.glyph = "glyph-refresh";
        if (element.hasAttribute('collapse'))
            this.glyph = "glyph-chevron-up";
        if (element.hasAttribute('expand'))
            this.glyph = "glyph-dialog-expand";
        if (element.hasAttribute('restore'))
            this.glyph = "glyph-dialog-restore";
        if (element.hasAttribute('minimize'))
            this.glyph = "glyph-dialog-minimize";
    }
    bind(bindingContext, overrideContext) {
        this.disabled = !!(this.disabled);
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
], UIHeaderTool.prototype, "glyph", void 0);
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
        if (this.element.hasAttribute('icon-hilight'))
            this.element.classList.add('ui-icon-hilight');
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIHeaderTitle.prototype, "glyph", void 0);
UIHeaderTitle = __decorate([
    autoinject(),
    inlineView(`<template class="ui-header-title ui-inline-block ui-col-fill"><div class="ui-title-icon"><ui-glyph glyph.bind="glyph" if.bind="glyph"></ui-glyph></div><div class="ui-title"><slot></slot></div></template>`),
    customElement('ui-header-title'),
    __metadata("design:paramtypes", [Element])
], UIHeaderTitle);
export { UIHeaderTitle };
