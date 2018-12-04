/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, computedFrom } from "aurelia-framework";
import { UITreeNode } from "../model/ui-tree-model";
import { UITreePanel } from "./ui-tree-panel";

@autoinject()
export class TreeNode {
  @bindable()
  public node: UITreeNode;
  @bindable()
  public index: number;
  @bindable()
  protected tree: UITreePanel;

  @computedFrom("tree.value", "node.id")
  get isSelected(): boolean {
    return this.tree.value === this.node.id;
  }
}
