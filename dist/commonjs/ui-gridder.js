'use strict';

var __chunk_1 = require('./chunk.js');
var aureliaFramework = require('aurelia-framework');
require('aurelia-event-aggregator');
var __chunk_3 = require('./chunk3.js');
var __chunk_7 = require('./chunk7.js');

var GridderUtils;
(function (GridderUtils) {
    GridderUtils.minHeight = 100;
    var dropEl;
    var startX;
    var startY;
    var colSpan;
    var rowSpan;
    function startMove($event) {
        GridderUtils.dragEl = getParentByTag($event.target, "ui-gridder-cell");
        GridderUtils.dragEl.setAttribute("draggable", "true");
        if ($event.dataTransfer) {
            $event.dataTransfer.setData("text/plain", "drag");
        }
        GridderUtils.dragEl.style.zIndex = "2";
        GridderUtils.dragEl.style.opacity = "0.5";
        updateGhost(GridderUtils.dragEl);
        GridderUtils.dragEl.originalIndex = GridderUtils.cells.indexOf(getViewModel(GridderUtils.dragEl));
        return true;
    }
    GridderUtils.startMove = startMove;
    function move($event) {
        var current = getParentByTag($event.target, "ui-gridder-cell");
        current.setAttribute("draggable", "false");
        if (isTrue(current.dataset.allowDrop)) {
            $event.preventDefault();
            dropEl = current;
            updateGhost(dropEl);
        }
    }
    GridderUtils.move = move;
    function finishMove($event) {
        if (dropEl) {
            $event.preventDefault();
            if (dropEl !== GridderUtils.dragEl) {
                var newIndex = GridderUtils.cells.indexOf(getViewModel(dropEl));
                newIndex === GridderUtils.cells.length - 1
                    ? GridderUtils.dragEl.parentElement.appendChild(GridderUtils.dragEl)
                    : GridderUtils.dragEl.parentElement.insertBefore(GridderUtils.dragEl, newIndex > GridderUtils.dragEl.originalIndex ? dropEl.nextElementSibling : dropEl);
            }
        }
        GridderUtils.dragEl.style.zIndex = "unset";
        GridderUtils.dragEl.style.opacity = "1";
        GridderUtils.dragEl = null;
        dropEl = null;
    }
    GridderUtils.finishMove = finishMove;
    function startResize($event) {
        GridderUtils.dragEl = $event.target.parentElement;
        updateGhost(GridderUtils.dragEl);
        startX = $event.clientX || $event.x;
        startY = $event.clientY || $event.y;
        colSpan = parseInt(GridderUtils.dragEl.style.gridColumnEnd.replace("span ", ""), 10) || 1;
        rowSpan = parseInt(GridderUtils.dragEl.style.gridRowEnd.replace("span ", ""), 10) || 1;
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
    }
    GridderUtils.startResize = startResize;
    var resize = function ($event) {
        var x = $event.clientX || $event.x;
        var y = $event.clientY || $event.y;
        GridderUtils.ghost.style.width = GridderUtils.ghost.startWidth + (x - startX) + "px";
        GridderUtils.ghost.style.height = GridderUtils.ghost.startHeight + (y - startY) + "px";
        if (Math.round((x - startX) / GridderUtils.minWidth) > 0) {
            GridderUtils.dragEl.style.gridColumnEnd = "span " + (colSpan + Math.round((x - startX) / GridderUtils.minWidth));
        }
        else if (Math.round((startX - x) / GridderUtils.minWidth) > 0) {
            GridderUtils.dragEl.style.gridColumnEnd = "span " + (colSpan - Math.round((startX - x) / GridderUtils.minWidth));
        }
        else {
            GridderUtils.dragEl.style.gridColumnEnd = "span " + colSpan;
        }
        if (Math.round((y - startY) / GridderUtils.minHeight) > 0) {
            GridderUtils.dragEl.style.gridRowEnd = "span " + (rowSpan + Math.round((y - startY) / GridderUtils.minHeight));
        }
        else if (Math.round((startY - y) / GridderUtils.minHeight) > 0) {
            GridderUtils.dragEl.style.gridRowEnd = "span " + (rowSpan - Math.round((startY - y) / GridderUtils.minHeight));
        }
        else {
            GridderUtils.dragEl.style.gridRowEnd = "span " + rowSpan;
        }
        GridderUtils.ghost.style.top = GridderUtils.dragEl.offsetTop + "px";
        GridderUtils.ghost.style.left = GridderUtils.dragEl.offsetLeft + "px";
    };
    var stopResize = function ($event) {
        GridderUtils.dragEl = null;
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);
    };
    function updateGhost(el) {
        __chunk_3.UIInternal.queueTask(function () {
            GridderUtils.ghost.startWidth = el.offsetWidth;
            GridderUtils.ghost.startHeight = el.offsetHeight;
            GridderUtils.ghost.style.top = el.offsetTop + "px";
            GridderUtils.ghost.style.left = el.offsetLeft + "px";
            GridderUtils.ghost.style.width = el.offsetWidth + "px";
            GridderUtils.ghost.style.height = el.offsetHeight + "px";
        });
    }
})(GridderUtils || (GridderUtils = {}));

