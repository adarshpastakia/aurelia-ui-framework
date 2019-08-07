/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import {
  bindable,
  bindingMode,
  children,
  customElement,
  inlineView,
  viewResources
} from "aurelia-framework";
import { UIDataSource } from "../../models/ui-data-source";
import { BodyCell } from "./body-cell";
import { HeaderCell } from "./header-cell";
import view from "./ui-data-grid.html";

@customElement("ui-datagrid")
@viewResources(HeaderCell, BodyCell)
@inlineView(view)
export class UIDataGrid {
  @bindable()
  public dataSource;

  @bindable()
  public checkable: boolean;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public selected: KeyValue[] = [];

  @children("ui-column")
  public columns;

  /*** Start private props ***/
  protected ds;

  protected showCounter;
  /*** End private props ***/

  constructor(private element: Element) {
    this.showCounter = element.hasAttribute("counter");
  }

  protected attached() {
    this.checkable = this.checkable || this.element.hasAttribute("checkable");
  }

  protected dataSourceChanged() {
    if (isArray(this.dataSource)) {
      this.ds = new UIDataSource(this.dataSource);
    }
    if (this.dataSource instanceof UIDataSource) {
      this.ds = this.dataSource;
    }
  }

  protected toggleSelection($event, record) {
    if (!this.selected) {
      this.selected = [];
    }
    this.selected = $event.detail.checked
      ? [...this.selected, record]
      : this.selected.filter(r => r !== record);
  }

  protected toggleSelectionAll($event) {
    this.selected = this.selected.length === 0 ? [...this.ds.data] : [];
  }
}
