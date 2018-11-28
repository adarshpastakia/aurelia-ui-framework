/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import {
  autoinject,
  bindable,
  bindingMode,
  computedFrom,
  customElement,
  inlineView
} from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-sidebar")
export class UISidebar {
  @bindable()
  public align: string = "start";
  @bindable()
  public label: string;
  @bindable()
  public width: string = "24rem";
  @bindable()
  public maxWidth: string = "40vw";
  @bindable()
  public minWidth: string = "4rem";

  @bindable()
  public titleBg: string;
  @bindable()
  public titleColor: string;
  @bindable()
  public titleWeight: string;

  @bindable()
  public toggleCollapse: boolean = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public collapsed: boolean = false;

  protected peek: boolean = false;
  protected resizable: boolean = false;
  protected collapsible: boolean = false;
  protected closeOnClick: boolean = false;

  private obClick;
  private bodyEl;
  private startX: number = 0;
  private isResizing: boolean = false;

  constructor(protected element: Element) {
    this.resizable = element.hasAttribute("resizable");
    this.collapsible = element.hasAttribute("collapsible");
    this.closeOnClick =
      element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));

    if (element.hasAttribute("toggle-bottom")) {
      element.classList.add("ui-sidebar--bottom");
    }

    this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, target =>
      !this.closeOnClick && getParentByClass(target, "ui-sidebar__body")
        ? undefined
        : (this.peek = false)
    );
  }

  protected bind(): void {
    if (this.element.hasAttribute("toggle-collapse")) {
      this.toggleCollapse = true;
    }
  }

  protected detached(): void {
    if (this.obClick) {
      this.obClick.dispose();
    }
  }

  @computedFrom("collapsed", "align")
  get toggleIcon() {
    return `${this.collapsed ? "expand" : "collapse"}-${this.align}`;
  }

  protected startResize($event: MouseEvent): void {
    if (!this.isResizing) {
      this.startX = $event.x || $event.clientX;
      this.isResizing = true;

      document.addEventListener("mousemove", this.doResize);
      document.addEventListener("mouseup", this.endResize);
      $event.stopEvent();
    }
  }

  protected resize($event: MouseEvent): void {
    if (this.isResizing) {
      let diff = ($event.x || $event.clientX) - this.startX;
      if (this.align === "end") {
        diff = -1 * diff;
      }
      if (isRtl(this.element)) {
        diff = -1 * diff;
      }
      const newWidth = this.bodyEl.offsetWidth + diff;
      if (newWidth <= convertToPx(this.maxWidth) && newWidth >= convertToPx(this.minWidth)) {
        this.width = newWidth + "px";
        this.startX = $event.x || $event.clientX;
      }
      $event.stopEvent();
    }
  }

  protected stopResize(): void {
    this.isResizing = false;
    document.removeEventListener("mousemove", this.doResize);
    document.removeEventListener("mouseup", this.endResize);
  }
  private doResize = e => this.resize(e);
  private endResize = () => this.stopResize();
}
