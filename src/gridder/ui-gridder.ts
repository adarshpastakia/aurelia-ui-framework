/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { children, customElement, inlineView, View } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { GridderUtils } from "./gridder-utils";
import { UIGridderCell } from "./ui-gridder-cell";
import view from "./ui-gridder.html";

export interface IGridderConfig {
  order?: number;
  row?: number;
  col?: number;
  rowSpan?: number;
  colSpan?: number;
}

@customElement("ui-gridder")
@inlineView(view)
class UIGridder {
  protected ghost: HTMLElement & { startWidth: number; startHeight: number };

  protected utils = GridderUtils;

  protected owningView: AnyObject;

  @children("ui-gridder-cell")
  private cells;

  constructor(private element: Element) {}

  // Set current owningView
  protected created(owningView: View) {
    this.owningView = owningView;
  }

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

  protected startDrag($event: DragEvent) {
    GridderUtils.startMove($event);
    return true;
  }
  protected stopDrag($event: DragEvent) {
    GridderUtils.finishMove($event);
    return true;
  }
}

export const Gridder = [UIGridder, UIGridderCell];
