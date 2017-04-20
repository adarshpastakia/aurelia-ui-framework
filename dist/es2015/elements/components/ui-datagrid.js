var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, bindingMode, children, inlineView, containerless } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import * as _ from "lodash";
let UIDgRow = class UIDgRow {
    constructor() {
        this.level = 0;
    }
    expand(evt) {
        this.record.isOpen = !this.record.isOpen;
        evt.stopPropagation();
        evt.preventDefault();
        return false;
    }
    getSubdata() {
        if (isFunction(this.record.subdata))
            return this.record.subdata(this.record);
        return this.record.subdata;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "level", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "record", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "parent", void 0);
UIDgRow = __decorate([
    inlineView(`<template><tr class="level-\${level} \${record.isOpen?'ui-expanded':''} \${parent.selected==record?'ui-selected':''}" click.delegate="parent.fireSelect(parent.selected=record)">
  <td class="ui-expander" if.bind="parent.handleSize>0">
    <div><a if.bind="record.subdata" click.trigger="expand($event)"><ui-glyph glyph.bind="record.isOpen?'glyph-icon-minus':'glyph-icon-plus'"></ui-glyph></a></div>
  </td>
  <td repeat.for="col of parent.cols" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}">
  <div if.bind="col.type=='normal'"><span class="\${col.class}" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>
  <div if.bind="col.type=='glyph'" title.bind="col.getTooltip(record[col.dataId],record)"><ui-glyph class="\${col.class} \${col.getGlyph(record[col.dataId],record)}" glyph.bind="col.getGlyph(record[col.dataId],record)"></ui-glyph></div>
  <div if.bind="col.type=='link'"><a class="ui-link \${col.class} \${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}" click.trigger="col.fireClick($event,record[col.dataId],record)"><ui-glyph glyph.bind="col.getGlyph(record[col.dataId],record)" if.bind="col.glyph"></ui-glyph> <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></a></div>
  <div if.bind="col.type=='button'" class="btn-fix"><ui-button click.trigger="col.fireClick($event,record[col.dataId],record)" theme.bind="col.getTheme(record[col.dataId],record)" small square glyph.bind="col.getGlyph(record[col.dataId],record)" disabled.bind="col.isDisabled(record[col.dataId],record)" dropdown.bind="col.dropdown" menuopen.trigger="col.fireMenuOpen($event, record)"><span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></ui-button></div>
  </td>
  <td class="filler"><div>&nbsp;</div></td></tr>

  <ui-dg-row containerless if.bind="record.isOpen" level.bind="level+1" parent.bind="parent"
    record.bind="rec" repeat.for="rec of getSubdata()" class="\${$last?'ui-last-inner':''}">
  </ui-dg-row>
</template>`),
    customElement('ui-dg-row')
], UIDgRow);
export { UIDgRow };
let UIDatagrid = class UIDatagrid {
    constructor(element) {
        this.element = element;
        this.loaded = true;
        this.summaryRow = false;
        this.sortColumn = '';
        this.sortOrder = '';
        this.perPage = 50;
        this.cols = [];
        this.headCols = [];
        this.headCols2 = [];
        this.paged = [];
        this.filtered = [];
        this.tableWidth = '20px';
        this.virtual = false;
        this.isBusy = false;
        this.handleSize = 30;
        this.resizing = false;
        this.virtual = element.hasAttribute('virtual');
        if (!element.hasAttribute('scroll'))
            this.element.classList.add('ui-auto-size');
        if (!element.hasAttribute('row-expander'))
            this.handleSize = 0;
    }
    bind(bindingContext, overrideContext) {
        if (this.pager) {
            if (!(this.pager instanceof UIPager))
                throw new Error('Pager must be instance of UIPager');
            this.obPageChange = UIEvent.observe(this.pager, 'page').subscribe(() => this.makePage());
        }
    }
    attached() {
        UIEvent.queueTask(() => {
            this.columnsChanged(this.columns);
            this.dataChanged(this.data);
            this.scrolling();
        });
    }
    detached() {
        if (this.obPageChange)
            this.obPageChange.dispose();
    }
    columnsChanged(newValue) {
        this.headCols = _.sortBy(this.columns, 'locked');
        this.headCols2 = _.flatMap(this.headCols, c => c.columns || []);
        this.cols = _.sortBy(_.flatMap(this.columns, c => c.columns || [c]), 'locked');
    }
    dataChanged(newValue) {
        UIEvent.queueTask(() => {
            if (this.pager) {
                this.pager.page = 0;
                this.pager.totalPages = Math.ceil(this.data.length / this.perPage);
            }
            this.filter();
            this.scrolling();
        });
    }
    scrolling() {
        this.dgHead.style.transform = `translateX(-${this.scroller.scrollLeft}px)`;
        if (this.dgFoot)
            this.dgFoot.style.transform = this.dgHead.style.transform;
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
    calculateWidth(cols) {
        let w = this.handleSize;
        _.forEach(cols, c => { c.left = w; w += c.getWidth(); });
        return (this.tableWidth = (w + 20) + 'px');
    }
    fireSelect(record) {
        this.selected = record;
        UIEvent.fireEvent('rowselect', this.element, ({ record }));
    }
    resizeColumn(evt, col, next) {
        if (evt.button != 0)
            return true;
        this.diff = 0;
        this.colResize = col;
        this.colNext = next;
        this.resizing = true;
        this.startX = (evt.x || evt.clientX);
        this.ghost.style.left = (col.left + parseInt(col.width) - (col.locked == 0 ? 0 : this.scroller.scrollLeft)) + 'px';
        document.addEventListener('mouseup', this.stop = evt => this.resizeEnd(evt));
        document.addEventListener('mousemove', this.move = evt => this.resize(evt));
    }
    resize(evt) {
        var x = (evt.x || evt.clientX) - this.startX;
        if (x < 0 && (parseInt(this.colResize.width) + this.diff) <= (this.colResize.minWidth || 80))
            return;
        if (x > 0 && (parseInt(this.colResize.width) + this.diff) >= (500))
            return;
        this.startX = (evt.x || evt.clientX);
        this.diff += x;
        this.ghost.style.left = (parseInt(this.ghost.style.left) + x) + 'px';
    }
    resizeEnd(evt) {
        this.resizing = false;
        if (this.colNext)
            this.colNext.left += this.diff;
        this.colResize.width = (parseInt(this.colResize.width) + this.diff);
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
], UIDatagrid.prototype, "loaded", void 0);
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
<div>
<table ref="dgHead" width.bind="tableWidth" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col width="\${handleSize}" if.bind="handleSize>0"/>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <thead><tr>
    <td class="ui-expander" if.bind="handleSize>0" rowspan.bind="headCols2.length?2:''"><div>&nbsp;</div></td>
    <td repeat.for="col of headCols" mouseup.trigger="doSort(col)" class="\${col.sortable?'ui-sortable':''} \${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}" rowspan.bind="headCols2.length?(col.isGroup?1:2):''" colspan.bind="col.isGroup?col.columns.length:1">
    <div if.bind="!col.isGroup">
      <span class="ui-dg-header" innerhtml.bind='col.getTitle()'></span>
      <span class="ui-filter" if.bind="col.filter"><ui-glyph glyph="glyph-funnel"></ui-glyph></span>
      <span class="ui-sort \${col.dataId==sortColumn ? sortOrder:''}" if.bind="col.sortable"></span>
      <span class="ui-resizer" if.bind="col.resize" mousedown.trigger="resizeColumn($event,col,cols[$index+1])"></span>
    </div><div if.bind="col.isGroup" class="ui-dg-group"><span class="ui-dg-header" innerhtml.bind='col.getTitle()'></span></div></td>
    <td class="filler" rowspan.bind="headCols2.length?2:''"><div><span class="ui-dg-header">&nbsp;</span></div></td>
  </tr><tr show.bind="headCols2.length"><td repeat.for="col of headCols2" mouseup.trigger="doSort(col)" class="\${col.sortable?'ui-sortable':''} \${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}" if.bind="col"><div>
    <span class="ui-dg-header" innerhtml.bind='col.getTitle()'></span>
    <span class="ui-filter" if.bind="col.filter"><ui-glyph glyph="glyph-funnel"></ui-glyph></span>
    <span class="ui-sort \${col.dataId==sortColumn ? sortOrder:''}" if.bind="col.sortable"></span>
    <span class="ui-resizer" if.bind="col.resize" mousedown.trigger="resizeColumn($event,col,cols[$index+1])"></span>
  </div></td></tr></thead>
</table>
</div>
<div show.bind="loaded && (!data || data.length==0)" class="ui-dg-empty"><slot name="dg-empty"></slot></div>
<div class="ui-dg-wrapper" ref="scroller" scroll.trigger="scrolling() & debounce:1">
<table width.bind="calculateWidth(cols,resizing)" css.bind="{'table-layout': tableWidth?'fixed':'auto' }" ref="mainTable">
  <colgroup>
    <col width="\${handleSize}" if.bind="handleSize>0"/>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tbody if.bind="!virtual" class="\${$even?'even':'odd'}" parent.bind="$parent"
    as-element="ui-dg-row" record.bind="record" repeat.for="record of paged">
  </tbody>
  <tbody if.bind="virtual" class="\${$even?'even':'odd'}" parent.bind="$parent"
    as-element="ui-dg-row" record.bind="record" virtual-repeat.for="record of paged">
  </tbody>
</table>
<table width.bind="tableWidth" class="filler" css.bind="{'table-layout': tableWidth?'fixed':'auto', height:((scroller.offsetHeight<mainTable.offsetHeight?0:scroller.offsetHeight-mainTable.offsetHeight)+'px') }">
  <colgroup>
    <col width="\${handleSize}" if.bind="handleSize>0"/>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tbody class="odd"><tr class="filler">
    <td class="ui-expander" if.bind="handleSize>0"><div>&nbsp;</div></td>
    <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>&nbsp;</div></td>
    <td class="filler"><div>&nbsp;</div></td>
  </tr></tbody>
</table></div>
<div>
<table ref="dgFoot" width.bind="tableWidth" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col width="\${handleSize}" if.bind="handleSize>0"/>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tfoot if.bind="summaryRow"><tr>
    <td class="ui-expander" if.bind="handleSize>0"><div>&nbsp;</div></td>
    <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}"><div innerhtml.bind='col.getSummary(summaryRow, data)'></div></td>
    <td class="filler"><div>&nbsp;</div></td>
  </tr></tfoot>
</table>
</div>
<div class="ui-dg-loader" if.bind="isBusy">
  <div class="ui-loader-div">
    <ui-glyph class="ui-anim-loader" glyph="glyph-loader"></ui-glyph>
  </div>
</div></template>`),
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
