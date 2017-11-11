var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIOptionGroup = (function () {
        function UIOptionGroup(element) {
            this.element = element;
            this.value = '';
            this.name = '';
            this.cols = 'auto';
            if (element.hasAttribute('vertical'))
                element.classList.add('ui-vertical');
            this.name = "ui-optgroup-" + (UIOptionGroup_1.seed++);
        }
        UIOptionGroup_1 = UIOptionGroup;
        UIOptionGroup.prototype.bind = function (bindingContext, overrideContext) {
            this.valueChanged(this.value);
        };
        UIOptionGroup.prototype.attached = function () {
            var els = this.element.querySelectorAll('input[type="radio"]');
            for (var i = 0; i < els.length; i++)
                els[i]['name'] = this.name;
        };
        UIOptionGroup.prototype.valueChanged = function (newValue) {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var opt = _this.element.querySelector("input[value=\"" + newValue + "\"]");
                if (opt != null)
                    opt['checked'] = true;
            });
        };
        UIOptionGroup.prototype.changed = function ($event) {
            this.value = $event.detail;
        };
        UIOptionGroup.seed = 1;
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIOptionGroup.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIOptionGroup.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIOptionGroup.prototype, "cols", void 0);
        UIOptionGroup = UIOptionGroup_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-input-group ui-option-group cols-\${cols}"><slot name="inputLabel"></slot><div class="ui-group-wrapper" change.trigger="changed($event)"><slot></slot></div></template>'),
            aurelia_framework_1.customElement('ui-option-group'),
            __metadata("design:paramtypes", [Element])
        ], UIOptionGroup);
        return UIOptionGroup;
        var UIOptionGroup_1;
    }());
    exports.UIOptionGroup = UIOptionGroup;
    var UICheckbox = (function () {
        function UICheckbox(element) {
            this.element = element;
            this.checked = false;
            this.disabled = false;
            this.for = '';
            this.isDisabled = false;
            this.for = 'ui-checkbox-' + (UICheckbox_1.seed++);
        }
        UICheckbox_1 = UICheckbox;
        UICheckbox.prototype.bind = function (bindingContext, overrideContext) {
            this.disabledChanged(this.disabled);
            this.checked = this.checked || this.element.hasAttribute('checked');
        };
        UICheckbox.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UICheckbox.prototype.disabledChanged = function (newValue) {
            this.disable(this.disabled = !!newValue);
        };
        UICheckbox.seed = 1;
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UICheckbox.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICheckbox.prototype, "disabled", void 0);
        UICheckbox = UICheckbox_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-option ui-checkbox\"><input type=\"checkbox\" id.bind=\"for\" disabled.bind=\"disabled\" checked.bind=\"checked\"/>\n  <ui-glyph glyph.bind=\"checked?'glyph-check-on':'glyph-check-off'\"></ui-glyph>\n  <label for.bind=\"for\" class=\"ui-option-label\"><slot></slot></label></template>"),
            aurelia_framework_1.customElement('ui-checkbox'),
            __metadata("design:paramtypes", [Element])
        ], UICheckbox);
        return UICheckbox;
        var UICheckbox_1;
    }());
    exports.UICheckbox = UICheckbox;
    var UIRadio = (function () {
        function UIRadio(element) {
            this.element = element;
            this.checked = false;
            this.name = '';
            this.value = '';
            this.disabled = false;
            this.for = '';
            this.isDisabled = false;
            this.for = 'ui-radio-' + (UIRadio_1.seed++);
        }
        UIRadio_1 = UIRadio;
        UIRadio.prototype.bind = function (bindingContext, overrideContext) {
            this.disabledChanged(this.disabled);
        };
        UIRadio.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UIRadio.prototype.disabledChanged = function (newValue) {
            this.disable(this.disabled = !!newValue);
        };
        UIRadio.prototype.changed = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            return ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIRadio.seed = 1;
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "disabled", void 0);
        UIRadio = UIRadio_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-option ui-radio\"><input type=\"radio\" name=\"${name}\" id.bind=\"for\" value.bind=\"value\"\n  disabled.bind=\"disabled\" checked.bind=\"checked\" change.trigger=\"changed($event)\"/>\n  <ui-glyph class=\"off\" glyph=\"glyph-radio-off\"></ui-glyph><ui-glyph class=\"on\" glyph=\"glyph-radio-on\"></ui-glyph>\n  <label for.bind=\"for\" class=\"ui-option-label\"><slot></slot></label></template>"),
            aurelia_framework_1.customElement('ui-radio'),
            __metadata("design:paramtypes", [Element])
        ], UIRadio);
        return UIRadio;
        var UIRadio_1;
    }());
    exports.UIRadio = UIRadio;
    var UISwitch = (function () {
        function UISwitch(element) {
            this.element = element;
            this.checked = false;
            this.value = '';
            this.size = 'auto';
            this.class = '';
            this.onLabel = 'on';
            this.offLabel = 'off';
            this.onValue = true;
            this.offValue = false;
            this.disabled = false;
            this.for = '';
            this.isDisabled = false;
            this.for = 'ui-switch-' + (UISwitch_1.seed++);
        }
        UISwitch_1 = UISwitch;
        UISwitch.prototype.bind = function (bindingContext, overrideContext) {
            this.checked = this.checked || this.element.hasAttribute('checked') || (this.value == this.onValue);
            this.value = !!(this.checked) ? this.onValue : this.offValue;
            this.disabledChanged(this.disabled);
        };
        UISwitch.prototype.checkedChanged = function (newValue) {
            this.value = newValue ? this.onValue : this.offValue;
        };
        UISwitch.prototype.valueChanged = function (newValue) {
            this.checked = newValue === this.onValue;
        };
        UISwitch.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UISwitch.prototype.disabledChanged = function (newValue) {
            this.disable(this.disabled = !!newValue);
        };
        UISwitch.prototype.fireChange = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            this.value = this.checked ? this.onValue : this.offValue;
            return ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UISwitch.seed = 1;
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "onLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "offLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "onValue", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "offValue", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "disabled", void 0);
        UISwitch = UISwitch_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-option ui-switch-control\">\n<div class=\"ui-switch\" css.bind=\"{width: size}\">\n  <input class=\"ui-switch-input\" type=\"checkbox\" id.bind=\"for\" disabled.bind=\"disabled\" checked.bind=\"checked\" change.trigger=\"fireChange($event)\"/>\n  <label class=\"ui-switch-inner\" for.bind=\"for\" data-on=\"${onLabel}\" data-off=\"${offLabel}\"></label>\n  <div class=\"ui-switch-handle\"></div>\n</div><label class=\"ui-option-label\" for.bind=\"for\"><slot></slot></label>\n</template>"),
            aurelia_framework_1.customElement('ui-switch'),
            __metadata("design:paramtypes", [Element])
        ], UISwitch);
        return UISwitch;
        var UISwitch_1;
    }());
    exports.UISwitch = UISwitch;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVdBO1FBQ0UsdUJBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFrQm1CLFVBQUssR0FBUSxFQUFFLENBQUM7WUFFMUQsU0FBSSxHQUFHLEVBQUUsQ0FBQztZQUNWLFNBQUksR0FBRyxNQUFNLENBQUM7WUFwQnhCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLElBQUksR0FBRyxjQUFjLEdBQUcsQ0FBQyxlQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDOzBCQUpVLGFBQWE7UUFReEIsNEJBQUksR0FBSixVQUFLLGNBQXNCLEVBQUUsZUFBdUI7WUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELGdDQUFRLEdBQVI7WUFDRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDL0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtnQkFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNqRSxDQUFDO1FBWUQsb0NBQVksR0FBWixVQUFhLFFBQVE7WUFBckIsaUJBS0M7WUFKQyxrQkFBTyxDQUFDLFNBQVMsQ0FBQztnQkFDaEIsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsbUJBQWdCLFFBQVEsUUFB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QUUsK0JBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7aURBQXNCO1FBQ3JCO1lBQXJELDRCQUFRLENBQUMsRUFBRSxrQkFBa0IsRUFBRSwrQkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDOzsrQ0FBaUI7UUFFMUQ7WUFBWCw0QkFBUSxFQUFFOzs4Q0FBZTtRQUNkO1lBQVgsNEJBQVEsRUFBRTs7K0NBQVk7UUFDWDtZQUFYLDRCQUFRLEVBQUU7O2lEQUFnQjtRQUNmO1lBQVgsNEJBQVEsRUFBRTs7a0RBQWtCO1FBQ2pCO1lBQVgsNEJBQVEsRUFBRTs7aURBQWdCO1FBQ2Y7WUFBWCw0QkFBUSxFQUFFOztrREFBa0I7UUFDakI7WUFBWCw0QkFBUSxFQUFFOztrREFBa0I7UUFwQmxCLFFBQVE7WUFUcEIsOEJBQVUsRUFBRTtZQUNaLDhCQUFVLENBQUMsOGZBTUEsQ0FBQztZQUNaLGlDQUFhLENBQUMsV0FBVyxDQUFDOzZDQUVHLE9BQU87V0FEeEIsUUFBUSxDQThDcEI7UUFBRCxlQUFDOztLQTlDRCxBQThDQyxJQUFBO0lBOUNZLDRCQUFRIiwiZmlsZSI6ImVsZW1lbnRzL2lucHV0cy91aS1vcHRpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGJpbmRpbmdNb2RlLCBpbmxpbmVWaWV3IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gXCIuLi8uLi91dGlscy91aS1ldmVudFwiO1xuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldygnPHRlbXBsYXRlIGNsYXNzPVwidWktaW5wdXQtZ3JvdXAgdWktb3B0aW9uLWdyb3VwIGNvbHMtXFwke2NvbHN9XCI+PHNsb3QgbmFtZT1cImlucHV0TGFiZWxcIj48L3Nsb3Q+PGRpdiBjbGFzcz1cInVpLWdyb3VwLXdyYXBwZXJcIiBjaGFuZ2UudHJpZ2dlcj1cImNoYW5nZWQoJGV2ZW50KVwiPjxzbG90Pjwvc2xvdD48L2Rpdj48L3RlbXBsYXRlPicpXG5AY3VzdG9tRWxlbWVudCgndWktb3B0aW9uLWdyb3VwJylcbmV4cG9ydCBjbGFzcyBVSU9wdGlvbkdyb3VwIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3ZlcnRpY2FsJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktdmVydGljYWwnKTtcbiAgICB0aGlzLm5hbWUgPSBcInVpLW9wdGdyb3VwLVwiICsgKFVJT3B0aW9uR3JvdXAuc2VlZCsrKTtcbiAgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgdGhpcy52YWx1ZUNoYW5nZWQodGhpcy52YWx1ZSk7XG4gIH1cbiAgYXR0YWNoZWQoKSB7XG4gICAgbGV0IGVscyA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwicmFkaW9cIl0nKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkrKyllbHNbaV1bJ25hbWUnXSA9IHRoaXMubmFtZTtcbiAgfVxuICAvLyBkZXRhY2hlZCgpIHsgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSB2YWx1ZTogYW55ID0gJyc7XG5cbiAgQGJpbmRhYmxlKCkgbmFtZSA9ICcnO1xuICBAYmluZGFibGUoKSBjb2xzID0gJ2F1dG8nO1xuXG4gIHN0YXRpYyBzZWVkID0gMTtcblxuICB2YWx1ZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiB7XG4gICAgICBsZXQgb3B0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0W3ZhbHVlPVwiJHtuZXdWYWx1ZX1cIl1gKTtcbiAgICAgIGlmIChvcHQgIT0gbnVsbCkgb3B0WydjaGVja2VkJ10gPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlZCgkZXZlbnQpIHtcbiAgICB0aGlzLnZhbHVlID0gJGV2ZW50LmRldGFpbDtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktb3B0aW9uIHVpLWNoZWNrYm94XCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkLmJpbmQ9XCJmb3JcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZWRcIiBjaGVja2VkLmJpbmQ9XCJjaGVja2VkXCIvPlxuICA8dWktZ2x5cGggZ2x5cGguYmluZD1cImNoZWNrZWQ/J2dseXBoLWNoZWNrLW9uJzonZ2x5cGgtY2hlY2stb2ZmJ1wiPjwvdWktZ2x5cGg+XG4gIDxsYWJlbCBmb3IuYmluZD1cImZvclwiIGNsYXNzPVwidWktb3B0aW9uLWxhYmVsXCI+PHNsb3Q+PC9zbG90PjwvbGFiZWw+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWNoZWNrYm94JylcbmV4cG9ydCBjbGFzcyBVSUNoZWNrYm94IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICB0aGlzLmZvciA9ICd1aS1jaGVja2JveC0nICsgKFVJQ2hlY2tib3guc2VlZCsrKTtcbiAgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgdGhpcy5kaXNhYmxlZENoYW5nZWQodGhpcy5kaXNhYmxlZCk7XG4gICAgdGhpcy5jaGVja2VkID0gdGhpcy5jaGVja2VkIHx8IHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgfVxuICAvLyBhdHRhY2hlZCgpIHsgfVxuICAvLyBkZXRhY2hlZCgpIHsgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSBjaGVja2VkID0gZmFsc2U7XG5cbiAgQGJpbmRhYmxlKCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBzdGF0aWMgc2VlZCA9IDE7XG4gIHByaXZhdGUgZm9yID0gJyc7XG4gIGlzRGlzYWJsZWQgPSBmYWxzZTtcblxuICBkaXNhYmxlKGIpIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0Wyh0aGlzLmlzRGlzYWJsZWQgPSAoYiB8fCB0aGlzLmRpc2FibGVkKSkgPyAnYWRkJyA6ICdyZW1vdmUnXSgndWktZGlzYWJsZWQnKTtcbiAgfVxuICBkaXNhYmxlZENoYW5nZWQobmV3VmFsdWUpIHtcbiAgICB0aGlzLmRpc2FibGUodGhpcy5kaXNhYmxlZCA9ICEhbmV3VmFsdWUpO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1vcHRpb24gdWktcmFkaW9cIj48aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cIlxcJHtuYW1lfVwiIGlkLmJpbmQ9XCJmb3JcIiB2YWx1ZS5iaW5kPVwidmFsdWVcIlxuICBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZWRcIiBjaGVja2VkLmJpbmQ9XCJjaGVja2VkXCIgY2hhbmdlLnRyaWdnZXI9XCJjaGFuZ2VkKCRldmVudClcIi8+XG4gIDx1aS1nbHlwaCBjbGFzcz1cIm9mZlwiIGdseXBoPVwiZ2x5cGgtcmFkaW8tb2ZmXCI+PC91aS1nbHlwaD48dWktZ2x5cGggY2xhc3M9XCJvblwiIGdseXBoPVwiZ2x5cGgtcmFkaW8tb25cIj48L3VpLWdseXBoPlxuICA8bGFiZWwgZm9yLmJpbmQ9XCJmb3JcIiBjbGFzcz1cInVpLW9wdGlvbi1sYWJlbFwiPjxzbG90Pjwvc2xvdD48L2xhYmVsPjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1yYWRpbycpXG5leHBvcnQgY2xhc3MgVUlSYWRpbyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7IHRoaXMuZm9yID0gJ3VpLXJhZGlvLScgKyAoVUlSYWRpby5zZWVkKyspOyB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICB0aGlzLmRpc2FibGVkQ2hhbmdlZCh0aGlzLmRpc2FibGVkKTtcbiAgfVxuICAvLyBhdHRhY2hlZCgpIHsgfVxuICAvLyBkZXRhY2hlZCgpIHsgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSBjaGVja2VkID0gZmFsc2U7XG5cbiAgQGJpbmRhYmxlKCkgbmFtZSA9ICcnO1xuICBAYmluZGFibGUoKSB2YWx1ZSA9ICcnO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHN0YXRpYyBzZWVkID0gMTtcbiAgcHJpdmF0ZSBmb3IgPSAnJztcbiAgaXNEaXNhYmxlZCA9IGZhbHNlO1xuXG4gIGRpc2FibGUoYikge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3RbKHRoaXMuaXNEaXNhYmxlZCA9IChiIHx8IHRoaXMuZGlzYWJsZWQpKSA/ICdhZGQnIDogJ3JlbW92ZSddKCd1aS1kaXNhYmxlZCcpO1xuICB9XG4gIGRpc2FibGVkQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMuZGlzYWJsZSh0aGlzLmRpc2FibGVkID0gISFuZXdWYWx1ZSk7XG4gIH1cblxuICBjaGFuZ2VkKCRldmVudCkge1xuICAgICRldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICByZXR1cm4gVUlFdmVudC5maXJlRXZlbnQoJ2NoYW5nZScsIHRoaXMuZWxlbWVudCwgdGhpcy52YWx1ZSk7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLW9wdGlvbiB1aS1zd2l0Y2gtY29udHJvbFwiPlxuPGRpdiBjbGFzcz1cInVpLXN3aXRjaFwiIGNzcy5iaW5kPVwie3dpZHRoOiBzaXplfVwiPlxuICA8aW5wdXQgY2xhc3M9XCJ1aS1zd2l0Y2gtaW5wdXRcIiB0eXBlPVwiY2hlY2tib3hcIiBpZC5iaW5kPVwiZm9yXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVkXCIgY2hlY2tlZC5iaW5kPVwiY2hlY2tlZFwiIGNoYW5nZS50cmlnZ2VyPVwiZmlyZUNoYW5nZSgkZXZlbnQpXCIvPlxuICA8bGFiZWwgY2xhc3M9XCJ1aS1zd2l0Y2gtaW5uZXJcIiBmb3IuYmluZD1cImZvclwiIGRhdGEtb249XCJcXCR7b25MYWJlbH1cIiBkYXRhLW9mZj1cIlxcJHtvZmZMYWJlbH1cIj48L2xhYmVsPlxuICA8ZGl2IGNsYXNzPVwidWktc3dpdGNoLWhhbmRsZVwiPjwvZGl2PlxuPC9kaXY+PGxhYmVsIGNsYXNzPVwidWktb3B0aW9uLWxhYmVsXCIgZm9yLmJpbmQ9XCJmb3JcIj48c2xvdD48L3Nsb3Q+PC9sYWJlbD5cbjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1zd2l0Y2gnKVxuZXhwb3J0IGNsYXNzIFVJU3dpdGNoIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICB0aGlzLmZvciA9ICd1aS1zd2l0Y2gtJyArIChVSVN3aXRjaC5zZWVkKyspO1xuICB9XG5cbiAgYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkge1xuICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZCB8fCB0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdjaGVja2VkJykgfHwgKHRoaXMudmFsdWUgPT0gdGhpcy5vblZhbHVlKTtcbiAgICB0aGlzLnZhbHVlID0gISEodGhpcy5jaGVja2VkKSA/IHRoaXMub25WYWx1ZSA6IHRoaXMub2ZmVmFsdWU7XG4gICAgdGhpcy5kaXNhYmxlZENoYW5nZWQodGhpcy5kaXNhYmxlZCk7XG4gIH1cblxuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSBjaGVja2VkOiBhbnkgPSBmYWxzZTtcbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgdmFsdWU6IGFueSA9ICcnO1xuXG4gIEBiaW5kYWJsZSgpIHNpemUgPSAnYXV0byc7XG4gIEBiaW5kYWJsZSgpIGNsYXNzID0gJyc7XG4gIEBiaW5kYWJsZSgpIG9uTGFiZWwgPSAnb24nO1xuICBAYmluZGFibGUoKSBvZmZMYWJlbCA9ICdvZmYnO1xuICBAYmluZGFibGUoKSBvblZhbHVlID0gdHJ1ZTtcbiAgQGJpbmRhYmxlKCkgb2ZmVmFsdWUgPSBmYWxzZTtcbiAgQGJpbmRhYmxlKCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBzdGF0aWMgc2VlZCA9IDE7XG4gIHByaXZhdGUgZm9yID0gJyc7XG4gIGlzRGlzYWJsZWQgPSBmYWxzZTtcblxuICBjaGVja2VkQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZSA/IHRoaXMub25WYWx1ZSA6IHRoaXMub2ZmVmFsdWU7XG4gIH1cbiAgdmFsdWVDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5jaGVja2VkID0gbmV3VmFsdWUgPT09IHRoaXMub25WYWx1ZTtcbiAgfVxuXG4gIGRpc2FibGUoYikge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3RbKHRoaXMuaXNEaXNhYmxlZCA9IChiIHx8IHRoaXMuZGlzYWJsZWQpKSA/ICdhZGQnIDogJ3JlbW92ZSddKCd1aS1kaXNhYmxlZCcpO1xuICB9XG4gIGRpc2FibGVkQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMuZGlzYWJsZSh0aGlzLmRpc2FibGVkID0gISFuZXdWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGZpcmVDaGFuZ2UoJGV2ZW50KSB7XG4gICAgJGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmNoZWNrZWQgPyB0aGlzLm9uVmFsdWUgOiB0aGlzLm9mZlZhbHVlO1xuICAgIHJldHVybiBVSUV2ZW50LmZpcmVFdmVudCgnY2hhbmdlJywgdGhpcy5lbGVtZW50LCB0aGlzLnZhbHVlKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
