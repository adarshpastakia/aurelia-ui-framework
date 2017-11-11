var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./ui-input", "../../utils/ui-event", "../../utils/ui-utils", "moment"], function (require, exports, aurelia_framework_1, ui_input_1, ui_event_1, ui_utils_1, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDateView = (function () {
        function UIDateView(element) {
            var _this = this;
            this.element = element;
            this.date = '';
            this.type = 'd';
            this.title = "";
            this.datePage = 0;
            this.timePage = 0;
            this.hour = 0;
            this.minute = 0;
            this.dates = [];
            this.months = [];
            this.weekdays = [];
            this.disablePrev = false;
            this.disableNext = false;
            this.disableHrUp = false;
            this.disableHrDn = false;
            this.disableMnUp = false;
            this.disableMnDn = false;
            if (element.hasAttribute('time'))
                this.type = 't';
            if (element.hasAttribute('datetime'))
                this.type = 'dt';
            this.obLocale = ui_event_1.UIEvent.subscribe('i18n:locale:changed', function (payload) { return _this.buildDatePage(payload.newValue); });
        }
        UIDateView.prototype.bind = function (bindingContext, overrideContext) {
            if (this.date && moment(this.date).isValid())
                this.date = moment(this.date).toISOString();
            if (this.date && moment(this.date).isValid())
                this.current = moment(this.date);
            else if (this.minDate && moment(this.minDate).isValid() && moment().isBefore(this.minDate))
                this.current = moment(this.minDate);
            else if (this.maxDate && moment(this.maxDate).isValid() && moment().isAfter(this.maxDate))
                this.current = moment(this.maxDate);
            else
                this.current = moment();
        };
        UIDateView.prototype.attached = function () {
            this.buildDatePage();
        };
        UIDateView.prototype.detached = function () {
            this.obLocale.dispose();
        };
        UIDateView.prototype.dateChanged = function (newValue) {
            if (newValue && moment(newValue).isValid()) {
                var time = moment(newValue).second(0).millisecond(0);
                this.hour = time.hour();
                this.minute = time.minute();
                this.refresh();
            }
        };
        UIDateView.prototype.minDateChanged = function (newValue) {
            if (this.date && moment(this.date).isBefore(this.minDate, 'date'))
                this.date = newValue;
            this.buildDatePage();
        };
        UIDateView.prototype.maxDateChanged = function (newValue) {
            if (this.date && moment(this.date).isAfter(this.maxDate, 'date'))
                this.date = newValue;
            this.buildDatePage();
        };
        UIDateView.prototype.refresh = function () {
            if (this.minDate && moment(this.date).isBefore(this.minDate, 'date'))
                this.date = this.minDate;
            if (this.maxDate && moment(this.date).isAfter(this.maxDate, 'date'))
                this.date = this.maxDate;
            this.current = moment(this.date);
            this.buildDatePage();
        };
        UIDateView.prototype.dateClass = function (dt) {
            var c = '';
            if (!dt.isSame(this.current, 'month'))
                c += ' muted ';
            if (dt.isSame(moment(), 'day'))
                c += ' today';
            if (this.date && dt.isSame(this.date, 'day'))
                c += ' selected';
            if (this.minDate && dt.isBefore(this.minDate, 'day'))
                c += ' disabled';
            if (this.maxDate && dt.isAfter(this.maxDate, 'day'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.monthClass = function (mn) {
            var c = '', m = moment(this.current.toISOString()).month(mn);
            if (this.date && m.isSame(this.date, 'month'))
                c += ' selected';
            if (this.minDate && m.isBefore(this.minDate, 'month'))
                c += ' disabled';
            if (this.maxDate && m.isAfter(this.maxDate, 'month'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.yearClass = function (yr) {
            var c = '', y = moment(this.current.toISOString()).year(yr);
            if (this.date && y.isSame(this.date, 'year'))
                c += ' selected';
            if (this.minDate && y.isBefore(this.minDate, 'year'))
                c += ' disabled';
            if (this.maxDate && y.isAfter(this.maxDate, 'year'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.hourClass = function (hr) {
            var c = '', y = moment(this.current.toISOString()).hour(hr);
            if (this.date && y.isSame(this.date, 'hour'))
                c += ' selected';
            if (this.minDate && y.isBefore(this.minDate, 'hour'))
                c += ' disabled';
            if (this.maxDate && y.isAfter(this.maxDate, 'hour'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.minuteClass = function (mn) {
            var c = '', y = moment(this.current.toISOString()).minute(mn);
            if (this.date && y.isSame(this.date, 'minute'))
                c += ' selected';
            if (this.minDate && y.isBefore(this.minDate, 'minute'))
                c += ' disabled';
            if (this.maxDate && y.isAfter(this.maxDate, 'minute'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.buildDatePage = function (newLocale) {
            if (!this.current.isValid || !this.current.isValid())
                return;
            if (newLocale)
                moment.locale(newLocale);
            if (this.datePage == 0) {
                this.weekdays = moment.weekdaysMin();
                this.title = moment(this.current.toISOString()).format('MMMM YYYY');
                var start = moment(this.current).startOf('month');
                var end = moment(this.current).endOf('month');
                if (start.day() < 3)
                    start.add(-7, 'day');
                start.add(start.day() * -1, 'day');
                end = end.add(6 - end.day(), 'day');
                this.dates = [];
                for (var w = 0; w < 6; w++) {
                    var wk = { wk: moment(start).add(w, 'week').week(), dt: [] };
                    for (var d = 0; d < 7; d++) {
                        wk.dt.push(moment(start).add(w, 'week').add(d, 'day'));
                    }
                    this.dates.push(wk);
                }
                if (this.minDate)
                    this.disablePrev = start.isBefore(this.minDate, 'month');
                if (this.maxDate)
                    this.disableNext = end.isAfter(this.maxDate, 'month');
            }
            if (this.datePage == 1) {
                this.months = moment.months();
                this.title = moment(this.current.toISOString()).format('YYYY');
                var start = moment(this.current).startOf('year');
                var end = moment(this.current).endOf('year');
                if (this.minDate)
                    this.disablePrev = start.isBefore(this.minDate, 'month');
                if (this.maxDate)
                    this.disableNext = end.isAfter(this.maxDate, 'month');
            }
            if (this.datePage == 2) {
                this.decade = (this.current.year() - (this.current.year() % 20)) + 1;
                this.title = this.decade + '-' + (this.decade + 20);
                this.disablePrev = (this.minDate && this.decade <= moment(this.minDate).year());
                this.disableNext = (this.maxDate && this.decade + 20 >= moment(this.maxDate).year());
            }
            if (this.type != 'd' && this.timePage == 0) {
                var time = moment(this.current).hour(this.hour).minute(this.minute).second(0).millisecond(0);
                if (this.minDate)
                    this.disableHrDn = time.isSameOrBefore(this.minDate, 'hour');
                if (this.maxDate)
                    this.disableHrUp = time.isSameOrAfter(this.maxDate, 'hour');
                if (this.minDate)
                    this.disableMnDn = time.isSameOrBefore(this.minDate, 'minute');
                if (this.maxDate)
                    this.disableMnUp = time.isSameOrAfter(this.maxDate, 'minute');
                if (this.minDate && time.isSameOrBefore(this.minDate, 'hour'))
                    this.hour = moment(this.minDate).hour();
                if (this.maxDate && time.isSameOrAfter(this.maxDate, 'hour'))
                    this.hour = moment(this.maxDate).hour();
                if (this.minDate && time.isSameOrBefore(this.minDate, 'minute'))
                    this.minute = moment(this.minDate).minute();
                if (this.maxDate && time.isSameOrAfter(this.maxDate, 'minute'))
                    this.minute = moment(this.maxDate).minute();
            }
        };
        UIDateView.prototype.clicked = function (evt) {
            var changed = false;
            if (evt.target.classList.contains('disabled'))
                return;
            if (evt.target.classList.contains('today')) {
                this.current = moment();
                changed = true;
            }
            else if (evt.target.classList.contains('date')) {
                this.current = moment(evt.target['date']);
                changed = true;
            }
            else if (evt.target.classList.contains('month')) {
                this.current.month(evt.target['month']);
                this.datePage = 0;
            }
            else if (evt.target.classList.contains('year')) {
                this.current.year(evt.target['year']);
                this.datePage = 1;
            }
            else if (evt.target.classList.contains('next')) {
                if (this.datePage == 0) {
                    this.current = moment(this.current).add(1, 'month');
                }
                else if (this.datePage == 1) {
                    this.current = moment(this.current).add(1, 'year');
                }
                else if (this.datePage == 2) {
                    this.current = moment(this.current).add(20, 'year');
                }
            }
            else if (evt.target.classList.contains('prev')) {
                if (this.datePage == 0) {
                    this.current = moment(this.current).add(-1, 'month');
                }
                else if (this.datePage == 1) {
                    this.current = moment(this.current).add(-1, 'year');
                }
                else if (this.datePage == 2) {
                    this.current = moment(this.current).add(-20, 'year');
                }
            }
            else if (evt.target.classList.contains('title')) {
                if (this.datePage != 2)
                    this.datePage++;
            }
            else if (evt.target.classList.contains('cancel')) {
                this.datePage = 0;
                this.timePage = 0;
            }
            else if (evt.target.classList.contains('hour-up')) {
                this.hour == 23 ? this.hour = 0 : this.hour++;
                changed = true;
            }
            else if (evt.target.classList.contains('hour-dn')) {
                this.hour == 0 ? this.hour = 23 : this.hour--;
                changed = true;
            }
            else if (evt.target.classList.contains('minute-up')) {
                this.minute == 59 ? this.minute = 0 : this.minute++;
                changed = true;
            }
            else if (evt.target.classList.contains('minute-dn')) {
                this.minute == 0 ? this.minute = 59 : this.minute--;
                changed = true;
            }
            else if (evt.target.classList.contains('hour')) {
                this.timePage = 1;
            }
            else if (evt.target.classList.contains('minute')) {
                this.timePage = 2;
            }
            else if (evt.target.classList.contains('hr')) {
                this.hour = evt.target['hour'];
                this.timePage = 0;
                changed = true;
            }
            else if (evt.target.classList.contains('mn')) {
                this.minute = evt.target['minute'];
                this.timePage = 0;
                changed = true;
            }
            else if (evt.target.classList.contains('tt')) {
                this.hour = this.hour + (this.hour > 11 ? -12 : 12);
                this.timePage = 0;
                changed = true;
            }
            this.buildDatePage();
            if (changed) {
                this.date = moment(this.current).hour(this.type == 'd' ? 0 : this.hour).minute(this.type == 'd' ? 0 : this.minute).second(0).millisecond(0).utc().toISOString();
                ui_event_1.UIEvent.fireEvent('change', this.element, moment(this.date));
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIDateView.prototype, "date", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateView.prototype, "minDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateView.prototype, "maxDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateView.prototype, "type", void 0);
        UIDateView = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-date-view\" click.trigger=\"clicked($event)\">\n  <div class=\"ui-dv-date-wrapper\" if.bind=\"type!='t'\">\n    <div class=\"ui-dv-header\">\n      <a class=\"prev ${disablePrev?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-left\"></ui-glyph></a>\n      <a class=\"title\">${title}<ui-glyph glyph=\"glyph-caret-up\" if.bind=\"datePage!=2\"></ui-glyph></a>\n      <a class=\"next ${disableNext?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-right\"></ui-glyph></a>\n    </div>\n    <div class=\"ui-dv-container\">\n      <div class=\"weekdays\" if.bind=\"datePage==0\">\n        <span class=\"week\">#</span>\n        <span repeat.for=\"d of weekdays\">${d}</span>\n      </div>\n      <div repeat.for=\"w of dates\" class=\"dates\" if.bind=\"datePage==0\">\n        <span class=\"week\">${w.wk}</span>\n        <span repeat.for=\"d of w.dt\" date.bind=\"d\" class=\"date hover ${dateClass(d, current, minDate, maxDate)}\">${d.date()}</span>\n      </div>\n      <div repeat.for=\"w of 4\" class=\"months\" if.bind=\"datePage==1\">\n        <span repeat.for=\"d of 3\" month.bind=\"(w*3)+d\" class=\"month hover ${monthClass((w*3)+d, current, minDate, maxDate)}\">${months[(w*3)+d]}</span>\n      </div>\n      <div repeat.for=\"w of 5\" class=\"years\" if.bind=\"datePage==2\">\n          <span repeat.for=\"d of 4\" year.bind=\"(w*4)+d+decade\" class=\"year hover ${yearClass((w*4)+d+decade, current, minDate, maxDate)}\">${(w*4)+d+decade}</span>\n      </div>\n    </div>\n    <div class=\"ui-dv-footer\">\n      <a class=\"today\" if.bind=\"datePage==0\">Today</a>\n      <a class=\"cancel\" if.bind=\"datePage!=0\">Cancel</a>\n    </div>\n  </div>\n  <div class=\"ui-dv-time-wrapper\" if.bind=\"type!='d'\">\n    <div class=\"time\" if.bind=\"timePage==0\">\n      <div><ui-glyph glyph=\"glyph-time\"></ui-glyph></div>\n      <div>\n        <a class=\"hour-up ${disableHrUp?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-up\"></ui-glyph></a>\n        <a class=\"hour\">${(hour>11?hour-12:hour)==0?'12':(hour>11?hour-12:hour) | number:'{00}'}</a>\n        <a class=\"hour-dn ${disableHrDn?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></a>\n      </div>\n      <div>:</div>\n      <div>\n        <a class=\"minute-up ${disableMnUp?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-up\"></ui-glyph></a>\n        <a class=\"minute\">${minute | number:'{00}'}</a>\n        <a class=\"minute-dn ${disableMnDn?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></a>\n      </div>\n      <div><a class=\"tt\">${hour>11?'PM':'AM'}</a></div>\n    </div>\n    <div class=\"numbers hours\" if.bind=\"timePage==1\" repeat.for=\"r of 2\">\n      <span repeat.for=\"h of 6\" hour.bind=\"((r*6)+(h+1)==12?0:(r*6)+(h+1))+(hour>11?12:0)\" class=\"hr hover}\"\">${(r*6)+h+1 | number:'{00}'}</span>\n    </div>\n    <div class=\"numbers minutes\" if.bind=\"timePage==2\" repeat.for=\"r of 2\">\n      <span repeat.for=\"m of 6\" minute.bind=\"(r*30)+(m*5)\" class=\"mn hover}\"\">${(r*30)+(m*5) | number:'{00}'}</span>\n    </div>\n    <div if.bind=\"timePage!=0\">\n      <a class=\"cancel\">Cancel</a>\n    </div>\n  </div>\n</template>"),
            aurelia_framework_1.customElement('ui-date-view'),
            __metadata("design:paramtypes", [Element])
        ], UIDateView);
        return UIDateView;
    }());
    exports.UIDateView = UIDateView;
    var UIDateInput = (function (_super) {
        __extends(UIDateInput, _super);
        function UIDateInput(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.date = '';
            _this.format = 'DD MMM YYYY';
            _this.width = 'auto';
            _this.errors = null;
            _this.disabled = false;
            _this.readonly = false;
            _this.info = '';
            _this.placeholder = '';
            _this.type = 'd';
            _this.elValue = '';
            _this.show = false;
            _this.clear = false;
            _this.ignore = false;
            _this.clear = element.hasAttribute('clear');
            if (element.hasAttribute('time')) {
                _this.type = 't';
                _this.format = 'hh:mm A';
            }
            if (element.hasAttribute('datetime')) {
                _this.type = 'dt';
                _this.format = 'DD MMM YYYY hh:mm A';
            }
            _this.obLocale = ui_event_1.UIEvent.subscribe('i18n:locale:changed', function (payload) { return _this.updateInputValue(payload.newValue); });
            return _this;
        }
        UIDateInput.prototype.bind = function (bindingContext, overrideContext) {
            _super.prototype.bind.apply(this, arguments);
            if (!isEmpty(this.date) && moment(this.date).isValid()) {
                this.date = moment(this.date).toISOString();
                this.elValue = moment(this.date).format(this.format);
            }
        };
        UIDateInput.prototype.attached = function () {
            var _this = this;
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown, { resize: false });
            this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                if (getParentByClass(evt.target, 'ui-date-view') == _this.dropdown)
                    return true;
                _this.closeDropdown();
            });
        };
        UIDateInput.prototype.detached = function () {
            this.tether.dispose();
            this.obLocale.dispose();
            this.obMouseup.dispose();
        };
        UIDateInput.prototype.dateChanged = function (newValue) {
            if (newValue && moment(newValue).isValid())
                this.elValue = moment(newValue).format(this.format);
            else
                this.elValue = '';
            this.inputEl.focus();
            if (this.type == 'd')
                this.closeDropdown();
            ui_event_1.UIEvent.fireEvent('change', this.element, newValue || null);
        };
        UIDateInput.prototype.updateInputValue = function (newLocale) {
            if (newLocale)
                moment.locale(newLocale);
            if (this.date && moment(this.date).isValid())
                this.elValue = moment(this.date).format(this.format);
            else
                this.elValue = '';
        };
        UIDateInput.prototype.openDropdown = function () {
            if (this.readonly || this.disabled)
                return true;
            this.dropdown.isOpen = true;
            this.dropdown.classList.remove('ui-hidden');
            this.dropdown.au.controller.viewModel.refresh();
            this.tether.position();
            this.inputEl.focus();
        };
        UIDateInput.prototype.closeDropdown = function () {
            this.dropdown.isOpen = false;
            this.dropdown.classList.add('ui-hidden');
            this.dropdown.au.controller.viewModel.datePage = 0;
        };
        UIDateInput.prototype.toggleDropdown = function (evt, forceClose) {
            if (forceClose === void 0) { forceClose = false; }
            evt.stopPropagation();
            evt.cancelBubble = true;
            this.show || this.dropdown.isOpen ? this.closeDropdown() : this.openDropdown();
            this.show = !this.show;
        };
        UIDateInput.prototype.fireEvent = function (evt) {
            evt.stopPropagation();
            var el = getParentByClass(this.element, 'ui-input-group');
            if (evt.type === 'focus') {
                this.inputEl.select();
                this.element.classList.add('ui-focus');
                if (el)
                    el.classList.add('ui-focus');
            }
            if (evt.type === 'blur') {
                this.element.classList.remove('ui-focus');
                if (el)
                    el.classList.remove('ui-focus');
            }
            ui_event_1.UIEvent.fireEvent(evt.type, this.element, this.date);
        };
        UIDateInput.prototype.keyDown = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            if (this.readonly || this.disabled)
                return true;
            var code = (evt.keyCode || evt.which);
            if (code == 13 && !this.dropdown.isOpen) {
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element, this);
            }
            if (code === 9) {
                this.closeDropdown();
                return true;
            }
            if (code === 38) {
                if (this.date && this.maxDate && moment(this.date).add(1, 'day').isAfter(this.maxDate, 'date'))
                    return;
                else if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(1, 'day').toISOString();
                else
                    this.date = moment().toISOString();
            }
            if (code === 40) {
                if (this.date && this.minDate && moment(this.date).add(-1, 'day').isBefore(this.minDate, 'date'))
                    return;
                else if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(-1, 'day').toISOString();
                else
                    this.date = moment().toISOString();
            }
            if (code === 37) {
                if (this.date && this.minDate && moment(this.date).add(-1, 'month').isBefore(this.minDate, 'date'))
                    return;
                else if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(-1, 'month').toISOString();
                else
                    this.date = moment().toISOString();
            }
            if (code === 39) {
                if (this.date && this.maxDate && moment(this.date).add(1, 'month').isAfter(this.maxDate, 'date'))
                    return;
                else if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(1, 'month').toISOString();
                else
                    this.date = moment().toISOString();
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "date", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "minDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "maxDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "format", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "info", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "placeholder", void 0);
        UIDateInput = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-date\"><div role=\"input\" class=\"ui-input-control\"><slot></slot>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" value.bind=\"elValue\" size=\"1\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    change.trigger=\"fireEvent($event)\" keydown.trigger=\"keyDown($event)\" click.trigger=\"openDropdown($event, show=true)\"\n    placeholder.bind=\"placeholder\" disabled.bind=\"isDisabled\" readonly.bind=\"!allowSearch || readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-input-addon\" click.trigger=\"toggleDropdown($event)\"><ui-glyph glyph=\"glyph-calendar\"></ui-glyph></span></div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n  <ui-date-view ref=\"dropdown\" type.bind=\"type\" class=\"ui-hidden floating\" date.bind=\"date\" min-date.bind=\"minDate\" max-date.bind=\"maxDate\"></ui-date-view>\n</template>"),
            aurelia_framework_1.customElement('ui-date'),
            __metadata("design:paramtypes", [Element])
        ], UIDateInput);
        return UIDateInput;
    }(ui_input_1.UIBaseInput));
    exports.UIDateInput = UIDateInput;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1kYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvRUE7UUFDRSxvQkFBbUIsT0FBZ0I7WUFBbkMsaUJBS0M7WUFMa0IsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQXlCbUIsU0FBSSxHQUFHLEVBQUUsQ0FBQztZQUtwRCxTQUFJLEdBQUcsR0FBRyxDQUFDO1lBSWYsVUFBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLGFBQVEsR0FBRyxDQUFDLENBQUM7WUFDYixhQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRWIsU0FBSSxHQUFHLENBQUMsQ0FBQztZQUNULFdBQU0sR0FBRyxDQUFDLENBQUM7WUFJWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ1gsV0FBTSxHQUFHLEVBQUUsQ0FBQztZQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7WUFFZCxnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUVwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQXBEMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRXZELElBQUksQ0FBQyxRQUFRLEdBQUcsa0JBQU8sQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFD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LGtCQUFDO0tBdkpELEFBdUpDLENBdkpnQyxzQkFBVyxHQXVKM0M7SUF2Slksa0NBQVciLCJmaWxlIjoiZWxlbWVudHMvaW5wdXRzL3VpLWRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgYmluZGluZ01vZGUsIGlubGluZVZpZXcgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUJhc2VJbnB1dCB9IGZyb20gXCIuL3VpLWlucHV0XCI7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLWV2ZW50XCI7XG5pbXBvcnQgeyBVSVV0aWxzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLXV0aWxzXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktZGF0ZS12aWV3XCIgY2xpY2sudHJpZ2dlcj1cImNsaWNrZWQoJGV2ZW50KVwiPlxuICA8ZGl2IGNsYXNzPVwidWktZHYtZGF0ZS13cmFwcGVyXCIgaWYuYmluZD1cInR5cGUhPSd0J1wiPlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1kdi1oZWFkZXJcIj5cbiAgICAgIDxhIGNsYXNzPVwicHJldiBcXCR7ZGlzYWJsZVByZXY/J2Rpc2FibGVkJzonJ31cIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1jaGV2cm9uLWxlZnRcIj48L3VpLWdseXBoPjwvYT5cbiAgICAgIDxhIGNsYXNzPVwidGl0bGVcIj5cXCR7dGl0bGV9PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtY2FyZXQtdXBcIiBpZi5iaW5kPVwiZGF0ZVBhZ2UhPTJcIj48L3VpLWdseXBoPjwvYT5cbiAgICAgIDxhIGNsYXNzPVwibmV4dCBcXCR7ZGlzYWJsZU5leHQ/J2Rpc2FibGVkJzonJ31cIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1jaGV2cm9uLXJpZ2h0XCI+PC91aS1nbHlwaD48L2E+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInVpLWR2LWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cIndlZWtkYXlzXCIgaWYuYmluZD1cImRhdGVQYWdlPT0wXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwid2Vla1wiPiM8L3NwYW4+XG4gICAgICAgIDxzcGFuIHJlcGVhdC5mb3I9XCJkIG9mIHdlZWtkYXlzXCI+XFwke2R9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHJlcGVhdC5mb3I9XCJ3IG9mIGRhdGVzXCIgY2xhc3M9XCJkYXRlc1wiIGlmLmJpbmQ9XCJkYXRlUGFnZT09MFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cIndlZWtcIj5cXCR7dy53a308L3NwYW4+XG4gICAgICAgIDxzcGFuIHJlcGVhdC5mb3I9XCJkIG9mIHcuZHRcIiBkYXRlLmJpbmQ9XCJkXCIgY2xhc3M9XCJkYXRlIGhvdmVyIFxcJHtkYXRlQ2xhc3MoZCwgY3VycmVudCwgbWluRGF0ZSwgbWF4RGF0ZSl9XCI+JFxce2QuZGF0ZSgpfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiByZXBlYXQuZm9yPVwidyBvZiA0XCIgY2xhc3M9XCJtb250aHNcIiBpZi5iaW5kPVwiZGF0ZVBhZ2U9PTFcIj5cbiAgICAgICAgPHNwYW4gcmVwZWF0LmZvcj1cImQgb2YgM1wiIG1vbnRoLmJpbmQ9XCIodyozKStkXCIgY2xhc3M9XCJtb250aCBob3ZlciBcXCR7bW9udGhDbGFzcygodyozKStkLCBjdXJyZW50LCBtaW5EYXRlLCBtYXhEYXRlKX1cIj5cXCR7bW9udGhzWyh3KjMpK2RdfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiByZXBlYXQuZm9yPVwidyBvZiA1XCIgY2xhc3M9XCJ5ZWFyc1wiIGlmLmJpbmQ9XCJkYXRlUGFnZT09MlwiPlxuICAgICAgICAgIDxzcGFuIHJlcGVhdC5mb3I9XCJkIG9mIDRcIiB5ZWFyLmJpbmQ9XCIodyo0KStkK2RlY2FkZVwiIGNsYXNzPVwieWVhciBob3ZlciBcXCR7eWVhckNsYXNzKCh3KjQpK2QrZGVjYWRlLCBjdXJyZW50LCBtaW5EYXRlLCBtYXhEYXRlKX1cIj5cXCR7KHcqNCkrZCtkZWNhZGV9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInVpLWR2LWZvb3RlclwiPlxuICAgICAgPGEgY2xhc3M9XCJ0b2RheVwiIGlmLmJpbmQ9XCJkYXRlUGFnZT09MFwiPlRvZGF5PC9hPlxuICAgICAgPGEgY2xhc3M9XCJjYW5jZWxcIiBpZi5iaW5kPVwiZGF0ZVBhZ2UhPTBcIj5DYW5jZWw8L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktZHYtdGltZS13cmFwcGVyXCIgaWYuYmluZD1cInR5cGUhPSdkJ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJ0aW1lXCIgaWYuYmluZD1cInRpbWVQYWdlPT0wXCI+XG4gICAgICA8ZGl2Pjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLXRpbWVcIj48L3VpLWdseXBoPjwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGEgY2xhc3M9XCJob3VyLXVwIFxcJHtkaXNhYmxlSHJVcD8nZGlzYWJsZWQnOicnfVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWNoZXZyb24tdXBcIj48L3VpLWdseXBoPjwvYT5cbiAgICAgICAgPGEgY2xhc3M9XCJob3VyXCI+XFwkeyhob3VyPjExP2hvdXItMTI6aG91cik9PTA/JzEyJzooaG91cj4xMT9ob3VyLTEyOmhvdXIpIHwgbnVtYmVyOid7MDB9J308L2E+XG4gICAgICAgIDxhIGNsYXNzPVwiaG91ci1kbiBcXCR7ZGlzYWJsZUhyRG4/J2Rpc2FibGVkJzonJ31cIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1jaGV2cm9uLWRvd25cIj48L3VpLWdseXBoPjwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj46PC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8YSBjbGFzcz1cIm1pbnV0ZS11cCBcXCR7ZGlzYWJsZU1uVXA/J2Rpc2FibGVkJzonJ31cIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1jaGV2cm9uLXVwXCI+PC91aS1nbHlwaD48L2E+XG4gICAgICAgIDxhIGNsYXNzPVwibWludXRlXCI+XFwke21pbnV0ZSB8IG51bWJlcjonezAwfSd9PC9hPlxuICAgICAgICA8YSBjbGFzcz1cIm1pbnV0ZS1kbiBcXCR7ZGlzYWJsZU1uRG4/J2Rpc2FibGVkJzonJ31cIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1jaGV2cm9uLWRvd25cIj48L3VpLWdseXBoPjwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj48YSBjbGFzcz1cInR0XCI+XFwke2hvdXI+MTE/J1BNJzonQU0nfTwvYT48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibnVtYmVycyBob3Vyc1wiIGlmLmJpbmQ9XCJ0aW1lUGFnZT09MVwiIHJlcGVhdC5mb3I9XCJyIG9mIDJcIj5cbiAgICAgIDxzcGFuIHJlcGVhdC5mb3I9XCJoIG9mIDZcIiBob3VyLmJpbmQ9XCIoKHIqNikrKGgrMSk9PTEyPzA6KHIqNikrKGgrMSkpKyhob3VyPjExPzEyOjApXCIgY2xhc3M9XCJociBob3Zlcn1cIlwiPlxcJHsocio2KStoKzEgfCBudW1iZXI6J3swMH0nfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwibnVtYmVycyBtaW51dGVzXCIgaWYuYmluZD1cInRpbWVQYWdlPT0yXCIgcmVwZWF0LmZvcj1cInIgb2YgMlwiPlxuICAgICAgPHNwYW4gcmVwZWF0LmZvcj1cIm0gb2YgNlwiIG1pbnV0ZS5iaW5kPVwiKHIqMzApKyhtKjUpXCIgY2xhc3M9XCJtbiBob3Zlcn1cIlwiPlxcJHsociozMCkrKG0qNSkgfCBudW1iZXI6J3swMH0nfTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGlmLmJpbmQ9XCJ0aW1lUGFnZSE9MFwiPlxuICAgICAgPGEgY2xhc3M9XCJjYW5jZWxcIj5DYW5jZWw8L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWRhdGUtdmlldycpXG5leHBvcnQgY2xhc3MgVUlEYXRlVmlldyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCd0aW1lJykpIHRoaXMudHlwZSA9ICd0JztcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGV0aW1lJykpIHRoaXMudHlwZSA9ICdkdCc7XHJcblxyXG4gICAgdGhpcy5vYkxvY2FsZSA9IFVJRXZlbnQuc3Vic2NyaWJlKCdpMThuOmxvY2FsZTpjaGFuZ2VkJywgcGF5bG9hZCA9PiB0aGlzLmJ1aWxkRGF0ZVBhZ2UocGF5bG9hZC5uZXdWYWx1ZSkpO1xyXG4gIH1cclxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgaWYgKHRoaXMuZGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5pc1ZhbGlkKCkpIHRoaXMuZGF0ZSA9IG1vbWVudCh0aGlzLmRhdGUpLnRvSVNPU3RyaW5nKCk7XG4gICAgaWYgKHRoaXMuZGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5pc1ZhbGlkKCkpIHRoaXMuY3VycmVudCA9IG1vbWVudCh0aGlzLmRhdGUpO1xuICAgIGVsc2UgaWYgKHRoaXMubWluRGF0ZSAmJiBtb21lbnQodGhpcy5taW5EYXRlKS5pc1ZhbGlkKCkgJiYgbW9tZW50KCkuaXNCZWZvcmUodGhpcy5taW5EYXRlKSkgdGhpcy5jdXJyZW50ID0gbW9tZW50KHRoaXMubWluRGF0ZSk7XG4gICAgZWxzZSBpZiAodGhpcy5tYXhEYXRlICYmIG1vbWVudCh0aGlzLm1heERhdGUpLmlzVmFsaWQoKSAmJiBtb21lbnQoKS5pc0FmdGVyKHRoaXMubWF4RGF0ZSkpIHRoaXMuY3VycmVudCA9IG1vbWVudCh0aGlzLm1heERhdGUpO1xuICAgIGVsc2UgdGhpcy5jdXJyZW50ID0gbW9tZW50KCk7XG4gIH1cbiAgYXR0YWNoZWQoKSB7XG4gICAgdGhpcy5idWlsZERhdGVQYWdlKCk7XG4gIH1cbiAgZGV0YWNoZWQoKSB7XG4gICAgdGhpcy5vYkxvY2FsZS5kaXNwb3NlKCk7XG4gIH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgZGF0ZSA9ICcnO1xuXG4gIEBiaW5kYWJsZSgpIG1pbkRhdGU7XG4gIEBiaW5kYWJsZSgpIG1heERhdGU7XG5cbiAgQGJpbmRhYmxlKCkgdHlwZSA9ICdkJztcblxuICBwcml2YXRlIG9iTG9jYWxlO1xuXG4gIHByaXZhdGUgdGl0bGUgPSBcIlwiO1xuICBwcml2YXRlIGRhdGVQYWdlID0gMDtcbiAgcHJpdmF0ZSB0aW1lUGFnZSA9IDA7XG5cbiAgcHJpdmF0ZSBob3VyID0gMDtcbiAgcHJpdmF0ZSBtaW51dGUgPSAwO1xuICBwcml2YXRlIGN1cnJlbnQ7XG4gIHByaXZhdGUgZGVjYWRlO1xuXG4gIHByaXZhdGUgZGF0ZXMgPSBbXTtcbiAgcHJpdmF0ZSBtb250aHMgPSBbXTtcbiAgcHJpdmF0ZSB3ZWVrZGF5cyA9IFtdO1xuXG4gIHByaXZhdGUgZGlzYWJsZVByZXYgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkaXNhYmxlTmV4dCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZGlzYWJsZUhyVXAgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkaXNhYmxlSHJEbiA9IGZhbHNlO1xuICBwcml2YXRlIGRpc2FibGVNblVwID0gZmFsc2U7XG4gIHByaXZhdGUgZGlzYWJsZU1uRG4gPSBmYWxzZTtcblxuICBkYXRlQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAmJiBtb21lbnQobmV3VmFsdWUpLmlzVmFsaWQoKSkge1xuICAgICAgbGV0IHRpbWUgPSBtb21lbnQobmV3VmFsdWUpLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKTtcbiAgICAgIHRoaXMuaG91ciA9IHRpbWUuaG91cigpO1xuICAgICAgdGhpcy5taW51dGUgPSB0aW1lLm1pbnV0ZSgpO1xuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuICB9XG5cbiAgbWluRGF0ZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICBpZiAodGhpcy5kYXRlICYmIG1vbWVudCh0aGlzLmRhdGUpLmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgJ2RhdGUnKSkgdGhpcy5kYXRlID0gbmV3VmFsdWU7XG4gICAgdGhpcy5idWlsZERhdGVQYWdlKCk7XG4gIH1cblxuICBtYXhEYXRlQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIGlmICh0aGlzLmRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuaXNBZnRlcih0aGlzLm1heERhdGUsICdkYXRlJykpIHRoaXMuZGF0ZSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuYnVpbGREYXRlUGFnZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoKCkge1xuICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnZGF0ZScpKSB0aGlzLmRhdGUgPSB0aGlzLm1pbkRhdGU7XG4gICAgaWYgKHRoaXMubWF4RGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5pc0FmdGVyKHRoaXMubWF4RGF0ZSwgJ2RhdGUnKSkgdGhpcy5kYXRlID0gdGhpcy5tYXhEYXRlO1xuICAgIHRoaXMuY3VycmVudCA9IG1vbWVudCh0aGlzLmRhdGUpO1xuICAgIHRoaXMuYnVpbGREYXRlUGFnZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkYXRlQ2xhc3MoZHQpIHtcbiAgICBsZXQgYyA9ICcnO1xuICAgIGlmICghZHQuaXNTYW1lKHRoaXMuY3VycmVudCwgJ21vbnRoJykpIGMgKz0gJyBtdXRlZCAnO1xuICAgIGlmIChkdC5pc1NhbWUobW9tZW50KCksICdkYXknKSkgYyArPSAnIHRvZGF5JztcbiAgICBpZiAodGhpcy5kYXRlICYmIGR0LmlzU2FtZSh0aGlzLmRhdGUsICdkYXknKSkgYyArPSAnIHNlbGVjdGVkJztcbiAgICBpZiAodGhpcy5taW5EYXRlICYmIGR0LmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgJ2RheScpKSBjICs9ICcgZGlzYWJsZWQnO1xuICAgIGlmICh0aGlzLm1heERhdGUgJiYgZHQuaXNBZnRlcih0aGlzLm1heERhdGUsICdkYXknKSkgYyArPSAnIGRpc2FibGVkJztcbiAgICByZXR1cm4gYztcbiAgfVxuICBwcml2YXRlIG1vbnRoQ2xhc3MobW4pIHtcbiAgICBsZXQgYyA9ICcnLCBtID0gbW9tZW50KHRoaXMuY3VycmVudC50b0lTT1N0cmluZygpKS5tb250aChtbik7XG4gICAgaWYgKHRoaXMuZGF0ZSAmJiBtLmlzU2FtZSh0aGlzLmRhdGUsICdtb250aCcpKSBjICs9ICcgc2VsZWN0ZWQnO1xuICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgbS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUsICdtb250aCcpKSBjICs9ICcgZGlzYWJsZWQnO1xuICAgIGlmICh0aGlzLm1heERhdGUgJiYgbS5pc0FmdGVyKHRoaXMubWF4RGF0ZSwgJ21vbnRoJykpIGMgKz0gJyBkaXNhYmxlZCc7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgcHJpdmF0ZSB5ZWFyQ2xhc3MoeXIpIHtcbiAgICBsZXQgYyA9ICcnLCB5ID0gbW9tZW50KHRoaXMuY3VycmVudC50b0lTT1N0cmluZygpKS55ZWFyKHlyKTtcbiAgICBpZiAodGhpcy5kYXRlICYmIHkuaXNTYW1lKHRoaXMuZGF0ZSwgJ3llYXInKSkgYyArPSAnIHNlbGVjdGVkJztcbiAgICBpZiAodGhpcy5taW5EYXRlICYmIHkuaXNCZWZvcmUodGhpcy5taW5EYXRlLCAneWVhcicpKSBjICs9ICcgZGlzYWJsZWQnO1xuICAgIGlmICh0aGlzLm1heERhdGUgJiYgeS5pc0FmdGVyKHRoaXMubWF4RGF0ZSwgJ3llYXInKSkgYyArPSAnIGRpc2FibGVkJztcbiAgICByZXR1cm4gYztcbiAgfVxuICBwcml2YXRlIGhvdXJDbGFzcyhocikge1xuICAgIGxldCBjID0gJycsIHkgPSBtb21lbnQodGhpcy5jdXJyZW50LnRvSVNPU3RyaW5nKCkpLmhvdXIoaHIpO1xuICAgIGlmICh0aGlzLmRhdGUgJiYgeS5pc1NhbWUodGhpcy5kYXRlLCAnaG91cicpKSBjICs9ICcgc2VsZWN0ZWQnO1xuICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgeS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUsICdob3VyJykpIGMgKz0gJyBkaXNhYmxlZCc7XG4gICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB5LmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAnaG91cicpKSBjICs9ICcgZGlzYWJsZWQnO1xuICAgIHJldHVybiBjO1xuICB9XG4gIHByaXZhdGUgbWludXRlQ2xhc3MobW4pIHtcbiAgICBsZXQgYyA9ICcnLCB5ID0gbW9tZW50KHRoaXMuY3VycmVudC50b0lTT1N0cmluZygpKS5taW51dGUobW4pO1xuICAgIGlmICh0aGlzLmRhdGUgJiYgeS5pc1NhbWUodGhpcy5kYXRlLCAnbWludXRlJykpIGMgKz0gJyBzZWxlY3RlZCc7XG4gICAgaWYgKHRoaXMubWluRGF0ZSAmJiB5LmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgJ21pbnV0ZScpKSBjICs9ICcgZGlzYWJsZWQnO1xuICAgIGlmICh0aGlzLm1heERhdGUgJiYgeS5pc0FmdGVyKHRoaXMubWF4RGF0ZSwgJ21pbnV0ZScpKSBjICs9ICcgZGlzYWJsZWQnO1xuICAgIHJldHVybiBjO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZERhdGVQYWdlKG5ld0xvY2FsZT8pIHtcbiAgICBpZiAoIXRoaXMuY3VycmVudC5pc1ZhbGlkIHx8ICF0aGlzLmN1cnJlbnQuaXNWYWxpZCgpKSByZXR1cm47XG4gICAgaWYgKG5ld0xvY2FsZSkgbW9tZW50LmxvY2FsZShuZXdMb2NhbGUpO1xuXG4gICAgaWYgKHRoaXMuZGF0ZVBhZ2UgPT0gMCkge1xuICAgICAgdGhpcy53ZWVrZGF5cyA9IG1vbWVudC53ZWVrZGF5c01pbigpO1xuICAgICAgdGhpcy50aXRsZSA9IG1vbWVudCh0aGlzLmN1cnJlbnQudG9JU09TdHJpbmcoKSkuZm9ybWF0KCdNTU1NIFlZWVknKTtcblxuICAgICAgbGV0IHN0YXJ0ID0gbW9tZW50KHRoaXMuY3VycmVudCkuc3RhcnRPZignbW9udGgnKTtcbiAgICAgIGxldCBlbmQgPSBtb21lbnQodGhpcy5jdXJyZW50KS5lbmRPZignbW9udGgnKTtcblxuICAgICAgaWYgKHN0YXJ0LmRheSgpIDwgMykgc3RhcnQuYWRkKC03LCAnZGF5Jyk7XG4gICAgICBzdGFydC5hZGQoc3RhcnQuZGF5KCkgKiAtMSwgJ2RheScpO1xuICAgICAgZW5kID0gZW5kLmFkZCg2IC0gZW5kLmRheSgpLCAnZGF5Jyk7XG5cbiAgICAgIHRoaXMuZGF0ZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIHcgPSAwOyB3IDwgNjsgdysrKSB7XG4gICAgICAgIGxldCB3ayA9IHsgd2s6IG1vbWVudChzdGFydCkuYWRkKHcsICd3ZWVrJykud2VlaygpLCBkdDogW10gfVxuICAgICAgICBmb3IgKHZhciBkID0gMDsgZCA8IDc7IGQrKykge1xuICAgICAgICAgIHdrLmR0LnB1c2gobW9tZW50KHN0YXJ0KS5hZGQodywgJ3dlZWsnKS5hZGQoZCwgJ2RheScpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGVzLnB1c2god2spO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5taW5EYXRlKSB0aGlzLmRpc2FibGVQcmV2ID0gc3RhcnQuaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnbW9udGgnKTtcbiAgICAgIGlmICh0aGlzLm1heERhdGUpIHRoaXMuZGlzYWJsZU5leHQgPSBlbmQuaXNBZnRlcih0aGlzLm1heERhdGUsICdtb250aCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRlUGFnZSA9PSAxKSB7XG4gICAgICB0aGlzLm1vbnRocyA9IG1vbWVudC5tb250aHMoKTtcbiAgICAgIHRoaXMudGl0bGUgPSBtb21lbnQodGhpcy5jdXJyZW50LnRvSVNPU3RyaW5nKCkpLmZvcm1hdCgnWVlZWScpO1xuXG4gICAgICBsZXQgc3RhcnQgPSBtb21lbnQodGhpcy5jdXJyZW50KS5zdGFydE9mKCd5ZWFyJyk7XG4gICAgICBsZXQgZW5kID0gbW9tZW50KHRoaXMuY3VycmVudCkuZW5kT2YoJ3llYXInKTtcblxuICAgICAgaWYgKHRoaXMubWluRGF0ZSkgdGhpcy5kaXNhYmxlUHJldiA9IHN0YXJ0LmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgJ21vbnRoJyk7XG4gICAgICBpZiAodGhpcy5tYXhEYXRlKSB0aGlzLmRpc2FibGVOZXh0ID0gZW5kLmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAnbW9udGgnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0ZVBhZ2UgPT0gMikge1xuICAgICAgdGhpcy5kZWNhZGUgPSAodGhpcy5jdXJyZW50LnllYXIoKSAtICh0aGlzLmN1cnJlbnQueWVhcigpICUgMjApKSArIDE7XG4gICAgICB0aGlzLnRpdGxlID0gdGhpcy5kZWNhZGUgKyAnLScgKyAodGhpcy5kZWNhZGUgKyAyMCk7XG5cbiAgICAgIHRoaXMuZGlzYWJsZVByZXYgPSAodGhpcy5taW5EYXRlICYmIHRoaXMuZGVjYWRlIDw9IG1vbWVudCh0aGlzLm1pbkRhdGUpLnllYXIoKSk7XG4gICAgICB0aGlzLmRpc2FibGVOZXh0ID0gKHRoaXMubWF4RGF0ZSAmJiB0aGlzLmRlY2FkZSArIDIwID49IG1vbWVudCh0aGlzLm1heERhdGUpLnllYXIoKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZSAhPSAnZCcgJiYgdGhpcy50aW1lUGFnZSA9PSAwKSB7XG4gICAgICBsZXQgdGltZSA9IG1vbWVudCh0aGlzLmN1cnJlbnQpLmhvdXIodGhpcy5ob3VyKS5taW51dGUodGhpcy5taW51dGUpLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKTtcbiAgICAgIGlmICh0aGlzLm1pbkRhdGUpIHRoaXMuZGlzYWJsZUhyRG4gPSB0aW1lLmlzU2FtZU9yQmVmb3JlKHRoaXMubWluRGF0ZSwgJ2hvdXInKTtcbiAgICAgIGlmICh0aGlzLm1heERhdGUpIHRoaXMuZGlzYWJsZUhyVXAgPSB0aW1lLmlzU2FtZU9yQWZ0ZXIodGhpcy5tYXhEYXRlLCAnaG91cicpO1xuICAgICAgaWYgKHRoaXMubWluRGF0ZSkgdGhpcy5kaXNhYmxlTW5EbiA9IHRpbWUuaXNTYW1lT3JCZWZvcmUodGhpcy5taW5EYXRlLCAnbWludXRlJyk7XG4gICAgICBpZiAodGhpcy5tYXhEYXRlKSB0aGlzLmRpc2FibGVNblVwID0gdGltZS5pc1NhbWVPckFmdGVyKHRoaXMubWF4RGF0ZSwgJ21pbnV0ZScpO1xuXG4gICAgICBpZiAodGhpcy5taW5EYXRlICYmIHRpbWUuaXNTYW1lT3JCZWZvcmUodGhpcy5taW5EYXRlLCAnaG91cicpKSB0aGlzLmhvdXIgPSBtb21lbnQodGhpcy5taW5EYXRlKS5ob3VyKCk7XG4gICAgICBpZiAodGhpcy5tYXhEYXRlICYmIHRpbWUuaXNTYW1lT3JBZnRlcih0aGlzLm1heERhdGUsICdob3VyJykpIHRoaXMuaG91ciA9IG1vbWVudCh0aGlzLm1heERhdGUpLmhvdXIoKTtcbiAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdGltZS5pc1NhbWVPckJlZm9yZSh0aGlzLm1pbkRhdGUsICdtaW51dGUnKSkgdGhpcy5taW51dGUgPSBtb21lbnQodGhpcy5taW5EYXRlKS5taW51dGUoKTtcbiAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGltZS5pc1NhbWVPckFmdGVyKHRoaXMubWF4RGF0ZSwgJ21pbnV0ZScpKSB0aGlzLm1pbnV0ZSA9IG1vbWVudCh0aGlzLm1heERhdGUpLm1pbnV0ZSgpO1xuICAgIH1cblxuICB9XG5cbiAgcHJpdmF0ZSBjbGlja2VkKGV2dCkge1xuICAgIGxldCBjaGFuZ2VkID0gZmFsc2VcbiAgICBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHJldHVybjtcblxuICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndG9kYXknKSkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gbW9tZW50KCk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RhdGUnKSkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gbW9tZW50KGV2dC50YXJnZXRbJ2RhdGUnXSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21vbnRoJykpIHtcbiAgICAgIHRoaXMuY3VycmVudC5tb250aChldnQudGFyZ2V0Wydtb250aCddKTtcbiAgICAgIHRoaXMuZGF0ZVBhZ2UgPSAwO1xuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygneWVhcicpKSB7XG4gICAgICB0aGlzLmN1cnJlbnQueWVhcihldnQudGFyZ2V0Wyd5ZWFyJ10pO1xuICAgICAgdGhpcy5kYXRlUGFnZSA9IDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXh0JykpIHtcbiAgICAgIGlmICh0aGlzLmRhdGVQYWdlID09IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbW9tZW50KHRoaXMuY3VycmVudCkuYWRkKDEsICdtb250aCcpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5kYXRlUGFnZSA9PSAxKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG1vbWVudCh0aGlzLmN1cnJlbnQpLmFkZCgxLCAneWVhcicpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5kYXRlUGFnZSA9PSAyKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG1vbWVudCh0aGlzLmN1cnJlbnQpLmFkZCgyMCwgJ3llYXInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZXYnKSkge1xuICAgICAgaWYgKHRoaXMuZGF0ZVBhZ2UgPT0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBtb21lbnQodGhpcy5jdXJyZW50KS5hZGQoLTEsICdtb250aCcpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5kYXRlUGFnZSA9PSAxKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG1vbWVudCh0aGlzLmN1cnJlbnQpLmFkZCgtMSwgJ3llYXInKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHRoaXMuZGF0ZVBhZ2UgPT0gMikge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBtb21lbnQodGhpcy5jdXJyZW50KS5hZGQoLTIwLCAneWVhcicpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGl0bGUnKSkge1xuICAgICAgaWYgKHRoaXMuZGF0ZVBhZ2UgIT0gMikgdGhpcy5kYXRlUGFnZSsrO1xuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2FuY2VsJykpIHtcbiAgICAgIHRoaXMuZGF0ZVBhZ2UgPSAwO1xuICAgICAgdGhpcy50aW1lUGFnZSA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3VyLXVwJykpIHtcbiAgICAgIHRoaXMuaG91ciA9PSAyMyA/IHRoaXMuaG91ciA9IDAgOiB0aGlzLmhvdXIrKztcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaG91ci1kbicpKSB7XG4gICAgICB0aGlzLmhvdXIgPT0gMCA/IHRoaXMuaG91ciA9IDIzIDogdGhpcy5ob3VyLS07XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21pbnV0ZS11cCcpKSB7XG4gICAgICB0aGlzLm1pbnV0ZSA9PSA1OSA/IHRoaXMubWludXRlID0gMCA6IHRoaXMubWludXRlKys7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21pbnV0ZS1kbicpKSB7XG4gICAgICB0aGlzLm1pbnV0ZSA9PSAwID8gdGhpcy5taW51dGUgPSA1OSA6IHRoaXMubWludXRlLS07XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2hvdXInKSkge1xuICAgICAgdGhpcy50aW1lUGFnZSA9IDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaW51dGUnKSkge1xuICAgICAgdGhpcy50aW1lUGFnZSA9IDI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdocicpKSB7XG4gICAgICB0aGlzLmhvdXIgPSBldnQudGFyZ2V0Wydob3VyJ107XG4gICAgICB0aGlzLnRpbWVQYWdlID0gMDtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW4nKSkge1xuICAgICAgdGhpcy5taW51dGUgPSBldnQudGFyZ2V0WydtaW51dGUnXTtcbiAgICAgIHRoaXMudGltZVBhZ2UgPSAwO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0dCcpKSB7XG4gICAgICB0aGlzLmhvdXIgPSB0aGlzLmhvdXIgKyAodGhpcy5ob3VyID4gMTEgPyAtMTIgOiAxMik7XG4gICAgICB0aGlzLnRpbWVQYWdlID0gMDtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmJ1aWxkRGF0ZVBhZ2UoKTtcbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy5kYXRlID0gbW9tZW50KHRoaXMuY3VycmVudCkuaG91cih0aGlzLnR5cGUgPT0gJ2QnID8gMCA6IHRoaXMuaG91cikubWludXRlKHRoaXMudHlwZSA9PSAnZCcgPyAwIDogdGhpcy5taW51dGUpLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKS51dGMoKS50b0lTT1N0cmluZygpO1xuICAgICAgVUlFdmVudC5maXJlRXZlbnQoJ2NoYW5nZScsIHRoaXMuZWxlbWVudCwgbW9tZW50KHRoaXMuZGF0ZSkpO1xuICAgIH1cbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktaW5wdXQtd3JhcHBlciB1aS1pbnB1dC1kYXRlXCI+PGRpdiByb2xlPVwiaW5wdXRcIiBjbGFzcz1cInVpLWlucHV0LWNvbnRyb2xcIj48c2xvdD48L3Nsb3Q+XG4gIDxzcGFuIGNsYXNzPVwidWktZXJyb3JcIiBpZi5iaW5kPVwiZXJyb3JzXCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtaW52YWxpZFwiPjwvdWktZ2x5cGg+PHVsIGNsYXNzPVwidWktZXJyb3ItbGlzdFwiPjxsaSByZXBlYXQuZm9yPVwiZXJyIG9mIGVycm9yc1wiIGlubmVyaHRtbC5iaW5kPVwiZXJyXCI+PC9saT48L3VsPjwvc3Bhbj5cbiAgPGlucHV0IHJlZj1cImlucHV0RWxcIiB2YWx1ZS5iaW5kPVwiZWxWYWx1ZVwiIHNpemU9XCIxXCJcbiAgICBmb2N1cy50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIiBibHVyLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiXG4gICAgY2hhbmdlLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIGtleWRvd24udHJpZ2dlcj1cImtleURvd24oJGV2ZW50KVwiIGNsaWNrLnRyaWdnZXI9XCJvcGVuRHJvcGRvd24oJGV2ZW50LCBzaG93PXRydWUpXCJcbiAgICBwbGFjZWhvbGRlci5iaW5kPVwicGxhY2Vob2xkZXJcIiBkaXNhYmxlZC5iaW5kPVwiaXNEaXNhYmxlZFwiIHJlYWRvbmx5LmJpbmQ9XCIhYWxsb3dTZWFyY2ggfHwgcmVhZG9ubHlcIi8+XG4gIDxzcGFuIGNsYXNzPVwidWktY2xlYXJcIiBpZi5iaW5kPVwiY2xlYXIgJiYgdmFsdWVcIiBjbGljay50cmlnZ2VyPVwiY2xlYXJJbnB1dCgpXCI+JnRpbWVzOzwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJ1aS1pbnB1dC1hZGRvblwiIGNsaWNrLnRyaWdnZXI9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQpXCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtY2FsZW5kYXJcIj48L3VpLWdseXBoPjwvc3Bhbj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLWlucHV0LWluZm9cIiBpZi5iaW5kPVwiaW5mb1wiIGlubmVyaHRtbC5iaW5kPVwiaW5mb1wiPjwvZGl2PlxuICA8dWktZGF0ZS12aWV3IHJlZj1cImRyb3Bkb3duXCIgdHlwZS5iaW5kPVwidHlwZVwiIGNsYXNzPVwidWktaGlkZGVuIGZsb2F0aW5nXCIgZGF0ZS5iaW5kPVwiZGF0ZVwiIG1pbi1kYXRlLmJpbmQ9XCJtaW5EYXRlXCIgbWF4LWRhdGUuYmluZD1cIm1heERhdGVcIj48L3VpLWRhdGUtdmlldz5cbjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS1kYXRlJylcbmV4cG9ydCBjbGFzcyBVSURhdGVJbnB1dCBleHRlbmRzIFVJQmFzZUlucHV0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY2xlYXIgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY2xlYXInKTtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3RpbWUnKSkge1xuICAgICAgdGhpcy50eXBlID0gJ3QnO1xuICAgICAgdGhpcy5mb3JtYXQgPSAnaGg6bW0gQSc7XG4gICAgfVxuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0ZXRpbWUnKSkge1xuICAgICAgdGhpcy50eXBlID0gJ2R0JztcbiAgICAgIHRoaXMuZm9ybWF0ID0gJ0REIE1NTSBZWVlZIGhoOm1tIEEnO1xuICAgIH1cbiAgICB0aGlzLm9iTG9jYWxlID0gVUlFdmVudC5zdWJzY3JpYmUoJ2kxOG46bG9jYWxlOmNoYW5nZWQnLCBwYXlsb2FkID0+IHRoaXMudXBkYXRlSW5wdXRWYWx1ZShwYXlsb2FkLm5ld1ZhbHVlKSk7XG4gIH1cblxuICAvLyBhdXJlbGlhIGhvb2tzXG4gIC8vIGNyZWF0ZWQob3duaW5nVmlldzogVmlldywgbXlWaWV3OiBWaWV3KSB7IH1cbiAgYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkge1xuICAgIHN1cGVyLmJpbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoIWlzRW1wdHkodGhpcy5kYXRlKSAmJiBtb21lbnQodGhpcy5kYXRlKS5pc1ZhbGlkKCkpIHtcbiAgICAgIHRoaXMuZGF0ZSA9IG1vbWVudCh0aGlzLmRhdGUpLnRvSVNPU3RyaW5nKCk7XG4gICAgICB0aGlzLmVsVmFsdWUgPSBtb21lbnQodGhpcy5kYXRlKS5mb3JtYXQodGhpcy5mb3JtYXQpO1xuICAgIH1cbiAgfVxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLnRldGhlciA9IFVJVXRpbHMudGV0aGVyKHRoaXMuZWxlbWVudCwgdGhpcy5kcm9wZG93biwgeyByZXNpemU6IGZhbHNlIH0pO1xuICAgIHRoaXMub2JNb3VzZXVwID0gVUlFdmVudC5zdWJzY3JpYmUoJ21vdXNlY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICBpZiAoZ2V0UGFyZW50QnlDbGFzcyhldnQudGFyZ2V0LCAndWktZGF0ZS12aWV3JykgPT0gdGhpcy5kcm9wZG93bikgcmV0dXJuIHRydWU7XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB9KTtcbiAgfVxuICBkZXRhY2hlZCgpIHtcbiAgICB0aGlzLnRldGhlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5vYkxvY2FsZS5kaXNwb3NlKCk7XG4gICAgdGhpcy5vYk1vdXNldXAuZGlzcG9zZSgpO1xuICB9XG4gIC8vIHVuYmluZCgpIHsgfVxuICAvLyBlbmQgYXVyZWxpYSBob29rc1xuXG4gIEBiaW5kYWJsZSh7IGRlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUudHdvV2F5IH0pIGRhdGUgPSAnJztcblxuICBAYmluZGFibGUoKSBtaW5EYXRlO1xuICBAYmluZGFibGUoKSBtYXhEYXRlO1xuICBAYmluZGFibGUoKSBmb3JtYXQgPSAnREQgTU1NIFlZWVknO1xuXG4gIEBiaW5kYWJsZSgpIHdpZHRoID0gJ2F1dG8nO1xuICBAYmluZGFibGUoKSBlcnJvcnMgPSBudWxsO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSByZWFkb25seSA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBpbmZvID0gJyc7XG4gIEBiaW5kYWJsZSgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgcHJpdmF0ZSB0eXBlID0gJ2QnO1xuICBwcml2YXRlIGVsVmFsdWUgPSAnJztcblxuICBwcml2YXRlIHNob3cgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjbGVhciA9IGZhbHNlO1xuICBwcml2YXRlIGlnbm9yZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgZHJvcGRvd247XG5cbiAgcHJvdGVjdGVkIHRldGhlcjtcbiAgcHJvdGVjdGVkIG9iTG9jYWxlO1xuICBwcm90ZWN0ZWQgb2JNb3VzZXVwO1xuXG4gIGRhdGVDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICYmIG1vbWVudChuZXdWYWx1ZSkuaXNWYWxpZCgpKSB0aGlzLmVsVmFsdWUgPSBtb21lbnQobmV3VmFsdWUpLmZvcm1hdCh0aGlzLmZvcm1hdCk7XG4gICAgZWxzZSB0aGlzLmVsVmFsdWUgPSAnJztcbiAgICB0aGlzLmlucHV0RWwuZm9jdXMoKTtcbiAgICBpZiAodGhpcy50eXBlID09ICdkJykgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ2NoYW5nZScsIHRoaXMuZWxlbWVudCwgbmV3VmFsdWUgfHwgbnVsbCk7XG4gIH1cblxuICB1cGRhdGVJbnB1dFZhbHVlKG5ld0xvY2FsZT8pIHtcbiAgICBpZiAobmV3TG9jYWxlKSBtb21lbnQubG9jYWxlKG5ld0xvY2FsZSk7XG4gICAgaWYgKHRoaXMuZGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5pc1ZhbGlkKCkpIHRoaXMuZWxWYWx1ZSA9IG1vbWVudCh0aGlzLmRhdGUpLmZvcm1hdCh0aGlzLmZvcm1hdCk7XG4gICAgZWxzZSB0aGlzLmVsVmFsdWUgPSAnJztcbiAgfVxuXG4gIG9wZW5Ecm9wZG93bigpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLmRpc2FibGVkKSByZXR1cm4gdHJ1ZTtcbiAgICB0aGlzLmRyb3Bkb3duLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCd1aS1oaWRkZW4nKTtcbiAgICB0aGlzLmRyb3Bkb3duLmF1LmNvbnRyb2xsZXIudmlld01vZGVsLnJlZnJlc2goKTtcbiAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpXG4gIH1cblxuICBjbG9zZURyb3Bkb3duKCkge1xuICAgIHRoaXMuZHJvcGRvd24uaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QuYWRkKCd1aS1oaWRkZW4nKTtcbiAgICB0aGlzLmRyb3Bkb3duLmF1LmNvbnRyb2xsZXIudmlld01vZGVsLmRhdGVQYWdlID0gMDtcbiAgfVxuXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCwgZm9yY2VDbG9zZSA9IGZhbHNlKSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2dC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIHRoaXMuc2hvdyB8fCB0aGlzLmRyb3Bkb3duLmlzT3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bigpIDogdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93O1xuICB9XG5cbiAgZmlyZUV2ZW50KGV2dCkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBsZXQgZWwgPSBnZXRQYXJlbnRCeUNsYXNzKHRoaXMuZWxlbWVudCwgJ3VpLWlucHV0LWdyb3VwJyk7XG4gICAgaWYgKGV2dC50eXBlID09PSAnZm9jdXMnKSB7XG4gICAgICB0aGlzLmlucHV0RWwuc2VsZWN0KCk7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktZm9jdXMnKTtcbiAgICAgIGlmIChlbCkgZWwuY2xhc3NMaXN0LmFkZCgndWktZm9jdXMnKTtcbiAgICB9XG4gICAgaWYgKGV2dC50eXBlID09PSAnYmx1cicpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1mb2N1cycpO1xuICAgICAgaWYgKGVsKSBlbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1mb2N1cycpO1xuICAgIH1cbiAgICBVSUV2ZW50LmZpcmVFdmVudChldnQudHlwZSwgdGhpcy5lbGVtZW50LCB0aGlzLmRhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBrZXlEb3duKGV2dCkge1xuICAgIGlmIChldnQuY3RybEtleSB8fCBldnQuYWx0S2V5IHx8IGV2dC5tZXRhS2V5IHx8IChldnQua2V5Q29kZSB8fCBldnQud2hpY2gpID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLmRpc2FibGVkKSByZXR1cm4gdHJ1ZTtcbiAgICBsZXQgY29kZSA9IChldnQua2V5Q29kZSB8fCBldnQud2hpY2gpO1xuXG4gICAgLy8gT25FbnRlclByZXNzIGlmIGRyb3Bkb3duIGNsb3NlZCwgZmlyZSBlbnRlcnByZXNzZWRcbiAgICBpZiAoY29kZSA9PSAxMyAmJiAhdGhpcy5kcm9wZG93bi5pc09wZW4pIHtcbiAgICAgIHJldHVybiBVSUV2ZW50LmZpcmVFdmVudCgnZW50ZXJwcmVzc2VkJywgdGhpcy5lbGVtZW50LCB0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNvZGUgPT09IDkpIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IDM4KSB7XG4gICAgICBpZiAodGhpcy5kYXRlICYmIHRoaXMubWF4RGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5hZGQoMSwgJ2RheScpLmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAnZGF0ZScpKSByZXR1cm47XG4gICAgICBlbHNlIGlmICh0aGlzLmRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuaXNWYWxpZCgpKSB0aGlzLmRhdGUgPSBtb21lbnQodGhpcy5kYXRlKS5hZGQoMSwgJ2RheScpLnRvSVNPU3RyaW5nKCk7XG4gICAgICBlbHNlIHRoaXMuZGF0ZSA9IG1vbWVudCgpLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChjb2RlID09PSA0MCkge1xuICAgICAgaWYgKHRoaXMuZGF0ZSAmJiB0aGlzLm1pbkRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuYWRkKC0xLCAnZGF5JykuaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnZGF0ZScpKSByZXR1cm47XG4gICAgICBlbHNlIGlmICh0aGlzLmRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuaXNWYWxpZCgpKSB0aGlzLmRhdGUgPSBtb21lbnQodGhpcy5kYXRlKS5hZGQoLTEsICdkYXknKS50b0lTT1N0cmluZygpO1xuICAgICAgZWxzZSB0aGlzLmRhdGUgPSBtb21lbnQoKS50b0lTT1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoY29kZSA9PT0gMzcpIHsgLy9sZWZ0XG4gICAgICBpZiAodGhpcy5kYXRlICYmIHRoaXMubWluRGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5hZGQoLTEsICdtb250aCcpLmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgJ2RhdGUnKSkgcmV0dXJuO1xuICAgICAgZWxzZSBpZiAodGhpcy5kYXRlICYmIG1vbWVudCh0aGlzLmRhdGUpLmlzVmFsaWQoKSkgdGhpcy5kYXRlID0gbW9tZW50KHRoaXMuZGF0ZSkuYWRkKC0xLCAnbW9udGgnKS50b0lTT1N0cmluZygpO1xuICAgICAgZWxzZSB0aGlzLmRhdGUgPSBtb21lbnQoKS50b0lTT1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoY29kZSA9PT0gMzkpIHsgLy9yaWdodFxuICAgICAgaWYgKHRoaXMuZGF0ZSAmJiB0aGlzLm1heERhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuYWRkKDEsICdtb250aCcpLmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAnZGF0ZScpKSByZXR1cm47XG4gICAgICBlbHNlIGlmICh0aGlzLmRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuaXNWYWxpZCgpKSB0aGlzLmRhdGUgPSBtb21lbnQodGhpcy5kYXRlKS5hZGQoMSwgJ21vbnRoJykudG9JU09TdHJpbmcoKTtcbiAgICAgIGVsc2UgdGhpcy5kYXRlID0gbW9tZW50KCkudG9JU09TdHJpbmcoKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
