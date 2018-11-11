/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { UIDrop } from "../core/ui-drop";
export declare class UIMenu {
    protected element: Element;
    constructor(element: Element);
    protected attached(): void;
}
export declare class UIMenuGroup {
    protected element: Element;
    label: string;
    collapsed: boolean;
    private vmElement;
    constructor(element: Element);
    protected attached(): void;
}
export declare class UIMenuItem {
    protected element: Element;
    label: string;
    href: string;
    icon: string;
    value: AnyObject;
    active: boolean;
    disabled: boolean;
    protected split: boolean;
    protected elDropdown: Element;
    protected hasDrop: boolean;
    protected dropEl: UIDrop;
    protected badgeEl: HTMLAnchorElement;
    constructor(element: Element);
    protected attached(): void;
    protected hrefChanged(): void;
    protected fireClick($event: MouseEvent): boolean;
    private toggleDrop;
}
