import { b as __decorate, e as __spread } from './chunk.js';
import { valueConverter } from 'aurelia-framework';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import 'date-fns';
import 'kramed';
import 'numeral';
import { a as UIFormat } from './chunk4.js';

var SplitValueConverter = (function () {
    function SplitValueConverter() {
    }
    SplitValueConverter.prototype.toView = function (object, char) {
        if (char === void 0) { char = ","; }
        return (object || "").split(new RegExp("[" + char + "]"));
    };
    SplitValueConverter = __decorate([
        valueConverter("split")
    ], SplitValueConverter);
    return SplitValueConverter;
}());
var ObjectMapValueConverter = (function () {
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
    ObjectMapValueConverter = __decorate([
        valueConverter("objectMap")
    ], ObjectMapValueConverter);
    return ObjectMapValueConverter;
}());
var GroupValueConverter = (function () {
    function GroupValueConverter() {
    }
    GroupValueConverter.prototype.toView = function (array, property) {
        return array.groupBy(property);
    };
    GroupValueConverter = __decorate([
        valueConverter("group")
    ], GroupValueConverter);
    return GroupValueConverter;
}());
var SliceValueConverter = (function () {
    function SliceValueConverter() {
    }
    SliceValueConverter.prototype.toView = function (array, end) {
        if (end === void 0) { end = 0; }
        return end === 0 ? array : array.slice(0, end);
    };
    SliceValueConverter = __decorate([
        valueConverter("slice")
    ], SliceValueConverter);
    return SliceValueConverter;
}());
var FilterValueConverter = (function () {
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
    FilterValueConverter = __decorate([
        valueConverter("filter")
    ], FilterValueConverter);
    return FilterValueConverter;
}());
var OrderByValueConverter = (function () {
    function OrderByValueConverter() {
    }
    OrderByValueConverter.prototype.toView = function (array, property, isAscending) {
        if (isAscending === void 0) { isAscending = true; }
        if (isEmpty(array)) {
            return [];
        }
        if (array instanceof Map) {
            return new Map(__spread(array).sort(function (a, b) { return (a[property] > b[property] ? 1 : -1); }));
        }
        return __spread(array).sort(function (a, b) { return (a[property] > b[property] ? 1 : -1); });
    };
    OrderByValueConverter = __decorate([
        valueConverter("orderBy")
    ], OrderByValueConverter);
    return OrderByValueConverter;
}());
var SortValueConverter = (function () {
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
    SortValueConverter = __decorate([
        valueConverter("sort")
    ], SortValueConverter);
    return SortValueConverter;
}());

