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
    var UIDrawer = (function () {
        function UIDrawer(element) {
            var _this = this;
            this.element = element;
            this.css = {
                show: 'ui-drawer-show',
                fluid: 'ui-drawer-fluid',
                large: 'ui-drawer-large'
            };
            this.width = '';
            this.bodyClass = '';
            this.contentClass = "";
            this.position = "start";
            this.closeGlyph = 'glyph-arrow-left';
            if (element.hasAttribute('fluid'))
                this.element.classList.add(this.css.fluid);
            if (element.hasAttribute('large'))
                this.element.classList.add(this.css.large);
            if (element.hasAttribute('close-on-click'))
                element.addEventListener('mouseup', function (e) { if (e.button == 0)
                    _this.closeDrawer(); });
        }
        UIDrawer.prototype.bind = function (bindingContext, overrideContext) {
            if (this.element.hasAttribute('scroll'))
                this.bodyClass += ' ui-scroll';
            if (this.element.hasAttribute('padded'))
                this.bodyClass += ' ui-pad-all';
            if (this.position == 'end' && this.closeGlyph === 'glyph-arrow-left')
                this.closeGlyph = 'glyph-arrow-right';
            if (this.width)
                this.contentEl['style'].flexBasis = this.width;
        };
        UIDrawer.prototype.closeDrawer = function () {
            if (ui_event_1.UIEvent.fireEvent('beforeclose', this.element) !== false) {
                this.element.classList.remove(this.css.show);
                ui_event_1.UIEvent.fireEvent('close', this.element);
            }
        };
        UIDrawer.prototype.openDrawer = function () {
            if (ui_event_1.UIEvent.fireEvent('beforeopen', this.element) !== false) {
                this.element.classList.add(this.css.show);
                ui_event_1.UIEvent.fireEvent('open', this.element);
            }
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "bodyClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "contentClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "position", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "closeGlyph", void 0);
        UIDrawer = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-drawer ui-drawer-${position}\">\n  <div ref=\"contentEl\" class=\"ui-drawer-content ui-row ui-row-v ui-align-stretch ui-nowrap ${contentClass}\">\n    <a class=\"ui-drawer-close\" click.trigger=\"closeDrawer()\"><ui-glyph glyph.bind=\"closeGlyph\"></ui-glyph></a>\n    <slot name=\"drawer-head\"></slot>\n    <div class=\"ui-drawer-body ${bodyClass}\"><slot></slot></div>\n    <slot name=\"drawer-foot\"></slot>\n  </div>\n  <div class=\"ui-drawer-shim\" click.trigger=\"closeDrawer()\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-drawer'),
            __metadata("design:paramtypes", [Element])
        ], UIDrawer);
        return UIDrawer;
    }());
    exports.UIDrawer = UIDrawer;
    var UIDrawerToggle = (function () {
        function UIDrawerToggle(element) {
            this.element = element;
            this.glyph = 'glyph-handle-menu';
        }
        UIDrawerToggle.prototype.openDrawer = function (evt) {
            if (!this.drawer)
                throw Error('Drawer element required');
            if (evt.button != 0)
                return true;
            evt.stopPropagation();
            evt.cancelBubble = true;
            if (this.drawer && this.drawer.au.controller) {
                this.drawer.au.controller.viewModel.openDrawer();
            }
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawerToggle.prototype, "drawer", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawerToggle.prototype, "glyph", void 0);
        UIDrawerToggle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-drawer-toggle" click.trigger="openDrawer($event)"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>'),
            aurelia_framework_1.customElement('ui-drawer-toggle'),
            __metadata("design:paramtypes", [Element])
        ], UIDrawerToggle);
        return UIDrawerToggle;
    }());
    exports.UIDrawerToggle = UIDrawerToggle;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktZHJhd2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQW1CQTtRQU9FLGtCQUFtQixPQUFnQjtZQUFuQyxpQkFJQztZQUprQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBTm5DLFFBQUcsR0FBRztnQkFDSixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixLQUFLLEVBQUUsaUJBQWlCO2FBQ3pCLENBQUM7WUFrQlUsVUFBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLGNBQVMsR0FBRyxFQUFFLENBQUM7WUFDZixpQkFBWSxHQUFHLEVBQUUsQ0FBQztZQUNsQixhQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ25CLGVBQVUsR0FBRyxrQkFBa0IsQ0FBQztZQW5CMUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBTSxJQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO29CQUFDLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFJLENBQUM7UUFDRCx1QkFBSSxHQUFKLFVBQUss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U0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25ELENBQUM7UUFDSCxDQUFDO1FBWFc7WUFBWCw0QkFBUSxFQUFFOztzREFBUTtRQUNQO1lBQVgsNEJBQVEsRUFBRTs7cURBQTZCO1FBSjdCLGNBQWM7WUFIMUIsOEJBQVUsRUFBRTtZQUNaLDhCQUFVLENBQUMsd0lBQXdJLENBQUM7WUFDcEosaUNBQWEsQ0FBQyxrQkFBa0IsQ0FBQzs2Q0FFSixPQUFPO1dBRHhCLGNBQWMsQ0FlMUI7UUFBRCxxQkFBQztLQWZELEFBZUMsSUFBQTtJQWZZLHdDQUFjIiwiZmlsZSI6ImVsZW1lbnRzL2NvbXBvbmVudHMvdWktZHJhd2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGlubGluZVZpZXcgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvdWktZXZlbnQnO1xuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktZHJhd2VyIHVpLWRyYXdlci1cXCR7cG9zaXRpb259XCI+XG4gIDxkaXYgcmVmPVwiY29udGVudEVsXCIgY2xhc3M9XCJ1aS1kcmF3ZXItY29udGVudCB1aS1yb3cgdWktcm93LXYgdWktYWxpZ24tc3RyZXRjaCB1aS1ub3dyYXAgXFwke2NvbnRlbnRDbGFzc31cIj5cbiAgICA8YSBjbGFzcz1cInVpLWRyYXdlci1jbG9zZVwiIGNsaWNrLnRyaWdnZXI9XCJjbG9zZURyYXdlcigpXCI+PHVpLWdseXBoIGdseXBoLmJpbmQ9XCJjbG9zZUdseXBoXCI+PC91aS1nbHlwaD48L2E+XG4gICAgPHNsb3QgbmFtZT1cImRyYXdlci1oZWFkXCI+PC9zbG90PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1kcmF3ZXItYm9keSBcXCR7Ym9keUNsYXNzfVwiPjxzbG90Pjwvc2xvdD48L2Rpdj5cbiAgICA8c2xvdCBuYW1lPVwiZHJhd2VyLWZvb3RcIj48L3Nsb3Q+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktZHJhd2VyLXNoaW1cIiBjbGljay50cmlnZ2VyPVwiY2xvc2VEcmF3ZXIoKVwiPjwvZGl2PlxuPC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWRyYXdlcicpXG5leHBvcnQgY2xhc3MgVUlEcmF3ZXIge1xuICBjc3MgPSB7XG4gICAgc2hvdzogJ3VpLWRyYXdlci1zaG93JyxcbiAgICBmbHVpZDogJ3VpLWRyYXdlci1mbHVpZCcsXG4gICAgbGFyZ2U6ICd1aS1kcmF3ZXItbGFyZ2UnXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2ZsdWlkJykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY3NzLmZsdWlkKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2xhcmdlJykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY3NzLmxhcmdlKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Nsb3NlLW9uLWNsaWNrJykpIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlOiBhbnkpID0+IHsgaWYgKGUuYnV0dG9uID09IDApIHRoaXMuY2xvc2VEcmF3ZXIoKTsgfSk7XG4gIH1cbiAgYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdzY3JvbGwnKSkgdGhpcy5ib2R5Q2xhc3MgKz0gJyB1aS1zY3JvbGwnO1xuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdwYWRkZWQnKSkgdGhpcy5ib2R5Q2xhc3MgKz0gJyB1aS1wYWQtYWxsJztcblxuICAgIGlmICh0aGlzLnBvc2l0aW9uID09ICdlbmQnICYmIHRoaXMuY2xvc2VHbHlwaCA9PT0gJ2dseXBoLWFycm93LWxlZnQnKSB0aGlzLmNsb3NlR2x5cGggPSAnZ2x5cGgtYXJyb3ctcmlnaHQnO1xuXG4gICAgaWYgKHRoaXMud2lkdGgpIHRoaXMuY29udGVudEVsWydzdHlsZSddLmZsZXhCYXNpcyA9IHRoaXMud2lkdGg7XG4gIH1cblxuICBwcml2YXRlIGNvbnRlbnRFbDtcblxuICBAYmluZGFibGUoKSB3aWR0aCA9ICcnO1xuICBAYmluZGFibGUoKSBib2R5Q2xhc3MgPSAnJztcbiAgQGJpbmRhYmxlKCkgY29udGVudENsYXNzID0gXCJcIjtcbiAgQGJpbmRhYmxlKCkgcG9zaXRpb24gPSBcInN0YXJ0XCI7XG4gIEBiaW5kYWJsZSgpIGNsb3NlR2x5cGggPSAnZ2x5cGgtYXJyb3ctbGVmdCc7XG5cbiAgY2xvc2VEcmF3ZXIoKSB7XG4gICAgaWYgKFVJRXZlbnQuZmlyZUV2ZW50KCdiZWZvcmVjbG9zZScsIHRoaXMuZWxlbWVudCkgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNzcy5zaG93KTtcbiAgICAgIFVJRXZlbnQuZmlyZUV2ZW50KCdjbG9zZScsIHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICB9XG4gIG9wZW5EcmF3ZXIoKSB7XG4gICAgaWYgKFVJRXZlbnQuZmlyZUV2ZW50KCdiZWZvcmVvcGVuJywgdGhpcy5lbGVtZW50KSAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY3NzLnNob3cpO1xuICAgICAgVUlFdmVudC5maXJlRXZlbnQoJ29wZW4nLCB0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldygnPHRlbXBsYXRlIGNsYXNzPVwidWktZHJhd2VyLXRvZ2dsZVwiIGNsaWNrLnRyaWdnZXI9XCJvcGVuRHJhd2VyKCRldmVudClcIj48c2xvdD48dWktZ2x5cGggZ2x5cGguYmluZD1cImdseXBoXCI+PC91aS1nbHlwaD48L3Nsb3Q+PC90ZW1wbGF0ZT4nKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWRyYXdlci10b2dnbGUnKVxuZXhwb3J0IGNsYXNzIFVJRHJhd2VyVG9nZ2xlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuXG4gIEBiaW5kYWJsZSgpIGRyYXdlcjtcbiAgQGJpbmRhYmxlKCkgZ2x5cGggPSAnZ2x5cGgtaGFuZGxlLW1lbnUnO1xuXG4gIG9wZW5EcmF3ZXIoZXZ0KSB7XG4gICAgaWYgKCF0aGlzLmRyYXdlcikgdGhyb3cgRXJyb3IoJ0RyYXdlciBlbGVtZW50IHJlcXVpcmVkJyk7XG4gICAgaWYgKGV2dC5idXR0b24gIT0gMCkgcmV0dXJuIHRydWU7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2dC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIGlmICh0aGlzLmRyYXdlciAmJiB0aGlzLmRyYXdlci5hdS5jb250cm9sbGVyKSB7XG4gICAgICB0aGlzLmRyYXdlci5hdS5jb250cm9sbGVyLnZpZXdNb2RlbC5vcGVuRHJhd2VyKCk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9
