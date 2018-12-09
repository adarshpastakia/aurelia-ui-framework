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
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { computedFrom } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var BaseInput = /** @class */ (function () {
    function BaseInput(element) {
        this.element = element;
        this.maxlength = 0;
        this.allowClear = false;
        this.showCounter = false;
        this.readonly = false;
        this.disabled = false;
        this.isDisabled = false;
        this.allowClear = element.hasAttribute("clear");
        this.showCounter = element.hasAttribute("counter");
    }
    BaseInput.prototype.focus = function () {
        this.inputEl.focus();
    };
    BaseInput.prototype.disable = function (b) {
        this.isDisabled = b;
    };
    Object.defineProperty(BaseInput.prototype, "classes", {
        get: function () {
            var classes = [];
            if (this.errors && this.errors.length > 0) {
                classes.push("ui-input--invalid");
            }
            if (this.isTrue("readonly")) {
                classes.push("ui-input--readonly");
            }
            if (this.isTrue("disabled") || this.isDisabled) {
                classes.push("ui-input--disabled");
            }
            return classes.join(" ");
        },
        enumerable: true,
        configurable: true
    });
    BaseInput.prototype.bind = function () {
        this.readonly = this.isTrue("readonly");
        this.disabled = this.isTrue("disabled");
    };
    BaseInput.prototype.clear = function () {
        this.value = "";
        this.inputEl.focus();
    };
    BaseInput.prototype.fireEnter = function ($event) {
        if ($event.keyCode === 13) {
            $event.stopEvent();
            this.element.dispatchEvent(UIInternal.createEvent("enterpressed", this.value));
        }
        return true;
    };
    BaseInput.prototype.canToggleDrop = function (evt) {
        if (evt.relatedTarget && evt.relatedTarget !== this.inputEl) {
            this.toggleDrop(false);
        }
    };
    BaseInput.prototype.toggleDrop = function (open) {
        var _this = this;
        if (open === true && this.dropEl.isOpen) {
            UIInternal.queueMicroTask(function () { return _this.dropEl.updatePosition(); });
            return;
        }
        var beforeEvent = this.dropEl.isOpen && !open ? "beforeclose" : "beforeopen";
        var afterEvent = this.dropEl.isOpen && !open ? "close" : "open";
        if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
            this.dropEl.toggleDrop(open);
            this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
            if (this.dropEl.isOpen) {
                this.inputEl.select();
                return true;
            }
            else {
                return false;
            }
        }
    };
    BaseInput.prototype.isTrue = function (prop) {
        return this[prop] === "" || this[prop] === prop || isTrue(this[prop]);
    };
    __decorate([
        computedFrom("isDisabled", "disabled", "readonly", "errors", "errors.length"),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], BaseInput.prototype, "classes", null);
    return BaseInput;
}());
export { BaseInput };
