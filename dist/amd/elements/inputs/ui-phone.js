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
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\"><div role=\"input\" class=\"ui-input-control ui-phone\"><span ref=\"prefixEl\"></span>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type=\"tel\" dir=\"ltr\" size=\"1\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keypress.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span></div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-phone'),
            __metadata("design:paramtypes", [Element])
        ], UIPhone);
        return UIPhone;
    }(ui_input_1.UIBaseInput));
    exports.UIPhone = UIPhone;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1waG9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JBO1FBQTZCLDJCQUFXO1FBQ3RDLGlCQUFtQixPQUFnQjtZQUFuQyxZQUNFLGlCQUFPLFNBSVI7WUFMa0IsYUFBTyxHQUFQLE9BQU8sQ0FBUztZQW1CbUIsV0FBSyxHQUFHLEVBQUUsQ0FBQztZQUdyRCxZQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2QsYUFBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLGNBQVEsR0FBRyxLQUFLLENBQUM7WUFDakIsY0FBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixVQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWQsV0FBSyxHQUFHLEtBQUssQ0FBQztZQUNkLGNBQVEsR0FBRyxLQUFLLENBQUM7WUFHakIsaUJBQVcsR0FBRyxFQUFFLENBQUM7WUFDakIsWUFBTSxHQUFHLEtBQUssQ0FBQztZQS9CckIsS0FBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTNDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOztRQUNuSCxDQUFDO1FBSUQsc0JBQUksR0FBSixVQUFLLGNBQXNCLEVBQUUsZUFBdUI7WUFBcEQsaUJBSUM7WUFIQyxpQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxrQkFBTyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVB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QUFDO1lBQ1osaUNBQWEsQ0FBQyxVQUFVLENBQUM7NkNBRUksT0FBTztXQUR4QixPQUFPLENBZ0ZuQjtRQUFELGNBQUM7S0FoRkQsQUFnRkMsQ0FoRjRCLHNCQUFXLEdBZ0Z2QztJQWhGWSwwQkFBTyIsImZpbGUiOiJlbGVtZW50cy9pbnB1dHMvdWktcGhvbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5cbmltcG9ydCB7IGF1dG9pbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlLCBiaW5kaW5nTW9kZSwgaW5saW5lVmlldyB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7IFVJQmFzZUlucHV0IH0gZnJvbSBcIi4vdWktaW5wdXRcIjtcbmltcG9ydCB7IFVJRXZlbnQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdWktZXZlbnRcIjtcblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLWlucHV0LXdyYXBwZXJcIj48ZGl2IHJvbGU9XCJpbnB1dFwiIGNsYXNzPVwidWktaW5wdXQtY29udHJvbCB1aS1waG9uZVwiPjxzcGFuIHJlZj1cInByZWZpeEVsXCI+PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cInVpLWVycm9yXCIgaWYuYmluZD1cImVycm9yc1wiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWludmFsaWRcIj48L3VpLWdseXBoPjx1bCBjbGFzcz1cInVpLWVycm9yLWxpc3RcIj48bGkgcmVwZWF0LmZvcj1cImVyciBvZiBlcnJvcnNcIiBpbm5lcmh0bWwuYmluZD1cImVyclwiPjwvbGk+PC91bD48L3NwYW4+XG4gIDxpbnB1dCByZWY9XCJpbnB1dEVsXCIgdHlwZT1cInRlbFwiIGRpcj1cImx0clwiIHNpemU9XCIxXCJcbiAgICBmb2N1cy50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIiBibHVyLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiXG4gICAgaW5wdXQudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCIgY2hhbmdlLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiXG4gICAga2V5cHJlc3MudHJpZ2dlcj1cImNoZWNrSW5wdXQoJGV2ZW50KVwiIHBsYWNlaG9sZGVyLmJpbmQ9XCJwbGFjZWhvbGRlclwiXG4gICAgZGlzYWJsZWQuYmluZD1cImlzRGlzYWJsZWRcIiByZWFkb25seS5iaW5kPVwicmVhZG9ubHlcIi8+XG4gIDxzcGFuIGNsYXNzPVwidWktY2xlYXJcIiBpZi5iaW5kPVwiY2xlYXIgJiYgdmFsdWVcIiBjbGljay50cmlnZ2VyPVwiY2xlYXJJbnB1dCgpXCI+JnRpbWVzOzwvc3Bhbj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLWlucHV0LWluZm9cIiBpZi5iaW5kPVwiaW5mb1wiIGlubmVyaHRtbC5iaW5kPVwiaW5mb1wiPjwvZGl2PlxuPC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXBob25lJylcbmV4cG9ydCBjbGFzcyBVSVBob25lIGV4dGVuZHMgVUlCYXNlSW5wdXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGVhciA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjbGVhcicpO1xuXG4gICAgaWYgKHRoaXMubmF0aW9uYWwgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY291bnRyeScpIHx8IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb3VudHJ5LmJpbmQnKSkgdGhpcy5jb3VudHJ5ID0gJ3VzJztcbiAgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgc3VwZXIuYmluZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuY291bnRyeUNoYW5nZWQodGhpcy5jb3VudHJ5KTtcbiAgICBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiB0aGlzLnZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlKSk7XG4gIH1cbiAgLy8gYXR0YWNoZWQoKSB7IH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgdmFsdWUgPSAnJztcbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgcGhvbmU7XG5cbiAgQGJpbmRhYmxlKCkgZXJyb3JzID0gbnVsbDtcbiAgQGJpbmRhYmxlKCkgY291bnRyeSA9ICcnO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSByZWFkb25seSA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBpbmZvID0gJyc7XG5cbiAgcHJpdmF0ZSBjbGVhciA9IGZhbHNlO1xuICBwcml2YXRlIG5hdGlvbmFsID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBwcmVmaXhFbDtcbiAgcHJpdmF0ZSBwbGFjZWhvbGRlciA9ICcnO1xuICBwcml2YXRlIGlnbm9yZSA9IGZhbHNlO1xuXG4gIHZhbHVlQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIGlmICh0aGlzLmlnbm9yZSkgcmV0dXJuO1xuICAgIHRoaXMuZm9ybWF0UGhvbmUobmV3VmFsdWUpO1xuICB9XG5cbiAgY291bnRyeUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICBsZXQgY3Q7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IFBob25lTGliLmdldEV4YW1wbGUobmV3VmFsdWUgfHwgJ3VzJywgUGhvbmVMaWIuVFlQRS5GSVhFRF9MSU5FX09SX01PQklMRSwgdGhpcy5uYXRpb25hbCk7XG4gICAgdGhpcy5wcmVmaXhFbC5jbGFzc05hbWUgPSAndWktZmxhZyAnICsgbmV3VmFsdWU7XG4gICAgdGhpcy5mb3JtYXRQaG9uZSh0aGlzLmlucHV0RWwudmFsdWUpO1xuICB9XG5cbiAgZm9ybWF0UGhvbmUodmFsKSB7XG4gICAgdGhpcy5pZ25vcmUgPSB0cnVlO1xuICAgIHRoaXMuaW5wdXRFbC52YWx1ZSA9IFBob25lTGliLmZvcm1hdElucHV0KHZhbCwgdGhpcy5jb3VudHJ5KTtcbiAgICB0aGlzLnBob25lID0gUGhvbmVMaWIuZ2V0TnVtYmVySW5mbyh2YWwsIHRoaXMuY291bnRyeSk7XG4gICAgdGhpcy52YWx1ZSA9IFBob25lTGliLmZvcm1hdCh2YWwsIHRoaXMuY291bnRyeSwgUGhvbmVMaWIuRk9STUFULkZVTEwpO1xuICAgIGlmICghdGhpcy5uYXRpb25hbCkgdGhpcy5wcmVmaXhFbC5jbGFzc05hbWUgPSAndWktZmxhZyAnICsgUGhvbmVMaWIuZ2V0SXNvMkNvZGUodmFsKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaWdub3JlID0gZmFsc2UsIDEwMCk7XG4gIH1cblxuICBmaXJlRXZlbnQoZXZ0KSB7XG4gICAgaWYgKGV2dC50eXBlID09PSAnaW5wdXQnKSB7XG4gICAgICBsZXQgdmFsID0gdGhpcy5pbnB1dEVsLnZhbHVlO1xuICAgICAgbGV0IGxlbiA9IHZhbC5sZW5ndGg7XG4gICAgICBsZXQgc3RhcnQgPSBldnQudGFyZ2V0LnNlbGVjdGlvblN0YXJ0O1xuXG4gICAgICBpZiAodmFsID09ICcnIHx8IHZhbCA9PSAnKycpIHZhbCA9ICcnO1xuICAgICAgZWxzZSBpZiAoIXRoaXMubmF0aW9uYWwgJiYgISgvXlxcKy8udGVzdCh2YWwpKSkgdmFsID0gJysnICsgdmFsO1xuICAgICAgdGhpcy5mb3JtYXRQaG9uZSh2YWwpO1xuICAgICAgaWYgKGxlbiA8IHRoaXMuaW5wdXRFbC52YWx1ZS5sZW5ndGgpIHN0YXJ0ICs9ICh0aGlzLmlucHV0RWwudmFsdWUubGVuZ3RoIC0gbGVuKTtcbiAgICAgIHRyeSB7IGV2dC50YXJnZXQuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIHN0YXJ0KTsgfSBjYXRjaCAoZSkgeyB9XG4gICAgfVxuICAgIHN1cGVyLmZpcmVFdmVudChldnQpO1xuICB9XG5cbiAgY2hlY2tJbnB1dChldnQpIHtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IGNvZGUgPSBldnQua2V5Q29kZSB8fCBldnQud2hpY2g7XG4gICAgaWYgKGV2dC5jdHJsS2V5IHx8IGV2dC5tZXRhS2V5IHx8IGV2dC5hbHRLZXkgfHwgY29kZSA9PSA5IHx8IGNvZGUgPT0gOCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGNvZGUgPT0gMTMpIHJldHVybiBVSUV2ZW50LmZpcmVFdmVudCgnZW50ZXJwcmVzc2VkJywgdGhpcy5lbGVtZW50KTtcblxuICAgIHJldHVybiAvWzAtOV0vLnRlc3QoU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
