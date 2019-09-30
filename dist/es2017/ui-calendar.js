import { bindable, customElement, inlineView, computedFrom, bindingMode, viewResources } from 'aurelia-framework';
import 'aurelia-event-aggregator';
import { U as UIInternal } from './ui-internal.js';
import { _ as __decorate, a as __metadata } from './_tslib.js';
import { startOfMinute, addDays, addWeeks, addMonths, addYears, parseISO, startOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, format, startOfDecade, endOfDecade, isValid, isBefore, isAfter, getDay, setDay, isSameMonth, isSameDay, endOfDay, setMonth, getHours, setHours, getMinutes, setMinutes, isSameYear } from 'date-fns';
import 'kramed';
import 'numeral';
import { U as UIFormat } from './ui-format.js';

var view = "<template class=\"ui-calendar__header\">\n  <a class=\"ui-calendar__tool first\" data-tool=\"first\" if.bind=\"showFirstLast\" data-disabled.bind=\"config.firstDisabled\" ui-tooltip.bind=\"config.firstTooltip\"><ui-svg-icon icon=\"page-first\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__tool prev\" data-tool=\"prev\" data-disabled.bind=\"config.prevDisabled\" ui-tooltip.bind=\"config.prevTooltip\"><ui-svg-icon icon=\"page-previous\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__title\" data-tool=\"title\"><slot></slot></a>\n  <a class=\"ui-calendar__tool next\" data-tool=\"next\" data-disabled.bind=\"config.nextDisabled\" ui-tooltip.bind=\"config.nextTooltip\"><ui-svg-icon icon=\"page-next\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__tool last\" data-tool=\"last\" if.bind=\"showFirstLast\" data-disabled.bind=\"config.lastDisabled\" ui-tooltip.bind=\"config.lastTooltip\"><ui-svg-icon icon=\"page-last\"></ui-svg-icon></a>\n</template>\n";

let CalendarHead = class CalendarHead {
    constructor() {
        this.showFirstLast = false;
        this.config = {};
    }
};
CalendarHead.TITLE = "title";
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], CalendarHead.prototype, "showFirstLast", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], CalendarHead.prototype, "config", void 0);
CalendarHead = __decorate([
    customElement("calendar-head"),
    inlineView(view)
], CalendarHead);

