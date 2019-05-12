import { customElement, inlineView, bindable } from 'aurelia-framework';
import 'aurelia-event-aggregator';
import { a as UIInternal } from './chunk2.js';
import { a as __decorate, b as __metadata } from './chunk3.js';
import ResizeObserver from 'resize-observer-polyfill';

let UIContent = class UIContent {
    constructor(element) {
        this.obResize = new ResizeObserver(() => element.dispatchEvent(UIInternal.createEvent("resize")));
        this.obResize.observe(element);
    }
    detached() {
        this.obResize.disconnect();
    }
};
UIContent = __decorate([
    customElement("ui-content"),
    inlineView(`<template class="ui-section__content" ref="vmElement"><slot></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UIContent);

let UISection = class UISection {
    constructor(element) {
        if (element.hasAttribute("centered")) {
            element.classList.add("ui-section--centered");
        }
    }
};
UISection = __decorate([
    customElement("ui-section"),
    inlineView(`<template class="ui-section au-animate animate-slide-in-right animate-slide-out-left" role="main"><slot></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UISection);

let UISectionFoot = class UISectionFoot {
};
UISectionFoot = __decorate([
    customElement("ui-section-foot"),
    inlineView(`<template class="ui-section__foot"><slot></slot></template>`)
], UISectionFoot);

let UISectionHead = class UISectionHead {
};
UISectionHead = __decorate([
    customElement("ui-section-head"),
    inlineView(`<template class="ui-section__head"><slot></slot></template>`)
], UISectionHead);

let UIPage = class UIPage {
    constructor() {
        this.pageTitle = "";
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPage.prototype, "pageTitle", void 0);
UIPage = __decorate([
    customElement("ui-page"),
    inlineView(`<template class="ui-page au-animate animate-slide-in-right animate-slide-out-left" role="main">
  <div class="ui-page__title" if.bind="pageTitle">\${pageTitle}</div>
  <slot name="page-alert"></slot>
  <div class="ui-page__body"><slot></slot></div>
</template>`)
], UIPage);
const Page = [UIPage, UISection, UISectionHead, UISectionFoot, UIContent];

export { Page };
//# sourceMappingURL=ui-page.js.map
