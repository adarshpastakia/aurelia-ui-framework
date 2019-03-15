/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { UIInternal } from "../utils/ui-internal";

export namespace GridderUtils {
  export let ghost: HTMLElement & { startWidth: number; startHeight: number };
  export let dragEl: HTMLElement & { originalIndex?: number };

  export let colCount;
  export let minWidth;
  export let minHeight = 100;

  export let cells;

  let dropEl;

  let startX;
  let startY;
  let colSpan;
  let rowSpan;

  export function startMove(el: HTMLElement) {
    dragEl = el;
    dragEl.style.opacity = "0.5";
    updateGhost(dragEl);
    dragEl.originalIndex = cells.indexOf(dragEl.au.controller.viewModel);
    return true;
  }
  export function move($event: MouseEvent) {
    const current = getParentByTag($event.target, "ui-gridder-cell") as HTMLElement;
    if (isTrue(current.dataset.allowDrop)) {
      $event.preventDefault();
      dropEl = current;
      updateGhost(dropEl);
    }
  }
  export function finishMove($event: MouseEvent) {
    if (dropEl) {
      $event.preventDefault();
      if (dropEl !== dragEl) {
        const newIndex = cells.indexOf(dropEl.au.controller.viewModel);
        newIndex === cells.length - 1
          ? dragEl.parentElement.appendChild(dragEl)
          : dragEl.parentElement.insertBefore(
              dragEl,
              dragEl.originalIndex > newIndex ? dropEl : dropEl.nextSibling
            );
      }
    }
    dragEl.style.opacity = "1";
    dragEl = null;
    dropEl = null;
  }

  export function startResize($event: MouseEvent) {
    dragEl = $event.target.parentElement;
    updateGhost(dragEl);
    startX = $event.clientX || $event.x;
    startY = $event.clientY || $event.y;
    colSpan = parseInt(dragEl.style.gridColumnEnd.replace("span ", ""), 10) || 1;
    rowSpan = parseInt(dragEl.style.gridRowEnd.replace("span ", ""), 10) || 1;

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  }

  const resize = ($event: MouseEvent) => {
    const x = $event.clientX || $event.x;
    const y = $event.clientY || $event.y;

    ghost.style.width = ghost.startWidth + (x - startX) + "px";
    ghost.style.height = ghost.startHeight + (y - startY) + "px";

    if (Math.round((x - startX) / minWidth) > 0) {
      dragEl.style.gridColumnEnd = `span ${colSpan + Math.round((x - startX) / minWidth)}`;
    } else if (Math.round((startX - x) / minWidth) > 0) {
      dragEl.style.gridColumnEnd = `span ${colSpan - Math.round((startX - x) / minWidth)}`;
    } else {
      dragEl.style.gridColumnEnd = `span ${colSpan}`;
    }
    if (Math.round((y - startY) / minHeight) > 0) {
      dragEl.style.gridRowEnd = `span ${rowSpan + Math.round((y - startY) / minHeight)}`;
    } else if (Math.round((startY - y) / minHeight) > 0) {
      dragEl.style.gridRowEnd = `span ${rowSpan - Math.round((startY - y) / minHeight)}`;
    } else {
      dragEl.style.gridRowEnd = `span ${rowSpan}`;
    }

    ghost.style.top = dragEl.offsetTop + "px";
    ghost.style.left = dragEl.offsetLeft + "px";
  };

  const stopResize = ($event: MouseEvent) => {
    dragEl = null;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  };

  function updateGhost(el) {
    UIInternal.queueTask(() => {
      ghost.startWidth = el.offsetWidth;
      ghost.startHeight = el.offsetHeight;
      ghost.style.top = el.offsetTop + "px";
      ghost.style.left = el.offsetLeft + "px";
      ghost.style.width = el.offsetWidth + "px";
      ghost.style.height = el.offsetHeight + "px";
    });
  }
}
