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
    var UIRibbon = (function () {
        function UIRibbon(element) {
            this.element = element;
            this.message = '';
            this.theme = 'dark';
            this.ribbon = document.createElement('div');
            this.ribbon.classList.add('ui-ribbon');
            element.appendChild(this.ribbon);
            element['style'].overflow = 'hidden';
            element['style'].position = 'relative';
        }
        UIRibbon.prototype.bind = function (bindingContext, overrideContext) {
            if (isEmpty(this.message))
                this.ribbon.classList.add('ui-hidden');
            this.ribbon.innerHTML = this.message;
            this.ribbon.className = 'ui-ribbon ' + this.theme;
        };
        UIRibbon.prototype.themeChanged = function (newValue) {
            this.ribbon.className = 'ui-ribbon ' + newValue;
        };
        UIRibbon.prototype.messageChanged = function (newValue) {
            if (isEmpty(newValue))
                return this.ribbon.classList.add('ui-hidden');
            this.ribbon.classList.remove('ui-hidden');
            this.ribbon.innerHTML = newValue;
        };
        __decorate([
            aurelia_framework_1.bindable({ primaryProperty: true }),
            __metadata("design:type", Object)
        ], UIRibbon.prototype, "message", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRibbon.prototype, "theme", void 0);
        UIRibbon = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('ribbon'),
            __metadata("design:paramtypes", [Element])
        ], UIRibbon);
        return UIRibbon;
    }());
    exports.UIRibbon = UIRibbon;
});