var CALENDAR_VIEWS;
(function (CALENDAR_VIEWS) {
    CALENDAR_VIEWS[CALENDAR_VIEWS["DAYS"] = 0] = "DAYS";
    CALENDAR_VIEWS[CALENDAR_VIEWS["MONTHS"] = 1] = "MONTHS";
    CALENDAR_VIEWS[CALENDAR_VIEWS["YEARS"] = 2] = "YEARS";
    CALENDAR_VIEWS[CALENDAR_VIEWS["DECADES"] = 3] = "DECADES";
})(CALENDAR_VIEWS || (CALENDAR_VIEWS = {}));
var CALENDAR_NAVIGATION;
(function (CALENDAR_NAVIGATION) {
    CALENDAR_NAVIGATION["FIRST"] = "first";
    CALENDAR_NAVIGATION["LAST"] = "last";
    CALENDAR_NAVIGATION["PREV"] = "prev";
    CALENDAR_NAVIGATION["NEXT"] = "next";
})(CALENDAR_NAVIGATION || (CALENDAR_NAVIGATION = {}));
var CALENDAR_GRAIN;
(function (CALENDAR_GRAIN) {
    CALENDAR_GRAIN["DAY"] = "$day";
    CALENDAR_GRAIN["WEEK"] = "$week";
    CALENDAR_GRAIN["MONTH"] = "$month";
    CALENDAR_GRAIN["YEAR"] = "$year";
})(CALENDAR_GRAIN || (CALENDAR_GRAIN = {}));
const parseDate = (date) => {
    if (isString(date)) {
        const dt = startOfMinute(new Date());
        if (date.startsWith(CALENDAR_GRAIN.DAY)) {
            return addDays(dt, parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
        }
        else if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
            return addWeeks(dt, parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10));
        }
        else if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
            return addMonths(dt, parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10));
        }
        else if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
            return addYears(dt, parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10));
        }
        else {
            return parseISO(date);
        }
    }
    else if (date) {
        return date;
    }
    return null;
};
const parseRange = (date) => {
    if (isString(date)) {
        const before = date.includes("-");
        if (date.startsWith(CALENDAR_GRAIN.DAY)) {
            const today = startOfDay(new Date());
            const diff = addDays(new Date(), parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
            return before ? [diff, today] : [today, diff];
        }
        if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
            const start = startOfWeek(new Date());
            const end = endOfWeek(new Date());
            const diff = parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10);
            return [addWeeks(start, diff), addWeeks(end, diff)];
        }
        if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
            const start = startOfMonth(new Date());
            const end = endOfMonth(new Date());
            const diff = parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10);
            return [addMonths(start, diff), addMonths(end, diff)];
        }
        if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
            const start = startOfYear(new Date());
            const end = endOfYear(new Date());
            const diff = parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10);
            return [addYears(start, diff), addYears(end, diff)];
        }
    }
    else if (isArray(date)) {
        return [parseISO(date[0]), parseISO(date[1])];
    }
    return null;
};
const getTitle = (month, view) => {
    if (view === CALENDAR_VIEWS.DAYS) {
        return format(month, "MMMM yyyy");
    }
    if (view === CALENDAR_VIEWS.MONTHS) {
        return format(month, "yyyy");
    }
    if (view === CALENDAR_VIEWS.YEARS) {
        return format(startOfDecade(month), "yyyy") + "-" + format(endOfDecade(month), "yyyy");
    }
    return "-";
};
const changeMonth = (month, view, grain) => {
    if (view === CALENDAR_VIEWS.DAYS) {
        switch (grain) {
            case CALENDAR_NAVIGATION.FIRST:
                return addMonths(month, -12);
            case CALENDAR_NAVIGATION.LAST:
                return addMonths(month, 12);
            case CALENDAR_NAVIGATION.PREV:
                return addMonths(month, -1);
            case CALENDAR_NAVIGATION.NEXT:
                return addMonths(month, 1);
        }
    }
    if (view === CALENDAR_VIEWS.MONTHS) {
        switch (grain) {
            case CALENDAR_NAVIGATION.PREV:
                return addYears(month, -1);
            case CALENDAR_NAVIGATION.NEXT:
                return addYears(month, 1);
        }
    }
    if (view === CALENDAR_VIEWS.YEARS) {
        switch (grain) {
            case CALENDAR_NAVIGATION.PREV:
                return addYears(month, -10);
            case CALENDAR_NAVIGATION.NEXT:
                return addYears(month, 10);
        }
    }
    return month;
};
const buildHeaderConfig = (month, view, config) => {
    if (view === CALENDAR_VIEWS.DAYS) {
        return {
            firstDisabled: isBeforeMin(month, startOfYear(config.minDate), -12),
            lastDisabled: isAfterMax(month, endOfYear(config.maxDate), 12),
            prevDisabled: isBeforeMin(month, startOfMonth(config.minDate), -1),
            nextDisabled: isAfterMax(month, endOfMonth(config.maxDate), 1),
            firstTooltip: format(addMonths(month, -12), "MMM yyyy"),
            lastTooltip: format(addMonths(month, 12), "MMM yyyy"),
            prevTooltip: format(addMonths(month, -1), "MMM yyyy"),
            nextTooltip: format(addMonths(month, 1), "MMM yyyy")
        };
    }
    if (view === CALENDAR_VIEWS.MONTHS) {
        return {
            prevDisabled: isBeforeMin(month, startOfYear(config.minDate), -12),
            nextDisabled: isAfterMax(month, endOfYear(config.maxDate), 12),
            prevTooltip: format(addYears(month, -1), "yyyy"),
            nextTooltip: format(addYears(month, 1), "yyyy")
        };
    }
    if (view === CALENDAR_VIEWS.YEARS) {
        const start = startOfDecade(month);
        const end = endOfDecade(month);
        return {
            prevDisabled: isBeforeMin(month, startOfDecade(config.minDate), -120),
            nextDisabled: isAfterMax(month, endOfDecade(config.maxDate), 120),
            prevTooltip: format(addYears(start, -10), "yyyy") + "-" + format(addYears(start, -1), "yyyy"),
            nextTooltip: format(addYears(end, 1), "yyyy") + "-" + format(addYears(end, 10), "yyyy")
        };
    }
};
const isBeforeMin = (month, minDate, n = 0) => {
    return isValid(minDate) ? isBefore(addMonths(startOfDay(month), n), startOfDay(minDate)) : false;
};
const isAfterMax = (month, maxDate, n = 0) => {
    return isValid(maxDate) ? isAfter(addMonths(startOfDay(month), n), startOfDay(maxDate)) : false;
};
const isDisabled = (config, date) => {
    let min = config.minDate;
    let max = config.maxDate;
    if (config.page === CALENDAR_VIEWS.DAYS) {
        min = startOfDay(min);
        max = startOfDay(max);
    }
    if (config.page === CALENDAR_VIEWS.MONTHS) {
        min = startOfMonth(startOfDay(min));
        max = endOfMonth(startOfDay(max));
    }
    if (config.page === CALENDAR_VIEWS.YEARS) {
        min = startOfYear(startOfDay(min));
        max = startOfYear(startOfDay(max));
    }
    if (isBefore(date, min)) {
        return true;
    }
    if (isAfter(date, max)) {
        return true;
    }
    if (config.page === CALENDAR_VIEWS.DAYS && config.disabled) {
        const { disabled } = config;
        if (isArray(disabled)) {
            return disabled.includes(startOfDay(date).toISOString());
        }
        else if (isFunction(disabled)) {
            return disabled({ date });
        }
    }
    return false;
};

