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
    var UISidebar = (function () {
        function UISidebar(element) {
            var _this = this;
            this.element = element;
            this.label = "";
            this.bodyClass = "";
            this.width = "";
            this.collapsed = false;
            this.position = "start";
            this.glyph = 'glyph-arrow-left';
            this.compact = false;
            this.miniDisplay = false;
            this.collapsible = false;
            if (this.miniDisplay = element.hasAttribute('mini-display'))
                element.classList.add('ui-sidebar-mini');
            if (this.compact = element.hasAttribute('compact')) {
                element.classList.add('ui-sidebar-compact');
                element.classList.add('ui-sidebar-mini');
            }
            this.collapsible = element.hasAttribute('collapsible');
            this.obClick = ui_event_1.UIEvent.subscribe('mouseclick', function () {
                _this.element.classList.remove('ui-sidebar-show');
            });
        }
        UISidebar.prototype.bind = function (bindingContext, overrideContext) {
            this.collapsed = !!(this.collapsed);
            if (this.position === 'end' && this.glyph === 'glyph-arrow-left')
                this.glyph = "glyph-arrow-right";
            if (this.element.hasAttribute('scroll'))
                this.bodyClass += ' ui-scroll';
            if (this.element.hasAttribute('flex'))
                this.bodyClass += ' ui-row ui-row-v ui-align-stretch ui-nowrap';
            if (this.element.hasAttribute('padded'))
                this.bodyClass += ' ui-pad-all';
            if (this.width)
                this.element['style'].flexBasis = this.width;
        };
        UISidebar.prototype.attached = function () {
            if (this.label instanceof HTMLElement)
                [this.labelEl.innerHTML = '', this.labelEl.appendChild(this.label)];
        };
        UISidebar.prototype.detached = function () {
            if (this.obClick)
                this.obClick.dispose();
        };
        UISidebar.prototype.collapsedChanged = function (newValue) {
            this.glyph = (this.position == 'end' && !(newValue)) || (this.position == 'start' && !!(newValue)) ? "glyph-arrow-right" : "glyph-arrow-left";
        };
        UISidebar.prototype.toggleCollapse = function ($event) {
            this.collapsed = !this.collapsed;
            this.element.classList.remove('ui-sidebar-show');
            $event.cancelBubble = true;
            return true;
        };
        UISidebar.prototype.showOverlay = function ($event) {
            if (this.miniDisplay || $event.target != this.element)
                return true;
            if (this.collapsed)
                this.element.classList.add('ui-sidebar-show');
            else
                this.element.classList.remove('ui-sidebar-show');
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "bodyClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "collapsed", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "position", void 0);
        UISidebar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-sidebar ui-row ui-row-v ui-row-nowrap ui-align-stretch ${compact || collapsed?'ui-sidebar-collapse':''} ui-sidebar-${position}\" click.trigger=\"showOverlay($event)\">\n  <div class=\"ui-sidebar-head ui-row ui-row-h ui-row-nowrap ui-align-stretch\" if.bind=\"!compact && (collapsible || label)\">\n  <div class=\"ui-sidebar-title ui-column-fill\" ref=\"labelEl\">${label}</div>\n  <a click.trigger=\"toggleCollapse($event)\" class=\"ui-sidebar-close\" if.bind=\"collapsible\"><ui-glyph glyph.bind=\"glyph\"></ui-glyph></a></div>\n  <div class=\"ui-sidebar-content ui-column-fill ${bodyClass}\" ref=\"contentEl\"><slot></slot></div>\n</template>"),
            aurelia_framework_1.customElement('ui-sidebar'),
            __metadata("design:paramtypes", [Element])
        ], UISidebar);
        return UISidebar;
    }());
    exports.UISidebar = UISidebar;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktc2lkZWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFnQkE7UUFDRSxtQkFBbUIsT0FBZ0I7WUFBbkMsaUJBWUM7WUFaa0IsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQW1DdkIsVUFBSyxHQUFRLEVBQUUsQ0FBQztZQUNoQixjQUFTLEdBQVEsRUFBRSxDQUFDO1lBQ3BCLFVBQUssR0FBUSxFQUFFLENBQUM7WUFDaEIsY0FBUyxHQUFHLEtBQUssQ0FBQztZQUNsQixhQUFRLEdBQUcsT0FBTyxDQUFDO1lBRS9CLFVBQUssR0FBRyxrQkFBa0IsQ0FBQztZQUluQixZQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1lBOUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN0RyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7WUFHdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUU7Z0JBQzdDLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFB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Z0RBQWlCO1FBQ2hCO1lBQVgsNEJBQVEsRUFBRTs7b0RBQXFCO1FBQ3BCO1lBQVgsNEJBQVEsRUFBRTs7Z0RBQWlCO1FBQ2hCO1lBQVgsNEJBQVEsRUFBRTs7b0RBQW1CO1FBQ2xCO1lBQVgsNEJBQVEsRUFBRTs7bURBQW9CO1FBeENwQixTQUFTO1lBUnJCLDhCQUFVLEVBQUU7WUFDWiw4QkFBVSxDQUFDLDJwQkFLQSxDQUFDO1lBQ1osaUNBQWEsQ0FBQyxZQUFZLENBQUM7NkNBRUUsT0FBTztXQUR4QixTQUFTLENBb0VyQjtRQUFELGdCQUFDO0tBcEVELEFBb0VDLElBQUE7SUFwRVksOEJBQVMiLCJmaWxlIjoiZWxlbWVudHMvY29tcG9uZW50cy91aS1zaWRlYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGlubGluZVZpZXcgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLWV2ZW50XCI7XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1zaWRlYmFyIHVpLXJvdyB1aS1yb3ctdiB1aS1yb3ctbm93cmFwIHVpLWFsaWduLXN0cmV0Y2ggXFwke2NvbXBhY3QgfHwgY29sbGFwc2VkPyd1aS1zaWRlYmFyLWNvbGxhcHNlJzonJ30gdWktc2lkZWJhci1cXCR7cG9zaXRpb259XCIgY2xpY2sudHJpZ2dlcj1cInNob3dPdmVybGF5KCRldmVudClcIj5cbiAgPGRpdiBjbGFzcz1cInVpLXNpZGViYXItaGVhZCB1aS1yb3cgdWktcm93LWggdWktcm93LW5vd3JhcCB1aS1hbGlnbi1zdHJldGNoXCIgaWYuYmluZD1cIiFjb21wYWN0ICYmIChjb2xsYXBzaWJsZSB8fCBsYWJlbClcIj5cbiAgPGRpdiBjbGFzcz1cInVpLXNpZGViYXItdGl0bGUgdWktY29sdW1uLWZpbGxcIiByZWY9XCJsYWJlbEVsXCI+XFwke2xhYmVsfTwvZGl2PlxuICA8YSBjbGljay50cmlnZ2VyPVwidG9nZ2xlQ29sbGFwc2UoJGV2ZW50KVwiIGNsYXNzPVwidWktc2lkZWJhci1jbG9zZVwiIGlmLmJpbmQ9XCJjb2xsYXBzaWJsZVwiPjx1aS1nbHlwaCBnbHlwaC5iaW5kPVwiZ2x5cGhcIj48L3VpLWdseXBoPjwvYT48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLXNpZGViYXItY29udGVudCB1aS1jb2x1bW4tZmlsbCBcXCR7Ym9keUNsYXNzfVwiIHJlZj1cImNvbnRlbnRFbFwiPjxzbG90Pjwvc2xvdD48L2Rpdj5cbjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1zaWRlYmFyJylcbmV4cG9ydCBjbGFzcyBVSVNpZGViYXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmICh0aGlzLm1pbmlEaXNwbGF5ID0gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ21pbmktZGlzcGxheScpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXNpZGViYXItbWluaScpO1xuICAgIGlmICh0aGlzLmNvbXBhY3QgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY29tcGFjdCcpKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXNpZGViYXItY29tcGFjdCcpO1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zaWRlYmFyLW1pbmknKTtcbiAgICB9XG4gICAgdGhpcy5jb2xsYXBzaWJsZSA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb2xsYXBzaWJsZScpO1xuXG5cbiAgICB0aGlzLm9iQ2xpY2sgPSBVSUV2ZW50LnN1YnNjcmliZSgnbW91c2VjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1zaWRlYmFyLXNob3cnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSAhISh0aGlzLmNvbGxhcHNlZCk7XG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICdlbmQnICYmIHRoaXMuZ2x5cGggPT09ICdnbHlwaC1hcnJvdy1sZWZ0JykgdGhpcy5nbHlwaCA9IFwiZ2x5cGgtYXJyb3ctcmlnaHRcIjtcblxuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdzY3JvbGwnKSkgdGhpcy5ib2R5Q2xhc3MgKz0gJyB1aS1zY3JvbGwnO1xuICAgIGlmICh0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdmbGV4JykpIHRoaXMuYm9keUNsYXNzICs9ICcgdWktcm93IHVpLXJvdy12IHVpLWFsaWduLXN0cmV0Y2ggdWktbm93cmFwJztcbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgncGFkZGVkJykpIHRoaXMuYm9keUNsYXNzICs9ICcgdWktcGFkLWFsbCc7XG5cbiAgICBpZiAodGhpcy53aWR0aCkgdGhpcy5lbGVtZW50WydzdHlsZSddLmZsZXhCYXNpcyA9IHRoaXMud2lkdGg7XG4gIH1cbiAgYXR0YWNoZWQoKSB7XG4gICAgaWYgKHRoaXMubGFiZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClbdGhpcy5sYWJlbEVsLmlubmVySFRNTCA9ICcnLCB0aGlzLmxhYmVsRWwuYXBwZW5kQ2hpbGQodGhpcy5sYWJlbCldO1xuICB9XG4gIGRldGFjaGVkKCkge1xuICAgIGlmICh0aGlzLm9iQ2xpY2spIHRoaXMub2JDbGljay5kaXNwb3NlKCk7XG4gIH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKCkgbGFiZWw6IGFueSA9IFwiXCI7XG4gIEBiaW5kYWJsZSgpIGJvZHlDbGFzczogYW55ID0gXCJcIjtcbiAgQGJpbmRhYmxlKCkgd2lkdGg6IGFueSA9IFwiXCI7XG4gIEBiaW5kYWJsZSgpIGNvbGxhcHNlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBwb3NpdGlvbiA9IFwic3RhcnRcIjtcblxuICBnbHlwaCA9ICdnbHlwaC1hcnJvdy1sZWZ0JztcbiAgcHJpdmF0ZSBsYWJlbEVsO1xuICBwcml2YXRlIGNvbnRlbnRFbDtcbiAgcHJpdmF0ZSBvYkNsaWNrO1xuICBwcml2YXRlIGNvbXBhY3QgPSBmYWxzZTtcbiAgcHJpdmF0ZSBtaW5pRGlzcGxheSA9IGZhbHNlO1xuICBwcml2YXRlIGNvbGxhcHNpYmxlID0gZmFsc2U7XG5cbiAgY29sbGFwc2VkQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMuZ2x5cGggPSAodGhpcy5wb3NpdGlvbiA9PSAnZW5kJyAmJiAhKG5ld1ZhbHVlKSkgfHwgKHRoaXMucG9zaXRpb24gPT0gJ3N0YXJ0JyAmJiAhIShuZXdWYWx1ZSkpID8gXCJnbHlwaC1hcnJvdy1yaWdodFwiIDogXCJnbHlwaC1hcnJvdy1sZWZ0XCI7XG4gIH1cblxuICB0b2dnbGVDb2xsYXBzZSgkZXZlbnQpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZDtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndWktc2lkZWJhci1zaG93Jyk7XG4gICAgJGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzaG93T3ZlcmxheSgkZXZlbnQpIHtcbiAgICBpZiAodGhpcy5taW5pRGlzcGxheSB8fCAkZXZlbnQudGFyZ2V0ICE9IHRoaXMuZWxlbWVudCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHRoaXMuY29sbGFwc2VkKVxuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXNpZGViYXItc2hvdycpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1zaWRlYmFyLXNob3cnKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
