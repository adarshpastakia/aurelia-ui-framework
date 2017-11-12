var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIChip = (function () {
        function UIChip(element) {
            this.element = element;
            this.id = '';
            this.label = '';
            this.color = '';
            this.width = 'auto';
            this.canClose = false;
            if (element.hasAttribute('large'))
                element.classList.add('ui-large');
            if (element.hasAttribute('small'))
                element.classList.add('ui-small');
            this.canClose = element.hasAttribute('removable') || element.hasAttribute('remove.trigger');
        }
        UIChip.prototype.remove = function () {
            ui_event_1.UIEvent.fireEvent('remove', this.element, this.id);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "color", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "width", void 0);
        UIChip = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-chip\" css.bind=\"{minWidth:width}\"><span class=\"ui-chip-label\" css.bind=\"{backgroundColor:color}\">${label}</span><span class=\"ui-chip-value\"><slot></slot></span><a click.trigger=\"remove()\" class=\"ui-chip-close\" if.bind=\"canClose\">&times</a></template>"),
            aurelia_framework_1.customElement('ui-chip'),
            __metadata("design:paramtypes", [Element])
        ], UIChip);
        return UIChip;
    }());
    exports.UIChip = UIChip;
    var UIBreadcrumb = (function () {
        function UIBreadcrumb(element) {
            this.element = element;
        }
        UIBreadcrumb.prototype.fireChange = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            if (!isEmpty($event.detail))
                ui_event_1.UIEvent.fireEvent('change', this.element, $event.detail);
            return false;
        };
        UIBreadcrumb = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-breadcrumb\" click.delegate=\"fireChange($event)\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-breadcrumb'),
            __metadata("design:paramtypes", [Element])
        ], UIBreadcrumb);
        return UIBreadcrumb;
    }());
    exports.UIBreadcrumb = UIBreadcrumb;
    var UICrumb = (function () {
        function UICrumb(element) {
            this.element = element;
            this.id = '';
            this.href = 'javascript:;';
        }
        UICrumb.prototype.fireClick = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            ui_event_1.UIEvent.fireEvent('click', this.element, this.id);
            return false;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICrumb.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICrumb.prototype, "href", void 0);
        UICrumb = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-crumb\"><a href=\"crumb.href || 'javascript:;'\" click.trigger=\"fireClick($event)\"><slot></slot></a></template>"),
            aurelia_framework_1.customElement('ui-crumb'),
            __metadata("design:paramtypes", [Element])
        ], UICrumb);
        return UICrumb;
    }());
    exports.UICrumb = UICrumb;
    var UIPager = (function () {
        function UIPager(element) {
            this.element = element;
            this.page = 0;
            this.style = "chevron";
            this.totalPages = 1;
        }
        UIPager.prototype.bind = function (bindingContext, overrideContext) {
            if (this.store)
                this.totalPages = this.store.totalPages;
        };
        UIPager.prototype.fireChange = function () {
            if (this.store)
                this.store.loadPage(this.page);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.page);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPager.prototype, "page", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPager.prototype, "store", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPager.prototype, "style", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPager.prototype, "totalPages", void 0);
        UIPager = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-pager\">\n  <a class=\"pg-first ${page==0?'disabled':''}\" click.trigger=\"fireChange(page=0)\"><ui-glyph glyph=\"glyph-${style}-double-left\"></ui-glyph></a>\n  <a class=\"pg-prev ${page==0?'disabled':''}\" click.trigger=\"fireChange(page=page-1)\" click.trigger=\"fireChange(page=totalPages)\"><ui-glyph glyph=\"glyph-${style}-left\"></ui-glyph></a>\n  <span class=\"pg-input\">${page+1} of ${totalPages}</span>\n  <a class=\"pg-next ${page+1>=totalPages?'disabled':''}\" click.trigger=\"fireChange(page=page+1)\"><ui-glyph glyph=\"glyph-${style}-right\"></ui-glyph></a>\n  <a class=\"pg-last ${page+1>=totalPages?'disabled':''}\" click.trigger=\"fireChange(page=totalPages-1)\"><ui-glyph glyph=\"glyph-${style}-double-right\"></ui-glyph></a>\n</template>"),
            aurelia_framework_1.customElement('ui-pager'),
            __metadata("design:paramtypes", [Element])
        ], UIPager);
        return UIPager;
    }());
    exports.UIPager = UIPager;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktaW5kaWNhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFXQTtRQUNFLGdCQUFtQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBTXZCLE9BQUUsR0FBRyxFQUFFLENBQUM7WUFDUixVQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLFVBQUssR0FBRyxNQUFNLENBQUM7WUFFbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztZQVZ2QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5RixDQUFDO1FBU0QsdUJBQU0sR0FBTjtZQUNFLGtCQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBVFc7WUFBWCw0QkFBUSxFQUFFOzswQ0FBUztRQUNSO1lBQVgsNEJBQVEsRUFBRTs7NkNBQVk7UUFDWDtZQUFYLDRCQUFRLEVBQUU7OzZDQUFZO1FBQ1g7WUFBWCw0QkFBUSxFQUFFOzs2Q0FBZ0I7UUFWaEIsTUFBTTtZQUhsQiw4QkFBVSxFQUFFO1lBQ1osOEJBQVUsQ0FBQyxnU0FBaVIsQ0FBQztZQUM3UixpQ0FBYSxDQUFDLFNBQVMsQ0FB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aUNBQWEsQ0FBQyxVQUFVLENBQUM7NkNBRUksT0FBTztXQUR4QixPQUFPLENBa0JuQjtRQUFELGNBQUM7S0FsQkQsQUFrQkMsSUFBQTtJQWxCWSwwQkFBTyIsImZpbGUiOiJlbGVtZW50cy9jb21wb25lbnRzL3VpLWluZGljYXRvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgYmluZGluZ01vZGUsIGlubGluZVZpZXcgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLWV2ZW50XCI7XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1jaGlwXCIgY3NzLmJpbmQ9XCJ7bWluV2lkdGg6d2lkdGh9XCI+PHNwYW4gY2xhc3M9XCJ1aS1jaGlwLWxhYmVsXCIgY3NzLmJpbmQ9XCJ7YmFja2dyb3VuZENvbG9yOmNvbG9yfVwiPlxcJHtsYWJlbH08L3NwYW4+PHNwYW4gY2xhc3M9XCJ1aS1jaGlwLXZhbHVlXCI+PHNsb3Q+PC9zbG90Pjwvc3Bhbj48YSBjbGljay50cmlnZ2VyPVwicmVtb3ZlKClcIiBjbGFzcz1cInVpLWNoaXAtY2xvc2VcIiBpZi5iaW5kPVwiY2FuQ2xvc2VcIj4mdGltZXM8L2E+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWNoaXAnKVxuZXhwb3J0IGNsYXNzIFVJQ2hpcCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdsYXJnZScpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWxhcmdlJyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdzbWFsbCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXNtYWxsJyk7XG4gICAgdGhpcy5jYW5DbG9zZSA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdyZW1vdmFibGUnKSB8fCBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncmVtb3ZlLnRyaWdnZXInKTtcbiAgfVxuXG4gIEBiaW5kYWJsZSgpIGlkID0gJyc7XG4gIEBiaW5kYWJsZSgpIGxhYmVsID0gJyc7XG4gIEBiaW5kYWJsZSgpIGNvbG9yID0gJyc7XG4gIEBiaW5kYWJsZSgpIHdpZHRoID0gJ2F1dG8nO1xuXG4gIHByaXZhdGUgY2FuQ2xvc2UgPSBmYWxzZTtcblxuICByZW1vdmUoKSB7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ3JlbW92ZScsIHRoaXMuZWxlbWVudCwgdGhpcy5pZCk7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLWJyZWFkY3J1bWJcIiBjbGljay5kZWxlZ2F0ZT1cImZpcmVDaGFuZ2UoJGV2ZW50KVwiPjxzbG90Pjwvc2xvdD48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktYnJlYWRjcnVtYicpXG5leHBvcnQgY2xhc3MgVUlCcmVhZGNydW1iIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgfVxuXG4gIHByaXZhdGUgZmlyZUNoYW5nZSgkZXZlbnQpIHtcbiAgICAkZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKCFpc0VtcHR5KCRldmVudC5kZXRhaWwpKSBVSUV2ZW50LmZpcmVFdmVudCgnY2hhbmdlJywgdGhpcy5lbGVtZW50LCAkZXZlbnQuZGV0YWlsKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1jcnVtYlwiPjxhIGhyZWY9XCJjcnVtYi5ocmVmIHx8ICdqYXZhc2NyaXB0OjsnXCIgY2xpY2sudHJpZ2dlcj1cImZpcmVDbGljaygkZXZlbnQpXCI+PHNsb3Q+PC9zbG90PjwvYT48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktY3J1bWInKVxuZXhwb3J0IGNsYXNzIFVJQ3J1bWIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG5cbiAgQGJpbmRhYmxlKCkgaWQgPSAnJztcbiAgQGJpbmRhYmxlKCkgaHJlZiA9ICdqYXZhc2NyaXB0OjsnO1xuXG4gIHByaXZhdGUgZmlyZUNsaWNrKCRldmVudCkge1xuICAgICRldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBVSUV2ZW50LmZpcmVFdmVudCgnY2xpY2snLCB0aGlzLmVsZW1lbnQsIHRoaXMuaWQpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1wYWdlclwiPlxuICA8YSBjbGFzcz1cInBnLWZpcnN0IFxcJHtwYWdlPT0wPydkaXNhYmxlZCc6Jyd9XCIgY2xpY2sudHJpZ2dlcj1cImZpcmVDaGFuZ2UocGFnZT0wKVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLVxcJHtzdHlsZX0tZG91YmxlLWxlZnRcIj48L3VpLWdseXBoPjwvYT5cbiAgPGEgY2xhc3M9XCJwZy1wcmV2IFxcJHtwYWdlPT0wPydkaXNhYmxlZCc6Jyd9XCIgY2xpY2sudHJpZ2dlcj1cImZpcmVDaGFuZ2UocGFnZT1wYWdlLTEpXCIgY2xpY2sudHJpZ2dlcj1cImZpcmVDaGFuZ2UocGFnZT10b3RhbFBhZ2VzKVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLVxcJHtzdHlsZX0tbGVmdFwiPjwvdWktZ2x5cGg+PC9hPlxuICA8c3BhbiBjbGFzcz1cInBnLWlucHV0XCI+XFwke3BhZ2UrMX0gb2YgXFwke3RvdGFsUGFnZXN9PC9zcGFuPlxuICA8YSBjbGFzcz1cInBnLW5leHQgXFwke3BhZ2UrMT49dG90YWxQYWdlcz8nZGlzYWJsZWQnOicnfVwiIGNsaWNrLnRyaWdnZXI9XCJmaXJlQ2hhbmdlKHBhZ2U9cGFnZSsxKVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLVxcJHtzdHlsZX0tcmlnaHRcIj48L3VpLWdseXBoPjwvYT5cbiAgPGEgY2xhc3M9XCJwZy1sYXN0IFxcJHtwYWdlKzE+PXRvdGFsUGFnZXM/J2Rpc2FibGVkJzonJ31cIiBjbGljay50cmlnZ2VyPVwiZmlyZUNoYW5nZShwYWdlPXRvdGFsUGFnZXMtMSlcIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1cXCR7c3R5bGV9LWRvdWJsZS1yaWdodFwiPjwvdWktZ2x5cGg+PC9hPlxuPC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXBhZ2VyJylcbmV4cG9ydCBjbGFzcyBVSVBhZ2VyIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuXG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICBpZiAodGhpcy5zdG9yZSlcbiAgICAgIHRoaXMudG90YWxQYWdlcyA9IHRoaXMuc3RvcmUudG90YWxQYWdlcztcbiAgfVxuXG4gIEBiaW5kYWJsZSh7IGRlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUudHdvV2F5IH0pIHBhZ2UgPSAwO1xuXG4gIEBiaW5kYWJsZSgpIHN0b3JlO1xuICBAYmluZGFibGUoKSBzdHlsZSA9IFwiY2hldnJvblwiO1xuICBAYmluZGFibGUoKSB0b3RhbFBhZ2VzID0gMTtcblxuICBmaXJlQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLnN0b3JlKSB0aGlzLnN0b3JlLmxvYWRQYWdlKHRoaXMucGFnZSk7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ2NoYW5nZScsIHRoaXMuZWxlbWVudCwgdGhpcy5wYWdlKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
