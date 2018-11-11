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
import { autoinject, bindable, child, containerless, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIMenu = /** @class */ (function () {
    function UIMenu(element) {
        this.element = element;
    }
    UIMenu.prototype.attached = function () {
        var active = this.element.querySelector(".ui-menu__item__link[data-active='true']");
        if (active) {
            active.scrollIntoView({ block: "center", inline: "nearest" });
        }
    };
    UIMenu = __decorate([
        autoinject(),
        customElement("ui-menu"),
        inlineView("<template class=\"ui-menu\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIMenu);
    return UIMenu;
}());
export { UIMenu };
var UIMenuGroup = /** @class */ (function () {
    function UIMenuGroup(element) {
        this.element = element;
        this.label = "";
        this.collapsed = false;
    }
    UIMenuGroup.prototype.attached = function () {
        if (this.element.hasAttribute("collapsible")) {
            this.vmElement.classList.add("ui-menu__group--collapsible");
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuGroup.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIMenuGroup.prototype, "collapsed", void 0);
    UIMenuGroup = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-menu-group"),
        inlineView("<template><fieldset class=\"ui-menu__group\" data-collapsed.bind=\"collapsed\" ref=\"vmElement\">\n    <legend class=\"ui-menu__group__label\" if.bind=\"label\" innerhtml.bind=\"label\" click.trigger=\"collapsed = !collapsed\"></legend>\n    <div class=\"ui-menu__group__container\"><slot></slot></div>\n  </fieldset></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIMenuGroup);
    return UIMenuGroup;
}());
export { UIMenuGroup };
var UIMenuItem = /** @class */ (function () {
    function UIMenuItem(element) {
        this.element = element;
        this.label = "";
        this.href = "";
        this.icon = "";
        this.active = false;
        this.disabled = false;
        this.hasDrop = false;
        this.split = element.hasAttribute("split");
    }
    UIMenuItem.prototype.attached = function () {
        this.hasDrop = !!this.elDropdown;
        if (this.hasDrop) {
            this.dropEl = getSlotViewModel(this.elDropdown);
            this.dropEl.tether(this.element);
        }
        this.hrefChanged();
    };
    UIMenuItem.prototype.hrefChanged = function () {
        if (this.badgeEl) {
            if (this.href) {
                this.badgeEl.href = this.href;
            }
            else if (this.badgeEl.attributes.getNamedItem("href")) {
                this.badgeEl.attributes.removeNamedItem("href");
            }
        }
    };
    UIMenuItem.prototype.fireClick = function ($event) {
        if (!this.href) {
            $event.stopEvent();
            if (this.hasDrop && !this.split) {
                this.toggleDrop();
                return false;
            }
            return this.element.dispatchEvent(UIInternal.createEvent("click", this.value));
        }
    };
    UIMenuItem.prototype.toggleDrop = function () {
        var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
        var afterEvent = this.dropEl.isOpen ? "close" : "open";
        if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
            this.dropEl.toggleDrop();
            this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuItem.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuItem.prototype, "href", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIMenuItem.prototype, "icon", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIMenuItem.prototype, "value", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIMenuItem.prototype, "active", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIMenuItem.prototype, "disabled", void 0);
    __decorate([
        child("div.ui-drop"),
        __metadata("design:type", Element)
    ], UIMenuItem.prototype, "elDropdown", void 0);
    UIMenuItem = __decorate([
        autoinject(),
        customElement("ui-menu-item"),
        __metadata("design:paramtypes", [Element])
    ], UIMenuItem);
    return UIMenuItem;
}());
export { UIMenuItem };
