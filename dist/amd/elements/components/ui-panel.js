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
    var UIPanel = (function () {
        function UIPanel(element) {
            this.element = element;
            this.height = 'auto';
            this.collapsed = false;
            this.collapsed = element.hasAttribute('collapsed');
        }
        UIPanel.prototype.close = function () {
            aurelia_framework_1.DOM.removeNode(this.element);
        };
        UIPanel.prototype.collapse = function () {
            this.collapsed = true;
        };
        UIPanel.prototype.expand = function () {
            this.collapsed = false;
        };
        UIPanel.prototype.toggleCollapse = function () {
            var _this = this;
            setTimeout(function () { return _this.collapsed = !_this.collapsed; }, 200);
        };
        return UIPanel;
    }());
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIPanel.prototype, "height", void 0);
    UIPanel = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-panel ${collapsed?'ui-collapse':''}\" css.bind=\"{'height':height}\" collapse.trigger=\"toggleCollapse()\" close.trigger=\"close()\"><slot></slot></template>"),
        aurelia_framework_1.customElement('ui-panel'),
        __metadata("design:paramtypes", [Element])
    ], UIPanel);
    exports.UIPanel = UIPanel;
    var UIPanelBody = (function () {
        function UIPanelBody(element) {
            this.element = element;
            this.height = 'auto';
            this.maxHeight = 'auto';
            if (element.hasAttribute('flex'))
                element.classList.add('ui-flexed');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        return UIPanelBody;
    }());
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIPanelBody.prototype, "height", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIPanelBody.prototype, "maxHeight", void 0);
    UIPanelBody = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-panel-body\" css.bind=\"{'max-height': maxHeight,'flex-basis':height}\"><slot></slot></template>"),
        aurelia_framework_1.customElement('ui-panel-body'),
        __metadata("design:paramtypes", [Element])
    ], UIPanelBody);
    exports.UIPanelBody = UIPanelBody;
    var UIPanelGroup = (function () {
        function UIPanelGroup(element) {
            this.element = element;
        }
        UIPanelGroup.prototype.uncollapse = function () {
        };
        return UIPanelGroup;
    }());
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
    exports.UIPanelGroup = UIPanelGroup;
    var UIHeader = (function () {
        function UIHeader(element) {
            this.element = element;
            this.theme = 'default';
            if (element.hasAttribute('primary'))
                this.theme = 'primary';
            else if (element.hasAttribute('secondary'))
                this.theme = 'secondary';
            else if (element.hasAttribute('dark'))
                this.theme = 'dark';
            else if (element.hasAttribute('light'))
                this.theme = 'light';
            else if (element.hasAttribute('info'))
                this.theme = 'info';
            else if (element.hasAttribute('danger'))
                this.theme = 'danger';
            else if (element.hasAttribute('success'))
                this.theme = 'success';
            else if (element.hasAttribute('warning'))
                this.theme = 'warning';
        }
        return UIHeader;
    }());
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIHeader.prototype, "theme", void 0);
    UIHeader = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-header ${theme}\"><slot></slot></template>"),
        aurelia_framework_1.customElement('ui-header'),
        __metadata("design:paramtypes", [Element])
    ], UIHeader);
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
            this.disabled = isTrue(this.disabled);
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
        return UIHeaderTool;
    }());
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
    exports.UIHeaderTool = UIHeaderTool;
    var UIHeaderTitle = (function () {
        function UIHeaderTitle(element) {
            this.element = element;
            this.glyph = '';
        }
        return UIHeaderTitle;
    }());
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIHeaderTitle.prototype, "glyph", void 0);
    UIHeaderTitle = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-header-title ui-inline-block ui-col-fill\"><ui-glyph glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>&nbsp;<slot></slot></template>"),
        aurelia_framework_1.customElement('ui-header-title'),
        __metadata("design:paramtypes", [Element])
    ], UIHeaderTitle);
    exports.UIHeaderTitle = UIHeaderTitle;
});
