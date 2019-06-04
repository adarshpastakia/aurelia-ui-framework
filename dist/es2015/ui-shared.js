import { customElement, inlineView, bindable, containerless } from 'aurelia-framework';
import './chunk.js';
import 'aurelia-event-aggregator';
import { a as UIInternal } from './chunk2.js';
import { a as __decorate, b as __metadata } from './chunk3.js';
import 'aurelia-logging';
import ResizeObserver from 'resize-observer-polyfill';
import { a as UITether } from './chunk5.js';

let UIDivider = class UIDivider {
};
UIDivider = __decorate([
    customElement("ui-divider"),
    inlineView("<template class='ui-divider'><slot></slot></template>")
], UIDivider);

let UIDragHandle = class UIDragHandle {
    constructor(element) {
        this.element = element;
    }
    fireDragEvent($event, evt) {
        this.element.dispatchEvent(UIInternal.createEvent(evt));
        return true;
    }
};
UIDragHandle = __decorate([
    customElement("ui-drag-handle"),
    inlineView(`<template class="ui-drag-handle" ui-color="gray"
    mousedown.trigger="fireDragEvent($event,'dragstart')" click.trigger="fireDragEvent($event,'dragend')"><ui-svg-icon icon="drag"></ui-svg-icon></template>`),
    __metadata("design:paramtypes", [Element])
], UIDragHandle);

let UIDrop = class UIDrop {
    constructor(element) {
        this.element = element;
        this.class = "";
        this.isOpen = false;
        this.stretch = true;
        this.closeOnClick = true;
        this.attachToViewport = false;
        this.position = element.getAttribute("position") || "tl";
        this.anchorPosition = element.getAttribute("anchor") || "bl";
        this.closeOnClick = !isFalse(element.getAttribute("close-on-click"));
        this.attachToViewport = element.hasAttribute("attach-to-viewport");
    }
    tether(anchorEl) {
        this.tetherObj = UITether.tether((this.anchorEl = anchorEl), this.vmElement, {
            anchorPosition: this.anchorPosition,
            attachToViewport: this.attachToViewport,
            position: this.position,
            resize: this.stretch
        });
    }
    updatePosition() {
        this.tetherObj.updatePosition();
    }
    toggleDrop(open) {
        this.disposeListeners();
        this.vmElement.dataset.show = "false";
        this.isOpen = open === undefined ? !this.isOpen : open;
        if (this.isOpen) {
            this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, t => this.canClose(t));
            this.obViewportResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, () => this.updatePosition());
            this.obResize = new ResizeObserver(() => this.updatePosition());
            this.obResize.observe(this.vmElement);
            this.obResize.observe(this.anchorEl);
            this.element.dispatchEvent(UIInternal.createEvent("open"));
            UIInternal.queueMicroTask(() => {
                this.tetherObj.updatePosition();
                this.vmElement.dataset.show = "true";
            });
        }
    }
    closeDrop() {
        UIInternal.queueTask(() => {
            this.isOpen = false;
            this.disposeListeners();
            this.element.dispatchEvent(UIInternal.createEvent("close"));
        });
    }
    disposeListeners() {
        if (this.obClick) {
            this.obClick.dispose();
        }
        if (this.obResize) {
            this.obResize.disconnect();
        }
        if (this.obViewportResize) {
            this.obViewportResize.dispose();
        }
    }
    detached() {
        this.disposeListeners();
        if (this.tetherObj) {
            this.tetherObj.dispose();
        }
    }
    close($event) {
        if (this.closeOnClick) {
            this.closeDrop();
        }
    }
    canClose(t) {
        if (!hasParent(t, this.vmElement) && !hasParent(t, this.anchorEl)) {
            this.closeDrop();
        }
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDrop.prototype, "class", void 0);
UIDrop = __decorate([
    containerless(),
    customElement("ui-drop"),
    inlineView(`<template><div slot="ui-drop" class="ui-drop" click.delegate="closeDrop()" data-open.bind="isOpen">
  <div ref="vmElement" class="ui-drop__body \${class}" click.delegate="close($event)"><slot></slot></div>
  </div></template>`),
    __metadata("design:paramtypes", [Element])
], UIDrop);

let UIFiller = class UIFiller {
};
UIFiller = __decorate([
    customElement("ui-filler"),
    inlineView("<template class='ui-col ui-col--fill'></template>")
], UIFiller);

let UILoader = class UILoader {
    constructor() {
        this.busy = false;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UILoader.prototype, "busy", void 0);
UILoader = __decorate([
    customElement("ui-loader"),
    inlineView(`<template><div ref="vmElement" class="ui-loader" if.bind="busy">
  <div><ui-svg-icon icon="loader" class="ui-anim--spin"></ui-svg-icon></div>
</div></template>`)
], UILoader);

let UITextDivider = class UITextDivider {
};
UITextDivider = __decorate([
    customElement("ui-text-divider"),
    inlineView("<template><fieldset class='ui-text-divider'><legend ref='vmElement'><slot></slot></legend></fieldset></template>")
], UITextDivider);

const Shared = [UIDivider, UIDrop, UIFiller, UILoader, UITextDivider, UIDragHandle];

export { Shared };
//# sourceMappingURL=ui-shared.js.map
