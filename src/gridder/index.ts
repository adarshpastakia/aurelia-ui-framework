/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { UIGridder } from "./ui-gridder";
import { UIGridderCell } from "./ui-gridder-cell";

export interface IGridderConfig {
  order?: number;
  row?: number;
  col?: number;
  rowSpan?: number;
  colSpan?: number;
}

export const Gridder = [UIGridder, UIGridderCell];
