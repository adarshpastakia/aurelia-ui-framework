export declare class UITreeModel {
    static seed: number;
    id: any;
    text: string;
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
    private __checkLevel;
    constructor(level: number, maxLevels: number, checkLevel: number, model: any, parent?: UITreeModel);
    isChecked: any;
    readonly data: any;
    expandToggle(v: any): void;
    updateChild(prop: any, v: any): void;
    updatePartial(): void;
    readonly isLeaf: boolean;
}
export declare class UITreeOptions {
    maxLevels: number;
    maxCount: number;
    showCheckbox: boolean;
    checkboxLevel: number;
    showRoot: boolean;
    rootLabel: string;
    selectionLevel: number;
    labels: {
        search: string;
        more: string;
        less: string;
        noitems: string;
    };
    constructor(obj?: {});
}
export interface UITreePanel {
    getChecked(): any;
}
