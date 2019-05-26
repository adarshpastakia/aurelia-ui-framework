/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, computedFrom, inlineView } from "aurelia-framework";
import { UITreeNode } from "../../models/ui-tree-model";
import view from "./tree-node.html";
import { UITreePanel } from "./ui-tree-panel";

@inlineView(view)
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
