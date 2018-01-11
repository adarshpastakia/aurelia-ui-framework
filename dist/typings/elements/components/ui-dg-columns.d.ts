export declare class UIDGColumnGroup {
    element: Element;
    constructor(element: Element);
    label: any;
    columns: any;
    locked: number;
    isGroup: boolean;
}
export declare class UIDataColumn {
    element: Element;
    constructor(element: Element);
    dataId: any;
    value: any;
    display: any;
    width: any;
    minWidth: string;
    dataType: string;
    class: string;
    format: string;
    symbol: string;
    summary: string;
    headTitle: string;
    locked: number;
    sortable: boolean;
    resizeable: boolean;
    align: string;
    readonly columnWidth: number;
    readonly columnMinWidth: number;
    getValue(value: any, record: any): string;
    processValue(value: any, record: any): string;
}
export declare class UIDgColumn extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    dataId: any;
    value: any;
    display: any;
    width: any;
    minWidth: string;
    dataType: string;
    class: string;
    format: string;
    symbol: string;
    summary: string;
}
export declare class UIDGGlyph extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    dataId: any;
    width: number;
    minWidth: any;
    class: string;
    glyph: any;
    tooltip: any;
    glyphMap: any;
    tooltipMap: any;
    getGlyph(value: any, record: any): any;
    getTooltip(value: any, record: any): any;
}
export declare class UIDGLink extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    dataId: any;
    width: any;
    minWidth: any;
    glyph: any;
    label: any;
    class: string;
    show: any;
    disabled: any;
    isDisabled(value: any, record: any): any;
    isVisible(value: any, record: any): any;
    getGlyph(value: any, record: any): any;
    getLabel(value: any, record: any): any;
    fireClick($event: any, value: any, record: any): boolean;
}
export declare class UIDGButton extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    dataId: any;
    width: any;
    minWidth: any;
    glyph: any;
    label: any;
    dropdown: any;
    buttonWidth: any;
    buttonTheme: any;
    show: any;
    disabled: any;
    isDisabled(value: any, record: any): any;
    isVisible(value: any, record: any): any;
    getGlyph(value: any, record: any): any;
    getLabel(value: any, record: any): any;
    getTheme(value: any, record: any): any;
    fireClick($event: any, value: any, record: any): boolean;
    fireMenuOpen($event: any, record: any): any;
}
