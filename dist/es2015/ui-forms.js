import { bindable, bindingMode, customElement, inlineView, computedFrom, containerless, viewResources, children, observable } from 'aurelia-framework';
import { getExampleNumber, AsYouType } from 'libphonenumber-js';
import 'aurelia-event-aggregator';
import { U as UIInternal } from './ui-internal.js';
import { _ as __decorate, a as __metadata } from './_tslib.js';
import { I as InputWrapper, B as BaseInput } from './input-wrapper.js';
import examples from 'libphonenumber-js/examples.mobile.json';

var view = "<template class=\"ui-option\" data-disabled.bind=\"disabled || isDisabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"checkbox\" data-checked=\"${checked}\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <ui-svg-icon icon=\"check-off\"></ui-svg-icon>\n    <ui-svg-icon icon=\"tree-check-half\"></ui-svg-icon>\n    <ui-svg-icon icon=\"check-on\"></ui-svg-icon>\n    <span>\n      <slot></slot>\n    </span>\n  </label>\n</template>\n";

let UICheckbox = class UICheckbox {
    constructor(element) {
        this.element = element;
        this.disabled = false;
        this.isDisabled = false;
    }
    disable(b) {
        this.isDisabled = b;
    }
    bind() {
        if (this.checked === "true") {
            this.checked = true;
        }
    }
    checkChanged($event) {
        $event.stopPropagation();
        this.element.dispatchEvent(UIInternal.createEvent("change", this));
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UICheckbox.prototype, "checked", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UICheckbox.prototype, "model", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UICheckbox.prototype, "matcher", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UICheckbox.prototype, "disabled", void 0);
UICheckbox = __decorate([
    customElement("ui-checkbox"),
    inlineView(view),
    __metadata("design:paramtypes", [Element])
], UICheckbox);

let UIField = class UIField {
    constructor(element) {
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
    focus() {
        const el = this.element.querySelector("input, textarea");
        if (el !== null) {
            el.focus();
        }
    }
    get classes() {
        const classes = [];
        if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
            classes.push("ui-field--plain");
        }
        if (this.required === "" || this.required === "required" || isTrue(this.required)) {
            classes.push("ui-field--required");
        }
        return classes.join(" ");
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIField.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIField.prototype, "plain", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIField.prototype, "required", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIField.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIField.prototype, "width", void 0);
__decorate([
    computedFrom("plain", "required"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], UIField.prototype, "classes", null);
UIField = __decorate([
    customElement("ui-field"),
    inlineView(`<template aria-required.bind="required" aria-disabled.bind="disabled" class="ui-field \${classes}" css.bind="{width}">
<label class="ui-field__label" role="text" click.trigger="focus()">\${label}</label>
<slot></slot>
</template>`),
    __metadata("design:paramtypes", [Element])
], UIField);

let UIFieldWrapper = class UIFieldWrapper {
    constructor() {
        this.plain = false;
    }
    get classes() {
        const classes = [];
        if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
            classes.push("ui-field__wrapper--plain");
        }
        return classes.join(" ");
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIFieldWrapper.prototype, "plain", void 0);
__decorate([
    computedFrom("plain"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], UIFieldWrapper.prototype, "classes", null);
UIFieldWrapper = __decorate([
    customElement("ui-field-wrapper"),
    inlineView(`<template class="ui-field__wrapper \${classes}">
  <slot></slot>
  </template>`)
], UIFieldWrapper);

var view$1 = "<template>\n  <fieldset class=\"ui-fieldset ${class}\" data-open.bind=\"!optional || checked\" ref=\"vmElement\">\n    <legend if.bind=\"label\">\n      <ui-checkbox if.bind=\"optional\" checked.bind=\"checked\">${label}</ui-checkbox>\n      <span if.bind=\"!optional\">${label}</span>\n    </legend>\n    <div class=\"ui-fieldset__body\">\n      <slot></slot>\n    </div>\n  </fieldset>\n</template>\n";

let UIFieldset = class UIFieldset {
    constructor(element) {
        this.checked = false;
        this.label = "";
        this.class = "";
        this.disabled = false;
        this.fields = [];
        this.optional = false;
        this.optional = element.hasAttribute("optional");
    }
    bind() {
        this.optional = this.optional || !!this.checked;
    }
    attached() {
        UIInternal.queueTask(() => {
            this.fields = this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle");
            this.disabledChanged();
        });
    }
    disabledChanged() {
        this.fields.forEach(el => el.au.controller.viewModel.disable(!!this.disabled));
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Boolean)
], UIFieldset.prototype, "checked", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIFieldset.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIFieldset.prototype, "class", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIFieldset.prototype, "disabled", void 0);
UIFieldset = __decorate([
    containerless(),
    customElement("ui-fieldset"),
    inlineView(view$1),
    __metadata("design:paramtypes", [Element])
], UIFieldset);

var view$2 = "<template class=\"ui-input ui-input-file ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <div ref=\"dropZone\" if.bind=\"maxFiles>1\" class=\"ui-input-file__dropzone ${dragging?'dragging':''}\" click.trigger=\"inputEl.click()\" dragover.trigger=\"dragEnter($event)\" dragleave.trigger=\"dragExit($event)\" drop.trigger=\"drop($event)\">\n      <ui-svg-icon icon=\"upload\"></ui-svg-icon>\n      <span>Drop files here<br>or click to browse</span>\n    </div>\n    <input type=\"file\" ref=\"inputEl\" role=\"file\" size=\"1\" change.trigger=\"fileChoose($event)\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n  <div class=\"ui-input-file__list\" if.bind=\"maxFiles>1\">\n    <div repeat.for=\"file of files\">\n      <a click.trigger=\"remove($index)\"><ui-svg-icon icon=\"cross\" ui-color=\"red\"></ui-svg-icon></a>\n      <label>${file.name}</label>\n      <span ui-color=\"muted\">(<small innerhtml.bind=\"file.size | number:'0.00b'\"></small>)</span>\n    </div>\n  </div>\n</template>\n";

let UIFileInput = class UIFileInput extends BaseInput {
    constructor(element) {
        super(element);
        this.value = "";
        this.placeholder = "";
        this.maxFiles = 1;
        this.readonly = false;
        this.disabled = false;
        this.files = [];
        this.dragging = false;
    }
    attached() {
        this.files = [];
        this.inputEl.value = "";
        this.inputEl.draggedFiles = this.files;
    }
    dragEnter($event) {
        this.dragging = true;
        $event.preventDefault();
        return false;
    }
    dragExit() {
        this.dragging = false;
    }
    drop($event) {
        this.dragging = false;
        $event.preventDefault();
        this.mutateFiles($event.dataTransfer.files);
        return false;
    }
    fileChoose(evt) {
        evt.stopPropagation();
        this.mutateFiles(this.inputEl.files);
    }
    remove(index) {
        this.files.splice(index, 1);
        this.element.dispatchEvent(UIInternal.createEvent("change", this.files.length));
    }
    mutateFiles(files) {
        for (const file of files) {
            const f = {
                file,
                name: file.name,
                size: file.size || 0,
                ext: file.type
            };
            if (this.files.length === this.maxFiles) {
                this.files.splice(0, 1);
            }
            this.files.push(f);
        }
        this.element.dispatchEvent(UIInternal.createEvent("change", this.files.length));
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", String)
], UIFileInput.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIFileInput.prototype, "placeholder", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIFileInput.prototype, "errors", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UIFileInput.prototype, "maxFiles", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIFileInput.prototype, "readonly", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIFileInput.prototype, "disabled", void 0);
UIFileInput = __decorate([
    customElement("ui-file"),
    viewResources(InputWrapper),
    inlineView(view$2),
    __metadata("design:paramtypes", [Element])
], UIFileInput);

let UIForm = class UIForm {
    constructor(element) {
        this.element = element;
        this.disabled = false;
    }
    attached() {
        UIInternal.queueTask(() => {
            const el = this.vmElement.querySelector("[autofocus] input, [autofocus] textarea");
            if (el !== null) {
                el.focus();
            }
            this.disabledChanged();
        });
    }
    disabledChanged() {
        if (this.vmElement) {
            const fields = this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle,ui-select,ui-list,ui-date-input");
            fields.forEach(el => el.au.controller.viewModel.disable(!!this.disabled));
        }
    }
    fireSubmit() {
        this.element.dispatchEvent(UIInternal.createEvent("submit"));
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIForm.prototype, "disabled", void 0);
UIForm = __decorate([
    customElement("ui-form"),
    inlineView(`<template class="ui-block"><form ref="vmElement" role="form" aria-disabled.bind="disabled" class="ui-form"
   enterpressed.delegate="fireSubmit($event)" validation-renderer="ui-validator"><slot></slot></form></template>`),
    __metadata("design:paramtypes", [Element])
], UIForm);

var view$3 = "<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\" type.bind=\"type\" autocomplete.bind=\"autocomplete\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n</template>\n";

let UIInput = class UIInput extends BaseInput {
    constructor(element) {
        super(element);
        this.value = "";
        this.number = null;
        this.type = "text";
        this.placeholder = "";
        this.autocomplete = "";
        this.maxlength = 0;
        this.readonly = false;
        this.disabled = false;
        this.ignoreChange = false;
        if (element.hasAttribute("number") || element.hasAttribute("number.bind")) {
            this.type = "number";
        }
    }
    attached() {
        this.maxlengthChanged();
    }
    valueChanged() {
        if (!this.ignoreChange && this.type === "number") {
            this.ignoreChange = true;
            this.number = isNaN(this.value) ? null : parseFloat(this.value);
            UIInternal.queueTask(() => (this.ignoreChange = false));
        }
    }
    numberChanged() {
        if (!this.ignoreChange && this.type === "number") {
            this.ignoreChange = true;
            this.value = this.number.toString();
            UIInternal.queueTask(() => (this.ignoreChange = false));
        }
    }
    get counter() {
        if (this.maxlength) {
            return `${this.maxlength - (this.value ? this.value.length : 0)}`;
        }
        else {
            return `${this.value ? this.value.length : 0}`;
        }
    }
    maxlengthChanged() {
        if (this.inputEl) {
            this.inputEl.removeAttribute("maxLength");
            if (this.maxlength > 0) {
                this.inputEl.maxLength = this.maxlength;
            }
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", String)
], UIInput.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Number)
], UIInput.prototype, "number", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIInput.prototype, "type", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIInput.prototype, "placeholder", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIInput.prototype, "autocomplete", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UIInput.prototype, "maxlength", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIInput.prototype, "errors", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIInput.prototype, "readonly", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIInput.prototype, "disabled", void 0);
__decorate([
    computedFrom("value", "maxlength"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIInput.prototype, "counter", null);
UIInput = __decorate([
    customElement("ui-input"),
    viewResources(InputWrapper),
    inlineView(view$3),
    __metadata("design:paramtypes", [Element])
], UIInput);

var UIInputAddon_1;
let UIInputAddon = UIInputAddon_1 = class UIInputAddon {
    constructor(element) {
        this.element = element;
        this.width = "auto";
        this.icon = "";
        if (element.hasAttribute("align-end")) {
            element.classList.add("ui-input__addon--end");
        }
    }
    focusInput() {
        try {
            let el = this.element;
            if (getViewModel(el.nextElementSibling) instanceof UIInputAddon_1) {
                el = el.nextElementSibling;
            }
            const vm = getViewModel(el.nextElementSibling);
            if (vm instanceof BaseInput) {
                vm.focus();
            }
            else if (el.nextElementSibling instanceof HTMLInputElement) {
                el.nextElementSibling.focus();
            }
        }
        catch (e) {
        }
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIInputAddon.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIInputAddon.prototype, "icon", void 0);
UIInputAddon = UIInputAddon_1 = __decorate([
    customElement("ui-input-addon"),
    inlineView(`<template class="ui-input__addon" click.trigger="focusInput() & debounce:10" css.bind="{width}"><slot><ui-icon icon.bind="icon"></ui-icon></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UIInputAddon);

let UIInputInfo = class UIInputInfo {
    constructor(element) {
        this.element = element;
    }
};
UIInputInfo = __decorate([
    customElement("ui-input-info"),
    inlineView(`<template class="ui-input__info"><slot></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UIInputInfo);

var view$4 = "<template class=\"ui-option\" data-disabled.bind=\"isDisabled || disabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"radio\" name.bind=\"name\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <ui-svg-icon icon=\"radio-off\"></ui-svg-icon>\n    <ui-svg-icon icon=\"radio-on\"></ui-svg-icon>\n    <span>\n      <slot></slot>\n    </span>\n  </label>\n</template>\n";

let UIRadio = class UIRadio {
    constructor(element) {
        this.element = element;
        this.name = "optGroup";
        this.disabled = false;
        this.isDisabled = false;
    }
    disable(b) {
        this.isDisabled = b;
    }
    checkChanged($event) {
        $event.stopPropagation();
        this.element.dispatchEvent(UIInternal.createEvent("change", this));
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIRadio.prototype, "checked", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIRadio.prototype, "model", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime }),
    __metadata("design:type", String)
], UIRadio.prototype, "name", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UIRadio.prototype, "matcher", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIRadio.prototype, "disabled", void 0);
UIRadio = __decorate([
    customElement("ui-radio"),
    inlineView(view$4),
    __metadata("design:paramtypes", [Element])
], UIRadio);

let UIOptionGroup = class UIOptionGroup {
    constructor() {
        this.value = false;
        this.name = "optGroup";
        this.disabled = false;
        this.options = [];
    }
    optionsChanged() {
        if (this.options !== null) {
            this.options.forEach(element => {
                if (element instanceof UIRadio) {
                    element.name = this.name;
                }
                element.matcher = this.matcher;
            });
            this.valueChanged();
        }
    }
    checkChanged($event) {
        if (this.value !== false) {
            UIInternal.queueTask(() => {
                this.value = $event.detail.checked;
            });
        }
    }
    disabledChanged() {
        this.options.forEach(el => el.disable(!!this.disabled));
    }
    valueChanged() {
        if (this.options && this.value !== false) {
            UIInternal.queueTask(() => {
                this.options.forEach(element => (element.checked = this.value));
            });
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIOptionGroup.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIOptionGroup.prototype, "name", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UIOptionGroup.prototype, "matcher", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIOptionGroup.prototype, "disabled", void 0);
__decorate([
    children("ui-radio, ui-checkbox, ui-toggle"),
    __metadata("design:type", Array)
], UIOptionGroup.prototype, "options", void 0);
UIOptionGroup = __decorate([
    customElement("ui-option-group"),
    inlineView(`<template class="ui-option__group \${disabled ? 'ui-option--disabled' : ''}" change.trigger="checkChanged($event)"><slot></slot></template>`)
], UIOptionGroup);

let UIPasswordMeter = class UIPasswordMeter {
    constructor() {
        this.score = 0;
        this.hasPassword = false;
        this.tooltip = "";
        this.maxStrength = 4;
    }
    get strength() {
        if (this.hasPassword) {
            const s = (this.score / this.maxStrength) * 100;
            return { "--password-strength": `${s || 5}%` };
        }
        return { "--password-strength": 0 };
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UIPasswordMeter.prototype, "score", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIPasswordMeter.prototype, "hasPassword", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPasswordMeter.prototype, "tooltip", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UIPasswordMeter.prototype, "maxStrength", void 0);
__decorate([
    computedFrom("score", "maxStrength", "hasPassword"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIPasswordMeter.prototype, "strength", null);
UIPasswordMeter = __decorate([
    customElement("ui-password-meter"),
    inlineView(`<template class="ui-password-meter" css.bind="strength" ui-tooltip.bind="tooltip"></template>`)
], UIPasswordMeter);

var view$5 = "<template class=\"ui-input ui-phone ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <ui-input-addon>\n      <ui-flag code.bind=\"inputCountry\"></ui-flag>\n    </ui-input-addon>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"inputValue\" autocomplete.bind=\"autocomplete\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n</template>\n";

let UIPhone = class UIPhone extends BaseInput {
    constructor(element) {
        super(element);
        this.value = "";
        this.type = "any";
        this.country = "";
        this.readonly = false;
        this.disabled = false;
        this.inputValue = "";
        this.inputCountry = "";
        this.placeholder = "";
        this.ignoreChange = false;
        this.showCounter = false;
    }
    attached() {
        this.countryChanged();
    }
    valueChanged() {
        if (!this.ignoreChange) {
            this.ignoreChange = true;
            this.update(this.value);
            UIInternal.queueTask(() => (this.ignoreChange = false));
        }
    }
    countryChanged() {
        this.inputCountry = this.country;
        const examplePhone = getExampleNumber((this.country || "US"), examples);
        this.placeholder = !!this.country ? examplePhone.formatNational() : examplePhone.formatInternational();
    }
    inputValueChanged() {
        if (!this.ignoreChange) {
            this.ignoreChange = true;
            let val = `${this.inputValue}`;
            if (!this.country && val !== "" && !val.startsWith("+")) {
                val = `+${val}`;
            }
            this.update(val);
            UIInternal.queueTask(() => (this.ignoreChange = false));
        }
    }
    update(value) {
        const newInput = new AsYouType(this.country);
        this.inputValue = newInput.input(value);
        this.inputCountry = this.country || newInput.country;
        if (newInput.getNumber()) {
            this.value = newInput.getNumber().number.toString();
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", String)
], UIPhone.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPhone.prototype, "type", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPhone.prototype, "country", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPhone.prototype, "errors", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPhone.prototype, "readonly", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPhone.prototype, "disabled", void 0);
__decorate([
    observable(),
    __metadata("design:type", Object)
], UIPhone.prototype, "inputValue", void 0);
UIPhone = __decorate([
    customElement("ui-phone"),
    viewResources(InputWrapper),
    inlineView(view$5),
    __metadata("design:paramtypes", [Element])
], UIPhone);

let UISlider = class UISlider {
    constructor() {
        this.value = 0;
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.disabled = false;
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Number)
], UISlider.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UISlider.prototype, "min", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UISlider.prototype, "max", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UISlider.prototype, "step", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UISlider.prototype, "disabled", void 0);
UISlider = __decorate([
    customElement("ui-slider"),
    inlineView(`<template class="ui-slider" css.bind="{'--slider-pos': (value-min)/(max-min)}">
<div class="ui-slider__bubble">\${value}</div>
<span class="ui-slider__min">\${min}</span>
<span class="ui-slider__max">\${max}</span>
<div class="ui-slider__bar">
  <input type="range" value.bind="value" step.bind="step" min.bind="min" max.bind="max" />
</div>
</template>`)
], UISlider);

var view$6 = "<template class=\"ui-input ui-input--textarea ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <textarea class=\"ui-input__control\" ref=\"inputEl\" role=\"textbox\" rows.bind=\"rows\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\"></textarea>\n  </input-wrapper>\n</template>\n";

let UITextarea = class UITextarea extends BaseInput {
    constructor(element) {
        super(element);
        this.value = "";
        this.number = null;
        this.placeholder = "";
        this.rows = 4;
        this.maxlength = 0;
        this.readonly = false;
        this.disabled = false;
    }
    get counter() {
        if (this.maxlength) {
            return `${this.value ? this.value.length : 0} of ${this.maxlength}`;
        }
        else {
            return `${this.value ? this.value.length : 0}`;
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", String)
], UITextarea.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Number)
], UITextarea.prototype, "number", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITextarea.prototype, "placeholder", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UITextarea.prototype, "rows", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UITextarea.prototype, "maxlength", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "errors", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "readonly", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "disabled", void 0);
__decorate([
    computedFrom("value", "maxlength"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UITextarea.prototype, "counter", null);
UITextarea = __decorate([
    customElement("ui-textarea"),
    viewResources(InputWrapper),
    inlineView(view$6),
    __metadata("design:paramtypes", [Element])
], UITextarea);

var view$7 = "<template class=\"ui-option\" data-disabled.bind=\"disabled || isDisabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"checkbox\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <div class=\"ui-option__toggle\" css.bind=\"{'--toggle-on': labelOn, '--toggle-off': labelOff, width}\"></div>\n    <span><slot></slot></span>\n  </label>\n</template>\n";

let UIToggle = class UIToggle {
    constructor(element) {
        this.element = element;
        this.disabled = false;
        this.labelOn = "";
        this.labelOff = "";
        this.isDisabled = false;
    }
    disable(b) {
        this.isDisabled = b;
    }
    bind() {
        if (isTrue(this.checked)) {
            this.checked = true;
        }
    }
    checkChanged($event) {
        $event.stopPropagation();
        this.element.dispatchEvent(UIInternal.createEvent("change", this));
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIToggle.prototype, "checked", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIToggle.prototype, "model", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UIToggle.prototype, "matcher", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIToggle.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIToggle.prototype, "labelOn", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIToggle.prototype, "labelOff", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIToggle.prototype, "width", void 0);
UIToggle = __decorate([
    customElement("ui-toggle"),
    inlineView(view$7),
    __metadata("design:paramtypes", [Element])
], UIToggle);

const Forms = [
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

export { Forms };
//# sourceMappingURL=ui-forms.js.map
