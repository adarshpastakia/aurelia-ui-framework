import { View } from 'aurelia-framework';
export declare class UIDataColumn {
    element: Element;
    constructor(element: Element);
    dataId: any;
    width: any;
    minWidth: any;
    value: any;
    display: any;
    summary: any;
    format: any;
    symbol: any;
    dataType: string;
    align: string;
    left: number;
    locked: number;
    resize: boolean;
    sortable: boolean;
    getWidth(tw: any): any;
    getTitle(): string;
    getValue(value: any, record: any): string;
    processValue(value: any, record: any): string;
    getSummary(summaryRow: any, data: any): any;
}
export declare class UIDGColumn extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    dataId: any;
    width: any;
    minWidth: any;
    value: any;
    display: any;
    class: string;
    summary: string;
    symbol: any;
    format: any;
}
export declare class UIDGLink extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    dataId: any;
    width: any;
    minWidth: any;
    glyph: any;
    label: any;
    class: string;
    disabled: any;
    isDisabled(value: any, record: any): any;
    getGlyph(value: any, record: any): any;
    getLabel(value: any, record: any): any;
    fireClick($event: any, value: any, record: any): boolean;
}
export declare class UIDGButton extends UIDataColumn {
    element: Element;
    type: string;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    dataId: any;
    width: any;
    minWidth: any;
    glyph: any;
    label: any;
    dropdown: any;
    theme: any;
    disabled: any;
    isDisabled(value: any, record: any): any;
    getGlyph(value: any, record: any): any;
    getLabel(value: any, record: any): any;
    getTheme(value: any, record: any): any;
    fireClick($event: any, value: any, record: any): boolean;
    fireMenuOpen($event: any, record: any): any;
}
