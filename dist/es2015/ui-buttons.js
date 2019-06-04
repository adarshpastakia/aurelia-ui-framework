import { bindable, child, computedFrom, customElement, inlineView, bindingMode, children, autoinject, containerless, DOM } from 'aurelia-framework';
import 'aurelia-event-aggregator';
import { a as UIInternal } from './chunk2.js';
import { a as __decorate, b as __metadata } from './chunk3.js';

var view = "<template class=\"ui-btn__wrapper\" data-disabled.bind=\"isDisabled\" data-busy.bind=\"busy\" data-type.bind=\"type\" data-size.bind=\"size\" data-active.bind=\"active\">\n  <div class=\"ui-btn__inner\">\n    <a ref=\"badgeEl\" class=\"ui-btn\" click.trigger=\"fireClick($event)\" data-active.bind=\"active\" data-open.bind=\"!split && dropEl.isOpen\">\n      <div class=\"ui-btn__icon\" if.bind=\"busy\">\n        <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n      </div>\n      <slot name=\"svg-icon\"></slot>\n      <div class=\"ui-btn__icon\" if.bind=\"icon && !busy\">\n        <ui-icon icon.bind=\"icon\"></ui-icon>\n      </div>\n      <div class=\"ui-btn__label\"><slot>${label}</slot></div>\n      <div class=\"ui-btn__caret\" if.bind=\"hasDrop && !split\">\n        <ui-svg-icon icon=\"caret\"></ui-svg-icon>\n      </div>\n    </a>\n    <template if.bind=\"hasDrop && split\">\n      <div class=\"ui-btn__divider\"></div>\n      <a class=\"ui-btn ui-btn__caret ui-btn__caret--split\" data-open.bind=\"split && dropEl.isOpen\" click.trigger=\"toggleDrop()\">\n        <ui-svg-icon icon=\"caret\"></ui-svg-icon>\n      </a>\n    </template>\n  </div>\n  <slot name=\"ui-drop\">\n    <ui-drop view-model.ref=\"dropEl\" if.bind=\"menuItems\">\n      <ui-menu if.bind=\"dropEl.isOpen\" menu-items.bind=\"menuItems\"></ui-menu>\n    </ui-drop>\n  </slot>\n</template>\n";

let UIButton = class UIButton {
    constructor(element) {
        this.element = element;
        this.icon = "";
        this.href = "";
        this.label = "";
        this.size = "nm";
        this.type = "default";
        this.id = "";
        this.busy = false;
        this.active = false;
        this.disabled = false;
        this.hasDrop = false;
        this.split = false;
        this.elDisabled = false;
        if (element.hasAttribute("icon-hilight")) {
            element.classList.add("ui-btn__icon--hilight");
        }
        if (element.hasAttribute("icon-end")) {
            element.classList.add("ui-btn__icon--end");
        }
        if (element.hasAttribute("icon-top")) {
            element.classList.add("ui-btn__icon--top");
        }
        if (element.hasAttribute("no-caret")) {
            element.classList.add("ui-btn__caret--hide");
        }
        if (element.hasAttribute("block")) {
            element.classList.add("ui-btn--block");
        }
        this.split = element.hasAttribute("split");
    }
    get isDisabled() {
        return this.disabled || this.elDisabled;
    }
    disable(disabled) {
        this.elDisabled = disabled;
    }
    attached() {
        UIInternal.queueTask(() => {
            this.hasDrop = !!this.elDropdown || !!this.dropEl;
            if (this.hasDrop) {
                if (!this.dropEl) {
                    this.dropEl = getSlotViewModel(this.elDropdown);
                }
                this.dropEl.tether(this.element);
            }
        });
        this.hrefChanged();
    }
    hrefChanged() {
        if (this.badgeEl) {
            if (this.href) {
                this.badgeEl.href = this.href;
            }
            else if (this.badgeEl.attributes.getNamedItem("href")) {
                this.badgeEl.attributes.removeNamedItem("href");
            }
        }
    }
    fireClick($event) {
        if (this.isDisabled || this.busy) {
            $event.stopEvent();
            return false;
        }
        if (!this.href) {
            if (this.hasDrop && !this.split) {
                return this.toggleDrop();
            }
            else {
                $event.stopEvent();
                return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
            }
        }
    }
    toggleDrop() {
        const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
        const afterEvent = this.dropEl.isOpen ? "close" : "open";
        if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
            this.dropEl.toggleDrop();
            this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
        }
        return true;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIButton.prototype, "icon", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIButton.prototype, "href", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIButton.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIButton.prototype, "size", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIButton.prototype, "type", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIButton.prototype, "id", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIButton.prototype, "busy", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIButton.prototype, "active", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIButton.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIButton.prototype, "menuItems", void 0);
__decorate([
    child("div.ui-drop"),
    __metadata("design:type", Element)
], UIButton.prototype, "elDropdown", void 0);
__decorate([
    computedFrom("disabled", "elDisabled"),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], UIButton.prototype, "isDisabled", null);
