import { UIBreadcrumbs } from "./ui-breadcrumbs";
import { UIMenu } from "./ui-menu";
import { UIMenuGroup } from "./ui-menu-group";
import { UIMenuItem } from "./ui-menu-item";
import { UIMenubar } from "./ui-menubar";
export interface IMenuItem {
    id: string;
    label: string;
    href: string;
    badge: string;
    icon: string;
    iconColor: string;
    active: () => boolean | boolean;
    hidden: () => boolean | boolean;
    disabled: () => boolean | boolean;
    handler: () => void;
    items: IMenuItems[];
}
export interface IMenuGroup {
    group: string;
    items: IMenuItems[];
}
export declare type IMenuItems = "-" | IMenuItem | IMenuGroup;
export declare const Menus: (typeof UIBreadcrumbs | typeof UIMenu | typeof UIMenuGroup | typeof UIMenuItem | typeof UIMenubar)[];
