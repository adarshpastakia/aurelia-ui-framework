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
            this.hideOnClick = true;
            this.split = false;
            this.isDisabled = false;
            this.hideCaret = false;
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
            this.hideCaret = this.element.hasAttribute('hide-caret');
            this.hideOnClick = !isFalse(this.element.getAttribute('hide-on-click'));
        }
        UIButton.prototype.bind = function (bindingContext, overrideContext) {
            this.disabledChanged(this.disabled);
        };
        UIButton.prototype.attached = function () {
            var _this = this;
            this.hasLabel = !!(this.label || this.labelEl.childNodes[0].length);
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-button') == _this.element)
                        return;
                    if (!_this.hideOnClick && getParentByClass(evt.target, 'ui-floating') == _this.dropdown)
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
        ], UIButton.prototype, "busy", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "disabled", void 0);
        UIButton = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-button ${busy?'ui-busy':''}\" css.bind=\"{width: width}\">\n  <a role=\"button\" tabindex=\"-1\" class=\"ui-button-el\" click.trigger=\"toggleDropdown($event, false)\" data-value=\"${value}\" ref=\"buttonEl\">\n    <div class=\"ui-busy-icon\"><ui-glyph glyph=\"glyph-busy\" class=\"ui-anim-busy\"></ui-glyph></div>\n    <div class=\"ui-button-icon\" if.bind=\"glyph\"><ui-glyph glyph.bind=\"glyph\"></ui-glyph></div>\n    <div class=\"ui-button-label\" ref=\"labelEl\" show.bind=\"hasLabel\"><slot>${label}</slot></div>\n    <div class=\"ui-button-caret\" if.bind=\"!hideCaret && !split && !form && dropdown\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></div>\n  </a>\n  <a role=\"button\" tabindex=\"-1\" class=\"ui-button-el ui-${splitTheme}\" if.bind=\"split\" click.trigger=\"toggleDropdown($event, true)\">\n    <div class=\"ui-button-splitter\"></div>\n    <div class=\"ui-button-caret\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></div>\n  </a>\n</template>"),
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
