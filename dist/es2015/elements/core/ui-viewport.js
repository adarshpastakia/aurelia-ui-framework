var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, inlineView, containerless, DOM } from 'aurelia-framework';
import { AppRouter } from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';
import { UIApplication } from "../../utils/ui-application";
import { UIUtils } from "../../utils/ui-utils";
import { UIEvent } from "../../utils/ui-event";
let UIViewport = class UIViewport {
    constructor(element, httpClient, app) {
        this.element = element;
        this.httpClient = httpClient;
        this.app = app;
        var __resizeTimer;
        document.ondragstart = (e) => getParentByClass(e.target, '.ui-draggable') != null;
        document.onmouseup = (e) => UIEvent.broadcast('mouseclick', e);
        document.ontouchstart = (e) => UIEvent.broadcast('mouseclick', e);
        window.onresize = (e) => {
            window.clearTimeout(__resizeTimer);
            window.setTimeout(() => UIEvent.broadcast('windowresize'), 500);
        };
        this.router = UIUtils.auContainer.get(AppRouter);
    }
    attached() {
        UIUtils.dialogContainer = this.dialogContainer;
        UIUtils.overlayContainer = this.overlayContainer;
        UIUtils.taskbarContainer = this.taskbarContainer;
        UIEvent.fireEvent('appready', this.element);
        if (document.querySelector('.ui-splash'))
            DOM.removeNode(document.querySelector('.ui-splash'));
    }
};
UIViewport = __decorate([
    autoinject(),
    inlineView(`<template class="ui-viewport ui-fullscreen">
  <compose view="../../ui-glyphs.html"></compose>
  <slot name="ui-app-header"></slot>
  <slot></slot>
  <div class="ui-app-taskbar"><slot name="ui-app-taskbar"></slot><div class="ui-taskbutton-wrapper" ref="taskbarContainer"></div></div>
  <slot name="ui-app-footer"></slot>

  <div class="ui-dialog-container" ref="dialogContainer"></div>
  <div class="ui-overlay-container" ref="overlayContainer"></div>

  <ui-loader busy.bind="router.isNavigating"></ui-loader>
</template>`),
    customElement('ui-viewport'),
    __metadata("design:paramtypes", [Element, HttpClient, UIApplication])
], UIViewport);
export { UIViewport };
let UIRouterView = class UIRouterView {
    constructor(element) {
        this.element = element;
        this.name = 'default';
        this.class = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIRouterView.prototype, "name", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIRouterView.prototype, "class", void 0);
UIRouterView = __decorate([
    autoinject(),
    containerless(),
    inlineView('<template><router-view class="ui-router-view ${class}" name="\${name}"></router-view></template>'),
    customElement('ui-router-view'),
    __metadata("design:paramtypes", [Element])
], UIRouterView);
export { UIRouterView };
let UIAppHeader = class UIAppHeader {
    constructor(element) {
        this.element = element;
        this.class = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAppHeader.prototype, "class", void 0);
UIAppHeader = __decorate([
    autoinject(),
    containerless(),
    inlineView('<template><div class="ui-app-header ${class}" slot="ui-app-header"><slot></slot></div></template>'),
    customElement('ui-app-header'),
    __metadata("design:paramtypes", [Element])
], UIAppHeader);
export { UIAppHeader };
let UIAppFooter = class UIAppFooter {
    constructor(element) {
        this.element = element;
        this.class = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAppFooter.prototype, "class", void 0);
UIAppFooter = __decorate([
    autoinject(),
    containerless(),
    inlineView('<template><div class="ui-app-footer ${class}" slot="ui-app-footer"><slot></slot></div></template>'),
    customElement('ui-app-footer'),
    __metadata("design:paramtypes", [Element])
], UIAppFooter);
export { UIAppFooter };
let UIAppQuickLinks = class UIAppQuickLinks {
    constructor(element) {
        this.element = element;
        this.class = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAppQuickLinks.prototype, "class", void 0);
UIAppQuickLinks = __decorate([
    autoinject(),
    containerless(),
    inlineView('<template><div class="ui-app-taskbar-tools ${class}" slot="ui-app-taskbar"><slot></slot></div></template>'),
    customElement('ui-app-quick-links'),
    __metadata("design:paramtypes", [Element])
], UIAppQuickLinks);
export { UIAppQuickLinks };
let UIAppTitle = class UIAppTitle {
    constructor(element) {
        this.element = element;
        this.class = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAppTitle.prototype, "src", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAppTitle.prototype, "class", void 0);
UIAppTitle = __decorate([
    autoinject(),
    containerless(),
    customElement('ui-app-title'),
    inlineView('<template><a href="#/" class="ui-row ui-row-middle ui-app-title ${class}"><img class="ui-col-auto ui-app-logo" src.bind="src" if.bind="src"/>&nbsp;&nbsp;<span class="ui-col-auto"><slot></slot></span></a><div class="ui-col-fill"></div></template>'),
    __metadata("design:paramtypes", [Element])
], UIAppTitle);
export { UIAppTitle };
