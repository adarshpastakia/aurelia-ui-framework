var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, inlineView, DOM } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
let UIToast = class UIToast {
    constructor(element) {
        this.element = element;
        this.show = true;
        this.glyph = '';
        this.timeout = 0;
    }
    bind(bindingContext, overrideContext) {
        if (bindingContext)
            Object.assign(this, bindingContext);
        UIEvent.queueTask(() => {
            this.element.classList.add('ui-open');
            if (!isNaN(this.timeout) && parseInt(this.timeout + '') > 0) {
                setTimeout(() => this.startClose(), parseInt(this.timeout + ''));
            }
        });
    }
    startClose(force) {
        if (UIEvent.fireEvent('close', this.element) !== false) {
            this.element.classList.remove('ui-open');
            setTimeout(() => DOM.removeNode(this.element), 500);
        }
        return true;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIToast.prototype, "show", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIToast.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIToast.prototype, "timeout", void 0);
UIToast = __decorate([
    autoinject(),
    customElement('ui-toast'),
    inlineView(`<template class="ui-toast" click.trigger="startClose()"><div class="ui-wrapper">
  <ui-glyph glyph.bind="glyph"></ui-glyph>
  <span class="ui-message"><slot><slot></span><span class="ui-close">&times;</span>
</div></template>`),
    __metadata("design:paramtypes", [Element])
], UIToast);
export { UIToast };
let UIAlert = class UIAlert {
    constructor(element) {
        this.element = element;
        this.glyph = '';
        this.okLabel = 'OK';
        this.cancelLabel = 'Cancel';
        this.confirm = false;
        this.confirm = element.hasAttribute('confirm');
    }
    bind(bindingContext, overrideContext) {
        if (bindingContext)
            Object.assign(this, bindingContext);
        UIEvent.queueTask(() => {
            this.element.classList.add('ui-open');
            if (this.focusBlock)
                this.focusBlock.focus();
        });
    }
    closeAlert(b) {
        this.element.classList.remove('ui-open');
        setTimeout(() => {
            if (this.closeCallback)
                this.closeCallback(b);
            DOM.removeNode(this.element);
        }, 100);
    }
    cancelBlur($event) {
        $event.preventDefault();
        this.focusBlock.focus();
        return false;
    }
    checkKey($event) {
        let key = ($event.keyCode || $event.which);
        if (key == 13)
            this.closeAlert(true);
        if (key == 27)
            this.closeAlert(false);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAlert.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAlert.prototype, "okLabel", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAlert.prototype, "cancelLabel", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAlert.prototype, "closeCallback", void 0);
UIAlert = __decorate([
    autoinject(),
    inlineView(`<template class="ui-alert-shim"><div class="ui-alert">
  <div class="ui-wrapper">
  <input style="position:absolute;opacity:0;" ref="focusBlock" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"/>
  <ui-glyph glyph.bind="glyph" class.bind="glyph" if.bind="glyph"></ui-glyph>
  <span class="ui-message"><slot><slot></span></div>
  <div class="ui-button-bar"><button click.trigger="closeAlert(true)" t.bind="okLabel">\${okLabel}</button><button show.bind="confirm" click.trigger="closeAlert(false)" t.bind="cancelLabel">\${cancelLabel}</button></div>
  </div></template>`),
    customElement('ui-alert'),
    __metadata("design:paramtypes", [Element])
], UIAlert);
export { UIAlert };
let UIPrompt = class UIPrompt {
    constructor(element) {
        this.element = element;
        this.glyph = '';
        this.okLabel = 'OK';
        this.cancelLabel = 'Cancel';
        this.changed = false;
        this.multiline = false;
        this.value = '';
        this.multiline = element.hasAttribute('multiline');
    }
    bind(bindingContext, overrideContext) {
        if (bindingContext)
            Object.assign(this, bindingContext);
        UIEvent.queueTask(() => {
            this.element.classList.add('ui-open');
            if (this.focusBlock)
                this.focusBlock.focus();
        });
    }
    closeAlert(b) {
        if (b && isEmpty(this.value))
            return this.changed = true;
        this.element.classList.remove('ui-open');
        setTimeout(() => {
            if (this.closeCallback)
                this.closeCallback(b ? this.value : null);
            DOM.removeNode(this.element);
        }, 100);
    }
    cancelBlur($event) {
        $event.preventDefault();
        this.focusBlock.focus();
        return false;
    }
    checkKey($event) {
        let key = ($event.keyCode || $event.which);
        if (!this.multiline && key == 13)
            this.closeAlert(true);
        if (key == 27)
            this.closeAlert(false);
        return true;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPrompt.prototype, "glyph", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPrompt.prototype, "okLabel", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPrompt.prototype, "cancelLabel", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPrompt.prototype, "closeCallback", void 0);
UIPrompt = __decorate([
    autoinject(),
    inlineView(`<template class="ui-alert-shim"><div class="ui-alert">
  <div class="ui-wrapper">
  <ui-glyph glyph.bind="glyph" class.bind="glyph" if.bind="glyph"></ui-glyph>
  <span class="ui-message"><slot><slot></span></div>
  <ui-input-group>
    <ui-input class="\${changed && value==''?'ui-invalid':''}" errors.bind="changed && value==''?['Value needed']:null" if.bind="!multiline" ref="focusBlock" value.bind="value" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"></ui-input>
    <ui-textarea class="\${changed && value==''?'ui-invalid':''}" errors.bind="changed && value==''?['Value needed']:null" if.bind="multiline" rows="4" ref="focusBlock" value.bind="value" keydown.trigger="checkKey($event)" blur.trigger="cancelBlur($event)"></ui-textarea>
  </ui-input-group>
  <div class="ui-button-bar"><button click.trigger="closeAlert(true)" t.bind="okLabel">\${okLabel}</button><button click.trigger="closeAlert(false)" t.bind="cancelLabel">\${cancelLabel}</button></div>
  </div></template>`),
    customElement('ui-prompt'),
    __metadata("design:paramtypes", [Element])
], UIPrompt);
export { UIPrompt };
