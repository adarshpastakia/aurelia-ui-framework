//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import * as _ from "lodash";

export class SplitValueConverter {
  toView(object: any, char = ',') {
    return (object || '').split(new RegExp(`[${char}]`));
  }
}
export class KeysValueConverter {
  toView(object: any) {
    if (isEmpty(object)) return [];
    return Object.keys(object);
  }
}
export class GroupValueConverter {
  toView(object: any, property: any): any {
    let a = [];
    let g = _.groupBy(object, property);
    _.forEach(g, (v, k) => a.push({ key: k, items: v }));
    return a;
  }
}
export class FilterValueConverter {
  toView(object: any = [], property: any, value: any): any {
    return _.filter(object, [property, value]);
  }
}

export class SortValueConverter {
  toView(value: any, property: any) {
    return _.sortBy(value, property);
  }
}
