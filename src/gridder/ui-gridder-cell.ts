/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, bindingMode, customElement, inlineView } from "aurelia-framework";
import { BasePanel } from "../panels/base-panel";
import { GridderUtils } from "./gridder-utils";
import { IGridderConfig } from "./ui-gridder";
import view from "./ui-gridder-cell.html";

@customElement("ui-gridder-cell")
@inlineView(view)
export class UIGridderCell extends BasePanel {
  @bindable()
  public label: string = "";
  @bindable()
  public icon: string = "";

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public config: IGridderConfig;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public pinned: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public expanded: boolean = false;

  @bindable()
  protected closeable: boolean = false;
  @bindable()
  protected expandable: boolean = false;
  @bindable()
  protected moveable: boolean = false;
  @bindable()
  protected pinnable: boolean = false;
  @bindable()
  protected resizeable: boolean = false;
  @bindable()
  protected autoHideHeader: boolean = false;

  protected utils = GridderUtils;
  protected vmElement: HTMLElement;

  constructor(protected element: Element) {
    super();
  }

  protected bind() {
    super.bind();
    this.moveable = !isFalse(this.moveable);
    this.pinnable = !isFalse(this.pinnable);
    this.resizeable = !isFalse(this.resizeable);
    this.autoHideHeader = !isFalse(this.autoHideHeader);
  }

  protected attached(): void {
    (this.element as HTMLElement).style.gridArea = `
    ${this.config.row || "auto"} / 
    ${this.config.col || "auto"} / 
    span ${this.config.rowSpan} / 
    span ${this.config.colSpan}`;
  }

  protected togglePinned(pinned: boolean): void {
    this.pinned = pinned;
  }
}