var view$1 = "<template data-page=\"days\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <span class=\"ui-calendar__page__head\">#</span>\n      <span class=\"ui-calendar__page__head\" repeat.for=\"w of 7\">${weekTitle(w)}</span>\n    </div>\n    <div class=\"ui-calendar__page__row\" repeat.for=\"w of 6\">\n      <span class=\"ui-calendar__page__cell week\">${weekNumber(w, month)}</span>\n      <a repeat.for=\"d of 7\" with.bind=\"getDate(w, d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell date ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

let DaysPage = class DaysPage {
    constructor() {
        this.isAttached = false;
    }
    attached() {
        this.isAttached = true;
    }
    monthChanged(newMonth) {
        this.month = newMonth || new Date();
        const start = startOfMonth(this.month);
        this.pageStart = startOfWeek(startOfMonth(this.month));
        if (getDay(start) < 3) {
            this.pageStart = addWeeks(this.pageStart, -1);
        }
    }
    weekTitle(week) {
        return format(setDay(new Date(), week), "E").substr(0, 2);
    }
    weekNumber(week) {
        return format(addWeeks(this.pageStart, week), "ww");
    }
    getDate(week, day) {
        const date = addDays(addWeeks(this.pageStart, week), day);
        const classes = [];
        if (!isSameMonth(this.month, date)) {
            classes.push("date-other");
        }
        if (isSameDay(new Date(), date)) {
            classes.push("date-today");
        }
        if (this.config) {
            if (isArray(this.config.date)) {
                if (isAfter(startOfDay(date), this.config.date[0]) &&
                    isBefore(endOfDay(date), this.config.date[1])) {
                    classes.push("select-hilight");
                }
                if (isSameDay(date, this.config.date[0])) {
                    classes.push("select-start");
                }
                if (isSameDay(date, this.config.date[1])) {
                    classes.push("select-end");
                }
            }
            if (isDate(this.config.date) && isSameDay(date, this.config.date)) {
                classes.push("selected");
            }
            if (isDisabled(this.config, date)) {
                classes.push("disabled");
            }
        }
        return { date, label: format(date, "dd"), classes: classes.join(" ") };
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Date)
], DaysPage.prototype, "month", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], DaysPage.prototype, "config", void 0);
DaysPage = __decorate([
    customElement("days-page"),
    inlineView(view$1)
], DaysPage);

var view$2 = "<template data-page=\"months\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <a repeat.for=\"d of 12\" with.bind=\"getMonth(d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell month ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

