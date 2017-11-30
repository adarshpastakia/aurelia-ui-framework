//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customElement, bindable, bindingMode, children, inlineView, containerless, DOM, TemplatingEngine } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template class="ui-datagrid"><div class="ui-hide"><slot></slot></div>
<div class="ui-dg-head"></div>
<div class="ui-dg-body"></div>
<div class="ui-dg-foot"></div>
</template>`)
@customElement('ui-datagrid')
export class UIDatagrid {
  constructor(public element: Element, private engine: TemplatingEngine) {
    // if(element.hasAttribute('virtual'))
    this.rowCounter = element.hasAttribute('row-counter');
    this.rowExpander = element.hasAttribute('row-expander');
    if (!element.hasAttribute('scroll')) this.element.classList.add('ui-auto-size');
  }

  @children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph') columns;

  @bindable() dataSource;

  cols = [];
  colHead = [];
  colLocked = [];

  private virtual = false;
  private rowCounter = false;
  private rowExpander = false;

  columnsChanged(c?) {
    this.colHead = _.sortBy(this.columns, 'locked');
    let cols = _.sortBy(_.flatMap(this.columns, c => c.columns || [c]), 'locked');
    this.cols = _.filter(cols, (c: any) => c.locked == 1);
    this.colLocked = _.filter(cols, (c: any) => c.locked == 0);
  }
}
