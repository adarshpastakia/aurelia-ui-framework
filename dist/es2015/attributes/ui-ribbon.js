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
let UIRibbon = class UIRibbon {
    constructor(element) {
        this.element = element;
        this.message = '';
        this.theme = 'dark';
        this.ribbon = document.createElement('div');
        this.ribbon.classList.add('ui-ribbon');
        element.appendChild(this.ribbon);
        element['style'].overflow = 'hidden';
        element['style'].position = 'relative';
    }
    bind(bindingContext, overrideContext) {
        this.ribbon.innerHTML = this.message;
        this.ribbon.className = 'ui-ribbon ' + this.theme;
    }
    themeChanged(newValue) {
        this.ribbon.className = 'ui-ribbon ' + newValue;
    }
    messageChanged(newValue) {
        this.ribbon.innerHTML = newValue;
    }
};
__decorate([
    bindable({ primaryProperty: true }),
    __metadata("design:type", Object)
], UIRibbon.prototype, "message", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIRibbon.prototype, "theme", void 0);
UIRibbon = __decorate([
    autoinject(),
    customAttribute('ribbon'),
    __metadata("design:paramtypes", [Element])
], UIRibbon);
export { UIRibbon };