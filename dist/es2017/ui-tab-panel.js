import { bindable, customElement, inlineView, containerless, bindingMode, children, autoinject, DOM } from 'aurelia-framework';
import 'aurelia-event-aggregator';
import { a as UIInternal } from './chunk2.js';
import { a as __decorate, b as __metadata } from './chunk3.js';
import ResizeObserver from 'resize-observer-polyfill';

let tabSeed = 0;
let UITab = class UITab {
    constructor(element) {
        this.element = element;
        this.id = "";
        this.label = "";
        this.icon = "";
        this.active = false;
        this.disabled = false;
        this.closeable = false;
        this.id = `tab__${tabSeed++}`;
    }
    bind() {
        this.closeable = !isFalse(this.closeable);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITab.prototype, "id", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITab.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITab.prototype, "icon", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UITab.prototype, "active", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UITab.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITab.prototype, "view", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITab.prototype, "model", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITab.prototype, "viewModel", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UITab.prototype, "closeable", void 0);
UITab = __decorate([
    customElement("ui-tab"),
    inlineView(`<template class="ui-tab" data-active.bind="active" data-hide.bind="!!view || !!viewModel"><slot></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UITab);

let UITabbarEnd = class UITabbarEnd {
    constructor(element) {
        this.element = element;
    }
};
UITabbarEnd = __decorate([
    containerless(),
    customElement("ui-tabbar-end"),
    inlineView(`<template><div slot="tabbar-end"><slot></slot></div></template>`),
    __metadata("design:paramtypes", [Element])
], UITabbarEnd);

var view = "<template class=\"ui-tab__panel\" data-align.bind=\"align\">\n  <div class=\"ui-tab__bar\">\n    <div class=\"ui-tab__bar__start\">\n      <slot name=\"tabbar-start\"></slot>\n    </div>\n    <div class=\"ui-tab__bar__wrapper\" ref=\"wrapperEl\">\n      <!-- repeat tabs -->\n      <template repeat.for=\"tab of tabs\">\n        <div class=\"ui-tab__button\" data-id.bind=\"tab.id\" data-active.bind=\"tab.active\" data-disabled.bind=\"tab.disabled\" click.trigger=\"activateTab(tab.id)\" ui-tooltip.bind=\"tab.label\">\n          <span class=\"ui-tab__button__icon\" if.bind=\"tab.icon\">\n            <ui-icon icon.bind=\"tab.icon\"></ui-icon>\n          </span>\n          <span class=\"ui-tab__button__label\" innerhtml.bind=\"tab.label\"></span>\n          <span class=\"ui-tab__button__close\" if.bind=\"tab.closeable\" click.trigger=\"[closeTab(tab.id), $event.stopEvent()]\">\n            <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n          </span>\n        </div>\n      </template>\n    </div>\n    <div class=\"ui-tab__bar__end\">\n      <slot name=\"tabbar-end\"></slot>\n    </div>\n    <div class=\"ui-tab__bar__overflow\" show.bind=\"hasOverflow\">\n      <ui-button no-caret type=\"link\" ui-theme=\"secondary\" size=\"sm\">\n        <ui-svg-icon class=\"ui-btn__icon\" icon=\"overflow\"></ui-svg-icon>\n        <ui-drop><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n      </ui-button>\n    </div>\n  </div>\n  <div class=\"ui-tab__body\">\n    <slot></slot>\n\n    <compose view-model.ref=\"composeVm\" class=\"ui-section\" view.bind=\"activeTab.view\" model.bind=\"activeTab.model\" view-model.bind=\"activeTab.viewModel\"></compose>\n  </div>\n</template>\n";

let UITabbarStart = class UITabbarStart {
    constructor(element) {
        this.element = element;
    }
};
UITabbarStart = __decorate([
    containerless(),
    customElement("ui-tabbar-start"),
    inlineView(`<template><div slot="tabbar-start"><slot></slot></div></template>`),
    __metadata("design:paramtypes", [Element])
], UITabbarStart);

let UITabPanel = class UITabPanel {
    constructor(element) {
        this.element = element;
        this.tabs = [];
        this.align = "top";
        this.hasOverflow = false;
        this.isAttached = false;
        if (element.hasAttribute("no-border")) {
            element.classList.add("ui-tab__panel--noborder");
        }
        this.obResize = new ResizeObserver(() => this.calculateOverflow());
        this.obResize.observe(element);
    }
    async activateTab(id) {
        let result = true;
        if (this.composeVm.currentViewModel) {
            result = await UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate");
        }
        if (result) {
            return UIInternal.fireCallbackEvent(this, "beforechange", {
                activeTab: this.activeTab.id,
                activeViewModel: this.composeVm.currentViewModel,
                newTab: id
            }).then(b => (b ? this.activate(id) : undefined));
        }
        else {
            return Promise.resolve(false);
        }
    }
    async closeTab(id) {
        const tab = this.tabs.find(t => t.id === id);
        let result = true;
        if (this.activeTab.id === id && this.composeVm.currentViewModel) {
            result = await UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate");
        }
        if (result) {
            return UIInternal.fireCallbackEvent(this, "beforeclose", tab.id).then(b => b ? this.remove(id) : false);
        }
        else {
            return Promise.resolve(false);
        }
    }
    created(owningView) {
        this.owningView = owningView;
    }
    attached() {
        this.composeVm.owningView = this.owningView;
        this.composeVm.viewResources = this.owningView.resources;
        setTimeout(() => this.calculateOverflow(), 200);
        this.isAttached = true;
        this.tabsChanged();
    }
    detached() {
        this.obResize.disconnect();
    }
    innerTabsChanged() {
        this.tabs = this.innerTabs || this.tabs;
        this.tabsChanged();
    }
    tabsChanged() {
        if (this.isAttached) {
            this.active = (this.tabs.find(tab => tab.active) || {}).id;
            if (!this.active) {
                this.activeTab = this.tabs.find(tab => !tab.disabled) || {};
                this.active = this.activeTab.id;
                this.activeTab.active = true;
            }
        }
    }
    activate(id) {
        const newTab = this.tabs.find(tab => tab.id === id);
        if (newTab) {
            this.element.dispatchEvent(UIInternal.createEvent("change", id));
            if (this.activeTab) {
                this.activeTab.active = false;
            }
            this.activeTab = newTab;
            this.active = this.activeTab.id;
            this.activeTab.active = true;
            return true;
        }
        return false;
    }
    remove(id) {
        const tab = this.tabs.find(t => t.id === id);
        this.element.dispatchEvent(UIInternal.createEvent("close", id));
        this.tabs.splice(this.tabs.indexOf(tab), 1);
        if (tab.element) {
            UIInternal.queueTask(() => DOM.removeNode(tab.element));
        }
        return true;
    }
    calculateOverflow() {
        this.resetOverflow();
        const overflowItems = [];
        const isRtl = window.getComputedStyle(this.wrapperEl).direction === "rtl";
        [...this.wrapperEl.children].reverse().forEach(item => {
            if ((!isRtl && this.wrapperEl.offsetWidth - (item.offsetLeft + item.offsetWidth) <= 30) ||
                (isRtl && this.wrapperEl.offsetWidth - item.offsetLeft >= this.wrapperEl.offsetWidth - 30)) {
                overflowItems.splice(0, 0, item);
                this.hasOverflow = true;
            }
        });
        this.overflowEl.append(...overflowItems);
    }
    resetOverflow() {
        this.hasOverflow = false;
        this.overflowEl.children.forEach(child => {
            this.wrapperEl.appendChild(child);
        });
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UITabPanel.prototype, "tabs", void 0);
__decorate([
    bindable({ bindingMode: bindingMode.twoWay }),
    __metadata("design:type", String)
], UITabPanel.prototype, "active", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITabPanel.prototype, "align", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UITabPanel.prototype, "beforechange", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UITabPanel.prototype, "beforeclose", void 0);
__decorate([
    children("ui-tab"),
    __metadata("design:type", Array)
], UITabPanel.prototype, "innerTabs", void 0);
__decorate([
    bindable({ bindingMode: bindingMode.toView }),
    __metadata("design:type", Object)
], UITabPanel.prototype, "activeTab", void 0);
UITabPanel = __decorate([
    autoinject(),
    customElement("ui-tab-panel"),
    inlineView(view),
    __metadata("design:paramtypes", [Element])
], UITabPanel);
const TabPanel = [UITabPanel, UITab, UITabbarStart, UITabbarEnd];

export { TabPanel };
//# sourceMappingURL=ui-tab-panel.js.map
