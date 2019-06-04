'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk.js');
var aureliaFramework = require('aurelia-framework');
var libphonenumberJs = require('libphonenumber-js');
require('aurelia-event-aggregator');
var __chunk_3 = require('./chunk3.js');
var __chunk_6 = require('./chunk6.js');
var examples = _interopDefault(require('libphonenumber-js/examples.mobile.json'));

var view = "<template class=\"ui-option\" data-disabled.bind=\"disabled || isDisabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"checkbox\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <ui-svg-icon icon=\"check-off\"></ui-svg-icon>\n    <ui-svg-icon icon=\"check-on\"></ui-svg-icon>\n    <span>\n      <slot></slot>\n    </span>\n  </label>\n</template>\n";

var UICheckbox = (function () {
    function UICheckbox(element) {
        this.element = element;
        this.disabled = false;
        this.isDisabled = false;
    }
    UICheckbox.prototype.disable = function (b) {
        this.isDisabled = b;
    };
    UICheckbox.prototype.bind = function () {
        if (this.checked === "true") {
            this.checked = true;
        }
    };
    UICheckbox.prototype.checkChanged = function ($event) {
        $event.stopPropagation();
        this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("change", this));
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Object)
    ], UICheckbox.prototype, "checked", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UICheckbox.prototype, "model", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Function)
    ], UICheckbox.prototype, "matcher", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UICheckbox.prototype, "disabled", void 0);
    UICheckbox = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-checkbox"),
        aureliaFramework.inlineView(view),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UICheckbox);
    return UICheckbox;
}());

var UIField = (function () {
    function UIField(element) {
        this.element = element;
        this.label = "";
        this.plain = false;
        this.required = false;
        this.disabled = false;
        this.width = "auto";
        if (element.hasAttribute("nolabel")) {
            element.classList.add("ui-field--nolabel");
        }
        if (element.hasAttribute("inline")) {
            element.classList.add("ui-field--inline");
        }
    }
    UIField.prototype.focus = function () {
        var el = this.element.querySelector("input, textarea");
        if (el !== null) {
            el.focus();
        }
    };
    Object.defineProperty(UIField.prototype, "classes", {
        get: function () {
            var classes = [];
            if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
                classes.push("ui-field--plain");
            }
            if (this.required === "" || this.required === "required" || isTrue(this.required)) {
                classes.push("ui-field--required");
            }
            return classes.join(" ");
        },
        enumerable: true,
        configurable: true
    });
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIField.prototype, "label", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIField.prototype, "plain", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIField.prototype, "required", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIField.prototype, "disabled", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIField.prototype, "width", void 0);
    __chunk_1.__decorate([
        aureliaFramework.computedFrom("plain", "required"),
        __chunk_1.__metadata("design:type", String),
        __chunk_1.__metadata("design:paramtypes", [])
    ], UIField.prototype, "classes", null);
    UIField = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-field"),
        aureliaFramework.inlineView("<template aria-required.bind=\"required\" aria-disabled.bind=\"disabled\" class=\"ui-field ${classes}\" css.bind=\"{width}\">\n<label class=\"ui-field__label\" role=\"text\" click.trigger=\"focus()\">${label}</label>\n<slot></slot>\n</template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIField);
    return UIField;
}());

var UIFieldWrapper = (function () {
    function UIFieldWrapper() {
        this.plain = false;
    }
    Object.defineProperty(UIFieldWrapper.prototype, "classes", {
        get: function () {
            var classes = [];
            if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
                classes.push("ui-field__wrapper--plain");
            }
            return classes.join(" ");
        },
        enumerable: true,
        configurable: true
    });
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIFieldWrapper.prototype, "plain", void 0);
    __chunk_1.__decorate([
        aureliaFramework.computedFrom("plain"),
        __chunk_1.__metadata("design:type", String),
        __chunk_1.__metadata("design:paramtypes", [])
    ], UIFieldWrapper.prototype, "classes", null);
    UIFieldWrapper = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-field-wrapper"),
        aureliaFramework.inlineView("<template class=\"ui-field__wrapper ${classes}\">\n  <slot></slot>\n  </template>")
    ], UIFieldWrapper);
    return UIFieldWrapper;
}());

