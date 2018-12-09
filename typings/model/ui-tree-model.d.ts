export declare class UITreeModel {
    private maxNodes;
    children: UITreeNode[];
    nodes: UITreeNode[];
    constructor(children: KeyValue[], maxNodes?: number);
    toggleExpand(index: number): void;
    toggleMore(index: number): void;
    getChecked(): UITreeNode[];
    private getCheckedNodes;
    private getExpandedTree;
}
export declare class UITreeNode {
    private parent?;
    readonly nodeIcon: string;
    readonly checkIcon: "tree-check-half" | "tree-check-on" | "tree-check-off";
    readonly expandIcon: "tree-collapse" | "tree-expand";
    id: string;
    icon: string;
    label: string;
    model: KeyValue;
    iconOpen: string;
    iconClosed: string;
    children: UITreeNode[];
    leaf: boolean;
    parentId: string;
    level: number;
    checked: number;
    expanded: boolean;
    selected: boolean;
    disabled: boolean;
    showingMore: boolean;
    constructor(node: KeyValue, parent?: UITreeNode);
    toggleCheck(): void;
    private updatePartial;
    private updateChild;
}
