/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, children, customElement, inlineView, viewResources } from "aurelia-framework";
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

  @children("ui-column")
  public columns;

  /*** Start private props ***/
  protected ds;
  /*** End private props ***/

  protected dataSourceChanged() {
    if (isArray(this.dataSource)) {
      this.ds = new UIDataSource(this.dataSource);
    }
    if (this.dataSource instanceof UIDataSource) {
      this.ds = this.dataSource;
    }
  }
}
