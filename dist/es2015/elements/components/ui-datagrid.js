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
    bind(bindingContext, overrideContext) {
        this.cols = overrideContext['parentOverrideContext'].bindingContext.cols;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDgRow.prototype, "record", void 0);
UIDgRow = __decorate([
    inlineView(`<template>
  <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}">
  <div if.bind="col.type=='normal'"><span class="\${col.class}" innerhtml.bind='col.getValue(record[col.dataId],record)'></span></div>
  <div if.bind="col.type=='glyph'" title.bind="col.getTooltip(record[col.dataId],record)"><ui-glyph class="\${col.class} \${col.getGlyph(record[col.dataId],record)}" glyph.bind="col.getGlyph(record[col.dataId],record)"></ui-glyph></div>
  <div if.bind="col.type=='link'"><a class="ui-link \${col.class} \${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}" click.trigger="col.fireClick($event,record[col.dataId],record)"><ui-glyph glyph.bind="col.getGlyph(record[col.dataId],record)" if.bind="col.glyph"></ui-glyph> <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></a></div>
  <div if.bind="col.type=='button'" class="btn-fix"><ui-button click.trigger="col.fireClick($event,record[col.dataId],record)" theme.bind="col.getTheme(record[col.dataId],record)" small square glyph.bind="col.getGlyph(record[col.dataId],record)" disabled.bind="col.isDisabled(record[col.dataId],record)" dropdown.bind="dropdown" menuopen.trigger="col.fireMenuOpen($event, record)"><span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></ui-button></div>
  </td>
  <td class="ui-expander"><div>&nbsp;</div></td>
</template>`),
    customElement('ui-dg-row')
], UIDgRow);
export { UIDgRow };
let UIDatagrid = class UIDatagrid {
    constructor(element) {
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
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) {
        this.columnsChanged(this.columns);
        this.dataChanged(this.data);
        if (this.pager) {
            if (!(this.pager instanceof UIPager))
                throw new Error('Pager must be instance of UIPager');
            this.obPageChange = UIEvent.observe(this.pager, 'page').subscribe(() => this.makePage());
        }
    }
    attached() {
        this.scrolling();
    }
    detached() {
        if (this.obPageChange)
            this.obPageChange.dispose();
    }
    unbind() { }
    columnsChanged(newValue) {
        this.cols = _.sortBy(this.columns, 'locked');
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
        this.paged = [];
        UIEvent.queueTask(() => {
            let data = _.orderBy(this.filtered, [this.sortColumn, 'ID', 'id'], [this.sortOrder, this.sortOrder, this.sortOrder]);
            if (this.pager) {
                data = _.slice(data, this.pager.page * this.perPage, (this.pager.page * this.perPage) + this.perPage);
            }
            this.paged = data;
            this.loaded = true;
            UIEvent.queueTask(() => this.isBusy = false);
        });
    }
    doSort(col) {
        if (!col.sortable)
            return;
        if (this.sortColumn != col.dataId)
            this.sortOrder = 'asc';
        if (this.sortColumn == col.dataId)
            this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
        this.sortColumn = col.dataId;
        UIEvent.queueTask(() => this.makePage());
    }
    calculateWidth(cols) {
        let w = 0;
        _.forEach(cols, c => { c.left = w; w += c.getWidth(); });
        return (this.tableWidth = (w + 20) + 'px');
    }
    fireSelect(record) {
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
    }
};
__decorate([
    children('ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
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
<div if.bind="loaded && (!data || data.length==0)" class="ui-dg-empty"><slot name="dg-empty"></slot></div>
<div>
<table ref="dgHead" width.bind="tableWidth" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <thead><tr>
    <td repeat.for="col of cols" click.trigger="doSort(col)" class="\${col.sortable?'ui-sortable':''} \${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>
      <span class="ui-dg-header" innerhtml.bind='col.getTitle()'></span>
      <span class="ui-filter" if.bind="col.filter"><ui-glyph glyph="glyph-funnel"></ui-glyph></span>
      <span class="ui-sort \${col.dataId==sortColumn ? sortOrder:''}" if.bind="col.sortable"></span>
      <span class="ui-resizer" if.bind="col.resize" mousedown.trigger="resizeColumn($event,col,cols[$index+1])"></span>
    </div></td>
    <td class="ui-expander"><div><span class="ui-dg-header">&nbsp;</span></div></td>
  </tr></thead>
</table>
</div>
<div class="ui-dg-wrapper" ref="scroller" scroll.trigger="scrolling() & debounce:1">
<table width.bind="calculateWidth(cols,resizing)" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>
  <tbody>
    <tr if.bind="!virtual" class="\${$even?'even':'odd'}" as-element="ui-dg-row" record.bind="record" repeat.for="record of paged" click.delegate="fireSelect($parent.selected=record)"
      class="\${$parent.selected==record?'ui-selected':''}"></tr>

    <tr if.bind="virtual" class="\${$even?'even':'odd'}" as-element="ui-dg-row" record.bind="record" virtual-repeat.for="record of paged" click.delegate="fireSelect($parent.selected=record)"
      class="\${$parent.selected==record?'ui-selected':''}"></tr>

    <tr class="filler"><td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''}" css.bind="{left: col.left+'px'}"><div>&nbsp;</div></td><td class="ui-expander"><div>&nbsp;</div></td></tr>
  </tbody>
</table></div>
<div>
<table ref="dgFoot" width.bind="tableWidth" css.bind="{'table-layout': tableWidth?'fixed':'auto' }">
  <colgroup>
    <col repeat.for="col of cols" data-index.bind="$index" width.bind="col.width"/>
    <col/>
  </colgroup>

  <tfoot if.bind="summaryRow && data && data.length!=0"><tr>
    <td repeat.for="col of cols" class="\${col.locked==0?'ui-locked':''} \${col.align}" css.bind="{left: col.left+'px'}"><div innerhtml.bind='col.getSummary(summaryRow, filtered)'></div></td>
    <td class="ui-expander"><div>&nbsp;</div></td>
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
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() { }
    detached() { }
    unbind() { }
    fireChange() {
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
    created(owningView, myView) { }
    bind(bindingContext, overrideContext) { }
    attached() { }
    detached() { }
    unbind() { }
};
UIDGFilter = __decorate([
    autoinject(),
    inlineView(`<template class="ui-filter"></template>`),
    customElement('ui-dg-filter'),
    __metadata("design:paramtypes", [Element])
], UIDGFilter);
export { UIDGFilter };
