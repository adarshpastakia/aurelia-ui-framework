/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UIBadge {
    protected element: Element;
    value: string;
    icon: string;
    href: string;
    size: string;
    protected vmElement: HTMLAnchorElement;
    private style;
    private closeable;
    constructor(element: Element);
    close(): void;
    protected hrefChanged(): void;
    protected fireClick($event: MouseEvent): boolean;
    private remove;
}