var view$1 = "<template>\n  <fieldset class=\"ui-fieldset ${class}\" data-open.bind=\"!optional || checked\" ref=\"vmElement\">\n    <legend if.bind=\"label\">\n      <ui-checkbox if.bind=\"optional\" checked.bind=\"checked\">${label}</ui-checkbox>\n      <span if.bind=\"!optional\">${label}</span>\n    </legend>\n    <div class=\"ui-fieldset__body\">\n      <slot></slot>\n    </div>\n  </fieldset>\n</template>\n";

var UIFieldset = (function () {
    function UIFieldset(element) {
        this.checked = false;
        this.label = "";
        this.class = "";
        this.disabled = false;
        this.fields = [];
        this.optional = false;
        this.optional = element.hasAttribute("optional");
    }
    UIFieldset.prototype.bind = function () {
        this.optional = this.optional || !!this.checked;
    };
    UIFieldset.prototype.attached = function () {
        var _this = this;
        __chunk_3.UIInternal.queueTask(function () {
            _this.fields = _this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle");
            _this.disabledChanged();
        });
    };
    UIFieldset.prototype.disabledChanged = function () {
        var _this = this;
        this.fields.forEach(function (el) { return el.au.controller.viewModel.disable(!!_this.disabled); });
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIFieldset.prototype, "checked", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIFieldset.prototype, "label", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIFieldset.prototype, "class", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIFieldset.prototype, "disabled", void 0);
    UIFieldset = __chunk_1.__decorate([
        aureliaFramework.containerless(),
        aureliaFramework.customElement("ui-fieldset"),
        aureliaFramework.inlineView(view$1),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIFieldset);
    return UIFieldset;
}());

var view$2 = "<template class=\"ui-input ui-input-file ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <div ref=\"dropZone\" if.bind=\"maxFiles>1\" class=\"ui-input-file__dropzone ${dragging?'dragging':''}\" click.trigger=\"inputEl.click()\" dragover.trigger=\"dragEnter($event)\" dragleave.trigger=\"dragExit($event)\" drop.trigger=\"drop($event)\">\n      <ui-svg-icon icon=\"upload\"></ui-svg-icon>\n      <span>Drop files here<br>or click to browse</span>\n    </div>\n    <input type=\"file\" ref=\"inputEl\" role=\"file\" size=\"1\" change.trigger=\"fileChoose($event)\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n  <div class=\"ui-input-file__list\" if.bind=\"maxFiles>1\">\n    <div repeat.for=\"file of files\">\n      <a click.trigger=\"remove($index)\"><ui-svg-icon icon=\"cross\" ui-color=\"red\"></ui-svg-icon></a>\n      <label>${file.name}</label>\n      <span ui-color=\"muted\">(<small innerhtml.bind=\"file.size | number:'0.00b'\"></small>)</span>\n    </div>\n  </div>\n</template>\n";

var UIFileInput = (function (_super) {
    __chunk_1.__extends(UIFileInput, _super);
    function UIFileInput(element) {
        var _this = _super.call(this, element) || this;
        _this.value = "";
        _this.placeholder = "";
        _this.maxFiles = 1;
        _this.readonly = false;
        _this.disabled = false;
        _this.files = [];
        _this.dragging = false;
        return _this;
    }
    UIFileInput.prototype.attached = function () {
        this.files = [];
        this.inputEl.value = "";
        this.inputEl.draggedFiles = this.files;
    };
    UIFileInput.prototype.dragEnter = function ($event) {
        this.dragging = true;
        $event.preventDefault();
        return false;
    };
    UIFileInput.prototype.dragExit = function () {
        this.dragging = false;
    };
    UIFileInput.prototype.drop = function ($event) {
        this.dragging = false;
        $event.preventDefault();
        this.mutateFiles($event.dataTransfer.files);
        return false;
    };
    UIFileInput.prototype.fileChoose = function (evt) {
        evt.stopPropagation();
        this.mutateFiles(this.inputEl.files);
    };
    UIFileInput.prototype.remove = function (index) {
        this.files.splice(index, 1);
        this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("change", this.files.length));
    };
    UIFileInput.prototype.mutateFiles = function (files) {
        var e_1, _a;
        try {
            for (var files_1 = __chunk_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                var file = files_1_1.value;
                var f = {
                    file: file,
                    name: file.name,
                    size: file.size || 0,
                    ext: file.type
                };
                if (this.files.length === this.maxFiles) {
                    this.files.splice(0, 1);
                }
                this.files.push(f);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("change", this.files.length));
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", String)
    ], UIFileInput.prototype, "value", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIFileInput.prototype, "placeholder", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIFileInput.prototype, "errors", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Number)
    ], UIFileInput.prototype, "maxFiles", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIFileInput.prototype, "readonly", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIFileInput.prototype, "disabled", void 0);
    UIFileInput = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-file"),
        aureliaFramework.viewResources(__chunk_6.InputWrapper),
        aureliaFramework.inlineView(view$2),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIFileInput);
    return UIFileInput;
}(__chunk_6.BaseInput));

