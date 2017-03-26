"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui_format_1 = require("../utils/ui-format");
var JsonValueConverter = (function () {
    function JsonValueConverter() {
    }
    JsonValueConverter.prototype.toView = function (value) {
        return JSON.stringify(value);
    };
    return JsonValueConverter;
}());
exports.JsonValueConverter = JsonValueConverter;
var MarkdownValueConverter = (function () {
    function MarkdownValueConverter() {
    }
    MarkdownValueConverter.prototype.toView = function (value) {
        return ui_format_1.UIFormat.toHTML(value || '');
    };
    return MarkdownValueConverter;
}());
exports.MarkdownValueConverter = MarkdownValueConverter;
var PhoneValueConverter = (function () {
    function PhoneValueConverter() {
    }
    PhoneValueConverter.prototype.toView = function (value, country) {
        if (country === void 0) { country = ''; }
        return PhoneLib.format(value || '', country, PhoneLib.FORMAT.INTERNATIONAL);
    };
    return PhoneValueConverter;
}());
exports.PhoneValueConverter = PhoneValueConverter;
var DateValueConverter = (function () {
    function DateValueConverter() {
    }
    DateValueConverter.prototype.toView = function (value, format) {
        return ui_format_1.UIFormat.date(value, format);
    };
    return DateValueConverter;
}());
exports.DateValueConverter = DateValueConverter;
var TimeValueConverter = (function () {
    function TimeValueConverter() {
    }
    TimeValueConverter.prototype.toView = function (value, format) {
        return ui_format_1.UIFormat.time(value, format);
    };
    return TimeValueConverter;
}());
exports.TimeValueConverter = TimeValueConverter;
var DatetimeValueConverter = (function () {
    function DatetimeValueConverter() {
    }
    DatetimeValueConverter.prototype.toView = function (value, format) {
        return ui_format_1.UIFormat.datetime(value, format);
    };
    return DatetimeValueConverter;
}());
exports.DatetimeValueConverter = DatetimeValueConverter;
var FromNowValueConverter = (function () {
    function FromNowValueConverter() {
    }
    FromNowValueConverter.prototype.toView = function (value) {
        return ui_format_1.UIFormat.fromNow(value);
    };
    return FromNowValueConverter;
}());
exports.FromNowValueConverter = FromNowValueConverter;
var UtcValueConverter = (function () {
    function UtcValueConverter() {
    }
    UtcValueConverter.prototype.toView = function (value) {
        return ui_format_1.UIFormat.utcDate(value);
    };
    return UtcValueConverter;
}());
exports.UtcValueConverter = UtcValueConverter;
var NumberValueConverter = (function () {
    function NumberValueConverter() {
    }
    NumberValueConverter.prototype.toView = function (value, format) {
        return ui_format_1.UIFormat.number(value, format);
    };
    return NumberValueConverter;
}());
exports.NumberValueConverter = NumberValueConverter;
var CurrencyValueConverter = (function () {
    function CurrencyValueConverter() {
    }
    CurrencyValueConverter.prototype.toView = function (value, symbol, format) {
        return ui_format_1.UIFormat.currency(value, symbol, format);
    };
    return CurrencyValueConverter;
}());
exports.CurrencyValueConverter = CurrencyValueConverter;
var PercentValueConverter = (function () {
    function PercentValueConverter() {
    }
    PercentValueConverter.prototype.toView = function (value) {
        return ui_format_1.UIFormat.percent(value);
    };
    return PercentValueConverter;
}());
exports.PercentValueConverter = PercentValueConverter;
