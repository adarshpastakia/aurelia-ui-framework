/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { UIGridder } from "./ui-gridder";

export interface IGridderConfig {
  icon?: string;
  label?: string;
  headAutoHide?: boolean;

  order?: number;
  row?: number;
  col?: number;
  rowSpan?: number;
  colSpan?: number;

  pinned?: boolean;
  moveable?: boolean;
  pinnable?: boolean;
  closeable?: boolean;
  expandable?: boolean;
  resizeable?: boolean;

  view;
  model;
  viewModel;
}

export const Gridder = [UIGridder];