var UIForm = (function () {
    function UIForm(element) {
        this.element = element;
        this.disabled = false;
    }
    UIForm.prototype.attached = function () {
        var _this = this;
        __chunk_3.UIInternal.queueTask(function () {
            var el = _this.vmElement.querySelector("[autofocus] input, [autofocus] textarea");
            if (el !== null) {
                el.focus();
            }
            _this.disabledChanged();
        });
    };
    UIForm.prototype.disabledChanged = function () {
        var _this = this;
        if (this.vmElement) {
            var fields = this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle,ui-select,ui-list,ui-date-input");
            fields.forEach(function (el) { return el.au.controller.viewModel.disable(!!_this.disabled); });
        }
    };
    UIForm.prototype.fireSubmit = function () {
        this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("submit"));
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIForm.prototype, "disabled", void 0);
    UIForm = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-form"),
        aureliaFramework.inlineView("<template class=\"ui-block\"><form ref=\"vmElement\" role=\"form\" aria-disabled.bind=\"disabled\" class=\"ui-form\"\n   enterpressed.delegate=\"fireSubmit($event)\" validation-renderer=\"ui-validator\"><slot></slot></form></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIForm);
    return UIForm;
}());

var view$3 = "<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\" type.bind=\"type\" autocomplete.bind=\"autocomplete\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n</template>\n";

var UIInput = (function (_super) {
    __chunk_1.__extends(UIInput, _super);
    function UIInput(element) {
        var _this = _super.call(this, element) || this;
        _this.value = "";
        _this.number = null;
        _this.type = "text";
        _this.placeholder = "";
        _this.autocomplete = "";
        _this.maxlength = 0;
        _this.readonly = false;
        _this.disabled = false;
        _this.ignoreChange = false;
        if (element.hasAttribute("number") || element.hasAttribute("number.bind")) {
            _this.type = "number";
        }
        return _this;
    }
    UIInput.prototype.attached = function () {
        this.maxlengthChanged();
    };
    UIInput.prototype.valueChanged = function () {
        var _this = this;
        if (!this.ignoreChange && this.type === "number") {
            this.ignoreChange = true;
            this.number = isNaN(this.value) ? null : parseFloat(this.value);
            __chunk_3.UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
        }
    };
    UIInput.prototype.numberChanged = function () {
        var _this = this;
        if (!this.ignoreChange && this.type === "number") {
            this.ignoreChange = true;
            this.value = this.number.toString();
            __chunk_3.UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
        }
    };
    Object.defineProperty(UIInput.prototype, "counter", {
        get: function () {
            if (this.maxlength) {
                return "" + (this.maxlength - (this.value ? this.value.length : 0));
            }
            else {
                return "" + (this.value ? this.value.length : 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    UIInput.prototype.maxlengthChanged = function () {
        if (this.inputEl) {
            this.inputEl.removeAttribute("maxLength");
            if (this.maxlength > 0) {
                this.inputEl.maxLength = this.maxlength;
            }
        }
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", String)
    ], UIInput.prototype, "value", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Number)
    ], UIInput.prototype, "number", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIInput.prototype, "type", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIInput.prototype, "placeholder", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIInput.prototype, "autocomplete", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Number)
    ], UIInput.prototype, "maxlength", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIInput.prototype, "errors", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIInput.prototype, "readonly", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIInput.prototype, "disabled", void 0);
    __chunk_1.__decorate([
        aureliaFramework.computedFrom("value", "maxlength"),
        __chunk_1.__metadata("design:type", Object),
        __chunk_1.__metadata("design:paramtypes", [])
    ], UIInput.prototype, "counter", null);
    UIInput = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-input"),
        aureliaFramework.viewResources(__chunk_6.InputWrapper),
        aureliaFramework.inlineView(view$3),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIInput);
    return UIInput;
}(__chunk_6.BaseInput));

