'use strict';

var __chunk_1 = require('./chunk.js');
var aureliaFramework = require('aurelia-framework');

var UICol = (function () {
    function UICol(element) {
        this.element = element;
        this.size = "";
        this.width = "unset";
        this.maxWidth = "unset";
        this.minWidth = "unset";
        this.align = "";
        if (element.hasAttribute("content-stretch")) {
            element.classList.add("content-stretch");
        }
    }
    Object.defineProperty(UICol.prototype, "sizes", {
        get: function () {
            return this.size
                .split(" ")
                .map(function (s) { return "ui-col--" + s.trim(); })
                .join(" ");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UICol.prototype, "classes", {
        get: function () {
            var classes = ["ui-col"];
            if (this.align) {
                classes.push("ui-col--" + this.align);
            }
            if (this.size) {
                classes.push(this.sizes);
            }
            return classes.join(" ");
        },
        enumerable: true,
        configurable: true
    });
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UICol.prototype, "size", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UICol.prototype, "width", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UICol.prototype, "maxWidth", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UICol.prototype, "minWidth", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UICol.prototype, "align", void 0);
    __chunk_1.__decorate([
        aureliaFramework.computedFrom("align", "size"),
        __chunk_1.__metadata("design:type", String),
        __chunk_1.__metadata("design:paramtypes", [])
    ], UICol.prototype, "classes", null);
    UICol = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-col"),
        aureliaFramework.inlineView("<template class.bind='classes' css.bind=\"{ width, maxWidth, minWidth}\"><slot></slot></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UICol);
    return UICol;
}());

var UIContainer = (function () {
    function UIContainer(element) {
        this.element = element;
        if (element.hasAttribute("fluid")) {
            element.classList.add("ui-container--fluid");
        }
    }
    UIContainer = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-container"),
        aureliaFramework.inlineView("<template class='ui-container'><slot></slot></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIContainer);
    return UIContainer;
}());

var UIGrid = (function () {
    function UIGrid(element) {
        this.element = element;
        this.size = "nm";
    }
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIGrid.prototype, "size", void 0);
    UIGrid = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-grid"),
        aureliaFramework.inlineView("<template class='ui-grid ui-grid--${size}'><slot></slot></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIGrid);
    return UIGrid;
}());

var UIRow = (function () {
    function UIRow(element) {
        this.element = element;
        this.halign = "";
        this.valign = "";
        if (element.hasAttribute("vertical") && element.hasAttribute("reverse")) {
            element.classList.add("ui-row--vertical--reverse");
        }
        else if (element.hasAttribute("vertical")) {
            element.classList.add("ui-row--vertical");
        }
        else if (element.hasAttribute("reverse")) {
            element.classList.add("ui-row--reverse");
        }
        if (element.hasAttribute("nowrap")) {
            element.classList.add("ui-row--nowrap");
        }
        if (element.hasAttribute("auto")) {
            element.classList.add("ui-row--auto");
        }
    }
    Object.defineProperty(UIRow.prototype, "classes", {
        get: function () {
            var classes = ["ui-row"];
            if (this.halign) {
                classes.push("ui-row--" + this.halign);
            }
            if (this.valign) {
                classes.push("ui-row--" + this.valign);
            }
            return classes.join(" ");
        },
        enumerable: true,
        configurable: true
    });
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIRow.prototype, "halign", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIRow.prototype, "valign", void 0);
    __chunk_1.__decorate([
        aureliaFramework.computedFrom("halign", "valign"),
        __chunk_1.__metadata("design:type", String),
        __chunk_1.__metadata("design:paramtypes", [])
    ], UIRow.prototype, "classes", null);
    UIRow = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-row"),
        aureliaFramework.inlineView("<template class.bind='classes'><slot></slot></template>"),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIRow);
    return UIRow;
}());

var Responsive = [UIContainer, UIRow, UICol, UIGrid];

exports.Responsive = Responsive;
//# sourceMappingURL=ui-responsive.js.map
