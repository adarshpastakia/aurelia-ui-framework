var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIForm = (function () {
        function UIForm(element) {
            this.element = element;
            this.class = '';
        }
        UIForm.prototype.attached = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var el = _this.formEl.querySelector('input,textarea');
                if (el !== null)
                    el.focus();
                if (_this.busy)
                    _this.busyChanged(_this.busy);
                if (_this.disabled)
                    _this.disabledChanged(_this.disabled);
            });
        };
        UIForm.prototype.busyChanged = function (newValue) {
            this.disableInputs(!!newValue || this.disabled);
        };
        UIForm.prototype.disabledChanged = function (newValue) {
            this.disableInputs(!!newValue);
        };
        UIForm.prototype.disableInputs = function (newValue) {
            _.forEach(this.inputEls, function (el) {
                try {
                    el.au.controller.viewModel.disable(!!newValue);
                }
                catch (e) {
                }
            });
        };
        UIForm.prototype.fireSubmit = function () {
            if (!this.busy)
                ui_event_1.UIEvent.fireEvent('submit', this.element);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIForm.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Boolean)
        ], UIForm.prototype, "busy", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Boolean)
        ], UIForm.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.children('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list,ui-dropdown'),
            __metadata("design:type", Object)
        ], UIForm.prototype, "inputEls", void 0);
        UIForm = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-form'),
            aurelia_framework_1.inlineView("<template><form class=\"ui-form ${class}\" ref=\"formEl\" validation-renderer=\"ui-validator\" enterpressed.trigger=\"fireSubmit()\" submit.trigger=\"return false\"><slot></slot></form></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIForm);
        return UIForm;
    }());
    exports.UIForm = UIForm;
    var UIFieldset = (function () {
        function UIFieldset(element) {
            this.element = element;
            this.class = '';
            this.legend = '';
            this.checked = true;
            this.collapsible = false;
            this.collapsible = element.hasAttribute('checked') || element.hasAttribute('checked.bind');
        }
        UIFieldset.prototype.bind = function (bindingContext, overrideContext) {
            this.checked = this.checked || this.element.hasAttribute('checked');
        };
        UIFieldset.prototype.attached = function () {
            this.checkedChanged(this.checked);
            if (this.disabled)
                this.disabledChanged(this.disabled);
        };
        UIFieldset.prototype.checkedChanged = function (newValue) {
            this.fieldsetEl.classList[!!newValue ? 'remove' : 'add']('ui-collapse');
            this.disableInputs(!newValue);
        };
        UIFieldset.prototype.disabledChanged = function (newValue) {
            this.disableInputs(!!newValue);
        };
        UIFieldset.prototype.disableInputs = function (newValue) {
            _.forEach(this.inputEls, function (el) {
                try {
                    el.au.controller.viewModel.disable(!!newValue);
                }
                catch (e) {
                }
            });
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIFieldset.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIFieldset.prototype, "legend", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Boolean)
        ], UIFieldset.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIFieldset.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.children('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list,ui-dropdown'),
            __metadata("design:type", Object)
        ], UIFieldset.prototype, "inputEls", void 0);
        UIFieldset = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView('<template><fieldset class="ui-fieldset" ref="fieldsetEl"><legend if.bind="legend"><span if.bind="!collapsible">\${legend}</span><ui-checkbox if.bind="collapsible" checked.bind="checked">\${legend}</ui-checkbox></legend><div><slot></slot></div></fieldset></template>'),
            aurelia_framework_1.customElement('ui-fieldset'),
            __metadata("design:paramtypes", [Element])
        ], UIFieldset);
        return UIFieldset;
    }());
    exports.UIFieldset = UIFieldset;
    var UIInputGroup = (function () {
        function UIInputGroup(element) {
            this.element = element;
            this.width = '15em';
            if (element.hasAttribute('plain'))
                element.classList.add('ui-plain');
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputGroup.prototype, "width", void 0);
        UIInputGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-group\"><slot name=\"inputLabel\"></slot>\n  <div css.bind=\"{'flex-basis':width}\"><div class=\"ui-group-wrapper\"><slot></slot></div><slot name=\"inputInfo\"></slot></div></template>"),
            aurelia_framework_1.customElement('ui-input-group'),
            __metadata("design:paramtypes", [Element])
        ], UIInputGroup);
        return UIInputGroup;
    }());
    exports.UIInputGroup = UIInputGroup;
    var UIInputInfo = (function () {
        function UIInputInfo(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputInfo.prototype, "class", void 0);
        UIInputInfo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView('<template><div slot="inputInfo" class="ui-input-info \${class}"><slot></slot></div></template>'),
            aurelia_framework_1.customElement('ui-input-info'),
            __metadata("design:paramtypes", [Element])
        ], UIInputInfo);
        return UIInputInfo;
    }());
    exports.UIInputInfo = UIInputInfo;
    var UIInputAddon = (function () {
        function UIInputAddon(element) {
            this.element = element;
            this.glyph = '';
            if (element.hasAttribute('end'))
                element.classList.add('ui-end');
            else
                element.classList.add('ui-start');
        }
        UIInputAddon.prototype.focusEl = function () {
            var el = this.element.nextElementSibling;
            if (el && el['focus'])
                ui_event_1.UIEvent.queueTask(function () { return el['focus'](); });
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputAddon.prototype, "glyph", void 0);
        UIInputAddon = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-input-addon'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-addon\" click.trigger=\"focusEl()\"><slot><ui-glyph glyph.bind=\"glyph\"></ui-glyph></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIInputAddon);
        return UIInputAddon;
    }());
    exports.UIInputAddon = UIInputAddon;
    var UIInputLabel = (function () {
        function UIInputLabel(element) {
            this.element = element;
            this.for = '';
            this.class = '';
            this.width = '8em';
        }
        UIInputLabel_1 = UIInputLabel;
        UIInputLabel.prototype.bind = function (bindingContext, overrideContext) {
            if (this.element.hasAttribute('align-top'))
                this.class += ' ui-align-top';
            if (this.element.hasAttribute('required'))
                this.class += ' ui-required';
            if (this.element.hasAttribute('align-top'))
                this.width = '100%';
        };
        UIInputLabel.prototype.attached = function () {
            if (isEmpty(this.for)) {
                var el = this.label.parentElement.querySelector('input:not([type="checkbox"]):not([type="radio"]),textarea');
                if (el) {
                    if (!el.id)
                        el.id = 'ui-input-' + (UIInputLabel_1.seed++);
                    this.for = el.id;
                }
            }
        };
        UIInputLabel.seed = 1;
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputLabel.prototype, "for", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputLabel.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputLabel.prototype, "width", void 0);
        UIInputLabel = UIInputLabel_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><label ref=\"label\" slot=\"inputLabel\" class=\"ui-input-label ${class}\" for.bind=\"for\" css.bind=\"{'flex-basis':width}\"><span><slot></slot></span></label></template>"),
            aurelia_framework_1.customElement('ui-input-label'),
            __metadata("design:paramtypes", [Element])
        ], UIInputLabel);
        return UIInputLabel;
        var UIInputLabel_1;
    }());
    exports.UIInputLabel = UIInputLabel;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQWNBO1FBQ0UsZ0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFrQnZCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFsQmdCLENBQUM7UUFLeEMseUJBQVEsR0FBUjtZQUFBLGlCQU9DO1lBTkMsa0JBQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQ2hCLElBQUksRUFBRSxHQUFRLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUM7b0JBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO29CQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQVlELDRCQUFXLEdBQVgsVUFBWSxRQUFhO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELGdDQUFlLEdBQWYsVUFBZ0IsUUFBYTtZQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRUQsOEJBQWEsR0FBYixVQUFjLFFBQWE7WUFDekIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUEsRUFBRTtnQkFDekIsSUFBSSxDQUFDO29CQUNILEVBQUUsQ0FB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Qyx1TEFBOEssQ0FBQztZQUMxTCxpQ0FBYSxDQUFDLGdCQUFnQixDQUFDOzZDQUVGLE9BQU87V0FEeEIsWUFBWSxDQThCeEI7UUFBRCxtQkFBQzs7S0E5QkQsQUE4QkMsSUFBQTtJQTlCWSxvQ0FBWSIsImZpbGUiOiJlbGVtZW50cy9pbnB1dHMvdWktZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE3XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcblxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGJpbmRpbmdNb2RlLCBjaGlsZHJlbiwgaW5saW5lVmlldywgY29udGFpbmVybGVzcyB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7IFVJRXZlbnQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdWktZXZlbnRcIjtcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG5AYXV0b2luamVjdCgpXG5AY29udGFpbmVybGVzcygpXG5AY3VzdG9tRWxlbWVudCgndWktZm9ybScpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlPjxmb3JtIGNsYXNzPVwidWktZm9ybSBcXCR7Y2xhc3N9XCIgcmVmPVwiZm9ybUVsXCIgdmFsaWRhdGlvbi1yZW5kZXJlcj1cInVpLXZhbGlkYXRvclwiIGVudGVycHJlc3NlZC50cmlnZ2VyPVwiZmlyZVN1Ym1pdCgpXCIgc3VibWl0LnRyaWdnZXI9XCJyZXR1cm4gZmFsc2VcIj48c2xvdD48L3Nsb3Q+PC9mb3JtPjwvdGVtcGxhdGU+YClcbmV4cG9ydCBjbGFzcyBVSUZvcm0ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIC8vIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHsgfVxuICBhdHRhY2hlZCgpIHtcbiAgICBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiB7XG4gICAgICBsZXQgZWw6IGFueSA9IHRoaXMuZm9ybUVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0LHRleHRhcmVhJyk7XG4gICAgICBpZiAoZWwgIT09IG51bGwpIGVsLmZvY3VzKCk7XG4gICAgICBpZiAodGhpcy5idXN5KSB0aGlzLmJ1c3lDaGFuZ2VkKHRoaXMuYnVzeSk7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkgdGhpcy5kaXNhYmxlZENoYW5nZWQodGhpcy5kaXNhYmxlZCk7XG4gICAgfSk7XG4gIH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgZm9ybUVsO1xuICBAYmluZGFibGUoKSBjbGFzcyA9ICcnO1xuICBAYmluZGFibGUoKSBidXN5OiBib29sZWFuO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBAY2hpbGRyZW4oJ3VpLWJ1dHRvbix1aS1jb21ibyx1aS1kYXRlLHVpLWlucHV0LHVpLXRleHRhcmVhLHVpLXBob25lLHVpLWxhbmd1YWdlLHVpLW1hcmtkb3duLHVpLWNoZWNrYm94LHVpLXJhZGlvLHVpLXN3aXRjaCx1aS10YWcsdWktbGlzdCx1aS1kcm9wZG93bicpIGlucHV0RWxzO1xuXG4gIGJ1c3lDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmRpc2FibGVJbnB1dHMoISFuZXdWYWx1ZSB8fCB0aGlzLmRpc2FibGVkKTtcbiAgfVxuXG4gIGRpc2FibGVkQ2hhbmdlZChuZXdWYWx1ZTogYW55KSB7XG4gICAgdGhpcy5kaXNhYmxlSW5wdXRzKCEhbmV3VmFsdWUpO1xuICB9XG5cbiAgZGlzYWJsZUlucHV0cyhuZXdWYWx1ZTogYW55KSB7XG4gICAgXy5mb3JFYWNoKHRoaXMuaW5wdXRFbHMsIGVsID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVsLmF1LmNvbnRyb2xsZXIudmlld01vZGVsLmRpc2FibGUoISFuZXdWYWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmaXJlU3VibWl0KCkge1xuICAgIGlmICghdGhpcy5idXN5KSBVSUV2ZW50LmZpcmVFdmVudCgnc3VibWl0JywgdGhpcy5lbGVtZW50KTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY29udGFpbmVybGVzcygpXG5AaW5saW5lVmlldygnPHRlbXBsYXRlPjxmaWVsZHNldCBjbGFzcz1cInVpLWZpZWxkc2V0XCIgcmVmPVwiZmllbGRzZXRFbFwiPjxsZWdlbmQgaWYuYmluZD1cImxlZ2VuZFwiPjxzcGFuIGlmLmJpbmQ9XCIhY29sbGFwc2libGVcIj5cXCR7bGVnZW5kfTwvc3Bhbj48dWktY2hlY2tib3ggaWYuYmluZD1cImNvbGxhcHNpYmxlXCIgY2hlY2tlZC5iaW5kPVwiY2hlY2tlZFwiPlxcJHtsZWdlbmR9PC91aS1jaGVja2JveD48L2xlZ2VuZD48ZGl2PjxzbG90Pjwvc2xvdD48L2Rpdj48L2ZpZWxkc2V0PjwvdGVtcGxhdGU+JylcbkBjdXN0b21FbGVtZW50KCd1aS1maWVsZHNldCcpXG5leHBvcnQgY2xhc3MgVUlGaWVsZHNldCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgdGhpcy5jb2xsYXBzaWJsZSA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjaGVja2VkJykgfHwgZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQuYmluZCcpO1xuICB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQgfHwgdGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICB9XG4gIGF0dGFjaGVkKCkge1xuICAgIHRoaXMuY2hlY2tlZENoYW5nZWQodGhpcy5jaGVja2VkKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgdGhpcy5kaXNhYmxlZENoYW5nZWQodGhpcy5kaXNhYmxlZCk7XG4gIH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKCkgY2xhc3MgPSAnJztcbiAgQGJpbmRhYmxlKCkgbGVnZW5kID0gJyc7XG4gIEBiaW5kYWJsZSgpIGRpc2FibGVkOiBib29sZWFuO1xuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSBjaGVja2VkID0gdHJ1ZTtcblxuICBAY2hpbGRyZW4oJ3VpLWJ1dHRvbix1aS1jb21ibyx1aS1kYXRlLHVpLWlucHV0LHVpLXRleHRhcmVhLHVpLXBob25lLHVpLWxhbmd1YWdlLHVpLW1hcmtkb3duLHVpLWNoZWNrYm94LHVpLXJhZGlvLHVpLXN3aXRjaCx1aS10YWcsdWktbGlzdCx1aS1kcm9wZG93bicpIGlucHV0RWxzO1xuXG4gIHByaXZhdGUgZmllbGRzZXRFbDtcbiAgcHJpdmF0ZSBjb2xsYXBzaWJsZSA9IGZhbHNlO1xuXG4gIGNoZWNrZWRDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmZpZWxkc2V0RWwuY2xhc3NMaXN0WyEhbmV3VmFsdWUgPyAncmVtb3ZlJyA6ICdhZGQnXSgndWktY29sbGFwc2UnKTtcbiAgICB0aGlzLmRpc2FibGVJbnB1dHMoIW5ld1ZhbHVlKTtcbiAgfVxuXG4gIGRpc2FibGVkQ2hhbmdlZChuZXdWYWx1ZTogYW55KSB7XG4gICAgdGhpcy5kaXNhYmxlSW5wdXRzKCEhbmV3VmFsdWUpO1xuICB9XG5cbiAgZGlzYWJsZUlucHV0cyhuZXdWYWx1ZTogYW55KSB7XG4gICAgXy5mb3JFYWNoKHRoaXMuaW5wdXRFbHMsIGVsID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVsLmF1LmNvbnRyb2xsZXIudmlld01vZGVsLmRpc2FibGUoISFuZXdWYWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLWlucHV0LWdyb3VwXCI+PHNsb3QgbmFtZT1cImlucHV0TGFiZWxcIj48L3Nsb3Q+XG4gIDxkaXYgY3NzLmJpbmQ9XCJ7J2ZsZXgtYmFzaXMnOndpZHRofVwiPjxkaXYgY2xhc3M9XCJ1aS1ncm91cC13cmFwcGVyXCI+PHNsb3Q+PC9zbG90PjwvZGl2PjxzbG90IG5hbWU9XCJpbnB1dEluZm9cIj48L3Nsb3Q+PC9kaXY+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWlucHV0LWdyb3VwJylcbmV4cG9ydCBjbGFzcyBVSUlucHV0R3JvdXAge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncGxhaW4nKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1wbGFpbicpO1xuICB9XG5cbiAgQGJpbmRhYmxlKCkgd2lkdGggPSAnMTVlbSc7XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBpbmxpbmVWaWV3KCc8dGVtcGxhdGU+PGRpdiBzbG90PVwiaW5wdXRJbmZvXCIgY2xhc3M9XCJ1aS1pbnB1dC1pbmZvIFxcJHtjbGFzc31cIj48c2xvdD48L3Nsb3Q+PC9kaXY+PC90ZW1wbGF0ZT4nKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWlucHV0LWluZm8nKVxuZXhwb3J0IGNsYXNzIFVJSW5wdXRJbmZvIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuICBAYmluZGFibGUoKSBjbGFzcyA9ICcnO1xufVxuXG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21FbGVtZW50KCd1aS1pbnB1dC1hZGRvbicpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktaW5wdXQtYWRkb25cIiBjbGljay50cmlnZ2VyPVwiZm9jdXNFbCgpXCI+PHNsb3Q+PHVpLWdseXBoIGdseXBoLmJpbmQ9XCJnbHlwaFwiPjwvdWktZ2x5cGg+PC9zbG90PjwvdGVtcGxhdGU+YClcbmV4cG9ydCBjbGFzcyBVSUlucHV0QWRkb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZW5kJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktZW5kJyk7XG4gICAgZWxzZSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXN0YXJ0Jyk7XG4gIH1cblxuICBAYmluZGFibGUoKSBnbHlwaCA9ICcnO1xuXG4gIGZvY3VzRWwoKSB7XG4gICAgbGV0IGVsID0gdGhpcy5lbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICBpZiAoZWwgJiYgZWxbJ2ZvY3VzJ10pIFVJRXZlbnQucXVldWVUYXNrKCgpID0+IGVsWydmb2N1cyddKCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGU+PGxhYmVsIHJlZj1cImxhYmVsXCIgc2xvdD1cImlucHV0TGFiZWxcIiBjbGFzcz1cInVpLWlucHV0LWxhYmVsIFxcJHtjbGFzc31cIiBmb3IuYmluZD1cImZvclwiIGNzcy5iaW5kPVwieydmbGV4LWJhc2lzJzp3aWR0aH1cIj48c3Bhbj48c2xvdD48L3Nsb3Q+PC9zcGFuPjwvbGFiZWw+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWlucHV0LWxhYmVsJylcbmV4cG9ydCBjbGFzcyBVSUlucHV0TGFiZWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgnYWxpZ24tdG9wJykpIHRoaXMuY2xhc3MgKz0gJyB1aS1hbGlnbi10b3AnO1xuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdyZXF1aXJlZCcpKSB0aGlzLmNsYXNzICs9ICcgdWktcmVxdWlyZWQnO1xuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdhbGlnbi10b3AnKSkgdGhpcy53aWR0aCA9ICcxMDAlJztcbiAgfVxuICBhdHRhY2hlZCgpIHtcbiAgICBpZiAoaXNFbXB0eSh0aGlzLmZvcikpIHtcbiAgICAgIGxldCBlbCA9IHRoaXMubGFiZWwucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dDpub3QoW3R5cGU9XCJjaGVja2JveFwiXSk6bm90KFt0eXBlPVwicmFkaW9cIl0pLHRleHRhcmVhJyk7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgaWYgKCFlbC5pZCkgZWwuaWQgPSAndWktaW5wdXQtJyArIChVSUlucHV0TGFiZWwuc2VlZCsrKTtcbiAgICAgICAgdGhpcy5mb3IgPSBlbC5pZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgc3RhdGljIHNlZWQgPSAxO1xuXG4gIHByaXZhdGUgbGFiZWw7XG5cbiAgQGJpbmRhYmxlKCkgZm9yID0gJyc7XG4gIEBiaW5kYWJsZSgpIGNsYXNzID0gJyc7XG4gIEBiaW5kYWJsZSgpIHdpZHRoID0gJzhlbSc7XG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9
