var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, customAttribute } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIBadge = /** @class */ (function () {
    function UIBadge(element) {
        this.element = element;
        this.value = "";
        this.icon = "";
        this.theme = "";
        this.tooltip = "";
    }
    UIBadge.prototype.attached = function () {
        if (this.value || this.icon) {
            var vm = getViewModel(this.element);
            var view = UIInternal.compileTemplate("<template><div class=\"ui-badge\" ui-theme.bind=\"theme\" ui-tooltip.bind=\"tooltip\">\n        <div class=\"ui-badge__label\"><ui-icon icon.bind=\"icon\" if.bind=\"icon\"></ui-icon>${value}</div>\n      </div></template>", this);
            (vm && vm.badgeEl ? vm.badgeEl : vm.vmElement || this.element).appendChild(view.fragment);
            view.attached();
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
    return UIBadge;
}());
export { UIBadge };
