import { BaseInput } from "./base-input";
export declare class ListMaker extends BaseInput {
    value: AnyObject;
    model: AnyObject;
    errors: string[];
    name: string;
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
    protected template: any;
    protected innerOptions: any;
    protected multiple: boolean;
    protected listContainer: Element;
    protected valueEl: Element;
    protected inputValue: string;
    protected isLoaded: boolean;
    protected isLoading: boolean;
    protected isGrouped: boolean;
    protected isFiltered: boolean;
    protected ignoreChange: boolean;
    protected hilightIndex: number;
    protected matcher: ({ option, value }: {
        option: any;
        value: any;
    }) => boolean;
    protected valueChanged(): void;
    protected toggleDrop(open?: boolean): boolean;
    protected loadOptions(): void;
    protected filterOptions(): void;
    protected selectOption(model: any): void;
    protected removeOption(model: any): void;
    protected resetQuery(clearFilter?: boolean): void;
    protected clear(): void;
    private fetchOptions;
    private showLoading;
    private buildOptions;
    private listClass;
    private markOption;
    private buildOption;
    private checkKeyEvent;
}
