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
