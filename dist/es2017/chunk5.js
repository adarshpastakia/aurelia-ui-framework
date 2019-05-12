import { Container, DOM } from 'aurelia-framework';
import { a as UIAppConfig } from './chunk.js';
import { getLogger } from 'aurelia-logging';

var UITether;
(function (UITether) {
    function tether(anchorEl, dropdownEl, config = Config) {
        return attach(anchorEl, dropdownEl, Object.assign({}, Config, config));
    }
    UITether.tether = tether;
    const Config = {
        anchorPosition: "bl",
        attachToViewport: false,
        position: "tl",
        resize: true
    };
    const logger = getLogger("UITether");
    function updatePosition(anchorEl, dropdownEl, scrollerEl, config) {
        const anchorRect = anchorEl.getBoundingClientRect();
        const dropdownRect = dropdownEl.getBoundingClientRect();
        const scrollerRect = scrollerEl.getBoundingClientRect();
        if (config.resize !== false) {
            dropdownEl.style.minWidth = anchorRect.width + "px";
        }
        const [posY, posX] = config.position.split("");
        const [anchorY, anchorX] = config.anchorPosition.split("");
        const isRtl = window.getComputedStyle(scrollerEl).direction === "rtl";
        let x = 0;
        let y = 0;
        let clientHeight = document.body.clientHeight;
        let clientWidth = document.body.clientWidth;
        let clientX = 0;
        let clientY = 0;
        logger.debug("tether", {
            anchorRect,
            anchorX,
            anchorY,
            dropdownRect,
            posX,
            posY
        });
        if (!config.attachToViewport) {
            clientHeight = scrollerRect.bottom;
            clientWidth = scrollerRect.right;
            clientX = scrollerRect.left;
            clientY = scrollerRect.top;
        }
        if (anchorX === (isRtl ? "r" : "l")) {
            x = anchorRect.left;
        }
        else if (anchorX === (isRtl ? "l" : "r")) {
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
        if (posX === (isRtl ? "l" : "r")) {
            x -= dropdownRect.width;
        }
        if (posX === "c") {
            x -= dropdownRect.width / 2;
        }
        if (posY === "b") {
            y -= dropdownRect.height;
        }
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
            if (isRtl && scrollerEl.scrollHeight > scrollerEl.offsetHeight) {
                x -= 5;
            }
        }
        dropdownEl.style.transform = `translate(${x}px, ${y}px)`;
    }
    function scrollHandler(scrollCallbacks = new Set()) {
        scrollCallbacks.forEach(c => c());
    }
    function getParentScroller(el) {
        const styles = ["scroll", "auto"];
        el = el.parentElement;
        do {
            const style = window.getComputedStyle(el);
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
        const scroller = getParentScroller(anchorEl) || document.body;
        const scrollCallback = () => {
            if (dropdownEl.parentElement.dataset.open) {
                updatePosition(anchorEl, dropdownEl, scroller, config);
            }
        };
        if (!scroller.scrollHandler) {
            scroller.scrollHandler = () => scrollHandler(scroller.scrollCallbacks);
            scroller.addEventListener("scroll", scroller.scrollHandler);
            scroller.scrollCallbacks = new Set();
        }
        const container = Container.instance.get(UIAppConfig).FloatingContainer;
        config.attachToViewport ? container.appendChild(dropdownEl.parentElement || dropdownEl) : fn();
        scroller.scrollCallbacks.add(scrollCallback);
        return {
            dispose: () => {
                scroller.scrollCallbacks.delete(scrollCallback);
                if (dropdownEl.parentElement === Container.instance.get(UIAppConfig).FloatingContainer) {
                    DOM.removeNode(dropdownEl);
                }
                else {
                    DOM.removeNode(dropdownEl.parentElement);
                }
            },
            updatePosition: (newAnchorEl) => {
                anchorEl = newAnchorEl || anchorEl;
                updatePosition(anchorEl, dropdownEl, scroller, config);
            }
        };
    }
})(UITether || (UITether = {}));

export { UITether as a };
//# sourceMappingURL=chunk5.js.map
