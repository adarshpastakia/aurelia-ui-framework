"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var UIDrawer = (function () {
    function UIDrawer(element) {
        var _this = this;
        this.element = element;
        this.position = "start";
        this.glyph = 'glyph-arrow-left';
        this.bodyCls = '';
        if (element.hasAttribute('close-on-click'))
            element.addEventListener('mouseup', function (e) { if (e.button == 0)
                _this.closeDrawer(); });
    }
    UIDrawer.prototype.bind = function (bindingContext, overrideContext) {
        if (this.element.hasAttribute('scroll'))
            this.bodyCls += ' ui-scroll';
        if (this.element.hasAttribute('padded'))
            this.bodyCls += ' ui-pad-all';
        if (this.position == 'end')
            this.glyph = 'glyph-arrow-right';
    };
    UIDrawer.prototype.closeDrawer = function () {
        this.element.classList.remove('show');
    };
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDrawer.prototype, "position", void 0);
    UIDrawer = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-drawer ${position}\">\n  <div class=\"ui-drawer-content ui-row-vertical ui-align-stretch\">\n    <a class=\"ui-drawer-close ui-col-auto\" click.trigger=\"closeDrawer()\"><ui-glyph glyph.bind=\"glyph\"></ui-glyph></a>\n    <div class=\"ui-drawer-body ui-col-fill ${bodyCls}\"><slot></slot></div>\n  </div>\n  <div class=\"ui-drawer-shim\" click.trigger=\"closeDrawer()\"></div>\n</template>"),
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
        if (evt.button != 0)
            return true;
        evt.stopPropagation();
        evt.cancelBubble = true;
        if (this.drawer && this.drawer.classList) {
            this.drawer.classList.add('show');
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
        aurelia_framework_1.inlineView('<template class="ui-drawer-toggle ui-link" click.trigger="openDrawer($event)"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>'),
        aurelia_framework_1.customElement('ui-drawer-toggle'),
        __metadata("design:paramtypes", [Element])
    ], UIDrawerToggle);
    return UIDrawerToggle;
}());
exports.UIDrawerToggle = UIDrawerToggle;
