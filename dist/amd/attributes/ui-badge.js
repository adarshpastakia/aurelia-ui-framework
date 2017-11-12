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
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIBadgeBase = (function () {
        function UIBadgeBase(element, bg) {
            this.value = '';
            this.badgeEl = document.createElement('div');
            this.badgeEl.classList.add('ui-badge');
            this.badgeEl.classList.add(bg);
            if (element.nodeType == Node.ELEMENT_NODE) {
                this.parentEl = element;
            }
            if (element.nodeType == Node.COMMENT_NODE) {
                this.parentEl = element.previousSibling;
            }
        }
        UIBadgeBase.prototype.attached = function () {
            if (this.parentEl.classList.contains('ui-button')) {
                this.parentEl.firstElementChild.appendChild(this.badgeEl);
            }
            else {
                this.parentEl.appendChild(this.badgeEl);
            }
            this.parentEl.classList.add('ui-has-badge');
        };
        UIBadgeBase.prototype.bind = function (bindingContext, overrideContext) { this.valueChanged(this.value); };
        UIBadgeBase.prototype.valueChanged = function (newValue) {
            this.badgeEl.classList[newValue ? 'remove' : 'add']('ui-hidden');
            this.badgeEl.dataset['value'] = newValue;
        };
        UIBadgeBase = __decorate([
            aurelia_framework_1.noView(),
            __metadata("design:paramtypes", [Element, String])
        ], UIBadgeBase);
        return UIBadgeBase;
    }());
    exports.UIBadgeBase = UIBadgeBase;
    var UIBadge = (function (_super) {
        __extends(UIBadge, _super);
        function UIBadge(element) {
            var _this = _super.call(this, element, 'ui-gray') || this;
            _this.element = element;
            _this.theme = 'gray';
            _this.value = '';
            return _this;
        }
        UIBadge.prototype.bind = function () {
            this.valueChanged(this.value);
            this.badgeEl.className = "ui-badge ui-" + this.theme;
        };
        UIBadge.prototype.themeChanged = function (newValue) {
            this.badgeEl.className = "ui-badge ui-" + newValue;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIBadge.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable({ primaryProperty: true }),
            __metadata("design:type", Object)
        ], UIBadge.prototype, "value", void 0);
        UIBadge = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge'),
            __metadata("design:paramtypes", [Element])
        ], UIBadge);
        return UIBadge;
    }(UIBadgeBase));
    exports.UIBadge = UIBadge;
    var UIBadgeDark = (function (_super) {
        __extends(UIBadgeDark, _super);
        function UIBadgeDark(element) {
            var _this = _super.call(this, element, 'ui-dark') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeDark = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-dark'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeDark);
        return UIBadgeDark;
    }(UIBadgeBase));
    exports.UIBadgeDark = UIBadgeDark;
    var UIBadgePrimary = (function (_super) {
        __extends(UIBadgePrimary, _super);
        function UIBadgePrimary(element) {
            var _this = _super.call(this, element, 'ui-primary') || this;
            _this.element = element;
            return _this;
        }
        UIBadgePrimary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-primary'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgePrimary);
        return UIBadgePrimary;
    }(UIBadgeBase));
    exports.UIBadgePrimary = UIBadgePrimary;
    var UIBadgeSecondary = (function (_super) {
        __extends(UIBadgeSecondary, _super);
        function UIBadgeSecondary(element) {
            var _this = _super.call(this, element, 'ui-secondary') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeSecondary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-secondary'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeSecondary);
        return UIBadgeSecondary;
    }(UIBadgeBase));
    exports.UIBadgeSecondary = UIBadgeSecondary;
    var UIBadgeInfo = (function (_super) {
        __extends(UIBadgeInfo, _super);
        function UIBadgeInfo(element) {
            var _this = _super.call(this, element, 'ui-info') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeInfo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-info'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeInfo);
        return UIBadgeInfo;
    }(UIBadgeBase));
    exports.UIBadgeInfo = UIBadgeInfo;
    var UIBadgeDanger = (function (_super) {
        __extends(UIBadgeDanger, _super);
        function UIBadgeDanger(element) {
            var _this = _super.call(this, element, 'ui-danger') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeDanger = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-danger'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeDanger);
        return UIBadgeDanger;
    }(UIBadgeBase));
    exports.UIBadgeDanger = UIBadgeDanger;
    var UIBadgeSuccess = (function (_super) {
        __extends(UIBadgeSuccess, _super);
        function UIBadgeSuccess(element) {
            var _this = _super.call(this, element, 'ui-success') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeSuccess = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-success'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeSuccess);
        return UIBadgeSuccess;
    }(UIBadgeBase));
    exports.UIBadgeSuccess = UIBadgeSuccess;
    var UIBadgeWarning = (function (_super) {
        __extends(UIBadgeWarning, _super);
        function UIBadgeWarning(element) {
            var _this = _super.call(this, element, 'ui-warning') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeWarning = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-warning'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeWarning);
        return UIBadgeWarning;
    }(UIBadgeBase));
    exports.UIBadgeWarning = UIBadgeWarning;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0dHJpYnV0ZXMvdWktYmFkZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFBO1FBQ0UscUJBQVksT0FBZ0IsRUFBRSxFQUFVO1lBMEJ4QyxVQUFLLEdBQUcsRUFBRSxDQUFDO1lBekJULElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRS9CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQzFCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFDMUMsQ0FBQztRQUNILENBQUM7UUFHRCw4QkFBUSxHQUFSO1lBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsU0FB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WUFDWixtQ0FBZSxDQUFDLGVBQWUsQ0FBQzs2Q0FFSCxPQUFPO1dBRHhCLGNBQWMsQ0FJMUI7UUFBRCxxQkFBQztLQUpELEFBSUMsQ0FKbUMsV0FBVyxHQUk5QztJQUpZLHdDQUFjIiwiZmlsZSI6ImF0dHJpYnV0ZXMvdWktYmFkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBjdXN0b21BdHRyaWJ1dGUsIGJpbmRhYmxlLCBub1ZpZXcgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5cbkBub1ZpZXcoKVxuZXhwb3J0IGNsYXNzIFVJQmFkZ2VCYXNlIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudCwgYmc6IHN0cmluZykge1xuICAgIHRoaXMuYmFkZ2VFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYmFkZ2VFbC5jbGFzc0xpc3QuYWRkKCd1aS1iYWRnZScpO1xuICAgIHRoaXMuYmFkZ2VFbC5jbGFzc0xpc3QuYWRkKGJnKTtcblxuICAgIGlmIChlbGVtZW50Lm5vZGVUeXBlID09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICB0aGlzLnBhcmVudEVsID0gZWxlbWVudDtcbiAgICB9XG4gICAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT0gTm9kZS5DT01NRU5UX05PREUpIHtcbiAgICAgIHRoaXMucGFyZW50RWwgPSBlbGVtZW50LnByZXZpb3VzU2libGluZztcbiAgICB9XG4gIH1cblxuICBwYXJlbnRFbDtcbiAgYXR0YWNoZWQoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCd1aS1idXR0b24nKSkge1xuICAgICAgdGhpcy5wYXJlbnRFbC5maXJzdEVsZW1lbnRDaGlsZC5hcHBlbmRDaGlsZCh0aGlzLmJhZGdlRWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmVudEVsLmFwcGVuZENoaWxkKHRoaXMuYmFkZ2VFbCk7XG4gICAgfVxuICAgIHRoaXMucGFyZW50RWwuY2xhc3NMaXN0LmFkZCgndWktaGFzLWJhZGdlJyk7XG4gIH1cblxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7IHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpOyB9XG5cbiAgYmFkZ2VFbDtcbiAgdmFsdWUgPSAnJztcbiAgdmFsdWVDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5iYWRnZUVsLmNsYXNzTGlzdFtuZXdWYWx1ZSA/ICdyZW1vdmUnIDogJ2FkZCddKCd1aS1oaWRkZW4nKTtcbiAgICB0aGlzLmJhZGdlRWwuZGF0YXNldFsndmFsdWUnXSA9IG5ld1ZhbHVlO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JhZGdlJylcbmV4cG9ydCBjbGFzcyBVSUJhZGdlIGV4dGVuZHMgVUlCYWRnZUJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQsICd1aS1ncmF5JylcbiAgfVxuXG4gIEBiaW5kYWJsZSgpIHRoZW1lID0gJ2dyYXknO1xuICBAYmluZGFibGUoeyBwcmltYXJ5UHJvcGVydHk6IHRydWUgfSkgdmFsdWUgPSAnJztcblxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xuICAgIHRoaXMuYmFkZ2VFbC5jbGFzc05hbWUgPSBgdWktYmFkZ2UgdWktJHt0aGlzLnRoZW1lfWBcbiAgfVxuICB0aGVtZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICB0aGlzLmJhZGdlRWwuY2xhc3NOYW1lID0gYHVpLWJhZGdlIHVpLSR7bmV3VmFsdWV9YFxuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JhZGdlLWRhcmsnKVxuZXhwb3J0IGNsYXNzIFVJQmFkZ2VEYXJrIGV4dGVuZHMgVUlCYWRnZUJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQsICd1aS1kYXJrJylcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdiYWRnZS1wcmltYXJ5JylcbmV4cG9ydCBjbGFzcyBVSUJhZGdlUHJpbWFyeSBleHRlbmRzIFVJQmFkZ2VCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50LCAndWktcHJpbWFyeScpXG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnYmFkZ2Utc2Vjb25kYXJ5JylcbmV4cG9ydCBjbGFzcyBVSUJhZGdlU2Vjb25kYXJ5IGV4dGVuZHMgVUlCYWRnZUJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQsICd1aS1zZWNvbmRhcnknKVxuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JhZGdlLWluZm8nKVxuZXhwb3J0IGNsYXNzIFVJQmFkZ2VJbmZvIGV4dGVuZHMgVUlCYWRnZUJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQsICd1aS1pbmZvJylcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdiYWRnZS1kYW5nZXInKVxuZXhwb3J0IGNsYXNzIFVJQmFkZ2VEYW5nZXIgZXh0ZW5kcyBVSUJhZGdlQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCwgJ3VpLWRhbmdlcicpXG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnYmFkZ2Utc3VjY2VzcycpXG5leHBvcnQgY2xhc3MgVUlCYWRnZVN1Y2Nlc3MgZXh0ZW5kcyBVSUJhZGdlQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCwgJ3VpLXN1Y2Nlc3MnKVxuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JhZGdlLXdhcm5pbmcnKVxuZXhwb3J0IGNsYXNzIFVJQmFkZ2VXYXJuaW5nIGV4dGVuZHMgVUlCYWRnZUJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQsICd1aS13YXJuaW5nJylcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
