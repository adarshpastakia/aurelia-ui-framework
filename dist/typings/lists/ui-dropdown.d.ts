import { UIDrop } from "../shared/ui-drop";
export declare class UIDropdown {
    protected element: Element;
    value: AnyObject;
    errors: string[];
    name: string;
    placeholder: string;
    labelProperty: string;
    valueProperty: string;
    iconProperty: string;
    iconPrefix: string;
    options: AnyObject[];
    disabled: boolean;
    multiple: boolean;
    protected dropEl: UIDrop;
    protected model: AnyObject;
    constructor(element: Element);
    protected attached(): void;
    protected valueChanged(): void;
    protected select(model: AnyObject): void;
    readonly selectedLabel: any;
    protected toggleDrop($event: Event): void;
}
