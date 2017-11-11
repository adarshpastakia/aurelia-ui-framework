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
            this.disableInputs(newValue);
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
            aurelia_framework_1.inlineView("<template><label ref=\"label\" slot=\"inputLabel\" class=\"ui-input-label ${class}\" for.bind=\"for\" css.bind=\"{'flex-basis':width}\"><slot></slot></label></template>"),
            aurelia_framework_1.customElement('ui-input-label'),
            __metadata("design:paramtypes", [Element])
        ], UIInputLabel);
        return UIInputLabel;
        var UIInputLabel_1;
    }());
    exports.UIInputLabel = UIInputLabel;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQWNBO1FBQ0UsZ0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFrQnZCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFsQmdCLENBQUM7UUFLeEMseUJBQVEsR0FBUjtZQUFBLGlCQU9DO1lBTkMsa0JBQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQ2hCLElBQUksRUFBRSxHQUFRLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUM7b0JBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDO29CQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQVlELDRCQUFXLEdBQVgsVUFBWSxRQUFhO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELGdDQUFlLEdBQWYsVUFBZ0IsUUFBYTtZQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFFRCw4QkFBYSxHQUFiLFVBQWMsUUFBYTtZQUN6QixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQSxFQUFFO2dCQUN6QixJQUFJLENBQUM7b0JBQ0gsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pELENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsMkJBQVUsR0FBVjtZQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBQyxrQkFBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVELENBQUM7UUF6Qlc7WUFBWCw0QkFBUSxFQUFFOzs2Q0FBWTtRQUNYO1lBQVgsNEJBQVEsRUFBRTs7NENBQWU7UUFDZDtZQUFYLDRCQUFRLEVBQUU7O2dEQUFtQjtRQUUwSDtZQUF2Siw0QkFBUSxDQUFDLDRJQUE0SSxDQUFDOztnREFBVTtRQXZCdEosTUFBTTtZQUpsQiw4QkFBVSxFQUFFO1lBQ1osaUNBQWEsRUFBRTtZQUNmLGlDQUFhLENBQUMsU0FBUyxDQUFDO1lBQ3hCLDhCQUFVLENBQUMsc01BQTZMLENBQUM7NkNBRTVLLE9BQU87V0FEeEIsTUFBTSxDQTZDbEI7UUFBRCxhQUFDO0tBN0NELEFBNkNDLElBQUE7SUE3Q1ksd0JBQU07SUFtRG5CO1FBQ0Usb0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFpQnZCLFVBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxXQUFNLEdBQUcsRUFBRSxDQUFDO1lBRThCLFlBQU8sR0FBRyxJQUFJLENBQUM7WUFLN0QsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUF4QjFCLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdGLENBQUM7UUFJRCx5QkFBSSxHQUFKLFVBQUssY0FBc0IsRUFBRSxlQUF1QjtZQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUNELDZCQUFRLEdBQVI7WUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFlRCxtQ0FBYyxHQUFkLFVBQWUsUUFBYTtZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRUQsb0NBQWUsR0FBZixVQUFnQixRQUFhO1lBQzNCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxrQ0FBYSxHQUFiLFVBQWMsUUFBYTtZQUN6QixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBQSxFQUFFO2dCQUN6QixJQUFJLENBQUM7b0JBQ0gsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pELENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBMUJXO1lBQVgsNEJBQVEsRUFBRTs7aURBQVk7UUFDWDtZQUFYLDRCQUFRLEVBQUU7O2tEQUFhO1FBQ1o7WUFBWCw0QkFBUSxFQUFFOztvREFBbUI7UUFDd0I7WUFBckQsNEJBQVEsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLCtCQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7O21EQUFnQjtRQUVtRjtZQUF2Siw0QkFBUSxDQUFDLDRJQUE0SSxDQUFDOztvREFBVTtRQXZCdEosVUFBVTtZQUp0Qiw4QkFBVSxFQUFFO1lBQ1osaUNBQWEsRUFBRTtZQUNmLDhCQUFVLENBQUMsMlFBQTJRLENBQUM7WUFDdlIsaUNBQWEsQ0FBQyxhQUFhLENBQUM7NkNBRUMsT0FBTztXQUR4QixVQUFVLENBNkN0QjtRQUFELGlCQUFDO0tBN0NELEFBNkNDLElBQUE7SUE3Q1ksZ0NBQVU7SUFtRHZCO1FBQ0Usc0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFJdkIsVUFBSyxHQUFHLE1BQU0sQ0FBQztZQUh6QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFVztZQUFYLDRCQUFRLEVBQUU7O21EQUFnQjtRQUxoQixZQUFZO1lBSnhCLDhCQUFVLEVBQUU7WUFDWiw4QkFBVSxDQUFDLHFOQUM0SCxDQUFDO1lBQ3hJLGlDQUFhLENBQUMsZ0JBQWdCLENBQUM7NkNBRUYsT0FBTztXQUR4QixZQUFZLENBTXhCO1FBQUQsbUJBQUM7S0FORCxBQU1DLElBQUE7SUFOWSxvQ0FBWTtJQVl6QjtRQUNFLHFCQUFtQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBQ3ZCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFEZ0IsQ0FBQztRQUM1QjtZQUFYLDRCQUFRLEVBQUU7O2tEQUFZO1FBRlosV0FBVztZQUp2Qiw4QkFBVSxFQUFFO1lBQ1osaUNBQWEsRUFBRTtZQUNmLDhCQUFVLENBQUMsZ0dBQWdHLENBQUM7WUFDNUcsaUNBQWEsQ0FBQyxlQUFlLENBQUM7NkNBRUQsT0FBTztXQUR4QixXQUFXLENBR3ZCO1FBQUQsa0JBQUM7S0FIRCxBQUdDLElBQUE7SUFIWSxrQ0FBVztJQVN4QjtRQUNFLHNCQUFtQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBS3ZCLFVBQUssR0FBRyxFQUFFLENBQUM7WUFKckIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqRSxJQUFJO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFJRCw4QkFBTyxHQUFQO1lBQ0UsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztZQUN6QyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUFDLGtCQUFPLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBYixDQUFhLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQU5XO1lBQVgsNEJBQVEsRUFBRTs7bURBQVk7UUFOWixZQUFZO1lBSHhCLDhCQUFVLEVBQUU7WUFDWixpQ0FBYSxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLDhCQUFVLENBQUMsbUlBQTZILENBQUM7NkNBRTVHLE9BQU87V0FEeEIsWUFBWSxDQWF4QjtRQUFELG1CQUFDO0tBYkQsQUFhQyxJQUFBO0lBYlksb0NBQVk7SUFtQnpCO1FBQ0Usc0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUEwQnZCLFFBQUcsR0FBRyxFQUFFLENBQUM7WUFDVCxVQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ1gsVUFBSyxHQUFHLEtBQUssQ0FBQztRQTVCYSxDQUFDO3lCQUQ3QixZQUFZO1FBS3ZCLDJCQUFJLEdBQUosVUFBSyxjQUFzQixFQUFFLGVBQXVCO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxLQUFLLElBQUksZUFBZSxDQUFDO1lBQzFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxLQUFLLElBQUksY0FBYyxDQUFDO1lBQ3hFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2xFLENBQUM7UUFDRCwrQkFBUSxHQUFSO1lBQ0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQywyREFBMkQsQ0FBQyxDQUFDO2dCQUM3RyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFBQyxFQUFFLENBQUMsRUFBRSxHQUFHLFdBQVcsR0FBRyxDQUFDLGNBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUtNLGlCQUFJLEdBQUcsQ0FBQyxDQUFDO1FBSUo7WUFBWCw0QkFBUSxFQUFFOztpREFBVTtRQUNUO1lBQVgsNEJBQVEsRUFBRTs7bURBQVk7UUFDWDtZQUFYLDRCQUFRLEVBQUU7O21EQUFlO1FBN0JmLFlBQVk7WUFKeEIsOEJBQVUsRUFBRTtZQUNaLGlDQUFhLEVBQUU7WUFDZiw4QkFBVSxDQUFDLDBLQUFpSyxDQUFDO1lBQzdLLGlDQUFhLENBQUMsZ0JBQWdCLENBQUM7NkNBRUYsT0FBTztXQUR4QixZQUFZLENBOEJ4QjtRQUFELG1CQUFDOztLQTlCRCxBQThCQyxJQUFBO0lBOUJZLG9DQUFZIiwiZmlsZSI6ImVsZW1lbnRzL2lucHV0cy91aS1mb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgYmluZGluZ01vZGUsIGNoaWxkcmVuLCBpbmxpbmVWaWV3LCBjb250YWluZXJsZXNzIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gXCIuLi8uLi91dGlscy91aS1ldmVudFwiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBjdXN0b21FbGVtZW50KCd1aS1mb3JtJylcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGU+PGZvcm0gY2xhc3M9XCJ1aS1mb3JtIFxcJHtjbGFzc31cIiByZWY9XCJmb3JtRWxcIiB2YWxpZGF0aW9uLXJlbmRlcmVyPVwidWktdmFsaWRhdG9yXCIgZW50ZXJwcmVzc2VkLnRyaWdnZXI9XCJmaXJlU3VibWl0KClcIiBzdWJtaXQudHJpZ2dlcj1cInJldHVybiBmYWxzZVwiPjxzbG90Pjwvc2xvdD48L2Zvcm0+PC90ZW1wbGF0ZT5gKVxuZXhwb3J0IGNsYXNzIFVJRm9ybSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7IH1cblxuICAvLyBhdXJlbGlhIGhvb2tzXG4gIC8vIGNyZWF0ZWQob3duaW5nVmlldzogVmlldywgbXlWaWV3OiBWaWV3KSB7IH1cbiAgLy8gYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkgeyB9XG4gIGF0dGFjaGVkKCkge1xuICAgIFVJRXZlbnQucXVldWVUYXNrKCgpID0+IHtcbiAgICAgIGxldCBlbDogYW55ID0gdGhpcy5mb3JtRWwucXVlcnlTZWxlY3RvcignaW5wdXQsdGV4dGFyZWEnKTtcbiAgICAgIGlmIChlbCAhPT0gbnVsbCkgZWwuZm9jdXMoKTtcbiAgICAgIGlmICh0aGlzLmJ1c3kpIHRoaXMuYnVzeUNoYW5nZWQodGhpcy5idXN5KTtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB0aGlzLmRpc2FibGVkQ2hhbmdlZCh0aGlzLmRpc2FibGVkKTtcbiAgICB9KTtcbiAgfVxuICAvLyBkZXRhY2hlZCgpIHsgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBmb3JtRWw7XG4gIEBiaW5kYWJsZSgpIGNsYXNzID0gJyc7XG4gIEBiaW5kYWJsZSgpIGJ1c3k6IGJvb2xlYW47XG4gIEBiaW5kYWJsZSgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIEBjaGlsZHJlbigndWktYnV0dG9uLHVpLWNvbWJvLHVpLWRhdGUsdWktaW5wdXQsdWktdGV4dGFyZWEsdWktcGhvbmUsdWktbGFuZ3VhZ2UsdWktbWFya2Rvd24sdWktY2hlY2tib3gsdWktcmFkaW8sdWktc3dpdGNoLHVpLXRhZyx1aS1saXN0LHVpLWRyb3Bkb3duJykgaW5wdXRFbHM7XG5cbiAgYnVzeUNoYW5nZWQobmV3VmFsdWU6IGFueSkge1xuICAgIHRoaXMuZGlzYWJsZUlucHV0cyghIW5ld1ZhbHVlIHx8IHRoaXMuZGlzYWJsZWQpO1xuICB9XG5cbiAgZGlzYWJsZWRDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmRpc2FibGVJbnB1dHMobmV3VmFsdWUpO1xuICB9XG5cbiAgZGlzYWJsZUlucHV0cyhuZXdWYWx1ZTogYW55KSB7XG4gICAgXy5mb3JFYWNoKHRoaXMuaW5wdXRFbHMsIGVsID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVsLmF1LmNvbnRyb2xsZXIudmlld01vZGVsLmRpc2FibGUoISFuZXdWYWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmaXJlU3VibWl0KCkge1xuICAgIGlmICghdGhpcy5idXN5KSBVSUV2ZW50LmZpcmVFdmVudCgnc3VibWl0JywgdGhpcy5lbGVtZW50KTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY29udGFpbmVybGVzcygpXG5AaW5saW5lVmlldygnPHRlbXBsYXRlPjxmaWVsZHNldCBjbGFzcz1cInVpLWZpZWxkc2V0XCIgcmVmPVwiZmllbGRzZXRFbFwiPjxsZWdlbmQgaWYuYmluZD1cImxlZ2VuZFwiPjxzcGFuIGlmLmJpbmQ9XCIhY29sbGFwc2libGVcIj5cXCR7bGVnZW5kfTwvc3Bhbj48dWktY2hlY2tib3ggaWYuYmluZD1cImNvbGxhcHNpYmxlXCIgY2hlY2tlZC5iaW5kPVwiY2hlY2tlZFwiPlxcJHtsZWdlbmR9PC91aS1jaGVja2JveD48L2xlZ2VuZD48ZGl2PjxzbG90Pjwvc2xvdD48L2Rpdj48L2ZpZWxkc2V0PjwvdGVtcGxhdGU+JylcbkBjdXN0b21FbGVtZW50KCd1aS1maWVsZHNldCcpXG5leHBvcnQgY2xhc3MgVUlGaWVsZHNldCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgdGhpcy5jb2xsYXBzaWJsZSA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjaGVja2VkJykgfHwgZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQuYmluZCcpO1xuICB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLmNoZWNrZWQgfHwgdGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICB9XG4gIGF0dGFjaGVkKCkge1xuICAgIHRoaXMuY2hlY2tlZENoYW5nZWQodGhpcy5jaGVja2VkKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgdGhpcy5kaXNhYmxlZENoYW5nZWQodGhpcy5kaXNhYmxlZCk7XG4gIH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKCkgY2xhc3MgPSAnJztcbiAgQGJpbmRhYmxlKCkgbGVnZW5kID0gJyc7XG4gIEBiaW5kYWJsZSgpIGRpc2FibGVkOiBib29sZWFuO1xuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSBjaGVja2VkID0gdHJ1ZTtcblxuICBAY2hpbGRyZW4oJ3VpLWJ1dHRvbix1aS1jb21ibyx1aS1kYXRlLHVpLWlucHV0LHVpLXRleHRhcmVhLHVpLXBob25lLHVpLWxhbmd1YWdlLHVpLW1hcmtkb3duLHVpLWNoZWNrYm94LHVpLXJhZGlvLHVpLXN3aXRjaCx1aS10YWcsdWktbGlzdCx1aS1kcm9wZG93bicpIGlucHV0RWxzO1xuXG4gIHByaXZhdGUgZmllbGRzZXRFbDtcbiAgcHJpdmF0ZSBjb2xsYXBzaWJsZSA9IGZhbHNlO1xuXG4gIGNoZWNrZWRDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmZpZWxkc2V0RWwuY2xhc3NMaXN0WyEhbmV3VmFsdWUgPyAncmVtb3ZlJyA6ICdhZGQnXSgndWktY29sbGFwc2UnKTtcbiAgICB0aGlzLmRpc2FibGVJbnB1dHMoIW5ld1ZhbHVlKTtcbiAgfVxuXG4gIGRpc2FibGVkQ2hhbmdlZChuZXdWYWx1ZTogYW55KSB7XG4gICAgdGhpcy5kaXNhYmxlSW5wdXRzKCEhbmV3VmFsdWUpO1xuICB9XG5cbiAgZGlzYWJsZUlucHV0cyhuZXdWYWx1ZTogYW55KSB7XG4gICAgXy5mb3JFYWNoKHRoaXMuaW5wdXRFbHMsIGVsID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVsLmF1LmNvbnRyb2xsZXIudmlld01vZGVsLmRpc2FibGUoISFuZXdWYWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLWlucHV0LWdyb3VwXCI+PHNsb3QgbmFtZT1cImlucHV0TGFiZWxcIj48L3Nsb3Q+XG4gIDxkaXYgY3NzLmJpbmQ9XCJ7J2ZsZXgtYmFzaXMnOndpZHRofVwiPjxkaXYgY2xhc3M9XCJ1aS1ncm91cC13cmFwcGVyXCI+PHNsb3Q+PC9zbG90PjwvZGl2PjxzbG90IG5hbWU9XCJpbnB1dEluZm9cIj48L3Nsb3Q+PC9kaXY+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWlucHV0LWdyb3VwJylcbmV4cG9ydCBjbGFzcyBVSUlucHV0R3JvdXAge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncGxhaW4nKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1wbGFpbicpO1xuICB9XG5cbiAgQGJpbmRhYmxlKCkgd2lkdGggPSAnMTVlbSc7XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBpbmxpbmVWaWV3KCc8dGVtcGxhdGU+PGRpdiBzbG90PVwiaW5wdXRJbmZvXCIgY2xhc3M9XCJ1aS1pbnB1dC1pbmZvIFxcJHtjbGFzc31cIj48c2xvdD48L3Nsb3Q+PC9kaXY+PC90ZW1wbGF0ZT4nKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWlucHV0LWluZm8nKVxuZXhwb3J0IGNsYXNzIFVJSW5wdXRJbmZvIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuICBAYmluZGFibGUoKSBjbGFzcyA9ICcnO1xufVxuXG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21FbGVtZW50KCd1aS1pbnB1dC1hZGRvbicpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktaW5wdXQtYWRkb25cIiBjbGljay50cmlnZ2VyPVwiZm9jdXNFbCgpXCI+PHNsb3Q+PHVpLWdseXBoIGdseXBoLmJpbmQ9XCJnbHlwaFwiPjwvdWktZ2x5cGg+PC9zbG90PjwvdGVtcGxhdGU+YClcbmV4cG9ydCBjbGFzcyBVSUlucHV0QWRkb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZW5kJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktZW5kJyk7XG4gICAgZWxzZSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXN0YXJ0Jyk7XG4gIH1cblxuICBAYmluZGFibGUoKSBnbHlwaCA9ICcnO1xuXG4gIGZvY3VzRWwoKSB7XG4gICAgbGV0IGVsID0gdGhpcy5lbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICBpZiAoZWwgJiYgZWxbJ2ZvY3VzJ10pIFVJRXZlbnQucXVldWVUYXNrKCgpID0+IGVsWydmb2N1cyddKCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGU+PGxhYmVsIHJlZj1cImxhYmVsXCIgc2xvdD1cImlucHV0TGFiZWxcIiBjbGFzcz1cInVpLWlucHV0LWxhYmVsIFxcJHtjbGFzc31cIiBmb3IuYmluZD1cImZvclwiIGNzcy5iaW5kPVwieydmbGV4LWJhc2lzJzp3aWR0aH1cIj48c2xvdD48L3Nsb3Q+PC9sYWJlbD48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktaW5wdXQtbGFiZWwnKVxuZXhwb3J0IGNsYXNzIFVJSW5wdXRMYWJlbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7IH1cblxuICAvLyBhdXJlbGlhIGhvb2tzXG4gIC8vIGNyZWF0ZWQob3duaW5nVmlldzogVmlldywgbXlWaWV3OiBWaWV3KSB7IH1cbiAgYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdhbGlnbi10b3AnKSkgdGhpcy5jbGFzcyArPSAnIHVpLWFsaWduLXRvcCc7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3JlcXVpcmVkJykpIHRoaXMuY2xhc3MgKz0gJyB1aS1yZXF1aXJlZCc7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2FsaWduLXRvcCcpKSB0aGlzLndpZHRoID0gJzEwMCUnO1xuICB9XG4gIGF0dGFjaGVkKCkge1xuICAgIGlmIChpc0VtcHR5KHRoaXMuZm9yKSkge1xuICAgICAgbGV0IGVsID0gdGhpcy5sYWJlbC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Om5vdChbdHlwZT1cImNoZWNrYm94XCJdKTpub3QoW3R5cGU9XCJyYWRpb1wiXSksdGV4dGFyZWEnKTtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBpZiAoIWVsLmlkKSBlbC5pZCA9ICd1aS1pbnB1dC0nICsgKFVJSW5wdXRMYWJlbC5zZWVkKyspO1xuICAgICAgICB0aGlzLmZvciA9IGVsLmlkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBkZXRhY2hlZCgpIHsgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBzdGF0aWMgc2VlZCA9IDE7XG5cbiAgcHJpdmF0ZSBsYWJlbDtcblxuICBAYmluZGFibGUoKSBmb3IgPSAnJztcbiAgQGJpbmRhYmxlKCkgY2xhc3MgPSAnJztcbiAgQGJpbmRhYmxlKCkgd2lkdGggPSAnOGVtJztcbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
