/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class SplitValueConverter {
    toView(object: string, char?: string): string[];
}
export declare class ObjectMapValueConverter {
    toView(object: AnyObject): Map<string, KeyValue>;
}
export declare class GroupValueConverter {
    toView(array: AnyObject[], property: string): Map<string, KeyValue>;
}
export declare class SliceValueConverter {
    toView(array: AnyObject[], end?: number): AnyObject[];
}
export declare class FilterValueConverter {
    toView(array: Array<string | AnyObject> | Map<string, AnyObject>, value: AnyObject, property?: AnyObject): Array<string | AnyObject> | Map<string, AnyObject>;
}
export declare class SortValueConverter {
    toView(array: AnyObject, property: string | string[], isAscending?: boolean): AnyObject;
}
