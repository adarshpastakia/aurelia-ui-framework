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
var ui_event_1 = require("../../utils/ui-event");
var _ = require("lodash");
var UIDgRow = (function () {
    function UIDgRow() {
    }
    UIDgRow.prototype.bind = function (bindingContext, overrideContext) {
        this.cols = overrideContext['parentOverrideContext'].bindingContext.cols;
    };
    return UIDgRow;
}());
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "record", void 0);
UIDgRow = __decorate([
    aurelia_framework_1.inlineView("<template>\n  <td repeat.for=\"col of cols\" class=\"${col.locked==0?'ui-locked':''} ${col.align}\" css.bind=\"{left: col.left+'px'}\">\n  <div if.bind=\"col.type=='normal'\"><span class=\"${col.class}\" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>\n  <div if.bind=\"col.type=='glyph'\" title.bind=\"col.getTooltip(record[col.dataId],record)\"><ui-glyph class=\"${col.class} ${col.getGlyph(record[col.dataId],record)}\" glyph.bind=\"col.getGlyph(record[col.dataId],record)\"></ui-glyph></div>\n  <div if.bind=\"col.type=='link'\"><a class=\"ui-link ${col.class} ${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}\" click.trigger=\"col.fireClick($event,record[col.dataId],record)\"><ui-glyph glyph.bind=\"col.getGlyph(record[col.dataId],record)\" if.bind=\"col.glyph\"></ui-glyph> <span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span></a></div>\n  <div if.bind=\"col.type=='button'\" class=\"btn-fix\"><ui-button click.trigger=\"col.fireClick($event,record[col.dataId],record)\" theme.bind=\"col.getTheme(record[col.dataId],record)\" small square glyph.bind=\"col.getGlyph(record[col.dataId],record)\" disabled.bind=\"col.isDisabled(record[col.dataId],record)\" dropdown.bind=\"dropdown\" menuopen.trigger=\"col.fireMenuOpen($event, record)\"><span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span></ui-button></div>\n  </td>\n  <td class=\"ui-expander\"><div>&nbsp;</div></td>\n</template>"),
    aurelia_framework_1.customElement('ui-dg-row')
], UIDgRow);
exports.UIDgRow = UIDgRow;
var UIDatagrid = (function () {
    function UIDatagrid(element) {
        this.element = element;
        this.data = [];
        this.loaded = true;
        this.summaryRow = false;
        this.sortColumn = '';
        this.sortOrder = '';
        this.perPage = 50;
        this.cols = [];
        this.paged = [];
        this.filtered = [];
        this.virtual = false;
        this.isBusy = false;
        this.resizing = false;
        this.virtual = element.hasAttribute('virtual');
        if (!element.hasAttribute('scroll'))
            this.element.classList.add('ui-auto-size');
    }
    UIDatagrid.prototype.bind = function (bindingContext, overrideContext) {
        var _this = this;
        this.columnsChanged(this.columns);
        this.dataChanged(this.data);
        if (this.pager) {
            if (!(this.pager instanceof UIPager))
                throw new Error('Pager must be instance of UIPager');
            this.obPageChange = ui_event_1.UIEvent.observe(this.pager, 'page').subscribe(function () { return _this.makePage(); });
        }
    };
    UIDatagrid.prototype.attached = function () {
        this.scrolling();
    };
    UIDatagrid.prototype.detached = function () {
        if (this.obPageChange)
            this.obPageChange.dispose();
    };
    UIDatagrid.prototype.columnsChanged = function (newValue) {
        this.cols = _.sortBy(this.columns, 'locked');
    };
    UIDatagrid.prototype.dataChanged = function (newValue) {
        var _this = this;
        ui_event_1.UIEvent.queueTask(function () {
            if (_this.pager) {
                _this.pager.page = 0;
                _this.pager.totalPages = Math.ceil(_this.data.length / _this.perPage);
            }
            _this.filter();
            _this.scrolling();
        });
    };
    UIDatagrid.prototype.scrolling = function () {
        this.dgHead.style.transform = "translateX(-" + this.scroller.scrollLeft + "px)";
        if (this.dgFoot)
            this.dgFoot.style.transform = this.dgHead.style.transform;
    };
    UIDatagrid.prototype.filter = function () {
        this.filtered = this.data;
        this.makePage();
    };
    UIDatagrid.prototype.makePage = function () {
        var _this = this;
        this.isBusy = true;
        this.paged = [];
        ui_event_1.UIEvent.queueTask(function () {
            var data = _.orderBy(_this.filtered, [_this.sortColumn, 'ID', 'id'], [_this.sortOrder, _this.sortOrder, _this.sortOrder]);
            if (_this.pager) {
                data = _.slice(data, _this.pager.page * _this.perPage, (_this.pager.page * _this.perPage) + _this.perPage);
            }
            _this.paged = data;
            _this.loaded = true;
            ui_event_1.UIEvent.queueTask(function () { return _this.isBusy = false; });
        });
    };
    UIDatagrid.prototype.doSort = function (col) {
        var _this = this;
        if (!col.sortable)
            return;
        if (this.sortColumn != col.dataId)
            this.sortOrder = 'asc';
        if (this.sortColumn == col.dataId)
            this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
        this.sortColumn = col.dataId;
        ui_event_1.UIEvent.queueTask(function () { return _this.makePage(); });
    };
    UIDatagrid.prototype.calculateWidth = function (cols) {
        var w = 0;
        _.forEach(cols, function (c) { c.left = w; w += c.getWidth(); });
        return (this.tableWidth = (w + 20) + 'px');
    };
    UIDatagrid.prototype.fireSelect = function (record) {
        ui_event_1.UIEvent.fireEvent('rowselect', this.element, ({ record: record }));
    };
    UIDatagrid.prototype.resizeColumn = function (evt, col, next) {
        var _this = this;
        if (evt.button != 0)
            return true;
        this.diff = 0;
        this.colResize = col;
        this.colNext = next;
        this.resizing = true;
        this.startX = (evt.x || evt.clientX);
        this.ghost.style.left = (col.left + parseInt(col.width) - (col.locked == 0 ? 0 : this.scroller.scrollLeft)) + 'px';
        document.addEventListener('mouseup', this.stop = function (evt) { return _this.resizeEnd(evt); });
        document.addEventListener('mousemove', this.move = function (evt) { return _this.resize(evt); });
    };
    UIDatagrid.prototype.resize = function (evt) {
        var x = (evt.x || evt.clientX) - this.startX;
        if (x < 0 && (parseInt(this.colResize.width) + this.diff) <= (this.colResize.minWidth || 80))
            return;
        if (x > 0 && (parseInt(this.colResize.width) + this.diff) >= (500))
            return;
        this.startX = (evt.x || evt.clientX);
        this.diff += x;
        this.ghost.style.left = (parseInt(this.ghost.style.left) + x) + 'px';
    };
    UIDatagrid.prototype.resizeEnd = function (evt) {
        this.resizing = false;
        if (this.colNext)
            this.colNext.left += this.diff;
        this.colResize.width = (parseInt(this.colResize.width) + this.diff);
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('mouseup', this.stop);
    };
    return UIDatagrid;
}());
__decorate([
    aurelia_framework_1.children('ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "columns", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "data", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "loaded", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "summaryRow", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "sortColumn", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "sortOrder", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "pager", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "perPage", void 0);
UIDatagrid = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-datagrid\"><div class=\"ui-hidden\"><slot></slot></div>\n<div show.bind=\"resizing\" ref=\"ghost\" class=\"ui-dg-ghost\"></div>\n<div show.bind=\"loaded && (!data || data.length==0)\" class=\"ui-dg-empty\"><slot name=\"dg-empty\"></slot></div>\n<div>\n<table ref=\"dgHead\" width.bind=\"tableWidth\" css.bind=\"{'table-layout': tableWidth?'fixed':'auto' }\">\n  <colgroup>\n    <col repeat.for=\"col of cols\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n  <thead><tr>\n    <td repeat.for=\"col of cols\" click.trigger=\"doSort(col)\" class=\"${col.sortable?'ui-sortable':''} ${col.locked==0?'ui-locked':''}\" css.bind=\"{left: col.left+'px'}\"><div>\n      <span class=\"ui-dg-header\" innerhtml.bind='col.getTitle()'></span>\n      <span class=\"ui-filter\" if.bind=\"col.filter\"><ui-glyph glyph=\"glyph-funnel\"></ui-glyph></span>\n      <span class=\"ui-sort ${col.dataId==sortColumn ? sortOrder:''}\" if.bind=\"col.sortable\"></span>\n      <span class=\"ui-resizer\" if.bind=\"col.resize\" mousedown.trigger=\"resizeColumn($event,col,cols[$index+1])\"></span>\n    </div></td>\n    <td class=\"ui-expander\"><div><span class=\"ui-dg-header\">&nbsp;</span></div></td>\n  </tr></thead>\n</table>\n</div>\n<div class=\"ui-dg-wrapper\" ref=\"scroller\" scroll.trigger=\"scrolling() & debounce:1\">\n<table width.bind=\"calculateWidth(cols,resizing)\" css.bind=\"{'table-layout': tableWidth?'fixed':'auto' }\">\n  <colgroup>\n    <col repeat.for=\"col of cols\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n  <tbody>\n    <tr if.bind=\"!virtual\" class=\"${$even?'even':'odd'}\" as-element=\"ui-dg-row\" record.bind=\"record\" repeat.for=\"record of paged\" click.delegate=\"fireSelect($parent.selected=record)\"\n      class=\"${$parent.selected==record?'ui-selected':''}\"></tr>\n\n    <tr if.bind=\"virtual\" class=\"${$even?'even':'odd'}\" as-element=\"ui-dg-row\" record.bind=\"record\" virtual-repeat.for=\"record of paged\" click.delegate=\"fireSelect($parent.selected=record)\"\n      class=\"${$parent.selected==record?'ui-selected':''}\"></tr>\n\n    <tr class=\"filler\"><td repeat.for=\"col of cols\" class=\"${col.locked==0?'ui-locked':''}\" css.bind=\"{left: col.left+'px'}\"><div>&nbsp;</div></td><td class=\"ui-expander\"><div>&nbsp;</div></td></tr>\n  </tbody>\n</table></div>\n<div>\n<table ref=\"dgFoot\" width.bind=\"tableWidth\" css.bind=\"{'table-layout': tableWidth?'fixed':'auto' }\">\n  <colgroup>\n    <col repeat.for=\"col of cols\" data-index.bind=\"$index\" width.bind=\"col.width\"/>\n    <col/>\n  </colgroup>\n\n  <tfoot if.bind=\"summaryRow && data && data.length!=0\"><tr>\n    <td repeat.for=\"col of cols\" class=\"${col.locked==0?'ui-locked':''} ${col.align}\" css.bind=\"{left: col.left+'px'}\"><div innerhtml.bind='col.getSummary(summaryRow, filtered)'></div></td>\n    <td class=\"ui-expander\"><div>&nbsp;</div></td>\n  </tr></tfoot>\n</table>\n</div>\n<div class=\"ui-dg-loader\" if.bind=\"isBusy\">\n  <div class=\"ui-loader-div\">\n    <ui-glyph class=\"ui-anim-loader\" glyph=\"glyph-loader\"></ui-glyph>\n  </div>\n</div></template>"),
    aurelia_framework_1.customElement('ui-datagrid'),
    __metadata("design:paramtypes", [Element])
], UIDatagrid);
exports.UIDatagrid = UIDatagrid;
var UIDGEmpty = (function () {
    function UIDGEmpty() {
    }
    return UIDGEmpty;
}());
UIDGEmpty = __decorate([
    aurelia_framework_1.containerless(),
    aurelia_framework_1.customElement('ui-dg-empty'),
    aurelia_framework_1.inlineView("<template><div slot=\"dg-empty\"><slot></slot></div></template>")
], UIDGEmpty);
exports.UIDGEmpty = UIDGEmpty;
var UIPager = (function () {
    function UIPager(element) {
        this.element = element;
        this.page = 0;
        this.style = "chevron";
        this.totalPages = 1;
    }
    UIPager.prototype.fireChange = function () {
        ui_event_1.UIEvent.fireEvent('change', this.element, this.page);
    };
    return UIPager;
}());
__decorate([
    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIPager.prototype, "page", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIPager.prototype, "style", void 0);
__decorate([
    aurelia_framework_1.bindable(),
    __metadata("design:type", Object)
], UIPager.prototype, "totalPages", void 0);
UIPager = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-pager\">\n  <a class=\"pg-first ${page==0?'disabled':''}\" click.trigger=\"fireChange(page=0)\"><ui-glyph glyph=\"glyph-${style}-double-left\"></ui-glyph></a>\n  <a class=\"pg-prev ${page==0?'disabled':''}\" click.trigger=\"fireChange(page=page-1)\" click.trigger=\"fireChange(page=totalPages)\"><ui-glyph glyph=\"glyph-${style}-left\"></ui-glyph></a>\n  <span class=\"pg-input\">${page+1} of ${totalPages}</span>\n  <a class=\"pg-next ${page+1>=totalPages?'disabled':''}\" click.trigger=\"fireChange(page=page+1)\"><ui-glyph glyph=\"glyph-${style}-right\"></ui-glyph></a>\n  <a class=\"pg-last ${page+1>=totalPages?'disabled':''}\" click.trigger=\"fireChange(page=totalPages-1)\"><ui-glyph glyph=\"glyph-${style}-double-right\"></ui-glyph></a>\n</template>"),
    aurelia_framework_1.customElement('ui-pager'),
    __metadata("design:paramtypes", [Element])
], UIPager);
exports.UIPager = UIPager;
var UIDGFilter = (function () {
    function UIDGFilter(element) {
        this.element = element;
    }
    return UIDGFilter;
}());
UIDGFilter = __decorate([
    aurelia_framework_1.autoinject(),
    aurelia_framework_1.inlineView("<template class=\"ui-filter\"></template>"),
    aurelia_framework_1.customElement('ui-dg-filter'),
    __metadata("design:paramtypes", [Element])
], UIDGFilter);
exports.UIDGFilter = UIDGFilter;
