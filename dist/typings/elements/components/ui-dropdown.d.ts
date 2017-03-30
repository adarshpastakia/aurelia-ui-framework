export declare class UIDropdown {
    element: Element;
    constructor(element: Element);
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    items: any[];
    value: string;
    width: string;
    model: any;
    disabled: boolean;
    beforeselect: any;
    private tether;
    private dropdown;
    private obMouseup;
    private selected;
    private glyph;
    private display;
    valueChanged(newValue: any): void;
    disabledChanged(newValue: any): void;
    select(evt: any): void;
    private doChange(params);
    toggleDropdown(evt: any): void;
}
export declare class UIListGroup {
    element: Element;
    constructor(element: Element);
    label: string;
}
export declare class UIListItem {
    element: Element;
    constructor(element: Element);
    model: any;
    glyph: string;
    value: string;
    hilightItem(evt: any): void;
    fireSelect(evt: any): void;
}
