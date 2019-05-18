export declare class UIOptionGroup {
    value: AnyObject;
    name: string;
    matcher: () => void;
    disabled: boolean;
    private options;
    protected optionsChanged(): void;
    protected checkChanged($event: any): void;
    protected disabledChanged(): void;
    private valueChanged;
}
