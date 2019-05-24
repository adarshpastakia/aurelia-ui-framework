/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, customElement, inlineView } from "aurelia-framework";
import { BasePanel } from "./base-panel";
import view from "./ui-panel.html";

@customElement("ui-panel")
@inlineView(view)
export class UIPanel extends BasePanel {
  @bindable()
  public label: string = "";
  @bindable()
  public icon: string = "";

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public collapsed: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public expanded: boolean = false;

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
  protected closeable: boolean = false;
  @bindable()
  protected expandable: boolean = false;
  @bindable()
  protected collapsible: boolean = false;

  constructor(protected element: Element) {
    super();
  }
}
