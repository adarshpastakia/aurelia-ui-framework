System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var _, SplitValueConverter, KeysValueConverter, GroupValueConverter, SortValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (_1) {
                _ = _1;
            }
        ],
        execute: function () {
            SplitValueConverter = (function () {
                function SplitValueConverter() {
                }
                SplitValueConverter.prototype.toView = function (object, char) {
                    if (char === void 0) { char = ','; }
                    return (object || '').split(new RegExp("[" + char + "]"));
                };
                return SplitValueConverter;
            }());
            exports_1("SplitValueConverter", SplitValueConverter);
            KeysValueConverter = (function () {
                function KeysValueConverter() {
                }
                KeysValueConverter.prototype.toView = function (object) {
                    if (isEmpty(object))
                        return [];
                    return Object.keys(object);
                };
                return KeysValueConverter;
            }());
            exports_1("KeysValueConverter", KeysValueConverter);
            GroupValueConverter = (function () {
                function GroupValueConverter() {
                }
                GroupValueConverter.prototype.toView = function (object, property) {
                    var a = [];
                    var g = _.groupBy(object, property);
                    _.forEach(g, function (v, k) { return a.push({ key: k, items: v }); });
                    return a;
                };
                return GroupValueConverter;
            }());
            exports_1("GroupValueConverter", GroupValueConverter);
            SortValueConverter = (function () {
                function SortValueConverter() {
                }
                SortValueConverter.prototype.toView = function (value, property) {
                    return _.sortBy(value, property);
                };
                return SortValueConverter;
            }());
            exports_1("SortValueConverter", SortValueConverter);
        }
    };
});
