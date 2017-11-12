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
            _this.dir = '';
            _this.width = 'auto';
            _this.errors = null;
            _this.disabled = false;
            _this.readonly = false;
            _this.helpText = '';
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
            if (this.dropdown.isOpen)
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
        ], UIDateInput.prototype, "dir", void 0);
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
        ], UIDateInput.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "placeholder", void 0);
        UIDateInput = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-date\"><div role=\"input\" class=\"ui-input-control\" dir.bind=\"dir\"><slot></slot>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" value.bind=\"elValue\" size=\"1\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    change.trigger=\"fireEvent($event)\" keydown.trigger=\"keyDown($event)\" click.trigger=\"openDropdown($event, show=true)\"\n    placeholder.bind=\"placeholder\" disabled.bind=\"isDisabled\" readonly.bind=\"!allowSearch || readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-input-addon\" click.trigger=\"toggleDropdown($event)\"><ui-glyph glyph=\"glyph-calendar\"></ui-glyph></span></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n  <ui-date-view ref=\"dropdown\" type.bind=\"type\" class=\"ui-hidden floating\" date.bind=\"date\" min-date.bind=\"minDate\" max-date.bind=\"maxDate\"></ui-date-view>\n</template>"),
            aurelia_framework_1.customElement('ui-date'),
            __metadata("design:paramtypes", [Element])
        ], UIDateInput);
        return UIDateInput;
    }(ui_input_1.UIBaseInput));
    exports.UIDateInput = UIDateInput;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1kYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvRUE7UUFDRSxvQkFBbUIsT0FBZ0I7WUFBbkMsaUJBS0M7WUFMa0IsWUFBTyxHQUFQLE9BQU8sQ0FBUztZQXlCbUIsU0FBSSxHQUFHLEVBQUUsQ0FBQztZQUtwRCxTQUFJLEdBQUcsR0FBRyxDQUFDO1lBSWYsVUFBSyxHQUFHLEVBQUUsQ0FBQztZQUNYLGFBQVEsR0FBRyxDQUFDLENBQUM7WUFDYixhQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRWIsU0FBSSxHQUFHLENBQUMsQ0FBQztZQUNULFdBQU0sR0FBRyxDQUFDLENBQUM7WUFJWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ1gsV0FBTSxHQUFHLEVBQUUsQ0FBQztZQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7WUFFZCxnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUVwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQUNwQixnQkFBVyxHQUFHLEtBQUssQ0FBQztZQXBEMUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRXZELElBQUksQ0FBQyxRQUFRLEdBQUcsa0JBQU8sQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUUsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFD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WUFidkIsOEJBQVUsRUFBRTtZQUNaLDhCQUFVLENBQUMsdXNDQVVBLENBQUM7WUFDWixpQ0FBYSxDQUFDLFNBQVMsQ0FBQzs2Q0FFSyxPQUFPO1dBRHhCLFdBQVcsQ0F3SnZCO1FBQUQsa0JBQUM7S0F4SkQsQUF3SkMsQ0F4SmdDLHNCQUFXLEdBd0ozQztJQXhKWSxrQ0FBVyIsImZpbGUiOiJlbGVtZW50cy9pbnB1dHMvdWktZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE3XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcbmltcG9ydCB7IGF1dG9pbmplY3QsIGN1c3RvbUVsZW1lbnQsIGJpbmRhYmxlLCBiaW5kaW5nTW9kZSwgaW5saW5lVmlldyB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7IFVJQmFzZUlucHV0IH0gZnJvbSBcIi4vdWktaW5wdXRcIjtcbmltcG9ydCB7IFVJRXZlbnQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdWktZXZlbnRcIjtcbmltcG9ydCB7IFVJVXRpbHMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdWktdXRpbHNcIjtcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1kYXRlLXZpZXdcIiBjbGljay50cmlnZ2VyPVwiY2xpY2tlZCgkZXZlbnQpXCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1kdi1kYXRlLXdyYXBwZXJcIiBpZi5iaW5kPVwidHlwZSE9J3QnXCI+XG4gICAgPGRpdiBjbGFzcz1cInVpLWR2LWhlYWRlclwiPlxuICAgICAgPGEgY2xhc3M9XCJwcmV2IFxcJHtkaXNhYmxlUHJldj8nZGlzYWJsZWQnOicnfVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWNoZXZyb24tbGVmdFwiPjwvdWktZ2x5cGg+PC9hPlxuICAgICAgPGEgY2xhc3M9XCJ0aXRsZVwiPlxcJHt0aXRsZX08dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1jYXJldC11cFwiIGlmLmJpbmQ9XCJkYXRlUGFnZSE9MlwiPjwvdWktZ2x5cGg+PC9hPlxuICAgICAgPGEgY2xhc3M9XCJuZXh0IFxcJHtkaXNhYmxlTmV4dD8nZGlzYWJsZWQnOicnfVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWNoZXZyb24tcmlnaHRcIj48L3VpLWdseXBoPjwvYT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidWktZHYtY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwid2Vla2RheXNcIiBpZi5iaW5kPVwiZGF0ZVBhZ2U9PTBcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ3ZWVrXCI+Izwvc3Bhbj5cbiAgICAgICAgPHNwYW4gcmVwZWF0LmZvcj1cImQgb2Ygd2Vla2RheXNcIj5cXCR7ZH08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgcmVwZWF0LmZvcj1cIncgb2YgZGF0ZXNcIiBjbGFzcz1cImRhdGVzXCIgaWYuYmluZD1cImRhdGVQYWdlPT0wXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwid2Vla1wiPlxcJHt3LndrfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gcmVwZWF0LmZvcj1cImQgb2Ygdy5kdFwiIGRhdGUuYmluZD1cImRcIiBjbGFzcz1cImRhdGUgaG92ZXIgXFwke2RhdGVDbGFzcyhkLCBjdXJyZW50LCBtaW5EYXRlLCBtYXhEYXRlKX1cIj4kXFx7ZC5kYXRlKCl9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHJlcGVhdC5mb3I9XCJ3IG9mIDRcIiBjbGFzcz1cIm1vbnRoc1wiIGlmLmJpbmQ9XCJkYXRlUGFnZT09MVwiPlxuICAgICAgICA8c3BhbiByZXBlYXQuZm9yPVwiZCBvZiAzXCIgbW9udGguYmluZD1cIih3KjMpK2RcIiBjbGFzcz1cIm1vbnRoIGhvdmVyIFxcJHttb250aENsYXNzKCh3KjMpK2QsIGN1cnJlbnQsIG1pbkRhdGUsIG1heERhdGUpfVwiPlxcJHttb250aHNbKHcqMykrZF19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHJlcGVhdC5mb3I9XCJ3IG9mIDVcIiBjbGFzcz1cInllYXJzXCIgaWYuYmluZD1cImRhdGVQYWdlPT0yXCI+XG4gICAgICAgICAgPHNwYW4gcmVwZWF0LmZvcj1cImQgb2YgNFwiIHllYXIuYmluZD1cIih3KjQpK2QrZGVjYWRlXCIgY2xhc3M9XCJ5ZWFyIGhvdmVyIFxcJHt5ZWFyQ2xhc3MoKHcqNCkrZCtkZWNhZGUsIGN1cnJlbnQsIG1pbkRhdGUsIG1heERhdGUpfVwiPlxcJHsodyo0KStkK2RlY2FkZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidWktZHYtZm9vdGVyXCI+XG4gICAgICA8YSBjbGFzcz1cInRvZGF5XCIgaWYuYmluZD1cImRhdGVQYWdlPT0wXCI+VG9kYXk8L2E+XG4gICAgICA8YSBjbGFzcz1cImNhbmNlbFwiIGlmLmJpbmQ9XCJkYXRlUGFnZSE9MFwiPkNhbmNlbDwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1kdi10aW1lLXdyYXBwZXJcIiBpZi5iaW5kPVwidHlwZSE9J2QnXCI+XG4gICAgPGRpdiBjbGFzcz1cInRpbWVcIiBpZi5iaW5kPVwidGltZVBhZ2U9PTBcIj5cbiAgICAgIDxkaXY+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtdGltZVwiPjwvdWktZ2x5cGg+PC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8YSBjbGFzcz1cImhvdXItdXAgXFwke2Rpc2FibGVIclVwPydkaXNhYmxlZCc6Jyd9XCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtY2hldnJvbi11cFwiPjwvdWktZ2x5cGg+PC9hPlxuICAgICAgICA8YSBjbGFzcz1cImhvdXJcIj5cXCR7KGhvdXI+MTE/aG91ci0xMjpob3VyKT09MD8nMTInOihob3VyPjExP2hvdXItMTI6aG91cikgfCBudW1iZXI6J3swMH0nfTwvYT5cbiAgICAgICAgPGEgY2xhc3M9XCJob3VyLWRuIFxcJHtkaXNhYmxlSHJEbj8nZGlzYWJsZWQnOicnfVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWNoZXZyb24tZG93blwiPjwvdWktZ2x5cGg+PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2Pjo8L2Rpdj5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxhIGNsYXNzPVwibWludXRlLXVwIFxcJHtkaXNhYmxlTW5VcD8nZGlzYWJsZWQnOicnfVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWNoZXZyb24tdXBcIj48L3VpLWdseXBoPjwvYT5cbiAgICAgICAgPGEgY2xhc3M9XCJtaW51dGVcIj5cXCR7bWludXRlIHwgbnVtYmVyOid7MDB9J308L2E+XG4gICAgICAgIDxhIGNsYXNzPVwibWludXRlLWRuIFxcJHtkaXNhYmxlTW5Ebj8nZGlzYWJsZWQnOicnfVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWNoZXZyb24tZG93blwiPjwvdWktZ2x5cGg+PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PjxhIGNsYXNzPVwidHRcIj5cXCR7aG91cj4xMT8nUE0nOidBTSd9PC9hPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJudW1iZXJzIGhvdXJzXCIgaWYuYmluZD1cInRpbWVQYWdlPT0xXCIgcmVwZWF0LmZvcj1cInIgb2YgMlwiPlxuICAgICAgPHNwYW4gcmVwZWF0LmZvcj1cImggb2YgNlwiIGhvdXIuYmluZD1cIigocio2KSsoaCsxKT09MTI/MDoocio2KSsoaCsxKSkrKGhvdXI+MTE/MTI6MClcIiBjbGFzcz1cImhyIGhvdmVyfVwiXCI+XFwkeyhyKjYpK2grMSB8IG51bWJlcjonezAwfSd9PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJudW1iZXJzIG1pbnV0ZXNcIiBpZi5iaW5kPVwidGltZVBhZ2U9PTJcIiByZXBlYXQuZm9yPVwiciBvZiAyXCI+XG4gICAgICA8c3BhbiByZXBlYXQuZm9yPVwibSBvZiA2XCIgbWludXRlLmJpbmQ9XCIociozMCkrKG0qNSlcIiBjbGFzcz1cIm1uIGhvdmVyfVwiXCI+XFwkeyhyKjMwKSsobSo1KSB8IG51bWJlcjonezAwfSd9PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgaWYuYmluZD1cInRpbWVQYWdlIT0wXCI+XG4gICAgICA8YSBjbGFzcz1cImNhbmNlbFwiPkNhbmNlbDwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktZGF0ZS12aWV3JylcbmV4cG9ydCBjbGFzcyBVSURhdGVWaWV3IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3RpbWUnKSkgdGhpcy50eXBlID0gJ3QnO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0ZXRpbWUnKSkgdGhpcy50eXBlID0gJ2R0JztcclxuXHJcbiAgICB0aGlzLm9iTG9jYWxlID0gVUlFdmVudC5zdWJzY3JpYmUoJ2kxOG46bG9jYWxlOmNoYW5nZWQnLCBwYXlsb2FkID0+IHRoaXMuYnVpbGREYXRlUGFnZShwYXlsb2FkLm5ld1ZhbHVlKSk7XHJcbiAgfVxyXG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICBpZiAodGhpcy5kYXRlICYmIG1vbWVudCh0aGlzLmRhdGUpLmlzVmFsaWQoKSkgdGhpcy5kYXRlID0gbW9tZW50KHRoaXMuZGF0ZSkudG9JU09TdHJpbmcoKTtcbiAgICBpZiAodGhpcy5kYXRlICYmIG1vbWVudCh0aGlzLmRhdGUpLmlzVmFsaWQoKSkgdGhpcy5jdXJyZW50ID0gbW9tZW50KHRoaXMuZGF0ZSk7XG4gICAgZWxzZSBpZiAodGhpcy5taW5EYXRlICYmIG1vbWVudCh0aGlzLm1pbkRhdGUpLmlzVmFsaWQoKSAmJiBtb21lbnQoKS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUpKSB0aGlzLmN1cnJlbnQgPSBtb21lbnQodGhpcy5taW5EYXRlKTtcbiAgICBlbHNlIGlmICh0aGlzLm1heERhdGUgJiYgbW9tZW50KHRoaXMubWF4RGF0ZSkuaXNWYWxpZCgpICYmIG1vbWVudCgpLmlzQWZ0ZXIodGhpcy5tYXhEYXRlKSkgdGhpcy5jdXJyZW50ID0gbW9tZW50KHRoaXMubWF4RGF0ZSk7XG4gICAgZWxzZSB0aGlzLmN1cnJlbnQgPSBtb21lbnQoKTtcbiAgfVxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLmJ1aWxkRGF0ZVBhZ2UoKTtcbiAgfVxuICBkZXRhY2hlZCgpIHtcbiAgICB0aGlzLm9iTG9jYWxlLmRpc3Bvc2UoKTtcbiAgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSBkYXRlID0gJyc7XG5cbiAgQGJpbmRhYmxlKCkgbWluRGF0ZTtcbiAgQGJpbmRhYmxlKCkgbWF4RGF0ZTtcblxuICBAYmluZGFibGUoKSB0eXBlID0gJ2QnO1xuXG4gIHByaXZhdGUgb2JMb2NhbGU7XG5cbiAgcHJpdmF0ZSB0aXRsZSA9IFwiXCI7XG4gIHByaXZhdGUgZGF0ZVBhZ2UgPSAwO1xuICBwcml2YXRlIHRpbWVQYWdlID0gMDtcblxuICBwcml2YXRlIGhvdXIgPSAwO1xuICBwcml2YXRlIG1pbnV0ZSA9IDA7XG4gIHByaXZhdGUgY3VycmVudDtcbiAgcHJpdmF0ZSBkZWNhZGU7XG5cbiAgcHJpdmF0ZSBkYXRlcyA9IFtdO1xuICBwcml2YXRlIG1vbnRocyA9IFtdO1xuICBwcml2YXRlIHdlZWtkYXlzID0gW107XG5cbiAgcHJpdmF0ZSBkaXNhYmxlUHJldiA9IGZhbHNlO1xuICBwcml2YXRlIGRpc2FibGVOZXh0ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBkaXNhYmxlSHJVcCA9IGZhbHNlO1xuICBwcml2YXRlIGRpc2FibGVIckRuID0gZmFsc2U7XG4gIHByaXZhdGUgZGlzYWJsZU1uVXAgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkaXNhYmxlTW5EbiA9IGZhbHNlO1xuXG4gIGRhdGVDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgaWYgKG5ld1ZhbHVlICYmIG1vbWVudChuZXdWYWx1ZSkuaXNWYWxpZCgpKSB7XG4gICAgICBsZXQgdGltZSA9IG1vbWVudChuZXdWYWx1ZSkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApO1xuICAgICAgdGhpcy5ob3VyID0gdGltZS5ob3VyKCk7XG4gICAgICB0aGlzLm1pbnV0ZSA9IHRpbWUubWludXRlKCk7XG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gIH1cblxuICBtaW5EYXRlQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIGlmICh0aGlzLmRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnZGF0ZScpKSB0aGlzLmRhdGUgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLmJ1aWxkRGF0ZVBhZ2UoKTtcbiAgfVxuXG4gIG1heERhdGVDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5pc0FmdGVyKHRoaXMubWF4RGF0ZSwgJ2RhdGUnKSkgdGhpcy5kYXRlID0gbmV3VmFsdWU7XG4gICAgdGhpcy5idWlsZERhdGVQYWdlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2goKSB7XG4gICAgaWYgKHRoaXMubWluRGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUsICdkYXRlJykpIHRoaXMuZGF0ZSA9IHRoaXMubWluRGF0ZTtcbiAgICBpZiAodGhpcy5tYXhEYXRlICYmIG1vbWVudCh0aGlzLmRhdGUpLmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAnZGF0ZScpKSB0aGlzLmRhdGUgPSB0aGlzLm1heERhdGU7XG4gICAgdGhpcy5jdXJyZW50ID0gbW9tZW50KHRoaXMuZGF0ZSk7XG4gICAgdGhpcy5idWlsZERhdGVQYWdlKCk7XG4gIH1cblxuICBwcml2YXRlIGRhdGVDbGFzcyhkdCkge1xuICAgIGxldCBjID0gJyc7XG4gICAgaWYgKCFkdC5pc1NhbWUodGhpcy5jdXJyZW50LCAnbW9udGgnKSkgYyArPSAnIG11dGVkICc7XG4gICAgaWYgKGR0LmlzU2FtZShtb21lbnQoKSwgJ2RheScpKSBjICs9ICcgdG9kYXknO1xuICAgIGlmICh0aGlzLmRhdGUgJiYgZHQuaXNTYW1lKHRoaXMuZGF0ZSwgJ2RheScpKSBjICs9ICcgc2VsZWN0ZWQnO1xuICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgZHQuaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnZGF5JykpIGMgKz0gJyBkaXNhYmxlZCc7XG4gICAgaWYgKHRoaXMubWF4RGF0ZSAmJiBkdC5pc0FmdGVyKHRoaXMubWF4RGF0ZSwgJ2RheScpKSBjICs9ICcgZGlzYWJsZWQnO1xuICAgIHJldHVybiBjO1xuICB9XG4gIHByaXZhdGUgbW9udGhDbGFzcyhtbikge1xuICAgIGxldCBjID0gJycsIG0gPSBtb21lbnQodGhpcy5jdXJyZW50LnRvSVNPU3RyaW5nKCkpLm1vbnRoKG1uKTtcbiAgICBpZiAodGhpcy5kYXRlICYmIG0uaXNTYW1lKHRoaXMuZGF0ZSwgJ21vbnRoJykpIGMgKz0gJyBzZWxlY3RlZCc7XG4gICAgaWYgKHRoaXMubWluRGF0ZSAmJiBtLmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgJ21vbnRoJykpIGMgKz0gJyBkaXNhYmxlZCc7XG4gICAgaWYgKHRoaXMubWF4RGF0ZSAmJiBtLmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAnbW9udGgnKSkgYyArPSAnIGRpc2FibGVkJztcbiAgICByZXR1cm4gYztcbiAgfVxuICBwcml2YXRlIHllYXJDbGFzcyh5cikge1xuICAgIGxldCBjID0gJycsIHkgPSBtb21lbnQodGhpcy5jdXJyZW50LnRvSVNPU3RyaW5nKCkpLnllYXIoeXIpO1xuICAgIGlmICh0aGlzLmRhdGUgJiYgeS5pc1NhbWUodGhpcy5kYXRlLCAneWVhcicpKSBjICs9ICcgc2VsZWN0ZWQnO1xuICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgeS5pc0JlZm9yZSh0aGlzLm1pbkRhdGUsICd5ZWFyJykpIGMgKz0gJyBkaXNhYmxlZCc7XG4gICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB5LmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAneWVhcicpKSBjICs9ICcgZGlzYWJsZWQnO1xuICAgIHJldHVybiBjO1xuICB9XG4gIHByaXZhdGUgaG91ckNsYXNzKGhyKSB7XG4gICAgbGV0IGMgPSAnJywgeSA9IG1vbWVudCh0aGlzLmN1cnJlbnQudG9JU09TdHJpbmcoKSkuaG91cihocik7XG4gICAgaWYgKHRoaXMuZGF0ZSAmJiB5LmlzU2FtZSh0aGlzLmRhdGUsICdob3VyJykpIGMgKz0gJyBzZWxlY3RlZCc7XG4gICAgaWYgKHRoaXMubWluRGF0ZSAmJiB5LmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgJ2hvdXInKSkgYyArPSAnIGRpc2FibGVkJztcbiAgICBpZiAodGhpcy5tYXhEYXRlICYmIHkuaXNBZnRlcih0aGlzLm1heERhdGUsICdob3VyJykpIGMgKz0gJyBkaXNhYmxlZCc7XG4gICAgcmV0dXJuIGM7XG4gIH1cbiAgcHJpdmF0ZSBtaW51dGVDbGFzcyhtbikge1xuICAgIGxldCBjID0gJycsIHkgPSBtb21lbnQodGhpcy5jdXJyZW50LnRvSVNPU3RyaW5nKCkpLm1pbnV0ZShtbik7XG4gICAgaWYgKHRoaXMuZGF0ZSAmJiB5LmlzU2FtZSh0aGlzLmRhdGUsICdtaW51dGUnKSkgYyArPSAnIHNlbGVjdGVkJztcbiAgICBpZiAodGhpcy5taW5EYXRlICYmIHkuaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnbWludXRlJykpIGMgKz0gJyBkaXNhYmxlZCc7XG4gICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB5LmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAnbWludXRlJykpIGMgKz0gJyBkaXNhYmxlZCc7XG4gICAgcmV0dXJuIGM7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkRGF0ZVBhZ2UobmV3TG9jYWxlPykge1xuICAgIGlmICghdGhpcy5jdXJyZW50LmlzVmFsaWQgfHwgIXRoaXMuY3VycmVudC5pc1ZhbGlkKCkpIHJldHVybjtcbiAgICBpZiAobmV3TG9jYWxlKSBtb21lbnQubG9jYWxlKG5ld0xvY2FsZSk7XG5cbiAgICBpZiAodGhpcy5kYXRlUGFnZSA9PSAwKSB7XG4gICAgICB0aGlzLndlZWtkYXlzID0gbW9tZW50LndlZWtkYXlzTWluKCk7XG4gICAgICB0aGlzLnRpdGxlID0gbW9tZW50KHRoaXMuY3VycmVudC50b0lTT1N0cmluZygpKS5mb3JtYXQoJ01NTU0gWVlZWScpO1xuXG4gICAgICBsZXQgc3RhcnQgPSBtb21lbnQodGhpcy5jdXJyZW50KS5zdGFydE9mKCdtb250aCcpO1xuICAgICAgbGV0IGVuZCA9IG1vbWVudCh0aGlzLmN1cnJlbnQpLmVuZE9mKCdtb250aCcpO1xuXG4gICAgICBpZiAoc3RhcnQuZGF5KCkgPCAzKSBzdGFydC5hZGQoLTcsICdkYXknKTtcbiAgICAgIHN0YXJ0LmFkZChzdGFydC5kYXkoKSAqIC0xLCAnZGF5Jyk7XG4gICAgICBlbmQgPSBlbmQuYWRkKDYgLSBlbmQuZGF5KCksICdkYXknKTtcblxuICAgICAgdGhpcy5kYXRlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgdyA9IDA7IHcgPCA2OyB3KyspIHtcbiAgICAgICAgbGV0IHdrID0geyB3azogbW9tZW50KHN0YXJ0KS5hZGQodywgJ3dlZWsnKS53ZWVrKCksIGR0OiBbXSB9XG4gICAgICAgIGZvciAodmFyIGQgPSAwOyBkIDwgNzsgZCsrKSB7XG4gICAgICAgICAgd2suZHQucHVzaChtb21lbnQoc3RhcnQpLmFkZCh3LCAnd2VlaycpLmFkZChkLCAnZGF5JykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0ZXMucHVzaCh3ayk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1pbkRhdGUpIHRoaXMuZGlzYWJsZVByZXYgPSBzdGFydC5pc0JlZm9yZSh0aGlzLm1pbkRhdGUsICdtb250aCcpO1xuICAgICAgaWYgKHRoaXMubWF4RGF0ZSkgdGhpcy5kaXNhYmxlTmV4dCA9IGVuZC5pc0FmdGVyKHRoaXMubWF4RGF0ZSwgJ21vbnRoJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRhdGVQYWdlID09IDEpIHtcbiAgICAgIHRoaXMubW9udGhzID0gbW9tZW50Lm1vbnRocygpO1xuICAgICAgdGhpcy50aXRsZSA9IG1vbWVudCh0aGlzLmN1cnJlbnQudG9JU09TdHJpbmcoKSkuZm9ybWF0KCdZWVlZJyk7XG5cbiAgICAgIGxldCBzdGFydCA9IG1vbWVudCh0aGlzLmN1cnJlbnQpLnN0YXJ0T2YoJ3llYXInKTtcbiAgICAgIGxldCBlbmQgPSBtb21lbnQodGhpcy5jdXJyZW50KS5lbmRPZigneWVhcicpO1xuXG4gICAgICBpZiAodGhpcy5taW5EYXRlKSB0aGlzLmRpc2FibGVQcmV2ID0gc3RhcnQuaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnbW9udGgnKTtcbiAgICAgIGlmICh0aGlzLm1heERhdGUpIHRoaXMuZGlzYWJsZU5leHQgPSBlbmQuaXNBZnRlcih0aGlzLm1heERhdGUsICdtb250aCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRlUGFnZSA9PSAyKSB7XG4gICAgICB0aGlzLmRlY2FkZSA9ICh0aGlzLmN1cnJlbnQueWVhcigpIC0gKHRoaXMuY3VycmVudC55ZWFyKCkgJSAyMCkpICsgMTtcbiAgICAgIHRoaXMudGl0bGUgPSB0aGlzLmRlY2FkZSArICctJyArICh0aGlzLmRlY2FkZSArIDIwKTtcblxuICAgICAgdGhpcy5kaXNhYmxlUHJldiA9ICh0aGlzLm1pbkRhdGUgJiYgdGhpcy5kZWNhZGUgPD0gbW9tZW50KHRoaXMubWluRGF0ZSkueWVhcigpKTtcbiAgICAgIHRoaXMuZGlzYWJsZU5leHQgPSAodGhpcy5tYXhEYXRlICYmIHRoaXMuZGVjYWRlICsgMjAgPj0gbW9tZW50KHRoaXMubWF4RGF0ZSkueWVhcigpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50eXBlICE9ICdkJyAmJiB0aGlzLnRpbWVQYWdlID09IDApIHtcbiAgICAgIGxldCB0aW1lID0gbW9tZW50KHRoaXMuY3VycmVudCkuaG91cih0aGlzLmhvdXIpLm1pbnV0ZSh0aGlzLm1pbnV0ZSkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApO1xuICAgICAgaWYgKHRoaXMubWluRGF0ZSkgdGhpcy5kaXNhYmxlSHJEbiA9IHRpbWUuaXNTYW1lT3JCZWZvcmUodGhpcy5taW5EYXRlLCAnaG91cicpO1xuICAgICAgaWYgKHRoaXMubWF4RGF0ZSkgdGhpcy5kaXNhYmxlSHJVcCA9IHRpbWUuaXNTYW1lT3JBZnRlcih0aGlzLm1heERhdGUsICdob3VyJyk7XG4gICAgICBpZiAodGhpcy5taW5EYXRlKSB0aGlzLmRpc2FibGVNbkRuID0gdGltZS5pc1NhbWVPckJlZm9yZSh0aGlzLm1pbkRhdGUsICdtaW51dGUnKTtcbiAgICAgIGlmICh0aGlzLm1heERhdGUpIHRoaXMuZGlzYWJsZU1uVXAgPSB0aW1lLmlzU2FtZU9yQWZ0ZXIodGhpcy5tYXhEYXRlLCAnbWludXRlJyk7XG5cbiAgICAgIGlmICh0aGlzLm1pbkRhdGUgJiYgdGltZS5pc1NhbWVPckJlZm9yZSh0aGlzLm1pbkRhdGUsICdob3VyJykpIHRoaXMuaG91ciA9IG1vbWVudCh0aGlzLm1pbkRhdGUpLmhvdXIoKTtcbiAgICAgIGlmICh0aGlzLm1heERhdGUgJiYgdGltZS5pc1NhbWVPckFmdGVyKHRoaXMubWF4RGF0ZSwgJ2hvdXInKSkgdGhpcy5ob3VyID0gbW9tZW50KHRoaXMubWF4RGF0ZSkuaG91cigpO1xuICAgICAgaWYgKHRoaXMubWluRGF0ZSAmJiB0aW1lLmlzU2FtZU9yQmVmb3JlKHRoaXMubWluRGF0ZSwgJ21pbnV0ZScpKSB0aGlzLm1pbnV0ZSA9IG1vbWVudCh0aGlzLm1pbkRhdGUpLm1pbnV0ZSgpO1xuICAgICAgaWYgKHRoaXMubWF4RGF0ZSAmJiB0aW1lLmlzU2FtZU9yQWZ0ZXIodGhpcy5tYXhEYXRlLCAnbWludXRlJykpIHRoaXMubWludXRlID0gbW9tZW50KHRoaXMubWF4RGF0ZSkubWludXRlKCk7XG4gICAgfVxuXG4gIH1cblxuICBwcml2YXRlIGNsaWNrZWQoZXZ0KSB7XG4gICAgbGV0IGNoYW5nZWQgPSBmYWxzZVxuICAgIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKSkgcmV0dXJuO1xuXG4gICAgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2RheScpKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSBtb21lbnQoKTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGF0ZScpKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSBtb21lbnQoZXZ0LnRhcmdldFsnZGF0ZSddKTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9udGgnKSkge1xuICAgICAgdGhpcy5jdXJyZW50Lm1vbnRoKGV2dC50YXJnZXRbJ21vbnRoJ10pO1xuICAgICAgdGhpcy5kYXRlUGFnZSA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd5ZWFyJykpIHtcbiAgICAgIHRoaXMuY3VycmVudC55ZWFyKGV2dC50YXJnZXRbJ3llYXInXSk7XG4gICAgICB0aGlzLmRhdGVQYWdlID0gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25leHQnKSkge1xuICAgICAgaWYgKHRoaXMuZGF0ZVBhZ2UgPT0gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBtb21lbnQodGhpcy5jdXJyZW50KS5hZGQoMSwgJ21vbnRoJyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmRhdGVQYWdlID09IDEpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbW9tZW50KHRoaXMuY3VycmVudCkuYWRkKDEsICd5ZWFyJyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmRhdGVQYWdlID09IDIpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbW9tZW50KHRoaXMuY3VycmVudCkuYWRkKDIwLCAneWVhcicpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncHJldicpKSB7XG4gICAgICBpZiAodGhpcy5kYXRlUGFnZSA9PSAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG1vbWVudCh0aGlzLmN1cnJlbnQpLmFkZCgtMSwgJ21vbnRoJyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmRhdGVQYWdlID09IDEpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gbW9tZW50KHRoaXMuY3VycmVudCkuYWRkKC0xLCAneWVhcicpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5kYXRlUGFnZSA9PSAyKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG1vbWVudCh0aGlzLmN1cnJlbnQpLmFkZCgtMjAsICd5ZWFyJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0aXRsZScpKSB7XG4gICAgICBpZiAodGhpcy5kYXRlUGFnZSAhPSAyKSB0aGlzLmRhdGVQYWdlKys7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYW5jZWwnKSkge1xuICAgICAgdGhpcy5kYXRlUGFnZSA9IDA7XG4gICAgICB0aGlzLnRpbWVQYWdlID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2hvdXItdXAnKSkge1xuICAgICAgdGhpcy5ob3VyID09IDIzID8gdGhpcy5ob3VyID0gMCA6IHRoaXMuaG91cisrO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3VyLWRuJykpIHtcbiAgICAgIHRoaXMuaG91ciA9PSAwID8gdGhpcy5ob3VyID0gMjMgOiB0aGlzLmhvdXItLTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWludXRlLXVwJykpIHtcbiAgICAgIHRoaXMubWludXRlID09IDU5ID8gdGhpcy5taW51dGUgPSAwIDogdGhpcy5taW51dGUrKztcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWludXRlLWRuJykpIHtcbiAgICAgIHRoaXMubWludXRlID09IDAgPyB0aGlzLm1pbnV0ZSA9IDU5IDogdGhpcy5taW51dGUtLTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChldnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaG91cicpKSB7XG4gICAgICB0aGlzLnRpbWVQYWdlID0gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ21pbnV0ZScpKSB7XG4gICAgICB0aGlzLnRpbWVQYWdlID0gMjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2hyJykpIHtcbiAgICAgIHRoaXMuaG91ciA9IGV2dC50YXJnZXRbJ2hvdXInXTtcbiAgICAgIHRoaXMudGltZVBhZ2UgPSAwO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGV2dC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtbicpKSB7XG4gICAgICB0aGlzLm1pbnV0ZSA9IGV2dC50YXJnZXRbJ21pbnV0ZSddO1xuICAgICAgdGhpcy50aW1lUGFnZSA9IDA7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3R0JykpIHtcbiAgICAgIHRoaXMuaG91ciA9IHRoaXMuaG91ciArICh0aGlzLmhvdXIgPiAxMSA/IC0xMiA6IDEyKTtcbiAgICAgIHRoaXMudGltZVBhZ2UgPSAwO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuYnVpbGREYXRlUGFnZSgpO1xuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICB0aGlzLmRhdGUgPSBtb21lbnQodGhpcy5jdXJyZW50KS5ob3VyKHRoaXMudHlwZSA9PSAnZCcgPyAwIDogdGhpcy5ob3VyKS5taW51dGUodGhpcy50eXBlID09ICdkJyA/IDAgOiB0aGlzLm1pbnV0ZSkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLnV0YygpLnRvSVNPU3RyaW5nKCk7XG4gICAgICBVSUV2ZW50LmZpcmVFdmVudCgnY2hhbmdlJywgdGhpcy5lbGVtZW50LCBtb21lbnQodGhpcy5kYXRlKSk7XG4gICAgfVxuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1pbnB1dC13cmFwcGVyIHVpLWlucHV0LWRhdGVcIj48ZGl2IHJvbGU9XCJpbnB1dFwiIGNsYXNzPVwidWktaW5wdXQtY29udHJvbFwiIGRpci5iaW5kPVwiZGlyXCI+PHNsb3Q+PC9zbG90PlxuICA8c3BhbiBjbGFzcz1cInVpLWVycm9yXCIgaWYuYmluZD1cImVycm9yc1wiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWludmFsaWRcIj48L3VpLWdseXBoPjx1bCBjbGFzcz1cInVpLWVycm9yLWxpc3RcIj48bGkgcmVwZWF0LmZvcj1cImVyciBvZiBlcnJvcnNcIiBpbm5lcmh0bWwuYmluZD1cImVyclwiPjwvbGk+PC91bD48L3NwYW4+XG4gIDxpbnB1dCByZWY9XCJpbnB1dEVsXCIgdmFsdWUuYmluZD1cImVsVmFsdWVcIiBzaXplPVwiMVwiIGRpci5iaW5kPVwiZGlyXCJcbiAgICBmb2N1cy50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIiBibHVyLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiXG4gICAgY2hhbmdlLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIGtleWRvd24udHJpZ2dlcj1cImtleURvd24oJGV2ZW50KVwiIGNsaWNrLnRyaWdnZXI9XCJvcGVuRHJvcGRvd24oJGV2ZW50LCBzaG93PXRydWUpXCJcbiAgICBwbGFjZWhvbGRlci5iaW5kPVwicGxhY2Vob2xkZXJcIiBkaXNhYmxlZC5iaW5kPVwiaXNEaXNhYmxlZFwiIHJlYWRvbmx5LmJpbmQ9XCIhYWxsb3dTZWFyY2ggfHwgcmVhZG9ubHlcIi8+XG4gIDxzcGFuIGNsYXNzPVwidWktY2xlYXJcIiBpZi5iaW5kPVwiY2xlYXIgJiYgdmFsdWVcIiBjbGljay50cmlnZ2VyPVwiY2xlYXJJbnB1dCgpXCI+JnRpbWVzOzwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJ1aS1pbnB1dC1hZGRvblwiIGNsaWNrLnRyaWdnZXI9XCJ0b2dnbGVEcm9wZG93bigkZXZlbnQpXCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtY2FsZW5kYXJcIj48L3VpLWdseXBoPjwvc3Bhbj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLWlucHV0LWluZm9cIiBpZi5iaW5kPVwiaGVscFRleHRcIiBpbm5lcmh0bWwuYmluZD1cImhlbHBUZXh0XCI+PC9kaXY+XG4gIDx1aS1kYXRlLXZpZXcgcmVmPVwiZHJvcGRvd25cIiB0eXBlLmJpbmQ9XCJ0eXBlXCIgY2xhc3M9XCJ1aS1oaWRkZW4gZmxvYXRpbmdcIiBkYXRlLmJpbmQ9XCJkYXRlXCIgbWluLWRhdGUuYmluZD1cIm1pbkRhdGVcIiBtYXgtZGF0ZS5iaW5kPVwibWF4RGF0ZVwiPjwvdWktZGF0ZS12aWV3PlxuPC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWRhdGUnKVxuZXhwb3J0IGNsYXNzIFVJRGF0ZUlucHV0IGV4dGVuZHMgVUlCYXNlSW5wdXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGVhciA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjbGVhcicpO1xuICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgndGltZScpKSB7XG4gICAgICB0aGlzLnR5cGUgPSAndCc7XG4gICAgICB0aGlzLmZvcm1hdCA9ICdoaDptbSBBJztcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRldGltZScpKSB7XG4gICAgICB0aGlzLnR5cGUgPSAnZHQnO1xuICAgICAgdGhpcy5mb3JtYXQgPSAnREQgTU1NIFlZWVkgaGg6bW0gQSc7XG4gICAgfVxuICAgIHRoaXMub2JMb2NhbGUgPSBVSUV2ZW50LnN1YnNjcmliZSgnaTE4bjpsb2NhbGU6Y2hhbmdlZCcsIHBheWxvYWQgPT4gdGhpcy51cGRhdGVJbnB1dFZhbHVlKHBheWxvYWQubmV3VmFsdWUpKTtcbiAgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgc3VwZXIuYmluZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICghaXNFbXB0eSh0aGlzLmRhdGUpICYmIG1vbWVudCh0aGlzLmRhdGUpLmlzVmFsaWQoKSkge1xuICAgICAgdGhpcy5kYXRlID0gbW9tZW50KHRoaXMuZGF0ZSkudG9JU09TdHJpbmcoKTtcbiAgICAgIHRoaXMuZWxWYWx1ZSA9IG1vbWVudCh0aGlzLmRhdGUpLmZvcm1hdCh0aGlzLmZvcm1hdCk7XG4gICAgfVxuICB9XG4gIGF0dGFjaGVkKCkge1xuICAgIHRoaXMudGV0aGVyID0gVUlVdGlscy50ZXRoZXIodGhpcy5lbGVtZW50LCB0aGlzLmRyb3Bkb3duLCB7IHJlc2l6ZTogZmFsc2UgfSk7XG4gICAgdGhpcy5vYk1vdXNldXAgPSBVSUV2ZW50LnN1YnNjcmliZSgnbW91c2VjbGljaycsIChldnQpID0+IHtcbiAgICAgIGlmIChnZXRQYXJlbnRCeUNsYXNzKGV2dC50YXJnZXQsICd1aS1kYXRlLXZpZXcnKSA9PSB0aGlzLmRyb3Bkb3duKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIH0pO1xuICB9XG4gIGRldGFjaGVkKCkge1xuICAgIHRoaXMudGV0aGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLm9iTG9jYWxlLmRpc3Bvc2UoKTtcbiAgICB0aGlzLm9iTW91c2V1cC5kaXNwb3NlKCk7XG4gIH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgZGF0ZSA9ICcnO1xuXG4gIEBiaW5kYWJsZSgpIG1pbkRhdGU7XG4gIEBiaW5kYWJsZSgpIG1heERhdGU7XG4gIEBiaW5kYWJsZSgpIGZvcm1hdCA9ICdERCBNTU0gWVlZWSc7XG5cbiAgQGJpbmRhYmxlKCkgZGlyID0gJyc7XG4gIEBiaW5kYWJsZSgpIHdpZHRoID0gJ2F1dG8nO1xuICBAYmluZGFibGUoKSBlcnJvcnMgPSBudWxsO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSByZWFkb25seSA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBoZWxwVGV4dCA9ICcnO1xuICBAYmluZGFibGUoKSBwbGFjZWhvbGRlciA9ICcnO1xuXG4gIHByaXZhdGUgdHlwZSA9ICdkJztcbiAgcHJpdmF0ZSBlbFZhbHVlID0gJyc7XG5cbiAgcHJpdmF0ZSBzaG93ID0gZmFsc2U7XG4gIHByaXZhdGUgY2xlYXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpZ25vcmUgPSBmYWxzZTtcblxuICBwcml2YXRlIGRyb3Bkb3duO1xuXG4gIHByb3RlY3RlZCB0ZXRoZXI7XG4gIHByb3RlY3RlZCBvYkxvY2FsZTtcbiAgcHJvdGVjdGVkIG9iTW91c2V1cDtcblxuICBkYXRlQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIGlmIChuZXdWYWx1ZSAmJiBtb21lbnQobmV3VmFsdWUpLmlzVmFsaWQoKSkgdGhpcy5lbFZhbHVlID0gbW9tZW50KG5ld1ZhbHVlKS5mb3JtYXQodGhpcy5mb3JtYXQpO1xuICAgIGVsc2UgdGhpcy5lbFZhbHVlID0gJyc7XG4gICAgaWYgKHRoaXMuZHJvcGRvd24uaXNPcGVuKSB0aGlzLmlucHV0RWwuZm9jdXMoKTtcbiAgICBpZiAodGhpcy50eXBlID09ICdkJykgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ2NoYW5nZScsIHRoaXMuZWxlbWVudCwgbmV3VmFsdWUgfHwgbnVsbCk7XG4gIH1cblxuICB1cGRhdGVJbnB1dFZhbHVlKG5ld0xvY2FsZT8pIHtcbiAgICBpZiAobmV3TG9jYWxlKSBtb21lbnQubG9jYWxlKG5ld0xvY2FsZSk7XG4gICAgaWYgKHRoaXMuZGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5pc1ZhbGlkKCkpIHRoaXMuZWxWYWx1ZSA9IG1vbWVudCh0aGlzLmRhdGUpLmZvcm1hdCh0aGlzLmZvcm1hdCk7XG4gICAgZWxzZSB0aGlzLmVsVmFsdWUgPSAnJztcbiAgfVxuXG4gIG9wZW5Ecm9wZG93bigpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLmRpc2FibGVkKSByZXR1cm4gdHJ1ZTtcbiAgICB0aGlzLmRyb3Bkb3duLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCd1aS1oaWRkZW4nKTtcbiAgICB0aGlzLmRyb3Bkb3duLmF1LmNvbnRyb2xsZXIudmlld01vZGVsLnJlZnJlc2goKTtcbiAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpXG4gIH1cblxuICBjbG9zZURyb3Bkb3duKCkge1xuICAgIHRoaXMuZHJvcGRvd24uaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QuYWRkKCd1aS1oaWRkZW4nKTtcbiAgICB0aGlzLmRyb3Bkb3duLmF1LmNvbnRyb2xsZXIudmlld01vZGVsLmRhdGVQYWdlID0gMDtcbiAgfVxuXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCwgZm9yY2VDbG9zZSA9IGZhbHNlKSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2dC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIHRoaXMuc2hvdyB8fCB0aGlzLmRyb3Bkb3duLmlzT3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bigpIDogdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93O1xuICB9XG5cbiAgZmlyZUV2ZW50KGV2dCkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBsZXQgZWwgPSBnZXRQYXJlbnRCeUNsYXNzKHRoaXMuZWxlbWVudCwgJ3VpLWlucHV0LWdyb3VwJyk7XG4gICAgaWYgKGV2dC50eXBlID09PSAnZm9jdXMnKSB7XG4gICAgICB0aGlzLmlucHV0RWwuc2VsZWN0KCk7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndWktZm9jdXMnKTtcbiAgICAgIGlmIChlbCkgZWwuY2xhc3NMaXN0LmFkZCgndWktZm9jdXMnKTtcbiAgICB9XG4gICAgaWYgKGV2dC50eXBlID09PSAnYmx1cicpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1mb2N1cycpO1xuICAgICAgaWYgKGVsKSBlbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1mb2N1cycpO1xuICAgIH1cbiAgICBVSUV2ZW50LmZpcmVFdmVudChldnQudHlwZSwgdGhpcy5lbGVtZW50LCB0aGlzLmRhdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBrZXlEb3duKGV2dCkge1xuICAgIGlmIChldnQuY3RybEtleSB8fCBldnQuYWx0S2V5IHx8IGV2dC5tZXRhS2V5IHx8IChldnQua2V5Q29kZSB8fCBldnQud2hpY2gpID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLmRpc2FibGVkKSByZXR1cm4gdHJ1ZTtcbiAgICBsZXQgY29kZSA9IChldnQua2V5Q29kZSB8fCBldnQud2hpY2gpO1xuXG4gICAgLy8gT25FbnRlclByZXNzIGlmIGRyb3Bkb3duIGNsb3NlZCwgZmlyZSBlbnRlcnByZXNzZWRcbiAgICBpZiAoY29kZSA9PSAxMyAmJiAhdGhpcy5kcm9wZG93bi5pc09wZW4pIHtcbiAgICAgIHJldHVybiBVSUV2ZW50LmZpcmVFdmVudCgnZW50ZXJwcmVzc2VkJywgdGhpcy5lbGVtZW50LCB0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNvZGUgPT09IDkpIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IDM4KSB7XG4gICAgICBpZiAodGhpcy5kYXRlICYmIHRoaXMubWF4RGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5hZGQoMSwgJ2RheScpLmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAnZGF0ZScpKSByZXR1cm47XG4gICAgICBlbHNlIGlmICh0aGlzLmRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuaXNWYWxpZCgpKSB0aGlzLmRhdGUgPSBtb21lbnQodGhpcy5kYXRlKS5hZGQoMSwgJ2RheScpLnRvSVNPU3RyaW5nKCk7XG4gICAgICBlbHNlIHRoaXMuZGF0ZSA9IG1vbWVudCgpLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChjb2RlID09PSA0MCkge1xuICAgICAgaWYgKHRoaXMuZGF0ZSAmJiB0aGlzLm1pbkRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuYWRkKC0xLCAnZGF5JykuaXNCZWZvcmUodGhpcy5taW5EYXRlLCAnZGF0ZScpKSByZXR1cm47XG4gICAgICBlbHNlIGlmICh0aGlzLmRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuaXNWYWxpZCgpKSB0aGlzLmRhdGUgPSBtb21lbnQodGhpcy5kYXRlKS5hZGQoLTEsICdkYXknKS50b0lTT1N0cmluZygpO1xuICAgICAgZWxzZSB0aGlzLmRhdGUgPSBtb21lbnQoKS50b0lTT1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoY29kZSA9PT0gMzcpIHsgLy9sZWZ0XG4gICAgICBpZiAodGhpcy5kYXRlICYmIHRoaXMubWluRGF0ZSAmJiBtb21lbnQodGhpcy5kYXRlKS5hZGQoLTEsICdtb250aCcpLmlzQmVmb3JlKHRoaXMubWluRGF0ZSwgJ2RhdGUnKSkgcmV0dXJuO1xuICAgICAgZWxzZSBpZiAodGhpcy5kYXRlICYmIG1vbWVudCh0aGlzLmRhdGUpLmlzVmFsaWQoKSkgdGhpcy5kYXRlID0gbW9tZW50KHRoaXMuZGF0ZSkuYWRkKC0xLCAnbW9udGgnKS50b0lTT1N0cmluZygpO1xuICAgICAgZWxzZSB0aGlzLmRhdGUgPSBtb21lbnQoKS50b0lTT1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoY29kZSA9PT0gMzkpIHsgLy9yaWdodFxuICAgICAgaWYgKHRoaXMuZGF0ZSAmJiB0aGlzLm1heERhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuYWRkKDEsICdtb250aCcpLmlzQWZ0ZXIodGhpcy5tYXhEYXRlLCAnZGF0ZScpKSByZXR1cm47XG4gICAgICBlbHNlIGlmICh0aGlzLmRhdGUgJiYgbW9tZW50KHRoaXMuZGF0ZSkuaXNWYWxpZCgpKSB0aGlzLmRhdGUgPSBtb21lbnQodGhpcy5kYXRlKS5hZGQoMSwgJ21vbnRoJykudG9JU09TdHJpbmcoKTtcbiAgICAgIGVsc2UgdGhpcy5kYXRlID0gbW9tZW50KCkudG9JU09TdHJpbmcoKTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
