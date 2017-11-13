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
            aurelia_framework_1.inlineView('<template class="ui-column-fill"></template>')
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
                element.classList.add('ui-align-start');
            else if (element.hasAttribute('middle'))
                element.classList.add('ui-align-center');
            else if (element.hasAttribute('bottom'))
                element.classList.add('ui-align-end');
            else if (element.hasAttribute('stretch'))
                element.classList.add('ui-align-stretch');
            if (element.hasAttribute('start'))
                element.classList.add('ui-justify-start');
            else if (element.hasAttribute('center'))
                element.classList.add('ui-justify-center');
            else if (element.hasAttribute('end'))
                element.classList.add('ui-justify-end');
            else if (element.hasAttribute('between'))
                element.classList.add('ui-justify-betweeen');
            else if (element.hasAttribute('around'))
                element.classList.add('ui-justify-around');
            if (!element.hasAttribute('nogutter'))
                element.classList.add('ui-gutter');
            if (element.hasAttribute('nowrap'))
                element.classList.add('ui-nowrap');
            if (element.hasAttribute('vertical-reverse'))
                element.classList.add('ui-row-v-reverse');
            else if (element.hasAttribute('vertical'))
                element.classList.add('ui-row-v');
            else if (element.hasAttribute('reverse'))
                element.classList.add('ui-row-h-reverse');
            else
                element.classList.add('ui-row-h');
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
    var UIColumn = (function () {
        function UIColumn(element) {
            this.element = element;
            this.size = '';
            this.width = '';
            this.row = '';
            if (element.hasAttribute('top'))
                element.classList.add('ui-self-top');
            else if (element.hasAttribute('middle'))
                element.classList.add('ui-self-middle');
            else if (element.hasAttribute('bottom'))
                element.classList.add('ui-self-bottom');
            else if (element.hasAttribute('stretch'))
                element.classList.add('ui-self-stretch');
            if (element.hasAttribute('auto'))
                element.classList.add('ui-column-auto');
            else if (element.hasAttribute('fill'))
                element.classList.add('ui-column-fill');
            else if (element.hasAttribute('full'))
                element.classList.add('ui-column-full');
            else if (element.hasAttribute('form'))
                element.classList.add('ui-column-form');
        }
        UIColumn.prototype.bind = function () {
            if (this.size.length) {
                for (var _i = 0, _a = this.size.split(' '); _i < _a.length; _i++) {
                    var size = _a[_i];
                    this.element.classList.add("ui-column-" + size);
                }
            }
            if (this.width)
                this.element['style'].flexBasis = this.width;
            if (this.row.length) {
                for (var _b = 0, _c = this.row.split(' '); _b < _c.length; _b++) {
                    var row = _c[_b];
                    this.element.classList.add("ui-row");
                    if (row === 'top')
                        this.element.classList.add('ui-align-start');
                    else if (row === 'middle')
                        this.element.classList.add('ui-align-center');
                    else if (row === 'bottom')
                        this.element.classList.add('ui-align-end');
                    else if (row === 'stretch')
                        this.element.classList.add('ui-align-stretch');
                    if (row === 'start')
                        this.element.classList.add('ui-justify-start');
                    else if (row === 'center')
                        this.element.classList.add('ui-justify-center');
                    else if (row === 'end')
                        this.element.classList.add('ui-justify-end');
                    else if (row === 'between')
                        this.element.classList.add('ui-justify-betweeen');
                    else if (row === 'around')
                        this.element.classList.add('ui-justify-around');
                    if (row !== 'nogutter')
                        this.element.classList.add('ui-gutter');
                    if (row === 'nowrap')
                        this.element.classList.add('ui-nowrap');
                    if (row === 'vertical-reverse')
                        this.element.classList.add('ui-row-v-reverse');
                    else if (row === 'vertical')
                        this.element.classList.add('ui-row-v');
                    else if (row === 'reverse')
                        this.element.classList.add('ui-row-h-reverse');
                    else if (row === 'row')
                        this.element.classList.add('ui-row-h');
                }
            }
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "row", void 0);
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
