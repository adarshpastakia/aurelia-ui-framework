var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./ui-input", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_input_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIPhone = (function (_super) {
        __extends(UIPhone, _super);
        function UIPhone(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.errors = null;
            _this.country = '';
            _this.disabled = false;
            _this.readonly = false;
            _this.info = '';
            _this.clear = false;
            _this.national = false;
            _this.placeholder = '';
            _this.ignore = false;
            _this.clear = element.hasAttribute('clear');
            if (_this.national = element.hasAttribute('country') || element.hasAttribute('country.bind'))
                _this.country = 'us';
            return _this;
        }
        UIPhone.prototype.bind = function (bindingContext, overrideContext) {
            var _this = this;
            _super.prototype.bind.apply(this, arguments);
            this.countryChanged(this.country);
            ui_event_1.UIEvent.queueTask(function () { return _this.valueChanged(_this.value); });
        };
        UIPhone.prototype.valueChanged = function (newValue) {
            if (this.ignore)
                return;
            this.formatPhone(newValue);
        };
        UIPhone.prototype.countryChanged = function (newValue) {
            var ct;
            this.placeholder = PhoneLib.getExample(newValue || 'us', PhoneLib.TYPE.FIXED_LINE_OR_MOBILE, this.national);
            this.prefixEl.className = 'ui-flag ' + newValue;
            this.formatPhone(this.inputEl.value);
        };
        UIPhone.prototype.formatPhone = function (val) {
            var _this = this;
            this.ignore = true;
            this.inputEl.value = PhoneLib.formatInput(val, this.country);
            this.phone = PhoneLib.getNumberInfo(val, this.country);
            this.value = PhoneLib.format(val, this.country, PhoneLib.FORMAT.FULL);
            if (!this.national)
                this.prefixEl.className = 'ui-flag ' + PhoneLib.getIso2Code(val);
            setTimeout(function () { return _this.ignore = false; }, 100);
        };
        UIPhone.prototype.fireEvent = function (evt) {
            if (evt.type === 'input') {
                var val = this.inputEl.value;
                var len = val.length;
                var start = evt.target.selectionStart;
                if (val == '' || val == '+')
                    val = '';
                else if (!this.national && !(/^\+/.test(val)))
                    val = '+' + val;
                this.formatPhone(val);
                if (len < this.inputEl.value.length)
                    start += (this.inputEl.value.length - len);
                try {
                    evt.target.setSelectionRange(start, start);
                }
                catch (e) { }
            }
            _super.prototype.fireEvent.call(this, evt);
        };
        UIPhone.prototype.checkInput = function (evt) {
            evt.stopPropagation();
            var code = evt.keyCode || evt.which;
            if (evt.ctrlKey || evt.metaKey || evt.altKey || code == 9 || code == 8)
                return true;
            if (code == 13)
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element);
            return /[0-9]/.test(String.fromCharCode(code));
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "phone", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "country", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "info", void 0);
        UIPhone = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\"><div  role=\"input\" class=\"ui-input-control ui-phone\"><span ref=\"prefixEl\"></span>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type=\"tel\" dir=\"ltr\" size=\"1\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keypress.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span></div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-phone'),
            __metadata("design:paramtypes", [Element])
        ], UIPhone);
        return UIPhone;
    }(ui_input_1.UIBaseInput));
    exports.UIPhone = UIPhone;
});
