export declare class UIColorBase {
    element: Element;
    constructor(element: Element);
    vm: any;
    parentEl: any;
    prefix: string;
    value: string;
    attached(): void;
    valueChanged(newTheme: any, oldTheme?: string): void;
}
export declare class UIColorTheme extends UIColorBase {
    element: Element;
    constructor(element: Element);
}
export declare class UIThemePrimary extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeSecondary extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeMuted extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeDark extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeInfo extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeDanger extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeSuccess extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeWarning extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIColorThemeBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
}
export declare class UIThemePrimaryBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeSecondaryBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeMutedBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeDarkBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeLightBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeInfoBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeDangerBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeSuccessBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeWarningBg extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIColorThemeText extends UIColorBase {
    element: Element;
    constructor(element: Element);
}
export declare class UIThemePrimaryText extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeSecondaryText extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeMutedText extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeDarkText extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeLightText extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeInfoText extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeDangerText extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeSuccessText extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
export declare class UIThemeWarningText extends UIColorBase {
    element: Element;
    constructor(element: Element);
    bind(): void;
}
