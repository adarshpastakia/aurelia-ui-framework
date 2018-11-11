var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { autoinject, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
var UIMenubar = /** @class */ (function () {
    function UIMenubar(element) {
        var _this = this;
        this.element = element;
        this.hasOverflow = false;
        this.obResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, function (t) {
            return _this.calculateOverflow();
        });
    }
    UIMenubar.prototype.attached = function () {
        var _this = this;
        UIInternal.queueTask(function () { return _this.calculateOverflow(); });
    };
    UIMenubar.prototype.detached = function () {
        this.obResize.dispose();
    };
    UIMenubar.prototype.calculateOverflow = function () {
        var _this = this;
        var _a;
        this.resetOverflow();
        var overflowItems = [];
        var isRtl = window.getComputedStyle(this.wrapperEl).direction === "rtl";
        // @ts-ignore
        __spread(this.wrapperEl.children).reverse().forEach(function (item) {
            if ((!isRtl && _this.wrapperEl.offsetWidth - (item.offsetLeft + item.offsetWidth) <= 30) ||
                (isRtl && _this.wrapperEl.offsetWidth - item.offsetLeft >= _this.wrapperEl.offsetWidth - 30)) {
                overflowItems.splice(0, 0, item);
                _this.hasOverflow = true;
            }
        });
        (_a = this.overflowEl).append.apply(_a, __spread(overflowItems));
    };
    UIMenubar.prototype.resetOverflow = function () {
        var _this = this;
        this.hasOverflow = false;
        this.overflowEl.children.forEach(function (child) {
            _this.wrapperEl.appendChild(child);
        });
    };
    UIMenubar = __decorate([
        autoinject(),
        customElement("ui-menubar"),
        inlineView("<template class=\"ui-menu__bar\">\n  <div class=\"ui-menu__bar__wrapper\" ref=\"wrapperEl\"><slot></slot></div>\n  <ui-button type=\"link\" no-caret class=\"ui-menu__overflow\" ui-theme=\"secondary\" show.bind=\"hasOverflow\">\n    <ui-svg-icon class=\"ui-btn__icon\" icon=\"overflow\"></ui-svg-icon>\n    <ui-drop><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n  </ui-button>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], UIMenubar);
    return UIMenubar;
}());
export { UIMenubar };