var getPhone = function (value, country) {
    if (value === void 0) { value = ""; }
    if (country === void 0) { country = "us"; }
    var number = parsePhoneNumberFromString(value || "", country);
    return number ? number : {
        country: "",
        formatNational: function () { return ""; },
        formatInternational: function () { return ""; }
    };
};
var JsonValueConverter = (function () {
    function JsonValueConverter() {
    }
    JsonValueConverter.prototype.toView = function (value) {
        return JSON.stringify(value);
    };
    JsonValueConverter = __decorate([
        valueConverter("json")
    ], JsonValueConverter);
    return JsonValueConverter;
}());
var MarkdownValueConverter = (function () {
    function MarkdownValueConverter() {
    }
    MarkdownValueConverter.prototype.toView = function (value) {
        return UIFormat.toHTML(value || "");
    };
    MarkdownValueConverter = __decorate([
        valueConverter("md")
    ], MarkdownValueConverter);
    return MarkdownValueConverter;
}());
var PhoneValueConverter = (function () {
    function PhoneValueConverter() {
    }
    PhoneValueConverter.prototype.toView = function (value, country) {
        if (country === void 0) { country = ""; }
        return getPhone(value, country).formatInternational();
    };
    PhoneValueConverter = __decorate([
        valueConverter("phone")
    ], PhoneValueConverter);
    return PhoneValueConverter;
}());
var PhoneLocalValueConverter = (function () {
    function PhoneLocalValueConverter() {
    }
    PhoneLocalValueConverter.prototype.toView = function (value, country) {
        if (country === void 0) { country = "us"; }
        return getPhone(value, country).formatNational();
    };
    PhoneLocalValueConverter = __decorate([
        valueConverter("phoneLocal")
    ], PhoneLocalValueConverter);
    return PhoneLocalValueConverter;
}());
var PhoneHtmlValueConverter = (function () {
    function PhoneHtmlValueConverter() {
    }
    PhoneHtmlValueConverter.prototype.toView = function (value, country) {
        if (country === void 0) { country = ""; }
        var phoneNumber = getPhone(value, country);
        return "<span class=\"ui-flag " + phoneNumber.country + "\"></span>&nbsp;" + phoneNumber.formatInternational();
    };
    PhoneHtmlValueConverter = __decorate([
        valueConverter("phoneHtml")
    ], PhoneHtmlValueConverter);
    return PhoneHtmlValueConverter;
}());
var PhoneLocalHtmlValueConverter = (function () {
    function PhoneLocalHtmlValueConverter() {
    }
    PhoneLocalHtmlValueConverter.prototype.toView = function (value, country) {
        if (country === void 0) { country = "us"; }
        var phoneNumber = getPhone(value, country);
        return "<span class=\"ui-flag " + phoneNumber.country + "\"></span>&nbsp;" + phoneNumber.formatNational();
    };
    PhoneLocalHtmlValueConverter = __decorate([
        valueConverter("phoneLocalHtml")
    ], PhoneLocalHtmlValueConverter);
    return PhoneLocalHtmlValueConverter;
}());
var DateValueConverter = (function () {
    function DateValueConverter() {
    }
    DateValueConverter.prototype.toView = function (value, format) {
        return UIFormat.date(value, format);
    };
    DateValueConverter = __decorate([
        valueConverter("date")
    ], DateValueConverter);
    return DateValueConverter;
}());
var TimeValueConverter = (function () {
    function TimeValueConverter() {
    }
    TimeValueConverter.prototype.toView = function (value, format) {
        return UIFormat.time(value, format);
    };
    TimeValueConverter = __decorate([
        valueConverter("time")
    ], TimeValueConverter);
    return TimeValueConverter;
}());
var DatetimeValueConverter = (function () {
    function DatetimeValueConverter() {
    }
    DatetimeValueConverter.prototype.toView = function (value, format) {
        return UIFormat.datetime(value, format);
    };
    DatetimeValueConverter = __decorate([
        valueConverter("datetime")
    ], DatetimeValueConverter);
    return DatetimeValueConverter;
}());
var FromNowValueConverter = (function () {
    function FromNowValueConverter() {
    }
    FromNowValueConverter.prototype.toView = function (value) {
        return UIFormat.fromNow(value);
    };
    FromNowValueConverter = __decorate([
        valueConverter("fromnow")
    ], FromNowValueConverter);
    return FromNowValueConverter;
}());
var AgeValueConverter = (function () {
    function AgeValueConverter() {
    }
    AgeValueConverter.prototype.toView = function (value) {
        return UIFormat.age(value);
    };
    AgeValueConverter = __decorate([
        valueConverter("age")
    ], AgeValueConverter);
    return AgeValueConverter;
}());
var UtcValueConverter = (function () {
    function UtcValueConverter() {
    }
    UtcValueConverter.prototype.toView = function (value) {
        return UIFormat.utcDate(value);
    };
    UtcValueConverter = __decorate([
        valueConverter("utc")
    ], UtcValueConverter);
    return UtcValueConverter;
}());
var IsoValueConverter = (function () {
    function IsoValueConverter() {
    }
    IsoValueConverter.prototype.toView = function (value) {
        return UIFormat.dateToISO(value);
    };
    IsoValueConverter = __decorate([
        valueConverter("iso")
    ], IsoValueConverter);
    return IsoValueConverter;
}());
var NumberValueConverter = (function () {
    function NumberValueConverter() {
    }
    NumberValueConverter.prototype.toView = function (value, format) {
        return UIFormat.number(value, format);
    };
    NumberValueConverter = __decorate([
        valueConverter("number")
    ], NumberValueConverter);
    return NumberValueConverter;
}());
var CurrencyValueConverter = (function () {
    function CurrencyValueConverter() {
    }
    CurrencyValueConverter.prototype.toView = function (value, symbol, format) {
        return UIFormat.currency(value, symbol, format);
    };
    CurrencyValueConverter = __decorate([
        valueConverter("currency")
    ], CurrencyValueConverter);
    return CurrencyValueConverter;
}());
var PercentValueConverter = (function () {
    function PercentValueConverter() {
    }
    PercentValueConverter.prototype.toView = function (value) {
        return UIFormat.percent(value);
    };
    PercentValueConverter = __decorate([
        valueConverter("percent")
    ], PercentValueConverter);
    return PercentValueConverter;
}());

var ValueConverters = [
    FilterValueConverter,
    GroupValueConverter,
    ObjectMapValueConverter,
    SliceValueConverter,
    SortValueConverter,
    SplitValueConverter,
    OrderByValueConverter,
    AgeValueConverter,
    CurrencyValueConverter,
    DateValueConverter,
    DatetimeValueConverter,
    FromNowValueConverter,
    JsonValueConverter,
    MarkdownValueConverter,
    NumberValueConverter,
    PercentValueConverter,
    PhoneHtmlValueConverter,
    PhoneLocalHtmlValueConverter,
    PhoneLocalValueConverter,
    PhoneValueConverter,
    TimeValueConverter,
    UtcValueConverter,
    IsoValueConverter
];

export { ValueConverters };
//# sourceMappingURL=value-converters.js.map
