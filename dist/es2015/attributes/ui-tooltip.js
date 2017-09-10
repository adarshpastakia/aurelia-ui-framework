var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customAttribute, bindable } from 'aurelia-framework';
import { UIUtils } from "../utils/ui-utils";
let UITooltip = UITooltip_1 = class UITooltip {
    constructor(element) {
        this.element = element;
        this.theme = 'light';
        this.message = '';
        if (!UITooltip_1.tooltipEl) {
            let el = UITooltip_1.tooltipEl = document.createElement('div');
            el.classList.add('ui-tooltip');
            document.body.appendChild(el);
        }
    }
    attached() {
        this.element.addEventListener('mouseenter', () => this.show());
        this.element.addEventListener('mouseleave', () => this.hide());
    }
    detached() { this.hide(); }
    unbind() { this.hide(); }
    show() {
        if (isEmpty(this.message))
            return;
        let el = UITooltip_1.tooltipEl;
        el.className = 'ui-tooltip ' + this.theme;
        el.innerHTML = this.message;
        this.tether = UIUtils.tether(this.element, el, { resize: false, position: 'tc' });
        this.timer = setTimeout(() => el.classList.add('show'), 700);
    }
    hide() {
        clearTimeout(this.timer);
        if (this.tether)
            this.tether.dispose();
        UITooltip_1.tooltipEl.className = 'ui-tooltip';
        this.tether = null;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITooltip.prototype, "theme", void 0);
__decorate([
    bindable({ primaryProperty: true }),
    __metadata("design:type", Object)
], UITooltip.prototype, "message", void 0);
UITooltip = UITooltip_1 = __decorate([
    autoinject(),
    customAttribute('tooltip'),
    __metadata("design:paramtypes", [Element])
], UITooltip);
export { UITooltip };
var UITooltip_1;
