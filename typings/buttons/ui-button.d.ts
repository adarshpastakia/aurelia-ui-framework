/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { UIDrop } from "../core/ui-drop";
export declare class UIButton {
    element: Element;
    icon: string;
    href: string;
    label: string;
    size: string;
    type: string;
    value: string;
    busy: boolean;
    active: boolean;
    disabled: boolean;
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
