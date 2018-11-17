/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Container, DOM } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { UIAppConfig } from "../utils/ui-app-config";

export namespace UITether {
  export type Position = "tl" | "tr" | "bl" | "br" | "tc" | "bc";
  export interface Tether {
    dispose(): void;
    updatePosition(newAnchor?: Element): void;
  }
  export interface TetherConfig {
    resize?: boolean;
    attachToViewport?: boolean;
    position?: Position;
    anchorPosition?: Position;
  }
  export function tether(
    anchorEl: Element,
    dropdownEl: HTMLDivElement,
    config: TetherConfig = Config
  ) {
    return attach(anchorEl, dropdownEl, { ...Config, ...config });
  }

  // Tether config
  const Config: TetherConfig = {
    anchorPosition: "bl",
    attachToViewport: false,
    position: "tl",
    resize: true
  };

  // Tether functionality
  const logger = getLogger("UITether");

  function updatePosition(
    anchorEl: Element,
    dropdownEl: HTMLDivElement,
    scrollerEl: Element,
    config
  ) {
    const anchorRect = anchorEl.getBoundingClientRect();
    const dropdownRect = dropdownEl.getBoundingClientRect();
    const scrollerRect = scrollerEl.getBoundingClientRect();

    if (config.resize !== false) {
      dropdownEl.style.minWidth = anchorRect.width + "px";
    }

    const [posY, posX] = config.position.split("");
    const [anchorY, anchorX] = config.anchorPosition.split("");
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

    if (anchorX === "l") {
      x = anchorRect.left;
    } else if (anchorX === "r") {
      x = anchorRect.right;
    } else if (anchorX === "c") {
      x = anchorRect.left + anchorRect.width / 2;
    }
    if (anchorY === "t") {
      y = anchorRect.top;
    } else if (anchorY === "b") {
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
    } else if (x < clientX) {
      x = anchorRect.left;
    }

    if (y + dropdownRect.height > clientHeight) {
      y =
        posY === "t" && anchorY === "b" ? anchorRect.top - dropdownRect.height : anchorRect.bottom;
    } else if (y < clientY) {
      y =
        posY === "b" && anchorY === "t" ? anchorRect.bottom - dropdownRect.height : anchorRect.top;
    }

    if (!config.attachToViewport) {
      x -= scrollerRect.left - scrollerEl.scrollLeft;
      y -= scrollerRect.top - scrollerEl.scrollTop;
      x -= 1;
      y -= 1;

      if (
        window.getComputedStyle(scrollerEl).direction === "rtl" &&
        scrollerEl.scrollHeight > scrollerEl.offsetHeight
      ) {
        x -= 5;
      }
    }
    dropdownEl.style.transform = `translate(${x}px, ${y}px)`;
  }

  function scrollHandler(scrollCallbacks: Set<() => void> = new Set()) {
    scrollCallbacks.forEach(c => c());
  }

  function getParentScroller(el) {
    const styles = ["scroll", "auto"];
    el = el.parentElement;
    do {
      const style = window.getComputedStyle(el);
      if (
        styles.includes(style.overflow) ||
        styles.includes(style.overflowX) ||
        styles.includes(style.overflowY)
      ) {
        return el;
      }
      el = el.parentElement;
    } while (el !== null);
    return null;
  }

  function attach(anchorEl: Element, dropdownEl: HTMLDivElement, config: TetherConfig) {
    const scroller: Element & { scrollHandler?; scrollCallbacks?: Set<() => void> } =
      getParentScroller(anchorEl) || document.body;

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
        } else {
          DOM.removeNode(dropdownEl.parentElement);
        }
      },
      updatePosition: (newAnchorEl?: Element) => {
        anchorEl = newAnchorEl || anchorEl;
        updatePosition(anchorEl, dropdownEl, scroller, config);
      }
    };
  }
}
