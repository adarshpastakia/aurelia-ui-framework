import { UIDrop } from "../shared/ui-drop";
export declare class UIMenuItem {
    protected element: Element;
    label: string;
    href: string;
    icon: string;
    iconColor: string;
    id: string;
    active: boolean;
    disabled: boolean;
    protected split: boolean;
    protected dropIcon: string;
    protected isInMenubar: boolean;
    protected elDropdown: Element;
    protected hasDrop: boolean;
    protected dropEl: UIDrop;
    protected badgeEl: HTMLAnchorElement;
    constructor(element: Element);
    protected attached(): void;
    protected hrefChanged(): void;
    protected activeChanged(): void;
    protected fireClick($event: MouseEvent): boolean;
    private toggleDrop;
}
