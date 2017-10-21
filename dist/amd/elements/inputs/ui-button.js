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
            this.theme = 'default';
            this.width = 'auto';
            this.busy = false;
            this.disabled = false;
            this.isDisabled = false;
            if (this.element.hasAttribute('primary'))
                this.theme = 'primary';
            else if (this.element.hasAttribute('secondary'))
                this.theme = 'secondary';
            else if (this.element.hasAttribute('light'))
                this.theme = 'light';
            else if (this.element.hasAttribute('dark'))
                this.theme = 'dark';
            else if (this.element.hasAttribute('info'))
                this.theme = 'info';
            else if (this.element.hasAttribute('danger'))
                this.theme = 'danger';
            else if (this.element.hasAttribute('success'))
                this.theme = 'success';
            else if (this.element.hasAttribute('warning'))
                this.theme = 'warning';
            if (this.element.hasAttribute('icon-top'))
                this.element.classList.add('ui-icon-top');
            if (this.element.hasAttribute('big'))
                this.element.classList.add('ui-big');
            if (this.element.hasAttribute('small'))
                this.element.classList.add('ui-small');
            if (this.element.hasAttribute('square'))
                this.element.classList.add('ui-square');
            if (this.element.hasAttribute('round'))
                this.element.classList.add('ui-round');
        }
        UIButton.prototype.bind = function (bindingContext, overrideContext) {
            this.busy = isTrue(this.busy);
            this.disabled = isTrue(this.disabled);
            if (this.form)
                this.dropdown = this.form;
        };
        UIButton.prototype.attached = function () {
            var _this = this;
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-button') == _this.element)
                        return;
                    if (_this.form && getParentByClass(evt.target, 'ui-floating') == _this.dropdown)
                        return;
                    _this.element.classList.remove('ui-open');
                    _this.dropdown.classList.remove('ui-open');
                });
                this.element.classList.add('ui-btn-dropdown');
                this.dropdown.classList.add('ui-floating');
                this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
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
        UIButton.prototype.toggleDropdown = function (evt) {
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
        ], UIButton.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "width", void 0);
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
            aurelia_framework_1.inlineView("<template role=\"button\" class=\"ui-button ${theme} ${busy?'ui-busy':''} ${disabled?'ui-disabled':''}\" click.trigger=\"toggleDropdown($event)\" data-value=\"${value}\" css.bind=\"{width: width}\">\n    <span class=\"ui-indicator\"><ui-glyph if.bind=\"busy\" class=\"ui-anim-busy\" glyph=\"glyph-busy\"></ui-glyph></span>\n    <ui-glyph if.bind=\"glyph\" class=\"ui-btn-icon ${glyph}\" glyph.bind=\"glyph\"></ui-glyph>\n    <span if.bind=\"glyph && label\">&nbsp;</span>\n    <span class=\"ui-label\"><slot>${label}</slot></span>\n    <ui-glyph class=\"ui-caret\" glyph=\"glyph-caret-down\" if.bind=\"!form && dropdown\"></ui-glyph></template>"),
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
            this.disabled = false;
            if (this.element.hasAttribute('vertical'))
                this.element.classList.add('ui-vertical');
            else
                this.element.classList.add('ui-horizontal');
            if (this.element.hasAttribute('toggle'))
                this.element.classList.add('ui-toggle');
        }
        UIButtonGroup.prototype.bind = function (bindingContext, overrideContext) {
            this.disabled = isTrue(this.disabled);
        };
        UIButtonGroup.prototype.disabledChanged = function (newValue) {
            this.disabled = isTrue(newValue);
        };
        UIButtonGroup.prototype.buttonsChanged = function () {
            this.valueChanged(this.value);
        };
        UIButtonGroup.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (this.active)
                this.active.element.classList.remove('ui-active');
            if (this.buttons.length > 0 && (this.active = _.find(this.buttons, function (b) { return b.value === _this.value; })))
                this.active.element.classList.add('ui-active');
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
        ], UIButtonGroup.prototype, "disabled", void 0);
        UIButtonGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-button-group ${disabled?'ui-disabled':''}\" click.trigger=\"clickEvent($event)\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-button-group'),
            __metadata("design:paramtypes", [Element])
        ], UIButtonGroup);
        return UIButtonGroup;
    }());
    exports.UIButtonGroup = UIButtonGroup;
});
