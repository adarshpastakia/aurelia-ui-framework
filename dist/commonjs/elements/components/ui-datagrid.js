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
var aurelia_logging_1 = require("aurelia-logging");
var ui_datasource_1 = require("../../data/ui-datasource");
var ui_event_1 = require("../../utils/ui-event");
var _ = require("lodash");
var logger = aurelia_logging_1.getLogger('UIDatagrid');
var HeaderCell = (function () {
    function HeaderCell(element) {
        this.element = element;
    }
    Object.defineProperty(HeaderCell.prototype, "sortOrder", {
        get: function () {
            if (this.ds.sortBy !== this.column.dataId)
                return '';
            return this.ds.orderBy;
        },
        enumerable: true,
        configurable: true
    });
    HeaderCell.prototype.doSort = function () {
        if (!this.column.sortable)
            return;
        if (this.ds.sortBy !== this.column.dataId)
            this.ds.sort(this.column.dataId, 'asc');
        else
            this.ds.sort(this.column.dataId, this.ds.orderBy === 'asc' ? 'desc' : 'asc');
    };
    HeaderCell.prototype.fireResize = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var startX = evt.x || evt.clientX;
        ui_event_1.UIEvent.fireEvent('resize', this.element, { column: this.column, startX: startX });
        return false;
    };
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], HeaderCell.prototype, "ds", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], HeaderCell.prototype, "column", void 0);
    __decorate([
        aurelia_framework_1.computedFrom('ds.sortBy', 'ds.orderBy'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], HeaderCell.prototype, "sortOrder", null);
    HeaderCell = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-dg-cell\" css.bind=\"{width: column.columnWidth+'px', minWidth: column.columnMinWidth+'px'}\" click.delegate=\"doSort()\">\n  <div class=\"ui-dg-cell-content\">${column.headerTitle}</div>\n  <div class=\"ui-dg-cell-icon ui-sort ${sortOrder}\" if.bind=\"column.sortable\">\n    <ui-glyph glyph=\"glyph-caret-up\"></ui-glyph>\n    <ui-glyph glyph=\"glyph-caret-down\"></ui-glyph>\n  </div>\n  <div class=\"ui-dg-cell-icon ui-filter\" if.bind=\"column.filter\">\n    <ui-glyph glyph=\"glyph-funnel\"></ui-glyph>\n  </div>\n  <div class=\"ui-dg-cell-resize\" if.bind=\"column.resizeable\" mousedown.trigger=\"fireResize($event)\" click.trigger=\"$event.stopPropagation() && false\"></div>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], HeaderCell);
    return HeaderCell;
}());
exports.HeaderCell = HeaderCell;
var BodyCell = (function () {
    function BodyCell(element, container, compiler) {
        this.element = element;
        this.container = container;
        this.compiler = compiler;
    }
    BodyCell.prototype.attached = function () {
        if (this.elContent.innerHTML)
            return;
        var template = '';
        if (this.column.tpl) {
            template = this.column.tpl;
            this.viewModel = this.column.$parent;
            if (this.column.class)
                this.element.classList.add(this.column.class);
        }
        else if (this.column.type == 'normal')
            template = "<span class=\"${column.class}\" innerhtml.bind='column.getValue(record[column.dataId],record)'></span>";
        else if (this.column.type == 'glyph')
            template = "<div title.bind=\"column.getTooltip(record[column.dataId],record)\">\n      <ui-glyph class=\"${column.class}\" glyph.bind=\"column.getGlyph(record[column.dataId],record)\"></ui-glyph>\n      </div>";
        else if (this.column.type == 'link')
            template = "<a class=\"ui-link ${column.class} ${column.isDisabled(record[column.dataId],record)?'ui-disabled':''}\" click.trigger=\"column.fireClick($event,record[column.dataId],record)\" show.bind=\"column.isVisible(record[column.dataId],record)\">\n        <ui-glyph glyph.bind=\"column.getGlyph(record[column.dataId],record)\" if.bind=\"column.glyph\"></ui-glyph>\n        <span innerhtml.bind=\"column.getLabel(record[column.dataId],record)\"></span>\n      </a>";
        else if (this.column.type == 'button') {
            template = "<ui-button click.trigger=\"column.fireClick($event,record[column.dataId],record)\" show.bind=\"column.isVisible(record[column.dataId],record)\" theme.bind=\"column.getTheme(record[column.dataId],record)\" small square glyph.bind=\"column.getGlyph(record[column.dataId],record)\" width.bind=\"column.buttonWidth\" disabled.bind=\"column.isDisabled(record[column.dataId],record)\" dropdown.bind=\"column.dropdown\" menuopen.trigger=\"column.fireMenuOpen($event, record)\" label.bind=\"column.getLabel(record[column.dataId],record)\">\n      </ui-button>";
            this.element.classList.add('btn-fix');
        }
        var viewFactory = this.compiler.compile("<template>" + template + "</template>");
        var view = viewFactory.create(this.container);
        view.bind({ record: this.record, column: this.column, viewModel: this.viewModel });
        this.slot = new aurelia_framework_1.ViewSlot(this.elContent, true);
        this.slot.add(view);
        this.slot.attached();
    };
    BodyCell.prototype.detached = function () {
        if (this.slot)
            this.slot.detached();
    };
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], BodyCell.prototype, "column", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], BodyCell.prototype, "record", void 0);
    BodyCell = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-dg-cell\" css.bind=\"{width: column.columnWidth+'px', minWidth: column.columnMinWidth+'px'}\">\n<div class=\"ui-dg-cell-content ${column.align}\" ref=\"elContent\"></div>\n</template>"),
        __metadata("design:paramtypes", [Element, aurelia_framework_1.Container, aurelia_framework_1.ViewCompiler])
    ], BodyCell);
    return BodyCell;
}());
exports.BodyCell = BodyCell;
var BodyRow = (function () {
    function BodyRow() {
        this.index = 0;
    }
    BodyRow.prototype.bind = function (bindingContext, overrideContext) {
        this.index = overrideContext.$index;
        this.parent = overrideContext.parentOverrideContext.bindingContext;
    };
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], BodyRow.prototype, "record", void 0);
    BodyRow = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-dg-row ${record.__selected__?'ui-selected':''}\">\n<div class=\"ui-dg-lock-group\" css.bind=\"{transform: 'translateX('+(parent.scrollLeft)+'px)'}\">\n  <div class=\"ui-dg-cell ui-row-head\" css.bind=\"{width: parent.counterWidth+'px'}\" if.bind=\"parent.rowCounter\">\n    <div class=\"ui-dg-cell-content ui-text-center\">${(index+1) + (parent.dataSource.recordsPerPage * parent.dataSource.page)}</div>\n  </div>\n  <div class=\"ui-dg-cell ui-cell-checkbox\" click.trigger=\"parent.toggleRecordCheck($event,record)\" if.bind=\"parent.rowCheckbox\">\n    <ui-glyph glyph.bind=\"record.__selected__?'glyph-tree-check-on':'glyph-tree-check-off'\"></ui-glyph>\n  </div>\n  <body-cell repeat.for=\"column of parent.colLocked\" record.bind=\"record\" column.bind=\"column\"></body-cell>\n</div>\n<body-cell repeat.for=\"column of parent.cols\" record.bind=\"record\" column.bind=\"column\"></body-cell>\n<div class=\"ui-dg-cell last-cell\"><div class=\"ui-dg-cell-content\">&nbsp;</div></div>\n</template>")
    ], BodyRow);
    return BodyRow;
}());
exports.BodyRow = BodyRow;
var UIDatagrid = (function () {
    function UIDatagrid(element, engine) {
        this.element = element;
        this.engine = engine;
        this.selectedRows = [];
        this.cols = [];
        this.colHead = [];
        this.colLocked = [];
        this.counterWidth = 32;
        this.virtual = false;
        this.rowSelect = false;
        this.rowCheckbox = false;
        this.rowCounter = false;
        this.rowExpander = false;
        this._X = 0;
        this._resizing = true;
        this.virtual = element.hasAttribute('virtual');
        this.rowSelect = element.hasAttribute('rowselect') || element.hasAttribute('rowselect.trigger');
        this.rowCheckbox = element.hasAttribute('row-checkbox');
        this.rowCounter = element.hasAttribute('row-counter');
        this.rowExpander = element.hasAttribute('row-expander');
        if (!element.hasAttribute('scroll'))
            this.element.classList.add('ui-auto-size');
    }
    UIDatagrid.prototype.bind = function () {
        this.dataSourceChanged(this.dataSource);
    };
    UIDatagrid.prototype.attached = function () {
        var _this = this;
        ui_event_1.UIEvent.queueTask(function () {
            _this.columnsChanged(_this.columns);
        });
        this.obLocaleChange = ui_event_1.UIEvent.subscribe(ui_event_1.UIEvent.I18N_CHANGE_EVENT, function () { return _this['elDgBody'].scrollLeft = _this['elDgBody'].scrollLeft * -1; });
    };
    UIDatagrid.prototype.detached = function () {
        if (this.obPageChange)
            this.obPageChange.dispose();
        if (this.obLocaleChange)
            this.obLocaleChange.dispose();
    };
    UIDatagrid.prototype.columnsChanged = function (columns) {
        this.colHead = _.sortBy(columns, 'locked');
        this.cols = _.flatMap(_.filter(columns, function (c) { return c.locked == 1; }), function (c) { return c.columns || c; });
        this.colLocked = _.flatMap(_.filter(columns, function (c) { return c.locked == 0; }), function (c) { return c.columns || c; });
    };
    UIDatagrid.prototype.dataSourceChanged = function (newValue) {
        var _this = this;
        if (this.obPageChange)
            this.obPageChange.dispose();
        if (_.isArray(newValue)) {
            var ds = new ui_datasource_1.UIDataSource();
            ds.load(newValue);
            this.dataSource = ds;
        }
        this.obPageChange = ui_event_1.UIEvent.observe(this.dataSource, 'data', function () { return _this.selectedRows = []; });
    };
    UIDatagrid.prototype.toggleRecordCheck = function ($event, record) {
        $event.stopPropagation();
        $event.preventDefault();
        record.__selected__ = !record.__selected__;
        this.selectedRows = _.filter(this.dataSource.data, ['__selected__', true]);
    };
    UIDatagrid.prototype.fireSelect = function ($event, record) {
        if (!this.rowSelect)
            return;
        ui_event_1.UIEvent.fireEvent('rowselect', this.element, ({ record: record }));
    };
    UIDatagrid.prototype.startResize = function (evt) {
        var _this = this;
        evt.preventDefault();
        evt.stopPropagation();
        this._isRtl = isRtl(this.element);
        this._X = evt.detail.startX;
        this._resizing = true;
        this._column = evt.detail.column;
        this._columnEl = evt.target;
        this.ghostEl.classList.add('resizing');
        this.ghostEl.style.left = (this._columnEl.offsetLeft + (this._isRtl ? 0 : this._column.columnWidth)) + 'px';
        document.addEventListener('mouseup', this._evtStop = function (evt) { return _this.endResize(evt); });
        document.addEventListener('mousemove', this._evtMove = function (evt) { return _this.onResize(evt); });
    };
    UIDatagrid.prototype.onResize = function (evt) {
        var w = this._column.columnWidth;
        var diff = (evt.x || evt.clientX || 0) - this._X;
        if (this._isRtl)
            diff = diff * -1;
        if (w + diff < this._column.columnMinWidth)
            w = this._column.columnMinWidth;
        else if (w + diff > 500)
            w = 500;
        else
            w = w + diff;
        this._X = evt.x || evt.clientX;
        this._column.width = w;
        this.ghostEl.style.left = (this._columnEl.offsetLeft + (this._isRtl ? 0 : this._column.columnWidth)) + 'px';
        return false;
    };
    UIDatagrid.prototype.endResize = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this._resizing = false;
        this.ghostEl.classList.remove('resizing');
        document.removeEventListener('mouseup', this._evtStop);
        document.removeEventListener('mousemove', this._evtMove);
        return false;
    };
    __decorate([
        aurelia_framework_1.children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph,ui-dg-tpl'),
        __metadata("design:type", Object)
    ], UIDatagrid.prototype, "columns", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UIDatagrid.prototype, "dataSource", void 0);
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.fromView }),
        __metadata("design:type", Object)
    ], UIDatagrid.prototype, "selectedRows", void 0);
    UIDatagrid = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-datagrid\"><div class=\"ui-hide\"><slot></slot></div>\n<div class=\"ui-dg-ghost\" ref=\"ghostEl\" css.bind=\"{height: element.offsetHeight+'px'}\"></div>\n<div class=\"ui-dg-head\" resize.trigger=\"startResize($event)\">\n  <div class=\"ui-dg-row\" css.bind=\"{transform: 'translateX('+(scrollLeft*-1)+'px)'}\">\n    <div class=\"ui-dg-lock-group\" css.bind=\"{transform: 'translateX('+(scrollLeft)+'px)'}\">\n      <div class=\"ui-dg-cell ui-row-head\" css.bind=\"{width: counterWidth+'px'}\" if.bind=\"rowCounter\"></div>\n      <div class=\"ui-dg-cell ui-cell-checkbox\" if.bind=\"rowCheckbox\"></div>\n      <template repeat.for=\"column of colHead | filter:'locked':0\">\n      <header-cell column.bind=\"column\" ds.bind=\"dataSource\" if.bind=\"!column.isGroup\"></header-cell>\n      <div class=\"ui-dg-col-group\" if.bind=\"column.isGroup\">\n        <div class=\"ui-dg-col-group-title\">${column.label}</div>\n        <div class=\"ui-dg-col-group-cells\">\n          <header-cell column.bind=\"inColumn\" ds.bind=\"dataSource\" repeat.for=\"inColumn of column.columns\"></header-cell>\n        </div>\n      </div>\n      </template>\n    </div>\n    <template repeat.for=\"column of colHead | filter:'locked':1\">\n    <header-cell column.bind=\"column\" ds.bind=\"dataSource\" if.bind=\"!column.isGroup\"></header-cell>\n    <div class=\"ui-dg-col-group\" if.bind=\"column.isGroup\">\n      <div class=\"ui-dg-col-group-title\">${column.label}</div>\n      <div class=\"ui-dg-col-group-cells\">\n        <header-cell column.bind=\"inColumn\" ds.bind=\"dataSource\" repeat.for=\"inColumn of column.columns\"></header-cell>\n      </div>\n    </div>\n    </template>\n    <div class=\"ui-dg-cell last-cell\"><div class=\"ui-dg-cell-content\">&nbsp;</div></div>\n  </div>\n</div>\n<div class=\"ui-dg-body ${rowSelect?'ui-row-hilight':''}\" scroll.trigger=\"scrollLeft = $event.target.scrollLeft\" ref=\"elDgBody\" if.bind=\"virtual\">\n  <body-row virtual-repeat.for=\"record of dataSource.data\" record.bind=\"record\" click.trigger=\"fireSelect($event, record)\"></body-row>\n</div>\n<div class=\"ui-dg-body ${rowSelect?'ui-row-hilight':''}\" scroll.trigger=\"scrollLeft = $event.target.scrollLeft\" ref=\"elDgBody\" if.bind=\"!virtual\">\n  <body-row repeat.for=\"record of dataSource.data\" record.bind=\"record\" click.trigger=\"fireSelect($event, record)\"></body-row>\n  <div class=\"ui-dg-row ui-last-row\">\n    <div class=\"ui-dg-lock-group\" css.bind=\"{transform: 'translateX('+(scrollLeft)+'px)'}\">\n      <div class=\"ui-dg-cell ui-row-head\" css.bind=\"{width: counterWidth+'px'}\" if.bind=\"rowCounter\"></div>\n      <div class=\"ui-dg-cell ui-cell-checkbox\" if.bind=\"rowCheckbox\"></div>\n      <div repeat.for=\"column of colLocked\" class=\"ui-dg-cell\" css.bind=\"{width: column.columnWidth+'px', minWidth: column.columnMinWidth+'px'}\"></div>\n    </div>\n    <div repeat.for=\"column of cols\" class=\"ui-dg-cell\" css.bind=\"{width: column.columnWidth+'px', minWidth: column.columnMinWidth+'px'}\"></div>\n    <div class=\"ui-dg-cell last-cell\"></div>\n  </div>\n</div>\n<div class=\"ui-dg-foot\"></div>\n</template>"),
        aurelia_framework_1.customElement('ui-datagrid'),
        __metadata("design:paramtypes", [Element, aurelia_framework_1.TemplatingEngine])
    ], UIDatagrid);
    return UIDatagrid;
}());
exports.UIDatagrid = UIDatagrid;
