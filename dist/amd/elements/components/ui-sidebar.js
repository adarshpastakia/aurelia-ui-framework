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
            this.collapsed = false;
            this.position = "start";
            this.glyph = 'glyph-arrow-left';
            this.contentCls = '';
            this.compact = false;
            this.miniDisplay = false;
            this.collapsible = false;
            if (element.hasAttribute('scroll'))
                this.contentCls += ' ui-scroll';
            if (element.hasAttribute('flex'))
                this.contentCls += ' ui-row ui-row-v ui-align-stretch ui-nowrap';
            if (element.hasAttribute('padded'))
                this.contentCls += ' ui-pad-all';
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
        ], UISidebar.prototype, "collapsed", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "position", void 0);
        UISidebar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-sidebar ui-row ui-row-v ui-row-nowrap ui-align-stretch ${compact || collapsed?'ui-sidebar-collapse':''} ui-sidebar-${position}\" click.trigger=\"showOverlay($event)\">\n  <div class=\"ui-sidebar-head ui-row ui-row-h ui-row-nowrap ui-align-stretch\" if.bind=\"!compact && (collapsible || label)\">\n  <div class=\"ui-sidebar-title ui-column-fill\" ref=\"labelEl\">${label}</div>\n  <a click.trigger=\"toggleCollapse($event)\" class=\"ui-sidebar-close\" if.bind=\"collapsible\"><ui-glyph glyph.bind=\"glyph\"></ui-glyph></a></div>\n  <slot name=\"affix-content\"></slot>\n  <div class=\"ui-sidebar-content ui-column-fill ${contentCls}\" ref=\"contentEl\"><slot></slot></div>\n</template>"),
            aurelia_framework_1.customElement('ui-sidebar'),
            __metadata("design:paramtypes", [Element])
        ], UISidebar);
        return UISidebar;
    }());
    exports.UISidebar = UISidebar;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktc2lkZWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFpQkE7UUFDRSxtQkFBbUIsT0FBZ0I7WUFBbkMsaUJBZ0JDO1lBaEJrQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBaUN2QixVQUFLLEdBQVEsRUFBRSxDQUFDO1lBQ2hCLGNBQVMsR0FBRyxLQUFLLENBQUM7WUFDbEIsYUFBUSxHQUFHLE9BQU8sQ0FBQztZQUUvQixVQUFLLEdBQUcsa0JBQWtCLENBQUM7WUFDM0IsZUFBVSxHQUFHLEVBQUUsQ0FBQztZQUlSLFlBQU8sR0FBRyxLQUFLLENBQUM7WUFDaEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUEzQzFCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxZQUFZLENBQUM7WUFDcEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsVUFBVSxJQUFJLDZDQUE2QyxDQUFDO1lBQ25HLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxhQUFhLENBQUM7WUFFckUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENB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U0FBUyxDQWlFckI7UUFBRCxnQkFBQztLQWpFRCxBQWlFQyxJQUFBO0lBakVZLDhCQUFTIiwiZmlsZSI6ImVsZW1lbnRzL2NvbXBvbmVudHMvdWktc2lkZWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE3XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcbmltcG9ydCB7IGF1dG9pbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlLCBpbmxpbmVWaWV3IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gXCIuLi8uLi91dGlscy91aS1ldmVudFwiO1xuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktc2lkZWJhciB1aS1yb3cgdWktcm93LXYgdWktcm93LW5vd3JhcCB1aS1hbGlnbi1zdHJldGNoIFxcJHtjb21wYWN0IHx8IGNvbGxhcHNlZD8ndWktc2lkZWJhci1jb2xsYXBzZSc6Jyd9IHVpLXNpZGViYXItXFwke3Bvc2l0aW9ufVwiIGNsaWNrLnRyaWdnZXI9XCJzaG93T3ZlcmxheSgkZXZlbnQpXCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1zaWRlYmFyLWhlYWQgdWktcm93IHVpLXJvdy1oIHVpLXJvdy1ub3dyYXAgdWktYWxpZ24tc3RyZXRjaFwiIGlmLmJpbmQ9XCIhY29tcGFjdCAmJiAoY29sbGFwc2libGUgfHwgbGFiZWwpXCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1zaWRlYmFyLXRpdGxlIHVpLWNvbHVtbi1maWxsXCIgcmVmPVwibGFiZWxFbFwiPlxcJHtsYWJlbH08L2Rpdj5cbiAgPGEgY2xpY2sudHJpZ2dlcj1cInRvZ2dsZUNvbGxhcHNlKCRldmVudClcIiBjbGFzcz1cInVpLXNpZGViYXItY2xvc2VcIiBpZi5iaW5kPVwiY29sbGFwc2libGVcIj48dWktZ2x5cGggZ2x5cGguYmluZD1cImdseXBoXCI+PC91aS1nbHlwaD48L2E+PC9kaXY+XG4gIDxzbG90IG5hbWU9XCJhZmZpeC1jb250ZW50XCI+PC9zbG90PlxuICA8ZGl2IGNsYXNzPVwidWktc2lkZWJhci1jb250ZW50IHVpLWNvbHVtbi1maWxsIFxcJHtjb250ZW50Q2xzfVwiIHJlZj1cImNvbnRlbnRFbFwiPjxzbG90Pjwvc2xvdD48L2Rpdj5cbjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1zaWRlYmFyJylcbmV4cG9ydCBjbGFzcyBVSVNpZGViYXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnc2Nyb2xsJykpIHRoaXMuY29udGVudENscyArPSAnIHVpLXNjcm9sbCc7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdmbGV4JykpIHRoaXMuY29udGVudENscyArPSAnIHVpLXJvdyB1aS1yb3ctdiB1aS1hbGlnbi1zdHJldGNoIHVpLW5vd3JhcCc7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdwYWRkZWQnKSkgdGhpcy5jb250ZW50Q2xzICs9ICcgdWktcGFkLWFsbCc7XG5cbiAgICBpZiAodGhpcy5taW5pRGlzcGxheSA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdtaW5pLWRpc3BsYXknKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zaWRlYmFyLW1pbmknKTtcbiAgICBpZiAodGhpcy5jb21wYWN0ID0gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvbXBhY3QnKSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zaWRlYmFyLWNvbXBhY3QnKTtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktc2lkZWJhci1taW5pJyk7XG4gICAgfVxuICAgIHRoaXMuY29sbGFwc2libGUgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY29sbGFwc2libGUnKTtcblxuXG4gICAgdGhpcy5vYkNsaWNrID0gVUlFdmVudC5zdWJzY3JpYmUoJ21vdXNlY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndWktc2lkZWJhci1zaG93Jyk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBhdXJlbGlhIGhvb2tzXG4gIC8vIGNyZWF0ZWQob3duaW5nVmlldzogVmlldywgbXlWaWV3OiBWaWV3KSB7IH1cbiAgYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gISEodGhpcy5jb2xsYXBzZWQpO1xuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnZW5kJyAmJiB0aGlzLmdseXBoID09PSAnZ2x5cGgtYXJyb3ctbGVmdCcpIHRoaXMuZ2x5cGggPSBcImdseXBoLWFycm93LXJpZ2h0XCI7XG4gIH1cbiAgYXR0YWNoZWQoKSB7XG4gICAgaWYgKHRoaXMubGFiZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClbdGhpcy5sYWJlbEVsLmlubmVySFRNTCA9ICcnLCB0aGlzLmxhYmVsRWwuYXBwZW5kQ2hpbGQodGhpcy5sYWJlbCldO1xuICB9XG4gIGRldGFjaGVkKCkge1xuICAgIGlmICh0aGlzLm9iQ2xpY2spIHRoaXMub2JDbGljay5kaXNwb3NlKCk7XG4gIH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKCkgbGFiZWw6IGFueSA9IFwiXCI7XG4gIEBiaW5kYWJsZSgpIGNvbGxhcHNlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBwb3NpdGlvbiA9IFwic3RhcnRcIjtcblxuICBnbHlwaCA9ICdnbHlwaC1hcnJvdy1sZWZ0JztcbiAgY29udGVudENscyA9ICcnO1xuICBwcml2YXRlIGxhYmVsRWw7XG4gIHByaXZhdGUgY29udGVudEVsO1xuICBwcml2YXRlIG9iQ2xpY2s7XG4gIHByaXZhdGUgY29tcGFjdCA9IGZhbHNlO1xuICBwcml2YXRlIG1pbmlEaXNwbGF5ID0gZmFsc2U7XG4gIHByaXZhdGUgY29sbGFwc2libGUgPSBmYWxzZTtcblxuICBjb2xsYXBzZWRDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5nbHlwaCA9ICh0aGlzLnBvc2l0aW9uID09ICdlbmQnICYmICEobmV3VmFsdWUpKSB8fCAodGhpcy5wb3NpdGlvbiA9PSAnc3RhcnQnICYmICEhKG5ld1ZhbHVlKSkgPyBcImdseXBoLWFycm93LXJpZ2h0XCIgOiBcImdseXBoLWFycm93LWxlZnRcIjtcbiAgfVxuXG4gIHRvZ2dsZUNvbGxhcHNlKCRldmVudCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1zaWRlYmFyLXNob3cnKTtcbiAgICAkZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHNob3dPdmVybGF5KCRldmVudCkge1xuICAgIGlmICh0aGlzLm1pbmlEaXNwbGF5IHx8ICRldmVudC50YXJnZXQgIT0gdGhpcy5lbGVtZW50KSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodGhpcy5jb2xsYXBzZWQpXG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktc2lkZWJhci1zaG93Jyk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLXNpZGViYXItc2hvdycpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9
