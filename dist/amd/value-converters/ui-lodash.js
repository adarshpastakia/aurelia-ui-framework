define(["require", "exports", "lodash"], function (require, exports, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitValueConverter = (function () {
        function SplitValueConverter() {
        }
        SplitValueConverter.prototype.toView = function (object, char) {
            if (char === void 0) { char = ','; }
            return (object || '').split(new RegExp("[" + char + "]"));
        };
        return SplitValueConverter;
    }());
    exports.SplitValueConverter = SplitValueConverter;
    var KeysValueConverter = (function () {
        function KeysValueConverter() {
        }
        KeysValueConverter.prototype.toView = function (object) {
            if (isEmpty(object))
                return [];
            return Object.keys(object);
        };
        return KeysValueConverter;
    }());
    exports.KeysValueConverter = KeysValueConverter;
    var GroupValueConverter = (function () {
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
    exports.GroupValueConverter = GroupValueConverter;
    var FilterValueConverter = (function () {
        function FilterValueConverter() {
        }
        FilterValueConverter.prototype.toView = function (object, property, value) {
            if (object === void 0) { object = []; }
            return _.filter(object, [property, value]);
        };
        return FilterValueConverter;
    }());
    exports.FilterValueConverter = FilterValueConverter;
    var SortValueConverter = (function () {
        function SortValueConverter() {
        }
        SortValueConverter.prototype.toView = function (value, property) {
            return _.sortBy(value, property);
        };
        return SortValueConverter;
    }());
    exports.SortValueConverter = SortValueConverter;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlLWNvbnZlcnRlcnMvdWktbG9kYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BO1FBQUE7UUFJQSxDQUFDO1FBSEMsb0NBQU0sR0FBTixVQUFPLE1BQVcsRUFBRSxJQUFVO1lBQVYscUJBQUEsRUFBQSxVQUFVO1lBQzVCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBSSxJQUFJLE1BQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNILDBCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSxrREFBbUI7SUFLaEM7UUFBQTtRQUtBLENBQUM7UUFKQyxtQ0FBTSxHQUFOLFVBQU8sTUFBVztZQUNoQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0gseUJBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLGdEQUFrQjtJQU0vQjtRQUFBO1FBT0EsQ0FBQztRQU5DLG9DQUFNLEdBQU4sVUFBTyxNQUFXLEVBQUUsUUFBYTtZQUMvQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0gsMEJBQUM7SUFBRCxDQVBBLEFBT0MsSUFBQTtJQVBZLGtEQUFtQjtJQVFoQztRQUFBO1FBSUEsQ0FBQztRQUhDLHFDQUFNLEdBQU4sVUFBTyxNQUFnQixFQUFFLFFBQWEsRUFBRSxLQUFVO1lBQTNDLHVCQUFBLEVBQUEsV0FBZ0I7WUFDckIsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNILDJCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSxvREFBb0I7SUFNakM7UUFBQTtRQUlBLENBQUM7UUFIQyxtQ0FBTSxHQUFOLFVBQU8sS0FBVSxFQUFFLFFBQWE7WUFDOUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDSCx5QkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksZ0RBQWtCIiwiZmlsZSI6InZhbHVlLWNvbnZlcnRlcnMvdWktbG9kYXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTZcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmV4cG9ydCBjbGFzcyBTcGxpdFZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KG9iamVjdDogYW55LCBjaGFyID0gJywnKSB7XG4gICAgcmV0dXJuIChvYmplY3QgfHwgJycpLnNwbGl0KG5ldyBSZWdFeHAoYFske2NoYXJ9XWApKTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEtleXNWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyhvYmplY3Q6IGFueSkge1xuICAgIGlmIChpc0VtcHR5KG9iamVjdCkpIHJldHVybiBbXTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEdyb3VwVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcob2JqZWN0OiBhbnksIHByb3BlcnR5OiBhbnkpOiBhbnkge1xuICAgIGxldCBhID0gW107XG4gICAgbGV0IGcgPSBfLmdyb3VwQnkob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgXy5mb3JFYWNoKGcsICh2LCBrKSA9PiBhLnB1c2goeyBrZXk6IGssIGl0ZW1zOiB2IH0pKTtcbiAgICByZXR1cm4gYTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEZpbHRlclZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KG9iamVjdDogYW55ID0gW10sIHByb3BlcnR5OiBhbnksIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmplY3QsIFtwcm9wZXJ0eSwgdmFsdWVdKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU29ydFZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlOiBhbnksIHByb3BlcnR5OiBhbnkpIHtcbiAgICByZXR1cm4gXy5zb3J0QnkodmFsdWUsIHByb3BlcnR5KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
