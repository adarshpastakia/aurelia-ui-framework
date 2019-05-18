export declare class UIForm {
    protected element: Element;
    disabled: boolean;
    private vmElement;
    constructor(element: Element);
    protected attached(): void;
    protected disabledChanged(): void;
    protected fireSubmit(): void;
}
