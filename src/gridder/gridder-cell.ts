/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, customElement, inlineView, View } from "aurelia-framework";
import { BasePanel } from "../panels/base-panel";
import view from "./gridder-cell.html";
import { GridderUtils } from "./gridder-utils";
import { IGridderConfig } from "./index";

@customElement("gridder-cell")
@inlineView(view)
export class GridderCell extends BasePanel {
  @bindable()
  public config: IGridderConfig;
  @bindable()
  public owningView: AnyObject;

  protected utils = GridderUtils;
  protected panelEl: HTMLElement;

  protected view;
  protected model;
  protected viewModel;

  private composeVm: AnyObject;

  constructor(protected element: Element) {
    super();
  }

  // Update compose owningView and viewResource to current owningView
  protected attached(): void {
    this.composeVm.owningView = this.owningView;
    this.composeVm.viewResources = this.owningView.resources;

    this.view = this.config.view;
    this.model = this.config.model;
    this.viewModel = this.config.viewModel;

    (this.element as HTMLElement).style.gridArea = `
    ${this.config.row || "auto"} / 
    ${this.config.col || "auto"} / 
    span ${this.config.rowSpan} / 
    span ${this.config.colSpan}`;
  }

  protected togglePinned(pinned: boolean): void {
    this.config.pinned = pinned;
  }
}
