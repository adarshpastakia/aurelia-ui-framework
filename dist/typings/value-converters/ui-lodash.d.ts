export declare class SplitValueConverter {
    toView(object: any, char?: string): any;
}
export declare class KeysValueConverter {
    toView(object: any): string[];
}
export declare class GroupValueConverter {
    toView(object: any, property: any): any;
}
export declare class FilterValueConverter {
    toView(object: any, property: any, value: any): any;
}
export declare class SortValueConverter {
    toView(value: any, property: any): any;
}
