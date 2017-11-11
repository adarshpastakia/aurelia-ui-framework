define(["require", "exports", "../utils/ui-format"], function (require, exports, ui_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbHVlLWNvbnZlcnRlcnMvdWktdGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQTtRQUFBO1FBSUEsQ0FBQztRQUhDLG1DQUFNLEdBQU4sVUFBTyxLQUFVO1lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNILHlCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSxnREFBa0I7SUFNL0I7UUFBQTtRQUlBLENBQUM7UUFIQyx1Q0FBTSxHQUFOLFVBQU8sS0FBYTtZQUNsQixNQUFNLENBQUMsb0JBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDSCw2QkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksd0RBQXNCO0lBTW5DO1FBQUE7UUFJQSxDQUFDO1FBSEMsb0NBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxPQUFZO1lBQVosd0JBQUEsRUFBQSxZQUFZO1lBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUUsQ0FBQztRQUNILDBCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSxrREFBbUI7SUFPaEM7UUFBQTtRQUlBLENBQUM7UUFIQyxtQ0FBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLE1BQWU7WUFDbkMsTUFBTSxDQUFDLG9CQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0gseUJBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLGdEQUFrQjtJQUsvQjtRQUFBO1FBSUEsQ0FBQztRQUhDLG1DQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBZTtZQUNuQyxNQUFNLENBQUMsb0JBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDSCx5QkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksZ0RBQWtCO0lBSy9CO1FBQUE7UUFJQSxDQUFDO1FBSEMsdUNBQU0sR0FBTixVQUFPLEtBQWEsRUFBRSxNQUFlO1lBQ25DLE1BQU0sQ0FBQyxvQkFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNILDZCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSx3REFBc0I7SUFLbkM7UUFBQTtRQUlBLENBQUM7UUFIQyxzQ0FBTSxHQUFOLFVBQU8sS0FBYTtZQUNsQixNQUFNLENBQUMsb0JBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNILDRCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSxzREFBcUI7SUFLbEM7UUFBQTtRQUlBLENBQUM7UUFIQyxrQ0FBTSxHQUFOLFVBQU8sS0FBYTtZQUNsQixNQUFNLENBQUMsb0JBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNILHdCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSw4Q0FBaUI7SUFPOUI7UUFBQTtRQUlBLENBQUM7UUFIQyxxQ0FBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLE1BQWU7WUFDbkMsTUFBTSxDQUFDLG9CQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQ0gsMkJBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLG9EQUFvQjtJQUtqQztRQUFBO1FBSUEsQ0FBQztRQUhDLHVDQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBZSxFQUFFLE1BQWU7WUFDcEQsTUFBTSxDQUFDLG9CQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNILDZCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSx3REFBc0I7SUFLbkM7UUFBQTtRQUlBLENBQUM7UUFIQyxzQ0FBTSxHQUFOLFVBQU8sS0FBYTtZQUNsQixNQUFNLENBQUMsb0JBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNILDRCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSxzREFBcUIiLCJmaWxlIjoidmFsdWUtY29udmVydGVycy91aS10ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTZcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgVUlGb3JtYXQgfSBmcm9tIFwiLi4vdXRpbHMvdWktZm9ybWF0XCI7XG5cbmV4cG9ydCBjbGFzcyBKc29uVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodmFsdWU6IGFueSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1hcmtkb3duVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiBVSUZvcm1hdC50b0hUTUwodmFsdWUgfHwgJycpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQaG9uZVZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlOiBzdHJpbmcsIGNvdW50cnkgPSAnJykge1xuICAgIHJldHVybiBQaG9uZUxpYi5mb3JtYXQodmFsdWUgfHwgJycsIGNvdW50cnksIFBob25lTGliLkZPUk1BVC5JTlRFUk5BVElPTkFMKTtcbiAgfVxufVxuXG4vLyBEYXRlc1xuZXhwb3J0IGNsYXNzIERhdGVWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gVUlGb3JtYXQuZGF0ZSh2YWx1ZSwgZm9ybWF0KTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFRpbWVWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gVUlGb3JtYXQudGltZSh2YWx1ZSwgZm9ybWF0KTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIERhdGV0aW1lVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodmFsdWU6IHN0cmluZywgZm9ybWF0Pzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFVJRm9ybWF0LmRhdGV0aW1lKHZhbHVlLCBmb3JtYXQpO1xuICB9XG59XG5leHBvcnQgY2xhc3MgRnJvbU5vd1ZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gVUlGb3JtYXQuZnJvbU5vdyh2YWx1ZSk7XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBVdGNWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIFVJRm9ybWF0LnV0Y0RhdGUodmFsdWUpO1xuICB9XG59XG5cbi8vIE51bWJlcnNcbmV4cG9ydCBjbGFzcyBOdW1iZXJWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gVUlGb3JtYXQubnVtYmVyKHZhbHVlLCBmb3JtYXQpO1xuICB9XG59XG5leHBvcnQgY2xhc3MgQ3VycmVuY3lWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyh2YWx1ZTogc3RyaW5nLCBzeW1ib2w/OiBzdHJpbmcsIGZvcm1hdD86IHN0cmluZykge1xuICAgIHJldHVybiBVSUZvcm1hdC5jdXJyZW5jeSh2YWx1ZSwgc3ltYm9sLCBmb3JtYXQpO1xuICB9XG59XG5leHBvcnQgY2xhc3MgUGVyY2VudFZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gVUlGb3JtYXQucGVyY2VudCh2YWx1ZSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
