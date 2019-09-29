/*
 * @author: Adarsh Pastakia
 * @version: 5.0.0
 * @copyright: 2019
 * @license: MIT
 */

export const calculateOverflow = (wrapperEl: Element, overflowEl: Element): boolean => {
  const isRtl = window.getComputedStyle(wrapperEl).direction === "rtl";

  resetOverflow(wrapperEl, overflowEl);
  while (wrapperEl.lastElementChild && isOutOfBounds(wrapperEl, wrapperEl.lastElementChild, isRtl)) {
    !!overflowEl.firstElementChild
      ? overflowEl.insertBefore(wrapperEl.lastElementChild, overflowEl.firstElementChild)
      : overflowEl.appendChild(wrapperEl.lastElementChild);
  }
  return !!overflowEl.children.length;
};

const resetOverflow = (wrapperEl: Element, overflowEl: Element): void => {
  overflowEl.children.forEach(child => {
    wrapperEl.appendChild(child);
  });
};

const isOutOfBounds = (wrapperEl: Element, itemEl: Element, isRtl: boolean) => {
  return isRtl
    ? itemEl.getBoundingClientRect().left < wrapperEl.getBoundingClientRect().left
    : itemEl.getBoundingClientRect().right > wrapperEl.getBoundingClientRect().right;
};