let MonthsPage = class MonthsPage {
    constructor() {
        this.isAttached = false;
    }
    attached() {
        this.isAttached = true;
    }
    getMonth(month) {
        const date = setMonth(this.month, month);
        const classes = [];
        if (this.config) {
            if (isDate(this.config.date) && isSameMonth(date, this.config.date)) {
                classes.push("selected");
            }
            if (isDisabled(Object.assign({ disabled: [] }, this.config), date)) {
                classes.push("disabled");
            }
        }
        return { date, label: format(date, "MMM"), classes: classes.join(" ") };
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Date)
], MonthsPage.prototype, "month", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], MonthsPage.prototype, "config", void 0);
MonthsPage = __decorate([
    customElement("months-page"),
    inlineView(view$2)
], MonthsPage);

var view$3 = "<template data-page=\"time\" class=\"ui-calendar__clock\">\n  <ui-slider min=\"1\" max=\"12\" value.to-view=\"hour\" change.trigger=\"hour = $event.target.value & debounce\"></ui-slider>\n  <ui-slider min=\"0\" max=\"59\" value.to-view=\"minute\" change.trigger=\"minute = $event.target.value & debounce\"></ui-slider>\n\n  <div class=\"ui-calendar__clock__ampm\" data-value.bind=\"ampm\" click.trigger=\"switchAmpm()\">\n    <div></div>\n  </div>\n</template>\n";

