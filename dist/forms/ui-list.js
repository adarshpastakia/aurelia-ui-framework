var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, bindingMode, customElement, inlineView, PLATFORM, viewResources } from "aurelia-framework";
import { ListMaker } from "./list-maker";
var UIList = /** @class */ (function (_super) {
    __extends(UIList, _super);
    function UIList(element) {
        var _this = _super.call(this, element) || this;
        _this.element = element;
        _this.value = undefined;
        _this.model = undefined;
        _this.name = "";
        _this.height = "20em";
        _this.placeholder = "";
        _this.labelProperty = "";
        _this.valueProperty = "";
        _this.groupProperty = "";
        _this.readonly = false;
        _this.disabled = false;
        _this.noOptionsText = "No Options";
        _this.multiple = element.hasAttribute("multiple");
        _this.template = _this.element.querySelector("template");
        return _this;
    }
    UIList.prototype.bind = function () {
        var _this = this;
        if (!isNull(this.model)) {
            if (this.multiple) {
                this.value = this.multiple
                    ? this.model.map(function (o) { return o[_this.valueProperty] || o; })
                    : this.model[this.labelProperty] || this.model;
            }
        }
        this.isGrouped = !!this.groupProperty;
        this.valueChanged();
    };
    UIList.prototype.attached = function () {
        this.loadOptions();
    };
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIList.prototype, "value", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UIList.prototype, "model", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Array)
    ], UIList.prototype, "errors", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIList.prototype, "name", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIList.prototype, "height", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIList.prototype, "placeholder", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIList.prototype, "labelProperty", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIList.prototype, "valueProperty", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIList.prototype, "groupProperty", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Function)
    ], UIList.prototype, "query", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Array)
    ], UIList.prototype, "options", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIList.prototype, "readonly", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIList.prototype, "disabled", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIList.prototype, "noOptionsText", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Function)
    ], UIList.prototype, "matcher", void 0);
    UIList = __decorate([
        autoinject(),
        customElement("ui-list"),
        viewResources(PLATFORM.moduleName("./input-wrapper"), PLATFORM.moduleName("./list-input"), PLATFORM.moduleName("./list-container")),
        inlineView("<template class=\"ui-input ui-list ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n<input-wrapper model.bind=\"$this\">\n  <slot></slot>\n  <list-input></list-input>\n  <div class=\"ui-list__container\" ref=\"listContainer\" css.bind=\"{height}\">\n    <list-container></list-container>\n  </div>\n</input-wrapper>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UIList);
    return UIList;
}(ListMaker));
export { UIList };
