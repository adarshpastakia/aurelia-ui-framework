var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, bindingMode, computedFrom, customElement, PLATFORM } from "aurelia-framework";
import { addDays, addHours, addMonths, addWeeks, addYears, format, getDay, getHours, getYear, isAfter, isBefore, isSameDay, isSameMonth, setHours, setMinutes, startOfMonth, startOfWeek, subDays, subMonths, subYears, toDate } from "date-fns";
import { UIInternal } from "../utils/ui-internal";
PLATFORM.moduleName("./page-date.html");
PLATFORM.moduleName("./page-month.html");
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
        this.time = toDate(this.time || "2000-01-01T00:00:00.000");
    }
    UIDate.prototype.dateChanged = function (date) {
        var _this = this;
        if (date && !this.ignoreChange) {
            this.ignoreChange = true;
            if (isBefore(date, this.minDate)) {
                date = toDate(this.minDate);
            }
            if (isAfter(date, this.maxDate)) {
                date = toDate(this.maxDate);
            }
            if (!this.isDateDisabled(date)) {
                this.date = toDate(date);
                this.time = toDate(this.date);
                this.currentYear = getYear(this.date);
                if (!isSameMonth(format(this.currentMonth, FORMAT_NO_TIMEZONE), format(this.date, FORMAT_NO_TIMEZONE))) {
                    this.currentMonth = startOfMonth(this.date);
                }
            }
            UIInternal.queueTask(function () { return _this.ignoreChange = false; });
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
            return this.time ? format(this.time, "hh") : "00";
        },
        set: function (h) {
            this.time = setHours(this.time, parseInt(h, 10) + (getHours(this.time) < 12 ? 0 : 12));
            this.dateChanged(toDate(format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000")));
            this.fireChange(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDate.prototype, "minute", {
        get: function () {
            return this.time ? format(this.time, "mm") : "00";
        },
        set: function (m) {
            this.time = setMinutes(this.time, parseInt(m, 10));
            this.dateChanged(toDate(format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000")));
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
            this.dateChanged(toDate(format(this.date || new Date(), "yyyy-MM-dd") + "T" + format(this.time, "HH:mm:ss.000")));
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
        if (isSameDay(dt, this.date)) {
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
            var date = new Date();
            this.dateChanged(toDate(format(date, this.withTime ? "yyyy-MM-dd'T'HH:mm:ss.000" : "yyyy-MM-dd")));
            this.fireChange();
        }
    };
    UIDate.prototype.selectDate = function ($event) {
        if ($event.target.dataset.date) {
            this.dateChanged(toDate(format($event.target.dataset.date, "yyyy-MM-dd") +
                "T" +
                format(this.time, "HH:mm:ss.000")));
            this.fireChange();
        }
    };
    UIDate.prototype.hilightDate = function ($event) {
        if ($event.target.dataset.date) {
            this.hilight = toDate($event.target.dataset.date);
        }
    };
    UIDate.prototype.fireChange = function (timeChange) {
        if (timeChange === void 0) { timeChange = false; }
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
