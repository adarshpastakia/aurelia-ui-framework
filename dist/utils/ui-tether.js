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
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Container, DOM } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { UIAppConfig } from "../utils/ui-app-config";
export var UITether;
(function (UITether) {
    function tether(anchorEl, dropdownEl, config) {
        if (config === void 0) { config = Config; }
        return attach(anchorEl, dropdownEl, __assign({}, Config, config));
    }
    UITether.tether = tether;
    // Tether config
    var Config = {
        anchorPosition: "bl",
        attachToViewport: false,
        position: "tl",
        resize: true
    };
    // Tether functionality
    var logger = getLogger("UITether");
    function updatePosition(anchorEl, dropdownEl, scrollerEl, config) {
        var anchorRect = anchorEl.getBoundingClientRect();
        var dropdownRect = dropdownEl.getBoundingClientRect();
        var scrollerRect = scrollerEl.getBoundingClientRect();
        if (config.resize !== false) {
            dropdownEl.style.minWidth = anchorRect.width + "px";
        }
        var _a = __read(config.position.split(""), 2), posY = _a[0], posX = _a[1];
        var _b = __read(config.anchorPosition.split(""), 2), anchorY = _b[0], anchorX = _b[1];
        var x = 0;
        var y = 0;
        var clientHeight = document.body.clientHeight;
        var clientWidth = document.body.clientWidth;
        var clientX = 0;
        var clientY = 0;
        logger.debug("tether", {
            anchorRect: anchorRect,
            anchorX: anchorX,
            anchorY: anchorY,
            dropdownRect: dropdownRect,
            posX: posX,
            posY: posY
        });
        if (!config.attachToViewport) {
            clientHeight = scrollerRect.bottom;
            clientWidth = scrollerRect.right;
            clientX = scrollerRect.left;
            clientY = scrollerRect.top;
        }
        if (anchorX === "l") {
            x = anchorRect.left;
        }
        else if (anchorX === "r") {
            x = anchorRect.right;
        }
        else if (anchorX === "c") {
            x = anchorRect.left + anchorRect.width / 2;
        }
        if (anchorY === "t") {
            y = anchorRect.top;
        }
        else if (anchorY === "b") {
            y = anchorRect.bottom;
        }
        if (posX === "r") {
            x -= dropdownRect.width;
        }
        if (posX === "c") {
            x -= dropdownRect.width / 2;
        }
        if (posY === "b") {
            y -= dropdownRect.height;
        }
        // TODO: Test it, i have no idea wtf i wrote
        if (x + dropdownRect.width > clientWidth) {
            x = anchorRect.right - dropdownRect.width;
        }
        else if (x < clientX) {
            x = anchorRect.left;
        }
        if (y + dropdownRect.height > clientHeight) {
            y =
                posY === "t" && anchorY === "b" ? anchorRect.top - dropdownRect.height : anchorRect.bottom;
        }
        else if (y < clientY) {
            y =
                posY === "b" && anchorY === "t" ? anchorRect.bottom - dropdownRect.height : anchorRect.top;
        }
        if (!config.attachToViewport) {
            x -= scrollerRect.left - scrollerEl.scrollLeft;
            y -= scrollerRect.top - scrollerEl.scrollTop;
            x -= 1;
            y -= 1;
            if (window.getComputedStyle(scrollerEl).direction === "rtl" &&
                scrollerEl.scrollHeight > scrollerEl.offsetHeight) {
                x -= 5;
            }
        }
        dropdownEl.style.transform = "translate(" + x + "px, " + y + "px)";
    }
    function scrollHandler(scrollCallbacks) {
        if (scrollCallbacks === void 0) { scrollCallbacks = new Set(); }
        scrollCallbacks.forEach(function (c) { return c(); });
    }
    function getParentScroller(el) {
        var styles = ["scroll", "auto"];
        el = el.parentElement;
        do {
            var style = window.getComputedStyle(el);
            if (styles.includes(style.overflow) ||
                styles.includes(style.overflowX) ||
                styles.includes(style.overflowY)) {
                return el;
            }
            el = el.parentElement;
        } while (el !== null);
        return null;
    }
    function attach(anchorEl, dropdownEl, config) {
        var scroller = getParentScroller(anchorEl) || document.body;
        var scrollCallback = function () {
            if (dropdownEl.parentElement.dataset.open) {
                updatePosition(anchorEl, dropdownEl, scroller, config);
            }
        };
        if (!scroller.scrollHandler) {
            scroller.scrollHandler = function () { return scrollHandler(scroller.scrollCallbacks); };
            scroller.addEventListener("scroll", scroller.scrollHandler);
            scroller.scrollCallbacks = new Set();
        }
        var container = Container.instance.get(UIAppConfig).FloatingContainer;
        config.attachToViewport ? container.appendChild(dropdownEl.parentElement || dropdownEl) : fn();
        scroller.scrollCallbacks.add(scrollCallback);
        return {
            dispose: function () {
                scroller.scrollCallbacks.delete(scrollCallback);
                if (dropdownEl.parentElement === Container.instance.get(UIAppConfig).FloatingContainer) {
                    DOM.removeNode(dropdownEl);
                }
                else {
                    DOM.removeNode(dropdownEl.parentElement);
                }
            },
            updatePosition: function (newAnchorEl) {
                anchorEl = newAnchorEl || anchorEl;
                updatePosition(anchorEl, dropdownEl, scroller, config);
            }
        };
    }
})(UITether || (UITether = {}));
