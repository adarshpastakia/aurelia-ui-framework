var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UIOptionGroup_1, UICheckbox_1, UIRadio_1, UISwitch_1;
import { autoinject, customElement, bindable, bindingMode, inlineView } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
let UIOptionGroup = UIOptionGroup_1 = class UIOptionGroup {
    constructor(element) {
        this.element = element;
        this.value = '';
        this.name = '';
        this.cols = 'auto';
        if (element.hasAttribute('vertical'))
            element.classList.add('ui-vertical');
        this.name = "ui-optgroup-" + (UIOptionGroup_1.seed++);
    }
    bind(bindingContext, overrideContext) {
        this.valueChanged(this.value);
    }
    attached() {
        let els = this.element.querySelectorAll('input[type="radio"]');
        for (let i = 0; i < els.length; i++)
            els[i]['name'] = this.name;
    }
    valueChanged(newValue) {
        UIEvent.queueTask(() => {
            let opt = this.element.querySelector(`input[value="${newValue}"]`);
            if (opt != null)
                opt['checked'] = true;
        });
    }
    changed($event) {
        this.value = $event.detail;
    }
};
UIOptionGroup.seed = 1;
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIOptionGroup.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIOptionGroup.prototype, "name", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIOptionGroup.prototype, "cols", void 0);
UIOptionGroup = UIOptionGroup_1 = __decorate([
    autoinject(),
    inlineView('<template class="ui-input-group ui-option-group cols-\${cols}"><slot name="inputLabel"></slot><div class="ui-group-wrapper" change.trigger="changed($event)"><slot></slot></div></template>'),
    customElement('ui-option-group'),
    __metadata("design:paramtypes", [Element])
], UIOptionGroup);
export { UIOptionGroup };
let UICheckbox = UICheckbox_1 = class UICheckbox {
    constructor(element) {
        this.element = element;
        this.checked = false;
        this.disabled = false;
        this.for = '';
        this.isDisabled = false;
        this.for = 'ui-checkbox-' + (UICheckbox_1.seed++);
    }
    bind(bindingContext, overrideContext) {
        this.checked = !!this.checked;
        this.disabledChanged(this.disabled);
    }
    disabledChanged(newValue) {
        this.element.classList[(this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
    }
    disable(b) {
        this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
    }
};
UICheckbox.seed = 1;
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UICheckbox.prototype, "checked", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UICheckbox.prototype, "disabled", void 0);
UICheckbox = UICheckbox_1 = __decorate([
    autoinject(),
    inlineView(`<template class="ui-option ui-checkbox"><input type="checkbox" id.bind="for" disabled.bind="disabled" checked.bind="checked"/>
  <ui-glyph glyph.bind="checked?'glyph-check-on':'glyph-check-off'"></ui-glyph>
  <label for.bind="for" class="ui-option-label"><slot></slot></label></template>`),
    customElement('ui-checkbox'),
    __metadata("design:paramtypes", [Element])
], UICheckbox);
export { UICheckbox };
let UIRadio = UIRadio_1 = class UIRadio {
    constructor(element) {
        this.element = element;
        this.checked = false;
        this.name = '';
        this.value = '';
        this.disabled = false;
        this.for = '';
        this.isDisabled = false;
        this.for = 'ui-radio-' + (UIRadio_1.seed++);
    }
    bind(bindingContext, overrideContext) {
        this.disabledChanged(this.disabled);
    }
    disabledChanged(newValue) {
        this.element.classList[(this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
    }
    disable(b) {
        this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
    }
    changed($event) {
        $event.cancelBubble = true;
        $event.stopPropagation();
        return UIEvent.fireEvent('change', this.element, this.value);
    }
};
UIRadio.seed = 1;
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIRadio.prototype, "checked", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIRadio.prototype, "name", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIRadio.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIRadio.prototype, "disabled", void 0);
UIRadio = UIRadio_1 = __decorate([
    autoinject(),
    inlineView(`<template class="ui-option ui-radio"><input type="radio" name="\${name}" id.bind="for" value.bind="value"
  disabled.bind="disabled" checked.bind="checked" change.trigger="changed($event)"/>
  <ui-glyph class="off" glyph="glyph-radio-off"></ui-glyph><ui-glyph class="on" glyph="glyph-radio-on"></ui-glyph>
  <label for.bind="for" class="ui-option-label"><slot></slot></label></template>`),
    customElement('ui-radio'),
    __metadata("design:paramtypes", [Element])
], UIRadio);
export { UIRadio };
let UISwitch = UISwitch_1 = class UISwitch {
    constructor(element) {
        this.element = element;
        this.checked = false;
        this.value = '';
        this.size = 'auto';
        this.class = '';
        this.onLabel = 'on';
        this.offLabel = 'off';
        this.onValue = true;
        this.offValue = false;
        this.disabled = false;
        this.theme = 'default';
        this.for = '';
        this.isDisabled = false;
        this.for = 'ui-switch-' + (UISwitch_1.seed++);
        if (this.element.hasAttribute('primary'))
            this.theme = 'primary';
        else if (this.element.hasAttribute('secondary'))
            this.theme = 'secondary';
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
    }
    bind(bindingContext, overrideContext) {
        this.checked = !!this.checked || (this.value == this.onValue);
        this.value = this.checked ? this.onValue : this.offValue;
        this.disabled = !!this.disabled;
    }
    checkedChanged(newValue) {
        this.value = newValue ? this.onValue : this.offValue;
    }
    valueChanged(newValue) {
        this.checked = newValue == this.onValue;
    }
    disable(b) {
        this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
    }
    fireChange($event) {
        $event.cancelBubble = true;
        $event.stopPropagation();
        this.value = this.checked ? this.onValue : this.offValue;
        return UIEvent.fireEvent('change', this.element, this.value);
    }
};
UISwitch.seed = 1;
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Boolean)
], UISwitch.prototype, "checked", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UISwitch.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISwitch.prototype, "size", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISwitch.prototype, "class", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISwitch.prototype, "onLabel", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISwitch.prototype, "offLabel", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISwitch.prototype, "onValue", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISwitch.prototype, "offValue", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISwitch.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UISwitch.prototype, "theme", void 0);
UISwitch = UISwitch_1 = __decorate([
    autoinject(),
    inlineView(`<template class="ui-option ui-switch-control \${theme}">
<div class="ui-switch \${disabled?'ui-disabled':''}" css.bind="{width: size}">
  <input class="ui-switch-input" type="checkbox" id.bind="for" disabled.bind="disabled" checked.bind="checked" change.trigger="fireChange($event)"/>
  <label class="ui-switch-inner" for.bind="for" data-on="\${onLabel}" data-off="\${offLabel}"></label>
  <div class="ui-switch-handle"></div>
</div><label class="ui-switch-label" for.bind="for"><slot></slot></label>
</template>`),
    customElement('ui-switch'),
    __metadata("design:paramtypes", [Element])
], UISwitch);
export { UISwitch };