var UIInputAddon = (function () {
    function UIInputAddon(element) {
        this.element = element;
        this.width = "auto";
        this.icon = "";
        if (element.hasAttribute("align-end")) {
            element.classList.add("ui-input__addon--end");
        }
    }
    UIInputAddon_1 = UIInputAddon;
    UIInputAddon.prototype.focusInput = function () {
        try {
            var el = this.element;
            if (getViewModel(el.nextElementSibling) instanceof UIInputAddon_1) {
                el = el.nextElementSibling;
            }
            var vm = getViewModel(el.nextElementSibling);
            if (vm instanceof __chunk_6.BaseInput) {
                vm.focus();
            }
            else if (el.nextElementSibling instanceof HTMLInputElement) {
                el.nextElementSibling.focus();
            }
        }
        catch (e) {
        }
    };
    var UIInputAddon_1;
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIInputAddon.prototype, "width", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIInputAddon.prototype, "icon", void 0);
    UIInputAddon = UIInputAddon_1 = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-input-addon"),
        aureliaFramework.inlineView("<template class=\"ui-input__addon\" click.trigger=\"focusInput() & debounce:10\" css.bind=\"{width}\"><slot><ui-icon icon.bind=\"icon\"></ui-icon></slot></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIInputAddon);
    return UIInputAddon;
}());

var UIInputInfo = (function () {
    function UIInputInfo(element) {
        this.element = element;
    }
    UIInputInfo = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-input-info"),
        aureliaFramework.inlineView("<template class=\"ui-input__info\"><slot></slot></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIInputInfo);
    return UIInputInfo;
}());

var view$4 = "<template class=\"ui-option\" data-disabled.bind=\"isDisabled || disabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"radio\" name.bind=\"name\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <ui-svg-icon icon=\"radio-off\"></ui-svg-icon>\n    <ui-svg-icon icon=\"radio-on\"></ui-svg-icon>\n    <span>\n      <slot></slot>\n    </span>\n  </label>\n</template>\n";

var UIRadio = (function () {
    function UIRadio(element) {
        this.element = element;
        this.name = "optGroup";
        this.disabled = false;
        this.isDisabled = false;
    }
    UIRadio.prototype.disable = function (b) {
        this.isDisabled = b;
    };
    UIRadio.prototype.checkChanged = function ($event) {
        $event.stopPropagation();
        this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("change", this));
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Object)
    ], UIRadio.prototype, "checked", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIRadio.prototype, "model", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneTime }),
        __chunk_1.__metadata("design:type", String)
    ], UIRadio.prototype, "name", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Function)
    ], UIRadio.prototype, "matcher", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIRadio.prototype, "disabled", void 0);
    UIRadio = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-radio"),
        aureliaFramework.inlineView(view$4),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIRadio);
    return UIRadio;
}());

var UIOptionGroup = (function () {
    function UIOptionGroup() {
        this.value = false;
        this.name = "optGroup";
        this.disabled = false;
        this.options = [];
    }
    UIOptionGroup.prototype.optionsChanged = function () {
        var _this = this;
        if (this.options !== null) {
            this.options.forEach(function (element) {
                if (element instanceof UIRadio) {
                    element.name = _this.name;
                }
                element.matcher = _this.matcher;
            });
            this.valueChanged();
        }
    };
    UIOptionGroup.prototype.checkChanged = function ($event) {
        var _this = this;
        if (this.value !== false) {
            __chunk_3.UIInternal.queueTask(function () {
                _this.value = $event.detail.checked;
            });
        }
    };
    UIOptionGroup.prototype.disabledChanged = function () {
        var _this = this;
        this.options.forEach(function (el) { return el.disable(!!_this.disabled); });
    };
    UIOptionGroup.prototype.valueChanged = function () {
        var _this = this;
        if (this.options && this.value !== false) {
            __chunk_3.UIInternal.queueTask(function () {
                _this.options.forEach(function (element) { return (element.checked = _this.value); });
            });
        }
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Object)
    ], UIOptionGroup.prototype, "value", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIOptionGroup.prototype, "name", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Function)
    ], UIOptionGroup.prototype, "matcher", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIOptionGroup.prototype, "disabled", void 0);
    __chunk_1.__decorate([
        aureliaFramework.children("ui-radio, ui-checkbox, ui-toggle"),
        __chunk_1.__metadata("design:type", Array)
    ], UIOptionGroup.prototype, "options", void 0);
    UIOptionGroup = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-option-group"),
        aureliaFramework.inlineView("<template class=\"ui-option__group ${disabled ? 'ui-option--disabled' : ''}\" change.trigger=\"checkChanged($event)\"><slot></slot></template>")
    ], UIOptionGroup);
    return UIOptionGroup;
}());