var view = "<template class=\"ui-gridder__cell\" data-allow-drop.bind=\"!pinned\" dragenter.trigger=\"utils.move($event)\">\n  <div ref=\"vmElement\" class=\"ui-panel-base ui-panel\" data-expanded.bind=\"expanded\">\n    <div class=\"ui-panel__header\" data-autohide.bind=\"autoHideHeader\">\n      <ui-drag-handle if.bind=\"moveable && !pinned\"></ui-drag-handle>\n      <ui-header>\n        <slot name=\"header-icon\">\n          <ui-header-icon if.bind=\"icon\" icon.bind=\"icon\"></ui-header-icon>\n        </slot>\n        <ui-header-title if.bind=\"label\">${label}</ui-header-title>\n\n        <slot name=\"header-actions\"></slot>\n      </ui-header>\n      <div class=\"ui-panel__header__actions\" if.bind=\"closeable || expandable || pinnable\">\n        <ui-divider></ui-divider>\n        <template if.bind=\"pinnable\">\n          <ui-button type=\"tool\" click.trigger=\"togglePinned(!pinned)\" active.bind=\"pinned\">\n            <ui-svg-icon icon.bind=\"pinned?'pinned':'unpinned'\"></ui-svg-icon>\n          </ui-button>\n        </template>\n        <template if.bind=\"expandable\">\n          <ui-button type=\"tool\" click.trigger=\"toggleExpand(!expanded)\">\n            <ui-svg-icon icon.bind=\"expanded?'collapse':'expand'\"></ui-svg-icon>\n          </ui-button>\n        </template>\n        <template if.bind=\"closeable\">\n          <ui-button type=\"tool\" click.trigger=\"close()\">\n            <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n          </ui-button>\n        </template>\n      </div>\n    </div>\n    <div class=\"ui-panel__body\">\n      <slot></slot>\n    </div>\n    <slot name=\"panel-footer\"></slot>\n  </div>\n\n  <div if.bind=\"resizeable\" class=\"ui-gridder__resize\" mousedown.trigger=\"utils.startResize($event)\"></div>\n</template>\n";

