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
    var HeaderCell = (function () {
        function HeaderCell() {
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
            aurelia_framework_1.inlineView("<template class=\"ui-dg-cell\" css.bind=\"{width: column.width, minWidth: column.minWidth}\" click.trigger=\"doSort()\">\n  <div class=\"ui-dg-cell-content\">${column.headTitle}</div>\n  <div class=\"ui-dg-cell-icon ui-sort ${sortOrder}\" if.bind=\"column.sortable\">\n    <ui-glyph glyph=\"glyph-caret-up\"></ui-glyph>\n    <ui-glyph glyph=\"glyph-caret-down\"></ui-glyph>\n  </div>\n  <div class=\"ui-dg-cell-icon ui-filter\" if.bind=\"column.filter\">\n    <ui-glyph glyph=\"glyph-funnel\"></ui-glyph>\n  </div>\n  <div class=\"ui-dg-cell-resize\" if.bind=\"column.resizeable\"></div>\n</template>")
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
            if (this.column.type == 'normal')
                template = "<span class=\"${column.class}\" innerhtml.bind='column.getValue(record[column.dataId],record)'></span>";
            else if (this.column.type == 'glyph')
                template = "<div title.bind=\"column.getTooltip(record[column.dataId],record)\">\n      <ui-glyph class=\"${column.class}\" glyph.bind=\"column.getGlyph(record[column.dataId],record)\"></ui-glyph>\n      </div>";
            else if (this.column.type == 'link')
                template = "<a class=\"ui-link ${column.class} ${column.isDisabled(record[column.dataId],record)?'ui-disabled':''}\" click.trigger=\"column.fireClick($event,record[column.dataId],record)\" show.bind=\"column.isVisible(record[column.dataId],record)\">\n        <ui-glyph glyph.bind=\"column.getGlyph(record[column.dataId],record)\" if.bind=\"column.glyph\"></ui-glyph>\n        <span innerhtml.bind=\"column.getLabel(record[column.dataId],record)\"></span>\n      </a>";
            else if (this.column.type == 'button') {
                template = "<ui-button click.trigger=\"column.fireClick($event,record[column.dataId],record)\" show.bind=\"column.isVisible(record[column.dataId],record)\" theme.bind=\"column.getTheme(record[column.dataId],record)\" small square glyph.bind=\"column.getGlyph(record[column.dataId],record)\" disabled.bind=\"column.isDisabled(record[column.dataId],record)\" dropdown.bind=\"column.dropdown\" menuopen.trigger=\"column.fireMenuOpen($event, record)\" label.bind=\"column.getLabel(record[column.dataId],record)\">\n      </ui-button>";
                this.element.classList.add('btn-fix');
            }
            var viewFactory = this.compiler.compile("<template>" + template + "</template>");
            var view = viewFactory.create(this.container);
            view.bind(this);
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
            aurelia_framework_1.inlineView("<template class=\"ui-dg-cell\" css.bind=\"{width: column.width, minWidth: column.minWidth}\">\n<div class=\"ui-dg-cell-content ${column.align}\" ref=\"elContent\"></div>\n</template>"),
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
            aurelia_framework_1.inlineView("<template class=\"ui-dg-row ${record.__selected__?'ui-selected':''}\">\n<div class=\"ui-dg-lock-group\" css.bind=\"{transform: 'translateX('+(parent.scrollLeft)+'px)'}\">\n  <div class=\"ui-dg-cell ui-row-head\" css.bind=\"{width: parent.counterWidth+'px'}\" if.bind=\"parent.rowCounter\">\n    <div class=\"ui-dg-cell-content ui-text-center\">${(index+1) + (parent.dataSource.recordsPerPage * parent.dataSource.page)}</div>\n  </div>\n  <body-cell repeat.for=\"column of parent.colLocked\" record.bind=\"record\" column.bind=\"column\"></body-cell>\n</div>\n<body-cell repeat.for=\"column of parent.cols\" record.bind=\"record\" column.bind=\"column\"></body-cell>\n<div class=\"ui-dg-cell\"><div class=\"ui-dg-cell-content\">&nbsp;</div></div>\n</template>")
        ], BodyRow);
        return BodyRow;
    }());
    exports.BodyRow = BodyRow;
    var UIDatagrid = (function () {
        function UIDatagrid(element, engine) {
            this.element = element;
            this.engine = engine;
            this.cols = [];
            this.colHead = [];
            this.colLocked = [];
            this.counterWidth = 32;
            this.virtual = false;
            this.rowCounter = false;
            this.rowExpander = false;
            this.rowCounter = element.hasAttribute('row-counter');
            this.rowExpander = element.hasAttribute('row-expander');
            if (!element.hasAttribute('scroll'))
                this.element.classList.add('ui-auto-size');
        }
        UIDatagrid.prototype.attached = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                _this.columnsChanged(_this.columns);
            });
        };
        UIDatagrid.prototype.columnsChanged = function (columns) {
            this.colHead = _.sortBy(columns, 'locked');
            this.cols = _.flatMap(_.filter(columns, function (c) { return c.locked == 1; }), function (c) { return c.columns || c; });
            this.colLocked = _.flatMap(_.filter(columns, function (c) { return c.locked == 0; }), function (c) { return c.columns || c; });
        };
        __decorate([
            aurelia_framework_1.children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
            __metadata("design:type", Object)
        ], UIDatagrid.prototype, "columns", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDatagrid.prototype, "dataSource", void 0);
        UIDatagrid = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-datagrid\"><div class=\"ui-hide\"><slot></slot></div>\n<div class=\"ui-dg-head\">\n  <div class=\"ui-dg-row\" css.bind=\"{transform: 'translateX('+(scrollLeft*-1)+'px)'}\">\n    <div class=\"ui-dg-lock-group\" css.bind=\"{transform: 'translateX('+(scrollLeft)+'px)'}\">\n      <div class=\"ui-dg-cell ui-row-head\" css.bind=\"{width: counterWidth+'px'}\" if.bind=\"rowCounter\"></div>\n      <template repeat.for=\"column of colHead | filter:'locked':0\">\n      <header-cell column.bind=\"column\" ds.bind=\"dataSource\" if.bind=\"!column.isGroup\"></header-cell>\n      <div class=\"ui-dg-col-group\" if.bind=\"column.isGroup\">\n        <div class=\"ui-dg-col-group-title\">${column.label}</div>\n        <div class=\"ui-dg-col-group-cells\">\n          <header-cell column.bind=\"inColumn\" ds.bind=\"dataSource\" repeat.for=\"inColumn of column.columns\"></header-cell>\n        </div>\n      </div>\n      </template>\n    </div>\n    <template repeat.for=\"column of colHead | filter:'locked':1\">\n    <header-cell column.bind=\"column\" ds.bind=\"dataSource\" if.bind=\"!column.isGroup\"></header-cell>\n    <div class=\"ui-dg-col-group\" if.bind=\"column.isGroup\">\n      <div class=\"ui-dg-col-group-title\">${column.label}</div>\n      <div class=\"ui-dg-col-group-cells\">\n        <header-cell column.bind=\"inColumn\" repeat.for=\"inColumn of column.columns\"></header-cell>\n      </div>\n    </div>\n    </template>\n    <div class=\"ui-dg-cell\"><div class=\"ui-dg-cell-content\">&nbsp;</div></div>\n  </div>\n</div>\n<div class=\"ui-dg-body\" scroll.trigger=\"scrollLeft = $event.target.scrollLeft\">\n  <body-row repeat.for=\"record of dataSource.data\" record.bind=\"record\"></body-row>\n  <div class=\"ui-dg-row ui-last-row\">\n    <div class=\"ui-dg-lock-group\" css.bind=\"{transform: 'translateX('+(scrollLeft)+'px)'}\">\n      <div class=\"ui-dg-cell ui-row-head\" css.bind=\"{width: counterWidth+'px'}\" if.bind=\"rowCounter\"></div>\n      <div repeat.for=\"column of colLocked\" class=\"ui-dg-cell\" css.bind=\"{width: column.width, minWidth: column.minWidth}\"></div>\n    </div>\n    <div repeat.for=\"column of cols\" class=\"ui-dg-cell\" css.bind=\"{width: column.width, minWidth: column.minWidth}\"></div>\n    <div class=\"ui-dg-cell\"><div class=\"ui-dg-cell-content\">&nbsp;</div></div>\n  </div>\n</div>\n<div class=\"ui-dg-foot\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-datagrid'),
            __metadata("design:paramtypes", [Element, aurelia_framework_1.TemplatingEngine])
        ], UIDatagrid);
        return UIDatagrid;
    }());
    exports.UIDatagrid = UIDatagrid;
});
