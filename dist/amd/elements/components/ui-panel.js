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
            this.width = 'auto';
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
        ], UIPanel.prototype, "width", void 0);
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
            aurelia_framework_1.inlineView("<template class=\"ui-panel ${collapsed?'ui-collapse':''} ${expanded?'ui-expand':''}\" css.bind=\"{'max-height': maxheight,'min-height': minheight,'height':height, 'width': width}\" collapse.trigger=\"toggleCollapse()\" expand.trigger=\"expand()\" restore.trigger=\"expand()\" close.trigger=\"close()\"><slot></slot></template>"),
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
            if (element.hasAttribute('compact'))
                element.classList.add('ui-compact');
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
