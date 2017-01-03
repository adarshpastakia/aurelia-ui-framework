var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
define(["require", "exports", 'aurelia-framework', "./ui-input", "../../utils/ui-event", "../../utils/ui-utils", "moment"], function (require, exports, aurelia_framework_1, ui_input_1, ui_event_1, ui_utils_1, moment) {
    "use strict";
    var UIDateView = (function () {
        function UIDateView(element) {
            var _this = this;
            this.element = element;
            this.date = '';
            this.type = 'd';
            this.title = "";
            this.datePage = 0;
            this.hour = 0;
            this.minute = 0;
            this.dates = [];
            this.months = [];
            this.weekdays = [];
            this.disablePrev = false;
            this.disableNext = false;
            if (element.hasAttribute('time'))
                this.type = 't';
            if (element.hasAttribute('datetime'))
                this.type = 'dt';
            this.obLocale = ui_event_1.UIEvent.subscribe('i18n:locale:changed', function (payload) { return _this.buildDatePage(payload.newValue); });
        }
        UIDateView.prototype.created = function (owningView, myView) { };
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
        UIDateView.prototype.unbind = function () { };
        UIDateView.prototype.dateChanged = function (newValue) {
            if (newValue && moment(newValue).isValid()) {
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
            if (this.minDate && m.isBefore(this.minDate, 'month'))
                c += ' disabled';
            if (this.maxDate && m.isAfter(this.maxDate, 'month'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.yearClass = function (yr) {
            var c = '', y = moment(this.current.toISOString()).year(yr);
            if (this.minDate && y.isBefore(this.minDate, 'year'))
                c += ' disabled';
            if (this.maxDate && y.isAfter(this.maxDate, 'year'))
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
            }
            this.buildDatePage();
            if (changed) {
                this.date = moment(this.current).hour(this.hour).minute(this.minute).toISOString();
                ui_event_1.UIEvent.fireEvent('change', this.element, moment(this.date));
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIDateView.prototype, "date", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateView.prototype, "minDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateView.prototype, "maxDate", void 0);
        UIDateView = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-date-view\" click.trigger=\"clicked($event)\">\n  <div class=\"ui-dv-date-wrapper\">\n    <div class=\"ui-dv-header\">\n      <a class=\"prev ${disablePrev?'disabled':''}\"><ui-glyph glyph=\"ui-chevron-left\"></ui-glyph></a>\n      <a class=\"title\">${title}<ui-glyph glyph=\"ui-caret-up\"></ui-glyph></a>\n      <a class=\"next ${disableNext?'disabled':''}\"><ui-glyph glyph=\"ui-chevron-right\"></ui-glyph></a>\n    </div>\n    <div class=\"ui-dv-container\">\n      <div class=\"weekdays\" if.bind=\"datePage==0\">\n        <span class=\"week\">#</span>\n        <span repeat.for=\"d of weekdays\">${d}</span>\n      </div>\n      <div repeat.for=\"w of dates\" class=\"dates\" if.bind=\"datePage==0\">\n        <span class=\"week\">${w.wk}</span>\n        <span repeat.for=\"d of w.dt\" date.bind=\"d\" class=\"date hover ${dateClass(d)}\">${d.date()}</span>\n      </div>\n      <div repeat.for=\"w of 4\" class=\"months\" if.bind=\"datePage==1\">\n        <span repeat.for=\"d of 3\" month.bind=\"(w*3)+d\" class=\"month hover ${monthClass((w*3)+d, current, minDate, maxDate)}\">${months[(w*3)+d]}</span>\n      </div>\n      <div repeat.for=\"w of 5\" class=\"years\" if.bind=\"datePage==2\">\n          <span repeat.for=\"d of 4\" year.bind=\"(w*4)+d+decade\" class=\"year hover ${yearClass((w*4)+d+decade, current, minDate, maxDate)}\">${(w*4)+d+decade}</span>\n      </div>\n    </div>\n    <div class=\"ui-dv-footer\">\n      <a class=\"today\" if.bind=\"datePage==0\">Today</a>\n      <a class=\"cancel\" if.bind=\"datePage!=0\">Cancel</a>\n    </div>\n  </div>\n  <div class=\"ui-dv-time-wrapper\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-date-view'), 
            __metadata('design:paramtypes', [Element])
        ], UIDateView);
        return UIDateView;
    }());
    exports.UIDateView = UIDateView;
    var UIDateInput = (function (_super) {
        __extends(UIDateInput, _super);
        function UIDateInput(element) {
            _super.call(this);
            this.element = element;
            this.date = '';
            this.format = 'DD MMM YYYY';
            this.width = 'auto';
            this.errors = null;
            this.disabled = false;
            this.readonly = false;
            this.info = '';
            this.placeholder = '';
            this.type = 'd';
            this.elValue = '';
            this.show = false;
            this.clear = false;
            this.ignore = false;
            this.clear = element.hasAttribute('clear');
            if (element.hasAttribute('time')) {
                this.type = 't';
                this.format = 'hh:mm A';
            }
            if (element.hasAttribute('datetime')) {
                this.type = 'dt';
                this.format = 'DD MMM YYYY hh:mm A';
            }
        }
        UIDateInput.prototype.created = function (owningView, myView) { };
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
            this.obMouseup.dispose();
        };
        UIDateInput.prototype.unbind = function () { };
        UIDateInput.prototype.dateChanged = function (newValue) {
            if (newValue && moment(newValue).isValid())
                this.elValue = moment(newValue).format(this.format);
            else
                this.elValue = '';
            this.inputEl.focus();
            this.closeDropdown();
            ui_event_1.UIEvent.fireEvent('change', this.element, newValue || null);
        };
        UIDateInput.prototype.openDropdown = function () {
            if (this.readonly || this.disabled)
                return true;
            this.dropdown.isOpen = true;
            this.dropdown.classList.remove('ui-hidden');
            this.dropdown.au.controller.viewModel.refresh();
            this.tether.position();
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
            this.dropdown.isOpen ? this.closeDropdown() : this.openDropdown();
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
                if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(1, 'day').toISOString();
                else
                    this.date = moment().toISOString();
            }
            if (code === 40) {
                if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(-1, 'day').toISOString();
                else
                    this.date = moment().toISOString();
            }
            if (code === 37) {
                if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(-1, 'month').toISOString();
                else
                    this.date = moment().toISOString();
            }
            if (code === 39) {
                if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(1, 'month').toISOString();
                else
                    this.date = moment().toISOString();
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "date", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "minDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "maxDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "format", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "info", void 0);
        __decorate([
            aurelia_framework_1.bindable(), 
            __metadata('design:type', Object)
        ], UIDateInput.prototype, "placeholder", void 0);
        UIDateInput = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-date\"><div role=\"input\" class=\"ui-input-control\"><slot></slot>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"ui-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" value.bind=\"elValue\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    change.trigger=\"fireEvent($event)\" keydown.trigger=\"keyDown($event)\" click.trigger=\"openDropdown($event, show=true)\"\n    placeholder.bind=\"placeholder\" disabled.bind=\"isDisabled\" readonly.bind=\"!allowSearch || readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-input-addon\" click.trigger=\"openDropdown($event, show=true, inputEl.focus())\"><ui-glyph glyph=\"ui-calendar\"></ui-glyph></span></div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n  <ui-date-view ref=\"dropdown\" class=\"ui-hidden floating\" date.bind=\"date\" min-date.bind=\"minDate\" max-date.bind=\"maxDate\"></ui-date-view>\n</template>"),
            aurelia_framework_1.customElement('ui-date'), 
            __metadata('design:paramtypes', [Element])
        ], UIDateInput);
        return UIDateInput;
    }(ui_input_1.UIBaseInput));
    exports.UIDateInput = UIDateInput;
});
