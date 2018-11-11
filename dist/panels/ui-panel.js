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
import { autoinject, bindable, bindingMode, customElement, DOM, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIPanel = /** @class */ (function () {
    function UIPanel(element) {
        this.element = element;
        this.label = "";
        this.icon = "";
        this.collapsed = false;
        this.width = "auto";
        this.minWidth = "16rem";
        this.maxWidth = "100vw";
        this.height = "auto";
        this.minHeight = "none";
        this.maxHeight = "100vh";
        this.closeable = false;
        this.collapsible = false;
        this.closeable = element.hasAttribute("closeable");
        this.collapsible = element.hasAttribute("collapsible");
    }
    UIPanel.prototype.close = function () {
        var _this = this;
        return UIInternal.fireCallbackEvent(this, "beforeclose").then(function (b) { return (b ? _this.remove() : false); });
    };
    UIPanel.prototype.toggleExpand = function (expand) {
        this.collapsed = !expand;
    };
    UIPanel.prototype.remove = function () {
        var _this = this;
        this.element.dispatchEvent(UIInternal.createEvent("close"));
        UIInternal.queueTask(function () { return DOM.removeNode(_this.element); });
        return true;
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIPanel.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIPanel.prototype, "icon", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Boolean)
    ], UIPanel.prototype, "collapsed", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIPanel.prototype, "width", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIPanel.prototype, "minWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIPanel.prototype, "maxWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIPanel.prototype, "height", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIPanel.prototype, "minHeight", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIPanel.prototype, "maxHeight", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Function)
    ], UIPanel.prototype, "beforeclose", void 0);
    UIPanel = __decorate([
        autoinject(),
        customElement("ui-panel"),
        __metadata("design:paramtypes", [Element])
    ], UIPanel);
    return UIPanel;
}());
export { UIPanel };
var UIPanelGroup = /** @class */ (function () {
    function UIPanelGroup() {
    }
    UIPanelGroup = __decorate([
        autoinject(),
        customElement("ui-panel-group"),
        inlineView("<template class=\"ui-panel__group\"><slot></slot></template>")
    ], UIPanelGroup);
    return UIPanelGroup;
}());
export { UIPanelGroup };