UIButton = __decorate([
    customElement("ui-button"),
    inlineView(view),
    __metadata("design:paramtypes", [Element])
], UIButton);

let UIButtonGroup = class UIButtonGroup {
    constructor(element) {
        this.element = element;
        this.value = "";
        this.separator = "";
        this.size = "nm";
        this.type = "default";
        this.disabled = false;
        this.toggle = false;
        this.elDisabled = false;
        if (element.hasAttribute("equal")) {
            element.classList.add("ui-btn__group--equal");
        }
        if (element.hasAttribute("vertical")) {
            element.classList.add("ui-btn__group--vertical");
        }
        this.toggle = element.hasAttribute("toggle");
    }
    get isDisabled() {
        return this.disabled || this.elDisabled;
    }
    disable(disabled) {
        this.elDisabled = disabled;
    }
    attached() {
        if (this.separator) {
            this.element.classList.add("ui-btn__group--with-separator");
        }
        if (this.toggle) {
            UIInternal.queueTask(() => this.valueChanged(this.value, ""));
        }
    }
    buttonsChanged() {
        this.buttons.forEach(b => {
            b.element.dataset.separator = this.separator;
        });
    }
    valueChanged(newValue, oldValue) {
        if (this.buttons) {
            const btn = this.buttons.find(b => b.id === newValue);
            if (btn) {
                if (this.currentSelected) {
                    this.currentSelected.active = false;
                }
                (this.currentSelected = btn).active = true;
            }
            else {
                this.value = oldValue;
            }
        }
    }
    buttonClicked($event) {
        $event.stopEvent();
        if ($event.detail && this.toggle) {
            this.value = $event.detail;
        }
    }
};
__decorate([
    bindable({ bindingMode: bindingMode.twoWay }),
    __metadata("design:type", String)
], UIButtonGroup.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIButtonGroup.prototype, "separator", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIButtonGroup.prototype, "size", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIButtonGroup.prototype, "type", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIButtonGroup.prototype, "disabled", void 0);
__decorate([
    child("ui-button[data-active='true']"),
    __metadata("design:type", UIButton)
], UIButtonGroup.prototype, "currentSelected", void 0);
__decorate([
    children("ui-button"),
    __metadata("design:type", Array)
], UIButtonGroup.prototype, "buttons", void 0);
__decorate([
    computedFrom("disabled", "elDisabled"),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], UIButtonGroup.prototype, "isDisabled", null);
UIButtonGroup = __decorate([
    autoinject(),
    customElement("ui-button-group"),
    inlineView(`<template class="ui-btn__group" click.delegate="buttonClicked($event)" data-disabled.bind="isDisabled" data-size.bind="size" data-type.bind="type"><slot></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UIButtonGroup);

let UITag = class UITag {
    constructor(element) {
        this.element = element;
        this.id = "";
        this.label = "";
        this.icon = "";
        this.href = "";
        this.size = "nm";
        this.type = "normal";
        this.closeable = false;
        this.style = "normal";
    }
    close() {
        UIInternal.fireCallbackEvent(this, "beforeclose", this.id).then(b => b ? this.remove() : undefined);
    }
    bind() {
        this.hrefChanged();
        this.closeable = !isFalse(this.closeable);
    }
    hrefChanged() {
        if (this.vmElement) {
            if (this.href) {
                this.vmElement.href = this.href;
            }
            else if (this.vmElement.attributes.getNamedItem("href")) {
                this.vmElement.attributes.removeNamedItem("href");
            }
        }
    }
    fireClick($event) {
        if (!this.href) {
            $event.stopEvent();
            return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
        }
    }
    remove() {
        this.element.dispatchEvent(UIInternal.createEvent("close", this.id));
        UIInternal.queueTask(() => DOM.removeNode(this.vmElement));
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITag.prototype, "id", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITag.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITag.prototype, "icon", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITag.prototype, "href", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITag.prototype, "size", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITag.prototype, "type", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UITag.prototype, "closeable", void 0);
UITag = __decorate([
    containerless(),
    customElement("ui-tag"),
    inlineView(`<template><a class="ui-tag ui-tag--\${type} ui-tag--\${size}" click.delegate="fireClick($event)" ref="vmElement">
    <div class="ui-tag__label">\${label}</div>
    <div class="ui-tag__icon"><slot name="avatar"><ui-icon if.bind="icon" icon.bind="icon"></ui-icon></slot></div>
    <div class="ui-tag__value"><slot></slot></div>
    <div class="ui-tag__close" if.bind="closeable" click.trigger="[$event.stopEvent(), close()]">&times;</div>
  </a></template>`),
    __metadata("design:paramtypes", [Element])
], UITag);

const Buttons = [UIButton, UIButtonGroup, UITag];

export { Buttons };
//# sourceMappingURL=ui-buttons.js.map
