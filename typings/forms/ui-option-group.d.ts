export declare class UIOptionGroup {
    value: AnyObject;
    name: string;
    matcher: () => void;
    disabled: boolean;
    private options;
    protected optionsChanged(): void;
    private checkChanged;
    private valueChanged;
}
