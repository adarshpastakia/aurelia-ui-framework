var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, bindable, containerless, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import { UITether } from "../utils/ui-tether";
var UIDrop = /** @class */ (function () {
    function UIDrop(element) {
        this.element = element;
        this.class = "";
        this.isOpen = false;
        this.stretch = true;
        this.closeOnClick = true;
        this.attachToViewport = false;
        this.position = element.getAttribute("position") || "tl";
        this.anchorPosition = element.getAttribute("anchor") || "bl";
        this.closeOnClick = !isFalse(element.getAttribute("close-on-click"));
        this.attachToViewport = isTrue(element.getAttribute("attach-to-viewport"));
    }
    UIDrop.prototype.tether = function (anchorEl) {
        this.tetherObj = UITether.tether((this.anchorEl = anchorEl), this.vmElement, {
            anchorPosition: this.anchorPosition,
            attachToViewport: this.attachToViewport,
            position: this.position,
            resize: this.stretch
        });
    };
    UIDrop.prototype.updatePosition = function () {
        this.tetherObj.updatePosition();
    };
    UIDrop.prototype.toggleDrop = function (open) {
        var _this = this;
        this.disposeListeners();
        this.vmElement.dataset.show = "false";
        this.isOpen = open === undefined ? !this.isOpen : open;
        if (this.isOpen) {
            this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, function (t) { return _this.canClose(t); });
            this.obResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, function (t) {
                return _this.updatePosition();
            });
            UIInternal.queueMicroTask(function () {
                _this.tetherObj.updatePosition();
                _this.vmElement.dataset.show = "true";
            });
        }
    };
    UIDrop.prototype.closeDrop = function () {
        var _this = this;
        UIInternal.queueTask(function () {
            _this.isOpen = false;
            _this.disposeListeners();
            _this.element.dispatchEvent(UIInternal.createEvent("close"));
        });
    };
    UIDrop.prototype.disposeListeners = function () {
        if (this.obClick) {
            this.obClick.dispose();
        }
        if (this.obResize) {
            this.obResize.dispose();
        }
    };
    UIDrop.prototype.detached = function () {
        this.disposeListeners();
        if (this.tetherObj) {
            this.tetherObj.dispose();
        }
    };
    UIDrop.prototype.canClose = function (t) {
        if (!hasParent(t, this.vmElement) && !hasParent(t, this.anchorEl)) {
            this.closeDrop();
        }
    };
    UIDrop.prototype.close = function ($event) {
        $event.stopEvent();
        if (this.closeOnClick) {
            this.closeDrop();
        }
    };
    __decorate([
        bindable(),
        __metadata("design:type", String)
    ], UIDrop.prototype, "class", void 0);
    UIDrop = __decorate([
        autoinject(),
        containerless(),
        customElement("ui-drop"),
        inlineView("<template><div slot=\"ui-drop\" class=\"ui-drop\" mouseup.delegate=\"closeDrop()\" data-open.bind=\"isOpen\">\n  <div ref=\"vmElement\" class=\"ui-drop__body ${class}\" mouseup.delegate=\"close($event)\"><slot></slot></div>\n  </div></template>"),
        __metadata("design:paramtypes", [Element])
    ], UIDrop);
    return UIDrop;
}());
export { UIDrop };
