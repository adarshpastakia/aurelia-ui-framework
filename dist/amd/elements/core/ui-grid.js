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
    var UIFiller = (function () {
        function UIFiller() {
        }
        UIFiller = __decorate([
            aurelia_framework_1.customElement('ui-filler'),
            aurelia_framework_1.inlineView('<template class="ui-column-fill"></template>')
        ], UIFiller);
        return UIFiller;
    }());
    exports.UIFiller = UIFiller;
    var UIContainer = (function () {
        function UIContainer(element) {
            this.element = element;
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        UIContainer = __decorate([
            aurelia_framework_1.customElement('ui-container'),
            aurelia_framework_1.inlineView('<template class="ui-container"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIContainer);
        return UIContainer;
    }());
    exports.UIContainer = UIContainer;
    var UIRow = (function () {
        function UIRow(element) {
            this.element = element;
            if (element.hasAttribute('top'))
                element.classList.add('ui-align-start');
            else if (element.hasAttribute('middle'))
                element.classList.add('ui-align-center');
            else if (element.hasAttribute('bottom'))
                element.classList.add('ui-align-end');
            else if (element.hasAttribute('stretch'))
                element.classList.add('ui-align-stretch');
            if (element.hasAttribute('start'))
                element.classList.add('ui-justify-start');
            else if (element.hasAttribute('center'))
                element.classList.add('ui-justify-center');
            else if (element.hasAttribute('end'))
                element.classList.add('ui-justify-end');
            else if (element.hasAttribute('between'))
                element.classList.add('ui-justify-betweeen');
            else if (element.hasAttribute('around'))
                element.classList.add('ui-justify-around');
            if (!element.hasAttribute('nogutter'))
                element.classList.add('ui-gutter');
            if (element.hasAttribute('nowrap'))
                element.classList.add('ui-nowrap');
            if (element.hasAttribute('vertical-reverse'))
                element.classList.add('ui-row-v-reverse');
            else if (element.hasAttribute('vertical'))
                element.classList.add('ui-row-v');
            else if (element.hasAttribute('reverse'))
                element.classList.add('ui-row-h-reverse');
            else
                element.classList.add('ui-row-h');
        }
        UIRow = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-row'),
            aurelia_framework_1.inlineView('<template class="ui-row"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIRow);
        return UIRow;
    }());
    exports.UIRow = UIRow;
    var UIColumn = (function () {
        function UIColumn(element) {
            this.element = element;
            this.size = '';
            this.width = '';
            this.row = '';
            if (element.hasAttribute('top'))
                element.classList.add('ui-self-top');
            else if (element.hasAttribute('middle'))
                element.classList.add('ui-self-middle');
            else if (element.hasAttribute('bottom'))
                element.classList.add('ui-self-bottom');
            else if (element.hasAttribute('stretch'))
                element.classList.add('ui-self-stretch');
            if (element.hasAttribute('auto'))
                element.classList.add('ui-column-auto');
            else if (element.hasAttribute('fill'))
                element.classList.add('ui-column-fill');
            else if (element.hasAttribute('full'))
                element.classList.add('ui-column-full');
            else if (element.hasAttribute('form'))
                element.classList.add('ui-column-form');
        }
        UIColumn.prototype.bind = function () {
            if (this.size.length) {
                for (var _i = 0, _a = this.size.split(' '); _i < _a.length; _i++) {
                    var size = _a[_i];
                    this.element.classList.add("ui-column-" + size);
                }
            }
            if (this.width)
                this.element['style'].flexBasis = this.width;
            if (this.row.length) {
                for (var _b = 0, _c = this.row.split(' '); _b < _c.length; _b++) {
                    var row = _c[_b];
                    this.element.classList.add("ui-row");
                    if (row === 'top')
                        this.element.classList.add('ui-align-start');
                    else if (row === 'middle')
                        this.element.classList.add('ui-align-center');
                    else if (row === 'bottom')
                        this.element.classList.add('ui-align-end');
                    else if (row === 'stretch')
                        this.element.classList.add('ui-align-stretch');
                    if (row === 'start')
                        this.element.classList.add('ui-justify-start');
                    else if (row === 'center')
                        this.element.classList.add('ui-justify-center');
                    else if (row === 'end')
                        this.element.classList.add('ui-justify-end');
                    else if (row === 'between')
                        this.element.classList.add('ui-justify-betweeen');
                    else if (row === 'around')
                        this.element.classList.add('ui-justify-around');
                    if (row !== 'nogutter')
                        this.element.classList.add('ui-gutter');
                    if (row === 'nowrap')
                        this.element.classList.add('ui-nowrap');
                    if (row === 'vertical-reverse')
                        this.element.classList.add('ui-row-v-reverse');
                    else if (row === 'vertical')
                        this.element.classList.add('ui-row-v');
                    else if (row === 'reverse')
                        this.element.classList.add('ui-row-h-reverse');
                    else if (row === 'row')
                        this.element.classList.add('ui-row-h');
                }
            }
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "row", void 0);
        UIColumn = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-column'),
            aurelia_framework_1.inlineView('<template class="ui-column"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIColumn);
        return UIColumn;
    }());
    exports.UIColumn = UIColumn;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvcmUvdWktZ3JpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFTQTtRQUFBO1FBQXdCLENBQUM7UUFBWixRQUFRO1lBRnBCLGlDQUFhLENBQUMsV0FBVyxDQUFDO1lBQzFCLDhCQUFVLENBQUMsOENBQThDLENBQUM7V0FDOUMsUUFBUSxDQUFJO1FBQUQsZUFBQztLQUF6QixBQUF5QixJQUFBO0lBQVosNEJBQVE7SUFJckI7UUFDRSxxQkFBbUIsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFIVSxXQUFXO1lBRnZCLGlDQUFhLENBQUMsY0FBYyxDQUFDO1lBQzdCLDhCQUFVLENBQUMseURBQXlELENBQUM7NkNBRXhDLE9BQU87V0FEeEIsV0FBVyxDQUl2QjtRQUFELGtCQUFDO0tBSkQsQUFJQyxJQUFBO0lBSlksa0NBQVc7SUFTeEI7UUFDRSxlQUFtQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FB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QUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUMvRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFVBQVUsQ0FBQzt3QkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3BFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDO3dCQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUMzRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQzt3QkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ2hFO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFVztZQUFYLDRCQUFRLEVBQUU7OzhDQUFXO1FBQ1Y7WUFBWCw0QkFBUSxFQUFFOzsrQ0FBWTtRQUVYO1lBQVgsNEJBQVEsRUFBRTs7NkNBQVU7UUFoRFYsUUFBUTtZQUhwQiw4QkFBVSxFQUFFO1lBQ1osaUNBQWEsQ0FBQyxXQUFXLENBQUM7WUFDMUIsOEJBQVUsQ0FBQyxzREFBc0QsQ0FBQzs2Q0FFckMsT0FBTztXQUR4QixRQUFRLENBaURwQjtRQUFELGVBQUM7S0FqREQsQUFpREMsSUFBQTtJQWpEWSw0QkFBUSIsImZpbGUiOiJlbGVtZW50cy9jb3JlL3VpLWdyaWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxNlxuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBiaW5kYWJsZSwgY3VzdG9tRWxlbWVudCwgaW5saW5lVmlldyB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xuXG5AY3VzdG9tRWxlbWVudCgndWktZmlsbGVyJylcbkBpbmxpbmVWaWV3KCc8dGVtcGxhdGUgY2xhc3M9XCJ1aS1jb2x1bW4tZmlsbFwiPjwvdGVtcGxhdGU+JylcbmV4cG9ydCBjbGFzcyBVSUZpbGxlciB7IH1cblxuQGN1c3RvbUVsZW1lbnQoJ3VpLWNvbnRhaW5lcicpXG5AaW5saW5lVmlldygnPHRlbXBsYXRlIGNsYXNzPVwidWktY29udGFpbmVyXCI+PHNsb3Q+PC9zbG90PjwvdGVtcGxhdGU+JylcbmV4cG9ydCBjbGFzcyBVSUNvbnRhaW5lciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdwYWRkZWQnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1wYWQtYWxsJyk7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXJvdycpXG5AaW5saW5lVmlldygnPHRlbXBsYXRlIGNsYXNzPVwidWktcm93XCI+PHNsb3Q+PC9zbG90PjwvdGVtcGxhdGU+JylcbmV4cG9ydCBjbGFzcyBVSVJvdyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCd0b3AnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1hbGlnbi1zdGFydCcpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdtaWRkbGUnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1hbGlnbi1jZW50ZXInKTtcbiAgICBlbHNlIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnYm90dG9tJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktYWxpZ24tZW5kJyk7XG4gICAgZWxzZSBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3N0cmV0Y2gnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1hbGlnbi1zdHJldGNoJyk7XG5cbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3N0YXJ0JykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktanVzdGlmeS1zdGFydCcpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjZW50ZXInKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1qdXN0aWZ5LWNlbnRlcicpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdlbmQnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1qdXN0aWZ5LWVuZCcpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdiZXR3ZWVuJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktanVzdGlmeS1iZXR3ZWVlbicpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdhcm91bmQnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1qdXN0aWZ5LWFyb3VuZCcpO1xuXG4gICAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbm9ndXR0ZXInKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1ndXR0ZXInKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ25vd3JhcCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLW5vd3JhcCcpO1xuXG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCd2ZXJ0aWNhbC1yZXZlcnNlJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktcm93LXYtcmV2ZXJzZScpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCd2ZXJ0aWNhbCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXJvdy12Jyk7XG4gICAgZWxzZSBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3JldmVyc2UnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1yb3ctaC1yZXZlcnNlJyk7XG4gICAgZWxzZSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXJvdy1oJyk7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWNvbHVtbicpXG5AaW5saW5lVmlldygnPHRlbXBsYXRlIGNsYXNzPVwidWktY29sdW1uXCI+PHNsb3Q+PC9zbG90PjwvdGVtcGxhdGU+JylcbmV4cG9ydCBjbGFzcyBVSUNvbHVtbiB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCd0b3AnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zZWxmLXRvcCcpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdtaWRkbGUnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zZWxmLW1pZGRsZScpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdib3R0b20nKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zZWxmLWJvdHRvbScpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdzdHJldGNoJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktc2VsZi1zdHJldGNoJyk7XG5cbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2F1dG8nKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1jb2x1bW4tYXV0bycpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdmaWxsJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktY29sdW1uLWZpbGwnKTtcbiAgICBlbHNlIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZnVsbCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWNvbHVtbi1mdWxsJyk7XG4gICAgZWxzZSBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Zvcm0nKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1jb2x1bW4tZm9ybScpO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZS5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIHNpemUgb2YgdGhpcy5zaXplLnNwbGl0KCcgJykpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoYHVpLWNvbHVtbi0ke3NpemV9YCk7XG4gICAgICB9XHJcbiAgICB9XG4gICAgaWYgKHRoaXMud2lkdGgpIHRoaXMuZWxlbWVudFsnc3R5bGUnXS5mbGV4QmFzaXMgPSB0aGlzLndpZHRoO1xuXG4gICAgaWYgKHRoaXMucm93Lmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgcm93IG9mIHRoaXMucm93LnNwbGl0KCcgJykpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoYHVpLXJvd2ApO1xuICAgICAgICBpZiAocm93ID09PSAndG9wJykgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWFsaWduLXN0YXJ0Jyk7XG4gICAgICAgIGVsc2UgaWYgKHJvdyA9PT0gJ21pZGRsZScpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1hbGlnbi1jZW50ZXInKTtcbiAgICAgICAgZWxzZSBpZiAocm93ID09PSAnYm90dG9tJykgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWFsaWduLWVuZCcpO1xuICAgICAgICBlbHNlIGlmIChyb3cgPT09ICdzdHJldGNoJykgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWFsaWduLXN0cmV0Y2gnKTtcblxuICAgICAgICBpZiAocm93ID09PSAnc3RhcnQnKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktanVzdGlmeS1zdGFydCcpO1xuICAgICAgICBlbHNlIGlmIChyb3cgPT09ICdjZW50ZXInKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktanVzdGlmeS1jZW50ZXInKTtcbiAgICAgICAgZWxzZSBpZiAocm93ID09PSAnZW5kJykgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWp1c3RpZnktZW5kJyk7XG4gICAgICAgIGVsc2UgaWYgKHJvdyA9PT0gJ2JldHdlZW4nKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktanVzdGlmeS1iZXR3ZWVlbicpO1xuICAgICAgICBlbHNlIGlmIChyb3cgPT09ICdhcm91bmQnKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktanVzdGlmeS1hcm91bmQnKTtcblxuICAgICAgICBpZiAocm93ICE9PSAnbm9ndXR0ZXInKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktZ3V0dGVyJyk7XG4gICAgICAgIGlmIChyb3cgPT09ICdub3dyYXAnKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktbm93cmFwJyk7XG5cbiAgICAgICAgaWYgKHJvdyA9PT0gJ3ZlcnRpY2FsLXJldmVyc2UnKSB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktcm93LXYtcmV2ZXJzZScpO1xuICAgICAgICBlbHNlIGlmIChyb3cgPT09ICd2ZXJ0aWNhbCcpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1yb3ctdicpO1xuICAgICAgICBlbHNlIGlmIChyb3cgPT09ICdyZXZlcnNlJykgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXJvdy1oLXJldmVyc2UnKTtcbiAgICAgICAgZWxzZSBpZiAocm93ID09PSAncm93JykgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXJvdy1oJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQGJpbmRhYmxlKCkgc2l6ZSA9ICcnO1xuICBAYmluZGFibGUoKSB3aWR0aCA9ICcnO1xuXG4gIEBiaW5kYWJsZSgpIHJvdyA9ICcnO1xufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
