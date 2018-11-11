/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { bindable, child, computedFrom, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIButton = /** @class */ (function () {
    function UIButton(element) {
        this.element = element;
        this.icon = "";
        this.href = "";
        this.label = "";
        this.size = "nm";
        this.type = "default";
        this.value = "";
        this.busy = false;
        this.active = false;
        this.disabled = false;
        this.hasDrop = false;
        this.split = false;
        this.elDisabled = false;
        if (element.hasAttribute("icon-hilight")) {
            element.classList.add("ui-btn__icon--hilight");
        }
        if (element.hasAttribute("icon-end")) {
            element.classList.add("ui-btn__icon--end");
        }
        if (element.hasAttribute("icon-top")) {
            element.classList.add("ui-btn__icon--top");
        }
        if (element.hasAttribute("no-caret")) {
            element.classList.add("ui-btn__caret--hide");
        }
        if (element.hasAttribute("block")) {
            element.classList.add("ui-btn--block");
        }
        this.split = element.hasAttribute("split");
    }
    Object.defineProperty(UIButton.prototype, "isDisabled", {
        get: function () {
            return this.disabled || this.elDisabled;
        },
        enumerable: true,
        configurable: true
    });
    UIButton.prototype.disable = function (disabled) {
        this.elDisabled = disabled;
    };
    UIButton.prototype.attached = function () {
        var _this = this;
        UIInternal.queueTask(function () {
            _this.hasDrop = !!_this.elDropdown;
            if (_this.hasDrop) {
                _this.dropEl = getSlotViewModel(_this.elDropdown);
                _this.dropEl.tether(_this.element);
            }
        });
        this.hrefChanged();
    };
    UIButton.prototype.hrefChanged = function () {
        if (this.badgeEl) {
            if (this.href) {
                this.badgeEl.href = this.href;
            }
            else if (this.badgeEl.attributes.getNamedItem("href")) {
                this.badgeEl.attributes.removeNamedItem("href");
            }
        }
    };
    UIButton.prototype.fireClick = function ($event) {
        if (!this.href) {
            if (this.hasDrop && !this.split) {
                this.toggleDrop();
            }
            else {
                return this.element.dispatchEvent(UIInternal.createEvent("click", this.value));
            }
            return false;
        }
    };
    UIButton.prototype.toggleDrop = function () {
        var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
        var afterEvent = this.dropEl.isOpen ? "close" : "open";
        if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
            this.dropEl.toggleDrop();
            this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIButton.prototype, "icon", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIButton.prototype, "href", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIButton.prototype, "label", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIButton.prototype, "size", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIButton.prototype, "type", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIButton.prototype, "value", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIButton.prototype, "busy", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIButton.prototype, "active", void 0);
    __decorate([
        bindable(),
        __metadata("design:type", Boolean)
    ], UIButton.prototype, "disabled", void 0);
    __decorate([
        child("div.ui-drop"),
        __metadata("design:type", Element)
    ], UIButton.prototype, "elDropdown", void 0);
    __decorate([
        computedFrom("disabled", "elDisabled"),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], UIButton.prototype, "isDisabled", null);
    UIButton = __decorate([
        customElement("ui-button"),
        __metadata("design:paramtypes", [Element])
    ], UIButton);
    return UIButton;
}());
export { UIButton };
