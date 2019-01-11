import { ListMaker } from "./list-maker";
export declare class UIList extends ListMaker {
    protected element: Element;
    value: AnyObject;
    model: AnyObject;
    errors: string[];
    name: string;
    height: string;
    placeholder: string;
    labelProperty: string;
    valueProperty: string;
    groupProperty: string;
    query: ({ query }: {
        query: any;
    }) => AnyObject[];
    options: AnyObject[];
    readonly: boolean;
    disabled: boolean;
    noOptionsText: string;
    matcher: ({ option, value }: {
        option: any;
        value: any;
    }) => boolean;
    constructor(element: Element);
    protected bind(): void;
    protected attached(): void;
}
