var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIFiller = (function () {
        function UIFiller() {
        }
        UIFiller = __decorate([
            aurelia_framework_1.customElement('ui-filler'),
            aurelia_framework_1.inlineView('<template class="ui-col-fill"></template>')
        ], UIFiller);
        return UIFiller;
    }());
    exports.UIFiller = UIFiller;
    var UIContainer = (function () {
        function UIContainer(element) {
            this.element = element;
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        UIContainer = __decorate([
            aurelia_framework_1.customElement('ui-container'),
            aurelia_framework_1.inlineView('<template class="ui-container"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIContainer);
        return UIContainer;
    }());
    exports.UIContainer = UIContainer;
    var UIRow = (function () {
        function UIRow(element) {
            this.element = element;
            if (element.hasAttribute('top'))
                element.classList.add('ui-row-top');
            if (element.hasAttribute('middle'))
                element.classList.add('ui-row-middle');
            if (element.hasAttribute('bottom'))
                element.classList.add('ui-row-bottom');
            if (element.hasAttribute('stretch'))
                element.classList.add('ui-row-stretch');
            if (element.hasAttribute('start'))
                element.classList.add('ui-row-start');
            if (element.hasAttribute('center'))
                element.classList.add('ui-row-center');
            if (element.hasAttribute('end'))
                element.classList.add('ui-row-end');
            if (element.hasAttribute('spaced'))
                element.classList.add('ui-row-spaced');
            if (element.hasAttribute('reverse'))
                element.classList.add('ui-row-reverse');
        }
        UIRow = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-row'),
            aurelia_framework_1.inlineView('<template class="ui-row"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIRow);
        return UIRow;
    }());
    exports.UIRow = UIRow;
    var UIColumnRow = (function () {
        function UIColumnRow(element) {
            this.element = element;
            if (element.hasAttribute('top'))
                element.classList.add('ui-row-top');
            if (element.hasAttribute('middle'))
                element.classList.add('ui-row-middle');
            if (element.hasAttribute('bottom'))
                element.classList.add('ui-row-bottom');
            if (element.hasAttribute('stretch'))
                element.classList.add('ui-row-stretch');
            if (element.hasAttribute('start'))
                element.classList.add('ui-row-start');
            if (element.hasAttribute('center'))
                element.classList.add('ui-row-center');
            if (element.hasAttribute('end'))
                element.classList.add('ui-row-end');
            if (element.hasAttribute('spaced'))
                element.classList.add('ui-row-spaced');
            if (element.hasAttribute('reverse'))
                element.classList.add('ui-row-reverse');
        }
        UIColumnRow = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-row-column'),
            aurelia_framework_1.inlineView('<template class="ui-row-vertical"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIColumnRow);
        return UIColumnRow;
    }());
    exports.UIColumnRow = UIColumnRow;
    var UIColumn = (function () {
        function UIColumn(element) {
            this.element = element;
            this.size = '';
            this.width = '';
            if (element.hasAttribute('top'))
                element.classList.add('ui-col-top');
            if (element.hasAttribute('middle'))
                element.classList.add('ui-col-middle');
            if (element.hasAttribute('bottom'))
                element.classList.add('ui-col-bottom');
            if (element.hasAttribute('stretch'))
                element.classList.add('ui-col-stretch');
            if (element.hasAttribute('auto'))
                element.classList.add('ui-col-auto');
            if (element.hasAttribute('fill'))
                element.classList.add('ui-col-fill');
            if (element.hasAttribute('full'))
                element.classList.add('ui-col-full');
            if (element.hasAttribute('form'))
                element.classList.add('ui-col-form');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        UIColumn.prototype.bind = function () {
            for (var _i = 0, _a = this.size.split(' '); _i < _a.length; _i++) {
                var size = _a[_i];
                this.element.classList.add("ui-col-" + size);
            }
            if (this.width)
                this.element['style'].flexBasis = this.width;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "width", void 0);
        UIColumn = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-column'),
            aurelia_framework_1.inlineView('<template class="ui-column"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIColumn);
        return UIColumn;
    }());
    exports.UIColumn = UIColumn;
});
