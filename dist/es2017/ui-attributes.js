import { bindable, autoinject, customAttribute } from 'aurelia-framework';
import './ui-app-config.js';
import 'aurelia-event-aggregator';
import { U as UIInternal } from './ui-internal.js';
import { _ as __decorate, a as __metadata } from './_tslib.js';
import 'aurelia-logging';
import { U as UITether } from './ui-tether.js';

let UIBadge = class UIBadge {
    constructor(element) {
        this.element = element;
        this.value = "";
        this.icon = "";
        this.theme = "";
        this.tooltip = "";
    }
    attached() {
        if (this.value || this.icon) {
            const vm = getViewModel(this.element);
            const view = UIInternal.compileTemplate(`<template><div class="ui-badge" ui-theme.bind="theme" ui-tooltip.bind="tooltip">
        <ui-icon icon.bind="icon" if.bind="icon"></ui-icon>\${value}
      </div></template>`, this);
            (vm ? (vm.badgeEl ? vm.badgeEl : vm.vmElement) : this.element).appendChild(view.fragment);
            view.attached();
        }
    }
};
__decorate([
    bindable({ primaryProperty: true }),
    __metadata("design:type", String)
], UIBadge.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIBadge.prototype, "icon", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIBadge.prototype, "theme", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIBadge.prototype, "tooltip", void 0);
UIBadge = __decorate([
    autoinject(),
    customAttribute("ui-badge"),
    __metadata("design:paramtypes", [Element])
], UIBadge);

let BaseAttribute = class BaseAttribute {
    constructor(element) {
        this.element = element;
        this.prefix = "";
        this.value = "default";
        this.oldValue = "default";
        this.singular = false;
    }
    bind() {
        this.toggleClass();
    }
    valueChanged() {
        this.toggleClass();
    }
    toggleClass() {
        let el = this.element;
        const vm = getViewModel(this.element);
        if (vm && vm.vmElement) {
            el = vm.vmElement;
        }
        if (el.classList) {
            if (this.oldValue && !this.singular) {
                this.oldValue.split(" ").forEach(p => el.classList.remove(`${this.prefix}--${p.trim()}`));
            }
            else {
                el.classList.remove(`${this.prefix}`);
            }
            this.oldValue = this.value;
            if (this.value && !this.singular) {
                this.value.split(" ").forEach(p => el.classList.add(`${this.prefix}--${p.trim()}`));
            }
            else if (!isFalse(this.value)) {
                el.classList.add(`${this.prefix}`);
            }
        }
    }
};
BaseAttribute = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [Element])
], BaseAttribute);
let UITheme = class UITheme extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-theme";
    }
};
UITheme = __decorate([
    autoinject(),
    customAttribute("ui-theme")
], UITheme);
let UIBg = class UIBg extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-bg";
    }
};
UIBg = __decorate([
    autoinject(),
    customAttribute("ui-bg")
], UIBg);
let UIColor = class UIColor extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-color";
    }
};
UIColor = __decorate([
    autoinject(),
    customAttribute("ui-color")
], UIColor);
let UIHover = class UIHover extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-hover";
    }
};
UIHover = __decorate([
    autoinject(),
    customAttribute("ui-hover")
], UIHover);
let UIShadow = class UIShadow extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-shadow";
    }
};
UIShadow = __decorate([
    autoinject(),
    customAttribute("ui-shadow")
], UIShadow);
let UIPadding = class UIPadding extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-padding";
    }
};
UIPadding = __decorate([
    autoinject(),
    customAttribute("ui-padding")
], UIPadding);
let UIMargin = class UIMargin extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-margin";
    }
};
UIMargin = __decorate([
    autoinject(),
    customAttribute("ui-margin")
], UIMargin);
let UIBorder = class UIBorder extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-border";
    }
};
UIBorder = __decorate([
    autoinject(),
    customAttribute("ui-border")
], UIBorder);
let UIFont = class UIFont extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-font";
    }
};
UIFont = __decorate([
    autoinject(),
    customAttribute("ui-font")
], UIFont);
let UIWeight = class UIWeight extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-weight";
    }
};
UIWeight = __decorate([
    autoinject(),
    customAttribute("ui-weight")
], UIWeight);
let UIText = class UIText extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-text";
    }
};
UIText = __decorate([
    autoinject(),
    customAttribute("ui-text")
], UIText);
let UIAlign = class UIAlign extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-align";
    }
};
UIAlign = __decorate([
    autoinject(),
    customAttribute("ui-align")
], UIAlign);
let UIGutter = class UIGutter extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-gutter";
    }
};
UIGutter = __decorate([
    autoinject(),
    customAttribute("ui-gutter")
], UIGutter);
let UIHide = class UIHide extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-hide";
    }
};
UIHide = __decorate([
    autoinject(),
    customAttribute("ui-hide")
], UIHide);
let UIShow = class UIShow extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-show";
    }
};
UIShow = __decorate([
    autoinject(),
    customAttribute("ui-show")
], UIShow);
let UIClip = class UIClip extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-clip";
        this.singular = true;
    }
    bind() {
        super.bind();
        this.valueChanged();
    }
    valueChanged() {
        this.element.style.cssText = `--line-clamp: ${this.value};`;
    }
};
UIClip = __decorate([
    autoinject(),
    customAttribute("ui-clip")
], UIClip);
let UILine = class UILine extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-line";
        this.singular = true;
    }
    bind() {
        super.bind();
        this.valueChanged();
    }
    valueChanged() {
        this.element.style.cssText = `line-height: ${this.value};`;
    }
};
UILine = __decorate([
    autoinject(),
    customAttribute("ui-line")
], UILine);
let UIPaper = class UIPaper extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-paper";
        this.singular = true;
    }
};
UIPaper = __decorate([
    autoinject(),
    customAttribute("ui-paper")
], UIPaper);
let UILink = class UILink extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-link";
        this.singular = true;
    }
};
UILink = __decorate([
    autoinject(),
    customAttribute("ui-link")
], UILink);
let UIScroll = class UIScroll extends BaseAttribute {
    constructor() {
        super(...arguments);
        this.prefix = "ui-scroll";
    }
};
UIScroll = __decorate([
    autoinject(),
    customAttribute("ui-scroll")
], UIScroll);

