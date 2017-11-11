var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customAttribute, bindable, noView } from 'aurelia-framework';
let UIBadgeBase = class UIBadgeBase {
    constructor(element, bg) {
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
    attached() {
        if (this.parentEl.classList.contains('ui-button')) {
            this.parentEl.firstElementChild.appendChild(this.badgeEl);
        }
        else {
            this.parentEl.appendChild(this.badgeEl);
        }
        this.parentEl.classList.add('ui-has-badge');
    }
    bind(bindingContext, overrideContext) { this.valueChanged(this.value); }
    valueChanged(newValue) {
        this.badgeEl.classList[newValue ? 'remove' : 'add']('ui-hidden');
        this.badgeEl.dataset['value'] = newValue;
    }
};
UIBadgeBase = __decorate([
    noView(),
    __metadata("design:paramtypes", [Element, String])
], UIBadgeBase);
export { UIBadgeBase };
let UIBadge = class UIBadge extends UIBadgeBase {
    constructor(element) {
        super(element, 'ui-gray');
        this.element = element;
        this.theme = 'gray';
        this.value = '';
    }
    bind() {
        this.valueChanged(this.value);
        this.badgeEl.className = `ui-badge ui-${this.theme}`;
    }
    themeChanged(newValue) {
        this.badgeEl.className = `ui-badge ui-${newValue}`;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIBadge.prototype, "theme", void 0);
__decorate([
    bindable({ primaryProperty: true }),
    __metadata("design:type", Object)
], UIBadge.prototype, "value", void 0);
UIBadge = __decorate([
    autoinject(),
    customAttribute('badge'),
    __metadata("design:paramtypes", [Element])
], UIBadge);
export { UIBadge };
let UIBadgeDark = class UIBadgeDark extends UIBadgeBase {
    constructor(element) {
        super(element, 'ui-dark');
        this.element = element;
    }
};
UIBadgeDark = __decorate([
    autoinject(),
    customAttribute('badge-dark'),
    __metadata("design:paramtypes", [Element])
], UIBadgeDark);
export { UIBadgeDark };
let UIBadgePrimary = class UIBadgePrimary extends UIBadgeBase {
    constructor(element) {
        super(element, 'ui-primary');
        this.element = element;
    }
};
UIBadgePrimary = __decorate([
    autoinject(),
    customAttribute('badge-primary'),
    __metadata("design:paramtypes", [Element])
], UIBadgePrimary);
export { UIBadgePrimary };
let UIBadgeSecondary = class UIBadgeSecondary extends UIBadgeBase {
    constructor(element) {
        super(element, 'ui-secondary');
        this.element = element;
    }
};
UIBadgeSecondary = __decorate([
    autoinject(),
    customAttribute('badge-secondary'),
    __metadata("design:paramtypes", [Element])
], UIBadgeSecondary);
export { UIBadgeSecondary };
let UIBadgeInfo = class UIBadgeInfo extends UIBadgeBase {
    constructor(element) {
        super(element, 'ui-info');
        this.element = element;
    }
};
UIBadgeInfo = __decorate([
    autoinject(),
    customAttribute('badge-info'),
    __metadata("design:paramtypes", [Element])
], UIBadgeInfo);
export { UIBadgeInfo };
let UIBadgeDanger = class UIBadgeDanger extends UIBadgeBase {
    constructor(element) {
        super(element, 'ui-danger');
        this.element = element;
    }
};
UIBadgeDanger = __decorate([
    autoinject(),
    customAttribute('badge-danger'),
    __metadata("design:paramtypes", [Element])
], UIBadgeDanger);
export { UIBadgeDanger };
let UIBadgeSuccess = class UIBadgeSuccess extends UIBadgeBase {
    constructor(element) {
        super(element, 'ui-success');
        this.element = element;
    }
};
UIBadgeSuccess = __decorate([
    autoinject(),
    customAttribute('badge-success'),
    __metadata("design:paramtypes", [Element])
], UIBadgeSuccess);
export { UIBadgeSuccess };
let UIBadgeWarning = class UIBadgeWarning extends UIBadgeBase {
    constructor(element) {
        super(element, 'ui-warning');
        this.element = element;
    }
};
UIBadgeWarning = __decorate([
    autoinject(),
    customAttribute('badge-warning'),
    __metadata("design:paramtypes", [Element])
], UIBadgeWarning);
export { UIBadgeWarning };
