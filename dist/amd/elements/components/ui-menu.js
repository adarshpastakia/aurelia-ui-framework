var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIMenubar = (function () {
        function UIMenubar(element) {
            this.element = element;
            this.isOverflow = false;
        }
        UIMenubar.prototype.attached = function () {
            var _this = this;
            this.obResize = ui_event_1.UIEvent.subscribe('windowresize', function () { return _this.arrange(); });
            this.obClick = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                if (getParentByClass(evt.target, 'ui-menubar-toggle') == _this.element)
                    return;
                _this.overflow.classList.remove('ui-open');
            });
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.overflow, { resize: false, position: 'br' });
            window.setTimeout(function () { return _this.arrange(); }, 100);
        };
        UIMenubar.prototype.detached = function () {
            this.tether.dispose();
            this.obClick.dispose();
            this.obResize.dispose();
        };
        UIMenubar.prototype.arrange = function () {
            this.overflow.classList.remove('ui-open');
            for (var i = 0, c = this.overflow['children']; i < c.length; i++) {
                this.wrapper.appendChild(c[i]);
            }
            if (this.isOverflow = (this.wrapper.lastElementChild.offsetLeft + this.wrapper.lastElementChild.offsetWidth > this.wrapper.offsetWidth)) {
                for (var c = this.wrapper['children'], i = c.length - 1; i >= 0; i--) {
                    if (c[i].offsetLeft + c[i].offsetWidth > this.wrapper.offsetWidth) {
                        if (this.overflow.hasChildNodes)
                            this.overflow.insertBefore(c[i], this.overflow.childNodes[0]);
                        else
                            this.overflow.appendChild(c[i]);
                    }
                }
            }
        };
        UIMenubar.prototype.showOverflow = function (evt) {
            if (evt.button != 0)
                return true;
            if (!this.overflow.classList.contains('ui-open')) {
                this.overflow.classList.add('ui-open');
                this.tether.position();
            }
            else
                this.overflow.classList.remove('ui-open');
        };
        UIMenubar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("\n<template class=\"ui-menubar\">\n  <div class=\"ui-menubar-wrapper\" ref=\"wrapper\"><slot></slot></div>\n  <div class=\"ui-menubar-toggle\" ref=\"overflowToggle\" show.bind=\"isOverflow\" click.trigger=\"showOverflow($event)\"><ui-glyph glyph=\"glyph-handle-overflow\"></ui-glyph></div>\n  <div class=\"ui-menu ui-menubar-overflow ui-floating\" ref=\"overflow\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-menubar'),
            __metadata("design:paramtypes", [Element])
        ], UIMenubar);
        return UIMenubar;
    }());
    exports.UIMenubar = UIMenubar;
    var UIMenu = (function () {
        function UIMenu(element) {
            this.element = element;
        }
        UIMenu = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-menu"><slot></slot></template>'),
            aurelia_framework_1.customElement('ui-menu'),
            __metadata("design:paramtypes", [Element])
        ], UIMenu);
        return UIMenu;
    }());
    exports.UIMenu = UIMenu;
    var UIMenuTitle = (function () {
        function UIMenuTitle(element) {
            this.element = element;
        }
        UIMenuTitle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-menu-section-title"><slot></slot></template>'),
            aurelia_framework_1.customElement('ui-menu-section'),
            __metadata("design:paramtypes", [Element])
        ], UIMenuTitle);
        return UIMenuTitle;
    }());
    exports.UIMenuTitle = UIMenuTitle;
    var UIMenuGroup = (function () {
        function UIMenuGroup(element) {
            this.element = element;
            this.label = '';
            this.collapsed = false;
            this.collapsible = false;
            this.collapsible = element.hasAttribute('collapsible');
        }
        UIMenuGroup.prototype.toggleCollapse = function (event) {
            this.collapsed = !this.collapsed;
            event.stopPropagation();
            event.preventDefault();
            return false;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuGroup.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuGroup.prototype, "collapsed", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuGroup.prototype, "collapsible", void 0);
        __decorate([
            aurelia_framework_1.child('ui-menu-item.ui-active'),
            __metadata("design:type", Object)
        ], UIMenuGroup.prototype, "hasActive", void 0);
        UIMenuGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-menu-section ${collapsible?\'ui-collapsible\':\'\'} ${collapsed?\'ui-collapsed\':\'\'}"><div mouseup.trigger="toggleCollapse($event)" if.bind="label" class="ui-menu-section-title ${hasActive?\'ui-has-active\':\'\'}"><ui-glyph glyph="glyph-chevron-down" if.bind="collapsible"></ui-glyph><span innerhtml.bind="label"></span></div><div class="ui-menu-section-body"><slot></slot></div></template>'),
            aurelia_framework_1.customElement('ui-menu-group'),
            __metadata("design:paramtypes", [Element])
        ], UIMenuGroup);
        return UIMenuGroup;
    }());
    exports.UIMenuGroup = UIMenuGroup;
    var UIMenuItem = (function () {
        function UIMenuItem(element) {
            this.element = element;
            this.id = '';
            this.description = '';
            this.glyph = '';
            this.class = '';
            this.active = false;
            this.disabled = false;
            this.href = 'javascript:void(0)';
        }
        UIMenuItem.prototype.bind = function (bindingContext, overrideContext) {
            this.active = !!(this.active);
            this.disabled = !!(this.disabled);
        };
        UIMenuItem.prototype.click = function (evt) {
            if (evt.button != 0)
                return true;
            evt.cancelBubble = true;
            evt.stopPropagation();
            if (this.href !== 'javascript:void(0)')
                return true;
            return ui_event_1.UIEvent.fireEvent('click', this.element, this.id);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "description", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "active", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "href", void 0);
        UIMenuItem = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><a class=\"ui-menu-item ${active?'ui-active':''} ${disabled?'ui-disabled':''} ${class}\" href.bind=\"href\" click.trigger=\"click($event)\">\n    <ui-glyph if.bind=\"glyph\" class=\"ui-menu-icon ${glyph}\" glyph.bind=\"glyph\"></ui-glyph><span class=\"ui-menu-label\"><slot></slot><small if.bind=\"description\">${description}</small></span></a></template>"),
            aurelia_framework_1.customElement('ui-menu-item'),
            __metadata("design:paramtypes", [Element])
        ], UIMenuItem);
        return UIMenuItem;
    }());
    exports.UIMenuItem = UIMenuItem;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFpQkE7UUFDRSxtQkFBbUIsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQXVCM0IsZUFBVSxHQUFHLEtBQUssQ0FBQztRQXZCWSxDQUFDO1FBS3hDLDRCQUFRLEdBQVI7WUFBQSxpQkFRQztZQVBDLElBQUksQ0FBQyxRQUFRLEdBQUcsa0JBQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFFLEVBQWQsQ0FBYyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsVUFBQyxHQUFHO2dCQUNqRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFBQyxNQUFNLENBQUM7Z0JBQzlFLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsa0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM3RixNQUFNLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFFLEVBQWQsQ0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFDRCw0QkFBUSxHQUFSO1lBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFB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Q1g7WUFBWCw0QkFBUSxFQUFFOztrREFBZ0I7UUFDZjtZQUFYLDRCQUFRLEVBQUU7O29EQUFrQjtRQUNqQjtZQUFYLDRCQUFRLEVBQUU7O2dEQUE2QjtRQXBCN0IsVUFBVTtZQUx0Qiw4QkFBVSxFQUFFO1lBQ1osaUNBQWEsRUFBRTtZQUNmLDhCQUFVLENBQUMsZ1hBQ21NLENBQUM7WUFDL00saUNBQWEsQ0FBQyxjQUFjLENBQUM7NkNBRUEsT0FBTztXQUR4QixVQUFVLENBNkJ0QjtRQUFELGlCQUFDO0tBN0JELEFBNkJDLElBQUE7SUE3QlksZ0NBQVUiLCJmaWxlIjoiZWxlbWVudHMvY29tcG9uZW50cy91aS1tZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGJpbmRpbmdNb2RlLCBpbmxpbmVWaWV3LCBjb250YWluZXJsZXNzLCBjaGlsZCB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7IFVJRXZlbnQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdWktZXZlbnRcIjtcbmltcG9ydCB7IFVJVXRpbHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdWktdXRpbHNcIjtcblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYFxuPHRlbXBsYXRlIGNsYXNzPVwidWktbWVudWJhclwiPlxuICA8ZGl2IGNsYXNzPVwidWktbWVudWJhci13cmFwcGVyXCIgcmVmPVwid3JhcHBlclwiPjxzbG90Pjwvc2xvdD48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLW1lbnViYXItdG9nZ2xlXCIgcmVmPVwib3ZlcmZsb3dUb2dnbGVcIiBzaG93LmJpbmQ9XCJpc092ZXJmbG93XCIgY2xpY2sudHJpZ2dlcj1cInNob3dPdmVyZmxvdygkZXZlbnQpXCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtaGFuZGxlLW92ZXJmbG93XCI+PC91aS1nbHlwaD48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLW1lbnUgdWktbWVudWJhci1vdmVyZmxvdyB1aS1mbG9hdGluZ1wiIHJlZj1cIm92ZXJmbG93XCI+PC9kaXY+XG48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktbWVudWJhcicpXG5leHBvcnQgY2xhc3MgVUlNZW51YmFyIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICAvLyBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7IH1cbiAgYXR0YWNoZWQoKSB7XG4gICAgdGhpcy5vYlJlc2l6ZSA9IFVJRXZlbnQuc3Vic2NyaWJlKCd3aW5kb3dyZXNpemUnLCAoKSA9PiB0aGlzLmFycmFuZ2UoKSk7XG4gICAgdGhpcy5vYkNsaWNrID0gVUlFdmVudC5zdWJzY3JpYmUoJ21vdXNlY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZ2V0UGFyZW50QnlDbGFzcyhldnQudGFyZ2V0LCAndWktbWVudWJhci10b2dnbGUnKSA9PSB0aGlzLmVsZW1lbnQpIHJldHVybjtcbiAgICAgIHRoaXMub3ZlcmZsb3cuY2xhc3NMaXN0LnJlbW92ZSgndWktb3BlbicpO1xuICAgIH0pO1xuICAgIHRoaXMudGV0aGVyID0gVUlVdGlscy50ZXRoZXIodGhpcy5lbGVtZW50LCB0aGlzLm92ZXJmbG93LCB7IHJlc2l6ZTogZmFsc2UsIHBvc2l0aW9uOiAnYnInIH0pO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuYXJyYW5nZSgpLCAxMDApO1xuICB9XG4gIGRldGFjaGVkKCkge1xuICAgIHRoaXMudGV0aGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLm9iQ2xpY2suZGlzcG9zZSgpO1xuICAgIHRoaXMub2JSZXNpemUuZGlzcG9zZSgpO1xuICB9XG4gIC8vIHVuYmluZCgpIHsgfVxuICAvLyBlbmQgYXVyZWxpYSBob29rc1xuXG4gIHByaXZhdGUgdGV0aGVyO1xuICBwcml2YXRlIGlzT3ZlcmZsb3cgPSBmYWxzZTtcblxuICBwcml2YXRlIHdyYXBwZXI6IEVsZW1lbnQ7XG4gIHByaXZhdGUgb3ZlcmZsb3c6IEVsZW1lbnQ7XG4gIHByaXZhdGUgb3ZlcmZsb3dUb2dnbGU6IEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSBvYkNsaWNrO1xuICBwcml2YXRlIG9iUmVzaXplO1xuXG4gIGFycmFuZ2UoKSB7XG4gICAgdGhpcy5vdmVyZmxvdy5jbGFzc0xpc3QucmVtb3ZlKCd1aS1vcGVuJyk7XG4gICAgZm9yIChsZXQgaSA9IDAsIGMgPSB0aGlzLm92ZXJmbG93WydjaGlsZHJlbiddOyBpIDwgYy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy53cmFwcGVyLmFwcGVuZENoaWxkKGNbaV0pO1xuICAgIH1cbiAgICAvL1RPRE86IEltcGxlbWVudCBmaXggZm9yIFJUTFxuICAgIGlmICh0aGlzLmlzT3ZlcmZsb3cgPSAodGhpcy53cmFwcGVyLmxhc3RFbGVtZW50Q2hpbGQub2Zmc2V0TGVmdCArIHRoaXMud3JhcHBlci5sYXN0RWxlbWVudENoaWxkLm9mZnNldFdpZHRoID4gdGhpcy53cmFwcGVyLm9mZnNldFdpZHRoKSkge1xuICAgICAgZm9yIChsZXQgYyA9IHRoaXMud3JhcHBlclsnY2hpbGRyZW4nXSwgaSA9IGMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGNbaV0ub2Zmc2V0TGVmdCArIGNbaV0ub2Zmc2V0V2lkdGggPiB0aGlzLndyYXBwZXIub2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICBpZiAodGhpcy5vdmVyZmxvdy5oYXNDaGlsZE5vZGVzKSB0aGlzLm92ZXJmbG93Lmluc2VydEJlZm9yZShjW2ldLCB0aGlzLm92ZXJmbG93LmNoaWxkTm9kZXNbMF0pOyBlbHNlIHRoaXMub3ZlcmZsb3cuYXBwZW5kQ2hpbGQoY1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc2hvd092ZXJmbG93KGV2dCkge1xuICAgIGlmIChldnQuYnV0dG9uICE9IDApIHJldHVybiB0cnVlO1xuICAgIGlmICghdGhpcy5vdmVyZmxvdy5jbGFzc0xpc3QuY29udGFpbnMoJ3VpLW9wZW4nKSkge1xuICAgICAgdGhpcy5vdmVyZmxvdy5jbGFzc0xpc3QuYWRkKCd1aS1vcGVuJyk7XG4gICAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICB0aGlzLm92ZXJmbG93LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldygnPHRlbXBsYXRlIGNsYXNzPVwidWktbWVudVwiPjxzbG90Pjwvc2xvdD48L3RlbXBsYXRlPicpXG5AY3VzdG9tRWxlbWVudCgndWktbWVudScpXG5leHBvcnQgY2xhc3MgVUlNZW51IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxufVxuXG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KCc8dGVtcGxhdGUgY2xhc3M9XCJ1aS1tZW51LXNlY3Rpb24tdGl0bGVcIj48c2xvdD48L3Nsb3Q+PC90ZW1wbGF0ZT4nKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLW1lbnUtc2VjdGlvbicpXG5leHBvcnQgY2xhc3MgVUlNZW51VGl0bGUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KCc8dGVtcGxhdGUgY2xhc3M9XCJ1aS1tZW51LXNlY3Rpb24gJHtjb2xsYXBzaWJsZT9cXCd1aS1jb2xsYXBzaWJsZVxcJzpcXCdcXCd9ICR7Y29sbGFwc2VkP1xcJ3VpLWNvbGxhcHNlZFxcJzpcXCdcXCd9XCI+PGRpdiBtb3VzZXVwLnRyaWdnZXI9XCJ0b2dnbGVDb2xsYXBzZSgkZXZlbnQpXCIgaWYuYmluZD1cImxhYmVsXCIgY2xhc3M9XCJ1aS1tZW51LXNlY3Rpb24tdGl0bGUgJHtoYXNBY3RpdmU/XFwndWktaGFzLWFjdGl2ZVxcJzpcXCdcXCd9XCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtY2hldnJvbi1kb3duXCIgaWYuYmluZD1cImNvbGxhcHNpYmxlXCI+PC91aS1nbHlwaD48c3BhbiBpbm5lcmh0bWwuYmluZD1cImxhYmVsXCI+PC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJ1aS1tZW51LXNlY3Rpb24tYm9keVwiPjxzbG90Pjwvc2xvdD48L2Rpdj48L3RlbXBsYXRlPicpXG5AY3VzdG9tRWxlbWVudCgndWktbWVudS1ncm91cCcpXG5leHBvcnQgY2xhc3MgVUlNZW51R3JvdXAge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHRoaXMuY29sbGFwc2libGUgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY29sbGFwc2libGUnKTtcbiAgfVxuXG4gIEBiaW5kYWJsZSgpIGxhYmVsID0gJyc7XG4gIEBiaW5kYWJsZSgpIGNvbGxhcHNlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBjb2xsYXBzaWJsZSA9IGZhbHNlO1xuXG4gIEBjaGlsZCgndWktbWVudS1pdGVtLnVpLWFjdGl2ZScpIGhhc0FjdGl2ZTtcblxuICB0b2dnbGVDb2xsYXBzZShldmVudCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjb250YWluZXJsZXNzKClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGU+PGEgY2xhc3M9XCJ1aS1tZW51LWl0ZW0gXFwke2FjdGl2ZT8ndWktYWN0aXZlJzonJ30gXFwke2Rpc2FibGVkPyd1aS1kaXNhYmxlZCc6Jyd9IFxcJHtjbGFzc31cIiBocmVmLmJpbmQ9XCJocmVmXCIgY2xpY2sudHJpZ2dlcj1cImNsaWNrKCRldmVudClcIj5cbiAgICA8dWktZ2x5cGggaWYuYmluZD1cImdseXBoXCIgY2xhc3M9XCJ1aS1tZW51LWljb24gXFwke2dseXBofVwiIGdseXBoLmJpbmQ9XCJnbHlwaFwiPjwvdWktZ2x5cGg+PHNwYW4gY2xhc3M9XCJ1aS1tZW51LWxhYmVsXCI+PHNsb3Q+PC9zbG90PjxzbWFsbCBpZi5iaW5kPVwiZGVzY3JpcHRpb25cIj5cXCR7ZGVzY3JpcHRpb259PC9zbWFsbD48L3NwYW4+PC9hPjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1tZW51LWl0ZW0nKVxuZXhwb3J0IGNsYXNzIFVJTWVudUl0ZW0ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICB0aGlzLmFjdGl2ZSA9ICEhKHRoaXMuYWN0aXZlKTtcbiAgICB0aGlzLmRpc2FibGVkID0gISEodGhpcy5kaXNhYmxlZCk7XG4gIH1cbiAgLy8gYXR0YWNoZWQoKSB7IH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKCkgaWQgPSAnJztcbiAgQGJpbmRhYmxlKCkgZGVzY3JpcHRpb24gPSAnJztcbiAgQGJpbmRhYmxlKCkgZ2x5cGggPSAnJztcbiAgQGJpbmRhYmxlKCkgY2xhc3MgPSAnJztcbiAgQGJpbmRhYmxlKCkgYWN0aXZlID0gZmFsc2U7XG4gIEBiaW5kYWJsZSgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBiaW5kYWJsZSgpIGhyZWYgPSAnamF2YXNjcmlwdDp2b2lkKDApJztcblxuICBwcml2YXRlIGNsaWNrKGV2dCkge1xuICAgIGlmIChldnQuYnV0dG9uICE9IDApIHJldHVybiB0cnVlO1xuICAgIGV2dC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5ocmVmICE9PSAnamF2YXNjcmlwdDp2b2lkKDApJykgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIFVJRXZlbnQuZmlyZUV2ZW50KCdjbGljaycsIHRoaXMuZWxlbWVudCwgdGhpcy5pZCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
