/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, customElement, DOM, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { GridderUtils } from "./gridder-utils";
import view from "./ui-gridder-cell.html";

@customElement("ui-gridder-cell")
@inlineView(view)
export class UIGridderCell {
  @bindable()
  public rowSpan = 1;
  @bindable()
  public colSpan = 1;

  @bindable()
  public allowDrag = false;
  @bindable()
  public allowDrop = false;
  @bindable()
  public allowResize = false;

  protected utils = GridderUtils;

  constructor(protected element: Element) {}

  protected bind() {
    this.allowDrag = !isFalse(this.allowDrag);
    this.allowDrop = !isFalse(this.allowDrop);
    this.allowResize = !isFalse(this.allowResize);
  }

  protected attached() {
    (this.element as HTMLElement).style.gridArea = `auto / auto / span ${this.rowSpan} / span ${
      this.colSpan
    }`;
  }

  protected startDrag($event: DragEvent) {
    this.element.setAttribute("draggable", "true");
    if ($event.dataTransfer) {
      $event.dataTransfer.setData("text/plain", "drag");
    }
    GridderUtils.startMove(this.element as HTMLElement);
    return true;
  }
  protected stopDrag($event: DragEvent) {
    this.element.setAttribute("draggable", "false");
    this.element.dispatchEvent(UIInternal.createEvent("enddrag"));
    GridderUtils.finishMove($event);
    return true;
  }

  protected remove(): boolean {
    UIInternal.queueTask(() => DOM.removeNode(this.element));
    return true;
  }
}
