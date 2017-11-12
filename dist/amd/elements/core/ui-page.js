var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            aurelia_framework_1.inlineView("\n<template class=\"ui-page ui-column-fill ui-row ui-row-v ui-align-stretch ui-nowrap\">\n  <div class=\"ui-page-title ui-column-auto\" if.bind=\"pageTitle\" innerhtml.bind=\"pageTitle\"></div>\n  <div class=\"ui-page-body ui-column-fill ui-row ui-row-v ui-align-stretch ${pageClass}\"><slot></slot></div>\n</template>"),
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
                element.classList.add('ui-row-h');
            else
                element.classList.add('ui-row-v');
            if (element.hasAttribute('center'))
                element.classList.add('ui-justify-center');
            if (element.hasAttribute('middle'))
                element.classList.add('ui-align-center');
        }
        UISection = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-section'),
            aurelia_framework_1.inlineView("<template class=\"ui-section ui-column-fill ui-row ui-align-stretch ui-nowrap\"><slot></slot></template>"),
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
            aurelia_framework_1.inlineView("<template class=\"ui-content ui-column-fill\"><slot></slot></template>"),
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
            aurelia_framework_1.inlineView("<template class=\"ui-icon ${glyph}\"><svg if.bind=\"glyph\"><use tabindex=\"-1\" x=\"0\" y=\"0\" xlink:href=\"#${glyph}\"/></svg></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIGlyph);
        return UIGlyph;
    }());
    exports.UIGlyph = UIGlyph;
    var UIDivider = (function () {
        function UIDivider() {
        }
        UIDivider = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-divider'),
            aurelia_framework_1.inlineView("<template class=\"ui-divider\"></template>")
        ], UIDivider);
        return UIDivider;
    }());
    exports.UIDivider = UIDivider;
    var UILoader = (function () {
        function UILoader(element) {
            this.busy = false;
            if (element.hasAttribute('small'))
                element.classList.add('ui-small');
            if (element.hasAttribute('large'))
                element.classList.add('ui-large');
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Boolean)
        ], UILoader.prototype, "busy", void 0);
        UILoader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-loader'),
            aurelia_framework_1.inlineView("<template class=\"ui-loader\" show.bind=\"busy\">\n  <div class=\"ui-loader-el\">\n    <ui-glyph class=\"ui-anim-loader\" glyph=\"glyph-busy\"></ui-glyph>\n  </div>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], UILoader);
        return UILoader;
    }());
    exports.UILoader = UILoader;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDO1FBQzVCO1lBQVgsNEJBQVEsRUFBRTs7OENBQVk7UUFGWixPQUFPO1lBSG5CLDhCQUFVLEVBQUU7WUFDWixpQ0FBYSxDQUFDLFVBQVUsQ0FBQztZQUN6Qiw4QkFBVSxDQUFDLDhJQUFvSSxDQUFDOzZDQUVuSCxPQUFPO1dBRHhCLE9BQU8sQ0FHbkI7UUFBRCxjQUFDO0tBSEQsQUFHQyxJQUFBO0lBSFksMEJBQU87SUFRcEI7UUFBQTtRQUF5QixDQUFDO1FBQWIsU0FBUztZQUhyQiw4QkFBVSxFQUFFO1lBQ1osaUNBQWEsQ0FBQyxZQUFZLENBQUM7WUFDM0IsOEJBQVUsQ0FBQyw0Q0FBMEMsQ0FBQztXQUMxQyxTQUFTLENBQUk7UUFBRCxnQkFBQztLQUExQixBQUEwQixJQUFBO0lBQWIsOEJBQVM7SUFTdEI7UUFDRSxrQkFBWSxPQUFnQjtZQUtoQixTQUFJLEdBQVksS0FBSyxDQUFDO1lBSmhDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRVc7WUFBWCw0QkFBUSxFQUFFOzs4Q0FBdUI7UUFOdkIsUUFBUTtZQVBwQiw4QkFBVSxFQUFFO1lBQ1osaUNBQWEsQ0FBQyxXQUFXLENBQUM7WUFDMUIsOEJBQVUsQ0FBQyxtTEFJQSxDQUFDOzZDQUVVLE9BQU87V0FEakIsUUFBUSxDQU9wQjtRQUFELGVBQUM7S0FQRCxBQU9DLElBQUE7SUFQWSw0QkFBUSIsImZpbGUiOiJlbGVtZW50cy9jb3JlL3VpLXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgaW5saW5lVmlldyB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXBhZ2UnKVxuQGlubGluZVZpZXcoYFxuPHRlbXBsYXRlIGNsYXNzPVwidWktcGFnZSB1aS1jb2x1bW4tZmlsbCB1aS1yb3cgdWktcm93LXYgdWktYWxpZ24tc3RyZXRjaCB1aS1ub3dyYXBcIj5cbiAgPGRpdiBjbGFzcz1cInVpLXBhZ2UtdGl0bGUgdWktY29sdW1uLWF1dG9cIiBpZi5iaW5kPVwicGFnZVRpdGxlXCIgaW5uZXJodG1sLmJpbmQ9XCJwYWdlVGl0bGVcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLXBhZ2UtYm9keSB1aS1jb2x1bW4tZmlsbCB1aS1yb3cgdWktcm93LXYgdWktYWxpZ24tc3RyZXRjaCBcXCR7cGFnZUNsYXNzfVwiPjxzbG90Pjwvc2xvdD48L2Rpdj5cbjwvdGVtcGxhdGU+YClcbmV4cG9ydCBjbGFzcyBVSVBhZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnYW5pbWF0ZScpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2F1LWFuaW1hdGUnKTtcbiAgfVxuICBAYmluZGFibGUoKSBwYWdlQ2xhc3MgPSAnJztcbiAgQGJpbmRhYmxlKCkgcGFnZVRpdGxlO1xufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tRWxlbWVudCgndWktc2VjdGlvbicpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktc2VjdGlvbiB1aS1jb2x1bW4tZmlsbCB1aS1yb3cgdWktYWxpZ24tc3RyZXRjaCB1aS1ub3dyYXBcIj48c2xvdD48L3Nsb3Q+PC90ZW1wbGF0ZT5gKVxuZXhwb3J0IGNsYXNzIFVJU2VjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdhbmltYXRlJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYXUtYW5pbWF0ZScpO1xuICAgIC8vIExBWU9VVFxuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncm93LWxheW91dCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXJvdy1oJyk7XG4gICAgZWxzZSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXJvdy12Jyk7XG4gICAgLy8gQUxJR05NRU5UXG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjZW50ZXInKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1qdXN0aWZ5LWNlbnRlcicpO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWlkZGxlJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktYWxpZ24tY2VudGVyJyk7XG4gIH1cbn1cblxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tRWxlbWVudCgndWktY29udGVudCcpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktY29udGVudCB1aS1jb2x1bW4tZmlsbFwiPjxzbG90Pjwvc2xvdD48L3RlbXBsYXRlPmApXG5leHBvcnQgY2xhc3MgVUlDb250ZW50IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2FuaW1hdGUnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhdS1hbmltYXRlJyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdwYWRkZWQnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1wYWQtYWxsJyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdzY3JvbGwnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zY3JvbGwnKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tRWxlbWVudCgndWktZ2x5cGgnKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLWljb24gXFwke2dseXBofVwiPjxzdmcgaWYuYmluZD1cImdseXBoXCI+PHVzZSB0YWJpbmRleD1cIi0xXCIgeD1cIjBcIiB5PVwiMFwiIHhsaW5rOmhyZWY9XCIjXFwke2dseXBofVwiLz48L3N2Zz48L3RlbXBsYXRlPmApXG5leHBvcnQgY2xhc3MgVUlHbHlwaCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7IH1cbiAgQGJpbmRhYmxlKCkgZ2x5cGggPSAnJztcbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWRpdmlkZXInKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLWRpdmlkZXJcIj48L3RlbXBsYXRlPmApXG5leHBvcnQgY2xhc3MgVUlEaXZpZGVyIHsgfVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tRWxlbWVudCgndWktbG9hZGVyJylcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1sb2FkZXJcIiBzaG93LmJpbmQ9XCJidXN5XCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1sb2FkZXItZWxcIj5cbiAgICA8dWktZ2x5cGggY2xhc3M9XCJ1aS1hbmltLWxvYWRlclwiIGdseXBoPVwiZ2x5cGgtYnVzeVwiPjwvdWktZ2x5cGg+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5gKVxuZXhwb3J0IGNsYXNzIFVJTG9hZGVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnc21hbGwnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zbWFsbCcpO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbGFyZ2UnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1sYXJnZScpO1xuICB9XG5cbiAgQGJpbmRhYmxlKCkgYnVzeTogYm9vbGVhbiA9IGZhbHNlO1xufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
