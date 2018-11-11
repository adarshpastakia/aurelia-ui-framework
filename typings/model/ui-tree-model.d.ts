export declare class UITreeModel {
    private parent?;
    readonly nodeIcon: string;
    readonly checkIcon: "tree-check-half" | "tree-check-on" | "tree-check-off";
    readonly expandIcon: "tree-collapse" | "tree-expand";
    id: string;
    icon: string;
    label: string;
    iconOpen: string;
    iconClosed: string;
    children: UITreeModel[];
    leaf: boolean;
    checked: number;
    expanded: boolean;
    selected: boolean;
    disabled: boolean;
    constructor(model: AnyObject, parent?: UITreeModel);
    protected toggleCheck(): void;
    private updatePartial;
    private updateChild;
}
