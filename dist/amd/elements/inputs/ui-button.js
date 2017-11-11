var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIButton = (function () {
        function UIButton(element) {
            this.element = element;
            this.glyph = '';
            this.label = '';
            this.value = '';
            this.width = 'auto';
            this.splitTheme = '';
            this.splitGlyph = 'glyph-caret-down';
            this.busy = false;
            this.disabled = false;
            this.hasLabel = true;
            this.split = false;
            this.isDisabled = false;
            if (this.element.hasAttribute('icon-top'))
                this.element.classList.add('ui-icon-top');
            if (this.element.hasAttribute('icon-end'))
                this.element.classList.add('ui-icon-end');
            else
                this.element.classList.add('ui-icon-start');
            if (this.element.hasAttribute('icon-hilight'))
                this.element.classList.add('ui-icon-hilight');
            if (this.element.hasAttribute('xlarge'))
                this.element.classList.add('ui-size-xl');
            if (this.element.hasAttribute('large'))
                this.element.classList.add('ui-size-lg');
            if (this.element.hasAttribute('small'))
                this.element.classList.add('ui-size-sm');
            this.split = this.element.hasAttribute('split');
        }
        UIButton.prototype.bind = function (bindingContext, overrideContext) {
            if (this.form)
                this.dropdown = this.form;
        };
        UIButton.prototype.attached = function () {
            var _this = this;
            this.hasLabel = !!(this.label || this.labelEl.childNodes[0].length);
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-button') == _this.element)
                        return;
                    if (_this.form && getParentByClass(evt.target, 'ui-floating') == _this.dropdown)
                        return;
                    _this.hideDropdown();
                });
                this.element.classList.add('ui-btn-dropdown');
                this.dropdown.classList.add('ui-floating');
                this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown, { position: this.split ? 'br' : 'bl' });
            }
        };
        UIButton.prototype.detached = function () {
            if (this.tether)
                this.tether.dispose();
            if (this.obMouseup)
                this.obMouseup.dispose();
            if (this.dropdown)
                aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UIButton.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UIButton.prototype.disabledChanged = function (newValue) {
            this.disable(this.disabled = !!newValue);
        };
        UIButton.prototype.hideDropdown = function () {
            this.element.classList.remove('ui-open');
            this.dropdown.classList.remove('ui-open');
            return true;
        };
        UIButton.prototype.toggleDropdown = function (evt, isSplit) {
            if (this.split && !isSplit)
                return this.hideDropdown();
            if (evt.button != 0)
                return true;
            if (this.dropdown) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.cancelBubble = true;
                if (this.element.classList.contains('ui-open')) {
                    ui_event_1.UIEvent.fireEvent('menuhide', this.element);
                    this.hideDropdown();
                }
                else {
                    if (ui_event_1.UIEvent.fireEvent('menuopen', this.element) !== false) {
                        this.element.classList.add('ui-open');
                        this.dropdown.classList.add('ui-open');
                        if (this.form && this.form.focus)
                            this.form.focus();
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
        ], UIButton.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "splitTheme", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "splitGlyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "form", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "busy", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "disabled", void 0);
        UIButton = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-button ${busy?'ui-busy':''}\" css.bind=\"{width: width}\">\n  <a role=\"button\" tabindex=\"-1\" class=\"ui-button-el\" click.trigger=\"toggleDropdown($event, false)\" data-value=\"${value}\" ref=\"buttonEl\">\n    <div class=\"ui-busy-icon\"><ui-glyph glyph=\"glyph-busy\" class=\"ui-anim-busy\"></ui-glyph></div>\n    <div class=\"ui-button-icon\" if.bind=\"glyph\"><ui-glyph glyph.bind=\"glyph\"></ui-glyph></div>\n    <div class=\"ui-button-label\" ref=\"labelEl\" show.bind=\"hasLabel\"><slot>${label}</slot></div>\n    <div class=\"ui-button-caret\" if.bind=\"!split && !form && dropdown\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></div>\n  </a>\n  <a role=\"button\" tabindex=\"-1\" class=\"ui-button-el ui-${splitTheme}\" if.bind=\"split\" click.trigger=\"toggleDropdown($event, true)\">\n    <div class=\"ui-button-splitter\"></div>\n    <div class=\"ui-button-caret\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></div>\n  </a>\n</template>"),
            aurelia_framework_1.customElement('ui-button'),
            __metadata("design:paramtypes", [Element])
        ], UIButton);
        return UIButton;
    }());
    exports.UIButton = UIButton;
    var UIButtonGroup = (function () {
        function UIButtonGroup(element) {
            this.element = element;
            this.buttons = [];
            this.value = '';
            this.separator = '';
            this.disabled = false;
            this.size = '';
            if (this.element.hasAttribute('vertical'))
                this.element.classList.add('ui-vertical');
            else
                this.element.classList.add('ui-horizontal');
            if (this.element.hasAttribute('toggle'))
                this.element.classList.add('ui-toggle');
            if (this.element.hasAttribute('separator'))
                this.element.classList.add('ui-has-separator');
            if (this.element.hasAttribute('small'))
                this.size = 'ui-size-sm';
            if (this.element.hasAttribute('large'))
                this.size = 'ui-size-lg';
            if (this.element.hasAttribute('xlarge'))
                this.size = 'ui-size-xl';
        }
        UIButtonGroup.prototype.attached = function () {
            this.buttonsChanged();
        };
        UIButtonGroup.prototype.buttonsChanged = function () {
            var _this = this;
            this.valueChanged(this.value);
            if (this.size)
                this.buttons.forEach(function (b) { return b.element.classList.add(_this.size); });
            if (this.separator)
                this.buttons.forEach(function (b) { return b.element.dataset.separator = _this.separator; });
        };
        UIButtonGroup.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (this.active)
                this.active.element.classList.remove('ui-active');
            if (this.buttons.length > 0 && (this.active = _.find(this.buttons, function (b) { return b.value === _this.value; })))
                this.active.element.classList.add('ui-active');
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIButtonGroup.prototype.clickEvent = function (evt) {
            if (evt.target.dataset['value'])
                this.value = evt.target.dataset['value'];
        };
        __decorate([
            aurelia_framework_1.children('ui-button'),
            __metadata("design:type", Object)
        ], UIButtonGroup.prototype, "buttons", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIButtonGroup.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButtonGroup.prototype, "separator", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButtonGroup.prototype, "disabled", void 0);
        UIButtonGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-button-group ${disabled?'ui-disabled':''}\" click.trigger=\"clickEvent($event)\" data-separator.bind=\"separator\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-button-group'),
            __metadata("design:paramtypes", [Element])
        ], UIButtonGroup);
        return UIButtonGroup;
    }());
    exports.UIButtonGroup = UIButtonGroup;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBd0JBO1FBQ0Usa0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFvQ3ZCLFVBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLFVBQUssR0FBRyxNQUFNLENBQUM7WUFDZixlQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLGVBQVUsR0FBRyxrQkFBa0IsQ0FBQztZQUdoQyxTQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2IsYUFBUSxHQUFHLEtBQUssQ0FBQztZQUlyQixhQUFRLEdBQUcsSUFBSSxDQUFDO1lBS3hCLFVBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxlQUFVLEdBQUcsS0FBSyxDQUFDO1lBdERqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3JGLElBQUk7Z0JBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRTdGLEVBQUUsQ0FBQyxDQUFD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SSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUksQ0FBQyxLQUFLLEVBQXRCLENBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUN0RyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRWpELGtCQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQsa0NBQVUsR0FBVixVQUFXLEdBQUc7WUFDWixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUF2QnNCO1lBQXRCLDRCQUFRLENBQUMsV0FBVyxDQUFDOztzREFBYztRQUNrQjtZQUFyRCw0QkFBUSxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsK0JBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7b0RBQVk7UUFDckQ7WUFBWCw0QkFBUSxFQUFFOzt3REFBZ0I7UUFDZjtZQUFYLDRCQUFRLEVBQUU7O3VEQUFrQjtRQXBCbEIsYUFBYTtZQUh6Qiw4QkFBVSxFQUFFO1lBQ1osOEJBQVUsQ0FBQyxrS0FBNkosQ0FBQztZQUN6SyxpQ0FBYSxDQUFDLGlCQUFpQixDQUFDOzZDQUVILE9BQU87V0FEeEIsYUFBYSxDQXlDekI7UUFBRCxvQkFBQztLQXpDRCxBQXlDQyxJQUFBO0lBekNZLHNDQUFhIiwiZmlsZSI6ImVsZW1lbnRzL2lucHV0cy91aS1idXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgYmluZGluZ01vZGUsIGNoaWxkcmVuLCBpbmxpbmVWaWV3LCBET00gfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLWV2ZW50XCI7XG5pbXBvcnQgeyBVSVV0aWxzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLXV0aWxzXCI7XG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLWJ1dHRvbiBcXCR7YnVzeT8ndWktYnVzeSc6Jyd9XCIgY3NzLmJpbmQ9XCJ7d2lkdGg6IHdpZHRofVwiPlxuICA8YSByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwidWktYnV0dG9uLWVsXCIgY2xpY2sudHJpZ2dlcj1cInRvZ2dsZURyb3Bkb3duKCRldmVudCwgZmFsc2UpXCIgZGF0YS12YWx1ZT1cIlxcJHt2YWx1ZX1cIiByZWY9XCJidXR0b25FbFwiPlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1idXN5LWljb25cIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1idXN5XCIgY2xhc3M9XCJ1aS1hbmltLWJ1c3lcIj48L3VpLWdseXBoPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1idXR0b24taWNvblwiIGlmLmJpbmQ9XCJnbHlwaFwiPjx1aS1nbHlwaCBnbHlwaC5iaW5kPVwiZ2x5cGhcIj48L3VpLWdseXBoPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1idXR0b24tbGFiZWxcIiByZWY9XCJsYWJlbEVsXCIgc2hvdy5iaW5kPVwiaGFzTGFiZWxcIj48c2xvdD5cXCR7bGFiZWx9PC9zbG90PjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1idXR0b24tY2FyZXRcIiBpZi5iaW5kPVwiIXNwbGl0ICYmICFmb3JtICYmIGRyb3Bkb3duXCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtY2hldnJvbi1kb3duXCI+PC91aS1nbHlwaD48L2Rpdj5cbiAgPC9hPlxuICA8YSByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwidWktYnV0dG9uLWVsIHVpLVxcJHtzcGxpdFRoZW1lfVwiIGlmLmJpbmQ9XCJzcGxpdFwiIGNsaWNrLnRyaWdnZXI9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQsIHRydWUpXCI+XG4gICAgPGRpdiBjbGFzcz1cInVpLWJ1dHRvbi1zcGxpdHRlclwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1idXR0b24tY2FyZXRcIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1jaGV2cm9uLWRvd25cIj48L3VpLWdseXBoPjwvZGl2PlxuICA8L2E+XG48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktYnV0dG9uJylcbmV4cG9ydCBjbGFzcyBVSUJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2ljb24tdG9wJykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1pY29uLXRvcCcpO1xuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdpY29uLWVuZCcpKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktaWNvbi1lbmQnKTtcbiAgICBlbHNlIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1pY29uLXN0YXJ0Jyk7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2ljb24taGlsaWdodCcpKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktaWNvbi1oaWxpZ2h0Jyk7XG5cbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgneGxhcmdlJykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zaXplLXhsJyk7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2xhcmdlJykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zaXplLWxnJyk7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3NtYWxsJykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zaXplLXNtJyk7XG5cbiAgICB0aGlzLnNwbGl0ID0gdGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgnc3BsaXQnKTtcbiAgfVxuXG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICBpZiAodGhpcy5mb3JtKSB0aGlzLmRyb3Bkb3duID0gdGhpcy5mb3JtO1xuICB9XG4gIGF0dGFjaGVkKCkge1xuICAgIHRoaXMuaGFzTGFiZWwgPSAhISh0aGlzLmxhYmVsIHx8IHRoaXMubGFiZWxFbC5jaGlsZE5vZGVzWzBdLmxlbmd0aCk7XG5cbiAgICBpZiAodGhpcy5kcm9wZG93bikge1xuICAgICAgdGhpcy5vYk1vdXNldXAgPSBVSUV2ZW50LnN1YnNjcmliZSgnbW91c2VjbGljaycsIChldnQpID0+IHtcbiAgICAgICAgaWYgKGdldFBhcmVudEJ5Q2xhc3MoZXZ0LnRhcmdldCwgJ3VpLWJ1dHRvbicpID09IHRoaXMuZWxlbWVudCkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5mb3JtICYmIGdldFBhcmVudEJ5Q2xhc3MoZXZ0LnRhcmdldCwgJ3VpLWZsb2F0aW5nJykgPT0gdGhpcy5kcm9wZG93bikgcmV0dXJuO1xuICAgICAgICB0aGlzLmhpZGVEcm9wZG93bigpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktYnRuLWRyb3Bkb3duJyk7XG4gICAgICB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ3VpLWZsb2F0aW5nJyk7XG4gICAgICB0aGlzLnRldGhlciA9IFVJVXRpbHMudGV0aGVyKHRoaXMuZWxlbWVudCwgdGhpcy5kcm9wZG93biwgeyBwb3NpdGlvbjogdGhpcy5zcGxpdCA/ICdicicgOiAnYmwnIH0pO1xuICAgIH1cbiAgfVxuICBkZXRhY2hlZCgpIHtcbiAgICBpZiAodGhpcy50ZXRoZXIpIHRoaXMudGV0aGVyLmRpc3Bvc2UoKTtcbiAgICBpZiAodGhpcy5vYk1vdXNldXApIHRoaXMub2JNb3VzZXVwLmRpc3Bvc2UoKTtcbiAgICBpZiAodGhpcy5kcm9wZG93bikgRE9NLnJlbW92ZU5vZGUodGhpcy5kcm9wZG93bik7XG4gIH1cblxuICBAYmluZGFibGUoKSBnbHlwaCA9ICcnO1xuICBAYmluZGFibGUoKSBsYWJlbCA9ICcnO1xuICBAYmluZGFibGUoKSB2YWx1ZSA9ICcnO1xuICBAYmluZGFibGUoKSB3aWR0aCA9ICdhdXRvJztcbiAgQGJpbmRhYmxlKCkgc3BsaXRUaGVtZSA9ICcnO1xuICBAYmluZGFibGUoKSBzcGxpdEdseXBoID0gJ2dseXBoLWNhcmV0LWRvd24nO1xuICBAYmluZGFibGUoKSBkcm9wZG93bjtcbiAgQGJpbmRhYmxlKCkgZm9ybTtcbiAgQGJpbmRhYmxlKCkgYnVzeSA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHB1YmxpYyBidXR0b25FbDtcbiAgcHJpdmF0ZSBsYWJlbEVsO1xuICBwcml2YXRlIGhhc0xhYmVsID0gdHJ1ZTtcblxuICBwcml2YXRlIHRldGhlcjtcbiAgcHJpdmF0ZSBvYk1vdXNldXA7XG5cbiAgc3BsaXQgPSBmYWxzZTtcbiAgaXNEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIGRpc2FibGUoYikge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3RbKHRoaXMuaXNEaXNhYmxlZCA9IChiIHx8IHRoaXMuZGlzYWJsZWQpKSA/ICdhZGQnIDogJ3JlbW92ZSddKCd1aS1kaXNhYmxlZCcpO1xuICB9XG4gIGRpc2FibGVkQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMuZGlzYWJsZSh0aGlzLmRpc2FibGVkID0gISFuZXdWYWx1ZSk7XG4gIH1cblxuICBoaWRlRHJvcGRvd24oKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgICB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCwgaXNTcGxpdCkge1xuICAgIGlmICh0aGlzLnNwbGl0ICYmICFpc1NwbGl0KSByZXR1cm4gdGhpcy5oaWRlRHJvcGRvd24oKTtcbiAgICBpZiAoZXZ0LmJ1dHRvbiAhPSAwKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodGhpcy5kcm9wZG93bikge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1aS1vcGVuJykpIHtcbiAgICAgICAgVUlFdmVudC5maXJlRXZlbnQoJ21lbnVoaWRlJywgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgdGhpcy5oaWRlRHJvcGRvd24oKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoVUlFdmVudC5maXJlRXZlbnQoJ21lbnVvcGVuJywgdGhpcy5lbGVtZW50KSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktb3BlbicpO1xuICAgICAgICAgIHRoaXMuZHJvcGRvd24uY2xhc3NMaXN0LmFkZCgndWktb3BlbicpO1xuICAgICAgICAgIGlmICh0aGlzLmZvcm0gJiYgdGhpcy5mb3JtLmZvY3VzKSB0aGlzLmZvcm0uZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1idXR0b24tZ3JvdXAgXFwke2Rpc2FibGVkPyd1aS1kaXNhYmxlZCc6Jyd9XCIgY2xpY2sudHJpZ2dlcj1cImNsaWNrRXZlbnQoJGV2ZW50KVwiIGRhdGEtc2VwYXJhdG9yLmJpbmQ9XCJzZXBhcmF0b3JcIj48c2xvdD48L3Nsb3Q+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWJ1dHRvbi1ncm91cCcpXG5leHBvcnQgY2xhc3MgVUlCdXR0b25Hcm91cCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3ZlcnRpY2FsJykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS12ZXJ0aWNhbCcpO1xuICAgIGVsc2UgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWhvcml6b250YWwnKTtcblxuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCd0b2dnbGUnKSkgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXRvZ2dsZScpO1xuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdzZXBhcmF0b3InKSkgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWhhcy1zZXBhcmF0b3InKTtcblxuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdzbWFsbCcpKSB0aGlzLnNpemUgPSAndWktc2l6ZS1zbSc7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2xhcmdlJykpIHRoaXMuc2l6ZSA9ICd1aS1zaXplLWxnJztcbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgneGxhcmdlJykpIHRoaXMuc2l6ZSA9ICd1aS1zaXplLXhsJztcbiAgfVxuXG4gIGF0dGFjaGVkKCkge1xuICAgIHRoaXMuYnV0dG9uc0NoYW5nZWQoKTtcbiAgfVxuXG4gIEBjaGlsZHJlbigndWktYnV0dG9uJykgYnV0dG9ucyA9IFtdO1xuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSB2YWx1ZSA9ICcnO1xuICBAYmluZGFibGUoKSBzZXBhcmF0b3IgPSAnJztcbiAgQGJpbmRhYmxlKCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIHNpemUgPSAnJztcblxuICBidXR0b25zQ2hhbmdlZCgpIHtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlKTtcbiAgICBpZiAodGhpcy5zaXplKSB0aGlzLmJ1dHRvbnMuZm9yRWFjaChiID0+IGIuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuc2l6ZSkpO1xuICAgIGlmICh0aGlzLnNlcGFyYXRvcikgdGhpcy5idXR0b25zLmZvckVhY2goYiA9PiBiLmVsZW1lbnQuZGF0YXNldC5zZXBhcmF0b3IgPSB0aGlzLnNlcGFyYXRvcik7XG4gIH1cbiAgYWN0aXZlO1xuICB2YWx1ZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHRoaXMuYWN0aXZlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndWktYWN0aXZlJyk7XG4gICAgaWYgKHRoaXMuYnV0dG9ucy5sZW5ndGggPiAwICYmICh0aGlzLmFjdGl2ZSA9IF8uZmluZCh0aGlzLmJ1dHRvbnMsIChiOiBhbnkpID0+IGIudmFsdWUgPT09IHRoaXMudmFsdWUpKSlcbiAgICAgIHRoaXMuYWN0aXZlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktYWN0aXZlJyk7XG5cbiAgICBVSUV2ZW50LmZpcmVFdmVudCgnY2hhbmdlJywgdGhpcy5lbGVtZW50LCB0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGNsaWNrRXZlbnQoZXZ0KSB7XG4gICAgaWYgKGV2dC50YXJnZXQuZGF0YXNldFsndmFsdWUnXSkgdGhpcy52YWx1ZSA9IGV2dC50YXJnZXQuZGF0YXNldFsndmFsdWUnXTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
