/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, bindingMode, computedFrom, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIDialogElement = /** @class */ (function () {
    function UIDialogElement(element) {
        this.element = element;
        this.label = "";
        this.icon = "";
        this.width = "auto";
        this.minWidth = "36rem";
        this.maxWidth = "100%";
        this.height = "auto";
        this.minHeight = "32rem";
        this.maxHeight = "100%";
        this.help = false;
        this.modal = false;
        this.closeable = true;
        this.maximizable = true;
        this.minimizable = true;
        this.hideToolbox = false;
        this.active = true;
        this.minimized = false;
        this.maximized = false;
        this.position = {
            bottom: "auto",
            left: "0",
            right: "auto",
            top: "0"
        };
        this.help = element.hasAttribute("help.trigger");
    }
    UIDialogElement.prototype.cancel = function () {
        this.close();
    };
    UIDialogElement.prototype.close = function (result) {
        UIInternal.broadcast("dlg:close", { dialog: this, result: result });
    };
    UIDialogElement.prototype.minimize = function () {
        this.minimized = !this.minimized;
        this.active = !this.minimized;
        UIInternal.broadcast("dlg:minimize", { dialog: this });
    };
    UIDialogElement.prototype.activate = function () {
        UIInternal.broadcast("dlg:activate", { dialog: this });
    };
    UIDialogElement.prototype.bind = function () {
        if (this.modal) {
            this.position = { bottom: "auto", left: "auto", right: "auto", top: "auto" };
        }
    };
    UIDialogElement.prototype.attached = function () {
        if (!this.modal) {
            var iconEl = this.element.querySelector(".ui-header__icon .ui-icon");
            var labelEl = this.element.querySelector(".ui-header__title");
            if (iconEl) {
                this.icon = iconEl.au.controller.viewModel.icon;
            }
            if (labelEl) {
                this.label = labelEl.innerText;
            }
            this.taskButton = UIInternal.compileTemplate("<template><ui-button size=\"sm\" ui-theme=\"primary\" type.bind=\"active?'solid':'default'\" label.bind=\"label\" icon.bind=\"icon\"></ui-button></template>", this);
        }
    };
    UIDialogElement.prototype.startDrag = function ($event) {
        $event.stopEvent();
        UIInternal.broadcast("dlg:drag", {
            dialog: this,
            startX: $event.x || $event.clientX,
            startY: $event.y || $event.clientY
        });
    };
    Object.defineProperty(UIDialogElement.prototype, "css", {
        get: function () {
            var pos = __assign({ height: this.height, maxHeight: this.maxHeight, maxWidth: this.maxWidth, minHeight: this.minHeight, minWidth: this.minWidth, width: this.width }, this.position);
            if (this.maximized) {
                pos.top = pos.left = pos.right = pos.bottom = "0";
                pos.width = pos.height = "auto";
            }
            return pos;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIDialogElement.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Object)
    ], UIDialogElement.prototype, "icon", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDialogElement.prototype, "width", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDialogElement.prototype, "minWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDialogElement.prototype, "maxWidth", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDialogElement.prototype, "height", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDialogElement.prototype, "minHeight", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDialogElement.prototype, "maxHeight", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.oneWay }),
        __metadata("design:type", Object)
    ], UIDialogElement.prototype, "help", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.oneTime }),
        __metadata("design:type", Boolean)
    ], UIDialogElement.prototype, "modal", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.oneWay }),
        __metadata("design:type", Boolean)
    ], UIDialogElement.prototype, "closeable", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.oneWay }),
        __metadata("design:type", Boolean)
    ], UIDialogElement.prototype, "maximizable", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.oneWay }),
        __metadata("design:type", Boolean)
    ], UIDialogElement.prototype, "minimizable", void 0);
    __decorate([
        bindable({ defaultBindingMode: bindingMode.oneWay }),
        __metadata("design:type", Boolean)
    ], UIDialogElement.prototype, "hideToolbox", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Function)
    ], UIDialogElement.prototype, "beforeclose", void 0);
    __decorate([
        computedFrom("width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "minimized", "maximized", "position.left", "position.top"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UIDialogElement.prototype, "css", null);
    UIDialogElement = __decorate([
        autoinject(),
        customElement("ui-dialog"),
        __metadata("design:paramtypes", [Element])
    ], UIDialogElement);
    return UIDialogElement;
}());
export { UIDialogElement };
