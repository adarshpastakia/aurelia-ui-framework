/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, customElement, DOM, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import view from "./ui-panel.html";

@customElement("ui-panel")
@inlineView(view)
export class UIPanel {
  @bindable()
  public label: string = "";
  @bindable()
  public icon: string = "";

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public collapsed: boolean = false;

  @bindable()
  public width: string = "";
  @bindable()
  public minWidth: string = "16rem";
  @bindable()
  public maxWidth: string = "100vw";
  @bindable()
  public height: string = "";
  @bindable()
  public minHeight: string = "unset";
  @bindable()
  public maxHeight: string = "100vh";

  @bindable()
  public beforeclose: () => Promise<boolean> | boolean;

  @bindable()
  protected allowDrag: boolean = false;
  @bindable()
  protected closeable: boolean = false;
  @bindable()
  protected collapsible: boolean = false;

  constructor(protected element: Element) {}

  public close(): Promise<boolean> {
    return UIInternal.fireCallbackEvent(this, "beforeclose").then(b => (b ? this.remove() : false));
  }

  protected bind() {
    this.allowDrag = !isFalse(this.allowDrag);
    this.closeable = !isFalse(this.closeable);
    this.collapsible = !isFalse(this.collapsible);
  }

  protected toggleExpand(expand: boolean): void {
    this.collapsed = !expand;
  }

  protected startDrag($event: DragEvent) {
    this.element.setAttribute("draggable", "true");
    if ($event.dataTransfer) {
      $event.dataTransfer.setData("text/plain", "drag");
    }
    this.element.dispatchEvent(UIInternal.createEvent("startdrag"));
    return true;
  }
  protected stopDrag($event: DragEvent) {
    this.element.setAttribute("draggable", "false");
    this.element.dispatchEvent(UIInternal.createEvent("enddrag"));
    return true;
  }

  private remove(): boolean {
    this.element.dispatchEvent(UIInternal.createEvent("close"));
    UIInternal.queueTask(() => DOM.removeNode(this.element));
    return true;
  }
}
