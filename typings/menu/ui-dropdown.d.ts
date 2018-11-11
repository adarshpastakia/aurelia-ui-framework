import { UIDrop } from "../core/ui-drop";
export declare class UIDropdown {
    protected element: Element;
    value: AnyObject;
    errors: string[];
    name: string;
    placeholder: string;
    labelProperty: string;
    valueProperty: string;
    iconProperty: string;
    options: AnyObject[];
    disabled: boolean;
    protected dropEl: UIDrop;
    protected model: AnyObject;
    constructor(element: Element);
    protected attached(): void;
    protected valueChanged(): void;
    protected select($event: UIEvent): void;
    private toggleDrop;
}
