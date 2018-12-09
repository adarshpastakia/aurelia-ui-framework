/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, bindingMode, computedFrom, customElement, observable } from "aurelia-framework";
import { addDays, addHours, addMinutes, addMonths, addWeeks, addYears, format, getDay, getHours, getYear, isAfter, isBefore, isSameDay, isSameMonth, isWithinInterval, startOfMonth, startOfWeek, subDays, subMonths, subYears, toDate } from "date-fns";
import { UIInternal } from "../utils/ui-internal";
var FORMAT_NO_TIME = "yyyy-MM-dd'T'00:00:00.000";
var FORMAT_NO_TIMEZONE = "yyyy-MM-dd'T'HH:mm:ss.000";
var UIDate = /** @class */ (function () {
    function UIDate(element) {
        this.element = element;
        this.date = new Date();
        this.disabledDays = [];
        this.disabled = false;
        this.currentMonth = startOfMonth(new Date());
        this.currentYear = getYear(new Date());
        this.decadeStart = 0;
        this.currentView = "date";
        this.withTime = true;
        this.resetDecade();
        this.withTime = !element.hasAttribute("no-time");
    }
    UIDate.prototype.dateChanged = function (date) {
        if (date) {
            this.time = toDate(this.date);
            this.currentYear = getYear(this.date);
            if (!this.dateRange &&
                !isSameMonth(format(this.currentMonth, FORMAT_NO_TIMEZONE), format(this.date, FORMAT_NO_TIMEZONE))) {
                this.currentMonth = startOfMonth(this.date);
            }
        }
    };
    UIDate.prototype.minDateChanged = function () {
        if (isBefore(this.date, this.minDate)) {
            this.date = toDate(this.minDate);
        }
    };
    UIDate.prototype.maxDateChanged = function () {
        if (isAfter(this.date, this.maxDate)) {
            this.date = toDate(this.maxDate);
        }
    };
    Object.defineProperty(UIDate.prototype, "hour", {
        get: function () {
            return this.time ? format(this.time, "hh") : "";
        },
        set: function (h) {
            this.time = addHours(this.time, parseInt(h, 10));
            this.date = toDate(format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000"));
            if (isBefore(this.date, this.minDate)) {
                this.date = toDate(this.minDate);
            }
            if (isAfter(this.date, this.maxDate)) {
                this.date = toDate(this.maxDate);
            }
            this.fireChange(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDate.prototype, "minute", {
        get: function () {
            return this.time ? format(this.time, "mm") : "";
        },
        set: function (m) {
            this.time = addMinutes(this.time, parseInt(m, 10));
            this.date = toDate(format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000"));
            if (isBefore(this.date, this.minDate)) {
                this.date = toDate(this.minDate);
            }
            if (isAfter(this.date, this.maxDate)) {
                this.date = toDate(this.maxDate);
            }
            this.fireChange(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDate.prototype, "ampm", {
        get: function () {
            return getHours(this.time) >= 12;
        },
        set: function (pm) {
            this.time = addHours(this.time, pm ? 12 : -12);
            this.date = toDate(format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000"));
            if (isBefore(this.date, this.minDate)) {
                this.date = toDate(this.minDate);
            }
            if (isAfter(this.date, this.maxDate)) {
                this.date = toDate(this.maxDate);
            }
            this.fireChange(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDate.prototype, "pageStart", {
        get: function () {
            var pageStart = startOfWeek(this.currentMonth);
            if (getDay(this.currentMonth) < 3) {
                pageStart = subDays(pageStart, 7);
            }
            return pageStart;
        },
        enumerable: true,
        configurable: true
    });
    UIDate.prototype.getWeek = function (date, week) {
        return format(addWeeks(date, week), "ww");
    };
    UIDate.prototype.getDay = function (date, week, day) {
        var dt = addDays(addWeeks(date, week), day);
        return format(dt, "dd");
    };
    UIDate.prototype.getDate = function (date, week, day) {
        var dt = addDays(addWeeks(date, week), day);
        return format(dt, "yyyy-MM-dd");
    };
    UIDate.prototype.getClasses = function (date, week, day) {
        var dt = addDays(addWeeks(date, week), day);
        var classes = ["ui-date__cell", "ui-date__cell--date"];
        if (isSameDay(dt, new Date())) {
            classes.push("ui-date__cell--date--today");
        }
        // Check disabled dates
        if (this.isDateDisabled(dt)) {
            classes.push("ui-date__cell--date--disabled");
        }
        else if (!isSameMonth(dt, this.currentMonth)) {
            classes.push("ui-date__cell--date--muted");
        }
        // Check for date range
        if (this.dateRange) {
            if (this.dateRange.start && isSameDay(dt, this.dateRange.start)) {
                classes.push("ui-date__cell--date--start");
            }
            if (this.dateRange.end && isSameDay(dt, this.dateRange.end)) {
                classes.push("ui-date__cell--date--end");
            }
            if (this.dateRange.start &&
                !this.dateRange.end &&
                this.hilight &&
                isAfter(this.hilight, this.dateRange.start) &&
                isWithinInterval(dt, __assign({}, this.dateRange, { end: this.hilight }))) {
                classes.push("ui-date__cell--date--hilight");
            }
            try {
                if (this.dateRange.start && this.dateRange.end && isWithinInterval(dt, this.dateRange)) {
                    classes.push("ui-date__cell--date--hilight");
                }
            }
            catch (e) {
                //
            }
        }
        else if (isSameDay(dt, this.date)) {
            classes.push("ui-date__cell--date--selected");
        }
        return classes.join(" ");
    };
    UIDate.prototype.isDateDisabled = function (dt) {
        if (dt === void 0) { dt = new Date(); }
        return (isBefore(dt, format(this.minDate, FORMAT_NO_TIME)) ||
            isAfter(dt, format(this.maxDate, FORMAT_NO_TIME)) ||
            (this.disabledDays && this.disabledDays.includes(getDay(dt))) ||
            (isArray(this.disabledDates) && this.disabledDates.includes(dt.toISOString())) ||
            (typeof this.disabledDates === "function" && this.disabledDates(dt)));
    };
    UIDate.prototype.previous = function (unit) {
        if (unit === "month") {
            this.currentMonth = subMonths(this.currentMonth, 1);
            this.resetDecade();
        }
        else if (unit === "year") {
            this.currentMonth = subYears(this.currentMonth, 1);
            this.currentYear--;
            this.resetDecade();
        }
        else if (unit === "decade") {
            this.decadeStart -= 20;
        }
    };
    UIDate.prototype.next = function (unit) {
        if (unit === "month") {
            this.currentMonth = addMonths(this.currentMonth, 1);
            this.resetDecade();
        }
        else if (unit === "year") {
            this.currentMonth = addYears(this.currentMonth, 1);
            this.currentYear++;
            this.resetDecade();
        }
        else if (unit === "decade") {
            this.decadeStart += 20;
        }
    };
    UIDate.prototype.resetDecade = function () {
        var startYear = this.currentYear;
        this.decadeStart = startYear - (startYear % 20) + 1;
    };
    UIDate.prototype.currentMonthChanged = function () {
        if (isFunction(this.monthChanged)) {
            this.monthChanged(this.currentMonth);
        }
    };
    UIDate.prototype.setCurrentMonth = function ($event) {
        if ($event.target.dataset.date) {
            this.currentMonth = toDate($event.target.dataset.date);
            this.currentView = "date";
        }
    };
    UIDate.prototype.getMonthDate = function (year, month) {
        return format(new Date(year, month, 1), "yyyy-MM-dd");
    };
    UIDate.prototype.getMonthName = function (year, month) {
        return format(new Date(year, month, 1), "MMM");
    };
    UIDate.prototype.setCurrentYear = function ($event) {
        if ($event.target.dataset.year) {
            this.currentYear = parseInt($event.target.dataset.year, 10);
            this.currentView = "month";
        }
    };
    UIDate.prototype.selectToday = function () {
        if (!this.isDateDisabled()) {
            this.date = new Date();
            this.fireChange();
        }
    };
    UIDate.prototype.selectDate = function ($event) {
        if ($event.target.dataset.date) {
            this.date = toDate(format($event.target.dataset.date, "yyyy-MM-dd") +
                "T" +
                format(this.time, "HH:mm:ss.000"));
            if (isBefore(this.date, this.minDate)) {
                this.date = toDate(this.minDate);
            }
            if (isAfter(this.date, this.maxDate)) {
                this.date = toDate(this.maxDate);
            }
            this.fireChange();
        }
        if ($event.target.dataset.week) {
            if (isFunction(this.weekChanged)) {
                this.weekChanged(toDate($event.target.dataset.week));
            }
        }
    };
    UIDate.prototype.hilightDate = function ($event) {
        if ($event.target.dataset.date) {
            this.hilight = toDate($event.target.dataset.date);
        }
    };
    UIDate.prototype.fireChange = function (timeChange) {
        if (timeChange === void 0) { timeChange = false; }
        if (isFunction(this.internalDateChanged)) {
            this.internalDateChanged(toDate(this.date), timeChange);
        }
        this.element.dispatchEvent(UIInternal.createEvent("change", this.date));
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIDate.prototype, "date", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDate.prototype, "minDate", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDate.prototype, "maxDate", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Array)
    ], UIDate.prototype, "disabledDays", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIDate.prototype, "disabledDates", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIDate.prototype, "disabled", void 0);
    __decorate([
        observable(),
        __metadata("design:type", Object)
    ], UIDate.prototype, "currentMonth", void 0);
    __decorate([
        observable(),
        __metadata("design:type", Object)
    ], UIDate.prototype, "dateRange", void 0);
    __decorate([
        computedFrom("time"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], UIDate.prototype, "hour", null);
    __decorate([
        computedFrom("time"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], UIDate.prototype, "minute", null);
    __decorate([
        computedFrom("time"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], UIDate.prototype, "ampm", null);
    __decorate([
        computedFrom("currentMonth", "currentView", "date", "hilight", "dateRange", "minDate", "maxDate", "disabledDays", "disabledDates"),
        __metadata("design:type", Date),
        __metadata("design:paramtypes", [])
    ], UIDate.prototype, "pageStart", null);
    UIDate = __decorate([
        autoinject(),
        customElement("ui-date"),
        __metadata("design:paramtypes", [Element])
    ], UIDate);
    return UIDate;
}());
export { UIDate };