var UIPasswordMeter = (function () {
    function UIPasswordMeter() {
        this.score = 0;
        this.hasPassword = false;
        this.tooltip = "";
        this.maxStrength = 4;
    }
    Object.defineProperty(UIPasswordMeter.prototype, "strength", {
        get: function () {
            if (this.hasPassword) {
                var s = (this.score / this.maxStrength) * 100;
                return { "--password-strength": (s || 5) + "%" };
            }
            return { "--password-strength": 0 };
        },
        enumerable: true,
        configurable: true
    });
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Number)
    ], UIPasswordMeter.prototype, "score", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIPasswordMeter.prototype, "hasPassword", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIPasswordMeter.prototype, "tooltip", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Number)
    ], UIPasswordMeter.prototype, "maxStrength", void 0);
    __chunk_1.__decorate([
        aureliaFramework.computedFrom("score", "maxStrength", "hasPassword"),
        __chunk_1.__metadata("design:type", Object),
        __chunk_1.__metadata("design:paramtypes", [])
    ], UIPasswordMeter.prototype, "strength", null);
    UIPasswordMeter = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-password-meter"),
        aureliaFramework.inlineView("<template class=\"ui-password-meter\" css.bind=\"strength\" ui-tooltip.bind=\"tooltip\"></template>")
    ], UIPasswordMeter);
    return UIPasswordMeter;
}());

var view$5 = "<template class=\"ui-input ui-phone ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <ui-flag code.bind=\"inputCountry\"></ui-flag>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"inputValue\" autocomplete.bind=\"autocomplete\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n</template>\n";

var UIPhone = (function (_super) {
    __chunk_1.__extends(UIPhone, _super);
    function UIPhone(element) {
        var _this = _super.call(this, element) || this;
        _this.value = "";
        _this.type = "any";
        _this.country = "";
        _this.readonly = false;
        _this.disabled = false;
        _this.inputValue = "";
        _this.inputCountry = "";
        _this.placeholder = "";
        _this.ignoreChange = false;
        _this.showCounter = false;
        return _this;
    }
    UIPhone.prototype.attached = function () {
        this.countryChanged();
    };
    UIPhone.prototype.valueChanged = function () {
        var _this = this;
        if (!this.ignoreChange) {
            this.ignoreChange = true;
            this.update(this.value);
            __chunk_3.UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
        }
    };
    UIPhone.prototype.countryChanged = function () {
        this.inputCountry = this.country;
        var examplePhone = libphonenumberJs.getExampleNumber((this.country || "US"), examples);
        this.placeholder = !!this.country ? examplePhone.formatNational() : examplePhone.formatInternational();
    };
    UIPhone.prototype.inputValueChanged = function () {
        var _this = this;
        if (!this.ignoreChange) {
            this.ignoreChange = true;
            var val = "" + this.inputValue;
            if (!this.country && val !== "" && !val.startsWith("+")) {
                val = "+" + val;
            }
            this.update(val);
            __chunk_3.UIInternal.queueTask(function () { return (_this.ignoreChange = false); });
        }
    };
    UIPhone.prototype.update = function (value) {
        var newInput = new libphonenumberJs.AsYouType(this.country);
        this.inputValue = newInput.input(value);
        this.inputCountry = this.country || newInput.country;
        if (newInput.getNumber()) {
            this.value = newInput.getNumber().number.toString();
        }
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", String)
    ], UIPhone.prototype, "value", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIPhone.prototype, "type", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIPhone.prototype, "country", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIPhone.prototype, "errors", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIPhone.prototype, "readonly", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIPhone.prototype, "disabled", void 0);
    __chunk_1.__decorate([
        aureliaFramework.observable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIPhone.prototype, "inputValue", void 0);
    UIPhone = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-phone"),
        aureliaFramework.viewResources(__chunk_6.InputWrapper),
        aureliaFramework.inlineView(view$5),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIPhone);
    return UIPhone;
}(__chunk_6.BaseInput));

