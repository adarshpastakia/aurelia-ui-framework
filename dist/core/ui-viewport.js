var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, containerless, customElement, inlineView, ViewSlot } from "aurelia-framework";
import { AppRouter } from "aurelia-router";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIInternal } from "../utils/ui-internal";
var UIViewport = /** @class */ (function () {
    function UIViewport(appConfig, router) {
        var _this = this;
        this.appConfig = appConfig;
        this.router = router;
        window.addEventListener("resize", function () { return UIInternal.broadcast(UIInternal.EVT_VIEWPORT_RESIZE); });
        document.addEventListener("mouseup", function ($event) { return _this.broadcastEvent($event); });
    }
    UIViewport.prototype.attached = function () {
        this.appConfig.DialogContainer = new ViewSlot(this.dialogContainer, true);
        this.appConfig.TaskbarContainer = new ViewSlot(this.taskbarContainer, true);
        this.appConfig.DialogContainer.attached();
        this.appConfig.TaskbarContainer.attached();
    };
    UIViewport.prototype.broadcastEvent = function ($event) {
        if (!hasParent($event.target, this.appConfig.FloatingContainer)) {
            UIInternal.broadcast(UIInternal.EVT_VIEWPORT_CLICK, $event.target);
        }
    };
    UIViewport = __decorate([
        autoinject(),
        customElement("ui-viewport"),
        __metadata("design:paramtypes", [UIAppConfig, AppRouter])
    ], UIViewport);
    return UIViewport;
}());
export { UIViewport };
var UIViewportHeader = /** @class */ (function () {
    function UIViewportHeader() {
    }
    UIViewportHeader = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-viewport-header"),
        inlineView("<template><header class=\"ui-viewport__header\" slot=\"ui-viewport__header\" ref=\"vmElement\"><slot></slot></header></template>")
    ], UIViewportHeader);
    return UIViewportHeader;
}());
export { UIViewportHeader };
var UIViewportFooter = /** @class */ (function () {
    function UIViewportFooter() {
    }
    UIViewportFooter = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-viewport-footer"),
        inlineView("<template><footer class=\"ui-viewport__footer\" slot=\"ui-viewport__footer\" ref=\"vmElement\"><slot></slot></footer></template>")
    ], UIViewportFooter);
    return UIViewportFooter;
}());
export { UIViewportFooter };
var UIRouterView = /** @class */ (function () {
    function UIRouterView() {
    }
    UIRouterView = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-router-view"),
        inlineView("<template><router-view class=\"ui-router-view\" ref=\"vmElement\"></router-view></template>")
    ], UIRouterView);
    return UIRouterView;
}());
export { UIRouterView };
var UIDivider = /** @class */ (function () {
    function UIDivider() {
    }
    UIDivider = __decorate([
        autoinject(),
        customElement("ui-divider"),
        inlineView("<template class='ui-divider'></template>")
    ], UIDivider);
    return UIDivider;
}());
export { UIDivider };
var UIFiller = /** @class */ (function () {
    function UIFiller() {
    }
    UIFiller = __decorate([
        autoinject(),
        customElement("ui-filler"),
        inlineView("<template class='ui-col ui-col--fill'></template>")
    ], UIFiller);
    return UIFiller;
}());
export { UIFiller };
var UILoader = /** @class */ (function () {
    function UILoader() {
        this.busy = false;
    }
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UILoader.prototype, "busy", void 0);
    UILoader = __decorate([
        autoinject(),
        customElement("ui-loader"),
        inlineView("<template><div ref=\"vmElement\" class=\"ui-loader\" if.bind=\"busy\">\n  <div><ui-svg-icon icon=\"loader\" class=\"ui-anim--spin\"></ui-svg-icon></div>\n</div></template>")
    ], UILoader);
    return UILoader;
}());
export { UILoader };
