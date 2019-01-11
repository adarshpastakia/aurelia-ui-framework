/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIDrawer = /** @class */ (function () {
    function UIDrawer(element) {
        var _this = this;
        this.element = element;
        this.align = "start";
        this.width = "24rem";
        this.maxWidth = "40vw";
        this.push = false;
        this.closeOnClick = false;
        this.isAttached = false;
        this.push = element.hasAttribute("push");
        this.closeOnClick =
            element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
        this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, function (target) {
            return !_this.closeOnClick && getParentByClass(target, "ui-drawer__body")
                ? undefined
                : (element.dataset.peek = "false");
        });
    }
    UIDrawer.prototype.attached = function () {
        var _this = this;
        UIInternal.queueTask(function () {
            return _this.element.nextElementSibling.style.setProperty("--drawer-width", _this.width);
        });
        this.isAttached = true;
    };
    UIDrawer.prototype.detached = function () {
        if (this.obClick) {
            this.obClick.dispose();
        }
    };
    UIDrawer.prototype.widthChanged = function () {
        if (this.isAttached) {
            this.element.nextElementSibling.style.setProperty("--drawer-width", this.width);
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDrawer.prototype, "align", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDrawer.prototype, "width", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDrawer.prototype, "maxWidth", void 0);
    UIDrawer = __decorate([
        autoinject(),
        customElement("ui-drawer"),
        __metadata("design:paramtypes", [Element])
    ], UIDrawer);
    return UIDrawer;
}());
export { UIDrawer };
var UIDrawerToggle = /** @class */ (function () {
    function UIDrawerToggle() {
    }
    UIDrawerToggle.prototype.toggleOpen = function () {
        this.drawer.dataset.peek = "" + !isTrue(this.drawer.dataset.peek);
    };
    __decorate([
        bindable(),
        __metadata("design:type", HTMLElement)
    ], UIDrawerToggle.prototype, "drawer", void 0);
    UIDrawerToggle = __decorate([
        autoinject(),
        customElement("ui-drawer-toggle"),
        inlineView("<template class='ui-drawer__toggler' click.trigger='toggleOpen()'><slot><ui-svg-icon icon='menu'></ui-svg-icon></slot></template>")
    ], UIDrawerToggle);
    return UIDrawerToggle;
}());
export { UIDrawerToggle };
