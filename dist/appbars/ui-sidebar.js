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
import { autoinject, bindable, bindingMode, computedFrom, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UISidebar = /** @class */ (function () {
    function UISidebar(element) {
        var _this = this;
        this.element = element;
        this.align = "start";
        this.width = "24rem";
        this.maxWidth = "40vw";
        this.minWidth = "4rem";
        this.toggleCollapse = false;
        this.collapsed = false;
        this.peek = false;
        this.resizable = false;
        this.collapsible = false;
        this.closeOnClick = false;
        this.startX = 0;
        this.isResizing = false;
        this.doResize = function (e) { return _this.resize(e); };
        this.endResize = function () { return _this.stopResize(); };
        this.resizable = element.hasAttribute("resizable");
        this.collapsible = element.hasAttribute("collapsible");
        this.closeOnClick =
            element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
        if (element.hasAttribute("toggle-bottom")) {
            element.classList.add("ui-sidebar--bottom");
        }
        this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, function (target) {
            return !_this.closeOnClick && getParentByClass(target, "ui-sidebar__body")
                ? undefined
                : (_this.peek = false);
        });
    }
    UISidebar.prototype.bind = function () {
        if (this.element.hasAttribute("toggle-collapse")) {
            this.toggleCollapse = true;
        }
    };
    UISidebar.prototype.detached = function () {
        if (this.obClick) {
            this.obClick.dispose();
        }
    };
    Object.defineProperty(UISidebar.prototype, "toggleIcon", {
        get: function () {
            return (this.collapsed ? "expand" : "collapse") + "-" + this.align;
        },
        enumerable: true,
        configurable: true
    });
    UISidebar.prototype.startResize = function ($event) {
        if (!this.isResizing) {
            this.startX = $event.x || $event.clientX;
            this.isResizing = true;
            document.addEventListener("mousemove", this.doResize);
            document.addEventListener("mouseup", this.endResize);
            $event.stopEvent();
        }
    };
    UISidebar.prototype.resize = function ($event) {
        if (this.isResizing) {
            var diff = ($event.x || $event.clientX) - this.startX;
            if (this.align === "end") {
                diff = -1 * diff;
            }
            if (isRtl(this.element)) {
                diff = -1 * diff;
            }
            var newWidth = this.bodyEl.offsetWidth + diff;
            if (newWidth <= convertToPx(this.maxWidth) && newWidth >= convertToPx(this.minWidth)) {
                this.width = newWidth + "px";
                this.startX = $event.x || $event.clientX;
            }
            $event.stopEvent();
        }
    };
    UISidebar.prototype.stopResize = function () {
        this.isResizing = false;
        document.removeEventListener("mousemove", this.doResize);
        document.removeEventListener("mouseup", this.endResize);
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "align", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "width", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "maxWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "minWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "titleBg", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "titleColor", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UISidebar.prototype, "titleWeight", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UISidebar.prototype, "toggleCollapse", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Boolean)
    ], UISidebar.prototype, "collapsed", void 0);
    __decorate([
        computedFrom("collapsed", "align"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UISidebar.prototype, "toggleIcon", null);
    UISidebar = __decorate([
        autoinject(),
        customElement("ui-sidebar"),
        __metadata("design:paramtypes", [Element])
    ], UISidebar);
    return UISidebar;
}());
export { UISidebar };
