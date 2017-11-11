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
            if (el.classList) {
                el.classList.remove("ui-" + this.prefix + oldTheme);
                el.classList.add("ui-" + this.prefix + newTheme);
            }
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
    var UIThemeLightBg = (function (_super) {
        __extends(UIThemeLightBg, _super);
        function UIThemeLightBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeLightBg.prototype.bind = function () {
            this.value = 'light';
        };
        UIThemeLightBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-light'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeLightBg);
        return UIThemeLightBg;
    }(UIColorBase));
    exports.UIThemeLightBg = UIThemeLightBg;
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
    var UIColorThemeText = (function (_super) {
        __extends(UIColorThemeText, _super);
        function UIColorThemeText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIColorThemeText.prototype.valueChanged = function (newValue) {
            this.changeTheme(this.value, newValue);
        };
        UIColorThemeText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-theme'),
            __metadata("design:paramtypes", [Element])
        ], UIColorThemeText);
        return UIColorThemeText;
    }(UIColorBase));
    exports.UIColorThemeText = UIColorThemeText;
    var UIThemePrimaryText = (function (_super) {
        __extends(UIThemePrimaryText, _super);
        function UIThemePrimaryText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemePrimaryText.prototype.bind = function () {
            this.value = 'primary';
        };
        UIThemePrimaryText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-primary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemePrimaryText);
        return UIThemePrimaryText;
    }(UIColorBase));
    exports.UIThemePrimaryText = UIThemePrimaryText;
    var UIThemeSecondaryText = (function (_super) {
        __extends(UIThemeSecondaryText, _super);
        function UIThemeSecondaryText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeSecondaryText.prototype.bind = function () {
            this.value = 'secondary';
        };
        UIThemeSecondaryText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-secondary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSecondaryText);
        return UIThemeSecondaryText;
    }(UIColorBase));
    exports.UIThemeSecondaryText = UIThemeSecondaryText;
    var UIThemeMutedText = (function (_super) {
        __extends(UIThemeMutedText, _super);
        function UIThemeMutedText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeMutedText.prototype.bind = function () {
            this.value = 'muted';
        };
        UIThemeMutedText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-muted'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeMutedText);
        return UIThemeMutedText;
    }(UIColorBase));
    exports.UIThemeMutedText = UIThemeMutedText;
    var UIThemeDarkText = (function (_super) {
        __extends(UIThemeDarkText, _super);
        function UIThemeDarkText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeDarkText.prototype.bind = function () {
            this.value = 'dark';
        };
        UIThemeDarkText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-dark'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDarkText);
        return UIThemeDarkText;
    }(UIColorBase));
    exports.UIThemeDarkText = UIThemeDarkText;
    var UIThemeLightText = (function (_super) {
        __extends(UIThemeLightText, _super);
        function UIThemeLightText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeLightText.prototype.bind = function () {
            this.value = 'light';
        };
        UIThemeLightText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-light'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeLightText);
        return UIThemeLightText;
    }(UIColorBase));
    exports.UIThemeLightText = UIThemeLightText;
    var UIThemeInfoText = (function (_super) {
        __extends(UIThemeInfoText, _super);
        function UIThemeInfoText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeInfoText.prototype.bind = function () {
            this.value = 'info';
        };
        UIThemeInfoText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-info'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeInfoText);
        return UIThemeInfoText;
    }(UIColorBase));
    exports.UIThemeInfoText = UIThemeInfoText;
    var UIThemeDangerText = (function (_super) {
        __extends(UIThemeDangerText, _super);
        function UIThemeDangerText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeDangerText.prototype.bind = function () {
            this.value = 'danger';
        };
        UIThemeDangerText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-danger'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDangerText);
        return UIThemeDangerText;
    }(UIColorBase));
    exports.UIThemeDangerText = UIThemeDangerText;
    var UIThemeSuccessText = (function (_super) {
        __extends(UIThemeSuccessText, _super);
        function UIThemeSuccessText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeSuccessText.prototype.bind = function () {
            this.value = 'success';
        };
        UIThemeSuccessText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-success'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSuccessText);
        return UIThemeSuccessText;
    }(UIColorBase));
    exports.UIThemeSuccessText = UIThemeSuccessText;
    var UIThemeWarningText = (function (_super) {
        __extends(UIThemeWarningText, _super);
        function UIThemeWarningText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeWarningText.prototype.bind = function () {
            this.value = 'warning';
        };
        UIThemeWarningText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-warning'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeWarningText);
        return UIThemeWarningText;
    }(UIColorBase));
    exports.UIThemeWarningText = UIThemeWarningText;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QU8sQ0FBQyxTQUVmO1lBSGtCLGFBQU8sR0FBUCxPQUFPLENBQVM7WUFFakMsS0FBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7O1FBQ3hCLENBQUM7UUFDRCxpQ0FBSSxHQUFKO1lBQ0UsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDekIsQ0FBQztRQVBVLGtCQUFrQjtZQUY5Qiw4QkFBVSxFQUFFO1lBQ1osbUNBQWUsQ0FBQyxjQUFjLENBQUM7NkNBRUYsT0FBTztXQUR4QixrQkFBa0IsQ0FROUI7UUFBRCx5QkFBQztLQVJELEFBUUMsQ0FSdUMsV0FBVyxHQVFsRDtJQVJZLGdEQUFrQjtJQVkvQjtRQUF3QyxzQ0FBVztRQUNqRCw0QkFBbUIsT0FBZ0I7WUFBbkMsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FFZjtZQUhrQixhQUFPLEdBQVAsT0FBTyxDQUFTO1lBRWpDLEtBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDOztRQUN4QixDQUFDO1FBQ0QsaUNBQUksR0FBSjtZQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLENBQUM7UUFQVSxrQkFBa0I7WUFGOUIsOEJBQVUsRUFBRTtZQUNaLG1DQUFlLENBQUMsY0FBYyxDQUFDOzZDQUVGLE9BQU87V0FEeEIsa0JBQWtCLENBUTlCO1FBQUQseUJBQUM7S0FSRCxBQVFDLENBUnVDLFdBQVcsR0FRbEQ7SUFSWSxnREFBa0IiLCJmaWxlIjoiYXR0cmlidXRlcy91aS1jb2xvcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5cbmltcG9ydCB7IGF1dG9pbmplY3QsIGN1c3RvbUF0dHJpYnV0ZSwgYmluZGFibGUsIG5vVmlldyB9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7IFVJQnV0dG9uLCBVSUJ1dHRvbkdyb3VwIH0gZnJvbSBcIi4uL2VsZW1lbnRzL2lucHV0cy91aS1idXR0b25cIjtcblxuQG5vVmlldygpXG5leHBvcnQgY2xhc3MgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50WydhdSddICYmIGVsZW1lbnRbJ2F1J10uY29udHJvbGxlcikgdGhpcy52bSA9IGVsZW1lbnRbJ2F1J10uY29udHJvbGxlci52aWV3TW9kZWw7XG4gICAgaWYgKGVsZW1lbnQubm9kZVR5cGUgPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgIHRoaXMucGFyZW50RWwgPSBlbGVtZW50O1xuICAgIH1cbiAgICBpZiAoZWxlbWVudC5ub2RlVHlwZSA9PSBOb2RlLkNPTU1FTlRfTk9ERSkge1xuICAgICAgdGhpcy5wYXJlbnRFbCA9IGVsZW1lbnQucHJldmlvdXNTaWJsaW5nO1xuICAgIH1cbiAgfVxuXG4gIHZtO1xuICBwYXJlbnRFbDtcbiAgcHJlZml4ID0gJyc7XG4gIHZhbHVlID0gJ2RlZmF1bHQnO1xuXG4gIGF0dGFjaGVkKCkge1xuICAgIHRoaXMuY2hhbmdlVGhlbWUoJycsIHRoaXMudmFsdWUpO1xuICB9XG5cbiAgY2hhbmdlVGhlbWUob2xkVGhlbWUsIG5ld1RoZW1lKSB7XG4gICAgbGV0IGVsO1xuICAgIGlmICh0aGlzLnZtIGluc3RhbmNlb2YgVUlCdXR0b24pIHtcbiAgICAgIGlmICghdGhpcy52bS5idXR0b25FbCkgcmV0dXJuO1xuICAgICAgZWwgPSB0aGlzLnZtLmJ1dHRvbkVsO1xuICAgICAgaWYgKCF0aGlzLnZtLnNwbGl0VGhlbWUgfHwgdGhpcy52bS5zcGxpdFRoZW1lID09PSBvbGRUaGVtZSkgdGhpcy52bS5zcGxpdFRoZW1lID0gbmV3VGhlbWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMudm0gaW5zdGFuY2VvZiBVSUJ1dHRvbkdyb3VwKSB7XG4gICAgICBpZiAoIXRoaXMudm0uYnV0dG9ucykgcmV0dXJuO1xuICAgICAgdGhpcy52bS5idXR0b25zLmZvckVhY2goYiA9PiB7XG4gICAgICAgIGIuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGB1aS0ke29sZFRoZW1lfWApO1xuICAgICAgICBiLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChgdWktJHtuZXdUaGVtZX1gKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVsID0gdGhpcy5lbGVtZW50O1xuICAgIH1cbiAgICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGB1aS0ke3RoaXMucHJlZml4fSR7b2xkVGhlbWV9YCk7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGB1aS0ke3RoaXMucHJlZml4fSR7bmV3VGhlbWV9YCk7XG4gICAgfVxuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3RoZW1lJylcbmV4cG9ydCBjbGFzcyBVSUNvbG9yVGhlbWUgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gIH1cbiAgdmFsdWVDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5jaGFuZ2VUaGVtZSh0aGlzLnZhbHVlLCBuZXdWYWx1ZSk7XG4gIH1cbn1cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3ByaW1hcnknKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVQcmltYXJ5IGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdwcmltYXJ5JztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdzZWNvbmRhcnknKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVTZWNvbmRhcnkgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ3NlY29uZGFyeSc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnbXV0ZWQnKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVNdXRlZCBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnbXV0ZWQnO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2RhcmsnKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVEYXJrIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdkYXJrJztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdpbmZvJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lSW5mbyBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnaW5mbyc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnZGFuZ2VyJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lRGFuZ2VyIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdkYW5nZXInO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3N1Y2Nlc3MnKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVTdWNjZXNzIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdzdWNjZXNzJztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCd3YXJuaW5nJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lV2FybmluZyBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnd2FybmluZyc7XG4gIH1cbn1cblxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdiZy10aGVtZScpXG5leHBvcnQgY2xhc3MgVUlDb2xvclRoZW1lQmcgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAnYmctJztcbiAgfVxuICB2YWx1ZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICB0aGlzLmNoYW5nZVRoZW1lKHRoaXMudmFsdWUsIG5ld1ZhbHVlKTtcbiAgfVxufVxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnYmctcHJpbWFyeScpXG5leHBvcnQgY2xhc3MgVUlUaGVtZVByaW1hcnlCZyBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnByZWZpeCA9ICdiZy0nO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdwcmltYXJ5JztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdiZy1zZWNvbmRhcnknKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVTZWNvbmRhcnlCZyBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnByZWZpeCA9ICdiZy0nO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdzZWNvbmRhcnknO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JnLW11dGVkJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lTXV0ZWRCZyBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnByZWZpeCA9ICdiZy0nO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdtdXRlZCc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnYmctZGFyaycpXG5leHBvcnQgY2xhc3MgVUlUaGVtZURhcmtCZyBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnByZWZpeCA9ICdiZy0nO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdkYXJrJztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdiZy1saWdodCcpXG5leHBvcnQgY2xhc3MgVUlUaGVtZUxpZ2h0QmcgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAnYmctJztcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnbGlnaHQnO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JnLWluZm8nKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVJbmZvQmcgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAnYmctJztcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnaW5mbyc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgnYmctZGFuZ2VyJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lRGFuZ2VyQmcgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAnYmctJztcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnZGFuZ2VyJztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCdiZy1zdWNjZXNzJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lU3VjY2Vzc0JnIGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMucHJlZml4ID0gJ2JnLSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ3N1Y2Nlc3MnO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ2JnLXdhcm5pbmcnKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVXYXJuaW5nQmcgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAnYmctJztcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnd2FybmluZyc7XG4gIH1cbn1cblxuXG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3RleHQtdGhlbWUnKVxuZXhwb3J0IGNsYXNzIFVJQ29sb3JUaGVtZVRleHQgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAndGV4dC0nO1xuICB9XG4gIHZhbHVlQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMuY2hhbmdlVGhlbWUodGhpcy52YWx1ZSwgbmV3VmFsdWUpO1xuICB9XG59XG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCd0ZXh0LXByaW1hcnknKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVQcmltYXJ5VGV4dCBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnByZWZpeCA9ICd0ZXh0LSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ3ByaW1hcnknO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3RleHQtc2Vjb25kYXJ5JylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lU2Vjb25kYXJ5VGV4dCBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnByZWZpeCA9ICd0ZXh0LSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ3NlY29uZGFyeSc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgndGV4dC1tdXRlZCcpXG5leHBvcnQgY2xhc3MgVUlUaGVtZU11dGVkVGV4dCBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnByZWZpeCA9ICd0ZXh0LSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ211dGVkJztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCd0ZXh0LWRhcmsnKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVEYXJrVGV4dCBleHRlbmRzIFVJQ29sb3JCYXNlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLnByZWZpeCA9ICd0ZXh0LSc7XG4gIH1cbiAgYmluZCgpIHtcbiAgICB0aGlzLnZhbHVlID0gJ2RhcmsnO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3RleHQtbGlnaHQnKVxuZXhwb3J0IGNsYXNzIFVJVGhlbWVMaWdodFRleHQgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAndGV4dC0nO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdsaWdodCc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgndGV4dC1pbmZvJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lSW5mb1RleHQgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAndGV4dC0nO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdpbmZvJztcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tQXR0cmlidXRlKCd0ZXh0LWRhbmdlcicpXG5leHBvcnQgY2xhc3MgVUlUaGVtZURhbmdlclRleHQgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAndGV4dC0nO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICdkYW5nZXInO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBjdXN0b21BdHRyaWJ1dGUoJ3RleHQtc3VjY2VzcycpXG5leHBvcnQgY2xhc3MgVUlUaGVtZVN1Y2Nlc3NUZXh0IGV4dGVuZHMgVUlDb2xvckJhc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMucHJlZml4ID0gJ3RleHQtJztcbiAgfVxuICBiaW5kKCkge1xuICAgIHRoaXMudmFsdWUgPSAnc3VjY2Vzcyc7XG4gIH1cbn1cblxuQGF1dG9pbmplY3QoKVxuQGN1c3RvbUF0dHJpYnV0ZSgndGV4dC13YXJuaW5nJylcbmV4cG9ydCBjbGFzcyBVSVRoZW1lV2FybmluZ1RleHQgZXh0ZW5kcyBVSUNvbG9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5wcmVmaXggPSAndGV4dC0nO1xuICB9XG4gIGJpbmQoKSB7XG4gICAgdGhpcy52YWx1ZSA9ICd3YXJuaW5nJztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
