import { bindable, customElement, inlineView, containerless, viewResources, child } from 'aurelia-framework';
import 'aurelia-event-aggregator';
import { U as UIInternal } from './ui-internal.js';
import { _ as __decorate, a as __metadata } from './_tslib.js';
import ResizeObserver from 'resize-observer-polyfill';
import { c as calculateOverflow } from './ui-common.js';

let UIBreadcrumbs = class UIBreadcrumbs {
    constructor(element) {
        this.element = element;
        this.items = [];
        this.hasOverflow = false;
        this.obResize = new ResizeObserver(() => this.calculateOverflow());
        this.obResize.observe(element);
    }
    attached() {
        UIInternal.queueTask(() => this.calculateOverflow());
    }
    detached() {
        this.obResize.disconnect();
    }
    calculateOverflow() {
        this.resetOverflow();
        if (this.wrapperEl.offsetWidth > this.element.offsetWidth) {
            this.hasOverflow = true;
            while (this.wrapperEl.offsetWidth > this.element.offsetWidth - 50) {
                this.overflowEl.appendChild(this.wrapperEl.firstElementChild);
            }
        }
        else {
            this.hasOverflow = false;
        }
    }
    resetOverflow() {
        this.hasOverflow = false;
        const currentFirstChild = this.wrapperEl.firstElementChild;
        this.overflowEl.children.forEach(child => {
            this.wrapperEl.insertBefore(child, currentFirstChild);
        });
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UIBreadcrumbs.prototype, "items", void 0);
UIBreadcrumbs = __decorate([
    customElement("ui-breadcrumbs"),
    inlineView(`<template class="ui-breadcrumbs">
  <div class="ui-breadcrumbs__overflow" show.bind="hasOverflow">
  <ui-button type="tool" size="xs" no-caret ui-theme="secondary">
    <ui-svg-icon class="ui-btn__icon" icon="ellipsis"></ui-svg-icon>
    <ui-drop close-on-click="false"><ui-menu ref="overflowEl"></ui-menu></ui-drop>
  </ui-button>
  </div>
  <div class="ui-breadcrumbs__wrapper" ref="wrapperEl">
  <template repeat.for="item of items">
    <template if.bind="item.href">
    <a class="ui-breadcrumbs__link" href.bind="item.href"><ui-icon if.bind="item.icon" icon.bind="item.icon"></ui-icon>\${item.label}</a>
    </template>
    <template else>
    <span class="ui-breadcrumbs__label"><ui-icon if.bind="item.icon" icon.bind="item.icon"></ui-icon>\${item.label}</span>
    </template>
  </template>
  </div>
</template>`),
    __metadata("design:paramtypes", [Element])
], UIBreadcrumbs);

let MenuItem = class MenuItem {
    constructor() {
        this.noitemsLabel = "No Menu";
    }
    onClick($event) {
        if (this.item.items) {
            $event.stopPropagation();
        }
        if (this.item.handler) {
            this.item.handler();
        }
        return true;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], MenuItem.prototype, "item", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], MenuItem.prototype, "noitemsLabel", void 0);
MenuItem = __decorate([
    containerless(),
    customElement("menu-item"),
    inlineView(`<template>
  <template if.bind="item.group">
    <ui-menu-group label.bind="item.group">
      <menu-item repeat.for="groupItem of item.items" item.bind="groupItem"></menu-item>
    </ui-menu-group>
  </template>
  <template if.bind="item.label">
    <ui-menu-item label.bind="item.label" href.bind="item.href"
    icon.bind="item.icon" icon-color.bind="item.iconColor" ui-badge="value.bind:item.badge; theme.bind:item.badgeTheme;"
    disabled.bind="typeof item.disabled === 'function' ? item.disabled() : item.disabled"
    active.bind="typeof item.active === 'function' ? item.active() : item.active"
    hide.bind="typeof item.hidden === 'function' ? item.hidden() : item.hidden"
    click.delegate="onClick($event)">
      <ui-drop view-model.ref="dropEl" if.bind="item.items">
        <ui-menu if.bind="dropEl.isOpen" menu-items.bind="item.items" noitems-label.bind="noitemsLabel"></ui-menu>
      </ui-drop>
    </ui-menu-item>
  </template>
  <template if.bind="item === '-'">
    <ui-divider></ui-divider>
  </template>
</template>`)
], MenuItem);

