var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, inlineView } from 'aurelia-framework';
let UIPage = class UIPage {
    constructor(element) {
        this.element = element;
        this.pageClass = '';
        if (element.hasAttribute('animate'))
            element.classList.add('au-animate');
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPage.prototype, "pageClass", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPage.prototype, "pageTitle", void 0);
UIPage = __decorate([
    autoinject(),
    customElement('ui-page'),
    inlineView(`
<template class="ui-page ui-column-fill ui-row ui-row-v ui-align-stretch ui-nowrap">
  <div class="ui-page-title ui-column-auto" if.bind="pageTitle" innerhtml.bind="pageTitle"></div>
  <div class="ui-page-body ui-column-fill ui-row ui-row-v ui-align-stretch \${pageClass}"><slot></slot></div>
</template>`),
    __metadata("design:paramtypes", [Element])
], UIPage);
export { UIPage };
let UISection = class UISection {
    constructor(element) {
        this.element = element;
        if (element.hasAttribute('animate'))
            element.classList.add('au-animate');
        if (element.hasAttribute('row-layout'))
            element.classList.add('ui-row-h');
        else
            element.classList.add('ui-row-v');
        if (element.hasAttribute('center'))
            element.classList.add('ui-justify-center');
        if (element.hasAttribute('middle'))
            element.classList.add('ui-align-center');
    }
};
UISection = __decorate([
    autoinject(),
    customElement('ui-section'),
    inlineView(`<template class="ui-section ui-column-fill ui-row ui-align-stretch ui-nowrap"><slot></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UISection);
export { UISection };
let UIContent = class UIContent {
    constructor(element) {
        this.element = element;
        if (element.hasAttribute('animate'))
            element.classList.add('au-animate');
        if (element.hasAttribute('padded'))
            element.classList.add('ui-pad-all');
        if (element.hasAttribute('scroll'))
            element.classList.add('ui-scroll');
        if (element.hasAttribute('compact'))
            element.classList.add('ui-compact');
    }
};
UIContent = __decorate([
    autoinject(),
    customElement('ui-content'),
    inlineView(`<template class="ui-content ui-column-fill"><slot></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UIContent);
export { UIContent };
let UIGlyph = class UIGlyph {
    constructor(element) {
        this.element = element;
        this.glyph = '';
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIGlyph.prototype, "glyph", void 0);
UIGlyph = __decorate([
    autoinject(),
    customElement('ui-glyph'),
    inlineView(`<template class="ui-icon \${glyph}"><svg if.bind="glyph"><use tabindex="-1" x="0" y="0" xlink:href="#\${glyph}"/></svg></template>`),
    __metadata("design:paramtypes", [Element])
], UIGlyph);
export { UIGlyph };
let UIDivider = class UIDivider {
};
UIDivider = __decorate([
    autoinject(),
    customElement('ui-divider'),
    inlineView(`<template class="ui-divider"></template>`)
], UIDivider);
export { UIDivider };
let UILoader = class UILoader {
    constructor(element) {
        this.busy = false;
        if (element.hasAttribute('small'))
            element.classList.add('ui-small');
        if (element.hasAttribute('large'))
            element.classList.add('ui-large');
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UILoader.prototype, "busy", void 0);
UILoader = __decorate([
    autoinject(),
    customElement('ui-loader'),
    inlineView(`<template class="ui-loader" show.bind="busy">
  <div class="ui-loader-el">
    <ui-glyph class="ui-anim-loader" glyph="glyph-busy"></ui-glyph>
  </div>
</template>`),
    __metadata("design:paramtypes", [Element])
], UILoader);
export { UILoader };
