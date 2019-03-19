/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import {
  bindable,
  children,
  customElement,
  inlineView,
  View,
  viewResources
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { GridderCell } from "./gridder-cell";
import { GridderUtils } from "./gridder-utils";
import { IGridderConfig } from "./index";
import view from "./ui-gridder.html";

@customElement("ui-gridder")
@viewResources(GridderCell)
@inlineView(view)
export class UIGridder {
  @bindable()
  public config: IGridderConfig[];

  protected ghost: HTMLElement & { startWidth: number; startHeight: number };

  protected utils = GridderUtils;

  protected owningView: AnyObject;

  @children(".ui-gridder__cell")
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
    const cell = getParentByTag($event.target, "gridder-cell");
    cell.setAttribute("draggable", "true");
    if ($event.dataTransfer) {
      $event.dataTransfer.setData("text/plain", "drag");
    }
    GridderUtils.startMove(cell as HTMLElement);
    return true;
  }
  protected stopDrag($event: DragEvent) {
    const cell = getParentByTag($event.target, "gridder-cell");
    cell.setAttribute("draggable", "false");
    GridderUtils.finishMove($event);
    return true;
  }
}
