var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    var UITabPanel = (function () {
        function UITabPanel(element) {
            this.element = element;
            this.height = "auto";
            this.tabs = [];
            this.activeTab = 0;
            this.noTabs = false;
            if (element.hasAttribute('bottom'))
                element.classList.add('bottom');
            if (element.hasAttribute('noborder'))
                element.classList.add('noborder');
            this.noTabs = element.hasAttribute('notabs');
        }
        UITabPanel.prototype.created = function (owningView, myView) { };
        UITabPanel.prototype.bind = function (bindingContext, overrideContext) { };
        UITabPanel.prototype.attached = function () { };
        UITabPanel.prototype.detached = function () { };
        UITabPanel.prototype.unbind = function () { };
        UITabPanel.prototype.tabsChanged = function () {
            if (this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
                (this.activeTabEl = _.find(this.tabs, ['disabled', false])).active = true;
        };
        UITabPanel.prototype.activeTabChanged = function (newValue) {
            if (this.tabs.length == 0)
                return;
            if (this.activeTabEl)
                this.activeTabEl.active = false;
            (this.activeTabEl = (this.tabs[newValue] || this.activeTabEl)).active = true;
        };
        UITabPanel.prototype.closeTab = function (tab) {
            if (ui_event_1.UIEvent.fireEvent('beforeclose', this.element, tab)) {
                tab.remove();
                ui_event_1.UIEvent.fireEvent('close', this.element, tab);
            }
        };
        UITabPanel.prototype.activateTab = function (tab) {
            if (ui_event_1.UIEvent.fireEvent('beforechange', this.element, tab)) {
                if (this.activeTabEl)
                    this.activeTabEl.active = false;
                (this.activeTabEl = tab).active = true;
                ui_event_1.UIEvent.fireEvent('change', this.element, tab);
            }
        };
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITabPanel.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.children('ui-tab'), 
            __metadata('design:type', Object)
        ], UITabPanel.prototype, "tabs", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UITabPanel.prototype, "activeTab", void 0);
        UITabPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tab-panel\" css.bind=\"{'min-height': height}\"><div class=\"ui-tab-bar\" if.bind=\"!noTabs\">\n    <a click.trigger=\"activateTab(tab)\" repeat.for=\"tab of tabs\" class=\"ui-tab-button ${tab.active?'ui-active':''} ${tab.disabled?'ui-disabled':''}\">\n      <span if.bind=\"tab.glyph\" class=\"fi-ui-${tab.glyph}\"></span>\n      <span class=\"ui-label\">${tab.label}</span>\n      <span if.bind=\"tab.closeable\" class=\"ui-close\" click.trigger=\"closeTab(tab)\">&nbsp;&times;</span>\n    </a>\n  </div><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-tab-panel'), 
            __metadata('design:paramtypes', [Element])
        ], UITabPanel);
        return UITabPanel;
    }());
    exports.UITabPanel = UITabPanel;
    var UITab = (function () {
        function UITab(element) {
            this.element = element;
            this.id = '';
            this.glyph = '';
            this.label = '';
            this.disabled = false;
            this.active = false;
            this.closeable = false;
            if (element.hasAttribute('flex'))
                element.classList.add('ui-flexed');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
            this.id = 'tab-' + (UITab.seed++);
            this.closeable = element.hasAttribute('closeable');
        }
        UITab.prototype.created = function (owningView, myView) { };
        UITab.prototype.bind = function (bindingContext, overrideContext) {
            this.disabled = isTrue(this.disabled);
        };
        UITab.prototype.attached = function () { };
        UITab.prototype.detached = function () { };
        UITab.prototype.unbind = function () { };
        UITab.prototype.remove = function () {
            aurelia_framework_1.DOM.removeNode(this.element);
        };
        UITab.seed = 0;
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITab.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITab.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITab.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UITab.prototype, "disabled", void 0);
        UITab = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tab ${active?'ui-active':''}\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-tab'), 
            __metadata('design:paramtypes', [Element])
        ], UITab);
        return UITab;
    }());
    exports.UITab = UITab;
});
