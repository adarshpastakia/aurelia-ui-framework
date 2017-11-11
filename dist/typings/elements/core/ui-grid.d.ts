export declare class UIFiller {
}
export declare class UIContainer {
    element: Element;
    constructor(element: Element);
}
export declare class UIRow {
    element: Element;
    constructor(element: Element);
}
export declare class UIColumn {
    element: Element;
    constructor(element: Element);
    bind(): void;
    size: string;
    width: string;
    row: string;
}
