declare class BaseAttribute {
    protected element: Element;
    protected prefix: string;
    protected value: string;
    protected oldValue: string;
    protected singular: boolean;
    constructor(element: Element);
    protected bind(): void;
    protected valueChanged(): void;
    protected toggleClass(): void;
}
export declare class UITheme extends BaseAttribute {
    protected prefix: string;
}
export declare class UIBg extends BaseAttribute {
    protected prefix: string;
}
export declare class UIColor extends BaseAttribute {
    protected prefix: string;
}
export declare class UIHover extends BaseAttribute {
    protected prefix: string;
}
export declare class UIShadow extends BaseAttribute {
    protected prefix: string;
}
export declare class UIPadding extends BaseAttribute {
    protected prefix: string;
}
export declare class UIMargin extends BaseAttribute {
    protected prefix: string;
}
export declare class UIBorder extends BaseAttribute {
    protected prefix: string;
}
export declare class UIFont extends BaseAttribute {
    protected prefix: string;
}
export declare class UIWeight extends BaseAttribute {
    protected prefix: string;
}
export declare class UIText extends BaseAttribute {
    protected prefix: string;
}
export declare class UIAlign extends BaseAttribute {
    protected prefix: string;
}
export declare class UIGutter extends BaseAttribute {
    protected prefix: string;
}
export declare class UIHide extends BaseAttribute {
    protected prefix: string;
}
export declare class UIShow extends BaseAttribute {
    protected prefix: string;
}
export declare class UIClip extends BaseAttribute {
    protected prefix: string;
    protected singular: boolean;
    protected bind(): void;
    protected valueChanged(): void;
}
export declare class UILine extends BaseAttribute {
    protected prefix: string;
    protected singular: boolean;
    protected bind(): void;
    protected valueChanged(): void;
}
export declare class UIPaper extends BaseAttribute {
    protected prefix: string;
    protected singular: boolean;
}
export declare class UILink extends BaseAttribute {
    protected prefix: string;
    protected singular: boolean;
}
export declare class UIScroll extends BaseAttribute {
    protected prefix: string;
}
export {};
