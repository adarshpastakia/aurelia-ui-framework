import { View } from "aurelia-framework";
export declare class UIDataList {
    dataSource: any;
    private readonly template;
    private owningView;
    constructor(element: Element);
    protected created(owningView: View): void;
    protected compileTemplate(el: Element, record: KeyValue): boolean;
}
