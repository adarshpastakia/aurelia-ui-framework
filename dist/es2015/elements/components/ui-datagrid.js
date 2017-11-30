var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, children, inlineView } from 'aurelia-framework';
import { Repeat } from 'aurelia-templating-resources';
import * as _ from "lodash";
let UIDatagrid = class UIDatagrid {
    constructor(element) {
        this.element = element;
        this.cols = [];
        this.colHead = [];
        this.colLocked = [];
        this.rowCounter = false;
        this.rowExpander = false;
        this.repeater = Repeat;
        this.rowCounter = element.hasAttribute('row-counter');
        this.rowExpander = element.hasAttribute('row-expander');
        if (!element.hasAttribute('scroll'))
            this.element.classList.add('ui-auto-size');
    }
    columnsChanged(c) {
        this.colHead = _.sortBy(this.columns, 'locked');
        let cols = _.sortBy(_.flatMap(this.columns, c => c.columns || [c]), 'locked');
        this.cols = _.filter(cols, (c) => c.locked == 1);
        this.colLocked = _.filter(cols, (c) => c.locked == 0);
    }
};
__decorate([
    children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "columns", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "dataSource", void 0);
UIDatagrid = __decorate([
    autoinject(),
    inlineView(`<template class="ui-datagrid"><div class="ui-hide"><slot></slot></div>
<div repeater.for="row of dataSource.data">\${row | json}</div>
</template>`),
    customElement('ui-datagrid'),
    __metadata("design:paramtypes", [Element])
], UIDatagrid);
export { UIDatagrid };
