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
            this.position = "start";
            this.closeGlyph = 'glyph-arrow-left';
            this.bodyCls = '';
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
                this.bodyCls += ' ui-scroll';
            if (this.element.hasAttribute('padded'))
                this.bodyCls += ' ui-pad-all';
            if (this.position == 'end' && this.closeGlyph === 'glyph-arrow-left')
                this.closeGlyph = 'glyph-arrow-right';
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
        ], UIDrawer.prototype, "position", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "closeGlyph", void 0);
        UIDrawer = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-drawer ui-drawer-${position}\">\n  <div class=\"ui-drawer-content ui-row ui-row-v ui-align-stretch ui-nowrap\">\n    <a class=\"ui-drawer-close\" click.trigger=\"closeDrawer()\"><ui-glyph glyph.bind=\"closeGlyph\"></ui-glyph></a>\n    <div class=\"ui-drawer-body ${bodyCls}\"><slot></slot></div>\n  </div>\n  <div class=\"ui-drawer-shim\" click.trigger=\"closeDrawer()\"></div>\n</template>"),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktZHJhd2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQWlCQTtRQU9FLGtCQUFtQixPQUFnQjtZQUFuQyxpQkFJQztZQUprQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBTm5DLFFBQUcsR0FBRztnQkFDSixJQUFJLEVBQUUsZ0JBQWdCO2dCQUN0QixLQUFLLEVBQUUsaUJBQWlCO2dCQUN4QixLQUFLLEVBQUUsaUJBQWlCO2FBQ3pCLENBQUM7WUFjVSxhQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ25CLGVBQVUsR0FBRyxrQkFBa0IsQ0FBQztZQUVwQyxZQUFPLEdBQUcsRUFBRSxDQUFDO1lBZG5CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLENBQU0sSUFBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztvQkFBQyxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxSSxDQUFDO1FBQ0QsdUJBQUksR0FBSixVQUFLLGNBQXNCLEVBQUUsZUFBdUI7WUFDbEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8s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ImZpbGUiOiJlbGVtZW50cy9jb21wb25lbnRzL3VpLWRyYXdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE3XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcbmltcG9ydCB7IGF1dG9pbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlLCBpbmxpbmVWaWV3IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3VpLWV2ZW50JztcblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLWRyYXdlciB1aS1kcmF3ZXItXFwke3Bvc2l0aW9ufVwiPlxuICA8ZGl2IGNsYXNzPVwidWktZHJhd2VyLWNvbnRlbnQgdWktcm93IHVpLXJvdy12IHVpLWFsaWduLXN0cmV0Y2ggdWktbm93cmFwXCI+XG4gICAgPGEgY2xhc3M9XCJ1aS1kcmF3ZXItY2xvc2VcIiBjbGljay50cmlnZ2VyPVwiY2xvc2VEcmF3ZXIoKVwiPjx1aS1nbHlwaCBnbHlwaC5iaW5kPVwiY2xvc2VHbHlwaFwiPjwvdWktZ2x5cGg+PC9hPlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1kcmF3ZXItYm9keSBcXCR7Ym9keUNsc31cIj48c2xvdD48L3Nsb3Q+PC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktZHJhd2VyLXNoaW1cIiBjbGljay50cmlnZ2VyPVwiY2xvc2VEcmF3ZXIoKVwiPjwvZGl2PlxuPC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWRyYXdlcicpXG5leHBvcnQgY2xhc3MgVUlEcmF3ZXIge1xuICBjc3MgPSB7XG4gICAgc2hvdzogJ3VpLWRyYXdlci1zaG93JyxcbiAgICBmbHVpZDogJ3VpLWRyYXdlci1mbHVpZCcsXG4gICAgbGFyZ2U6ICd1aS1kcmF3ZXItbGFyZ2UnXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2ZsdWlkJykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY3NzLmZsdWlkKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2xhcmdlJykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY3NzLmxhcmdlKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Nsb3NlLW9uLWNsaWNrJykpIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlOiBhbnkpID0+IHsgaWYgKGUuYnV0dG9uID09IDApIHRoaXMuY2xvc2VEcmF3ZXIoKTsgfSk7XG4gIH1cbiAgYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdzY3JvbGwnKSkgdGhpcy5ib2R5Q2xzICs9ICcgdWktc2Nyb2xsJztcbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgncGFkZGVkJykpIHRoaXMuYm9keUNscyArPSAnIHVpLXBhZC1hbGwnO1xuXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT0gJ2VuZCcgJiYgdGhpcy5jbG9zZUdseXBoID09PSAnZ2x5cGgtYXJyb3ctbGVmdCcpIHRoaXMuY2xvc2VHbHlwaCA9ICdnbHlwaC1hcnJvdy1yaWdodCc7XG4gIH1cblxuICBAYmluZGFibGUoKSBwb3NpdGlvbiA9IFwic3RhcnRcIjtcbiAgQGJpbmRhYmxlKCkgY2xvc2VHbHlwaCA9ICdnbHlwaC1hcnJvdy1sZWZ0JztcblxuICBwcml2YXRlIGJvZHlDbHMgPSAnJztcbiAgY2xvc2VEcmF3ZXIoKSB7XG4gICAgaWYgKFVJRXZlbnQuZmlyZUV2ZW50KCdiZWZvcmVjbG9zZScsIHRoaXMuZWxlbWVudCkgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNzcy5zaG93KTtcbiAgICAgIFVJRXZlbnQuZmlyZUV2ZW50KCdjbG9zZScsIHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICB9XG4gIG9wZW5EcmF3ZXIoKSB7XG4gICAgaWYgKFVJRXZlbnQuZmlyZUV2ZW50KCdiZWZvcmVvcGVuJywgdGhpcy5lbGVtZW50KSAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY3NzLnNob3cpO1xuICAgICAgVUlFdmVudC5maXJlRXZlbnQoJ29wZW4nLCB0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldygnPHRlbXBsYXRlIGNsYXNzPVwidWktZHJhd2VyLXRvZ2dsZVwiIGNsaWNrLnRyaWdnZXI9XCJvcGVuRHJhd2VyKCRldmVudClcIj48c2xvdD48dWktZ2x5cGggZ2x5cGguYmluZD1cImdseXBoXCI+PC91aS1nbHlwaD48L3Nsb3Q+PC90ZW1wbGF0ZT4nKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWRyYXdlci10b2dnbGUnKVxuZXhwb3J0IGNsYXNzIFVJRHJhd2VyVG9nZ2xlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuXG4gIEBiaW5kYWJsZSgpIGRyYXdlcjtcbiAgQGJpbmRhYmxlKCkgZ2x5cGggPSAnZ2x5cGgtaGFuZGxlLW1lbnUnO1xuXG4gIG9wZW5EcmF3ZXIoZXZ0KSB7XG4gICAgaWYgKCF0aGlzLmRyYXdlcikgdGhyb3cgRXJyb3IoJ0RyYXdlciBlbGVtZW50IHJlcXVpcmVkJyk7XG4gICAgaWYgKGV2dC5idXR0b24gIT0gMCkgcmV0dXJuIHRydWU7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2dC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIGlmICh0aGlzLmRyYXdlciAmJiB0aGlzLmRyYXdlci5hdS5jb250cm9sbGVyKSB7XG4gICAgICB0aGlzLmRyYXdlci5hdS5jb250cm9sbGVyLnZpZXdNb2RlbC5vcGVuRHJhd2VyKCk7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9