let UIMenu = class UIMenu {
    constructor(element) {
        this.element = element;
        this.noitemsLabel = "No Menu";
        this.isLoading = false;
    }
    attached() {
        this.loadMenuItems();
        UIInternal.queueTask(() => {
            const active = this.element.querySelector(".ui-menu__item__link[data-active='true']");
            if (active) {
                active.scrollIntoView({ block: "center", inline: "nearest" });
            }
        });
    }
    loadMenuItems() {
        if (isFunction(this.menuItems)) {
            this.isLoading = true;
            const ret = this.menuItems();
            if (ret instanceof Promise) {
                ret.then(items => {
                    this.items = items;
                    this.isLoading = false;
                });
            }
            else {
                this.items = ret;
                this.isLoading = false;
            }
        }
        else if (isArray(this.menuItems)) {
            this.items = this.menuItems;
        }
        else {
            this.items = undefined;
        }
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIMenu.prototype, "menuItems", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIMenu.prototype, "noitemsLabel", void 0);
UIMenu = __decorate([
    customElement("ui-menu"),
    viewResources(MenuItem),
    inlineView(`<template class="ui-menu"><slot>
  <div if.bind="isLoading" ui-padding="xs" ui-align="center"><ui-svg-icon icon="busy" class="ui-anim--spin"></ui-svg-icon></div>
  <template if.bind="!isLoading && items && items.length">
    <menu-item repeat.for="item of items" item.bind="item" noitems-label.bind="noitemsLabel"></menu-item>
  </template>
  <template if.bind="!isLoading && items && items.length===0">
    <div ui-padding="xs" ui-color="muted" ui-font="sm" innerhtml.bind="noitemsLabel"></div>
  </template>
</slot></template>`),
    __metadata("design:paramtypes", [Element])
], UIMenu);

let UIMenuGroup = class UIMenuGroup {
    constructor(element) {
        this.element = element;
        this.label = "";
        this.collapsed = false;
    }
    attached() {
        if (this.element.hasAttribute("collapsible")) {
            this.vmElement.classList.add("ui-menu__group--collapsible");
        }
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
    containerless(),
    customElement("ui-menu-group"),
    inlineView(`<template><fieldset class="ui-menu__group" data-collapsed.bind="collapsed" ref="vmElement">
    <legend class="ui-menu__group__label" if.bind="label" innerhtml.bind="label" click.trigger="collapsed = !collapsed"></legend>
    <div class="ui-menu__group__container"><slot></slot></div>
  </fieldset></template>`),
    __metadata("design:paramtypes", [Element])
], UIMenuGroup);

var view = "<template class=\"ui-menu__item\" value.bind=\"value\">\n  <a ref=\"badgeEl\" data-active.bind=\"active\" data-disabled.bind=\"disabled\" click.trigger=\"fireClick($event)\" class=\"ui-menu__item__link\" data-open.bind=\"!split && dropEl.isOpen\">\n    <ui-icon class=\"ui-menu__item__icon\" icon.bind=\"icon\" if.bind=\"icon\" ui-color.bind=\"iconColor\"></ui-icon>\n    <span class=\"ui-menu__item__label\">\n      <slot>${label}</slot>\n    </span>\n    <ui-svg-icon if.bind=\"!split && hasDrop\" class=\"ui-menu__item__caret\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <a data-active.bind=\"split && dropEl.isOpen\" class=\"ui-menu__item__caret ui-menu__item__caret--split\" if.bind=\"split && hasDrop\" click.trigger=\"toggleDrop()\" data-open.bind=\"split && dropEl.isOpen\">\n    <ui-svg-icon class=\"ui-icon__caret split\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <slot name=\"ui-drop\"></slot>\n</template>\n";

let UIMenuItem = class UIMenuItem {
    constructor(element) {
        this.element = element;
        this.label = "";
        this.href = "";
        this.icon = "";
        this.iconColor = "";
        this.active = false;
        this.disabled = false;
        this.dropIcon = "caret";
        this.isInMenubar = false;
        this.hasDrop = false;
        this.split = element.hasAttribute("split");
    }
    attached() {
        UIInternal.queueTask(() => {
            this.hasDrop = !!this.elDropdown;
            this.isInMenubar = hasParent(this.element, "ui-menu__bar");
            const isInDropdown = hasParent(this.element, "ui-drop__body");
            if (this.hasDrop) {
                this.dropEl = getSlotViewModel(this.elDropdown);
                if (isInDropdown || !this.isInMenubar) {
                    this.dropIcon = "page-next";
                    this.dropEl.position = "tl";
                    this.dropEl.anchorPosition = "tr";
                    this.dropEl.stretch = false;
                    this.dropEl.attachToViewport = isInDropdown;
                }
                this.dropEl.tether(this.element);
            }
        });
        this.hrefChanged();
    }
    hrefChanged() {
        if (this.badgeEl) {
            if (this.href) {
                this.badgeEl.href = this.href;
            }
            else if (this.badgeEl.attributes.getNamedItem("href")) {
                this.badgeEl.attributes.removeNamedItem("href");
            }
        }
    }
    activeChanged() {
        if (this.active) {
            this.element.scrollIntoView({ block: "center", inline: "nearest" });
        }
    }
    fireClick($event) {
        if (!this.href) {
            if (this.hasDrop && !this.split) {
                return this.toggleDrop();
            }
            return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
        }
    }
    toggleDrop() {
        const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
        const afterEvent = this.dropEl.isOpen ? "close" : "open";
        if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
            this.dropEl.toggleDrop();
            this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
        }
        return false;
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
    __metadata("design:type", String)
], UIMenuItem.prototype, "iconColor", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIMenuItem.prototype, "id", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIMenuItem.prototype, "active", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIMenuItem.prototype, "disabled", void 0);
__decorate([
    child(".ui-drop"),
    __metadata("design:type", Element)
], UIMenuItem.prototype, "elDropdown", void 0);
UIMenuItem = __decorate([
    customElement("ui-menu-item"),
    inlineView(view),
    __metadata("design:paramtypes", [Element])
], UIMenuItem);

