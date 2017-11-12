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
define(["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIBaseInput = (function () {
        function UIBaseInput() {
            this.value = '';
            this.disabled = false;
            this.readonly = false;
            this.isDisabled = false;
        }
        UIBaseInput.prototype.bind = function (bindingContext, overrideContext) {
            var _this = this;
            this.element['focus'] = function () { return _this.focus(); };
            this.disabledChanged(this.disabled);
            this.readonlyChanged(this.readonly);
        };
        UIBaseInput.prototype.disabledChanged = function (newValue) {
            this.element.classList[(this.isDisabled = this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
        };
        UIBaseInput.prototype.readonlyChanged = function (newValue) {
            this.element.classList[(this.readonly = !!newValue) ? 'add' : 'remove']('ui-readonly');
        };
        UIBaseInput.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UIBaseInput.prototype.clearInput = function () {
            this.value = '';
            this.inputEl.focus();
            ui_event_1.UIEvent.fireEvent('input', this.element, this.value);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIBaseInput.prototype.focus = function () {
            this.inputEl.focus();
        };
        UIBaseInput.prototype.fireEvent = function (evt) {
            evt.stopPropagation();
            var el = getParentByClass(this.element, 'ui-input-group');
            if (evt.type === 'focus') {
                this.inputEl.select();
                this.element.classList.add('ui-focus');
                if (el)
                    el.classList.add('ui-focus');
            }
            if (evt.type === 'blur') {
                this.element.classList.remove('ui-focus');
                if (el)
                    el.classList.remove('ui-focus');
            }
            ui_event_1.UIEvent.fireEvent(evt.type, this.element, this.value);
        };
        return UIBaseInput;
    }());
    exports.UIBaseInput = UIBaseInput;
    var UIInput = (function (_super) {
        __extends(UIInput, _super);
        function UIInput(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.dir = '';
            _this.width = 'auto';
            _this.errors = null;
            _this.maxlength = 1000;
            _this.disabled = false;
            _this.readonly = false;
            _this.helpText = '';
            _this.placeholder = '';
            _this.type = 'text';
            _this.clear = false;
            _this.counter = false;
            _this.clear = element.hasAttribute('clear');
            _this.counter = element.hasAttribute('counter');
            if (element.hasAttribute('url'))
                _this.type = 'url';
            if (element.hasAttribute('file'))
                _this.type = 'file';
            if (element.hasAttribute('email'))
                _this.type = 'email';
            if (element.hasAttribute('number') || element.hasAttribute('number.bind'))
                _this.type = 'number';
            if (element.hasAttribute('decimal') || element.hasAttribute('decimal.bind'))
                _this.type = 'number';
            if (element.hasAttribute('password'))
                _this.type = 'password';
            return _this;
        }
        UIInput.prototype.bind = function (bindingContext, overrideContext) {
            _super.prototype.bind.apply(this, arguments);
            if (!isNaN(this.number))
                this.numberChanged(this.number);
            if (!isNaN(this.decimal))
                this.decimalChanged(this.decimal);
            if (this.element.hasAttribute('readonly'))
                this.readonly = true;
            if (this.element.hasAttribute('disabled'))
                this.isDisabled = this.disabled = true;
        };
        UIInput.prototype.valueChanged = function (newValue) {
            if (this.type === 'number') {
                var num = parseFloat(newValue);
                this.decimal = this.number = isNaN(num) ? null : num;
                if (!this.number && this.number !== 0) {
                    this.value = '';
                }
            }
        };
        UIInput.prototype.numberChanged = function (newValue) {
            this.value = (!newValue && newValue !== 0) ? '' : newValue;
        };
        UIInput.prototype.decimalChanged = function (newValue) {
            this.value = (!newValue && newValue !== 0) ? '' : newValue;
        };
        UIInput.prototype.fireEvent = function (evt) {
            if (evt.type === 'input') {
                if (this.type === 'email')
                    this.value = this.value.toLowerCase();
            }
            _super.prototype.fireEvent.call(this, evt);
        };
        UIInput.prototype.checkInput = function (evt) {
            evt.stopPropagation();
            var code = evt.keyCode || evt.which;
            if (evt.ctrlKey || evt.metaKey || evt.altKey || code == 9 || code == 8)
                return true;
            if (code == 13)
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element);
            if (this.type == 'email')
                return /[a-zA-Z0-9\@\-\.\_\&\+\$]/.test(String.fromCharCode(code));
            if (this.type == 'url')
                return /[a-zA-Z0-9\/\-\.\_\?\#\%\=\$\;\:\{\[\]\}\&\+]/.test(String.fromCharCode(code));
            if (this.type == 'number') {
                return /[0-9\.\-]/.test(String.fromCharCode(code));
            }
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIInput.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIInput.prototype, "number", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIInput.prototype, "decimal", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "maxlength", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "placeholder", void 0);
        UIInput = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\" css.bind=\"{width: width}\"><div role=\"input\" class=\"ui-input-control\" dir.bind=\"dir\"><slot></slot>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type.bind=\"type\" value.bind=\"value\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\" step=\"any\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keypress.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\" size=\"1\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"maxlength - value.length\"></span></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-input'),
            __metadata("design:paramtypes", [Element])
        ], UIInput);
        return UIInput;
    }(UIBaseInput));
    exports.UIInput = UIInput;
    var UIFileInput = (function () {
        function UIFileInput(element) {
            this.element = element;
            this.maxFiles = 10;
            this.fileTypes = '';
            this.files = [];
            this.dragging = false;
        }
        UIFileInput.prototype.attached = function () {
            this.files = [];
            this.inputEl.value = '';
            this.inputEl.draggedFiles = this.files;
        };
        UIFileInput.prototype.dragEnter = function ($event) {
            this.dragging = true;
            $event.preventDefault();
            return false;
        };
        UIFileInput.prototype.dragExit = function ($event) {
            this.dragging = false;
        };
        UIFileInput.prototype.drop = function ($event) {
            this.dragging = false;
            $event.preventDefault();
            var dt = $event.dataTransfer;
            var files = dt.files;
            for (var i = 0; i < files.length; i++) {
                var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.FileTypes[files[i].type] || 'txt' };
                if (this.files.length == this.maxFiles)
                    this.files.splice(0, 1);
                this.files.push(f);
            }
            ui_event_1.UIEvent.fireEvent('change', this.element, this.files.length);
        };
        UIFileInput.prototype.fileChoose = function (evt) {
            evt.stopPropagation();
            var files = this.inputEl.files;
            for (var i = 0; i < files.length; i++) {
                var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.FileTypes[files[i].type] || 'txt' };
                if (this.files.length == this.maxFiles)
                    this.files.splice(0, 1);
                this.files.push(f);
            }
            ui_event_1.UIEvent.fireEvent('change', this.element, this.files.length);
        };
        UIFileInput.prototype.remove = function (index) {
            this.files.splice(index, 1);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.files.length);
        };
        UIFileInput.FILE_IMAGES = 'png,jpg,jpeg,tiff';
        UIFileInput.FILE_DOCS = 'doc,docx,xls,xlsx,ppt,pptx,csv,rtf,txt,pdf';
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIFileInput.prototype, "maxFiles", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIFileInput.prototype, "fileTypes", void 0);
        UIFileInput = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-file-input\">\n  <div class=\"ui-control-wrapper\">\n    <div class=\"ui-file-drop-zone ${dragging?'dragging':''}\" ref=\"dropZone\" click.trigger=\"inputEl.click()\"\n      dragover.trigger=\"dragEnter($event)\" dragleave.trigger=\"dragExit($event)\" drop.trigger=\"drop($event)\">\n    <span><i class=\"fi-ui-upload-white\"></i> Drop files here<br/>or<br/>click to browse</span>\n    </div>\n    <input type=\"file\" ref=\"inputEl\" class=\"ui-file-input-el\" change.trigger=\"fileChoose($event)\" />\n    <div class=\"ui-file-list\">\n      <p repeat.for=\"file of files\" class=\"ui-row ui-row-h ui-nowrap ui-align-center\">\n      <a click.trigger=\"remove($index)\"><ui-glyph glyph=\"glyph-dialog-close\" class=\"ui-text-danger\"></ui-glyph></a>\n      <span class=\"ui-row ui-row-h ui-nowrap ui-align-center\"><ui-glyph glyph=\"glyph-icon-file\" class=\"ui-text-muted\"></ui-glyph><span>${file.name}<br/>(<small innerhtml.bind=\"file.size | number:'0.00b'\"></small>)</span></span></p>\n    </div>\n  </div>\n</template>"),
            aurelia_framework_1.customElement('ui-file'),
            __metadata("design:paramtypes", [Element])
        ], UIFileInput);
        return UIFileInput;
    }());
    exports.UIFileInput = UIFileInput;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBU0E7UUFBQTtZQUNFLFVBQUssR0FBRyxFQUFFLENBQUM7WUFJWCxhQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7WUFFakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQTZDckIsQ0FBQztRQTNDQywwQkFBSSxHQUFKLFVBQUssY0FBc0IsRUFBRSxlQUF1QjtZQUFwRCxpQkFJQztZQUhDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBWixDQUFZLENBQUM7WUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELHFDQUFlLEdBQWYsVUFBZ0IsUUFBUTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0csQ0FBQztRQUVELHFDQUFlLEdBQWYsVUFBZ0IsUUFBUTtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFFRCw2QkFBTyxHQUFQLFVBQVEsQ0FBQztZQUNQLElBQUksQ0FB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QUFRLENBQUM7b0JBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQ0Qsa0JBQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsNEJBQU0sR0FBTixVQUFPLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsa0JBQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBN0RNLHVCQUFXLEdBQUcsbUJBQW1CLENBQUM7UUFDbEMscUJBQVMsR0FBRyw0Q0FBNEMsQ0FBQztRQUVwRDtZQUFYLDRCQUFRLEVBQUU7O3FEQUFlO1FBQ2Q7WUFBWCw0QkFBUSxFQUFFOztzREFBZ0I7UUFMaEIsV0FBVztZQWhCdkIsOEJBQVUsRUFBRTtZQUNaLDhCQUFVLENBQUMsMmlDQWFBLENBQUM7WUFDWixpQ0FBYSxDQUFDLFNBQVMsQ0FBQzs2Q0FRSyxPQUFPO1dBUHhCLFdBQVcsQ0FnRXZCO1FBQUQsa0JBQUM7S0FoRUQsQUFnRUMsSUFBQTtJQWhFWSxrQ0FBVyIsImZpbGUiOiJlbGVtZW50cy9pbnB1dHMvdWktaW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5cbmltcG9ydCB7IGF1dG9pbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlLCBiaW5kaW5nTW9kZSwgaW5saW5lVmlldyB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7IFVJRXZlbnQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdWktZXZlbnRcIjtcblxuZXhwb3J0IGNsYXNzIFVJQmFzZUlucHV0IHtcbiAgdmFsdWUgPSAnJztcbiAgaW5wdXRFbDtcbiAgZWxlbWVudDtcblxuICBkaXNhYmxlZCA9IGZhbHNlO1xuICByZWFkb25seSA9IGZhbHNlO1xuXG4gIGlzRGlzYWJsZWQgPSBmYWxzZTtcblxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgdGhpcy5lbGVtZW50Wydmb2N1cyddID0gKCkgPT4gdGhpcy5mb2N1cygpO1xuICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2VkKHRoaXMuZGlzYWJsZWQpO1xuICAgIHRoaXMucmVhZG9ubHlDaGFuZ2VkKHRoaXMucmVhZG9ubHkpO1xuICB9XG5cbiAgZGlzYWJsZWRDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdFsodGhpcy5pc0Rpc2FibGVkID0gdGhpcy5kaXNhYmxlZCA9ICEhbmV3VmFsdWUpID8gJ2FkZCcgOiAncmVtb3ZlJ10oJ3VpLWRpc2FibGVkJyk7XG4gIH1cblxuICByZWFkb25seUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0Wyh0aGlzLnJlYWRvbmx5ID0gISFuZXdWYWx1ZSkgPyAnYWRkJyA6ICdyZW1vdmUnXSgndWktcmVhZG9ubHknKTtcbiAgfVxuXG4gIGRpc2FibGUoYikge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3RbKHRoaXMuaXNEaXNhYmxlZCA9IChiIHx8IHRoaXMuZGlzYWJsZWQpKSA/ICdhZGQnIDogJ3JlbW92ZSddKCd1aS1kaXNhYmxlZCcpO1xuICB9XG5cbiAgY2xlYXJJbnB1dCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ2lucHV0JywgdGhpcy5lbGVtZW50LCB0aGlzLnZhbHVlKTtcbiAgICBVSUV2ZW50LmZpcmVFdmVudCgnY2hhbmdlJywgdGhpcy5lbGVtZW50LCB0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGZvY3VzKCkge1xuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xuICB9XG5cbiAgZmlyZUV2ZW50KGV2dCkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBsZXQgZWwgPSBnZXRQYXJlbnRCeUNsYXNzKHRoaXMuZWxlbWVudCwgJ3VpLWlucHV0LWdyb3VwJyk7XG4gICAgaWYgKGV2dC50eXBlID09PSAnZm9jdXMnKSB7XG4gICAgICB0aGlzLmlucHV0RWwuc2VsZWN0KCk7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktZm9jdXMnKTtcbiAgICAgIGlmIChlbCkgZWwuY2xhc3NMaXN0LmFkZCgndWktZm9jdXMnKTtcbiAgICB9XG4gICAgaWYgKGV2dC50eXBlID09PSAnYmx1cicpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1mb2N1cycpO1xuICAgICAgaWYgKGVsKSBlbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1mb2N1cycpO1xuICAgIH1cbiAgICBVSUV2ZW50LmZpcmVFdmVudChldnQudHlwZSwgdGhpcy5lbGVtZW50LCB0aGlzLnZhbHVlKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktaW5wdXQtd3JhcHBlclwiIGNzcy5iaW5kPVwie3dpZHRoOiB3aWR0aH1cIj48ZGl2IHJvbGU9XCJpbnB1dFwiIGNsYXNzPVwidWktaW5wdXQtY29udHJvbFwiIGRpci5iaW5kPVwiZGlyXCI+PHNsb3Q+PC9zbG90PlxuICA8c3BhbiBjbGFzcz1cInVpLWVycm9yXCIgaWYuYmluZD1cImVycm9yc1wiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWludmFsaWRcIj48L3VpLWdseXBoPjx1bCBjbGFzcz1cInVpLWVycm9yLWxpc3RcIj48bGkgcmVwZWF0LmZvcj1cImVyciBvZiBlcnJvcnNcIiBpbm5lcmh0bWwuYmluZD1cImVyclwiPjwvbGk+PC91bD48L3NwYW4+XG4gIDxpbnB1dCByZWY9XCJpbnB1dEVsXCIgdHlwZS5iaW5kPVwidHlwZVwiIHZhbHVlLmJpbmQ9XCJ2YWx1ZVwiIG1heGxlbmd0aC5iaW5kPVwibWF4bGVuZ3RoXCIgZGlyLmJpbmQ9XCJkaXJcIlxuICAgIGZvY3VzLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIGJsdXIudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCIgc3RlcD1cImFueVwiXG4gICAgaW5wdXQudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCIgY2hhbmdlLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiXG4gICAga2V5cHJlc3MudHJpZ2dlcj1cImNoZWNrSW5wdXQoJGV2ZW50KVwiIHBsYWNlaG9sZGVyLmJpbmQ9XCJwbGFjZWhvbGRlclwiXG4gICAgZGlzYWJsZWQuYmluZD1cImlzRGlzYWJsZWRcIiByZWFkb25seS5iaW5kPVwicmVhZG9ubHlcIiBzaXplPVwiMVwiLz5cbiAgPHNwYW4gY2xhc3M9XCJ1aS1jbGVhclwiIGlmLmJpbmQ9XCJjbGVhciAmJiB2YWx1ZVwiIGNsaWNrLnRyaWdnZXI9XCJjbGVhcklucHV0KClcIj4mdGltZXM7PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cInVpLWNvdW50ZXJcIiBpZi5iaW5kPVwiY291bnRlclwiIGlubmVyaHRtbC5iaW5kPVwibWF4bGVuZ3RoIC0gdmFsdWUubGVuZ3RoXCI+PC9zcGFuPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktaW5wdXQtaW5mb1wiIGlmLmJpbmQ9XCJoZWxwVGV4dFwiIGlubmVyaHRtbC5iaW5kPVwiaGVscFRleHRcIj48L2Rpdj5cbjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1pbnB1dCcpXG5leHBvcnQgY2xhc3MgVUlJbnB1dCBleHRlbmRzIFVJQmFzZUlucHV0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY2xlYXIgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY2xlYXInKTtcbiAgICB0aGlzLmNvdW50ZXIgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY291bnRlcicpO1xuXG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCd1cmwnKSkgdGhpcy50eXBlID0gJ3VybCc7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdmaWxlJykpIHRoaXMudHlwZSA9ICdmaWxlJztcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2VtYWlsJykpIHRoaXMudHlwZSA9ICdlbWFpbCc7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdudW1iZXInKSB8fCBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbnVtYmVyLmJpbmQnKSkgdGhpcy50eXBlID0gJ251bWJlcic7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkZWNpbWFsJykgfHwgZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RlY2ltYWwuYmluZCcpKSB0aGlzLnR5cGUgPSAnbnVtYmVyJztcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3Bhc3N3b3JkJykpIHRoaXMudHlwZSA9ICdwYXNzd29yZCc7XG4gIH1cblxuICAvLyBhdXJlbGlhIGhvb2tzXG4gIC8vIGNyZWF0ZWQob3duaW5nVmlldzogVmlldywgbXlWaWV3OiBWaWV3KSB7IH1cbiAgYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkge1xuICAgIHN1cGVyLmJpbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIWlzTmFOKHRoaXMubnVtYmVyKSkgdGhpcy5udW1iZXJDaGFuZ2VkKHRoaXMubnVtYmVyKTtcbiAgICBpZiAoIWlzTmFOKHRoaXMuZGVjaW1hbCkpIHRoaXMuZGVjaW1hbENoYW5nZWQodGhpcy5kZWNpbWFsKTtcblxuICAgIC8vbmVlZCB0byBiZSBpbiBiaW5kIGFuZCBub3QgaW4gY29uc3RydWN0b3IgLSB0byBhdm9pZCByZXNldGluZyB0byBgZmFsc2VgIGFmdGVyIGJpbmRcbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgncmVhZG9ubHknKSkgdGhpcy5yZWFkb25seSA9IHRydWU7XG4gICAgaWYgKHRoaXMuZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpIHRoaXMuaXNEaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuICB9XG4gIC8vIGF0dGFjaGVkKCkgeyB9XG4gIC8vIGRldGFjaGVkKCkgeyB9XG4gIC8vIHVuYmluZCgpIHsgfVxuICAvLyBlbmQgYXVyZWxpYSBob29rc1xuXG4gIEBiaW5kYWJsZSh7IGRlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUudHdvV2F5IH0pIHZhbHVlID0gJyc7XG4gIEBiaW5kYWJsZSh7IGRlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUudHdvV2F5IH0pIG51bWJlcjtcbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgZGVjaW1hbDtcblxuICBAYmluZGFibGUoKSBkaXIgPSAnJztcbiAgQGJpbmRhYmxlKCkgd2lkdGggPSAnYXV0byc7XG4gIEBiaW5kYWJsZSgpIGVycm9ycyA9IG51bGw7XG4gIEBiaW5kYWJsZSgpIG1heGxlbmd0aCA9IDEwMDA7XG4gIEBiaW5kYWJsZSgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBiaW5kYWJsZSgpIHJlYWRvbmx5ID0gZmFsc2U7XG4gIEBiaW5kYWJsZSgpIGhlbHBUZXh0ID0gJyc7XG4gIEBiaW5kYWJsZSgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgcHJpdmF0ZSB0eXBlID0gJ3RleHQnO1xuICBwcml2YXRlIGNsZWFyID0gZmFsc2U7XG4gIHByaXZhdGUgY291bnRlciA9IGZhbHNlO1xuXG4gIHZhbHVlQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICBsZXQgbnVtID0gcGFyc2VGbG9hdChuZXdWYWx1ZSk7XG4gICAgICB0aGlzLmRlY2ltYWwgPSB0aGlzLm51bWJlciA9IGlzTmFOKG51bSkgPyBudWxsIDogbnVtO1xuICAgICAgaWYgKCF0aGlzLm51bWJlciAmJiB0aGlzLm51bWJlciAhPT0gMCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbnVtYmVyQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSAoIW5ld1ZhbHVlICYmIG5ld1ZhbHVlICE9PSAwKSA/ICcnIDogbmV3VmFsdWU7XG4gIH1cblxuICBkZWNpbWFsQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSAoIW5ld1ZhbHVlICYmIG5ld1ZhbHVlICE9PSAwKSA/ICcnIDogbmV3VmFsdWU7XG4gIH1cblxuICBmaXJlRXZlbnQoZXZ0KSB7XG4gICAgaWYgKGV2dC50eXBlID09PSAnaW5wdXQnKSB7XG4gICAgICBpZiAodGhpcy50eXBlID09PSAnZW1haWwnKSB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBzdXBlci5maXJlRXZlbnQoZXZ0KTtcbiAgfVxuXG4gIGNoZWNrSW5wdXQoZXZ0KSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBjb2RlID0gZXZ0LmtleUNvZGUgfHwgZXZ0LndoaWNoO1xuICAgIGlmIChldnQuY3RybEtleSB8fCBldnQubWV0YUtleSB8fCBldnQuYWx0S2V5IHx8IGNvZGUgPT0gOSB8fCBjb2RlID09IDgpIHJldHVybiB0cnVlO1xuICAgIGlmIChjb2RlID09IDEzKSByZXR1cm4gVUlFdmVudC5maXJlRXZlbnQoJ2VudGVycHJlc3NlZCcsIHRoaXMuZWxlbWVudCk7XG4gICAgaWYgKHRoaXMudHlwZSA9PSAnZW1haWwnKSByZXR1cm4gL1thLXpBLVowLTlcXEBcXC1cXC5cXF9cXCZcXCtcXCRdLy50ZXN0KFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSkpO1xuICAgIGlmICh0aGlzLnR5cGUgPT0gJ3VybCcpIHJldHVybiAvW2EtekEtWjAtOVxcL1xcLVxcLlxcX1xcP1xcI1xcJVxcPVxcJFxcO1xcOlxce1xcW1xcXVxcfVxcJlxcK10vLnRlc3QoU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKSk7XG4gICAgaWYgKHRoaXMudHlwZSA9PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIC9bMC05XFwuXFwtXS8udGVzdChTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cblxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktaW5wdXQtd3JhcHBlciB1aS1maWxlLWlucHV0XCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1jb250cm9sLXdyYXBwZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwidWktZmlsZS1kcm9wLXpvbmUgXFwke2RyYWdnaW5nPydkcmFnZ2luZyc6Jyd9XCIgcmVmPVwiZHJvcFpvbmVcIiBjbGljay50cmlnZ2VyPVwiaW5wdXRFbC5jbGljaygpXCJcbiAgICAgIGRyYWdvdmVyLnRyaWdnZXI9XCJkcmFnRW50ZXIoJGV2ZW50KVwiIGRyYWdsZWF2ZS50cmlnZ2VyPVwiZHJhZ0V4aXQoJGV2ZW50KVwiIGRyb3AudHJpZ2dlcj1cImRyb3AoJGV2ZW50KVwiPlxuICAgIDxzcGFuPjxpIGNsYXNzPVwiZmktdWktdXBsb2FkLXdoaXRlXCI+PC9pPiBEcm9wIGZpbGVzIGhlcmU8YnIvPm9yPGJyLz5jbGljayB0byBicm93c2U8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgcmVmPVwiaW5wdXRFbFwiIGNsYXNzPVwidWktZmlsZS1pbnB1dC1lbFwiIGNoYW5nZS50cmlnZ2VyPVwiZmlsZUNob29zZSgkZXZlbnQpXCIgLz5cbiAgICA8ZGl2IGNsYXNzPVwidWktZmlsZS1saXN0XCI+XG4gICAgICA8cCByZXBlYXQuZm9yPVwiZmlsZSBvZiBmaWxlc1wiIGNsYXNzPVwidWktcm93IHVpLXJvdy1oIHVpLW5vd3JhcCB1aS1hbGlnbi1jZW50ZXJcIj5cbiAgICAgIDxhIGNsaWNrLnRyaWdnZXI9XCJyZW1vdmUoJGluZGV4KVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWRpYWxvZy1jbG9zZVwiIGNsYXNzPVwidWktdGV4dC1kYW5nZXJcIj48L3VpLWdseXBoPjwvYT5cbiAgICAgIDxzcGFuIGNsYXNzPVwidWktcm93IHVpLXJvdy1oIHVpLW5vd3JhcCB1aS1hbGlnbi1jZW50ZXJcIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1pY29uLWZpbGVcIiBjbGFzcz1cInVpLXRleHQtbXV0ZWRcIj48L3VpLWdseXBoPjxzcGFuPlxcJHtmaWxlLm5hbWV9PGJyLz4oPHNtYWxsIGlubmVyaHRtbC5iaW5kPVwiZmlsZS5zaXplIHwgbnVtYmVyOicwLjAwYidcIj48L3NtYWxsPik8L3NwYW4+PC9zcGFuPjwvcD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktZmlsZScpXG5leHBvcnQgY2xhc3MgVUlGaWxlSW5wdXQge1xuICBzdGF0aWMgRklMRV9JTUFHRVMgPSAncG5nLGpwZyxqcGVnLHRpZmYnO1xuICBzdGF0aWMgRklMRV9ET0NTID0gJ2RvYyxkb2N4LHhscyx4bHN4LHBwdCxwcHR4LGNzdixydGYsdHh0LHBkZic7XG5cbiAgQGJpbmRhYmxlKCkgbWF4RmlsZXMgPSAxMDtcbiAgQGJpbmRhYmxlKCkgZmlsZVR5cGVzID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICAvLyBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7IH1cbiAgYXR0YWNoZWQoKSB7XG4gICAgdGhpcy5maWxlcyA9IFtdO1xuICAgIHRoaXMuaW5wdXRFbC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuaW5wdXRFbC5kcmFnZ2VkRmlsZXMgPSB0aGlzLmZpbGVzO1xuICB9XG4gIC8vIGRldGFjaGVkKCkgeyB9XG4gIC8vIHVuYmluZCgpIHsgfVxuICAvLyBlbmQgYXVyZWxpYSBob29rc1xuXG4gIGlucHV0RWw7XG4gIGZpbGVzID0gW107XG4gIGRyYWdnaW5nID0gZmFsc2U7XG4gIGRyYWdFbnRlcigkZXZlbnQpIHtcbiAgICB0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBkcmFnRXhpdCgkZXZlbnQpIHtcbiAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG4gIH1cblxuICBkcm9wKCRldmVudCkge1xuICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBkdCA9ICRldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgdmFyIGZpbGVzID0gZHQuZmlsZXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGYgPSB7IGZpbGU6IGZpbGVzW2ldLCBuYW1lOiBmaWxlc1tpXS5uYW1lLCBzaXplOiBmaWxlc1tpXS5zaXplIHx8IDAsIGV4dDogd2luZG93LkZpbGVUeXBlc1tmaWxlc1tpXS50eXBlXSB8fCAndHh0JyB9XG4gICAgICBpZiAodGhpcy5maWxlcy5sZW5ndGggPT0gdGhpcy5tYXhGaWxlcykgdGhpcy5maWxlcy5zcGxpY2UoMCwgMSk7XG4gICAgICB0aGlzLmZpbGVzLnB1c2goZik7XG4gICAgfVxuICAgIFVJRXZlbnQuZmlyZUV2ZW50KCdjaGFuZ2UnLCB0aGlzLmVsZW1lbnQsIHRoaXMuZmlsZXMubGVuZ3RoKTtcbiAgfVxuXG4gIGZpbGVDaG9vc2UoZXZ0KSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHZhciBmaWxlcyA9IHRoaXMuaW5wdXRFbC5maWxlcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZiA9IHsgZmlsZTogZmlsZXNbaV0sIG5hbWU6IGZpbGVzW2ldLm5hbWUsIHNpemU6IGZpbGVzW2ldLnNpemUgfHwgMCwgZXh0OiB3aW5kb3cuRmlsZVR5cGVzW2ZpbGVzW2ldLnR5cGVdIHx8ICd0eHQnIH1cbiAgICAgIGlmICh0aGlzLmZpbGVzLmxlbmd0aCA9PSB0aGlzLm1heEZpbGVzKSB0aGlzLmZpbGVzLnNwbGljZSgwLCAxKTtcbiAgICAgIHRoaXMuZmlsZXMucHVzaChmKTtcbiAgICB9XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ2NoYW5nZScsIHRoaXMuZWxlbWVudCwgdGhpcy5maWxlcy5sZW5ndGgpO1xuICB9XG5cbiAgcmVtb3ZlKGluZGV4KSB7XG4gICAgdGhpcy5maWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIFVJRXZlbnQuZmlyZUV2ZW50KCdjaGFuZ2UnLCB0aGlzLmVsZW1lbnQsIHRoaXMuZmlsZXMubGVuZ3RoKTtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9
