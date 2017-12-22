//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, inlineView, computedFrom } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";

@autoinject()
@inlineView(`<template class="ui-chip" css.bind="{minWidth:width}"><span class="ui-chip-label" css.bind="{backgroundColor:color}"><ui-glyph if.bind="glyph" glyph.bind="glyph"></ui-glyph><span if.bind="label">\${label}</span></span><span class="ui-chip-value"><slot></slot></span><a click.trigger="remove()" class="ui-chip-close" if.bind="canClose">&times</a></template>`)
@customElement('ui-chip')
export class UIChip {
  constructor(public element: Element) {
    if (element.hasAttribute('large')) element.classList.add('ui-large');
    if (element.hasAttribute('small')) element.classList.add('ui-small');
    this.canClose = element.hasAttribute('removable') || element.hasAttribute('remove.trigger');
  }

  @bindable() id = '';
  @bindable() glyph = '';
  @bindable() label = '';
  @bindable() color = '';
  @bindable() width = 'auto';

  private canClose = false;

  remove() {
    UIEvent.fireEvent('remove', this.element, this.id);
  }
}

@autoinject()
@inlineView(`<template class="ui-breadcrumb" click.delegate="fireChange($event)"><slot></slot></template>`)
@customElement('ui-breadcrumb')
export class UIBreadcrumb {
  constructor(public element: Element) {
  }

  private fireChange($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    if (!isEmpty($event.detail)) UIEvent.fireEvent('change', this.element, $event.detail);
    return false;
  }
}
@autoinject()
@inlineView(`<template class="ui-crumb"><a href="crumb.href || 'javascript:;'" click.trigger="fireClick($event)"><slot></slot></a></template>`)
@customElement('ui-crumb')
export class UICrumb {
  constructor(public element: Element) { }

  @bindable() id = '';
  @bindable() href = 'javascript:;';

  private fireClick($event) {
    $event.cancelBubble = true;
    $event.stopPropagation();
    UIEvent.fireEvent('click', this.element, this.id);
    return false;
  }
}


@autoinject()
@inlineView(`<template class="ui-pager">
  <a class="pg-first \${page==0?'ui-disabled':''}" click.trigger="fireChange(page=0)"><ui-glyph glyph="glyph-\${style}-double-left"></ui-glyph></a>
  <a class="pg-prev \${page==0?'ui-disabled':''}" click.trigger="fireChange(page=page-1)"><ui-glyph glyph="glyph-\${style}-left"></ui-glyph></a>
  <span class="pg-input">\${page+1} of \${pages}</span>
  <a class="pg-next \${page+1>=pages?'ui-disabled':''}" click.trigger="fireChange(page=page+1)"><ui-glyph glyph="glyph-\${style}-right"></ui-glyph></a>
  <a class="pg-last \${page+1>=pages?'ui-disabled':''}" click.trigger="fireChange(page=pages-1)"><ui-glyph glyph="glyph-\${style}-double-right"></ui-glyph></a>
</template>`)
@customElement('ui-pager')
export class UIPager {
  constructor(public element: Element) { }

  @bindable({ defaultBindingMode: bindingMode.twoWay }) page = 0;

  @bindable() dataSource;
  @bindable() style = "chevron";
  @bindable() totalPages = 0;

  @computedFrom('dataSource.metadata.totalPages', 'totalPages')
  get pages() {
    if (this.dataSource) return this.dataSource.totalPages;
    return this.totalPages;
  }

  fireChange() {
    if (this.dataSource) this.dataSource.loadPage(this.page);
    UIEvent.fireEvent('change', this.element, this.page);
  }
}
