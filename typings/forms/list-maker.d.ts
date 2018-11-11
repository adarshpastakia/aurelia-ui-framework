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
    protected ignoreChange: boolean;
    protected matcher: ({ model, value }: {
        model: any;
        value: any;
    }) => boolean;
    protected valueChanged(): void;
    protected clear(): void;
    protected filterOptions(): void;
    protected selectOption(model: AnyObject): void;
    protected removeValue(model: AnyObject): void;
    protected listClass(option: any): string;
    protected toggleDrop(open?: boolean): boolean;
    protected loadOptions(): void;
    private resetQuery;
    private fetchOptions;
    private showLoading;
    private buildOptions;
    private markOption;
    private buildOption;
    private checkKeyEvent;
}
