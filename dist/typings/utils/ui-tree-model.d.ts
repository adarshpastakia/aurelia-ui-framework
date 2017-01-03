export declare class UITreeModel {
    id: any;
    text: string;
    level: number;
    icon: string;
    openIcon: string;
    root: boolean;
    leaf: boolean;
    active: boolean;
    childActive: boolean;
    expanded: boolean;
    children: Array<UITreeModel>;
    checked: number;
    parent: UITreeModel;
    isVisible: boolean;
    private __checkLevel;
    constructor(level: number, maxLevels: number, checkLevel: number, model: any, parent?: UITreeModel);
    isChecked: any;
    updateChild(v: any): void;
    updatePartial(): void;
    readonly isLeaf: boolean;
}
export declare class UITreeOptions {
    maxLevels: number;
    showCheckbox: boolean;
    checkboxLevel: number;
    showRoot: boolean;
    rootLabel: string;
    selectionLevel: number;
    constructor(obj?: {});
}
export interface UITreePanel {
    getChecked(): any;
}
