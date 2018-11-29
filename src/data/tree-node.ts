/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable } from "aurelia-framework";
import { UITreeModel } from "../model/ui-tree-model";
import { UITreePanel } from "./ui-tree-panel";

@autoinject()
export class TreeNode {
  @bindable()
  public node: UITreeModel;
  @bindable()
  public index: number;
  @bindable()
  protected tree: UITreePanel;
}
