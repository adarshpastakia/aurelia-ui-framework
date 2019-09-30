import { computedFrom, containerless, inlineView, processContent } from 'aurelia-framework';
import { U as UIInternal } from './ui-internal.js';
import { _ as __decorate, a as __metadata } from './_tslib.js';

class BaseInput {
    constructor(element) {
        this.element = element;
        this.maxlength = 0;
        this.allowClear = false;
        this.showCounter = false;
        this.readonly = false;
        this.disabled = false;
        this.isDisabled = false;
        this.allowClear = element.hasAttribute("clear") || element.hasAttribute("clear.trigger");
        this.showCounter = element.hasAttribute("counter");
    }
    focus() {
        this.inputEl.focus();
    }
    disable(b) {
        this.isDisabled = b;
    }
    get classes() {
        const classes = [];
        if (this.errors && this.errors.length > 0) {
            classes.push("ui-input--invalid");
        }
        if (this.isTrue("readonly")) {
            classes.push("ui-input--readonly");
        }
        if (this.isTrue("disabled") || this.isDisabled) {
            classes.push("ui-input--disabled");
        }
        return classes.join(" ");
    }
    bind() {
        this.readonly = this.isTrue("readonly");
        this.disabled = this.isTrue("disabled");
    }
    clear() {
        this.value = "";
        this.inputEl.focus();
        this.element.dispatchEvent(UIInternal.createEvent("clear"));
        this.element.dispatchEvent(UIInternal.createEvent("change"));
    }
    fireEnter($event) {
        if ($event.keyCode === 13) {
            $event.stopEvent();
            this.element.dispatchEvent(UIInternal.createEvent("enterpressed", this.value));
        }
        return true;
    }
    canToggleDrop(evt) {
        if (evt.relatedTarget && evt.relatedTarget !== this.inputEl) {
            this.toggleDrop(false);
        }
    }
    toggleDrop(open) {
        if (open === true && this.dropEl.isOpen) {
            UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
            return;
        }
        const beforeEvent = this.dropEl.isOpen && !open ? "beforeclose" : "beforeopen";
        const afterEvent = this.dropEl.isOpen && !open ? "close" : "open";
        if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
            this.dropEl.toggleDrop(open);
            this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
            if (this.dropEl.isOpen) {
                this.inputEl.select();
                return true;
            }
            else {
                return false;
            }
        }
    }
    isTrue(prop) {
        return this[prop] === "" || this[prop] === prop || isTrue(this[prop]);
    }
}
__decorate([
    computedFrom("isDisabled", "disabled", "readonly", "errors", "errors.length"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], BaseInput.prototype, "classes", null);

var view = "<template>\n  <div class=\"ui-input__error\" if.bind=\"errors && errors.length\">\n    <ui-svg-icon icon=\"alert\"></ui-svg-icon>\n    <ul>\n      <li repeat.for=\"err of errors\">${err.message || err}</li>\n    </ul>\n  </div>\n  <div class=\"ui-input__counter\" if.bind=\"showCounter && (value.length > 0 || maxlength > 0)\">\n    ${counter}\n  </div>\n  <div class=\"ui-input__clear\" if.bind=\"allowClear && value.length > 0\" click.trigger=\"clear()\">\n    <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n  </div>\n  <div class=\"ui-input__drop-handle\" if.bind=\"dropHandle\" click.trigger=\"toggleDrop()\">\n    <ui-svg-icon icon.bind=\"dropHandle\"></ui-svg-icon>\n  </div>\n  <slot></slot>\n</template>\n";

let InputWrapper = class InputWrapper {
};
InputWrapper = __decorate([
    containerless(),
    inlineView(view),
    processContent((compiler, resources, node, instruction) => {
        instruction.inheritBindingContext = true;
        return true;
    })
], InputWrapper);

export { BaseInput as B, InputWrapper as I };
//# sourceMappingURL=input-wrapper.js.map
