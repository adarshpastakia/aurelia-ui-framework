/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { DOM } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

export class BasePanel {
  public pinned: boolean = false;
  public expanded: boolean = false;
  public collapsed: boolean = false;

  public beforeclose: () => Promise<boolean> | boolean;

  protected closeable: boolean = false;
  protected expandable: boolean = false;
  protected collapsible: boolean = false;

  protected element: Element;

  public close(): Promise<boolean> {
    return UIInternal.fireCallbackEvent(this, "beforeclose").then(b => (b ? this.remove() : false));
  }

  protected bind() {
    this.closeable = !isFalse(this.closeable);
    this.expandable = !isFalse(this.expandable);
    this.collapsible = !isFalse(this.collapsible);
  }

  protected toggleExpand(expand: boolean): void {
    this.expanded = expand;
    this.element.dispatchEvent(UIInternal.createEvent("expand", this.expanded));
  }

  protected toggleCollapse(collapse: boolean): void {
    this.collapsed = collapse;
  }

  protected remove(): boolean {
    this.element.dispatchEvent(UIInternal.createEvent("close"));
    UIInternal.queueTask(() => DOM.removeNode(this.element));
    return true;
  }
}
