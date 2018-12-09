import { UITreeNode } from "../model/ui-tree-model";
import { UITreePanel } from "./ui-tree-panel";
export declare class TreeNode {
    node: UITreeNode;
    index: number;
    protected tree: UITreePanel;
    readonly isSelected: boolean;
}
