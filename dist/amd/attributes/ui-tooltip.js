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
define(["require", "exports", "aurelia-framework", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UITooltipBase = (function () {
        function UITooltipBase(element) {
            this.element = element;
            this.theme = 'light';
            this.value = '';
        }
        UITooltipBase_1 = UITooltipBase;
        UITooltipBase.prototype.attached = function () {
            var _this = this;
            if (!UITooltipBase_1.tooltipEl) {
                var el = UITooltipBase_1.tooltipEl = document.createElement('div');
                el.classList.add('ui-tooltip');
                ui_utils_1.UIUtils.overlayContainer.appendChild(el);
            }
            this.element.addEventListener('mouseenter', function () { return _this.show(); });
            this.element.addEventListener('mouseleave', function () { return _this.hide(); });
        };
        UITooltipBase.prototype.detached = function () { this.hide(); };
        UITooltipBase.prototype.unbind = function () { this.hide(); };
        UITooltipBase.prototype.show = function () {
            if (isEmpty(this.value))
                return;
            var el = UITooltipBase_1.tooltipEl;
            el.className = 'ui-tooltip ui-' + this.theme;
            el.innerHTML = this.value;
            this.tether = ui_utils_1.UIUtils.tether(this.element, el, { resize: false, position: 'tc' });
            this.timer = setTimeout(function () { return el.classList.add('ui-show'); }, 700);
        };
        UITooltipBase.prototype.hide = function () {
            clearTimeout(this.timer);
            if (this.tether)
                this.tether.dispose();
            UITooltipBase_1.tooltipEl.className = 'ui-tooltip';
            this.tether = null;
        };
        UITooltipBase = UITooltipBase_1 = __decorate([
            aurelia_framework_1.noView(),
            __metadata("design:paramtypes", [Element])
        ], UITooltipBase);
        return UITooltipBase;
        var UITooltipBase_1;
    }());
    exports.UITooltipBase = UITooltipBase;
    var UITooltip = (function (_super) {
        __extends(UITooltip, _super);
        function UITooltip(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.theme = 'light';
            _this.value = '';
            return _this;
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITooltip.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable({ primaryProperty: true }),
            __metadata("design:type", Object)
        ], UITooltip.prototype, "value", void 0);
        UITooltip = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('tooltip'),
            __metadata("design:paramtypes", [Element])
        ], UITooltip);
        return UITooltip;
    }(UITooltipBase));
    exports.UITooltip = UITooltip;
    var UITooltipDark = (function (_super) {
        __extends(UITooltipDark, _super);
        function UITooltipDark(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.theme = 'dark';
            return _this;
        }
        UITooltipDark = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('tooltip-dark'),
            __metadata("design:paramtypes", [Element])
        ], UITooltipDark);
        return UITooltipDark;
    }(UITooltipBase));
    exports.UITooltipDark = UITooltipDark;
    var UITooltipPrimary = (function (_super) {
        __extends(UITooltipPrimary, _super);
        function UITooltipPrimary(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.theme = 'primary';
            return _this;
        }
        UITooltipPrimary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('tooltip-primary'),
            __metadata("design:paramtypes", [Element])
        ], UITooltipPrimary);
        return UITooltipPrimary;
    }(UITooltipBase));
    exports.UITooltipPrimary = UITooltipPrimary;
    var UITooltipSecondary = (function (_super) {
        __extends(UITooltipSecondary, _super);
        function UITooltipSecondary(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.theme = 'secondary';
            return _this;
        }
        UITooltipSecondary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('tooltip-secondary'),
            __metadata("design:paramtypes", [Element])
        ], UITooltipSecondary);
        return UITooltipSecondary;
    }(UITooltipBase));
    exports.UITooltipSecondary = UITooltipSecondary;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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Q0FBQzs7UUFDM0IsQ0FBQztRQUpVLGtCQUFrQjtZQUY5Qiw4QkFBVSxFQUFFO1lBQ1osbUNBQWUsQ0FBQyxtQkFBbUIsQ0FBQzs2Q0FFUCxPQUFPO1dBRHhCLGtCQUFrQixDQUs5QjtRQUFELHlCQUFDO0tBTEQsQUFLQyxDQUx1QyxhQUFhLEdBS3BEO0lBTFksZ0RBQWtCIiwiZmlsZSI6ImF0dHJpYnV0ZXMvdWktdG9vbHRpcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE3XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcblxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tQXR0cmlidXRlLCBiaW5kYWJsZSwgbm9WaWV3IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gXCIuLi91dGlscy91aS1ldmVudFwiO1xuaW1wb3J0IHsgVUlVdGlscyB9IGZyb20gXCIuLi91dGlscy91aS11dGlsc1wiO1xuXG5Abm9WaWV3KClcbmV4cG9ydCBjbGFzcyBVSVRvb2x0aXBCYXNlIHtcbiAgc3RhdGljIHRvb2x0aXBFbDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG4gIGF0dGFjaGVkKCkge1xuICAgIGlmICghVUlUb29sdGlwQmFzZS50b29sdGlwRWwpIHtcbiAgICAgIGxldCBlbCA9IFVJVG9vbHRpcEJhc2UudG9vbHRpcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCd1aS10b29sdGlwJyk7XG4gICAgICBVSVV0aWxzLm92ZXJsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gdGhpcy5zaG93KCkpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5oaWRlKCkpO1xuICB9XG4gIGRldGFjaGVkKCkgeyB0aGlzLmhpZGUoKTsgfVxuICB1bmJpbmQoKSB7IHRoaXMuaGlkZSgpOyB9XG5cbiAgdGhlbWUgPSAnbGlnaHQnO1xuICB2YWx1ZSA9ICcnO1xuXG4gIHByaXZhdGUgdGV0aGVyO1xuICBwcml2YXRlIHRpbWVyO1xuXG4gIHNob3coKSB7XG4gICAgaWYgKGlzRW1wdHkodGhpcy52YWx1ZSkpIHJldHVybjtcbiAgICBsZXQgZWwgPSBVSVRvb2x0aXBCYXNlLnRvb2x0aXBFbDtcbiAgICBlbC5jbGFzc05hbWUgPSAndWktdG9vbHRpcCB1aS0nICsgdGhpcy50aGVtZTtcbiAgICBlbC5pbm5lckhUTUwgPSB0aGlzLnZhbHVlO1xuICAgIHRoaXMudGV0aGVyID0gVUlVdGlscy50ZXRoZXIodGhpcy5lbGVtZW50LCBlbCwgeyByZXNpemU6IGZhbHNlLCBwb3NpdGlvbjogJ3RjJyB9KTtcbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QuYWRkKCd1aS1zaG93JyksIDcwMCk7XG4gIH1cbiAgaGlkZSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgaWYgKHRoaXMudGV0aGVyKSB0aGlzLnRldGhlci5kaXNwb3NlKCk7XG4gICAgVUlUb29sdGlwQmFzZS50b29sdGlwRWwuY2xhc3NOYW1lID0gJ3VpLXRvb2x0aXAnO1xuICAgIHRoaXMudGV0aGVyID0gbnVsbDtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCd0b29sdGlwJylcbmV4cG9ydCBjbGFzcyBVSVRvb2x0aXAgZXh0ZW5kcyBVSVRvb2x0aXBCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgc3VwZXIoZWxlbWVudCk7IH1cblxuICBAYmluZGFibGUoKSB0aGVtZSA9ICdsaWdodCc7XG4gIEBiaW5kYWJsZSh7IHByaW1hcnlQcm9wZXJ0eTogdHJ1ZSB9KSB2YWx1ZSA9ICcnO1xufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCd0b29sdGlwLWRhcmsnKVxuZXhwb3J0IGNsYXNzIFVJVG9vbHRpcERhcmsgZXh0ZW5kcyBVSVRvb2x0aXBCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnRoZW1lID0gJ2RhcmsnO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3Rvb2x0aXAtcHJpbWFyeScpXG5leHBvcnQgY2xhc3MgVUlUb29sdGlwUHJpbWFyeSBleHRlbmRzIFVJVG9vbHRpcEJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMudGhlbWUgPSAncHJpbWFyeSc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgndG9vbHRpcC1zZWNvbmRhcnknKVxuZXhwb3J0IGNsYXNzIFVJVG9vbHRpcFNlY29uZGFyeSBleHRlbmRzIFVJVG9vbHRpcEJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMudGhlbWUgPSAnc2Vjb25kYXJ5JztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
