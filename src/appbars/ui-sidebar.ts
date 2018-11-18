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
  protected collapsible: boolean = false;

  private obClick;

  constructor(protected element: Element) {
    this.collapsible = element.hasAttribute("collapsible");

    this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, target =>
      getParentByClass(target, "ui-sidebar__body") ? undefined : (this.peek = false)
    );
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
}
