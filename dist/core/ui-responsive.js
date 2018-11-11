/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, computedFrom, customElement, inlineView } from "aurelia-framework";
var UIContainer = /** @class */ (function () {
    function UIContainer(element) {
        this.element = element;
        if (element.hasAttribute("fluid")) {
            element.classList.add("ui-container--fluid");
        }
    }
    UIContainer = __decorate([
        autoinject(),
        customElement("ui-container"),
        inlineView("<template class='ui-container'><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIContainer);
    return UIContainer;
}());
export { UIContainer };
var UIGrid = /** @class */ (function () {
    function UIGrid(element) {
        this.element = element;
        this.size = "nm";
    }
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIGrid.prototype, "size", void 0);
    UIGrid = __decorate([
        autoinject(),
        customElement("ui-grid"),
        inlineView("<template class='ui-grid ui-grid--${size}'><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIGrid);
    return UIGrid;
}());
export { UIGrid };
var UIRow = /** @class */ (function () {
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
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIRow.prototype, "halign", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIRow.prototype, "valign", void 0);
    __decorate([
        computedFrom("halign", "valign"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], UIRow.prototype, "classes", null);
    UIRow = __decorate([
        autoinject(),
        customElement("ui-row"),
        inlineView("<template class.bind='classes'><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIRow);
    return UIRow;
}());
export { UIRow };
var UIColumn = /** @class */ (function () {
    function UIColumn(element) {
        this.element = element;
        this.size = "";
        this.width = "auto";
        this.maxWidth = "none";
        this.minWidth = "none";
        this.align = "";
    }
    Object.defineProperty(UIColumn.prototype, "sizes", {
        get: function () {
            return this.size
                .split(" ")
                .map(function (s) { return "ui-col--" + s.trim(); })
                .join(" ");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIColumn.prototype, "classes", {
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
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIColumn.prototype, "size", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIColumn.prototype, "width", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIColumn.prototype, "maxWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIColumn.prototype, "minWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIColumn.prototype, "align", void 0);
    __decorate([
        computedFrom("align", "size"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], UIColumn.prototype, "classes", null);
    UIColumn = __decorate([
        autoinject(),
        customElement("ui-col"),
        inlineView("<template class.bind='classes' css.bind=\"{ width, maxWidth, minWidth}\"><slot></slot></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIColumn);
    return UIColumn;
}());
export { UIColumn };
