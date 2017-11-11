import * as _ from "lodash";
export class SplitValueConverter {
    toView(object, char = ',') {
        return (object || '').split(new RegExp(`[${char}]`));
    }
}
export class KeysValueConverter {
    toView(object) {
        if (isEmpty(object))
            return [];
        return Object.keys(object);
    }
}
export class GroupValueConverter {
    toView(object, property) {
        let a = [];
        let g = _.groupBy(object, property);
        _.forEach(g, (v, k) => a.push({ key: k, items: v }));
        return a;
    }
}
export class FilterValueConverter {
    toView(object = [], property, value) {
        return _.filter(object, [property, value]);
    }
}
export class SortValueConverter {
    toView(value, property) {
        return _.sortBy(value, property);
    }
}
