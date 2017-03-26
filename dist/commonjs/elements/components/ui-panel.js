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
var UIPanel = (function () {
    function UIPanel(element) {
        this.element = element;
        this.height = 'auto';
        this.collapsed = false;
        this.collapsed = element.hasAttribute('collapsed');
    }
    UIPanel.prototype.created = function (owningView, myView) { };
    UIPanel.prototype.bind = function (bindingContext, overrideContext) { };
    UIPanel.prototype.attached = function () { };
    UIPanel.prototype.detached = function () { };
    UIPanel.prototype.unbind = function () { };
    UIPanel.prototype.close = function () {
        aurelia_framework_1.DOM.removeNode(this.element);
    };
    UIPanel.prototype.collapse = function () {
        this.collapsed = true;
    };
    UIPanel.prototype.expand = function () {
        this.collapsed = false;
    };
    UIPanel.prototype.toggleCollapse = function () {
        var _this = this;
        setTimeout(function () { return _this.collapsed = !_this.collapsed; }, 200);
    };
    return UIPanel;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIPanel.prototype, "height", void 0);
UIPanel = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-panel ${collapsed?'ui-collapse':''}\" css.bind=\"{'height':height}\" collapse.trigger=\"toggleCollapse()\" close.trigger=\"close()\"><slot></slot></template>"),
    aurelia_framework_1.customElement('ui-panel'),
    __metadata("design:paramtypes", [Element])
], UIPanel);
exports.UIPanel = UIPanel;
var UIPanelBody = (function () {
    function UIPanelBody(element) {
        this.element = element;
        this.height = 'auto';
        this.maxHeight = 'auto';
        if (element.hasAttribute('flex'))
            element.classList.add('ui-flexed');
        if (element.hasAttribute('scroll'))
            element.classList.add('ui-scroll');
        if (element.hasAttribute('padded'))
            element.classList.add('ui-pad-all');
    }
    UIPanelBody.prototype.created = function (owningView, myView) { };
    UIPanelBody.prototype.bind = function (bindingContext, overrideContext) { };
    UIPanelBody.prototype.attached = function () { };
    UIPanelBody.prototype.detached = function () { };
    UIPanelBody.prototype.unbind = function () { };
    return UIPanelBody;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIPanelBody.prototype, "height", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIPanelBody.prototype, "maxHeight", void 0);
UIPanelBody = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-panel-body\" css.bind=\"{'max-height': maxHeight,'flex-basis':height}\"><slot></slot></template>"),
    aurelia_framework_1.customElement('ui-panel-body'),
    __metadata("design:paramtypes", [Element])
], UIPanelBody);
exports.UIPanelBody = UIPanelBody;
var UIPanelGroup = (function () {
    function UIPanelGroup(element) {
        this.element = element;
    }
    UIPanelGroup.prototype.created = function (owningView, myView) { };
    UIPanelGroup.prototype.bind = function (bindingContext, overrideContext) { };
    UIPanelGroup.prototype.attached = function () {
    };
    UIPanelGroup.prototype.detached = function () { };
    UIPanelGroup.prototype.unbind = function () { };
    UIPanelGroup.prototype.uncollapse = function () {
    };
    return UIPanelGroup;
}());
__decorate([
    aurelia_framework_1.children('ui-panel'),
    __metadata("design:type", Object)
], UIPanelGroup.prototype, "panels", void 0);
UIPanelGroup = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-panel-group\" collapse.delegate=\"uncollapse()\"><slot></slot></template>"),
    aurelia_framework_1.customElement('ui-panel-group'),
    __metadata("design:paramtypes", [Element])
], UIPanelGroup);
exports.UIPanelGroup = UIPanelGroup;
var UIHeader = (function () {
    function UIHeader(element) {
        this.element = element;
        this.theme = 'default';
        if (element.hasAttribute('primary'))
            this.theme = 'primary';
        else if (element.hasAttribute('secondary'))
            this.theme = 'secondary';
        else if (element.hasAttribute('dark'))
            this.theme = 'dark';
        else if (element.hasAttribute('light'))
            this.theme = 'light';
        else if (element.hasAttribute('info'))
            this.theme = 'info';
        else if (element.hasAttribute('danger'))
            this.theme = 'danger';
        else if (element.hasAttribute('success'))
            this.theme = 'success';
        else if (element.hasAttribute('warning'))
            this.theme = 'warning';
    }
    UIHeader.prototype.created = function (owningView, myView) { };
    UIHeader.prototype.bind = function (bindingContext, overrideContext) { };
    UIHeader.prototype.attached = function () { };
    UIHeader.prototype.detached = function () { };
    UIHeader.prototype.unbind = function () { };
    return UIHeader;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIHeader.prototype, "theme", void 0);
UIHeader = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-header ${theme}\"><slot></slot></template>"),
    aurelia_framework_1.customElement('ui-header'),
    __metadata("design:paramtypes", [Element])
], UIHeader);
exports.UIHeader = UIHeader;
var UIHeaderTool = (function () {
    function UIHeaderTool(element) {
        this.element = element;
        this.type = '';
        this.glyph = '';
        if (element.hasAttribute('close'))
            this.type = "close";
        if (element.hasAttribute('refresh'))
            this.type = "refresh";
        if (element.hasAttribute('collapse'))
            this.type = "collapse";
        if (element.hasAttribute('expand'))
            this.type = "expand";
        if (element.hasAttribute('minimize'))
            this.type = "minimize";
        if (element.hasAttribute('close'))
            this.glyph = "ui-dialog-close";
        if (element.hasAttribute('refresh'))
            this.glyph = "ui-refresh";
        if (element.hasAttribute('collapse'))
            this.glyph = "ui-chevron-up";
        if (element.hasAttribute('expand'))
            this.glyph = "ui-dialog-expand";
        if (element.hasAttribute('minimize'))
            this.glyph = "ui-dialog-minimize";
    }
    UIHeaderTool.prototype.created = function (owningView, myView) { };
    UIHeaderTool.prototype.bind = function (bindingContext, overrideContext) { };
    UIHeaderTool.prototype.attached = function () { };
    UIHeaderTool.prototype.detached = function () { };
    UIHeaderTool.prototype.unbind = function () { };
    UIHeaderTool.prototype.fireEvent = function (evt) {
        if (evt.button != 0)
            return true;
        return ui_event_1.UIEvent.fireEvent(this.type, this.element);
    };
    return UIHeaderTool;
}());
UIHeaderTool = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-header-tool\"><button tabindex=\"-1\" class=\"ui-header-button ui-${type}\" click.trigger=\"fireEvent($event)\">\n  <slot><ui-glyph glyph.bind=\"glyph\"></ui-glyph></slot></button></template>"),
    aurelia_framework_1.customElement('ui-header-tool'),
    __metadata("design:paramtypes", [Element])
], UIHeaderTool);
exports.UIHeaderTool = UIHeaderTool;
var UIHeaderTitle = (function () {
    function UIHeaderTitle(element) {
        this.element = element;
        this.glyph = '';
    }
    UIHeaderTitle.prototype.created = function (owningView, myView) { };
    UIHeaderTitle.prototype.bind = function (bindingContext, overrideContext) { };
    UIHeaderTitle.prototype.attached = function () { };
    UIHeaderTitle.prototype.detached = function () { };
    UIHeaderTitle.prototype.unbind = function () { };
    return UIHeaderTitle;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIHeaderTitle.prototype, "glyph", void 0);
UIHeaderTitle = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-header-title ui-inline-block ui-col-fill\"><ui-glyph glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>&nbsp;<slot></slot></template>"),
    aurelia_framework_1.customElement('ui-header-title'),
    __metadata("design:paramtypes", [Element])
], UIHeaderTitle);
exports.UIHeaderTitle = UIHeaderTitle;
