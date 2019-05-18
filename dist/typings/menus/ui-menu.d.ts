import { IMenuItems } from "./ui-menus";
export declare class UIMenu {
    protected element: Element;
    menuItems: IMenuItems[];
    constructor(element: Element);
    protected attached(): void;
}
