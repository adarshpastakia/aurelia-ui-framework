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
            _this.helpText = '';
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
        ], UIPhone.prototype, "helpText", void 0);
        UIPhone = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\"><div role=\"input\" class=\"ui-input-control ui-phone\"><span ref=\"prefixEl\"></span>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type=\"tel\" dir=\"ltr\" size=\"1\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keypress.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-phone'),
            __metadata("design:paramtypes", [Element])
        ], UIPhone);
        return UIPhone;
    }(ui_input_1.UIBaseInput));
    exports.UIPhone = UIPhone;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1waG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JBO1FBQTZCLDJCQUFXO1FBQ3RDLGlCQUFtQixPQUFnQjtZQUFuQyxZQUNFLGlCQUFPLFNBSVI7WUFMa0IsYUFBTyxHQUFQLE9BQU8sQ0FBUztZQW1CbUIsV0FBSyxHQUFHLEVBQUUsQ0FBQztZQUdyRCxZQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2QsYUFBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLGNBQVEsR0FBRyxLQUFLLENBQUM7WUFDakIsY0FBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixjQUFRLEdBQUcsRUFBRSxDQUFDO1lBRWxCLFdBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxjQUFRLEdBQUcsS0FBSyxDQUFDO1lBR2pCLGlCQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLFlBQU0sR0FBRyxLQUFLLENBQUM7WUEvQnJCLEtBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUzQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFBQyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7UUFDbkgsQ0FBQztRQUlELHNCQUFJLEdBQUosVUFBSyxjQUFzQixFQUFFLGVBQXVCO1lBQXBELGlCQUlDO1lBSEMsaUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsa0JBQU8sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7UUFDekQsQ0FBQztRQXNCRCw4QkFBWSxHQUFaLFVBQWEsUUFBUTtZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFFRCxnQ0FBYyxHQUFkLFVBQWUsUUFBUTtZQUNyQixJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCw2QkFBVyxHQUFYLFVBQVksR0FBRztZQUFmLGlCQU9DO1lBTkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRixVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxFQUFuQixDQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRCwyQkFBUyxHQUFULFVBQVUsR0FBRztZQUNYLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQ3JCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO2dCQUV0QyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUM7b0JBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUMvRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDaEYsSUFBSSxDQUFDO29CQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsQ0FBQztZQUNELGlCQUFNLFNBQVMsWUFBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBRUQsNEJBQVUsR0FBVixVQUFXLEdBQUc7WUFDWixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3BGLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQUMsTUFBTSxDQUFDLGtCQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFdkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUEzRHFEO1lBQXJELDRCQUFRLENBQUMsRUFBRSxrQkFBa0IsRUFBRSwrQkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs4Q0FBWTtRQUNYO1lBQXJELDRCQUFRLENBQUMsRUFBRSxrQkFBa0IsRUFBRSwrQkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs4Q0FBTztRQUVoRDtZQUFYLDRCQUFRLEVBQUU7OytDQUFlO1FBQ2Q7WUFBWCw0QkFBUSxFQUFFOztnREFBYztRQUNiO1lBQVgsNEJBQVEsRUFBRTs7aURBQWtCO1FBQ2pCO1lBQVgsNEJBQVEsRUFBRTs7aURBQWtCO1FBQ2pCO1lBQVgsNEJBQVEsRUFBRTs7aURBQWU7UUEzQmYsT0FBTztZQVpuQiw4QkFBVSxFQUFFO1lBQ1osOEJBQVUsQ0FBQyxvM0JBU0EsQ0FBQztZQUNaLGlDQUFhLENBQUMsVUFBVSxDQUFDOzZDQUVJLE9BQU87V0FEeEIsT0FBTyxDQWdGbkI7UUFBRCxjQUFDO0tBaEZELEFBZ0ZDLENBaEY0QixzQkFBVyxHQWdGdkM7SUFoRlksMEJBQU8iLCJmaWxlIjoiZWxlbWVudHMvaW5wdXRzL3VpLXBob25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgYmluZGluZ01vZGUsIGlubGluZVZpZXcgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUJhc2VJbnB1dCB9IGZyb20gXCIuL3VpLWlucHV0XCI7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLWV2ZW50XCI7XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1pbnB1dC13cmFwcGVyXCI+PGRpdiByb2xlPVwiaW5wdXRcIiBjbGFzcz1cInVpLWlucHV0LWNvbnRyb2wgdWktcGhvbmVcIj48c3BhbiByZWY9XCJwcmVmaXhFbFwiPjwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJ1aS1lcnJvclwiIGlmLmJpbmQ9XCJlcnJvcnNcIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1pbnZhbGlkXCI+PC91aS1nbHlwaD48dWwgY2xhc3M9XCJ1aS1lcnJvci1saXN0XCI+PGxpIHJlcGVhdC5mb3I9XCJlcnIgb2YgZXJyb3JzXCIgaW5uZXJodG1sLmJpbmQ9XCJlcnJcIj48L2xpPjwvdWw+PC9zcGFuPlxuICA8aW5wdXQgcmVmPVwiaW5wdXRFbFwiIHR5cGU9XCJ0ZWxcIiBkaXI9XCJsdHJcIiBzaXplPVwiMVwiXG4gICAgZm9jdXMudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCIgYmx1ci50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIlxuICAgIGlucHV0LnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIGNoYW5nZS50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIlxuICAgIGtleXByZXNzLnRyaWdnZXI9XCJjaGVja0lucHV0KCRldmVudClcIiBwbGFjZWhvbGRlci5iaW5kPVwicGxhY2Vob2xkZXJcIlxuICAgIGRpc2FibGVkLmJpbmQ9XCJpc0Rpc2FibGVkXCIgcmVhZG9ubHkuYmluZD1cInJlYWRvbmx5XCIvPlxuICA8c3BhbiBjbGFzcz1cInVpLWNsZWFyXCIgaWYuYmluZD1cImNsZWFyICYmIHZhbHVlXCIgY2xpY2sudHJpZ2dlcj1cImNsZWFySW5wdXQoKVwiPiZ0aW1lczs8L3NwYW4+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1pbnB1dC1pbmZvXCIgaWYuYmluZD1cImhlbHBUZXh0XCIgaW5uZXJodG1sLmJpbmQ9XCJoZWxwVGV4dFwiPjwvZGl2PlxuPC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXBob25lJylcbmV4cG9ydCBjbGFzcyBVSVBob25lIGV4dGVuZHMgVUlCYXNlSW5wdXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGVhciA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjbGVhcicpO1xuXG4gICAgaWYgKHRoaXMubmF0aW9uYWwgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY291bnRyeScpIHx8IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb3VudHJ5LmJpbmQnKSkgdGhpcy5jb3VudHJ5ID0gJ3VzJztcbiAgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgc3VwZXIuYmluZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuY291bnRyeUNoYW5nZWQodGhpcy5jb3VudHJ5KTtcbiAgICBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlKSk7XG4gIH1cbiAgLy8gYXR0YWNoZWQoKSB7IH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgdmFsdWUgPSAnJztcbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgcGhvbmU7XG5cbiAgQGJpbmRhYmxlKCkgZXJyb3JzID0gbnVsbDtcbiAgQGJpbmRhYmxlKCkgY291bnRyeSA9ICcnO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSByZWFkb25seSA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBoZWxwVGV4dCA9ICcnO1xuXG4gIHByaXZhdGUgY2xlYXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBuYXRpb25hbCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcHJlZml4RWw7XG4gIHByaXZhdGUgcGxhY2Vob2xkZXIgPSAnJztcbiAgcHJpdmF0ZSBpZ25vcmUgPSBmYWxzZTtcblxuICB2YWx1ZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICBpZiAodGhpcy5pZ25vcmUpIHJldHVybjtcbiAgICB0aGlzLmZvcm1hdFBob25lKG5ld1ZhbHVlKTtcbiAgfVxuXG4gIGNvdW50cnlDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgbGV0IGN0O1xuICAgIHRoaXMucGxhY2Vob2xkZXIgPSBQaG9uZUxpYi5nZXRFeGFtcGxlKG5ld1ZhbHVlIHx8ICd1cycsIFBob25lTGliLlRZUEUuRklYRURfTElORV9PUl9NT0JJTEUsIHRoaXMubmF0aW9uYWwpO1xuICAgIHRoaXMucHJlZml4RWwuY2xhc3NOYW1lID0gJ3VpLWZsYWcgJyArIG5ld1ZhbHVlO1xuICAgIHRoaXMuZm9ybWF0UGhvbmUodGhpcy5pbnB1dEVsLnZhbHVlKTtcbiAgfVxuXG4gIGZvcm1hdFBob25lKHZhbCkge1xuICAgIHRoaXMuaWdub3JlID0gdHJ1ZTtcbiAgICB0aGlzLmlucHV0RWwudmFsdWUgPSBQaG9uZUxpYi5mb3JtYXRJbnB1dCh2YWwsIHRoaXMuY291bnRyeSk7XG4gICAgdGhpcy5waG9uZSA9IFBob25lTGliLmdldE51bWJlckluZm8odmFsLCB0aGlzLmNvdW50cnkpO1xuICAgIHRoaXMudmFsdWUgPSBQaG9uZUxpYi5mb3JtYXQodmFsLCB0aGlzLmNvdW50cnksIFBob25lTGliLkZPUk1BVC5GVUxMKTtcbiAgICBpZiAoIXRoaXMubmF0aW9uYWwpIHRoaXMucHJlZml4RWwuY2xhc3NOYW1lID0gJ3VpLWZsYWcgJyArIFBob25lTGliLmdldElzbzJDb2RlKHZhbCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmlnbm9yZSA9IGZhbHNlLCAxMDApO1xuICB9XG5cbiAgZmlyZUV2ZW50KGV2dCkge1xuICAgIGlmIChldnQudHlwZSA9PT0gJ2lucHV0Jykge1xuICAgICAgbGV0IHZhbCA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcbiAgICAgIGxldCBsZW4gPSB2YWwubGVuZ3RoO1xuICAgICAgbGV0IHN0YXJ0ID0gZXZ0LnRhcmdldC5zZWxlY3Rpb25TdGFydDtcblxuICAgICAgaWYgKHZhbCA9PSAnJyB8fCB2YWwgPT0gJysnKSB2YWwgPSAnJztcbiAgICAgIGVsc2UgaWYgKCF0aGlzLm5hdGlvbmFsICYmICEoL15cXCsvLnRlc3QodmFsKSkpIHZhbCA9ICcrJyArIHZhbDtcbiAgICAgIHRoaXMuZm9ybWF0UGhvbmUodmFsKTtcbiAgICAgIGlmIChsZW4gPCB0aGlzLmlucHV0RWwudmFsdWUubGVuZ3RoKSBzdGFydCArPSAodGhpcy5pbnB1dEVsLnZhbHVlLmxlbmd0aCAtIGxlbik7XG4gICAgICB0cnkgeyBldnQudGFyZ2V0LnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBzdGFydCk7IH0gY2F0Y2ggKGUpIHsgfVxuICAgIH1cbiAgICBzdXBlci5maXJlRXZlbnQoZXZ0KTtcbiAgfVxuXG4gIGNoZWNrSW5wdXQoZXZ0KSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBjb2RlID0gZXZ0LmtleUNvZGUgfHwgZXZ0LndoaWNoO1xuICAgIGlmIChldnQuY3RybEtleSB8fCBldnQubWV0YUtleSB8fCBldnQuYWx0S2V5IHx8IGNvZGUgPT0gOSB8fCBjb2RlID09IDgpIHJldHVybiB0cnVlO1xuICAgIGlmIChjb2RlID09IDEzKSByZXR1cm4gVUlFdmVudC5maXJlRXZlbnQoJ2VudGVycHJlc3NlZCcsIHRoaXMuZWxlbWVudCk7XG5cbiAgICByZXR1cm4gL1swLTldLy50ZXN0KFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSkpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9
