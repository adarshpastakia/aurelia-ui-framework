System.register(["../utils/ui-format"], function (exports_1, context_1) {
    "use strict";
    var ui_format_1, JsonValueConverter, MarkdownValueConverter, PhoneValueConverter, DateValueConverter, TimeValueConverter, DatetimeValueConverter, FromNowValueConverter, UtcValueConverter, NumberValueConverter, CurrencyValueConverter, PercentValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (ui_format_1_1) {
                ui_format_1 = ui_format_1_1;
            }
        ],
        execute: function () {
            JsonValueConverter = (function () {
                function JsonValueConverter() {
                }
                JsonValueConverter.prototype.toView = function (value) {
                    return JSON.stringify(value);
                };
                return JsonValueConverter;
            }());
            exports_1("JsonValueConverter", JsonValueConverter);
            MarkdownValueConverter = (function () {
                function MarkdownValueConverter() {
                }
                MarkdownValueConverter.prototype.toView = function (value) {
                    return ui_format_1.UIFormat.toHTML(value || '');
                };
                return MarkdownValueConverter;
            }());
            exports_1("MarkdownValueConverter", MarkdownValueConverter);
            PhoneValueConverter = (function () {
                function PhoneValueConverter() {
                }
                PhoneValueConverter.prototype.toView = function (value, country) {
                    if (country === void 0) { country = ''; }
                    return PhoneLib.format(value || '', country, PhoneLib.FORMAT.INTERNATIONAL);
                };
                return PhoneValueConverter;
            }());
            exports_1("PhoneValueConverter", PhoneValueConverter);
            DateValueConverter = (function () {
                function DateValueConverter() {
                }
                DateValueConverter.prototype.toView = function (value, format) {
                    return ui_format_1.UIFormat.date(value, format);
                };
                return DateValueConverter;
            }());
            exports_1("DateValueConverter", DateValueConverter);
            TimeValueConverter = (function () {
                function TimeValueConverter() {
                }
                TimeValueConverter.prototype.toView = function (value, format) {
                    return ui_format_1.UIFormat.time(value, format);
                };
                return TimeValueConverter;
            }());
            exports_1("TimeValueConverter", TimeValueConverter);
            DatetimeValueConverter = (function () {
                function DatetimeValueConverter() {
                }
                DatetimeValueConverter.prototype.toView = function (value, format) {
                    return ui_format_1.UIFormat.datetime(value, format);
                };
                return DatetimeValueConverter;
            }());
            exports_1("DatetimeValueConverter", DatetimeValueConverter);
            FromNowValueConverter = (function () {
                function FromNowValueConverter() {
                }
                FromNowValueConverter.prototype.toView = function (value) {
                    return ui_format_1.UIFormat.fromNow(value);
                };
                return FromNowValueConverter;
            }());
            exports_1("FromNowValueConverter", FromNowValueConverter);
            UtcValueConverter = (function () {
                function UtcValueConverter() {
                }
                UtcValueConverter.prototype.toView = function (value) {
                    return ui_format_1.UIFormat.utcDate(value);
                };
                return UtcValueConverter;
            }());
            exports_1("UtcValueConverter", UtcValueConverter);
            NumberValueConverter = (function () {
                function NumberValueConverter() {
                }
                NumberValueConverter.prototype.toView = function (value, format) {
                    return ui_format_1.UIFormat.number(value, format);
                };
                return NumberValueConverter;
            }());
            exports_1("NumberValueConverter", NumberValueConverter);
            CurrencyValueConverter = (function () {
                function CurrencyValueConverter() {
                }
                CurrencyValueConverter.prototype.toView = function (value, symbol, format) {
                    return ui_format_1.UIFormat.currency(value, symbol, format);
                };
                return CurrencyValueConverter;
            }());
            exports_1("CurrencyValueConverter", CurrencyValueConverter);
            PercentValueConverter = (function () {
                function PercentValueConverter() {
                }
                PercentValueConverter.prototype.toView = function (value) {
                    return ui_format_1.UIFormat.percent(value);
                };
                return PercentValueConverter;
            }());
            exports_1("PercentValueConverter", PercentValueConverter);
        }
    };
});
