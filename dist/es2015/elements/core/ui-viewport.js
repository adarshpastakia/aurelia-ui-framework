var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, inlineView, containerless, DOM, PLATFORM } from 'aurelia-framework';
import { AppRouter } from 'aurelia-router';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
PLATFORM.moduleName('./ui-glyphs');
const CSS_PREFIX = 'ui-viewport';
let UIViewport = class UIViewport {
    constructor(element) {
        this.element = element;
        var __resizeTimer;
        document.addEventListener('dragstart', (e) => getParentByClass(e.target, '.ui-draggable') != null);
        document.addEventListener('mouseup', (e) => UIEvent.broadcast('mouseclick', e));
        document.addEventListener('touchstart', (e) => UIEvent.broadcast('mouseclick', e));
        window.addEventListener('resize', (e) => {
            window.clearTimeout(__resizeTimer);
            window.setTimeout(() => UIEvent.broadcast('windowresize'), 500);
        });
        this.router = UIUtils.auContainer.get(AppRouter);
    }
    attached() {
        UIUtils.dialogContainer = this.dialogContainer;
        UIUtils.overlayContainer = this.overlayContainer;
        UIUtils.taskbarContainer = this.taskbarContainer;
        document.documentElement.classList.add(window.browserAgent());
        UIEvent.fireEvent('appready', this.element);
        if (document.querySelector('.ui-splash'))
            DOM.removeNode(document.querySelector('.ui-splash'));
    }
};
UIViewport = __decorate([
    autoinject(),
    inlineView(`<template class="${CSS_PREFIX} ui-row ui-row-v ui-align-stretch ui-nowrap">
  <compose view-model="./ui-glyphs"></compose>
  <slot name="ui-app-banner"></slot>
  <slot name="ui-app-header"></slot>
  <slot></slot>
  <div class="${CSS_PREFIX}-taskbar"><slot name="ui-app-taskbar"></slot><div class="${CSS_PREFIX}-taskbar-wrapper" ref="taskbarContainer"></div></div>
  <slot name="ui-app-footer"></slot>

  <div class="ui-dialog-container" ref="dialogContainer"></div>
  <div class="ui-overlay-container ui-row ui-row-v ui-align-end" ref="overlayContainer"></div>

  <ui-loader large busy.bind="router.isNavigating"></ui-loader>
</template>`),
    customElement('ui-viewport'),
    __metadata("design:paramtypes", [Element])
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
    inlineView(`<template><router-view class="ui-router-view ui-column-fill ui-row ui-row-v ui-align-stretch ui-nowrap \${class}" name="\${name}"></router-view></template>`),
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
    inlineView(`<template><div class="${CSS_PREFIX}-header ui-column-auto ui-row ui-row-h ui-align-center ui-nowrap \${class}" slot="ui-app-header"><slot></slot></div></template>`),
    customElement('ui-app-header'),
    __metadata("design:paramtypes", [Element])
], UIAppHeader);
export { UIAppHeader };
let UIAppBanner = class UIAppBanner {
    constructor(element) {
        this.element = element;
        this.class = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAppBanner.prototype, "class", void 0);
UIAppBanner = __decorate([
    autoinject(),
    containerless(),
    inlineView(`<template><div class="${CSS_PREFIX}-banner ui-column-auto \${class}" slot="ui-app-banner"><slot></slot></div></template>`),
    customElement('ui-app-banner'),
    __metadata("design:paramtypes", [Element])
], UIAppBanner);
export { UIAppBanner };
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
    inlineView(`<template><div class="${CSS_PREFIX}-footer ui-column-auto ui-row ui-row-h ui-align-center ui-justify-between \${class}" slot="ui-app-footer"><slot></slot></div></template>`),
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
    inlineView(`<template><div class="${CSS_PREFIX}-taskbar-tools \${class}" slot="ui-app-taskbar"><slot></slot></div></template>`),
    customElement('ui-app-quick-links'),
    __metadata("design:paramtypes", [Element])
], UIAppQuickLinks);
export { UIAppQuickLinks };
let UIAppTitle = class UIAppTitle {
    constructor(element) {
        this.element = element;
        this.href = '/';
        this.src = '';
        this.class = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAppTitle.prototype, "href", void 0);
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
    inlineView(`<template><a href.bind="href" class="${CSS_PREFIX}-title ui-row ui-row-h ui-align-center ui-nowrap \${class}"><img if.bind="src" src.bind="src" class="${CSS_PREFIX}-tile-image"/><span class="ui-column-auto"><slot></slot></span></a><div class="ui-column-fill"></div></template>`),
    __metadata("design:paramtypes", [Element])
], UIAppTitle);
export { UIAppTitle };
