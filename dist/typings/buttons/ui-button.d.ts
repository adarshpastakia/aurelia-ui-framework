import { IMenuItems } from "../menus/ui-menus";
import { UIDrop } from "../shared/ui-drop";
export declare class UIButton {
    element: Element;
    icon: string;
    href: string;
    label: string;
    size: "nm" | "sm" | "md" | "lg";
    type: "default" | "solid" | "link";
    id: string;
    busy: boolean;
    active: boolean;
    disabled: boolean;
    menuItems: IMenuItems[];
    protected elDropdown: Element;
    protected hasDrop: boolean;
    protected dropEl: UIDrop;
    protected badgeEl: HTMLAnchorElement;
    protected split: boolean;
    private elDisabled;
    constructor(element: Element);
    readonly isDisabled: boolean;
    disable(disabled: boolean): void;
    protected attached(): void;
    protected hrefChanged(): void;
    protected fireClick($event: MouseEvent): boolean;
    private toggleDrop;
}
