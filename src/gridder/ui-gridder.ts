/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { children, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { GridderUtils } from "./gridder-utils";

@customElement("ui-gridder")
@inlineView(`<template class="ui-gridder">
<div class="ui-gridder__container"><slot></slot>
  <div class="ui-gridder__ghost" ref="ghost" show.bind="!!utils.dragEl"></div>
</div>
</template>`)
export class UIGridder {
  protected ghost: HTMLElement & { startWidth: number; startHeight: number };

  protected utils = GridderUtils;

  @children("ui-gridder-cell")
  private cells;

  constructor(private element: Element) {}

  protected attached() {
    GridderUtils.colCount = 12; // Math.floor(this.gridder.offsetWidth / 180);
    GridderUtils.minWidth = Math.floor(this.element.offsetWidth / GridderUtils.colCount);

    GridderUtils.ghost = this.ghost;
  }

  protected cellsChanged() {
    UIInternal.queueTask(() => {
      GridderUtils.cells = this.cells;
      GridderUtils.rowCount = Math.floor(
        this.element.firstElementChild.offsetHeight / GridderUtils.minHeight
      );
    });
  }
}
