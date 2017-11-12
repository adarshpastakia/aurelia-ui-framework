var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-utils", "../../utils/ui-event", "lodash"], function (require, exports, aurelia_framework_1, ui_utils_1, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UITabbarStart = (function () {
        function UITabbarStart() {
        }
        UITabbarStart = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-tabbar-start'),
            aurelia_framework_1.inlineView("<template><div slot=\"ui-tabbar-start\" class=\"ui-tabbar-links\"><slot></slot></div></template>")
        ], UITabbarStart);
        return UITabbarStart;
    }());
    exports.UITabbarStart = UITabbarStart;
    var UITabbarEnd = (function () {
        function UITabbarEnd() {
        }
        UITabbarEnd = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-tabbar-end'),
            aurelia_framework_1.inlineView("<template><div slot=\"ui-tabbar-end\" class=\"ui-tabbar-links\"><slot></slot></div></template>")
        ], UITabbarEnd);
        return UITabbarEnd;
    }());
    exports.UITabbarEnd = UITabbarEnd;
    var UITabbarToggle = (function () {
        function UITabbarToggle(element) {
            this.element = element;
            this.disabled = false;
            this.isDisabled = false;
        }
        UITabbarToggle.prototype.attached = function () {
            var _this = this;
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-button') == _this.element)
                        return;
                    _this.element.classList.remove('ui-open');
                    _this.dropdown.classList.remove('ui-open');
                });
                this.element.classList.add('ui-btn-dropdown');
                this.dropdown.classList.add('ui-floating');
                this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
            }
        };
        UITabbarToggle.prototype.detached = function () {
            if (this.tether)
                this.tether.dispose();
            if (this.obMouseup)
                this.obMouseup.dispose();
            if (this.dropdown)
                aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UITabbarToggle.prototype.toggleDropdown = function (evt) {
            if (evt.button != 0)
                return true;
            if (this.dropdown) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.cancelBubble = true;
                if (this.element.classList.contains('ui-open')) {
                    ui_event_1.UIEvent.fireEvent('menuhide', this.element);
                    this.element.classList.remove('ui-open');
                    this.dropdown.classList.remove('ui-open');
                }
                else {
                    if (ui_event_1.UIEvent.fireEvent('menuopen', this.element) !== false) {
                        this.element.classList.add('ui-open');
                        this.dropdown.classList.add('ui-open');
                        this.tether.position();
                    }
                }
                return false;
            }
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabbarToggle.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabbarToggle.prototype, "disabled", void 0);
        UITabbarToggle = __decorate([
            aurelia_framework_1.customElement('ui-tabbar-toggle'),
            aurelia_framework_1.inlineView("<template class=\"ui-tabbar-toggle ui-tab-button ${disabled?'ui-disabled':''}\" click.trigger=\"toggleDropdown($event)\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UITabbarToggle);
        return UITabbarToggle;
    }());
    exports.UITabbarToggle = UITabbarToggle;
    var UITabPanel = (function () {
        function UITabPanel(element) {
            this.element = element;
            this.isOverflow = false;
            this.height = "auto";
            this.tabs = [];
            this.activeTab = 0;
            this.noTabs = false;
            if (element.hasAttribute('bottom'))
                element.classList.add('ui-bottom');
            if (element.hasAttribute('noborder'))
                element.classList.add('ui-noborder');
            this.noTabs = element.hasAttribute('notabs');
        }
        UITabPanel.prototype.attached = function () {
            var _this = this;
            if (!this.noTabs) {
                this.obResize = ui_event_1.UIEvent.subscribe('windowresize', function () { return _this.arrange(); });
                this.obClick = ui_event_1.UIEvent.subscribe('mouseclick', function () { return _this.overflow.classList.remove('ui-open'); });
                this.tether = ui_utils_1.UIUtils.tether(this.overflowToggle, this.overflow, { resize: false, position: 'br' });
                window.setTimeout(function () { return _this.arrange(); }, 500);
            }
        };
        UITabPanel.prototype.detached = function () {
            if (!this.noTabs) {
                this.tether.dispose();
                this.obClick.dispose();
                this.obResize.dispose();
            }
        };
        UITabPanel.prototype.tabsChanged = function () {
            var _this = this;
            if (!this.activeTabEl && this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
                this.activateTab(_.find(this.tabs, ['disabled', false]));
            ui_event_1.UIEvent.queueTask(function () { return _this.arrange(); });
        };
        UITabPanel.prototype.activeTabChanged = function (newValue) {
            if (this.tabs.length == 0)
                return;
            var tab = (_.find(this.tabs, ['id', newValue]) || this.tabs[newValue] || this.activeTabEl);
            if (this.activeTabEl)
                this.activeTabEl.active = false;
            (this.activeTabEl = tab).active = true;
        };
        UITabPanel.prototype.close = function (id, force) {
            if (force === void 0) { force = false; }
            var tab = _.find(this.tabs, ['id', id]);
            if (tab)
                force ? this.doClose(tab) : this.closeTab(tab);
        };
        UITabPanel.prototype.closeTab = function (tab) {
            var _this = this;
            tab.canDeactivate()
                .then(function (b) {
                if (b === true) {
                    if (typeof tab.beforeclose === "function") {
                        var ret = tab.beforeclose(tab);
                        if (ret instanceof Promise)
                            ret.then(function (b) {
                                if (b !== false) {
                                    _this.doClose(tab);
                                }
                            });
                        else if (ret !== false) {
                            _this.doClose(tab);
                        }
                    }
                    else if (ui_event_1.UIEvent.fireEvent('beforeclose', tab.element, tab) !== false) {
                        _this.doClose(tab);
                    }
                }
            });
        };
        UITabPanel.prototype.doClose = function (tab) {
            _.remove(this.tabs, ['id', tab.id]);
            if (this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
                this.activateTab(_.findLast(this.tabs, ['disabled', false]));
            tab.remove();
            ui_event_1.UIEvent.fireEvent('closed', this.element, tab);
        };
        UITabPanel.prototype.activateTab = function (newTab) {
            if (this.activeTabEl)
                this.activeTabEl.active = false;
            (this.activeTabEl = newTab).active = true;
            this.activeTab = newTab.id;
            ui_event_1.UIEvent.fireEvent('activate', newTab.element, newTab);
        };
        UITabPanel.prototype.canActivate = function (id) {
            var tab = _.find(this.tabs, ['id', id]);
            if (tab) {
                if (this.activeTabEl)
                    this.activeTabEl.active = false;
                (this.activeTabEl = tab).active = true;
                return true;
            }
            return false;
        };
        UITabPanel.prototype.arrange = function () {
            if (!this.wrapper)
                return;
            this.overflow.classList.remove('ui-open');
            for (var i = 0, c = this.overflow['children']; i < c.length; i++) {
                this.wrapper.insertBefore(c[i], this.overflowToggle);
            }
            if (this.tabs.length > 0 && (this.isOverflow = (this.wrapper.lastElementChild.previousElementSibling.offsetLeft + this.wrapper.lastElementChild.previousElementSibling.offsetWidth > this.wrapper.offsetWidth))) {
                for (var c = this.wrapper['children'], i = c.length - 2; i >= 0; i--) {
                    if (c[i].offsetLeft + c[i].offsetWidth > this.wrapper.offsetWidth) {
                        if (this.overflow.hasChildNodes)
                            this.overflow.insertBefore(c[i], this.overflow.childNodes[0]);
                        else
                            this.overflow.appendChild(c[i]);
                    }
                }
            }
        };
        UITabPanel.prototype.showOverflow = function (evt) {
            if (evt.button != 0)
                return true;
            if (!this.overflow.classList.contains('ui-open')) {
                this.overflow.classList.add('ui-open');
                this.tether.position();
            }
            else
                this.overflow.classList.remove('ui-open');
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.children('ui-tab'),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "tabs", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "activeTab", void 0);
        UITabPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tab-panel\" css.bind=\"{'min-height': height}\"><div class=\"ui-tabbar\">\n  <slot name=\"ui-tabbar-start\"></slot>\n  <div class=\"ui-tabbar-buttons\" ref=\"wrapper\" if.bind=\"!noTabs\">\n    <a click.trigger=\"activateTab(tab)\" repeat.for=\"tab of tabs\" class=\"ui-tab-button ${tab.active?'ui-active':''} ${tab.disabled?'ui-disabled':''}\">\n      <div><ui-glyph if.bind=\"tab.glyph\" class=\"ui-tab-icon ${tab.glyphClass}\" glyph.bind=\"tab.glyph\"></ui-glyph>\n      <span class=\"ui-label\" if.bind=\"tab.label\" innerhtml.bind=\"tab.label\"></span></div>\n      <span if.bind=\"tab.closeable\" class=\"ui-close\" click.trigger=\"closeTab(tab)\">&nbsp;&times;</span>\n    </a>\n    <div class=\"ui-tabbar-toggle ui-tab-button\" ref=\"overflowToggle\" show.bind=\"isOverflow\" click.trigger=\"showOverflow($event)\"><ui-glyph glyph=\"glyph-handle-overflow\"></ui-glyph></div>\n  </div>\n  <slot name=\"ui-tabbar-end\"></slot>\n  <div class=\"ui-menu ui-tabbar-overflow ui-floating\" ref=\"overflow\"></div>\n  </div><div class=\"ui-tab-panel-body\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-tab-panel'),
            __metadata("design:paramtypes", [Element])
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
            this.glyphClass = '';
            this.disabled = false;
            this.active = false;
            this.closeable = false;
            if (element.hasAttribute('flex'))
                element.classList.add('ui-flexed');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
            this.id = 'tab-' + (UITab_1.seed++);
            this.closeable = element.hasAttribute('closeable');
        }
        UITab_1 = UITab;
        UITab.prototype.bind = function (bindingContext, overrideContext) {
            this.disabled = this.disabled || this.element.hasAttribute('disabled');
        };
        UITab.prototype.remove = function () {
            try {
                if (this.viewModel)
                    this.viewModel.detached();
            }
            catch (e) { }
            aurelia_framework_1.DOM.removeNode(this.element);
            try {
                if (this.viewModel)
                    this.viewModel.unbind();
            }
            catch (e) { }
        };
        UITab.prototype.canDeactivate = function () {
            var instance = this.viewModel;
            if (instance && typeof instance.canDeactivate === 'function') {
                var result = instance.canDeactivate();
                if (result instanceof Promise) {
                    return result;
                }
                if (result !== null && result !== undefined) {
                    return Promise.resolve(result);
                }
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        };
        Object.defineProperty(UITab.prototype, "viewModel", {
            get: function () {
                if (this.element.firstElementChild && this.element.firstElementChild.tagName.toLowerCase() == 'compose')
                    return this.element.firstElementChild.au.compose.viewModel.currentViewModel;
                return null;
            },
            enumerable: true,
            configurable: true
        });
        UITab.seed = 0;
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "glyphClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "beforeclose", void 0);
        UITab = UITab_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tab ${active?'ui-active':''}\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-tab'),
            __metadata("design:paramtypes", [Element])
        ], UITab);
        return UITab;
        var UITab_1;
    }());
    exports.UITab = UITab;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktdGFicGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBYUE7UUFBQTtRQUE2QixDQUFDO1FBQWpCLGFBQWE7WUFIekIsaUNBQWEsRUFBRTtZQUNmLGlDQUFhLENBQUMsaUJBQWlCLENBQUM7WUFDaEMsOEJBQVUsQ0FBQyxrR0FBOEYsQ0FBQztXQUM5RixhQUFhLENBQUk7UUFBRCxvQkFBQztLQUE5QixBQUE4QixJQUFBO0lBQWpCLHNDQUFhO0lBSzFCO1FBQUE7UUFBMkIsQ0FBQztRQUFmLFdBQVc7WUFIdkIsaUNBQWEsRUFBRTtZQUNmLGlDQUFhLENBQUMsZUFBZSxDQUFDO1lBQzlCLDhCQUFVLENBQUMsZ0dBQTRGLENBQUM7V0FDNUYsV0FBVyxDQUFJO1FBQUQsa0JBQUM7S0FBNUIsQUFBNEIsSUFBQTtJQUFmLGtDQUFXO0lBSXhCO1FBUUUsd0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFOdkIsYUFBUSxHQUFHLEtBQUssQ0FBQztZQUk3QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRW9CLENBQUM7UUFFeEMsaUNBQVEsR0FBUjtZQUFBLGlCQVdDO1lBVkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsa0JBQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFVBQUMsR0FBRztvQkFDbkQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDO3dCQUFDLE1BQU0sQ0FBQztvQkFDdEUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6QyxLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFD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QUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO2dCQUM5RSxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQzs7O1dBQUE7UUE1RE0sVUFBSSxHQUFHLENBQUMsQ0FBQztRQW9CSjtZQUFYLDRCQUFRLEVBQUU7O3lDQUFTO1FBQ1I7WUFBWCw0QkFBUSxFQUFFOzs0Q0FBWTtRQUNYO1lBQVgsNEJBQVEsRUFBRTs7NENBQVk7UUFDWDtZQUFYLDRCQUFRLEVBQUU7O2lEQUFpQjtRQUNoQjtZQUFYLDRCQUFRLEVBQUU7OytDQUFrQjtRQUVqQjtZQUFYLDRCQUFRLEVBQUU7O2tEQUFrQjtRQTNCbEIsS0FBSztZQUhqQiw4QkFBVSxFQUFFO1lBQ1osOEJBQVUsQ0FBQyw4RUFBNkUsQ0FBQztZQUN6RixpQ0FBYSxDQUFDLFFBQVEsQ0FBQzs2Q0FHTSxPQUFPO1dBRnhCLEtBQUssQ0E4RGpCO1FBQUQsWUFBQzs7S0E5REQsQUE4REMsSUFBQTtJQTlEWSxzQkFBSyIsImZpbGUiOiJlbGVtZW50cy9jb21wb25lbnRzL3VpLXRhYnBhbmVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGJpbmRpbmdNb2RlLCBjaGlsZHJlbiwgaW5saW5lVmlldywgdXNlVmlldywgY29udGFpbmVybGVzcywgVmlldywgRE9NIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlVdGlscyB9IGZyb20gXCIuLi8uLi91dGlscy91aS11dGlsc1wiO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gXCIuLi8uLi91dGlscy91aS1ldmVudFwiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbkBjb250YWluZXJsZXNzKClcbkBjdXN0b21FbGVtZW50KCd1aS10YWJiYXItc3RhcnQnKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZT48ZGl2IHNsb3Q9XCJ1aS10YWJiYXItc3RhcnRcIiBjbGFzcz1cInVpLXRhYmJhci1saW5rc1wiPjxzbG90Pjwvc2xvdD48L2Rpdj48L3RlbXBsYXRlPmApXG5leHBvcnQgY2xhc3MgVUlUYWJiYXJTdGFydCB7IH1cblxuQGNvbnRhaW5lcmxlc3MoKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXRhYmJhci1lbmQnKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZT48ZGl2IHNsb3Q9XCJ1aS10YWJiYXItZW5kXCIgY2xhc3M9XCJ1aS10YWJiYXItbGlua3NcIj48c2xvdD48L3Nsb3Q+PC9kaXY+PC90ZW1wbGF0ZT5gKVxuZXhwb3J0IGNsYXNzIFVJVGFiYmFyRW5kIHsgfVxuXG5AY3VzdG9tRWxlbWVudCgndWktdGFiYmFyLXRvZ2dsZScpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktdGFiYmFyLXRvZ2dsZSB1aS10YWItYnV0dG9uIFxcJHtkaXNhYmxlZD8ndWktZGlzYWJsZWQnOicnfVwiIGNsaWNrLnRyaWdnZXI9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQpXCI+PHNsb3Q+PC9zbG90PjwvdGVtcGxhdGU+YClcbmV4cG9ydCBjbGFzcyBVSVRhYmJhclRvZ2dsZSB7XG4gIEBiaW5kYWJsZSgpIGRyb3Bkb3duO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgdGV0aGVyO1xuICBwcml2YXRlIG9iTW91c2V1cDtcbiAgaXNEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7IH1cblxuICBhdHRhY2hlZCgpIHtcbiAgICBpZiAodGhpcy5kcm9wZG93bikge1xuICAgICAgdGhpcy5vYk1vdXNldXAgPSBVSUV2ZW50LnN1YnNjcmliZSgnbW91c2VjbGljaycsIChldnQpID0+IHtcbiAgICAgICAgaWYgKGdldFBhcmVudEJ5Q2xhc3MoZXZ0LnRhcmdldCwgJ3VpLWJ1dHRvbicpID09IHRoaXMuZWxlbWVudCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndWktb3BlbicpO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWJ0bi1kcm9wZG93bicpO1xuICAgICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QuYWRkKCd1aS1mbG9hdGluZycpO1xuICAgICAgdGhpcy50ZXRoZXIgPSBVSVV0aWxzLnRldGhlcih0aGlzLmVsZW1lbnQsIHRoaXMuZHJvcGRvd24pO1xuICAgIH1cbiAgfVxuICBkZXRhY2hlZCgpIHtcbiAgICBpZiAodGhpcy50ZXRoZXIpIHRoaXMudGV0aGVyLmRpc3Bvc2UoKTtcbiAgICBpZiAodGhpcy5vYk1vdXNldXApIHRoaXMub2JNb3VzZXVwLmRpc3Bvc2UoKTtcbiAgICBpZiAodGhpcy5kcm9wZG93bikgRE9NLnJlbW92ZU5vZGUodGhpcy5kcm9wZG93bik7XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bihldnQpIHtcbiAgICBpZiAoZXZ0LmJ1dHRvbiAhPSAwKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodGhpcy5kcm9wZG93bikge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1aS1vcGVuJykpIHtcbiAgICAgICAgVUlFdmVudC5maXJlRXZlbnQoJ21lbnVoaWRlJywgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCd1aS1vcGVuJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKFVJRXZlbnQuZmlyZUV2ZW50KCdtZW51b3BlbicsIHRoaXMuZWxlbWVudCkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLW9wZW4nKTtcbiAgICAgICAgICB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ3VpLW9wZW4nKTtcbiAgICAgICAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbn1cblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLXRhYi1wYW5lbFwiIGNzcy5iaW5kPVwieydtaW4taGVpZ2h0JzogaGVpZ2h0fVwiPjxkaXYgY2xhc3M9XCJ1aS10YWJiYXJcIj5cbiAgPHNsb3QgbmFtZT1cInVpLXRhYmJhci1zdGFydFwiPjwvc2xvdD5cbiAgPGRpdiBjbGFzcz1cInVpLXRhYmJhci1idXR0b25zXCIgcmVmPVwid3JhcHBlclwiIGlmLmJpbmQ9XCIhbm9UYWJzXCI+XG4gICAgPGEgY2xpY2sudHJpZ2dlcj1cImFjdGl2YXRlVGFiKHRhYilcIiByZXBlYXQuZm9yPVwidGFiIG9mIHRhYnNcIiBjbGFzcz1cInVpLXRhYi1idXR0b24gXFwke3RhYi5hY3RpdmU/J3VpLWFjdGl2ZSc6Jyd9IFxcJHt0YWIuZGlzYWJsZWQ/J3VpLWRpc2FibGVkJzonJ31cIj5cbiAgICAgIDxkaXY+PHVpLWdseXBoIGlmLmJpbmQ9XCJ0YWIuZ2x5cGhcIiBjbGFzcz1cInVpLXRhYi1pY29uIFxcJHt0YWIuZ2x5cGhDbGFzc31cIiBnbHlwaC5iaW5kPVwidGFiLmdseXBoXCI+PC91aS1nbHlwaD5cbiAgICAgIDxzcGFuIGNsYXNzPVwidWktbGFiZWxcIiBpZi5iaW5kPVwidGFiLmxhYmVsXCIgaW5uZXJodG1sLmJpbmQ9XCJ0YWIubGFiZWxcIj48L3NwYW4+PC9kaXY+XG4gICAgICA8c3BhbiBpZi5iaW5kPVwidGFiLmNsb3NlYWJsZVwiIGNsYXNzPVwidWktY2xvc2VcIiBjbGljay50cmlnZ2VyPVwiY2xvc2VUYWIodGFiKVwiPiZuYnNwOyZ0aW1lczs8L3NwYW4+XG4gICAgPC9hPlxuICAgIDxkaXYgY2xhc3M9XCJ1aS10YWJiYXItdG9nZ2xlIHVpLXRhYi1idXR0b25cIiByZWY9XCJvdmVyZmxvd1RvZ2dsZVwiIHNob3cuYmluZD1cImlzT3ZlcmZsb3dcIiBjbGljay50cmlnZ2VyPVwic2hvd092ZXJmbG93KCRldmVudClcIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1oYW5kbGUtb3ZlcmZsb3dcIj48L3VpLWdseXBoPjwvZGl2PlxuICA8L2Rpdj5cbiAgPHNsb3QgbmFtZT1cInVpLXRhYmJhci1lbmRcIj48L3Nsb3Q+XG4gIDxkaXYgY2xhc3M9XCJ1aS1tZW51IHVpLXRhYmJhci1vdmVyZmxvdyB1aS1mbG9hdGluZ1wiIHJlZj1cIm92ZXJmbG93XCI+PC9kaXY+XG4gIDwvZGl2PjxkaXYgY2xhc3M9XCJ1aS10YWItcGFuZWwtYm9keVwiPjxzbG90Pjwvc2xvdD48L2Rpdj48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktdGFiLXBhbmVsJylcbmV4cG9ydCBjbGFzcyBVSVRhYlBhbmVsIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2JvdHRvbScpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWJvdHRvbScpO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbm9ib3JkZXInKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1ub2JvcmRlcicpO1xuICAgIHRoaXMubm9UYWJzID0gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ25vdGFicycpO1xuICB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIC8vIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHsgfVxuICBhdHRhY2hlZCgpIHtcbiAgICBpZiAoIXRoaXMubm9UYWJzKSB7XG4gICAgICB0aGlzLm9iUmVzaXplID0gVUlFdmVudC5zdWJzY3JpYmUoJ3dpbmRvd3Jlc2l6ZScsICgpID0+IHRoaXMuYXJyYW5nZSgpKTtcbiAgICAgIHRoaXMub2JDbGljayA9IFVJRXZlbnQuc3Vic2NyaWJlKCdtb3VzZWNsaWNrJywgKCkgPT4gdGhpcy5vdmVyZmxvdy5jbGFzc0xpc3QucmVtb3ZlKCd1aS1vcGVuJykpO1xuICAgICAgdGhpcy50ZXRoZXIgPSBVSVV0aWxzLnRldGhlcih0aGlzLm92ZXJmbG93VG9nZ2xlLCB0aGlzLm92ZXJmbG93LCB7IHJlc2l6ZTogZmFsc2UsIHBvc2l0aW9uOiAnYnInIH0pO1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5hcnJhbmdlKCksIDUwMCk7XG4gICAgfVxuICB9XG4gIGRldGFjaGVkKCkge1xuICAgIGlmICghdGhpcy5ub1RhYnMpIHtcbiAgICAgIHRoaXMudGV0aGVyLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMub2JDbGljay5kaXNwb3NlKCk7XG4gICAgICB0aGlzLm9iUmVzaXplLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgcHJpdmF0ZSB0ZXRoZXI7XG4gIHByaXZhdGUgaXNPdmVyZmxvdyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgd3JhcHBlcjogRWxlbWVudDtcbiAgcHJpdmF0ZSBvdmVyZmxvdzogRWxlbWVudDtcbiAgcHJpdmF0ZSBvdmVyZmxvd1RvZ2dsZTogRWxlbWVudDtcblxuICBwcml2YXRlIG9iQ2xpY2s7XG4gIHByaXZhdGUgb2JSZXNpemU7XG5cbiAgQGJpbmRhYmxlKCkgaGVpZ2h0ID0gXCJhdXRvXCI7XG4gIEBjaGlsZHJlbigndWktdGFiJykgdGFicyA9IFtdO1xuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSBhY3RpdmVUYWI6IGFueSA9IDA7XG5cblxuICBwcml2YXRlIG5vVGFicyA9IGZhbHNlO1xuICBwcml2YXRlIGFjdGl2ZVRhYkVsO1xuXG4gIHByaXZhdGUgdGFic0NoYW5nZWQoKSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2ZVRhYkVsICYmIHRoaXMudGFicy5sZW5ndGggPiAwICYmIF8uZmluZCh0aGlzLnRhYnMsIFsnYWN0aXZlJywgdHJ1ZV0pID09IG51bGwpXG4gICAgICB0aGlzLmFjdGl2YXRlVGFiKF8uZmluZCh0aGlzLnRhYnMsIFsnZGlzYWJsZWQnLCBmYWxzZV0pKTtcbiAgICBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiB0aGlzLmFycmFuZ2UoKSk7XG4gIH1cblxuICBwcml2YXRlIGFjdGl2ZVRhYkNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICBpZiAodGhpcy50YWJzLmxlbmd0aCA9PSAwKSByZXR1cm47XG4gICAgbGV0IHRhYiA9IChfLmZpbmQodGhpcy50YWJzLCBbJ2lkJywgbmV3VmFsdWVdKSB8fCB0aGlzLnRhYnNbbmV3VmFsdWVdIHx8IHRoaXMuYWN0aXZlVGFiRWwpO1xuICAgIGlmICh0aGlzLmFjdGl2ZVRhYkVsKSB0aGlzLmFjdGl2ZVRhYkVsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICh0aGlzLmFjdGl2ZVRhYkVsID0gdGFiKS5hY3RpdmUgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGNsb3NlKGlkLCBmb3JjZSA9IGZhbHNlKSB7XG4gICAgbGV0IHRhYiA9IF8uZmluZCh0aGlzLnRhYnMsIFsnaWQnLCBpZF0pO1xuICAgIGlmICh0YWIpIGZvcmNlID8gdGhpcy5kb0Nsb3NlKHRhYikgOiB0aGlzLmNsb3NlVGFiKHRhYik7XG4gIH1cblxuICBwcml2YXRlIGNsb3NlVGFiKHRhYikge1xuICAgIHRhYi5jYW5EZWFjdGl2YXRlKClcbiAgICAgIC50aGVuKGIgPT4ge1xuICAgICAgICBpZiAoYiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGFiLmJlZm9yZWNsb3NlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGxldCByZXQgPSB0YWIuYmVmb3JlY2xvc2UodGFiKTtcbiAgICAgICAgICAgIGlmIChyZXQgaW5zdGFuY2VvZiBQcm9taXNlKSByZXQudGhlbihiID0+IHtcbiAgICAgICAgICAgICAgaWYgKGIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0Nsb3NlKHRhYik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxzZSBpZiAocmV0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICB0aGlzLmRvQ2xvc2UodGFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoVUlFdmVudC5maXJlRXZlbnQoJ2JlZm9yZWNsb3NlJywgdGFiLmVsZW1lbnQsIHRhYikgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmRvQ2xvc2UodGFiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG4gIHByaXZhdGUgZG9DbG9zZSh0YWIpIHtcbiAgICBfLnJlbW92ZSh0aGlzLnRhYnMsIFsnaWQnLCB0YWIuaWRdKTtcbiAgICBpZiAodGhpcy50YWJzLmxlbmd0aCA+IDAgJiYgXy5maW5kKHRoaXMudGFicywgWydhY3RpdmUnLCB0cnVlXSkgPT0gbnVsbClcbiAgICAgIHRoaXMuYWN0aXZhdGVUYWIoXy5maW5kTGFzdCh0aGlzLnRhYnMsIFsnZGlzYWJsZWQnLCBmYWxzZV0pKTtcbiAgICB0YWIucmVtb3ZlKCk7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ2Nsb3NlZCcsIHRoaXMuZWxlbWVudCwgdGFiKTtcbiAgfVxuXG4gIHByaXZhdGUgYWN0aXZhdGVUYWIobmV3VGFiKSB7XG4gICAgaWYgKHRoaXMuYWN0aXZlVGFiRWwpIHRoaXMuYWN0aXZlVGFiRWwuYWN0aXZlID0gZmFsc2U7XG4gICAgKHRoaXMuYWN0aXZlVGFiRWwgPSBuZXdUYWIpLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSBuZXdUYWIuaWQ7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ2FjdGl2YXRlJywgbmV3VGFiLmVsZW1lbnQsIG5ld1RhYik7XG4gIH1cblxuICBwdWJsaWMgY2FuQWN0aXZhdGUoaWQpIHtcbiAgICBsZXQgdGFiID0gXy5maW5kKHRoaXMudGFicywgWydpZCcsIGlkXSk7XG4gICAgaWYgKHRhYikge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlVGFiRWwpIHRoaXMuYWN0aXZlVGFiRWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAodGhpcy5hY3RpdmVUYWJFbCA9IHRhYikuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGFycmFuZ2UoKSB7XG4gICAgaWYgKCF0aGlzLndyYXBwZXIpIHJldHVybjtcbiAgICB0aGlzLm92ZXJmbG93LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgICBmb3IgKGxldCBpID0gMCwgYyA9IHRoaXMub3ZlcmZsb3dbJ2NoaWxkcmVuJ107IGkgPCBjLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLndyYXBwZXIuaW5zZXJ0QmVmb3JlKGNbaV0sIHRoaXMub3ZlcmZsb3dUb2dnbGUpO1xuICAgIH1cbiAgICAvLyB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5vdmVyZmxvd1RvZ2dsZSk7XG4gICAgaWYgKHRoaXMudGFicy5sZW5ndGggPiAwICYmICh0aGlzLmlzT3ZlcmZsb3cgPSAodGhpcy53cmFwcGVyLmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5vZmZzZXRMZWZ0ICsgdGhpcy53cmFwcGVyLmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5vZmZzZXRXaWR0aCA+IHRoaXMud3JhcHBlci5vZmZzZXRXaWR0aCkpKSB7XG4gICAgICBmb3IgKGxldCBjID0gdGhpcy53cmFwcGVyWydjaGlsZHJlbiddLCBpID0gYy5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoY1tpXS5vZmZzZXRMZWZ0ICsgY1tpXS5vZmZzZXRXaWR0aCA+IHRoaXMud3JhcHBlci5vZmZzZXRXaWR0aCkge1xuICAgICAgICAgIGlmICh0aGlzLm92ZXJmbG93Lmhhc0NoaWxkTm9kZXMpIHRoaXMub3ZlcmZsb3cuaW5zZXJ0QmVmb3JlKGNbaV0sIHRoaXMub3ZlcmZsb3cuY2hpbGROb2Rlc1swXSk7IGVsc2UgdGhpcy5vdmVyZmxvdy5hcHBlbmRDaGlsZChjW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBwcml2YXRlIHNob3dPdmVyZmxvdyhldnQpIHtcbiAgICBpZiAoZXZ0LmJ1dHRvbiAhPSAwKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoIXRoaXMub3ZlcmZsb3cuY2xhc3NMaXN0LmNvbnRhaW5zKCd1aS1vcGVuJykpIHtcbiAgICAgIHRoaXMub3ZlcmZsb3cuY2xhc3NMaXN0LmFkZCgndWktb3BlbicpO1xuICAgICAgdGhpcy50ZXRoZXIucG9zaXRpb24oKTtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgdGhpcy5vdmVyZmxvdy5jbGFzc0xpc3QucmVtb3ZlKCd1aS1vcGVuJyk7XG4gIH1cblxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktdGFiIFxcJHthY3RpdmU/J3VpLWFjdGl2ZSc6Jyd9XCI+PHNsb3Q+PC9zbG90PjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS10YWInKVxuZXhwb3J0IGNsYXNzIFVJVGFiIHtcbiAgc3RhdGljIHNlZWQgPSAwO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZmxleCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWZsZXhlZCcpO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnc2Nyb2xsJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktc2Nyb2xsJyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdwYWRkZWQnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1wYWQtYWxsJyk7XG5cbiAgICB0aGlzLmlkID0gJ3RhYi0nICsgKFVJVGFiLnNlZWQrKyk7XG4gICAgdGhpcy5jbG9zZWFibGUgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY2xvc2VhYmxlJyk7XG4gIH1cblxuICAvLyBhdXJlbGlhIGhvb2tzXG4gIC8vIGNyZWF0ZWQob3duaW5nVmlldzogVmlldywgbXlWaWV3OiBWaWV3KSB7IH1cbiAgYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkge1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkIHx8IHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gIH1cbiAgLy8gYXR0YWNoZWQoKSB7IH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKCkgaWQgPSAnJztcbiAgQGJpbmRhYmxlKCkgZ2x5cGggPSAnJztcbiAgQGJpbmRhYmxlKCkgbGFiZWwgPSAnJztcbiAgQGJpbmRhYmxlKCkgZ2x5cGhDbGFzcyA9ICcnO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBiaW5kYWJsZSgpIGJlZm9yZWNsb3NlOiBhbnk7XG5cbiAgcHVibGljIGFjdGl2ZSA9IGZhbHNlO1xuICBwdWJsaWMgY2xvc2VhYmxlID0gZmFsc2U7XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRyeSB7XG4gICAgICBpZiAodGhpcy52aWV3TW9kZWwpIHRoaXMudmlld01vZGVsLmRldGFjaGVkKCk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgRE9NLnJlbW92ZU5vZGUodGhpcy5lbGVtZW50KTtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMudmlld01vZGVsKSB0aGlzLnZpZXdNb2RlbC51bmJpbmQoKTtcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfVxuXG4gIGNhbkRlYWN0aXZhdGUoKSB7XG4gICAgbGV0IGluc3RhbmNlID0gdGhpcy52aWV3TW9kZWw7XG4gICAgaWYgKGluc3RhbmNlICYmIHR5cGVvZiBpbnN0YW5jZS5jYW5EZWFjdGl2YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsZXQgcmVzdWx0ID0gaW5zdGFuY2UuY2FuRGVhY3RpdmF0ZSgpO1xuICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgfVxuXG4gIGdldCB2aWV3TW9kZWwoKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCAmJiB0aGlzLmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09ICdjb21wb3NlJylcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQuYXUuY29tcG9zZS52aWV3TW9kZWwuY3VycmVudFZpZXdNb2RlbDtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
