var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customAttribute, noView } from 'aurelia-framework';
import { UIButton, UIButtonGroup } from "../elements/inputs/ui-button";
let UIColorBase = class UIColorBase {
    constructor(element) {
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
    attached() {
        this.changeTheme('', this.value);
    }
    changeTheme(oldTheme, newTheme) {
        let el;
        if (this.vm instanceof UIButton) {
            if (!this.vm.buttonEl)
                return;
            el = this.vm.buttonEl;
            if (!this.vm.splitTheme || this.vm.splitTheme === oldTheme)
                this.vm.splitTheme = newTheme;
        }
        else if (this.vm instanceof UIButtonGroup) {
            if (!this.vm.buttons)
                return;
            this.vm.buttons.forEach(b => {
                b.element.classList.remove(`ui-${oldTheme}`);
                b.element.classList.add(`ui-${newTheme}`);
            });
            return;
        }
        else {
            el = this.element;
        }
        el.classList.remove(`ui-${this.prefix}${oldTheme}`);
        el.classList.add(`ui-${this.prefix}${newTheme}`);
    }
};
UIColorBase = __decorate([
    noView(),
    __metadata("design:paramtypes", [Element])
], UIColorBase);
export { UIColorBase };
let UIColorTheme = class UIColorTheme extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
    }
    valueChanged(newValue) {
        this.changeTheme(this.value, newValue);
    }
};
UIColorTheme = __decorate([
    autoinject(),
    customAttribute('theme'),
    __metadata("design:paramtypes", [Element])
], UIColorTheme);
export { UIColorTheme };
let UIThemePrimary = class UIThemePrimary extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
    }
    bind() {
        this.value = 'primary';
    }
};
UIThemePrimary = __decorate([
    autoinject(),
    customAttribute('primary'),
    __metadata("design:paramtypes", [Element])
], UIThemePrimary);
export { UIThemePrimary };
let UIThemeSecondary = class UIThemeSecondary extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
    }
    bind() {
        this.value = 'secondary';
    }
};
UIThemeSecondary = __decorate([
    autoinject(),
    customAttribute('secondary'),
    __metadata("design:paramtypes", [Element])
], UIThemeSecondary);
export { UIThemeSecondary };
let UIThemeMuted = class UIThemeMuted extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
    }
    bind() {
        this.value = 'muted';
    }
};
UIThemeMuted = __decorate([
    autoinject(),
    customAttribute('muted'),
    __metadata("design:paramtypes", [Element])
], UIThemeMuted);
export { UIThemeMuted };
let UIThemeDark = class UIThemeDark extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
    }
    bind() {
        this.value = 'dark';
    }
};
UIThemeDark = __decorate([
    autoinject(),
    customAttribute('dark'),
    __metadata("design:paramtypes", [Element])
], UIThemeDark);
export { UIThemeDark };
let UIThemeInfo = class UIThemeInfo extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
    }
    bind() {
        this.value = 'info';
    }
};
UIThemeInfo = __decorate([
    autoinject(),
    customAttribute('info'),
    __metadata("design:paramtypes", [Element])
], UIThemeInfo);
export { UIThemeInfo };
let UIThemeDanger = class UIThemeDanger extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
    }
    bind() {
        this.value = 'danger';
    }
};
UIThemeDanger = __decorate([
    autoinject(),
    customAttribute('danger'),
    __metadata("design:paramtypes", [Element])
], UIThemeDanger);
export { UIThemeDanger };
let UIThemeSuccess = class UIThemeSuccess extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
    }
    bind() {
        this.value = 'success';
    }
};
UIThemeSuccess = __decorate([
    autoinject(),
    customAttribute('success'),
    __metadata("design:paramtypes", [Element])
], UIThemeSuccess);
export { UIThemeSuccess };
let UIThemeWarning = class UIThemeWarning extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
    }
    bind() {
        this.value = 'warning';
    }
};
UIThemeWarning = __decorate([
    autoinject(),
    customAttribute('warning'),
    __metadata("design:paramtypes", [Element])
], UIThemeWarning);
export { UIThemeWarning };
let UIColorThemeBg = class UIColorThemeBg extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
        this.prefix = 'bg-';
    }
    valueChanged(newValue) {
        this.changeTheme(this.value, newValue);
    }
};
UIColorThemeBg = __decorate([
    autoinject(),
    customAttribute('bg-theme'),
    __metadata("design:paramtypes", [Element])
], UIColorThemeBg);
export { UIColorThemeBg };
let UIThemePrimaryBg = class UIThemePrimaryBg extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
        this.prefix = 'bg-';
    }
    bind() {
        this.value = 'primary';
    }
};
UIThemePrimaryBg = __decorate([
    autoinject(),
    customAttribute('bg-primary'),
    __metadata("design:paramtypes", [Element])
], UIThemePrimaryBg);
export { UIThemePrimaryBg };
let UIThemeSecondaryBg = class UIThemeSecondaryBg extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
        this.prefix = 'bg-';
    }
    bind() {
        this.value = 'secondary';
    }
};
UIThemeSecondaryBg = __decorate([
    autoinject(),
    customAttribute('bg-secondary'),
    __metadata("design:paramtypes", [Element])
], UIThemeSecondaryBg);
export { UIThemeSecondaryBg };
let UIThemeMutedBg = class UIThemeMutedBg extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
        this.prefix = 'bg-';
    }
    bind() {
        this.value = 'muted';
    }
};
UIThemeMutedBg = __decorate([
    autoinject(),
    customAttribute('bg-muted'),
    __metadata("design:paramtypes", [Element])
], UIThemeMutedBg);
export { UIThemeMutedBg };
let UIThemeDarkBg = class UIThemeDarkBg extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
        this.prefix = 'bg-';
    }
    bind() {
        this.value = 'dark';
    }
};
UIThemeDarkBg = __decorate([
    autoinject(),
    customAttribute('bg-dark'),
    __metadata("design:paramtypes", [Element])
], UIThemeDarkBg);
export { UIThemeDarkBg };
let UIThemeInfoBg = class UIThemeInfoBg extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
        this.prefix = 'bg-';
    }
    bind() {
        this.value = 'info';
    }
};
UIThemeInfoBg = __decorate([
    autoinject(),
    customAttribute('bg-info'),
    __metadata("design:paramtypes", [Element])
], UIThemeInfoBg);
export { UIThemeInfoBg };
let UIThemeDangerBg = class UIThemeDangerBg extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
        this.prefix = 'bg-';
    }
    bind() {
        this.value = 'danger';
    }
};
UIThemeDangerBg = __decorate([
    autoinject(),
    customAttribute('bg-danger'),
    __metadata("design:paramtypes", [Element])
], UIThemeDangerBg);
export { UIThemeDangerBg };
let UIThemeSuccessBg = class UIThemeSuccessBg extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
        this.prefix = 'bg-';
    }
    bind() {
        this.value = 'success';
    }
};
UIThemeSuccessBg = __decorate([
    autoinject(),
    customAttribute('bg-success'),
    __metadata("design:paramtypes", [Element])
], UIThemeSuccessBg);
export { UIThemeSuccessBg };
let UIThemeWarningBg = class UIThemeWarningBg extends UIColorBase {
    constructor(element) {
        super(element);
        this.element = element;
        this.prefix = 'bg-';
    }
    bind() {
        this.value = 'warning';
    }
};
UIThemeWarningBg = __decorate([
    autoinject(),
    customAttribute('bg-warning'),
    __metadata("design:paramtypes", [Element])
], UIThemeWarningBg);
export { UIThemeWarningBg };
