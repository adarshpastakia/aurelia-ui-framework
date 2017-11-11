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
var aurelia_router_1 = require("aurelia-router");
var ui_event_1 = require("../../utils/ui-event");
var ui_utils_1 = require("../../utils/ui-utils");
var UIViewport = (function () {
    function UIViewport(element) {
        this.element = element;
        var __resizeTimer;
        document.ondragstart = function (e) { return getParentByClass(e.target, '.ui-draggable') != null; };
        document.onmouseup = function (e) { return ui_event_1.UIEvent.broadcast('mouseclick', e); };
        document.ontouchstart = function (e) { return ui_event_1.UIEvent.broadcast('mouseclick', e); };
        window.onresize = function (e) {
            window.clearTimeout(__resizeTimer);
            window.setTimeout(function () { return ui_event_1.UIEvent.broadcast('windowresize'); }, 500);
        };
        this.router = ui_utils_1.UIUtils.auContainer.get(aurelia_router_1.AppRouter);
    }
    UIViewport.prototype.attached = function () {
        ui_utils_1.UIUtils.dialogContainer = this.dialogContainer;
        ui_utils_1.UIUtils.overlayContainer = this.overlayContainer;
        ui_utils_1.UIUtils.taskbarContainer = this.taskbarContainer;
        ui_event_1.UIEvent.fireEvent('appready', this.element);
        if (document.querySelector('.ui-splash'))
            aurelia_framework_1.DOM.removeNode(document.querySelector('.ui-splash'));
    };
    UIViewport = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-viewport\">\n  <compose view-model=\"./ui-glyphs\"></compose>\n  <slot name=\"ui-app-banner\"></slot>\n  <slot name=\"ui-app-header\"></slot>\n  <slot></slot>\n  <div class=\"ui-app-taskbar\"><slot name=\"ui-app-taskbar\"></slot><div class=\"ui-taskbutton-wrapper\" ref=\"taskbarContainer\"></div></div>\n  <slot name=\"ui-app-footer\"></slot>\n\n  <div class=\"ui-dialog-container\" ref=\"dialogContainer\"></div>\n  <div class=\"ui-overlay-container\" ref=\"overlayContainer\"></div>\n\n  <ui-loader large busy.bind=\"router.isNavigating\"></ui-loader>\n</template>"),
        aurelia_framework_1.customElement('ui-viewport'),
        __metadata("design:paramtypes", [Element])
    ], UIViewport);
    return UIViewport;
}());
exports.UIViewport = UIViewport;
var UIRouterView = (function () {
    function UIRouterView(element) {
        this.element = element;
        this.name = 'default';
        this.class = '';
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIRouterView.prototype, "name", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIRouterView.prototype, "class", void 0);
    UIRouterView = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.containerless(),
        aurelia_framework_1.inlineView('<template><router-view class="ui-router-view ${class}" name="\${name}"></router-view></template>'),
        aurelia_framework_1.customElement('ui-router-view'),
        __metadata("design:paramtypes", [Element])
    ], UIRouterView);
    return UIRouterView;
}());
exports.UIRouterView = UIRouterView;
var UIAppHeader = (function () {
    function UIAppHeader(element) {
        this.element = element;
        this.class = '';
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIAppHeader.prototype, "class", void 0);
    UIAppHeader = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.containerless(),
        aurelia_framework_1.inlineView('<template><div class="ui-app-header ui-row ui-row-middle ${class}" slot="ui-app-header"><slot></slot></div></template>'),
        aurelia_framework_1.customElement('ui-app-header'),
        __metadata("design:paramtypes", [Element])
    ], UIAppHeader);
    return UIAppHeader;
}());
exports.UIAppHeader = UIAppHeader;
var UIAppBanner = (function () {
    function UIAppBanner(element) {
        this.element = element;
        this.class = '';
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIAppBanner.prototype, "class", void 0);
    UIAppBanner = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.containerless(),
        aurelia_framework_1.inlineView('<template><div class="ui-app-banner ${class}" slot="ui-app-banner"><slot></slot></div></template>'),
        aurelia_framework_1.customElement('ui-app-banner'),
        __metadata("design:paramtypes", [Element])
    ], UIAppBanner);
    return UIAppBanner;
}());
exports.UIAppBanner = UIAppBanner;
var UIAppFooter = (function () {
    function UIAppFooter(element) {
        this.element = element;
        this.class = '';
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIAppFooter.prototype, "class", void 0);
    UIAppFooter = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.containerless(),
        aurelia_framework_1.inlineView('<template><div class="ui-app-footer ui-row ui-row-middle ui-row-spaced ${class}" slot="ui-app-footer"><slot></slot></div></template>'),
        aurelia_framework_1.customElement('ui-app-footer'),
        __metadata("design:paramtypes", [Element])
    ], UIAppFooter);
    return UIAppFooter;
}());
exports.UIAppFooter = UIAppFooter;
var UIAppQuickLinks = (function () {
    function UIAppQuickLinks(element) {
        this.element = element;
        this.class = '';
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIAppQuickLinks.prototype, "class", void 0);
    UIAppQuickLinks = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.containerless(),
        aurelia_framework_1.inlineView('<template><div class="ui-app-taskbar-tools ${class}" slot="ui-app-taskbar"><slot></slot></div></template>'),
        aurelia_framework_1.customElement('ui-app-quick-links'),
        __metadata("design:paramtypes", [Element])
    ], UIAppQuickLinks);
    return UIAppQuickLinks;
}());
exports.UIAppQuickLinks = UIAppQuickLinks;
var UIAppTitle = (function () {
    function UIAppTitle(element) {
        this.element = element;
        this.href = '/';
        this.src = '';
        this.class = '';
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIAppTitle.prototype, "href", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIAppTitle.prototype, "src", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIAppTitle.prototype, "class", void 0);
    UIAppTitle = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.containerless(),
        aurelia_framework_1.customElement('ui-app-title'),
        aurelia_framework_1.inlineView('<template><a href.bind="href" class="ui-row ui-row-middle ui-app-title ${class}"><img if.bind="src" src.bind="src"/><span class="ui-col-auto"><slot></slot></span></a><div class="ui-col-fill"></div></template>'),
        __metadata("design:paramtypes", [Element])
    ], UIAppTitle);
    return UIAppTitle;
}());
exports.UIAppTitle = UIAppTitle;
