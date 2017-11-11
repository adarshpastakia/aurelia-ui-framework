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
define(["require", "exports", "aurelia-framework", "../elements/inputs/ui-button"], function (require, exports, aurelia_framework_1, ui_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIColorBase = (function () {
        function UIColorBase(element) {
            this.element = element;
            this.prefix = '';
            this.value = 'default';
            if (element['au'] && element['au'].controller)
                this.vm = element['au'].controller.viewModel;
            if (element.nodeType == Node.ELEMENT_NODE) {
                this.parentEl = element;
            }
            if (element.nodeType == Node.COMMENT_NODE) {
                this.parentEl = element.previousSibling;
            }
        }
        UIColorBase.prototype.attached = function () {
            this.changeTheme('', this.value);
        };
        UIColorBase.prototype.changeTheme = function (oldTheme, newTheme) {
            var el;
            if (this.vm instanceof ui_button_1.UIButton) {
                if (!this.vm.buttonEl)
                    return;
                el = this.vm.buttonEl;
                if (!this.vm.splitTheme || this.vm.splitTheme === oldTheme)
                    this.vm.splitTheme = newTheme;
            }
            else if (this.vm instanceof ui_button_1.UIButtonGroup) {
                if (!this.vm.buttons)
                    return;
                this.vm.buttons.forEach(function (b) {
                    b.element.classList.remove("ui-" + oldTheme);
                    b.element.classList.add("ui-" + newTheme);
                });
                return;
            }
            else {
                el = this.element;
            }
            el.classList.remove("ui-" + this.prefix + oldTheme);
            el.classList.add("ui-" + this.prefix + newTheme);
        };
        UIColorBase = __decorate([
            aurelia_framework_1.noView(),
            __metadata("design:paramtypes", [Element])
        ], UIColorBase);
        return UIColorBase;
    }());
    exports.UIColorBase = UIColorBase;
    var UIColorTheme = (function (_super) {
        __extends(UIColorTheme, _super);
        function UIColorTheme(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIColorTheme.prototype.valueChanged = function (newValue) {
            this.changeTheme(this.value, newValue);
        };
        UIColorTheme = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('theme'),
            __metadata("design:paramtypes", [Element])
        ], UIColorTheme);
        return UIColorTheme;
    }(UIColorBase));
    exports.UIColorTheme = UIColorTheme;
    var UIThemePrimary = (function (_super) {
        __extends(UIThemePrimary, _super);
        function UIThemePrimary(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemePrimary.prototype.bind = function () {
            this.value = 'primary';
        };
        UIThemePrimary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('primary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemePrimary);
        return UIThemePrimary;
    }(UIColorBase));
    exports.UIThemePrimary = UIThemePrimary;
    var UIThemeSecondary = (function (_super) {
        __extends(UIThemeSecondary, _super);
        function UIThemeSecondary(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeSecondary.prototype.bind = function () {
            this.value = 'secondary';
        };
        UIThemeSecondary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('secondary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSecondary);
        return UIThemeSecondary;
    }(UIColorBase));
    exports.UIThemeSecondary = UIThemeSecondary;
    var UIThemeMuted = (function (_super) {
        __extends(UIThemeMuted, _super);
        function UIThemeMuted(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeMuted.prototype.bind = function () {
            this.value = 'muted';
        };
        UIThemeMuted = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('muted'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeMuted);
        return UIThemeMuted;
    }(UIColorBase));
    exports.UIThemeMuted = UIThemeMuted;
    var UIThemeDark = (function (_super) {
        __extends(UIThemeDark, _super);
        function UIThemeDark(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeDark.prototype.bind = function () {
            this.value = 'dark';
        };
        UIThemeDark = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('dark'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDark);
        return UIThemeDark;
    }(UIColorBase));
    exports.UIThemeDark = UIThemeDark;
    var UIThemeInfo = (function (_super) {
        __extends(UIThemeInfo, _super);
        function UIThemeInfo(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeInfo.prototype.bind = function () {
            this.value = 'info';
        };
        UIThemeInfo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('info'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeInfo);
        return UIThemeInfo;
    }(UIColorBase));
    exports.UIThemeInfo = UIThemeInfo;
    var UIThemeDanger = (function (_super) {
        __extends(UIThemeDanger, _super);
        function UIThemeDanger(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeDanger.prototype.bind = function () {
            this.value = 'danger';
        };
        UIThemeDanger = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('danger'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDanger);
        return UIThemeDanger;
    }(UIColorBase));
    exports.UIThemeDanger = UIThemeDanger;
    var UIThemeSuccess = (function (_super) {
        __extends(UIThemeSuccess, _super);
        function UIThemeSuccess(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeSuccess.prototype.bind = function () {
            this.value = 'success';
        };
        UIThemeSuccess = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('success'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSuccess);
        return UIThemeSuccess;
    }(UIColorBase));
    exports.UIThemeSuccess = UIThemeSuccess;
    var UIThemeWarning = (function (_super) {
        __extends(UIThemeWarning, _super);
        function UIThemeWarning(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeWarning.prototype.bind = function () {
            this.value = 'warning';
        };
        UIThemeWarning = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('warning'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeWarning);
        return UIThemeWarning;
    }(UIColorBase));
    exports.UIThemeWarning = UIThemeWarning;
    var UIColorThemeBg = (function (_super) {
        __extends(UIColorThemeBg, _super);
        function UIColorThemeBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIColorThemeBg.prototype.valueChanged = function (newValue) {
            this.changeTheme(this.value, newValue);
        };
        UIColorThemeBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-theme'),
            __metadata("design:paramtypes", [Element])
        ], UIColorThemeBg);
        return UIColorThemeBg;
    }(UIColorBase));
    exports.UIColorThemeBg = UIColorThemeBg;
    var UIThemePrimaryBg = (function (_super) {
        __extends(UIThemePrimaryBg, _super);
        function UIThemePrimaryBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemePrimaryBg.prototype.bind = function () {
            this.value = 'primary';
        };
        UIThemePrimaryBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-primary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemePrimaryBg);
        return UIThemePrimaryBg;
    }(UIColorBase));
    exports.UIThemePrimaryBg = UIThemePrimaryBg;
    var UIThemeSecondaryBg = (function (_super) {
        __extends(UIThemeSecondaryBg, _super);
        function UIThemeSecondaryBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeSecondaryBg.prototype.bind = function () {
            this.value = 'secondary';
        };
        UIThemeSecondaryBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-secondary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSecondaryBg);
        return UIThemeSecondaryBg;
    }(UIColorBase));
    exports.UIThemeSecondaryBg = UIThemeSecondaryBg;
    var UIThemeMutedBg = (function (_super) {
        __extends(UIThemeMutedBg, _super);
        function UIThemeMutedBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeMutedBg.prototype.bind = function () {
            this.value = 'muted';
        };
        UIThemeMutedBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-muted'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeMutedBg);
        return UIThemeMutedBg;
    }(UIColorBase));
    exports.UIThemeMutedBg = UIThemeMutedBg;
    var UIThemeDarkBg = (function (_super) {
        __extends(UIThemeDarkBg, _super);
        function UIThemeDarkBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeDarkBg.prototype.bind = function () {
            this.value = 'dark';
        };
        UIThemeDarkBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-dark'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDarkBg);
        return UIThemeDarkBg;
    }(UIColorBase));
    exports.UIThemeDarkBg = UIThemeDarkBg;
    var UIThemeInfoBg = (function (_super) {
        __extends(UIThemeInfoBg, _super);
        function UIThemeInfoBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeInfoBg.prototype.bind = function () {
            this.value = 'info';
        };
        UIThemeInfoBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-info'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeInfoBg);
        return UIThemeInfoBg;
    }(UIColorBase));
    exports.UIThemeInfoBg = UIThemeInfoBg;
    var UIThemeDangerBg = (function (_super) {
        __extends(UIThemeDangerBg, _super);
        function UIThemeDangerBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeDangerBg.prototype.bind = function () {
            this.value = 'danger';
        };
        UIThemeDangerBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-danger'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDangerBg);
        return UIThemeDangerBg;
    }(UIColorBase));
    exports.UIThemeDangerBg = UIThemeDangerBg;
    var UIThemeSuccessBg = (function (_super) {
        __extends(UIThemeSuccessBg, _super);
        function UIThemeSuccessBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeSuccessBg.prototype.bind = function () {
            this.value = 'success';
        };
        UIThemeSuccessBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-success'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSuccessBg);
        return UIThemeSuccessBg;
    }(UIColorBase));
    exports.UIThemeSuccessBg = UIThemeSuccessBg;
    var UIThemeWarningBg = (function (_super) {
        __extends(UIThemeWarningBg, _super);
        function UIThemeWarningBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeWarningBg.prototype.bind = function () {
            this.value = 'warning';
        };
        UIThemeWarningBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-warning'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeWarningBg);
        return UIThemeWarningBg;
    }(UIColorBase));
    exports.UIThemeWarningBg = UIThemeWarningBg;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QixDQVE1QjtRQUFELHVCQUFDO0tBUkQsQUFRQyxDQVJxQyxXQUFXLEdBUWhEO0lBUlksNENBQWdCO0lBWTdCO1FBQXNDLG9DQUFXO1FBQy9DLDBCQUFtQixPQUFnQjtZQUFuQyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUVmO1lBSGtCLGFBQU8sR0FBUCxPQUFPLENBQVM7WUFFakMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O1FBQ3RCLENBQUM7UUFDRCwrQkFBSSxHQUFKO1lBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDekIsQ0FBQztRQVBVLGdCQUFnQjtZQUY1Qiw4QkFBVSxFQUFFO1lBQ1osbUNBQWUsQ0FBQyxZQUFZLENBQUM7NkNBRUEsT0FBTztXQUR4QixnQkFBZ0IsQ0FRNUI7UUFBRCx1QkFBQztLQVJELEFBUUMsQ0FScUMsV0FBVyxHQVFoRDtJQVJZLDRDQUFnQiIsImZpbGUiOiJhdHRyaWJ1dGVzL3VpLWNvbG9ycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vXG4vLyBAZGVzY3JpcHRpb24gOlxuLy8gQGF1dGhvciAgICAgIDogQWRhcnNoIFBhc3Rha2lhXG4vLyBAY29weXJpZ2h0ICAgOiAyMDE3XG4vLyBAbGljZW5zZSAgICAgOiBNSVRcblxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tQXR0cmlidXRlLCBiaW5kYWJsZSwgbm9WaWV3IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlCdXR0b24sIFVJQnV0dG9uR3JvdXAgfSBmcm9tIFwiLi4vZWxlbWVudHMvaW5wdXRzL3VpLWJ1dHRvblwiO1xuXG5Abm9WaWV3KClcbmV4cG9ydCBjbGFzcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnRbJ2F1J10gJiYgZWxlbWVudFsnYXUnXS5jb250cm9sbGVyKSB0aGlzLnZtID0gZWxlbWVudFsnYXUnXS5jb250cm9sbGVyLnZpZXdNb2RlbDtcbiAgICBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgdGhpcy5wYXJlbnRFbCA9IGVsZW1lbnQ7XG4gICAgfVxuICAgIGlmIChlbGVtZW50Lm5vZGVUeXBlID09IE5vZGUuQ09NTUVOVF9OT0RFKSB7XG4gICAgICB0aGlzLnBhcmVudEVsID0gZWxlbWVudC5wcmV2aW91c1NpYmxpbmc7XG4gICAgfVxuICB9XG5cbiAgdm07XG4gIHBhcmVudEVsO1xuICBwcmVmaXggPSAnJztcbiAgdmFsdWUgPSAnZGVmYXVsdCc7XG5cbiAgYXR0YWNoZWQoKSB7XG4gICAgdGhpcy5jaGFuZ2VUaGVtZSgnJywgdGhpcy52YWx1ZSk7XG4gIH1cblxuICBjaGFuZ2VUaGVtZShvbGRUaGVtZSwgbmV3VGhlbWUpIHtcbiAgICBsZXQgZWw7XG4gICAgaWYgKHRoaXMudm0gaW5zdGFuY2VvZiBVSUJ1dHRvbikge1xuICAgICAgaWYgKCF0aGlzLnZtLmJ1dHRvbkVsKSByZXR1cm47XG4gICAgICBlbCA9IHRoaXMudm0uYnV0dG9uRWw7XG4gICAgICBpZiAoIXRoaXMudm0uc3BsaXRUaGVtZSB8fCB0aGlzLnZtLnNwbGl0VGhlbWUgPT09IG9sZFRoZW1lKSB0aGlzLnZtLnNwbGl0VGhlbWUgPSBuZXdUaGVtZTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy52bSBpbnN0YW5jZW9mIFVJQnV0dG9uR3JvdXApIHtcbiAgICAgIGlmICghdGhpcy52bS5idXR0b25zKSByZXR1cm47XG4gICAgICB0aGlzLnZtLmJ1dHRvbnMuZm9yRWFjaChiID0+IHtcbiAgICAgICAgYi5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYHVpLSR7b2xkVGhlbWV9YCk7XG4gICAgICAgIGIuZWxlbWVudC5jbGFzc0xpc3QuYWRkKGB1aS0ke25ld1RoZW1lfWApO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZWwgPSB0aGlzLmVsZW1lbnQ7XG4gICAgfVxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYHVpLSR7dGhpcy5wcmVmaXh9JHtvbGRUaGVtZX1gKTtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKGB1aS0ke3RoaXMucHJlZml4fSR7bmV3VGhlbWV9YCk7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgndGhlbWUnKVxuZXhwb3J0IGNsYXNzIFVJQ29sb3JUaGVtZSBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgfVxuICB2YWx1ZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICB0aGlzLmNoYW5nZVRoZW1lKHRoaXMudmFsdWUsIG5ld1ZhbHVlKTtcbiAgfVxufVxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgncHJpbWFyeScpXG5leHBvcnQgY2xhc3MgVUlUaGVtZVByaW1hcnkgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ3ByaW1hcnknO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3NlY29uZGFyeScpXG5leHBvcnQgY2xhc3MgVUlUaGVtZVNlY29uZGFyeSBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnc2Vjb25kYXJ5JztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdtdXRlZCcpXG5leHBvcnQgY2xhc3MgVUlUaGVtZU11dGVkIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdtdXRlZCc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnZGFyaycpXG5leHBvcnQgY2xhc3MgVUlUaGVtZURhcmsgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ2RhcmsnO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2luZm8nKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVJbmZvIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdpbmZvJztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdkYW5nZXInKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVEYW5nZXIgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ2Rhbmdlcic7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnc3VjY2VzcycpXG5leHBvcnQgY2xhc3MgVUlUaGVtZVN1Y2Nlc3MgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ3N1Y2Nlc3MnO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3dhcm5pbmcnKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVXYXJuaW5nIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICd3YXJuaW5nJztcbiAgfVxufVxuXG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JnLXRoZW1lJylcbmV4cG9ydCBjbGFzcyBVSUNvbG9yVGhlbWVCZyBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnByZWZpeCA9ICdiZy0nO1xuICB9XG4gIHZhbHVlQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMuY2hhbmdlVGhlbWUodGhpcy52YWx1ZSwgbmV3VmFsdWUpO1xuICB9XG59XG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdiZy1wcmltYXJ5JylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lUHJpbWFyeUJnIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMucHJlZml4ID0gJ2JnLSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ3ByaW1hcnknO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JnLXNlY29uZGFyeScpXG5leHBvcnQgY2xhc3MgVUlUaGVtZVNlY29uZGFyeUJnIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMucHJlZml4ID0gJ2JnLSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ3NlY29uZGFyeSc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnYmctbXV0ZWQnKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVNdXRlZEJnIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMucHJlZml4ID0gJ2JnLSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ211dGVkJztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdiZy1kYXJrJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lRGFya0JnIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMucHJlZml4ID0gJ2JnLSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ2RhcmsnO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JnLWluZm8nKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVJbmZvQmcgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAnYmctJztcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnaW5mbyc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnYmctZGFuZ2VyJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lRGFuZ2VyQmcgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAnYmctJztcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnZGFuZ2VyJztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdiZy1zdWNjZXNzJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lU3VjY2Vzc0JnIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMucHJlZml4ID0gJ2JnLSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ3N1Y2Nlc3MnO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JnLXdhcm5pbmcnKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVXYXJuaW5nQmcgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAnYmctJztcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnd2FybmluZyc7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