var UISlider = (function () {
    function UISlider() {
        this.value = 0;
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.disabled = false;
    }
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Number)
    ], UISlider.prototype, "value", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Number)
    ], UISlider.prototype, "min", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Number)
    ], UISlider.prototype, "max", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Number)
    ], UISlider.prototype, "step", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UISlider.prototype, "disabled", void 0);
    UISlider = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-slider"),
        aureliaFramework.inlineView("<template class=\"ui-slider\" css.bind=\"{'--slider-pos': (value-min)/(max-min)}\">\n<div class=\"ui-slider__bubble\">${value}</div>\n<span class=\"ui-slider__min\">${min}</span>\n<span class=\"ui-slider__max\">${max}</span>\n<div class=\"ui-slider__bar\">\n  <input type=\"range\" value.bind=\"value\" step.bind=\"step\" min.bind=\"min\" max.bind=\"max\" />\n</div>\n</template>")
    ], UISlider);
    return UISlider;
}());

var view$6 = "<template class=\"ui-input ui-input--textarea ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <textarea class=\"ui-input__control\" ref=\"inputEl\" role=\"textbox\" rows.bind=\"rows\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\"></textarea>\n  </input-wrapper>\n</template>\n";

var UITextarea = (function (_super) {
    __chunk_1.__extends(UITextarea, _super);
    function UITextarea(element) {
        var _this = _super.call(this, element) || this;
        _this.value = "";
        _this.number = null;
        _this.placeholder = "";
        _this.rows = 4;
        _this.maxlength = 0;
        _this.readonly = false;
        _this.disabled = false;
        return _this;
    }
    Object.defineProperty(UITextarea.prototype, "counter", {
        get: function () {
            if (this.maxlength) {
                return (this.value ? this.value.length : 0) + " of " + this.maxlength;
            }
            else {
                return "" + (this.value ? this.value.length : 0);
            }
        },
        enumerable: true,
        configurable: true
    });
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", String)
    ], UITextarea.prototype, "value", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Number)
    ], UITextarea.prototype, "number", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UITextarea.prototype, "placeholder", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Number)
    ], UITextarea.prototype, "rows", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Number)
    ], UITextarea.prototype, "maxlength", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UITextarea.prototype, "errors", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UITextarea.prototype, "readonly", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UITextarea.prototype, "disabled", void 0);
    __chunk_1.__decorate([
        aureliaFramework.computedFrom("value", "maxlength"),
        __chunk_1.__metadata("design:type", Object),
        __chunk_1.__metadata("design:paramtypes", [])
    ], UITextarea.prototype, "counter", null);
    UITextarea = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-textarea"),
        aureliaFramework.viewResources(__chunk_6.InputWrapper),
        aureliaFramework.inlineView(view$6),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UITextarea);
    return UITextarea;
}(__chunk_6.BaseInput));

var view$7 = "<template class=\"ui-option\" data-disabled.bind=\"disabled || isDisabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"checkbox\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <div class=\"ui-option__toggle\" css.bind=\"{'--toggle-on': labelOn, '--toggle-off': labelOff, width}\"></div>\n    <span><slot></slot></span>\n  </label>\n</template>\n";

var UIToggle = (function () {
    function UIToggle(element) {
        this.element = element;
        this.disabled = false;
        this.labelOn = "";
        this.labelOff = "";
        this.isDisabled = false;
    }
    UIToggle.prototype.disable = function (b) {
        this.isDisabled = b;
    };
    UIToggle.prototype.bind = function () {
        if (isTrue(this.checked)) {
            this.checked = true;
        }
    };
    UIToggle.prototype.checkChanged = function ($event) {
        $event.stopPropagation();
        this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("change", this));
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Object)
    ], UIToggle.prototype, "checked", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Object)
    ], UIToggle.prototype, "model", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Function)
    ], UIToggle.prototype, "matcher", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIToggle.prototype, "disabled", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIToggle.prototype, "labelOn", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIToggle.prototype, "labelOff", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIToggle.prototype, "width", void 0);
    UIToggle = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-toggle"),
        aureliaFramework.inlineView(view$7),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIToggle);
    return UIToggle;
}());

var Forms = [
    UICheckbox,
    UIField,
    UIFieldWrapper,
    UIFieldset,
    UIForm,
    UIInput,
    UIInputAddon,
    UIInputInfo,
    UIOptionGroup,
    UIPhone,
    UIRadio,
    UITextarea,
    UIToggle,
    UIPasswordMeter,
    UISlider,
    UIFileInput
];

exports.Forms = Forms;
//# sourceMappingURL=ui-forms.js.map
