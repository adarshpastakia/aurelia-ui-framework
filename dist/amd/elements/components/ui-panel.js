var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIPanel = (function () {
        function UIPanel(element) {
            this.element = element;
            this.height = 'auto';
            this.minheight = 'auto';
            this.maxheight = 'auto';
            this.expanded = false;
            this.collapsed = false;
        }
        UIPanel.prototype.bind = function (bindingContext, overrideContext) {
            this.collapsed = !!(this.collapsed) || this.element.hasAttribute('collapsed');
        };
        UIPanel.prototype.close = function () {
            var _this = this;
            if (isFunction(this.beforeclose)) {
                var ret = this.beforeclose();
                if (ret instanceof Promise)
                    ret.then(function (b) {
                        if (b) {
                            _this.remove();
                        }
                    });
                else if (ret !== false) {
                    this.remove();
                }
            }
            else if (ui_event_1.UIEvent.fireEvent('beforeclose', this.element) !== false) {
                this.remove();
            }
        };
        UIPanel.prototype.remove = function () {
            aurelia_framework_1.DOM.removeNode(this.element);
            ui_event_1.UIEvent.fireEvent('close', this.element);
        };
        UIPanel.prototype.collapse = function () {
            this.collapsed = true;
        };
        UIPanel.prototype.expand = function () {
            this.expanded = !this.expanded;
        };
        UIPanel.prototype.restore = function () {
            this.expanded = !this.expanded;
        };
        UIPanel.prototype.toggleCollapse = function () {
            var _this = this;
            setTimeout(function () { return _this.collapsed = !_this.collapsed; }, 200);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "minheight", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "maxheight", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "expanded", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "collapsed", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "beforeclose", void 0);
        UIPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-panel ${collapsed?'ui-collapse':''} ${expanded?'ui-expand':''}\" css.bind=\"{'max-height': maxheight,'min-height': minheight,'height':height}\" collapse.trigger=\"toggleCollapse()\" expand.trigger=\"expand()\" restore.trigger=\"expand()\" close.trigger=\"close()\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-panel'),
            __metadata("design:paramtypes", [Element])
        ], UIPanel);
        return UIPanel;
    }());
    exports.UIPanel = UIPanel;
    var UIPanelBody = (function () {
        function UIPanelBody(element) {
            this.element = element;
            if (element.hasAttribute('flex'))
                element.classList.add('ui-flexed');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        UIPanelBody = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-panel-body\" css.bind=\"{'max-height': maxheight,'min-height': minheight,'flex-basis':height}\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-panel-body'),
            __metadata("design:paramtypes", [Element])
        ], UIPanelBody);
        return UIPanelBody;
    }());
    exports.UIPanelBody = UIPanelBody;
    var UIPanelGroup = (function () {
        function UIPanelGroup(element) {
            this.element = element;
            this.allowtoggle = false;
            this.allowtoggle = element.hasAttribute('toggle');
        }
        UIPanelGroup.prototype.attached = function () {
            if (_.find(this.panels, ['collapsed', false]) == null)
                this.panels[0].collapsed = false;
        };
        UIPanelGroup.prototype.uncollapse = function () {
            var panel = _.find(this.panels, ['collapsed', false]);
            if (this.allowtoggle && panel)
                panel.collapsed = true;
        };
        __decorate([
            aurelia_framework_1.children('ui-panel'),
            __metadata("design:type", Object)
        ], UIPanelGroup.prototype, "panels", void 0);
        UIPanelGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-panel-group\" collapse.delegate=\"uncollapse()\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-panel-group'),
            __metadata("design:paramtypes", [Element])
        ], UIPanelGroup);
        return UIPanelGroup;
    }());
    exports.UIPanelGroup = UIPanelGroup;
    var UIHeader = (function () {
        function UIHeader(element) {
            this.element = element;
        }
        UIHeader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-header\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-header'),
            __metadata("design:paramtypes", [Element])
        ], UIHeader);
        return UIHeader;
    }());
    exports.UIHeader = UIHeader;
    var UIHeaderTool = (function () {
        function UIHeaderTool(element) {
            this.element = element;
            this.glyph = '';
            this.disabled = false;
            this.type = 'tool';
            if (element.hasAttribute('close'))
                this.type = "close";
            if (element.hasAttribute('refresh'))
                this.type = "refresh";
            if (element.hasAttribute('collapse'))
                this.type = "collapse";
            if (element.hasAttribute('expand'))
                this.type = "expand";
            if (element.hasAttribute('restore'))
                this.type = "restore";
            if (element.hasAttribute('minimize'))
                this.type = "minimize";
            if (element.hasAttribute('close'))
                this.glyph = "glyph-dialog-close";
            if (element.hasAttribute('refresh'))
                this.glyph = "glyph-refresh";
            if (element.hasAttribute('collapse'))
                this.glyph = "glyph-chevron-up";
            if (element.hasAttribute('expand'))
                this.glyph = "glyph-dialog-expand";
            if (element.hasAttribute('restore'))
                this.glyph = "glyph-dialog-restore";
            if (element.hasAttribute('minimize'))
                this.glyph = "glyph-dialog-minimize";
        }
        UIHeaderTool.prototype.bind = function (bindingContext, overrideContext) {
            this.disabled = !!(this.disabled);
        };
        UIHeaderTool.prototype.attached = function () {
            var _this = this;
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-button') == _this.element)
                        return;
                    _this.element.classList.remove('ui-open');
                    _this.dropdown.classList.remove('ui-open');
                });
                this.dropdown.classList.add('ui-floating');
                this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown, { position: 'br' });
            }
        };
        UIHeaderTool.prototype.detached = function () {
            if (this.tether)
                this.tether.dispose();
            if (this.obMouseup)
                this.obMouseup.dispose();
            if (this.dropdown)
                aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UIHeaderTool.prototype.fireEvent = function (evt) {
            if (evt.button != 0)
                return true;
            if (this.dropdown) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.cancelBubble = true;
                if (this.element.classList.contains('ui-open')) {
                    ui_event_1.UIEvent.fireEvent('menuhide', this.element);
                    this.element.classList.remove('ui-open');
                    this.dropdown.classList.remove('ui-open');
                }
                else {
                    if (ui_event_1.UIEvent.fireEvent('menuopen', this.element) !== false) {
                        this.element.classList.add('ui-open');
                        this.dropdown.classList.add('ui-open');
                        this.tether.position();
                    }
                }
                return false;
            }
            return ui_event_1.UIEvent.fireEvent(this.type, this.element);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIHeaderTool.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIHeaderTool.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIHeaderTool.prototype, "disabled", void 0);
        UIHeaderTool = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-header-tool\"><button disabled.bind=\"disabled\" tabindex=\"-1\" class=\"ui-header-button ui-${type}\" click.trigger=\"fireEvent($event)\">\n  <slot><ui-glyph glyph.bind=\"glyph\"></ui-glyph></slot></button></template>"),
            aurelia_framework_1.customElement('ui-header-tool'),
            __metadata("design:paramtypes", [Element])
        ], UIHeaderTool);
        return UIHeaderTool;
    }());
    exports.UIHeaderTool = UIHeaderTool;
    var UIHeaderTitle = (function () {
        function UIHeaderTitle(element) {
            this.element = element;
            this.glyph = '';
            if (this.element.hasAttribute('icon-hilight'))
                this.element.classList.add('ui-icon-hilight');
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIHeaderTitle.prototype, "glyph", void 0);
        UIHeaderTitle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-header-title ui-inline-block ui-col-fill\"><div class=\"ui-title-icon\"><ui-glyph glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph></div><div class=\"ui-title\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-header-title'),
            __metadata("design:paramtypes", [Element])
        ], UIHeaderTitle);
        return UIHeaderTitle;
    }());
    exports.UIHeaderTitle = UIHeaderTitle;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktcGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBYUE7UUFDRSxpQkFBbUIsT0FBZ0I7WUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQU12QixXQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2hCLGNBQVMsR0FBRyxNQUFNLENBQUM7WUFDbkIsY0FBUyxHQUFHLE1BQU0sQ0FBQztZQUV1QixhQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFYakMsQ0FBQztRQUV4QyxzQkFBSSxHQUFKLFVBQUssY0FBc0IsRUFBRSxlQUF1QjtZQUNsRCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRixDQUFDO1FBV0QsdUJBQUssR0FBTDtZQUFBLGlCQWVDO1lBZEMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDN0IsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLE9BQU8sQ0FBQztvQkFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzt3QkFDcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDTixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2hCLENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVB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Q0FBQztZQUN6TixpQ0FBYSxDQUFDLGlCQUFpQixDQUFDOzZDQUVILE9BQU87V0FEeEIsYUFBYSxDQU16QjtRQUFELG9CQUFDO0tBTkQsQUFNQyxJQUFBO0lBTlksc0NBQWEiLCJmaWxlIjoiZWxlbWVudHMvY29tcG9uZW50cy91aS1wYW5lbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE3XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcbmltcG9ydCB7IGF1dG9pbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlLCBiaW5kaW5nTW9kZSwgY2hpbGRyZW4sIGlubGluZVZpZXcsIERPTSB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7IFVJRXZlbnQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdWktZXZlbnRcIjtcbmltcG9ydCB7IFVJVXRpbHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdWktdXRpbHNcIjtcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktcGFuZWwgXFwke2NvbGxhcHNlZD8ndWktY29sbGFwc2UnOicnfSBcXCR7ZXhwYW5kZWQ/J3VpLWV4cGFuZCc6Jyd9XCIgY3NzLmJpbmQ9XCJ7J21heC1oZWlnaHQnOiBtYXhoZWlnaHQsJ21pbi1oZWlnaHQnOiBtaW5oZWlnaHQsJ2hlaWdodCc6aGVpZ2h0fVwiIGNvbGxhcHNlLnRyaWdnZXI9XCJ0b2dnbGVDb2xsYXBzZSgpXCIgZXhwYW5kLnRyaWdnZXI9XCJleHBhbmQoKVwiIHJlc3RvcmUudHJpZ2dlcj1cImV4cGFuZCgpXCIgY2xvc2UudHJpZ2dlcj1cImNsb3NlKClcIj48c2xvdD48L3Nsb3Q+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXBhbmVsJylcbmV4cG9ydCBjbGFzcyBVSVBhbmVsIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuXG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9ICEhKHRoaXMuY29sbGFwc2VkKSB8fCB0aGlzLmVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIEBiaW5kYWJsZSgpIGhlaWdodCA9ICdhdXRvJztcbiAgQGJpbmRhYmxlKCkgbWluaGVpZ2h0ID0gJ2F1dG8nO1xuICBAYmluZGFibGUoKSBtYXhoZWlnaHQgPSAnYXV0byc7XG5cbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgZXhwYW5kZWQgPSBmYWxzZTtcbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgY29sbGFwc2VkID0gZmFsc2U7XG5cbiAgQGJpbmRhYmxlKCkgYmVmb3JlY2xvc2U6IGFueTtcblxuICBjbG9zZSgpIHtcbiAgICBpZiAoaXNGdW5jdGlvbih0aGlzLmJlZm9yZWNsb3NlKSkge1xuICAgICAgbGV0IHJldCA9IHRoaXMuYmVmb3JlY2xvc2UoKTtcbiAgICAgIGlmIChyZXQgaW5zdGFuY2VvZiBQcm9taXNlKSByZXQudGhlbihiID0+IHtcbiAgICAgICAgaWYgKGIpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVsc2UgaWYgKHJldCAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoVUlFdmVudC5maXJlRXZlbnQoJ2JlZm9yZWNsb3NlJywgdGhpcy5lbGVtZW50KSAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgfVxuICB9XG4gIHJlbW92ZSgpIHtcbiAgICBET00ucmVtb3ZlTm9kZSh0aGlzLmVsZW1lbnQpO1xuICAgIFVJRXZlbnQuZmlyZUV2ZW50KCdjbG9zZScsIHRoaXMuZWxlbWVudClcbiAgfVxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG4gIH1cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgfVxuICByZXN0b3JlKCkge1xuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlQ29sbGFwc2UoKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmNvbGxhcHNlZCA9ICF0aGlzLmNvbGxhcHNlZCwgMjAwKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktcGFuZWwtYm9keVwiIGNzcy5iaW5kPVwieydtYXgtaGVpZ2h0JzogbWF4aGVpZ2h0LCdtaW4taGVpZ2h0JzogbWluaGVpZ2h0LCdmbGV4LWJhc2lzJzpoZWlnaHR9XCI+PHNsb3Q+PC9zbG90PjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1wYW5lbC1ib2R5JylcbmV4cG9ydCBjbGFzcyBVSVBhbmVsQm9keSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdmbGV4JykpIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktZmxleGVkJyk7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdzY3JvbGwnKSkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zY3JvbGwnKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3BhZGRlZCcpKSBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLXBhZC1hbGwnKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktcGFuZWwtZ3JvdXBcIiBjb2xsYXBzZS5kZWxlZ2F0ZT1cInVuY29sbGFwc2UoKVwiPjxzbG90Pjwvc2xvdD48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktcGFuZWwtZ3JvdXAnKVxuZXhwb3J0IGNsYXNzIFVJUGFuZWxHcm91cCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgdGhpcy5hbGxvd3RvZ2dsZSA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCd0b2dnbGUnKTtcbiAgfVxuICBhdHRhY2hlZCgpIHtcbiAgICBpZiAoXy5maW5kKHRoaXMucGFuZWxzLCBbJ2NvbGxhcHNlZCcsIGZhbHNlXSkgPT0gbnVsbCkgdGhpcy5wYW5lbHNbMF0uY29sbGFwc2VkID0gZmFsc2U7XHJcbiAgfVxuICBAY2hpbGRyZW4oJ3VpLXBhbmVsJykgcGFuZWxzO1xuXG4gIHByaXZhdGUgYWxsb3d0b2dnbGUgPSBmYWxzZTtcblxuICBwcml2YXRlIHVuY29sbGFwc2UoKSB7XG4gICAgbGV0IHBhbmVsOiBhbnkgPSBfLmZpbmQodGhpcy5wYW5lbHMsIFsnY29sbGFwc2VkJywgZmFsc2VdKVxuICAgIGlmICh0aGlzLmFsbG93dG9nZ2xlICYmIHBhbmVsKSBwYW5lbC5jb2xsYXBzZWQgPSB0cnVlO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1oZWFkZXJcIj48c2xvdD48L3Nsb3Q+PC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWhlYWRlcicpXG5leHBvcnQgY2xhc3MgVUlIZWFkZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1oZWFkZXItdG9vbFwiPjxidXR0b24gZGlzYWJsZWQuYmluZD1cImRpc2FibGVkXCIgdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwidWktaGVhZGVyLWJ1dHRvbiB1aS1cXCR7dHlwZX1cIiBjbGljay50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIj5cbiAgPHNsb3Q+PHVpLWdseXBoIGdseXBoLmJpbmQ9XCJnbHlwaFwiPjwvdWktZ2x5cGg+PC9zbG90PjwvYnV0dG9uPjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1oZWFkZXItdG9vbCcpXG5leHBvcnQgY2xhc3MgVUlIZWFkZXJUb29sIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Nsb3NlJykpIHRoaXMudHlwZSA9IFwiY2xvc2VcIjtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3JlZnJlc2gnKSkgdGhpcy50eXBlID0gXCJyZWZyZXNoXCI7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb2xsYXBzZScpKSB0aGlzLnR5cGUgPSBcImNvbGxhcHNlXCI7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdleHBhbmQnKSkgdGhpcy50eXBlID0gXCJleHBhbmRcIjtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3Jlc3RvcmUnKSkgdGhpcy50eXBlID0gXCJyZXN0b3JlXCI7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdtaW5pbWl6ZScpKSB0aGlzLnR5cGUgPSBcIm1pbmltaXplXCI7XG5cbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Nsb3NlJykpIHRoaXMuZ2x5cGggPSBcImdseXBoLWRpYWxvZy1jbG9zZVwiO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncmVmcmVzaCcpKSB0aGlzLmdseXBoID0gXCJnbHlwaC1yZWZyZXNoXCI7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb2xsYXBzZScpKSB0aGlzLmdseXBoID0gXCJnbHlwaC1jaGV2cm9uLXVwXCI7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdleHBhbmQnKSkgdGhpcy5nbHlwaCA9IFwiZ2x5cGgtZGlhbG9nLWV4cGFuZFwiO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgncmVzdG9yZScpKSB0aGlzLmdseXBoID0gXCJnbHlwaC1kaWFsb2ctcmVzdG9yZVwiO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnbWluaW1pemUnKSkgdGhpcy5nbHlwaCA9IFwiZ2x5cGgtZGlhbG9nLW1pbmltaXplXCI7XG4gIH1cblxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9ICEhKHRoaXMuZGlzYWJsZWQpO1xyXG4gIH1cbiAgYXR0YWNoZWQoKSB7XG4gICAgaWYgKHRoaXMuZHJvcGRvd24pIHtcbiAgICAgIHRoaXMub2JNb3VzZXVwID0gVUlFdmVudC5zdWJzY3JpYmUoJ21vdXNlY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICAgIGlmIChnZXRQYXJlbnRCeUNsYXNzKGV2dC50YXJnZXQsICd1aS1idXR0b24nKSA9PSB0aGlzLmVsZW1lbnQpIHJldHVybjtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCd1aS1vcGVuJyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZHJvcGRvd24uY2xhc3NMaXN0LmFkZCgndWktZmxvYXRpbmcnKTtcbiAgICAgIHRoaXMudGV0aGVyID0gVUlVdGlscy50ZXRoZXIodGhpcy5lbGVtZW50LCB0aGlzLmRyb3Bkb3duLCB7IHBvc2l0aW9uOiAnYnInIH0pO1xuICAgIH1cclxuICB9XG4gIGRldGFjaGVkKCkge1xuICAgIGlmICh0aGlzLnRldGhlcikgdGhpcy50ZXRoZXIuZGlzcG9zZSgpO1xuICAgIGlmICh0aGlzLm9iTW91c2V1cCkgdGhpcy5vYk1vdXNldXAuZGlzcG9zZSgpO1xuICAgIGlmICh0aGlzLmRyb3Bkb3duKSBET00ucmVtb3ZlTm9kZSh0aGlzLmRyb3Bkb3duKTtcbiAgfVxuXG4gIEBiaW5kYWJsZSgpIGdseXBoID0gJyc7XG4gIEBiaW5kYWJsZSgpIGRyb3Bkb3duO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgdGV0aGVyO1xuICBwcml2YXRlIG9iTW91c2V1cDtcblxuICBwcml2YXRlIHR5cGUgPSAndG9vbCc7XG5cbiAgcHJpdmF0ZSBmaXJlRXZlbnQoZXZ0KSB7XG4gICAgaWYgKGV2dC5idXR0b24gIT0gMCkgcmV0dXJuIHRydWU7XG5cbiAgICBpZiAodGhpcy5kcm9wZG93bikge1xuICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1aS1vcGVuJykpIHtcbiAgICAgICAgVUlFdmVudC5maXJlRXZlbnQoJ21lbnVoaWRlJywgdGhpcy5lbGVtZW50KTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCd1aS1vcGVuJyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKFVJRXZlbnQuZmlyZUV2ZW50KCdtZW51b3BlbicsIHRoaXMuZWxlbWVudCkgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLW9wZW4nKTtcbiAgICAgICAgICB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ3VpLW9wZW4nKTtcbiAgICAgICAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBVSUV2ZW50LmZpcmVFdmVudCh0aGlzLnR5cGUsIHRoaXMuZWxlbWVudCk7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLWhlYWRlci10aXRsZSB1aS1pbmxpbmUtYmxvY2sgdWktY29sLWZpbGxcIj48ZGl2IGNsYXNzPVwidWktdGl0bGUtaWNvblwiPjx1aS1nbHlwaCBnbHlwaC5iaW5kPVwiZ2x5cGhcIiBpZi5iaW5kPVwiZ2x5cGhcIj48L3VpLWdseXBoPjwvZGl2PjxkaXYgY2xhc3M9XCJ1aS10aXRsZVwiPjxzbG90Pjwvc2xvdD48L2Rpdj48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktaGVhZGVyLXRpdGxlJylcbmV4cG9ydCBjbGFzcyBVSUhlYWRlclRpdGxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50Lmhhc0F0dHJpYnV0ZSgnaWNvbi1oaWxpZ2h0JykpIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1pY29uLWhpbGlnaHQnKTtcbiAgfVxuXG4gIEBiaW5kYWJsZSgpIGdseXBoID0gJyc7XG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9
