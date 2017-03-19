import { View } from 'aurelia-framework';
export declare class UIDropdown {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
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
    toggleDropdown(evt: any): void;
}
export declare class UIListGroup {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    label: string;
}
export declare class UIListItem {
    element: Element;
    constructor(element: Element);
    created(owningView: View, myView: View): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    attached(): void;
    detached(): void;
    unbind(): void;
    model: any;
    glyph: string;
    value: string;
    hilightItem(evt: any): void;
    fireSelect(evt: any): void;
}
