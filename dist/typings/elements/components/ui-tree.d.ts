import { UITreeOptions, UITreeModel } from "../../utils/ui-tree-model";
export declare class UITree {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    value: string;
    hover: string;
    model: any[];
    options: UITreeOptions;
    private root;
    private searchText;
    private selectedNode;
    private searchable;
    private ignoreChange;
    valueChanged(newValue: any): void;
    optionsChanged(newValue: any): void;
    modelChanged(newValue: any): void;
    private readonly rootNodes;
    getChecked(nodes?: any, retVal?: {
        checked: any[];
        partial: any[];
        unchecked: any[];
    }): {
        checked: any[];
        partial: any[];
        unchecked: any[];
    };
    getCheckedTree(nodes?: any): any[];
    expandAll(): void;
    collapseAll(): void;
    private findNode;
    private itemSelect;
    private itemChecked;
    private itemClicked;
    private itemOver;
    private itemOut;
    private scrollIntoView;
    private searchTextChanged;
    private filter;
}
export declare class TreeNode {
    element: Element;
    constructor(element: Element);
    node: UITreeModel;
    options: UITreeOptions;
    hideByCount: boolean;
    readonly canHideByCount: boolean;
    private fireClicked;
    private doMouseOver;
    private doMouseOut;
}
