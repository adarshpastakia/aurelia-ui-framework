var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDropdown = (function () {
        function UIDropdown(element) {
            this.element = element;
            this.items = [];
            this.value = '';
            this.width = '5em';
            this.model = null;
            this.disabled = false;
            this.defaultText = 'Select';
            this.glyph = '';
            this.display = '';
            this.isDisabled = false;
        }
        UIDropdown.prototype.bind = function (bindingContext, overrideContext) {
            this.disabledChanged(this.disabled);
        };
        UIDropdown.prototype.attached = function () {
            var _this = this;
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
            this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                if (getParentByClass(evt.target, 'ui-dropdown') == _this.element)
                    return true;
                _this.element.classList.remove('ui-open');
            });
            this.obLocale = ui_event_1.UIEvent.subscribe('i18n:locale:changed', function (e) { return _this.localeChanged(); });
            ui_event_1.UIEvent.queueTask(function () { return _this.valueChanged(_this.value); });
        };
        UIDropdown.prototype.detached = function () {
            this.tether.dispose();
            this.obMouseup.dispose();
            this.obLocale.dispose();
        };
        UIDropdown.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (this.selected)
                this.selected.element.classList.remove('ui-selected');
            var it = this.items.find(function (it) { return it.value == newValue; });
            if (it) {
                if (it.value != newValue)
                    this.value = it.value;
                this.display = it.element.innerText;
                (this.selected = it).element.classList.add('ui-selected');
                ui_event_1.UIEvent.queueTask(function () { return ui_event_1.UIEvent.fireEvent('change', _this.element, _this.value); });
            }
            else {
                this.display = this.defaultText;
                this.glyph = '';
            }
        };
        UIDropdown.prototype.localeChanged = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var it = _this.items.find(function (it) { return it.value == _this.value; });
                if (it)
                    _this.display = it.element.innerText;
            });
        };
        UIDropdown.prototype.disabledChanged = function (newValue) {
            this.element.classList[(this.isDisabled = this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
        };
        UIDropdown.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UIDropdown.prototype.select = function (evt) {
            var _this = this;
            var params = { value: evt.detail.value, model: evt.detail.model };
            if (typeof this.beforeselect === "function") {
                var ret = this.beforeselect(params);
                if (ret instanceof Promise)
                    ret.then(function (b) {
                        if (b !== false) {
                            _this.doChange(params);
                        }
                    });
                else if (ret !== false) {
                    this.doChange(params);
                }
            }
            else if (ui_event_1.UIEvent.fireEvent('beforeselect', this.element, params) !== false) {
                this.doChange(params);
            }
        };
        UIDropdown.prototype.doChange = function (params) {
            this.value = params.value;
            this.model = params.model;
        };
        UIDropdown.prototype.toggleDropdown = function (evt) {
            this.element.classList[this.element.classList.contains('ui-open') ? 'remove' : 'add']('ui-open');
            this.tether.position();
        };
        __decorate([
            aurelia_framework_1.children('.ui-list-item'),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "items", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "defaultText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "beforeselect", void 0);
        UIDropdown = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-dropdown\" select.trigger=\"select($event)\" click.trigger=\"toggleDropdown($event)\" css.bind=\"{'min-width':width}\">\n  <div class=\"ui-label\">\n  <div class=\"ui-addon-icon\" if.bind=\"glyph\"><ui-glyph class.bind=\"glyph\" glyph.bind=\"glyph\"></ui-glyph></div>\n  <ui-glyph class=\"ui-invalid-icon\" glyph=\"glyph-invalid\"></ui-glyph><span>${display}</span>\n  <ui-glyph class=\"ui-caret\" glyph=\"glyph-caret-down\"></ui-glyph></div>\n  <ul class=\"ui-list-container ui-floating\" ref=\"dropdown\"><slot></slot></ul></template>"),
            aurelia_framework_1.customElement('ui-dropdown'),
            __metadata("design:paramtypes", [Element])
        ], UIDropdown);
        return UIDropdown;
    }());
    exports.UIDropdown = UIDropdown;
    var UIListGroup = (function () {
        function UIListGroup(element) {
            this.element = element;
            this.label = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIListGroup.prototype, "label", void 0);
        UIListGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"ui-list-group\" if.bind=\"label\" innerhtml.bind=\"label\"></div><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-list-group'),
            __metadata("design:paramtypes", [Element])
        ], UIListGroup);
        return UIListGroup;
    }());
    exports.UIListGroup = UIListGroup;
    var UIListItem = (function () {
        function UIListItem(element) {
            this.element = element;
            this.glyph = '';
            this.value = '';
        }
        UIListItem.prototype.hilightItem = function (evt) {
            var h = this.element.parentElement.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
            evt.target.classList.add('ui-hilight');
        };
        UIListItem.prototype.unhilightItem = function (evt) {
            evt.target.classList.remove('ui-hilight');
        };
        UIListItem.prototype.fireSelect = function (evt) {
            ui_event_1.UIEvent.fireEvent('select', this.element, { value: this.value, model: this.model });
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIListItem.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIListItem.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIListItem.prototype, "value", void 0);
        UIListItem = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-list-item\" click.trigger=\"fireSelect($event)\" mouseover.trigger=\"hilightItem($event)\" mouseout.trigger=\"unhilightItem($event)\">\n  <ui-glyph class.bind=\"glyph\" glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph><span if.bind=\"glyph\">&nbsp;</span><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-list-item'),
            __metadata("design:paramtypes", [Element])
        ], UIListItem);
        return UIListItem;
    }());
    exports.UIListItem = UIListItem;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2NvbXBvbmVudHMvdWktZHJvcGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBaUJBO1FBQ0Usb0JBQW1CLE9BQWdCO1lBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7WUF3QlIsVUFBSyxHQUFHLEVBQUUsQ0FBQztZQUVnQixVQUFLLEdBQUcsRUFBRSxDQUFDO1lBRXJELFVBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxVQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2IsYUFBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixnQkFBVyxHQUFHLFFBQVEsQ0FBQztZQUN2QixVQUFLLEdBQUcsRUFBRSxDQUFDO1lBU2YsWUFBTyxHQUFHLEVBQUUsQ0FBQztZQUViLGVBQVUsR0FBRyxLQUFLLENBQUM7UUEzQ1ksQ0FBQztRQUl4Qyx5QkFBSSxHQUFKLFVBQUssY0FBc0IsRUFBRSxlQUF1QjtZQUNsRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsNkJBQVEsR0FBUjtZQUFBLGlCQVFDO1lBUEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxrQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsU0FBUyxHQUFHLGtCQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQUc7Z0JBQ25ELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUM3RSxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLGtC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O1lBQ1osOEJBQVUsQ0FBQywrU0FDNkgsQ0FBQztZQUN6SSxpQ0FBYSxDQUFDLGNBQWMsQ0FBQzs2Q0FFQSxPQUFPO1dBRHhCLFVBQVUsQ0EyQnRCO1FBQUQsaUJBQUM7S0EzQkQsQUEyQkMsSUFBQTtJQTNCWSxnQ0FBVSIsImZpbGUiOiJlbGVtZW50cy9jb21wb25lbnRzL3VpLWRyb3Bkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGJpbmRpbmdNb2RlLCBjaGlsZHJlbiwgaW5saW5lVmlldywgdXNlVmlldywgY29udGFpbmVybGVzcywgVmlldywgRE9NIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gXCIuLi8uLi91dGlscy91aS1ldmVudFwiO1xuaW1wb3J0IHsgVUlVdGlscyB9IGZyb20gXCIuLi8uLi91dGlscy91aS11dGlsc1wiO1xuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktZHJvcGRvd25cIiBzZWxlY3QudHJpZ2dlcj1cInNlbGVjdCgkZXZlbnQpXCIgY2xpY2sudHJpZ2dlcj1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIiBjc3MuYmluZD1cInsnbWluLXdpZHRoJzp3aWR0aH1cIj5cbiAgPGRpdiBjbGFzcz1cInVpLWxhYmVsXCI+XG4gIDxkaXYgY2xhc3M9XCJ1aS1hZGRvbi1pY29uXCIgaWYuYmluZD1cImdseXBoXCI+PHVpLWdseXBoIGNsYXNzLmJpbmQ9XCJnbHlwaFwiIGdseXBoLmJpbmQ9XCJnbHlwaFwiPjwvdWktZ2x5cGg+PC9kaXY+XG4gIDx1aS1nbHlwaCBjbGFzcz1cInVpLWludmFsaWQtaWNvblwiIGdseXBoPVwiZ2x5cGgtaW52YWxpZFwiPjwvdWktZ2x5cGg+PHNwYW4+XFwke2Rpc3BsYXl9PC9zcGFuPlxuICA8dWktZ2x5cGggY2xhc3M9XCJ1aS1jYXJldFwiIGdseXBoPVwiZ2x5cGgtY2FyZXQtZG93blwiPjwvdWktZ2x5cGg+PC9kaXY+XG4gIDx1bCBjbGFzcz1cInVpLWxpc3QtY29udGFpbmVyIHVpLWZsb2F0aW5nXCIgcmVmPVwiZHJvcGRvd25cIj48c2xvdD48L3Nsb3Q+PC91bD48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktZHJvcGRvd24nKVxuZXhwb3J0IGNsYXNzIFVJRHJvcGRvd24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICB0aGlzLmRpc2FibGVkQ2hhbmdlZCh0aGlzLmRpc2FibGVkKTtcbiAgfVxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLnRldGhlciA9IFVJVXRpbHMudGV0aGVyKHRoaXMuZWxlbWVudCwgdGhpcy5kcm9wZG93bik7XG4gICAgdGhpcy5vYk1vdXNldXAgPSBVSUV2ZW50LnN1YnNjcmliZSgnbW91c2VjbGljaycsIChldnQpID0+IHtcbiAgICAgIGlmIChnZXRQYXJlbnRCeUNsYXNzKGV2dC50YXJnZXQsICd1aS1kcm9wZG93bicpID09IHRoaXMuZWxlbWVudCkgcmV0dXJuIHRydWU7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndWktb3BlbicpO1xuICAgIH0pO1xuICAgIHRoaXMub2JMb2NhbGUgPSBVSUV2ZW50LnN1YnNjcmliZSgnaTE4bjpsb2NhbGU6Y2hhbmdlZCcsIGUgPT4gdGhpcy5sb2NhbGVDaGFuZ2VkKCkpO1xuICAgIFVJRXZlbnQucXVldWVUYXNrKCgpID0+IHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpKTtcbiAgfVxuICBkZXRhY2hlZCgpIHtcbiAgICB0aGlzLnRldGhlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5vYk1vdXNldXAuZGlzcG9zZSgpO1xuICAgIHRoaXMub2JMb2NhbGUuZGlzcG9zZSgpO1xuICB9XG4gIC8vIHVuYmluZCgpIHsgfVxuICAvLyBlbmQgYXVyZWxpYSBob29rc1xuXG4gIEBjaGlsZHJlbignLnVpLWxpc3QtaXRlbScpIGl0ZW1zID0gW107XG5cbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgdmFsdWUgPSAnJztcblxuICBAYmluZGFibGUoKSB3aWR0aCA9ICc1ZW0nO1xuICBAYmluZGFibGUoKSBtb2RlbCA9IG51bGw7XG4gIEBiaW5kYWJsZSgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBiaW5kYWJsZSgpIGRlZmF1bHRUZXh0ID0gJ1NlbGVjdCc7XG4gIEBiaW5kYWJsZSgpIGdseXBoID0gJyc7XG5cbiAgQGJpbmRhYmxlKCkgYmVmb3Jlc2VsZWN0OiBhbnk7XG5cbiAgcHJpdmF0ZSB0ZXRoZXI7XG4gIHByaXZhdGUgZHJvcGRvd247XG4gIHByaXZhdGUgb2JNb3VzZXVwO1xuICBwcml2YXRlIG9iTG9jYWxlO1xuICBwcml2YXRlIHNlbGVjdGVkO1xuICBwcml2YXRlIGRpc3BsYXkgPSAnJztcblxuICBwcml2YXRlIGlzRGlzYWJsZWQgPSBmYWxzZTtcblxuICB2YWx1ZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZClcbiAgICAgIHRoaXMuc2VsZWN0ZWQuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1zZWxlY3RlZCcpO1xuXG4gICAgbGV0IGl0ID0gdGhpcy5pdGVtcy5maW5kKGl0ID0+IGl0LnZhbHVlID09IG5ld1ZhbHVlKTtcbiAgICAvLyBpZiAoIWl0KSBpdCA9IHRoaXMuaXRlbXNbMF07XG4gICAgaWYgKGl0KSB7XG4gICAgICBpZiAoaXQudmFsdWUgIT0gbmV3VmFsdWUpIHRoaXMudmFsdWUgPSBpdC52YWx1ZTtcbiAgICAgIHRoaXMuZGlzcGxheSA9IGl0LmVsZW1lbnQuaW5uZXJUZXh0O1xuICAgICAgKHRoaXMuc2VsZWN0ZWQgPSBpdCkuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1zZWxlY3RlZCcpO1xuICAgICAgVUlFdmVudC5xdWV1ZVRhc2soKCkgPT4gVUlFdmVudC5maXJlRXZlbnQoJ2NoYW5nZScsIHRoaXMuZWxlbWVudCwgdGhpcy52YWx1ZSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZGlzcGxheSA9IHRoaXMuZGVmYXVsdFRleHQ7XG4gICAgICB0aGlzLmdseXBoID0gJyc7XG4gICAgfVxuICB9XG5cbiAgbG9jYWxlQ2hhbmdlZCgpIHtcbiAgICBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiB7XG4gICAgICBsZXQgaXQgPSB0aGlzLml0ZW1zLmZpbmQoaXQgPT4gaXQudmFsdWUgPT0gdGhpcy52YWx1ZSk7XG4gICAgICBpZiAoaXQpIHRoaXMuZGlzcGxheSA9IGl0LmVsZW1lbnQuaW5uZXJUZXh0O1xuICAgIH0pO1xuICB9XG5cbiAgZGlzYWJsZWRDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdFsodGhpcy5pc0Rpc2FibGVkID0gdGhpcy5kaXNhYmxlZCA9ICEhbmV3VmFsdWUpID8gJ2FkZCcgOiAncmVtb3ZlJ10oJ3VpLWRpc2FibGVkJyk7XG4gIH1cblxuICBkaXNhYmxlKGIpIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0Wyh0aGlzLmlzRGlzYWJsZWQgPSAoYiB8fCB0aGlzLmRpc2FibGVkKSkgPyAnYWRkJyA6ICdyZW1vdmUnXSgndWktZGlzYWJsZWQnKTtcbiAgfVxuXG4gIHNlbGVjdChldnQpIHtcbiAgICBsZXQgcGFyYW1zID0geyB2YWx1ZTogZXZ0LmRldGFpbC52YWx1ZSwgbW9kZWw6IGV2dC5kZXRhaWwubW9kZWwgfTtcbiAgICBpZiAodHlwZW9mIHRoaXMuYmVmb3Jlc2VsZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGxldCByZXQgPSB0aGlzLmJlZm9yZXNlbGVjdChwYXJhbXMpO1xuICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIFByb21pc2UpIHJldC50aGVuKGIgPT4ge1xuICAgICAgICBpZiAoYiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICB0aGlzLmRvQ2hhbmdlKHBhcmFtcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWxzZSBpZiAocmV0ICE9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmRvQ2hhbmdlKHBhcmFtcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKFVJRXZlbnQuZmlyZUV2ZW50KCdiZWZvcmVzZWxlY3QnLCB0aGlzLmVsZW1lbnQsIHBhcmFtcykgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmRvQ2hhbmdlKHBhcmFtcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkb0NoYW5nZShwYXJhbXMpIHtcbiAgICB0aGlzLnZhbHVlID0gcGFyYW1zLnZhbHVlO1xuICAgIHRoaXMubW9kZWwgPSBwYXJhbXMubW9kZWw7XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bihldnQpIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0W3RoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3VpLW9wZW4nKSA/ICdyZW1vdmUnIDogJ2FkZCddKCd1aS1vcGVuJyk7XG4gICAgdGhpcy50ZXRoZXIucG9zaXRpb24oKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY29udGFpbmVybGVzcygpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlPjxkaXYgY2xhc3M9XCJ1aS1saXN0LWdyb3VwXCIgaWYuYmluZD1cImxhYmVsXCIgaW5uZXJodG1sLmJpbmQ9XCJsYWJlbFwiPjwvZGl2PjxzbG90Pjwvc2xvdD48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktbGlzdC1ncm91cCcpXG5leHBvcnQgY2xhc3MgVUlMaXN0R3JvdXAge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIC8vIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHsgfVxuICAvLyBhdHRhY2hlZCgpIHsgfVxuICAvLyBkZXRhY2hlZCgpIHsgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBAYmluZGFibGUoKSBsYWJlbCA9ICcnO1xufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktbGlzdC1pdGVtXCIgY2xpY2sudHJpZ2dlcj1cImZpcmVTZWxlY3QoJGV2ZW50KVwiIG1vdXNlb3Zlci50cmlnZ2VyPVwiaGlsaWdodEl0ZW0oJGV2ZW50KVwiIG1vdXNlb3V0LnRyaWdnZXI9XCJ1bmhpbGlnaHRJdGVtKCRldmVudClcIj5cbiAgPHVpLWdseXBoIGNsYXNzLmJpbmQ9XCJnbHlwaFwiIGdseXBoLmJpbmQ9XCJnbHlwaFwiIGlmLmJpbmQ9XCJnbHlwaFwiPjwvdWktZ2x5cGg+PHNwYW4gaWYuYmluZD1cImdseXBoXCI+Jm5ic3A7PC9zcGFuPjxzbG90Pjwvc2xvdD48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktbGlzdC1pdGVtJylcbmV4cG9ydCBjbGFzcyBVSUxpc3RJdGVtIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICAvLyBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7IH1cbiAgLy8gYXR0YWNoZWQoKSB7IH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKCkgbW9kZWw7XG4gIEBiaW5kYWJsZSgpIGdseXBoID0gJyc7XG4gIEBiaW5kYWJsZSgpIHZhbHVlID0gJyc7XG5cbiAgaGlsaWdodEl0ZW0oZXZ0KSB7XG4gICAgbGV0IGggPSB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudWktbGlzdC1pdGVtLnVpLWhpbGlnaHQnKTtcbiAgICBpZiAoaCAhPT0gbnVsbCkgaC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1oaWxpZ2h0Jyk7XG4gICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QuYWRkKCd1aS1oaWxpZ2h0Jyk7XG4gIH1cbiAgdW5oaWxpZ2h0SXRlbShldnQpIHtcbiAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWhpbGlnaHQnKTtcbiAgfVxuXG4gIGZpcmVTZWxlY3QoZXZ0KSB7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ3NlbGVjdCcsIHRoaXMuZWxlbWVudCwgeyB2YWx1ZTogdGhpcy52YWx1ZSwgbW9kZWw6IHRoaXMubW9kZWwgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
