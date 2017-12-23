export declare class UITreeModel {
    static seed: number;
    id: any;
    text: string;
    label: string;
    level: number;
    extra: any;
    icon: string;
    openIcon: string;
    closedIcon: string;
    root: boolean;
    leaf: boolean;
    active: boolean;
    childActive: boolean;
    expanded: boolean;
    children: Array<UITreeModel>;
    checked: number;
    parent: UITreeModel;
    isVisible: boolean;
    constructor(model: any, level?: number, parent?: UITreeModel);
    isChecked: any;
    readonly data: any;
    expandToggle(v: any): void;
    updateChild(prop: any, v: any): void;
    updatePartial(): void;
    readonly isLeaf: boolean;
}
export interface UITreePanel {
    getChecked(): any;
}
