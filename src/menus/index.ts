/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

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
export type IMenuItems = "-" | IMenuItem | IMenuGroup;

export const Menus = [UIMenu, UIMenuGroup, UIMenuItem, UIMenubar, UIBreadcrumbs];
