/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, children, computedFrom, customElement, inlineView, viewResources } from "aurelia-framework";
import { BodyCell } from "./body-cell";
import { HeaderCell } from "./header-cell";
import view from "./ui-data-grid.html";

@customElement("ui-datagrid")
@viewResources(HeaderCell, BodyCell)
@inlineView(view)
export class UIDataGrid {
  @bindable()
  public dataSource;

  @children("ui-column")
  public columns;

  @computedFrom("dataSource", "dataSource.data")
  get dataList() {
    if (isArray(this.dataSource)) {
      return this.dataSource;
    }
    return [];
  }
}
