/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { UIColumn } from "./grid/ui-column";
import { UIDataGrid } from "./grid/ui-data-grid";
import { UIDataCard } from "./list/ui-data-card";
import { UIDataList } from "./list/ui-data-list";
import { UIDataTable } from "./list/ui-data-table";
import { UITreePanel } from "./tree/ui-tree-panel";

export const DataPanels = [UITreePanel, UIDataGrid, UIColumn, UIDataList, UIDataCard, UIDataTable];
