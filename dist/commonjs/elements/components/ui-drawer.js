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
var UIDrawer = (function () {
    function UIDrawer(element) {
        var _this = this;
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
            element.addEventListener('mouseup', function (e) { if (e.button == 0)
                _this.closeDrawer(); });
    }
    UIDrawer.prototype.bind = function (bindingContext, overrideContext) {
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
    };
    UIDrawer.prototype.closeDrawer = function () {
        if (ui_event_1.UIEvent.fireEvent('beforeclose', this.element) !== false) {
            this.element.classList.remove(this.css.show);
            ui_event_1.UIEvent.fireEvent('close', this.element);
        }
    };
    UIDrawer.prototype.openDrawer = function () {
        if (ui_event_1.UIEvent.fireEvent('beforeopen', this.element) !== false) {
            this.element.classList.add(this.css.show);
            ui_event_1.UIEvent.fireEvent('open', this.element);
        }
    };
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDrawer.prototype, "width", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDrawer.prototype, "bodyClass", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDrawer.prototype, "contentClass", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDrawer.prototype, "position", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDrawer.prototype, "closeGlyph", void 0);
    UIDrawer = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-drawer ui-drawer-${position}\">\n  <div ref=\"contentEl\" class=\"ui-drawer-content ui-row ui-row-v ui-align-stretch ui-nowrap ${contentClass}\">\n    <a class=\"ui-drawer-close\" click.trigger=\"closeDrawer()\"><ui-glyph glyph.bind=\"closeGlyph\"></ui-glyph></a>\n    <slot name=\"drawer-head\"></slot>\n    <div class=\"ui-drawer-body ${bodyClass}\"><slot></slot></div>\n    <slot name=\"drawer-foot\"></slot>\n  </div>\n  <div class=\"ui-drawer-shim\" click.trigger=\"closeDrawer()\"></div>\n</template>"),
        aurelia_framework_1.customElement('ui-drawer'),
        __metadata("design:paramtypes", [Element])
    ], UIDrawer);
    return UIDrawer;
}());
exports.UIDrawer = UIDrawer;
var UIDrawerToggle = (function () {
    function UIDrawerToggle(element) {
        this.element = element;
        this.glyph = 'glyph-handle-menu';
    }
    UIDrawerToggle.prototype.openDrawer = function (evt) {
        if (!this.drawer)
            throw Error('Drawer element required');
        if (evt.button != 0)
            return true;
        evt.stopPropagation();
        evt.cancelBubble = true;
        if (this.drawer && this.drawer.au.controller) {
            this.drawer.au.controller.viewModel.openDrawer();
        }
    };
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDrawerToggle.prototype, "drawer", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDrawerToggle.prototype, "glyph", void 0);
    UIDrawerToggle = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView('<template class="ui-drawer-toggle" click.trigger="openDrawer($event)"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>'),
        aurelia_framework_1.customElement('ui-drawer-toggle'),
        __metadata("design:paramtypes", [Element])
    ], UIDrawerToggle);
    return UIDrawerToggle;
}());
exports.UIDrawerToggle = UIDrawerToggle;
