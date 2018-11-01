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
  export type TetherPosition = "tl" | "tr" | "bl" | "br";
  export interface Tether {
    dispose(): void;
    updatePosition(): void;
  }
  export interface TetherConfig {
    attachToViewport?: boolean;
    position?: TetherPosition;
    anchorPosition?: TetherPosition;
  }
  export function tether(
    anchorEl: Element,
    dropdownEl: HTMLDivElement,
    config: TetherConfig = Config
  ) {
    return attach(anchorEl, dropdownEl, config);
  }

  // Tether config
  const Config: TetherConfig = {
    anchorPosition: "bl",
    attachToViewport: false,
    position: "tl"
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

    dropdownEl.style.minWidth = anchorRect.width + "px";

    // TODO: check config position
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
      const scrollerRect = scrollerEl.getBoundingClientRect();
      clientHeight = scrollerRect.bottom;
      clientWidth = scrollerRect.right;
      clientX = scrollerRect.left;
      clientY = scrollerRect.top;
    }

    if (anchorX === "l") {
      x = anchorRect.left;
    } else if (anchorX === "r") {
      x = anchorRect.right;
    }
    if (anchorY === "t") {
      y = anchorRect.top;
    } else if (anchorY === "b") {
      y = anchorRect.bottom;
    }

    if (posX === "r") {
      x -= dropdownRect.width;
    }
    if (posY === "b") {
      y -= dropdownRect.height;
    }

    if (x + dropdownRect.width > clientWidth) {
      x = posX === "l" && anchorX === "r" ? anchorRect.left : anchorRect.right - dropdownRect.width;
    } else if (x < clientX) {
      x = posX === "r" && anchorX === "l" ? anchorRect.right : anchorRect.left - dropdownRect.width;
    }

    if (y + dropdownRect.height > clientHeight) {
      y =
        posY === "t" && anchorY === "b" ? anchorRect.top - dropdownRect.height : anchorRect.bottom;
    } else if (y < clientY) {
      y =
        posY === "b" && anchorY === "t" ? anchorRect.bottom - dropdownRect.height : anchorRect.top;
    }

    if (!config.attachToViewport) {
      const scrollerRect = scrollerEl.getBoundingClientRect();
      x -= scrollerRect.left - scrollerEl.scrollLeft;
      y -= scrollerRect.top - scrollerEl.scrollTop;
      x -= 1;
      y -= 1;
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
      const style = getComputedStyle(el);
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
    config.attachToViewport ? container.appendChild(dropdownEl.parentElement) : fn();
    scroller.scrollCallbacks.add(scrollCallback);

    return {
      dispose: () => {
        scroller.scrollCallbacks.delete(scrollCallback);
        DOM.removeNode(dropdownEl.parentElement);
      },
      updatePosition: () => {
        updatePosition(anchorEl, dropdownEl, scroller, config);
      }
    };
  }
}
