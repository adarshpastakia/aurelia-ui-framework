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
    var UIRibbon = (function () {
        function UIRibbon(element) {
            this.element = element;
            this.message = '';
            this.theme = 'dark';
            this.ribbon = document.createElement('div');
            this.ribbon.classList.add('ui-ribbon');
            element.appendChild(this.ribbon);
            element['style'].overflow = 'hidden';
        }
        UIRibbon.prototype.bind = function (bindingContext, overrideContext) {
            if (isEmpty(this.message))
                this.ribbon.classList.add('ui-hidden');
            this.ribbon.innerHTML = this.message;
            this.ribbon.className = 'ui-ribbon ui-' + this.theme;
        };
        UIRibbon.prototype.themeChanged = function (newValue) {
            this.ribbon.className = 'ui-ribbon ' + newValue;
        };
        UIRibbon.prototype.messageChanged = function (newValue) {
            if (isEmpty(newValue))
                return this.ribbon.classList.add('ui-hidden');
            this.ribbon.classList.remove('ui-hidden');
            this.ribbon.innerHTML = newValue;
        };
        __decorate([
            aurelia_framework_1.bindable({ primaryProperty: true }),
            __metadata("design:type", Object)
        ], UIRibbon.prototype, "message", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRibbon.prototype, "theme", void 0);
        UIRibbon = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('ribbon'),
            __metadata("design:paramtypes", [Element])
        ], UIRibbon);
        return UIRibbon;
    }());
    exports.UIRibbon = UIRibbon;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0dHJpYnV0ZXMvdWktcmliYm9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVlBO1FBR0Usa0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUFvQkUsWUFBTyxHQUFHLEVBQUUsQ0FBQztZQUN0QyxVQUFLLEdBQUcsTUFBTSxDQUFDO1lBcEJ6QixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3ZDLENBQUM7UUFJRCx1QkFBSSxHQUFKLFVBQUssY0FBc0IsRUFBRSxlQUF1QjtZQUNsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZELENBQUM7UUFTRCwrQkFBWSxHQUFaLFVBQWEsUUFBUTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFZLEdBQUcsUUFBUSxDQUFDO1FBQ2xELENBQUM7UUFDRCxpQ0FBYyxHQUFkLFVBQWUsUUFBUTtZQUNyQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQ25DLENBQUM7UUFWb0M7WUFBcEMsNEJBQVEsQ0FBQyxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7aURBQWM7UUFDdEM7WUFBWCw0QkFBUSxFQUFFOzsrQ0FBZ0I7UUF4QmhCLFFBQVE7WUFGcEIsOEJBQVUsRUFBRTtZQUNaLG1DQUFlLENBQUMsUUFBUSxDQUFDOzZDQUlJLE9BQU87V0FIeEIsUUFBUSxDQWtDcEI7UUFBRCxlQUFDO0tBbENELEFBa0NDLElBQUE7SUFsQ1ksNEJBQVEiLCJmaWxlIjoiYXR0cmlidXRlcy91aS1yaWJib24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5cbmltcG9ydCB7IGF1dG9pbmplY3QsIGN1c3RvbUF0dHJpYnV0ZSwgYmluZGFibGUgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSBcIi4uL3V0aWxzL3VpLWV2ZW50XCI7XG5pbXBvcnQgeyBVSVV0aWxzIH0gZnJvbSBcIi4uL3V0aWxzL3VpLXV0aWxzXCI7XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3JpYmJvbicpXG5leHBvcnQgY2xhc3MgVUlSaWJib24ge1xuXG4gIHJpYmJvbjtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICB0aGlzLnJpYmJvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmliYm9uLmNsYXNzTGlzdC5hZGQoJ3VpLXJpYmJvbicpO1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5yaWJib24pO1xuXG4gICAgZWxlbWVudFsnc3R5bGUnXS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICBpZiAoaXNFbXB0eSh0aGlzLm1lc3NhZ2UpKSB0aGlzLnJpYmJvbi5jbGFzc0xpc3QuYWRkKCd1aS1oaWRkZW4nKTtcbiAgICB0aGlzLnJpYmJvbi5pbm5lckhUTUwgPSB0aGlzLm1lc3NhZ2U7XG4gICAgdGhpcy5yaWJib24uY2xhc3NOYW1lID0gJ3VpLXJpYmJvbiB1aS0nICsgdGhpcy50aGVtZTtcbiAgfVxuICAvLyBhdHRhY2hlZCgpIHsgfVxuICAvLyBkZXRhY2hlZCgpIHsgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcbiAgLy9cbiAgQGJpbmRhYmxlKHsgcHJpbWFyeVByb3BlcnR5OiB0cnVlIH0pIG1lc3NhZ2UgPSAnJztcbiAgQGJpbmRhYmxlKCkgdGhlbWUgPSAnZGFyayc7XG5cbiAgdGhlbWVDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5yaWJib24uY2xhc3NOYW1lID0gJ3VpLXJpYmJvbiAnICsgbmV3VmFsdWU7XG4gIH1cbiAgbWVzc2FnZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICBpZiAoaXNFbXB0eShuZXdWYWx1ZSkpIHJldHVybiB0aGlzLnJpYmJvbi5jbGFzc0xpc3QuYWRkKCd1aS1oaWRkZW4nKTtcbiAgICB0aGlzLnJpYmJvbi5jbGFzc0xpc3QucmVtb3ZlKCd1aS1oaWRkZW4nKTtcbiAgICB0aGlzLnJpYmJvbi5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
