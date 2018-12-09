/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, bindingMode, computedFrom, customElement } from "aurelia-framework";
import { addMonths, endOfWeek, isAfter, isBefore, isWithinInterval, startOfMonth, subMonths, toDate } from "date-fns";
export var UIDateRangeKeys;
(function (UIDateRangeKeys) {
    UIDateRangeKeys["TODAY"] = "TODAY";
    UIDateRangeKeys["YESTERDAY"] = "YESTERDAY";
    UIDateRangeKeys["THIS_WEEK"] = "THIS_WEEK";
    UIDateRangeKeys["LAST_WEEK"] = "LAST_WEEK";
    UIDateRangeKeys["NEXT_WEEK"] = "NEXT_WEEK";
    UIDateRangeKeys["THIS_MONTH"] = "THIS_MONTH";
    UIDateRangeKeys["LAST_MONTH"] = "LAST_MONTH";
    UIDateRangeKeys["NEXT_MONTH"] = "NEXT_MONTH";
    UIDateRangeKeys["THIS_QUARTER"] = "THIS_QUARTER";
    UIDateRangeKeys["LAST_QUARTER"] = "LAST_QUARTER";
    UIDateRangeKeys["NEXT_QUARTER"] = "NEXT_QUARTER";
    UIDateRangeKeys["THIS_YEAR"] = "THIS_YEAR";
    UIDateRangeKeys["LAST_YEAR"] = "LAST_YEAR";
    UIDateRangeKeys["NEXT_YEAR"] = "NEXT_YEAR";
    UIDateRangeKeys["LAST_7"] = "LAST_7";
    UIDateRangeKeys["NEXT_7"] = "NEXT_7";
    UIDateRangeKeys["LAST_15"] = "LAST_15";
    UIDateRangeKeys["NEXT_15"] = "NEXT_15";
    UIDateRangeKeys["LAST_30"] = "LAST_30";
    UIDateRangeKeys["NEXT_30"] = "NEXT_30";
    UIDateRangeKeys["LAST_60"] = "LAST_60";
    UIDateRangeKeys["NEXT_60"] = "NEXT_60";
    UIDateRangeKeys["LAST_90"] = "LAST_90";
    UIDateRangeKeys["NEXT_90"] = "NEXT_90";
    UIDateRangeKeys["CUSTOM"] = "CUSTOM";
    UIDateRangeKeys["DIVIDER"] = "-";
})(UIDateRangeKeys || (UIDateRangeKeys = {}));
var UIDateRangeLabels;
(function (UIDateRangeLabels) {
    UIDateRangeLabels["TODAY"] = "Today";
    UIDateRangeLabels["YESTERDAY"] = "Yesterday";
    UIDateRangeLabels["THIS_WEEK"] = "This Week";
    UIDateRangeLabels["LAST_WEEK"] = "Last Week";
    UIDateRangeLabels["NEXT_WEEK"] = "Next Week";
    UIDateRangeLabels["THIS_MONTH"] = "This Month";
    UIDateRangeLabels["LAST_MONTH"] = "Last Month";
    UIDateRangeLabels["NEXT_MONTH"] = "Next Month";
    UIDateRangeLabels["THIS_QUARTER"] = "This Quarter";
    UIDateRangeLabels["LAST_QUARTER"] = "Last Quarter";
    UIDateRangeLabels["NEXT_QUARTER"] = "Next Quarter";
    UIDateRangeLabels["THIS_YEAR"] = "This Year";
    UIDateRangeLabels["LAST_YEAR"] = "Last Year";
    UIDateRangeLabels["NEXT_YEAR"] = "Next Year";
    UIDateRangeLabels["LAST_7"] = "Last 7 Days";
    UIDateRangeLabels["NEXT_7"] = "Next 7 Days";
    UIDateRangeLabels["LAST_15"] = "Last 15 Days";
    UIDateRangeLabels["NEXT_15"] = "Next 15 Days";
    UIDateRangeLabels["LAST_30"] = "Last 30 Days";
    UIDateRangeLabels["NEXT_30"] = "Next 30 Days";
    UIDateRangeLabels["LAST_60"] = "Last 60 Days";
    UIDateRangeLabels["NEXT_60"] = "Next 60 Days";
    UIDateRangeLabels["LAST_90"] = "Last 90 Days";
    UIDateRangeLabels["NEXT_90"] = "Next 90 Days";
    UIDateRangeLabels["CUSTOM"] = "Custom Range";
})(UIDateRangeLabels || (UIDateRangeLabels = {}));
var UIDateRange = /** @class */ (function () {
    function UIDateRange(element) {
        this.element = element;
        this.start = new Date();
        this.end = new Date();
        this.disabled = false;
        this.rangeSelectors = [
            UIDateRangeKeys.TODAY,
            UIDateRangeKeys.YESTERDAY,
            UIDateRangeKeys.LAST_WEEK,
            UIDateRangeKeys.THIS_WEEK,
            UIDateRangeKeys.NEXT_WEEK,
            UIDateRangeKeys.LAST_MONTH,
            UIDateRangeKeys.THIS_MONTH,
            UIDateRangeKeys.NEXT_MONTH,
            UIDateRangeKeys.DIVIDER,
            UIDateRangeKeys.LAST_7,
            UIDateRangeKeys.NEXT_7,
            UIDateRangeKeys.LAST_15,
            UIDateRangeKeys.NEXT_15,
            UIDateRangeKeys.LAST_30,
            UIDateRangeKeys.NEXT_30
        ];
        this.DateRangeLabels = UIDateRangeLabels;
        this.startVm = {};
        this.endVm = {};
        this.active = UIDateRangeKeys.CUSTOM;
        this.selectStarted = false;
        this.startMonth = startOfMonth(new Date());
        this.endMonth = addMonths(startOfMonth(new Date()), 1);
        this.withTime = true;
        this.withTime = !element.hasAttribute("no-time");
        if (element.dataset.notime) {
            this.withTime = !element.dataset.notime;
        }
        if (this.withTime) {
            element.classList.add("ui-date--has-time");
        }
    }
    UIDateRange.prototype.attached = function () {
        var _this = this;
        this.startVm.monthChanged = function (month) { return _this.startMonthChanged(month); };
        this.endVm.monthChanged = function (month) { return _this.endMonthChanged(month); };
        this.startVm.weekChanged = function (week) { return _this.weekChanged(week); };
        this.endVm.weekChanged = function (week) { return _this.weekChanged(week); };
        this.startVm.withTime = this.endVm.withTime = !this.element.hasAttribute("no-time");
        this.startVm.internalDateChanged = function (date, timeChange) {
            return timeChange
                ? isAfter(_this.end, date)
                    ? (_this.start = date)
                    : (_this.start = _this.end = date)
                : _this.setRange(date, timeChange);
        };
        this.endVm.internalDateChanged = function (date, timeChange) {
            return timeChange
                ? isAfter(date, _this.start)
                    ? (_this.end = date)
                    : (_this.start = _this.end = date)
                : _this.setRange(date, timeChange);
        };
        this.startVm.currentMonth = this.startMonth;
        this.endVm.currentMonth = this.endMonth;
    };
    UIDateRange.prototype.minDateChanged = function () {
        if (isBefore(this.start, this.minDate)) {
            this.start = this.end = undefined;
        }
    };
    UIDateRange.prototype.maxDateChanged = function () {
        if (isAfter(this.end, this.maxDate)) {
            this.start = this.end = undefined;
        }
    };
    Object.defineProperty(UIDateRange.prototype, "range", {
        get: function () {
            return (this.startVm.dateRange = this.endVm.dateRange = this.selectStarted
                ? { start: this.tempStart, end: undefined }
                : { start: this.start, end: this.end });
        },
        enumerable: true,
        configurable: true
    });
    UIDateRange.prototype.weekChanged = function (week) {
        if (isWithinInterval(week, { start: this.minDate, end: this.maxDate }) ||
            isWithinInterval(endOfWeek(week), { start: this.minDate, end: this.maxDate })) {
            this.start = isBefore(week, this.minDate) ? this.minDate : week;
            this.end = isAfter(endOfWeek(week), this.maxDate) ? this.maxDate : endOfWeek(week);
            this.startVm.currentMonth = startOfMonth(this.start);
            this.endVm.currentMonth = startOfMonth(this.end);
        }
    };
    UIDateRange.prototype.startMonthChanged = function (month) {
        this.startMonth = month;
        if (isAfter(this.startMonth, this.endMonth)) {
            this.endMonth = addMonths(this.startMonth, 1);
        }
        this.startVm.currentMonth = this.startMonth;
        this.endVm.currentMonth = this.endMonth;
    };
    UIDateRange.prototype.endMonthChanged = function (month) {
        this.endMonth = month;
        if (isAfter(this.startMonth, this.endMonth)) {
            this.startMonth = subMonths(this.endMonth, 1);
        }
        this.startVm.currentMonth = this.startMonth;
        this.endVm.currentMonth = this.endMonth;
    };
    UIDateRange.prototype.setRange = function (date, timeChange) {
        if (!timeChange) {
            if (!this.selectStarted) {
                this.tempStart = date;
                this.selectStarted = true;
                this.startVm.currentMonth = startOfMonth(this.tempStart);
            }
            else {
                if (isAfter(this.tempStart, date)) {
                    this.tempStart = date;
                    this.startVm.currentMonth = startOfMonth(this.tempStart);
                }
                else {
                    this.start = this.tempStart;
                    this.end = date;
                    this.startVm.currentMonth = startOfMonth(this.tempStart);
                    this.endVm.currentMonth = startOfMonth(this.end);
                    this.tempStart = undefined;
                    this.selectStarted = false;
                    // fire change
                }
            }
        }
    };
    UIDateRange.prototype.cancelSelection = function () {
        this.selectStarted = false;
        this.tempStart = false;
        this.start = toDate(this.start);
        this.end = toDate(this.end);
    };
    UIDateRange.prototype.hilightDate = function ($event) {
        if ($event.target.dataset.date) {
            this.startVm.hilight = toDate($event.target.dataset.date);
            this.endVm.hilight = toDate($event.target.dataset.date);
        }
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIDateRange.prototype, "start", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIDateRange.prototype, "end", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDateRange.prototype, "minDate", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDateRange.prototype, "maxDate", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIDateRange.prototype, "disabled", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Array)
    ], UIDateRange.prototype, "rangeSelectors", void 0);
    __decorate([
        computedFrom("selectStarted", "tempStart", "start", "end"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UIDateRange.prototype, "range", null);
    UIDateRange = __decorate([
        autoinject(),
        customElement("ui-date-range"),
        __metadata("design:paramtypes", [Element])
    ], UIDateRange);
    return UIDateRange;
}());
export { UIDateRange };