let TimePage = class TimePage {
    constructor(element) {
        this.element = element;
        this.time = new Date();
    }
    get hour() {
        const hr = getHours(this.time);
        return `${hr === 0 || hr === 12 ? 12 : hr > 12 ? hr - 12 : hr}`;
    }
    set hour(hour) {
        const newHr = parseInt(hour === "12" ? "0" : hour, 10);
        const hr = getHours(this.time);
        this.time = setHours(this.time, hr < 12 ? newHr : newHr + 12);
        this.fireChange();
    }
    get minute() {
        return getMinutes(this.time);
    }
    set minute(min) {
        this.time = setMinutes(this.time, min);
        this.fireChange();
    }
    get ampm() {
        return getHours(this.time) < 12 ? "am" : "pm";
    }
    switchAmpm() {
        const hr = getHours(this.time);
        this.time = setHours(this.time, hr < 12 ? hr + 12 : hr - 12);
        this.fireChange();
    }
    fireChange() {
        this.element.dispatchEvent(UIInternal.createEvent("change", this.time));
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Date)
], TimePage.prototype, "time", void 0);
__decorate([
    computedFrom("time"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TimePage.prototype, "hour", null);
__decorate([
    computedFrom("time"),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TimePage.prototype, "minute", null);
__decorate([
    computedFrom("time"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TimePage.prototype, "ampm", null);
TimePage = __decorate([
    customElement("time-page"),
    inlineView(view$3),
    __metadata("design:paramtypes", [Element])
], TimePage);

var view$4 = "<template class=\"ui-calendar\">\n  <calendar-head click.delegate=\"headerClicked($event)\" config.bind=\"headerOptions\" show-first-last.bind=\"currentPage === VIEWS.DAYS\">${title}\n  </calendar-head>\n  <days-page if.bind=\"currentPage === VIEWS.DAYS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectDate($event)\"></days-page>\n  <months-page if.bind=\"currentPage === VIEWS.MONTHS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectMonth($event)\"></months-page>\n  <years-page if.bind=\"currentPage === VIEWS.YEARS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectMonth($event)\"></years-page>\n  <time-page time.bind=\"time\" change.trigger=\"timeChanged($event.detail)\"></time-page>\n  <div class=\"ui-calendar__footer\">\n    <div class=\"ui-calendar__tags\">\n      <a class=\"ui-calendar__tag\" repeat.for=\"preset of datePresets\" data-active.bind=\"preset.preset === date\" click.trigger=\"selectPreset(preset.preset)\">${preset.label}</a>\n    </div>\n    <a if.bind=\"selecting || currentPage !== VIEWS.DAYS\" class=\"ui-calendar__tag cancel\" click.trigger=\"cancelSelection()\">Cancel</a>\n  </div>\n</template>\n";

var view$5 = "<template data-page=\"years\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <a repeat.for=\"d of 12\" with.bind=\"getYear(d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell year ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

let YearsPage = class YearsPage {
    constructor() {
        this.isAttached = false;
    }
    attached() {
        this.isAttached = true;
    }
    monthChanged(newMonth) {
        this.month = newMonth || new Date();
        this.pageStart = addYears(startOfDecade(this.month), -1);
    }
    getYear(year) {
        const date = addYears(this.pageStart, year);
        const classes = [];
        if (year === 0 || year === 11) {
            classes.push("date-other");
        }
        if (this.config) {
            if (isDate(this.config.date) && isSameYear(date, this.config.date)) {
                classes.push("selected");
            }
            if (isDisabled(Object.assign({ disabled: [] }, this.config), date)) {
                classes.push("disabled");
            }
        }
        return { date, label: format(date, "yyyy"), classes: classes.join(" ") };
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Date)
], YearsPage.prototype, "month", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], YearsPage.prototype, "config", void 0);
YearsPage = __decorate([
    customElement("years-page"),
    inlineView(view$5)
], YearsPage);

let UIDatePicker = class UIDatePicker {
    constructor() {
        this.format = "dd MMM yyyy HH:mm";
        this.datePresets = [];
        this.currentPage = CALENDAR_VIEWS.DAYS;
        this.month = startOfMonth(new Date());
        this.time = parseISO("2018-01-01T00:00:00.000");
        this.VIEWS = CALENDAR_VIEWS;
    }
    bind() {
        this.dateChanged();
    }
    dateChanged() {
        this.selectedDate = parseDate(this.date);
        if (isValid(this.selectedDate)) {
            this.time = new Date(this.selectedDate);
            this.month = startOfMonth(this.selectedDate);
            const preset = this.datePresets.find(p => p.preset === this.date);
            this.dateLabel = preset ? preset.label : UIFormat.datetime(this.selectedDate, this.format);
        }
    }
    get config() {
        return {
            date: this.selectedDate,
            page: this.currentPage,
            minDate: parseDate(this.minDate),
            maxDate: parseDate(this.maxDate),
            disabled: this.disabledDatesList
        };
    }
    get title() {
        return getTitle(this.month, this.currentPage);
    }
    get headerOptions() {
        return buildHeaderConfig(this.month, this.currentPage, this.config);
    }
    get disabledDatesList() {
        if (isArray(this.disabledDates)) {
            return this.disabledDates.map(d => {
                const dt = parseDate(d);
                return !isEmpty(dt) ? startOfDay(dt).toISOString() : null;
            });
        }
        return this.disabledDates;
    }
    headerClicked($event) {
        const target = $event.target;
        if (target.dataset.tool) {
            if (target.dataset.tool === CalendarHead.TITLE) {
                if (this.currentPage !== CALENDAR_VIEWS.YEARS) {
                    this.currentPage++;
                }
            }
            else {
                this.month = changeMonth(this.month, this.currentPage, target.dataset.tool);
            }
        }
    }
    selectDate($event) {
        const target = $event.target;
        if (target.dataset.date) {
            this.updateDate(startOfDay(new Date(target.dataset.date)));
        }
    }
    timeChanged(newTime) {
        this.updateDate(this.date ? parseDate(this.date) : new Date(), newTime);
    }
    selectMonth($event) {
        const target = $event.target;
        if (target.dataset.date) {
            this.month = new Date(target.dataset.date);
            this.currentPage--;
        }
    }
    cancelSelection() {
        this.currentPage = CALENDAR_VIEWS.DAYS;
    }
    selectPreset(preset) {
        this.cancelSelection();
        this.date = preset;
    }
    updateDate(dt, tm = this.time) {
        dt.setHours(tm.getHours());
        dt.setMinutes(tm.getMinutes());
        this.date = dt.toISOString();
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", String)
], UIDatePicker.prototype, "date", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDatePicker.prototype, "minDate", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDatePicker.prototype, "maxDate", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDatePicker.prototype, "disabledDates", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDatePicker.prototype, "format", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UIDatePicker.prototype, "datePresets", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.fromView }),
    __metadata("design:type", String)
], UIDatePicker.prototype, "dateLabel", void 0);
__decorate([
    computedFrom("selectedDate", "currentPage", "minDate", "maxDate", "disabledDates"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDatePicker.prototype, "config", null);
__decorate([
    computedFrom("month", "currentPage"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], UIDatePicker.prototype, "title", null);
__decorate([
    computedFrom("month", "currentPage", "minDate", "maxDate"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDatePicker.prototype, "headerOptions", null);
UIDatePicker = __decorate([
    customElement("ui-date-picker"),
    inlineView(view$4),
    viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
], UIDatePicker);

var view$6 = "<template class=\"ui-calendar\">\n  <div class=\"ui-calendar__range\">\n    <div>\n      <calendar-head click.delegate=\"startHeaderClicked($event)\" config.bind=\"startHeaderOptions\" show-first-last.bind=\"startPage === VIEWS.DAYS\">${startTitle}\n      </calendar-head>\n      <days-page if.bind=\"startPage === VIEWS.DAYS\" month.bind=\"startMonth\" config.to-view=\"config\" mouseover.delegate=\"hilightDate($event)\" click.delegate=\"selectDate($event)\"></days-page>\n      <months-page if.bind=\"startPage === VIEWS.MONTHS\" month.bind=\"startMonth\" config.to-view=\"config\" click.delegate=\"selectStartMonth($event)\"></months-page>\n      <years-page if.bind=\"startPage === VIEWS.YEARS\" month.bind=\"startMonth\" config.to-view=\"config\" click.delegate=\"selectStartMonth($event)\"></years-page>\n    </div>\n    <ui-divider></ui-divider>\n    <div>\n      <calendar-head click.delegate=\"endHeaderClicked($event)\" config.bind=\"endHeaderOptions\" show-first-last.bind=\"endPage === VIEWS.DAYS\">${endTitle}\n      </calendar-head>\n      <days-page if.bind=\"endPage === VIEWS.DAYS\" month.bind=\"endMonth\" config.to-view=\"config\" mouseover.delegate=\"hilightDate($event)\" click.delegate=\"selectDate($event)\"></days-page>\n      <months-page if.bind=\"endPage === VIEWS.MONTHS\" month.bind=\"endMonth\" config.to-view=\"config\" click.delegate=\"selectEndMonth($event)\"></months-page>\n      <years-page if.bind=\"endPage === VIEWS.YEARS\" month.bind=\"endMonth\" config.to-view=\"config\" click.delegate=\"selectEndMonth($event)\"></years-page>\n    </div>\n  </div>\n  <div class=\"ui-calendar__footer\">\n    <div class=\"ui-calendar__tags\">\n      <a class=\"ui-calendar__tag\" repeat.for=\"preset of datePresets\" data-active.bind=\"preset.preset === date\" click.trigger=\"selectPreset(preset.preset)\">${preset.label}</a>\n    </div>\n    <a if.bind=\"selecting || startPage !== VIEWS.DAYS || endPage !== VIEWS.DAYS\" class=\"ui-calendar__tag cancel\" click.trigger=\"cancelSelection()\">Cancel</a>\n  </div>\n</template>\n";

let UIRangePicker = class UIRangePicker {
    constructor() {
        this.format = "dd MMM yyyy";
        this.datePresets = [];
        this.startMonth = startOfMonth(new Date());
        this.endMonth = startOfMonth(addMonths(new Date(), 1));
        this.startPage = CALENDAR_VIEWS.DAYS;
        this.endPage = CALENDAR_VIEWS.DAYS;
        this.VIEWS = CALENDAR_VIEWS;
    }
    bind() {
        this.dateChanged();
    }
    dateChanged() {
        this.selectedDate = parseRange(this.date);
        if (this.selectedDate) {
            this.startMonth = startOfMonth(this.selectedDate[0]);
            this.endMonth = startOfMonth(this.selectedDate[1]);
            const preset = this.datePresets.find(p => p.preset === this.date);
            this.dateLabel = preset
                ? preset.label
                : `${UIFormat.date(this.selectedDate[0], this.format)} ~ ${UIFormat.date(this.selectedDate[1], this.format)}`;
        }
    }
    get config() {
        return {
            date: this.selecting ? [this.selecting, this.hilight] : this.selectedDate,
            minDate: parseDate(this.minDate),
            maxDate: parseDate(this.maxDate),
            disabled: []
        };
    }
    get startTitle() {
        return getTitle(this.startMonth, this.startPage);
    }
    get endTitle() {
        return getTitle(this.endMonth, this.endPage);
    }
    get startHeaderOptions() {
        return buildHeaderConfig(this.startMonth, this.startPage, Object.assign(Object.assign({}, this.config), { page: this.startPage }));
    }
    get endHeaderOptions() {
        return buildHeaderConfig(this.endMonth, this.endPage, Object.assign(Object.assign({}, this.config), { page: this.endPage }));
    }
    startHeaderClicked($event) {
        const target = $event.target;
        if (target.dataset.tool) {
            if (target.dataset.tool === CalendarHead.TITLE) {
                if (this.startPage !== CALENDAR_VIEWS.YEARS) {
                    this.startPage++;
                }
            }
            else {
                this.startMonth = changeMonth(this.startMonth, this.startPage, target.dataset.tool);
                if (isSameMonth(this.startMonth, this.endMonth) ||
                    isAfter(this.startMonth, this.endMonth)) {
                    this.endMonth = addMonths(this.startMonth, 1);
                }
            }
        }
    }
    endHeaderClicked($event) {
        const target = $event.target;
        if (target.dataset.tool) {
            if (target.dataset.tool === CalendarHead.TITLE) {
                if (this.endPage !== CALENDAR_VIEWS.YEARS) {
                    this.endPage++;
                }
            }
            else {
                this.endMonth = changeMonth(this.endMonth, this.endPage, target.dataset.tool);
                if (isSameMonth(this.startMonth, this.endMonth) ||
                    isBefore(this.endMonth, this.startMonth)) {
                    this.startMonth = addMonths(this.endMonth, -1);
                }
            }
        }
    }
    selectDate($event) {
        const target = $event.target;
        if (target.dataset.date) {
            const date = new Date(target.dataset.date);
            if (this.selecting) {
                this.date = isBefore(date, this.selecting)
                    ? [startOfDay(date).toISOString(), endOfDay(this.selecting).toISOString()]
                    : [startOfDay(this.selecting).toISOString(), endOfDay(date).toISOString()];
                this.selecting = null;
            }
            else {
                this.selecting = date;
            }
        }
    }
    selectStartMonth($event) {
        const target = $event.target;
        if (target.dataset.date) {
            this.startMonth = new Date(target.dataset.date);
            this.startPage--;
            if (isSameMonth(this.startMonth, this.endMonth) || isAfter(this.startMonth, this.endMonth)) {
                this.endMonth = addMonths(this.startMonth, 1);
            }
        }
    }
    selectEndMonth($event) {
        const target = $event.target;
        if (target.dataset.date) {
            this.endMonth = new Date(target.dataset.date);
            this.endPage--;
            if (isSameMonth(this.startMonth, this.endMonth) || isBefore(this.endMonth, this.startMonth)) {
                this.startMonth = addMonths(this.endMonth, -1);
            }
        }
    }
    cancelSelection() {
        this.selecting = null;
        this.startPage = CALENDAR_VIEWS.DAYS;
        this.endPage = CALENDAR_VIEWS.DAYS;
    }
    hilightDate($event) {
        const target = $event.target;
        if (target.dataset.date) {
            this.hilight = new Date(target.dataset.date);
        }
    }
    selectPreset(preset) {
        this.cancelSelection();
        this.date = preset;
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIRangePicker.prototype, "date", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIRangePicker.prototype, "minDate", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIRangePicker.prototype, "maxDate", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIRangePicker.prototype, "format", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UIRangePicker.prototype, "datePresets", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.fromView }),
    __metadata("design:type", String)
], UIRangePicker.prototype, "dateLabel", void 0);
__decorate([
    computedFrom("selectedDate", "hilight", "selecting", "minDate", "maxDate", "disabledDates"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIRangePicker.prototype, "config", null);
__decorate([
    computedFrom("startMonth", "startPage"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], UIRangePicker.prototype, "startTitle", null);
__decorate([
    computedFrom("endMonth", "endPage"),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], UIRangePicker.prototype, "endTitle", null);
__decorate([
    computedFrom("startMonth", "startPage", "minDate", "maxDate"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIRangePicker.prototype, "startHeaderOptions", null);
__decorate([
    computedFrom("endMonth", "endPage", "minDate", "maxDate"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIRangePicker.prototype, "endHeaderOptions", null);
UIRangePicker = __decorate([
    customElement("ui-range-picker"),
    inlineView(view$6),
    viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
], UIRangePicker);

const Calendar = [UIDatePicker, UIRangePicker];

export { Calendar };
//# sourceMappingURL=ui-calendar.js.map
