/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { UIFormat } from "../utils/ui-format";
var JsonValueConverter = /** @class */ (function () {
    function JsonValueConverter() {
    }
    JsonValueConverter.prototype.toView = function (value) {
        return JSON.stringify(value);
    };
    return JsonValueConverter;
}());
export { JsonValueConverter };
var MarkdownValueConverter = /** @class */ (function () {
    function MarkdownValueConverter() {
    }
    MarkdownValueConverter.prototype.toView = function (value) {
        return UIFormat.toHTML(value || '');
    };
    return MarkdownValueConverter;
}());
export { MarkdownValueConverter };
var PhoneValueConverter = /** @class */ (function () {
    function PhoneValueConverter() {
    }
    PhoneValueConverter.prototype.toView = function (value, country) {
        if (country === void 0) { country = ''; }
        return PhoneLib.format(value || '', country, PhoneLib.FORMAT.INTERNATIONAL);
    };
    return PhoneValueConverter;
}());
export { PhoneValueConverter };
var PhoneLocalValueConverter = /** @class */ (function () {
    function PhoneLocalValueConverter() {
    }
    PhoneLocalValueConverter.prototype.toView = function (value, country) {
        if (country === void 0) { country = 'us'; }
        return PhoneLib.format(value || '', country, PhoneLib.FORMAT.NATIONAL);
    };
    return PhoneLocalValueConverter;
}());
export { PhoneLocalValueConverter };
var PhoneHtmlValueConverter = /** @class */ (function () {
    function PhoneHtmlValueConverter() {
    }
    PhoneHtmlValueConverter.prototype.toView = function (value, country) {
        if (country === void 0) { country = ''; }
        var code = PhoneLib.getIso2Code(value || '', country);
        return "<span class=\"ui-flag " + code + "\"></span>&nbsp;" + PhoneLib.format(value || '', country, PhoneLib.FORMAT.INTERNATIONAL);
    };
    return PhoneHtmlValueConverter;
}());
export { PhoneHtmlValueConverter };
var PhoneLocalHtmlValueConverter = /** @class */ (function () {
    function PhoneLocalHtmlValueConverter() {
    }
    PhoneLocalHtmlValueConverter.prototype.toView = function (value, country) {
        if (country === void 0) { country = 'us'; }
        var code = PhoneLib.getIso2Code(value || '', country);
        return "<span class=\"ui-flag " + code + "\"></span>&nbsp;" + PhoneLib.format(value || '', country, PhoneLib.FORMAT.NATIONAL);
    };
    return PhoneLocalHtmlValueConverter;
}());
export { PhoneLocalHtmlValueConverter };
// Dates
var DateValueConverter = /** @class */ (function () {
    function DateValueConverter() {
    }
    DateValueConverter.prototype.toView = function (value, format) {
        return UIFormat.date(value, format);
    };
    return DateValueConverter;
}());
export { DateValueConverter };
var TimeValueConverter = /** @class */ (function () {
    function TimeValueConverter() {
    }
    TimeValueConverter.prototype.toView = function (value, format) {
        return UIFormat.time(value, format);
    };
    return TimeValueConverter;
}());
export { TimeValueConverter };
var DatetimeValueConverter = /** @class */ (function () {
    function DatetimeValueConverter() {
    }
    DatetimeValueConverter.prototype.toView = function (value, format) {
        return UIFormat.datetime(value, format);
    };
    return DatetimeValueConverter;
}());
export { DatetimeValueConverter };
var FromNowValueConverter = /** @class */ (function () {
    function FromNowValueConverter() {
    }
    FromNowValueConverter.prototype.toView = function (value) {
        return UIFormat.fromNow(value);
    };
    return FromNowValueConverter;
}());
export { FromNowValueConverter };
var AgeValueConverter = /** @class */ (function () {
    function AgeValueConverter() {
    }
    AgeValueConverter.prototype.toView = function (value) {
        return UIFormat.age(value);
    };
    return AgeValueConverter;
}());
export { AgeValueConverter };
var UtcValueConverter = /** @class */ (function () {
    function UtcValueConverter() {
    }
    UtcValueConverter.prototype.toView = function (value) {
        return UIFormat.utcDate(value);
    };
    return UtcValueConverter;
}());
export { UtcValueConverter };
// Numbers
var NumberValueConverter = /** @class */ (function () {
    function NumberValueConverter() {
    }
    NumberValueConverter.prototype.toView = function (value, format) {
        return UIFormat.number(value, format);
    };
    return NumberValueConverter;
}());
export { NumberValueConverter };
var CurrencyValueConverter = /** @class */ (function () {
    function CurrencyValueConverter() {
    }
    CurrencyValueConverter.prototype.toView = function (value, symbol, format) {
        return UIFormat.currency(value, symbol, format);
    };
    return CurrencyValueConverter;
}());
export { CurrencyValueConverter };
var PercentValueConverter = /** @class */ (function () {
    function PercentValueConverter() {
    }
    PercentValueConverter.prototype.toView = function (value) {
        return UIFormat.percent(value);
    };
    return PercentValueConverter;
}());
export { PercentValueConverter };
