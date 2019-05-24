/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { valueConverter } from "aurelia-framework";

// tslint:disable
@valueConverter("split")
export class SplitValueConverter {
  public toView(object: string, char = ","): string[] {
    return (object || "").split(new RegExp(`[${char}]`));
  }
}

@valueConverter("objectMap")
export class ObjectMapValueConverter {
  public toView(object: AnyObject): Map<string, KeyValue> {
    if (isEmpty(object)) {
      return new Map();
    }
    const map = new Map<string, KeyValue>();
    object.forEach((value: KeyValue, key: string) => map.set(key, value));
    return map;
  }
}

@valueConverter("group")
export class GroupValueConverter {
  public toView(array: AnyObject[], property: string): Map<string, KeyValue> {
    return array.groupBy(property);
  }
}

@valueConverter("slice")
export class SliceValueConverter {
  public toView(array: AnyObject[], end: number = 0): AnyObject[] {
    return end === 0 ? array : array.slice(0, end);
  }
}

// TODO: rethink filter predicate to perform smart search, ignore case, ignore latin and take care of non string
@valueConverter("filter")
export class FilterValueConverter {
  public toView(
    array: Array<string | AnyObject> | Map<string, AnyObject>,
    value: AnyObject,
    property?: AnyObject
  ): Array<string | AnyObject> | Map<string, AnyObject> {
    if (isEmpty(array)) {
      return [];
    }
    if (isEmpty(value)) {
      return array;
    }
    if (array instanceof Map) {
      const map = new Map<string, AnyObject>();
      array.forEach((v, k) => {
        k.toString().includes(value) ||
        (property
          ? v[property].toString().includes(value.toString())
          : v.toString().includes(value.toString()))
          ? map.set(k, v)
          : fn();
      });
      return map;
    } else {
      return array.filter(o =>
        property
          ? o[property].toString().includes(value.toString())
          : o.toString().includes(value.toString())
      );
    }
  }
}

@valueConverter("orderBy")
export class OrderByValueConverter {
  public toView(array: AnyObject, property: string, isAscending: boolean = true): AnyObject {
    if (isEmpty(array)) {
      return [];
    }

    let up = 1;
    let down = -1;

    if (!isAscending) {
      up = -1;
      down = 1;
    }

    if (array instanceof Map) {
      return new Map<string, AnyObject>(
        [...array].sort((a, b) => (a[0] > b[0] ? up : down))
      );
    }
    return [...array].sort((a, b) => (a[property] > b[property] ? up : down));
  }
}

@valueConverter("sort")
export class SortValueConverter {
  public toView(
    array: AnyObject,
    property: string | string[],
    isAscending: boolean = true
  ): AnyObject {
    if (isEmpty(array)) {
      return [];
    }
    if (array instanceof Map) {
      return new Map<string, AnyObject>([...array].sortBy("0", isAscending));
    }
    return [...array].sortBy(property, isAscending);
  }
}