let UIMenubar = class UIMenubar {
    constructor(element) {
        this.element = element;
        this.hasOverflow = false;
        this.obResize = new ResizeObserver(() => this.calculateOverflow());
        this.obResize.observe(element);
    }
    attached() {
        UIInternal.queueTask(() => this.calculateOverflow());
    }
    detached() {
        this.obResize.disconnect();
    }
    calculateOverflow() {
        this.hasOverflow = calculateOverflow(this.wrapperEl, this.overflowEl);
    }
};
UIMenubar = __decorate([
    customElement("ui-menubar"),
    inlineView(`<template class="ui-menu__bar">
  <div class="ui-menu__bar__wrapper" ref="wrapperEl"><slot></slot></div>
  <ui-button type="tool" size="xs" no-caret class="ui-menu__overflow" ui-theme="secondary" show.bind="hasOverflow">
    <ui-svg-icon class="ui-btn__icon" icon="overflow"></ui-svg-icon>
    <ui-drop close-on-click="false"><ui-menu ref="overflowEl"></ui-menu></ui-drop>
  </ui-button>
</template>`),
    __metadata("design:paramtypes", [Element])
], UIMenubar);

const Menus = [UIMenu, UIMenuGroup, UIMenuItem, UIMenubar, UIBreadcrumbs];

export { Menus };
//# sourceMappingURL=ui-menus.js.map
