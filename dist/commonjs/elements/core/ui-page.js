"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var UIPage = (function () {
    function UIPage(element) {
        this.element = element;
        this.pageClass = '';
        if (element.hasAttribute('animate'))
            element.classList.add('au-animate');
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIPage.prototype, "pageClass", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIPage.prototype, "pageTitle", void 0);
    UIPage = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customElement('ui-page'),
        aurelia_framework_1.inlineView("\n<template class=\"ui-page\">\n  <div class=\"ui-page-title\" if.bind=\"pageTitle\" innerhtml.bind=\"pageTitle\"></div>\n  <div class=\"ui-page-body ${pageClass}\"><slot></slot></div>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UIPage);
    return UIPage;
}());
exports.UIPage = UIPage;
var UISection = (function () {
    function UISection(element) {
        this.element = element;
        if (element.hasAttribute('animate'))
            element.classList.add('au-animate');
        if (element.hasAttribute('row-layout'))
            element.classList.add('row');
        else
            element.classList.add('column');
        if (element.hasAttribute('center'))
            element.classList.add('ui-align-center');
        if (element.hasAttribute('middle'))
            element.classList.add('ui-align-middle');
    }
    UISection = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customElement('ui-section'),
        aurelia_framework_1.inlineView("<template class=\"ui-section\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UISection);
    return UISection;
}());
exports.UISection = UISection;
var UIContent = (function () {
    function UIContent(element) {
        this.element = element;
        if (element.hasAttribute('animate'))
            element.classList.add('au-animate');
        if (element.hasAttribute('padded'))
            element.classList.add('ui-pad-all');
        if (element.hasAttribute('scroll'))
            element.classList.add('ui-scroll');
    }
    UIContent = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customElement('ui-content'),
        aurelia_framework_1.inlineView("<template class=\"ui-content\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIContent);
    return UIContent;
}());
exports.UIContent = UIContent;
var UIGlyph = (function () {
    function UIGlyph(element) {
        this.element = element;
        this.glyph = '';
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIGlyph.prototype, "glyph", void 0);
    UIGlyph = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customElement('ui-glyph'),
        aurelia_framework_1.inlineView("<template class=\"ui-icon\"><svg if.bind=\"glyph\"><use tabindex=\"-1\" x=\"0\" y=\"0\" xlink:href=\"#${glyph}\"/></svg></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIGlyph);
    return UIGlyph;
}());
exports.UIGlyph = UIGlyph;
var UILoader = (function () {
    function UILoader(element) {
        this.busy = false;
        if (element.hasAttribute('big'))
            element.classList.add('ui-big');
        if (element.hasAttribute('small'))
            element.classList.add('ui-small');
    }
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Boolean)
    ], UILoader.prototype, "busy", void 0);
    UILoader = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.customElement('ui-loader'),
        aurelia_framework_1.inlineView("<template class=\"ui-app-loader\" show.bind=\"busy\">\n  <div class=\"ui-loader-div\">\n    <ui-glyph class=\"ui-anim-loader\" glyph=\"glyph-loader\"></ui-glyph>\n  </div>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UILoader);
    return UILoader;
}());
exports.UILoader = UILoader;
