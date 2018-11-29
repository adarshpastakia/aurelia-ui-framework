/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

declare interface Object {
  forEach(callback: (value: AnyObject, key?: string) => AnyObject): void;
}

declare interface Array<T> {
  last(): AnyObject;
  index(matcher: AnyObject | Function, prop?: string): number;
  lastIndex(matcher: AnyObject | Function, prop?: string): number;
  remove(obj: AnyObject): boolean;
  groupBy(property: string): Map<string, KeyValue[]>;
  sortBy(property: string | string[], isAscending: boolean = true): AnyObject[];
}
 