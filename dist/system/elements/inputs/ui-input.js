System.register(["aurelia-framework", "../../utils/ui-event"], function (exports_1, context_1) {
    "use strict";
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
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, ui_event_1, UIBaseInput, UIInput, UIFileInput;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ui_event_1_1) {
                ui_event_1 = ui_event_1_1;
            }
        ],
        execute: function () {
            UIBaseInput = (function () {
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
                    this.element.classList[(this.isDisabled = this.disabled = isTrue(newValue)) ? 'add' : 'remove']('ui-disabled');
                };
                UIBaseInput.prototype.readonlyChanged = function (newValue) {
                    this.element.classList[(this.readonly = isTrue(newValue)) ? 'add' : 'remove']('ui-readonly');
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
            exports_1("UIBaseInput", UIBaseInput);
            UIInput = (function (_super) {
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
                    _this.info = '';
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
                };
                UIInput.prototype.valueChanged = function (newValue) {
                    if (this.type === 'number') {
                        var num = parseFloat(newValue);
                        this.number = isNaN(num) ? null : num;
                        this.decimal = isNaN(num) ? null : num;
                        if (this.number === null && this.decimal === null) {
                            this.value = '';
                        }
                    }
                };
                UIInput.prototype.numberChanged = function (newValue) {
                    this.value = newValue === null ? '' : newValue;
                };
                UIInput.prototype.decimalChanged = function (newValue) {
                    this.value = newValue === null ? '' : newValue;
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
                ], UIInput.prototype, "info", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIInput.prototype, "placeholder", void 0);
                UIInput = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\" css.bind=\"{width: width}\"><div role=\"input\" class=\"ui-input-control\"><slot></slot>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type.bind=\"type\" value.bind=\"value\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\" step=\"any\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keypress.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\" size=\"1\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"maxlength - value.length\"></span></div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n</template>"),
                    aurelia_framework_1.customElement('ui-input'),
                    __metadata("design:paramtypes", [Element])
                ], UIInput);
                return UIInput;
            }(UIBaseInput));
            exports_1("UIInput", UIInput);
            UIFileInput = (function () {
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
                    aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-file-input\">\n  <div class=\"ui-control-wrapper\">\n    <div class=\"ui-file-drop-zone ${dragging?'dragging':''}\" ref=\"dropZone\" click.trigger=\"inputEl.click()\"\n      dragover.trigger=\"dragEnter($event)\" dragleave.trigger=\"dragExit($event)\" drop.trigger=\"drop($event)\">\n    <span><i class=\"fi-ui-upload-white\"></i> Drop files here<br/>or<br/>click to browse</span>\n    </div>\n    <input type=\"file\" ref=\"inputEl\" class=\"ui-file-input-el\" change.trigger=\"fileChoose($event)\" />\n    <div class=\"ui-file-list\">\n      <p repeat.for=\"file of files\" class=\"ui-row ui-row-middle\">\n      <a click.trigger=\"remove($index)\"><ui-glyph glyph=\"glyph-dialog-close\" class=\"ui-text-danger\"></ui-glyph></a>\n      <span class=\"ui-col-fill ui-row ui-row-middle\"><ui-glyph glyph=\"glyph-icon-file\" class=\"ui-text-muted\"></ui-glyph><span>${file.name}<br/>(<small innerhtml.bind=\"file.size | number:'0.00b'\"></small>)</span></span></p>\n    </div>\n  </div>\n</template>"),
                    aurelia_framework_1.customElement('ui-file'),
                    __metadata("design:paramtypes", [Element])
                ], UIFileInput);
                return UIFileInput;
            }());
            exports_1("UIFileInput", UIFileInput);
        }
    };
});
