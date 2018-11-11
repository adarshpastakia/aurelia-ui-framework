/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var SplitValueConverter = /** @class */ (function () {
    function SplitValueConverter() {
    }
    SplitValueConverter.prototype.toView = function (object, char) {
        if (char === void 0) { char = ","; }
        return (object || "").split(new RegExp("[" + char + "]"));
    };
    return SplitValueConverter;
}());
export { SplitValueConverter };
var ObjectMapValueConverter = /** @class */ (function () {
    function ObjectMapValueConverter() {
    }
    ObjectMapValueConverter.prototype.toView = function (object) {
        if (isEmpty(object)) {
            return new Map();
        }
        var map = new Map();
        object.forEach(function (value, key) { return map.set(key, value); });
        return map;
    };
    return ObjectMapValueConverter;
}());
export { ObjectMapValueConverter };
var GroupValueConverter = /** @class */ (function () {
    function GroupValueConverter() {
    }
    GroupValueConverter.prototype.toView = function (array, property) {
        return array.groupBy(property);
    };
    return GroupValueConverter;
}());
export { GroupValueConverter };
var SliceValueConverter = /** @class */ (function () {
    function SliceValueConverter() {
    }
    SliceValueConverter.prototype.toView = function (array, end) {
        if (end === void 0) { end = 0; }
        return end === 0 ? array : array.slice(0, end);
    };
    return SliceValueConverter;
}());
export { SliceValueConverter };
// TODO: rethink filter predicate to perform smart search, ignore case, ignore latin and take care of non string
var FilterValueConverter = /** @class */ (function () {
    function FilterValueConverter() {
    }
    FilterValueConverter.prototype.toView = function (array, value, property) {
        if (isEmpty(array)) {
            return [];
        }
        if (isEmpty(value)) {
            return array;
        }
        if (array instanceof Map) {
            var map_1 = new Map();
            array.forEach(function (v, k) {
                k.toString().includes(value) ||
                    (property
                        ? v[property].toString().includes(value.toString())
                        : v.toString().includes(value.toString()))
                    ? map_1.set(k, v)
                    : fn();
            });
            return map_1;
        }
        else {
            return array.filter(function (o) {
                return property
                    ? o[property].toString().includes(value.toString())
                    : o.toString().includes(value.toString());
            });
        }
    };
    return FilterValueConverter;
}());
export { FilterValueConverter };
var SortValueConverter = /** @class */ (function () {
    function SortValueConverter() {
    }
    SortValueConverter.prototype.toView = function (array, property, isAscending) {
        if (isAscending === void 0) { isAscending = true; }
        if (isEmpty(array)) {
            return [];
        }
        if (array instanceof Map) {
            return new Map(__spread(array).sortBy("0", !!property));
        }
        return __spread(array).sortBy(property, isAscending && !!property !== false);
    };
    return SortValueConverter;
}());
export { SortValueConverter };
