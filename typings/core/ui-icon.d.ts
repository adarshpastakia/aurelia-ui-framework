export declare class UIIcon {
    protected element: Element;
    icon: string;
    size: string;
    constructor(element: Element);
}
export declare class UIFlag {
    code: string;
    size: string;
}
export declare class UISvgIcon {
    icon: string;
    class: string;
    private iconPath;
    protected bind(): void;
    protected iconChanged(): void;
}
