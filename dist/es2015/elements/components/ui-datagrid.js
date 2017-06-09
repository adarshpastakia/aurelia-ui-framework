var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, bindingMode, children, inlineView, containerless, Container, ViewCompiler, ViewSlot } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import * as _ from "lodash";
let UIDgCell = class UIDgCell {
    constructor(element, container, compiler) {
        this.element = element;
        this.container = container;
        this.compiler = compiler;
    }
    attached() {
        if (this.element.innerHTML)
            return;
        let template = '';
        if (this.type == 'subview') {
            if (isFunction(this.parent.subview))
                template = this.parent.subview({ record: this.record });
            else
                template = this.parent.subview;
        }
        else if (this.col.type == 'normal')
            template = `<span class="\${col.class}" innerhtml.bind='col.getValue(record[col.dataId],record)'></span>`;
        else if (this.col.type == 'glyph')
            template = `<div title.bind="col.getTooltip(record[col.dataId],record)">
        <ui-glyph class="\${col.class} \${col.getGlyph(record[col.dataId],record)}" glyph.bind="col.getGlyph(record[col.dataId],record)"></ui-glyph>
        </div>`;
        else if (this.col.type == 'link')
            template = `<a class="ui-link \${col.class} \${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}" click.trigger="col.fireClick($event,record[col.dataId],record)" show.bind="col.isVisible(record[col.dataId],record)">
          <ui-glyph glyph.bind="col.getGlyph(record[col.dataId],record)" if.bind="col.glyph"></ui-glyph>
          <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span>
        </a>`;
        else if (this.col.type == 'button') {
            template = `<ui-button click.trigger="col.fireClick($event,record[col.dataId],record)" show.bind="col.isVisible(record[col.dataId],record)" theme.bind="col.getTheme(record[col.dataId],record)" small square glyph.bind="col.getGlyph(record[col.dataId],record)" disabled.bind="col.isDisabled(record[col.dataId],record)" dropdown.bind="col.dropdown" menuopen.trigger="col.fireMenuOpen($event, record)">
          <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span>
        </ui-button>`;
            this.element.classList.add('btn-fix');
        }
        let viewFactory = this.compiler.compile(`<template>${template}</template>`);
        let view = viewFactory.create(this.container);
        view.bind(this);
        this.slot = new ViewSlot(this.element, true);
        this.slot.add(view);
        this.slot.attached();
    }
    bind() {
        if (this.slot)
            this.slot.attached();
    }
    detached() {
        if (this.slot)
            this.slot.detached();
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgCell.prototype, "col", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgCell.prototype, "type", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgCell.prototype, "record", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgCell.prototype, "parent", void 0);
UIDgCell = __decorate([
    autoinject(),
    inlineView(`<template></template>`),
    customElement('ui-dg-cell'),
    __metadata("design:paramtypes", [Element, Container, ViewCompiler])
], UIDgCell);
export { UIDgCell };
let UIDgRow = class UIDgRow {
    constructor(element) {
        this.element = element;
        this.level = 0;
        this.last = false;
    }
    bind(bindingContext, overrideContext) {
        if (this.level > 0 && !overrideContext.$first && overrideContext.$last)
            this.last = true;
    }
    indexChanged() {
        UIEvent.queueTask(() => {
            if (this.rowExpand && this.parent.expandWidth < this.rowExpand.offsetWidth)
                this.parent.expandWidth = this.rowExpand.offsetWidth;
            if (this.rowCounter && this.parent.counterWidth < this.rowCounter.offsetWidth)
                this.parent.counterWidth = this.rowCounter.offsetWidth;
        });
    }
    attached() {
        if (this.rowExpand && this.parent.expandWidth < this.rowExpand.offsetWidth)
            this.parent.expandWidth = this.rowExpand.offsetWidth;
        if (this.rowCounter && this.parent.counterWidth < this.rowCounter.offsetWidth)
            this.parent.counterWidth = this.rowCounter.offsetWidth;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "level", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "index", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "record", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "parent", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "odd", void 0);
UIDgRow = __decorate([
    autoinject(),
    inlineView(`<template><div class="ui-dg-row level-\${level} \${record.isOpen?'ui-expanded':''} \${parent.selected==record?'ui-selected':''} \${odd?'even':'odd'} \${last?'last':''}" click.trigger="parent.fireSelect(parent.selected=record)">
    <div class="ui-dg-lock-holder" css.bind="{transform: 'translateX('+parent.scrollLeft+'px)'}">
      <div class="ui-dg-expander" if.bind="parent.rowExpander" ref="rowExpand" click.trigger="$event.stopPropagation()" css.bind="{'min-width': parent.expandWidth+'px'}">
        <ui-glyph glyph="glyph" repeat.for="i of level"></ui-glyph>
        <a click.trigger="record.isOpen=!record.isOpen" if.bind="record.subdata||parent.subview"><ui-glyph glyph="\${record.isOpen?'glyph-icon-minus':'glyph-icon-plus'}"></ui-glyph></a>
      </div>
      <div class="ui-dg-expander ui-text-center" if.bind="parent.rowCounter" click.trigger="$event.stopPropagation()" ref="rowCounter" css.bind="{'min-width': parent.counterWidth+'px'}">\${index}</div>
      <ui-dg-cell class="ui-dg-cell \${col.align}" repeat.for="col of parent.colLocked" css.bind="{width:col.getWidth(col.width)+'px'}" col.bind="col" parent.bind="parent" record.bind="record">
      </ui-dg-cell>
    </div>
    <ui-dg-cell class="ui-dg-cell \${col.align}" repeat.for="col of parent.cols" css.bind="{width:col.getWidth(col.width)+'px'}" col.bind="col" parent.bind="parent" record.bind="record">
    </ui-dg-cell>
  </div>
  <ui-dg-row containerless if.bind="!parent.subview&&record.subdata&&record.isOpen" level.bind="level+1" parent.bind="parent" record.bind="rec" index.bind="$index" odd.bind="$odd" repeat.for="rec of record.subdata"></ui-dg-row>

  <div class="ui-dg-row" if.bind="parent.subview && record.isOpen" css.bind="{transform: 'translateX('+parent.scrollLeft+'px)'}">
    <div class="ui-dg-expander" if.bind="parent.rowExpander" click.trigger="$event.stopPropagation()" css.bind="{'min-width': parent.expandWidth+'px'}"></div>
    <div class="ui-dg-expander ui-text-center" if.bind="parent.rowCounter" click.trigger="$event.stopPropagation()" css.bind="{'min-width': parent.counterWidth+'px'}"></div>
    <ui-dg-cell class="ui-dg-subview" parent.bind="parent" record.bind="record" type="subview"></ui-dg-cell>
  </div>
</template>`),
    customElement('ui-dg-row'),
    __metadata("design:paramtypes", [Element])
], UIDgRow);
export { UIDgRow };
let UIDatagrid = class UIDatagrid {
    constructor(element) {
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
    bind(bindingContext, overrideContext) {
        if (this.pager) {
            if (!(this.pager instanceof UIPager))
                throw new Error('Pager must be instance of UIPager');
            this.obPageChange = UIEvent.observe(this.pager, 'page', () => this.makePage());
        }
    }
    attached() {
        UIEvent.queueTask(() => {
            this.columnsChanged(this.columns);
            this.dataChanged(this.data);
        });
    }
    detached() {
        if (this.obPageChange)
            this.obPageChange.dispose();
    }
    columnsChanged(c) {
        this.colHead = _.sortBy(this.columns, 'locked');
        let cols = _.sortBy(_.flatMap(this.columns, c => c.columns || [c]), 'locked');
        this.colLocked = _.filter(cols, (c) => c.locked == 0);
        this.cols = _.filter(cols, (c) => c.locked == 1);
    }
    dataChanged(newValue) {
        UIEvent.queueTask(() => {
            if (this.pager) {
                this.pager.page = 0;
                this.pager.totalPages = Math.ceil(this.data.length / this.perPage);
            }
            this.filter();
        });
    }
    filter() {
        this.filtered = this.data;
        this.makePage();
    }
    makePage() {
        this.isBusy = true;
        UIEvent.queueTask(() => {
            let data = _.orderBy(this.filtered, [this.sortColumn, 'ID', 'id'], [this.sortOrder, this.sortOrder, this.sortOrder]);
            if (this.pager) {
                let pp = parseInt(this.perPage + '');
                data = _.slice(data, this.pager.page * pp, (this.pager.page * pp) + pp);
            }
            this.paged = data;
            this.loaded = true;
            UIEvent.queueTask(() => this.isBusy = false);
        });
    }
    doSort(col) {
        if (!col.sortable || this.resizing)
            return;
        if (this.sortColumn != col.dataId)
            this.sortOrder = 'asc';
        if (this.sortColumn == col.dataId)
            this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
        this.sortColumn = col.dataId;
        UIEvent.queueTask(() => this.makePage());
    }
    fireSelect(record) {
        UIEvent.fireEvent('rowselect', this.element, ({ record }));
    }
    resizeColumn(evt, col) {
        if (evt.button != 0)
            return true;
        this.isRtl = window.isRtl(this.element);
        this.diff = 0;
        this.colResize = col;
        this.resizing = true;
        this.startX = (evt.x || evt.clientX);
        this.ghost.style[this.isRtl ? 'left' : 'right'] = "none";
        this.ghost.style[this.isRtl ? 'right' : 'left'] = (getParentByClass(evt.target, 'ui-dg-cell').offsetLeft + parseInt(col.width)) + 'px';
        document.addEventListener('mouseup', this.stop = evt => this.resizeEnd(evt));
        document.addEventListener('mousemove', this.move = evt => this.resize(evt));
    }
    resize(evt) {
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
    }
    resizeEnd(evt) {
        this.resizing = false;
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('mouseup', this.stop);
        evt.stopPropagation();
        return false;
    }
};
__decorate([
    children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "columns", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "data", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "subview", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "summaryRow", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "sortColumn", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "sortOrder", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "pager", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatagrid.prototype, "perPage", void 0);
UIDatagrid = __decorate([
    autoinject(),
    inlineView(`<template class="ui-datagrid"><div class="ui-hidden"><slot></slot></div>
<div show.bind="resizing" ref="ghost" class="ui-dg-ghost"></div>
<div ref="dgHead" class="ui-dg-header">
  <div class="ui-dg-row" css.bind="{transform: 'translateX('+(scrollLeft*-1)+'px)'}">
    <div class="ui-dg-expander" if.bind="rowExpander" css.bind="{width: expandWidth+'px',transform: 'translateX('+(scrollLeft)+'px)'}"></div>
    <div class="ui-dg-expander" if.bind="rowCounter" css.bind="{width: counterWidth+'px',transform: 'translateX('+(scrollLeft)+'px)'}"></div>
    <template repeat.for="col of colHead">
    <div if.bind="!col.columns" css.bind="{width:col.getWidth(col.width)+'px', transform: 'translateX('+(col.locked==0?scrollLeft:0)+'px)'}"
      mouseup.trigger="doSort(col)" class="ui-dg-cell \${col.sortable?'ui-sortable':''} \${col.locked==0?'ui-locked':''}">
    <span class="ui-title" innerhtml.bind='col.getTitle()'></span>
    <span class="ui-filter" if.bind="col.filter"><ui-glyph glyph="glyph-funnel"></ui-glyph></span>
    <span class="ui-sort \${col.dataId==sortColumn ? sortOrder:''}" if.bind="col.sortable"></span>
    <span class="ui-resizer" if.bind="col.resize" mousedown.trigger="resizeColumn($event,col)"></span>
    </div>
    <div if.bind="col.columns" class="ui-dg-group \${col.locked==0?'ui-locked':''}" css.bind="{transform: 'translateX('+(col.locked==0?scrollLeft:0)+'px)'}">
    <div class="ui-title" innerhtml.bind='col.getTitle()'></div>
    <div class="ui-dg-cols">
    <div repeat.for="colin of col.columns" class="ui-dg-cell" css.bind="{width:colin.getWidth(colin.width)+'px'}"
      mouseup.trigger="doSort(colin)" class="\${colin.sortable?'ui-sortable':''}">
    <span class="ui-title" innerhtml.bind='colin.getTitle()'></span>
    <span class="ui-filter" if.bind="colin.filter"><ui-glyph glyph="glyph-funnel"></ui-glyph></span>
    <span class="ui-sort \${colin.dataId==sortColumn ? sortOrder:''}" if.bind="colin.sortable"></span>
    <span class="ui-resizer" if.bind="colin.resize" mousedown.trigger="resizeColumn($event,colin)"></span>
    </div>
    </div>
    </div>
    </template>
  </div>
</div>
<div show.bind="data.length==0" class="ui-dg-empty"><slot name="dg-empty"></slot></div>
<div ref="dgBody" class="ui-dg-body" scroll.trigger="(scrollLeft = dgBody.scrollLeft)" if.bind="!virtual">
  <ui-dg-row containerless parent.bind="$parent" record.bind="record" index.bind="$index" odd.bind="$odd" repeat.for="record of paged"></ui-dg-row>
  <div class="ui-dg-row ui-dg-filler">
    <div class="ui-dg-lock-holder" css.bind="{transform: 'translateX('+scrollLeft+'px)'}">
      <div class="ui-dg-expander" if.bind="rowExpander" css.bind="{width: expandWidth+'px'}"></div>
      <div class="ui-dg-expander" if.bind="rowCounter" css.bind="{width: counterWidth+'px'}"></div>
      <div class="ui-dg-cell \${col.align}" repeat.for="col of colLocked" css.bind="{width:col.getWidth(col.width)+'px'}"></div>
    </div>
    <div class="ui-dg-cell \${col.align}" repeat.for="col of cols" css.bind="{width:col.getWidth(col.width)+'px'}"></div>
  </div>
</div>
<div ref="dgBody" class="ui-dg-body" scroll.trigger="(scrollLeft = dgBody.scrollLeft)" if.bind="virtual">
  <ui-dg-row parent.bind="$parent" record.bind="record" index.bind="$index" odd.bind="$odd" virtual-repeat.for="record of paged"></ui-dg-row>
  <div class="ui-dg-row ui-dg-filler">
    <div class="ui-dg-lock-holder" css.bind="{transform: 'translateX('+scrollLeft+'px)'}">
      <div class="ui-dg-expander" if.bind="rowExpander" css.bind="{width: expandWidth+'px'}"></div>
      <div class="ui-dg-expander" if.bind="rowCounter" css.bind="{width: counterWidth+'px'}"></div>
      <div class="ui-dg-cell \${col.align}" repeat.for="col of colLocked" css.bind="{width:col.getWidth(col.width)+'px'}"></div>
    </div>
    <div class="ui-dg-cell \${col.align}" repeat.for="col of cols" css.bind="{width:col.getWidth(col.width)+'px'}"></div>
  </div>
</div>
<div ref="dgFoot" class="ui-dg-footer" if.bind="summaryRow">
  <div class="ui-dg-row" css.bind="{transform: 'translateX('+(scrollLeft*-1)+'px)'}">
    <div class="ui-dg-lock-holder" css.bind="{transform: 'translateX('+scrollLeft+'px)'}">
      <div class="ui-dg-expander" if.bind="rowExpander" css.bind="{width: expandWidth+'px'}"></div>
      <div class="ui-dg-expander" if.bind="rowCounter" css.bind="{width: counterWidth+'px'}"></div>
      <div class="ui-dg-cell \${col.align}" repeat.for="col of colLocked" css.bind="{width:col.getWidth(col.width)+'px'}">
        <div innerhtml.bind='col.getSummary(summaryRow, data)'></div>
      </div>
    </div>
    <div class="ui-dg-cell \${col.align}" repeat.for="col of cols" css.bind="{width:col.getWidth(col.width)+'px'}">
      <div innerhtml.bind='col.getSummary(summaryRow, data)'></div>
    </div>
  </div>
</div>
<div class="ui-dg-loader" if.bind="isBusy">
  <div class="ui-loader-div">
    <ui-glyph class="ui-anim-loader" glyph="glyph-loader"></ui-glyph>
  </div>
</div><template>`),
    customElement('ui-datagrid'),
    __metadata("design:paramtypes", [Element])
], UIDatagrid);
export { UIDatagrid };
let UIDGEmpty = class UIDGEmpty {
};
UIDGEmpty = __decorate([
    containerless(),
    customElement('ui-dg-empty'),
    inlineView(`<template><div slot="dg-empty"><slot></slot></div></template>`)
], UIDGEmpty);
export { UIDGEmpty };
let UIPager = class UIPager {
    constructor(element) {
        this.element = element;
        this.page = 0;
        this.style = "chevron";
        this.totalPages = 1;
    }
    bind(bindingContext, overrideContext) {
        if (this.store)
            this.totalPages = this.store.totalPages;
    }
    attached() {
        if (this.store && !this.store.isLoaded)
            UIEvent.queueTask(() => this.store.loadPage(this.page));
    }
    fireChange() {
        if (this.store)
            this.store.loadPage(this.page);
        UIEvent.fireEvent('change', this.element, this.page);
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIPager.prototype, "page", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPager.prototype, "style", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPager.prototype, "store", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIPager.prototype, "totalPages", void 0);
UIPager = __decorate([
    autoinject(),
    inlineView(`<template class="ui-pager">
  <a class="pg-first \${page==0?'disabled':''}" click.trigger="fireChange(page=0)"><ui-glyph glyph="glyph-\${style}-double-left"></ui-glyph></a>
  <a class="pg-prev \${page==0?'disabled':''}" click.trigger="fireChange(page=page-1)" click.trigger="fireChange(page=totalPages)"><ui-glyph glyph="glyph-\${style}-left"></ui-glyph></a>
  <span class="pg-input">\${page+1} of \${totalPages}</span>
  <a class="pg-next \${page+1>=totalPages?'disabled':''}" click.trigger="fireChange(page=page+1)"><ui-glyph glyph="glyph-\${style}-right"></ui-glyph></a>
  <a class="pg-last \${page+1>=totalPages?'disabled':''}" click.trigger="fireChange(page=totalPages-1)"><ui-glyph glyph="glyph-\${style}-double-right"></ui-glyph></a>
</template>`),
    customElement('ui-pager'),
    __metadata("design:paramtypes", [Element])
], UIPager);
export { UIPager };
let UIDGFilter = class UIDGFilter {
    constructor(element) {
        this.element = element;
    }
};
UIDGFilter = __decorate([
    autoinject(),
    inlineView(`<template class="ui-filter"></template>`),
    customElement('ui-dg-filter'),
    __metadata("design:paramtypes", [Element])
], UIDGFilter);
export { UIDGFilter };