var UIGridderCell = (function (_super) {
    __chunk_1.__extends(UIGridderCell, _super);
    function UIGridderCell(element) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.label = "";
        _this.icon = "";
        _this.pinned = false;
        _this.expanded = false;
        _this.closeable = false;
        _this.expandable = false;
        _this.moveable = false;
        _this.pinnable = false;
        _this.resizeable = false;
        _this.autoHideHeader = false;
        _this.utils = GridderUtils;
        return _this;
    }
    UIGridderCell.prototype.bind = function () {
        _super.prototype.bind.call(this);
        this.moveable = !isFalse(this.moveable);
        this.pinnable = !isFalse(this.pinnable);
        this.resizeable = !isFalse(this.resizeable);
        this.autoHideHeader = !isFalse(this.autoHideHeader);
    };
    UIGridderCell.prototype.attached = function () {
        this.element.style.gridArea = "\n    " + (this.config.row || "auto") + " / \n    " + (this.config.col || "auto") + " / \n    span " + this.config.rowSpan + " / \n    span " + this.config.colSpan;
    };
    UIGridderCell.prototype.togglePinned = function (pinned) {
        this.pinned = pinned;
    };
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIGridderCell.prototype, "label", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", String)
    ], UIGridderCell.prototype, "icon", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Object)
    ], UIGridderCell.prototype, "config", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIGridderCell.prototype, "pinned", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIGridderCell.prototype, "expanded", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIGridderCell.prototype, "closeable", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIGridderCell.prototype, "expandable", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIGridderCell.prototype, "moveable", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIGridderCell.prototype, "pinnable", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIGridderCell.prototype, "resizeable", void 0);
    __chunk_1.__decorate([
        aureliaFramework.bindable(),
        __chunk_1.__metadata("design:type", Boolean)
    ], UIGridderCell.prototype, "autoHideHeader", void 0);
    UIGridderCell = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-gridder-cell"),
        aureliaFramework.inlineView(view),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIGridderCell);
    return UIGridderCell;
}(__chunk_7.BasePanel));

var view$1 = "<template class=\"ui-gridder\">\n  <div class=\"ui-gridder__container\" dragstart.trigger=\"startDrag($event)\" dragend.trigger=\"stopDrag($event)\">\n    <slot></slot>\n\n    <div class=\"ui-gridder__ghost\" ref=\"ghost\" show.bind=\"!!utils.dragEl\"></div>\n\n    <div class=\"ui-gridder__overlay\" if.bind=\"!!utils.dragEl\">\n      <template repeat.for=\"row of utils.rowCount\">\n        <template repeat.for=\"col of utils.colCount\">\n          <div class=\"ui-gridder__cell\" data-row.bind=\"row\" data-col.bind=\"col\"></div> </template></template>\n    </div>\n  </div>\n</template>\n";

var UIGridder = (function () {
    function UIGridder(element) {
        this.element = element;
        this.utils = GridderUtils;
    }
    UIGridder.prototype.created = function (owningView) {
        this.owningView = owningView;
    };
    UIGridder.prototype.attached = function () {
        GridderUtils.colCount = 12;
        GridderUtils.minWidth = Math.floor(this.element.offsetWidth / GridderUtils.colCount);
        GridderUtils.ghost = this.ghost;
    };
    UIGridder.prototype.cellsChanged = function () {
        var _this = this;
        __chunk_3.UIInternal.queueTask(function () {
            GridderUtils.cells = _this.cells;
            GridderUtils.rowCount = Math.floor(_this.element.firstElementChild.offsetHeight / GridderUtils.minHeight);
        });
    };
    UIGridder.prototype.startDrag = function ($event) {
        GridderUtils.startMove($event);
        return true;
    };
    UIGridder.prototype.stopDrag = function ($event) {
        GridderUtils.finishMove($event);
        return true;
    };
    __chunk_1.__decorate([
        aureliaFramework.children("ui-gridder-cell"),
        __chunk_1.__metadata("design:type", Object)
    ], UIGridder.prototype, "cells", void 0);
    UIGridder = __chunk_1.__decorate([
        aureliaFramework.customElement("ui-gridder"),
        aureliaFramework.inlineView(view$1),
        __chunk_1.__metadata("design:paramtypes", [Element])
    ], UIGridder);
    return UIGridder;
}());
var Gridder = [UIGridder, UIGridderCell];

exports.Gridder = Gridder;
//# sourceMappingURL=ui-gridder.js.map
