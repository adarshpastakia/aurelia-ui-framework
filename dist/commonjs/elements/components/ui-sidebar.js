"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ui_event_1 = require("../../utils/ui-event");
var UISidebar = (function () {
    function UISidebar(element) {
        var _this = this;
        this.element = element;
        this.label = "";
        this.bodyClass = "";
        this.width = "";
        this.collapsed = false;
        this.position = "start";
        this.glyph = 'glyph-arrow-left';
        this.compact = false;
        this.miniDisplay = false;
        this.collapsible = false;
        if (this.miniDisplay = element.hasAttribute('mini-display'))
            element.classList.add('ui-sidebar-mini');
        if (this.compact = element.hasAttribute('compact')) {
            element.classList.add('ui-sidebar-compact');
            element.classList.add('ui-sidebar-mini');
        }
        this.collapsible = element.hasAttribute('collapsible');
        this.obResize = ui_event_1.UIEvent.subscribe('windowresize', function () {
            _this.forceCollapse = window.innerWidth <= 768;
        });
        this.obClick = ui_event_1.UIEvent.subscribe('mouseclick', function () {
            _this.element.classList.remove('ui-sidebar-show');
        });
        this.forceCollapse = window.innerWidth <= 768;
    }
    UISidebar.prototype.bind = function (bindingContext, overrideContext) {
        this.collapsed = !!(this.collapsed);
        if (this.position === 'end' && this.glyph === 'glyph-arrow-left')
            this.glyph = "glyph-arrow-right";
        if (this.element.hasAttribute('scroll'))
            this.bodyClass += ' ui-scroll';
        if (this.element.hasAttribute('flex'))
            this.bodyClass += ' ui-row ui-row-v ui-align-stretch ui-nowrap';
        if (this.element.hasAttribute('padded'))
            this.bodyClass += ' ui-pad-all';
        if (this.element.hasAttribute('compact'))
            this.bodyClass += ' ui-compact';
        if (this.width)
            this.element['style'].flexBasis = this.width;
    };
    UISidebar.prototype.attached = function () {
        if (this.label instanceof HTMLElement)
            [this.labelEl.innerHTML = '', this.labelEl.appendChild(this.label)];
    };
    UISidebar.prototype.detached = function () {
        if (this.obClick)
            this.obClick.dispose();
        if (this.obResize)
            this.obResize.dispose();
    };
    UISidebar.prototype.collapsedChanged = function (newValue) {
        this.glyph = (this.position == 'end' && !(newValue)) || (this.position == 'start' && !!(newValue)) ? "glyph-arrow-right" : "glyph-arrow-left";
    };
    UISidebar.prototype.toggleCollapse = function ($event) {
        this.collapsed = !this.collapsed;
        this.element.classList.remove('ui-sidebar-show');
        $event.cancelBubble = true;
        return true;
    };
    UISidebar.prototype.showOverlay = function ($event) {
        if (this.miniDisplay || $event.target != this.element)
            return true;
        if (this.collapsed || this.forceCollapse)
            this.element.classList.add('ui-sidebar-show');
        else
            this.element.classList.remove('ui-sidebar-show');
    };
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UISidebar.prototype, "label", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UISidebar.prototype, "bodyClass", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UISidebar.prototype, "width", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UISidebar.prototype, "collapsed", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UISidebar.prototype, "position", void 0);
    UISidebar = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-sidebar ui-row ui-row-v ui-row-nowrap ui-align-stretch ${compact || collapsed || forceCollapse ?'ui-sidebar-collapse':''} ui-sidebar-${position}\" click.trigger=\"showOverlay($event)\">\n  <div class=\"ui-sidebar-head ui-row ui-row-h ui-row-nowrap ui-align-stretch\" if.bind=\"!compact && (collapsible || label)\">\n  <div class=\"ui-sidebar-title ui-column-fill\" ref=\"labelEl\">${label}</div>\n  <a click.trigger=\"toggleCollapse($event)\" class=\"ui-sidebar-close\" if.bind=\"collapsible && !forceCollapse\"><ui-glyph glyph.bind=\"glyph\"></ui-glyph></a></div>\n  <div class=\"ui-sidebar-content ui-column-fill ${bodyClass}\" ref=\"contentEl\"><slot></slot></div>\n</template>"),
        aurelia_framework_1.customElement('ui-sidebar'),
        __metadata("design:paramtypes", [Element])
    ], UISidebar);
    return UISidebar;
}());
exports.UISidebar = UISidebar;
