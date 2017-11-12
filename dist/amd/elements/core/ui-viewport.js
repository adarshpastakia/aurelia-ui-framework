var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-router", "../../utils/ui-event", "../../utils/ui-utils"], function (require, exports, aurelia_framework_1, aurelia_router_1, ui_event_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CSS_PREFIX = 'ui-viewport';
    var UIViewport = (function () {
        function UIViewport(element) {
            this.element = element;
            var __resizeTimer;
            document.ondragstart = function (e) { return getParentByClass(e.target, '.ui-draggable') != null; };
            document.onmouseup = function (e) { return ui_event_1.UIEvent.broadcast('mouseclick', e); };
            document.ontouchstart = function (e) { return ui_event_1.UIEvent.broadcast('mouseclick', e); };
            window.onresize = function (e) {
                window.clearTimeout(__resizeTimer);
                window.setTimeout(function () { return ui_event_1.UIEvent.broadcast('windowresize'); }, 500);
            };
            this.router = ui_utils_1.UIUtils.auContainer.get(aurelia_router_1.AppRouter);
        }
        UIViewport.prototype.attached = function () {
            ui_utils_1.UIUtils.dialogContainer = this.dialogContainer;
            ui_utils_1.UIUtils.overlayContainer = this.overlayContainer;
            ui_utils_1.UIUtils.taskbarContainer = this.taskbarContainer;
            ui_event_1.UIEvent.fireEvent('appready', this.element);
            if (document.querySelector('.ui-splash'))
                aurelia_framework_1.DOM.removeNode(document.querySelector('.ui-splash'));
        };
        UIViewport = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"" + CSS_PREFIX + " ui-row ui-row-v ui-align-stretch ui-nowrap\">\n  <compose view-model=\"./ui-glyphs\"></compose>\n  <slot name=\"ui-app-banner\"></slot>\n  <slot name=\"ui-app-header\"></slot>\n  <slot></slot>\n  <div class=\"" + CSS_PREFIX + "-taskbar\"><slot name=\"ui-app-taskbar\"></slot><div class=\"" + CSS_PREFIX + "-taskbar-wrapper\" ref=\"taskbarContainer\"></div></div>\n  <slot name=\"ui-app-footer\"></slot>\n\n  <div class=\"ui-dialog-container\" ref=\"dialogContainer\"></div>\n  <div class=\"ui-overlay-container ui-row ui-row-v ui-align-end\" ref=\"overlayContainer\"></div>\n\n  <ui-loader large busy.bind=\"router.isNavigating\"></ui-loader>\n</template>"),
            aurelia_framework_1.customElement('ui-viewport'),
            __metadata("design:paramtypes", [Element])
        ], UIViewport);
        return UIViewport;
    }());
    exports.UIViewport = UIViewport;
    var UIRouterView = (function () {
        function UIRouterView(element) {
            this.element = element;
            this.name = 'default';
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRouterView.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRouterView.prototype, "class", void 0);
        UIRouterView = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><router-view class=\"ui-router-view ui-column-fill ui-row ui-row-v ui-align-stretch ui-nowrap ${class}\" name=\"${name}\"></router-view></template>"),
            aurelia_framework_1.customElement('ui-router-view'),
            __metadata("design:paramtypes", [Element])
        ], UIRouterView);
        return UIRouterView;
    }());
    exports.UIRouterView = UIRouterView;
    var UIAppHeader = (function () {
        function UIAppHeader(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppHeader.prototype, "class", void 0);
        UIAppHeader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"" + CSS_PREFIX + "-header ui-column-auto ui-row ui-row-h ui-align-center ui-nowrap ${class}\" slot=\"ui-app-header\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-app-header'),
            __metadata("design:paramtypes", [Element])
        ], UIAppHeader);
        return UIAppHeader;
    }());
    exports.UIAppHeader = UIAppHeader;
    var UIAppBanner = (function () {
        function UIAppBanner(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppBanner.prototype, "class", void 0);
        UIAppBanner = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"" + CSS_PREFIX + "-banner ui-column-auto ${class}\" slot=\"ui-app-banner\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-app-banner'),
            __metadata("design:paramtypes", [Element])
        ], UIAppBanner);
        return UIAppBanner;
    }());
    exports.UIAppBanner = UIAppBanner;
    var UIAppFooter = (function () {
        function UIAppFooter(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppFooter.prototype, "class", void 0);
        UIAppFooter = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"" + CSS_PREFIX + "-footer ui-column-auto ui-row ui-row-h ui-align-center ui-justify-between ${class}\" slot=\"ui-app-footer\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-app-footer'),
            __metadata("design:paramtypes", [Element])
        ], UIAppFooter);
        return UIAppFooter;
    }());
    exports.UIAppFooter = UIAppFooter;
    var UIAppQuickLinks = (function () {
        function UIAppQuickLinks(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppQuickLinks.prototype, "class", void 0);
        UIAppQuickLinks = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"" + CSS_PREFIX + "-taskbar-tools ${class}\" slot=\"ui-app-taskbar\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-app-quick-links'),
            __metadata("design:paramtypes", [Element])
        ], UIAppQuickLinks);
        return UIAppQuickLinks;
    }());
    exports.UIAppQuickLinks = UIAppQuickLinks;
    var UIAppTitle = (function () {
        function UIAppTitle(element) {
            this.element = element;
            this.href = '/';
            this.src = '';
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppTitle.prototype, "href", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppTitle.prototype, "src", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppTitle.prototype, "class", void 0);
        UIAppTitle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-app-title'),
            aurelia_framework_1.inlineView("<template><a href.bind=\"href\" class=\"" + CSS_PREFIX + "-title ui-row ui-row-h ui-align-center ui-nowrap ${class}\"><img if.bind=\"src\" src.bind=\"src\" class=\"" + CSS_PREFIX + "-tile-image\"/><span class=\"ui-column-auto\"><slot></slot></span></a><div class=\"ui-column-fill\"></div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIAppTitle);
        return UIAppTitle;
    }());
    exports.UIAppTitle = UIAppTitle;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvcmUvdWktdmlld3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBVUEsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDO0lBaUJqQztRQUdFLG9CQUFtQixPQUFnQjtZQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1lBQ2pDLElBQUksYUFBYSxDQUFDO1lBRWxCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsVUFBQyxDQUFNLElBQUssT0FBQSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxJQUFJLElBQUksRUFBbkQsQ0FBbUQsQ0FBQztZQUN2RixRQUFRLENBQUMsU0FBUyxHQUFHLFVBQUMsQ0FBTSxJQUFLLE9BQUEsa0JBQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFsQyxDQUFrQyxDQUFDO1lBQ3BFLFFBQVEsQ0FBQyxZQUFZLEdBQUcsVUFBQyxDQUFNLElBQUssT0FBQSxrQkFBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQWxDLENBQWtDLENBQUM7WUFDdkUsTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFDLENBQU07Z0JBQ3ZCLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFPLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFqQyxDQUFpQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FBQTtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsa0JBQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLDBCQUFTLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBR0QsNkJBQVEsR0FBUjtZQUNFLGtCQUFPLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDL0Msa0JBQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdC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Q0FBYSxFQUFFO1lBQ2YsOEJBQVUsQ0FBQyw0QkFBeUIsVUFBVSxxRkFBZ0YsQ0FBQztZQUMvSCxpQ0FBYSxDQUFDLG9CQUFvQixDQUFDOzZDQUVOLE9BQU87V0FEeEIsZUFBZSxDQUczQjtRQUFELHNCQUFDO0tBSEQsQUFHQyxJQUFBO0lBSFksMENBQWU7SUFVNUI7UUFDRSxvQkFBbUIsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQUN2QixTQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ1gsUUFBRyxHQUFHLEVBQUUsQ0FBQztZQUNULFVBQUssR0FBRyxFQUFFLENBQUM7UUFIZ0IsQ0FBQztRQUM1QjtZQUFYLDRCQUFRLEVBQUU7O2dEQUFZO1FBQ1g7WUFBWCw0QkFBUSxFQUFFOzsrQ0FBVTtRQUNUO1lBQVgsNEJBQVEsRUFBRTs7aURBQVk7UUFKWixVQUFVO1lBSnRCLDhCQUFVLEVBQUU7WUFDWixpQ0FBYSxFQUFFO1lBQ2YsaUNBQWEsQ0FBQyxjQUFjLENBQUM7WUFDN0IsOEJBQVUsQ0FBQyw2Q0FBd0MsVUFBVSxrSEFBd0csVUFBVSwwSEFBa0gsQ0FBQzs2Q0FFclEsT0FBTztXQUR4QixVQUFVLENBS3RCO1FBQUQsaUJBQUM7S0FMRCxBQUtDLElBQUE7SUFMWSxnQ0FBVSIsImZpbGUiOiJlbGVtZW50cy9jb3JlL3VpLXZpZXdwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGlubGluZVZpZXcsIGNvbnRhaW5lcmxlc3MsIENvbnRhaW5lciwgRE9NIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgQXBwUm91dGVyIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gXCIuLi8uLi91dGlscy91aS1ldmVudFwiO1xuaW1wb3J0IHsgVUlVdGlscyB9IGZyb20gXCIuLi8uLi91dGlscy91aS11dGlsc1wiO1xuXG5jb25zdCBDU1NfUFJFRklYID0gJ3VpLXZpZXdwb3J0JztcblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cIiR7Q1NTX1BSRUZJWH0gdWktcm93IHVpLXJvdy12IHVpLWFsaWduLXN0cmV0Y2ggdWktbm93cmFwXCI+XG4gIDxjb21wb3NlIHZpZXctbW9kZWw9XCIuL3VpLWdseXBoc1wiPjwvY29tcG9zZT5cbiAgPHNsb3QgbmFtZT1cInVpLWFwcC1iYW5uZXJcIj48L3Nsb3Q+XG4gIDxzbG90IG5hbWU9XCJ1aS1hcHAtaGVhZGVyXCI+PC9zbG90PlxuICA8c2xvdD48L3Nsb3Q+XG4gIDxkaXYgY2xhc3M9XCIke0NTU19QUkVGSVh9LXRhc2tiYXJcIj48c2xvdCBuYW1lPVwidWktYXBwLXRhc2tiYXJcIj48L3Nsb3Q+PGRpdiBjbGFzcz1cIiR7Q1NTX1BSRUZJWH0tdGFza2Jhci13cmFwcGVyXCIgcmVmPVwidGFza2JhckNvbnRhaW5lclwiPjwvZGl2PjwvZGl2PlxuICA8c2xvdCBuYW1lPVwidWktYXBwLWZvb3RlclwiPjwvc2xvdD5cblxuICA8ZGl2IGNsYXNzPVwidWktZGlhbG9nLWNvbnRhaW5lclwiIHJlZj1cImRpYWxvZ0NvbnRhaW5lclwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktb3ZlcmxheS1jb250YWluZXIgdWktcm93IHVpLXJvdy12IHVpLWFsaWduLWVuZFwiIHJlZj1cIm92ZXJsYXlDb250YWluZXJcIj48L2Rpdj5cblxuICA8dWktbG9hZGVyIGxhcmdlIGJ1c3kuYmluZD1cInJvdXRlci5pc05hdmlnYXRpbmdcIj48L3VpLWxvYWRlcj5cbjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS12aWV3cG9ydCcpXG5leHBvcnQgY2xhc3MgVUlWaWV3cG9ydCB7XG4gIHJvdXRlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHZhciBfX3Jlc2l6ZVRpbWVyO1xuICAgIC8vIEJyb3dzZXIgZXZlbnRzIGhvb2tzXG4gICAgZG9jdW1lbnQub25kcmFnc3RhcnQgPSAoZTogYW55KSA9PiBnZXRQYXJlbnRCeUNsYXNzKGUudGFyZ2V0LCAnLnVpLWRyYWdnYWJsZScpICE9IG51bGw7XG4gICAgZG9jdW1lbnQub25tb3VzZXVwID0gKGU6IGFueSkgPT4gVUlFdmVudC5icm9hZGNhc3QoJ21vdXNlY2xpY2snLCBlKTtcbiAgICBkb2N1bWVudC5vbnRvdWNoc3RhcnQgPSAoZTogYW55KSA9PiBVSUV2ZW50LmJyb2FkY2FzdCgnbW91c2VjbGljaycsIGUpO1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IChlOiBhbnkpID0+IHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoX19yZXNpemVUaW1lcik7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBVSUV2ZW50LmJyb2FkY2FzdCgnd2luZG93cmVzaXplJyksIDUwMCk7XG4gICAgfVxuICAgIHRoaXMucm91dGVyID0gVUlVdGlscy5hdUNvbnRhaW5lci5nZXQoQXBwUm91dGVyKTtcbiAgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgYXR0YWNoZWQoKSB7XG4gICAgVUlVdGlscy5kaWFsb2dDb250YWluZXIgPSB0aGlzLmRpYWxvZ0NvbnRhaW5lcjtcbiAgICBVSVV0aWxzLm92ZXJsYXlDb250YWluZXIgPSB0aGlzLm92ZXJsYXlDb250YWluZXI7XG4gICAgVUlVdGlscy50YXNrYmFyQ29udGFpbmVyID0gdGhpcy50YXNrYmFyQ29udGFpbmVyO1xuICAgIC8vIEZpcmUgYXBwcmVhZHkgZXZlbnRcbiAgICBVSUV2ZW50LmZpcmVFdmVudCgnYXBwcmVhZHknLCB0aGlzLmVsZW1lbnQpO1xuXG4gICAgLy8gUmVtb3ZlIHNwbGFzaFxuICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWktc3BsYXNoJykpIERPTS5yZW1vdmVOb2RlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51aS1zcGxhc2gnKSk7XG4gIH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgcHJpdmF0ZSBkaWFsb2dDb250YWluZXI7XG4gIHByaXZhdGUgb3ZlcmxheUNvbnRhaW5lcjtcbiAgcHJpdmF0ZSB0YXNrYmFyQ29udGFpbmVyO1xufVxuXG5AYXV0b2luamVjdCgpXG5AY29udGFpbmVybGVzcygpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlPjxyb3V0ZXItdmlldyBjbGFzcz1cInVpLXJvdXRlci12aWV3IHVpLWNvbHVtbi1maWxsIHVpLXJvdyB1aS1yb3ctdiB1aS1hbGlnbi1zdHJldGNoIHVpLW5vd3JhcCBcXCR7Y2xhc3N9XCIgbmFtZT1cIlxcJHtuYW1lfVwiPjwvcm91dGVyLXZpZXc+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXJvdXRlci12aWV3JylcbmV4cG9ydCBjbGFzcyBVSVJvdXRlclZpZXcge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG4gIEBiaW5kYWJsZSgpIG5hbWUgPSAnZGVmYXVsdCc7XG4gIEBiaW5kYWJsZSgpIGNsYXNzID0gJyc7XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGU+PGRpdiBjbGFzcz1cIiR7Q1NTX1BSRUZJWH0taGVhZGVyIHVpLWNvbHVtbi1hdXRvIHVpLXJvdyB1aS1yb3ctaCB1aS1hbGlnbi1jZW50ZXIgdWktbm93cmFwIFxcJHtjbGFzc31cIiBzbG90PVwidWktYXBwLWhlYWRlclwiPjxzbG90Pjwvc2xvdD48L2Rpdj48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktYXBwLWhlYWRlcicpXG5leHBvcnQgY2xhc3MgVUlBcHBIZWFkZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG4gIEBiaW5kYWJsZSgpIGNsYXNzID0gJyc7XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGU+PGRpdiBjbGFzcz1cIiR7Q1NTX1BSRUZJWH0tYmFubmVyIHVpLWNvbHVtbi1hdXRvIFxcJHtjbGFzc31cIiBzbG90PVwidWktYXBwLWJhbm5lclwiPjxzbG90Pjwvc2xvdD48L2Rpdj48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktYXBwLWJhbm5lcicpXG5leHBvcnQgY2xhc3MgVUlBcHBCYW5uZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG4gIEBiaW5kYWJsZSgpIGNsYXNzID0gJyc7XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGU+PGRpdiBjbGFzcz1cIiR7Q1NTX1BSRUZJWH0tZm9vdGVyIHVpLWNvbHVtbi1hdXRvIHVpLXJvdyB1aS1yb3ctaCB1aS1hbGlnbi1jZW50ZXIgdWktanVzdGlmeS1iZXR3ZWVuIFxcJHtjbGFzc31cIiBzbG90PVwidWktYXBwLWZvb3RlclwiPjxzbG90Pjwvc2xvdD48L2Rpdj48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktYXBwLWZvb3RlcicpXG5leHBvcnQgY2xhc3MgVUlBcHBGb290ZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG4gIEBiaW5kYWJsZSgpIGNsYXNzID0gJyc7XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGU+PGRpdiBjbGFzcz1cIiR7Q1NTX1BSRUZJWH0tdGFza2Jhci10b29scyBcXCR7Y2xhc3N9XCIgc2xvdD1cInVpLWFwcC10YXNrYmFyXCI+PHNsb3Q+PC9zbG90PjwvZGl2PjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1hcHAtcXVpY2stbGlua3MnKVxuZXhwb3J0IGNsYXNzIFVJQXBwUXVpY2tMaW5rcyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7IH1cbiAgQGJpbmRhYmxlKCkgY2xhc3MgPSAnJztcbn1cblxuLy8gQXBwIFRpdGxlXG5AYXV0b2luamVjdCgpXG5AY29udGFpbmVybGVzcygpXG5AY3VzdG9tRWxlbWVudCgndWktYXBwLXRpdGxlJylcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGU+PGEgaHJlZi5iaW5kPVwiaHJlZlwiIGNsYXNzPVwiJHtDU1NfUFJFRklYfS10aXRsZSB1aS1yb3cgdWktcm93LWggdWktYWxpZ24tY2VudGVyIHVpLW5vd3JhcCBcXCR7Y2xhc3N9XCI+PGltZyBpZi5iaW5kPVwic3JjXCIgc3JjLmJpbmQ9XCJzcmNcIiBjbGFzcz1cIiR7Q1NTX1BSRUZJWH0tdGlsZS1pbWFnZVwiLz48c3BhbiBjbGFzcz1cInVpLWNvbHVtbi1hdXRvXCI+PHNsb3Q+PC9zbG90Pjwvc3Bhbj48L2E+PGRpdiBjbGFzcz1cInVpLWNvbHVtbi1maWxsXCI+PC9kaXY+PC90ZW1wbGF0ZT5gKVxuZXhwb3J0IGNsYXNzIFVJQXBwVGl0bGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG4gIEBiaW5kYWJsZSgpIGhyZWYgPSAnLyc7XG4gIEBiaW5kYWJsZSgpIHNyYyA9ICcnO1xuICBAYmluZGFibGUoKSBjbGFzcyA9ICcnO1xufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
