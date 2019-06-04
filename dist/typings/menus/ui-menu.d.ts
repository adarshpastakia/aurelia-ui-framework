import { IMenuItems } from "./ui-menus";
export declare class UIMenu {
    protected element: Element;
    menuItems: IMenuItems[] | (() => IMenuItems[]);
    noitemsLabel: string;
    protected items: any;
    protected isLoading: boolean;
    constructor(element: Element);
    protected attached(): void;
    protected loadMenuItems(): void;
}
