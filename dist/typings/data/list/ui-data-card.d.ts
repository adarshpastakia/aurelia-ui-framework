import { IMenuItems } from "../../menus/ui-menus";
export declare class UIDataCard {
    private element;
    href: string;
    actions: IMenuItems[];
    open: boolean;
    protected vmElement: any;
    constructor(element: Element);
    protected attached(): void;
    protected hrefChanged(): void;
    protected toggleExpand(): void;
    protected fireClick($event: MouseEvent): boolean;
}
