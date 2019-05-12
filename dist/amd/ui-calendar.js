define(['exports', './chunk', 'aurelia-framework', 'aurelia-event-aggregator', './chunk3', 'date-fns', 'kramed', 'numeral', './chunk4'], function (exports, __chunk_1, aureliaFramework, aureliaEventAggregator, __chunk_3, dateFns, kramed, numeral, __chunk_4) { 'use strict';

  kramed = kramed && kramed.hasOwnProperty('default') ? kramed['default'] : kramed;
  numeral = numeral && numeral.hasOwnProperty('default') ? numeral['default'] : numeral;

  var view = "<template class=\"ui-calendar__header\">\n  <a class=\"ui-calendar__tool first\" data-tool=\"first\" if.bind=\"showFirstLast\" data-disabled.bind=\"config.firstDisabled\" ui-tooltip.bind=\"config.firstTooltip\"><ui-svg-icon icon=\"page-first\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__tool prev\" data-tool=\"prev\" data-disabled.bind=\"config.prevDisabled\" ui-tooltip.bind=\"config.prevTooltip\"><ui-svg-icon icon=\"page-previous\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__title\" data-tool=\"title\"><slot></slot></a>\n  <a class=\"ui-calendar__tool next\" data-tool=\"next\" data-disabled.bind=\"config.nextDisabled\" ui-tooltip.bind=\"config.nextTooltip\"><ui-svg-icon icon=\"page-next\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__tool last\" data-tool=\"last\" if.bind=\"showFirstLast\" data-disabled.bind=\"config.lastDisabled\" ui-tooltip.bind=\"config.lastTooltip\"><ui-svg-icon icon=\"page-last\"></ui-svg-icon></a>\n</template>\n";

  var CalendarHead = (function () {
      function CalendarHead() {
          this.showFirstLast = false;
          this.config = {};
      }
      CalendarHead.TITLE = "title";
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Boolean)
      ], CalendarHead.prototype, "showFirstLast", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Object)
      ], CalendarHead.prototype, "config", void 0);
      CalendarHead = __chunk_1.__decorate([
          aureliaFramework.customElement("calendar-head"),
          aureliaFramework.inlineView(view)
      ], CalendarHead);
      return CalendarHead;
  }());

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
  var parseDate = function (date) {
      if (isString(date)) {
          if (date.startsWith(CALENDAR_GRAIN.DAY)) {
              return dateFns.addDays(new Date(), parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
          }
          else if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
              return dateFns.addWeeks(new Date(), parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10));
          }
          else if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
              return dateFns.addMonths(new Date(), parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10));
          }
          else if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
              return dateFns.addYears(new Date(), parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10));
          }
          else {
              return dateFns.parseISO(date);
          }
      }
      else if (date) {
          return date;
      }
      return null;
  };
  var parseRange = function (date) {
      if (isString(date)) {
          var before = date.includes("-");
          if (date.startsWith(CALENDAR_GRAIN.DAY)) {
              var today = dateFns.startOfDay(new Date());
              var diff = dateFns.addDays(new Date(), parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
              return before ? [diff, today] : [today, diff];
          }
          if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
              var start = dateFns.startOfWeek(new Date());
              var end = dateFns.endOfWeek(new Date());
              var diff = parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10);
              return [dateFns.addWeeks(start, diff), dateFns.addWeeks(end, diff)];
          }
          if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
              var start = dateFns.startOfMonth(new Date());
              var end = dateFns.endOfMonth(new Date());
              var diff = parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10);
              return [dateFns.addMonths(start, diff), dateFns.addMonths(end, diff)];
          }
          if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
              var start = dateFns.startOfYear(new Date());
              var end = dateFns.endOfYear(new Date());
              var diff = parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10);
              return [dateFns.addYears(start, diff), dateFns.addYears(end, diff)];
          }
      }
      else if (isArray(date)) {
          return [dateFns.parseISO(date[0]), dateFns.parseISO(date[1])];
      }
      return null;
  };
  var getTitle = function (month, view) {
      if (view === CALENDAR_VIEWS.DAYS) {
          return dateFns.format(month, "MMMM yyyy");
      }
      if (view === CALENDAR_VIEWS.MONTHS) {
          return dateFns.format(month, "yyyy");
      }
      if (view === CALENDAR_VIEWS.YEARS) {
          return dateFns.format(dateFns.startOfDecade(month), "yyyy") + "-" + dateFns.format(dateFns.endOfDecade(month), "yyyy");
      }
      return "-";
  };
  var changeMonth = function (month, view, grain) {
      if (view === CALENDAR_VIEWS.DAYS) {
          switch (grain) {
              case CALENDAR_NAVIGATION.FIRST:
                  return dateFns.addMonths(month, -12);
              case CALENDAR_NAVIGATION.LAST:
                  return dateFns.addMonths(month, 12);
              case CALENDAR_NAVIGATION.PREV:
                  return dateFns.addMonths(month, -1);
              case CALENDAR_NAVIGATION.NEXT:
                  return dateFns.addMonths(month, 1);
          }
      }
      if (view === CALENDAR_VIEWS.MONTHS) {
          switch (grain) {
              case CALENDAR_NAVIGATION.PREV:
                  return dateFns.addYears(month, -1);
              case CALENDAR_NAVIGATION.NEXT:
                  return dateFns.addYears(month, 1);
          }
      }
      if (view === CALENDAR_VIEWS.YEARS) {
          switch (grain) {
              case CALENDAR_NAVIGATION.PREV:
                  return dateFns.addYears(month, -10);
              case CALENDAR_NAVIGATION.NEXT:
                  return dateFns.addYears(month, 10);
          }
      }
      return month;
  };
  var buildHeaderConfig = function (month, view, config) {
      if (view === CALENDAR_VIEWS.DAYS) {
          return {
              firstDisabled: isBeforeMin(month, config.minDate, -12),
              lastDisabled: isAfterMax(month, config.maxDate, 12),
              prevDisabled: isBeforeMin(month, config.minDate, -1),
              nextDisabled: isAfterMax(month, config.maxDate, 1),
              firstTooltip: dateFns.format(dateFns.addMonths(month, -12), "MMM yyyy"),
              lastTooltip: dateFns.format(dateFns.addMonths(month, 12), "MMM yyyy"),
              prevTooltip: dateFns.format(dateFns.addMonths(month, -1), "MMM yyyy"),
              nextTooltip: dateFns.format(dateFns.addMonths(month, 1), "MMM yyyy")
          };
      }
      if (view === CALENDAR_VIEWS.MONTHS) {
          return {
              prevDisabled: isBeforeMin(month, config.minDate, -12),
              nextDisabled: isAfterMax(month, config.maxDate, 12),
              prevTooltip: dateFns.format(dateFns.addYears(month, -1), "yyyy"),
              nextTooltip: dateFns.format(dateFns.addYears(month, 1), "yyyy")
          };
      }
      if (view === CALENDAR_VIEWS.YEARS) {
          var start = dateFns.startOfDecade(month);
          var end = dateFns.endOfDecade(month);
          return {
              prevDisabled: isBeforeMin(month, config.minDate, -120),
              nextDisabled: isAfterMax(month, config.maxDate, 120),
              prevTooltip: dateFns.format(dateFns.addYears(start, -10), "yyyy") + "-" + dateFns.format(dateFns.addYears(start, -1), "yyyy"),
              nextTooltip: dateFns.format(dateFns.addYears(end, 1), "yyyy") + "-" + dateFns.format(dateFns.addYears(end, 10), "yyyy")
          };
      }
  };
  var isBeforeMin = function (month, minDate, n) {
      if (n === void 0) { n = 0; }
      return dateFns.isValid(minDate) ? dateFns.isBefore(dateFns.addMonths(dateFns.startOfDay(month), n), dateFns.startOfDay(minDate)) : false;
  };
  var isAfterMax = function (month, maxDate, n) {
      if (n === void 0) { n = 0; }
      return dateFns.isValid(maxDate) ? dateFns.isAfter(dateFns.addMonths(dateFns.startOfDay(month), n), dateFns.startOfDay(maxDate)) : false;
  };
  var isDisabled = function (config, date) {
      var min = config.minDate;
      var max = config.maxDate;
      if (config.page === CALENDAR_VIEWS.MONTHS) {
          min = dateFns.startOfMonth(dateFns.startOfDay(min));
          max = dateFns.endOfMonth(dateFns.startOfDay(max));
      }
      if (config.page === CALENDAR_VIEWS.YEARS) {
          min = dateFns.startOfYear(dateFns.startOfDay(min));
          max = dateFns.startOfYear(dateFns.startOfDay(max));
      }
      if (dateFns.isBefore(date, min)) {
          return true;
      }
      if (dateFns.isAfter(date, max)) {
          return true;
      }
      if (config.page === CALENDAR_VIEWS.DAYS && config.disabled) {
          var disabled = config.disabled;
          if (isArray(disabled)) {
              return disabled.includes(dateFns.startOfDay(date).toISOString());
          }
          else if (isFunction(disabled)) {
              return disabled({ date: date });
          }
      }
      return false;
  };

  var view$1 = "<template data-page=\"days\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <span class=\"ui-calendar__page__head\">#</span>\n      <span class=\"ui-calendar__page__head\" repeat.for=\"w of 7\">${weekTitle(w)}</span>\n    </div>\n    <div class=\"ui-calendar__page__row\" repeat.for=\"w of 6\">\n      <span class=\"ui-calendar__page__cell week\">${weekNumber(w, month)}</span>\n      <a repeat.for=\"d of 7\" with.bind=\"getDate(w, d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell date ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

  var DaysPage = (function () {
      function DaysPage() {
          this.isAttached = false;
      }
      DaysPage.prototype.attached = function () {
          this.isAttached = true;
      };
      DaysPage.prototype.monthChanged = function (newMonth) {
          this.month = newMonth || new Date();
          var start = dateFns.startOfMonth(this.month);
          this.pageStart = dateFns.startOfWeek(dateFns.startOfMonth(this.month));
          if (dateFns.getDay(start) < 3) {
              this.pageStart = dateFns.addWeeks(this.pageStart, -1);
          }
      };
      DaysPage.prototype.weekTitle = function (week) {
          return dateFns.format(dateFns.setDay(new Date(), week), "E").substr(0, 2);
      };
      DaysPage.prototype.weekNumber = function (week) {
          return dateFns.format(dateFns.addWeeks(this.pageStart, week), "ww");
      };
      DaysPage.prototype.getDate = function (week, day) {
          var date = dateFns.addDays(dateFns.addWeeks(this.pageStart, week), day);
          var classes = [];
          if (!dateFns.isSameMonth(this.month, date)) {
              classes.push("date-other");
          }
          if (dateFns.isSameDay(new Date(), date)) {
              classes.push("date-today");
          }
          if (this.config) {
              if (isArray(this.config.date)) {
                  if (dateFns.isAfter(dateFns.startOfDay(date), this.config.date[0]) &&
                      dateFns.isBefore(dateFns.endOfDay(date), this.config.date[1])) {
                      classes.push("select-hilight");
                  }
                  if (dateFns.isSameDay(date, this.config.date[0])) {
                      classes.push("select-start");
                  }
                  if (dateFns.isSameDay(date, this.config.date[1])) {
                      classes.push("select-end");
                  }
              }
              if (isDate(this.config.date) && dateFns.isSameDay(date, this.config.date)) {
                  classes.push("selected");
              }
              if (isDisabled(this.config, date)) {
                  classes.push("disabled");
              }
          }
          return { date: date, label: dateFns.format(date, "dd"), classes: classes.join(" ") };
      };
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Date)
      ], DaysPage.prototype, "month", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Object)
      ], DaysPage.prototype, "config", void 0);
      DaysPage = __chunk_1.__decorate([
          aureliaFramework.customElement("days-page"),
          aureliaFramework.inlineView(view$1)
      ], DaysPage);
      return DaysPage;
  }());

  var view$2 = "<template data-page=\"months\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <a repeat.for=\"d of 12\" with.bind=\"getMonth(d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell month ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

  var MonthsPage = (function () {
      function MonthsPage() {
          this.isAttached = false;
      }
      MonthsPage.prototype.attached = function () {
          this.isAttached = true;
      };
      MonthsPage.prototype.getMonth = function (month) {
          var date = dateFns.setMonth(this.month, month);
          var classes = [];
          if (this.config) {
              if (isDate(this.config.date) && dateFns.isSameMonth(date, this.config.date)) {
                  classes.push("selected");
              }
              if (isDisabled(__chunk_1.__assign({ disabled: [] }, this.config), date)) {
                  classes.push("disabled");
              }
          }
          return { date: date, label: dateFns.format(date, "MMM"), classes: classes.join(" ") };
      };
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Date)
      ], MonthsPage.prototype, "month", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Object)
      ], MonthsPage.prototype, "config", void 0);
      MonthsPage = __chunk_1.__decorate([
          aureliaFramework.customElement("months-page"),
          aureliaFramework.inlineView(view$2)
      ], MonthsPage);
      return MonthsPage;
  }());

  var view$3 = "<template data-page=\"time\" class=\"ui-calendar__clock\">\n  <ui-slider min=\"1\" max=\"12\" value.to-view=\"hour\" change.trigger=\"hour = $event.target.value & debounce\"></ui-slider>\n  <ui-slider min=\"0\" max=\"59\" value.to-view=\"minute\" change.trigger=\"minute = $event.target.value & debounce\"></ui-slider>\n\n  <div class=\"ui-calendar__clock__ampm\" data-value.bind=\"ampm\" click.trigger=\"switchAmpm()\">\n    <div></div>\n  </div>\n</template>\n";

  var TimePage = (function () {
      function TimePage(element) {
          this.element = element;
          this.time = new Date();
      }
      Object.defineProperty(TimePage.prototype, "hour", {
          get: function () {
              var hr = dateFns.getHours(this.time);
              return "" + (hr === 0 || hr === 12 ? 12 : hr > 12 ? hr - 12 : hr);
          },
          set: function (hour) {
              var newHr = parseInt(hour === "12" ? "0" : hour, 10);
              var hr = dateFns.getHours(this.time);
              this.time = dateFns.setHours(this.time, hr < 12 ? newHr : newHr + 12);
              this.fireChange();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(TimePage.prototype, "minute", {
          get: function () {
              return dateFns.getMinutes(this.time);
          },
          set: function (min) {
              this.time = dateFns.setMinutes(this.time, min);
              this.fireChange();
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(TimePage.prototype, "ampm", {
          get: function () {
              return dateFns.getHours(this.time) < 12 ? "am" : "pm";
          },
          enumerable: true,
          configurable: true
      });
      TimePage.prototype.switchAmpm = function () {
          var hr = dateFns.getHours(this.time);
          this.time = dateFns.setHours(this.time, hr < 12 ? hr + 12 : hr - 12);
          this.fireChange();
      };
      TimePage.prototype.fireChange = function () {
          this.element.dispatchEvent(__chunk_3.UIInternal.createEvent("change", this.time));
      };
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Date)
      ], TimePage.prototype, "time", void 0);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("time"),
          __chunk_1.__metadata("design:type", String),
          __chunk_1.__metadata("design:paramtypes", [String])
      ], TimePage.prototype, "hour", null);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("time"),
          __chunk_1.__metadata("design:type", Number),
          __chunk_1.__metadata("design:paramtypes", [Number])
      ], TimePage.prototype, "minute", null);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("time"),
          __chunk_1.__metadata("design:type", Object),
          __chunk_1.__metadata("design:paramtypes", [])
      ], TimePage.prototype, "ampm", null);
      TimePage = __chunk_1.__decorate([
          aureliaFramework.customElement("time-page"),
          aureliaFramework.inlineView(view$3),
          __chunk_1.__metadata("design:paramtypes", [Element])
      ], TimePage);
      return TimePage;
  }());

  var view$4 = "<template class=\"ui-calendar\">\n  <calendar-head click.delegate=\"headerClicked($event)\" config.bind=\"headerOptions\" show-first-last.bind=\"currentPage === VIEWS.DAYS\">${title}\n  </calendar-head>\n  <days-page if.bind=\"currentPage === VIEWS.DAYS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectDate($event)\"></days-page>\n  <months-page if.bind=\"currentPage === VIEWS.MONTHS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectMonth($event)\"></months-page>\n  <years-page if.bind=\"currentPage === VIEWS.YEARS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectMonth($event)\"></years-page>\n  <time-page time.bind=\"time\" change.trigger=\"timeChanged($event.detail)\"></time-page>\n  <div class=\"ui-calendar__footer\">\n    <div class=\"ui-calendar__tags\">\n      <a class=\"ui-calendar__tag\" repeat.for=\"preset of datePresets\" data-active.bind=\"preset.preset == date\" click.trigger=\"selectPreset(preset.preset)\">${preset.label}</a>\n    </div>\n    <a if.bind=\"selecting || currentPage !== VIEWS.DAYS\" class=\"ui-calendar__tag cancel\" click.trigger=\"cancelSelection()\">Cancel</a>\n  </div>\n</template>\n";

  var view$5 = "<template data-page=\"years\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <a repeat.for=\"d of 12\" with.bind=\"getYear(d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell year ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

  var YearsPage = (function () {
      function YearsPage() {
          this.isAttached = false;
      }
      YearsPage.prototype.attached = function () {
          this.isAttached = true;
      };
      YearsPage.prototype.monthChanged = function (newMonth) {
          this.month = newMonth || new Date();
          this.pageStart = dateFns.addYears(dateFns.startOfDecade(this.month), -1);
      };
      YearsPage.prototype.getYear = function (year) {
          var date = dateFns.addYears(this.pageStart, year);
          var classes = [];
          if (year === 0 || year === 11) {
              classes.push("date-other");
          }
          if (this.config) {
              if (isDate(this.config.date) && dateFns.isSameYear(date, this.config.date)) {
                  classes.push("selected");
              }
              if (isDisabled(__chunk_1.__assign({ disabled: [] }, this.config), date)) {
                  classes.push("disabled");
              }
          }
          return { date: date, label: dateFns.format(date, "yyyy"), classes: classes.join(" ") };
      };
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Date)
      ], YearsPage.prototype, "month", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Object)
      ], YearsPage.prototype, "config", void 0);
      YearsPage = __chunk_1.__decorate([
          aureliaFramework.customElement("years-page"),
          aureliaFramework.inlineView(view$5)
      ], YearsPage);
      return YearsPage;
  }());

  var UIDatePicker = (function () {
      function UIDatePicker() {
          this.format = "dd MMM yyyy HH:mm";
          this.datePresets = [];
          this.currentPage = CALENDAR_VIEWS.DAYS;
          this.month = dateFns.startOfMonth(new Date());
          this.time = dateFns.parseISO("2018-01-01T00:00:00.000");
          this.VIEWS = CALENDAR_VIEWS;
      }
      UIDatePicker.prototype.bind = function () {
          this.dateChanged();
      };
      UIDatePicker.prototype.dateChanged = function () {
          var _this = this;
          this.selectedDate = parseDate(this.date);
          if (dateFns.isValid(this.selectedDate)) {
              this.time = new Date(this.selectedDate);
              this.month = dateFns.startOfMonth(this.selectedDate);
              var preset = this.datePresets.find(function (p) { return p.preset === _this.date; });
              this.dateLabel = preset ? preset.label : __chunk_4.UIFormat.datetime(this.selectedDate, this.format);
          }
      };
      Object.defineProperty(UIDatePicker.prototype, "config", {
          get: function () {
              return {
                  date: this.selectedDate,
                  page: this.currentPage,
                  minDate: parseDate(this.minDate),
                  maxDate: parseDate(this.maxDate),
                  disabled: this.disabledDatesList
              };
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(UIDatePicker.prototype, "title", {
          get: function () {
              return getTitle(this.month, this.currentPage);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(UIDatePicker.prototype, "headerOptions", {
          get: function () {
              return buildHeaderConfig(this.month, this.currentPage, this.config);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(UIDatePicker.prototype, "disabledDatesList", {
          get: function () {
              if (isArray(this.disabledDates)) {
                  return this.disabledDates.map(function (d) {
                      var dt = parseDate(d);
                      return !isEmpty(dt) ? dateFns.startOfDay(dt).toISOString() : null;
                  });
              }
              return this.disabledDates;
          },
          enumerable: true,
          configurable: true
      });
      UIDatePicker.prototype.headerClicked = function ($event) {
          var target = $event.target;
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
      };
      UIDatePicker.prototype.selectDate = function ($event) {
          var target = $event.target;
          if (target.dataset.date) {
              this.updateDate(dateFns.startOfDay(new Date(target.dataset.date)));
          }
      };
      UIDatePicker.prototype.timeChanged = function (newTime) {
          this.updateDate(this.date ? dateFns.parseISO(this.date) : new Date(), newTime);
      };
      UIDatePicker.prototype.selectMonth = function ($event) {
          var target = $event.target;
          if (target.dataset.date) {
              this.month = new Date(target.dataset.date);
              this.currentPage--;
          }
      };
      UIDatePicker.prototype.cancelSelection = function () {
          this.currentPage = CALENDAR_VIEWS.DAYS;
      };
      UIDatePicker.prototype.selectPreset = function (preset) {
          this.cancelSelection();
          this.date = preset;
      };
      UIDatePicker.prototype.updateDate = function (dt, tm) {
          if (tm === void 0) { tm = this.time; }
          dt.setHours(tm.getHours());
          dt.setMinutes(tm.getMinutes());
          this.date = dt.toISOString();
      };
      __chunk_1.__decorate([
          aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
          __chunk_1.__metadata("design:type", String)
      ], UIDatePicker.prototype, "date", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIDatePicker.prototype, "minDate", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIDatePicker.prototype, "maxDate", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Object)
      ], UIDatePicker.prototype, "disabledDates", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIDatePicker.prototype, "format", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Array)
      ], UIDatePicker.prototype, "datePresets", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.fromView }),
          __chunk_1.__metadata("design:type", String)
      ], UIDatePicker.prototype, "dateLabel", void 0);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("selectedDate", "currentPage", "minDate", "maxDate", "disabledDates"),
          __chunk_1.__metadata("design:type", Object),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIDatePicker.prototype, "config", null);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("month", "currentPage"),
          __chunk_1.__metadata("design:type", String),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIDatePicker.prototype, "title", null);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("month", "currentPage", "minDate", "maxDate"),
          __chunk_1.__metadata("design:type", Object),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIDatePicker.prototype, "headerOptions", null);
      UIDatePicker = __chunk_1.__decorate([
          aureliaFramework.customElement("ui-date-picker"),
          aureliaFramework.inlineView(view$4),
          aureliaFramework.viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
      ], UIDatePicker);
      return UIDatePicker;
  }());

  var view$6 = "<template class=\"ui-calendar\">\n  <div class=\"ui-calendar__range\">\n    <div>\n      <calendar-head click.delegate=\"startHeaderClicked($event)\" config.bind=\"startHeaderOptions\" show-first-last.bind=\"startPage === VIEWS.DAYS\">${startTitle}\n      </calendar-head>\n      <days-page if.bind=\"startPage === VIEWS.DAYS\" month.bind=\"startMonth\" config.to-view=\"config\" mouseover.delegate=\"hilightDate($event)\" click.delegate=\"selectDate($event)\"></days-page>\n      <months-page if.bind=\"startPage === VIEWS.MONTHS\" month.bind=\"startMonth\" config.to-view=\"config\" click.delegate=\"selectStartMonth($event)\"></months-page>\n      <years-page if.bind=\"startPage === VIEWS.YEARS\" month.bind=\"startMonth\" config.to-view=\"config\" click.delegate=\"selectStartMonth($event)\"></years-page>\n    </div>\n    <ui-divider></ui-divider>\n    <div>\n      <calendar-head click.delegate=\"endHeaderClicked($event)\" config.bind=\"endHeaderOptions\" show-first-last.bind=\"endPage === VIEWS.DAYS\">${endTitle}\n      </calendar-head>\n      <days-page if.bind=\"endPage === VIEWS.DAYS\" month.bind=\"endMonth\" config.to-view=\"config\" mouseover.delegate=\"hilightDate($event)\" click.delegate=\"selectDate($event)\"></days-page>\n      <months-page if.bind=\"endPage === VIEWS.MONTHS\" month.bind=\"endMonth\" config.to-view=\"config\" click.delegate=\"selectEndMonth($event)\"></months-page>\n      <years-page if.bind=\"endPage === VIEWS.YEARS\" month.bind=\"endMonth\" config.to-view=\"config\" click.delegate=\"selectEndMonth($event)\"></years-page>\n    </div>\n  </div>\n  <div class=\"ui-calendar__footer\">\n    <div class=\"ui-calendar__tags\">\n      <a class=\"ui-calendar__tag\" repeat.for=\"preset of datePresets\" data-active.bind=\"preset.preset == date\" click.trigger=\"selectPreset(preset.preset)\">${preset.label}</a>\n    </div>\n    <a if.bind=\"selecting || startPage !== VIEWS.DAYS || endPage !== VIEWS.DAYS\" class=\"ui-calendar__tag cancel\" click.trigger=\"cancelSelection()\">Cancel</a>\n  </div>\n</template>\n";

  var UIRangePicker = (function () {
      function UIRangePicker() {
          this.format = "dd MMM yyyy";
          this.datePresets = [];
          this.startMonth = dateFns.startOfMonth(new Date());
          this.endMonth = dateFns.startOfMonth(dateFns.addMonths(new Date(), 1));
          this.startPage = CALENDAR_VIEWS.DAYS;
          this.endPage = CALENDAR_VIEWS.DAYS;
          this.VIEWS = CALENDAR_VIEWS;
      }
      UIRangePicker.prototype.bind = function () {
          this.dateChanged();
      };
      UIRangePicker.prototype.dateChanged = function () {
          var _this = this;
          this.selectedDate = parseRange(this.date);
          if (this.selectedDate) {
              this.startMonth = dateFns.startOfMonth(this.selectedDate[0]);
              this.endMonth = dateFns.startOfMonth(this.selectedDate[1]);
              var preset = this.datePresets.find(function (p) { return p.preset === _this.date; });
              this.dateLabel = preset
                  ? preset.label
                  : __chunk_4.UIFormat.date(this.selectedDate[0], this.format) + " ~ " + __chunk_4.UIFormat.date(this.selectedDate[1], this.format);
          }
      };
      Object.defineProperty(UIRangePicker.prototype, "config", {
          get: function () {
              return {
                  date: this.selecting ? [this.selecting, this.hilight] : this.selectedDate,
                  minDate: parseDate(this.minDate),
                  maxDate: parseDate(this.maxDate),
                  disabled: []
              };
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(UIRangePicker.prototype, "startTitle", {
          get: function () {
              return getTitle(this.startMonth, this.startPage);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(UIRangePicker.prototype, "endTitle", {
          get: function () {
              return getTitle(this.endMonth, this.endPage);
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(UIRangePicker.prototype, "startHeaderOptions", {
          get: function () {
              return buildHeaderConfig(this.startMonth, this.startPage, __chunk_1.__assign({}, this.config, { page: this.startPage }));
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(UIRangePicker.prototype, "endHeaderOptions", {
          get: function () {
              return buildHeaderConfig(this.endMonth, this.endPage, __chunk_1.__assign({}, this.config, { page: this.endPage }));
          },
          enumerable: true,
          configurable: true
      });
      UIRangePicker.prototype.startHeaderClicked = function ($event) {
          var target = $event.target;
          if (target.dataset.tool) {
              if (target.dataset.tool === CalendarHead.TITLE) {
                  if (this.startPage !== CALENDAR_VIEWS.YEARS) {
                      this.startPage++;
                  }
              }
              else {
                  this.startMonth = changeMonth(this.startMonth, this.startPage, target.dataset.tool);
                  if (dateFns.isSameMonth(this.startMonth, this.endMonth) ||
                      dateFns.isAfter(this.startMonth, this.endMonth)) {
                      this.endMonth = dateFns.addMonths(this.startMonth, 1);
                  }
              }
          }
      };
      UIRangePicker.prototype.endHeaderClicked = function ($event) {
          var target = $event.target;
          if (target.dataset.tool) {
              if (target.dataset.tool === CalendarHead.TITLE) {
                  if (this.endPage !== CALENDAR_VIEWS.YEARS) {
                      this.endPage++;
                  }
              }
              else {
                  this.endMonth = changeMonth(this.endMonth, this.endPage, target.dataset.tool);
                  if (dateFns.isSameMonth(this.startMonth, this.endMonth) ||
                      dateFns.isBefore(this.endMonth, this.startMonth)) {
                      this.startMonth = dateFns.addMonths(this.endMonth, -1);
                  }
              }
          }
      };
      UIRangePicker.prototype.selectDate = function ($event) {
          var target = $event.target;
          if (target.dataset.date) {
              var date = new Date(target.dataset.date);
              if (this.selecting) {
                  this.date = dateFns.isBefore(date, this.selecting)
                      ? [dateFns.startOfDay(date).toISOString(), dateFns.endOfDay(this.selecting).toISOString()]
                      : [dateFns.startOfDay(this.selecting).toISOString(), dateFns.endOfDay(date).toISOString()];
                  this.selecting = null;
              }
              else {
                  this.selecting = date;
              }
          }
      };
      UIRangePicker.prototype.selectStartMonth = function ($event) {
          var target = $event.target;
          if (target.dataset.date) {
              this.startMonth = new Date(target.dataset.date);
              this.startPage--;
              if (dateFns.isSameMonth(this.startMonth, this.endMonth) || dateFns.isAfter(this.startMonth, this.endMonth)) {
                  this.endMonth = dateFns.addMonths(this.startMonth, 1);
              }
          }
      };
      UIRangePicker.prototype.selectEndMonth = function ($event) {
          var target = $event.target;
          if (target.dataset.date) {
              this.endMonth = new Date(target.dataset.date);
              this.endPage--;
              if (dateFns.isSameMonth(this.startMonth, this.endMonth) || dateFns.isBefore(this.endMonth, this.startMonth)) {
                  this.startMonth = dateFns.addMonths(this.endMonth, -1);
              }
          }
      };
      UIRangePicker.prototype.cancelSelection = function () {
          this.selecting = null;
          this.startPage = CALENDAR_VIEWS.DAYS;
          this.endPage = CALENDAR_VIEWS.DAYS;
      };
      UIRangePicker.prototype.hilightDate = function ($event) {
          var target = $event.target;
          if (target.dataset.date) {
              this.hilight = new Date(target.dataset.date);
          }
      };
      UIRangePicker.prototype.selectPreset = function (preset) {
          this.cancelSelection();
          this.date = preset;
      };
      __chunk_1.__decorate([
          aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
          __chunk_1.__metadata("design:type", Object)
      ], UIRangePicker.prototype, "date", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIRangePicker.prototype, "minDate", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIRangePicker.prototype, "maxDate", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", String)
      ], UIRangePicker.prototype, "format", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable(),
          __chunk_1.__metadata("design:type", Array)
      ], UIRangePicker.prototype, "datePresets", void 0);
      __chunk_1.__decorate([
          aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.fromView }),
          __chunk_1.__metadata("design:type", String)
      ], UIRangePicker.prototype, "dateLabel", void 0);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("selectedDate", "hilight", "selecting", "minDate", "maxDate", "disabledDates"),
          __chunk_1.__metadata("design:type", Object),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIRangePicker.prototype, "config", null);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("startMonth", "startPage"),
          __chunk_1.__metadata("design:type", String),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIRangePicker.prototype, "startTitle", null);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("endMonth", "endPage"),
          __chunk_1.__metadata("design:type", String),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIRangePicker.prototype, "endTitle", null);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("startMonth", "startPage", "minDate", "maxDate"),
          __chunk_1.__metadata("design:type", Object),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIRangePicker.prototype, "startHeaderOptions", null);
      __chunk_1.__decorate([
          aureliaFramework.computedFrom("endMonth", "endPage", "minDate", "maxDate"),
          __chunk_1.__metadata("design:type", Object),
          __chunk_1.__metadata("design:paramtypes", [])
      ], UIRangePicker.prototype, "endHeaderOptions", null);
      UIRangePicker = __chunk_1.__decorate([
          aureliaFramework.customElement("ui-range-picker"),
          aureliaFramework.inlineView(view$6),
          aureliaFramework.viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
      ], UIRangePicker);
      return UIRangePicker;
  }());

  var Calendar = [UIDatePicker, UIRangePicker];

  exports.Calendar = Calendar;

});
//# sourceMappingURL=ui-calendar.js.map
