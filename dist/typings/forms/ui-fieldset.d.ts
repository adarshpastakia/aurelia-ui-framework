export declare class UIFieldset {
    checked: boolean;
    label: string;
    class: string;
    disabled: boolean;
    protected fields: Element[];
    protected optional: boolean;
    private vmElement;
    constructor(element: Element);
    protected bind(): void;
    protected attached(): void;
    protected disabledChanged(): void;
}
