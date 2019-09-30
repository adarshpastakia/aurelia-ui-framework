const calculateOverflow = (wrapperEl, overflowEl) => {
    const isRtl = window.getComputedStyle(wrapperEl).direction === "rtl";
    resetOverflow(wrapperEl, overflowEl);
    while (wrapperEl.lastElementChild && isOutOfBounds(wrapperEl, wrapperEl.lastElementChild, isRtl)) {
        !!overflowEl.firstElementChild
            ? overflowEl.insertBefore(wrapperEl.lastElementChild, overflowEl.firstElementChild)
            : overflowEl.appendChild(wrapperEl.lastElementChild);
    }
    return !!overflowEl.children.length;
};
const resetOverflow = (wrapperEl, overflowEl) => {
    overflowEl.children.forEach(child => {
        wrapperEl.appendChild(child);
    });
};
const isOutOfBounds = (wrapperEl, itemEl, isRtl) => {
    return isRtl
        ? itemEl.getBoundingClientRect().left < wrapperEl.getBoundingClientRect().left
        : itemEl.getBoundingClientRect().right > wrapperEl.getBoundingClientRect().right;
};

export { calculateOverflow as c };
//# sourceMappingURL=ui-common.js.map