var Helpers = /*#__PURE__*/Object.freeze({
  get UITheme () { return UITheme; },
  get UIBg () { return UIBg; },
  get UIColor () { return UIColor; },
  get UIHover () { return UIHover; },
  get UIShadow () { return UIShadow; },
  get UIPadding () { return UIPadding; },
  get UIMargin () { return UIMargin; },
  get UIBorder () { return UIBorder; },
  get UIFont () { return UIFont; },
  get UIWeight () { return UIWeight; },
  get UIText () { return UIText; },
  get UIAlign () { return UIAlign; },
  get UIGutter () { return UIGutter; },
  get UIHide () { return UIHide; },
  get UIShow () { return UIShow; },
  get UIClip () { return UIClip; },
  get UILine () { return UILine; },
  get UIPaper () { return UIPaper; },
  get UILink () { return UILink; },
  get UIScroll () { return UIScroll; }
});

let TooltipEl;
let seed = 0;
let UITooltip = class UITooltip {
    constructor(element) {
        this.element = element;
        this.value = "";
        this.theme = "";
        this.position = "bottom";
        this.id = `tooltip-${seed++}`;
        this.showFn = () => this.show();
        this.hideFn = () => this.hide();
    }
    attached() {
        if (this.element.nodeType === Node.ELEMENT_NODE) {
            this.parentEl = this.element;
        }
        if (this.element.nodeType === Node.COMMENT_NODE) {
            this.parentEl = this.element.previousElementSibling;
        }
        if (!TooltipEl) {
            TooltipEl = document.createElement("div");
            TooltipEl.className = "ui-tooltip";
            TooltipEl.tether = UITether.tether(this.parentEl, TooltipEl, {
                anchorPosition: "tc",
                attachToViewport: true,
                position: "bc",
                resize: false
            });
        }
        this.parentEl.addEventListener("mouseenter", this.showFn);
        this.parentEl.addEventListener("mouseleave", this.hideFn);
    }
    detached() {
        this.hide();
        this.parentEl.removeEventListener("mouseenter", this.showFn);
        this.parentEl.removeEventListener("mouseleave", this.hideFn);
    }
    show() {
        if (isEmpty(this.value)) {
            return;
        }
        TooltipEl.className = `ui-tooltip ui-theme--${this.theme}`;
        TooltipEl.innerHTML = this.value;
        TooltipEl.dataset.id = this.id;
        TooltipEl.dataset.pos = this.position;
        let anchorPosition = "tc";
        let position = "bc";
        switch (this.position) {
            case "right":
                anchorPosition = "cr";
                position = "cl";
                break;
            case "left":
                anchorPosition = "cl";
                position = "cr";
                break;
            case "bottom":
                anchorPosition = "bc";
                position = "tc";
                break;
        }
        TooltipEl.tether.updatePosition(this.parentEl, { position, anchorPosition });
        this.timer = setTimeout(() => (TooltipEl.dataset.open = "true"), 500);
    }
    hide() {
        clearTimeout(this.timer);
        TooltipEl.dataset.open = "false";
    }
    valueChanged() {
        if (TooltipEl && TooltipEl.dataset.open === "true" && TooltipEl.dataset.id === this.id) {
            this.show();
        }
    }
};
__decorate([
    bindable({ primaryProperty: true }),
    __metadata("design:type", Object)
], UITooltip.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITooltip.prototype, "theme", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITooltip.prototype, "position", void 0);
UITooltip = __decorate([
    autoinject(),
    customAttribute("ui-tooltip"),
    __metadata("design:paramtypes", [Element])
], UITooltip);

const Attributes = [UIBadge, UITooltip, ...Object.keys(Helpers).map(k => Helpers[k])];

export { Attributes };
//# sourceMappingURL=ui-attributes.js.map
