var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDgCell = (function () {
        function UIDgCell(element, container, compiler) {
            this.element = element;
            this.container = container;
            this.compiler = compiler;
        }
        UIDgCell.prototype.attached = function () {
            if (this.element.innerHTML)
                return;
            var template = '';
            if (this.type == 'subview') {
                if (isFunction(this.parent.subview))
                    template = this.parent.subview({ record: this.record });
                else
                    template = this.parent.subview;
            }
            else if (this.col.type == 'normal')
                template = "<span class=\"${col.class}\" innerhtml.bind='col.getValue(record[col.dataId],record)'></span>";
            else if (this.col.type == 'glyph')
                template = "<div title.bind=\"col.getTooltip(record[col.dataId],record)\">\n        <ui-glyph class=\"${col.class} ${col.getGlyph(record[col.dataId],record)}\" glyph.bind=\"col.getGlyph(record[col.dataId],record)\"></ui-glyph>\n        </div>";
            else if (this.col.type == 'link')
                template = "<a class=\"ui-link ${col.class} ${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}\" click.trigger=\"col.fireClick($event,record[col.dataId],record)\" show.bind=\"col.isVisible(record[col.dataId],record)\">\n          <ui-glyph glyph.bind=\"col.getGlyph(record[col.dataId],record)\" if.bind=\"col.glyph\"></ui-glyph>\n          <span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span>\n        </a>";
            else if (this.col.type == 'button') {
                template = "<ui-button click.trigger=\"col.fireClick($event,record[col.dataId],record)\" show.bind=\"col.isVisible(record[col.dataId],record)\" theme.bind=\"col.getTheme(record[col.dataId],record)\" small square glyph.bind=\"col.getGlyph(record[col.dataId],record)\" disabled.bind=\"col.isDisabled(record[col.dataId],record)\" dropdown.bind=\"col.dropdown\" menuopen.trigger=\"col.fireMenuOpen($event, record)\">\n          <span innerhtml.bind=\"col.getLabel(record[col.dataId],record)\"></span>\n        </ui-button>";
                this.element.classList.add('btn-fix');
            }
            var viewFactory = this.compiler.compile("<template>" + template + "</template>");
            var view = viewFactory.create(this.container);
            view.bind(this);
            this.slot = new aurelia_framework_1.ViewSlot(this.element, true);
            this.slot.add(view);
            this.slot.attached();
        };
        UIDgCell.prototype.bind = function () {
            if (this.slot)
                this.slot.attached();
        };
        UIDgCell.prototype.detached = function () {
            if (this.slot)
                this.slot.detached();
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgCell.prototype, "col", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgCell.prototype, "type", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgCell.prototype, "record", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgCell.prototype, "parent", void 0);
        UIDgCell = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template></template>"),
            aurelia_framework_1.customElement('ui-dg-cell'),
            __metadata("design:paramtypes", [Element, aurelia_framework_1.Container, aurelia_framework_1.ViewCompiler])
        ], UIDgCell);
        return UIDgCell;
    }());
    exports.UIDgCell = UIDgCell;
    var UIDgRow = (function () {
        function UIDgRow(element) {
            this.element = element;
            this.level = 0;
            this.last = false;
        }
        UIDgRow.prototype.bind = function (bindingContext, overrideContext) {
            if (this.level > 0 && !overrideContext.$first && overrideContext.$last)
                this.last = true;
        };
        UIDgRow.prototype.indexChanged = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                if (_this.rowExpand && _this.parent.expandWidth < _this.rowExpand.offsetWidth)
                    _this.parent.expandWidth = _this.rowExpand.offsetWidth;
                if (_this.rowCounter && _this.parent.counterWidth < _this.rowCounter.offsetWidth)
                    _this.parent.counterWidth = _this.rowCounter.offsetWidth;
            });
        };
        UIDgRow.prototype.attached = function () {
            if (this.rowExpand && this.parent.expandWidth < this.rowExpand.offsetWidth)
                this.parent.expandWidth = this.rowExpand.offsetWidth;
            if (this.rowCounter && this.parent.counterWidth < this.rowCounter.offsetWidth)
                this.parent.counterWidth = this.rowCounter.offsetWidth;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgRow.prototype, "level", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgRow.prototype, "index", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgRow.prototype, "record", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgRow.prototype, "parent", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDgRow.prototype, "odd", void 0);
        UIDgRow = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template><div class=\"ui-dg-row level-${level} ${record.isOpen?'ui-expanded':''} ${parent.selected==record?'ui-selected':''} ${odd?'even':'odd'} ${last?'last':''}\" click.trigger=\"parent.fireSelect(parent.selected=record)\">\n    <div class=\"ui-dg-lock-holder\" css.bind=\"{transform: 'translateX('+parent.scrollLeft+'px)'}\">\n      <div class=\"ui-dg-expander\" if.bind=\"parent.rowExpander\" ref=\"rowExpand\" click.trigger=\"$event.stopPropagation()\" css.bind=\"{'min-width': parent.expandWidth+'px'}\">\n        <ui-glyph glyph=\"glyph\" repeat.for=\"i of level\"></ui-glyph>\n        <a click.trigger=\"record.isOpen=!record.isOpen\" if.bind=\"record.subdata||parent.subview\"><ui-glyph glyph=\"${record.isOpen?'glyph-icon-minus':'glyph-icon-plus'}\"></ui-glyph></a>\n      </div>\n      <div class=\"ui-dg-expander ui-text-center\" if.bind=\"parent.rowCounter\" click.trigger=\"$event.stopPropagation()\" ref=\"rowCounter\" css.bind=\"{'min-width': parent.counterWidth+'px'}\">${index}</div>\n      <ui-dg-cell class=\"ui-dg-cell ${col.align}\" repeat.for=\"col of parent.colLocked\" css.bind=\"{width:col.getWidth(col.width)+'px'}\" col.bind=\"col\" parent.bind=\"parent\" record.bind=\"record\">\n      </ui-dg-cell>\n    </div>\n    <ui-dg-cell class=\"ui-dg-cell ${col.align}\" repeat.for=\"col of parent.cols\" css.bind=\"{width:col.getWidth(col.width)+'px'}\" col.bind=\"col\" parent.bind=\"parent\" record.bind=\"record\">\n    </ui-dg-cell>\n  </div>\n  <ui-dg-row containerless if.bind=\"!parent.subview&&record.subdata&&record.isOpen\" level.bind=\"level+1\" parent.bind=\"parent\" record.bind=\"rec\" index.bind=\"$index\" odd.bind=\"$odd\" repeat.for=\"rec of record.subdata\"></ui-dg-row>\n\n  <div class=\"ui-dg-row\" if.bind=\"parent.subview && record.isOpen\" css.bind=\"{transform: 'translateX('+parent.scrollLeft+'px)'}\">\n    <div class=\"ui-dg-expander\" if.bind=\"parent.rowExpander\" click.trigger=\"$event.stopPropagation()\" css.bind=\"{'min-width': parent.expandWidth+'px'}\"></div>\n    <div class=\"ui-dg-expander ui-text-center\" if.bind=\"parent.rowCounter\" click.trigger=\"$event.stopPropagation()\" css.bind=\"{'min-width': parent.counterWidth+'px'}\"></div>\n    <ui-dg-cell class=\"ui-dg-subview\" parent.bind=\"parent\" record.bind=\"record\" type=\"subview\"></ui-dg-cell>\n  </div>\n</template>"),
            aurelia_framework_1.customElement('ui-dg-row'),
            __metadata("design:paramtypes", [Element])
        ], UIDgRow);
        return UIDgRow;
    }());
    exports.UIDgRow = UIDgRow;
    var UIDatagrid = (function () {
        function UIDatagrid(element) {
            this.element = element;
            this.data = [];
            this.summaryRow = false;
            this.sortColumn = '';
            this.sortOrder = '';
            this.perPage = 50;
            this.cols = [];
            this.colHead = [];
            this.colLocked = [];
            this.virtual = false;
            this.rowCounter = false;
            this.rowExpander = false;
            this.expandWidth = 0;
            this.counterWidth = 0;
            this.loaded = false;
            this.isBusy = false;
            this.paged = [];
            this.filtered = [];
            this.isRtl = false;
            this.resizing = false;
            this.virtual = element.hasAttribute('virtual');
            this.rowCounter = element.hasAttribute('row-counter');
            this.rowExpander = element.hasAttribute('row-expander');
            if (!element.hasAttribute('scroll'))
                this.element.classList.add('ui-auto-size');
        }
        UIDatagrid.prototype.bind = function (bindingContext, overrideContext) {
            var _this = this;
            if (this.pager) {
                if (!(this.pager instanceof UIPager))
                    throw new Error('Pager must be instance of UIPager');
                this.obPageChange = ui_event_1.UIEvent.observe(this.pager, 'page', function () { return _this.makePage(); });
            }
        };
        UIDatagrid.prototype.attached = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                _this.columnsChanged(_this.columns);
                _this.dataChanged(_this.data);
            });
        };
        UIDatagrid.prototype.detached = function () {
            if (this.obPageChange)
                this.obPageChange.dispose();
        };
        UIDatagrid.prototype.columnsChanged = function (c) {
            this.colHead = _.sortBy(this.columns, 'locked');
            var cols = _.sortBy(_.flatMap(this.columns, function (c) { return c.columns || [c]; }), 'locked');
            this.colLocked = _.filter(cols, function (c) { return c.locked == 0; });
            this.cols = _.filter(cols, function (c) { return c.locked == 1; });
        };
        UIDatagrid.prototype.dataChanged = function (newValue) {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                if (_this.pager) {
                    _this.pager.page = 0;
                    _this.pager.totalPages = Math.ceil(_this.data.length / _this.perPage);
                }
                _this.filter();
            });
        };
        UIDatagrid.prototype.filter = function () {
            this.filtered = this.data;
            this.makePage();
        };
        UIDatagrid.prototype.makePage = function () {
            var _this = this;
            this.isBusy = true;
            ui_event_1.UIEvent.queueTask(function () {
                var data = _.orderBy(_this.filtered, [_this.sortColumn, 'ID', 'id'], [_this.sortOrder, _this.sortOrder, _this.sortOrder]);
                if (_this.pager) {
                    var pp = parseInt(_this.perPage + '');
                    data = _.slice(data, _this.pager.page * pp, (_this.pager.page * pp) + pp);
                }
                _this.paged = data;
                _this.loaded = true;
                ui_event_1.UIEvent.queueTask(function () { return _this.isBusy = false; });
            });
        };
        UIDatagrid.prototype.doSort = function (col) {
            var _this = this;
            if (!col.sortable || this.resizing)
                return;
            if (this.sortColumn != col.dataId)
                this.sortOrder = 'asc';
            if (this.sortColumn == col.dataId)
                this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
            this.sortColumn = col.dataId;
            ui_event_1.UIEvent.queueTask(function () { return _this.makePage(); });
        };
        UIDatagrid.prototype.fireSelect = function (record) {
            ui_event_1.UIEvent.fireEvent('rowselect', this.element, ({ record: record }));
        };
        UIDatagrid.prototype.resizeColumn = function (evt, col) {
            var _this = this;
            if (evt.button != 0)
                return true;
            this.isRtl = window.isRtl(this.element);
            this.diff = 0;
            this.colResize = col;
            this.resizing = true;
            this.startX = (evt.x || evt.clientX);
            this.ghost.style[this.isRtl ? 'left' : 'right'] = "none";
            this.ghost.style[this.isRtl ? 'right' : 'left'] = (getParentByClass(evt.target, 'ui-dg-cell').offsetLeft + parseInt(col.width)) + 'px';
            document.addEventListener('mouseup', this.stop = function (evt) { return _this.resizeEnd(evt); });
            document.addEventListener('mousemove', this.move = function (evt) { return _this.resize(evt); });
        };
        UIDatagrid.prototype.resize = function (evt) {
            var x = (evt.x || evt.clientX) - this.startX;
            x = (this.isRtl ? -1 : 1) * x;
            if (x < 0 && (parseInt(this.colResize.width) + x) <= (this.colResize.minWidth || 80))
                return;
            if (x > 0 && (parseInt(this.colResize.width) + x) >= (500))
                return;
            this.startX = (evt.x || evt.clientX);
            this.diff += x;
            this.colResize.width = (parseInt(this.colResize.width) + x);
            this.ghost.style[this.isRtl ? 'right' : 'left'] = (parseInt(this.ghost.style[this.isRtl ? 'right' : 'left']) + x) + 'px';
        };
        UIDatagrid.prototype.resizeEnd = function (evt) {
            this.resizing = false;
            document.removeEventListener('mousemove', this.move);
            document.removeEventListener('mouseup', this.stop);
            evt.stopPropagation();
            return false;
        };
        __decorate([
            aurelia_framework_1.children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
            __metadata("design:type", Object)
        ], UIDatagrid.prototype, "columns", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDatagrid.prototype, "data", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDatagrid.prototype, "subview", void 0);
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
            aurelia_framework_1.inlineView("<template class=\"ui-datagrid\"><div class=\"ui-hidden\"><slot></slot></div>\n<div show.bind=\"resizing\" ref=\"ghost\" class=\"ui-dg-ghost\"></div>\n<div ref=\"dgHead\" class=\"ui-dg-header\">\n  <div class=\"ui-dg-row\" css.bind=\"{transform: 'translateX('+(scrollLeft*-1)+'px)'}\">\n    <div class=\"ui-dg-expander\" if.bind=\"rowExpander\" css.bind=\"{width: expandWidth+'px',transform: 'translateX('+(scrollLeft)+'px)'}\"></div>\n    <div class=\"ui-dg-expander\" if.bind=\"rowCounter\" css.bind=\"{width: counterWidth+'px',transform: 'translateX('+(scrollLeft)+'px)'}\"></div>\n    <template repeat.for=\"col of colHead\">\n    <div if.bind=\"!col.columns\" css.bind=\"{width:col.getWidth(col.width)+'px', transform: 'translateX('+(col.locked==0?scrollLeft:0)+'px)'}\"\n      mouseup.trigger=\"doSort(col)\" class=\"ui-dg-cell ${col.sortable?'ui-sortable':''} ${col.locked==0?'ui-locked':''}\">\n    <span class=\"ui-title\" innerhtml.bind='col.getTitle()'></span>\n    <span class=\"ui-filter\" if.bind=\"col.filter\"><ui-glyph glyph=\"glyph-funnel\"></ui-glyph></span>\n    <span class=\"ui-sort ${col.dataId==sortColumn ? sortOrder:''}\" if.bind=\"col.sortable\"></span>\n    <span class=\"ui-resizer\" if.bind=\"col.resize\" mousedown.trigger=\"resizeColumn($event,col)\"></span>\n    </div>\n    <div if.bind=\"col.columns\" class=\"ui-dg-group ${col.locked==0?'ui-locked':''}\" css.bind=\"{transform: 'translateX('+(col.locked==0?scrollLeft:0)+'px)'}\">\n    <div class=\"ui-title\" innerhtml.bind='col.getTitle()'></div>\n    <div class=\"ui-dg-cols\">\n    <div repeat.for=\"colin of col.columns\" class=\"ui-dg-cell\" css.bind=\"{width:colin.getWidth(colin.width)+'px'}\"\n      mouseup.trigger=\"doSort(colin)\" class=\"${colin.sortable?'ui-sortable':''}\">\n    <span class=\"ui-title\" innerhtml.bind='colin.getTitle()'></span>\n    <span class=\"ui-filter\" if.bind=\"colin.filter\"><ui-glyph glyph=\"glyph-funnel\"></ui-glyph></span>\n    <span class=\"ui-sort ${colin.dataId==sortColumn ? sortOrder:''}\" if.bind=\"colin.sortable\"></span>\n    <span class=\"ui-resizer\" if.bind=\"colin.resize\" mousedown.trigger=\"resizeColumn($event,colin)\"></span>\n    </div>\n    </div>\n    </div>\n    </template>\n  </div>\n</div>\n<div show.bind=\"data.length==0\" class=\"ui-dg-empty\"><slot name=\"dg-empty\"></slot></div>\n<div ref=\"dgBody\" class=\"ui-dg-body\" scroll.trigger=\"(scrollLeft = dgBody.scrollLeft)\" if.bind=\"!virtual\">\n  <ui-dg-row containerless parent.bind=\"$parent\" record.bind=\"record\" index.bind=\"$index\" odd.bind=\"$odd\" repeat.for=\"record of paged\"></ui-dg-row>\n  <div class=\"ui-dg-row ui-dg-filler\">\n    <div class=\"ui-dg-lock-holder\" css.bind=\"{transform: 'translateX('+scrollLeft+'px)'}\">\n      <div class=\"ui-dg-expander\" if.bind=\"rowExpander\" css.bind=\"{width: expandWidth+'px'}\"></div>\n      <div class=\"ui-dg-expander\" if.bind=\"rowCounter\" css.bind=\"{width: counterWidth+'px'}\"></div>\n      <div class=\"ui-dg-cell ${col.align}\" repeat.for=\"col of colLocked\" css.bind=\"{width:col.getWidth(col.width)+'px'}\"></div>\n    </div>\n    <div class=\"ui-dg-cell ${col.align}\" repeat.for=\"col of cols\" css.bind=\"{width:col.getWidth(col.width)+'px'}\"></div>\n  </div>\n</div>\n<div ref=\"dgBody\" class=\"ui-dg-body\" scroll.trigger=\"(scrollLeft = dgBody.scrollLeft)\" if.bind=\"virtual\">\n  <ui-dg-row parent.bind=\"$parent\" record.bind=\"record\" index.bind=\"$index\" odd.bind=\"$odd\" virtual-repeat.for=\"record of paged\"></ui-dg-row>\n  <div class=\"ui-dg-row ui-dg-filler\">\n    <div class=\"ui-dg-lock-holder\" css.bind=\"{transform: 'translateX('+scrollLeft+'px)'}\">\n      <div class=\"ui-dg-expander\" if.bind=\"rowExpander\" css.bind=\"{width: expandWidth+'px'}\"></div>\n      <div class=\"ui-dg-expander\" if.bind=\"rowCounter\" css.bind=\"{width: counterWidth+'px'}\"></div>\n      <div class=\"ui-dg-cell ${col.align}\" repeat.for=\"col of colLocked\" css.bind=\"{width:col.getWidth(col.width)+'px'}\"></div>\n    </div>\n    <div class=\"ui-dg-cell ${col.align}\" repeat.for=\"col of cols\" css.bind=\"{width:col.getWidth(col.width)+'px'}\"></div>\n  </div>\n</div>\n<div ref=\"dgFoot\" class=\"ui-dg-footer\" if.bind=\"summaryRow\">\n  <div class=\"ui-dg-row\" css.bind=\"{transform: 'translateX('+(scrollLeft*-1)+'px)'}\">\n    <div class=\"ui-dg-lock-holder\" css.bind=\"{transform: 'translateX('+scrollLeft+'px)'}\">\n      <div class=\"ui-dg-expander\" if.bind=\"rowExpander\" css.bind=\"{width: expandWidth+'px'}\"></div>\n      <div class=\"ui-dg-expander\" if.bind=\"rowCounter\" css.bind=\"{width: counterWidth+'px'}\"></div>\n      <div class=\"ui-dg-cell ${col.align}\" repeat.for=\"col of colLocked\" css.bind=\"{width:col.getWidth(col.width)+'px'}\">\n        <div innerhtml.bind='col.getSummary(summaryRow, data)'></div>\n      </div>\n    </div>\n    <div class=\"ui-dg-cell ${col.align}\" repeat.for=\"col of cols\" css.bind=\"{width:col.getWidth(col.width)+'px'}\">\n      <div innerhtml.bind='col.getSummary(summaryRow, data)'></div>\n    </div>\n  </div>\n</div>\n<div class=\"ui-dg-loader\" if.bind=\"isBusy\">\n  <div class=\"ui-loader-div\">\n    <ui-glyph class=\"ui-anim-loader\" glyph=\"glyph-loader\"></ui-glyph>\n  </div>\n</div><template>"),
            aurelia_framework_1.customElement('ui-datagrid'),
            __metadata("design:paramtypes", [Element])
        ], UIDatagrid);
        return UIDatagrid;
    }());
    exports.UIDatagrid = UIDatagrid;
    var UIDGEmpty = (function () {
        function UIDGEmpty() {
        }
        UIDGEmpty = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-dg-empty'),
            aurelia_framework_1.inlineView("<template><div slot=\"dg-empty\"><slot></slot></div></template>")
        ], UIDGEmpty);
        return UIDGEmpty;
    }());
    exports.UIDGEmpty = UIDGEmpty;
    var UIPager = (function () {
        function UIPager(element) {
            this.element = element;
            this.page = 0;
            this.style = "chevron";
            this.totalPages = 1;
        }
        UIPager.prototype.bind = function (bindingContext, overrideContext) {
            if (this.store)
                this.totalPages = this.store.totalPages;
        };
        UIPager.prototype.attached = function () {
            var _this = this;
            if (this.store && !this.store.isLoaded)
                ui_event_1.UIEvent.queueTask(function () { return _this.store.loadPage(_this.page); });
        };
        UIPager.prototype.fireChange = function () {
            if (this.store)
                this.store.loadPage(this.page);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.page);
        };
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
        ], UIPager.prototype, "store", void 0);
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
        return UIPager;
    }());
    exports.UIPager = UIPager;
    var UIDGFilter = (function () {
        function UIDGFilter(element) {
            this.element = element;
        }
        UIDGFilter = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-filter\"></template>"),
            aurelia_framework_1.customElement('ui-dg-filter'),
            __metadata("design:paramtypes", [Element])
        ], UIDGFilter);
        return UIDGFilter;
    }());
    exports.UIDGFilter = UIDGFilter;
});
