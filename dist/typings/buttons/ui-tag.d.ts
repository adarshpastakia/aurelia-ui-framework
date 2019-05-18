export declare class UITag {
    protected element: Element;
    id: string;
    label: string;
    icon: string;
    href: string;
    size: "nm" | "md" | "lg";
    type: "normal" | "solid";
    closeable: boolean;
    protected vmElement: HTMLAnchorElement;
    protected style: string;
    constructor(element: Element);
    close(): void;
    protected bind(): void;
    protected hrefChanged(): void;
    protected fireClick($event: MouseEvent): boolean;
    private remove;
}
