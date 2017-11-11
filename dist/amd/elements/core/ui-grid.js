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
            if (element.hasAttribute('middle'))
                element.classList.add('ui-align-center');
            if (element.hasAttribute('bottom'))
                element.classList.add('ui-align-end');
            if (element.hasAttribute('stretch'))
                element.classList.add('ui-align-stretch');
            if (element.hasAttribute('start'))
                element.classList.add('ui-justify-start');
            if (element.hasAttribute('center'))
                element.classList.add('ui-justify-center');
            if (element.hasAttribute('end'))
                element.classList.add('ui-justify-end');
            if (element.hasAttribute('between'))
                element.classList.add('ui-justify-betweeen');
            if (element.hasAttribute('around'))
                element.classList.add('ui-justify-around');
            if (!element.hasAttribute('nogutter'))
                element.classList.add('ui-gutter');
            if (element.hasAttribute('nowrap'))
                element.classList.add('ui-nowrap');
            if (element.hasAttribute('vertical') && element.hasAttribute('reverse'))
                element.classList.add('ui-row-v-reverse');
            else if (element.hasAttribute('verical'))
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
            if (element.hasAttribute('top'))
                element.classList.add('ui-align-top');
            if (element.hasAttribute('middle'))
                element.classList.add('ui-align-middle');
            if (element.hasAttribute('bottom'))
                element.classList.add('ui-align-bottom');
            if (element.hasAttribute('stretch'))
                element.classList.add('ui-align-stretch');
            if (element.hasAttribute('auto'))
                element.classList.add('ui-column-auto');
            if (element.hasAttribute('fill'))
                element.classList.add('ui-column-fill');
            if (element.hasAttribute('full'))
                element.classList.add('ui-column-full');
            if (element.hasAttribute('form'))
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
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "width", void 0);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvcmUvdWktZ3JpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFTQTtRQUFBO1FBQXdCLENBQUM7UUFBWixRQUFRO1lBRnBCLGlDQUFhLENBQUMsV0FBVyxDQUFDO1lBQzFCLDhCQUFVLENBQUMsOENBQThDLENBQUM7V0FDOUMsUUFBUSxDQUFJO1FBQUQsZUFBQztLQUF6QixBQUF5QixJQUFBO0lBQVosNEJBQVE7SUFJckI7UUFDRSxxQkFBbUIsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFIVSxXQUFXO1lBRnZCLGlDQUFhLENBQUMsY0FBYyxDQUFDO1lBQzdCLDhCQUFVLENBQUMseURBQXlELENBQUM7NkNBRXhDLE9BQU87V0FEeEIsV0FBVyxDQUl2QjtRQUFELGtCQUFDO0tBSkQsQUFJQyxJQUFBO0lBSlksa0NBQVc7SUFTeEI7UUFDRSxlQUFtQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN6RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDN0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FB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QyxHQUFHLENBQUMsZUFBYSxJQUFNLENBQUMsQ0FBQztpQkFDakQ7WUFDSCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9ELENBQUM7UUFFVztZQUFYLDRCQUFRLEVBQUU7OzhDQUFXO1FBQ1Y7WUFBWCw0QkFBUSxFQUFFOzsrQ0FBWTtRQXRCWixRQUFRO1lBSHBCLDhCQUFVLEVBQUU7WUFDWixpQ0FBYSxDQUFDLFdBQVcsQ0FBQztZQUMxQiw4QkFBVSxDQUFDLHNEQUFzRCxDQUFDOzZDQUVyQyxPQUFPO1dBRHhCLFFBQVEsQ0F1QnBCO1FBQUQsZUFBQztLQXZCRCxBQXVCQyxJQUFBO0lBdkJZLDRCQUFRIiwiZmlsZSI6ImVsZW1lbnRzL2NvcmUvdWktZ3JpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE2XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcbmltcG9ydCB7IGF1dG9pbmplY3QsIGJpbmRhYmxlLCBjdXN0b21FbGVtZW50LCBpbmxpbmVWaWV3IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XG5cbkBjdXN0b21FbGVtZW50KCd1aS1maWxsZXInKVxuQGlubGluZVZpZXcoJzx0ZW1wbGF0ZSBjbGFzcz1cInVpLWNvbHVtbi1maWxsXCI+PC90ZW1wbGF0ZT4nKVxuZXhwb3J0IGNsYXNzIFVJRmlsbGVyIHsgfVxuXG5AY3VzdG9tRWxlbWVudCgndWktY29udGFpbmVyJylcbkBpbmxpbmVWaWV3KCc8dGVtcGxhdGUgY2xhc3M9XCJ1aS1jb250YWluZXJcIj48c2xvdD48L3Nsb3Q+PC90ZW1wbGF0ZT4nKVxuZXhwb3J0IGNsYXNzIFVJQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3BhZGRlZCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXBhZC1hbGwnKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tRWxlbWVudCgndWktcm93JylcbkBpbmxpbmVWaWV3KCc8dGVtcGxhdGUgY2xhc3M9XCJ1aS1yb3dcIj48c2xvdD48L3Nsb3Q+PC90ZW1wbGF0ZT4nKVxuZXhwb3J0IGNsYXNzIFVJUm93IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3RvcCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWFsaWduLXN0YXJ0Jyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdtaWRkbGUnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1hbGlnbi1jZW50ZXInKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2JvdHRvbScpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWFsaWduLWVuZCcpO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnc3RyZXRjaCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWFsaWduLXN0cmV0Y2gnKTtcblxuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnc3RhcnQnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1qdXN0aWZ5LXN0YXJ0Jyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjZW50ZXInKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1qdXN0aWZ5LWNlbnRlcicpO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZW5kJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktanVzdGlmeS1lbmQnKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2JldHdlZW4nKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1qdXN0aWZ5LWJldHdlZWVuJyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdhcm91bmQnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1qdXN0aWZ5LWFyb3VuZCcpO1xuXG4gICAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbm9ndXR0ZXInKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1ndXR0ZXInKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ25vd3JhcCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLW5vd3JhcCcpO1xuXG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCd2ZXJ0aWNhbCcpICYmIGVsZW1lbnQuaGFzQXR0cmlidXRlKCdyZXZlcnNlJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktcm93LXYtcmV2ZXJzZScpO1xuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCd2ZXJpY2FsJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktcm93LXYnKTtcbiAgICBlbHNlIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncmV2ZXJzZScpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXJvdy1oLXJldmVyc2UnKTtcbiAgICBlbHNlIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktcm93LWgnKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tRWxlbWVudCgndWktY29sdW1uJylcbkBpbmxpbmVWaWV3KCc8dGVtcGxhdGUgY2xhc3M9XCJ1aS1jb2x1bW5cIj48c2xvdD48L3Nsb3Q+PC90ZW1wbGF0ZT4nKVxuZXhwb3J0IGNsYXNzIFVJQ29sdW1uIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3RvcCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWFsaWduLXRvcCcpO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWlkZGxlJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktYWxpZ24tbWlkZGxlJyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdib3R0b20nKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1hbGlnbi1ib3R0b20nKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3N0cmV0Y2gnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1hbGlnbi1zdHJldGNoJyk7XG5cbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2F1dG8nKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1jb2x1bW4tYXV0bycpO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZmlsbCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWNvbHVtbi1maWxsJyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdmdWxsJykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktY29sdW1uLWZ1bGwnKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Zvcm0nKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1jb2x1bW4tZm9ybScpO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgaWYgKHRoaXMuc2l6ZS5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIHNpemUgb2YgdGhpcy5zaXplLnNwbGl0KCcgJykpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoYHVpLWNvbHVtbi0ke3NpemV9YCk7XG4gICAgICB9XHJcbiAgICB9XG4gICAgaWYgKHRoaXMud2lkdGgpIHRoaXMuZWxlbWVudFsnc3R5bGUnXS5mbGV4QmFzaXMgPSB0aGlzLndpZHRoO1xuICB9XG5cbiAgQGJpbmRhYmxlKCkgc2l6ZSA9ICcnO1xuICBAYmluZGFibGUoKSB3aWR0aCA9ICcnO1xufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
