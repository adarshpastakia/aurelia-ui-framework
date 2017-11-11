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
    var UIToolbar = (function () {
        function UIToolbar(element) {
            this.element = element;
            if (element.hasAttribute('start'))
                element.classList.add('ui-start');
        }
        UIToolbar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-toolbar\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-toolbar'),
            __metadata("design:paramtypes", [Element])
        ], UIToolbar);
        return UIToolbar;
    }());
    exports.UIToolbar = UIToolbar;
    var UIStatsbar = (function () {
        function UIStatsbar(element) {
            this.element = element;
            if (element.hasAttribute('small'))
                element.classList.add('ui-small');
            if (element.hasAttribute('icon-top'))
                element.classList.add('ui-icon-top');
            if (element.hasAttribute('icon-end'))
                element.classList.add('ui-icon-end');
            if (element.hasAttribute('vertical'))
                element.classList.add('ui-vertical');
            if (element.hasAttribute('icon-only'))
                element.classList.add('ui-icon-only');
        }
        UIStatsbar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-statsbar\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-statsbar'),
            __metadata("design:paramtypes", [Element])
        ], UIStatsbar);
        return UIStatsbar;
    }());
    exports.UIStatsbar = UIStatsbar;
    var UIStat = (function () {
        function UIStat(element) {
            this.element = element;
            this.glyph = '';
            this.label = '';
            if (element.hasAttribute('icon-end'))
                element.classList.add('ui-icon-end');
            if (element.hasAttribute('icon-only'))
                element.classList.add('ui-icon-only');
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIStat.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIStat.prototype, "label", void 0);
        UIStat = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-stat\"><ui-glyph glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>\n  <div><div class=\"ui-stat-value\"><slot></slot></div><div class=\"ui-stat-label\" innerhtml.bind=\"label\" if.bind=\"label\"></div></div></template>"),
            aurelia_framework_1.customElement('ui-stat'),
            __metadata("design:paramtypes", [Element])
        ], UIStat);
        return UIStat;
    }());
    exports.UIStat = UIStat;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktYmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFVQTtRQUNFLG1CQUFtQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUhVLFNBQVM7WUFIckIsOEJBQVUsRUFBRTtZQUNaLDhCQUFVLENBQUMseURBQXVELENBQUM7WUFDbkUsaUNBQWEsQ0FBQyxZQUFZLENBQUM7NkNBRUUsT0FBTztXQUR4QixTQUFTLENBSXJCO1FBQUQsZ0JBQUM7S0FKRCxBQUlDLElBQUE7SUFKWSw4QkFBUztJQVN0QjtRQUNFLG9CQUFtQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBUFUsVUFBVTtZQUh0Qiw4QkFBVSxFQUFFO1lBQ1osOEJBQVUsQ0FBQywwREFBd0QsQ0FBQztZQUNwRSxpQ0FBYSxDQUFDLGFBQWEsQ0FBQzs2Q0FFQyxPQUFPO1dBRHhCLFVBQVUsQ0FRdEI7UUFBRCxpQkFBQztLQVJELEFBUUMsSUFBQTtJQVJZLGdDQUFVO0lBY3ZCO1FBQ0UsZ0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFNdkIsVUFBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7WUFMckIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFFVztZQUFYLDRCQUFRLEVBQUU7OzZDQUFZO1FBQ1g7WUFBWCw0QkFBUSxFQUFFOzs2Q0FBWTtRQVJaLE1BQU07WUFKbEIsOEJBQVUsRUFBRTtZQUNaLDhCQUFVLENBQUMsa1BBQ21JLENBQUM7WUFDL0ksaUNBQWEsQ0FBQyxTQUFTLENBQUM7NkNBRUssT0FBTztXQUR4QixNQUFNLENBU2xCO1FBQUQsYUFBQztLQVRELEFBU0MsSUFBQTtJQVRZLHdCQUFNIiwiZmlsZSI6ImVsZW1lbnRzL2NvbXBvbmVudHMvdWktYmFycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE3XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcbmltcG9ydCB7IGF1dG9pbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlLCBpbmxpbmVWaWV3IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktdG9vbGJhclwiPjxzbG90Pjwvc2xvdD48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktdG9vbGJhcicpXG5leHBvcnQgY2xhc3MgVUlUb29sYmFyIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3N0YXJ0JykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktc3RhcnQnKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktc3RhdHNiYXJcIj48c2xvdD48L3Nsb3Q+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXN0YXRzYmFyJylcbmV4cG9ydCBjbGFzcyBVSVN0YXRzYmFyIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3NtYWxsJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktc21hbGwnKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2ljb24tdG9wJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktaWNvbi10b3AnKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2ljb24tZW5kJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktaWNvbi1lbmQnKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3ZlcnRpY2FsJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktdmVydGljYWwnKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2ljb24tb25seScpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWljb24tb25seScpO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1zdGF0XCI+PHVpLWdseXBoIGdseXBoLmJpbmQ9XCJnbHlwaFwiIGlmLmJpbmQ9XCJnbHlwaFwiPjwvdWktZ2x5cGg+XG4gIDxkaXY+PGRpdiBjbGFzcz1cInVpLXN0YXQtdmFsdWVcIj48c2xvdD48L3Nsb3Q+PC9kaXY+PGRpdiBjbGFzcz1cInVpLXN0YXQtbGFiZWxcIiBpbm5lcmh0bWwuYmluZD1cImxhYmVsXCIgaWYuYmluZD1cImxhYmVsXCI+PC9kaXY+PC9kaXY+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXN0YXQnKVxuZXhwb3J0IGNsYXNzIFVJU3RhdCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG5cbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2ljb24tZW5kJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktaWNvbi1lbmQnKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2ljb24tb25seScpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWljb24tb25seScpO1xuICB9XG5cbiAgQGJpbmRhYmxlKCkgZ2x5cGggPSAnJztcbiAgQGJpbmRhYmxlKCkgbGFiZWwgPSAnJztcbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
